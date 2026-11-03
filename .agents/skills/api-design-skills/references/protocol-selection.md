# Protocol selection

## Contents

1. Decision criteria
2. REST/HTTP
3. Async messaging
4. GraphQL
5. gRPC
6. Webhooks and streaming
7. Hybrid architectures

## Decision criteria

Evaluate each candidate against:

- consumer diversity and control
- request/response versus event notification
- latency and throughput
- browser and network compatibility
- schema and code-generation needs
- caching and intermediary support
- consistency and transaction boundaries
- streaming direction and session lifetime
- security and identity propagation
- operational maturity and tooling
- public ecosystem versus internal fleet

Record the decision as: context, forces, selected style, rejected alternatives, consequences, and revisit triggers.

## REST/HTTP

Use for interoperable resource-oriented APIs, public/partner APIs, and systems that benefit from HTTP semantics, caching, conditional requests, gateways, and broad tooling.

Avoid fake REST: RPC verbs in every path, status-code tunneling, one universal POST endpoint, or persistence tables exposed directly.

## Async messaging

Use when producers and consumers need temporal decoupling, fan-out, buffering, replay, or independent availability. Define broker semantics explicitly rather than assuming exactly-once delivery.

## GraphQL

Use when multiple consumers need different projections over a coherent graph and the organization can operate resolver authorization, query-cost controls, caching, schema governance, and data-loader patterns.

Do not choose GraphQL merely to avoid endpoint design.

## gRPC

Use for controlled service-to-service clients, strongly typed APIs, low latency, bidirectional streaming, and multi-language code generation. Account for browser access, proxies, observability, and protobuf evolution.

## Webhooks and streaming

- Webhooks: provider-to-consumer notifications with consumer-owned endpoints.
- SSE: server-to-client ordered text event stream over HTTP with reconnect semantics.
- WebSocket: long-lived bidirectional sessions when both directions are active.
- Polling: acceptable when simplicity, firewalls, and low update frequency dominate.

## Hybrid architectures

A hybrid is valid only when each surface has one purpose and canonical ownership. Common patterns:

- REST commands/queries plus domain events
- gRPC internal services plus REST public facade
- REST management API plus webhooks
- GraphQL experience API over domain services

Prevent semantic drift with shared domain definitions and contract tests, not shared persistence models.
