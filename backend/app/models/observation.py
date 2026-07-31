"""
Observer Module Output Schema.

ObservationReport is the structured output of the Observer module.
It captures dataset metadata, column profiles, and basic statistics
that downstream modules (Curiosity Engine) consume.
"""

from pydantic import BaseModel


class ColumnProfile(BaseModel):
    """Statistical profile for a single dataset column."""

    name: str
    dtype: str
    # TODO: Add fields — null_count, unique_count, min, max, mean, std, etc.


class ObservationReport(BaseModel):
    """
    Complete analysis of an uploaded dataset.

    Produced by: Observer
    Consumed by: Curiosity Engine
    """

    session_id: str
    row_count: int
    column_count: int
    columns: list[ColumnProfile]
    # TODO: Add fields — summary_stats, data_quality_flags, etc.
