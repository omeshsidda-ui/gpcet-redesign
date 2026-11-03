import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

test('globals.css defines complete 75/20/5 color tokens and anti-slop rules', () => {
  const css = fs.readFileSync(path.join(root, 'src', 'app', 'globals.css'), 'utf8');

  // Ground & Canvas (75%)
  assert.ok(css.includes('--bg: #FBFBFD;'), 'Canvas ground token defined');
  assert.ok(css.includes('--surface: #F1F3F6;'), 'Surface token defined');
  assert.ok(css.includes('--surface-raised: #FFFFFF;'), 'Raised surface token defined');

  // Structural Ink & Navy (20%)
  assert.ok(css.includes('--ink: #0A1124;'), 'Ink text token defined');
  assert.ok(css.includes('--muted: #4B5565;'), 'Muted text token defined');
  assert.ok(css.includes('--primary-navy: #0C2340;'), 'Imperial Navy token defined');

  // Accents (<5%)
  assert.ok(css.includes('--brand-crimson: #8A1538;'), 'Academic Oxblood token defined');
  assert.ok(css.includes('--brass-gold: #B8860B;'), 'Burnished brass token defined');
  assert.ok(css.includes('--rule: rgba(10, 17, 36, 0.08);'), 'Structural hairline rule defined');

  // Dark mode overrides
  assert.ok(css.includes('.dark {'), 'Dark mode class defined');
  assert.ok(css.includes('--bg: #070B14;'), 'Dark canvas token defined');

  // Typography Scale Tokens
  assert.ok(css.includes('--text-hero:'), 'Hero typography scale token defined');
  assert.ok(css.includes('--text-title:'), 'Title typography scale token defined');
  assert.ok(css.includes('--text-body:'), 'Body typography scale token defined');

  // Masked headline animation keyframes
  assert.ok(css.includes('@keyframes maskedReveal'), 'Masked reveal animation keyframes defined');
  assert.ok(css.includes('.animate-masked-headline'), 'Masked headline animation class defined');

  // Reduced motion support
  assert.ok(css.includes('prefers-reduced-motion: reduce'), 'WCAG reduced motion compliance present');

  // Focus visible styles
  assert.ok(css.includes(':focus-visible'), 'WCAG AA focus-visible styles present');
});

test('TopInstitutionalBar.tsx contains regulatory credentials and EAPCET code', () => {
  const code = fs.readFileSync(path.join(root, 'src', 'components', 'global', 'TopInstitutionalBar.tsx'), 'utf8');
  assert.ok(code.includes('UGC AUTONOMOUS'), 'Contains Autonomous status');
  assert.ok(code.includes('JNTUA'), 'Contains JNTUA affiliation');
  assert.ok(code.includes('NAAC'), 'Contains NAAC A+ badge');
  assert.ok(code.includes('PULE'), 'Contains EAPCET Code PULE');
  assert.ok(code.includes('Exam Cell'), 'Contains Exam Cell link');
  assert.ok(code.includes('RTI Act'), 'Contains RTI Act link');
});

test('InstitutionalNavbar.tsx contains mega-menu and search modal trigger', () => {
  const code = fs.readFileSync(path.join(root, 'src', 'components', 'global', 'InstitutionalNavbar.tsx'), 'utf8');
  assert.ok(code.includes('G. Pullaiah College of Engineering'), 'Contains institutional title');
  assert.ok(code.includes('Academics'), 'Contains Academics menu');
  assert.ok(code.includes('Departments'), 'Contains Departments menu');
  assert.ok(code.includes('Admissions'), 'Contains Admissions menu');
  assert.ok(code.includes('Placements & Research'), 'Contains Placements menu');
  assert.ok(code.includes('Accreditation'), 'Contains Accreditation menu');
  assert.ok(code.includes('open-search-modal'), 'Dispatches open-search-modal event');
  assert.ok(code.includes('Mobile Navigation'), 'Contains accessible mobile sheet');
});

test('GlobalSearchModal.tsx implements accessible MiniSearch palette', () => {
  const code = fs.readFileSync(path.join(root, 'src', 'components', 'global', 'GlobalSearchModal.tsx'), 'utf8');
  assert.ok(code.includes('minisearch'), 'Imports MiniSearch');
  assert.ok(code.includes('role="dialog"'), 'Has dialog role');
  assert.ok(code.includes('role="listbox"'), 'Has listbox role for keyboard nav');
  assert.ok(code.includes('ArrowDown'), 'Supports ArrowDown keyboard navigation');
  assert.ok(code.includes('ArrowUp'), 'Supports ArrowUp keyboard navigation');
  assert.ok(code.includes('Escape'), 'Supports Escape key closing');
  assert.ok(code.includes('PULE'), 'Indexes EAPCET Code PULE');
});

test('InstitutionalFooter.tsx contains statutory seals and RTI disclosures', () => {
  const code = fs.readFileSync(path.join(root, 'src', 'components', 'global', 'InstitutionalFooter.tsx'), 'utf8');
  assert.ok(code.includes('Right to Information (RTI Act)'), 'Contains RTI Act compliance');
  assert.ok(code.includes('AICTE Mandatory Disclosure'), 'Contains AICTE Mandatory Disclosure');
  assert.ok(code.includes('NAAC SSR Portfolio (Cycle 2)'), 'Contains NAAC SSR link');
  assert.ok(code.includes('Anti-Ragging Committee'), 'Contains Anti-Ragging link');
  assert.ok(code.includes('/assets/brand/UGC_logo_s.png'), 'Contains UGC seal');
  assert.ok(code.includes('/assets/brand/NAAC_logo_s.png'), 'Contains NAAC seal');
  assert.ok(code.includes('/assets/brand/NBA_logo_s.png'), 'Contains NBA seal');
  assert.ok(code.includes('/assets/brand/AICTE_logo.png'), 'Contains AICTE seal');
  assert.ok(code.includes('/assets/brand/jntua_logo.png'), 'Contains JNTUA seal');
  assert.ok(code.includes('PULE'), 'Contains EAPCET code');
});

test('layout.tsx configures Google Fonts, skip-to-content, and shell components', () => {
  const code = fs.readFileSync(path.join(root, 'src', 'app', 'layout.tsx'), 'utf8');
  assert.ok(code.includes('Newsreader'), 'Loads Newsreader serif font');
  assert.ok(code.includes('Plus_Jakarta_Sans'), 'Loads Plus Jakarta Sans font');
  assert.ok(code.includes('JetBrains_Mono'), 'Loads JetBrains Mono font');
  assert.ok(code.includes('skip-to-content'), 'Includes skip-to-content accessibility link');
  assert.ok(code.includes('<TopInstitutionalBar />'), 'Mounts TopInstitutionalBar');
  assert.ok(code.includes('<InstitutionalNavbar />'), 'Mounts InstitutionalNavbar');
  assert.ok(code.includes('<InstitutionalFooter />'), 'Mounts InstitutionalFooter');
  assert.ok(code.includes('<GlobalSearchModal />'), 'Mounts GlobalSearchModal');
});
