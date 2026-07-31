"""
Curiosity Engine Output Schema.

CuriosityFindings lists observations flagged as anomalous, uncertain,
contradictory, or otherwise interesting. Each finding is a candidate
for hypothesis generation.
"""

from enum import Enum

from pydantic import BaseModel


class FindingType(str, Enum):
    """Categories of curiosity-worthy patterns."""

    ANOMALY = "anomaly"
    UNCERTAINTY = "uncertainty"
    CONTRADICTION = "contradiction"
    INTERESTING_PATTERN = "interesting_pattern"


class CuriosityFinding(BaseModel):
    """A single item that triggered the curiosity engine."""

    id: str
    finding_type: FindingType
    description: str
    affected_columns: list[str]
    curiosity_score: float  # 0.0–1.0, higher = more worth investigating
    # TODO: Add fields — evidence, statistical_metrics, etc.


class CuriosityFindings(BaseModel):
    """
    Ranked list of curiosity-worthy observations.

    Produced by: Curiosity Engine
    Consumed by: Hypothesis Generator
    """

    session_id: str
    findings: list[CuriosityFinding]
