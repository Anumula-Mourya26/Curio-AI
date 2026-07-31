"""
CSV Upload API Routes.

POST /api/upload — accept a CSV file, parse with pandas, store in memory,
and return dataset metadata with a preview.
"""

from fastapi import APIRouter, Depends, File, UploadFile

from app.api.dependencies import get_dataset_service
from app.models.upload import UploadResponse
from app.services.dataset_service import DatasetService

router = APIRouter(tags=["upload"])


@router.post("/upload", response_model=UploadResponse)
async def upload_csv(
    file: UploadFile = File(..., description="CSV dataset file"),
    dataset_service: DatasetService = Depends(get_dataset_service),
) -> UploadResponse:
    """
    Upload a CSV dataset.

    Validates file type, parses with pandas, stores the dataframe in memory,
    and returns filename, dimensions, column names, and the first 10 rows.
    """
    return await dataset_service.process_upload(file)
