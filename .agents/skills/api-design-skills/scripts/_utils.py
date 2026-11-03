#!/usr/bin/env python3
"""Shared utilities for API design skill validators."""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

try:
    import yaml  # type: ignore
except ImportError:  # pragma: no cover
    yaml = None

SECRET_PATTERNS = [
    re.compile(r"(?i)(api[_-]?key|client[_-]?secret|access[_-]?token|refresh[_-]?token|password)\s*[:=]\s*['\"]?[A-Za-z0-9_./+\-=]{12,}"),
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    re.compile(r"\bgh[pousr]_[A-Za-z0-9]{20,}\b"),
    re.compile(r"\bsk-[A-Za-z0-9_-]{20,}\b"),
]

PLACEHOLDERS = re.compile(r"(?i)\b(TODO|TBD|FIXME|CHANGEME|REPLACE_ME)\b")


def load_document(path: Path) -> Any:
    text = path.read_text(encoding="utf-8")
    suffix = path.suffix.lower()
    if suffix == ".json":
        return json.loads(text)
    if suffix in {".yaml", ".yml"}:
        if yaml is None:
            raise RuntimeError("PyYAML is required to read YAML files")
        return yaml.safe_load(text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        if yaml is None:
            raise RuntimeError("Unknown document type and PyYAML is unavailable")
        return yaml.safe_load(text)


def dump_result(errors: list[str], warnings: list[str], json_output: bool = False) -> None:
    if json_output:
        print(json.dumps({"errors": errors, "warnings": warnings}, indent=2))
        return
    for item in errors:
        print(f"ERROR: {item}")
    for item in warnings:
        print(f"WARNING: {item}")
    print(f"Summary: {len(errors)} error(s), {len(warnings)} warning(s)")


def walk_values(value: Any, path: str = "$"):
    if isinstance(value, dict):
        for key, child in value.items():
            child_path = f"{path}.{key}"
            yield child_path, child
            yield from walk_values(child, child_path)
    elif isinstance(value, list):
        for index, child in enumerate(value):
            child_path = f"{path}[{index}]"
            yield child_path, child
            yield from walk_values(child, child_path)


def scan_for_secrets(value: Any) -> list[str]:
    findings: list[str] = []
    for location, child in walk_values(value):
        if isinstance(child, str):
            for pattern in SECRET_PATTERNS:
                if pattern.search(child):
                    findings.append(location)
                    break
    return findings


def is_placeholder_host(url: str) -> bool:
    return any(token in url for token in ("example.com", "example.invalid", "localhost", "127.0.0.1"))
