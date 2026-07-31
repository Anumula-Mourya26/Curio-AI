"""
FastAPI Application Entry Point.

Creates the FastAPI app, registers middleware (CORS), mounts API routers,
and exposes health-check endpoints. This is the single entry point for
the backend server (started via: uvicorn app.main:app).
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router as investigation_router
from app.api.upload import router as upload_router
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="Autonomous investigation system for structured datasets",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router, prefix="/api")
app.include_router(investigation_router, prefix=settings.API_PREFIX)


@app.get("/health")
async def health_check() -> dict:
    """Liveness probe for deployment and local dev."""
    return {"status": "ok", "service": settings.APP_NAME}
