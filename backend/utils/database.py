"""
KONTROL Database Utilities
Utilidades para conexión y gestión de base de datos con Supabase
"""

from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import StaticPool
import logging
from typing import AsyncGenerator

from config.settings import get_settings
from models.database import Base

logger = logging.getLogger(__name__)
settings = get_settings()

# Motor de base de datos síncrono
engine = create_engine(
    settings.database_url,
    pool_size=settings.database_pool_size,
    max_overflow=settings.database_max_overflow,
    pool_pre_ping=True,
    echo=settings.debug
)

# Motor de base de datos asíncrono
async_engine = create_async_engine(
    settings.database_url.replace("postgresql://", "postgresql+asyncpg://"),
    pool_size=settings.database_pool_size,
    max_overflow=settings.database_max_overflow,
    pool_pre_ping=True,
    echo=settings.debug
)

# Session makers
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
AsyncSessionLocal = sessionmaker(
    async_engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

# Metadata
metadata = MetaData()

async def init_database():
    """Inicializar base de datos"""
    try:
        logger.info("🔗 Conectando a base de datos...")
        
        # Crear todas las tablas
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        
        logger.info("✅ Base de datos inicializada correctamente")
        
    except Exception as e:
        logger.error(f"❌ Error inicializando base de datos: {e}")
        raise

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """Obtener sesión asíncrona de base de datos"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

def get_sync_session():
    """Obtener sesión síncrona de base de datos"""
    session = SessionLocal()
    try:
        return session
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()

async def check_database_connection() -> bool:
    """Verificar conexión a base de datos"""
    try:
        async with AsyncSessionLocal() as session:
            await session.execute("SELECT 1")
        return True
    except Exception as e:
        logger.error(f"Database connection check failed: {e}")
        return False

# Clase base para repositorios
class BaseRepository:
    """Clase base para repositorios de datos"""
    
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def create(self, model_instance):
        """Crear nueva instancia"""
        self.session.add(model_instance)
        await self.session.commit()
        await self.session.refresh(model_instance)
        return model_instance
    
    async def get_by_id(self, model_class, id):
        """Obtener por ID"""
        result = await self.session.execute(
            model_class.__table__.select().where(model_class.id == id)
        )
        return result.scalar_one_or_none()
    
    async def get_all(self, model_class, skip: int = 0, limit: int = 100):
        """Obtener todos con paginación"""
        result = await self.session.execute(
            model_class.__table__.select().offset(skip).limit(limit)
        )
        return result.scalars().all()
    
    async def update(self, model_instance):
        """Actualizar instancia"""
        await self.session.commit()
        await self.session.refresh(model_instance)
        return model_instance
    
    async def delete(self, model_instance):
        """Eliminar instancia"""
        await self.session.delete(model_instance)
        await self.session.commit()
        return True

# Repositorio específico para usuarios
class UserRepository(BaseRepository):
    """Repositorio para gestión de usuarios"""
    
    async def get_by_email(self, email: str):
        """Obtener usuario por email"""
        from models.database import User
        result = await self.session.execute(
            User.__table__.select().where(User.email == email)
        )
        return result.scalar_one_or_none()
    
    async def get_by_jurisdiction(self, jurisdiction: str, skip: int = 0, limit: int = 100):
        """Obtener usuarios por jurisdicción"""
        from models.database import User
        result = await self.session.execute(
            User.__table__.select()
            .where(User.jurisdiction == jurisdiction)
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

# Repositorio específico para transacciones
class TransactionRepository(BaseRepository):
    """Repositorio para gestión de transacciones"""
    
    async def get_by_user(self, user_id: str, skip: int = 0, limit: int = 100):
        """Obtener transacciones por usuario"""
        from models.database import CanonicalTransaction
        result = await self.session.execute(
            CanonicalTransaction.__table__.select()
            .where(CanonicalTransaction.user_id == user_id)
            .order_by(CanonicalTransaction.timestamp_utc.desc())
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()
    
    async def get_by_asset(self, user_id: str, asset: str, skip: int = 0, limit: int = 100):
        """Obtener transacciones por asset"""
        from models.database import CanonicalTransaction
        result = await self.session.execute(
            CanonicalTransaction.__table__.select()
            .where(
                CanonicalTransaction.user_id == user_id,
                CanonicalTransaction.asset_in == asset
            )
            .order_by(CanonicalTransaction.timestamp_utc.desc())
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()
    
    async def get_by_date_range(self, user_id: str, start_date, end_date):
        """Obtener transacciones por rango de fechas"""
        from models.database import CanonicalTransaction
        result = await self.session.execute(
            CanonicalTransaction.__table__.select()
            .where(
                CanonicalTransaction.user_id == user_id,
                CanonicalTransaction.timestamp_utc >= start_date,
                CanonicalTransaction.timestamp_utc <= end_date
            )
            .order_by(CanonicalTransaction.timestamp_utc.desc())
        )
        return result.scalars().all()
    
    async def get_by_kontorl_type(self, user_id: str, kontorl_type: str):
        """Obtener transacciones por tipo KONTROL"""
        from models.database import CanonicalTransaction
        result = await self.session.execute(
            CanonicalTransaction.__table__.select()
            .where(
                CanonicalTransaction.user_id == user_id,
                CanonicalTransaction.kontorl_type == kontorl_type
            )
            .order_by(CanonicalTransaction.timestamp_utc.desc())
        )
        return result.scalars().all()

# Repositorio específico para exchanges
class ExchangeRepository(BaseRepository):
    """Repositorio para gestión de exchanges"""
    
    async def get_by_user(self, user_id: str):
        """Obtener exchanges por usuario"""
        from models.database import ExchangeConnection
        result = await self.session.execute(
            ExchangeConnection.__table__.select()
            .where(ExchangeConnection.user_id == user_id)
        )
        return result.scalars().all()
    
    async def get_active_by_user(self, user_id: str):
        """Obtener exchanges activos por usuario"""
        from models.database import ExchangeConnection
        result = await self.session.execute(
            ExchangeConnection.__table__.select()
            .where(
                ExchangeConnection.user_id == user_id,
                ExchangeConnection.is_active == True
            )
        )
        return result.scalars().all()
    
    async def get_by_exchange_name(self, user_id: str, exchange_name: str):
        """Obtener conexión específica por nombre de exchange"""
        from models.database import ExchangeConnection
        result = await self.session.execute(
            ExchangeConnection.__table__.select()
            .where(
                ExchangeConnection.user_id == user_id,
                ExchangeConnection.exchange_name == exchange_name
            )
        )
        return result.scalar_one_or_none()

# Repositorio específico para wallets
class WalletRepository(BaseRepository):
    """Repositorio para gestión de wallets"""
    
    async def get_by_user(self, user_id: str):
        """Obtener wallets por usuario"""
        from models.database import WalletAddress
        result = await self.session.execute(
            WalletAddress.__table__.select()
            .where(WalletAddress.user_id == user_id)
        )
        return result.scalars().all()
    
    async def get_by_blockchain(self, user_id: str, blockchain: str):
        """Obtener wallets por blockchain"""
        from models.database import WalletAddress
        result = await self.session.execute(
            WalletAddress.__table__.select()
            .where(
                WalletAddress.user_id == user_id,
                WalletAddress.blockchain == blockchain
            )
        )
        return result.scalars().all()
    
    async def get_by_address(self, address: str):
        """Obtener wallet por dirección"""
        from models.database import WalletAddress
        result = await self.session.execute(
            WalletAddress.__table__.select()
            .where(WalletAddress.address == address)
        )
        return result.scalar_one_or_none()

# Repositorio específico para portfolios
class PortfolioRepository(BaseRepository):
    """Repositorio para gestión de portfolios"""
    
    async def get_latest_snapshot(self, user_id: str):
        """Obtener snapshot más reciente del portfolio"""
        from models.database import PortfolioSnapshot
        result = await self.session.execute(
            PortfolioSnapshot.__table__.select()
            .where(PortfolioSnapshot.user_id == user_id)
            .order_by(PortfolioSnapshot.date.desc())
        )
        return result.scalars().all()
    
    async def get_by_date(self, user_id: str, date):
        """Obtener snapshot por fecha específica"""
        from models.database import PortfolioSnapshot
        result = await self.session.execute(
            PortfolioSnapshot.__table__.select()
            .where(
                PortfolioSnapshot.user_id == user_id,
                PortfolioSnapshot.date == date
            )
        )
        return result.scalars().all()
    
    async def get_by_asset(self, user_id: str, asset: str):
        """Obtener historial de un asset específico"""
        from models.database import PortfolioSnapshot
        result = await self.session.execute(
            PortfolioSnapshot.__table__.select()
            .where(
                PortfolioSnapshot.user_id == user_id,
                PortfolioSnapshot.asset == asset
            )
            .order_by(PortfolioSnapshot.date.desc())
        )
        return result.scalars().all()

# Repositorio específico para reportes fiscales
class TaxReportRepository(BaseRepository):
    """Repositorio para gestión de reportes fiscales"""
    
    async def get_by_user_and_year(self, user_id: str, year: int):
        """Obtener reportes por usuario y año"""
        from models.database import TaxReport
        result = await self.session.execute(
            TaxReport.__table__.select()
            .where(
                TaxReport.user_id == user_id,
                TaxReport.year == year
            )
        )
        return result.scalars().all()
    
    async def get_by_method(self, user_id: str, method: str):
        """Obtener reportes por método de cálculo"""
        from models.database import TaxReport
        result = await self.session.execute(
            TaxReport.__table__.select()
            .where(
                TaxReport.user_id == user_id,
                TaxReport.method == method
            )
            .order_by(TaxReport.year.desc())
        )
        return result.scalars().all()

