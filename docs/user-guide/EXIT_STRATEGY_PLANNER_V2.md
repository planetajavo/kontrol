# 📊 Exit Strategy Planner V2 - Simulador Interactivo de Ventas

## Overview
**Exit Strategy Planner** completamente reconstruido con funcionalidad interactiva de tabla editable. Permite simular múltiples ventas de activos crypto, calcular impuestos en tiempo real, y obtener el total neto tras impuestos.

---

## 🔄 Cambios Implementados

### ❌ **V1 Eliminada**

#### **Funcionalidad Anterior (ELIMINADA)**
```tsx
// ❌ ANTES - Botones de porcentaje estáticos
<div className="grid grid-cols-4 gap-2">
  {[25, 50, 75, 100].map((percentage) => (
    <button onClick={() => handleSellPercentage(asset.id, percentage)}>
      {percentage}%
    </button>
  ))}
</div>
```

**Problemas:**
- ❌ No permitía edición libre de cantidad
- ❌ No permitía configurar precio objetivo
- ❌ Solo mostraba impacto fiscal total
- ❌ No mostraba cálculo detallado por venta
- ❌ No había tabla editable

---

### ✅ **V2 Implementada**

#### **Nueva Funcionalidad**

**Características principales:**
- ✅ **Selector de activos** - Dropdown con todos los activos disponibles
- ✅ **Botón "Simular Venta"** - Añade nueva fila a la tabla
- ✅ **Tabla editable** - Campos Quantity y Target Price editables
- ✅ **Cálculo automático** - Gross Income, Taxes, Net After Taxes
- ✅ **Resumen total** - Footer con sumas de todos los campos
- ✅ **Eliminar simulaciones** - Botón delete por fila

---

## 📐 Estructura del Componente

### **1. State Management**

```tsx
// Simulated sales
const [simulatedSales, setSimulatedSales] = useState<SimulatedSale[]>([]);

// Selected asset for dropdown
const [selectedAsset, setSelectedAsset] = useState<string>('BTC');

// Interface
interface SimulatedSale {
  id: string;
  asset: string;
  quantity: number;
  targetPrice: number;
  buyPrice: number; // From portfolio data
}
```

**Estado:**
- `simulatedSales` - Array de todas las ventas simuladas
- `selectedAsset` - Asset actualmente seleccionado en dropdown
- Cada sale tiene: id, asset, quantity (editable), targetPrice (editable), buyPrice (fijo)

---

### **2. Available Assets (Mock Data)**

```tsx
const availableAssets = [
  { symbol: 'BTC', name: 'Bitcoin', available: 0.5, buyPrice: 60000 },
  { symbol: 'ETH', name: 'Ethereum', available: 2.5, buyPrice: 3200 },
  { symbol: 'SOL', name: 'Solana', available: 50, buyPrice: 140 },
  { symbol: 'ADA', name: 'Cardano', available: 1000, buyPrice: 0.45 },
  { symbol: 'MATIC', name: 'Polygon', available: 500, buyPrice: 0.85 },
];
```

**Datos por asset:**
- `symbol` - Ticker del asset (BTC, ETH, etc.)
- `name` - Nombre completo
- `available` - Cantidad disponible en portfolio
- `buyPrice` - Precio promedio de compra (para calcular profit)

---

### **3. Calculation Functions**

#### **Calculate Profit/Loss**

```tsx
const calculateProfit = (sale: SimulatedSale) => {
  const grossIncome = sale.quantity * sale.targetPrice;
  const cost = sale.quantity * sale.buyPrice;
  return grossIncome - cost;
};
```

**Fórmula:**
- Profit = (Quantity × Target Price) - (Quantity × Buy Price)
- Si positivo: ganancia → se aplican impuestos
- Si negativo: pérdida → impuestos = 0

---

#### **Calculate Tax**

```tsx
const calculateTax = (profit: number) => {
  if (profit <= 0) return 0;
  const { totalTax } = calculateTaxByBrackets(profit);
  return totalTax;
};
```

**Lógica:**
- Solo aplica impuestos si hay ganancia (profit > 0)
- Usa la función `calculateTaxByBrackets` existente
- Aplica tramos IRPF: 19%, 24%, 30%, 37%, 45%, 47%

---

### **4. CRUD Operations**

#### **Add Simulated Sale**

```tsx
const handleAddSimulatedSale = () => {
  const asset = availableAssets.find(a => a.symbol === selectedAsset);
  if (!asset) return;

  const newSale: SimulatedSale = {
    id: Date.now().toString(),
    asset: selectedAsset,
    quantity: 0,
    targetPrice: 0,
    buyPrice: asset.buyPrice,
  };

  setSimulatedSales([...simulatedSales, newSale]);
};
```

**Proceso:**
1. Busca el asset seleccionado en availableAssets
2. Crea nuevo objeto SimulatedSale con valores iniciales (0)
3. Añade al array de simulatedSales
4. Nueva fila aparece en la tabla

---

#### **Update Quantity**

```tsx
const handleUpdateQuantity = (id: string, value: string) => {
  const numValue = parseFloat(value) || 0;
  setSimulatedSales(simulatedSales.map(sale => 
    sale.id === id ? { ...sale, quantity: numValue } : sale
  ));
};
```

**Proceso:**
1. Convierte string a number
2. Actualiza solo la sale con el id matching
3. Recalcula automáticamente gross income, taxes, net

---

#### **Update Target Price**

```tsx
const handleUpdateTargetPrice = (id: string, value: string) => {
  const numValue = parseFloat(value) || 0;
  setSimulatedSales(simulatedSales.map(sale => 
    sale.id === id ? { ...sale, targetPrice: numValue } : sale
  ));
};
```

**Similar a quantity:**
- Actualiza targetPrice
- Reactivo - recalcula todo automáticamente

---

#### **Remove Sale**

```tsx
const handleRemoveSale = (id: string) => {
  setSimulatedSales(simulatedSales.filter(sale => sale.id !== id));
};
```

**Proceso:**
- Filtra el array eliminando la sale con ese id
- Tabla se actualiza automáticamente
- Totals se recalculan

---

### **5. Totals Calculation**

```tsx
const totals = simulatedSales.reduce((acc, sale) => {
  const grossIncome = sale.quantity * sale.targetPrice;
  const profit = calculateProfit(sale);
  const tax = calculateTax(profit);
  const netAfterTaxes = grossIncome - tax;

  return {
    grossIncome: acc.grossIncome + grossIncome,
    totalProfit: acc.totalProfit + profit,
    totalTaxes: acc.totalTaxes + tax,
    netAfterTaxes: acc.netAfterTaxes + netAfterTaxes,
  };
}, { grossIncome: 0, totalProfit: 0, totalTaxes: 0, netAfterTaxes: 0 });
```

**Totals calculados:**
- `grossIncome` - Suma de todos los ingresos brutos
- `totalProfit` - Suma de todas las ganancias/pérdidas
- `totalTaxes` - Suma de todos los impuestos
- `netAfterTaxes` - Suma de todos los netos tras impuestos

**Actualización:**
- Se recalcula automáticamente cada vez que cambia `simulatedSales`
- React detecta cambios y re-renderiza

---

## 🎨 UI Components

### **1. Add Simulation Controls**

```tsx
<div className="bg-card rounded-xl border border-border p-4">
  <div className="flex items-end gap-3">
    {/* Asset Selector */}
    <div className="flex-1">
      <label className="text-sm text-muted-foreground mb-2 block">
        Selecciona activo
      </label>
      <Select value={selectedAsset} onValueChange={setSelectedAsset}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableAssets.map((asset) => (
            <SelectItem key={asset.symbol} value={asset.symbol}>
              <div className="flex items-center gap-2">
                <CryptoIcon symbol={asset.symbol.toLowerCase()} size={20} />
                <span>{asset.symbol}</span>
                <span className="text-muted-foreground text-sm">
                  • {asset.available} disponibles
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    
    {/* Add Button */}
    <Button onClick={handleAddSimulatedSale} className="gap-2">
      <Plus className="w-4 h-4" />
      Simular Venta
    </Button>
  </div>
</div>
```

**Features:**
- ✅ Dropdown con CryptoIcon para cada asset
- ✅ Muestra cantidad disponible
- ✅ Botón con icono Plus
- ✅ Layout responsive (flex-1 + button)

---

### **2. Table Header**

```tsx
<div className="bg-muted/30 border-b border-border px-4 py-3">
  <div className="grid grid-cols-12 gap-3 text-sm text-muted-foreground">
    <div className="col-span-2">Asset</div>
    <div className="col-span-2">Cantidad</div>
    <div className="col-span-2">Precio Objetivo</div>
    <div className="col-span-2">Ingresos Brutos</div>
    <div className="col-span-2">Impuestos</div>
    <div className="col-span-2">Neto Tras Impuestos</div>
  </div>
</div>
```

**Layout:**
- Grid 12 columns
- Background muted
- Text muted-foreground
- Border bottom

**Columns:**
1. **Asset** (2 cols) - Icon + Symbol
2. **Cantidad** (2 cols) - Editable input
3. **Precio Objetivo** (2 cols) - Editable input
4. **Ingresos Brutos** (2 cols) - Calculado
5. **Impuestos** (2 cols) - Calculado
6. **Neto Tras Impuestos** (2 cols) - Calculado

---

### **3. Table Row (Editable)**

```tsx
<div className="px-4 py-3 hover:bg-muted/20 transition-colors">
  <div className="grid grid-cols-12 gap-3 items-center">
    {/* Asset */}
    <div className="col-span-2">
      <div className="flex items-center gap-2">
        <CryptoIcon symbol={sale.asset.toLowerCase()} size={24} />
        <span className="font-medium">{sale.asset}</span>
      </div>
    </div>

    {/* Quantity (Editable) */}
    <div className="col-span-2">
      <Input
        type="number"
        value={sale.quantity || ''}
        onChange={(e) => handleUpdateQuantity(sale.id, e.target.value)}
        placeholder="0.00"
        className="h-9"
        step="0.0001"
        min="0"
        max={asset?.available}
      />
    </div>

    {/* Target Price (Editable) */}
    <div className="col-span-2">
      <Input
        type="number"
        value={sale.targetPrice || ''}
        onChange={(e) => handleUpdateTargetPrice(sale.id, e.target.value)}
        placeholder="0.00"
        className="h-9"
        step="0.01"
        min="0"
      />
    </div>

    {/* Gross Income (Calculated) */}
    <div className="col-span-2">
      <div className="text-sm">
        €{grossIncome.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>

    {/* Taxes (Calculated) */}
    <div className="col-span-2">
      <div className={`text-sm ${profit > 0 ? 'text-destructive-pastel' : 'text-success-pastel'}`}>
        {profit > 0 ? '-' : ''}€{tax.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>

    {/* Net After Taxes (Calculated) */}
    <div className="col-span-1">
      <div className={`font-semibold ${profit > 0 ? 'text-success-pastel' : 'text-foreground'}`}>
        €{netAfterTaxes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>

    {/* Delete Button */}
    <div className="col-span-1 flex justify-end">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleRemoveSale(sale.id)}
        className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive-pastel"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  </div>
</div>
```

**Features:**
- ✅ **Hover effect** - bg-muted/20
- ✅ **Editable inputs** - Quantity y Target Price
- ✅ **Validation** - min/max en inputs
- ✅ **Color coding** - Rojo para taxes, verde para net
- ✅ **Delete button** - Ghost button con hover destructive

---

### **4. Table Footer (Totals)**

```tsx
<div className="bg-primary/5 border-t-2 border-primary/30 px-4 py-4">
  <div className="grid grid-cols-12 gap-3 items-center">
    <div className="col-span-6 font-semibold text-foreground">
      Totales
    </div>
    <div className="col-span-2">
      <div className="text-sm font-medium text-foreground">
        €{totals.grossIncome.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <div className="text-xs text-muted-foreground">Ingresos brutos</div>
    </div>
    <div className="col-span-2">
      <div className="text-sm font-medium text-destructive-pastel">
        -€{totals.totalTaxes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <div className="text-xs text-muted-foreground">Impuestos</div>
    </div>
    <div className="col-span-2">
      <div className="font-semibold text-success-pastel">
        €{totals.netAfterTaxes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <div className="text-xs text-muted-foreground">Total neto</div>
    </div>
  </div>
</div>
```

**Features:**
- ✅ **Background destacado** - bg-primary/5
- ✅ **Border superior fuerte** - border-t-2 border-primary/30
- ✅ **Color coding** - Destructive para taxes, Success para net
- ✅ **Labels** - Texto pequeño bajo cada total

---

### **5. Empty State**

```tsx
{simulatedSales.length === 0 && (
  <div className="bg-card rounded-xl border border-border p-8 text-center">
    <div className="text-muted-foreground mb-2">
      No hay simulaciones activas
    </div>
    <div className="text-sm text-muted-foreground">
      Selecciona un activo y haz clic en "Simular Venta" para comenzar
    </div>
  </div>
)}
```

**Features:**
- ✅ Centered text
- ✅ Padding generoso
- ✅ Instrucciones claras

---

## 📊 Ejemplo de Uso

### **Escenario: Usuario simula venta de BTC y ETH**

#### **Paso 1: Añadir primera simulación (BTC)**

```
1. Usuario selecciona "BTC" en dropdown
2. Click en "Simular Venta"
3. Nueva fila aparece:
   - Asset: BTC
   - Quantity: [input vacío]
   - Target Price: [input vacío]
   - Gross Income: €0.00
   - Taxes: €0.00
   - Net After Taxes: €0.00
```

---

#### **Paso 2: Editar campos**

```
Usuario ingresa:
- Quantity: 0.25
- Target Price: 70000

Cálculos automáticos:
- Buy Price (portfolio): 60000
- Gross Income: 0.25 × 70000 = €17,500
- Cost: 0.25 × 60000 = €15,000
- Profit: 17500 - 15000 = €2,500
- Tax (19% primer tramo): €475
- Net After Taxes: 17500 - 475 = €17,025
```

**Tabla actualizada:**
```
Asset | Quantity | Target Price | Gross Income | Taxes    | Net After Taxes
------|----------|--------------|--------------|----------|----------------
BTC   | 0.25     | €70,000      | €17,500.00   | -€475.00 | €17,025.00
```

---

#### **Paso 3: Añadir segunda simulación (ETH)**

```
1. Usuario selecciona "ETH"
2. Click en "Simular Venta"
3. Usuario ingresa:
   - Quantity: 1.5
   - Target Price: 4000

Cálculos:
- Buy Price: 3200
- Gross Income: 1.5 × 4000 = €6,000
- Cost: 1.5 × 3200 = €4,800
- Profit: 6000 - 4800 = €1,200
- Tax: €228 (19%)
- Net: 6000 - 228 = €5,772
```

**Tabla completa:**
```
Asset | Quantity | Target Price | Gross Income | Taxes    | Net After Taxes
------|----------|--------------|--------------|----------|----------------
BTC   | 0.25     | €70,000      | €17,500.00   | -€475.00 | €17,025.00
ETH   | 1.5      | €4,000       | €6,000.00    | -€228.00 | €5,772.00
------|----------|--------------|--------------|----------|----------------
Totales                         | €23,500.00   | -€703.00 | €22,797.00
```

---

#### **Paso 4: Ver totales**

**Footer automático:**
```
Totales:
├── Ingresos brutos: €23,500.00
├── Impuestos:       -€703.00
└── Total neto:      €22,797.00
```

---

## 🎯 Funcionalidades Clave

### **1. Edición en Tiempo Real**

**Cada vez que usuario edita un campo:**
```tsx
// User types in quantity input
onChange={(e) => handleUpdateQuantity(sale.id, e.target.value)}

// State updates
setSimulatedSales(...)

// React re-renders
// Calculations run automatically:
const grossIncome = sale.quantity * sale.targetPrice;
const profit = calculateProfit(sale);
const tax = calculateTax(profit);
const netAfterTaxes = grossIncome - tax;

// Totals recalculate
const totals = simulatedSales.reduce(...)

// UI updates instantly
```

**No hay botones "Calcular" o "Actualizar" - todo es reactivo.**

---

### **2. Validación de Inputs**

```tsx
<Input
  type="number"
  min="0"
  max={asset?.available}
  step="0.0001"
/>
```

**Validaciones:**
- ✅ Solo números positivos (min="0")
- ✅ No puede vender más de lo disponible (max={available})
- ✅ Permite decimales precisos (step="0.0001")
- ⚠️ **TODO:** Añadir validación visual si excede available

---

### **3. Cálculo de Impuestos por Tramos**

**Usa la función `calculateTaxByBrackets` existente:**

```tsx
// Ejemplo: Profit de €15,000
Tramo 1 (0-12,450): 12,450 × 19% = €2,365.50
Tramo 2 (12,451-20,200): 2,550 × 24% = €612.00
Total: €2,977.50
```

**Esto asegura:**
- ✅ Cálculos precisos según IRPF España
- ✅ Consistencia con "Fiscalidad Pendiente"
- ✅ Escalamiento progresivo de impuestos

---

### **4. Color Coding Inteligente**

```tsx
{/* Taxes - Red if profit, Green if loss */}
<div className={`text-sm ${profit > 0 ? 'text-destructive-pastel' : 'text-success-pastel'}`}>
  {profit > 0 ? '-' : ''}€{tax.toLocaleString(...)}
</div>

{/* Net - Green if profit, Normal if loss */}
<div className={`font-semibold ${profit > 0 ? 'text-success-pastel' : 'text-foreground'}`}>
  €{netAfterTaxes.toLocaleString(...)}
</div>
```

**Lógica:**
- **Profit > 0** (ganancia):
  - Taxes en rojo (destructive-pastel)
  - Net en verde (success-pastel)
- **Profit < 0** (pérdida):
  - Taxes en verde (no hay impuestos)
  - Net en color normal

---

## 📱 Responsive Design

### **Current: Desktop Only (Grid cols-12)**

**Grid breakdown:**
```
Total: 12 columns
├── Asset: 2 cols
├── Quantity: 2 cols
├── Target Price: 2 cols
├── Gross Income: 2 cols
├── Taxes: 2 cols
├── Net: 1 col
└── Delete: 1 col
```

---

### **TODO: Mobile Responsive**

**Opción 1: Stacked Layout**
```tsx
// Mobile: Stack all fields vertically
<div className="flex flex-col gap-3">
  <div>Asset</div>
  <div>Quantity</div>
  <div>Target Price</div>
  <div>Gross Income</div>
  <div>Taxes</div>
  <div>Net</div>
</div>
```

**Opción 2: Horizontal Scroll**
```tsx
<div className="overflow-x-auto">
  <div className="min-w-[800px]">
    {/* Grid table */}
  </div>
</div>
```

**Opción 3: Card Layout**
```tsx
// Mobile: Card per sale
<div className="bg-card rounded-xl p-4 space-y-3">
  <div className="flex items-center gap-2">
    <CryptoIcon /> BTC
  </div>
  <div className="grid grid-cols-2 gap-3">
    <div>
      <label>Cantidad</label>
      <Input />
    </div>
    <div>
      <label>Precio</label>
      <Input />
    </div>
  </div>
  <div className="border-t pt-3">
    <div>Neto: €17,025</div>
  </div>
</div>
```

---

## 🔮 Mejoras Futuras

### **1. Guardar Escenarios**

```tsx
interface SavedScenario {
  id: string;
  name: string;
  date: string;
  sales: SimulatedSale[];
  totals: Totals;
}

const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);

const handleSaveScenario = () => {
  const scenario: SavedScenario = {
    id: Date.now().toString(),
    name: `Escenario ${savedScenarios.length + 1}`,
    date: new Date().toISOString(),
    sales: simulatedSales,
    totals: totals,
  };
  
  setSavedScenarios([...savedScenarios, scenario]);
};
```

**UI:**
```tsx
<CollapsibleSection title="Escenarios Guardados">
  {savedScenarios.map(scenario => (
    <div key={scenario.id} className="bg-card p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <div>{scenario.name}</div>
          <div className="text-sm text-muted-foreground">{scenario.date}</div>
        </div>
        <Button onClick={() => loadScenario(scenario)}>Cargar</Button>
      </div>
    </div>
  ))}
</CollapsibleSection>
```

---

### **2. Comparación de Escenarios**

```tsx
<div className="grid grid-cols-2 gap-4">
  <div className="bg-card p-4 rounded-xl">
    <h4>Escenario A</h4>
    <div>Total neto: €22,797</div>
    <div>Impuestos: €703</div>
  </div>
  <div className="bg-success-pastel/10 p-4 rounded-xl border-2 border-success-pastel">
    <h4>Escenario B ✓</h4>
    <div>Total neto: €24,150</div>
    <div>Impuestos: €550</div>
    <Badge>Mejor opción</Badge>
  </div>
</div>
```

---

### **3. Optimización Fiscal Automática**

```tsx
const optimizeTaxes = () => {
  // Algoritmo que sugiere ventas que minimizan impuestos
  // Considerando:
  // - Vender assets con pérdidas para compensar
  // - Distribuir ventas en diferentes años fiscales
  // - Aprovechar tramos inferiores
};

<Button onClick={optimizeTaxes}>
  <Sparkles className="w-4 h-4" />
  Optimizar impuestos
</Button>
```

---

### **4. Export a Excel/PDF**

```tsx
const exportToExcel = () => {
  // Genera Excel con:
  // - Tabla de simulaciones
  // - Totales
  // - Cálculos de impuestos por tramo
  // - Gráficos
};

<Button onClick={exportToExcel}>
  <Download className="w-4 h-4" />
  Exportar a Excel
</Button>
```

---

### **5. Integración con Portfolio Real**

```tsx
// Instead of mock data
const availableAssets = [
  { symbol: 'BTC', available: 0.5, buyPrice: 60000 },
  // ...
];

// Use real portfolio data
const availableAssets = usePortfolio(); // Custom hook

// This would pull from:
// - My Assets section
// - Real-time prices
// - Actual buy prices (FIFO/LIFO)
```

---

### **6. Price Suggestions**

```tsx
<div className="flex items-center gap-2">
  <Input
    type="number"
    value={sale.targetPrice}
    onChange={...}
  />
  <Button
    variant="ghost"
    size="sm"
    onClick={() => handleUpdateTargetPrice(sale.id, currentMarketPrice.toString())}
    title="Usar precio actual de mercado"
  >
    <TrendingUp className="w-4 h-4" />
  </Button>
</div>
```

**Sugerencias:**
- Precio actual de mercado
- Precio promedio últimos 7 días
- Precio objetivo basado en análisis técnico

---

### **7. Timeline de Ventas**

```tsx
<div className="space-y-2">
  <label>Fecha planeada</label>
  <Input type="date" />
  
  <div className="text-sm text-muted-foreground">
    Vender antes de 31/12/2025 para incluir en declaración 2025
  </div>
</div>
```

**Features:**
- Permite planear ventas en fechas específicas
- Muestra en qué año fiscal caerá
- Calendar view de todas las ventas planeadas

---

### **8. Alerts y Notifications**

```tsx
{sale.quantity > asset.available && (
  <div className="text-xs text-destructive-pastel mt-1">
    ⚠️ Solo tienes {asset.available} {asset.symbol} disponibles
  </div>
)}

{profit < 0 && (
  <div className="text-xs text-warning-pastel mt-1">
    ℹ️ Esta venta generará una pérdida de €{Math.abs(profit).toFixed(2)}
  </div>
)}
```

---

## 🎨 Estándares de UI

### **Seguidos en esta implementación:**

✅ **Cards:** `bg-card` + `border border-border`  
✅ **Buttons:** Componente `<Button>` de shadcn  
✅ **Inputs:** Componente `<Input>` de shadcn  
✅ **Select:** Componente `<Select>` de shadcn  
✅ **Spacing:** `space-y-4` consistente  
✅ **Colors:** Paleta pastel (success, destructive, warning, info)  
✅ **Hover:** `hover:bg-muted/20`, `hover:shadow-md`  
✅ **Typography:** Sin clases text-* (usa defaults de globals.css)

---

## 🧪 Testing Scenarios

### **Manual Testing Checklist**

- [ ] **Add simulation** - Botón "Simular Venta" añade nueva fila
- [ ] **Edit quantity** - Input quantity actualiza cálculos
- [ ] **Edit target price** - Input target price actualiza cálculos
- [ ] **Calculations** - Gross income, taxes, net son correctos
- [ ] **Totals** - Footer suma correctamente todas las filas
- [ ] **Delete** - Botón delete elimina fila y recalcula totals
- [ ] **Color coding** - Colores correctos según profit/loss
- [ ] **Validation** - No permite cantidad > available
- [ ] **Empty state** - Muestra mensaje cuando no hay simulaciones
- [ ] **Multiple assets** - Permite simular diferentes assets
- [ ] **Badge** - Muestra count de simulaciones
- [ ] **Responsive** - (TODO) Funciona en mobile

---

### **Edge Cases**

#### **1. Quantity = 0 o Target Price = 0**
```tsx
// Current behavior: Shows €0.00
// Expected: Maybe show validation message
```

#### **2. Loss-making sale (negative profit)**
```tsx
// Current: tax = 0, correct ✓
// Color: Should show in different color
```

#### **3. Very large numbers**
```tsx
// Test: quantity = 1000, targetPrice = 100000
// Expected: Totals format correctly with thousand separators
```

#### **4. Decimal precision**
```tsx
// quantity = 0.123456789
// Should: Round to 4 decimals? Or allow all?
```

---

## 📊 Calculation Examples

### **Example 1: Single BTC Sale (Profit)**

**Input:**
```
Asset: BTC
Quantity: 0.5
Buy Price: 60,000 (from portfolio)
Target Price: 70,000
```

**Calculations:**
```
Gross Income = 0.5 × 70,000 = €35,000
Cost = 0.5 × 60,000 = €30,000
Profit = 35,000 - 30,000 = €5,000

Tax (using brackets):
- First €5,000 at 19% = €950

Net After Taxes = 35,000 - 950 = €34,050
```

---

### **Example 2: Multiple Sales (Mixed)**

**Input:**
```
Sale 1: BTC
- Quantity: 0.5
- Target Price: 70,000
- Buy Price: 60,000

Sale 2: ETH
- Quantity: 2.5
- Target Price: 3,000
- Buy Price: 3,500
```

**Calculations:**
```
Sale 1:
- Gross: 0.5 × 70,000 = €35,000
- Cost: 0.5 × 60,000 = €30,000
- Profit: €5,000
- Tax: €950
- Net: €34,050

Sale 2:
- Gross: 2.5 × 3,000 = €7,500
- Cost: 2.5 × 3,500 = €8,750
- Profit: -€1,250 (LOSS)
- Tax: €0 (no tax on losses)
- Net: €7,500

Totals:
- Gross Income: 35,000 + 7,500 = €42,500
- Total Profit: 5,000 + (-1,250) = €3,750
- Total Taxes: 950 + 0 = €950
- Net After Taxes: 34,050 + 7,500 = €41,550
```

**Note:** En la realidad fiscal, la pérdida de €1,250 podría compensar parte de la ganancia de €5,000, resultando en menos impuestos. Esto requeriría lógica más compleja de compensación de pérdidas.

---

## ✅ Checklist de Implementación

- [x] **Interface SimulatedSale** definida
- [x] **State management** (simulatedSales, selectedAsset)
- [x] **Available assets** mock data
- [x] **Calculation functions** (profit, tax)
- [x] **CRUD operations** (add, update, delete)
- [x] **Totals calculation** con reduce
- [x] **UI Controls** (Select + Button)
- [x] **Table Header** con grid
- [x] **Table Rows** editables
- [x] **Table Footer** con totals
- [x] **Empty State** 
- [x] **Color coding** condicional
- [x] **Badge** con count
- [ ] **Responsive mobile** (TODO)
- [ ] **Validation visual** (TODO)
- [ ] **Save scenarios** (TODO)
- [ ] **Export** functionality (TODO)

---

## 📖 Archivos Modificados

### **TaxFiscalSection.tsx**

**Imports añadidos:**
```tsx
import { Plus, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CryptoIcon } from './CryptoIcon';
```

**Interface añadida:**
```tsx
interface SimulatedSale {
  id: string;
  asset: string;
  quantity: number;
  targetPrice: number;
  buyPrice: number;
}
```

**State añadido:**
```tsx
const [simulatedSales, setSimulatedSales] = useState<SimulatedSale[]>([]);
const [selectedAsset, setSelectedAsset] = useState<string>('BTC');
```

**Functions añadidas:**
- `calculateProfit()`
- `calculateTax()`
- `handleAddSimulatedSale()`
- `handleUpdateQuantity()`
- `handleUpdateTargetPrice()`
- `handleRemoveSale()`

**Sección Exit Strategy Planner:** Completamente reescrita

---

**Last Updated:** October 18, 2025  
**Status:** ✅ Implemented - V2 Complete  
**Next Steps:** Responsive mobile, validación visual, saved scenarios, export
