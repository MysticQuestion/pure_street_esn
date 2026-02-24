# ESN Notifications Service

This service handles sending status updates, alerts, and partner communications.  Notifications are delivered via SMS, email, or other channels using third‑party providers like Twilio and SendGrid.

## Structure

* `src/` – Code for composing and dispatching messages.
* `templates/` – Plain text and HTML templates for notifications.
* `tests/` – Unit tests for notification rendering and dispatch logic.
* `pyproject.toml` – Python package configuration.

This service is a placeholder in ESN-Lite and will be implemented in Phase II.  See `integrations/messaging/` for connector configuration.