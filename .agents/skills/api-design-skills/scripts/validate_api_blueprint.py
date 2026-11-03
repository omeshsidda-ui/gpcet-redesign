#!/usr/bin/env python3
"""Validate an API design blueprint JSON document."""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from _utils import dump_result, scan_for_secrets

REQUIRED = [
    "metadata", "context", "protocols", "domain", "contracts", "security",
    "reliability", "compatibility", "testing", "operations",
    "implementationPlan", "assumptions", "openQuestions",
]
VALID_PROTOCOLS = {"rest", "http", "asyncapi", "graphql", "grpc", "webhook", "sse", "websocket", "other"}


def nonempty(value: Any) -> bool:
    return value not in (None, "", [], {})


def validate(data: Any) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    if not isinstance(data, dict):
        return ["root must be an object"], warnings

    for key in REQUIRED:
        if key not in data:
            errors.append(f"missing top-level section: {key}")

    metadata = data.get("metadata", {})
    if isinstance(metadata, dict):
        for key in ("name", "version", "status", "owner", "generatedAt"):
            if not nonempty(metadata.get(key)):
                errors.append(f"metadata.{key} is required")
    else:
        errors.append("metadata must be an object")

    protocols = data.get("protocols", [])
    if not isinstance(protocols, list) or not protocols:
        errors.append("protocols must be a non-empty array")
    else:
        primary = 0
        for index, item in enumerate(protocols):
            if not isinstance(item, dict):
                errors.append(f"protocols[{index}] must be an object")
                continue
            if item.get("type") not in VALID_PROTOCOLS:
                errors.append(f"protocols[{index}].type is invalid")
            if item.get("status") == "primary":
                primary += 1
            for key in ("role", "status", "rationale"):
                if not nonempty(item.get(key)):
                    errors.append(f"protocols[{index}].{key} is required")
        if primary == 0:
            warnings.append("no protocol is marked primary")

    context = data.get("context", {})
    if isinstance(context, dict):
        if context.get("exposure") in {"public", "partner", "mixed"} and not context.get("dataClassification"):
            warnings.append("external API has no data classification")
        if not context.get("audience"):
            errors.append("context.audience must be non-empty")
    else:
        errors.append("context must be an object")

    contracts = data.get("contracts", {})
    if isinstance(contracts, dict):
        for key in ("artifacts", "errorModel", "pagination", "idempotency"):
            if not nonempty(contracts.get(key)):
                errors.append(f"contracts.{key} is required")
        if "problem" not in str(contracts.get("errorModel", "")).lower():
            warnings.append("HTTP error model does not mention Problem Details")
    else:
        errors.append("contracts must be an object")

    security = data.get("security", {})
    if isinstance(security, dict):
        for key in ("authentication", "authorization", "tenantIsolation", "abuseControls", "threats"):
            if not nonempty(security.get(key)):
                errors.append(f"security.{key} is required")
        auth_text = json.dumps(security.get("authentication", {})).lower()
        if "query" in auth_text and ("token" in auth_text or "api key" in auth_text or "apikey" in auth_text):
            errors.append("authentication appears to place credentials in query parameters")
        if not isinstance(security.get("threats"), list) or len(security.get("threats", [])) < 1:
            errors.append("security.threats must contain at least one threat")
    else:
        errors.append("security must be an object")

    reliability = data.get("reliability", {})
    if isinstance(reliability, dict):
        for key in ("timeouts", "retries", "limits", "observability"):
            if not nonempty(reliability.get(key)):
                errors.append(f"reliability.{key} is required")
    else:
        errors.append("reliability must be an object")

    compatibility = data.get("compatibility", {})
    if isinstance(compatibility, dict):
        for key in ("strategy", "breakingChangePolicy", "deprecationPolicy"):
            if not nonempty(compatibility.get(key)):
                errors.append(f"compatibility.{key} is required")
    else:
        errors.append("compatibility must be an object")

    plan = data.get("implementationPlan", [])
    if not isinstance(plan, list) or not plan:
        errors.append("implementationPlan must be a non-empty array")
    else:
        seen: set[int] = set()
        for index, step in enumerate(plan):
            if not isinstance(step, dict):
                errors.append(f"implementationPlan[{index}] must be an object")
                continue
            for key in ("order", "action", "owner", "validation"):
                if not nonempty(step.get(key)):
                    errors.append(f"implementationPlan[{index}].{key} is required")
            order = step.get("order")
            if isinstance(order, int):
                if order in seen:
                    errors.append(f"duplicate implementation order: {order}")
                seen.add(order)

    secret_locations = scan_for_secrets(data)
    for location in secret_locations:
        errors.append(f"possible credential or private key at {location}")

    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("path", type=Path)
    parser.add_argument("--json", action="store_true", dest="json_output")
    parser.add_argument("--strict", action="store_true")
    args = parser.parse_args()
    try:
        data = json.loads(args.path.read_text(encoding="utf-8"))
    except Exception as exc:
        print(f"ERROR: cannot parse JSON: {exc}")
        return 2
    errors, warnings = validate(data)
    dump_result(errors, warnings, args.json_output)
    if errors or (args.strict and warnings):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
