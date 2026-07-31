"""
Information Seeker Module.

Determines the single most useful question to ask the user to reduce
uncertainty across competing hypotheses.

Responsibilities:
  - Compute expected information gain for candidate questions
  - Select the question that maximally discriminates between hypotheses
  - Explain why this question was chosen (rationale)
  - Optionally rank alternative questions as fallbacks

Input:  HypothesisSet (from Hypothesis Generator)
Output: InvestigationQuestion (app.models.investigation)

This module may use LLM reasoning or information-theoretic scoring.
The selection strategy is pluggable.
"""

from app.models.hypothesis import HypothesisSet
from app.models.investigation import InvestigationQuestion


class InformationSeeker:
    """Selects the optimal question to reduce hypothesis uncertainty."""

    def select_question(self, hypotheses: HypothesisSet) -> InvestigationQuestion:
        """
        Choose the single best question to ask the user.

        Args:
            hypotheses: Competing hypotheses with initial confidence scores.

        Returns:
            InvestigationQuestion with expected information gain.
        """
        # TODO: Implement information gain calculation and question selection
        raise NotImplementedError
