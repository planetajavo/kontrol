# Portfolio Distribution V2 - Activos Expandibles con Wallets

## 📋 Nuevos Cambios Implementados

### **Versión 2.0 - Octubre 2025**

---

## 🎯 Cambios Principales

### 1. **Hover Desincronizado**

**Antes:**
- Hover en lista → Tooltip en pie chart
- Hover en pie chart → Highlight en lista

**Después:**
```tsx
// ✅ Solo el pie chart tiene tooltips
<PieChart>
  <Tooltip content={<CustomTooltip />} /> 
</PieChart>

// ❌ La lista NO activa tooltips ni highlights del pie chart
<button onClick={() => toggleAssetExpansion(asset.symbol)}>
  {/* No hay onMouseEnter/onMouseLeave que afecten al pie chart */}
</button>
```

✅ **Beneficio:** Tooltips solo aparecen en interacción directa con el pie chart, evitando confusión

---

### 2. **"Dust" Renombrado a "Otros"**

**Antes:**
```tsx
{ 
  name: 'Dust',
  symbol: 'DUST',
  ...
}
```

**Después:**
```tsx
{ 
  name: 'Otros',
  symbol: 'OTROS',
  ...
}
```

✅ Más profesional y claro en español

---

### 3. **Todos los Activos son Expandibles**

**Interfaz actualizada:**
```tsx
interface WalletHolding {
  name: string;
  address: string;
  nativeAmount: number;
  value: number;
}

interface AssetData {
  name: string;
  value: number;
  percentage: number;
  change24h: number;
  symbol: string;
  color: string;
  nativeAmount: number;
  wallets?: WalletHolding[]; // ✅ NUEVO - Desglose de wallets
}
```

**Implementación:**
```tsx
const [expandedAssets, setExpandedAssets] = useState<Set<string>>(new Set());

const toggleAssetExpansion = (symbol: string) => {
  setExpandedAssets(prev => {
    const newSet = new Set(prev);
    if (newSet.has(symbol)) {
      newSet.delete(symbol);
    } else {
      newSet.add(symbol);
    }
    return newSet;
  });
};
```

**Visual:**
```tsx
{hasWallets && (
  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
    <ChevronDown className="w-4 h-4" />
  </motion.div>
)}
```

✅ ChevronDown rota 180° al expandir
✅ Solo aparece si el activo tiene wallets

---

### 4. **Desglose de Wallets Compacto**

**Datos de ejemplo:**
```tsx
{ 
  name: 'Bitcoin', 
  symbol: 'BTC', 
  value: 45820,
  nativeAmount: 0.5234,
  wallets: [
    { 
      name: 'Ledger Nano X', 
      address: '1A1z...P2Sh', 
      nativeAmount: 0.3234, 
      value: 28320 
    },
    { 
      name: 'Trezor', 
      address: 'bc1q...x7ty', 
      nativeAmount: 0.2000, 
      value: 17500 
    },
  ]
}
```

**UI del Wallet Row:**
```tsx
<div className="flex items-center justify-between text-xs py-1.5 px-2 bg-card/50 rounded">
  {/* Left: Wallet info */}
  <div className="flex flex-col gap-0.5">
    <span className="text-foreground font-medium">Ledger Nano X</span>
    <span className="text-muted-foreground/70 text-[10px]">1A1z...P2Sh</span>
  </div>
  
  {/* Right: Amounts */}
  <div className="flex flex-col items-end gap-0.5">
    <span className="text-foreground font-medium">0.3234 BTC</span>
    <span className="text-muted-foreground text-[10px]">€28,320</span>
  </div>
</div>
```

**Características:**
- ✅ **Altura mínima**: Solo 2 líneas por wallet
- ✅ **Texto compacto**: 10-12px font size
- ✅ **Sin scroll interno**: Muestra todos los wallets directamente
- ✅ **Background sutil**: `bg-card/50` para diferenciar

---

### 5. **Modo Expandido - Bajo Perfil**

**Animación suave:**
```tsx
<AnimatePresence>
  {isExpanded && hasWallets && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="border-t border-border/50"
    >
      {/* Wallet list */}
    </motion.div>
  )}
</AnimatePresence>
```

**Altura estimada por wallet:**
- 1 wallet: ~35px
- 2 wallets: ~70px
- 3 wallets: ~105px
- Máximo típico: 2-3 wallets = ~70-105px

✅ **Compacto y eficiente en espacio**

---

## 📊 Casos de Uso

### **Caso 1: Usuario expande Bitcoin**

```
[Bitcoin (BTC)] [+2.34%] [45.2%] [▼]
  ├─ Ledger Nano X (1A1z...P2Sh)
  │  0.3234 BTC • €28,320
  └─ Trezor (bc1q...x7ty)
     0.2000 BTC • €17,500
```

**Interacción:**
1. Click en row de Bitcoin
2. ChevronDown rota 180°
3. Se expande mostrando 2 wallets
4. Altura total: ~70px adicionales

---

### **Caso 2: Usuario expande "Otros"**

```
[Otros (OTROS)] [1.3%] [▼]
  ├─ UNI (0x123...abc)
  │  €0.80
  └─ DOT (15oF...wX2p)
     €0.50
```

**Características especiales:**
- Muestra los activos agrupados
- En lugar de cantidad nativa, muestra el valor en EUR
- Cada "wallet" es en realidad un activo dust

---

### **Caso 3: Activo sin wallets**

Si un activo no tiene wallets (por ejemplo, activos futuros):
```tsx
wallets: undefined // o []
```

**Resultado:**
- ❌ No aparece ChevronDown
- ❌ No es clickeable para expandir
- ✅ Mantiene el diseño consistente

---

## 🎨 Estructura Visual Completa

### **Asset Row (Collapsed)**
```
┌────────────────────────────────────────────────────┐
│ [Icon] Bitcoin (BTC)           +2.34%  45.2%  [▼] │
│        0.5234 BTC • €45,820                        │
└────────────────────────────────────────────────────┘
```

### **Asset Row (Expanded)**
```
┌────────────────────────────────────────────────────┐
│ [Icon] Bitcoin (BTC)           +2.34%  45.2%  [▲] │
│        0.5234 BTC • €45,820                        │
├────────────────────────────────────────────────────┤
│   ┌──────────────────────────────────────────────┐ │
│   │ Ledger Nano X         0.3234 BTC             │ │
│   │ 1A1z...P2Sh           €28,320                │ │
│   └──────────────────────────────────────────────┘ │
│   ┌──────────────────────────────────────────────┐ │
│   │ Trezor                0.2000 BTC             │ │
│   │ bc1q...x7ty           €17,500                │ │
│   └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

---

## 💡 Mejoras de UX

### **1. Click vs Hover**
- **Click** → Expande/colapsa wallets
- **Hover en pie chart** → Muestra tooltip con info del activo
- **Hover en lista** → Ligero cambio de background (sin tooltips)

### **2. Indicadores Visuales**
- ChevronDown/Up indica estado colapsado/expandido
- Animación de rotación suave (180°)
- Solo aparece si hay wallets disponibles

### **3. Jerarquía de Información**
```
Nivel 1: Asset (siempre visible)
  ├─ Icon + Name
  ├─ Native Amount + EUR Value
  ├─ 24h Change
  └─ Portfolio Percentage

Nivel 2: Wallets (expandible)
  ├─ Wallet Name
  ├─ Address (truncated)
  ├─ Native Amount
  └─ EUR Value
```

### **4. Responsive**
- ✅ Mobile: Mismo comportamiento expandible
- ✅ Desktop: Aprovecha el espacio horizontal
- ✅ Scroll: Funciona perfectamente con wallets expandidas

---

## 🔧 Código Clave

### **Toggle Expansion**
```tsx
const toggleAssetExpansion = (symbol: string) => {
  setExpandedAssets(prev => {
    const newSet = new Set(prev);
    if (newSet.has(symbol)) {
      newSet.delete(symbol);
    } else {
      newSet.add(symbol);
    }
    return newSet;
  });
};
```

### **Wallet Row Component**
```tsx
{asset.wallets!.map((wallet, wIndex) => (
  <div
    key={wIndex}
    className="flex items-center justify-between text-xs py-1.5 px-2 bg-card/50 rounded"
  >
    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
      <span className="text-foreground font-medium truncate">
        {wallet.name}
      </span>
      <span className="text-muted-foreground/70 text-[10px] truncate">
        {wallet.address}
      </span>
    </div>
    {isVisible && (
      <div className="flex flex-col items-end gap-0.5 ml-2">
        <span className="text-foreground font-medium">
          {wallet.nativeAmount.toLocaleString('es-ES')} {asset.symbol}
        </span>
        <span className="text-muted-foreground text-[10px]">
          €{wallet.value.toLocaleString('es-ES')}
        </span>
      </div>
    )}
  </div>
))}
```

### **Expand Animation**
```tsx
<AnimatePresence>
  {isExpanded && hasWallets && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="border-t border-border/50"
    >
      <div className="px-3 py-2 space-y-1.5">
        {/* Wallets */}
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

---

## ✅ Validaciones

- ✅ Hover en lista NO activa tooltips del pie chart
- ✅ "Dust" renombrado a "Otros"
- ✅ Todos los activos con wallets son expandibles
- ✅ ChevronDown/Up indica estado correctamente
- ✅ Animación de rotación suave
- ✅ Wallets mostradas de forma compacta
- ✅ Máximo ~70-105px de altura por asset expandido
- ✅ Caso especial "Otros" muestra activos agrupados
- ✅ Truncate en addresses largas
- ✅ Responsive en mobile y desktop

---

## 🚀 Próximas Mejoras Sugeridas

1. **Click en wallet row** → Copiar address al clipboard
2. **Badge "Exchange"** para wallets de exchanges
3. **Link externo** para ver address en blockchain explorer
4. **Búsqueda/filtro** de activos en la lista
5. **Ordenamiento** por valor, porcentaje, nombre
6. **Estado persistente** de expandidos en localStorage
7. **Lazy loading** si hay muchos wallets (>10)

---

**Última actualización:** 18 de octubre de 2025  
**Versión:** 2.0  
**Componente:** AssetDistributionPieChart.tsx  
**Cambios:** Activos expandibles, wallets, hover desincronizado
