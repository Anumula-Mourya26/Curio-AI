"""
FastAPI Dependency Injection.

Provides shared service instances to route handlers.
"""

from app.services.dataset_service import DatasetService
from app.services.dataset_store import dataset_store
from app.services.investigation_service import InvestigationService

_dataset_service = DatasetService(dataset_store)
_investigation_service = InvestigationService()


def get_dataset_service() -> DatasetService:
    return _dataset_service


def get_investigation_service() -> InvestigationService:
    return _investigation_service