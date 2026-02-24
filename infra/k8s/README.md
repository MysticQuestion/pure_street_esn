# Kubernetes Configuration

This directory holds Kubernetes manifests and Helm charts for deploying ESN
services to a Kubernetes cluster. Use these resources to define namespaces,
deployments, services, ingress rules and secrets for the API, verifier,
scoring, routing and other services.

The subdirectories are organised as follows:

- `namespaces/` – Namespace YAML files for isolating environments or service
  groups.
- `helm/` – Helm charts and values files for templated deployments. Helm
  simplifies deployment and upgrade of complex service stacks.
- `manifests/` – Raw Kubernetes manifests (Deployment, Service, ConfigMap,
  Ingress, etc.) that are not templated.

This folder currently contains placeholders. Populate it with manifests
appropriate to your deployment environment.