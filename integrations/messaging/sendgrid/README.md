# SendGrid Integration

This directory contains a placeholder for integrating SendGrid email
services. A production implementation should support:

* **Authentication** – Configure the SendGrid API key via environment
  variables or your secrets manager.
* **Email templating** – Create and manage templates for ESN emails such as
  monthly corridor reports, verification notifications and grant reports.
* **Attachment handling** – Attach PDF reports or other files to emails.
* **Error handling** – Handle errors such as rate limits or invalid email
  addresses gracefully and log them for review.

For API details see the [SendGrid docs](https://docs.sendgrid.com/).