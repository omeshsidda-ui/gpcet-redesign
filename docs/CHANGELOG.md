# Changelog

All notable changes to the GPCET Redesign project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-11-02

### Added
- **Documentation & Context Synchronization Suite**:
  - Implemented custom `.agents/skills/docs-sync/` skill to eliminate documentation drift between code and documentation.
  - Installed `documentation-and-adrs` (`addyosmani/agent-skills`) for ADR and API documentation standards.
  - Installed `adr-skill` (`skillrecordings/adr-skill`) for structured architectural decision recording.
  - Installed `create-project` and `go-project` (`hrdtbs/agent-skills`) for multi-session agent task continuity.
  - Created authoritative documentation repository in `docs/`:
    - `docs/ARCHITECTURE.md`: High-level system architecture, Next.js 15 Server Components, and data flows.
    - `docs/DATABASE.md`: Relational PostgreSQL schema, indexes, and Supabase RLS security policies.
    - `docs/API.md`: Public REST API contracts, query parameters, and RFC 9457 error envelopes.
    - `docs/BUSINESS_LOGIC.md`: Departmental hierarchy, faculty designation orders, and syllabus conventions.
    - `docs/decisions/001-database-choice.md`: ADR on hybrid JSON/Markdown with Supabase.
    - `docs/decisions/002-auth-architecture.md`: ADR on `@supabase/ssr` HttpOnly cookies.
    - `docs/decisions/003-nextjs-app-router-migration.md`: ADR on Next.js 15 App Router overhaul.
  - Initialized `SESSION_HANDOFF.md` for seamless context transfer between AI agent coding sessions.
- **Application Security & SAST Suite**:
  - Installed `security-review` (Sentry) for interprocedural attacker-input tracing.
  - Installed `code-security` & `semgrep` (Semgrep) for secure coding rules and static analysis.
  - Installed `codeql`, `sharp-edges`, `supply-chain-risk-auditor`, `audit-context-building`, and `sarif-parsing` (Trail of Bits).
  - Installed `secret-scanning` (GitHub) and `owasp-top-10` (Microsoft / OWASP 2025).
  - Integrated `supabase` & `supabase-postgres-best-practices` for RLS policy enforcement.
- **Frontend Design & Anti-AI-Slop Suite**:
  - Installed `frontend-design` (Anthropic), `frontend-app-builder` (OpenAI), `design-taste-frontend` (Leonxlnx), `impeccable` (pbakaus), and `web-design-guidelines` (Vercel).
  - Configured project-wide rules in `AGENTS.md` and `GEMINI.md`.
- **Production-Grade Backend Architecture & Subagent Framework**:
  - Authored comprehensive PostgreSQL 15 schema, Supavisor connection pooler setup, GIN `fts_vector` full-text search, trigram autocomplete, audit triggers, and hardened RLS policies in `docs/DATABASE.md`.
  - Authored production REST API specification conforming to RFC 9457 Problem Details, OpenAPI 3.1, Zod validation schemas, Upstash rate limiting, and edge caching in `docs/API.md`.
  - Authored production enterprise architecture specification with layered component boundaries, fail-safe hybrid data pattern, and durable workflow sync in `docs/ARCHITECTURE.md`.
  - Created ADR-004 (`docs/decisions/004-durable-workflow-and-cache-invalidation.md`): Vercel Workflow SDK for durable scraper refresh and `revalidateTag()` invalidation.
  - Created ADR-005 (`docs/decisions/005-fail-safe-hybrid-data-access-pattern.md`): Fail-Safe Hybrid Pattern combining PostgreSQL with offline JSON fallback for 100% uptime.
  - Authored Master Implementation & Multi-Subagent Orchestration Plan (`docs/PLAN.md`) establishing 6 specialized subagents (Alpha: Database, Beta: API, Gamma: Data Layer, Delta: Workflow, Epsilon: Frontend, Zeta: Security/QA) with rigid acceptance criteria and quality gates.
  - Updated `docs/TODO.md` with detailed subagent responsibility matrix and sprint milestones.
- **Backend Implementation & Database Verification**:
  - Scaffolded declarative PostgreSQL 15 migrations in `supabase/migrations/` (`core_schema.sql`, `indexes.sql`, `rls_policies.sql`, `triggers.sql`).
  - Resolved critical schema constraints: corrected `faculty.profile_route` nullability, `highest_qualification` defaults, expanded `academic_documents.category` check constraint to match all 14 categories in `media-manifest.json`, and upgraded `audit_logs.record_id` to `TEXT` for universal table support.
  - Hardened Row Level Security (RLS) in `supabase/migrations/20261102000003_rls_policies.sql` with `public.is_staff()` bypasses on SELECT policies to eliminate update/select deadlocks on deactivated and draft records.
  - Implemented `scripts/seed-supabase.js` and generated idempotent seed SQL in `supabase/seed.sql` with 8 departments, 452 faculty profiles, and core documents.
  - Implemented RFC 9457 Problem Details factory and Zod error parser in `src/lib/api/problem.js`.
  - Implemented comprehensive Zod validation schemas in `src/lib/validations/` (`faculty.schema.js`, `document.schema.js`, `notice.schema.js`, `inquiry.schema.js`).
  - Implemented Fail-Safe Data Access Layer in `src/lib/data/` (`faculty.js`, `documents.js`, `departments.js`, `notices.js`) guaranteeing 100% uptime with offline JSON fallback.
  - Authored and verified 29 automated tests in `tests/*.test.js` (`data-normalization`, `api-problem`, `zod-validation`, `database-schema-integrity`, `hybrid-data-layer`).

---

## [0.2.0] - 2026-10-31

### Added
- **Completed Offline Content Extraction Pipeline**:
  - Snapshotted all 928 raw WordPress pages and 5,253 media records in `/cache`.
  - Generated 936 clean GitHub-Flavored Markdown files with YAML frontmatter in `/content`.
  - Aggregated and deduplicated 452 faculty profiles across 8 departments into `src/data/faculty/*.json`.
  - Cataloged 5,822 documents into `src/data/media-manifest.json`.
  - Generated 2,784 URL mappings in `src/data/url-map.json`.
  - Downloaded institutional crests, NAAC A+ seal, NBA logo, and campus photos into `public/assets/`.
- Authored initial blueprints: `PROJECT_CONTEXT.md` and `NEXTJS_REDESIGN_PLAN.md`.

---

## [0.1.0] - 2026-10-30

### Initialized
- Initial repository setup and Node.js scraper prototype for `gpcet.ac.in`.
