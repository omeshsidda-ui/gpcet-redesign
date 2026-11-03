#!/usr/bin/env python3
"""Audit a repository/package containing API contracts and documentation."""
from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

from _utils import PLACEHOLDERS, SECRET_PATTERNS, dump_result

TEXT_SUFFIXES = {".md", ".txt", ".json", ".yaml", ".yml", ".graphql", ".gql", ".proto", ".toml", ".ini", ".env", ".sh", ".py", ".js", ".ts"}
SKIP_DIRS = {".git", "node_modules", ".venv", "venv", "dist", "build", "__pycache__"}


def audit(root: Path) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    if not root.exists() or not root.is_dir():
        return ["path must be an existing directory"], warnings

    files: list[Path] = []
    for current, dirs, names in os.walk(root):
        dirs[:] = [name for name in dirs if name not in SKIP_DIRS]
        for name in names:
            files.append(Path(current) / name)

    relative = {str(path.relative_to(root)) for path in files}
    if not any(name.lower().startswith("readme") for name in relative):
        warnings.append("package has no README")
    if not any(path.suffix.lower() in {".yaml", ".yml", ".json"} and "openapi" in path.name.lower() for path in files):
        warnings.append("package has no clearly named OpenAPI document")
    if not any("security" in path.name.lower() for path in files):
        warnings.append("package has no security document/profile")
    if not any("changelog" in path.name.lower() for path in files):
        warnings.append("package has no changelog")

    for path in files:
        try:
            size = path.stat().st_size
        except OSError:
            continue
        rel = path.relative_to(root)
        if size > 5 * 1024 * 1024:
            warnings.append(f"large file over 5 MiB: {rel}")
        if path.suffix.lower() not in TEXT_SUFFIXES or size > 2 * 1024 * 1024:
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        for pattern in SECRET_PATTERNS:
            if pattern.search(text):
                errors.append(f"possible credential or private key in {rel}")
                break
        rel_lower = str(rel).lower()
        if PLACEHOLDERS.search(text) and "template" not in rel_lower and "example" not in rel_lower and path.name != "_utils.py":
            warnings.append(f"unresolved placeholder in {rel}")
        if re.search(r"https?://[^\s]+(?:token|api_key|apikey|secret)=", text, re.I):
            errors.append(f"credential-like query parameter in URL in {rel}")

    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("path", type=Path)
    parser.add_argument("--json", action="store_true", dest="json_output")
    parser.add_argument("--strict", action="store_true")
    args = parser.parse_args()
    errors, warnings = audit(args.path)
    dump_result(errors, warnings, args.json_output)
    return 1 if errors or (args.strict and warnings) else 0


if __name__ == "__main__":
    sys.exit(main())
