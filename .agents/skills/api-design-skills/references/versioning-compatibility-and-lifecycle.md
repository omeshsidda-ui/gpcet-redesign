# Versioning, compatibility, and lifecycle

## Compatibility first

Prefer additive evolution and capability negotiation over frequent major versions. Treat behavior, validation, ordering, defaults, error codes, and performance assumptions as contract surfaces, not only schemas.

## Breaking changes

Examples include:

- removing or renaming operations, fields, enum values, events, or scopes
- adding required input
- narrowing accepted values or increasing validation strictness
- changing type, format, nullability, default, meaning, ordering, or pagination
- changing authentication or authorization requirements
- changing retry/idempotency behavior
- making a synchronous operation asynchronous without a migration contract

## Versioning strategy

Choose one primary strategy and apply it consistently:

- path or hostname major versions for public APIs requiring explicit routing
- media-type/profile versions when content negotiation is a core platform capability
- date/version parameters for controlled platform ecosystems
- schema/event versioning for messaging
- package versioning for gRPC/protobuf

Do not place patch/minor implementation versions in URLs.

## Deprecation and sunset

Publish:

- replacement and migration guide
- deprecation date
- last supported date
- telemetry/contact process
- SDK/tooling impact
- rollback or extension policy

For HTTP, use the standardized `Deprecation` response field and `Sunset` where appropriate. Keep documentation and runtime signals aligned.

## Compatibility testing

Automate contract diffing, consumer tests, old/new client matrix tests, schema compatibility, and replay tests. Require explicit approval for accepted breaking changes.
