# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please report it responsibly.  Do **not** open a public issue.  Instead, contact the maintainers at:

- **Email:** security@purestreet.io

Please include a detailed description of the vulnerability, steps to reproduce, and the potential impact.  We will acknowledge receipt within five business days and will work with you to address the issue promptly.  Disclosures will be made public only after a fix has been released and sufficient time has passed for users to upgrade.

## Data Handling Practices

ESN processes sensitive information such as geolocation and photographic evidence of environmental hazards.  We adhere to the following principles:

1. **Data Minimization:** Collect only the data necessary to verify and respond to reported hazards.  Avoid collecting personally identifiable information (PII) unless absolutely necessary.
2. **Access Control:** Limit access to sensitive data (such as reporter identities, exact coordinates, and images) to authorized personnel on a need‑to‑know basis.
3. **Encryption:** Transmit and store sensitive data using industry‑standard encryption.  Do not commit secrets (API keys, passwords) into the repository.  Use environment variables or secret management tools.
4. **Retention and Redaction:** Define retention periods for reports and attachments.  Implement workflows to redact faces, license plates, and minors in images before public release.
5. **Compliance:** Follow applicable privacy laws and regulations, including the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR) where relevant.

## Public Disclosure

We will publicly disclose security vulnerabilities only after a fix has been released and deployed.  We will credit researchers who report vulnerabilities unless they request otherwise.