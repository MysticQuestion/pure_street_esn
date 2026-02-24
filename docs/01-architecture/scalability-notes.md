# Scalability Notes

ESN is designed to scale from a single corridor to multiple cities.  The following considerations guide our approach:

1. **Database Scaling:** PostGIS scales vertically and horizontally via read replicas.  For multi‑tenant deployments, schemas or separate databases may be used per city to isolate data.
2. **Service Decomposition:** Splitting verification, scoring, routing, and notifications into separate services allows independent scaling based on workload.  Use of message queues decouples processing.
3. **Caching:** Hot data (e.g. current queue, corridor scores) can be cached in Redis to reduce database load.
4. **Asynchronous Processing:** Resource‑intensive tasks (image analysis, ML clustering) should run asynchronously to keep API response times low.
5. **Infrastructure as Code:** Terraform and Kubernetes deployments enable reproducible environments across staging and production, and facilitate auto‑scaling based on CPU/memory usage.

These notes will evolve as we gather real‑world performance data from the ESN‑Lite pilot.
