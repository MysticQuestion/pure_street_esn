# ESN API Service

This service implements the REST API for ESN-Lite.  It is built with FastAPI and provides endpoints for submitting hazard reports, retrieving reports, and (in future versions) managing verification, corridor scoring, and routing.

## Directory Structure

* `src/app/` – FastAPI application code, including routers and dependency definitions.
* `tests/` – Unit tests for API endpoints.
* `pyproject.toml` – Python package configuration and dependencies.
* `Dockerfile` – Build instructions for containerizing the API.

## Running Locally

1. Install dependencies in a virtual environment:

   ```bash
   cd services/api
   python -m venv .venv
   source .venv/bin/activate
   pip install -e ".[dev]"
   ```

2. Start the API server:

   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

3. Visit `http://localhost:8000/docs` for interactive API documentation.

See `docs/07-dev/api-docs.md` for detailed endpoint descriptions.