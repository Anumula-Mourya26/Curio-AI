"""
Session Service.

Manages investigation session lifecycle and in-memory state.

Responsibilities:
  - Create new investigation sessions with unique IDs
  - Track current pipeline stage for each session
  - Store intermediate results (observation, findings, hypotheses, etc.)
  - Retrieve session state for API handlers

Used by: All API endpoints to read/write session progress.

Note: For hackathon MVP, sessions are stored in-memory. Replace with
Redis or a database for production persistence.
"""

from app.models.session import InvestigationStage


class SessionService:
    """In-memory investigation session store."""

    def __init__(self) -> None:
        self._sessions: dict = {}

    def create_session(self) -> str:
        """
        Create a new investigation session.

        Returns:
            Unique session ID (UUID).
        """
        # TODO: Generate UUID, initialize session state dict
        raise NotImplementedError

    def get_session(self, session_id: str) -> dict:
        """
        Retrieve session state by ID.

        Args:
            session_id: Investigation session identifier.

        Returns:
            Session state dictionary.
        """
        # TODO: Lookup and return session, raise 404 if not found
        raise NotImplementedError

    def update_stage(self, session_id: str, stage: InvestigationStage) -> None:
        """
        Advance a session to the next pipeline stage.

        Args:
            session_id: Investigation session identifier.
            stage: New pipeline stage.
        """
        # TODO: Update session stage, validate stage ordering
        raise NotImplementedError

    def store_result(self, session_id: str, key: str, value: object) -> None:
        """
        Store an intermediate pipeline result in the session.

        Args:
            session_id: Investigation session identifier.
            key: Result key (e.g., 'observation', 'findings', 'hypotheses').
            value: Pydantic model instance to store.
        """
        # TODO: Serialize and store result in session state
        raise NotImplementedError
