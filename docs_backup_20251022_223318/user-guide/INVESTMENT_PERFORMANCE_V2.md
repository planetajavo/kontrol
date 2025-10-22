# Investment Performance V2 - Métricas Expandibles

## 📋 Nuevas Características V2

### **Versión 2.0 - Octubre 2025**

Mejoras implementadas en el módulo de Inversión y Rentabilidad:

1. ✅ **Total Invertido expandible** con lista de transferencias bancarias
2. ✅ **Valor Actual expandible** con lista scrolleable de activos
3. ✅ **Rentabilidad expandible** con explicación de ROI y fórmula
4. ✅ **Grid de 3 columnas** en lugar de 2
5. ✅ **Listas compactas** con scroll (max 200px)
6. ✅ **Solo UNA métrica expandida a la vez** (mejor UX, menos scroll)

---

## 🎯 Cambios Principales

### **1. Total Invertido - Expandible**

**Antes:**
- Solo mostraba el total
- Desglose estático de origen de fondos

**Después:**
```tsx
✅ Click para expandir
✅ Lista de transferencias bancarias
✅ Detalles: Banco → Exchange
✅ Fecha y referencia SEPA
✅ Scroll si hay muchas transferencias
```

**Datos mostrados:**
```tsx
interface BankTransfer {
  id: string;
  date: string;        // '2023-01-15'
  bank: string;        // 'BBVA'
  exchange: string;    // 'Binance'
  amount: number;      // 15000
  reference: string;   // 'SEPA-2023-0015'
}
```

**Visual:**
```
┌──────────────────────────────────────┐
│ [Wallet] Total Invertido        [▼] │
│ €65,000                              │
│ 6 transferencias bancarias           │
├──────────────────────────────────────┤
│ [🏦] BBVA → Binance      €15,000    │
│      15/01/2023 • SEPA-2023-0015    │
│                                      │
│ [🏦] Santander → Kraken  €10,000    │
│      22/03/2023 • SEPA-2023-0089    │
│ ...                                  │
└──────────────────────────────────────┘
```

---

### **2. Valor Actual - Nueva Métrica Expandible**

**Nueva card añadida:**
```tsx
✅ Muestra el valor actual del portfolio
✅ Click para expandir
✅ Lista scrolleable de activos
✅ Detalles: Cantidad nativa + Valor EUR
✅ Porcentaje de portfolio
```

**Datos mostrados:**
```tsx
interface AssetHolding {
  symbol: string;      // 'BTC'
  name: string;        // 'Bitcoin'
  amount: number;      // 0.5234
  value: number;       // 45820
  percentage: number;  // 44.9
}
```

**Visual:**
```
┌──────────────────────────────────────┐
│ [PieChart] Valor Actual         [▼] │
│ €102,150                             │
│ 8 activos                            │
├──────────────────────────────────────┤
│ [₿] BTC             €45,820  44.9%  │
│     0.5234 BTC                       │
│                                      │
│ [Ξ] ETH             €28,500  27.9%  │
│     12.45 ETH                        │
│ ...                                  │
└──────────────────────────────────────┘
```

---

### **3. Rentabilidad - Expandible con Explicación ROI**

**Antes:**
- Mostraba ganancia y ROI
- Explicación en card separada abajo

**Después:**
```tsx
✅ Click para expandir
✅ Fórmula del ROI explicada
✅ Cálculo paso a paso
✅ Explicación contextual dentro de la card
```

**Visual colapsado:**
```
┌──────────────────────────────────────┐
│ [↗] Rentabilidad            [▼]     │
│ +€37,150                             │
│ [+57.15%] ROI                        │
└──────────────────────────────────────┘
```

**Visual expandido:**
```
┌──────────────────────────────────────┐
│ [↗] Rentabilidad            [▲]     │
│ +€37,150                             │
│ [+57.15%] ROI                        │
├──────────────────────────────────────┤
│ Cálculo del ROI:                     │
│ ROI = (Valor Actual - Inversión)    │
│       / Inversión × 100              │
│                                      │
│ = (€102,150 - €65,000)              │
│   / €65,000 × 100                    │
│ = +57.15%                            │
│                                      │
│ Tu portfolio ha generado un          │
│ rendimiento positivo de €37,150...   │
└──────────────────────────────────────┘
```

---

## 🏗️ Estructura del Layout

### **Grid de 3 Columnas**

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* 1. Total Invertido */}
  <MetricCard expandable />
  
  {/* 2. Valor Actual */}
  <MetricCard expandable />
  
  {/* 3. Rentabilidad */}
  <MetricCard expandable />
</div>
```

**Responsive:**
- Mobile: 1 columna (apiladas verticalmente)
- Desktop: 3 columnas (lado a lado)

---

## 🎨 Colores por Métrica

### **Total Invertido**
```tsx
border: info-pastel/20
background: gradient info-pastel/5 → info-pastel/3
text: info-pastel
icon: Wallet
decoration: info-pastel/10 blur
```

### **Valor Actual**
```tsx
border: purple-pastel/20
background: gradient purple-pastel/5 → purple-pastel/3
text: purple-pastel
icon: PieChart
decoration: purple-pastel/10 blur
```

### **Rentabilidad**
```tsx
// Si ganancia
border: success-pastel/20
background: gradient success-pastel/5 → success-pastel/3
text: success-pastel
icon: TrendingUp

// Si pérdida
border: destructive-pastel/20
background: gradient destructive-pastel/5 → destructive-pastel/3
text: destructive-pastel
icon: TrendingDown
```

---

## 📊 Estados de Expansión

### **State Management:**
```tsx
type ExpandedMetric = 'invested' | 'current' | 'profit' | null;

const [expandedMetric, setExpandedMetric] = useState<ExpandedMetric>(null);

const handleToggle = (metric: 'invested' | 'current' | 'profit') => {
  setExpandedMetric(prev => prev === metric ? null : metric);
};
```

### **Comportamiento de Expansión:**
- ✅ **Solo UNA métrica** puede estar expandida a la vez
- ✅ Al expandir una métrica, las otras se colapsan automáticamente
- ✅ Click en la métrica expandida la colapsa
- ✅ Más limpio y enfocado, evita scroll excesivo

### **Implementación de Botones:**
```tsx
<button
  type="button"
  onClick={() => handleToggle('invested')}
  className="w-full p-5 text-left hover:bg-black/5 transition-colors"
>
  {/* Contenido */}
</button>
```

**IMPORTANTE:** Los botones tienen `type="button"` para evitar comportamiento de formulario.

---

## 💡 Detalles de Implementación

### **1. Transferencias Bancarias**

**Lista scrolleable:**
```tsx
<div className="max-h-[200px] overflow-y-auto 
     scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
  {bankTransfers.map(transfer => (
    <div className="flex items-center justify-between">
      {/* Bank → Exchange */}
      <div className="flex items-center gap-2">
        <Building2 icon />
        <span>{transfer.bank}</span>
        <ArrowRight icon />
        <span>{transfer.exchange}</span>
      </div>
      
      {/* Date + Reference */}
      <div className="text-muted-foreground text-[10px]">
        {date} • {reference}
      </div>
      
      {/* Amount */}
      <span>€{amount}</span>
    </div>
  ))}
</div>
```

**Características:**
- ✅ Max height: 200px
- ✅ Scroll suave con custom scrollbar
- ✅ Hover effect en cada row
- ✅ Fecha formateada ES
- ✅ Referencia SEPA truncada si es muy larga

---

### **2. Lista de Activos**

**Lista scrolleable:**
```tsx
<div className="max-h-[200px] overflow-y-auto">
  {assetHoldings.map(asset => (
    <div className="flex items-center justify-between">
      {/* Icon + Symbol */}
      <div className="flex items-center gap-2">
        <CryptoIcon symbol={asset.symbol} size={16} />
        <div>
          <div>{asset.symbol}</div>
          <div className="text-[10px]">
            {asset.amount} {asset.symbol}
          </div>
        </div>
      </div>
      
      {/* Value + Percentage */}
      <div>
        <div>€{asset.value}</div>
        <div className="text-[10px]">{asset.percentage}%</div>
      </div>
    </div>
  ))}
</div>
```

**Características:**
- ✅ CryptoIcon integrado
- ✅ Cantidad nativa formateada (max 8 decimales)
- ✅ Valor EUR + porcentaje del portfolio
- ✅ Respeta isVisible para ocultar valores

---

### **3. Explicación ROI**

**Fórmula educativa:**
```tsx
<div className="bg-card/50 rounded-lg p-3">
  <div className="font-mono text-[10px]">
    ROI = (Valor Actual - Inversión) / Inversión × 100
    
    {isVisible && (
      <>
        = (€102,150 - €65,000) / €65,000 × 100
        = +57.15%
      </>
    )}
  </div>
</div>

<p className="text-xs">
  Tu portfolio ha generado un rendimiento positivo...
</p>
```

**Características:**
- ✅ Fórmula en font-mono
- ✅ Cálculo paso a paso
- ✅ Resultado destacado en color
- ✅ Explicación en lenguaje natural

---

## 🎯 Animaciones

### **ChevronDown Rotation:**
```tsx
<motion.div
  animate={{ rotate: expanded ? 180 : 0 }}
  transition={{ duration: 0.2 }}
>
  <ChevronDown />
</motion.div>
```

### **Expand/Collapse:**
```tsx
<AnimatePresence>
  {expanded && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Content */}
    </motion.div>
  )}
</AnimatePresence>
```

**Duración:** 200ms para todas las animaciones
**Easing:** Default ease de Motion (suave)

---

## 📱 Responsive Design

### **Mobile (< 768px):**
```
┌─────────────────────┐
│ Total Invertido     │
│ €65,000             │
└─────────────────────┘

┌─────────────────────┐
│ Valor Actual        │
│ €102,150            │
└─────────────────────┘

┌─────────────────────┐
│ Rentabilidad        │
│ +€37,150            │
└─────────────────────┘
```

### **Desktop (≥ 768px):**
```
┌─────────────┬─────────────┬─────────────┐
│ Total       │ Valor       │ Rentabili-  │
│ Invertido   │ Actual      │ dad         │
│ €65,000     │ €102,150    │ +€37,150    │
└─────────────┴─────────────┴─────────────┘
```

---

## 🔧 Troubleshooting

### **Problema: Las 3 métricas se expanden/colapsan a la vez**

**Solución implementada:**
```tsx
// ❌ INCORRECTO - Estados separados
const [investedExpanded, setInvestedExpanded] = useState(false);
const [currentValueExpanded, setCurrentValueExpanded] = useState(false);
const [profitExpanded, setProfitExpanded] = useState(false);

// ✅ CORRECTO - Estado único con tipo union
type ExpandedMetric = 'invested' | 'current' | 'profit' | null;
const [expandedMetric, setExpandedMetric] = useState<ExpandedMetric>(null);

// Handler limpio
const handleToggle = (metric: 'invested' | 'current' | 'profit') => {
  setExpandedMetric(prev => prev === metric ? null : metric);
};
```

**Clave del éxito:**
- ✅ `AnimatePresence mode="wait"` - Espera a que termine la animación de salida
- ✅ `key` única para cada expansión (`"invested-details"`, `"current-details"`, `"profit-details"`)
- ✅ `overflow-hidden` en el contenedor de la animación
- ✅ `type="button"` en los botones para evitar submit de formulario

### **Verificación:**
```tsx
// Cada AnimatePresence debe tener:
<AnimatePresence mode="wait">
  {expandedMetric === 'invested' && (
    <motion.div key="invested-details" {...}>
      {/* Contenido */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 🔍 Casos de Uso

### **Caso 1: Usuario quiere ver de dónde viene su capital**

1. Click en "Total Invertido"
2. Se expande mostrando 6 transferencias bancarias
3. Ve: BBVA → Binance €15,000, etc.
4. Puede scrollear si hay más de 5-6 transferencias

---

### **Caso 2: Usuario quiere ver composición actual**

1. Click en "Valor Actual"
2. Se expande mostrando 8 activos
3. Ve: BTC €45,820 (44.9%), ETH €28,500 (27.9%), etc.
4. Puede scrollear la lista de activos

---

### **Caso 3: Usuario quiere entender el ROI**

1. Click en "Rentabilidad"
2. Se expande mostrando la fórmula
3. Ve el cálculo paso a paso
4. Lee la explicación contextual

---

### **Caso 4: Usuario cambia entre métricas**

1. Click en "Total Invertido" → Se expande
2. Click en "Valor Actual" → "Total Invertido" se colapsa, "Valor Actual" se expande
3. Click en "Rentabilidad" → "Valor Actual" se colapsa, "Rentabilidad" se expande
4. Solo una métrica expandida a la vez para mejor enfoque

---

## ✅ Mejoras sobre V1

| Aspecto | V1 | V2 |
|---------|----|----|
| **Total Invertido** | Solo total | ✅ Expandible con transferencias |
| **Valor Actual** | ❌ No existía | ✅ Nueva métrica expandible |
| **Rentabilidad** | Solo total + ROI | ✅ Expandible con fórmula |
| **Explicación ROI** | Card separada | ✅ Dentro de Rentabilidad |
| **Desglose fondos** | Card separada | ✅ Dentro de Total Invertido |
| **Activos** | ❌ No existía | ✅ Lista scrolleable |
| **Columnas** | 2 | ✅ 3 (más compacto) |
| **Interactividad** | Estático | ✅ Click para expandir |

---

## 🚀 Próximas Mejoras

1. **Filtros en transferencias:**
   - Por banco
   - Por exchange
   - Por fecha

2. **Ordenamiento de activos:**
   - Por valor
   - Por porcentaje
   - Por cantidad

3. **Export de datos:**
   - PDF con transferencias
   - CSV para Excel
   - Útil para declaración fiscal

4. **Gráfico de evolución:**
   - Línea temporal de inversión acumulada
   - Comparar con valor del portfolio

5. **Búsqueda:**
   - Buscar transferencia por referencia
   - Buscar activo por símbolo

6. **Estado persistente:**
   - Recordar qué métricas están expandidas
   - LocalStorage

---

## 📝 Código Clave

### **Toggle Expansion (Solo una a la vez):**
```tsx
// Botón con handler limpio
<button
  type="button"
  onClick={() => handleToggle('invested')}
  className="w-full p-5 text-left hover:bg-black/5 transition-colors"
>
  {/* Content */}
</button>

// Chevron animado
<motion.div
  animate={{ rotate: expandedMetric === 'invested' ? 180 : 0 }}
  transition={{ duration: 0.2 }}
>
  <ChevronDown className="w-4 h-4 text-info-pastel" />
</motion.div>

// AnimatePresence con mode="wait" y key única
<AnimatePresence mode="wait">
  {expandedMetric === 'invested' && (
    <motion.div
      key="invested-details"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-info-pastel/20 overflow-hidden"
    >
      {/* Lista de transferencias */}
    </motion.div>
  )}
</AnimatePresence>
```

### **Scrolleable List:**
```tsx
<div className="max-h-[200px] overflow-y-auto 
     scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
  <div className="space-y-1.5">
    {items.map(item => (
      <div className="py-2 px-2 bg-card/50 rounded 
           hover:bg-card/70 transition-colors">
        {/* Item content */}
      </div>
    ))}
  </div>
</div>
```

### **ROI Formula:**
```tsx
<div className="font-mono text-[10px] space-y-1">
  <div>ROI = (Valor Actual - Inversión) / Inversión × 100</div>
  {isVisible && (
    <>
      <div className="text-muted-foreground">
        = (€{currentValue} - €{invested}) / €{invested} × 100
      </div>
      <div className={isProfit ? 'text-success-pastel' : 'text-destructive-pastel'}>
        = {roi}%
      </div>
    </>
  )}
</div>
```

---

**Última actualización:** 18 de octubre de 2025  
**Versión:** 2.0  
**Componente:** `/components/InvestmentPerformance.tsx`  
**Cambios:** Métricas expandibles, nueva card Valor Actual, ROI explicado
