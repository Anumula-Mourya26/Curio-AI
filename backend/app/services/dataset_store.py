"""
In-Memory Dataset Store.

Temporarily holds parsed DataFrames keyed by upload_id.
Used until the Observer module consumes them in a later pipeline stage.

Note: Data is lost on server restart. Replace with Redis or disk cache
for production persistence.
"""

from dataclasses import dataclass
from datetime import datetime, timezone

import pandas as pd


@dataclass
class StoredDataset:
    """A dataset held in memory after upload."""

    upload_id: str
    filename: str
    dataframe: pd.DataFrame
    uploaded_at: datetime


class DatasetStore:
    """Thread-unsafe in-memory store for uploaded datasets (MVP)."""

    def __init__(self) -> None:
        self._datasets: dict[str, StoredDataset] = {}

    def save(self, upload_id: str, filename: str, dataframe: pd.DataFrame) -> StoredDataset:
        stored = StoredDataset(
            upload_id=upload_id,
            filename=filename,
            dataframe=dataframe,
            uploaded_at=datetime.now(timezone.utc),
        )
        self._datasets[upload_id] = stored
        return stored

    def get(self, upload_id: str) -> StoredDataset | None:
        return self._datasets.get(upload_id)

    def delete(self, upload_id: str) -> bool:
        return self._datasets.pop(upload_id, None) is not None

    @property
    def count(self) -> int:
        return len(self._datasets)


# Singleton used across requests (FastAPI dependency returns this instance)
dataset_store = DatasetStore()
