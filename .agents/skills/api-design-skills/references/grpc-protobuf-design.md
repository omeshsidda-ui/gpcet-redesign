# gRPC and protobuf design

## Contents

1. Service boundaries
2. RPC shapes
3. Protobuf evolution
4. Reliability
5. Security and operations

## Service boundaries

Organize services around bounded business capabilities. Avoid one service per database table and giant services that aggregate unrelated domains. Keep transport messages separate from persistence entities.

## RPC shapes

Use unary RPCs by default. Choose server, client, or bidirectional streaming only when the interaction genuinely needs streaming. Define deadlines, cancellation, flow control, maximum message sizes, and retry eligibility.

Return canonical status codes consistently and attach structured error details when consumers can use them. Do not encode errors only in successful response messages.

## Protobuf evolution

- Never reuse removed field numbers or names; mark them reserved.
- Add fields with safe defaults.
- Avoid changing field types, cardinality, or semantic meaning.
- Avoid required semantics that old clients cannot satisfy.
- Stabilize package and service names before broad distribution.
- Use `oneof` carefully; adding variants can break exhaustive clients.
- Maintain compatibility tests across generated clients.

## Reliability

Define retryable status codes, deadlines, hedging policy, idempotency, and server overload behavior. Retries require budgets and jitter. Streaming APIs need reconnect, resume, and duplicate-handling rules.

## Security and operations

Use TLS for network transport and workload identity/mTLS where appropriate. Authorize each RPC and resource. Control reflection in untrusted environments. Propagate trace context and correlation metadata without forwarding untrusted identity headers blindly.
