#!/usr/bin/env python3
"""Detect a conservative subset of breaking OpenAPI contract changes."""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from _utils import load_document

HTTP_METHODS = {"get", "put", "post", "delete", "options", "head", "patch", "trace"}


def operations(doc: dict[str, Any]) -> dict[tuple[str, str], dict[str, Any]]:
    result: dict[tuple[str, str], dict[str, Any]] = {}
    for path, path_item in (doc.get("paths") or {}).items():
        if not isinstance(path_item, dict):
            continue
        for method, operation in path_item.items():
            if method.lower() in HTTP_METHODS and isinstance(operation, dict):
                result[(path, method.lower())] = operation
    return result


def params(operation: dict[str, Any]) -> dict[tuple[str, str], dict[str, Any]]:
    result: dict[tuple[str, str], dict[str, Any]] = {}
    for parameter in operation.get("parameters", []) or []:
        if isinstance(parameter, dict) and "$ref" not in parameter:
            name = parameter.get("name")
            location = parameter.get("in")
            if isinstance(name, str) and isinstance(location, str):
                result[(name, location)] = parameter
    return result


def schema_type(schema: Any) -> Any:
    if not isinstance(schema, dict):
        return None
    return schema.get("type")


def compare(old: Any, new: Any) -> list[dict[str, str]]:
    findings: list[dict[str, str]] = []
    if not isinstance(old, dict) or not isinstance(new, dict):
        return [{"classification": "breaking", "location": "$", "change": "Both documents must be objects"}]

    old_ops = operations(old)
    new_ops = operations(new)
    for key in sorted(old_ops):
        if key not in new_ops:
            findings.append({"classification": "breaking", "location": f"{key[1].upper()} {key[0]}", "change": "operation removed"})
            continue
        old_op, new_op = old_ops[key], new_ops[key]
        old_params, new_params = params(old_op), params(new_op)
        for param_key, new_param in new_params.items():
            if param_key not in old_params and new_param.get("required") is True:
                findings.append({"classification": "breaking", "location": f"{key[1].upper()} {key[0]} parameter {param_key}", "change": "required parameter added"})
        for param_key in old_params:
            if param_key not in new_params:
                findings.append({"classification": "breaking", "location": f"{key[1].upper()} {key[0]} parameter {param_key}", "change": "parameter removed"})
            elif schema_type(old_params[param_key].get("schema")) != schema_type(new_params[param_key].get("schema")):
                findings.append({"classification": "breaking", "location": f"{key[1].upper()} {key[0]} parameter {param_key}", "change": "parameter type changed"})

        old_responses = old_op.get("responses", {}) or {}
        new_responses = new_op.get("responses", {}) or {}
        for status in old_responses:
            if status not in new_responses:
                findings.append({"classification": "breaking", "location": f"{key[1].upper()} {key[0]} response {status}", "change": "documented response removed"})

    for key in sorted(new_ops):
        if key not in old_ops:
            findings.append({"classification": "additive", "location": f"{key[1].upper()} {key[0]}", "change": "operation added"})

    old_schemas = ((old.get("components") or {}).get("schemas") or {}) if isinstance(old.get("components"), dict) else {}
    new_schemas = ((new.get("components") or {}).get("schemas") or {}) if isinstance(new.get("components"), dict) else {}
    if isinstance(old_schemas, dict) and isinstance(new_schemas, dict):
        for name, old_schema in old_schemas.items():
            if name not in new_schemas:
                findings.append({"classification": "breaking", "location": f"components.schemas.{name}", "change": "schema removed"})
                continue
            new_schema = new_schemas[name]
            if isinstance(old_schema, dict) and isinstance(new_schema, dict):
                old_required = set(old_schema.get("required", []) or [])
                new_required = set(new_schema.get("required", []) or [])
                for prop in sorted(new_required - old_required):
                    findings.append({"classification": "breaking", "location": f"components.schemas.{name}.{prop}", "change": "property became required"})
                old_props = old_schema.get("properties", {}) or {}
                new_props = new_schema.get("properties", {}) or {}
                if isinstance(old_props, dict) and isinstance(new_props, dict):
                    for prop, old_prop in old_props.items():
                        if prop not in new_props:
                            findings.append({"classification": "breaking", "location": f"components.schemas.{name}.{prop}", "change": "property removed"})
                        elif schema_type(old_prop) != schema_type(new_props[prop]):
                            findings.append({"classification": "breaking", "location": f"components.schemas.{name}.{prop}", "change": "property type changed"})
                    for prop in new_props.keys() - old_props.keys():
                        findings.append({"classification": "additive", "location": f"components.schemas.{name}.{prop}", "change": "optional property added"})

    return findings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("old", type=Path)
    parser.add_argument("new", type=Path)
    parser.add_argument("--json", action="store_true", dest="json_output")
    args = parser.parse_args()
    try:
        old = load_document(args.old)
        new = load_document(args.new)
    except Exception as exc:
        print(f"ERROR: cannot parse document: {exc}")
        return 2
    findings = compare(old, new)
    breaking = [item for item in findings if item["classification"] == "breaking"]
    if args.json_output:
        print(json.dumps({"summary": {"breaking": len(breaking), "total": len(findings)}, "changes": findings}, indent=2))
    else:
        for item in findings:
            print(f"{item['classification'].upper()}: {item['location']}: {item['change']}")
        print(f"Summary: {len(breaking)} breaking change(s), {len(findings)} total change(s)")
    return 1 if breaking else 0


if __name__ == "__main__":
    sys.exit(main())
