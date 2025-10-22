"""
KONTROL Backend Configuration
Configuración centralizada para Supabase y servicios
"""

import os
from typing import Optional
from pydantic import BaseSettings, Field
from functools import lru_cache

class Settings(BaseSettings):
    """Configuración principal de la aplicación"""
    
    # Aplicación
    app_name: str = "KONTROL Backend"
    app_version: str = "1.0.0"
    debug: bool = Field(default=False, env="DEBUG")
    environment: str = Field(default="development", env="ENVIRONMENT")
    
    # Supabase
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_key: str = Field(..., env="SUPABASE_ANON_KEY")
    supabase_service_key: str = Field(..., env="SUPABASE_SERVICE_ROLE_KEY")
    
    # Base de datos
    database_url: str = Field(..., env="DATABASE_URL")
    database_pool_size: int = Field(default=10, env="DATABASE_POOL_SIZE")
    database_max_overflow: int = Field(default=20, env="DATABASE_MAX_OVERFLOW")
    
    # Redis
    redis_url: str = Field(default="redis://localhost:6379", env="REDIS_URL")
    redis_password: Optional[str] = Field(default=None, env="REDIS_PASSWORD")
    
    # Autenticación
    secret_key: str = Field(..., env="SECRET_KEY")
    algorithm: str = Field(default="HS256", env="ALGORITHM")
    access_token_expire_minutes: int = Field(default=30, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_days: int = Field(default=7, env="REFRESH_TOKEN_EXPIRE_DAYS")
    
    # APIs Externas
    openai_api_key: Optional[str] = Field(default=None, env="OPENAI_API_KEY")
    coingecko_api_key: Optional[str] = Field(default=None, env="COINGECKO_API_KEY")
    
    # Exchanges APIs
    binance_api_url: str = Field(default="https://api.binance.com", env="BINANCE_API_URL")
    coinbase_api_url: str = Field(default="https://api.exchange.coinbase.com", env="COINBASE_API_URL")
    kraken_api_url: str = Field(default="https://api.kraken.com", env="KRAKEN_API_URL")
    
    # Blockchain RPCs
    ethereum_rpc_url: Optional[str] = Field(default=None, env="ETHEREUM_RPC_URL")
    bitcoin_rpc_url: Optional[str] = Field(default=None, env="BITCOIN_RPC_URL")
    polygon_rpc_url: Optional[str] = Field(default=None, env="POLYGON_RPC_URL")
    
    # Rate Limiting
    rate_limit_requests_per_minute: int = Field(default=60, env="RATE_LIMIT_REQUESTS_PER_MINUTE")
    rate_limit_burst: int = Field(default=100, env="RATE_LIMIT_BURST")
    
    # Celery (Tareas asíncronas)
    celery_broker_url: str = Field(default="redis://localhost:6379/0", env="CELERY_BROKER_URL")
    celery_result_backend: str = Field(default="redis://localhost:6379/0", env="CELERY_RESULT_BACKEND")
    
    # Logging
    log_level: str = Field(default="INFO", env="LOG_LEVEL")
    log_format: str = Field(default="json", env="LOG_FORMAT")
    
    # CORS
    cors_origins: list = Field(default=["http://localhost:3000", "http://localhost:5173"], env="CORS_ORIGINS")
    cors_allow_credentials: bool = Field(default=True, env="CORS_ALLOW_CREDENTIALS")
    
    # Monitoreo
    sentry_dsn: Optional[str] = Field(default=None, env="SENTRY_DSN")
    prometheus_enabled: bool = Field(default=True, env="PROMETHEUS_ENABLED")
    
    # Storage
    storage_bucket: str = Field(default="kontrol-documents", env="STORAGE_BUCKET")
    max_file_size_mb: int = Field(default=10, env="MAX_FILE_SIZE_MB")
    
    # Matching Engine
    matching_engine_batch_size: int = Field(default=1000, env="MATCHING_ENGINE_BATCH_SIZE")
    matching_engine_time_window_seconds: int = Field(default=90, env="MATCHING_ENGINE_TIME_WINDOW_SECONDS")
    matching_engine_confidence_threshold: float = Field(default=0.8, env="MATCHING_ENGINE_CONFIDENCE_THRESHOLD")
    
    # Tax Engine
    tax_engine_default_method: str = Field(default="FIFO", env="TAX_ENGINE_DEFAULT_METHOD")
    tax_engine_supported_jurisdictions: list = Field(
        default=["ES", "US", "DE", "FR", "IT", "GB", "NL", "BE", "AT", "CH"],
        env="TAX_ENGINE_SUPPORTED_JURISDICTIONS"
    )
    
    # Agent Configuration
    agent_max_tokens: int = Field(default=4000, env="AGENT_MAX_TOKENS")
    agent_temperature: float = Field(default=0.1, env="AGENT_TEMPERATURE")
    agent_model: str = Field(default="gpt-4", env="AGENT_MODEL")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

@lru_cache()
def get_settings() -> Settings:
    """Obtener configuración (cached)"""
    return Settings()

# Configuración específica por entorno
class DevelopmentSettings(Settings):
    debug: bool = True
    environment: str = "development"
    log_level: str = "DEBUG"

class ProductionSettings(Settings):
    debug: bool = False
    environment: str = "production"
    log_level: str = "WARNING"
    cors_origins: list = ["https://kontrol.app", "https://app.kontrol.app"]

class TestingSettings(Settings):
    debug: bool = True
    environment: str = "testing"
    database_url: str = "sqlite:///./test.db"
    redis_url: str = "redis://localhost:6379/1"

def get_settings_by_env(env: str = None) -> Settings:
    """Obtener configuración según el entorno"""
    if env is None:
        env = os.getenv("ENVIRONMENT", "development")
    
    if env == "production":
        return ProductionSettings()
    elif env == "testing":
        return TestingSettings()
    else:
        return DevelopmentSettings()

# Configuración de Supabase
class SupabaseConfig:
    def __init__(self, settings: Settings):
        self.url = settings.supabase_url
        self.anon_key = settings.supabase_key
        self.service_key = settings.supabase_service_key
        self.storage_bucket = settings.storage_bucket

# Configuración de Redis
class RedisConfig:
    def __init__(self, settings: Settings):
        self.url = settings.redis_url
        self.password = settings.redis_password
        self.max_connections = 20
        self.retry_on_timeout = True

# Configuración de Celery
class CeleryConfig:
    def __init__(self, settings: Settings):
        self.broker_url = settings.celery_broker_url
        self.result_backend = settings.celery_result_backend
        self.task_serializer = "json"
        self.accept_content = ["json"]
        self.result_serializer = "json"
        self.timezone = "UTC"
        self.enable_utc = True
        self.task_track_started = True
        self.task_time_limit = 30 * 60  # 30 minutos
        self.task_soft_time_limit = 25 * 60  # 25 minutos
        self.worker_prefetch_multiplier = 1
        self.worker_max_tasks_per_child = 1000

# Configuración de logging
LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        },
        "json": {
            "format": '{"timestamp": "%(asctime)s", "logger": "%(name)s", "level": "%(levelname)s", "message": "%(message)s"}',
        },
    },
    "handlers": {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
        },
        "json": {
            "formatter": "json",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
        },
    },
    "root": {
        "level": "INFO",
        "handlers": ["default"],
    },
    "loggers": {
        "kontrol": {
            "level": "DEBUG",
            "handlers": ["default"],
            "propagate": False,
        },
        "uvicorn": {
            "level": "INFO",
            "handlers": ["default"],
            "propagate": False,
        },
    },
}

