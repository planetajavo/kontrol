# 🏗️ Architecture Overview - KONTROL

> Visión general de la arquitectura del sistema

## 🎯 Filosofía de Arquitectura

KONTROL sigue una arquitectura **simple, incremental y mantenible**, diseñada específicamente para solopreneurs:

### Principios

1. **Simplicidad primero** - Evitar over-engineering
2. **Desarrollo incremental** - Features pequeñas y manejables
3. **Debugging visible** - Logs claros en todo el sistema
4. **Separación de responsabilidades** - Frontend, Backend, Base de Datos

---

## 📊 Diagrama de Alto Nivel

```
┌─────────────────────────────────────────────────┐
│                   USUARIO                        │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│              FRONTEND (React)                    │
│  ┌─────────────────────────────────────────┐   │
│  │  - Importador de Direcciones            │   │
│  │  - Consola de Debug                     │   │
│  │  - UI Minimalista                       │   │
│  └─────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────┘
                   │ HTTP/REST
                   ▼
┌─────────────────────────────────────────────────┐
│              BACKEND (FastAPI)                   │
│  ┌─────────────────────────────────────────┐   │
│  │  API Layer                               │   │
│  │  ├── /api/addresses                      │   │
│  │  ├── /api/transactions                   │   │
│  │  └── /api/portfolio                      │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  Core Services                           │   │
│  │  ├── Matching Engine                     │   │
│  │  ├── Tax Engine                          │   │
│  │  └── Compliance Engine                   │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  Integrations                            │   │
│  │  ├── Exchanges (Binance, Coinbase)      │   │
│  │  ├── Blockchains (Etherscan, etc)       │   │
│  │  └── Price Feeds (CoinGecko, etc)       │   │
│  └─────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│           BASE DE DATOS (Supabase)              │
│  ┌─────────────────────────────────────────┐   │
│  │  PostgreSQL                              │   │
│  │  ├── addresses                           │   │
│  │  ├── transactions                        │   │
│  │  ├── portfolios                          │   │
│  │  └── tax_reports                         │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Architecture

### Stack Tecnológico
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS puro (sin frameworks pesados)
- **State**: React Hooks (useState, useEffect)

### Estructura de Componentes

```
frontend/src/
├── components/
│   ├── AddressImporter.tsx    # Importador de direcciones
│   ├── DebugConsole.tsx        # Consola de debug
│   └── [Futuros componentes]
├── App.tsx                     # Componente principal
├── main.tsx                    # Entry point
└── index.css                   # Estilos globales
```

### Flujo de Datos

```
Usuario → Componente → Hook → API → Backend
                      ↓
                    Estado
                      ↓
                   Consola Debug
```

---

## ⚙️ Backend Architecture

### Stack Tecnológico
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database ORM**: SQLAlchemy (async)
- **Task Queue**: Celery + Redis
- **AI/ML**: LangChain + OpenAI

### Estructura de Módulos

```
backend/
├── api/                    # API endpoints
│   ├── rest/              # REST API
│   ├── graphql/           # GraphQL (futuro)
│   └── webhooks/          # Webhooks
│
├── core/                  # Servicios core
│   ├── matching_engine/   # Reconciliación de TXs
│   ├── tax_engine/        # Cálculos fiscales
│   ├── compliance_engine/ # Reportes DAC8
│   └── ingestion_service/ # ETL de datos
│
├── agents/                # Agentes de IA
│   ├── transaction_agent/ # Análisis de TXs
│   ├── tax_optimizer/     # Optimización fiscal
│   └── security_agent/    # Análisis de riesgo
│
├── integrations/          # Integraciones externas
│   ├── exchanges/         # APIs de exchanges
│   ├── blockchains/       # Blockchain explorers
│   └── price_feeds/       # APIs de precios
│
├── models/                # Modelos de datos
├── utils/                 # Utilidades
└── main.py               # App principal
```

### Capas de la Aplicación

```
┌─────────────────────────────────────┐
│         API Layer (FastAPI)          │  ← Endpoints REST/GraphQL
├─────────────────────────────────────┤
│       Business Logic Layer           │  ← Services y Core modules
├─────────────────────────────────────┤
│       Data Access Layer              │  ← SQLAlchemy models
├─────────────────────────────────────┤
│          Database                    │  ← Supabase (PostgreSQL)
└─────────────────────────────────────┘
```

---

## 🗄️ Database Architecture

### Tecnologías de Base de Datos

1. **PostgreSQL (Supabase)** - Base de datos principal
   - Transacciones
   - Direcciones
   - Portfolios
   - Usuarios

2. **Redis** - Cache y sesiones (futuro)
   - Cache de API calls
   - Rate limiting
   - Session storage

3. **ClickHouse** - Analytics (futuro)
   - Métricas de uso
   - Análisis de portfolio
   - Reporting avanzado

### Esquema Principal (Simplified)

```sql
-- Usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  created_at TIMESTAMP
);

-- Direcciones de Wallet
CREATE TABLE addresses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  address VARCHAR NOT NULL,
  chain VARCHAR NOT NULL,  -- 'ethereum', 'bitcoin', etc
  label VARCHAR,
  created_at TIMESTAMP
);

-- Transacciones
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  address_id UUID REFERENCES addresses(id),
  hash VARCHAR UNIQUE,
  type VARCHAR,  -- 'send', 'receive', 'swap', etc
  amount DECIMAL,
  asset VARCHAR,
  timestamp TIMESTAMP,
  created_at TIMESTAMP
);

-- Portfolios
CREATE TABLE portfolios (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR,
  created_at TIMESTAMP
);
```

---

## 🔄 Data Flow

### 1. Importar Direcciones

```
Usuario → Frontend → POST /api/addresses/import
                           ↓
                     Validar direcciones
                           ↓
                     Guardar en DB (Supabase)
                           ↓
                     Retornar success
                           ↓
                     Frontend muestra resultado
```

### 2. Sincronizar Transacciones (Futuro)

```
Usuario → Trigger sync
              ↓
        Backend fetches from:
        ├── Blockchain Explorer (Etherscan)
        ├── Exchange API (Binance)
        └── Price Feed (CoinGecko)
              ↓
        Matching Engine procesa
              ↓
        Guarda en PostgreSQL
              ↓
        Actualiza frontend
```

---

## 🔌 Integrations Architecture

### External APIs

```
KONTROL Backend
      │
      ├──→ Etherscan API (Ethereum TXs)
      ├──→ Binance API (Exchange data)
      ├──→ Coinbase API (Exchange data)
      ├──→ CoinGecko API (Prices)
      └──→ OpenAI API (AI agents)
```

### Rate Limiting Strategy

```python
# Por API:
- Etherscan: 5 req/sec
- Binance: 1200 req/min
- CoinGecko: 50 req/min (free tier)

# Implementación:
- Redis para rate limiting
- Queue con Celery para tasks async
- Retry logic con backoff exponencial
```

---

## 🚀 Deployment Architecture (Futuro)

### Development
```
Local Machine
├── Frontend: localhost:3000
├── Backend: localhost:8000
└── DB: Supabase cloud
```

### Production (Planned)
```
Vercel (Frontend)
    │
    ▼
Railway/Fly.io (Backend)
    │
    ▼
Supabase (Database)
```

---

## 📈 Scalability Considerations

### Fase MVP (Ahora)
- ✅ Monolito simple
- ✅ Una base de datos
- ✅ Deploy sencillo

### Fase Growth (Futuro)
- 🔄 Microservicios separados
- 🔄 Multiple databases (PostgreSQL + Redis + ClickHouse)
- 🔄 Queue system (Celery + Redis)
- 🔄 CDN para assets

### Fase Scale (Largo Plazo)
- 🔄 Kubernetes orchestration
- 🔄 Auto-scaling
- 🔄 Multi-region
- 🔄 Advanced caching

---

## 🔒 Security Architecture

### Authentication
```
Usuario → Frontend → Backend (JWT)
                        ↓
                  Supabase Auth
                        ↓
                  Verificar token
                        ↓
                  Access granted
```

### API Security
- Rate limiting (SlowAPI)
- CORS configuration
- Input validation (Pydantic)
- SQL injection prevention (SQLAlchemy ORM)

---

## 📊 Monitoring & Logging

### Logging Strategy

**Frontend**:
```typescript
// Consola de Debug integrada
onLog('info', 'Mensaje');
onLog('success', 'Operación exitosa');
onLog('error', 'Error ocurrido', { error });
```

**Backend**:
```python
# Python logging
logger.info("Operación iniciada")
logger.error("Error", exc_info=True)
```

### Monitoring (Futuro)
- Sentry para error tracking
- Prometheus para métricas
- Grafana para dashboards

---

## 🎯 Estado Actual vs Objetivo

### ✅ Implementado (MVP)
- Frontend minimalista funcionando
- Estructura del backend lista
- Consola de debug integrada
- Documentación organizada

### 🚧 En Desarrollo
- Endpoints del backend
- Conexión frontend-backend
- Persistencia en base de datos

### 📋 Roadmap
1. **Semana 1-2**: Backend básico + DB
2. **Semana 3-4**: Matching Engine
3. **Semana 5-6**: Integraciones con exchanges
4. **Semana 7-8**: Tax Engine
5. **Semana 9-10**: AI Agents

---

## 📚 Ver También

- [Tech Stack Details](./tech-stack.md)
- [Database Schema](./database.md)
- [Implementation Plan](../backend/implementation-plan.md)
- [Getting Started](../guides/getting-started.md)

---

**Última actualización**: 2025-10-22
**Versión**: MVP v0.1.0
