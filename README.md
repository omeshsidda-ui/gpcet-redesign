<p align="center">
  <img src="./public/assets/brand/gpcet-logo.png" alt="GPCET Official Crest" width="72" />
</p>

# GPCET Institutional Web Portal Redesign

A modern full-stack overhaul of the **G. Pullaiah College of Engineering & Technology (GPCET)** institutional portal ([gpcet.ac.in](https://www.gpcet.ac.in/)), replacing a legacy WordPress/Avada site with an editorial **Next.js 15 App Router**, **TypeScript**, and **Supabase PostgreSQL** platform.

**Live Demo:** [https://gpcet-redesign.vercel.app](https://gpcet-redesign.vercel.app)

---

## Overview

GPCET is an autonomous, JNTUA-affiliated engineering institution in Kurnool, Andhra Pradesh (NAAC A+ and NBA Tier-1 accredited). This project ingests the college's public academic records, faculty rosters, statutory disclosures, and document archives into a typed, fail-safe web portal built around an editorial crimson-and-ivory design system.

Key dataset scale verified in the repository:

- **8** academic departments and **452** structured faculty dossiers
- **5,831** cataloged documents and media assets (syllabi, academic calendars, exam timetables, circulars)
- **1,256** cleaned GitHub-Flavored Markdown content pages
- **2,784** edge-level 301 redirects preserving legacy WordPress URLs

---

## Key Features

- **Institutional Portals & Catch-All Content Engine**: Dedicated routes for the editorial homepage (`/`), departments and faculty profiles (`/departments`), NAAC Criteria 1–7 metrics and NBA accreditation (`/accreditation`), admissions (`/admissions`), placements (`/placements`), administration (`/administration`), research (`/research`), campus life (`/campus-life`), statutory disclosures (`/statutory/*`), and static `[...slug]` Markdown pages (`src/app/[...slug]`).
- **Document & Syllabus Vault (`/documents`) + `Cmd+K` Search**: Filterable document archive paired with a pre-built MiniSearch index (`public/search-index.json`, under 180 KB) for instant client-side search.
- **Fail-Safe Hybrid Data Layer**: Queries Supabase PostgreSQL (`@supabase/ssr`, Row Level Security, `tsvector` GIN full-text search) when configured, and falls back automatically to the local JSON/Markdown snapshot (`src/data/`, `content/`) for zero-downtime local development and resilience.
- **Authenticated Staff Admin CMS (`/admin`)**: Cookie-based SSR authentication via `@supabase/ssr`, `app_metadata.role` RBAC, CSRF-protected Server Actions (`src/lib/actions/admin-actions.ts`), and durable WordPress notice sync (`src/lib/workflow/sync-notices.ts`).
- **Security & API Standards**: Strict CSP and security headers in `src/middleware.ts`, RFC 9457 Problem Details error envelopes (`src/lib/api/problem.js`), Zod validation (`src/lib/validations/`), sliding-window rate limiting and honeypot checks on `/api/v1/inquiries`, and an SSRF-allowlisted asset proxy (`/api/v1/assets/proxy`).

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & UI** | Next.js 15 (App Router), React 19, TypeScript 5.7, Tailwind CSS v4, `lucide-react` |
| **Typography** | *Newsreader*, *Instrument Sans*, *IBM Plex Mono* via `next/font/google` |
| **Backend & Database** | Supabase PostgreSQL 15+ (`@supabase/ssr`, `@supabase/supabase-js`), Vercel `workflow` SDK, Zod 4 |
| **Search & Content** | MiniSearch, `gray-matter`, `react-markdown`, `remark-gfm`, `rehype-sanitize`, `cheerio`, `turndown` |
| **Testing** | Node.js test runner (`node --import tsx --test`), data contract audit script |

---

## Architecture & Repository Layout

```text
gpcet-redesign/
├── src/
│   ├── middleware.ts              # Security headers, strict CSP, and /admin SSR session refresh
│   ├── app/                       # App Router pages, layouts, [...slug], sitemap, and /api/v1/* routes
│   ├── components/                # Shell, home spread, documents, departments, NAAC, admin, and Markdown UI
│   ├── lib/                       # Hybrid data adapters, Supabase clients, workflow sync, Zod schemas
│   └── data/                      # Typed JSON datasets (faculty, media manifest, URL redirect map)
├── content/                       # 1,256 cleaned Markdown pages with YAML frontmatter
├── public/
│   ├── assets/                    # Official crest (gpcet-logo.png), brand seals, campus & leadership photos
│   └── search-index.json          # Pre-built MiniSearch index
├── supabase/
│   ├── migrations/                # PostgreSQL schema, GIN/B-tree indexes, RLS policies, audit triggers
│   └── seed.sql                   # Deterministic seed data
├── scraper/                       # WordPress REST ingestion and HTML-to-Markdown normalization CLI
├── scripts/                       # Search index builder, Supabase seeder, contract audit, asset migration
├── tests/                         # 85 automated tests across 13 test files
└── docs/                          # Architecture, database, API, ADRs, and design references
```

---

## Local Setup

### Prerequisites

- **Node.js 20+** and **npm**

### 1. Install Dependencies

```bash
git clone https://github.com/omeshsidda-ui/gpcet-redesign.git
cd gpcet-redesign
npm install
```

### 2. Configure Environment (Optional)

The portal runs out of the box in offline hybrid fallback mode using `src/data/` and `content/`. To connect a live Supabase instance or Upstash Redis rate limiter, copy `.env.example` to `.env.local` and supply your credentials:

```bash
cp .env.example .env.local
```

### 3. Run Development Server & Checks

```bash
npm run dev              # Start Next.js dev server at http://localhost:3000
npm test                 # Run all 85 automated tests (node --import tsx --test)
npm run test:contracts   # Audit faculty, media manifest, and URL redirect data contracts
npx tsc --noEmit         # Run TypeScript type check
npm run build            # Compile production build
```

Additional maintenance scripts defined in `package.json`:

- `npm run search:build` — Rebuild `public/search-index.json`
- `npm run seed:generate` — Regenerate `supabase/seed.sql`
- `npm run assets:migrate` — Upload cataloged assets to Supabase Storage
- `node scraper/cli.js --help` — Run stages of the WordPress ingestion CLI

---

## Live Status

- **Production Deployment**: Live at [https://gpcet-redesign.vercel.app](https://gpcet-redesign.vercel.app).
- **Database**: Supabase project `gpcet-redesign` (`ap-south-1`) provisioned with migrations, RLS policies, 8 departments, 452 faculty profiles, and cataloged document records.
- **Verification**: `npm test` (85/85 passing), `npm run test:contracts`, `npx tsc --noEmit`, and `npm run build` pass. (`eslint` and an ESLint config are not yet configured in the repository, so `npm run lint` currently exits into Next.js's interactive setup prompt.)

---

## Developer & Agent Docs

Internal planning, architecture decisions, and AI-agent workflow guides live in the following files:

- [`AGENTS.md`](./AGENTS.md) — Engineering rules, design standards, security checklist, and `.agents/skills/` catalog
- [`SESSION_HANDOFF.md`](./SESSION_HANDOFF.md) — Current implementation checkpoint and deployment notes
- [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) — Legacy WordPress audit, scraper design, and dataset inventory
- [`NEXTJS_REDESIGN_PLAN.md`](./NEXTJS_REDESIGN_PLAN.md) — App Router and design system blueprint
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md), [`docs/DATABASE.md`](./docs/DATABASE.md), [`docs/API.md`](./docs/API.md), [`docs/BUSINESS_LOGIC.md`](./docs/BUSINESS_LOGIC.md) — System specifications
- [`docs/PLAN.md`](./docs/PLAN.md), [`docs/TODO.md`](./docs/TODO.md), [`docs/CHANGELOG.md`](./docs/CHANGELOG.md) — Roadmap and release history
- [`docs/decisions/`](./docs/decisions/) and [`docs/references/`](./docs/references/) — ADRs (001–006) and UI reference specs

---

## License

Licensed under the [MIT License](./LICENSE) — Copyright (c) 2026 Omesh Sidda.
