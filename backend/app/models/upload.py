"""
Upload API Response Schema.

Returned by POST /api/upload after a CSV is validated and parsed.
"""

from pydantic import BaseModel, Field


class UploadResponse(BaseModel):
    """Metadata and preview for an uploaded CSV dataset."""

    upload_id: str = Field(description="Unique ID for retrieving the stored dataframe")
    filename: str
    row_count: int
    column_count: int
    columns: list[str]
    preview: list[dict[str, object]] = Field(
        description="First 10 rows as JSON-serializable records"
    )
