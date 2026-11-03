# Output templates

## Complete API architecture report

```markdown
# API architecture

## Executive summary
## Assumptions and open decisions
## Consumers and trust boundaries
## Protocol decision
## Domain and ownership model
## Operations/resources/events
## Data contracts
## Authentication and authorization
## Security threat model
## Errors, idempotency, retries, and concurrency
## Pagination, filtering, search, and bulk behavior
## Compatibility, versioning, and lifecycle
## Reliability and observability
## Testing and conformance
## Implementation plan
## Risks and decisions required
## Artifacts produced
```

## API blueprint JSON

Use the schema in `assets/api-blueprint.schema.json`. Required top-level sections:

```json
{
  "metadata": {},
  "context": {},
  "protocols": [],
  "domain": {},
  "contracts": {},
  "security": {},
  "reliability": {},
  "compatibility": {},
  "testing": {},
  "operations": {},
  "implementationPlan": [],
  "assumptions": [],
  "openQuestions": []
}
```

## Security profile JSON

```json
{
  "classification": "internal|partner|public|high-assurance",
  "dataClasses": [],
  "actors": [],
  "authentication": {},
  "authorization": {},
  "tokenValidation": {},
  "tenantIsolation": {},
  "abuseControls": {},
  "networkControls": {},
  "loggingAndPrivacy": {},
  "threats": [],
  "securityTests": []
}
```

## Compatibility report JSON

```json
{
  "oldContract": "path-or-version",
  "newContract": "path-or-version",
  "summary": {"breaking": 0, "risky": 0, "additive": 0},
  "changes": [
    {
      "classification": "breaking|risky|additive|documentation",
      "location": "...",
      "change": "...",
      "consumerImpact": "...",
      "migration": "..."
    }
  ],
  "releaseRecommendation": "block|approve-with-migration|approve"
}
```

## Finding format

```markdown
### [ID] Finding title

- Severity:
- Confidence:
- Affected surface:
- Evidence:
- Impact:
- Preconditions:
- Recommendation:
- Verification:
- Residual risk:
```
