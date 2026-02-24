#!/usr/bin/env python3
"""ESN command‑line utility.

This script provides a simple command‑line interface (CLI) for performing
common developer tasks. Over time it may grow into a more fully featured
tool akin to `kubectl` or `docker`. At present it supports only a handful
of demonstration commands.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


def run_api() -> None:
    """Run the ESN API server locally using Uvicorn."""
    api_dir = Path(__file__).resolve().parents[3] / "services" / "api"
    cmd = [
        sys.executable,
        "-m",
        "uvicorn",
        "app.main:app",
        "--reload",
        "--port",
        "8000",
    ]
    subprocess.run(cmd, cwd=api_dir, check=True)


def seed_database() -> None:
    """Seed the local database using the provided script."""
    script = Path(__file__).resolve().parents[2] / "scripts" / "seed_db.py"
    subprocess.run([sys.executable, str(script)], check=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Environmental Sentinel Network CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    parser_api = subparsers.add_parser("run-api", help="Run the local FastAPI server")
    parser_api.set_defaults(func=lambda args: run_api())

    parser_seed = subparsers.add_parser("seed-db", help="Seed the local database with taxonomy data")
    parser_seed.set_defaults(func=lambda args: seed_database())

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()