"""
Dataset Service.

Handles CSV file validation, parsing, and preview generation.
Delegates in-memory storage to DatasetStore.
"""

import io
from uuid import uuid4

import numpy as np
import pandas as pd
from fastapi import HTTPException, UploadFile, status

from app.core.config import settings
from app.models.upload import UploadResponse
from app.services.dataset_store import DatasetStore, StoredDataset

ALLOWED_CONTENT_TYPES = {
    "text/csv",
    "application/csv",
    "application/vnd.ms-excel",
    "text/plain",
    "application/octet-stream",  # some browsers omit a specific CSV MIME type
}

PREVIEW_ROW_COUNT = 10


class DatasetService:
    """Validates, parses, and stores uploaded CSV datasets."""

    def __init__(self, store: DatasetStore) -> None:
        self._store = store
        self._max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024

    async def process_upload(self, file: UploadFile) -> UploadResponse:
        """
        Validate an uploaded file, parse it as CSV, store in memory, and
        return metadata with a preview.
        """
        filename = file.filename or "unknown"
        self._validate_filename(filename)
        self._validate_content_type(file.content_type)

        content = await file.read()
        self._validate_size(content)

        if not content.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty.",
            )

        dataframe = self._parse_csv(content, filename)
        self._validate_dataframe(dataframe, filename)

        upload_id = str(uuid4())
        self._store.save(upload_id, filename, dataframe)

        return self._build_response(upload_id, filename, dataframe)

    def get_stored(self, upload_id: str) -> StoredDataset:
        """Retrieve a stored dataset or raise 404."""
        stored = self._store.get(upload_id)
        if stored is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Upload '{upload_id}' not found.",
            )
        return stored

    def _validate_filename(self, filename: str) -> None:
        if not filename.lower().endswith(".csv"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only CSV files are accepted. File must have a .csv extension.",
            )

    def _validate_content_type(self, content_type: str | None) -> None:
        if content_type is None:
            return
        base_type = content_type.split(";")[0].strip().lower()
        if base_type not in ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Invalid content type '{content_type}'. "
                    "Only CSV files are accepted."
                ),
            )

    def _validate_size(self, content: bytes) -> None:
        if len(content) > self._max_bytes:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File exceeds the {settings.MAX_UPLOAD_SIZE_MB} MB limit.",
            )

    def _parse_csv(self, content: bytes, filename: str) -> pd.DataFrame:
        buffer = io.BytesIO(content)
        try:
            return pd.read_csv(buffer, encoding="utf-8")
        except UnicodeDecodeError:
            buffer.seek(0)
            try:
                return pd.read_csv(buffer, encoding="latin-1")
            except Exception as exc:
                raise self._parse_error(filename, exc) from exc
        except pd.errors.EmptyDataError as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="CSV file contains no data.",
            ) from exc
        except Exception as exc:
            raise self._parse_error(filename, exc) from exc

    def _parse_error(self, filename: str, exc: Exception) -> HTTPException:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to parse '{filename}' as CSV: {exc}",
        )

    def _validate_dataframe(self, df: pd.DataFrame, filename: str) -> None:
        if df.empty or len(df.columns) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"'{filename}' has no rows or columns.",
            )

    def _build_response(
        self, upload_id: str, filename: str, df: pd.DataFrame
    ) -> UploadResponse:
        preview_df = df.head(PREVIEW_ROW_COUNT).replace({np.nan: None})
        preview = preview_df.to_dict(orient="records")

        return UploadResponse(
            upload_id=upload_id,
            filename=filename,
            row_count=len(df),
            column_count=len(df.columns),
            columns=[str(col) for col in df.columns],
            preview=preview,
        )
