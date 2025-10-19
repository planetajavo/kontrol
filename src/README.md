<div align="center">

# 🚀 Kontrol

### Dashboard Financiero Cripto Profesional

**Plataforma completa de análisis fiscal, gestión multi-wallet y cumplimiento normativo para criptomonedas**

[![License: MIT](https://img.shields.io/badge/License-MIT-8B5CF6.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)

[Ver Demo](#) · [Documentación](./docs) · [Reportar Bug](../../issues) · [Solicitar Feature](../../issues)

![Kontrol Dashboard Preview](https://via.placeholder.com/1200x600/8B5CF6/FFFFFF?text=Kontrol+Dashboard+Preview)

</div>

---

## 📋 Tabla de Contenidos

- [🎯 Sobre el Proyecto](#-sobre-el-proyecto)
- [✨ Características Principales](#-características-principales)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🚀 Instalación y Uso](#-instalación-y-uso)
- [🏗️ Arquitectura](#️-arquitectura)
- [📚 Documentación](#-documentación)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

---

## 🎯 Sobre el Proyecto

**Kontrol** es un dashboard financiero cripto de última generación diseñado para usuarios que necesitan **control total** sobre sus activos digitales con enfoque profesional en:

🎯 **Fiscalidad española**: Cálculo automático según normativa AEAT  
💼 **Multi-wallet**: CEX, DEX, hot wallets, cold storage  
🤖 **Detección inteligente**: Identificación de patrones de bots y trading algorítmico  
🛡️ **Compliance**: Herramientas AML/KYT para cumplimiento normativo  
🎨 **UX Premium**: Glassmorphism + Purple theme + Paleta pastel profesional  

### ¿Por qué Kontrol?

- ✅ **Enfoque fiscal-legal real** adaptado a normativa española
- ✅ **Arquitectura profesional** con TypeScript, Context API y Service Layer
- ✅ **Diseño moderno** con accesibilidad WCAG AA
- ✅ **100% responsive** con navegación adaptativa (sidebar/bottom nav)
- ✅ **Open source** y extensible

---

## ✨ Características Principales

### 📊 **Dashboard Analítico**

#### Widgets Implementados:
- **Total Portfolio Value** 
  - P&L realizada y no realizada
  - Base imponible fiscal calculada
  - Ganancias/pérdidas compensables
  - Toggle de visibilidad para privacidad

- **Investment Performance**
  - Rendimiento histórico con gráfico de área
  - ROI total y anualizado
  - Comparativa temporal (24h, 7d, 30d, 1y, All)
  - Indicadores de rendimiento con iconos dinámicos

- **Bot Activity Detector**
  - Detección automática de spikes de transacciones
  - Gráfico de barras con marcadores visuales
  - Filtros por tipo de actividad (High Frequency, Arbitrage, Market Making)
  - Sistema de alertas con severidad

### 💰 **Tax Optimizer**

- **Cálculo por tramos fiscales españoles** (2024/2025):
  - Hasta 6.000€: 19%
  - 6.000€ - 50.000€: 21%
  - 50.000€ - 200.000€: 23%
  - Más de 200.000€: 28%

- **Modos de cálculo FIFO**:
  - FIFO Global (todas las transacciones juntas)
  - FIFO por Exchange (cálculo separado por plataforma)

- **Simulador fiscal interactivo**:
  - Escenarios hipotéticos de venta
  - Optimización de timing fiscal
  - Visualización de impacto por tramos

- **Resumen Fiscal completo**:
  - P&L realizada/no realizada
  - Base imponible calculada
  - Impuestos estimados por tramos
  - Pérdidas compensables disponibles

### 💼 **Assets & Wallets**

- **Gestión multi-wallet**:
  - Categorización: Hot, Cold, Exchange
  - Importación por dirección o clave pública
  - Etiquetado con iconos personalizados
  - Balance consolidado en tiempo real

- **DeFi Positions**:
  - Staking & Farming positions
  - Yield tracking con APY/APR
  - Lockup periods y rewards acumulados

- **Asset Distribution**:
  - Gráfico de distribución por blockchain
  - Balance por ubicación (Self-custody vs Exchange)
  - Top holdings con percentages

### 📜 **Transactions Manager**

- **Sistema de filtros profesional**:
  - Filtro por fecha/rango con modal calendario
  - Filtro por tipo (Buy, Sell, Transfer, Stake, etc.)
  - Filtro por estado (Confirmed, Pending, Failed)
  - Filtro por wallet/exchange
  - Búsqueda universal (TxID, comment, wallet, etc.)

- **Agrupación temporal**:
  - Meses colapsables con animaciones
  - Altura uniforme de 88px por row
  - Contador de transacciones por mes
  - Auto-scroll suave

- **Contador de filtros activos**:
  - Badge con número de filtros aplicados
  - Botón "Clear all filters" contextual
  - Persistencia de estado

### 🏦 **Banks Integration**

- Conexión con entidades bancarias españolas
- Movimientos fiat vinculados a operaciones crypto
- Reconciliación automática EUR ↔ Crypto
- Exportación para declaración de hacienda

### 🔍 **AML/KYT Compliance**

- Análisis de riesgo de transacciones
- Detección de wallets blacklisted
- Trazabilidad de fondos (chain analysis)
- Informes de compliance para auditorías

---

## 🛠️ Stack Tecnológico

### **Frontend Core**

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 18.3.1 | UI Framework |
| **TypeScript** | 5.5+ | Type Safety |
| **Vite** | 5.4+ | Build Tool |
| **Tailwind CSS** | 4.0 | Styling System |
| **Motion** | 10.18+ | Animaciones (Framer Motion) |

### **UI Components & Libraries**

| Librería | Uso |
|---------|-----|
| **shadcn/ui** | Sistema de componentes base |
| **Radix UI** | Primitivas accesibles |
| **Lucide React** | Iconografía |
| **Recharts** | Gráficos y visualizaciones |
| **React Hook Form** | Gestión de formularios |
| **Sonner** | Toast notifications |
| **date-fns** | Manipulación de fechas |

### **State Management & Architecture**

- **Context API**: Auth, Theme
- **Custom Hooks**: `useAnimatedCounter`, `useDebounce`, `useLocalStorage`, `useToast`
- **Service Layer**: Separación de lógica de negocio
- **TypeScript Types**: Tipado centralizado en `/types`

### **DevOps & Tooling**

- **GitHub Actions**: CI/CD pipelines
- **Vercel**: Deployment platform
- **ESLint**: Code linting
- **Prettier**: Code formatting

---

## 🚀 Instalación y Uso

### **Requisitos Previos**

- Node.js **18.18.0+** (ver `.nvmrc`)
- npm, pnpm o yarn

### **Instalación Rápida**

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/kontrol-crypto-dashboard.git
cd kontrol-crypto-dashboard

# 2. Instalar dependencias
npm install
# o con pnpm (recomendado)
pnpm install

# 3. Copiar variables de entorno (si aplica)
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en **http://localhost:5173**

### **Scripts Disponibles**

```bash
npm run dev          # Servidor de desarrollo (puerto 5173)
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

### **Uso con NVM**

```bash
# Usar versión correcta de Node
nvm use
# o instalarla si no la tienes
nvm install
```

---

## 🏗️ Arquitectura

Kontrol implementa una **arquitectura modular** con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Components  │  │   UI (ShadCN) │  │   Shared     │ │
│  │  (Sections)  │  │   Components  │  │  Components  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                 BUSINESS LOGIC LAYER                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Custom Hooks │  │  Context API  │  │  Utilities   │ │
│  │              │  │  (Auth/Theme) │  │  Formatters  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                    SERVICE LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ API Services │  │ Data Transform│ │  Mock Data   │ │
│  │              │  │               │  │  Generators  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                      DATA LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Backend    │  │  TypeScript   │  │  Validation  │ │
│  │   API/DB     │  │    Types      │  │   Schemas    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### **Estructura de Carpetas**

```
kontrol-dashboard/
├── 📁 components/              # Componentes React
│   ├── 📁 ui/                  # Componentes shadcn/ui
│   ├── 📁 shared/              # Componentes reutilizables
│   │   ├── ActionBar.tsx       # Sticky action bars
│   │   ├── Button.tsx          # Botones custom
│   │   ├── CollapsibleSection  # Secciones colapsables
│   │   ├── EmptyState.tsx      # Estados vacíos
│   │   ├── ErrorBoundary.tsx   # Error handling
│   │   └── ...
│   ├── DashboardSection.tsx    # Vista principal Dashboard
│   ├── TaxFiscalSection.tsx    # Tax Optimizer
│   ├── AssetsSection.tsx       # Wallets & Assets
│   ├── TransactionsSection.tsx # Transaction manager
│   ├── BanksSection.tsx        # Banks integration
│   └── AMLKYTSection.tsx       # Compliance tools
│
├── 📁 contexts/                # Context API
│   ├── AuthContext.tsx         # Autenticación
│   └── ThemeContext.tsx        # Gestión de tema
│
├── 📁 hooks/                   # Custom React Hooks
│   ├── useAnimatedCounter.ts   # Contadores animados
│   ├── useDebounce.ts          # Debouncing
│   ├── useLocalStorage.ts      # Persistencia local
│   └── useToast.ts             # Notificaciones toast
│
├── 📁 services/                # Lógica de negocio
│   └── wallet.service.ts       # Servicio de wallets
│
├── 📁 types/                   # TypeScript types
│   └── index.ts                # Tipos centralizados
│
├── 📁 utils/                   # Utilidades
│   ├── clipboard.ts            # Copy to clipboard
│   ├── constants.ts            # Constantes globales
│   ├── formatters.ts           # Formateo de datos
│   ├── mockTransactions.ts     # Mock data
│   └── validators.ts           # Validadores
│
├── 📁 styles/                  # Estilos globales
│   └── globals.css             # Tailwind v4 + tokens CSS
│
├── 📁 docs/                    # Documentación completa
│   ├── ARCHITECTURE.md         # Arquitectura detallada
│   ├── QUICK_START.md          # Guía de inicio rápido
│   ├── STYLING_GUIDE.md        # Sistema de diseño
│   └── ...                     # 30+ archivos de docs
│
├── App.tsx                     # Componente principal
├── main.tsx                    # Entry point
├── index.html                  # HTML base
├── package.json                # Dependencies
├── vite.config.ts              # Configuración Vite
├── tsconfig.json               # Configuración TypeScript
└── tailwind.config.js          # Configuración Tailwind
```

Ver **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** para arquitectura detallada.

---

## 📚 Documentación

La documentación completa está en la carpeta `/docs`:

### **Guías de Inicio**
- [📖 Quick Start](./docs/QUICK_START.md) - Instalación y primeros pasos
- [🏗️ Architecture](./docs/ARCHITECTURE.md) - Arquitectura del proyecto
- [🎨 Styling Guide](./docs/STYLING_GUIDE.md) - Sistema de diseño

### **Componentes**
- [🧩 Shared Components](./docs/SHARED_COMPONENTS_USAGE.md) - Componentes reutilizables
- [🎨 Color System](./docs/COLOR_SYSTEM.md) - Paleta de colores
- [💡 Tooltips Guide](./docs/TOOLTIPS_GUIDE.md) - Sistema de tooltips

### **Secciones**
- [📊 Dashboard](./docs/PORTFOLIO_DISTRIBUTION_V2.md) - Widgets del dashboard
- [💰 Tax Optimizer](./docs/TAX_BRACKET_OPTIMIZER.md) - Sistema fiscal
- [💼 Assets](./docs/ASSETS_WALLETS_COLLAPSIBLE.md) - Gestión de wallets
- [📜 Transactions](./docs/TRANSACTIONS_UI_UNIFIED.md) - Sistema de transacciones
- [🏦 Banks](./docs/BANKS_SECTION.md) - Integración bancaria
- [🔍 AML/KYT](./docs/AML_KYT_SECTION.md) - Compliance

### **Desarrollo**
- [🚀 GitHub Setup](./docs/GITHUB_SETUP.md) - Configuración de GitHub
- [📝 Migration Guide](./docs/MIGRATION_GUIDE.md) - Guías de migración
- [🎯 UX Improvements](./docs/UX_IMPROVEMENTS.md) - Mejoras de UX

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

### **Workflow de Contribución**

1. **Fork** el proyecto
2. Crea tu **feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit** tus cambios: `git commit -m 'feat(dashboard): add amazing feature'`
4. **Push** al branch: `git push origin feature/AmazingFeature`
5. Abre un **Pull Request**

### **Convenciones de Commits**

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(scope): add new feature           # Nueva funcionalidad
fix(scope): fix bug                    # Corrección de bug
docs(scope): update documentation      # Cambios en docs
style(scope): format code              # Cambios de formato
refactor(scope): refactor code         # Refactorización
test(scope): add tests                 # Añadir tests
chore(scope): update dependencies      # Tareas de mantenimiento
```

**Ejemplos:**
```bash
feat(dashboard): add bot activity detector widget
fix(transactions): resolve infinite scroll bug
docs(readme): improve installation instructions
style(ui): adjust card spacing for better alignment
refactor(tax): extract fiscal calculation to service layer
```

### **Code Style**

- **TypeScript strict mode** activado
- **ESLint + Prettier** para formateo consistente
- **Componentes funcionales** con hooks
- **Props interface** para todos los componentes
- **Documentación JSDoc** en funciones complejas

Ver **[CONTRIBUTING.md](./CONTRIBUTING.md)** para guías completas.

---

## 🗺️ Roadmap

### **✅ Completado (Q4 2024)**

- [x] Dashboard con 5 widgets fiscales profesionales
- [x] Tax Optimizer con cálculo por tramos españoles
- [x] Sistema de transacciones con filtros avanzados
- [x] Detección de actividad de bots
- [x] Paleta de colores pastel profesional WCAG AA
- [x] Arquitectura completa con Context API
- [x] Sistema de componentes compartidos
- [x] Documentación completa (30+ archivos .md)

### **🔄 En Progreso (Q1 2025)**

- [ ] Integración con Supabase backend
- [ ] Autenticación JWT con refresh tokens
- [ ] API REST completa con endpoints documentados
- [ ] Importación automática de wallets (Etherscan, BSCScan, etc.)
- [ ] Exportación de informes fiscales (PDF/Excel)

### **🎯 Planificado (Q2 2025)**

- [ ] Integración con exchanges principales:
  - [ ] Binance API
  - [ ] Coinbase Pro API
  - [ ] Kraken API
  - [ ] KuCoin API
- [ ] AML/KYT avanzado con Chainalysis
- [ ] Mobile app (React Native)
- [ ] AI Fiscal Assistant con GPT-4

### **🚀 Futuro (Q3-Q4 2025)**

- [ ] Multi-usuario con roles y permisos
- [ ] Portfolio sharing (modo público)
- [ ] DeFi yield aggregator
- [ ] NFT portfolio tracker
- [ ] Tax loss harvesting automático
- [ ] Alertas por email/Telegram

Ver [GitHub Projects](../../projects) para roadmap detallado.

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver [LICENSE](LICENSE) para más información.

```
MIT License - Copyright (c) 2025 Kontrol Contributors
```

---

## 👥 Autores y Agradecimientos

### **Desarrollado por:**

- **[Tu Nombre]** - *Desarrollo Full Stack* - [GitHub](https://github.com/tu-usuario)

### **Built with:**

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Recharts](https://recharts.org/) - Charts Library
- [Motion](https://motion.dev/) - Animations
- [Lucide](https://lucide.dev/) - Icons
- [Vite](https://vitejs.dev/) - Build Tool

### **Agradecimientos especiales:**

- Comunidad de shadcn/ui por los componentes accesibles
- Vercel por el hosting y deployment
- GitHub por las GitHub Actions y CI/CD

---

## 📬 Contacto

¿Preguntas? ¿Sugerencias? ¡Contáctanos!

- 📧 Email: [contacto@kontrol.app](mailto:contacto@kontrol.app)
- 🐦 Twitter: [@KontrolApp](https://twitter.com/KontrolApp)
- 💬 Discord: [Únete a nuestro servidor](https://discord.gg/kontrol)
- 📝 Blog: [blog.kontrol.app](https://blog.kontrol.app)

---

## ⭐ Star History

Si te gusta Kontrol, ¡dale una estrella! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=TU-USUARIO/kontrol-crypto-dashboard&type=Date)](https://star-history.com/#TU-USUARIO/kontrol-crypto-dashboard&Date)

---

<div align="center">

### **[⬆ Volver arriba](#-kontrol)**

**Hecho con 💜 usando React + TypeScript + Tailwind CSS**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU-USUARIO/kontrol-crypto-dashboard)

</div>
