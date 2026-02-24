# ESN Web Reporting

This directory hosts a lightweight web reporting interface for ESN.  The web client allows users to submit hazard reports via a responsive browser application when the mobile app is not available.

## Structure

* `src/` – Next.js pages and components.
* `public/` – Static assets such as the favicon and manifest.
* `tests/` – Unit and integration tests for the web client.
* `package.json` – NPM configuration and dependencies.

The web client shares the same reporting schema as the mobile app (`data/schemas/hazard-report.schema.json`).  See `docs/02-product/ui-ux-principles.md` for design guidance.