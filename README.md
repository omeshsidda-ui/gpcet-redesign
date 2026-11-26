# GPCET College Website Redesign

Modern redesign and complete content extraction pipeline for the **G. Pullaiah College of Engineering & Technology (GPCET)** institutional web portal ([gpcet.ac.in](https://www.gpcet.ac.in/)), built by a CSE student.

---

## 🚀 Quick Reference for New Agents & Developers

If you are a new AI agent or developer opening this project, **read these primary documents first**:

1. **[`AGENTS.md`](./AGENTS.md)**: **Mandatory Engineering Rules & Skills Matrix** covering Frontend Anti-Slop Design, Backend Architecture, Supabase RLS, Application Security, and Documentation Sync across `.agents/skills/`.
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
├── .agents/skills/                 # Specialized Agent Skills (Design, Backend, Security, Docs)
│
├── docs/                           # Authoritative Technical Documentation Hub
│   ├── PLAN.md                     # Master implementation & orchestration plan (Alpha to Zeta)
│   ├── TODO.md                     # Actionable phase-by-phase implementation checklist
│   ├── ARCHITECTURE.md             # Enterprise hybrid system architecture, caching, and invariants
│   ├── DATABASE.md                 # PostgreSQL 15 schema, Supavisor pooler, GIN FTS, and RLS
│   ├── API.md                      # REST Route Handlers, RFC 9457 errors, and Zod schemas
│   ├── BUSINESS_LOGIC.md           # College rules, academic regulations, NAAC/NBA metrics
│   ├── CHANGELOG.md                # Project release and architectural change history
│   ├── decisions/                  # Architecture Decision Records (ADRs 001 - 006)
│   └── references/                 # Design system tokens, anti-slop rules, and page blueprints
│
├── src/
│   ├── middleware.ts               # Edge CSP, security headers, and /admin SSR session refresh
│   ├── app/                        # Next.js 15 App Router pages, layouts, catch-all & API v1 routes
│   │   ├── page.tsx                # Crimson-red editorial homepage with campus spread & live gazette
│   │   ├── documents/              # Central Syllabus & Document Vault (5,822 indexed items)
│   │   ├── departments/            # 8 department portals + 452 faculty dossiers
│   │   ├── accreditation/          # NAAC SSR Criteria 1-7 (48 metrics) & NBA accreditation hub
│   │   ├── administration/         # Governing body, Academic Council, Principal's desk
│   │   ├── admissions/             # Intake matrix, fees, scholarships & inquiry form
│   │   ├── placements/             # Placement statistics, records & MoUs
│   │   ├── campus-life/            # Libraries, transport, sports, hostels, clubs
│   │   ├── admin/                  # Authenticated Staff CMS (notices, faculty, mode toggle)
│   │   ├── [...slug]/              # Static catch-all renderer for 936 ingested Markdown pages
│   │   └── api/v1/                 # RFC 9457 Route Handlers (health, faculty, docs, notices, inquiries, sync)
│   ├── components/                 # Global shell, home, documents, departments, naac, admin, content UI
│   ├── lib/                        # Fail-safe data adapters, Supabase SSR/admin clients, workflow sync, Zod schemas
│   └── data/                       # Typed JSON datasets (452 faculty, 5,822 manifest items, 2,784 redirects)
│
├── supabase/
│   ├── migrations/                 # PostgreSQL 15 schema, indexes, RLS policies, audit triggers
│   └── seed.sql                    # Deterministic seed SQL (8 departments, 452 faculty, documents)
│
├── scripts/                        # Seeding, search index builder, contract audit & asset migration scripts
├── tests/                          # Node test runner suite (81 automated tests across 13 files)
│
├── cache/                          # Raw WordPress REST API snapshots (offline cache)
├── content/                        # 936 Clean GitHub-Flavored Markdown files with YAML frontmatter
├── public/assets/                  # Official GPCET crest (`gpcet-logo.png`), brand seals, campus & leadership photos
└── scraper/                        # Node.js WordPress ingestion & normalization suite
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

## 🚀 Current Status & Next Step: Production Deployment

Phases 1–6 (Next.js 15 App Router portal, fail-safe hybrid data layer, RFC 9457 REST APIs, durable WordPress notice sync, Staff Admin CMS, Edge Security Middleware, and the crimson-red UI redesign with the official GPCET crest logo) are **100% implemented and verified** (`81/81` tests passing, `npm run build` compiling 1,565 static/SSG pages + dynamic routes).

The live Supabase project **`gpcet-redesign`** (`ref: qoodtfpikxrfqdaxndem`, Mumbai `ap-south-1`) is provisioned and seeded with **8 departments**, **452 faculty profiles**, and **5,822 academic documents**.

**Remaining Step**:
- Deploy to **Vercel** and configure production environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_SYNC_TOKEN`).
- See [`SESSION_HANDOFF.md`](./SESSION_HANDOFF.md), [`docs/TODO.md`](./docs/TODO.md), and [`docs/decisions/006-production-cms-cutover.md`](./docs/decisions/006-production-cms-cutover.md) for deployment and CMS cutover details.
