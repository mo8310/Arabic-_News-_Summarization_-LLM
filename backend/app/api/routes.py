from fastapi import APIRouter, HTTPException
from ..schemas import SummarizeRequest, SummarizeResponse, HealthResponse
from ..model_service import model_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="ok",
        model_loaded=model_service.is_loaded
    )

@router.post("/summarize", response_model=SummarizeResponse)
async def summarize(request: SummarizeRequest):
    try:
        summary = await model_service.summarize_async(request.article)
        return SummarizeResponse(summary=summary)
    except ValueError as e:
        logger.error(f"Value error during summarize: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error during summarize: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during summarization.")
