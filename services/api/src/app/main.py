from fastapi import FastAPI
from .routers import health, reports

app = FastAPI(
    title="ESN API",
    version="0.1.0",
    description="ESN-Lite backend for hazard reporting, verification, and corridor analytics."
)

# Include routers
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(reports.router, prefix="/v1/reports", tags=["reports"])