# Linting Tools

This directory contains configuration files and helper scripts for linting
and static analysis across the ESN codebase.

## Python

We use [Ruff](https://github.com/astral-sh/ruff) as a fast, opinionated
linter. Ruff configuration can be found in the `pyproject.toml` of each
service or package. To run Ruff manually:

```bash
pip install ruff
ruff check .
```

## TypeScript/JavaScript

For Node/React code, we recommend ESLint with the `eslint:recommended`
preset. The client applications include basic ESLint configuration. To run
ESLint:

```bash
npm install eslint
npm run lint
```

## Git Hooks

Consider configuring pre‑commit hooks (e.g. via `pre-commit`) to enforce
linting and formatting before commits are made. This repository does not
include a pre‑commit config by default but contributors may add one.