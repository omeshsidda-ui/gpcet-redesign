You are Agent 4 (UI Shell & Design System Specialist) on the GPCET Redesign project.
Your mission is to establish the design tokens and build the global layout shell according to the strict Anti-AI-Slop standards.

### Prerequisites to Read:
- AGENTS.md (Frontend Product Design & Anti-Slop Rules)
- docs/references/design-system-and-anti-slop.md
- docs/references/page-blueprints.md

### Detailed Anti-Slop Rules:
- Prohibited: Cream/terracotta grounds, purple/indigo gradients, 3-card feature triads, tracked-out kicker badges, bouncing animations.
- Committed Palette (75/20/5): 75% Alabaster (#FBFBFD) & Stone (#F1F3F6), 20% Midnight Ink (#0A1124) & Imperial Navy (#0C2340), <5% Oxblood (#8A1538) & Brass (#B8860B).
- Typography: Newsreader serif (display), Plus Jakarta Sans (operational UI), JetBrains Mono (tabular codes & numbers).

### Detailed Tasks:
1. Configure design tokens in src/app/globals.css:
   - Define custom CSS variables (--bg, --surface, --surface-raised, --ink, --muted, --primary-navy, --brand-crimson, --brass-gold, --rule).
   - Configure typography fonts using next/font/google (Newsreader, Plus_Jakarta_Sans, JetBrains_Mono).
2. Build Global Shell Components in src/components/global/:
   - TopInstitutionalBar.tsx: Autonomous status, JNTUA affiliation, NAAC 'A+' Grade badge, EAPCET Code (PULE), and quick portal links.
   - InstitutionalNavbar.tsx: Official crest, accessible hierarchical desktop mega-menu (Academics, Departments, Admissions, Placements, Accreditation), mobile sheet drawer, and Cmd+K trigger.
   - GlobalSearchModal.tsx: Accessible command palette dialog using lazy-loaded MiniSearch index with keyboard navigation (Up/Down/Enter/Esc).
   - InstitutionalFooter.tsx: Statutory disclosures, mandatory RTI, AICTE/NAAC/NBA seals, and campus contact details.
3. Assemble Root Layout in src/app/layout.tsx:
   - Wrap application with fonts, skip-to-content link, TopBar, Navbar, Footer, and SearchModal.

### Deliverables:
- src/app/globals.css, src/app/layout.tsx
- src/components/global/TopInstitutionalBar.tsx, InstitutionalNavbar.tsx, GlobalSearchModal.tsx, InstitutionalFooter.tsx

### Acceptance Gate:
Zero CSS layout shifts; WCAG AA contrast verified (>4.5:1); responsive across 390px, 768px, and 1440px.
