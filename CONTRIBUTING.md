# Contributing to the Environmental Sentinel Network

Thank you for considering contributing to the ESN project.  We welcome contributions of all kinds: bug fixes, feature requests, documentation improvements, and new modules.

## Getting Started

1. **Fork the repository** if you plan to submit changes via pull request.
2. **Clone your fork** and create a new branch for your change:

   ```bash
   git checkout -b feat/brief-description
   ```

3. **Install dependencies** following the instructions in the root `README.md`.
4. **Run the test suite** to ensure your environment is set up correctly:

   ```bash
   make test  # or python -m pytest, depending on the module
   ```

5. **Make your change**, adding tests as appropriate.

6. **Commit your change** with a descriptive commit message using [Conventional Commits](https://www.conventionalcommits.org) style.  Example:

   ```
   feat(api): add GET /v1/reports endpoint

   Adds a new endpoint to fetch a single report by ID.
   ```

7. **Push your branch** and open a pull request.  The PR template will guide you through the information we need to review your change.

## Branch Naming

- `feat/<topic>` – new features
- `fix/<bug>` – bug fixes
- `docs/<topic>` – documentation changes
- `chore/<topic>` – maintenance tasks (CI, tooling, etc.)

## Pull Request Checklist

- [ ] Tests added or updated where applicable
- [ ] Linting passes (`make lint` or equivalent)
- [ ] Documentation updated (README, docs/*, etc.)
- [ ] The PR description explains **why** the change is needed
- [ ] The PR is up to date with the `main` branch

## Code Style

We use [ruff](https://github.com/astral-sh/ruff) for Python linting and formatting, and [Prettier](https://prettier.io) for JavaScript/TypeScript.  Install the development dependencies and run `make lint` to check formatting before submitting your PR.

## Security

Please do not report security vulnerabilities in public issues.  Instead, see `SECURITY.md` for instructions on how to report security issues responsibly.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.