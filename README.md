# GPCET College Website Redesign

Modern redesign and complete content extraction pipeline for the **G. Pullaiah College of Engineering & Technology (GPCET)** institutional web portal ([gpcet.ac.in](https://www.gpcet.ac.in/)), built by a CSE student.

---

## 🚀 Quick Reference for New Agents & Developers

If you are a new AI agent or developer opening this project, **read these primary documents first**:

1. **[`AGENTS.md`](./AGENTS.md)**: **Mandatory Engineering Rules & Skills Matrix** covering Frontend Anti-Slop Design, Backend Architecture, Supabase RLS, Application Security, and Documentation Sync with 26 active skills.
2. **[`docs/PLAN.md`](./docs/PLAN.md)**: **Master Multi-Subagent Implementation Plan** establishing the 6-agent division of labor (Alpha through Zeta), quality gates, and step-by-step roadmap.
3. **[`docs/TODO.md`](./docs/TODO.md)**: **Actionable Implementation Checklist** tracking immediate sprint actions and deliverable statuses.
4. **[`SESSION_HANDOFF.md`](./SESSION_HANDOFF.md)**: Session checkpoint and continuous state transfer protocol between AI agents.
5. **[`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md)**: Complete project history, technical audit of the live WordPress/Avada CMS, scraper pipeline architecture, edge cases solved, and inventory of the 936 Markdown pages, 452 faculty records, and 5,822 cataloged documents.
6. **[`NEXTJS_REDESIGN_PLAN.md`](./NEXTJS_REDESIGN_PLAN.md)**: Full architecture and design system implementation blueprint for building the Next.js 15 (App Router + React 19 + TypeScript + Tailwind CSS) frontend portal.
7. **[`docs/`](./docs/)**: Authoritative documentation tree (`ARCHITECTURE.md`, `DATABASE.md`, `API.md`, `BUSINESS_LOGIC.md`, `CHANGELOG.md`, `decisions/`, `references/`).

---

## 📂 Project Repository Structure

```
gpcet_redesign/
├── AGENTS.md                       # Comprehensive Agent Engineering Rules & 26-Skills Matrix
├── PROJECT_CONTEXT.md              # Definitive project history, findings, and dataset guide
├── NEXTJS_REDESIGN_PLAN.md         # Next.js 15 App Router architecture & design system plan
├── SESSION_HANDOFF.md              # State transfer and bounded session handoff checkpoint
├── README.md                       # This file
├── package.json                    # Scripts and dependencies
│
├── .agents/skills/                 # 26 Specialized Agent Skills (Design, Backend, Security, Docs)
│
├── docs/                           # Authoritative Technical Documentation Hub
│   ├── PLAN.md                     # Master multi-subagent orchestration plan (Alpha to Zeta)
│   ├── TODO.md                     # Actionable phase-by-phase implementation checklist
│   ├── ARCHITECTURE.md             # Enterprise hybrid system architecture, caching, and invariants
│   ├── DATABASE.md                 # PostgreSQL 15 schema, Supavisor pooler, GIN FTS, and RLS
│   ├── API.md                      # REST Route Handlers, RFC 9457 errors, and Zod schemas
│   ├── BUSINESS_LOGIC.md           # College rules, academic regulations, NAAC/NBA metrics
│   ├── CHANGELOG.md                # Project release and architectural change history
│   ├── decisions/                  # Architecture Decision Records (ADRs 001 - 005)
│   └── references/                 # Design system tokens, anti-slop rules, and page blueprints
│
├── cache/                          # Raw WordPress REST API snapshots (offline cache)
│   ├── pages.json                  # All 928 raw WordPress pages
│   ├── media.json                  # All 5,253 raw WordPress media items
│   ├── portfolio.json              # 20 Avada portfolio items
│   ├── faqs.json                   # 6 FAQ items
│   ├── posts.json                  # 2 blog posts
│   ├── homepage.html               # Raw homepage DOM snapshot
│   └── homepage_widgets.json       # Tickers, marquees, sliders, and navigation tree
│
├── content/                        # 936 Clean GitHub-Flavored Markdown files with YAML frontmatter
│   ├── departments/                # Academic department portals (cse, ai, ece, eee, me, civil, hs, mba)
│   │   └── [dept]/faculty/         # 200+ individual faculty profile markdown files
│   ├── accreditation/              # NAAC SSR Criteria 1-7 (48 metrics), NBA, AICTE, NIRF
│   ├── administration/             # Governing body, Academic Council, Grievance, Committees
│   ├── campus-life/                # Library, Sports, Hostel, Medical, Clubs, NSS, NCC
│   ├── research/                   # Research supervisors, funded projects, patents, journals
│   ├── examinations/               # Results portal, timetables, regulations
│   ├── admissions/                 # Intake, eligibility, fee structure
│   ├── placements/                 # Recruiter stats, placement drives
│   └── archive-or-orphan/          # Archived historical notices
│
├── src/data/                       # Strongly-typed JSON structures
│   ├── faculty/                    # 8 department JSON rosters with 452 structured faculty members
│   │   ├── cse.json                # 72 faculty
│   │   ├── civil.json              # 96 faculty
│   │   ├── hs.json                 # 80 faculty
│   │   ├── ece.json                # 70 faculty
│   │   ├── eee.json                # 65 faculty
│   │   ├── ai.json                 # 30 faculty
│   │   ├── me.json                 # 23 faculty
│   │   └── mba.json                # 16 faculty
│   ├── media-manifest.json         # Searchable index of all 5,822 PDFs, syllabus docs, and uploads
│   ├── url-map.json                # 2,784 legacy WordPress URL -> Next.js route mappings
│   ├── downloaded-assets.json      # Index of downloaded brand, campus, and leadership assets
│   └── classification-report.json  # Comprehensive coverage and section statistics
│
├── public/assets/                  # Downloaded core brand and media assets
│   ├── brand/                      # College crest, NAAC A+ seal, NBA logo, AICTE Idea Lab
│   ├── campus/                     # Entrance gate, Central Library, Digital Library
│   └── leadership/                 # Chairman, Vice-Chairman, Principal, Dean Dr. M Srilakshmi
│
└── scraper/                        # Node.js scraper suite
    ├── config.js                   # Network config, endpoints, paths, department seeds
    ├── client.js                   # Resilient HTTP fetcher with exponential backoff & rate-limiting
    ├── raw-fetcher.js              # Stage 1: Fast REST API caching & homepage widget scraper
    ├── html-parser.js              # Stage 2: Dual Avada cleaner & resilient table extractor
    ├── content-organizer.js        # Stage 2: Multi-hop BFS link classifier & faculty aggregator
    ├── asset-downloader.js         # Stage 3: Media manifest generator & asset downloader
    └── cli.js                      # Unified CLI entry point
```

---

## 🛠️ Scraper Pipeline CLI

The scraper runs completely offline from `cache/` without hitting the live college server:

```bash
npm run scrape:verify    # Test API connectivity and counts
npm run scrape:cache     # Snapshot raw data from WP REST API into /cache
npm run scrape:parse     # Run BFS classification, Avada cleaning, table parsing, URL rewriting
npm run scrape:manifest  # Generate media-manifest.json for all 5,822 items
npm run scrape:assets    # Download brand logos and campus hero assets
npm run scrape:all       # Run full end-to-end pipeline
```

---

## 🎨 Next Step: Frontend & Backend Redesign Implementation
The scraped data and assets are 100% prepared. To execute the redesign:
- Follow the **Master Multi-Subagent Implementation Plan** in [`docs/PLAN.md`](./docs/PLAN.md).
- Track and dispatch subagents via the **Actionable Implementation Checklist** in [`docs/TODO.md`](./docs/TODO.md).
- Review the design blueprints and anti-slop rules in [`docs/references/design-system-and-anti-slop.md`](./docs/references/design-system-and-anti-slop.md) and [`NEXTJS_REDESIGN_PLAN.md`](./NEXTJS_REDESIGN_PLAN.md).
