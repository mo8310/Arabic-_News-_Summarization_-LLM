from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from contextlib import asynccontextmanager
import os

from .config import settings
from .api.routes import router
from .model_service import model_service

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    logger.info("Starting up and loading model...")
    try:
        model_service.load_model()
    except Exception as e:
        logger.error(f"Failed to load model on startup: {e}")
    yield
    logger.info("Shutting down...")

app = FastAPI(
    title=settings.project_name,
    lifespan=lifespan
)

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url, "http://localhost:3000", "*"], # Added * for easier local dev, can restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix=settings.api_v1_str)
