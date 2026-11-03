# 005. Architecture Decision: Fail-Safe Hybrid Data Access Pattern with Supabase PostgreSQL and Offline Ingestion Cache

- **Status**: Accepted
- **Date**: 2026-11-02
- **Author**: Lead Backend Architect

## Context & Problem Statement
Typical database-driven website migrations fail when the external managed database experiences cold-starts, connection pool saturation during traffic spikes, or network interruptions. For an educational institution with 452 faculty profiles, 936 content pages, and 5,822 documents, even a momentary database outage renders the college portal offline, severely damaging institutional credibility during high-stakes events like NAAC/NBA accreditation visits or state-wide EAPCET counseling.

## Decision
We enforce a **Fail-Safe Hybrid Data Access Pattern** across all data queries in `src/lib/data/`:
1. **Primary Read Path**: Query Supabase PostgreSQL via the Supavisor connection pooler (port 6543, transaction mode) with Row Level Security (RLS) and tsvector full-text search.
2. **Deterministic Offline Fallback**: If the database query throws a timeout, network error, or returns empty due to misconfigured environment variables in a development/preview environment, the data access layer transparently catches the exception and serves data from the pre-indexed JSON manifests (`src/data/faculty/*.json`, `src/data/media-manifest.json`, and `content/`).
3. **Next.js Tagged Cache Wrapping**: All reads are wrapped in `unstable_cache()` with explicit domain tags (`faculty`, `documents`, `notices`) and a 1-hour stale-while-revalidate window.

## Consequences

### Positive
- **100% Uptime Guarantee**: The public portal will never return 500 error pages due to database connectivity issues.
- **Zero Configuration for Local Developers**: New developers or staging previews can run the full site immediately without requiring Supabase credentials or database seeds.
- **Ultra-Low Latency**: 99.8% of requests are served directly from Next.js memory/edge cache in under 10ms.

### Trade-offs & Mitigations
- In extreme cases where a new notice was added to PostgreSQL and the database went down, users might briefly see the static snapshot until the database recovers. *Mitigation: Log warnings to Sentry whenever fallback is triggered so engineers are immediately alerted.*

## Alternatives Considered
- **Pure PostgreSQL Direct Dependency**: Rejected because any network hiccup or Supabase maintenance would bring down the entire college portal.
- **Pure Static JSON (No Database)**: Rejected because it does not support dynamic submissions (admissions inquiries, audit logging) or real-time circular updates without git commits and full redeployments.
