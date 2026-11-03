# OpenAPI contract design

## Contents

1. Version selection
2. Document structure
3. Operations and components
4. Security
5. Examples and documentation
6. Tooling compatibility

## Version selection

- Prefer OpenAPI 3.2 for greenfield contracts when all required tooling supports it.
- Use OpenAPI 3.1 compatibility mode when gateways, generators, validators, or portals lag.
- Never silently downgrade. Record omitted or transformed semantics.
- Set `openapi` and `jsonSchemaDialect` explicitly when relevant.

## Document structure

A production contract should include:

- stable API title, semantic document version, summary, description, contact, and license
- environment-safe server templates or placeholder hosts
- tags aligned to bounded capabilities
- stable operation IDs
- paths or webhooks
- reusable schemas, parameters, headers, examples, responses, and security schemes
- global security with narrow operation overrides
- external documentation where needed

Split large contracts by bounded capability. Resolve references in CI and publish a bundled artifact for consumers.

## Operations and components

For every operation define:

- purpose and authorization rule
- parameters with bounds and examples
- request content types and schema
- complete success and relevant failure responses
- headers such as ETag, Location, Retry-After, Deprecation, and Sunset when applicable
- idempotency and retry behavior
- pagination and ordering
- audit and sensitivity notes through documented extensions only when tooling supports them

Schema guidance:

- avoid unconstrained free-form objects
- set `additionalProperties` intentionally
- use composition conservatively
- avoid ambiguous discriminator behavior
- define formats as annotations unless a validator contract is explicit
- use readOnly/writeOnly and required together carefully
- publish examples that validate against schemas

## Security

- Define OAuth/OIDC, mTLS, API key, or other schemes accurately.
- Never use an API key scheme to imply user identity or fine-grained authorization.
- Express alternative and combined security requirements correctly.
- Avoid embedding secrets in server URLs, examples, descriptions, or extensions.

## Examples and documentation

Include realistic redacted examples for success and each important error family. Examples should show pagination, conditional requests, long-running operations, and webhook verification where relevant.

## Tooling compatibility

Maintain a tested compatibility matrix for:

- validators and linters
- documentation renderers
- gateways
- client/server generators
- contract-test tools
- security scanners

A spec that is valid but unusable by the delivery toolchain is not release-ready.
