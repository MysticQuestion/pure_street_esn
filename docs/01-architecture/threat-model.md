# Threat Model

This document identifies potential threats to ESN and mitigation strategies.

## Attack Surfaces

1. **API Endpoints:** Could be abused via injection attacks, denial of service, or unauthorized data access.  Mitigation: input validation, rate limiting, authentication and authorization.
2. **File Uploads:** Photo attachments may contain malicious content.  Mitigation: enforce file type and size limits, scan uploads with antivirus, store in isolated object storage.
3. **Metadata Spoofing:** Attackers may attempt to fake EXIF metadata to misrepresent a hazard.  Mitigation: cross‑check GPS metadata with network geolocation, require real‑time capture where possible, apply trust scoring.
4. **Data Tampering:** Unauthorized changes to reports or scores could misinform stakeholders.  Mitigation: implement audit logging, digital signatures, and role separation.
5. **Supply Chain:** Dependencies may contain vulnerabilities.  Mitigation: enable dependency scanning (e.g. Dependabot), verify dependencies’ licenses and update regularly.

## Insider Threats

Because some users (moderators, crew) have elevated privileges, we enforce least privilege, track actions via audit logs, and require two‑person approval for sensitive operations (e.g. deleting data).

## Disaster Recovery

Backups should be encrypted and stored in geographically diverse locations.  Restore procedures must be tested regularly.  Infrastructure as code (Terraform) allows infrastructure to be recreated reliably.
