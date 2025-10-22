# Investment Performance Module - Inversión y Rentabilidad V2

## 📋 Resumen

Módulo mejorado en el Dashboard que muestra el **capital invertido en fiat**, **valor actual del portfolio** y la **rentabilidad total** con métricas expandibles.

**Ubicación:** Justo encima de "Balance Over Time" en el Dashboard principal.

**Versión:** 2.0 - Métricas expandibles con detalles

---

## 🎯 Objetivo

Proporcionar una visión clara y profesional de:
1. **Cuánto dinero en fiat ha invertido el usuario** (basado en transacciones bancarias y origen de fondos)
2. **Qué rentabilidad ha obtenido** desde el inicio de su actividad crypto
3. **ROI (Return on Investment)** en porcentaje
4. **Desglose del origen de los fondos** para trazabilidad fiscal

---

## 📊 Métricas Principales

### 1. **Total Invertido (Fiat)**
```tsx
const totalInvestedFiat = 65000; // €65,000
```

**Fuentes de datos:**
- ✅ Transferencias bancarias verificadas
- ✅ Origen de fondos declarado
- ✅ P2P verificado con KYC
- ❌ NO incluye ganancias reinvertidas

**Visualización:**
```
┌────────────────────────────────────┐
│ Total Invertido (Fiat)             │
│ €65,000.00                         │
│ Capital base declarado             │
└────────────────────────────────────┘
```

---

### 2. **Rentabilidad Total**
```tsx
const currentPortfolioValue = 102150; // €102,150
const absoluteProfit = currentPortfolioValue - totalInvestedFiat;
// = €37,150 (ganancia)
```

**Cálculo:**
```
Rentabilidad = Valor Actual Portfolio - Total Invertido
ROI = (Rentabilidad / Total Invertido) * 100
```

**Visualización:**
```
┌────────────────────────────────────┐
│ Rentabilidad Total                 │
│ +€37,150.00                        │
│ +57.15% ROI                        │
└────────────────────────────────────┘
```

---

### 3. **ROI (Return on Investment)**
```tsx
const profitPercentage = ((absoluteProfit / totalInvestedFiat) * 100);
// = 57.15%
```

**Interpretación:**
- ✅ **Positivo**: Color verde (success-pastel)
- ❌ **Negativo**: Color rojo (destructive-pastel)
- 📊 **Formato**: `+57.15%` o `-12.30%`

---

## 🏗️ Estructura del Componente

### **Archivo:** `/components/InvestmentPerformance.tsx`

### **Props:**
```tsx
interface InvestmentPerformanceProps {
  isVisible?: boolean; // Control global de visibilidad
}
```

### **Layout:**

```
┌─────────────────────────────────────────────────────────┐
│ [Wallet Icon] Inversión y Rentabilidad      [All Time]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────┐  ┌─────────────────────┐      │
│  │ Total Invertido     │  │ Rentabilidad Total  │      │
│  │ €65,000.00          │  │ +€37,150.00         │      │
│  │ Capital base        │  │ +57.15% ROI         │      │
│  └─────────────────────┘  └─────────────────────┘      │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ Desglose de Capital Invertido                 │     │
│  ├───────────────────────────────────────────────┤     │
│  │ • Transferencias bancarias    €45,000  69.2%  │     │
│  │ • Origen de fondos declarado  €15,000  23.1%  │     │
│  │ • P2P verificado              €5,000    7.7%  │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│  [Performance Indicator]                                │
│  Tu portfolio ha generado un rendimiento positivo...   │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Diseño Visual

### **Card Principal**
```tsx
className="bg-gradient-to-br from-card via-card to-primary/5 
          rounded-xl border border-border shadow-xl"
```

### **Métricas Grid (2 columnas)**

#### **Total Invertido** (Azul Info)
```tsx
border-2 border-info-pastel/20
bg-gradient-to-br from-info-pastel/5 via-info-pastel/3 to-transparent
```
- Color: `text-info-pastel`
- Icono: `Wallet`
- Background decoration: Blur circle azul

#### **Rentabilidad** (Verde Success / Rojo Destructive)
```tsx
// Si ganancia
border-2 border-success-pastel/20
bg-gradient-to-br from-success-pastel/5 via-success-pastel/3 to-transparent

// Si pérdida
border-2 border-destructive-pastel/20
bg-gradient-to-br from-destructive-pastel/5 via-destructive-pastel/3 to-transparent
```
- Color dinámico: `text-success-pastel` o `text-destructive-pastel`
- Icono: `TrendingUp` o `TrendingDown`
- Badge ROI: Con `Percent` icon

---

## 📈 Desglose de Origen de Fondos

```tsx
const fundOrigin = [
  { 
    source: 'Transferencias bancarias', 
    amount: 45000, 
    percentage: 69.2 
  },
  { 
    source: 'Origen de fondos declarado', 
    amount: 15000, 
    percentage: 23.1 
  },
  { 
    source: 'P2P verificado', 
    amount: 5000, 
    percentage: 7.7 
  },
];
```

### **Visualización:**
```
┌────────────────────────────────────────────────┐
│ Desglose de Capital Invertido                  │
├────────────────────────────────────────────────┤
│ • Transferencias bancarias    €45,000   69.2%  │
│ • Origen de fondos declarado  €15,000   23.1%  │
│ • P2P verificado              €5,000     7.7%  │
└────────────────────────────────────────────────┘
```

**Características:**
- ✅ Color dot diferente por fuente (info, purple, cyan)
- ✅ Animación stagger en entrada (Motion)
- ✅ Link "Ver transacciones →" para más detalles
- ✅ Respeta `isVisible` para ocultar valores

---

## 💡 Performance Indicator

### **Si Ganancia (Positivo):**
```tsx
<div className="bg-success-pastel/5 border-success-pastel/20">
  <ArrowUpRight className="text-success-pastel" />
  Tu portfolio ha generado un rendimiento positivo de €37,150 sobre 
  tu inversión inicial de €65,000, equivalente a un ROI del 57.15%.
</div>
```

### **Si Pérdida (Negativo):**
```tsx
<div className="bg-destructive-pastel/5 border-destructive-pastel/20">
  <ArrowDownRight className="text-destructive-pastel" />
  Tu portfolio refleja una pérdida de €12,500 sobre 
  tu inversión inicial de €65,000, equivalente a un ROI del -19.23%.
</div>
```

---

## 🔧 Integración en Dashboard

### **Archivo:** `/components/DashboardSection.tsx`

### **1. Import:**
```tsx
import InvestmentPerformance from './InvestmentPerformance';
```

### **2. Widget Configuration:**
```tsx
{
  id: 'investment-performance',
  name: 'Inversión y Rentabilidad',
  description: 'Capital invertido en fiat y rentabilidad total',
  enabled: true,
  order: 0 // PRIMERO - Antes de Balance Over Time
}
```

### **3. Render:**
```tsx
case 'investment-performance':
  return (
    <CollapsibleSection
      title={
        <div className="flex items-center gap-2">
          <span>Inversión y Rentabilidad</span>
          <InfoTooltip content="..." />
        </div>
      }
      description="Capital invertido y ROI total"
      defaultOpen={!allCollapsed}
    >
      <InvestmentPerformance isVisible={globalVisibility} />
    </CollapsibleSection>
  );
```

---

## 📊 Diferencia con Balance Over Time

### **Investment Performance:**
- ✅ Muestra **capital invertido en fiat**
- ✅ Muestra **rentabilidad total** (ganancia/pérdida)
- ✅ Muestra **ROI en porcentaje**
- ✅ Muestra **desglose de origen de fondos**
- ❌ **NO** muestra valor actual del portfolio

### **Balance Over Time:**
- ✅ Muestra **valor actual del portfolio**
- ✅ Muestra **gráfico de balance histórico**
- ✅ Muestra **cambio en periodo seleccionado**
- ❌ **NO** muestra inversión inicial
- ❌ **NO** muestra rentabilidad total

### **Complementariedad:**
```
Investment Performance:  €65,000 invertidos → +€37,150 (ROI +57.15%)
Balance Over Time:       Valor actual: €102,150
```

---

## 🎯 Casos de Uso

### **Caso 1: Usuario con ganancias**
```
Invertido: €50,000
Actual:    €85,000
Ganancia:  +€35,000
ROI:       +70.00%
```

**UI:**
```
┌────────────────────────────────────┐
│ Total Invertido (Fiat)             │
│ €50,000.00                         │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Rentabilidad Total                 │
│ +€35,000.00                        │
│ +70.00% ROI                        │
└────────────────────────────────────┘
```

---

### **Caso 2: Usuario con pérdidas**
```
Invertido: €100,000
Actual:    €75,000
Pérdida:   -€25,000
ROI:       -25.00%
```

**UI:**
```
┌────────────────────────────────────┐
│ Total Invertido (Fiat)             │
│ €100,000.00                        │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Rentabilidad Total                 │
│ -€25,000.00                        │
│ -25.00% ROI                        │
└────────────────────────────────────┘
```

---

### **Caso 3: Visibilidad oculta**
```tsx
isVisible = false
```

**UI:**
```
┌────────────────────────────────────┐
│ Total Invertido (Fiat)             │
│ €••••••                            │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Rentabilidad Total                 │
│ €••••••                            │
└────────────────────────────────────┘
```

---

## 🚀 Mejoras Futuras

### **1. Fuentes de Datos Reales**
```tsx
// Mock actual
const totalInvestedFiat = 65000;

// Implementación futura
const totalInvestedFiat = useMemo(() => {
  return bankTransactions
    .filter(tx => tx.type === 'deposit')
    .reduce((sum, tx) => sum + tx.amount, 0);
}, [bankTransactions]);
```

### **2. Histórico de Inversión**
- Gráfico de inversión acumulada en el tiempo
- Ver cuándo se hicieron las mayores inyecciones de capital
- Comparar con evolución del portfolio

### **3. Filtros Temporales**
```tsx
// Rentabilidad por periodo
- Todo el tiempo (actual)
- Último año
- Últimos 6 meses
- Último mes
```

### **4. Desglose Avanzado**
```tsx
// Expandir cada fuente de fondos
fundOrigin.map(source => ({
  ...source,
  transactions: [...], // Lista de transacciones
  dates: [...],        // Fechas de entrada
}))
```

### **5. Export Fiscal**
- Botón para exportar resumen a PDF
- Útil para declaración de impuestos
- Include desglose de origen de fondos

### **6. Comparación con Benchmarks**
```tsx
// Comparar ROI con:
- Bitcoin: +45%
- Ethereum: +38%
- S&P 500: +12%
```

---

## ✅ Checklist de Implementación

- [x] Componente `InvestmentPerformance.tsx` creado
- [x] Integrado en `DashboardSection.tsx`
- [x] Widget configuration añadido
- [x] Orden correcto (antes de Balance Over Time)
- [x] Tooltips informativos
- [x] Visibilidad global respetada
- [x] Diseño responsive (mobile + desktop)
- [x] Animaciones Motion
- [x] Estados positivo/negativo
- [x] Desglose de origen de fondos
- [x] Performance indicator
- [x] Documentación completa

---

## 📝 Notas Técnicas

### **Colores Utilizados**
- `info-pastel` (#60A5FA): Total invertido
- `success-pastel` (#34D399): Ganancias
- `destructive-pastel` (#F87171): Pérdidas
- `purple-pastel` (#C4B5FD): Origen de fondos secundario
- `cyan-pastel` (#67E8F9): P2P verificado

### **Iconos (Lucide React)**
- `Wallet`: Total invertido
- `TrendingUp`: Ganancias
- `TrendingDown`: Pérdidas
- `Percent`: ROI
- `ArrowUpRight`: Performance positiva
- `ArrowDownRight`: Performance negativa
- `Info`: Desglose

### **Animaciones**
```tsx
// Card principal
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Desglose items
initial={{ opacity: 0, x: -10 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: index * 0.1 }}
```

---

**Fecha de creación:** 18 de octubre de 2025  
**Versión:** 1.0  
**Componente:** `/components/InvestmentPerformance.tsx`  
**Ubicación:** Dashboard > Primera posición (antes de Balance Over Time)
