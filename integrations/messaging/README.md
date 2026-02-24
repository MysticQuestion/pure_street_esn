# Messaging Integrations

The `messaging` folder contains connectors for outbound communication
channels used by ESN. These channels deliver alerts, notifications and
reports to end users, partners and system administrators.

## Current placeholders

- **Twilio** (`twilio/`) – A module for sending SMS messages via the
  Twilio API. Typical use cases include status updates to residents or
  incident alerts to field crews.
- **SendGrid** (`sendgrid/`) – A module for sending email notifications and
  PDF reports via the SendGrid API. Use this integration to deliver
  corridor reports or verification outcomes to stakeholders.

Each submodule should handle API authentication, message templating and
error handling. Secrets such as API keys must not be committed to the
repository and should instead be supplied via environment variables or a
secrets manager.