# Observability, performance, and reliability

## Observability contract

Define telemetry for every API surface:

- request or message ID
- distributed trace context
- authenticated principal category, never raw secrets
- tenant ID in access-controlled telemetry
- operation ID or RPC method
- status/error code
- latency and payload size
- retry count and idempotency outcome
- dependency calls
- quota/rate-limit decision
- webhook delivery ID or event ID

Use structured logs and stable low-cardinality metric dimensions. Redact tokens, authorization headers, cookies, sensitive payloads, and personal data.

## SLOs

Specify availability, latency percentiles, correctness, freshness, durability, and recovery objectives by API capability. Define measurement point, exclusions, error budget, and alerting windows.

## Reliability patterns

- deadlines and cancellation propagation
- bounded retries with jitter and budgets
- bulkheads and concurrency limits
- circuit breakers for dependencies
- load shedding and graceful degradation
- idempotent consumers and deduplication
- backpressure for streams and queues
- health, readiness, and dependency indicators
- disaster recovery and region failover behavior

## Performance

Set limits for body size, page size, query complexity, export windows, concurrent streams, and compression. Use caching and conditional requests where semantics allow. Avoid N+1 dependency calls and unbounded fan-out.

Performance tests must use representative cardinality, payloads, authorization, and dependency behavior rather than only happy-path microbenchmarks.
