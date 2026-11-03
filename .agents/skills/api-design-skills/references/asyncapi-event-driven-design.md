# AsyncAPI and event-driven design

## Contents

1. Event taxonomy
2. AsyncAPI contract
3. Delivery semantics
4. Schema evolution
5. Operations

## Event taxonomy

Distinguish:

- domain event: immutable fact that occurred
- integration event: externally consumable fact
- command: request to perform work
- notification: signal that may require fetching current state

Use event names that describe facts, not transport or table changes.

## AsyncAPI contract

Define:

- exact AsyncAPI version
- application metadata and ownership
- servers, protocols, bindings, and security
- channels and addresses
- send/receive operations
- messages, payload schemas, headers, correlation IDs, and examples
- traits only when they reduce duplication without hiding behavior

## Delivery semantics

Explicitly state:

- at-most-once, at-least-once, or broker-specific delivery behavior
- ordering scope
- partition/shard key
- retention and replay
- retry and dead-letter policy
- deduplication key and window
- maximum payload size
- backpressure and consumer lag controls

Do not claim exactly-once end-to-end semantics without defining transaction boundaries and failure behavior.

## Schema evolution

- Prefer additive changes.
- Assign stable event type and schema version.
- Define producer and consumer compatibility rules.
- Preserve old schemas through the support window.
- Test old consumers against new producers and vice versa.

## Operations

Include event observability: event ID, trace context, correlation and causation IDs, producer identity, occurred-at and published-at timestamps. Exclude secrets and unnecessary personal data.
