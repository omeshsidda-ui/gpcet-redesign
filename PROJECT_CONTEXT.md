# Project Context & Knowledge Base: GPCET Website Scraper & Redesign

## 1. Project Background & Objective
- **Institution**: G. Pullaiah College of Engineering and Technology (GPCET), Kurnool, Andhra Pradesh, India.
  - Autonomous engineering college affiliated with JNTUA (Jawaharlal Nehru Technological University, Anantapur).
  - Accredited by NAAC with 'A+' Grade, NBA accredited programs (CSE, ECE, EEE, ME, CE), AICTE approved.
- **Current Live Site**: [`https://www.gpcet.ac.in/`](https://www.gpcet.ac.in/)
- **Core Motivation**: The user is a Computer Science and Engineering (CSE) student at GPCET who wants to completely overhaul and modernize the outdated 2015-era college website.
- **Goal**: Ingest 100% of the live website's text, tables, academic data, faculty rosters, and document links, structure it into clean, typed Markdown and JSON, and rebuild the portal from the ground up using **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS**.

---

## 2. Technical Audit of the Live Website
Network reconnaissance and CMS inspection revealed:
1. **CMS & Backend**: WordPress 6.x hosted on Apache with PHP 7.2.
2. **Theme & Builder**: Avada Theme powered by Fusion Builder (`fusion-fullwidth`, `fusion-builder-row`, `fusion-text`, `fusion-table`).
3. **Public WordPress REST API**:
   - The REST API endpoint `/wp-json/wp/v2/` is **100% public, active, and unthrottled**.
   - Allowed direct batch fetching (`per_page=100`) without scraping HTML via slow headless browsers.
4. **Volume Inventory**:
   - **928 Pages** (`/wp-json/wp/v2/pages`)
   - **5,253 Media Attachments** (`/wp-json/wp/v2/media`)
   - **20 Avada Portfolio Projects** (`/wp-json/wp/v2/avada_portfolio`)
   - **6 Avada FAQs** (`/wp-json/wp/v2/avada_faq`)
   - **2 Posts** (`/wp-json/wp/v2/posts`)
   - **569 Additional Hardcoded Upload Links** discovered during page body parsing (non-library uploads).
   - **XML Sitemaps** at `https://www.gpcet.ac.in/wp-sitemap.xml`.

---

## 3. Scraper Pipeline Architecture

The scraper is implemented in modular Node.js ESM located in `scraper/`:

```
scraper/
├── config.js              # Network settings, endpoints, paths, department seeds
├── client.js              # Resilient fetch client with retries, exponential backoff, rate limiting
├── raw-fetcher.js         # Stage 1: Paginated WP REST ingestion and homepage DOM widget scraper
├── html-parser.js         # Stage 2: Dual Avada cleaner, resilient table parser, Turndown MD converter
├── content-organizer.js   # Stage 2: Multi-hop BFS link-graph classifier, URL rewriter, faculty aggregator
├── asset-downloader.js    # Stage 3: Media manifest generator and core brand asset downloader
└── cli.js                 # Unified CLI runner with granular commands
```

### CLI Commands Available (`package.json`)
```bash
npm run scrape:verify    # Verify API connectivity and total counts
npm run scrape:cache     # Run Stage 1: Fetch and cache all raw data to /cache (resumable)
npm run scrape:parse     # Run Stage 2: BFS classify, clean Avada HTML, extract tables, rewrite links
npm run scrape:manifest  # Run Stage 3: Index all 5,822 PDFs/media in src/data/media-manifest.json
npm run scrape:assets    # Run Stage 3: Download logos, badges, and campus photos to public/assets
npm run scrape:all       # Run entire pipeline end-to-end
```

---

## 4. Key Edge Cases Solved & Implementation Logic

### Edge Case 1: 927 out of 928 Pages had `parent: 0` (Flat WP Hierarchy)
- **Problem**: In the WordPress database, the site creators never assigned parent IDs. All pages lived in a flat namespace with inconsistent slugs (e.g. `27212-2`, `14235-2`, `events-3`).
- **Solution**: Implemented a **Multi-Hop Breadth-First Search (BFS)** starting from:
  1. Department root pages (`/cse_home/`, `/ai_home/`, `/ece_home/`, `/eee_home/`, `/me_home/`, `/civil_home-2/`, `/hs_home/`, `/mba_home/`).
  2. Homepage Mega-Menu categories (`Academics`, `Placements`, `Research`, `About Us`, `Student Resources`).
  3. Secondary heuristic and keyword classifier for remaining orphans.
- **Result**: Successfully categorized 936 pages into domain-specific folders, reducing unlinked orphans from 478 down to only 206 true legacy pages.

### Edge Case 2: Dual Avada Cleaning
- **Problem**: Avada leaves unexpanded shortcodes (`[fusion_*]`) and renders heavily nested wrappers (`.fusion-builder-row`, `.fusion-text`, `.fusion-table`, inline styles, empty `span` tags).
- **Solution**: `html-parser.js` runs regex to eliminate stray shortcodes, loads DOM into Cheerio to unwrap builder containers and strip styling attributes, and converts clean semantic HTML to GitHub-Flavored Markdown via Turndown.

### Edge Case 3: Preserving Document Links & Photos in 632 Tables
- **Problem**: PDFs (syllabus, circulars) and faculty photos are embedded inside `<td>` cells. Using `.text()` destroys all document links and photo references. Multi-line cells also break Markdown table rendering.
- **Solution**:
  - `parseTable()` in `html-parser.js` explicitly detects `<a>` tags inside cells and converts them to Markdown links `[Text](url)`.
  - Prioritizes `data-orig-src` on lazyloaded images to bypass inline SVG placeholders (`data:image/svg+xml...`).
  - Flattens cell content (replaces newlines with `<br />` and escapes pipes `\|`) so GitHub-Flavored Markdown tables never break.
  - Normalizes fuzzy table headers (`S.No` vs `Sl.No`, `Faculty Name` vs `Name of the Faculty`).

### Edge Case 4: URL Rewriting & Link Mapping
- **Problem**: Old internal links pointing to `https://www.gpcet.ac.in/...` would bounce users back to the old site.
- **Solution**: `content-organizer.js` generates `src/data/url-map.json` (2,784 mappings) and rewrites all internal links across the Markdown files to their new Next.js routes (e.g. `/departments/cse/events`, `/departments/ai/peos`). Upgrades all `http://` upload links to `https://`.

### Edge Case 5: Missing Faculty Rows Discovered in Individual Profile Pages
- **Problem**: In Mechanical (ME), Civil, and EEE, the main department faculty page only contained a short summary table (6 to 10 senior members).
- **Solution**: The scraper discovered **213 individual faculty profile pages** (e.g. `p-malathi`, `dr-s-m-ravi-kumar-2`, `chinnaveeresh`, `eee_girija`) containing qualifications, bio, subjects taught, and photos. The scraper aggregated summary tables + individual profile pages + Board of Studies rosters into unified, deduplicated JSON rosters:
  - **CSE**: 72 faculty
  - **CIVIL**: 96 faculty
  - **HS**: 80 faculty
  - **ECE**: 70 faculty
  - **EEE**: 65 faculty
  - **AI**: 30 faculty
  - **ME**: 23 faculty
  - **MBA**: 16 faculty
  - **Total**: **452 faculty members** stored in `src/data/faculty/*.json`.

---

## 5. Current Data Inventory & File Locations

### Raw Ingestion Cache (`cache/`)
- `cache/pages.json`: All 928 raw WordPress page objects.
- `cache/media.json`: All 5,253 raw WordPress media objects.
- `cache/portfolio.json`: 20 Avada portfolio items.
- `cache/faqs.json`: 6 Avada FAQ records.
- `cache/posts.json`: 2 legacy blog posts.
- `cache/homepage.html` & `cache/homepage_widgets.json`: Raw homepage HTML, marquees, sliders, flash notices, and mega-menu navigation tree.

### Structured Markdown Content (`content/`)
- `content/departments/`:
  - `cse/` (91 pages + sub-sections: `peos`, `board-of-studies`, `laboratories`, `events`, `online-resources`)
  - `ece/` (68 pages)
  - `me/` (59 pages)
  - `civil/` (56 pages)
  - `eee/` (50 pages)
  - `mba/` (17 pages)
  - `hs/` (15 pages)
  - `ai/` (11 pages)
  - `[dept]/faculty/` (individual faculty profile markdown files with degrees, bios, and subjects)
- `content/accreditation/`:
  - `naac/` (48 pages for NAAC SSR Criteria 1-7 metrics: 3.4.3, 5.3.3, 6.5.2, etc.)
  - General accreditation pages (20 pages: AICTE, NBA, NIRF, Autonomous status, IQAC, AQAR)
- `content/administration/` (16 pages: Governing Body, Academic Council, Finance Committee, Grievance Cell, Anti-Ragging)
- `content/campus-life/` (19 pages: Central Library, Digital Library, Sports, Hostel, Medical, Clubs, NSS, NCC)
- `content/research/` (18 pages: Research supervisors, funded projects, patents, journals)
- `content/examinations/` (8 pages: Results portal, exam regulations, hall tickets)
- `content/admissions/` (7 pages: Intake, fee structure, eligibility)
- `content/placements/` (6 pages: Placement introduction, recruiters, statistics)
- `content/archive-or-orphan/` (206 pages: archived historical notices)

### Strongly-Typed Data & Manifests (`src/data/`)
- `src/data/faculty/*.json`: 8 department JSON files with 452 structured faculty records (`sno`, `name`, `designation`, `qualification`, `department`, `photoUrl`, `profileRoute`).
- `src/data/media-manifest.json`: 5,822 indexed media items (382 syllabus docs, 2,846 general PDFs, 42 academic calendars, 20 exam timetables, 1,625 campus images).
- `src/data/url-map.json`: 2,784 legacy URL $\rightarrow$ Next.js route mappings.
- `src/data/downloaded-assets.json`: Index of locally downloaded brand, campus, and leadership assets.
- `src/data/classification-report.json`: Coverage statistics and section distribution.

### Public Assets (`public/assets/`)
- `public/assets/brand/`: AICTE Idea Lab, NIRF, NBA, NAAC A+, UGC, JNTUA affiliation crests, IEEE logo.
- `public/assets/campus/`: College entrance gate, Central Library, Digital Library, campus buildings.
- `public/assets/leadership/`: Chairman, Vice-Chairman, Principal, Dean Dr. M Srilakshmi.

---

## 6. Installed Agent Skills Ecosystem (Frontend, Backend & Security)

The workspace is equipped with a comprehensive suite of 26 specialized skills located in [`.agents/skills/`](./.agents/skills/), fully configured for AI pair programming across frontend design, backend systems, database engineering, and application security:

### A. Frontend Design & Anti-AI-Slop Suite
- [`frontend-design`](./.agents/skills/frontend-design/SKILL.md) *(Anthropic)*: Drives foundational art direction, typography pairings, color systems, and eliminates generic templates.
- [`frontend-app-builder`](./.agents/skills/frontend-app-builder/SKILL.md) *(OpenAI)*: Section-by-section concept design, design token extraction, and 10/10 browser-tested visual fidelity.
- [`design-taste-frontend`](./.agents/skills/design-taste-frontend/SKILL.md) *(Leonxlnx)*: Editorial layout directions and anti-slop rules distilled from 247 award-winning websites.
- [`impeccable`](./.agents/skills/impeccable/SKILL.md) *(pbakaus)*: Design polish commands (`critique`, `audit`, `polish`, `distill`, `bolder`) and deterministic checks for AI design tells.
- [`web-design-guidelines`](./.agents/skills/web-design-guidelines/SKILL.md) *(Vercel)*: Quality audit for WCAG AA accessibility, responsive breakpoints, and interaction ergonomics.
- [`frontend-skill`](./.agents/skills/frontend-skill/SKILL.md) *(OpenDesign)*: Production frontend playbook focusing on restrained composition and strong visual theses.

### B. Backend, API & Database Architecture Suite
- [`create-a-backend`](./.agents/skills/create-a-backend/SKILL.md) *(Vercel)*: Strategic backend guidance across Serverless Functions, Microservices, Containers, Daemons, and Queues.
- [`api-design-skills`](./.agents/skills/api-design-skills/SKILL.md): Production-grade API architecture, OpenAPI 3.x contract design, RFC 9457 error catalogs, and pagination.
- [`supabase`](./.agents/skills/supabase/SKILL.md) *(Supabase)*: Next.js 15 App Router `@supabase/ssr` auth session handling, Edge Functions, Storage buckets, and vector search.
- [`supabase-postgres-best-practices`](./.agents/skills/supabase-postgres-best-practices/SKILL.md) *(Supabase)*: Relational schema design, GIN/B-Tree indexing, connection pooling, and bulletproof Row Level Security (RLS) policies.
- [`workflow`](./.agents/skills/workflow/SKILL.md) *(Vercel)*: Durable execution pipelines, multi-step scraper updates, background data syncs, and crash-safe retries.

### C. Application Security & Vulnerability Defense Suite
- [`security-review`](./.agents/skills/security-review/SKILL.md) *(Sentry)*: Deep interprocedural data-flow analysis tracing untrusted user input to sensitive sinks with high-confidence reporting.
- [`code-security`](./.agents/skills/code-security/SKILL.md) *(Semgrep)*: Secure coding guidelines covering SQLi, XSS, SSRF, JWT validation, and IDOR prevention.
- [`semgrep`](./.agents/skills/semgrep/SKILL.md) *(Semgrep)*: Static analysis scan execution and custom YAML detection rule creation across 30+ languages.
- [`codeql`](./.agents/skills/codeql/SKILL.md) *(Trail of Bits)*: Interprocedural taint analysis and SAST queries for complex vulnerability detection.
- [`sharp-edges`](./.agents/skills/sharp-edges/SKILL.md) *(Trail of Bits)*: Auditing error-prone APIs, footgun configurations, and enforcing secure-by-default contracts.
- [`supply-chain-risk-auditor`](./.agents/skills/supply-chain-risk-auditor/SKILL.md) *(Trail of Bits)*: Dependency security auditing, lockfile CVE matching, and install-script audits.
- [`audit-context-building`](./.agents/skills/audit-context-building/SKILL.md) *(Trail of Bits)*: Pre-audit architectural reconnaissance to map trust boundaries, data flows, and invariants.
- [`secret-scanning`](./.agents/skills/secret-scanning/SKILL.md) *(GitHub)*: Detecting committed credentials, API tokens, and configuring pre-commit push protection.
- [`owasp-top-10`](./.agents/skills/owasp-top-10/SKILL.md) *(Microsoft / OWASP)*: 2025 OWASP Top 10 Web Application Security normative references and checklists.
- [`sarif-parsing`](./.agents/skills/sarif-parsing/SKILL.md) *(Trail of Bits)*: Aggregating, deduplicating, and triaging SARIF outputs from CodeQL and Semgrep.

### D. Documentation Synchronization & Context Continuity Suite
- [`docs-sync`](./.agents/skills/docs-sync/SKILL.md) *(Custom In-House)*: Inspects git diffs at session end, updates authoritative files in `docs/`, and maintains `SESSION_HANDOFF.md`.
- [`documentation-and-adrs`](./.agents/skills/documentation-and-adrs/SKILL.md) *(Addy Osmani)*: Generates and maintains Architecture Decision Records (ADRs), API docs, and changelogs.
- [`adr-skill`](./.agents/skills/adr-skill/SKILL.md) *(SkillRecordings)*: Structured ADR authoring with trade-offs, consequences, and verification requirements.
- [`create-project`](./.agents/skills/create-project/SKILL.md) *(hrdtbs)*: Persists multi-session execution plans, TODOs, and design decisions for future agent resumption.
- [`go-project`](./.agents/skills/go-project/SKILL.md) *(hrdtbs)*: Resumes and advances tasks from persistent project plans without context loss.

---

## 7. Next Steps & Authoritative Implementation Plans
- Master Next.js 15 Redesign Plan: [`NEXTJS_REDESIGN_PLAN.md`](./NEXTJS_REDESIGN_PLAN.md)
- High-Level Implementation Plan: [`docs/PLAN.md`](./docs/PLAN.md)
- Actionable Phase-by-Phase Checklist: [`docs/TODO.md`](./docs/TODO.md)
- Anti-Slop Design System & Tokens: [`docs/references/design-system-and-anti-slop.md`](./docs/references/design-system-and-anti-slop.md)
- Institutional Page Blueprints: [`docs/references/page-blueprints.md`](./docs/references/page-blueprints.md)
- Agent Operating Rules: [`AGENTS.md`](./AGENTS.md)

