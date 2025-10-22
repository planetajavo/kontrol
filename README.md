# 🎯 KONTROL - Plataforma de Gestión Crypto-Fiscal

> **Plataforma integral para la gestión fiscal y compliance de activos digitales**

## 🚀 Descripción

KONTROL es una plataforma completa que combina gestión de portafolio crypto, análisis fiscal automatizado y compliance regulatorio para usuarios y empresas que operan con activos digitales.

## 📁 Estructura del Proyecto

```
KONTROL/
├── 📱 frontend/          # Aplicación React/Vite
├── 🔧 backend/          # Backend Python/FastAPI + Supabase
├── 📚 docs/             # Documentación centralizada
├── 🧪 scripts/          # Scripts de automatización
├── ⚙️ config/           # Configuraciones
└── 🧪 tests/            # Tests
```

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **Radix UI** para componentes
- **Recharts** para visualizaciones

### Backend
- **Python FastAPI** para API
- **Supabase** (PostgreSQL + Auth + Storage)
- **Redis** para cache
- **Celery** para tareas asíncronas
- **LangChain** para agentes de IA

## 🚀 Inicio Rápido

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
cp env.example .env
# Configurar variables de Supabase en .env
python main.py
```

### Desarrollo Completo
```bash
# Usar Docker Compose
docker-compose up -d
```

## 📚 Documentación

- [Arquitectura del Sistema](./docs/architecture/)
- [Guías de Desarrollo](./docs/development/)
- [Guías de Despliegue](./docs/deployment/)
- [API Documentation](./docs/api/)

## 🎯 Funcionalidades Principales

- **Transaction Matching Engine** - Reconciliación automática de transacciones
- **Tax Engine** - Cálculos fiscales FIFO/LIFO/HIFO
- **AI Agents** - Asistentes inteligentes para análisis
- **Compliance** - Generación de reportes DAC8 y Proof of Origin
- **Integraciones** - Binance, Coinbase, Kraken

## 🤝 Contribución

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para detalles sobre cómo contribuir al proyecto.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

---

**Desarrollado con ❤️ para la comunidad crypto**