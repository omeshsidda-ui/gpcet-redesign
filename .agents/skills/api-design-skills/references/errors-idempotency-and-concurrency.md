# Errors, idempotency, retries, and concurrency

## Contents

1. Problem Details
2. Error taxonomy
3. Idempotency
4. Retries
5. Concurrency

## Problem Details

Use RFC 9457 `application/problem+json` by default for HTTP errors. Define stable problem type URIs and include only safe diagnostic detail.

Recommended extensions:

- `code`: stable machine-readable domain code
- `errors`: bounded field-level validation entries
- `requestId` or `traceId`: correlation identifier
- `retryable`: advisory only when reliably determined

Do not expose stack traces, queries, credentials, internal hostnames, or authorization reasoning.

## Error taxonomy

Separate:

- malformed transport or syntax
- validation failure
- unauthenticated
- unauthorized
- missing or hidden resource
- state conflict
- optimistic concurrency failure
- rate/quota exhaustion
- dependency failure
- transient internal failure
- permanent business rejection

Document HTTP/gRPC/event handling for each category.

## Idempotency

For retryable mutations define:

- idempotency key source and syntax
- scope: principal, tenant, operation
- request fingerprint/canonicalization
- conflict behavior when the same key has a different request
- storage and replay window
- in-progress response behavior
- response replay semantics

The Idempotency-Key HTTP field is still an IETF draft as of the source baseline. Mark it accordingly. Alternatives include client-selected resource IDs, PUT semantics, operation resources, or documented repeatability headers.

## Retries

Retry only operations classified as safe or idempotent. Use exponential backoff with jitter, attempt and elapsed-time budgets, deadlines, circuit breaking, and `Retry-After` where applicable. Do not retry authentication, validation, or permission failures without a state change.

## Concurrency

Use ETag and conditional requests for lost-update prevention. Define whether weak or strong validators are valid. Return a conflict/precondition response with enough information to refetch and reconcile safely.
