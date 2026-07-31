"""
Investigation Service.

Coordinates the Curio investigation pipeline by challenging an idea.
"""

from fastapi import HTTPException

from app.services.featherless_service import FeatherlessService


class InvestigationService:
    """Runs the Curio investigation pipeline."""

    def __init__(self):
        self.featherless = FeatherlessService()

    def investigate(self, idea: str, focus: str | None = None):
        if not idea or not idea.strip():
            raise HTTPException(status_code=400, detail="Idea is required")

        return self.featherless.generate_review(idea, focus)