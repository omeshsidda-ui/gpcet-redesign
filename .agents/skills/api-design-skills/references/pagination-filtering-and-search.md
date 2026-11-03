# Pagination, filtering, sorting, and search

## Pagination

Every collection must have a maximum page size and deterministic order.

Prefer cursor pagination when:

- collections mutate frequently
- results are large
- stable continuation matters
- storage can produce a seek key

A cursor must be opaque, integrity protected when client-modifiable, scoped to the query and principal, and time-bounded when state expires.

Offset pagination is acceptable for small, stable, user-facing datasets where random page access matters. Document drift and performance limits.

Responses should expose items and a continuation link/token. Total count is optional and may be expensive or approximate; label it accurately.

## Filtering

Define an allowlisted grammar. Bound expression length, nesting, operators, fields, time windows, and result cost. Parameterize backend queries. Do not expose raw SQL, search-engine DSL, or arbitrary object paths.

## Sorting

Allowlist sortable fields and directions. Always add a stable tie-breaker. Define null ordering and locale/collation behavior.

## Search

Separate exact filtering from relevance search. Define normalization, tokenization, ranking, typo tolerance, language behavior, freshness, and pagination consistency. Avoid exposing sensitive existence through search suggestions or counts.

## Partial response

Field selection can reduce bandwidth but increases authorization and caching complexity. Apply an allowlist and field-level authorization. Do not let clients request internal or write-only properties.
