# Authentication and authorization

## Contents

1. Identity model
2. OAuth and OIDC
3. Tokens and keys
4. Service identity
5. Authorization
6. High-assurance profiles

## Identity model

Define actors separately: human user, confidential client, public client, workload, administrator, support operator, webhook provider, and automation agent. State who issues identity, who consumes it, and how tenant context is established.

## OAuth and OIDC

Use Authorization Code with PKCE for browser/mobile public clients. Use client credentials or workload federation for machine identities. Follow OAuth 2.0 Security BCP.

Do not use:

- implicit grant
- resource owner password credentials
- open redirect URIs
- wildcard redirect URIs
- bearer tokens in query strings
- tokens issued for one resource at another resource

Use exact redirect matching, state and nonce where applicable, issuer validation, PKCE, short-lived codes, and authorization server metadata.

## Tokens and keys

Validate:

- signature and allowed algorithm
- issuer and audience
- expiration and not-before
- token type and intended use
- authorized party/client where relevant
- scope/permission claims
- revocation/session state when required

Never accept algorithms from untrusted token headers without policy. Do not use one key across environments or unrelated token types. Rotate signing keys and retain prior public keys for the verification window.

API keys identify applications or projects, not end users. Store hashes where verification does not require recovering the key. Prefix keys for identification, use high entropy, support rotation, and scope them narrowly.

## Service identity

Prefer short-lived workload identity. For elevated-risk APIs, consider sender-constrained tokens using DPoP or mTLS. Protect metadata services and prevent credential forwarding across trust boundaries.

## Authorization

Use deny-by-default policy. Check:

- operation permission
- object ownership/access
- field/property access
- tenant boundary
- state transition permission
- relationship and parent scope
- administrative elevation

Do not rely on hidden UI controls, client claims, object IDs, or gateway authentication as authorization.

## High-assurance profiles

For financial, health, identity, or other high-risk APIs, evaluate FAPI 2.0-style controls, PAR, sender-constrained tokens, signed requests/responses, stricter client authentication, and replay defenses. Apply only supported profiles and document interoperability requirements.
