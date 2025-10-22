# 📝 Naming Conventions - Backend

> Estándares de nomenclatura para el backend de KONTROL

## 🎯 Filosofía

**Principio**: El código debe ser **auto-documentado** y fácil de entender.

- ✅ Nombres descriptivos > Nombres cortos
- ✅ Consistencia > Conveniencia personal
- ✅ Python standards (PEP 8) siempre

---

## 📁 Archivos y Carpetas

### Archivos Python
```python
✅ CORRECTO:
- address_service.py
- matching_engine.py
- transaction_agent.py
- api_gateway.py

❌ INCORRECTO:
- AddressService.py
- matchingEngine.py
- TransactionAgent.py
- API_Gateway.py
```

**Regla**: `snake_case` para todos los archivos Python

### Carpetas
```
✅ CORRECTO:
- core/
- matching_engine/
- api/
- integrations/

❌ INCORRECTO:
- Core/
- matchingEngine/
- API/
- Integrations/
```

**Regla**: `lowercase` con `snake_case` si es necesario

---

## 🔤 Variables y Funciones

### Variables
```python
✅ CORRECTO:
user_id = "123"
address_list = []
transaction_count = 0
is_valid = True

❌ INCORRECTO:
userId = "123"
AddressList = []
TransactionCount = 0
IsValid = True
```

**Regla**: `snake_case` para variables

### Constantes
```python
✅ CORRECTO:
MAX_ADDRESSES = 100
API_VERSION = "1.0"
DEFAULT_TIMEOUT = 30

❌ INCORRECTO:
maxAddresses = 100
api_version = "1.0"
defaultTimeout = 30
```

**Regla**: `UPPER_SNAKE_CASE` para constantes

### Funciones
```python
✅ CORRECTO:
def get_user_addresses(user_id: str):
    pass

def calculate_cost_basis(transactions: list):
    pass

async def fetch_blockchain_data(address: str):
    pass

❌ INCORRECTO:
def GetUserAddresses(userId: str):
    pass

def CalculateCostBasis(transactions: list):
    pass
```

**Regla**: `snake_case` para funciones

---

## 🏗️ Clases y Modelos

### Clases
```python
✅ CORRECTO:
class AddressService:
    pass

class MatchingEngine:
    pass

class TransactionAgent:
    pass

❌ INCORRECTO:
class address_service:
    pass

class matchingEngine:
    pass

class transaction_agent:
    pass
```

**Regla**: `PascalCase` para clases

### Modelos SQLAlchemy
```python
✅ CORRECTO:
class User(Base):
    __tablename__ = "users"
    
class Address(Base):
    __tablename__ = "addresses"
    
class Transaction(Base):
    __tablename__ = "transactions"

❌ INCORRECTO:
class user(Base):
    __tablename__ = "Users"
```

**Regla**: 
- Clase en `PascalCase` (singular)
- Tabla en `snake_case` (plural)

### Modelos Pydantic
```python
✅ CORRECTO:
class AddressImportRequest(BaseModel):
    addresses: List[str]

class TransactionResponse(BaseModel):
    id: str
    amount: Decimal

❌ INCORRECTO:
class address_import_request(BaseModel):
    Addresses: List[str]
```

**Regla**: `PascalCase` + sufijos descriptivos (Request, Response, Schema)

---

## 🌐 API Endpoints

### REST Endpoints
```python
✅ CORRECTO:
@router.post("/api/addresses/import")
@router.get("/api/addresses")
@router.get("/api/addresses/{address_id}")
@router.put("/api/transactions/{tx_id}")

❌ INCORRECTO:
@router.post("/api/Addresses/Import")
@router.get("/api/addresses/getAll")
@router.get("/api/addresses/GetById/{id}")
```

**Reglas**:
- Siempre `lowercase`
- Plural para colecciones: `/addresses`, `/transactions`
- Singular para acciones: `/import`, `/sync`
- IDs con `snake_case`: `{address_id}`, `{user_id}`

### Verbos HTTP
```python
✅ CORRECTO:
GET    /api/addresses          # Listar
POST   /api/addresses/import   # Crear/Importar
GET    /api/addresses/{id}     # Obtener uno
PUT    /api/addresses/{id}     # Actualizar
DELETE /api/addresses/{id}     # Eliminar

❌ INCORRECTO:
GET /api/addresses/getAll
POST /api/addresses/create
GET /api/addresses/get/{id}
```

**Regla**: Usar verbos HTTP correctamente, no en la URL

---

## 📊 Base de Datos

### Tablas
```sql
✅ CORRECTO:
users
addresses
transactions
portfolios
tax_reports

❌ INCORRECTO:
Users
address
Transaction
portfolio
TaxReports
```

**Regla**: `snake_case`, plural

### Columnas
```sql
✅ CORRECTO:
id, user_id, created_at, updated_at
address, chain, label
tx_hash, amount, asset

❌ INCORRECTO:
Id, userId, CreatedAt
Address, Chain, Label
TxHash, Amount, Asset
```

**Regla**: `snake_case`

### Foreign Keys
```sql
✅ CORRECTO:
user_id REFERENCES users(id)
address_id REFERENCES addresses(id)
portfolio_id REFERENCES portfolios(id)

❌ INCORRECTO:
userId REFERENCES Users(Id)
addressId REFERENCES Address(id)
```

**Regla**: `tabla_singular_id`

---

## 🔧 Configuración y Entorno

### Variables de Entorno
```bash
✅ CORRECTO:
SUPABASE_URL=...
SUPABASE_KEY=...
OPENAI_API_KEY=...
DATABASE_URL=...

❌ INCORRECTO:
supabase_url=...
SupabaseKey=...
openaiApiKey=...
```

**Regla**: `UPPER_SNAKE_CASE`

### Archivos de Config
```python
✅ CORRECTO:
config/settings.py
config/database.py
config/logging.py

❌ INCORRECTO:
config/Settings.py
config/Database.py
config/Logging.py
```

**Regla**: `snake_case`

---

## 📝 Comentarios y Docstrings

### Funciones
```python
✅ CORRECTO:
def calculate_cost_basis(
    transactions: List[Transaction],
    method: str = "FIFO"
) -> Decimal:
    """
    Calcula el cost basis de transacciones usando el método especificado.
    
    Args:
        transactions: Lista de transacciones a procesar
        method: Método de cálculo (FIFO, LIFO, HIFO)
    
    Returns:
        Cost basis total como Decimal
    
    Raises:
        ValueError: Si el método no es válido
    """
    pass

❌ INCORRECTO:
def calculateCostBasis(txs, mthd="FIFO"):
    # calcula cost basis
    pass
```

**Regla**: Google-style docstrings en español

### Clases
```python
✅ CORRECTO:
class MatchingEngine:
    """
    Motor de reconciliación de transacciones.
    
    Identifica transferencias internas y calcula cost basis
    usando diferentes métodos (FIFO, LIFO, HIFO).
    
    Attributes:
        method: Método de cálculo por defecto
        tolerance: Tolerancia para matching (0.001 = 0.1%)
    """
    
    def __init__(self, method: str = "FIFO"):
        self.method = method
        self.tolerance = 0.001
```

---

## 🧪 Tests

### Archivos de Test
```python
✅ CORRECTO:
tests/test_address_service.py
tests/test_matching_engine.py
tests/test_tax_calculations.py

❌ INCORRECTO:
tests/AddressServiceTest.py
tests/test_matchingEngine.py
tests/TestTaxCalculations.py
```

**Regla**: `test_` prefix + `snake_case`

### Funciones de Test
```python
✅ CORRECTO:
def test_import_valid_addresses():
    pass

def test_calculate_cost_basis_fifo():
    pass

async def test_fetch_blockchain_data():
    pass

❌ INCORRECTO:
def testImportValidAddresses():
    pass

def test_calculateCostBasisFIFO():
    pass
```

**Regla**: `test_` prefix + descripción descriptiva

---

## 📦 Imports

### Orden de Imports
```python
✅ CORRECTO:
# Standard library
import os
import sys
from datetime import datetime

# Third-party
from fastapi import FastAPI, HTTPException
from sqlalchemy import Column, String
import pandas as pd

# Local
from config.settings import get_settings
from models.address import Address
from services.address_service import AddressService

❌ INCORRECTO:
# Todo mezclado
from models.address import Address
import os
from fastapi import FastAPI
import pandas as pd
from config.settings import get_settings
```

**Regla**: stdlib → third-party → local, con líneas en blanco

---

## 🎯 Ejemplos Completos

### Service Example
```python
# services/address_service.py

from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from models.address import Address
from schemas.address import AddressCreate, AddressResponse

class AddressService:
    """Servicio para gestión de direcciones de wallet."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def import_addresses(
        self,
        user_id: str,
        addresses: List[str]
    ) -> List[AddressResponse]:
        """
        Importa múltiples direcciones para un usuario.
        
        Args:
            user_id: ID del usuario
            addresses: Lista de direcciones a importar
        
        Returns:
            Lista de direcciones creadas
        """
        created_addresses = []
        
        for addr in addresses:
            if self._validate_address(addr):
                db_address = Address(
                    user_id=user_id,
                    address=addr
                )
                self.db.add(db_address)
                created_addresses.append(db_address)
        
        await self.db.commit()
        return created_addresses
    
    def _validate_address(self, address: str) -> bool:
        """Valida formato de dirección."""
        # Implementación...
        return True
```

### API Endpoint Example
```python
# api/rest/addresses.py

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from schemas.address import AddressImportRequest, AddressResponse
from services.address_service import AddressService

router = APIRouter(prefix="/api/addresses", tags=["addresses"])

@router.post("/import", response_model=AddressResponse)
async def import_addresses(
    request: AddressImportRequest,
    service: AddressService = Depends(get_address_service)
):
    """
    Importa direcciones de wallet.
    
    - **addresses**: Lista de direcciones a importar
    """
    try:
        result = await service.import_addresses(
            user_id="user_123",  # TODO: Get from auth
            addresses=request.addresses
        )
        return {
            "success": True,
            "imported": len(result),
            "addresses": result
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
```

---

## ✅ Checklist de Código

Antes de hacer commit, verifica:

- [ ] Nombres en `snake_case` (archivos, variables, funciones)
- [ ] Clases en `PascalCase`
- [ ] Constantes en `UPPER_SNAKE_CASE`
- [ ] Endpoints en `lowercase`
- [ ] Docstrings en funciones públicas
- [ ] Imports ordenados correctamente
- [ ] No hay typos en nombres
- [ ] Nombres descriptivos (no abreviaturas raras)

---

## 🚫 Qué Evitar

### Abreviaturas Confusas
```python
❌ NO:
def get_addr(usr_id):  # ¿addr? ¿address?
    tmp = []           # ¿tmp? ¿temporal?
    res = calc()       # ¿res? ¿result? ¿response?

✅ SÍ:
def get_address(user_id):
    addresses = []
    result = calculate_cost_basis()
```

### Nombres Genéricos
```python
❌ NO:
data = get_data()
info = process_info()
temp = []

✅ SÍ:
transactions = get_transactions()
portfolio = process_portfolio_data()
validated_addresses = []
```

### Inconsistencia
```python
❌ NO:
getUserAddresses()  # camelCase
get_user_txs()      # abreviación
GetUserPortfolio()  # PascalCase

✅ SÍ:
get_user_addresses()
get_user_transactions()
get_user_portfolio()
```

---

**Recuerda**: La consistencia es más importante que tu preferencia personal.

**Última actualización**: 2025-10-22
