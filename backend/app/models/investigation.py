"""
Information Seeker & Reasoning Engine Schemas.

InvestigationQuestion is the single best question to ask the user.
UserAnswer captures the response. UpdatedHypothesisSet reflects
confidence changes after reasoning.
"""

from pydantic import BaseModel

from app.models.hypothesis import Hypothesis


class InvestigationQuestion(BaseModel):
    """
    The most information-gain question selected for the user.

    Produced by: Information Seeker
    Consumed by: Frontend (displayed to user), Reasoning Engine (after answer)
    """

    session_id: str
    question_text: str
    target_finding_id: str
    target_hypothesis_ids: list[str]
    expected_information_gain: float
    # TODO: Add fields — rationale, alternative_questions, etc.


class UserAnswer(BaseModel):
    """User's response to an investigation question."""

    session_id: str
    question_id: str
    answer_text: str


class UpdatedHypothesisSet(BaseModel):
    """
    Hypotheses with revised confidence scores after user input.

    Produced by: Reasoning Engine
    Consumed by: Discovery Engine
    """

    session_id: str
    hypotheses: list[Hypothesis]
    reasoning_summary: str
    # TODO: Add fields — confidence_deltas, eliminated_hypotheses, etc.
