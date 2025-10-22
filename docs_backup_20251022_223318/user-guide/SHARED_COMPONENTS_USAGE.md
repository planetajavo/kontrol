# 🔄 Shared Components - Guía de Uso

## Overview
Esta guía documenta cómo usar correctamente los componentes compartidos en Kontrol para mantener consistencia y reutilización de código.

---

## 📦 Componentes Disponibles

### **1. CollapsibleSection**

**Ubicación:** `/components/CollapsibleSection.tsx`

**Propósito:** Widget colapsable con header uniforme para todas las secciones.

**Props:**
```tsx
interface CollapsibleSectionProps {
  title: string | React.ReactNode;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode | ((isCollapsed: boolean) => React.ReactNode);
  badge?: React.ReactNode;
}
```

**Uso básico:**
```tsx
<CollapsibleSection
  title="Título de la sección"
  description="Descripción opcional"
  defaultOpen={true}
  badge={<Badge>Info</Badge>}
>
  <div>Contenido aquí</div>
</CollapsibleSection>
```

**Uso con control de collapse externo:**
```tsx
const [allCollapsed, setAllCollapsed] = useState(false);

<CollapsibleSection
  title="Título"
  defaultOpen={!allCollapsed}
>
  <div>Contenido</div>
</CollapsibleSection>
```

**Características:**
- ✅ Header uniforme con padding responsive
- ✅ Animación suave de collapse
- ✅ Icono ChevronUp/Down automático
- ✅ Badge opcional en el header
- ✅ Border y estilos consistentes

---

### **2. ActionBar**

**Ubicación:** `/components/shared/ActionBar.tsx`

**Propósito:** Barra de acciones sticky con glassmorphism.

**Props:**
```tsx
interface ActionBarProps {
  children: ReactNode;
  className?: string;
}
```

**Uso:**
```tsx
<ActionBar>
  <Button variant="outline" size="sm">
    <RefreshCw className="w-4 h-4" />
    Sync
  </Button>
  <Button size="sm">
    <Plus className="w-4 h-4" />
    Add
  </Button>
</ActionBar>
```

**Características:**
- ✅ Sticky position (top-16)
- ✅ Backdrop blur glassmorphism
- ✅ Negative margins para full width
- ✅ Padding responsive
- ✅ Justify-end por defecto

**⚠️ Nota importante:** ActionBar debe ir **dentro** del contenedor de la página, no como sibling del header.

---

### **3. PageHeader**

**Ubicación:** `/components/shared/PageHeader.tsx`

**Propósito:** Header consistente para todas las páginas/secciones.

**Props:**
```tsx
interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}
```

**Uso:**
```tsx
<PageHeader
  title="My Assets"
  description="Añade todas tus billeteras y exchanges"
  actions={
    <Button size="sm">
      <Plus className="w-4 h-4" />
      Add
    </Button>
  }
/>
```

**Características:**
- ✅ Tipografía consistente (h1 para título)
- ✅ Layout responsive
- ✅ Área opcional para acciones
- ✅ Spacing automático

---

### **4. EmptyState**

**Ubicación:** `/components/shared/EmptyState.tsx`

**Propósito:** Estado vacío consistente cuando no hay datos.

**Props:**
```tsx
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}
```

**Uso:**
```tsx
<EmptyState
  icon={<Wallet className="w-12 h-12 text-muted-foreground" />}
  title="No tienes wallets conectadas"
  description="Añade tu primera wallet para empezar"
  action={
    <Button>
      <Plus className="w-4 h-4 mr-2" />
      Añadir Wallet
    </Button>
  }
/>
```

**Características:**
- ✅ Centrado automático
- ✅ Padding y spacing consistente
- ✅ Icon opcional grande
- ✅ CTA button opcional

---

### **5. LoadingState**

**Ubicación:** `/components/shared/LoadingState.tsx`

**Propósito:** Estado de carga consistente.

**Props:**
```tsx
interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Uso:**
```tsx
<LoadingState 
  message="Cargando transacciones..." 
  size="md" 
/>
```

**Características:**
- ✅ Spinner animado
- ✅ Mensaje opcional
- ✅ 3 tamaños predefinidos
- ✅ Centrado automático

---

### **6. InfoTooltip**

**Ubicación:** `/components/shared/InfoTooltip.tsx`

**Propósito:** Tooltip informativo con icono.

**Props:**
```tsx
interface InfoTooltipProps {
  content: string | ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}
```

**Uso:**
```tsx
<div className="flex items-center gap-2">
  <span>Base imponible</span>
  <InfoTooltip content="Ganancia neta después de aplicar pérdidas compensables" />
</div>
```

**Características:**
- ✅ Icono Info circular
- ✅ Posicionamiento configurable
- ✅ Estilos consistentes
- ✅ Hover y focus states

---

### **7. GradientCard**

**Ubicación:** `/components/shared/GradientCard.tsx`

**Propósito:** Card con gradiente purple para destacar.

**Props:**
```tsx
interface GradientCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'success' | 'warning' | 'destructive';
}
```

**Uso:**
```tsx
<GradientCard variant="primary">
  <div className="text-2xl font-bold">€123,456.78</div>
  <div className="text-sm">Total Balance</div>
</GradientCard>
```

**Características:**
- ✅ 4 variantes de color
- ✅ Glassmorphism effect
- ✅ Padding responsive
- ✅ Border radius consistente

---

### **8. ConfirmDialog**

**Ubicación:** `/components/shared/ConfirmDialog.tsx`

**Propósito:** Dialog de confirmación para acciones destructivas.

**Props:**
```tsx
interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: 'destructive' | 'default';
}
```

**Uso:**
```tsx
<ConfirmDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Eliminar wallet"
  description="¿Estás seguro de que quieres eliminar esta wallet? Esta acción no se puede deshacer."
  confirmLabel="Eliminar"
  cancelLabel="Cancelar"
  onConfirm={handleDelete}
  variant="destructive"
/>
```

**Características:**
- ✅ Accesible (keyboard navigation)
- ✅ Focus trap
- ✅ Variantes de color
- ✅ Overlay con backdrop blur

---

## 🎯 Patrón de Actions Row

### **Estructura recomendada:**

Todas las secciones deben seguir este patrón al final:

```tsx
{/* Actions Row */}
<div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
  {/* Left: Secondary Actions (Collapse/Expand, etc) */}
  <div className="flex items-center gap-2">
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2"
      onClick={handleCollapseAll}
    >
      {allCollapsed ? (
        <>
          <ChevronDown className="w-4 h-4" />
          <span className="hidden sm:inline">Expandir todo</span>
        </>
      ) : (
        <>
          <ChevronUp className="w-4 h-4" />
          <span className="hidden sm:inline">Contraer todo</span>
        </>
      )}
    </Button>
  </div>

  {/* Right: Primary Actions (destacadas) */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" className="gap-2">
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">Acción Secundaria</span>
      <span className="sm:hidden">Texto corto</span>
    </Button>
    <Button size="sm" className="gap-2">
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">Acción Principal</span>
      <span className="sm:hidden">Texto corto</span>
    </Button>
  </div>
</div>
```

### **Reglas:**
1. ✅ Siempre usar `justify-between` para distribuir acciones
2. ✅ Izquierda = Acciones secundarias (outline)
3. ✅ Derecha = Acciones principales (solid/primary)
4. ✅ `pt-4 border-t` para separar del contenido
5. ✅ Texto responsive con `hidden sm:inline`
6. ✅ Icons de 16px (w-4 h-4)
7. ✅ Size `sm` consistente

---

## 📋 Ejemplos por Sección

### **Tax & Fiscal**

```tsx
{/* Actions Row */}
<div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
  {/* Left: Controls */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" onClick={handleCollapseAll}>
      {allCollapsed ? <ChevronDown /> : <ChevronUp />}
      <span className="hidden sm:inline">
        {allCollapsed ? 'Expandir' : 'Contraer'} todo
      </span>
    </Button>
    
    <Button variant="outline" size="sm" onClick={toggleVisibility}>
      {isVisible ? <EyeOff /> : <Eye />}
      <span className="hidden sm:inline">
        {isVisible ? 'Ocultar' : 'Mostrar'} valores
      </span>
    </Button>
  </div>

  {/* Right: Export & Actions */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm">
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">Exportar PDF</span>
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Exportar Excel</DropdownMenuItem>
        <DropdownMenuItem>Programar reporte</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
```

---

### **My Assets**

```tsx
{/* Actions Row */}
<div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
  {/* Left: Collapse Control */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" onClick={handleCollapseAll}>
      {allCollapsed ? <ChevronDown /> : <ChevronUp />}
      <span className="hidden sm:inline">
        {allCollapsed ? 'Expandir' : 'Contraer'} todo
      </span>
    </Button>
  </div>

  {/* Right: Add Wallet/Exchange */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm">
      <Wallet className="w-4 h-4" />
      <span className="hidden sm:inline">Añadir Wallet</span>
      <span className="sm:hidden">Wallet</span>
    </Button>
    <Button size="sm"> {/* Primary action - sin variant */}
      <Building2 className="w-4 h-4" />
      <span className="hidden sm:inline">Añadir Exchange</span>
      <span className="sm:hidden">Exchange</span>
    </Button>
  </div>
</div>
```

---

### **Transactions**

```tsx
{/* Actions Row */}
<div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
  {/* Left: View Controls */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" onClick={handleCollapseAll}>
      {allCollapsed ? <ChevronDown /> : <ChevronUp />}
      <span className="hidden sm:inline">
        {allCollapsed ? 'Expandir' : 'Contraer'} todo
      </span>
    </Button>
    
    <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
      <ToggleGroupItem value="list" size="sm">
        <List className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="timeline" size="sm">
        <GitBranch className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  </div>

  {/* Right: Import & Filters */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm">
      <Filter className="w-4 h-4" />
      <span className="hidden sm:inline">Filtros</span>
    </Button>
    <Button size="sm">
      <Upload className="w-4 h-4" />
      <span className="hidden sm:inline">Importar CSV</span>
    </Button>
  </div>
</div>
```

---

### **Banks**

```tsx
{/* Actions Row */}
<div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
  {/* Left: Sync & Collapse */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" onClick={handleCollapseAll}>
      {allCollapsed ? <ChevronDown /> : <ChevronUp />}
      <span className="hidden sm:inline">
        {allCollapsed ? 'Expandir' : 'Contraer'} todo
      </span>
    </Button>
    
    <Button variant="outline" size="sm" onClick={handleSyncAll}>
      <RefreshCw className="w-4 h-4" />
      <span className="hidden sm:inline">Sincronizar todo</span>
    </Button>
  </div>

  {/* Right: Connect Bank */}
  <div className="flex items-center gap-2">
    <Button size="sm">
      <Plus className="w-4 h-4" />
      <span className="hidden sm:inline">Conectar Banco</span>
      <span className="sm:hidden">Banco</span>
    </Button>
  </div>
</div>
```

---

### **AML & KYT**

```tsx
{/* Actions Row */}
<div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
  {/* Left: Collapse */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" onClick={handleCollapseAll}>
      {allCollapsed ? <ChevronDown /> : <ChevronUp />}
      <span className="hidden sm:inline">
        {allCollapsed ? 'Expandir' : 'Contraer'} todo
      </span>
    </Button>
  </div>

  {/* Right: Export & Settings */}
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm">
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">Exportar Reporte</span>
    </Button>
    <Button size="sm">
      <Settings className="w-4 h-4" />
      <span className="hidden sm:inline">Configuración</span>
    </Button>
  </div>
</div>
```

---

## 🎨 Spacing & Layout Consistente

### **Page Container**
```tsx
<div className="space-y-4 md:space-y-6 lg:space-y-8">
  {/* Contenido de la página */}
</div>
```

### **Section Spacing**
```tsx
<CollapsibleSection>
  <div className="space-y-4">
    {/* Items con spacing consistente */}
  </div>
</CollapsibleSection>
```

### **Card Padding**
```tsx
<div className="p-4 md:p-6">
  {/* Contenido del card */}
</div>
```

### **Grid Gaps**
```tsx
<div className="grid grid-cols-2 gap-3 md:gap-4">
  {/* Grid items */}
</div>
```

---

## ✅ Checklist de Implementación

Antes de crear una nueva sección, verifica:

- [ ] **Page Header** - Usa estructura estándar con h1 + descripción
- [ ] **CollapsibleSection** - Para todos los widgets principales
- [ ] **Actions Row** - Al final con estructura justify-between
- [ ] **Collapse All** - Estado y funcionalidad implementada
- [ ] **Spacing** - Usa classes consistentes (space-y-4, gap-3, etc)
- [ ] **Responsive** - Text oculto en mobile con `hidden sm:inline`
- [ ] **Icons** - Tamaño consistente (w-4 h-4 para buttons)
- [ ] **Button sizes** - Size `sm` para acciones secundarias
- [ ] **EmptyState** - Para cuando no hay datos
- [ ] **LoadingState** - Para estados de carga

---

## 🚫 Anti-Patterns (Evitar)

### ❌ **NO hacer:**
```tsx
// NO: ActionBar como sibling del header
<div>
  <h1>Title</h1>
  <ActionBar>...</ActionBar>
  <Content />
</div>

// NO: Múltiples h1 en una página
<h1>Title 1</h1>
<h1>Title 2</h1>

// NO: Spacing inconsistente
<div className="mb-3">
<div className="mb-4">
<div className="mb-5">

// NO: Text sin responsive
<span>Texto muy largo que no se oculta en mobile</span>

// NO: Actions sin estructura
<div className="flex gap-2">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</div>
```

### ✅ **SÍ hacer:**
```tsx
// SÍ: Structure clara
<div className="space-y-4">
  <PageHeader title="..." description="..." />
  <CollapsibleSection>...</CollapsibleSection>
  <ActionsRow />
</div>

// SÍ: Spacing consistente
<div className="space-y-4">
  <div className="p-4">...</div>
  <div className="p-4">...</div>
</div>

// SÍ: Responsive text
<span className="hidden sm:inline">Texto largo</span>
<span className="sm:hidden">Corto</span>

// SÍ: Actions organizadas
<div className="flex justify-between">
  <div className="flex gap-2">
    {/* Secondary */}
  </div>
  <div className="flex gap-2">
    {/* Primary */}
  </div>
</div>
```

---

## 📚 Referencias

- **CollapsibleSection**: Ver `/components/CollapsibleSection.tsx`
- **Shared Components**: Ver `/components/shared/`
- **Ejemplos**: Ver `/components/AssetsSection.tsx` y `/components/TaxFiscalSection.tsx`

---

**Last Updated:** October 18, 2025  
**Status:** ✅ Complete
