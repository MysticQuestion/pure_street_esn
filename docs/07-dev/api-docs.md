## ESN API Documentation

This document provides an overview of the REST API used by ESN-Lite.  The API follows common HTTP conventions and uses JSON for request and response bodies.  It is built with FastAPI and automatically generates interactive documentation at `/docs` when running locally.

### Versioning

All ESN-Lite endpoints are prefixed with `/v1` to support future breaking changes (e.g., `/v2`).

### Endpoints

#### Health Check

* **GET `/health`** – Returns a simple status object to confirm that the API is running.

#### Hazard Reports

* **POST `/v1/reports`** – Create a new hazard report.
  * Request body (JSON): matches `data/schemas/hazard-report.schema.json` without the auto-generated `report_id`, `submitted_at`, `verification_status`, or `verification_confidence` fields.
  * Response (201 Created): includes generated `report_id`, `verification_status`, `verification_confidence`, and `created_at`.
  * Errors: returns `400 Bad Request` for invalid data (e.g., missing location).

* **GET `/v1/reports/{report_id}`** – Retrieve a specific report by its UUID.  Returns the stored JSON representation, including payload and verification metadata.  Returns `404 Not Found` if the report does not exist.

* **GET `/v1/reports`** *(to be implemented)* – List reports with pagination and filtering by category, status, date range, or corridor.

#### Verification

* Endpoints for verifying, rejecting, or merging reports will be part of the `services/verifier` module and exposed under `/v1/verify`.  They will require authentication and role‑based permissions (see `services/verifier/README.md`).

#### Scoring and Corridors

* **GET `/v1/corridors`** *(to be implemented)* – Returns a list of corridors with their current sanitation score and metadata.

* **GET `/v1/corridors/{corridor_id}`** *(to be implemented)* – Returns detailed metrics for a specific corridor, including score history and hazard breakdown.

#### Authentication

Authentication and authorization will be added in Phase II using Supabase or OAuth providers.  Until then, ESN-Lite endpoints are open to all users for testing purposes.

### Response Codes

* **200 OK** – Successful GET requests.
* **201 Created** – Successful creation of a new resource.
* **400 Bad Request** – Invalid input or missing required fields.
* **404 Not Found** – Resource does not exist.
* **500 Internal Server Error** – Unexpected server error.  Check logs for details.

### Pagination

List endpoints will support `limit` and `offset` query parameters to control pagination.  Defaults will be defined in the API service configuration.

For more detailed interactive documentation, run the API locally and visit `/docs` for Swagger UI or `/redoc` for ReDoc.