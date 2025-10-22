"""
KONTROL Backend - Main Application
Aplicación principal FastAPI con todos los servicios integrados
"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import uvicorn
import logging
import time
from contextlib import asynccontextmanager

from config.settings import get_settings, LOGGING_CONFIG
from api.rest import router as rest_router
from api.graphql import graphql_app
from core.matching_engine.service import MatchingEngineService
from core.ingestion_service.service import IngestionService
from core.tax_engine.service import TaxEngineService
from core.compliance_engine.service import ComplianceService
from agents.transaction_agent.service import TransactionAgentService
from integrations.exchanges.service import ExchangeService
from analytics.portfolio_analyzer.service import PortfolioAnalyzerService
from utils.database import init_database
from utils.redis import init_redis
from utils.supabase import init_supabase
from utils.celery import init_celery

# Configurar logging
logging.config.dictConfig(LOGGING_CONFIG)
logger = logging.getLogger(__name__)

# Configuración
settings = get_settings()

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

# Servicios globales
matching_engine: MatchingEngineService = None
ingestion_service: IngestionService = None
tax_engine: TaxEngineService = None
compliance_service: ComplianceService = None
transaction_agent: TransactionAgentService = None
exchange_service: ExchangeService = None
portfolio_analyzer: PortfolioAnalyzerService = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gestión del ciclo de vida de la aplicación"""
    global matching_engine, ingestion_service, tax_engine, compliance_service
    global transaction_agent, exchange_service, portfolio_analyzer
    
    logger.info("🚀 Iniciando KONTROL Backend...")
    
    try:
        # Inicializar base de datos
        logger.info("📊 Inicializando base de datos...")
        await init_database()
        
        # Inicializar Redis
        logger.info("🔴 Inicializando Redis...")
        await init_redis()
        
        # Inicializar Supabase
        logger.info("☁️ Inicializando Supabase...")
        await init_supabase()
        
        # Inicializar Celery
        logger.info("⚡ Inicializando Celery...")
        init_celery()
        
        # Inicializar servicios
        logger.info("🔧 Inicializando servicios core...")
        matching_engine = MatchingEngineService()
        ingestion_service = IngestionService()
        tax_engine = TaxEngineService()
        compliance_service = ComplianceService()
        
        logger.info("🤖 Inicializando agentes de IA...")
        transaction_agent = TransactionAgentService()
        
        logger.info("🔌 Inicializando servicios de integración...")
        exchange_service = ExchangeService()
        portfolio_analyzer = PortfolioAnalyzerService()
        
        # Configurar servicios globales
        app.state.matching_engine = matching_engine
        app.state.ingestion_service = ingestion_service
        app.state.tax_engine = tax_engine
        app.state.compliance_service = compliance_service
        app.state.transaction_agent = transaction_agent
        app.state.exchange_service = exchange_service
        app.state.portfolio_analyzer = portfolio_analyzer
        
        logger.info("✅ KONTROL Backend iniciado correctamente")
        
        yield
        
    except Exception as e:
        logger.error(f"❌ Error iniciando KONTROL Backend: {e}")
        raise
    finally:
        logger.info("🛑 Cerrando KONTROL Backend...")

# Crear aplicación FastAPI
app = FastAPI(
    title="KONTROL API",
    description="API para la plataforma de gestión crypto-fiscal",
    version="1.0.0",
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
    lifespan=lifespan
)

# Middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=settings.cors_allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware de hosts confiables
if not settings.debug:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["kontrol.app", "api.kontrol.app", "*.kontrol.app"]
    )

# Middleware de rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Middleware de logging de requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    # Log request
    logger.info(f"📥 {request.method} {request.url.path} - {request.client.host}")
    
    # Procesar request
    response = await call_next(request)
    
    # Log response
    process_time = time.time() - start_time
    logger.info(f"📤 {response.status_code} - {process_time:.3f}s")
    
    return response

# Middleware de manejo de errores
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"💥 Error no manejado: {exc}", exc_info=True)
    
    if settings.debug:
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "detail": str(exc),
                "path": str(request.url.path)
            }
        )
    else:
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "message": "Algo salió mal. Por favor, inténtalo de nuevo."
            }
        )

# Rutas principales
@app.get("/")
async def root():
    """Endpoint raíz"""
    return {
        "message": "KONTROL API está funcionando",
        "version": settings.app_version,
        "environment": settings.environment,
        "timestamp": time.time()
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Verificar servicios
        health_status = {
            "status": "healthy",
            "timestamp": time.time(),
            "services": {
                "database": "ok",
                "redis": "ok",
                "supabase": "ok",
                "celery": "ok"
            }
        }
        
        # TODO: Verificar estado real de los servicios
        # if not await check_database_connection():
        #     health_status["services"]["database"] = "error"
        #     health_status["status"] = "unhealthy"
        
        return health_status
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "error": str(e),
                "timestamp": time.time()
            }
        )

@app.get("/metrics")
async def metrics():
    """Endpoint de métricas para Prometheus"""
    if not settings.prometheus_enabled:
        raise HTTPException(status_code=404, detail="Metrics not enabled")
    
    # TODO: Implementar métricas de Prometheus
    return {"message": "Metrics endpoint - TODO: implementar"}

# Incluir routers
app.include_router(rest_router, prefix="/api/v1")
app.mount("/graphql", graphql_app)

# Rate limiting en endpoints específicos
@app.get("/api/v1/status")
@limiter.limit("10/minute")
async def api_status(request: Request):
    """Estado de la API con rate limiting"""
    return {
        "status": "ok",
        "timestamp": time.time(),
        "rate_limit": "10/minute"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
        log_level=settings.log_level.lower(),
        access_log=True
    )