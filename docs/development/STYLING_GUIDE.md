# 🎨 Guía de Estilos - Kontrol

## Sistema de Colores Dark Mode

### ✅ REGLAS OBLIGATORIAS

#### 1. **NUNCA uses colores hardcodeados**
```tsx
// ❌ INCORRECTO
className="bg-white text-black"
className="bg-gray-100"

// ✅ CORRECTO
className="bg-card text-foreground"
className="bg-muted"
```

#### 2. **Siempre añade variante dark a gradientes de color**
```tsx
// ❌ INCORRECTO
className="bg-gradient-to-br from-blue-50 to-indigo-50"

// ✅ CORRECTO
className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10"
```

#### 3. **Usa borders con variantes dark**
```tsx
// ❌ INCORRECTO
className="border-blue-200"

// ✅ CORRECTO
className="border-blue-200 dark:border-blue-800"
```

#### 4. **Colores de texto deben tener variante dark**
```tsx
// ❌ INCORRECTO
className="text-blue-700"

// ✅ CORRECTO
className="text-blue-700 dark:text-blue-400"
```

---

## 🎨 Sistema de Variables CSS

### Variables Principales

```css
/* Colores de fondo */
--background      /* Fondo principal de la app */
--card            /* Fondo de tarjetas */
--muted           /* Fondos secundarios/deshabilitados */
--secondary       /* Fondo secondary del tema */
--accent          /* Fondo de acento del tema */

/* Colores de texto */
--foreground           /* Texto principal */
--muted-foreground     /* Texto secundario */
--card-foreground      /* Texto en cards */

/* Colores de tema */
--primary              /* Color primario del tema (naranja/azul/verde/etc) */
--primary-foreground   /* Texto sobre primary */

/* Bordes */
--border              /* Color de bordes estándar */
```

### Uso en Tailwind

```tsx
// Fondos
className="bg-background"
className="bg-card"
className="bg-muted"
className="bg-secondary"
className="bg-accent"

// Texto
className="text-foreground"
className="text-muted-foreground"
className="text-primary"

// Bordes
className="border-border"
className="border-primary"
```

---

## 📦 Componentes de Gradiente

### GradientCard Component

Para cards con gradientes que respetan dark mode:

```tsx
import GradientCard from './components/shared/GradientCard';

// Variantes disponibles
<GradientCard variant="primary">   {/* Usa el color del tema */}
<GradientCard variant="success">   {/* Verde */}
<GradientCard variant="info">      {/* Azul */}
<GradientCard variant="warning">   {/* Ámbar/Naranja */}
<GradientCard variant="subtle">    {/* Secondary/Accent */}
```

**Ejemplo completo:**
```tsx
<GradientCard variant="success" className="mb-4">
  <h3>Título</h3>
  <p className="text-muted-foreground">Descripción</p>
</GradientCard>
```

---

## 🔍 Patrones Comunes

### 1. **Card con Gradiente**
```tsx
<div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 
                border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
  <h3 className="text-foreground">Título</h3>
  <p className="text-blue-700 dark:text-blue-400">Detalle</p>
</div>
```

### 2. **Badge con Color**
```tsx
<Badge className="bg-green-50 dark:bg-green-900/20 
                 text-green-700 dark:text-green-400 
                 border-green-200 dark:border-green-800">
  Activo
</Badge>
```

### 3. **Icon Container con Color**
```tsx
<div className="w-12 h-12 bg-card border border-border rounded-xl 
                flex items-center justify-center">
  <Icon className="w-6 h-6 text-primary" />
</div>
```

### 4. **Hover States**
```tsx
<button className="bg-card hover:bg-muted 
                   border border-border 
                   transition-colors">
  Botón
</button>
```

---

## 🚫 Anti-Patrones (NO HACER)

### ❌ Gradientes sin dark mode
```tsx
// MALO - se ve claro en dark mode
<div className="bg-gradient-to-br from-blue-50 to-blue-100">

// BUENO
<div className="bg-gradient-to-br from-blue-50 to-blue-100 
                dark:from-blue-900/10 dark:to-blue-900/20">
```

### ❌ Backgrounds blancos hardcodeados
```tsx
// MALO
<div className="bg-white">

// BUENO
<div className="bg-card">
```

### ❌ Texto sin variante dark
```tsx
// MALO
<p className="text-gray-700">

// BUENO
<p className="text-muted-foreground">
// o
<p className="text-gray-700 dark:text-gray-300">
```

### ❌ Borders fijos
```tsx
// MALO
<div className="border-gray-200">

// BUENO
<div className="border-border">
// o
<div className="border-gray-200 dark:border-gray-800">
```

---

## 🎯 Checklist de Review

Antes de hacer commit, verifica:

- [ ] ¿Todos los `bg-gradient` tienen variantes dark?
- [ ] ¿No hay `bg-white` o `bg-gray-50` sin alternativa dark?
- [ ] ¿Los borders tienen variantes dark o usan `border-border`?
- [ ] ¿Los textos de color usan variantes dark?
- [ ] ¿Los hovers funcionan en dark mode?
- [ ] ¿Los iconos tienen colores apropiados para dark mode?

---

## 🔧 Testing Dark Mode

### Prueba Manual
1. Activa dark mode desde el selector
2. Navega por todas las secciones
3. Verifica que no haya:
   - Fondos blancos/claros donde no deberían estar
   - Texto ilegible
   - Borders invisibles
   - Iconos mal coloreados

### Componentes Críticos
- Dashboard cards
- Tax & Fiscal sections
- Assets wallets & exchanges
- Banks overview
- AML/KYT status cards
- Empty states
- Loading states
- Modals y dialogs

---

## 📐 Valores de Opacidad para Dark Mode

### Gradientes de color
```tsx
// Light mode: 50, 100
from-blue-50 to-blue-100

// Dark mode: 900 con opacidad baja
dark:from-blue-900/10 dark:to-blue-900/20
```

### Backgrounds
```tsx
// Énfasis bajo
bg-primary/5

// Énfasis medio
bg-primary/10

// Énfasis alto
bg-primary/20
```

### Borders
```tsx
// Sutil
border-primary/20

// Estándar
border-primary/30

// Prominente
border-primary/50
```

---

## 🎨 Paleta de Colores Semánticos

### Success (Verde)
```tsx
// Light
from-green-50 to-emerald-50
border-green-200
text-green-700

// Dark
dark:from-green-900/10 dark:to-emerald-900/10
dark:border-green-800
dark:text-green-400
```

### Info (Azul)
```tsx
// Light
from-blue-50 to-indigo-50
border-blue-200
text-blue-700

// Dark
dark:from-blue-900/10 dark:to-indigo-900/10
dark:border-blue-800
dark:text-blue-400
```

### Warning (Ámbar)
```tsx
// Light
from-amber-50 to-orange-50
border-amber-200
text-amber-700

// Dark
dark:from-amber-900/10 dark:to-orange-900/10
dark:border-amber-800
dark:text-amber-400
```

### Error (Rojo)
```tsx
// Light
from-red-50 to-rose-50
border-red-200
text-red-700

// Dark
dark:from-red-900/10 dark:to-rose-900/10
dark:border-red-800
dark:text-red-400
```

### Primary Theme (Dinámico)
```tsx
// Usa las variables del tema actual
from-primary/10 to-accent
border-primary/30
text-primary
```

---

## 🔄 Migración de Código Existente

### Paso 1: Identificar problemas
```bash
# Buscar gradientes sin dark mode
grep -r "bg-gradient.*from-.*-50" --include="*.tsx"

# Buscar bg-white
grep -r "bg-white" --include="*.tsx"
```

### Paso 2: Reemplazar sistemáticamente
```tsx
// Antes
<div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">

// Después
<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/20 
                border-2 border-blue-200 dark:border-blue-800">
```

### Paso 3: Verificar visualmente
- Activa dark mode
- Revisa cada sección afectada
- Ajusta opacidades si es necesario

---

## 🎓 Recursos

- [Tailwind Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
- `/styles/globals.css` - Variables CSS del proyecto
- `/components/shared/GradientCard.tsx` - Componente de gradiente

---

**Última actualización:** 2025-01-17  
**Autor:** Kontrol Team
