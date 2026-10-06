#!/usr/bin/env python3
"""Build the Input Suggestions Toggle WebExtension into an installable .xpi.

Usage:
    python build.py                # -> dist/input-suggestions-toggle-1.0.0.xpi
    python build.py custom/path.xpi

The .xpi is simply a ZIP archive with manifest.json at its root.
"""

from __future__ import annotations

import json
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANIFEST = ROOT / "manifest.json"
DIST_DIR = ROOT / "dist"

EXCLUDE_DIRS = {"dist", ".git", "__pycache__", ".vscode", ".idea", "node_modules"}
EXCLUDE_SUFFIXES = {".py", ".xpi", ".md", ".log", ".pyc"}
EXCLUDE_NAMES = {".DS_Store", "Thumbs.db"}


def load_manifest() -> dict:
    if not MANIFEST.is_file():
        sys.exit(f"error: manifest.json not found in {ROOT}")
    try:
        data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        sys.exit(f"error: manifest.json is not valid JSON: {exc}")
    for key in ("name", "version"):
        if key not in data:
            sys.exit(f"error: manifest.json is missing required key '{key}'")
    return data


def iter_files() -> list[Path]:
    files: list[Path] = []
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(ROOT)
        if any(part in EXCLUDE_DIRS for part in rel.parts):
            continue
        if path.suffix.lower() in EXCLUDE_SUFFIXES:
            continue
        if path.name in EXCLUDE_NAMES:
            continue
        files.append(path)
    return files


def slug(name: str) -> str:
    cleaned = "".join(c if c.isalnum() else "-" for c in name.lower())
    return "-".join(filter(None, cleaned.split("-")))


def build(output: Path | None = None) -> Path:
    manifest = load_manifest()
    files = iter_files()
    if not files:
        sys.exit("error: no files found to package")

    output = output or DIST_DIR / f"{slug(manifest['name'])}-{manifest['version']}.xpi"
    output = output.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in files:
            zf.write(path, path.relative_to(ROOT).as_posix())

    print(f"Built {manifest['name']} v{manifest['version']}")
    print(f"  -> {output}")
    print(f"  {len(files)} files:")
    for path in files:
        print(f"     {path.relative_to(ROOT).as_posix()}")
    return output


if __name__ == "__main__":
    target = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    build(target)
