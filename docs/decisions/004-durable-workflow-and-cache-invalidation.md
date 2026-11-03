# 004. Architecture Decision: Durable Execution Pipeline with Vercel Workflow SDK for Scraper Refreshes & Cache Invalidation

- **Status**: Accepted
- **Date**: 2026-11-02
- **Author**: Lead Backend Architect

## Context & Problem Statement
G. Pullaiah College of Engineering & Technology publishes academic circulars, exam timetables, fee notices, and recruitment updates on a weekly basis. While the redesign ingests a complete snapshot of 936 pages, 452 faculty profiles, and 5,822 documents into static JSON and Markdown, a production website cannot remain frozen. 

Running live web scrapers synchronously inside Next.js serverless functions is prone to function timeouts (15s to 60s execution limits), dropped connections to the legacy WordPress server, and cold-start failures. Furthermore, updating edge-cached static pages on demand without redeploying the entire website requires a structured revalidation trigger.

## Decision
We adopt the **Vercel Workflow SDK** (`workflow`) to execute background synchronization and cache invalidation:
1. **Durable Step Execution**: Background ingestion runs inside `"use workflow"` orchestrators and `"use step"` functions with automatic retries (`RetryableError`) and exponential backoff for transient network issues.
2. **Deterministic Cache Invalidation**: Upon successful completion of an ingestion step, the workflow triggers Next.js 15 `revalidateTag('notices')` and `revalidateTag('documents')`, updating edge caches without rebuilding the application.
3. **Webhook & Cron Triggers**: The sync workflow can be triggered either on a schedule (e.g. daily at 06:00 IST via Vercel Cron) or on-demand via authenticated admin webhook (`POST /api/v1/admin/sync/notices`).

## Consequences

### Positive
- **Fault-Tolerant Ingestion**: WordPress downtime or network lag does not crash the synchronization or affect end-user experience.
- **Immediate Edge Updates**: Students and faculty see new exam notifications instantly without full site re-deployments.
- **Isolation of Node.js Modules**: Scraper logic requiring Cheerio or file parsing runs safely inside `"use step"` functions with full Node.js privileges, avoiding edge runtime constraints.

### Trade-offs & Mitigations
- Requires Vercel Workflow configuration in `next.config.ts` (`withWorkflow`).
- Step parameters and return values must be strictly serializable. *Mitigation: Return only plain JSON payloads between steps.*

## Alternatives Considered
- **Direct Synchronous Cron in Route Handler**: Rejected due to 60-second serverless execution limits and lack of retry state on failure.
- **External Worker Service (Celery / BullMQ)**: Rejected due to unnecessary infrastructure maintenance, extra cloud costs, and separation from the Next.js deployment artifact.
