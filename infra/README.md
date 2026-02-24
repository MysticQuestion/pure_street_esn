# Infrastructure

This directory contains infrastructure and deployment configurations for the
Environmental Sentinel Network (ESN). Use these assets to provision local
development environments, continuous integration pipelines and production
deployments across cloud providers.

## Structure

- **`docker/`** – Docker Compose definitions and environment files used to
  bootstrap a local development environment (PostGIS, Redis, object storage,
  etc.).
- **`terraform/`** – Infrastructure as code modules and environment
  configuration for cloud deployments. These are organised by environment
  (`dev`, `staging`, `prod`).
- **`k8s/`** – Kubernetes manifests, Helm charts and namespace definitions
  supporting container orchestration for ESN services. This folder is
  structured to allow you to customise deployments across clusters.
- **`secrets/`** – A placeholder directory that intentionally contains no
  secrets. Use your secrets manager of choice (e.g. Vault, AWS Secrets
  Manager) to store sensitive configuration.

All infrastructure code is optional and can be adapted to your preferred
deployment platform. Contributions improving the portability and security of
these assets are welcome.