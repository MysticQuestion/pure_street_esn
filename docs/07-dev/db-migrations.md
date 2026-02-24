## Database Migrations

ESN uses PostgreSQL with the PostGIS extension for geospatial data.  To manage schema changes over time, we recommend using [Alembic](https://alembic.sqlalchemy.org/) for migrations.

### Setup

1. **Install Alembic** as part of the development dependencies (see `services/api/pyproject.toml`).
2. **Initialize Alembic** in the `services/api` directory if not already present:

   ```bash
   cd services/api
   alembic init migrations
   ```

   This will create a `migrations/` folder with a configuration file.

3. **Configure the Database URL** in `alembic.ini` to point to your local PostGIS instance (e.g., `postgresql+psycopg://esn:esn_dev_password@localhost:5432/esn`).

### Creating a Migration

When you modify or add SQLAlchemy models, generate a migration script:

```bash
alembic revision --autogenerate -m "Add corridor table"
```

Review the generated script under `migrations/versions/` to ensure it accurately reflects the intended changes.  Edit the script if necessary.

### Applying Migrations

Run migrations against the database:

```bash
alembic upgrade head
```

This applies all unapplied migrations in chronological order.  Migrations should be committed to version control.

### Best Practices

* **Isolate Structural Changes** – Avoid mixing schema changes with data‑loading scripts.  Use separate scripts under `scripts/` for seeding or backfilling.
* **Backward Compatibility** – When possible, write migrations to be reversible (use `alembic downgrade`).
* **Review Autogenerate Output** – Alembic uses database inspection to compare current models to the database schema.  It may miss changes in custom SQL or PostGIS types.  Always review the generated diff.
* **Environment Separation** – Maintain separate migration histories for development, staging, and production databases.  Use different `alembic.ini` files or environment variables for each environment.

Refer to Alembic’s documentation for advanced usage, such as branching and merge migrations.