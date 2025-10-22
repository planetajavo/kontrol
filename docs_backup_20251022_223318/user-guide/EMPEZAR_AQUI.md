# 👋 EMPIEZA AQUÍ - Guía Rápida Kontrol

¡Bienvenido a **Kontrol**! Este archivo te guiará en tus primeros pasos.

---

## 🎯 ¿Qué es este proyecto?

**Kontrol** es un dashboard financiero cripto profesional con:

- 📊 Dashboard con métricas fiscales en tiempo real
- 🧮 Optimizador de impuestos según normativa española
- 💼 Gestión multi-wallet y multi-exchange
- 📈 Análisis de transacciones con filtros avanzados
- 🤖 Detección de actividad de bots
- 🛡️ Módulo AML/KYT para cumplimiento normativo

**Stack:** React 18 + TypeScript + Tailwind CSS v4 + Vite

---

## ⚡ Inicio Rápido (3 minutos)

### 1️⃣ Instalar dependencias

```bash
npm install
```

**💡 Si hay errores:**
```bash
npm install --legacy-peer-deps
```

### 2️⃣ Ejecutar en desarrollo

```bash
npm run dev
```

### 3️⃣ Abrir en el navegador

```
http://localhost:5173
```

**Credenciales demo:**
- Email: `demo@kontrol.app`
- Password: `demo123`

---

## 📁 ¿Qué archivos se añadieron?

Tu descarga de Figma Make ya incluía todo el código, pero **faltaban archivos de configuración**. Se han creado:

✅ **Archivos esenciales:**
- `index.html` - HTML principal
- `main.tsx` - Entry point de React
- `vite.config.ts` - Configuración del bundler
- `tsconfig.json` - Configuración de TypeScript
- `tsconfig.node.json` - Config TS para Vite

✅ **Git y deployment:**
- `.gitignore` - Protege archivos sensibles
- `.env.example` - Template de variables de entorno

✅ **Documentación:**
- `QUICK_START.md` - Guía de instalación en 4 pasos
- `GITHUB_SETUP.md` - Cómo subir a GitHub
- `ARCHIVOS_CONFIGURACION.md` - Lista de archivos creados

📋 **Detalles completos:** Lee [ARCHIVOS_CONFIGURACION.md](ARCHIVOS_CONFIGURACION.md)

---

## 🚀 ¿Qué puedo hacer ahora?

### Opción 1: Desarrollo Local ⚡

```bash
# Ya instalaste y ejecutaste, ahora puedes:
npm run dev          # Desarrollo
npm run build        # Build producción
npm run preview      # Preview del build
npm run lint         # Linter
npm run typecheck    # Verificar tipos
```

### Opción 2: Subir a GitHub 📦

**Pasos rápidos:**

```bash
# 1. Crear repo en GitHub.com
#    → github.com/new
#    → Nombre: kontrol
#    → NO inicialices con README

# 2. Push desde tu carpeta local
git init
git add .
git commit -m "feat: initial commit - Kontrol dashboard"
git remote add origin https://github.com/TU-USUARIO/kontrol.git
git branch -M main
git push -u origin main
```

📖 **Guía completa:** Lee [GITHUB_SETUP.md](GITHUB_SETUP.md)

### Opción 3: Deploy a Producción 🌐

**Vercel (Recomendado):**

1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repo de GitHub
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy! 🚀

Tu app estará en: `https://kontrol.vercel.app`

---

## 📚 Documentación Disponible

| Archivo | Propósito |
|---------|-----------|
| **[README.md](README.md)** | Documentación completa del proyecto |
| **[QUICK_START.md](QUICK_START.md)** | Instalación en 4 pasos + troubleshooting |
| **[GITHUB_SETUP.md](GITHUB_SETUP.md)** | Guía completa para GitHub |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | Arquitectura del proyecto |
| **[SHARED_COMPONENTS_USAGE.md](SHARED_COMPONENTS_USAGE.md)** | Cómo usar componentes compartidos |
| **[COLOR_SYSTEM.md](COLOR_SYSTEM.md)** | Sistema de colores pastel |
| **[STYLING_GUIDE.md](STYLING_GUIDE.md)** | Guía de estilos |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Cómo contribuir |

---

## 🗺️ Estructura del Proyecto

```
kontrol/
├── App.tsx                    # Componente principal
├── components/                # Todos los componentes React
│   ├── ui/                   # shadcn/ui components
│   ├── shared/               # Componentes reutilizables
│   ├── DashboardSection.tsx  # Dashboard
│   ├── TaxFiscalSection.tsx  # Tax Optimizer
│   ├── AssetsSection.tsx     # My Assets
│   ├── TransactionsSection.tsx # Transactions
│   ├── BanksSection.tsx      # Banks
│   └── AMLKYTSection.tsx     # AML/KYT
├── contexts/                  # AuthContext, ThemeContext
├── hooks/                     # Custom hooks
├── services/                  # Lógica de negocio
├── types/                     # TypeScript types
├── utils/                     # Utilidades
└── styles/                    # Tailwind CSS
```

---

## 🎨 Características Destacadas

### 1. **Dashboard Inteligente**
- Total portfolio value con P&L
- Gráfico de evolución histórica
- Resumen fiscal con impuestos estimados
- Detector de actividad de bots con spikes visuales

### 2. **Tax Optimizer**
- Simulador fiscal interactivo
- Cálculo por tramos fiscales españoles
- Switch FIFO Global / FIFO por Exchange
- Pérdidas compensables

### 3. **Assets Management**
- Gestión de wallets (Hot, Cold, Exchange)
- Importación de direcciones
- Distribución por blockchain
- Balance por ubicación

### 4. **Transactions Hub**
- Filtros avanzados (fecha, tipo, estado, wallet)
- Búsqueda global (TxID, comment, wallet...)
- Agrupación por mes con animaciones
- Altura uniforme de 88px por row

### 5. **Design System**
- Dark mode permanente
- Glassmorphism con purple theme
- Paleta pastel profesional (mint, amber, coral, sky)
- Tipografía Inter con sistema responsive

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev              # Dev server en :5173
npm run dev:docs         # Docs server en :5174

# Build
npm run build            # Build app principal
npm run build:docs       # Build documentación

# Preview
npm run preview          # Preview app
npm run preview:docs     # Preview docs

# Calidad de código
npm run lint             # ESLint
npm run typecheck        # TypeScript check
npm run format           # Prettier format
npm run format:check     # Prettier verify
```

---

## 🐛 Problemas Comunes

### Error: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Error: "Port 5173 already in use"

```bash
# Opción 1: Cambiar puerto
npm run dev -- --port 3000

# Opción 2: Matar proceso
lsof -ti:5173 | xargs kill -9
```

### Tailwind no funciona

Verifica que `@tailwindcss/vite` esté instalado:

```bash
npm install --save-dev @tailwindcss/vite tailwindcss
```

### Errores de TypeScript

```bash
npm run typecheck
# Revisa los errores y corrígelos
```

---

## 📞 Recursos y Ayuda

- 🐛 **Reportar bugs:** [GitHub Issues](https://github.com/tu-usuario/kontrol/issues)
- 💬 **Discusiones:** [GitHub Discussions](https://github.com/tu-usuario/kontrol/discussions)
- 📖 **Documentación completa:** [README.md](README.md)
- 🚀 **Guía de contribución:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## ✅ Checklist de Verificación

Después de instalar, verifica:

- [ ] `npm run dev` se ejecuta sin errores
- [ ] Puedes acceder a `http://localhost:5173`
- [ ] La landing page carga correctamente
- [ ] Puedes hacer login con credenciales demo
- [ ] El dashboard muestra widgets y gráficos
- [ ] No hay errores en la consola del navegador
- [ ] Los filtros de transacciones funcionan
- [ ] El sidebar es colapsable

---

## 🎯 Próximos Pasos Recomendados

1. **Ejecuta el proyecto** → `npm run dev`
2. **Explora las secciones** → Dashboard, Tax, Assets, Transactions, Banks, AML
3. **Lee la arquitectura** → [ARCHITECTURE.md](ARCHITECTURE.md)
4. **Personaliza el diseño** → Modifica `styles/globals.css`
5. **Añade tu lógica** → Conecta APIs reales en `/services`
6. **Sube a GitHub** → Sigue [GITHUB_SETUP.md](GITHUB_SETUP.md)
7. **Deploya a Vercel** → Deploy en 2 clicks

---

## 🎉 ¡Ya Estás Listo!

**Kontrol** está completamente funcional con:

✅ 50+ componentes React TypeScript
✅ Sistema de diseño glassmorphism purple
✅ Context API para Auth y Theme
✅ Hooks personalizados y utilidades
✅ Documentación completa
✅ Listo para GitHub y Vercel

**¿Dudas?** Lee [QUICK_START.md](QUICK_START.md) o [README.md](README.md)

---

<div align="center">

**¡Happy Coding! 💜**

[🚀 Quick Start](QUICK_START.md) | [📦 GitHub Setup](GITHUB_SETUP.md) | [📚 Documentación](README.md)

</div>
