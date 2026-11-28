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
import {
  getDepartmentMarkdownSection,
  sanitizeScrapedMarkdown,
} from '../src/lib/institutional-content.ts';
import CatchAllContentPage from '../src/app/[...slug]/page.tsx';

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

test('sanitizeScrapedMarkdown strips Avada #tab-* multiline anchors, data:image table placeholders, jQuery marquee snippets, and empty bullets', () => {
  const dirtyAvadaMd = `
Placements
Flash News
[Welcome to G.Pullaiah College of Engineering and Technology (Autonomous): Kurnool](https://www.gpcet.ac.in/welcome/)
[financial_assistance_letters](/departments/cse/financial-assistance-letters)

### **About GPCET**

-   [College History](/archive-or-orphan/college-history)
-   [Courses Offered](/archive-or-orphan/programmes)

-   [

    #### B.Tech Programmes

    ](#tab-1144625d3c53e445905)
-   **[

    #### Qualifications

    ](#tab-effcfcb90c42de4a8cb)**
-   ****[

    #### Overview

    ](#tab-15e4373d00413eaaddb)****
-   [ ](#tab-0000000000000000000)

jQuery(function(){ jQuery('.marquee').marquee({ duration: 5000, gap: 20 }); });

-   ![](data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3C%2Fsvg%3E "placeholder")
-   [
    ![](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)
    ](https://www.gpcet.ac.in/wp-content/uploads/2023/01/real.png)

## Placement Highlights

| S.No | Recruiter Logo | Company |
| --- | --- | --- |
| 1 | ![](data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3C%2Fsvg%3E) | Wipro |
| 2 | [![Infosys](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)](https://www.infosys.com) | Infosys |

Verified placement summary remains intact.
`;

  const cleaned = sanitizeScrapedMarkdown(dirtyAvadaMd);

  assert(!cleaned.includes('#tab-'), 'Avada #tab-* anchors must be stripped');
  assert(!cleaned.includes('B.Tech Programmes'), 'Empty #tab-* header label must be stripped');
  assert(!cleaned.includes('Qualifications'), 'Bold-wrapped #tab-* header label must be stripped');
  assert(!cleaned.includes('data:image/'), 'Residual data:image placeholders must be stripped');
  assert(!cleaned.includes('jQuery('), 'Inline jQuery marquee snippet must be stripped');
  assert(!cleaned.includes('marquee('), 'Nested marquee call must be stripped');
  assert(!cleaned.includes('Flash News'), 'Avada Flash News line must be stripped');
  assert(!cleaned.includes('financial_assistance_letters'), 'Avada financial_assistance_letters line must be stripped');
  assert(!/^[ \t]*[-*+][ \t]*$/m.test(cleaned), 'Orphaned empty list bullets must be stripped');
  assert(!/\n{3,}/.test(cleaned), 'Consecutive blank lines must collapse to at most two newlines');

  // Verify real content and pipe-table structure remain valid
  assert(cleaned.includes('## Placement Highlights'), 'Real heading must be preserved');
  assert(cleaned.includes('Verified placement summary remains intact.'), 'Real body copy must be preserved');
  assert(cleaned.includes('| 1 |  | Wipro |'), 'Pipe-table row structure must remain intact after stripping data:image');
  assert(cleaned.includes('| 2 |  | Infosys |'), 'Pipe-table row structure must remain intact after stripping linked data:image');

  const html = renderToString(React.createElement(MarkdownRenderer, { content: cleaned }));
  assert(html.includes('<table'), 'Cleaned table must still render as a valid HTML table');
  assert(html.includes('Wipro') && html.includes('Infosys'), 'Table cell text must render cleanly');
  assert(!html.includes('data:image/'), 'Rendered HTML must contain zero data:image placeholders');
});

test('MarkdownRenderer renders dead campus intranet and private-IP URLs as muted unavailable archive text', () => {
  const mdWithIntranetLinks = `
| S.No | Subject | Mid 1 | Mid 2 |
| --- | --- | --- | --- |
| 1 | Engineering Mechanics | [Objective](http://103.24.127.196:8085/Resources/mech/mid%20latest/em-obj.PDF) | [Verified Paper](https://www.gpcet.ac.in/wp-content/uploads/2024/03/em-mid2.pdf) |
| 2 | Internal Portal | [LAN Notice](http://192.168.1.50:8080/notices) | [Private Doc](http://10.10.2.15/syllabus.pdf) |
`;

  const html = renderToString(React.createElement(MarkdownRenderer, { content: mdWithIntranetLinks }));

  assert(!html.includes('http://103.24.127.196:8085'), 'Dead campus IP href must not be rendered as a link');
  assert(!html.includes('http://192.168.1.50:8080'), 'Private 192.168 IP href must not be rendered as a link');
  assert(!html.includes('http://10.10.2.15'), 'Private 10.x IP href must not be rendered as a link');
  assert(html.includes('(Campus Intranet Archive)'), 'Unavailable indicator must be shown');
  assert(html.includes('Objective') && html.includes('LAN Notice') && html.includes('Private Doc'), 'Original link label text must be preserved');
  assert(html.includes('https://www.gpcet.ac.in/wp-content/uploads/2024/03/em-mid2.pdf'), 'Valid HTTPS PDF link must still be rendered');
});

test('sanitizeScrapedMarkdown and MarkdownRenderer unwrap/strip escaped & unescaped Magee shortcodes while preserving inner content', () => {
  const escapedMageeMd = `
\\[ms\\_image\\_frame src=”https://www.gpcet.ac.in/v1.1/wp-content/uploads/2016/09/slider3.png” border\\_radius=”3″ link=”” link\\_target=”\\_blank” light\\_box=”yes” class=”” id=””\\]

\\[ms\\_panel title=”About Department of CSE” title\\_color=”#000″ border\\_color=”#81d742″\\]

Since inception in 2007, GPCET has rigorously pursued technical excellence.

\\[/ms\\_panel\\]

\\[ms\\_panel title=”Already Headed Panel”\\]

### Existing Overview Heading

Department laboratories and computing facilities.

\\[/ms\\_panel\\]

\\[ms\\_custom\\_box backgroundimage=”” padding=”30″\\]Contact:
Dr. S.Prem Kumar, M.Tech., Ph.D
HOD of CSE
E-mail: mcahod@gpcet.ac.in
Ph: 9866504950\\[/ms\\_custom\\_box\\]

\\[ms\\_widget\\_area name=”default\\_sidebar” padding=”0″\\]\\[/ms\\_widget\\_area\\]
`;

  const cleaned = sanitizeScrapedMarkdown(escapedMageeMd);
  assert(!cleaned.includes('ms_'), 'Escaped Magee shortcodes must be stripped');
  assert(!cleaned.includes('ms\\_'), 'Escaped Magee underscores must be stripped');
  assert(!cleaned.includes('slider3.png'), 'ms_image_frame URL must be stripped with shortcode');
  assert(cleaned.includes('## About Department of CSE'), 'ms_panel title must become H2 when panel lacks a heading');
  assert(!cleaned.includes('## Already Headed Panel'), 'ms_panel must not add duplicate H2 when inner content already starts with a heading');
  assert(cleaned.includes('### Existing Overview Heading'), 'Existing heading inside ms_panel must be preserved');
  assert(cleaned.includes('Since inception in 2007'), 'ms_panel inner prose must be preserved');
  assert(cleaned.includes('Dr. S.Prem Kumar'), 'ms_custom_box inner HOD contact name must be preserved');
  assert(cleaned.includes('mcahod@gpcet.ac.in'), 'ms_custom_box inner HOD email must be preserved');
  assert(cleaned.includes('9866504950'), 'ms_custom_box inner phone must be preserved');

  // Defense-in-depth: MarkdownRenderer directly handles unescaped & escaped shortcodes
  const unescapedMageeMd = `
[ms_image_frame src="https://www.gpcet.ac.in/banner.png" border_radius="3"]
[ms_panel title="About ECE"]
Department of ECE overview paragraph.
[/ms_panel]
[ms_custom_box padding="20"]Contact: Dr. N. Rama Murthy[/ms_custom_box]
[ms_widget_area name="sidebar"][/ms_widget_area]
`;
  const html = renderToString(React.createElement(MarkdownRenderer, { content: unescapedMageeMd }));
  assert(!html.includes('[ms_'), 'MarkdownRenderer must strip unescaped Magee shortcodes');
  assert(html.includes('About ECE'), 'MarkdownRenderer must promote ms_panel title to heading');
  assert(html.includes('Department of ECE overview paragraph.'), 'MarkdownRenderer must preserve ms_panel body');
  assert(html.includes('Contact: Dr. N. Rama Murthy'), 'MarkdownRenderer must preserve ms_custom_box contact info');
});

test('sanitizeScrapedMarkdown and MarkdownRenderer strip escaped & unescaped psfb, table, woocommerce shortcodes and smart-quote URL tails', () => {
  const mixedShortcodesMd = `
### Women's Grievance Redressal Cell

\\[psfb id=”19821″ title=”Women Grievance”\\]

[psfb id="99" title="Feedback"]

| S.No | Publication |
| --- | --- |
| 1 | Concrete Strength Study |

\\[table id=28 /\\]

[table id="14" /]

See the [table of contents](https://www.gpcet.ac.in/toc) and [table] note in prose.

\\[woocommerce\\_my\\_account\\]

[woocommerce_cart]

[Download Circular](https://www.gpcet.ac.in/wp-content/uploads/2024/03/circular.pdf”)

Direct archive link: https://www.gpcet.ac.in/v1.1/wp-content/uploads/2016/09/notice.pdf”
`;

  const cleaned = sanitizeScrapedMarkdown(mixedShortcodesMd);
  assert(!cleaned.includes('psfb'), 'psfb shortcodes must be stripped');
  assert(!cleaned.includes('[table id='), 'table shortcodes must be stripped');
  assert(!cleaned.includes('woocommerce'), 'woocommerce shortcodes must be stripped');
  assert(cleaned.includes('[table of contents](https://www.gpcet.ac.in/toc)'), 'Markdown links starting with [table must be preserved');
  assert(cleaned.includes('and [table] note in prose'), 'Plain [table] word in prose must be preserved');
  assert(cleaned.includes('https://www.gpcet.ac.in/wp-content/uploads/2024/03/circular.pdf)'), 'Smart-quote tail must be stripped from markdown link URL');
  assert(!cleaned.includes('notice.pdf”'), 'Smart-quote tail must be stripped from bare URL');

  // Defense-in-depth directly through MarkdownRenderer without pre-sanitizing
  const html = renderToString(React.createElement(MarkdownRenderer, { content: mixedShortcodesMd }));
  assert(!html.includes('psfb'), 'MarkdownRenderer must strip psfb shortcodes');
  assert(!html.includes('table id='), 'MarkdownRenderer must strip TablePress shortcodes');
  assert(!html.includes('woocommerce'), 'MarkdownRenderer must strip WooCommerce shortcodes');
  assert(!html.includes('%E2%80%9D'), 'Rendered hrefs must not contain encoded trailing smart quotes');
  assert(html.includes('href="https://www.gpcet.ac.in/wp-content/uploads/2024/03/circular.pdf"'), 'Cleaned PDF href must render intact');
});

test('MarkdownRenderer strips data:image/svg+xml and 1x1 data:image/gif lazy-load placeholders as defense-in-depth', () => {
  const rawSvgMd = `
[![Principal](data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3C%2Fsvg%3E)](#)

![](data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3C%2Fsvg%3E "placeholder")

![](data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)

<img src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3C%2Fsvg%3E" alt="lazy" />

<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="lazy-gif" />

\\[ms\\_image\\_frame src=”https://www.gpcet.ac.in/wp-content/uploads/2024/03/campus.jpg” alt=”Campus”\\]

\\[ms\\_widget\\_area name=”default\\_sidebar”\\]Widget fallback text\\[/ms\\_widget\\_area\\]

Real faculty profile text remains visible.
`;

  const cleaned = sanitizeScrapedMarkdown(rawSvgMd);
  assert(!cleaned.includes('data:image/svg+xml'), 'sanitizeScrapedMarkdown must strip all SVG placeholder forms');
  assert(!cleaned.includes('data:image/gif'), 'sanitizeScrapedMarkdown must strip all GIF placeholder forms');
  assert(!cleaned.includes('Widget fallback text'), 'ms_widget_area inner content must be stripped');
  assert(cleaned.includes('![Campus](https://www.gpcet.ac.in/wp-content/uploads/2024/03/campus.jpg)'), 'Valid non-v1.1 ms_image_frame must unwrap to markdown image');
  assert(cleaned.includes('Real faculty profile text remains visible.'));

  const html = renderToString(React.createElement(MarkdownRenderer, { content: rawSvgMd }));
  assert(!html.includes('data:image/svg+xml'), 'MarkdownRenderer must strip SVG lazy-load placeholders even without pre-sanitization');
  assert(!html.includes('data:image/gif'), 'MarkdownRenderer must strip GIF lazy-load placeholders even without pre-sanitization');
  assert(!html.includes('Widget fallback text'), 'MarkdownRenderer must strip ms_widget_area block');
  assert(html.includes('https://www.gpcet.ac.in/wp-content/uploads/2024/03/campus.jpg'), 'Valid image frame src must render');
  assert(html.includes('Real faculty profile text remains visible.'));
});

test('CatchAllContentPage renders clean institutional archive notice for empty-body routes', async () => {
  for (const slug of [
    ['academics', 'academics'],
    ['departments', 'cse', 'events-4'],
  ]) {
    const element = await CatchAllContentPage({ params: Promise.resolve({ slug }) });
    const html = renderToString(element);
    assert(html.includes('Archived Section Reference'), `Empty route /${slug.join('/')} must render archive fallback notice`);
    assert(html.includes('/documents'), `Empty route /${slug.join('/')} must link to Document Vault`);
  }
});

test('getDepartmentMarkdownSection resolves clean, current overviews across all 8 departments without legacy M.Tech or shortcode leaks', () => {
  const overviewCandidates = ['index-4', 'index', 'index-2', 'index-3', 'civil-vision'];
  const expectedSlugs = {
    cse: 'index-4',
    ai: 'index',
    ece: 'index-4',
    eee: 'index-3',
    me: 'index-2',
    civil: 'index',
    hs: 'index',
    mba: 'index',
  };

  for (const [dept, expectedSlug] of Object.entries(expectedSlugs)) {
    const section = getDepartmentMarkdownSection(dept, overviewCandidates);
    assert(section !== null, `Department ${dept} must resolve an overview section`);
    assert.strictEqual(section.slug, expectedSlug, `Department ${dept} should resolve ${expectedSlug}, got ${section.slug}`);
    assert(section.content.length > 200, `Department ${dept} overview must be substantive`);
    assert(!/m\.?tech/i.test(section.title), `Department ${dept} overview must not resolve a legacy M.Tech page`);
    assert(!/\[\/?(?:ms|fusion|vc|psfb|woocommerce)_?/i.test(section.content), `Department ${dept} overview must have zero shortcode leaks`);
    assert(!section.content.includes('data:image/svg+xml'), `Department ${dept} overview must have zero SVG placeholders`);
    assert(!section.content.includes('#tab-'), `Department ${dept} overview must have zero #tab- anchors`);
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
