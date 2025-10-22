# 📘 Kontrol - Especificación Completa del Producto

> **Versión:** 1.0.0  
> **Última actualización:** Octubre 2024  
> **Estado:** Production Ready (Frontend)

---

## 📑 Tabla de Contenidos

1. [Visión General](#1-visión-general)
2. [Arquitectura de Navegación](#2-arquitectura-de-navegación)
3. [Dashboard - Vista Principal](#3-dashboard---vista-principal)
4. [Tax Optimizer - Sección Fiscal](#4-tax-optimizer---sección-fiscal)
5. [Assets - Gestión de Activos](#5-assets---gestión-de-activos)
6. [Transactions - Historial Completo](#6-transactions---historial-completo)
7. [Banks - Integración Bancaria](#7-banks---integración-bancaria)
8. [Compliance - AML/KYT](#8-compliance---amlkyt)
9. [Sistema de Diseño](#9-sistema-de-diseño)
10. [Componentes Compartidos](#10-componentes-compartidos)
11. [Flujos de Usuario](#11-flujos-de-usuario)

---

## 1. Visión General

### 1.1. Propósito del Producto

**Kontrol** es una plataforma integral de gestión financiera para activos cripto con enfoque profesional en **fiscalidad española**, **cumplimiento normativo** y **análisis avanzado**.

### 1.2. Usuarios Objetivo

- 🎯 **Inversores cripto** con necesidades fiscales españolas
- 💼 **Traders activos** que necesitan tracking de P&L
- 🏢 **Asesores fiscales** que gestionan portfolios de clientes
- 🏛️ **Empresas** con tesorería en crypto

### 1.3. Propuesta de Valor

| Feature | Beneficio | Diferenciador |
|---------|-----------|---------------|
| **Cálculo fiscal automático** | Ahorro de tiempo en declaraciones | Tramos españoles 2024/2025 |
| **FIFO Dual** | Optimización fiscal legal | Global vs Por Exchange |
| **Bot Detection** | Identificar trading algorítmico | Análisis de patterns |
| **Multi-wallet** | Vista consolidada | CEX + DEX + Self-custody |
| **AML/KYT** | Compliance normativo | Trazabilidad completa |

### 1.4. Stack Tecnológico

```
Frontend:  React 18 + TypeScript 5.5 + Tailwind CSS 4.0
Build:     Vite 5.4
State:     Context API (Auth, Theme)
UI:        shadcn/ui + Radix UI
Charts:    Recharts
Animation: Motion (Framer Motion)
Icons:     Lucide React
Forms:     React Hook Form
Toast:     Sonner
```

---

## 2. Arquitectura de Navegación

### 2.1. Estructura de Navegación

```
Kontrol App
│
├── 🏠 Landing Page (no autenticado)
│   ├── Hero Section
│   ├── Features Overview
│   ├── CTA: Login / Register
│   └── Documentation Link
│
├── 🔐 Authentication
│   ├── Login Page
│   └── Register Page
│
└── 📊 Main App (autenticado)
    ├── Top Navigation Bar (desktop/mobile)
    ├── Sidebar (desktop, colapsable)
    ├── Bottom Navigation (mobile)
    │
    └── 6 Secciones Principales:
        ├── 📊 Dashboard
        ├── 💰 Tax Optimizer
        ├── 💼 Assets
        ├── 📜 Transactions
        ├── 🏦 Banks
        └── 🔍 Compliance (AML/KYT)
```

### 2.2. Top Navigation Bar

**Ubicación:** Fija en la parte superior (64px height)  
**Responsive:** Visible en desktop y mobile  
**Componentes:**

```tsx
TopNavBar
├── Logo (izquierda)
│   └── Click: mantiene en la sección actual
│
├── Search Bar (centro, solo desktop)
│   └── Búsqueda global: wallets, transactions, tags
│
└── User Menu (derecha)
    ├── Avatar + Nombre
    ├── Settings
    ├── Documentation
    ├── Theme Toggle (si se implementa light mode)
    └── Logout
```

**Interacciones:**
- ✅ Glassmorphism effect con backdrop blur
- ✅ Sticky position con shadow on scroll
- ✅ Logout con confirmación modal

### 2.3. Sidebar (Desktop)

**Ubicación:** Izquierda fija  
**Ancho:** 256px (expandida) | 80px (colapsada)  
**Auto-collapse:** < 1280px viewport width  

**Items del Sidebar:**

| Ícono | Sección | Badge | Descripción |
|-------|---------|-------|-------------|
| 📊 LayoutDashboard | Dashboard | - | Vista principal |
| 💰 Calculator | Tax Optimizer | - | Herramientas fiscales |
| 💼 Wallet | Assets | 12 | Número de wallets |
| 📜 ArrowLeftRight | Transactions | - | Historial completo |
| 🏦 Building2 | Banks | 3 | Cuentas conectadas |
| 🔍 Shield | Compliance | NEW | AML/KYT tools |

**Interacciones:**
- ✅ Hover: expande tooltip si está colapsado
- ✅ Active state: fondo purple gradient
- ✅ Toggle collapse: botón en la parte inferior
- ✅ Animación smooth (300ms cubic-bezier)

### 2.4. Bottom Navigation (Mobile)

**Ubicación:** Fija en la parte inferior  
**Visible:** Viewport < 1024px  
**Height:** 80px con padding  

**Items (5 principales):**

| Ícono | Label | Sección |
|-------|-------|---------|
| 📊 | Dashboard | Dashboard |
| 💰 | Tax | Tax Optimizer |
| 💼 | Assets | Assets |
| 📜 | Txns | Transactions |
| 🏦 | Banks | Banks |

**Características:**
- ✅ Active state con color purple + icon filled
- ✅ Label siempre visible (no collapse)
- ✅ Safe area insets para iOS
- ✅ Backdrop blur glassmorphism

---

## 3. Dashboard - Vista Principal

### 3.1. Propósito

Vista **consolidada de alto nivel** con métricas clave fiscales y de portfolio. Enfocada en **decisiones financieras** más que en datos operativos detallados.

### 3.2. Layout de Widgets

```
┌──────────────────────────────────────────────────────────┐
│  📊 Dashboard                                    [⚙️ Customize] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────┐  ┌────────────────────────┐│
│  │  Total Portfolio Value │  │ Investment Performance ││
│  │  (Fiscal focus)        │  │  (ROI chart)           ││
│  └────────────────────────┘  └────────────────────────┘│
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │         Bot Activity Detector                       ││
│  │         (Spike detection chart)                     ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  ┌────────────────────────┐  ┌────────────────────────┐│
│  │  Asset Distribution    │  │  Wallet Network        ││
│  │  (Pie chart)           │  │  (Diagram)             ││
│  └────────────────────────┘  └────────────────────────┘│
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 3.3. Widget 1: Total Portfolio Value

#### **Objetivo:**
Mostrar el valor total del portfolio con **enfoque fiscal/legal** y métricas de P&L.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 💼 Total Portfolio Value                  [👁️ Toggle] │
├─────────────────────────────────────────────────────┤
│                                                     │
│   €142,587.42                     ↗️ +12.45%       │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   📊 Métricas Fiscales/Legales                     │
│   ┌───────────────┬───────────────┬──────────────┐│
│   │ P&L Realizada │ P&L No Real.  │ Base Impon.  ││
│   │ €8,450.32 ✅  │ €4,123.10     │ €8,450.32    ││
│   └───────────────┴───────────────┴──────────────┘│
│                                                     │
│   💡 Ganancias Compensables: €2,150.00            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Datos Mostrados:**

| Métrica | Descripción | Cálculo | Color |
|---------|-------------|---------|-------|
| **Total Value** | Suma de todos los activos en EUR | Sum(balance * precio) | Foreground |
| **24h Change** | Variación últimas 24h | (current - prev) / prev * 100 | Verde/Rojo |
| **P&L Realizada** | Ganancias/pérdidas de ventas | FIFO on closed positions | Verde ✅ |
| **P&L No Realizada** | Ganancias/pérdidas paper | Current value - cost basis | Muted |
| **Base Imponible** | Total a declarar | P&L realizada (positiva) | Warning |
| **Ganancias Compensables** | Pérdidas disponibles | P&L realizada (negativa) | Info |

#### **Interacciones:**

- **👁️ Toggle Visibility:** Oculta/muestra valores sensibles (reemplaza por "•••")
- **Hover sobre métricas:** Tooltip con explicación fiscal
- **Click en "Ver desglose":** Navega a Tax Optimizer

#### **Estados:**

1. **Loading:** Skeleton animado con shimmer
2. **Data:** Muestra valores reales
3. **Error:** EmptyState con mensaje de error
4. **No Data:** Mensaje "Conecta tu primera wallet"

---

### 3.4. Widget 2: Investment Performance

#### **Objetivo:**
Visualizar el **rendimiento histórico** del portfolio con gráfico de área y métricas de ROI.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 📈 Investment Performance      [24h 7d 30d 1y All] │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ROI Total: +24.5%                   ↗️ Positivo  │
│   ROI Anualizado: +18.2%                           │
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │     📊 GRÁFICO DE ÁREA                       ││
│   │     (Valor portfolio vs tiempo)              ││
│   │     - Gradiente purple                       ││
│   │     - Tooltip interactivo                    ││
│   │     - Grid lines suaves                      ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   🎯 Best Period: Last 30 days (+8.3%)            │
│   📉 Worst Period: Last 7 days (-2.1%)            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Timeframes Disponibles:**

| Timeframe | Label | Data Points | Descripción |
|-----------|-------|-------------|-------------|
| **24h** | 24h | 24 (hourly) | Últimas 24 horas |
| **7d** | 7d | 7 (daily) | Última semana |
| **30d** | 30d | 30 (daily) | Último mes |
| **1y** | 1y | 52 (weekly) | Último año |
| **All** | All | Adaptive | Desde inicio |

#### **Gráfico - Especificaciones:**

- **Tipo:** AreaChart (Recharts)
- **Eje X:** Tiempo (formato: "DD/MM" o "HH:mm")
- **Eje Y:** Valor en EUR
- **Gradient Fill:** `linear-gradient(180deg, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0))`
- **Stroke:** `#8B5CF6` (primary purple)
- **Stroke Width:** 2px
- **Grid:** Líneas horizontales suaves (#27272A)
- **Tooltip:** Glassmorphism card con:
  - Fecha/hora
  - Valor portfolio
  - Cambio % desde anterior punto

#### **Indicadores:**

```tsx
ROI Total = (Current Value - Initial Investment) / Initial Investment * 100
ROI Anualizado = ROI Total * (365 / days_since_start)
```

#### **Interacciones:**

- **Click en timeframe:** Recarga datos del periodo
- **Hover en gráfico:** Muestra tooltip con valores exactos
- **Click en "Ver análisis completo":** Expande modal con métricas avanzadas

---

### 3.5. Widget 3: Bot Activity Detector

#### **Objetivo:**
Identificar **patrones de trading automatizado** o actividad anómala basándose en **spikes de transacciones**.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 🤖 Bot Activity Detector                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Filtros: [All] [High Frequency] [Arbitrage]     │
│            [Market Making] [Wash Trading]          │
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │     📊 GRÁFICO DE BARRAS                     ││
│   │                                               ││
│   │   ║        ║  ⚠️           ║        ║       ││
│   │   ║   🔴   ║ ████  ← Spike ║        ║       ││
│   │   ║  ████  ║ ████          ║  ████  ║       ││
│   │  ████ ████ ████ ████      ████ ████ ████    ││
│   │ ──────────────────────────────────────────   ││
│   │  Lun  Mar  Mié  Jue  Vie  Sáb  Dom          ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   🚨 Alertas Detectadas (últimos 30 días):        │
│   ┌──────────────────────────────────────────────┐│
│   │ ⚠️  High Frequency Trading - 15 Oct 2024     ││
│   │     📊 127 transacciones en 2 horas          ││
│   │     💼 Exchange: Binance                      ││
│   │     ⚡ Severidad: Alta                        ││
│   └──────────────────────────────────────────────┘│
│   ┌──────────────────────────────────────────────┐│
│   │ 🔄 Arbitrage Pattern - 12 Oct 2024           ││
│   │     📊 89 transacciones cruzadas             ││
│   │     💼 Binance ↔️ Kraken                     ││
│   │     ⚡ Severidad: Media                       ││
│   └──────────────────────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Algoritmo de Detección:**

```typescript
interface BotDetectionConfig {
  threshold_transactions_per_hour: 20;     // > 20 txs/hora = sospechoso
  threshold_transactions_per_day: 100;     // > 100 txs/día = muy sospechoso
  pattern_detection: {
    high_frequency: boolean;               // Muchas txs en poco tiempo
    arbitrage: boolean;                    // Compra/venta simultánea en exchanges
    wash_trading: boolean;                 // Compra/venta del mismo asset
    market_making: boolean;                // Órdenes limit repetitivas
  };
}
```

**Cálculo de Spikes:**

```typescript
function detectSpike(transactions: Transaction[], date: Date): Spike | null {
  const dailyTxs = transactions.filter(tx => isSameDay(tx.date, date));
  const avgDailyTxs = getAverageDailyTransactions(transactions);
  
  if (dailyTxs.length > avgDailyTxs * 3) { // 3x el promedio
    return {
      date,
      count: dailyTxs.length,
      severity: dailyTxs.length > 100 ? 'high' : 'medium',
      type: classifyBotActivity(dailyTxs),
    };
  }
  
  return null;
}
```

#### **Tipos de Actividad de Bots:**

| Tipo | Descripción | Criterios | Badge Color |
|------|-------------|-----------|-------------|
| **High Frequency** | Trading de alta frecuencia | >50 txs/hora | 🔴 Red |
| **Arbitrage** | Arbitraje entre exchanges | Mismo asset, diferentes exchanges | 🟡 Amber |
| **Market Making** | Creación de liquidez | Órdenes limit repetitivas | 🔵 Blue |
| **Wash Trading** | Lavado de trades | Compra/venta mismo asset | 🟣 Purple |

#### **Filtros Disponibles:**

- **All:** Muestra todos los spikes detectados
- **High Frequency:** Solo HFT
- **Arbitrage:** Solo arbitraje
- **Market Making:** Solo market making
- **Wash Trading:** Solo wash trading

#### **Gráfico - Especificaciones:**

- **Tipo:** BarChart (Recharts)
- **Eje X:** Días (últimos 30)
- **Eje Y:** Número de transacciones
- **Barra normal:** `#8B5CF6` (purple)
- **Barra con spike:** `#EF4444` (red) + icon ⚠️
- **Threshold line:** Línea horizontal punteada en promedio
- **Tooltip:** Muestra:
  - Fecha
  - Número de transacciones
  - Tipo de actividad detectada (si aplica)
  - Exchange/wallet afectado

#### **Interacciones:**

- **Click en barra:** Abre modal con detalles del día
- **Click en alerta:** Navega a Transactions con filtro aplicado
- **Click en filtro:** Recalcula spikes según tipo seleccionado

---

### 3.6. Widget 4: Asset Distribution

#### **Objetivo:**
Visualizar la **distribución del portfolio** por tipo de asset (BTC, ETH, stablecoins, altcoins).

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 🥧 Asset Distribution                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────────────┐   ┌─────────────────────┐ │
│   │                  │   │ 🔵 BTC    45.2%     │ │
│   │   GRÁFICO PIE    │   │ 🟣 ETH    28.7%     │ │
│   │   (Donut chart)  │   │ 🟢 USDT   12.3%     │ │
│   │                  │   │ 🟡 BNB     8.5%     │ │
│   └──────────────────┘   │ 🔴 Others  5.3%     │ │
│                           └─────────────────────┘ │
│                                                     │
│   💼 Top Holdings:                                 │
│   ┌──────────────────────────────────────────────┐│
│   │ 1. Bitcoin (BTC)       €64,289.45    45.2%  ││
│   │ 2. Ethereum (ETH)      €40,856.21    28.7%  ││
│   │ 3. Tether (USDT)       €17,538.43    12.3%  ││
│   └──────────────────────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Gráfico - Especificaciones:**

- **Tipo:** PieChart con innerRadius (donut)
- **Colors:** Paleta pastel de Kontrol
  - BTC: `#F7931A` (naranja Bitcoin)
  - ETH: `#627EEA` (azul Ethereum)
  - USDT: `#26A17B` (verde Tether)
  - Stablecoins: `#10B981` (success-pastel)
  - Altcoins: Colores únicos por asset
- **Label:** Porcentaje dentro del sector
- **Tooltip:** 
  - Nombre del asset
  - Cantidad
  - Valor en EUR
  - Porcentaje del total

#### **Lista de Top Holdings:**

- Muestra top 5 assets por valor
- Cada item incluye:
  - Rank number
  - Asset icon + nombre + ticker
  - Valor en EUR
  - Porcentaje del portfolio
  - Mini gráfico sparkline de 7 días (opcional)

#### **Interacciones:**

- **Click en sector:** Navega a Assets con filtro del asset
- **Hover en sector:** Resalta en la leyenda
- **Click en "Ver todos los assets":** Navega a Assets section

---

### 3.7. Widget 5: Wallet Network Diagram

#### **Objetivo:**
Visualizar la **distribución de assets por ubicación** (Self-custody vs Exchanges) y tipo de wallet.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 🔗 Wallet Network                                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │                                               ││
│   │     [Hot Wallet 1]────┐                      ││
│   │           │            │                      ││
│   │           │        [YOU]───[Exchange 1]      ││
│   │           │            │                      ││
│   │     [Cold Wallet]──────┘                      ││
│   │                        │                      ││
│   │                    [Exchange 2]               ││
│   │                                               ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   📊 Balance por Ubicación:                        │
│   ┌────────────────┬────────────────┐             │
│   │ Self-Custody   │ Exchanges      │             │
│   │ €85,450.32     │ €57,137.10     │             │
│   │ 59.9%          │ 40.1%          │             │
│   └────────────────┴────────────────┘             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Diagrama - Especificaciones:**

- **Tipo:** Network graph (custom SVG o React Flow)
- **Nodo central:** "YOU" (usuario)
- **Nodos conectados:**
  - Hot wallets (color orange)
  - Cold wallets (color blue)
  - Exchanges (color purple)
- **Líneas de conexión:** Grosor proporcional al valor
- **Interactividad:**
  - Hover en nodo: muestra balance y número de assets
  - Click en nodo: navega a Assets con filtro de la wallet

#### **Balance por Ubicación:**

Muestra dos categorías principales:
1. **Self-Custody:** Suma de hot + cold wallets
2. **Exchanges:** Suma de todos los balances en CEX

---

## 4. Tax Optimizer - Sección Fiscal

### 4.1. Propósito

Herramienta completa para **calcular impuestos** sobre ganancias de capital según la normativa española, con simulador interactivo y optimización fiscal.

### 4.2. Layout de la Sección

```
┌──────────────────────────────────────────────────────────┐
│  💰 Tax Optimizer                                        │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  🎯 Resumen Fiscal 2024                            │ │
│  │  (Card grande con métricas principales)            │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  📊 Tax Bracket Optimizer                          │ │
│  │  (Calculadora por tramos con switch FIFO)          │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  🧮 Fiscal Simulator                               │ │
│  │  (Simulador interactivo de ventas hipotéticas)    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  📄 Tax Reports                                     │ │
│  │  (Generación de informes para AEAT)               │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 4.3. Resumen Fiscal 2024

#### **Objetivo:**
Vista consolidada de **todas las métricas fiscales** del año en curso.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 🎯 Resumen Fiscal 2024                    [Año: 2024] │
├─────────────────────────────────────────────────────┤
│                                                     │
│   📊 Ganancias Patrimoniales del Ahorro            │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   ┌──────────────┬──────────────┬──────────────┐  │
│   │ P&L Realizada│ Base Imponible│ Impuestos   │  │
│   │ €12,450.32   │ €12,450.32   │ €2,614.57   │  │
│   │ ✅ Positiva  │ 💰 A declarar│ 📊 Estimados│  │
│   └──────────────┴──────────────┴──────────────┘  │
│                                                     │
│   ┌──────────────┬──────────────────────────────┐  │
│   │ P&L No Real. │ Pérdidas Compensables       │  │
│   │ €6,789.10    │ €1,200.00                   │  │
│   │ 📈 Paper     │ 💡 Disponibles para futuros │  │
│   └──────────────┴──────────────────────────────┘  │
│                                                     │
│   🧮 Desglose por Tramos Fiscales:                 │
│   ┌──────────────────────────────────────────────┐│
│   │ Tramo 1 (0-6.000€)      €6,000 × 19% = €1,140││
│   │ Tramo 2 (6.000-50.000€) €6,450 × 21% = €1,354││
│   │ Tramo 3 (50.000€+)      €0     × 23% = €0    ││
│   ├──────────────────────────────────────────────┤│
│   │ 💰 TOTAL IMPUESTOS:              €2,614.57  ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   📅 Año fiscal: 2024 (1 ene - 31 dic)            │
│   🔄 Última actualización: Hace 5 minutos         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Métricas Incluidas:**

| Métrica | Fórmula | Descripción |
|---------|---------|-------------|
| **P&L Realizada** | Sum(ventas - coste) | Solo operaciones cerradas |
| **Base Imponible** | P&L Realizada (si > 0) | A declarar en renta |
| **Impuestos Estimados** | Sum(tramo × tipo) | Cálculo por tramos |
| **P&L No Realizada** | Sum(precio_actual - coste) | Ganancias/pérdidas paper |
| **Pérdidas Compensables** | P&L Realizada negativa años anteriores | Reducen base futura |

#### **Tramos Fiscales Españoles 2024:**

```typescript
const TRAMOS_FISCALES_2024 = [
  { min: 0,      max: 6000,   tipo: 0.19 }, // 19%
  { min: 6000,   max: 50000,  tipo: 0.21 }, // 21%
  { min: 50000,  max: 200000, tipo: 0.23 }, // 23%
  { min: 200000, max: Infinity, tipo: 0.28 }, // 28%
];
```

#### **Cálculo de Impuestos:**

```typescript
function calcularImpuestos(baseImponible: number): TaxBreakdown {
  let remaining = baseImponible;
  let totalTax = 0;
  const breakdown: TaxBracket[] = [];
  
  for (const tramo of TRAMOS_FISCALES_2024) {
    const amount = Math.min(remaining, tramo.max - tramo.min);
    if (amount > 0) {
      const tax = amount * tramo.tipo;
      totalTax += tax;
      breakdown.push({
        range: `${tramo.min}-${tramo.max}€`,
        amount,
        rate: tramo.tipo,
        tax,
      });
      remaining -= amount;
    }
  }
  
  return { totalTax, breakdown };
}
```

---

### 4.4. Tax Bracket Optimizer

#### **Objetivo:**
Calculadora **interactiva** que permite elegir entre dos métodos FIFO y visualizar el impacto fiscal.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 📊 Tax Bracket Optimizer                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Método FIFO:                                      │
│   ○ FIFO Global     ● FIFO por Exchange           │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   🎯 FIFO por Exchange Seleccionado                │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   📊 Comparativa de Métodos:                       │
│   ┌────────────────┬──────────────┬──────────────┐│
│   │                │ FIFO Global  │ FIFO x Exch. ││
│   ├────────────────┼──────────────┼──────────────┤│
│   │ Base Imponible │ €14,230.45   │ €12,450.32   ││
│   │ Impuestos      │ €3,012.84    │ €2,614.57    ││
│   │ Ahorro Fiscal  │ -            │ €398.27 ✅   ││
│   └────────────────┴──────────────┴──────────────┘│
│                                                     │
│   💡 Recomendación:                                │
│   FIFO por Exchange es más favorable en tu caso.  │
│   Genera un ahorro de €398.27 en impuestos.       │
│                                                     │
│   ⚖️ Ambos métodos son legalmente válidos según   │
│      la normativa española vigente.                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **FIFO Global vs FIFO por Exchange:**

| Método | Descripción | Cuándo usar | Ejemplo |
|--------|-------------|-------------|---------|
| **FIFO Global** | Todas las compras en una única cola FIFO | Menos operaciones, consolidado | Compras: [Binance BTC 1, Kraken BTC 2] → Venta: usa BTC 1 |
| **FIFO por Exchange** | Una cola FIFO separada por cada exchange | Optimización fiscal, muchas ops | Binance: [BTC 1] ← Venta Binance usa BTC 1 |

**Ventajas de FIFO por Exchange:**
- ✅ Puede generar menos ganancias (usar compras más caras primero)
- ✅ Separación clara por plataforma
- ✅ Más coherente con la realidad operativa

**Desventajas:**
- ❌ Más complejo de calcular
- ❌ Requiere tracking por exchange

#### **Interacciones:**

- **Toggle FIFO:** Recalcula automáticamente al cambiar
- **Comparativa:** Muestra side-by-side ambos métodos
- **Recomendación:** Algoritmo sugiere el método más favorable
- **"Aplicar método":** Guarda preferencia en settings

---

### 4.5. Fiscal Simulator

#### **Objetivo:**
Simulador **interactivo** para predecir el impacto fiscal de **ventas hipotéticas**.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 🧮 Fiscal Simulator                                │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Simula una venta hipotética:                     │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   Asset:    [BTC ▼]                                │
│   Cantidad: [0.5 BTC] (Disponible: 1.234 BTC)     │
│   Precio:   [€50,000] (Actual: €48,500)           │
│                                                     │
│   ┌─────────────────────────────────────────────┐ │
│   │  [🧮 Calcular Impacto Fiscal]               │ │
│   └─────────────────────────────────────────────┘ │
│                                                     │
│   📊 Resultado de la Simulación:                   │
│   ┌──────────────────────────────────────────────┐│
│   │ 💰 Valor de venta:        €25,000.00        ││
│   │ 📉 Coste base (FIFO):     €18,500.00        ││
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ││
│   │ ✅ Ganancia:              €6,500.00         ││
│   │                                              ││
│   │ 🧮 Impuestos estimados:   €1,365.00 (21%)  ││
│   │ 💵 Neto después impuestos: €23,635.00       ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   💡 Escenarios Alternativos:                      │
│   ┌──────────────────────────────────────────────┐│
│   │ Si vendes en enero 2025 (nuevo año fiscal): ││
│   │ Impuestos: €1,235.00 (ahorro de €130)       ││
│   └──────────────────────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Inputs del Simulador:**

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| **Asset** | Select | Required | Asset a vender |
| **Cantidad** | Number | > 0 y <= balance | Cantidad a vender |
| **Precio** | Number | > 0 | Precio de venta unitario |
| **Fecha** | Date | Opcional | Para proyectar año fiscal |

#### **Cálculos:**

```typescript
function simulateTransaction(input: SimulationInput): SimulationResult {
  const { asset, cantidad, precio, fecha } = input;
  
  // 1. Valor de venta
  const valorVenta = cantidad * precio;
  
  // 2. Obtener coste base usando FIFO
  const costeBase = getFIFOCostBasis(asset, cantidad);
  
  // 3. Ganancia/pérdida
  const ganancia = valorVenta - costeBase;
  
  // 4. Calcular impuestos según tramo
  const impuestos = calcularImpuestos(ganancia);
  
  // 5. Neto
  const neto = valorVenta - impuestos;
  
  return {
    valorVenta,
    costeBase,
    ganancia,
    impuestos,
    neto,
    tramo: getTramofiscal(ganancia),
  };
}
```

#### **Escenarios Alternativos:**

El simulador sugiere automáticamente:
- **Vender en diferente año fiscal** (si estamos cerca de fin de año)
- **Compensar con pérdidas** (si hay pérdidas disponibles)
- **Vender en tramos menores** (para aprovechar tramo inferior)

---

### 4.6. Tax Reports

#### **Objetivo:**
Generar **informes descargables** para presentar a la AEAT (Agencia Tributaria).

#### **Tipos de Informes:**

| Informe | Formato | Contenido | Uso |
|---------|---------|-----------|-----|
| **Resumen Anual** | PDF | P&L, base imponible, impuestos | Declaración de renta |
| **Detalle de Operaciones** | Excel | Todas las transacciones con cálculos | Auditoría |
| **Modelo 100** | CSV | Formato AEAT | Import directo a Renta Web |
| **Tax Loss Harvesting** | PDF | Oportunidades de optimización | Planificación fiscal |

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 📄 Tax Reports                                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Generar informes fiscales:                       │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │ 📊 Resumen Anual 2024            [⬇️ PDF]   ││
│   │ Incluye: P&L, tramos, impuestos             ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │ 📈 Detalle de Operaciones        [⬇️ Excel] ││
│   │ Todas las transacciones con cálculos        ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │ 🏛️ Modelo 100 AEAT              [⬇️ CSV]   ││
│   │ Formato para importar en Renta Web          ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   ⚙️ Opciones:                                     │
│   ☑️ Incluir transacciones pendientes             │
│   ☐ Detallar por exchange                         │
│   ☑️ Añadir gráficos                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 5. Assets - Gestión de Activos

### 5.1. Propósito

Gestión completa de **wallets, exchanges y posiciones DeFi** con balance consolidado y herramientas de importación.

### 5.2. Layout de la Sección

```
┌──────────────────────────────────────────────────────────┐
│  💼 My Assets                                [➕ Add Wallet] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  📊 Portfolio Overview                             │ │
│  │  Total: €142,587 | Self-custody: 60% | CEX: 40%   │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  🔥 Hot Wallets (3) ───────────────────── [Collapse ▼] │
│  ┌────────────────────────────────────────────────────┐ │
│  │  🟠 MetaMask Main       €45,230.12    Ethereum     │ │
│  │  🔵 Trust Wallet        €12,450.89    Multi-chain  │ │
│  │  🟣 Phantom            €8,900.45     Solana       │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ❄️ Cold Wallets (2) ───────────────────── [Collapse ▼] │
│  ┌────────────────────────────────────────────────────┐ │
│  │  🔐 Ledger Nano X       €52,100.00    Multi-chain  │ │
│  │  🔐 Trezor Model T      €18,600.00    Bitcoin      │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  🏢 Exchanges (3) ───────────────────────── [Collapse ▼] │
│  ┌────────────────────────────────────────────────────┐ │
│  │  🟡 Binance            €35,450.12    CEX           │ │
│  │  🔵 Coinbase           €15,230.45    CEX           │ │
│  │  🟣 Kraken             €6,625.39     CEX           │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  🌾 DeFi Positions (4) ──────────────────── [Collapse ▼] │
│  ┌────────────────────────────────────────────────────┐ │
│  │  🌊 Aave USDC Lending   €10,000 | APY: 4.2%       │ │
│  │  🦄 Uniswap ETH/USDC LP €8,500  | APY: 12.5%      │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 5.3. Portfolio Overview

Widget de resumen en la parte superior:

```tsx
┌─────────────────────────────────────────────────────┐
│ 📊 Portfolio Overview                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Total Assets: €142,587.42        ↗️ +5.2% 24h   │
│                                                     │
│   ┌──────────────┬──────────────┬──────────────┐  │
│   │ Self-Custody │ Exchanges    │ DeFi         │  │
│   │ €85,450.34   │ €57,306.96   │ €18,500.00   │  │
│   │ 59.9%        │ 40.2%        │ 13.0%        │  │
│   └──────────────┴──────────────┴──────────────┘  │
│                                                     │
│   🔗 12 Wallets | 8 Assets | 3 Blockchains        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### 5.4. Hot Wallets (Carteras Calientes)

#### **Definición:**
Wallets conectadas a internet para uso frecuente (MetaMask, Trust Wallet, Phantom, etc.).

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 🔥 Hot Wallets (3)                       [Collapse ▼] │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │ 🟠 MetaMask Main                   [⋮ Actions]││
│   │ 0x742d...5aF2        €45,230.12    Ethereum  ││
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ││
│   │ Holdings:                                     ││
│   │ • 8.5 ETH        €20,400.00                  ││
│   │ • 15,000 USDT    €15,000.00                  ││
│   │ • 250 UNI        €1,850.00                   ││
│   │ • 12 LINK        €180.00                     ││
│   │ + 4 more assets                              ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │ 🔵 Trust Wallet                    [⋮ Actions]││
│   │ 0x8a3c...9bE4        €12,450.89    Multi-chain││
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ││
│   │ Holdings:                                     ││
│   │ • 0.25 BTC       €12,000.00                  ││
│   │ • 50 BNB         €12,500.00                  ││
│   │ • 500 USDC       €500.00                     ││
│   └──────────────────────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Información por Wallet:**

| Campo | Descripción | Formato |
|-------|-------------|---------|
| **Icon** | Icono personalizable | 40+ opciones |
| **Label** | Nombre custom de la wallet | Texto libre |
| **Address** | Dirección (truncada) | 0xABC...XYZ |
| **Balance** | Valor total en EUR | €XX,XXX.XX |
| **Network** | Blockchain principal | Ethereum, BSC, Solana |
| **Holdings** | Top 5 assets + contador | Lista colapsable |

#### **Actions Menu (⋮):**

- **View Details:** Abre modal con info completa
- **Edit Label:** Cambiar nombre de la wallet
- **Change Icon:** Picker de iconos
- **Add Tag:** Etiquetar (ej: "Trading", "HODL")
- **View Transactions:** Navega a Transactions con filtro
- **Remove Wallet:** Eliminar con confirmación

---

### 5.5. Cold Wallets (Carteras Frías)

#### **Definición:**
Hardware wallets (Ledger, Trezor) o paper wallets para almacenamiento seguro a largo plazo.

#### **Diferencias visuales con Hot Wallets:**

- **Icon:** 🔐 (candado) en lugar de colores
- **Badge:** "Cold Storage" badge
- **Color scheme:** Tonos azules (seguridad)

```tsx
┌─────────────────────────────────────────────────────┐
│ ❄️ Cold Wallets (2)                      [Collapse ▼] │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │ 🔐 Ledger Nano X               [⋮ Actions]   ││
│   │ 🏷️ Cold Storage                              ││
│   │ bc1q...xyz9          €52,100.00    Bitcoin   ││
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ││
│   │ Holdings:                                     ││
│   │ • 1.08 BTC       €52,100.00                  ││
│   └──────────────────────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### 5.6. Exchanges (CEX)

#### **Definición:**
Cuentas en exchanges centralizados (Binance, Coinbase, Kraken, etc.).

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 🏢 Exchanges (3)                         [Collapse ▼] │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │ [🟡] Binance                       [⋮ Actions]││
│   │ Account ID: 12345678   €35,450.12    CEX     ││
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ││
│   │ Holdings:                                     ││
│   │ • 0.45 BTC       €21,600.00                  ││
│   │ • 5.2 ETH        €12,480.00                  ││
│   │ • 150 BNB        €45,000.00                  ││
│   │ • 8,000 USDT     €8,000.00                   ││
│   │ + 12 more assets                             ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   [🔗 Sync Now] Last sync: 5 minutes ago          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Características Específicas:**

- **Logo del exchange:** Binance, Coinbase, Kraken, KuCoin, etc.
- **Account ID:** Identificador de cuenta (oculto parcialmente)
- **Sync Status:** Última sincronización con API
- **API Connection:** Estado de la conexión (🟢 Connected | 🔴 Disconnected)

#### **Actions Menu:**

- **Sync Now:** Actualizar balance manualmente
- **View Transactions:** Historial de trades en el exchange
- **Edit API Keys:** Reconfigurar conexión
- **Disconnect:** Desconectar API (mantiene datos históricos)

---

### 5.7. DeFi Positions

#### **Objetivo:**
Tracking de **posiciones en protocolos DeFi** (staking, lending, liquidity pools).

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 🌾 DeFi Positions (4)                    [Collapse ▼] │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │ 🌊 Aave v3 - USDC Lending          [⋮ Actions]││
│   │ Ethereum Mainnet                             ││
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ││
│   │ Deposited:   10,000 USDC    €10,000.00      ││
│   │ Earned:      42 USDC        €42.00          ││
│   │ APY:         4.2%           🟢 Stable        ││
│   │ Duration:    45 days                         ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   ┌──────────────────────────────────────────────┐│
│   │ 🦄 Uniswap v3 - ETH/USDC LP    [⋮ Actions]   ││
│   │ Ethereum Mainnet                             ││
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ││
│   │ Pool Value:  €8,500.00                       ││
│   │ Fees Earned: €125.50                         ││
│   │ APY:         12.5%          🟡 Medium Risk   ││
│   │ Range:       $2,000 - $2,500                 ││
│   └──────────────────────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Tipos de Posiciones:**

| Tipo | Descripción | Métricas | Protocolos |
|------|-------------|----------|------------|
| **Lending** | Préstamos de tokens | Deposited, APY, Earned | Aave, Compound |
| **Staking** | Validación de red | Staked, APR, Rewards | Lido, Rocket Pool |
| **Liquidity Pool** | Provisión de liquidez | Pool value, Fees, IL | Uniswap, Curve |
| **Yield Farming** | Farming de rewards | Deposited, APY, Rewards | Yearn, Beefy |

#### **Métricas DeFi:**

```typescript
interface DeFiPosition {
  protocol: string;          // "Aave v3"
  type: "lending" | "staking" | "lp" | "farming";
  network: string;           // "Ethereum Mainnet"
  deposited: number;         // Valor depositado
  currentValue: number;      // Valor actual (con rewards)
  earned: number;            // Rewards acumulados
  apy: number;               // Annual Percentage Yield
  duration: number;          // Días en la posición
  lockupEnd?: Date;          // Si tiene lockup period
  riskLevel: "low" | "medium" | "high";
}
```

#### **Actions Menu:**

- **View on Explorer:** Link a Etherscan/BSCScan
- **View on Protocol:** Link a Aave/Uniswap app
- **Harvest Rewards:** Claim rewards (si disponible)
- **Add to Position:** Aumentar depósito
- **Withdraw:** Retirar posición
- **Track Performance:** Ver histórico de APY

---

### 5.8. Import Wallet Modal

#### **Objetivo:**
Wizard para importar wallets fácilmente.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ ➕ Add Wallet                                [✕ Close] │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Step 1 of 3: Select Wallet Type                  │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   ┌──────────────┐  ┌──────────────┐             │
│   │  🔥 Hot      │  │  ❄️ Cold     │             │
│   │  Wallet      │  │  Wallet      │             │
│   └──────────────┘  └──────────────┘             │
│                                                     │
│   ┌──────────────┐  ┌──────────────┐             │
│   │  🏢 Exchange │  │  🌾 DeFi     │             │
│   │              │  │  Position    │             │
│   └──────────────┘  └──────────────┘             │
│                                                     │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   [Cancel]                            [Next Step →] │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Step 2: Enter Details**

```tsx
┌─────────────────────────────────────────────────────┐
│   Step 2 of 3: Enter Wallet Details                │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   Wallet Label:                                     │
│   [My MetaMask Wallet____________]                 │
│                                                     │
│   Address or Public Key:                            │
│   [0x742d35Cc6634C0532925a3b844Bc9e7595f5aF2_____] │
│   [📋 Paste]  [📷 Scan QR]                         │
│                                                     │
│   Network:                                          │
│   ○ Ethereum  ○ BSC  ○ Polygon  ○ Solana          │
│                                                     │
│   Icon:                                             │
│   [🟠 ▼] (Icon picker)                             │
│                                                     │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   [← Back]                            [Next Step →] │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Step 3: Confirm & Import**

```tsx
┌─────────────────────────────────────────────────────┐
│   Step 3 of 3: Confirm & Import                    │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   Review wallet details:                            │
│   ┌──────────────────────────────────────────────┐│
│   │ 🟠 My MetaMask Wallet                        ││
│   │ 0x742d...5aF2                                ││
│   │ Ethereum Mainnet                             ││
│   └──────────────────────────────────────────────┘│
│                                                     │
│   🔍 Fetching balance...                           │
│   [████████████░░░░░░░░] 65%                       │
│                                                     │
│   ✅ Found 8 assets                                │
│   • 8.5 ETH                                        │
│   • 15,000 USDT                                    │
│   • 250 UNI                                        │
│   • ... (5 more)                                   │
│                                                     │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│   [← Back]              [✅ Add Wallet to Portfolio] │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 6. Transactions - Historial Completo

### 6.1. Propósito

Vista completa de **todas las transacciones** con sistema profesional de **filtros**, **búsqueda** y **agrupación temporal**.

### 6.2. Layout de la Sección

```
┌──────────────────────────────────────────────────────────┐
│  📜 My Transactions                                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  🔍 Search & Filters (Sticky Bar)                  │ │
│  │  [Search: TxID, comment...]  [Filters: 3 active]   │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  📅 Octubre 2024 (45 transactions) ──────── [Collapse ▼]│
│  ┌────────────────────────────────────────────────────┐ │
│  │  Buy   BTC    0.05 BTC      €2,400.50    Binance  │ │
│  │  Sell  ETH    1.2 ETH       €2,880.00    Kraken   │ │
│  │  ... (43 more)                                     │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  📅 Septiembre 2024 (78 transactions) ───── [Collapse ▼]│
│  ┌────────────────────────────────────────────────────┐ │
│  │  Transfer USDT  1,000 USDT  €1,000.00   MetaMask  │ │
│  │  ... (77 more)                                     │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 6.3. Search & Filters Bar (Sticky)

#### **Objetivo:**
Barra sticky en la parte superior con **búsqueda universal** y **filtros profesionales**.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 🔍 Search & Filters                      [Export ▼] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [🔍 Search: TxID, comment, wallet, everything...] │
│                                                     │
│  Filters:                                           │
│  [📅 Date/Range ▼] [📊 Type ▼] [✅ Status ▼]      │
│  [💼 Wallet ▼]     [🏢 Exchange ▼]                │
│                                                     │
│  🏷️ 3 filters active  [🗑️ Clear all]              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Búsqueda Universal:**

Campo de búsqueda que acepta:
- **Transaction ID** (hash)
- **Comment/Note** (comentarios añadidos)
- **Wallet address** (origen/destino)
- **Asset ticker** (BTC, ETH, etc.)
- **Amount** (ej: ">1000" para mostrar txs > 1000 EUR)

```typescript
function universalSearch(query: string, transactions: Transaction[]): Transaction[] {
  const lowerQuery = query.toLowerCase();
  
  return transactions.filter(tx => 
    tx.id.toLowerCase().includes(lowerQuery) ||
    tx.comment?.toLowerCase().includes(lowerQuery) ||
    tx.wallet.toLowerCase().includes(lowerQuery) ||
    tx.asset.ticker.toLowerCase().includes(lowerQuery) ||
    tx.amount.toString().includes(lowerQuery)
  );
}
```

---

### 6.4. Filtros Disponibles

#### **1. Date/Range Filter**

Modal con calendario para seleccionar:
- **Presets:** Hoy, Ayer, Últimos 7 días, Últimos 30 días, Este mes, Este año
- **Custom Range:** Date picker con inicio y fin
- **All Time:** Todas las transacciones

```tsx
┌─────────────────────────────────────────────────────┐
│ 📅 Date Filter                            [✕ Close] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Quick Filters:                                     │
│  [Today] [Yesterday] [Last 7 days] [Last 30 days]  │
│  [This month] [This year] [All time]               │
│                                                     │
│  Custom Range:                                      │
│  From: [15/10/2024 ▼]    To: [18/10/2024 ▼]       │
│                                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │      CALENDAR PICKER                         │ │
│  │  (React Day Picker o similar)                │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  [Cancel]                          [Apply Filter]  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **2. Type Filter**

Dropdown multi-select con tipos de transacción:

| Tipo | Icon | Color | Descripción |
|------|------|-------|-------------|
| **Buy** | 📈 | Success (green) | Compra de crypto |
| **Sell** | 📉 | Destructive (red) | Venta de crypto |
| **Transfer In** | ⬇️ | Info (blue) | Recibido |
| **Transfer Out** | ⬆️ | Warning (amber) | Enviado |
| **Swap** | 🔄 | Purple | Exchange de tokens |
| **Stake** | 🌾 | Teal | Staking |
| **Unstake** | 🔓 | Cyan | Unstaking |
| **Reward** | 🎁 | Pink | Recompensas |
| **Fee** | 💸 | Muted | Comisiones |
| **Airdrop** | 🪂 | Indigo | Airdrops |

```tsx
<Select multiple>
  <Checkbox value="buy">📈 Buy</Checkbox>
  <Checkbox value="sell">📉 Sell</Checkbox>
  <Checkbox value="transfer_in">⬇️ Transfer In</Checkbox>
  <Checkbox value="transfer_out">⬆️ Transfer Out</Checkbox>
  <Checkbox value="swap">🔄 Swap</Checkbox>
  <Checkbox value="stake">🌾 Stake</Checkbox>
  <Checkbox value="unstake">🔓 Unstake</Checkbox>
  <Checkbox value="reward">🎁 Reward</Checkbox>
  <Checkbox value="fee">💸 Fee</Checkbox>
  <Checkbox value="airdrop">🪂 Airdrop</Checkbox>
</Select>
```

#### **3. Status Filter**

Estado de la transacción:

| Estado | Badge | Color | Descripción |
|--------|-------|-------|-------------|
| **Confirmed** | ✅ | Success | Confirmada on-chain |
| **Pending** | ⏳ | Warning | Esperando confirmaciones |
| **Failed** | ❌ | Destructive | Transacción fallida |

#### **4. Wallet Filter**

Dropdown con todas las wallets del usuario:
- Grouped por tipo (Hot, Cold, Exchange)
- Multi-select
- Search dentro del dropdown

#### **5. Exchange Filter**

Similar a Wallet pero solo para exchanges:
- Binance
- Coinbase
- Kraken
- KuCoin
- etc.

---

### 6.5. Contador de Filtros Activos

Badge que muestra el número de filtros aplicados:

```tsx
<Badge variant="secondary">
  🏷️ {activeFiltersCount} filters active
</Badge>
<Button variant="ghost" onClick={clearAllFilters}>
  🗑️ Clear all
</Button>
```

**Lógica:**

```typescript
function getActiveFiltersCount(): number {
  let count = 0;
  if (filters.dateRange.from || filters.dateRange.to) count++;
  if (filters.types.length > 0) count++;
  if (filters.status.length > 0) count++;
  if (filters.wallets.length > 0) count++;
  if (filters.exchanges.length > 0) count++;
  return count;
}
```

---

### 6.6. Agrupación por Meses

#### **Objetivo:**
Agrupar transacciones por mes con **secciones colapsables** y **contador de transacciones**.

#### **Componentes Visuales:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 📅 Octubre 2024 (45 transactions)        [Collapse ▼] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ 📈 Buy    BTC    0.05 BTC    €2,400.50      │ │
│  │ 15 Oct 2024, 14:32   Binance    ✅ Confirmed│ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ 📉 Sell   ETH    1.2 ETH     €2,880.00      │ │
│  │ 14 Oct 2024, 09:15   Kraken     ✅ Confirmed│ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ... (43 more transactions)                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Altura uniforme:** Cada transacción colapsada tiene **88px de altura** para consistencia visual.

#### **Animaciones:**

- **Collapse/Expand:** Smooth animation (300ms cubic-bezier)
- **Scroll:** Auto-scroll al expandir un mes
- **Hover:** Subtle elevation (shadow)

---

### 6.7. Transaction Row (Individual)

#### **Anatomía de una Transacción:**

```tsx
┌─────────────────────────────────────────────────────┐
│ [Icon] Type  Asset  Amount  Value  Location  Status │
│ Timestamp    |    Hash (truncado)    |   [⋮ Actions]│
└────────────────────────────────────────────���────────┘
```

**Ejemplo completo:**

```tsx
┌─────────────────────────────────────────────────────┐
│ 📈 Buy    BTC    0.05 BTC        €2,400.50         │
│ 15 Oct 2024, 14:32               Binance           │
│ TxID: 0xabc...xyz                ✅ Confirmed       │
│                                          [⋮ Actions] │
└─────────────────────────────────────────────────────┘
```

#### **Campos:**

| Campo | Descripción | Formato |
|-------|-------------|---------|
| **Icon + Type** | Icono + tipo de transacción | 📈 Buy |
| **Asset** | Crypto asset | BTC, ETH, USDT |
| **Amount** | Cantidad de crypto | 0.05 BTC |
| **Value** | Valor en EUR en momento de tx | €2,400.50 |
| **Location** | Wallet o exchange | Binance, MetaMask |
| **Status** | Estado de confirmación | ✅ Confirmed |
| **Timestamp** | Fecha y hora | 15 Oct 2024, 14:32 |
| **TxID** | Hash de transacción (truncado) | 0xabc...xyz |

#### **Actions Menu (⋮):**

- **View Details:** Modal con información completa
- **View on Explorer:** Link a Etherscan/BSCScan
- **Add Comment:** Añadir nota personal
- **Edit Tags:** Etiquetar transacción
- **Mark as Tax Event:** Forzar inclusión en cálculos fiscales
- **Hide from Reports:** Excluir de reportes
- **Delete:** Eliminar (con confirmación)

---

### 6.8. Export Functionality

Botón en la parte superior derecha para exportar transacciones:

```tsx
┌─────────────────────────────────────────────────────┐
│ Export                                         [▼]  │
├─────────────────────────────────────────────────────┤
│ 📊 Export to CSV                                    │
│ 📈 Export to Excel                                  │
│ 📄 Export to PDF Report                             │
│ 📋 Copy to Clipboard                                │
└─────────────────────────────────────────────────────┘
```

**Opciones de Exportación:**

- **CSV:** Para análisis en Excel/Google Sheets
- **Excel:** Con formato y gráficos
- **PDF:** Reporte legible
- **Clipboard:** Para pegar rápidamente

---

## 7. Banks - Integración Bancaria

### 7.1. Propósito

Conectar **cuentas bancarias** para vincular movimientos fiat con operaciones crypto y facilitar la reconciliación fiscal.

### 7.2. Layout de la Sección

```
┌──────────────────────────────────────────────────────────┐
│  🏦 Banks                                   [➕ Add Bank] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Connected Banks (3)                                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │  🏦 BBVA - Cuenta Corriente    **1234   €15,450  │ │
│  │  🏦 Santander - Cuenta Ahorro  **5678   €8,230   │ │
│  │  🏦 CaixaBank - Cuenta Nómina  **9012   €3,100   │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  Recent Fiat Movements                                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │  SEPA Transfer to Binance     -€2,000  15 Oct     │ │
│  │  SEPA Transfer from Kraken    +€3,500  12 Oct     │ │
│  │  ... (more movements)                              │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 7.3. Connected Banks

Lista de bancos conectados con:
- **Logo del banco**
- **Tipo de cuenta** (Corriente, Ahorro, Nómina)
- **Últimos 4 dígitos** de la cuenta
- **Balance actual**
- **Status de conexión** (🟢 Connected | 🔴 Disconnected)

### 7.4. Fiat Movements

Movimientos bancarios relacionados con crypto:
- **SEPA Transfers** a/desde exchanges
- **Card payments** a exchanges
- **Wire transfers**

**Reconciliación automática:**
- Detecta transferencias a Binance, Coinbase, Kraken
- Vincula con depósitos/retiros de crypto
- Genera reportes de trazabilidad fiat ↔ crypto

---

## 8. Compliance - AML/KYT

### 8.1. Propósito

Herramientas de **cumplimiento normativo** para Anti-Money Laundering (AML) y Know Your Transaction (KYT).

### 8.2. Layout de la Sección

```
┌──────────────────────────────────────────────────────────┐
│  🔍 Compliance - AML/KYT                                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Risk Score Overview                                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │  🟢 Low Risk        Portfolio Risk Score: 12/100   │ │
│  │  All transactions analyzed and cleared             │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  Flagged Transactions                                    │
│  ┌────────────────────────────────────────────────────┐ │
│  │  ⚠️  Medium Risk - Received from unknown wallet    │ │
│  │      0.5 BTC | 12 Oct 2024 | Score: 45/100         │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  Blacklist Check                                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │  [Input address to check]         [🔍 Check Now]   │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 8.3. Features

- **Risk Scoring:** Análisis automático de riesgo por transacción
- **Blacklist Check:** Verificación contra listas de wallets sancionadas
- **Chain Analysis:** Trazabilidad de origen de fondos
- **Compliance Reports:** Informes para auditorías

---

## 9. Sistema de Diseño

### 9.1. Paleta de Colores

#### **Primary - Purple Theme**

```css
--primary: #8B5CF6;               /* Purple principal */
--primary-gradient-from: #A78BFA; /* Purple claro */
--primary-gradient-to: #7C3AED;   /* Purple oscuro */
```

#### **Semantic Colors - Pastel Palette**

| Color | Variable | Hex | Uso |
|-------|----------|-----|-----|
| **Success** | `--success` | #10B981 | Ganancias, confirmaciones |
| **Success Pastel** | `--success-pastel` | #34D399 | Badges, highlights |
| **Warning** | `--warning` | #F59E0B | Alertas, pendientes |
| **Warning Pastel** | `--warning-pastel` | #FBBF24 | Backgrounds |
| **Destructive** | `--destructive` | #EF4444 | Errores, pérdidas |
| **Destructive Pastel** | `--destructive-pastel` | #F87171 | Soft errors |
| **Info** | `--info` | #3B82F6 | Información |
| **Info Pastel** | `--info-pastel` | #60A5FA | Info backgrounds |

#### **Transaction Type Colors**

| Type | Color | Variable | Uso |
|------|-------|----------|-----|
| **Buy** | Verde | `--success` | Compras |
| **Sell** | Rojo | `--destructive` | Ventas |
| **Transfer** | Azul | `--info` | Transferencias |
| **Swap** | Púrpura | `--purple` | Intercambios |
| **Stake** | Teal | `--teal` | Staking |
| **Reward** | Rosa | `--pink` | Recompensas |

### 9.2. Tipografía

```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Hierarchy:**

| Elemento | Font Size | Font Weight | Line Height |
|----------|-----------|-------------|-------------|
| **h1** | 2xl | Medium (500) | 1.5 |
| **h2** | xl | Medium (500) | 1.5 |
| **h3** | lg | Medium (500) | 1.5 |
| **h4** | base | Medium (500) | 1.5 |
| **p** | base | Normal (400) | 1.5 |
| **label** | base | Medium (500) | 1.5 |
| **button** | base | Medium (500) | 1.5 |

**⚠️ IMPORTANTE:** No usar clases de Tailwind para font-size, font-weight o line-height a menos que sea explícitamente requerido.

### 9.3. Glassmorphism

Efecto visual característico de Kontrol:

```css
.glass-card {
  background: rgba(23, 23, 23, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(39, 39, 42, 0.8);
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.15);
}
```

**Componentes con Glassmorphism:**
- Cards
- Modals
- Sidebar
- Top Navigation
- Bottom Navigation
- Tooltips

### 9.4. Animations

```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

--ease-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Animaciones usadas:**
- **Fade In/Out:** Modals, tooltips
- **Slide In/Out:** Sidebar, panels
- **Collapse/Expand:** Secciones, grupos
- **Pulse Glow:** Elementos interactivos
- **Shimmer:** Loading skeletons
- **Gradient Shift:** Backgrounds animados

### 9.5. Spacing

Sistema de spacing basado en múltiplos de 4px:

| Token | Value | Uso |
|-------|-------|-----|
| `gap-2` | 8px | Elementos pequeños |
| `gap-4` | 16px | Elementos medios |
| `gap-6` | 24px | Separación estándar |
| `gap-8` | 32px | Separación grande |
| `gap-12` | 48px | Secciones |

### 9.6. Border Radius

```css
--radius: 0.75rem; /* 12px */
--radius-sm: calc(var(--radius) - 4px);  /* 8px */
--radius-md: calc(var(--radius) - 2px);  /* 10px */
--radius-lg: var(--radius);              /* 12px */
--radius-xl: calc(var(--radius) + 4px);  /* 16px */
```

### 9.7. Shadows

```css
--shadow-purple-sm: 0 0 20px rgba(139, 92, 246, 0.1);
--shadow-purple-md: 0 0 40px rgba(139, 92, 246, 0.15);
--shadow-purple-lg: 0 0 60px rgba(139, 92, 246, 0.25);
```

---

## 10. Componentes Compartidos

### 10.1. CollapsibleSection

Sección colapsable reutilizable con animaciones:

```tsx
<CollapsibleSection
  title="Hot Wallets"
  icon={<Flame />}
  badge={3}
  defaultOpen={true}
>
  {/* Contenido */}
</CollapsibleSection>
```

**Props:**
- `title`: string
- `icon`: ReactNode
- `badge`: number (opcional, muestra contador)
- `defaultOpen`: boolean
- `children`: ReactNode

### 10.2. ActionBar

Barra sticky de acciones (usada en Transactions):

```tsx
<ActionBar>
  <Button>Filter</Button>
  <Button>Sort</Button>
  <Button>Export</Button>
</ActionBar>
```

**Características:**
- Sticky position
- Glassmorphism
- Responsive (se adapta a móvil)

### 10.3. EmptyState

Estado vacío con ilustración y CTA:

```tsx
<EmptyState
  icon={<Wallet />}
  title="No wallets yet"
  description="Add your first wallet to start tracking"
  action={
    <Button onClick={openAddWalletModal}>
      Add Wallet
    </Button>
  }
/>
```

### 10.4. LoadingState

Skeleton loaders animados:

```tsx
<LoadingState
  message="Loading transactions..."
  size="lg"
/>
```

**Variantes:**
- `sm`: Loader pequeño
- `md`: Loader mediano
- `lg`: Loader grande con mensaje

### 10.5. ErrorBoundary

Captura errores de React:

```tsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

Muestra fallback UI profesional cuando hay un error.

---

## 11. Flujos de Usuario

### 11.1. Onboarding Flow

```
1. Landing Page
   ↓ Click "Get Started"
2. Register Page
   ↓ Create account
3. Email Verification
   ↓ Verify email
4. Welcome to Kontrol (Dashboard vacío)
   ↓ "Add your first wallet"
5. Import Wallet Modal (Wizard)
   ↓ Complete import
6. Dashboard con datos
```

### 11.2. Add Wallet Flow

```
1. Click "Add Wallet" button
   ↓
2. Select Wallet Type (Hot/Cold/Exchange/DeFi)
   ↓
3. Enter Details (Address, Label, Network)
   ↓
4. Fetch Balance (Loading)
   ↓
5. Confirm & Import
   ↓
6. Wallet added to Assets section
```

### 11.3. Tax Calculation Flow

```
1. Navigate to Tax Optimizer
   ↓
2. Select FIFO method (Global vs Exchange)
   ↓
3. View Resumen Fiscal
   ↓
4. (Optional) Use Fiscal Simulator
   ↓
5. Generate Tax Report
   ↓
6. Download PDF/Excel
```

### 11.4. Transaction Filtering Flow

```
1. Navigate to Transactions
   ↓
2. Apply filters (Date, Type, Status, Wallet)
   ↓
3. See filtered results
   ↓
4. (Optional) Export filtered data
   ↓
5. Clear filters to reset
```

---

## 📊 Métricas de Producto

| Métrica | Valor Actual | Target |
|---------|--------------|--------|
| **Tiempo de carga inicial** | <2s | <1.5s |
| **Lighthouse Score** | 90+ | 95+ |
| **Cobertura de tests** | 0% | 80%+ |
| **Tamaño bundle** | ~800KB | <600KB |
| **Wallets soportadas** | 5 tipos | 10+ tipos |
| **Exchanges integrados** | 0 (mock) | 5+ APIs |
| **Transacciones máx** | Sin límite teórico | 10,000+ |

---

## 🔮 Roadmap de Producto

### **Q1 2025**
- ✅ Backend con Supabase
- ✅ Autenticación real (JWT)
- ✅ API de exchanges (Binance, Coinbase)
- ✅ Sincronización automática de transacciones

### **Q2 2025**
- ⏳ Generación de informes PDF profesionales
- ⏳ AML/KYT con Chainalysis integration
- ⏳ Mobile app (React Native)
- ⏳ Notificaciones push

### **Q3-Q4 2025**
- 🔮 AI Fiscal Assistant
- 🔮 Multi-currency support
- 🔮 Tax loss harvesting automático
- 🔮 Portfolio sharing
- 🔮 White-label para asesores fiscales

---

## 📝 Notas Finales

Este documento describe el estado actual de **Kontrol v1.0** con todos los widgets, secciones y funcionalidades implementadas. Es un documento vivo que se actualizará con cada nueva feature.

**Última actualización:** Octubre 2024  
**Versión:** 1.0.0  
**Autor:** Equipo Kontrol
