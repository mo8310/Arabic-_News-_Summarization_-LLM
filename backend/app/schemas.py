from pydantic import BaseModel, Field
from typing import List

class SummarizeRequest(BaseModel):
    article: str = Field(..., min_length=10, description="The Arabic news article to summarize.")

class SummarizeResponse(BaseModel):
    summary: List[str] = Field(..., description="The summary points of the article.")
    
class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
