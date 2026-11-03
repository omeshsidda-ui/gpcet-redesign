# HTTP and resource design

## Contents

1. Resource model
2. Methods and status codes
3. long-running operations
4. Caching and concurrency
5. Payload conventions

## Resource model

- Name resources after domain concepts using stable plural collection paths.
- Keep path depth shallow; nesting should express ownership or scoping, not every relationship.
- Use opaque identifiers. Do not encode mutable business attributes into IDs.
- Expose canonical URLs consistently.
- Model states and transitions explicitly.
- Use subresources for lifecycle objects such as operations, versions, memberships, or deliveries.
- Model non-CRUD actions as command resources or narrowly scoped custom actions.

## Methods and status codes

- GET: safe read; avoid side effects.
- HEAD: metadata equivalent to GET without content.
- POST: create server-named resources or execute non-idempotent commands; add idempotency controls when retryable.
- PUT: full replacement or client-named creation; idempotent.
- PATCH: partial mutation with an explicit patch media type and concurrency rules.
- DELETE: idempotent desired-state transition; document repeat behavior.

Typical success codes:

- 200 for successful reads or synchronous operations returning a representation
- 201 with Location for created resources
- 202 for accepted asynchronous work
- 204 for successful operations with no response body
- 206 only for valid range responses

Do not return 200 for errors. Do not use 404 to hide authorization failures unless that is an explicit enumeration-resistance policy applied consistently.

## Long-running operations

Return `202 Accepted` with a durable operation resource containing:

- operation ID
- state: queued, running, succeeded, failed, cancelling, cancelled
- creation and update timestamps
- progress when meaningful
- result or target resource link
- structured error
- retry/poll guidance
- cancellation capability
- expiration policy

## Caching and concurrency

- Define `Cache-Control`, validators, and Vary behavior intentionally.
- Use ETag/If-Match for optimistic concurrency and lost-update prevention.
- Use If-None-Match for efficient reads or create-if-absent patterns.
- Ensure cache keys include authorization- and tenant-relevant dimensions.
- Never cache sensitive personalized responses in shared caches without explicit controls.

## Payload conventions

- Use ISO 8601/RFC 3339 timestamps with timezone offsets; prefer UTC for persisted events.
- Represent money as currency plus decimal-safe amount, never binary float alone.
- Define units in field names or companion metadata.
- Keep enums extensible; clients must handle unknown values unless the contract is closed by design.
- Distinguish missing from explicit null.
- Bound strings, arrays, nesting, and file sizes.
- Define Unicode normalization and case sensitivity where identifiers are user supplied.
