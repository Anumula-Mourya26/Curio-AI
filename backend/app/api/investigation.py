from fastapi import APIRouter

router = APIRouter(tags=["investigation"])

@router.post("/investigate/{upload_id}")
async def investigate(upload_id: str):
    return {
        "message": "Investigation started",
        "upload_id": upload_id
    }