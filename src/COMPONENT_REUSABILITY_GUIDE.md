# 🔄 Guía de Reutilización de Componentes - Kontrol

## Filosofía

Kontrol sigue el principio **DRY (Don't Repeat Yourself)** con componentes reutilizables, modulares y configurables. Cada componente debe ser:

- ✨ **Reutilizable**: Funciona en múltiples contextos
- 🎨 **Personalizable**: Props flexibles para diferentes casos de uso
- 📦 **Modular**: Responsabilidades claras y únicas
- 🎯 **Consistente**: Mismo look & feel en toda la app

---

## Sistema de Transacciones Reutilizable

### Arquitectura

```
/utils/mockTransactions.ts          → Generador de datos y helpers
/components/TransactionListItem.tsx → Item individual expandible
/components/TransactionsList.tsx    → Lista con filtros y scroll
```

### Componente: `TransactionListItem`

**Ubicación**: `/components/TransactionListItem.tsx`

**Propósito**: Muestra una transacción individual con capacidad de expansión para ver detalles completos.

**Props**:
```typescript
interface TransactionListItemProps {
  transaction: Transaction;     // Datos de la transacción
  showDetails?: boolean;         // Permite expandir detalles (default: true)
  compact?: boolean;             // Modo compacto (default: false)
}
```

**Uso Básico**:
```tsx
import TransactionListItem from './TransactionListItem';

<TransactionListItem
  transaction={myTransaction}
  showDetails={true}
  compact={false}
/>
```

**Características**:
- ✅ Expansión/colapso de detalles con animación
- ✅ Colores pastel según tipo (buy, sell, transfer, swap)
- ✅ Badges de estado (confirmed, pending, failed)
- ✅ Información fiscal si aplica
- ✅ Copia de hash al portapapeles
- ✅ AI highlights para transacciones especiales
- ✅ Responsive design

---

### Componente: `TransactionsList`

**Ubicación**: `/components/TransactionsList.tsx`

**Propósito**: Lista de transacciones con filtros, búsqueda, infinite scroll y agrupación.

**Props**:
```typescript
interface TransactionsListProps {
  transactions: Transaction[];   // Array de transacciones
  title?: string;                // Título opcional
  maxItems?: number;             // Límite de items a mostrar
  enableFilters?: boolean;       // Mostrar filtros (default: false)
  enableSearch?: boolean;        // Mostrar búsqueda (default: false)
  enableInfiniteScroll?: boolean;// Scroll infinito (default: false)
  compact?: boolean;             // Modo compacto (default: false)
  showDetails?: boolean;         // Permitir expandir (default: true)
  groupByMonth?: boolean;        // Agrupar por mes (default: true)
}
```

**Casos de Uso**:

#### 1. Dashboard - Últimas 30 transacciones (sin filtros)
```tsx
<TransactionsList
  transactions={recentTransactions}
  maxItems={30}
  enableFilters={false}
  enableSearch={false}
  enableInfiniteScroll={false}
  groupByMonth={true}
/>
```

#### 2. Sección Transacciones - Lista completa (con todo)
```tsx
<TransactionsList
  transactions={allTransactions}
  enableFilters={true}
  enableSearch={true}
  enableInfiniteScroll={true}
  groupByMonth={true}
/>
```

#### 3. Modal/Sidebar - Lista compacta
```tsx
<TransactionsList
  transactions={walletTransactions}
  title="Transacciones de esta wallet"
  compact={true}
  showDetails={false}
  maxItems={10}
  groupByMonth={false}
/>
```

#### 4. Vista de Impuestos - Solo transacciones declarables
```tsx
const taxableTransactions = getTaxableTransactions(allTransactions);

<TransactionsList
  transactions={taxableTransactions}
  title="Transacciones Declarables 2025"
  enableFilters={true}
  enableSearch={true}
  groupByMonth={true}
/>
```

---

## Utilidades de Transacciones

**Ubicación**: `/utils/mockTransactions.ts`

### Funciones Disponibles

```typescript
// Generar transacciones mock
generateMockTransactions(count?: number): Transaction[]

// Obtener las N más recientes
getRecentTransactions(all: Transaction[], count: number): Transaction[]

// Filtrar por tipo
filterByType(transactions: Transaction[], type: TransactionType): Transaction[]

// Filtrar por estado
filterByStatus(transactions: Transaction[], status: TransactionStatus): Transaction[]

// Solo transacciones declarables
getTaxableTransactions(transactions: Transaction[]): Transaction[]

// Transacciones de un año específico
getTransactionsByYear(transactions: Transaction[], year: number): Transaction[]

// Calcular P&L total
calculateTotalPnL(transactions: Transaction[]): {
  realized: number;
  unrealized: number;
  total: number;
}
```

**Ejemplos**:
```tsx
import { 
  generateMockTransactions, 
  getRecentTransactions,
  getTaxableTransactions,
  filterByType 
} from '../utils/mockTransactions';

// Generar datos
const allTxs = generateMockTransactions(500);

// Obtener últimas 30
const recent = getRecentTransactions(allTxs, 30);

// Solo compras
const purchases = filterByType(allTxs, 'buy');

// Solo declarables
const taxable = getTaxableTransactions(allTxs);

// Transacciones de 2025
const txs2025 = getTransactionsByYear(allTxs, 2025);

// Calcular P&L
const pnl = calculateTotalPnL(taxable);
console.log(`P&L Realizada: €${pnl.realized}`);
```

---

## Otros Componentes Reutilizables

### `InfoTooltip`

**Ubicación**: `/components/shared/InfoTooltip.tsx`

**Uso**:
```tsx
<InfoTooltip 
  content="Texto explicativo"
  side="right"        // top, right, bottom, left
  iconSize={12}       // Tamaño del icono
/>
```

**Dónde se usa**:
- ✅ TotalPortfolioValue
- ✅ BalanceByLocation
- ✅ AssetBalanceBreakdown
- ✅ TransactionListItem (en detalles expandidos)
- ✅ DashboardSection
- ✅ TaxFiscalSection

---

### `CryptoIcon`

**Ubicación**: `/components/CryptoIcon.tsx`

**Uso**:
```tsx
<CryptoIcon symbol="btc" size={24} className="custom-class" />
```

**Características**:
- Soporte para 50+ cryptos
- Fallback automático a icono genérico
- Optimizado para modo oscuro

**Dónde se usa**:
- ✅ TransactionListItem
- ✅ AssetDistributionPieChart
- ✅ AssetBalanceBreakdown
- ✅ DashboardSection

---

### `Badge`

**Ubicación**: `/components/ui/badge.tsx` (ShadCN)

**Variantes**:
```tsx
// Default
<Badge>Default</Badge>

// Secondary
<Badge variant="secondary">Secondary</Badge>

// Outline
<Badge variant="outline">Outline</Badge>

// Destructive
<Badge variant="destructive">Error</Badge>

// Custom con colores pastel
<Badge className="bg-success-pastel/10 text-success-pastel border-success-pastel/30">
  Success
</Badge>
```

**Dónde se usa**:
- ✅ TransactionListItem (tipo, estado, fiscal)
- ✅ CollapsibleSection (contadores)
- ✅ Todas las secciones principales

---

### `CollapsibleSection`

**Ubicación**: `/components/CollapsibleSection.tsx`

**Uso**:
```tsx
<CollapsibleSection
  title="Título de la sección"
  description="Descripción opcional"
  defaultOpen={true}
  badge={<Badge>42</Badge>}
>
  {/* Contenido */}
</CollapsibleSection>
```

**Con InfoTooltip en título**:
```tsx
<CollapsibleSection
  title={
    <div className="flex items-center gap-2">
      <span>Transacciones Recientes</span>
      <InfoTooltip content="Las últimas 30 transacciones" side="right" />
    </div>
  }
  defaultOpen={true}
>
  {/* Contenido */}
</CollapsibleSection>
```

**Dónde se usa**:
- ✅ DashboardSection
- ✅ TransactionsSection
- ✅ TaxFiscalSection
- ✅ AssetsSection
- ✅ BanksSection
- ✅ AMLKYTSection

---

## Patrones de Reutilización

### 1. Componente Base + Variantes

```tsx
// Componente base configurable
<TransactionListItem transaction={tx} />

// Variante compacta
<TransactionListItem transaction={tx} compact={true} showDetails={false} />

// Variante expandida
<TransactionListItem transaction={tx} showDetails={true} />
```

### 2. Composición de Componentes

```tsx
// Lista que usa items internamente
<TransactionsList transactions={txs}>
  {/* TransactionListItem se usa internamente */}
</TransactionsList>

// Card que usa badge + tooltip
<div className="card">
  <h3>
    Título
    <InfoTooltip content="Ayuda" />
  </h3>
  <Badge>42</Badge>
</div>
```

### 3. Higher-Order Patterns

```tsx
// Wrapper con filtros
const FilteredList = ({ data, filterFn }) => {
  const filtered = useMemo(() => data.filter(filterFn), [data, filterFn]);
  return <TransactionsList transactions={filtered} />;
};
```

---

## Oportunidades de Reutilización

### Componentes que deberían crearse

#### 1. `MetricCard` (Tarjeta de Métrica)
**Uso**: TotalPortfolioValue, BalanceByLocation, TaxFiscalSection

```tsx
<MetricCard
  title="P&L Realizada"
  value="€12,450.50"
  change={+12.5}
  icon={<TrendingUp />}
  variant="success"
  tooltip="Ganancias declarables del ejercicio"
/>
```

#### 2. `AssetRow` (Fila de Activo)
**Uso**: AssetBalanceBreakdown, AssetsSection

```tsx
<AssetRow
  symbol="BTC"
  amount={0.5}
  valueInEur={32500}
  change24h={2.34}
  expandable={true}
/>
```

#### 3. `FilterBar` (Barra de Filtros)
**Uso**: TransactionsList, AssetsSection, BanksSection

```tsx
<FilterBar
  filters={[
    { id: 'type', label: 'Tipo', options: [...] },
    { id: 'status', label: 'Estado', options: [...] }
  ]}
  onFilterChange={handleFilterChange}
/>
```

#### 4. `StatCard` (Tarjeta de Estadística Simple)
**Uso**: Dashboard, Tax, AML sections

```tsx
<StatCard
  label="Total Transactions"
  value="248"
  icon={<ArrowRightLeft />}
  color="primary"
/>
```

---

## Guía de Migración

### Antes (Código duplicado)
```tsx
// DashboardSection.tsx
<div className="transaction-item">
  {/* 200 líneas de código */}
</div>

// TransactionsSection.tsx
<div className="transaction-item">
  {/* Mismo código duplicado */}
</div>
```

### Después (Componente reutilizable)
```tsx
// DashboardSection.tsx
<TransactionsList transactions={recent} maxItems={30} />

// TransactionsSection.tsx
<TransactionsList 
  transactions={all} 
  enableFilters={true}
  enableInfiniteScroll={true}
/>
```

**Beneficios**:
- ✅ 80% menos código
- ✅ Mantenimiento centralizado
- ✅ Consistencia garantizada
- ✅ Fácil agregar features
- ✅ Testing más simple

---

## Checklist de Reutilización

Antes de crear un nuevo componente, pregúntate:

- [ ] ¿Este código aparece en 2+ lugares?
- [ ] ¿Puede ser útil en otros contextos?
- [ ] ¿Tiene una responsabilidad clara?
- [ ] ¿Se puede configurar con props?
- [ ] ¿Sigue el diseño de colores pastel?
- [ ] ¿Es accesible (WCAG AA)?
- [ ] ¿Está documentado?

Si respondiste SÍ a 4+, **crea un componente reutilizable**.

---

## Próximos Pasos

### Componentes a refactorizar

1. **Gráficas repetidas** → Crear `ChartCard` genérico
2. **Wallets list items** → Crear `WalletListItem` similar a `TransactionListItem`
3. **Asset items** → Crear `AssetListItem` reutilizable
4. **Form fields** → Crear wrappers con validación y tooltips integrados
5. **Empty states** → Ya existe `EmptyState`, usar más ampliamente

### Nuevos componentes a crear

1. `DataTable` genérico con sorting, filtering, pagination
2. `ProgressBar` para security scores, loading, etc.
3. `TimelineItem` para transaction timelines
4. `PriceDisplay` con formateo EUR/USD/Crypto consistente
5. `ActionButton` con loading states y confirmaciones

---

## Recursos

- **Tipos centralizados**: `/types/index.ts`
- **Utilidades**: `/utils/`
- **Componentes compartidos**: `/components/shared/`
- **Componentes UI**: `/components/ui/` (ShadCN)
- **Guías de estilo**: 
  - `/COLOR_SYSTEM.md`
  - `/TRANSACTIONS_COLOR_GUIDE.md`
  - `/TOOLTIPS_GUIDE.md`

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0  
**Mantenedor**: Kontrol Dev Team
