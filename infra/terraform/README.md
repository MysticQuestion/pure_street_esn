# Terraform Infrastructure

This folder contains Terraform modules and environment configurations used to
provision ESN resources in cloud environments. Each environment (dev,
staging, prod) is defined under the `envs/` directory. Modules provide
reusable definitions for common services such as databases, caches and
object storage.

At present, these directories contain placeholders. Create Terraform files
(e.g. `main.tf`, `variables.tf`, `outputs.tf`) within each environment to
specify your infrastructure resources.

## Usage

1. Install [Terraform](https://www.terraform.io/).
2. Navigate to an environment directory, e.g. `infra/terraform/envs/dev`.
3. Configure your backend and provider settings.
4. Run `terraform init` to initialise the working directory.
5. Run `terraform plan` and `terraform apply` to provision resources.

Ensure that you store any sensitive variables (passwords, API keys) in a
secure manner, such as environment variables or a secrets manager. Do not
commit secrets to version control.