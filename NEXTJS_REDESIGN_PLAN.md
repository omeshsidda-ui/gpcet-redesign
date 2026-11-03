# GPCET Institutional Web Portal: Next.js 15 App Router & Anti-Slop Design System Architecture

> **Institutional Truth**: G. Pullaiah College of Engineering & Technology (GPCET), Kurnool, Andhra Pradesh. Autonomous engineering institution affiliated with JNTU Anantapur, accredited by NAAC with **'A+' Grade** (Cycle 2), and NBA accredited across undergraduate programs (CSE, ECE, EEE, ME, CE).  
> **Source Corpus**: 936 ingested Markdown pages, 452 verified faculty records across 8 departments, 5,822 indexed media/syllabus documents, and 630 normalized academic data tables.  
> **Architectural Paradigm**: Next.js 15 (App Router) + React 19 + TypeScript 5.5 + Tailwind CSS v4 + Zero-JS Server Components by default.

---

## 1. Design Philosophy & Anti-AI-Slop Manifest

Most AI-generated redesign plans default to a homogenized "SaaS template" formula: a centered three-line headline, a floating pill badge with an all-caps micro-label ("EXPLORE EXCELLENCE"), a row of identical three-column cards with soft gray drop shadows, floating violet or terracotta gradients, and fake metric widgets.

For an elite autonomous engineering college with two decades of regional legacy, that generic playbook is fundamentally inappropriate. GPCET's digital presence must feel like an **architectural academic monolith and civic gazette**: grounded, authoritative, technically rigorous, and unmistakably permanent.

```
       +---------------------------------------------------------------------------------------+
       |                                GPCET ARCHITECTURAL IDENTITY                            |
       |                   The Civic Academic Monolith & High-Density Gazette                   |
       +---------------------------------------------------------------------------------------+
                                                   |
              +------------------------------------+------------------------------------+
              |                                                                         |
+-------------v-------------+                                             +-------------v-------------+
|    MATERIAL & RESTRAINT   |                                             |    INFORMATION AS ART     |
| Ground: Architectural     |                                             | Real Data over Decoration |
|         Alabaster & Slate |                                             | Tabular Registers         |
| Ink:    Obsidian Deep     |                                             | Strict 42% Editorial Axis |
| Brand:  Heritage Imperial |                                             | Asymmetric Spreads        |
|         Navy & Oxblood    |                                             | Zero Bouncing Slop        |
| Accent: <5% Restraint     |                                             | True 452 Faculty /        |
|         (Burnished Brass) |                                             | 5,822 Indexed Documents   |
+---------------------------+                                             +---------------------------+
```

### Absolute Anti-Slop Bans (Enforced per `impeccable` & `design-taste-frontend`)
1. 🚫 **No Cream + Terracotta/Clay**: Yellow-cream grounds (`#F4F1EA`) with terracotta/rust accents (`#D97757`) are the generic AI generator fingerprint. They are strictly banned.
2. 🚫 **No Violet/Purple/Indigo Gradients**: Purple glows, indigo button washes, and neon radial background blobs are banned.
3. 🚫 **No Gradient-Filled Headline Text**: Headings must be solid, high-contrast ink. Emphasis is established through weight, scale, and typographic voice—never colored text fills.
4. 🚫 **No Floating SaaS Card Triads**: Eliminate generic 3-card grids (`rounded-2xl shadow-xl p-8 bg-white border border-slate-100`). Content belongs in asymmetric editorial spreads, structured tabular registers, or monolithic full-width surface bands.
5. 🚫 **No Kicker Badges / Micro-Eyebrows**: Banned tracked-out uppercase kicker tags (`<span className="text-xs uppercase tracking-widest text-indigo-500">WELCOME TO GPCET</span>`). Headings carry their own semantic weight.
6. 🚫 **No Fake Cosmetic Status Dots**: Remove pulsing green/blue dots ("Admissions Open", "Live") unless actively indicating a real-time WebSocket connection state.
7. 🚫 **No Unorchestrated Animations**: Banned scroll-triggered bounce, fade-and-rise on every single card, and infinite marquee loops. The interface uses a single, deliberate page-load reveal, followed by instantaneous, crisp (150ms) state transitions for user interactions.
8. 🚫 **No Placeholder Copy**: Every statistic, quote, regulation code (e.g., `R20`, `R19`), and department metric is drawn directly from the verified 936-page dataset.

---

## 2. Premium Design Tokens & Color Architecture

Color proportions follow the strict **75 / 20 / 5** institutional distribution rule: 75% neutral architectural ground, 20% high-contrast ink & structural navy, and less than 5% high-visibility crimson/brass accent reserved strictly for primary actions, critical alerts, and accreditation seals.

```
       75% Surface Ground                    20% Ink & Structural Navy       <5% Accent
[--------------------------------------------|------------------------|--------]
  --bg / --surface (Alabaster / Slate)         --ink / --primary-navy   --crimson / --brass
```

### The Institutional Palette

| Token Role | CSS Variable | Light Mode (Default) | Dark Mode (Nocturne) | WCAG Contrast Ratio & Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Ground** | `--bg` | `#FBFBFD` (Alabaster) | `#070B14` (Deep Obsidian) | Base background; crisp, glare-free architectural canvas. |
| **Surface Step** | `--surface` | `#F1F3F6` (Muted Stone) | `#0E1524` (Midnight Slate) | Subtle 3-point lightness shift for sidebars, filters, table headers. No borders needed. |
| **Surface Raised**| `--surface-raised`| `#FFFFFF` (Pure White) | `#141D30` (Navy Charcoal) | Elevated cards, document rows, active modals. Hard clean edge. |
| **Ink (Primary)** | `--ink` | `#0A1124` (Midnight Ink) | `#F8FAFC` (Crisp Alabaster) | **14.2:1** contrast. Primary headlines, body text, table data. |
| **Muted Ink** | `--muted` | `#4B5565` (Slate Graphite)| `#94A3B8` (Silver Slate) | **5.8:1** contrast. Metadata, timestamps, file sizes, course codes. |
| **Primary Navy** | `--primary-navy` | `#0C2340` (Imperial Navy)| `#1A3B66` (Structural Cobalt)| Civic foundation; masthead, primary navigation, formal leadership bands. |
| **Brand Crimson**| `--brand-crimson`| `#8A1538` (Academic Oxblood)| `#A82246` (Vivid Crimson) | **5.1:1** on light ground. Selective action buttons, critical notices, crest core. |
| **Heritage Brass**| `--brass-gold` | `#B8860B` (Burnished Brass)| `#D4AF37` (Antique Gold) | **4.6:1** contrast. Exclusively for NAAC 'A+' seals, Autonomous status, BoS pins. |
| **Hairline Rule** | `--rule` | `rgba(10, 17, 36, 0.08)` | `rgba(248, 250, 252, 0.1)` | Structural dividers; only 1px where semantic separation is mandatory. |

```css
/* styles/tokens.css */
@layer base {
  :root {
    --bg: #FBFBFD;
    --surface: #F1F3F6;
    --surface-raised: #FFFFFF;
    --ink: #0A1124;
    --muted: #4B5565;
    --primary-navy: #0C2340;
    --brand-crimson: #8A1538;
    --brass-gold: #B8860B;
    --rule: rgba(10, 17, 36, 0.08);

    /* Typography Scale */
    --font-display: 'Newsreader', Georgia, serif;
    --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', SFMono-Regular, monospace;
    
    /* Strict Radius Scale */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
  }

  .dark {
    --bg: #070B14;
    --surface: #0E1524;
    --surface-raised: #141D30;
    --ink: #F8FAFC;
    --muted: #94A3B8;
    --primary-navy: #1A3B66;
    --brand-crimson: #A82246;
    --brass-gold: #D4AF37;
    --rule: rgba(248, 250, 252, 0.1);
  }
}
```

---

## 3. Typographic System & Hierarchy

Typography is the core architecture of the website. Rather than relying on a single neutral sans-serif or adding artificial decorative stickers, the interface establishes an intentional dialogue between **technical precision** and **collegiate dignity**:

1. **Display & Dignified Voice**: *Newsreader* (or *Merriweather* / *Playfair Display* fallback)
   - Used for: Institutional statements, Principal & Chairman addresses, NAAC SSR criterion overviews, Convocation headers.
   - Character: Optical size grading, tight tracking (`-0.02em`), confident sentence-case.
2. **Operational & Structural Voice**: *Plus Jakarta Sans* (or *Inter* / *Geist* fallback)
   - Used for: Global navigation, mega-menus, department tabs, document search, faculty rosters, syllabus lists.
   - Character: Crisp geometry, tall x-height, high legibility across mobile viewports.
3. **Tabular Numerals & Codes**: *JetBrains Mono* / `tabular-nums`
   - Used for: Regulation codes (`R20`, `R19`), NAAC metric numbering (`3.4.3`, `5.3.3`), document file sizes (`2.4 MB`), dates (`2026-10-31`), intake counts (`360`).

```
+---------------------------------------------------------------------------------------+
| TYPOGRAPHY SCALE & APPLICATION MATRIX                                                  |
+----------------+-------------------------------+--------------+-----------------------+
| Token Step     | Computed Size / Line-Height   | Font Family  | Primary Target        |
+----------------+-------------------------------+--------------+-----------------------+
| `--text-hero`  | clamp(2.75rem, 5vw, 4.25rem)  | Serif (500)  | Homepage Title        |
| `--text-title` | clamp(2.00rem, 3.5vw, 2.75rem)| Serif (600)  | Dept & Section H1     |
| `--text-h2`    | clamp(1.50rem, 2.2vw, 1.875rem)| Sans (700)   | Page Section Titles   |
| `--text-lead`  | clamp(1.125rem, 1.4vw, 1.35rem)| Serif (400)  | Section Standfirsts   |
| `--text-body`  | 1rem (16px) / 1.6             | Sans (400)   | Body Text (max 72ch)  |
| `--text-meta`  | 0.8125rem (13px) / 1.4        | Sans (500)   | Table Data & Badges   |
| `--text-code`  | 0.8125rem (13px) / Tabular    | Mono (500)   | NAAC IDs & File Sizes |
+----------------+-------------------------------+--------------+-----------------------+
```

---

## 4. Next.js 15 App Router Directory Architecture

The system is architected to leverage Next.js 15 React Server Components (RSC) for instantaneous sub-100ms First Contentful Paint (FCP) and static optimization (`output: 'standalone'`). Client components are isolated strictly to interactive user affordances (Search Command Palette, Faculty dynamic filtering, Document Vault pagination, and Mobile Menu drawer).

```
src/
├── app/
│   ├── layout.tsx                     # Institutional shell: TopBar + Header + Footer + CommandPalette
│   ├── page.tsx                       # Institutional Homepage: Editorial split hero + Live Gazette
│   ├── not-found.tsx                  # Custom institutional 404 with route recovery
│   ├── error.tsx                      # RFC 9457 problem recovery boundary
│   │
│   ├── departments/
│   │   ├── page.tsx                   # 8-Department Matrix overview (intake, HODs, labs)
│   │   └── [dept]/
│   │       ├── layout.tsx             # Persistent sub-navigation (Overview, Faculty, Labs, BoS, Events)
│   │       ├── page.tsx               # Department Overview (Vision, Mission, PEOs, Facilities)
│   │       ├── faculty/
│   │       │   ├── page.tsx           # Searchable & filterable roster (452 faculty records)
│   │       │   └── [slug]/
│   │       │       └── page.tsx       # Individual Scholar Profile (Ph.D., research, subjects)
│   │       ├── laboratories/
│   │       │   └── page.tsx           # Lab inventory with equipment & software specs
│   │       ├── board-of-studies/
│   │       │   └── page.tsx           # BoS member roster, syllabus approvals, meeting minutes
│   │       ├── syllabus/
│   │       │   └── page.tsx           # Direct download table for R20/R19 course structures
│   │       └── [...slug]/
│   │           └── page.tsx           # Fallback static renderer for 430+ department sub-pages
│   │
│   ├── documents/
│   │   └── page.tsx                   # Central Document & Syllabus Vault (5,822 indexed files)
│   │
│   ├── accreditation/
│   │   ├── page.tsx                   # Accreditation Gateway (NAAC A+, NBA, AICTE, NIRF)
│   │   ├── naac/
│   │   │   ├── page.tsx               # NAAC SSR Criteria 1–7 Interactive Matrix
│   │   │   └── [criteria]/
│   │   │       └── page.tsx           # Deep metric explorer (e.g., metric 3.4.3, 5.3.3)
│   │   └── nba/
│   │       └── page.tsx               # NBA tier-1 accreditation status for CSE, ECE, EEE, ME, CE
│   │
│   ├── administration/
│   │   ├── page.tsx                   # Governing Body, Academic Council & Leadership Directory
│   │   └── statutory-committees/
│   │       └── page.tsx               # Anti-Ragging, Grievance Redressal, Internal Quality (IQAC)
│   │
│   ├── admissions/
│   │   └── page.tsx                   # B.Tech / M.Tech / MBA Intake, Eligibility & EAPCET Codes
│   │
│   ├── placements/
│   │   └── page.tsx                   # Recruiter records, statistics, salary packages, MoUs
│   │
│   ├── campus-life/
│   │   └── page.tsx                   # Central Library, Digital Labs, Hostels, Sports, NSS/NCC
│   │
│   └── research/
│       └── page.tsx                   # AICTE Idea Lab, Patents, Funded Grants, IEEE Student Branch
│
├── components/
│   ├── global/
│   │   ├── TopInstitutionalBar.tsx    # Autonomous status, JNTUA affiliation, Quick student portal
│   │   ├── InstitutionalNavbar.tsx    # Accessible desktop mega-menu & mobile drawer
│   │   ├── GlobalSearchModal.tsx      # Sub-5ms Cmd+K command palette (Fuse.js client)
│   │   └── InstitutionalFooter.tsx    # Full statutory strip, accreditation seals, RTI
│   │
│   ├── home/
│   │   ├── AsymmetricHeroSpread.tsx   # 58/42 split: Institutional mandate + Live Gazette
│   │   ├── LiveAcademicGazette.tsx    # Real-time verified circulars & exam timetables
│   │   ├── DepartmentalMatrix.tsx     # Monolithic register of 8 departments (no generic cards)
│   │   ├── LeadershipDiscourse.tsx    # Editorial quotes from Chairman & Principal with real assets
│   │   └── InstitutionalMetricsBand.tsx# Raw intake, NAAC score, placements rendered in tabular mono
│   │
│   ├── departments/
│   │   ├── DepartmentHeader.tsx       # Department title, HOD badge, NBA validity tag
│   │   ├── DepartmentTabs.tsx         # Sticky sub-nav with accessible aria-selected
│   │   ├── FacultyRosterTable.tsx     # Client-side instant filter by designation & qualification
│   │   └── FacultyProfileView.tsx     # Rich scholar dossier (degrees, papers, contact)
│   │
│   ├── documents/
│   │   ├── DocumentVaultClient.tsx    # Instant search, category tabs (Syllabus, Timetables, etc.)
│   │   └── DocumentRow.tsx            # High-density row with mime-type badge, size, download
│   │
│   └── naac/
│       ├── CriteriaMatrixGrid.tsx     # Criteria 1 to 7 interactive accordion & metric links
│       └── MetricViewer.tsx           # Markdown renderer with sanitized data tables
│
├── lib/
│   ├── content.ts                     # File-system crawler reading 936 Markdown files with gray-matter
│   ├── faculty.ts                     # Strongly-typed getters for 452 records across 8 JSON files
│   ├── documents.ts                   # Fast index & search for 5,822 media-manifest items
│   ├── navigation.ts                  # Hierarchical mega-menu tree definitions
│   └── types.ts                       # Complete TypeScript contracts (Faculty, Document, Page)
│
└── data/                              # Read-only extracted datasets (already ingested)
    ├── faculty/*.json                 # 8 Department rosters (452 faculty)
    ├── media-manifest.json            # 5,822 cataloged files
    ├── url-map.json                   # 2,784 legacy URL rewrites
    └── classification-report.json     # Content taxonomy verification
```

---

## 5. Blueprint: Institutional Homepage (`/`)

The homepage rejects the standard AI blueprint of centered hero + 3-card features. Instead, it implements an **Asymmetric Academic Gazette Layout** organized along a strict **42% editorial axis**.

```
+---------------------------------------------------------------------------------------------------+
| TOP INSTITUTIONAL BAR: Autonomous | JNTUA Affiliated | NAAC 'A+' | EAPCET Code: PULE | Student Portal |
+---------------------------------------------------------------------------------------------------+
| NAVBAR: [GPCET Crest]  Academics  Departments  Admissions  Placements  Accreditation  [Search ⌘K] |
+---------------------------------------------------------------------------------------------------+
| ASYMMETRIC HERO SPREAD (75vh)                                                                     |
|                                                                                                   |
| <--- Left Column (58%): Institutional Thesis --->   <--- Right Column (42%): Academic Gazette -> |
|                                                     |                                             |
| [Newsreader Serif 56px]                             | [URGENT DISPATCH & AUTONOMOUS CIRCULARS]    |
| An Autonomous Engineering                           | • B.Tech IV Year II Sem Regular Timetable   |
| Citadel in Rayalaseema.                             |   PDF | Exam Cell | 2026-10-30              |
|                                                     | • R20 Regulation Academic Calendar 2026-27  |
| Grounded in academic rigor, technical invention,    |   PDF | Autonomous Office | 2026-10-28      |
| and civic responsibility since 2007.                | • Infosys & TCS Campus Drive Shortlist      |
|                                                     |   PDF | Training & Placements | 2026-10-25  |
| [Tabular Stats Bar]                                 | • AICTE Idea Lab Student Innovation Cohort  |
| CSE Intake: 360 | NAAC: A+ | NIRF: Ranked           |   PDF | Research Cell | 2026-10-22          |
|                                                     |                                             |
| [Primary CTA: Browse Documents] [Explore Branches]  | [View All 5,822 Cataloged Documents →]     |
+---------------------------------------------------------------------------------------------------+
| MONOLITHIC REGISTER: Academic Departments (8 Disciplines)                                         |
| [No card triads. A structured horizontal register with Intake, HOD, NBA Status, and BoS links]   |
| CSE (360) · AI&ML (180) · ECE (180) · EEE (60) · ME (60) · CIVIL (60) · H&S (80) · MBA (180)      |
+---------------------------------------------------------------------------------------------------+
| SCHOLARLY DISCOURSE: Leadership & Vision                                                          |
| [Full-bleed surface step with verified portraits from /assets/leadership/]                        |
| • Sri G. Pullaiah (Founder)                                                                       |
| • Sri G. Vamsidhar (Vice-Chairman)                                                                |
| • Dr. C. Srinivasa Rao (Principal)                                                                |
| • Dr. M. Srilakshmi (Dean & Professor, CSE)                                                       |
+---------------------------------------------------------------------------------------------------+
| AICTE IDEA LAB & RESEARCH EXCELLENCE                                                              |
| Dedicated institutional showcase of lab infrastructure, patents, and IEEE student branch.       |
+---------------------------------------------------------------------------------------------------+
| INSTITUTIONAL FOOTER: Full statutory disclosures, RTI, JNTUA links, and accreditation crests    |
+---------------------------------------------------------------------------------------------------+
```

### Homepage Section Specifications

#### Section 1: Top Institutional Bar
- **Purpose**: Establishes regulatory authority immediately.
- **Content**: Autonomous status banner, affiliation with JNTUA Anantapur, NAAC Grade A+ recognition, EAPCET Code: `PULE`, quick links to Student Examination Results Portal and Grievance Cell.
- **Design Tokens**: Background `--primary-navy` (`#0C2340`), text pure white (`#FFFFFF`), subtle brass accent on NAAC Grade.

#### Section 2: Institutional Navbar & Mega-Menu
- **Purpose**: Clean, accessible hierarchy across 936 content nodes.
- **Structure**:
  - Left: Official GPCET crest + Typography wordmark.
  - Center: Semantic dropdowns (`Academics`, `Departments`, `Admissions`, `Placements`, `Accreditation`, `Campus Life`, `About`).
  - Right: Global Search Trigger (`Cmd + K`) displaying index status ("5,822 documents · 452 faculty").
- **Interaction**: Keyboard accessible (`Tab`, `Escape`, arrow navigation), zero click delay, `aria-expanded` attributes.

#### Section 3: Asymmetric Hero Spread
- **Left Column (58% width)**:
  - Display Headline: *"An Autonomous Engineering Citadel in Rayalaseema."* set in *Newsreader* (52px on desktop, tight leading `1.05`).
  - Standfirst: Two-sentence institutional statement describing 18 years of technical education, affiliated with JNTUA and accredited by NAAC with 'A+' Grade.
  - Institutional Key Indicators (Tabular Font):
    - `360` Computer Science & Engineering Intake
    - `A+` NAAC Accreditation (Cycle 2)
    - `5` NBA-Accredited Engineering Disciplines
    - `50+` Top-tier Recruiter Partnerships
  - Primary Action Buttons:
    - Primary Button (`bg-[#8A1538]` Crimson): *"Access Syllabus & Documents"* $\rightarrow$ `/documents`
    - Secondary Button (`border border-[#0C2340]` Navy): *"Explore Departments"* $\rightarrow$ `/departments`
- **Right Column (42% width)**:
  - **Live Academic Gazette Desk**: Displays the 5 latest autonomous circulars, exam notifications, and timetables parsed from `cache/`.
  - Each entry includes: Category tag (`EXAM CELL`, `AUTONOMOUS`, `CIRCULAR`), Title, Release Date, and a direct download icon with file size indicator.

#### Section 4: Monolithic Department Register
- Replaces generic 3-card grids with an architectural, tabular register.
- Columns:
  1. Department Code & Name (e.g., `05 - CSE: Computer Science & Engineering`)
  2. Degrees Offered (`B.Tech, M.Tech`)
  3. Intake Capacity (`360 Seats`)
  4. Faculty Count (`72 Faculty Members`)
  5. Accreditation Status (`NBA Accredited`)
  6. Action (`Open Department Portal →`)
- Includes an interactive quick-drawer to view the Head of Department (HOD) profile, department laboratories, and Board of Studies members without leaving the page.

#### Section 5: Institutional Leadership & Vision
- Dedicated full-width stone band (`--surface`) featuring verified local photography from `public/assets/leadership/`:
  - Sri G. Pullaiah (Founder & Chairman)
  - Sri G. Vamsidhar (Vice-Chairman)
  - Dr. C. Srinivasa Rao (Principal)
  - Dr. M. Srilakshmi (Dean & Professor)
- High-contrast, editorial layout featuring authentic messages and educational philosophies rather than generic blurbs.

---

## 6. Blueprint: Central Syllabus & Document Vault (`/documents`)

With **5,822 cataloged documents** (382 syllabi, 2,846 general PDFs, 42 academic calendars, 20 exam timetables, and 118 statutory forms), the document portal is the highest-utility interface on the campus website.

```
+---------------------------------------------------------------------------------------------------+
| CENTRAL SYLLABUS & DOCUMENT VAULT                                                                 |
| Real-time index of 5,822 official curriculum guides, academic regulations, and circulars          |
+---------------------------------------------------------------------------------------------------+
| [ Instant Debounced Search Input: "Search by subject, code (e.g. 20A05401), regulation, or title" ]|
+---------------------------------------------------------------------------------------------------+
| FACET CHIPS:                                                                                      |
| [All (5,822)]  [Syllabus (382)]  [Calendars (42)]  [Timetables (20)]  [NAAC Docs (58)]  [Forms]   |
| Department: [All Depts ▾]   Regulation: [R20 ▾] [R19 ▾] [R18 ▾]   Program: [UG (B.Tech) ▾] [PG ▾] |
+---------------------------------------------------------------------------------------------------+
| HIGH-DENSITY DOCUMENT DATA TABLE (Instant client-side filter with 25/50/100 pagination)           |
|                                                                                                   |
| Document Title                           Category      Scope / Dept   Regulation  Size     Action |
| ---------------------------------------  ------------  -------------  ----------  -------  ------ |
| B.Tech CSE Course Structure & Syllabi    Syllabus      Dept of CSE    R20 (UG)    2.4 MB   [PDF ↓]|
| I B.Tech Academic Calendar 2026-27       Calendar      Institutional  Autonomous  425 KB   [PDF ↓]|
| IV B.Tech II Sem Regular Exam Timetable  Timetable     Exam Cell      JNTUA/Auto  312 KB   [PDF ↓]|
| Board of Studies Meeting Minutes (CSE)   BoS Doc       Dept of CSE    R20 Series  1.1 MB   [PDF ↓]|
| AICTE Mandatory Disclosure 2026          Statutory     Institutional  AICTE/Gov   4.8 MB   [PDF ↓]|
+---------------------------------------------------------------------------------------------------+
| Showing 1–25 of 5,822 documents · Indexed directly from GPCET Ingestion Vault                     |
+---------------------------------------------------------------------------------------------------+
```

### Technical Implementation Details for `/documents`
1. **Zero-Latency In-Memory Filtering**: Ingest `src/data/media-manifest.json` at build time. For client interactions, instantiate a compact MiniSearch / Fuse index (~240KB gzipped) enabling instant (<5ms) keystroke filtering.
2. **Safe URL Streaming**: Every document link maps to the verified source URL stored in the manifest, upgrading legacy `http://` links to secure `https://` with `rel="noopener noreferrer"`.
3. **Deep Linkable URL State**: Search terms and active category tabs sync seamlessly with browser query parameters (`?q=syllabus&dept=cse&reg=r20`) using Next.js `useSearchParams()` without unnecessary page re-renders.

---

## 7. Blueprint: Department Portal & Faculty Directory (`/departments/[dept]`)

Each of the 8 academic departments (CSE, AI, ECE, EEE, ME, CIVIL, H&S, MBA) receives a dedicated sub-portal sharing a unified, accessible layout.

### A. Persistent Department Layout (`/departments/[dept]/layout.tsx`)
- **Department Header**: Official department title, established year, program intake, NBA accreditation status badge, and HOD contact.
- **Sticky Tabbed Sub-Navigation**:
  - `Overview` (`/departments/[dept]`)
  - `Faculty Directory` (`/departments/[dept]/faculty`) — **Searchable roster of all department faculty**
  - `Laboratories & Facilities` (`/departments/[dept]/laboratories`)
  - `Board of Studies (BoS)` (`/departments/[dept]/board-of-studies`)
  - `Curriculum & Syllabus` (`/departments/[dept]/syllabus`)
  - `Student Activities & Clubs` (`/departments/[dept]/student-activities`)
  - `Events & Workshops` (`/departments/[dept]/events`)

### B. Faculty Directory Specification (`/departments/[dept]/faculty/page.tsx`)
Powered by `src/data/faculty/*.json` (**452 structured faculty members**):
- **Filter Controls**:
  - Instant text filter by faculty name, qualification, or subject taught.
  - Designation filter pills: `All`, `Professors`, `Associate Professors`, `Assistant Professors`.
- **Roster Grid / Table Toggle**:
  - **High-Density Table View** (Default for desktop): Displays S.No, Faculty Name, Designation, Highest Qualification, Department, Profile Link.
  - **Dossier Card View**: Displays faculty photo (from `photoUrl` or academic silhouette placeholder), verified name, qualification, designation, and deep-link to individual profile.

### C. Individual Scholar Profile Specification (`/departments/[dept]/faculty/[slug]/page.tsx`)
- Renders rich Markdown dossiers extracted from `content/departments/[dept]/faculty/[slug].md`.
- Displays:
  - Complete Degrees Table (B.Tech, M.Tech, Ph.D. with graduating universities).
  - Subjects Taught & Teaching Interests.
  - Peer-Reviewed Publications (Scopus, IEEE, Springer, UGC Care).
  - Patents Granted & Published.
  - Professional Memberships (IEEE, CSI, ISTE).

---

## 8. Blueprint: NAAC SSR & Statutory Accreditation Hub (`/accreditation/naac`)

GPCET holds an **'A+' Grade** from NAAC (Cycle 2). The portal features a dedicated statutory hub mapping all **48 rescued NAAC criteria metric Markdown pages** (`content/accreditation/naac/`).

```
+---------------------------------------------------------------------------------------------------+
| NAAC ACCREDITATION & SSR METRICS EXPLORER                                                         |
| National Assessment and Accreditation Council (NAAC) · Institutional Cycle 2 SSR Portfolio       |
+---------------------------------------------------------------------------------------------------+
| CRITERIA 1: Curricular Aspects (Curriculum Design, Academic Flexibility, Feedback System)        |
| Metric 1.1.2 | Metric 1.2.1 | Metric 1.3.2 | Metric 1.4.1 [Explore Criterion 1 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERIA 2: Teaching-Learning and Evaluation (Student Enrollment, Diversity, Faculty Profile)     |
| Metric 2.1.2 | Metric 2.3.2 | Metric 2.4.2 | Metric 2.6.3 [Explore Criterion 2 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERIA 3: Research, Innovations and Extension (Funded Grants, Publications, AICTE Idea Lab)     |
| Metric 3.1.1 | Metric 3.3.2 | Metric 3.4.3 | Metric 3.6.2 [Explore Criterion 3 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERIA 4: Infrastructure and Learning Resources (Central Library, ICT Classrooms, Digital Labs)|
| Metric 4.1.2 | Metric 4.2.4 | Metric 4.3.2 | Metric 4.4.1 [Explore Criterion 4 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERIA 5: Student Support and Progression (Scholarships, Competitive Exams, Alumni Placement)   |
| Metric 5.1.2 | Metric 5.2.2 | Metric 5.3.3 | Metric 5.4.2 [Explore Criterion 5 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERIA 6: Governance, Leadership and Management (Strategic Planning, Financial Audits, IQAC)    |
| Metric 6.2.2 | Metric 6.3.2 | Metric 6.5.2 | Metric 6.5.3 [Explore Criterion 6 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERIA 7: Institutional Values and Best Practices (Green Audit, Gender Equity, Code of Conduct)|
| Metric 7.1.2 | Metric 7.1.9 | Metric 7.2.1 | Metric 7.3.1 [Explore Criterion 7 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
```

---

## 9. Motion Design & Micro-Interactions

Per `design-taste-frontend` and `impeccable`, motion must be **authored, singular, and disciplined**.

### The Signature Motion: Masked Headline Reveal
- **Implementation**: On homepage load, the primary headline rises from behind an overflow-hidden baseline clip with a sharp exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Duration**: Line 1 reveals over 850ms; Line 2 follows with a 90ms stagger.
- **Supporting Elements**: The subtitle and primary action buttons fade up smoothly once the headline completes.

```css
/* animations/reveal.css */
@keyframes maskedReveal {
  from {
    transform: translateY(105%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}

.animate-masked-line {
  display: inline-block;
  animation: maskedReveal 850ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-masked-line-delay {
  display: inline-block;
  animation: maskedReveal 850ms cubic-bezier(0.16, 1, 0.3, 1) 90ms forwards;
}
```

### Micro-Interactions Quality Standards
1. **Buttons & Links**: Crisp 120ms transitions on `:hover` and `:active`. Never lower text opacity on hover; instead, shift surface tone or deepen ink contrast.
2. **Focus Visibility (WCAG 2.4.7)**: All interactive elements display a dual-ring focus outline: `outline: 2px solid var(--primary-navy); outline-offset: 2px;`.
3. **Tabular Counters**: Numeric values (e.g., student counts, document counts) transition cleanly using CSS `tabular-nums`.
4. **Accessibility First**: Enforce `@media (prefers-reduced-motion: reduce)` globally, disabling all transform reveals and substituting instantaneous opacity fades.

---

## 10. Security, Performance & Engineering Standards

Per `AGENTS.md` and application security engineering guidelines:

### Application Security Protocols
- **Strict Content-Security-Policy (CSP)**:
  - `default-src 'self'`;
  - `script-src 'self' 'unsafe-eval' 'unsafe-inline'`;
  - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com`;
  - `font-src 'self' https://fonts.gstatic.com https://cdn.fontshare.com data:`;
  - `img-src 'self' data: https://www.gpcet.ac.in blob:`;
  - `frame-ancestors 'none'`;
- **Sanitized Markdown & Table Rendering**: All 630 scraped Avada HTML tables and Markdown files pass through `rehype-sanitize` with a strict schema prohibiting raw script injection, unverified iframes, or inline event handlers (`onclick`).
- **No SSRF in PDF Streaming**: Remote document previews and download links are validated against an allowlist of institutional domains (`gpcet.ac.in`).

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: `< 1.2s` on mobile 4G.
- **Cumulative Layout Shift (CLS)**: `< 0.02` (Zero layout shifts; all images have fixed aspect ratios).
- **Interaction to Next Paint (INP)**: `< 50ms` (Zero long tasks blocking main thread).
- **Static Generation (SSG)**: 100% of the 936 content pages and 452 faculty profiles are pre-rendered at build time with `generateStaticParams()`.

---

## 11. Step-by-Step Implementation Roadmap

```
                                  PHASE-BY-PHASE EXECUTION MATRIX
  +-----------------------------------------------------------------------------------------------+
  | Phase 1: Next.js 15 Foundation | Scaffold App Router, Tailwind v4, Tokens, Typography & Fonts |
  +-----------------------------------------------------------------------------------------------+
                                                  |
  +-----------------------------------------------------------------------------------------------+
  | Phase 2: Core Data Access      | Implement typed content readers in src/lib/ for MD & JSON    |
  +-----------------------------------------------------------------------------------------------+
                                                  |
  +-----------------------------------------------------------------------------------------------+
  | Phase 3: Global Shell & Nav    | TopInstitutionalBar, MegaMenu, CommandPalette, Footer        |
  +-----------------------------------------------------------------------------------------------+
                                                  |
  +-----------------------------------------------------------------------------------------------+
  | Phase 4: Page Implementations  | Homepage Gazette -> Department Portals -> Document Vault    |
  +-----------------------------------------------------------------------------------------------+
                                                  |
  +-----------------------------------------------------------------------------------------------+
  | Phase 5: Verification & Build  | Static build audit, WCAG AA compliance, and cross-device QA  |
  +-----------------------------------------------------------------------------------------------+
```

### Detailed Execution Tasks

#### Phase 1: Scaffolding & Design Token Setup
- Configure `next.config.ts` for optimized image domains and static export readiness.
- Setup `src/app/globals.css` with the complete CSS variable token system (`--bg`, `--surface`, `--ink`, `--primary-navy`, `--brand-crimson`, `--brass-gold`).
- Load self-hosted or preconnected Google/Fontshare fonts (*Newsreader* + *Plus Jakarta Sans* + *JetBrains Mono*).

#### Phase 2: Typed Data Access Layer (`src/lib/`)
- `src/lib/types.ts`: Define strict interfaces for `FacultyRecord`, `MediaDocument`, `DepartmentMeta`, `MarkdownPage`.
- `src/lib/content.ts`: Implement `getMarkdownPage(slug: string[])` reading from `content/` with `gray-matter`.
- `src/lib/faculty.ts`: Implement `getFacultyByDepartment(dept: string)` and `getAllFaculty()`.
- `src/lib/documents.ts`: Implement `getMediaManifest()` and fast filter utilities.

#### Phase 3: Global Shell & Institutional Navigation
- Build `src/components/global/TopInstitutionalBar.tsx` with autonomous credentials and JNTUA affiliation badge.
- Build `src/components/global/InstitutionalNavbar.tsx` with desktop mega-menu and responsive mobile drawer.
- Build `src/components/global/GlobalSearchModal.tsx` for instant `Cmd + K` search across faculty and documents.
- Build `src/components/global/InstitutionalFooter.tsx` with statutory disclosures, AICTE/NAAC/NBA seals, and campus contact details.

#### Phase 4: Core Page Implementations
- **Homepage (`src/app/page.tsx`)**: Asymmetric Hero Spread + Live Academic Gazette + 8-Department Register + Leadership Discourse.
- **Department Portal (`src/app/departments/[dept]/page.tsx` & sub-routes)**: Persistent department tabbed layout, lab specs, BoS minutes.
- **Faculty Roster & Profile (`src/app/departments/[dept]/faculty/...`)**: Searchable roster table and rich Markdown scholar profile view.
- **Central Document Vault (`src/app/documents/page.tsx`)**: Instant faceted document explorer across 5,822 items.
- **Accreditation Hub (`src/app/accreditation/naac/page.tsx`)**: Criteria 1–7 SSR metric dashboard.

#### Phase 5: Quality Assurance & Production Verification
- Run `npm run build` to verify zero static generation failures across all routes.
- Execute Playwright headless audits at 390px (Mobile), 768px (Tablet), and 1440px (Desktop).
- Validate full keyboard navigability (WCAG 2.1 AA) and test color contrast with automated a11y tools.

---

## 12. Authoritative Project Plans & Anti-Slop References

All ongoing implementation tasks and architectural decisions are tracked across the following canonical documents:
- **Authoritative Implementation Plan**: [`docs/PLAN.md`](./docs/PLAN.md) (Architecture, data models, API specs, dependencies)
- **Actionable Execution Checklist**: [`docs/TODO.md`](./docs/TODO.md) (Phase-by-phase actionable task matrix)
- **Anti-Slop Design Tokens Reference**: [`docs/references/design-system-and-anti-slop.md`](./docs/references/design-system-and-anti-slop.md) (Proportions, tokens, typography, motion)
- **Institutional Page Blueprints**: [`docs/references/page-blueprints.md`](./docs/references/page-blueprints.md) (Wireframes and layouts for all routes)
- **System Architecture**: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) (RSC boundaries, hybrid data strategy)
- **Institutional Business Logic**: [`docs/BUSINESS_LOGIC.md`](./docs/BUSINESS_LOGIC.md) (Academic hierarchy, regulations, NAAC SSR)
- **Agent Governance Rules**: [`AGENTS.md`](./AGENTS.md) (Mandatory design, security, and documentation sync laws)

