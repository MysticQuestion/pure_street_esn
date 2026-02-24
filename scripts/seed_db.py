"""Seed the ESN database with initial data.

This script populates the local database with hazard categories and severity
levels defined in the taxonomy. It is intended for development and testing
purposes only. In production, migrations and seed data should be managed via
Alembic or another schema management tool.
"""

import json
import os
from pathlib import Path
import yaml

def load_yaml(path: Path) -> dict:
    with open(path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def main() -> None:
    # Determine file paths
    base_dir = Path(__file__).resolve().parents[1] / 'data' / 'taxonomy'
    categories_file = base_dir / 'hazard-categories.yml'
    severity_file = base_dir / 'severity-levels.yml'
    tags_file = base_dir / 'tags.yml'

    # Load YAML files
    categories = load_yaml(categories_file)
    severity_levels = load_yaml(severity_file)
    tags = load_yaml(tags_file)

    # Print summary as proof of concept
    print("Loaded {} categories, {} severity levels and {} tags.".format(
        len(categories.get('categories', [])),
        len(severity_levels.get('levels', [])),
        len(tags.get('tags', {})),
    ))

    # TODO: insert into database using SQLAlchemy or another ORM


if __name__ == '__main__':
    main()