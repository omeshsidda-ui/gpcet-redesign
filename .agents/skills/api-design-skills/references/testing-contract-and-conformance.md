# Testing, contracts, and conformance

## Test layers

1. schema validation for examples and fixtures
2. lint/style checks
3. provider implementation conformance
4. consumer-driven or bilateral contract tests
5. authorization and tenant-isolation tests
6. negative, boundary, fuzz, and malformed-input tests
7. compatibility and migration tests
8. resilience, load, and soak tests
9. security tests and abuse cases
10. production synthetic checks

## Contract assertions

Test operation, method, path, status, headers, content type, request/response schema, authentication, authorization, errors, idempotency, pagination, concurrency, and deprecation behavior.

## Negative testing

Include missing/invalid credentials, wrong audience, expired token, cross-tenant IDs, forbidden fields, duplicate idempotency keys, stale ETags, oversized payloads, unsupported media types, malformed cursors, replayed webhooks, expensive GraphQL queries, and gRPC deadline exhaustion.

## Test data

Use synthetic data. Never put production credentials or personal data in fixtures. Make time, randomness, and IDs deterministic where possible.

## Release gates

A release must pass contract validation, breaking-change analysis, security review for changed trust boundaries, implementation conformance, documentation checks, and rollback readiness.
