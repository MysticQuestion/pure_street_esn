# Secrets

This directory intentionally contains **no secret values**. All sensitive
configuration (database passwords, API keys, certificates) must be stored
outside of version control. Use environment variables, secret management
services (e.g. HashiCorp Vault, AWS Secrets Manager) or your cloud
provider's secrets integration to manage secrets securely.

If you need to reference a secret in a configuration file, use a variable
placeholder and document the expected key in your deployment tooling. Do not
commit secrets to this repository under any circumstances.