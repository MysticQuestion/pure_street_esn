# Security and Privacy Model

Protecting users’ privacy and securing the system are paramount.  ESN adopts a privacy‑by‑design approach:

## Authentication and Authorization

- **Identity Providers:** ESN uses Supabase Auth or equivalent to handle user authentication.  Each request is authenticated via JWTs.
- **Role‑based Access Control (RBAC):** Roles include citizen, crew, partner, admin, and researcher.  Services enforce role‑based checks for each endpoint.

## Data Encryption

- **In Transit:** All traffic is encrypted using TLS.
- **At Rest:** Sensitive columns (e.g. reporter identity, exact coordinates) can be encrypted at the application layer using libsodium or database features.

## Least Privilege

- Services only access the data they require.  For example, the Verifier may store EXIF metadata but does not need to access user profiles.
- Internal service communication should use strong authentication (mutual TLS) in production.

## Privacy Controls

- **Redaction:** Before public release, images and reports must be redacted to remove faces, license plates, and other PII.
- **Data Retention:** Define retention policies for raw reports and attachments, balancing operational needs and privacy obligations.
- **Consent:** Users must consent to the collection and processing of their data and understand how it will be used.

For additional security information, see the root `SECURITY.md`.
