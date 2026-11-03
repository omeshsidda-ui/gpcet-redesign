# Audit and troubleshooting

## Audit workflow

1. establish scope, audience, owner, environments, and current versions
2. collect contracts, gateway config, auth metadata, examples, SDKs, logs, and incidents
3. validate syntax and references
4. inspect semantics, security, compatibility, and operability
5. reproduce representative requests
6. classify findings by severity and confidence
7. provide minimal remediation and strategic redesign options
8. define verification tests

## Severity

- Critical: direct compromise, cross-tenant access, exposed credentials, or systemic destructive abuse
- High: practical authorization, authentication, injection, SSRF, or availability weakness
- Medium: meaningful reliability, compatibility, privacy, or operability gap
- Low: limited-risk inconsistency, documentation, or maintainability issue
- Advisory: improvement without a demonstrated defect

Each finding must include evidence, affected surface, impact, preconditions, recommendation, verification, and residual risk.

## HTTP diagnosis

Check method, URL normalization, proxy/gateway rewrites, Host/authority, TLS, content type, Accept, status, redirect behavior, CORS, cache, conditional headers, body limits, timeouts, and retries.

## OAuth/OIDC diagnosis

Check discovery metadata, issuer, redirect URI, PKCE, state/nonce, client authentication, audience/resource, scopes, token endpoint error, clock skew, signing keys, token type, and gateway forwarding.

## Contract diagnosis

Check OAS/AsyncAPI version, parser support, external references, circular schemas, dialect, examples, discriminator/composition, nullable semantics, generated client assumptions, and extension support.

## Webhook diagnosis

Check raw-body preservation, signature version, canonicalization, timestamp units, clock skew, secret selection, replay window, redirects, response latency, retries, and endpoint disablement.

## GraphQL diagnosis

Check transport status/content type, resolver errors, null propagation, authorization, N+1 calls, batching, depth/complexity, timeout, persisted operation registry, and schema/client mismatch.

## gRPC diagnosis

Check DNS/service config, TLS/SNI, metadata, deadlines, status details, message size, compression, retries, load balancing, reflection, and protobuf compatibility.
