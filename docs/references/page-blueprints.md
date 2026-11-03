# Reference: Institutional Page Blueprints & Layout Specifications

> **Scope**: Structural wireframes, visual composition, and responsive behavior for all major GPCET routes  
> **Source Corpus**: 936 content pages, 452 faculty records, 5,822 indexed documents, 630 parsed tables  
> **Framework**: Next.js 15 App Router, React 19 Server Components, Tailwind CSS

---

## 1. Homepage (`/`) — The Asymmetric Academic Gazette

The homepage rejects standard marketing fluff. It functions as an **Institutional broadsheet gazette**:

```
+---------------------------------------------------------------------------------------------------+
| TOP INSTITUTIONAL BAR (Autonomous | JNTUA Affiliated | NAAC 'A+' | EAPCET: PULE | Results Portal) |
+---------------------------------------------------------------------------------------------------+
| INSTITUTIONAL NAVBAR: [Crest] Academics  Departments  Admissions  Placements  Accreditation [⌘K] |
+---------------------------------------------------------------------------------------------------+
| HERO SPREAD (75vh):                                                                               |
|                                                                                                   |
| <--- Left Column (58%): Institutional Mandate --->   <--- Right Column (42%): Academic Gazette -> |
|                                                     |                                             |
| [Newsreader Serif 54px]                             | [URGENT DISPATCH & AUTONOMOUS CIRCULARS]    |
| An Autonomous Engineering                           | • B.Tech IV Year II Sem Regular Timetable   |
| Citadel in Rayalaseema.                             |   PDF | Exam Cell | 2026-10-30              |
|                                                     | • R20 Regulation Academic Calendar 2026-27  |
| Grounded in academic rigor, technical invention,    |   PDF | Autonomous Office | 2026-10-28      |
| and civic responsibility since 2007.                | • Infosys & TCS Campus Drive Shortlist      |
|                                                     |   PDF | Training & Placements | 2026-10-25  |
| [Tabular Stats Bar]                                 | • AICTE Idea Lab Student Innovation Cohort  |
| CSE Intake: 360 | NAAC: A+ | NBA: 5 Programs        |   PDF | Research Cell | 2026-10-22          |
|                                                     |                                             |
| [Primary CTA: Access Document Vault] [Departments]  | [View All 5,822 Cataloged Documents →]     |
+---------------------------------------------------------------------------------------------------+
| MONOLITHIC REGISTER: Academic Departments (8 Disciplines)                                         |
| [Structured horizontal table: Code | Department | Degrees | Intake | Faculty | NBA | Action]      |
| 05 - CSE | B.Tech, M.Tech | 360 Seats | 72 Faculty | NBA Accredited | [Open Portal →]             |
| 04 - ECE | B.Tech, M.Tech | 180 Seats | 70 Faculty | NBA Accredited | [Open Portal →]             |
| 02 - EEE | B.Tech, M.Tech | 60 Seats  | 65 Faculty | NBA Accredited | [Open Portal →]             |
| 03 - ME  | B.Tech         | 60 Seats  | 23 Faculty | NBA Accredited | [Open Portal →]             |
| 01 - CE  | B.Tech         | 60 Seats  | 96 Faculty | NBA Accredited | [Open Portal →]             |
| 43 - AI  | B.Tech         | 180 Seats | 30 Faculty | Approved       | [Open Portal →]             |
| H&S      | Basic Sciences | —         | 80 Faculty | Supporting     | [Open Portal →]             |
| MBA      | PG Management  | 180 Seats | 16 Faculty | Affiliated     | [Open Portal →]             |
+---------------------------------------------------------------------------------------------------+
| SCHOLARLY DISCOURSE: Leadership & Vision (Full-bleed stone band `--surface`)                      |
| [Portraits from /assets/leadership/ + Authentic Educational Philosophy]                           |
| • Sri G. Pullaiah (Founder & Chairman)                                                            |
| • Sri G. Vamsidhar (Vice-Chairman)                                                                |
| • Dr. C. Srinivasa Rao (Principal)                                                                |
| • Dr. M. Srilakshmi (Dean & Professor, CSE)                                                       |
+---------------------------------------------------------------------------------------------------+
| AICTE IDEA LAB & RESEARCH EXCELLENCE                                                              |
| Dedicated institutional showcase of lab infrastructure, patents, and IEEE student branch.       |
+---------------------------------------------------------------------------------------------------+
| INSTITUTIONAL FOOTER: Statutory disclosures, RTI, JNTUA links, and accreditation crests           |
+---------------------------------------------------------------------------------------------------+
```

### Key Components for Homepage:
1. `TopInstitutionalBar.tsx`: Regulatory banner with autonomous credentials and quick student portals.
2. `InstitutionalNavbar.tsx`: Accessible mega-menu with hierarchical dropdowns and mobile sheet drawer.
3. `AsymmetricHeroSpread.tsx`: 58/42 split hero layout with masked headline animation.
4. `LiveAcademicGazette.tsx`: Real-time circular feed parsed directly from cached notices with direct PDF links.
5. `DepartmentalMatrix.tsx`: Tabular register replacing generic 3-card grids.
6. `LeadershipDiscourse.tsx`: Curated quotes with local leadership portraits from `public/assets/leadership/`.
7. `InstitutionalFooter.tsx`: Regulatory footer with AICTE, NAAC, NBA, and JNTUA crests.

---

## 2. Central Syllabus & Document Vault (`/documents`)

The campus website's highest-utility page, housing **5,822 cataloged documents** with sub-5ms client search:

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

### Technical Features:
- **Build-Time Ingestion**: `src/data/media-manifest.json` bundled into static assets.
- **Client-Side Index**: Lightweight MiniSearch/Fuse.js index instantiated on client, executing searches in `< 5ms`.
- **Query State Sync**: URL search parameters (`?q=syllabus&dept=cse&reg=r20`) kept in sync via `useSearchParams()`.
- **Safe Streaming**: Secure `https://` links with verified mime-types and file size indicators (`MB` / `KB`).

---

## 3. Department Portals (`/departments/[dept]`)

Dedicated sub-portals for all 8 departments (`cse`, `ai`, `ece`, `eee`, `me`, `civil`, `hs`, `mba`):

```
+---------------------------------------------------------------------------------------------------+
| DEPARTMENT HEADER: Department of Computer Science & Engineering (Est. 2007)                      |
| Intake: 360 Seats | NBA Tier-1 Accredited | HOD: Dr. K. Sreenivasulu, M.Tech., Ph.D.              |
+---------------------------------------------------------------------------------------------------+
| PERSISTENT SUB-NAVIGATION TABS:                                                                   |
| [Overview] [Faculty Directory (72)] [Labs & Facilities] [Board of Studies] [Syllabus] [Events]    |
+---------------------------------------------------------------------------------------------------+
| TAB CONTENT AREA:                                                                                 |
| (Overview: Vision, Mission, PEOs, POs, PSOs, Infrastructure Highlights)                           |
| (Faculty: Filterable roster by designation, search by name/qualification, individual dossier link)|
| (Labs: Tabular inventory of hardware, software licenses, lab in-charges)                          |
| (BoS: University nominees, industry experts, syllabus resolution minutes)                        |
| (Syllabus: Download links organized by Regulation R20 / R19 / R18 and semester)                  |
+---------------------------------------------------------------------------------------------------+
```

### Individual Scholar Dossier (`/departments/[dept]/faculty/[slug]`)
- Rendered from `content/departments/[dept]/faculty/[slug].md`.
- Sections:
  - Official Portrait & Academic Designation.
  - Degrees & Credentials (Ph.D., M.Tech., B.Tech. with institution and year).
  - Teaching Subjects & Research Specializations.
  - Journal & Conference Publications (Scopus, IEEE, Springer).
  - Patents, Funded Grants, and AICTE Idea Lab roles.
  - Professional Memberships (IEEE, CSI, ACM, ISTE).

---

## 4. NAAC SSR Accreditation Hub (`/accreditation/naac`)

Maps all **48 rescued NAAC criteria metric Markdown pages** under the official 7 NAAC criteria:

```
+---------------------------------------------------------------------------------------------------+
| NAAC ACCREDITATION & SSR METRICS EXPLORER                                                         |
| National Assessment and Accreditation Council (NAAC) · Institutional Cycle 2 SSR Portfolio       |
+---------------------------------------------------------------------------------------------------+
| CRITERION 1: Curricular Aspects (Curriculum Design, Flexibility, Feedback System)                 |
| Metric 1.1.2 | Metric 1.2.1 | Metric 1.3.2 | Metric 1.4.1 [Explore Criterion 1 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERION 2: Teaching-Learning and Evaluation (Enrollment, Diversity, Faculty Profile)            |
| Metric 2.1.2 | Metric 2.3.2 | Metric 2.4.2 | Metric 2.6.3 [Explore Criterion 2 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERION 3: Research, Innovations and Extension (Funded Grants, Publications, Idea Lab)         |
| Metric 3.1.1 | Metric 3.3.2 | Metric 3.4.3 | Metric 3.6.2 [Explore Criterion 3 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERION 4: Infrastructure and Learning Resources (Central Library, ICT, Digital Labs)          |
| Metric 4.1.2 | Metric 4.2.4 | Metric 4.3.2 | Metric 4.4.1 [Explore Criterion 4 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERION 5: Student Support and Progression (Scholarships, Competitive Exams, Placements)        |
| Metric 5.1.2 | Metric 5.2.2 | Metric 5.3.3 | Metric 5.4.2 [Explore Criterion 5 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERION 6: Governance, Leadership and Management (Strategic Planning, Financial Audits, IQAC)   |
| Metric 6.2.2 | Metric 6.3.2 | Metric 6.5.2 | Metric 6.5.3 [Explore Criterion 6 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
| CRITERION 7: Institutional Values and Best Practices (Green Audit, Gender Equity, Ethics)         |
| Metric 7.1.2 | Metric 7.1.9 | Metric 7.2.1 | Metric 7.3.1 [Explore Criterion 7 Metrics →]         |
+---------------------------------------------------------------------------------------------------+
```

- Each metric links directly to sanitized Markdown tables displaying evidence documents, circular numbers, and official metrics.
- All 630 normalized Avada tables render with tabular numeral formatting and preserved document download links.
