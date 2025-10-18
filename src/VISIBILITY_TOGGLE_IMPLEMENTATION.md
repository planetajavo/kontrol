# 👁️ Visibility Toggle - Funcionalidad de Ocultar Valores

## Overview
Sistema de toggle de visibilidad implementado en **Dashboard** y **Tax & Fiscal** que permite a los usuarios ocultar/mostrar valores monetarios y datos sensibles con un solo clic.

---

## 🎯 Objetivo

Proporcionar **privacidad visual** cuando el usuario comparte pantalla, graba demos o simplemente quiere ocultar temporalmente sus valores financieros.

---

## 📍 Ubicaciones Implementadas

### **1. Dashboard Section**

**Ubicación:** Sticky Action Bar (top right)  
**Estado:** ✅ Implementado

```tsx
// /components/DashboardSection.tsx

const [globalVisibility, setGlobalVisibility] = useState(true);

<Button 
  variant="ghost" 
  size="sm" 
  className="gap-2"
  onClick={() => setGlobalVisibility(!globalVisibility)}
>
  {globalVisibility ? (
    <>
      <Eye className="w-4 h-4" />
      <span className="hidden sm:inline">Ocultar valores</span>
    </>
  ) : (
    <>
      <EyeOff className="w-4 h-4" />
      <span className="hidden sm:inline">Mostrar valores</span>
    </>
  )}
</Button>
```

**Widgets afectados:**
- ✅ Balance Over Time
- ✅ Security Score (Balance by Location)
- ✅ Balance por Activo
- ✅ Portfolio Distribution
- ✅ Transacciones Recientes

---

### **2. Tax & Fiscal Section**

**Ubicación:** Page Header (top right)  
**Estado:** ✅ Implementado

```tsx
// /components/TaxFiscalSection.tsx

const [isVisible, setIsVisible] = useState(true);

<Button 
  variant="ghost" 
  size="sm" 
  className="gap-2"
  onClick={() => setIsVisible(!isVisible)}
>
  {isVisible ? (
    <>
      <Eye className="w-4 h-4" />
      <span className="hidden sm:inline">Ocultar valores</span>
    </>
  ) : (
    <>
      <EyeOff className="w-4 h-4" />
      <span className="hidden sm:inline">Mostrar valores</span>
    </>
  )}
</Button>
```

**Componentes afectados:**
- ✅ Resumen Fiscal
- ✅ Fiscalidad Pendiente
- ✅ Exit Strategy Planner

---

## 🎨 UI/UX Design

### **Button States**

#### **Visible (Default)**
```
┌──────────────────────────┐
│ 👁️  Ocultar valores      │
└──────────────────────────┘
```

#### **Hidden**
```
┌──────────────────────────┐
│ 👁️‍🗨️  Mostrar valores     │
└──────────────────────────┘
```

**Características:**
- ✅ `variant="ghost"` - Acción secundaria, no intrusiva
- ✅ `size="sm"` - Tamaño compacto
- ✅ Icon + Text - Iconografía clara
- ✅ Responsive - Solo icon en mobile (`hidden sm:inline`)

---

## 🔄 Propagación del Estado

### **Dashboard: Global Visibility**

El estado `globalVisibility` se propaga a **todos los widgets**:

```tsx
// Balance Over Time
<PortfolioOverview isCollapsed={isCollapsed} isVisible={globalVisibility} />

// Balance by Location
<BalanceByLocation isVisible={globalVisibility} />

// Asset Balance Breakdown
<AssetBalanceBreakdown isVisible={globalVisibility} />

// Asset Distribution
<AssetDistributionPieChart isVisible={globalVisibility} />

// Transactions List
<TransactionsList isVisible={globalVisibility} />
```

**Ventajas:**
- ✅ **Un solo click** oculta todo
- ✅ **Estado global** consistente
- ✅ **Experiencia uniforme** en todos los widgets

---

### **Tax & Fiscal: Local Visibility**

El estado `isVisible` se propaga solo dentro de Tax & Fiscal:

```tsx
// Resumen Fiscal
<ResumenFiscal isVisible={isVisible} />

// Otros componentes fiscales podrían usar el mismo estado
```

**Ventajas:**
- ✅ **Control granular** - Solo afecta sección fiscal
- ✅ **Independiente** del Dashboard
- ✅ **Privacidad específica** para datos fiscales

---

## 🔐 Implementación en Componentes

### **Pattern: isVisible Prop**

Todos los componentes que manejan datos sensibles aceptan un prop `isVisible`:

```tsx
interface ComponentProps {
  isVisible?: boolean;
  // ... other props
}

export default function Component({ isVisible = true }: ComponentProps) {
  // ...
}
```

**Default:** `true` (valores visibles por defecto)

---

### **Rendering Condicional**

#### **Opción 1: Conditional Value Display**

```tsx
{isVisible ? (
  <div className="text-2xl font-semibold text-foreground">
    €{value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
  </div>
) : (
  <div className="text-2xl font-semibold text-foreground">
    €••••••
  </div>
)}
```

**Uso:**
- ✅ Valores monetarios
- ✅ Cantidades de crypto
- ✅ Balances

---

#### **Opción 2: Placeholder con mismo formato**

```tsx
{isVisible ? (
  <span className="text-success-pastel">
    +€12,450.50
  </span>
) : (
  <span className="text-foreground">
    €••••••
  </span>
)}
```

**Características:**
- ✅ Mantiene el espacio visual
- ✅ Placeholder con bullets (•)
- ✅ Color neutro cuando está oculto

---

#### **Opción 3: Blur Effect**

```tsx
<div className={isVisible ? '' : 'blur-sm select-none'}>
  €{value.toLocaleString('es-ES')}
</div>
```

**Ventajas:**
- ✅ Efecto visual suave
- ✅ Indica que hay contenido
- ✅ No cambia layout

**Desventajas:**
- ❌ Aún puede leerse con esfuerzo
- ❌ No es 100% privado

---

### **Ejemplo Completo: ResumenFiscal**

```tsx
// /components/ResumenFiscal.tsx

export default function ResumenFiscal({ isVisible = true }: ResumenFiscalProps) {
  return (
    <div>
      {/* P&L Realizada */}
      <div>
        {isVisible ? (
          <div className="text-2xl font-semibold text-success-pastel">
            +€{currentYearRealizedPnL.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </div>
        ) : (
          <div className="text-2xl font-semibold text-foreground">€••••••</div>
        )}
      </div>

      {/* Collapsible Details - Solo visible si isVisible = true */}
      {realizedExpanded && isVisible && (
        <motion.div>
          {realizedTransactions.map((tx) => (
            <div key={tx.id}>
              <span>{tx.asset}</span>
              <span className="text-success-pastel">
                +€{tx.amount.toLocaleString('es-ES')}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Pérdidas Compensables */}
      {isVisible ? (
        <div className="text-lg font-semibold text-warning-pastel">
          €{Math.abs(pendingLossCompensation).toLocaleString('es-ES')}
        </div>
      ) : (
        <div className="text-lg font-semibold text-foreground">€••••</div>
      )}
    </div>
  );
}
```

---

## 📊 Datos Ocultados

### **Dashboard**

**Valores monetarios:**
- ✅ Total Portfolio Value
- ✅ Balance histórico (gráfico)
- ✅ Balance por ubicación (cantidades)
- ✅ Balance por asset (cantidades)
- ✅ Distribución de portfolio (valores)
- ✅ Amounts en transacciones

**Datos sensibles:**
- ✅ Cantidades de crypto
- ✅ Valores en EUR/USD
- ✅ Porcentajes de distribución

**Datos que SÍ se mantienen visibles:**
- ✅ Nombres de assets (BTC, ETH, etc.)
- ✅ Tipos de transacción (Send, Receive, etc.)
- ✅ Fechas
- ✅ Addresses (ya están parcialmente ocultas)
- ✅ Network badges
- ✅ Labels y categorías

---

### **Tax & Fiscal**

**Valores fiscales:**
- ✅ P&L Realizada
- ✅ P&L No Realizada
- ✅ Pérdidas Compensables
- ✅ Base Imponible Neta
- ✅ Impuesto Estimado
- ✅ Detalles de transacciones realizadas
- ✅ Posiciones abiertas
- ✅ Ejercicios anteriores (valores)
- ✅ Tramos impositivos (cantidades)

**Datos que se mantienen:**
- ✅ Nombres de assets
- ✅ Fechas
- ✅ Porcentajes de tramos IRPF
- ✅ Tipos efectivos
- ✅ Labels y descripciones

---

## 🔍 Estados Visuales

### **Estado: Visible (Default)**

```
┌────────────────────────────────────────┐
│ Total Portfolio Value                  │
│                                        │
│ €125,678.90                           │
│ ↑ +€12,450.50 (+10.99%)              │
└────────────────────────────────────────┘
```

---

### **Estado: Hidden**

```
┌────────────────────────────────────────┐
│ Total Portfolio Value                  │
│                                        │
│ €••••••••                             │
│ ↑ +€••••• (+••.••%)                  │
└────────────────────────────────────────┘
```

**Características:**
- ✅ Mantiene estructura visual
- ✅ Placeholder con bullets
- ✅ Mismo color neutral
- ✅ No cambia tamaño del componente

---

## 🎭 Transiciones y Animaciones

### **Sin Animación (Current)**

```tsx
{isVisible ? (
  <div>€125,678.90</div>
) : (
  <div>€••••••••</div>
)}
```

**Cambio:** Instantáneo

---

### **Con Fade (Opcional)**

```tsx
<motion.div
  key={isVisible ? 'visible' : 'hidden'}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
>
  {isVisible ? (
    <div>€125,678.90</div>
  ) : (
    <div>€••••••••</div>
  )}
</motion.div>
```

**Cambio:** Suave fade in/out

---

## 💾 Persistencia

### **Current: Session Only**

El estado de visibilidad se **resetea al refrescar** la página.

```tsx
const [globalVisibility, setGlobalVisibility] = useState(true);
```

**Comportamiento:**
- Usuario oculta valores
- Navega a otra sección
- Vuelve a Dashboard
- ✅ Estado se mantiene en la sesión
- ❌ Se pierde al refrescar página

---

### **Future: LocalStorage**

Para persistir el estado entre sesiones:

```tsx
import { useLocalStorage } from '../hooks/useLocalStorage';

const [globalVisibility, setGlobalVisibility] = useLocalStorage('dashboard-visibility', true);
```

**Ventajas:**
- ✅ Persiste entre sesiones
- ✅ Preferencia del usuario guardada
- ✅ Experiencia consistente

**Implementación:**

```tsx
// /hooks/useLocalStorage.ts

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

---

## 🔐 Consideraciones de Seguridad

### **✅ Lo que HACE:**

- ✅ **Privacidad visual** - Oculta valores en pantalla
- ✅ **Demo mode** - Útil para screenshots/videos
- ✅ **Screen sharing** - Protege al compartir pantalla

### **❌ Lo que NO HACE:**

- ❌ **No es encriptación** - Los datos siguen en el DOM
- ❌ **No previene DevTools** - Valores aún en memoria
- ❌ **No es seguridad real** - Solo ofuscación visual

**Nota importante:**  
Este feature es para **privacidad visual**, NO para seguridad. Los datos aún pueden ser inspeccionados con DevTools o viendo el código fuente.

---

## 📱 Responsive Behavior

### **Desktop**

```tsx
<Button>
  <Eye className="w-4 h-4" />
  <span className="hidden sm:inline">Ocultar valores</span>
</Button>
```

**Display:** Icon + Text  
**Width:** Auto

---

### **Mobile**

```tsx
<Button>
  <Eye className="w-4 h-4" />
  <span className="hidden sm:inline">Ocultar valores</span>
</Button>
```

**Display:** Solo Icon  
**Width:** Icon button square

**Razón:** Espacio limitado en mobile

---

## 🎨 Styling Standards

### **Button Styling**

```tsx
<Button 
  variant="ghost"      // Acción secundaria
  size="sm"           // Compacto
  className="gap-2"   // Espacio entre icon y text
>
```

**Colores:**
- Icon: Hereda color del botón
- Text: `text-foreground` (default)
- Hover: `hover:bg-muted/20`

---

### **Placeholder Styling**

```tsx
// Visible
<div className="text-2xl font-semibold text-success-pastel">
  +€12,450.50
</div>

// Hidden
<div className="text-2xl font-semibold text-foreground">
  €••••••
</div>
```

**Cambios:**
- ✅ Color: De color semántico → `text-foreground`
- ✅ Valor: Número → Bullets (•)
- ✅ Signo: +/- → Nada
- ✅ Mantiene: font-size, font-weight, spacing

---

## 🧪 Testing

### **Manual Testing Checklist**

#### **Dashboard**
- [ ] Click "Ocultar valores" → Todos los valores se ocultan
- [ ] Click "Mostrar valores" → Todos los valores se muestran
- [ ] Navegar a otra sección → Estado se mantiene
- [ ] Refrescar página → Estado se resetea a visible
- [ ] Mobile: Solo icono visible
- [ ] Desktop: Icono + texto visible

#### **Tax & Fiscal**
- [ ] Click "Ocultar valores" → Valores fiscales se ocultan
- [ ] Click "Mostrar valores" → Valores fiscales se muestran
- [ ] P&L Realizada expandida → Detalles no se muestran si hidden
- [ ] P&L No Realizada expandida → Posiciones no se muestran si hidden
- [ ] Pérdidas compensables → Se ocultan correctamente
- [ ] Impuesto estimado → Se oculta correctamente

#### **Cross-Section**
- [ ] Ocultar en Dashboard → No afecta Tax & Fiscal
- [ ] Ocultar en Tax & Fiscal → No afecta Dashboard
- [ ] Estados independientes → Funcionan correctamente

---

## 🔮 Mejoras Futuras

### **1. Keyboard Shortcut**

```tsx
// Press Ctrl+H to toggle visibility
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
      setGlobalVisibility(prev => !prev);
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

**Shortcut:** `Ctrl/Cmd + H`

---

### **2. Auto-hide Timer**

```tsx
const [autoHideTimer, setAutoHideTimer] = useState<number | null>(null);

// Auto-hide after 5 minutes of inactivity
useEffect(() => {
  if (!isVisible) return;

  const timer = setTimeout(() => {
    setGlobalVisibility(false);
    toast.info('Valores ocultos automáticamente por inactividad');
  }, 5 * 60 * 1000);

  return () => clearTimeout(timer);
}, [isVisible]);
```

---

### **3. Partial Hide**

En vez de todo o nada, permitir ocultar categorías específicas:

```tsx
const [hiddenCategories, setHiddenCategories] = useState({
  balances: false,
  transactions: false,
  fiscal: false,
  charts: false,
});

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="ghost" size="sm">
      <Eye className="w-4 h-4" />
      Privacidad
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuCheckboxItem
      checked={hiddenCategories.balances}
      onCheckedChange={(checked) => 
        setHiddenCategories(prev => ({ ...prev, balances: checked }))
      }
    >
      Ocultar balances
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      checked={hiddenCategories.transactions}
      onCheckedChange={(checked) => 
        setHiddenCategories(prev => ({ ...prev, transactions: checked }))
      }
    >
      Ocultar transacciones
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### **4. Demo Mode**

Modo especial que no solo oculta valores, sino que muestra datos fake:

```tsx
const [demoMode, setDemoMode] = useState(false);

{demoMode ? (
  <div>€XX,XXX.XX</div>
) : isVisible ? (
  <div>€{realValue}</div>
) : (
  <div>€••••••</div>
)}
```

**Ventajas:**
- ✅ Perfecto para demos/presentaciones
- ✅ Muestra estructura sin datos reales
- ✅ Mantiene layout completo

---

## 📖 Archivos Modificados

### **1. /components/DashboardSection.tsx**

**State añadido:**
```tsx
const [globalVisibility, setGlobalVisibility] = useState(true);
```

**Button añadido:**
```tsx
<Button 
  variant="ghost" 
  size="sm" 
  className="gap-2"
  onClick={() => setGlobalVisibility(!globalVisibility)}
>
  {/* Icon + Text */}
</Button>
```

**Props propagados:**
```tsx
isVisible={globalVisibility}
```

---

### **2. /components/TaxFiscalSection.tsx**

**Imports añadidos:**
```tsx
import { Eye, EyeOff } from 'lucide-react';
```

**State añadido:**
```tsx
const [isVisible, setIsVisible] = useState(true);
```

**Button añadido en header:**
```tsx
<div className="flex items-start justify-between">
  <div className="space-y-1">
    {/* Title */}
  </div>
  <Button variant="ghost" size="sm" onClick={() => setIsVisible(!isVisible)}>
    {/* Toggle visibility */}
  </Button>
</div>
```

**Props propagados:**
```tsx
<ResumenFiscal isVisible={isVisible} />
```

---

### **3. /components/ResumenFiscal.tsx**

**Interface actualizada:**
```tsx
interface ResumenFiscalProps {
  isVisible?: boolean;
}
```

**Rendering condicional añadido:**
```tsx
{isVisible ? (
  <div>€{value}</div>
) : (
  <div>€••••••</div>
)}
```

---

## ✅ Summary

### **Implementado:**
- ✅ Toggle button en Dashboard (sticky bar)
- ✅ Toggle button en Tax & Fiscal (page header)
- ✅ Propagación de estado a todos los widgets
- ✅ Rendering condicional con placeholders
- ✅ Responsive (icon only en mobile)
- ✅ Estados independientes por sección

### **Pendiente (Opcional):**
- [ ] Persistencia con localStorage
- [ ] Keyboard shortcut
- [ ] Auto-hide timer
- [ ] Partial hide (categorías)
- [ ] Demo mode con datos fake
- [ ] Fade transitions

---

**Last Updated:** October 18, 2025  
**Status:** ✅ Implemented in Dashboard & Tax/Fiscal  
**Next Steps:** LocalStorage persistence, keyboard shortcuts
