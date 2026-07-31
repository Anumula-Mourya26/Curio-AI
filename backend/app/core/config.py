"""
Application Configuration.

Centralizes environment-driven settings (API prefix, CORS, upload limits,
LLM keys). All modules read config from here rather than hard-coding values.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "ACaaS"
    DEBUG: bool = True
    API_PREFIX: str = "/api/v1"

    CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    MAX_UPLOAD_SIZE_MB: int = 50
    UPLOAD_DIR: str = "./uploads"

    # Featherless AI
    FEATHERLESS_API_KEY: str = ""
    FEATHERLESS_BASE_URL: str = "https://api.featherless.ai/v1"
    FEATHERLESS_MODEL: str = "Qwen/Qwen2.5-7B-Instruct"

    # Future fallback
    OPENAI_API_KEY: str = ""
    LLM_MODEL: str = "gpt-4o-mini"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()