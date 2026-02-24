# Project Governance

The Environmental Sentinel Network (ESN) is an open‑source project stewarded by the Pure Street collective.  Our governance model aims to balance the need for rapid iteration with the need for long‑term stability and inclusivity.

## Roles

### Maintainers

Maintainers are responsible for the strategic direction of the project, reviewing and merging pull requests, managing releases, and ensuring the health of the community.  They have write access to the repository and can approve changes.

### Contributors

Contributors are anyone who engages with the project by filing issues, proposing documentation improvements, submitting pull requests, or reviewing others’ work.  Contributors do not need special permissions beyond a GitHub account.

### Users

Users are individuals or organizations who use ESN in their own projects, deployments, or research.  Users are encouraged to provide feedback and report bugs or feature requests.

## Decision Making

Major decisions (API changes, architectural shifts, release versions) are documented in the `docs/99-appendix/decision-log.md` and proposed using the RFC process (`docs/99-appendix/rfc-template.md`).  Maintainers will strive for consensus when reviewing RFCs.  If consensus cannot be reached, a majority vote of the maintainers will decide.

Minor decisions (bug fixes, small enhancements) may be made by individual maintainers using their best judgment after a review from at least one other maintainer.

## Release Process

Releases follow semantic versioning (MAJOR.MINOR.PATCH).  Release candidates and milestones are tracked in the `ROADMAP.md`.  Release notes are stored in `CHANGELOG.md` and must include notable changes, breaking changes, and migration instructions.

## Adding Maintainers

New maintainers are nominated by existing maintainers and must be approved by a simple majority.  Criteria include demonstrated contributions, code quality, and positive engagement with the community.