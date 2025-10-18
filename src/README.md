# 🚀 Kontrol - Crypto Financial Dashboard

<div align="center">

![Kontrol Logo](https://via.placeholder.com/200x80/8B5CF6/FFFFFF?text=KONTROL)

**Dashboard financiero cripto profesional con análisis fiscal avanzado, seguimiento multi-wallet y cumplimiento normativo (AML/KYT)**

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8.svg)](https://tailwindcss.com/)

[Demo](https://kontrol.app) · [Documentación](https://docs.kontrol.crypto) · [Reportar Bug](https://github.com/tu-usuario/kontrol/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre Kontrol](#-sobre-kontrol)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Arquitectura](#-arquitectura)
- [Contribuir](#-contribuir)
- [Roadmap](#-roadmap)
- [Licencia](#-licencia)

---

## 🎯 Sobre Kontrol

Kontrol es un **dashboard financiero cripto** moderno y profesional diseñado para usuarios que necesitan control total sobre sus activos digitales. Combina:

- 📊 **Análisis fiscal avanzado** - Cálculo automático de P&L, base imponible e impuestos estimados
- 💼 **Gestión multi-wallet** - Soporte para exchanges (CEX/DEX) y wallets personales
- 🤖 **Detección de bots** - Identifica spikes de actividad de trading automatizado
- 🛡️ **Cumplimiento normativo** - AML & KYT para seguimiento de riesgos
- 🎨 **Diseño moderno** - Glassmorphism con paleta pastel profesional

---

## ✨ Características

### Dashboard Unificado
- Vista consolidada de portfolio con métricas en tiempo real
- P&L realizada y no realizada
- Detección automática de actividad de bots (spikes de transacciones)
- Gráficos interactivos con Recharts

### Tax & Fiscal
- **Cálculo automático de impuestos** según normativa española
- **Simulador fiscal** interactivo con escenarios hipotéticos
- **Pérdidas compensables** y optimización fiscal
- **Generación de informes** para hacienda

### My Assets
- Gestión multi-wallet (Hot, Cold, Exchange)
- Visualización de distribución por blockchain
- Balance por ubicación (Self-custody vs Exchange)
- Importación automática de wallets

### My Transactions
- Lista completa con scroll infinito
- Filtros avanzados por tipo, crypto, fecha
- Agrupación por mes
- Exportación a CSV/PDF

### Banks Integration
- Conexión con entidades bancarias
- Movimientos fiat vinculados a crypto
- Reconciliación automática

### AML & KYT
- Análisis de riesgo de transacciones
- Alertas de actividad sospechosa
- Informes de cumplimiento normativo

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling system
- **Motion** (Framer Motion) - Animaciones
- **Recharts** - Gráficos y visualizaciones
- **shadcn/ui** - Componentes UI
- **Lucide Icons** - Iconografía

### Backend (Planeado)
- **Node.js / Python FastAPI** - API REST
- **Supabase / PostgreSQL** - Base de datos
- **OpenAPI / Swagger** - Documentación API
- **Zod** - Validación de schemas

### DevOps & Tools
- **GitHub Actions** - CI/CD
- **Vercel** - Deployment
- **Sentry** - Error tracking
- **Posthog** - Analytics

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ o bun
- pnpm (recomendado) o npm

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/kontrol.git
cd kontrol
```

2. **Instalar dependencias**

```bash
pnpm install
# o
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
VITE_API_BASE_URL=http://localhost:3000
```

4. **Iniciar servidor de desarrollo**

```bash
pnpm dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📖 Uso

### Desarrollo

```bash
# Servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview de build
pnpm preview

# Linting
pnpm lint

# Type checking
pnpm typecheck
```

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

---

## 🏗️ Arquitectura

Kontrol sigue una arquitectura modular con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────┐
│           PRESENTATION LAYER                │
│  - React Components                         │
│  - UI Components (shadcn/ui)                │
│  - Shared Components                        │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│          BUSINESS LOGIC LAYER               │
│  - Custom Hooks                             │
│  - Context API (Auth, Theme)                │
│  - Utilities & Formatters                   │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│            SERVICE LAYER                    │
│  - API Services                             │
│  - Data Transformation                      │
│  - Mock Data Generators                     │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│             DATA LAYER                      │
│  - Supabase / Backend API                   │
│  - TypeScript Types                         │
│  - Validation Schemas                       │
└─────────────────────────────────────────────┘
```

### Estructura de Carpetas

```
kontrol/
├── components/           # Componentes React
│   ├── ui/              # shadcn/ui components
│   ├── shared/          # Componentes reutilizables
│   └── *.tsx            # Componentes de sección
├── contexts/            # Context API providers
├── hooks/               # Custom React hooks
├── services/            # Lógica de negocio
├── types/               # TypeScript types
├── utils/               # Utilidades
└── styles/              # Estilos globales
```

Ver [documentación completa de arquitectura](ARCHITECTURE.md)

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee nuestra [guía de contribución](CONTRIBUTING.md) antes de enviar un PR.

### Workflow de Desarrollo

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add some amazing feature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(dashboard): add bot activity detection
fix(transactions): resolve infinite scroll bug
docs(readme): update installation instructions
style(ui): adjust spacing in cards
refactor(api): extract validation logic
test(wallet): add unit tests
chore(deps): update dependencies
```

---

## 🗺️ Roadmap

### Q4 2024
- [x] Dashboard con P&L y métricas fiscales
- [x] Sistema de transacciones reutilizable
- [x] Detección de actividad de bots
- [x] Paleta de colores pastel profesional
- [ ] Integración con Supabase

### Q1 2025
- [ ] Backend API completo
- [ ] Autenticación JWT
- [ ] Sincronización en tiempo real
- [ ] Importación de wallets automática
- [ ] Exportación de informes fiscales

### Q2 2025
- [ ] Integración con exchanges (Binance, Coinbase, Kraken)
- [ ] AML/KYT avanzado
- [ ] Mobile app (React Native)
- [ ] AI fiscal assistant

Ver [roadmap completo](https://github.com/tu-usuario/kontrol/projects)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más información.

---

## 👥 Equipo

Desarrollado con ❤️ por el equipo de Kontrol

- **Tu Nombre** - [GitHub](https://github.com/tu-usuario) - [LinkedIn](https://linkedin.com/in/tu-perfil)

---

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com/) - Sistema de componentes
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Recharts](https://recharts.org/) - Librería de gráficos
- [Lucide Icons](https://lucide.dev/) - Iconos

---

<div align="center">

**[⬆ Volver arriba](#-kontrol---crypto-financial-dashboard)**

Hecho con 💜 usando React & Tailwind CSS

</div>
