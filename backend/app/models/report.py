"""
Discovery Engine Output Schema.

InvestigationReport is the final deliverable — a structured narrative
of what was discovered, supported by evidence and hypothesis rankings.
"""

from pydantic import BaseModel


class DiscoveryInsight(BaseModel):
    """A single insight surfaced during the investigation."""

    title: str
    description: str
    confidence: float
    supporting_hypothesis_id: str
    # TODO: Add fields — visualizations, recommended_actions, etc.


class InvestigationReport(BaseModel):
    """
    Final investigation report delivered to the user.

    Produced by: Discovery Engine
    Consumed by: Frontend (displayed as the investigation result)
    """

    session_id: str
    summary: str
    insights: list[DiscoveryInsight]
    hypotheses_final: list[dict]  # ranked hypotheses with final confidence
    # TODO: Add fields — methodology, data_references, next_steps, etc.
