## Local Setup Guide

This document explains how to run ESN-Lite locally for development and testing.  These instructions assume you have basic familiarity with using a terminal and installing dependencies.

### Prerequisites

* **Docker** – Required for running Postgres/PostGIS, Redis, and MinIO via `docker-compose`.
* **Python 3.11** – For backend services and scripts.  Use [`pyenv`](https://github.com/pyenv/pyenv) if you need multiple Python versions.
* **Node.js 18+** – For React/Next.js frontends.  Install using [`nvm`](https://github.com/nvm-sh/nvm) or your operating system’s package manager.
* **Yarn or npm** – For managing JavaScript dependencies.

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/purestreet-esn.git
   cd purestreet-esn
   ```

2. **Start infrastructure services**

   Use Docker to launch PostGIS, Redis, and MinIO.  You can customize environment variables by copying `infra/docker/local.env.example` to `.env` and editing it.

   ```bash
   docker compose -f infra/docker/docker-compose.yml up -d
   ```

3. **Backend API**

   ```bash
   cd services/api
   python -m venv .venv
   source .venv/bin/activate
   pip install -e ".[dev]"
   uvicorn app.main:app --reload --port 8000
   ```

4. **Web Dashboard**

   ```bash
   cd apps/dashboard
   yarn install
   yarn dev
   ```

5. **Seed the Database**

   Use the `scripts/seed_db.py` script to load initial data (corridor boundaries, hazard categories).  Ensure the API server and PostGIS are running.

   ```bash
   python scripts/seed_db.py
   ```

### Troubleshooting

* If ports 5432, 6379, or 9000 are already in use, change the exposed ports in `docker-compose.yml` or stop the conflicting services.
* Use `docker compose logs` to check service logs if containers fail to start.
* For Mac users on Apple Silicon, ensure that the images used in `docker-compose.yml` support ARM architectures.

Refer to the `docs/07-dev` folder for additional instructions on database migrations, testing, and release processes.