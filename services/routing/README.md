# ESN Routing Service

The routing service determines where verified hazard reports should be sent.  Based on report category, severity, and corridor, it routes tasks to Pure Street crews, municipal 311 systems, business improvement districts, or other partners.

This directory contains placeholder files for a future implementation.  See `docs/04-operations/verification-workflows.md` for a description of routing logic and `docs/05-policy-and-procurement/procurement-ready-overview.md` for partner requirements.

## Structure

* `src/` – Routing rules and connectors (to 311 systems, BIDs, NGOs).
* `connectors/` – Integration code for each city or partner API.
* `tests/` – Unit tests for routing logic.
* `pyproject.toml` – Python package configuration.

The initial release of ESN-Lite does not implement routing; it will be added in Phase II.