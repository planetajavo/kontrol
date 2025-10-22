# 🌐 FASE 6: API Gateway & GraphQL (Semanas 11-12)

## Objetivos
- Implementar API Gateway completo
- Crear API GraphQL para frontend
- Implementar autenticación robusta
- Configurar rate limiting y seguridad

## Entregables

### 6.1 GraphQL API
- [ ] Schema GraphQL completo
- [ ] Resolvers optimizados
- [ ] DataLoader para N+1 queries
- [ ] Subscriptions en tiempo real
- [ ] Caching inteligente

### 6.2 REST API
- [ ] Endpoints REST para B2B
- [ ] Documentación OpenAPI
- [ ] Versionado de API
- [ ] Paginación eficiente
- [ ] Filtros y búsquedas

### 6.3 Authentication & Security
- [ ] JWT con refresh tokens
- [ ] OAuth 2.0 integration
- [ ] Rate limiting por usuario
- [ ] CORS configurado
- [ ] Input validation robusta

### 6.4 Webhooks & Real-time
- [ ] Webhooks para exchanges
- [ ] WebSocket para updates
- [ ] Event streaming
- [ ] Real-time notifications
- [ ] Queue management

## Implementación del API Gateway

### GraphQL Schema
```python
import strawberry
from strawberry.fastapi import GraphQLRouter
from typing import List, Optional
from datetime import datetime

@strawberry.type
class User:
    id: str
    email: str
    full_name: Optional[str]
    jurisdiction: str
    subscription_tier: str
    created_at: datetime

@strawberry.type
class Transaction:
    id: str
    tx_hash: str
    timestamp: datetime
    tx_type: str
    asset_in: str
    asset_out: str
    amount_in: float
    amount_out: float
    exchange_rate: float
    fiat_cost_basis_unit: float
    realized_pnl: float
    kontorl_type: str

@strawberry.type
class Portfolio:
    total_value_usd: float
    total_cost_basis: float
    unrealized_pnl: float
    realized_pnl: float
    holdings: List['Holding']

@strawberry.type
class Holding:
    asset: str
    amount: float
    value_usd: float
    cost_basis_usd: float
    unrealized_pnl: float
    unrealized_pnl_percent: float

@strawberry.type
class TaxReport:
    year: int
    method: str
    total_realized_gain: float
    total_tax_amount: float
    short_term_gains: float
    long_term_gains: float
    transactions: List[Transaction]

@strawberry.input
class TransactionFilter:
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    asset: Optional[str] = None
    tx_type: Optional[str] = None
    exchange: Optional[str] = None
    limit: int = 100
    offset: int = 0

@strawberry.input
class PortfolioFilter:
    date: Optional[datetime] = None
    include_unrealized: bool = True

class Query:
    @strawberry.field
    async def me(self, info) -> User:
        """Obtener información del usuario actual"""
        user_id = info.context["user_id"]
        return await user_service.get_user(user_id)
    
    @strawberry.field
    async def transactions(
        self, 
        info,
        filter: Optional[TransactionFilter] = None
    ) -> List[Transaction]:
        """Obtener transacciones del usuario"""
        user_id = info.context["user_id"]
        return await transaction_service.get_transactions(user_id, filter)
    
    @strawberry.field
    async def portfolio(
        self, 
        info,
        filter: Optional[PortfolioFilter] = None
    ) -> Portfolio:
        """Obtener portfolio del usuario"""
        user_id = info.context["user_id"]
        return await portfolio_service.get_portfolio(user_id, filter)
    
    @strawberry.field
    async def tax_report(
        self, 
        info,
        year: int,
        method: str = "FIFO"
    ) -> TaxReport:
        """Obtener reporte fiscal"""
        user_id = info.context["user_id"]
        return await tax_service.get_tax_report(user_id, year, method)
    
    @strawberry.field
    async def exchanges(self, info) -> List['Exchange']:
        """Obtener exchanges conectados"""
        user_id = info.context["user_id"]
        return await exchange_service.get_user_exchanges(user_id)
    
    @strawberry.field
    async def wallets(self, info) -> List['Wallet']:
        """Obtener wallets del usuario"""
        user_id = info.context["user_id"]
        return await wallet_service.get_user_wallets(user_id)

class Mutation:
    @strawberry.field
    async def connect_exchange(
        self, 
        info,
        exchange_name: str,
        api_key: str,
        api_secret: str
    ) -> 'Exchange':
        """Conectar exchange"""
        user_id = info.context["user_id"]
        return await exchange_service.connect_exchange(
            user_id, exchange_name, api_key, api_secret
        )
    
    @strawberry.field
    async def sync_exchange(
        self, 
        info,
        exchange_id: str
    ) -> bool:
        """Sincronizar datos de exchange"""
        user_id = info.context["user_id"]
        await exchange_service.sync_exchange(user_id, exchange_id)
        return True
    
    @strawberry.field
    async def add_wallet(
        self, 
        info,
        address: str,
        blockchain: str,
        label: Optional[str] = None
    ) -> 'Wallet':
        """Añadir wallet"""
        user_id = info.context["user_id"]
        return await wallet_service.add_wallet(user_id, address, blockchain, label)
    
    @strawberry.field
    async def generate_tax_report(
        self, 
        info,
        year: int,
        method: str = "FIFO"
    ) -> TaxReport:
        """Generar reporte fiscal"""
        user_id = info.context["user_id"]
        return await tax_service.generate_tax_report(user_id, year, method)

class Subscription:
    @strawberry.subscription
    async def portfolio_updates(self, info) -> Portfolio:
        """Suscripción a updates del portfolio"""
        user_id = info.context["user_id"]
        async for update in portfolio_service.subscribe_to_updates(user_id):
            yield update
    
    @strawberry.subscription
    async def transaction_updates(self, info) -> Transaction:
        """Suscripción a nuevas transacciones"""
        user_id = info.context["user_id"]
        async for tx in transaction_service.subscribe_to_new_transactions(user_id):
            yield tx

# Crear schema
schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    subscription=Subscription
)

# Crear router
graphql_app = GraphQLRouter(schema)
```

### REST API Endpoints
```python
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List, Optional
from datetime import datetime

router = APIRouter()
security = HTTPBearer()

# Authentication dependency
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    user_id = await auth_service.validate_token(token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    return user_id

# Exchange endpoints
@router.post("/api/v1/exchanges/connect")
async def connect_exchange(
    exchange_data: ExchangeConnectionRequest,
    user_id: str = Depends(get_current_user)
):
    """Conectar exchange"""
    try:
        exchange = await exchange_service.connect_exchange(
            user_id=user_id,
            exchange_name=exchange_data.exchange_name,
            api_key=exchange_data.api_key,
            api_secret=exchange_data.api_secret
        )
        return {"success": True, "exchange": exchange}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/api/v1/exchanges/{exchange_id}/sync")
async def sync_exchange(
    exchange_id: str,
    user_id: str = Depends(get_current_user)
):
    """Sincronizar datos de exchange"""
    try:
        await exchange_service.sync_exchange(user_id, exchange_id)
        return {"success": True, "message": "Sync initiated"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

# Transaction endpoints
@router.get("/api/v1/transactions")
async def get_transactions(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    asset: Optional[str] = None,
    tx_type: Optional[str] = None,
    exchange: Optional[str] = None,
    limit: int = 100,
    offset: int = 0,
    user_id: str = Depends(get_current_user)
):
    """Obtener transacciones con filtros"""
    filter_params = TransactionFilter(
        start_date=start_date,
        end_date=end_date,
        asset=asset,
        tx_type=tx_type,
        exchange=exchange,
        limit=limit,
        offset=offset
    )
    
    transactions = await transaction_service.get_transactions(user_id, filter_params)
    return {"transactions": transactions, "count": len(transactions)}

@router.get("/api/v1/transactions/{tx_id}")
async def get_transaction(
    tx_id: str,
    user_id: str = Depends(get_current_user)
):
    """Obtener transacción específica"""
    transaction = await transaction_service.get_transaction(user_id, tx_id)
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    return transaction

# Portfolio endpoints
@router.get("/api/v1/portfolio")
async def get_portfolio(
    date: Optional[datetime] = None,
    include_unrealized: bool = True,
    user_id: str = Depends(get_current_user)
):
    """Obtener portfolio"""
    portfolio = await portfolio_service.get_portfolio(
        user_id, 
        PortfolioFilter(date=date, include_unrealized=include_unrealized)
    )
    return portfolio

@router.get("/api/v1/portfolio/holdings")
async def get_holdings(
    user_id: str = Depends(get_current_user)
):
    """Obtener holdings detallados"""
    holdings = await portfolio_service.get_holdings(user_id)
    return {"holdings": holdings}

# Tax endpoints
@router.get("/api/v1/tax/reports/{year}")
async def get_tax_report(
    year: int,
    method: str = "FIFO",
    user_id: str = Depends(get_current_user)
):
    """Obtener reporte fiscal"""
    report = await tax_service.get_tax_report(user_id, year, method)
    return report

@router.post("/api/v1/tax/reports/{year}/generate")
async def generate_tax_report(
    year: int,
    method: str = "FIFO",
    user_id: str = Depends(get_current_user)
):
    """Generar reporte fiscal"""
    report = await tax_service.generate_tax_report(user_id, year, method)
    return {"success": True, "report": report}

# Webhook endpoints
@router.post("/api/v1/webhooks/exchanges/{exchange_name}")
async def exchange_webhook(
    exchange_name: str,
    payload: dict
):
    """Recibir webhooks de exchanges"""
    try:
        await webhook_service.process_exchange_webhook(exchange_name, payload)
        return {"success": True}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
```

### Rate Limiting
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)

# Aplicar rate limiting a endpoints
@router.post("/api/v1/exchanges/connect")
@limiter.limit("5/minute")  # 5 conexiones por minuto
async def connect_exchange(request: Request, ...):
    pass

@router.post("/api/v1/exchanges/{exchange_id}/sync")
@limiter.limit("10/hour")  # 10 sincronizaciones por hora
async def sync_exchange(request: Request, ...):
    pass

@router.get("/api/v1/transactions")
@limiter.limit("100/minute")  # 100 requests por minuto
async def get_transactions(request: Request, ...):
    pass
```

## Tecnologías
- **Strawberry**: GraphQL para Python
- **FastAPI**: Framework REST
- **JWT**: Autenticación
- **SlowAPI**: Rate limiting
- **WebSockets**: Real-time updates

## Criterios de Éxito
- ✅ GraphQL API funcionando con queries complejas
- ✅ REST API documentada con OpenAPI
- ✅ Autenticación JWT robusta
- ✅ Rate limiting configurado
- ✅ Webhooks funcionando
- ✅ Real-time subscriptions
- ✅ Tests de API pasando

