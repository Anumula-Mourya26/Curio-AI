"""
Investigation API Routes.
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.api.dependencies import get_investigation_service
from app.services.investigation_service import InvestigationService


class IdeaRequest(BaseModel):
    idea: str
    focus: str | None = None


router = APIRouter(
    prefix="/investigate",
    tags=["investigation"],
)


@router.post("/")
async def investigate(
    request: IdeaRequest,
    investigation_service: InvestigationService = Depends(get_investigation_service),
):
    """Challenge an idea by identifying assumptions, blind spots, risks and questions."""
    return investigation_service.investigate(request.idea, request.focus)


@router.post("/{upload_id}")
async def investigate_legacy(
    upload_id: str,
    investigation_service: InvestigationService = Depends(get_investigation_service),
):
    """Compatibility fallback for older clients."""
    return investigation_service.investigate(f"Legacy compatibility request for {upload_id}")