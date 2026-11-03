# GraphQL design

## Contents

1. Schema design
2. Pagination and mutations
3. Security
4. Performance
5. Evolution

## Schema design

Design around domain capabilities and consumer language. Avoid mirroring database tables. Use clear nullability semantics and explain partial failure behavior. Prefer interfaces and unions only when consumers benefit from polymorphism.

## Pagination and mutations

- Use cursor-based connections for large or changing collections.
- Keep cursors opaque.
- Return typed mutation payloads with result, user-safe errors, and correlation metadata.
- Use client mutation IDs or idempotency keys when retries can duplicate effects.

## Security

- Authenticate at the transport boundary.
- Authorize at resolver, object, and sensitive field levels.
- Prevent batching from bypassing rate limits.
- Apply depth, breadth, alias, token, timeout, and complexity budgets.
- Restrict introspection only as defense-in-depth; it does not replace authorization.
- Prevent arbitrary URL fetching and SSRF through custom scalars or resolvers.

## Performance

Use data loaders/batching, persisted operations where appropriate, resolver deadlines, query cost analysis, and response-size limits. Monitor per-field latency and error rates.

## Evolution

Prefer additive fields and deprecation directives. Do not repurpose fields or enum meanings. Measure deprecated field usage before removal and publish a migration window.

GraphQL-over-HTTP behavior may depend on a draft specification; record the version/profile and client compatibility assumptions.
