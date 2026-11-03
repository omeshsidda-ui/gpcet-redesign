import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';

import {
  ContentFrontmatterSchema,
  validateContentFrontmatter,
  safeValidateContentFrontmatter,
} from '../src/lib/validations/content.schema.js';

import {
  getAllContentRoutes,
  getContentBySlug,
  getCategoryBreadcrumbs,
  generateTableOfContents,
  findClosestRoutes,
  resolveContentFilePath,
} from '../src/lib/content.js';

import {
  MarkdownRenderer,
  normalizeMarkdownTables,
} from '../src/components/content/MarkdownRenderer.js';

test('ContentFrontmatterSchema validates valid academic metadata and applies coercion', () => {
  const valid = {
    id: '32077',
    title: 'Academic Calendar',
    slug: 'academic-calendar',
    wp_slug: 'academic-calendar',
    section: 'academics',
    route: '/academics/academic-calendar',
    date: '2024-03-05T12:47:07',
    modified: '2024-03-14T16:47:30',
    canonical_url: 'https://www.gpcet.ac.in/academic-calendar/',
    tables_count: '0',
    pdfs_count: '6',
  };

  const parsed = ContentFrontmatterSchema.parse(valid);
  assert.strictEqual(parsed.id, 32077);
  assert.strictEqual(parsed.title, 'Academic Calendar');
  assert.strictEqual(parsed.route, '/academics/academic-calendar');
  assert.strictEqual(parsed.tables_count, 0);
  assert.strictEqual(parsed.pdfs_count, 6);

  // Missing title must fail
  const missingTitle = { ...valid, title: '' };
  const res = safeValidateContentFrontmatter(missingTitle);
  assert(!res.success, 'Frontmatter without title must be rejected');

  // Negative table count must fail
  const badTable = { ...valid, tables_count: -1 };
  assert(!safeValidateContentFrontmatter(badTable).success);
});

test('getAllContentRoutes() returns all valid slug paths conforming to generateStaticParams() contract', () => {
  const routes = getAllContentRoutes();
  assert(Array.isArray(routes));
  assert(routes.length >= 936, `Expected at least 936 routes, found ${routes.length}`);

  // Test first 10 routes have valid Next.js structure
  for (let i = 0; i < Math.min(10, routes.length); i++) {
    const r = routes[i];
    assert(Array.isArray(r.slug), `Route ${i} must have array slug`);
    assert(r.slug.length > 0, `Route ${i} slug must not be empty`);
    assert(typeof r.path === 'string' && r.path.startsWith('/'), `Route ${i} path must start with /`);
  }
});

test('getContentBySlug() correctly resolves and parses pages across key sections', () => {
  // 1. Academics page
  const academicCal = getContentBySlug(['academics', 'academic-calendar']);
  assert(academicCal !== null, 'Academics calendar page must resolve');
  assert.strictEqual(academicCal.frontmatter.title, 'Academic Calendar');
  assert.strictEqual(academicCal.frontmatter.section, 'academics');
  assert(academicCal.content.length > 0);

  // 2. Academic Council with table
  const council = getContentBySlug(['academics', 'academic-council']);
  assert(council !== null, 'Academic council page must resolve');
  assert(council.frontmatter.tables_count >= 1);
  assert(council.toc.length >= 2, 'Table of contents should extract headings');

  // 3. Departments index
  const cse = getContentBySlug(['departments', 'cse']);
  assert(cse !== null, 'CSE department route must resolve');

  // 4. NAAC Criteria page
  const naacPage = getContentBySlug(['accreditation', 'naac', 'criteria-1']);
  if (naacPage) {
    assert.strictEqual(naacPage.frontmatter.section, 'accreditation/naac');
  }

  // 5. Non-existent slug returns null
  const invalid = getContentBySlug(['non-existent', 'fake-page-xyz']);
  assert.strictEqual(invalid, null, 'Non-existent page must return null');
});

test('getCategoryBreadcrumbs() formats hierarchical trails with academic acronyms', () => {
  const crumbs = getCategoryBreadcrumbs(['departments', 'cse', 'laboratories'], 'Software Engineering Lab');
  assert.strictEqual(crumbs.length, 4);
  assert.deepStrictEqual(crumbs[0], { label: 'Home', href: '/' });
  assert.deepStrictEqual(crumbs[1], { label: 'Departments', href: '/departments' });
  assert.deepStrictEqual(crumbs[2], { label: 'CSE', href: '/departments/cse' });
  assert.deepStrictEqual(crumbs[3], { label: 'Software Engineering Lab', href: '/departments/cse/laboratories' });

  const naacCrumbs = getCategoryBreadcrumbs(['accreditation', 'naac']);
  assert.strictEqual(naacCrumbs[2].label, 'NAAC SSR');
});

test('generateTableOfContents() extracts clean H2/H3 anchors ignoring code blocks and inline formatting', () => {
  const markdown = `
# Title Level 1 (Ignored)

Some introductory paragraph.

## **Institutional Governance**
Governance content.

\`\`\`markdown
## Code block heading (Must be ignored)
\`\`\`

### Academic Council & BoS
BoS content.

## Institutional Governance
Duplicate heading.
`;

  const toc = generateTableOfContents(markdown);
  assert.strictEqual(toc.length, 3);
  assert.strictEqual(toc[0].text, 'Institutional Governance');
  assert.strictEqual(toc[0].level, 2);
  assert.strictEqual(toc[0].id, 'institutional-governance');

  assert.strictEqual(toc[1].text, 'Academic Council & BoS');
  assert.strictEqual(toc[1].level, 3);

  // Duplicate ID must be de-duplicated
  assert.strictEqual(toc[2].id, 'institutional-governance-1');
});

test('findClosestRoutes() fuzzy-matches closest institutional pages', () => {
  const matches = findClosestRoutes(['academics', 'calendar'], 3);
  assert(matches.length > 0);
  assert(matches.some((m) => m.path.includes('calendar')));
});

test('MarkdownRenderer transforms compressed Avada tables and wraps them with sticky first column', () => {
  const compressedTableMd = `
## Table Section

| S.no | Name | Designation | | --- | --- | --- | | 1 | Dr. Rao | Principal | | 2 | Dr. Kumar | Dean |
`;

  const element = React.createElement(MarkdownRenderer, { content: compressedTableMd });
  const html = renderToString(element);

  assert(html.includes('<table'), 'Table tag must be generated');
  assert(html.includes('overflow-x-auto'), 'Table wrapper must include overflow-x-auto');
  assert(html.includes('first:sticky'), 'Table headers and cells must include first:sticky first column');
  assert(html.includes('Dr. Rao'), 'Row data must be preserved');
  assert(html.includes('Dr. Kumar'), 'Row data must be preserved');
});

test('MarkdownRenderer secures PDF links and upgrades HTTP to HTTPS', () => {
  const mdWithLinks = `
[Download Syllabus PDF](http://www.gpcet.ac.in/wp-content/uploads/2024/03/syllabus.pdf)
[External AICTE Link](https://www.aicte-india.org)
[Internal Link](/departments/cse)
`;

  const element = React.createElement(MarkdownRenderer, { content: mdWithLinks });
  const html = renderToString(element);

  // PDF link checks
  assert(html.includes('target="_blank"'), 'PDF link must open in new tab');
  assert(html.includes('rel="noopener noreferrer"'), 'PDF link must have noopener noreferrer');
  assert(html.includes('https://www.gpcet.ac.in/wp-content/uploads/'), 'HTTP must be upgraded to HTTPS');
  assert(html.includes('PDF</span>'), 'PDF badge must be rendered');
});

test('MarkdownRenderer strictly neutralizes XSS injection vectors', () => {
  const maliciousVectors = [
    '<script>alert("PWNED_1")</script>',
    '<img src="invalid-image" onerror="alert(\'PWNED_2\')" />',
    '[Malicious Link](javascript:alert("PWNED_3"))',
    '<div onclick="alert(\'PWNED_4\')">Click me</div>',
    '<iframe src="https://evil-site.com"></iframe>',
    '<object data="malicious.swf"></object>',
    '<embed src="malicious.swf">',
  ];

  for (const attack of maliciousVectors) {
    const element = React.createElement(MarkdownRenderer, { content: attack });
    const html = renderToString(element);

    assert(!html.includes('PWNED_'), `XSS payload was not sanitized: ${attack}`);
    assert(!html.includes('<script'), `Script tag leaked: ${attack}`);
    assert(!html.includes('onerror'), `Event handler leaked: ${attack}`);
    assert(!html.includes('onclick'), `Event handler leaked: ${attack}`);
    assert(!html.includes('<iframe'), `Iframe leaked: ${attack}`);
    assert(!html.includes('javascript:'), `Javascript pseudoprotocol leaked: ${attack}`);
  }
});

test('ACCEPTANCE GATE: All scraped markdown pages resolve without runtime parsing errors', () => {
  const routes = getAllContentRoutes();
  assert(routes.length >= 936, `Must have >= 936 routes, found ${routes.length}`);

  let parsedCount = 0;
  let tableRenderedCount = 0;

  for (const r of routes) {
    const page = getContentBySlug(r.slug);
    assert(page !== null, `Route /${r.slug.join('/')} failed to resolve to a page`);
    assert(page.frontmatter.title, `Page /${r.slug.join('/')} missing title`);
    assert(typeof page.content === 'string');

    parsedCount++;
    if (page.frontmatter.tables_count > 0) {
      tableRenderedCount++;
    }
  }

  assert(parsedCount >= 936, `Expected at least 936 parsed pages, got ${parsedCount}`);
  assert(tableRenderedCount > 300, `Expected over 300 table pages, got ${tableRenderedCount}`);
});
