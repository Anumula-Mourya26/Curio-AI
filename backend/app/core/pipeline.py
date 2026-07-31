"""
Investigation Pipeline Orchestrator.

Coordinates the end-to-end ACaaS workflow by invoking each module in sequence
and passing structured data between them. This is the central nervous system
that wires Observer → Curiosity → Hypothesis → Information Seeker →
Reasoning → Discovery.

Each step receives the output of the previous step as input. The orchestrator
does NOT contain domain logic — it only routes data and manages session state.

Pipeline stages:
  1. observer.analyze(dataset)           → ObservationReport
  2. curiosity.identify(report)          → CuriosityFindings
  3. hypothesis.generate(findings)       → HypothesisSet
  4. seeker.select_question(hypotheses)  → InvestigationQuestion
  5. [user answers via API]
  6. reasoning.update(hypotheses, answer) → UpdatedHypothesisSet
  7. discovery.generate(updated_set)     → InvestigationReport
"""

from app.modules.observer import Observer
from app.modules.curiosity_engine import CuriosityEngine
from app.modules.hypothesis_generator import HypothesisGenerator
from app.modules.information_seeker import InformationSeeker
from app.modules.reasoning_engine import ReasoningEngine
from app.modules.discovery_engine import DiscoveryEngine


class InvestigationPipeline:
    """
    Orchestrates the full investigation lifecycle.

    Instantiate once at app startup; each investigation session gets its own
    pipeline run with a unique session_id.
    """

    def __init__(self) -> None:
        self.observer = Observer()
        self.curiosity = CuriosityEngine()
        self.hypothesis_generator = HypothesisGenerator()
        self.information_seeker = InformationSeeker()
        self.reasoning_engine = ReasoningEngine()
        self.discovery_engine = DiscoveryEngine()

    # TODO: Implement pipeline stage methods that call each module in order.
    # async def run_observation(self, dataset_path: str) -> ObservationReport: ...
    # async def run_curiosity(self, report: ObservationReport) -> CuriosityFindings: ...
    # async def run_hypothesis_generation(self, findings: CuriosityFindings) -> HypothesisSet: ...
    # async def select_question(self, hypotheses: HypothesisSet) -> InvestigationQuestion: ...
    # async def process_answer(self, hypotheses: HypothesisSet, answer: str) -> UpdatedHypothesisSet: ...
    # async def generate_report(self, updated: UpdatedHypothesisSet) -> InvestigationReport: ...
