import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { NextRequest } from 'next/server';

import {
  buildContentSecurityPolicy,
  config as middlewareConfig,
  getSecurityHeaders,
  isSupabaseMiddlewareConfigured,
  middleware,
} from '../src/middleware.ts';
import { POST as postInquiry } from '../src/app/api/v1/inquiries/route.ts';
import { getAllNaacMetrics, getNaacCriteriaGroups } from '../src/lib/naac-data.ts';
import {
  getEnrichedDepartments,
  sanitizeScrapedMarkdown,
} from '../src/lib/institutional-content.ts';

const root = process.cwd();

function walkFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

test('Edge middleware builds strict CSP without nonce conflict and omits unsafe-eval in production', () => {
  const prodCsp = buildContentSecurityPolicy(false);
  assert.ok(prodCsp.includes("default-src 'self'"));
  assert.ok(prodCsp.includes("script-src 'self' 'unsafe-inline'"));
  assert.ok(!prodCsp.includes("'unsafe-eval'"), 'Production CSP must omit unsafe-eval');
  assert.ok(!prodCsp.includes("'nonce-"), 'Static SSG CSP must not mix nonce with unsafe-inline');
  assert.ok(prodCsp.includes("style-src 'self' 'unsafe-inline' https://fonts.googleapis.com"));
  assert.ok(prodCsp.includes("font-src 'self' https://fonts.gstatic.com data:"));
  assert.ok(prodCsp.includes("img-src 'self' data: https://www.gpcet.ac.in https://gpcet.ac.in blob:"));
  assert.ok(prodCsp.includes("connect-src 'self' https://*.supabase.co https://www.gpcet.ac.in"));
  assert.ok(prodCsp.includes("frame-ancestors 'none'"));
  assert.ok(prodCsp.includes("object-src 'none'"));
  assert.ok(prodCsp.includes("base-uri 'self'"));
  assert.ok(prodCsp.includes("form-action 'self'"));

  const devCsp = buildContentSecurityPolicy(true);
  assert.ok(devCsp.includes("script-src 'self' 'unsafe-inline' 'unsafe-eval'"));

  const headers = getSecurityHeaders(false);
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['Referrer-Policy'], 'strict-origin-when-cross-origin');
  assert.equal(headers['Permissions-Policy'], 'camera=(), microphone=(), geolocation=()');
});

test('Edge middleware injects security headers and passes through cleanly when Supabase is unconfigured/placeholder', async () => {
  const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prevKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  try {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://placeholder.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'placeholder-anon-key';
    assert.equal(isSupabaseMiddlewareConfigured(), false);

    for (const pathname of ['/', '/documents', '/api/v1/health', '/admin', '/admin/login']) {
      const req = new NextRequest(`http://localhost:3000${pathname}`);
      const res = await middleware(req);
      assert.equal(res.status, 200);
      assert.ok(res.headers.get('Content-Security-Policy')?.includes("frame-ancestors 'none'"));
      assert.equal(res.headers.get('X-Frame-Options'), 'DENY');
      assert.equal(res.headers.get('X-Content-Type-Options'), 'nosniff');
      assert.equal(res.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
      assert.equal(
        res.headers.get('Permissions-Policy'),
        'camera=(), microphone=(), geolocation=()'
      );
    }

    // Verify matcher excludes static assets, search index, and media files
    assert.ok(Array.isArray(middlewareConfig.matcher) && middlewareConfig.matcher.length === 1);
    const pattern = middlewareConfig.matcher[0].replace(/^\//, '');
    const regex = new RegExp(`^${pattern}$`);

    assert.equal(regex.test('_next/static/chunks/main.js'), false);
    assert.equal(regex.test('_next/image?url=%2Fhero.png'), false);
    assert.equal(regex.test('favicon.ico'), false);
    assert.equal(regex.test('assets/brand/logo.png'), false);
    assert.equal(regex.test('search-index.json'), false);
    assert.equal(regex.test('documents/r20-syllabus.pdf'), false);
    assert.equal(regex.test('departments/cse'), true);
    assert.equal(regex.test('admin/notices'), true);
    assert.equal(regex.test('api/v1/inquiries'), true);
  } finally {
    if (prevUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;

    if (prevKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = prevKey;
  }
});

test('POST /api/v1/inquiries enforces sliding-window rate limit (5 allowed, 6th returns 429 RATE_LIMIT_EXCEEDED)', async () => {
  const testIp = '203.0.113.77';
  const validPayload = {
    studentName: 'K. Praveen Kumar',
    email: 'praveen.qa@example.com',
    phone: '9876543210',
    desiredDepartment: 'cse',
    program: 'B.Tech',
    eamcetRank: 12450,
    message: 'Checking B.Tech CSE seat availability for EAPCET counseling.',
    botCheck: '',
  };

  for (let i = 1; i <= 5; i += 1) {
    const req = new Request('http://localhost:3000/api/v1/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': testIp,
      },
      body: JSON.stringify(validPayload),
    });

    const res = await postInquiry(req);
    assert.equal(res.status, 201, `Request #${i} should succeed with 201`);
  }

  const blockedReq = new Request('http://localhost:3000/api/v1/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': testIp,
    },
    body: JSON.stringify(validPayload),
  });

  const blockedRes = await postInquiry(blockedReq);
  assert.equal(blockedRes.status, 429);
  assert.equal(blockedRes.headers.get('content-type'), 'application/problem+json');

  const problem = await blockedRes.json();
  assert.equal(problem.status, 429);
  assert.equal(problem.code, 'RATE_LIMIT_EXCEEDED');
  assert.ok(problem.detail.includes('Too many requests'));
  assert.ok(problem.detail.includes('seconds'));
});

test('Zero SUPABASE_SERVICE_ROLE_KEY or @/lib/supabase/admin references exist in client components or public pages', () => {
  const srcFiles = walkFiles(path.join(root, 'src'));
  const clientFiles = srcFiles.filter((file) => {
    const content = fs.readFileSync(file, 'utf8');
    return /^\s*['"]use client['"];?/m.test(content);
  });

  assert.ok(clientFiles.length > 0, 'Expected client components in src/');

  for (const file of clientFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(root, file);
    assert.equal(
      content.includes('SUPABASE_SERVICE_ROLE_KEY'),
      false,
      `Client component ${rel} must not reference SUPABASE_SERVICE_ROLE_KEY`
    );
    assert.equal(
      content.includes('supabase/admin'),
      false,
      `Client component ${rel} must not import @/lib/supabase/admin`
    );
  }

  const publicAppFiles = walkFiles(path.join(root, 'src', 'app')).filter(
    (file) => !file.includes(`${path.sep}api${path.sep}`) && !file.includes(`${path.sep}admin${path.sep}`)
  );

  for (const file of publicAppFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(root, file);
    assert.equal(
      content.includes('SUPABASE_SERVICE_ROLE_KEY'),
      false,
      `Public page/layout ${rel} must not reference SUPABASE_SERVICE_ROLE_KEY`
    );
    assert.equal(
      content.includes('supabase/admin'),
      false,
      `Public page/layout ${rel} must not import @/lib/supabase/admin`
    );
  }
});

test('Phase 5 utilities: 48 NAAC metrics across Criteria 1-7, 8 departments totaling 452 faculty, and Markdown sanitization', async () => {
  const naacMetrics = getAllNaacMetrics();
  assert.equal(naacMetrics.length, 48, 'Expected all 48 NAAC SSR metrics');

  const criteriaGroups = getNaacCriteriaGroups();
  assert.equal(criteriaGroups.length, 7, 'Expected NAAC Criteria 1 through 7');
  for (let num = 1; num <= 7; num += 1) {
    const group = criteriaGroups.find((g) => g.number === num);
    assert.ok(group && group.metrics.length > 0, `Criterion ${num} must contain metrics`);
  }

  const departments = await getEnrichedDepartments();
  assert.equal(departments.length, 8, 'Expected all 8 academic departments');
  const totalFaculty = departments.reduce((sum, d) => sum + d.facultyCount, 0);
  assert.equal(totalFaculty, 452, 'Total enriched faculty across 8 departments must equal 452');

  const dirtyMarkdown = [
    '[fusion_builder_container][fusion_text]',
    '## Department Circular',
    '<script>alert("xss")</script>',
    '<iframe src="https://evil.example/embed"></iframe>',
    '[Click here](javascript:alert(1))',
    '[/fusion_text][/fusion_builder_container]',
  ].join('\n');

  const sanitized = sanitizeScrapedMarkdown(dirtyMarkdown);
  assert.equal(sanitized.includes('<script'), false, 'Script tags must be stripped');
  assert.equal(sanitized.includes('alert("xss")'), false, 'Script body must be stripped');
  assert.equal(sanitized.includes('<iframe'), false, 'Iframe tags must be stripped');
  assert.equal(sanitized.includes('javascript:'), false, 'javascript: URIs must be neutralized');
  assert.equal(sanitized.includes('[fusion_'), false, 'Avada [fusion_*] shortcodes must be stripped');
  assert.equal(sanitized.includes('[/fusion_'), false, 'Closing Avada shortcodes must be stripped');
  assert.ok(sanitized.includes('## Department Circular'));
});

test('Anti-slop & WCAG AA accessibility structural compliance across shell and interactive views', () => {
  const topBar = fs.readFileSync(
    path.join(root, 'src', 'components', 'global', 'TopInstitutionalBar.tsx'),
    'utf8'
  );
  assert.equal(
    topBar.includes('bg-emerald-400'),
    false,
    'Cosmetic status dot must be absent from TopInstitutionalBar'
  );

  const navbar = fs.readFileSync(
    path.join(root, 'src', 'components', 'global', 'InstitutionalNavbar.tsx'),
    'utf8'
  );
  assert.equal(navbar.includes('backdrop-blur'), false, 'No gratuitous backdrop-blur in Navbar');
  assert.ok(navbar.includes('aria-expanded='), 'Mega-menu and mobile drawer expose aria-expanded');

  const searchModal = fs.readFileSync(
    path.join(root, 'src', 'components', 'global', 'GlobalSearchModal.tsx'),
    'utf8'
  );
  assert.equal(searchModal.includes('backdrop-blur'), false, 'No gratuitous backdrop-blur in SearchModal');

  const layout = fs.readFileSync(path.join(root, 'src', 'app', 'layout.tsx'), 'utf8');
  assert.ok(layout.includes('href="#main-content"'));
  assert.ok(layout.includes('<main id="main-content"'));

  const deptMatrix = fs.readFileSync(
    path.join(root, 'src', 'components', 'home', 'DepartmentalMatrix.tsx'),
    'utf8'
  );
  assert.ok(deptMatrix.includes('overflow-x-auto'));
  assert.ok(deptMatrix.includes('md:hidden'));
  assert.ok(deptMatrix.includes('tabular-nums'));

  const docVault = fs.readFileSync(
    path.join(root, 'src', 'components', 'documents', 'DocumentVaultClient.tsx'),
    'utf8'
  );
  assert.ok(docVault.includes('overflow-x-auto'));
  assert.ok(docVault.includes('md:hidden'));
  assert.ok(docVault.includes('aria-label="Document vault pagination"'));
});

test('next.config.ts legacy redirects never shadow first-class App Router routes', async () => {
  const { default: exportedConfig } = await import('../next.config.ts');
  const resolvedConfig =
    typeof exportedConfig === 'function'
      ? await exportedConfig('phase-production-build', { defaultConfig: {} })
      : exportedConfig;
  const redirects = await resolvedConfig.redirects();
  const sources = new Set(redirects.map((r) => r.source));

  for (const reserved of ['/', '/accreditation', '/documents', '/departments/cse', '/admissions', '/placements', '/admin/login']) {
    assert.equal(sources.has(reserved), false, `Legacy redirect must not shadow ${reserved}`);
  }
  assert.ok(redirects.length > 1800, 'Expected legacy WordPress redirects to remain active');
});
