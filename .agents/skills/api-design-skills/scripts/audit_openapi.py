#!/usr/bin/env python3
"""Lightweight semantic and security audit for OpenAPI 3.x documents."""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import Any

from _utils import dump_result, load_document, scan_for_secrets

HTTP_METHODS = {"get", "put", "post", "delete", "options", "head", "patch", "trace"}
PATH_BAD = re.compile(r"[A-Z_\s]")


def ref_value(doc: dict[str, Any], ref: str) -> Any:
    if not ref.startswith("#/"):
        return None
    current: Any = doc
    for part in ref[2:].split("/"):
        part = part.replace("~1", "/").replace("~0", "~")
        if not isinstance(current, dict) or part not in current:
            return None
        current = current[part]
    return current


def resolve_local(doc: dict[str, Any], value: Any) -> Any:
    if isinstance(value, dict) and isinstance(value.get("$ref"), str):
        resolved = ref_value(doc, value["$ref"])
        return resolved if resolved is not None else value
    return value


def audit(doc: Any) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    if not isinstance(doc, dict):
        return ["root must be an object"], warnings

    version = str(doc.get("openapi", ""))
    if not (version.startswith("3.1.") or version.startswith("3.2.")):
        errors.append("openapi must declare a supported 3.1.x or 3.2.x version")
    if version.startswith("3.2") and "$self" not in doc:
        warnings.append("OpenAPI 3.2 document has no $self URI")

    info = doc.get("info")
    if not isinstance(info, dict):
        errors.append("info object is required")
    else:
        for key in ("title", "version"):
            if not info.get(key):
                errors.append(f"info.{key} is required")
        if not info.get("summary") and not info.get("description"):
            warnings.append("info lacks summary/description")

    servers = doc.get("servers", [])
    if not servers:
        warnings.append("no servers are declared")
    elif isinstance(servers, list):
        for index, server in enumerate(servers):
            if not isinstance(server, dict) or not isinstance(server.get("url"), str):
                errors.append(f"servers[{index}].url is required")
                continue
            url = server["url"]
            if url.startswith("http://") and not ("localhost" in url or "127.0.0.1" in url):
                errors.append(f"servers[{index}] uses insecure HTTP")
            if "?" in url and any(token in url.lower() for token in ("token=", "key=", "secret=")):
                errors.append(f"servers[{index}] appears to contain a credential")

    paths = doc.get("paths", {})
    webhooks = doc.get("webhooks", {})
    if not isinstance(paths, dict):
        errors.append("paths must be an object")
        paths = {}
    if not paths and not webhooks:
        errors.append("at least one path or webhook is required")

    operation_ids: set[str] = set()
    has_problem = False
    for path, path_item in paths.items():
        if not isinstance(path, str) or not path.startswith("/"):
            errors.append(f"invalid path key: {path!r}")
            continue
        if PATH_BAD.search(path):
            warnings.append(f"path uses uppercase, underscore, or whitespace: {path}")
        if re.search(r"/(get|create|update|delete|list)-?", path, re.I):
            warnings.append(f"path appears verb-oriented: {path}")
        if not isinstance(path_item, dict):
            errors.append(f"path item must be an object: {path}")
            continue
        for method, operation in path_item.items():
            if method.lower() not in HTTP_METHODS:
                continue
            location = f"{method.upper()} {path}"
            if not isinstance(operation, dict):
                errors.append(f"{location} operation must be an object")
                continue
            operation_id = operation.get("operationId")
            if not isinstance(operation_id, str) or not operation_id:
                errors.append(f"{location} missing operationId")
            elif operation_id in operation_ids:
                errors.append(f"duplicate operationId: {operation_id}")
            else:
                operation_ids.add(operation_id)
            if not operation.get("summary") and not operation.get("description"):
                warnings.append(f"{location} lacks summary/description")
            responses = operation.get("responses")
            if not isinstance(responses, dict) or not responses:
                errors.append(f"{location} has no responses")
                continue
            if not any(str(code).startswith("2") for code in responses):
                errors.append(f"{location} has no 2xx response")
            if method.lower() != "get" and not any(str(code) in responses for code in ("400", "409", "412", "422", "default")):
                warnings.append(f"{location} has no validation/conflict/default error response")
            if not any(str(code) in responses for code in ("401", "403", "default")):
                warnings.append(f"{location} has no authentication/authorization error response")
            for response in responses.values():
                response = resolve_local(doc, response)
                if not isinstance(response, dict):
                    continue
                content = response.get("content", {})
                if isinstance(content, dict) and "application/problem+json" in content:
                    has_problem = True

    if not has_problem:
        warnings.append("no application/problem+json response was found")

    components = doc.get("components", {})
    if not isinstance(components, dict):
        errors.append("components must be an object when present")
        components = {}
    schemes = components.get("securitySchemes", {}) if isinstance(components, dict) else {}
    global_security = doc.get("security")
    if not schemes and global_security:
        errors.append("security requirements exist but no securitySchemes are defined")
    if not schemes:
        warnings.append("no security schemes are defined")
    if isinstance(schemes, dict):
        for name, scheme in schemes.items():
            if not isinstance(scheme, dict):
                continue
            if scheme.get("type") == "apiKey" and scheme.get("in") == "query":
                errors.append(f"security scheme {name} puts API key in query parameters")
            if scheme.get("type") == "http" and str(scheme.get("scheme", "")).lower() == "basic":
                warnings.append(f"security scheme {name} uses HTTP Basic")
            if scheme.get("type") == "oauth2":
                flows = scheme.get("flows", {})
                if isinstance(flows, dict) and "implicit" in flows:
                    errors.append(f"security scheme {name} uses deprecated OAuth implicit flow")
                if isinstance(flows, dict) and "password" in flows:
                    errors.append(f"security scheme {name} uses resource owner password flow")

    schemas = components.get("schemas", {}) if isinstance(components, dict) else {}
    if isinstance(schemas, dict):
        for name, schema in schemas.items():
            if isinstance(schema, dict) and schema.get("type") == "object" and "additionalProperties" not in schema:
                warnings.append(f"schema {name} does not declare additionalProperties")

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
    errors, warnings = audit(doc)
    dump_result(errors, warnings, args.json_output)
    return 1 if errors or (args.strict and warnings) else 0


if __name__ == "__main__":
    sys.exit(main())
