"""
Investigation Session Models.

Defines the lifecycle states of an investigation session.
The session tracks which pipeline stage has been reached so the API
can resume or reject out-of-order requests.
"""

from enum import Enum


class InvestigationStage(str, Enum):
    """Ordered stages in the ACaaS investigation pipeline."""

    CREATED = "created"
    OBSERVED = "observed"
    CURIOSITY_IDENTIFIED = "curiosity_identified"
    HYPOTHESES_GENERATED = "hypotheses_generated"
    QUESTION_ASKED = "question_asked"
    ANSWER_RECEIVED = "answer_received"
    REASONING_COMPLETE = "reasoning_complete"
    REPORT_GENERATED = "report_generated"
