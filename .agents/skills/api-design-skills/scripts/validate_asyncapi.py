#!/usr/bin/env python3
"""Lightweight semantic and security validation for AsyncAPI 3.x documents."""
from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Any

from _utils import dump_result, load_document, scan_for_secrets


def validate(doc: Any) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    if not isinstance(doc, dict):
        return ["root must be an object"], warnings

    version = str(doc.get("asyncapi", ""))
    if not version.startswith("3."):
        errors.append("asyncapi must declare a supported 3.x version")

    info = doc.get("info")
    if not isinstance(info, dict):
        errors.append("info object is required")
    else:
        for key in ("title", "version"):
            if not info.get(key):
                errors.append(f"info.{key} is required")
        if not info.get("description"):
            warnings.append("info.description is missing")

    servers = doc.get("servers", {})
    if not isinstance(servers, dict) or not servers:
        warnings.append("no servers are declared")
    else:
        for name, server in servers.items():
            if not isinstance(server, dict):
                errors.append(f"server {name} must be an object")
                continue
            if not server.get("host"):
                errors.append(f"server {name} missing host")
            if not server.get("protocol"):
                errors.append(f"server {name} missing protocol")
            if str(server.get("protocol", "")).lower() in {"http", "ws"}:
                warnings.append(f"server {name} uses an unencrypted protocol")

    channels = doc.get("channels", {})
    if not isinstance(channels, dict) or not channels:
        errors.append("channels must be a non-empty object")
        channels = {}
    for name, channel in channels.items():
        if not isinstance(channel, dict):
            errors.append(f"channel {name} must be an object")
            continue
        if not channel.get("address"):
            warnings.append(f"channel {name} has no address")
        messages = channel.get("messages")
        if not isinstance(messages, dict) or not messages:
            errors.append(f"channel {name} has no messages")

    operations = doc.get("operations", {})
    if not isinstance(operations, dict) or not operations:
        errors.append("operations must be a non-empty object")
    else:
        for name, operation in operations.items():
            if not isinstance(operation, dict):
                errors.append(f"operation {name} must be an object")
                continue
            if operation.get("action") not in {"send", "receive"}:
                errors.append(f"operation {name} action must be send or receive")
            if not operation.get("channel"):
                errors.append(f"operation {name} missing channel reference")
            if not operation.get("messages"):
                warnings.append(f"operation {name} does not declare messages")

    components = doc.get("components", {})
    messages = components.get("messages", {}) if isinstance(components, dict) else {}
    if isinstance(messages, dict):
        for name, message in messages.items():
            if not isinstance(message, dict):
                continue
            if not message.get("name"):
                warnings.append(f"message {name} has no stable name")
            if not message.get("payload"):
                errors.append(f"message {name} has no payload schema")
            if not message.get("correlationId"):
                warnings.append(f"message {name} has no correlationId")
            headers = message.get("headers")
            if not headers:
                warnings.append(f"message {name} has no headers schema for event identity/trace metadata")

    for location in scan_for_secrets(doc):
        errors.append(f"possible credential or private key at {location}")

    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("path", type=Path)
    parser.add_argument("--json", action="store_true", dest="json_output")
    parser.add_argument("--strict", action="store_true")
    args = parser.parse_args()
    try:
        doc = load_document(args.path)
    except Exception as exc:
        print(f"ERROR: cannot parse document: {exc}")
        return 2
    errors, warnings = validate(doc)
    dump_result(errors, warnings, args.json_output)
    return 1 if errors or (args.strict and warnings) else 0


if __name__ == "__main__":
    sys.exit(main())
