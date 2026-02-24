## Testing Strategy

High‑quality software requires a comprehensive testing strategy.  This document outlines the approach ESN uses to ensure reliability across services and user interfaces.

### Types of Tests

1. **Unit Tests**
   - Test individual functions and classes in isolation.
   - Located in `services/*/tests/` and `packages/*/tests/`.
   - Use `pytest` for Python services and `jest` for JavaScript/TypeScript components.
2. **Integration Tests**
   - Test interactions between components (e.g., API endpoints hitting the database).
   - Set up a test database or use transactional fixtures.  Avoid hitting production resources.
3. **End‑to‑End (E2E) Tests**
   - Simulate user flows through the UI and backend.  Tools like Cypress or Playwright can automate browser interactions.
   - E2E tests run in the `tests/e2e/` directory and may use docker‑compose to spin up the full stack.
4. **Load Tests**
   - Evaluate how the system performs under realistic and peak traffic conditions.
   - Use tools like Locust or k6.  Load test scripts live in `tests/load/`.

### Continuous Integration

The `.github/workflows/ci.yml` file sets up automated testing on every pull request and push to main and develop branches.  The workflow matrix runs tests for each service:

* Install dependencies based on `pyproject.toml` or `package.json`.
* Run unit tests with `pytest` (Python) and `npm test` (JavaScript) where applicable.
* Fail the build if any test fails or if code fails linting (see `tools/lint`).

### Test Data and Fixtures

* Use factories or fixtures to create dummy hazard reports, sensor readings, and corridor objects.  Keep fixtures deterministic to ensure reproducible results.
* Store fixture data under `tests/fixtures/` and load them via helper functions.
* For sensor simulations, reuse the sentinel network module to generate telemetry with predictable risk scores.

### Mocking External Services

When testing integrations (e.g., Twilio, 311 APIs), mock the external APIs rather than making real calls.  Use libraries like `responses` for HTTP mocking in Python or `msw` in JavaScript.

### Code Coverage

Target at least **80% code coverage** for critical modules (verifier, scoring, API).  Use `pytest-cov` and `jest --coverage` to generate reports.  Include coverage badges in README files if desired.

### Review Process

Pull requests should include new or updated tests that cover the changes introduced.  Code reviewers are responsible for ensuring that business logic is adequately tested and that no breaking changes slip through.