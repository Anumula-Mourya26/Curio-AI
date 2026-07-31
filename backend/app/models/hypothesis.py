"""
Hypothesis Generator Output Schema.

Each hypothesis is a candidate explanation for a curiosity finding.
Multiple hypotheses per finding allow the Reasoning Engine to compare
and update confidence after user input.
"""

from pydantic import BaseModel


class Hypothesis(BaseModel):
    """A single explanatory hypothesis for a curiosity finding."""

    id: str
    finding_id: str
    explanation: str
    confidence: float  # 0.0–1.0, updated by Reasoning Engine
    supporting_evidence: list[str]
    # TODO: Add fields — reasoning_chain, assumptions, etc.


class HypothesisSet(BaseModel):
    """
    All hypotheses generated for the current investigation.

    Produced by: Hypothesis Generator
    Consumed by: Information Seeker, Reasoning Engine
    """

    session_id: str
    hypotheses: list[Hypothesis]
