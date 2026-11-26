import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  isSupabasePublicConfigured,
  isStaffRole,
  getAdminSession,
  requireStaffSession,
  STAFF_ROLES,
} from '../src/lib/auth/admin-auth.ts';

test('isSupabasePublicConfigured rejects missing and placeholder credentials cleanly', () => {
  const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prevKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  try {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    assert.strictEqual(isSupabasePublicConfigured(), false);

    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://placeholder.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'placeholder-anon-key';
    assert.strictEqual(isSupabasePublicConfigured(), false);

    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://your-project-id.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-placeholder';
    assert.strictEqual(isSupabasePublicConfigured(), false);

    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://gpcet-prod.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.real-signed-token';
    assert.strictEqual(isSupabasePublicConfigured(), true);
  } finally {
    if (prevUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;

    if (prevKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = prevKey;
  }
});

test('isStaffRole strictly validates authorized staff roles', () => {
  for (const role of STAFF_ROLES) {
    assert.strictEqual(isStaffRole(role), true);
  }
  assert.strictEqual(isStaffRole('student'), false);
  assert.strictEqual(isStaffRole('anon'), false);
  assert.strictEqual(isStaffRole('superadmin'), false);
  assert.strictEqual(isStaffRole(null), false);
  assert.strictEqual(isStaffRole(undefined), false);
});

test('getAdminSession and requireStaffSession handle unconfigured Supabase without throwing 500s', async () => {
  const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prevKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  try {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://placeholder.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'placeholder-anon-key';

    const session = await getAdminSession();
    assert.strictEqual(session.configured, false);
    assert.strictEqual(session.authenticated, false);
    assert.strictEqual(session.isStaff, false);
    assert.strictEqual(session.user, null);

    const authResult = await requireStaffSession(['admin'], { redirectOnUnauthenticated: false });
    assert.strictEqual(authResult.authorized, false);
    assert.strictEqual(authResult.status, 401);
    assert.strictEqual(authResult.reason, 'unauthenticated');
  } finally {
    if (prevUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;

    if (prevKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = prevKey;
  }
});

test('admin/layout.tsx does not unconditionally redirect /admin/login', () => {
  const layoutSrc = fs.readFileSync(
    path.join(process.cwd(), 'src', 'app', 'admin', 'layout.tsx'),
    'utf8'
  );
  assert(!layoutSrc.includes("redirect('/admin/login')"), 'admin/layout.tsx must not redirect to /admin/login');
  assert(!layoutSrc.includes('redirect("/admin/login")'), 'admin/layout.tsx must not redirect to /admin/login');
});

test('admin components and actions never reference process.env.SUPABASE_SERVICE_ROLE_KEY', () => {
  const adminDirs = [
    path.join(process.cwd(), 'src', 'app', 'admin'),
    path.join(process.cwd(), 'src', 'components', 'admin'),
    path.join(process.cwd(), 'src', 'lib', 'auth'),
    path.join(process.cwd(), 'src', 'lib', 'actions'),
  ];

  for (const dir of adminDirs) {
    const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        const fullPath = path.join(entry.parentPath, entry.name);
        const content = fs.readFileSync(fullPath, 'utf8');
        assert(
          !content.includes('process.env.SUPABASE_SERVICE_ROLE_KEY'),
          `Forbidden SUPABASE_SERVICE_ROLE_KEY usage in ${fullPath}`
        );
      }
    }
  }
});

test('ADR-006 production CMS cutover document exists with required sections', () => {
  const adrPath = path.join(process.cwd(), 'docs', 'decisions', '006-production-cms-cutover.md');
  assert(fs.existsSync(adrPath), 'ADR-006 must exist');
  const content = fs.readFileSync(adrPath, 'utf8');
  assert(content.includes('Scraper Sync Mode'));
  assert(content.includes('Native CMS Mode'));
  assert(content.includes('app_metadata'));
  assert(content.includes('Rollback'));
});
