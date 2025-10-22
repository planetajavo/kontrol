# 📘 Sistema de Tooltips Informativos - Kontrol

## Descripción

El sistema de tooltips permite añadir información contextual en cualquier parte de la aplicación mediante iconos pequeños y discretos que muestran información al hacer hover.

## Componente: InfoTooltip

### Ubicación
```
/components/shared/InfoTooltip.tsx
```

### Uso Básico

```tsx
import InfoTooltip from './shared/InfoTooltip';

// Tooltip simple con texto
<InfoTooltip content="Esta es una explicación útil" />

// Tooltip con HTML personalizado
<InfoTooltip 
  content={
    <div className="space-y-2">
      <p><strong>Título:</strong> Explicación detallada</p>
      <p>Más información aquí</p>
    </div>
  }
/>
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `content` | `string \| React.ReactNode` | - | **Requerido.** Contenido del tooltip |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Posición del tooltip |
| `className` | `string` | `''` | Clases CSS adicionales para el icono |
| `iconSize` | `number` | `14` | Tamaño del icono en pixels |

### Ejemplos de Uso en el Proyecto

#### 1. En Headers de Widgets

```tsx
<div className="flex items-center gap-2 mb-2">
  <h3 className="text-foreground">Total Portfolio Value</h3>
  <InfoTooltip 
    content="Valor total de todos tus activos en EUR, calculado en tiempo real."
    side="right"
  />
</div>
```

#### 2. En Formularios

```tsx
<label className="flex items-center gap-2">
  <span>Dirección de Wallet</span>
  <InfoTooltip 
    content="Ingresa la dirección pública de tu wallet. Nunca compartas tu clave privada."
    side="right"
    iconSize={12}
  />
</label>
```

#### 3. En Métricas y Stats

```tsx
<div className="flex items-center gap-1">
  <span>Security Score</span>
  <InfoTooltip 
    content={
      <div className="space-y-1">
        <p>Score calculado basado en:</p>
        <ul className="list-disc list-inside text-xs">
          <li>% en hardware wallets (50%)</li>
          <li>% en hot wallets (30%)</li>
          <li>% en exchanges (10%)</li>
        </ul>
      </div>
    }
  />
</div>
```

#### 4. En Badges y Tags

```tsx
<Badge className="flex items-center gap-1">
  <span>Riesgo Alto</span>
  <InfoTooltip 
    content="Este activo tiene alta volatilidad y riesgo de pérdida."
    iconSize={12}
  />
</Badge>
```

#### 5. En Secciones Colapsables (CollapsibleSection)

```tsx
<CollapsibleSection 
  title={
    <div className="flex items-center gap-2">
      <span>Distribución temporal</span>
      <InfoTooltip 
        content="Visualiza el volumen de transacciones a lo largo del tiempo."
        side="right"
      />
    </div>
  }
  description="Análisis de volumen"
  defaultOpen={true}
>
  {/* Contenido */}
</CollapsibleSection>
```

## Componentes que Ya Usan InfoTooltip

1. **TotalPortfolioValue** - Explicación del cálculo del valor total
2. **BalanceByLocation** - Info sobre tipos de wallets y seguridad
3. **AssetBalanceBreakdown** - Detalles sobre el desglose de activos
4. **AssetDistributionPieChart** - Guía de uso del pie chart

## Recomendaciones de Uso

### ✅ Cuándo Usar Tooltips

- **Términos técnicos**: Explicar jerga crypto o financiera
- **Cálculos complejos**: Detallar cómo se obtienen métricas
- **Advertencias de seguridad**: Alertar sobre riesgos
- **Guías de uso**: Ayudar con funcionalidades no obvias
- **Información contextual**: Proveer detalles adicionales sin saturar la UI

### ❌ Cuándo NO Usar Tooltips

- **Información crítica**: Si es esencial, muéstrala directamente
- **Acciones principales**: Los botones principales deben ser autoexplicativos
- **En mobile**: Los tooltips de hover no funcionan bien en touch devices
- **Demasiados tooltips**: No abuses, puede saturar la interfaz

## Estilo y Diseño

### Características Visuales

- 🎨 **Icono**: HelpCircle de lucide-react
- 📏 **Tamaño por defecto**: 14px
- 🎭 **Color**: `text-muted-foreground` → `text-foreground` en hover
- ✨ **Animación**: Suave transición de color
- 🌈 **Fondo**: Backdrop blur para efecto glassmorphism
- 📦 **Max-width**: 300px (xs) para legibilidad

### Personalización

```tsx
// Tooltip más pequeño para espacios reducidos
<InfoTooltip 
  content="Info breve"
  iconSize={12}
  className="opacity-50 hover:opacity-100"
/>

// Tooltip con más contexto visual
<InfoTooltip 
  content={
    <div className="space-y-2 p-1">
      <div className="flex items-center gap-2 text-primary">
        <Shield className="w-4 h-4" />
        <strong>Seguridad</strong>
      </div>
      <p className="text-xs">Hardware wallets ofrecen la máxima protección...</p>
    </div>
  }
  side="bottom"
/>
```

## Integración con Shadcn UI

El componente usa el sistema de tooltips de Shadcn UI:

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
```

- ✅ Totalmente compatible con el theme system
- ✅ Accesible (keyboard navigation)
- ✅ Responsive
- ✅ Animaciones suaves

## Próximos Pasos

### Sugerencias de Implementación

1. **Tax & Fiscal Section**: Explicar términos fiscales y cálculos de impuestos
2. **My Assets**: Detalles sobre tipos de activos y riesgos
3. **My Transactions**: Ayuda con filtros y acciones
4. **Banks**: Info sobre conexiones bancarias
5. **AML & KYT**: Explicaciones de compliance y regulaciones

### Template de Implementación

```tsx
// 1. Importar el componente
import InfoTooltip from './shared/InfoTooltip';

// 2. Usar junto a labels, headers o métricas
<div className="flex items-center gap-2">
  <span>Tu Label</span>
  <InfoTooltip 
    content="Tu explicación útil aquí"
    side="right"
  />
</div>
```

## Accesibilidad

- ✅ **Keyboard accessible**: Tab + Enter para abrir
- ✅ **ARIA labels**: Implementados automáticamente por Shadcn
- ✅ **Screen readers**: Compatible
- ✅ **Focus visible**: Indicadores de foco claros

## Performance

- ⚡ **Lazy rendering**: El contenido solo se renderiza cuando es necesario
- ⚡ **Delay optimizado**: 200ms para evitar tooltips accidentales
- ⚡ **Lightweight**: Componente minimalista sin dependencias pesadas

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0  
**Autor**: Kontrol Dashboard Team
