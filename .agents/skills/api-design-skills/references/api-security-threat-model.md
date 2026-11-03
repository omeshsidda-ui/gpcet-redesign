# API security threat model

## Contents

1. Threat-model workflow
2. Authorization and identity
3. Input and output
4. Resource consumption
5. Network and integrations
6. Inventory and supply chain
7. Protocol-specific threats

## Threat-model workflow

For each operation identify assets, actors, entry points, trust boundaries, data classifications, attacker goals, abuse cases, controls, detection, and residual risk. Map findings to concrete contract and implementation requirements.

## Authorization and identity

Test for:

- object-level authorization bypass
- property-level read/write bypass
- function-level privilege escalation
- cross-tenant access
- confused deputy behavior
- token audience or issuer confusion
- session fixation and replay
- insecure account recovery and credential rotation

## Input and output

Apply allowlisted validation after parsing and canonicalization. Bound depth, size, count, numeric ranges, and decompression ratio. Protect against SQL/NoSQL/command/template injection, unsafe deserialization, path traversal, XML entity expansion, regex denial of service, malicious files, and content-type confusion.

Use response schemas and property authorization to prevent excessive data exposure. Redact secrets, credentials, internal stack traces, and unnecessary personal data.

## Resource consumption

Enforce quotas by relevant principal, tenant, operation, and cost dimension. Bound GraphQL complexity, export/report jobs, uploads, fan-out, webhook registrations, search windows, and pagination limits. Use timeouts, concurrency limits, circuit breakers, and budgeted retries.

## Network and integrations

Prevent SSRF with destination policy, DNS/IP revalidation, redirect controls, protocol allowlists, metadata endpoint blocking, and egress segmentation. Validate third-party responses as untrusted input. Use TLS verification and certificate policy appropriate to the environment.

## Inventory and supply chain

Maintain an API inventory with owner, environment, audience, version, data classification, dependencies, and sunset state. Remove shadow endpoints and stale versions. Scan contracts, code, images, dependencies, and examples for secrets and vulnerabilities.

## Protocol-specific threats

- REST: mass assignment, ID enumeration, cache confusion, method override abuse
- GraphQL: depth/alias/batch amplification, field authorization, introspection leakage
- gRPC: reflection exposure, oversized messages, metadata trust, stream exhaustion
- Webhooks: replay, signature canonicalization, endpoint takeover, retry amplification
- Events: poison messages, schema confusion, unauthorized subscription, replay leakage

Use the OWASP API Security Top 10 as a baseline, not a complete threat model.
