## Observability

Observability—the ability to understand what is happening inside a system from the outside—is critical to operating ESN at scale.  This document describes logging, metrics, and tracing standards used across ESN services.

### Logging

* **Structured Logs** – Use JSON‑formatted logs with consistent fields (timestamp, severity, service, module, message, request_id).  This enables efficient filtering and correlation.
* **Log Levels** – Follow standard levels: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`.  Avoid logging PII or sensitive data.
* **Correlation IDs** – Generate a unique `request_id` per incoming API request and propagate it through downstream services.  Include it in logs to trace flows.
* **Centralized Aggregation** – Forward logs to a central stack (e.g., ELK, CloudWatch, or Loki) with retention policies aligning with `SECURITY.md`.

### Metrics

* **Service Metrics** – Emit counters, gauges, and histograms for key operations: request counts, response times, error rates, queue sizes, and verification durations.
* **Custom Metrics** – Track domain-specific metrics such as number of hazards verified per hour, corridor score calculation time, and notification dispatch counts.
* **Dashboards** – Create Grafana or Prometheus dashboards to visualize metrics.  Align dashboards with the operations metrics described in `docs/04-operations/sla-and-triage.md`.

### Tracing

* **Distributed Tracing** – Use an open standard like OpenTelemetry to instrument services.  Each API call should generate a trace with spans for database queries, external API calls, and internal function calls.
* **Sampling** – Sample 100% of traces in staging environments and a lower percentage in production to control cost.  Always sample errors.

### Alerts

Define alert rules based on thresholds or anomalies in metrics (e.g., high error rates, slow response times).  Alerts should be routed to the on-call engineer or operations team via Slack or PagerDuty.  Document runbooks for common alerts in the `docs/04-operations/incident-response.md` file.

### Security Considerations

* **Sensitive Data** – Never log full report payloads or personal identifiers.  Mask or omit any PII.
* **Access Control** – Restrict access to observability tools to authorized personnel.  Audit who views logs and traces.
* **Retention** – Configure log and metric retention times based on the data classification (see `SECURITY.md`).

Implementing robust observability ensures that issues are detected quickly, root causes are identified efficiently, and service quality remains high.