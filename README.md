# 🎯 KONTROL - Plataforma de Gestión Crypto-Fiscal

> **Plataforma integral para la gestión fiscal y compliance de activos digitales**

[![Status](https://img.shields.io/badge/status-MVP-yellow)](https://github.com)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com)

## 🚀 Descripción

**KONTROL** transforma el caos fiscal crypto en control absoluto mediante automatización inteligente y AI.

### Propuesta de Valor
- 🎯 **Importa** tus direcciones en 1 click
- 🔄 **Sincroniza** transacciones automáticamente
- 📊 **Genera** reportes fiscales completos
- 🤖 **Optimiza** con AI agents

---

## 📁 Estructura del Proyecto

```
KONTROL/
├── 📱 frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/      # AddressImporter, DebugConsole
│   │   ├── App.tsx          # App principal
│   │   └── main.tsx         # Entry point
│   └── README.md            # Frontend docs
│
├── 🔧 backend/              # FastAPI + Supabase
│   ├── api/                 # REST/GraphQL endpoints
│   ├── core/                # Servicios principales
│   │   ├── matching_engine/ # Reconciliación de TXs
│   │   ├── tax_engine/      # Cálculos fiscales
│   │   └── compliance_engine/ # Reportes DAC8
│   ├── agents/              # AI agents (LangChain)
│   ├── integrations/        # Exchanges, blockchains
│   ├── models/              # Modelos SQLAlchemy
│   ├── main.py              # App principal
│   └── requirements.txt     # Dependencias Python
│
├── 📚 docs/                 # Documentación organizada
│   ├── guides/              # Getting started, AI workflow
│   ├── architecture/        # Diagramas, tech stack
│   ├── backend/             # Plan de implementación
│   └── product/             # Visión, roadmap
│
└── 🐳 docker-compose.yml    # Orquestación de servicios
```

---

## 🛠️ Stack Tecnológico

### Frontend (Minimalista)
- **React 18** + TypeScript
- **Vite** - Build tool ultra-rápido
- **CSS puro** - Sin frameworks pesados

### Backend
- **FastAPI** - Framework Python moderno
- **Supabase** - PostgreSQL + Auth + Storage
- **Redis** - Cache y rate limiting
- **Celery** - Task queue asíncrono
- **LangChain** + **OpenAI GPT-4** - AI agents

### Databases
- **PostgreSQL** (Supabase) - Principal
- **Redis** - Cache
- **ClickHouse** - Analytics (futuro)
- **Neo4j** - Graph analysis (futuro)

---

## 🚀 Inicio Rápido

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### 2. Backend (Próximamente)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python main.py
# → http://localhost:8000
```

### 3. Con Docker (Futuro)
```bash
docker-compose up -d
```

---

## 📚 Documentación

### 🎓 Para Empezar
- **[Getting Started](./docs/guides/getting-started.md)** - Setup inicial
- **[AI Workflow Guide](./docs/guides/ai-workflow.md)** - Trabajar con IAs
- **[Troubleshooting](./docs/guides/troubleshooting.md)** - Solución de problemas

### 🏗️ Arquitectura
- **[Overview](./docs/architecture/overview.md)** - Visión general del sistema
- **[Tech Stack](./docs/architecture/tech-stack.md)** - Tecnologías detalladas

### ⚙️ Backend
- **[Implementation Plan](./docs/backend/implementation-plan.md)** - Roadmap por fases
- **[Naming Conventions](./docs/backend/naming-conventions.md)** - Estándares de código

### 🎯 Producto
- **[Product Vision](./docs/product/vision.md)** - Visión y propuesta de valor

---

## ✅ Estado Actual (2025-10-22)

### Completado
- ✅ Frontend minimalista funcionando
- ✅ Importador de direcciones con validación
- ✅ Consola de debug integrada
- ✅ Estructura del backend lista
- ✅ Documentación reorganizada

### En Desarrollo
- 🚧 Endpoints del backend API
- 🚧 Conexión frontend-backend
- 🚧 Persistencia en Supabase

### Próximos Pasos
1. Implementar endpoint `/api/addresses/import`
2. Conectar frontend con backend
3. Configurar Supabase
4. Implementar matching engine básico

---

## 🎯 Funcionalidades del MVP

### Core Features
- **Address Importer** - Importar múltiples wallets
- **Transaction Matching** - Detectar transferencias internas
- **Tax Calculator** - FIFO, LIFO, HIFO
- **Report Generator** - PDF/Excel export

### Integraciones (Futuro)
- **Exchanges**: Binance, Coinbase, Kraken
- **Blockchains**: Etherscan, Blockchain.com
- **Price Feeds**: CoinGecko, CoinMarketCap

### AI Features (Futuro)
- **Transaction Agent** - Chat sobre tu portfolio
- **Tax Optimizer** - Sugerencias de optimización
- **Risk Analyzer** - Análisis de compliance

---

## 💡 Filosofía de Desarrollo

### Para Solopreneurs
- 🎯 **Simplicidad primero** - No over-engineering
- 📝 **Documentación viviente** - Siempre actualizada
- 🔄 **Progreso incremental** - Una feature a la vez
- 🐛 **Debugging visible** - Logs claros siempre
- 📖 **TDD con naming conventions** - Código autodocumentado

### Principios
1. **Una feature a la vez** - No avanzar sin probar
2. **Commits frecuentes** - Guardar progreso constantemente
3. **Testing manual primero** - Automatizar después
4. **Rollback sin miedo** - Git es tu amigo

---

## 🆘 ¿Necesitas Ayuda?

1. **Primero**: Lee [Getting Started](./docs/guides/getting-started.md)
2. **Segundo**: Consulta [AI Workflow](./docs/guides/ai-workflow.md)
3. **Tercero**: Revisa [Troubleshooting](./docs/guides/troubleshooting.md)
4. **Checkpoint actual**: [CHECKPOINT_2025_10_22.md](./CHECKPOINT_2025_10_22.md)

---

## 📊 Métricas de Progreso

```
MVP Progress:  ████░░░░░░ 40%

Frontend:      ████████░░ 80% ✅
Backend:       ██░░░░░░░░ 20% 🚧
Integrations:  ░░░░░░░░░░  0% ⏸️
AI Agents:     ░░░░░░░░░░  0% ⏸️
Testing:       ░░░░░░░░░░  0% ⏸️
```

---

## 🗺️ Roadmap

### Q4 2025 - MVP
- [x] Frontend minimalista
- [ ] Backend básico + API
- [ ] Matching Engine
- [ ] Tax calculations FIFO
- [ ] Export PDF/Excel

### Q1 2026 - v1.0
- [ ] Multi-exchange support
- [ ] AI Transaction Agent
- [ ] DAC8 compliance
- [ ] Mobile responsive

### Q2 2026 - v2.0
- [ ] DeFi integrations
- [ ] Tax optimization AI
- [ ] Multi-user (empresas)
- [ ] White-label

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Última actualización**: 2025-10-22  
**Versión**: MVP v0.1.0  
**Status**: 🟡 En desarrollo activo

**Desarrollado con ❤️ para solopreneurs y la comunidad crypto**