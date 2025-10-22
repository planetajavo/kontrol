# 🎨 KONTROL Design System

> Sistema de diseño modular basado en Atomic Design, inspirado en GitHub

## 📖 Índice

- [Filosofía](#filosofía)
- [Estructura](#estructura)
- [Componentes](#componentes)
- [Guía de Uso](#guía-de-uso)
- [Workflow de Control](#workflow-de-control)
- [Contribuir](#contribuir)

---

## 🎯 Filosofía

### Principios del Design System

1. **Consistencia** - Misma experiencia en toda la app
2. **Reutilización** - Componentes que se usan múltiples veces
3. **Escalabilidad** - Fácil agregar nuevos componentes
4. **Mantenibilidad** - Cambios en un lugar afectan todo
5. **Accesibilidad** - Todos pueden usar la app

### Inspiración: GitHub

Hemos elegido GitHub como referencia por:
- ✅ UI/UX profesional y probada
- ✅ Diseño limpio y enfocado
- ✅ Paleta de colores accesible
- ✅ Componentes bien definidos

---

## 🏗️ Estructura: Atomic Design

```
design-system/
├── atoms/           # Componentes básicos
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   └── Card.tsx
├── molecules/       # Grupos de átomos
│   ├── FormField.tsx
│   └── EmptyState.tsx
├── organisms/       # Componentes complejos
│   └── (futuro)
└── templates/       # Layouts de página
    └── (futuro)
```

### Jerarquía

```
Atoms → Molecules → Organisms → Templates → Pages
```

---

## 🎨 Paleta de Colores

### Canvas (Backgrounds)
```tsx
bg-canvas-default   // #0d1117 - Fondo principal
bg-canvas-subtle    // #161b22 - Fondo secundario (cards)
bg-canvas-inset     // #010409 - Fondo inputs
```

### Neutral (Grises)
```tsx
bg-neutral-emphasis // #6e7681 - Neutral oscuro
bg-neutral-muted    // #484f58 - Neutral medio
bg-neutral-subtle   // #21262d - Neutral claro
```

### Accent (Azul - Acción primaria)
```tsx
bg-accent-emphasis  // #1f6feb - Botones primarios
bg-accent-muted     // #388bfd - Hover
bg-accent-subtle    // #0969da - Variante
```

### Success (Verde)
```tsx
bg-success-emphasis // #2ea043
bg-success-muted    // #238636
bg-success-subtle   // #1a7f37
```

### Danger (Rojo)
```tsx
bg-danger-emphasis  // #f85149
bg-danger-muted     // #da3633
bg-danger-subtle    // #cf222e
```

### Attention (Amarillo)
```tsx
bg-attention-emphasis // #d29922
bg-attention-muted    // #bf8700
bg-attention-subtle   // #9a6700
```

### Text Colors
```tsx
text-fg-default      // #e6edf3 - Texto principal
text-fg-muted        // #7d8590 - Texto secundario
text-fg-subtle       // #6e7681 - Texto terciario
text-fg-onEmphasis   // #ffffff - Texto sobre colores
```

---

## 📦 Componentes

### Atoms (Átomos)

#### Button
```tsx
import { Button } from '@/design-system';

<Button variant="primary">Importar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="danger">Eliminar</Button>
<Button variant="ghost">Cerrar</Button>
```

**Variants**: `primary`, `secondary`, `danger`, `ghost`  
**Sizes**: `sm`, `md`, `lg`  
**Props**: `isLoading`, `disabled`

#### Input
```tsx
import { Input } from '@/design-system';

<Input 
  label="Email" 
  type="email"
  placeholder="tu@email.com"
/>

<Input 
  label="Contraseña"
  type="password"
  error="Contraseña incorrecta"
/>
```

**Props**: `label`, `error`, `helperText`

#### Badge
```tsx
import { Badge } from '@/design-system';

<Badge variant="success">Verified</Badge>
<Badge variant="danger">Failed</Badge>
<Badge variant="accent">New</Badge>
```

**Variants**: `success`, `danger`, `accent`, `neutral`, `attention`

#### Card
```tsx
import { Card } from '@/design-system';

<Card>
  <div className="p-md">Contenido</div>
</Card>

<Card hover>
  <div className="p-md">Con hover effect</div>
</Card>
```

**Props**: `hover` (boolean)

---

### Molecules (Moléculas)

#### FormField
```tsx
import { FormField } from '@/design-system';

<FormField
  label="Email"
  type="email"
  required
  helperText="Tu email de registro"
/>
```

**Combina**: Input + Label + Error/Helper

#### EmptyState
```tsx
import { EmptyState } from '@/design-system';

<EmptyState
  title="Sin direcciones"
  description="Importa tu primera wallet para comenzar"
  actionLabel="Importar Wallet"
  onAction={() => setShowImporter(true)}
/>
```

**Combina**: Icon + Text + Button

---

## 📖 Guía de Uso

### 1. Importar Componentes

```tsx
// ✅ Importar desde el Design System
import { Button, Card, Badge } from '@/design-system';

// ❌ NO importar directamente
import { Button } from '@/design-system/atoms/Button';
```

### 2. Usar Clases de Tailwind

```tsx
// ✅ Usar clases del DS
<div className="bg-canvas-subtle p-md rounded-lg">
  <h2 className="text-fg-default text-xl mb-sm">Título</h2>
</div>

// ❌ NO usar colores hardcoded
<div style={{ background: '#161b22', padding: '24px' }}>
  <h2 style={{ color: '#e6edf3' }}>Título</h2>
</div>
```

### 3. Spacing System

```tsx
// Usar spacing del DS
className="p-sm"      // padding: 16px
className="mb-md"     // margin-bottom: 24px
className="gap-2xs"   // gap: 8px

// Sistema completo:
4xs: 2px
3xs: 4px
2xs: 8px
xs:  12px
sm:  16px
md:  24px
lg:  32px
xl:  40px
2xl: 48px
3xl: 64px
```

### 4. Typography

```tsx
// Headings
<h1 className="text-3xl font-bold text-fg-default">H1</h1>
<h2 className="text-2xl font-semibold text-fg-default">H2</h2>
<h3 className="text-xl font-semibold text-fg-default">H3</h3>

// Body
<p className="text-base text-fg-default">Párrafo normal</p>
<p className="text-sm text-fg-muted">Texto secundario</p>

// Code
<code className="font-mono text-sm bg-canvas-inset px-2xs py-4xs rounded">
  código
</code>
```

---

## 🔍 Workflow de Control

### Detectar Componentes Fuera del DS

#### 1. Reglas de Linting (Futuro)

```json
// .eslintrc.json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": [{
        "group": ["**/components/**"],
        "message": "Usar componentes del Design System (@/design-system)"
      }]
    }]
  }
}
```

#### 2. Checklist Pre-Commit

Antes de crear un componente nuevo, pregúntate:

- [ ] ¿Ya existe en el Design System?
- [ ] ¿Es suficientemente genérico para reutilizar?
- [ ] ¿Sigue las convenciones de naming?
- [ ] ¿Usa colores del Design System?
- [ ] ¿Usa spacing del Design System?

#### 3. Proceso de Aprobación

```
Nueva Feature
    ↓
¿Necesita componente nuevo?
    ↓
   Sí → ¿Existe en DS?
           ↓
          No → Crear en DS
           ↓
          Sí → Usar existente
    ↓
Implementar Feature
    ↓
Code Review
    ↓
✅ Merge
```

#### 4. Archivo de Tracking

Mantener `DESIGN_SYSTEM_TODOS.md`:

```markdown
# Design System TODOs

## Componentes Fuera del DS
- [ ] AddressImporter (migrar a usar FormField)
- [ ] DebugConsole (migrar a usar Card)

## Próximos Componentes
- [ ] Table
- [ ] Modal
- [ ] Dropdown
- [ ] Tabs
```

---

## 🚀 Contribuir al Design System

### Agregar un Nuevo Átomo

```tsx
// src/design-system/atoms/NuevoComponente.tsx

interface NuevoComponenteProps {
  // Props aquí
}

/**
 * NuevoComponente Atom - Design System Component
 * 
 * Inspiración: GitHub [referencia]
 * Uso: [descripción del uso]
 * 
 * @example
 * <NuevoComponente prop="valor" />
 */
export const NuevoComponente = (props: NuevoComponenteProps) => {
  // Implementación
  return <div>...</div>;
};
```

**Pasos**:
1. Crear archivo en `atoms/`
2. Exportar en `atoms/index.ts`
3. Documentar con JSDoc
4. Agregar ejemplo de uso
5. Usar colores y spacing del DS

### Agregar una Nueva Molécula

Similar a átomos, pero **debe combinar al menos 2 átomos**.

---

## 📊 Métricas de Adopción

### Objetivos

- ✅ 100% de botones usan `<Button>`
- ✅ 100% de inputs usan `<Input>` o `<FormField>`
- ✅ 0 colores hardcoded
- ✅ 0 spacing hardcoded

### Tracking

```bash
# Buscar colores hardcoded
grep -r "background.*#" src/

# Buscar spacing hardcoded
grep -r "padding.*px" src/

# Buscar imports incorrectos
grep -r "import.*components" src/
```

---

## 🎓 Recursos

### Inspiración
- [GitHub Primer Design System](https://primer.style/)
- [Tailwind CSS](https://tailwindcss.com)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

### Herramientas
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Figma](https://figma.com) - Para diseñar componentes

---

## ❓ FAQ

### ¿Cuándo crear un componente en el DS?

✅ **Sí**, si:
- Se usa en 2+ lugares
- Es genérico y reutilizable
- Sigue patrones del DS

❌ **No**, si:
- Es específico de una página
- No es reutilizable
- Tiene lógica de negocio

### ¿Cómo modifico un componente del DS?

1. Crear issue explicando el cambio
2. Hacer cambios en `design-system/`
3. Actualizar documentación
4. Probar en todos los usos
5. Code review
6. Merge

### ¿Puedo usar CSS custom en componentes?

❌ **Evitar** CSS inline o custom
✅ **Usar** clases de Tailwind del DS
✅ **Si necesitas algo nuevo**, agrégalo al DS

---

## 📝 Changelog

### v1.0.0 (2025-10-22)
- ✅ Setup inicial de Tailwind CSS
- ✅ Paleta de colores GitHub-inspired
- ✅ Átomos: Button, Input, Badge, Card
- ✅ Moléculas: FormField, EmptyState
- ✅ Documentación completa
- ✅ Workflow de control

---

**Última actualización**: 2025-10-22  
**Versión**: v1.0.0  
**Mantenedores**: KONTROL Team
