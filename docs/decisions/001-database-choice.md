# 001. Architecture Decision: Offline JSON/Markdown Hybrid with Supabase PostgreSQL

- **Status**: Accepted
- **Date**: 2026-11-02
- **Author**: Lead Software Architect

## Context & Problem Statement
GPCET has an existing dataset of 936 content pages, 452 faculty profiles, and 5,822 documents originally stored in a legacy WordPress/MySQL database. The college portal requires ultra-fast page load speeds, SEO optimization for academic accreditations, zero server downtime, and dynamic capabilities for circulars and student inquiries.

## Decision
We adopt a **Hybrid Data Architecture**:
1. **Static Ingestion Dataset**: Extracted Markdown files with YAML frontmatter in `/content/` and typed JSON rosters in `src/data/` for pre-rendered pages, faculty directories, and document search.
2. **Managed Supabase PostgreSQL**: Stores dynamic circulars, ticker notices, admissions inquiries, and administrative data with strict Row Level Security (RLS).

## Consequences
### Positive
- Sub-millisecond rendering for 99% of page loads via edge-cached SSG.
- Full offline capability: the site can build and deploy completely without network dependencies on WordPress.
- Supabase provides enterprise PostgreSQL with built-in pg_trgm for full-text search and RLS for secure submissions.

### Trade-offs & Mitigations
- Schema changes in Supabase require manual migrations. *Mitigation: Track migrations in code and use `supabase-postgres-best-practices`.*
- Content updates to static markdown require a git commit and rebuild. *Mitigation: Use Vercel webhook triggers or Supabase for real-time circulars.*

## Alternatives Considered
- **Direct WordPress REST API proxying**: Rejected due to high latency (1.2s - 2.8s per request) and dependency on an unmaintained PHP server.
- **Pure Headless CMS (Contentful/Sanity)**: Rejected due to recurring subscription costs and lack of relational table support for 452 faculty records.
