# 🛠️ Tech Stack - KONTROL

> Stack tecnológico completo del proyecto

## 🎨 Frontend Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript 5.5+** - Type safety
- **Vite 5.4+** - Build tool & dev server

### Styling
- **CSS puro** - Sin frameworks pesados
- Variables CSS para theming
- Diseño responsive mobile-first

### Estado y Datos
- **React Hooks** - useState, useEffect, custom hooks
- **Fetch API** - HTTP requests (nativo)
- Sin Redux/Zustand (simplicidad first)

### Desarrollo
- **ESLint** - Linting (futuro)
- **Prettier** - Code formatting (futuro)

---

## ⚙️ Backend Stack

### Core Framework
- **FastAPI 0.104+** - Modern Python web framework
  - Auto-generated OpenAPI docs
  - Async/await support
  - Type hints con Pydantic

### Database & ORM
- **Supabase** - Backend as a Service
  - PostgreSQL 15
  - Auth integrada
  - Storage
  - Real-time subscriptions
- **SQLAlchemy 2.0** - ORM async
- **Alembic** - Database migrations

### Caching & Queue
- **Redis 7** - Cache y sessions
- **Celery 5.3** - Task queue async

### AI & Machine Learning
- **LangChain 0.0.350** - AI orchestration
- **OpenAI GPT-4** - LLM principal
- **Chroma 0.4** - Vector database
- **Sentence Transformers** - Embeddings

---

## 🗄️ Databases

### PostgreSQL (via Supabase)
```yaml
Uso: Base de datos principal
Almacena:
  - Usuarios y autenticación
  - Direcciones de wallet
  - Transacciones
  - Portfolios
  - Tax reports
```

### Redis
```yaml
Uso: Cache y rate limiting
Almacena:
  - Cache de API calls
  - Sessions
  - Rate limit counters
  - Celery task queue
```

### ClickHouse (Futuro)
```yaml
Uso: Analytics y reporting
Almacena:
  - Eventos de usuario
  - Métricas de sistema
  - Análisis de portfolio
  - Historical data
```

### Neo4j (Futuro)
```yaml
Uso: Graph database para análisis forense
Almacena:
  - Relaciones entre addresses
  - Transaction flow graphs
  - Risk analysis networks
```

---

## 🔌 External APIs & Integrations

### Blockchain Explorers
- **Etherscan** - Ethereum transactions
- **Blockchain.com** - Bitcoin transactions
- **Polygonscan** - Polygon transactions

### Exchanges
- **Binance API** - Trading data
- **Coinbase API** - Exchange data
- **Kraken API** - Exchange data

### Price Feeds
- **CoinGecko API** - Crypto prices (free tier: 50 req/min)
- **CoinMarketCap API** - Alternative price source

### AI Services
- **OpenAI API** - GPT-4 for agents
- **Anthropic Claude** - Alternative LLM (futuro)

---

## 🚀 DevOps & Infrastructure

### Development
```yaml
Local:
  - Frontend: Vite dev server (port 3000)
  - Backend: Uvicorn (port 8000)
  - Database: Supabase cloud
```

### Version Control
- **Git** - Source control
- **GitHub** - Repository hosting

### CI/CD (Futuro)
- **GitHub Actions** - Automated testing & deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

### Deployment (Planned)
```yaml
Frontend:
  - Vercel o Netlify
  - CDN automático
  - Edge functions

Backend:
  - Railway o Fly.io
  - Auto-scaling
  - Health checks

Database:
  - Supabase (managed)
  - Automatic backups
```

---

## 📦 Package Management

### Frontend (npm)
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.0"
  }
}
```

### Backend (pip)
```txt
# Core
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0

# Database
sqlalchemy==2.0.23
asyncpg==0.29.0
supabase==2.3.0

# AI/ML
langchain==0.0.350
openai==1.3.7
chromadb==0.4.18

# Task Queue
celery==5.3.4
redis==5.0.1

# Ver requirements.txt completo
```

---

## 🔧 Development Tools

### Code Editors
- **VS Code** (recomendado)
  - TypeScript extension
  - Python extension
  - Prettier extension
  - ESLint extension

### Testing (Futuro)
```yaml
Frontend:
  - Vitest (unit tests)
  - Playwright (e2e tests)

Backend:
  - Pytest (unit tests)
  - Pytest-asyncio (async tests)
```

### Code Quality (Futuro)
```yaml
Frontend:
  - ESLint (linting)
  - Prettier (formatting)
  - TypeScript strict mode

Backend:
  - Black (formatting)
  - Flake8 (linting)
  - MyPy (type checking)
```

---

## 📊 Monitoring & Logging

### Logging
```yaml
Frontend:
  - Custom debug console
  - Browser console
  - Sentry (futuro)

Backend:
  - Python logging module
  - Structured logs (JSON)
  - Sentry (futuro)
```

### Monitoring (Futuro)
```yaml
Performance:
  - Prometheus (metrics)
  - Grafana (dashboards)
  
Errors:
  - Sentry (error tracking)
  - Alerting via email/Slack
  
Uptime:
  - UptimeRobot
  - Health check endpoints
```

---

## 🔒 Security Tools

### Authentication & Authorization
- **Supabase Auth** - JWT-based auth
- **bcrypt** - Password hashing
- **python-jose** - JWT handling

### API Security
- **SlowAPI** - Rate limiting
- **CORS** - Cross-origin resource sharing
- **Pydantic** - Input validation

### Secrets Management
- **.env files** - Local development
- **Environment variables** - Production
- **Supabase Vault** - Sensitive data (futuro)

---

## 📈 Performance Optimization

### Frontend
```yaml
Build:
  - Vite code splitting
  - Tree shaking
  - Minification

Runtime:
  - Lazy loading components
  - Debouncing inputs
  - Optimistic UI updates
```

### Backend
```yaml
Database:
  - Connection pooling
  - Query optimization
  - Indexes on frequent queries

API:
  - Response caching (Redis)
  - Pagination
  - Rate limiting

Background:
  - Celery for heavy tasks
  - Async/await patterns
```

---

## 🎯 Por Qué Este Stack?

### Frontend: React + TypeScript + Vite
✅ **Simple** - No over-engineering
✅ **Rápido** - Vite es extremadamente rápido
✅ **Type-safe** - TypeScript previene errores
✅ **Ecosystem** - Gran comunidad y recursos

### Backend: FastAPI
✅ **Moderno** - Async/await nativo
✅ **Rápido** - Performance comparable a Node.js
✅ **Documentado** - OpenAPI auto-generado
✅ **Python** - Ideal para AI/ML

### Database: Supabase
✅ **Managed** - No mantener infra
✅ **Completo** - DB + Auth + Storage
✅ **Real-time** - Subscriptions built-in
✅ **Free tier** - Generoso para MVPs

---

## 🔄 Migration Path

### Actual → Futuro

```yaml
De:
  - Fetch API → Axios/TanStack Query
  - CSS puro → Tailwind CSS
  - Local state → Zustand/Redux
  - Monolito → Microservicios

Cuándo:
  - Solo si es necesario
  - Cuando el equipo crezca
  - Cuando la complejidad lo justifique
```

### Principio: YAGNI
**You Aren't Gonna Need It**
- No agregar tecnología "por si acaso"
- Empezar simple, evolucionar según necesidad
- Medir antes de optimizar

---

## 📚 Learning Resources

### Frontend
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)

### Backend
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org)
- [Supabase Docs](https://supabase.com/docs)

### AI/ML
- [LangChain Docs](https://python.langchain.com)
- [OpenAI API Docs](https://platform.openai.com/docs)

---

**Última actualización**: 2025-10-22
**Versión**: MVP v0.1.0
