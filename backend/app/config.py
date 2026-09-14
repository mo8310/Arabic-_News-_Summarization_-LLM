import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    api_v1_str: str = "/api"
    project_name: str = "Arabic News Summarization API"
    # Defaults to standard paths, configurable via env vars
    base_model_id: str = os.getenv("BASE_MODEL_ID", "Qwen/Qwen2.5-1.5B-Instruct")
    adapter_model_path: str = os.getenv("ADAPTER_MODEL_PATH", "../model")
    device: str = os.getenv("DEVICE", "cuda") # model_service will fallback to cpu if cuda not available
    max_input_length: int = int(os.getenv("MAX_INPUT_LENGTH", "3000"))
    
    class Config:
        env_file = ".env"

settings = Settings()
