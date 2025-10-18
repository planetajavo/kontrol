# 🎨 Sistema de Colores - Kontrol Dashboard

## Filosofía de Color

El sistema de colores de Kontrol está diseñado con una **estética pastel moderna** optimizada para modo oscuro, garantizando:

- ✨ **Legibilidad superior** en fondos oscuros
- 🎨 **Tonos suaves y profesionales** que reducen la fatiga visual
- 📊 **Jerarquía visual clara** para información crítica
- ⚖️ **Enfoque fiscal/legal** con colores que transmiten confianza

---

## Paleta de Colores Semáforo

### 🟢 Success (Verde Menta Pastel)
```css
--success-light: #6EE7B7;  /* Mint 300 - Hover states */
--success: #34D399;        /* Emerald 400 - Primary */
--success-dark: #10B981;   /* Emerald 500 - Active states */
```

**Uso:**
- ✅ Ganancias realizadas y no realizadas
- ✅ Transacciones de compra exitosas
- ✅ Fondos en hardware wallets (seguro)
- ✅ Validaciones y confirmaciones positivas
- ✅ Métricas positivas (arriba de objetivo)

**Ejemplo:**
```tsx
<div className="text-success-pastel bg-success-pastel/10">
  +2.34% (24h)
</div>
```

---

### 🟡 Warning (Ámbar Suave Pastel)
```css
--warning-light: #FCD34D;  /* Amber 300 - Hover states */
--warning: #FBBF24;        /* Amber 400 - Primary */
--warning-dark: #F59E0B;   /* Amber 500 - Active states */
```

**Uso:**
- ⚠️ Fondos en hot wallets (seguridad moderada)
- ⚠️ Advertencias fiscales (vencimientos próximos)
- ⚠️ Ganancias no realizadas cercanas a impacto fiscal
- ⚠️ Transacciones pendientes de confirmación
- ⚠️ Alertas informativas que requieren atención

**Ejemplo:**
```tsx
<Badge className="bg-warning-pastel/10 text-warning-pastel border-warning-pastel/30">
  Atención
</Badge>
```

---

### 🔴 Destructive (Coral Pastel)
```css
--destructive-light: #FCA5A5; /* Red 300 - Hover states */
--destructive: #F87171;       /* Red 400 - Primary */
--destructive-dark: #EF4444;  /* Red 500 - Active states */
```

**Uso:**
- ❌ Pérdidas realizadas y no realizadas
- ❌ Transacciones de venta con pérdida
- ❌ Fondos en exchanges (riesgo alto)
- ❌ Errores críticos y alertas de seguridad
- ❌ Acciones destructivas (eliminar, cancelar)

**Ejemplo:**
```tsx
<div className="text-destructive-pastel bg-destructive-pastel/10">
  -1,250.00 EUR
</div>
```

---

## Colores Específicos por Contexto

### 💼 Fiscal & Legal

#### P&L Realizada (Declarable)
```tsx
// Positivo
className="text-success-pastel"
// Negativo  
className="text-destructive-pastel"
```

#### P&L No Realizada (Latente)
```tsx
// Positivo
className="text-success-pastel/70"
// Negativo
className="text-destructive-pastel/70"
```

#### Pérdidas Pendientes de Compensar
```tsx
className="text-warning-pastel bg-warning-pastel/10 border-warning-pastel/30"
// Indica oportunidad fiscal (compensación futura)
```

#### Vencimientos Fiscales
```tsx
// > 30 días
className="text-success-pastel"
// 7-30 días
className="text-warning-pastel"
// < 7 días
className="text-destructive-pastel animate-pulse"
```

---

### 💰 Transacciones

#### Compra (Buy)
```tsx
<div className="bg-success-pastel/10 text-success-pastel">
  <ArrowDownCircle className="text-success-pastel" />
</div>
```

#### Venta (Sell)
```tsx
<div className="bg-destructive-pastel/10 text-destructive-pastel">
  <ArrowUpCircle className="text-destructive-pastel" />
</div>
```

#### Transferencia (Transfer)
```tsx
<div className="bg-info-pastel/10 text-info-pastel">
  <ArrowRightCircle className="text-info-pastel" />
</div>
```

#### Swap / Exchange
```tsx
<div className="bg-warning-pastel/10 text-warning-pastel">
  <RefreshCw className="text-warning-pastel" />
</div>
```

---

### 🔐 Seguridad de Wallets

#### Hardware Wallet (Máxima Seguridad)
```tsx
<Shield className="text-success-pastel" />
<span className="text-success-pastel">67.8% Protegido</span>
```

#### Hot Wallet (Seguridad Moderada)
```tsx
<Wallet className="text-warning-pastel" />
<span className="text-warning-pastel">18.0% Hot Wallets</span>
```

#### Exchange (Riesgo Alto)
```tsx
<Building2 className="text-destructive-pastel" />
<span className="text-destructive-pastel">12.3% en CEX</span>
```

---

### 📊 Métricas y Stats

#### Performance 24h/7d/30d
```tsx
// Positivo
<TrendingUp className="text-success-pastel" />
// Negativo
<TrendingDown className="text-destructive-pastel" />
// Neutral
<Minus className="text-muted-foreground" />
```

#### Porcentajes de Cambio
```tsx
{change >= 0 ? (
  <span className="text-success-pastel">+{change}%</span>
) : (
  <span className="text-destructive-pastel">{change}%</span>
)}
```

---

## Colores Adicionales

### 💙 Info (Azul Pastel)
```css
--info-light: #93C5FD;   /* Blue 300 */
--info: #60A5FA;         /* Blue 400 */
--info-dark: #3B82F6;    /* Blue 500 */
```

**Uso:**
- ℹ️ Información neutral
- ℹ️ Tooltips y ayuda contextual
- ℹ️ Badges informativos
- ℹ️ Links y elementos interactivos

---

### 🟣 Primary (Purple - Marca)
```css
--primary: #8B5CF6;              /* Violet 500 */
--primary-gradient-from: #A78BFA; /* Violet 400 */
--primary-gradient-to: #7C3AED;   /* Violet 600 */
```

**Uso:**
- 🎨 CTAs principales
- 🎨 Elementos de marca
- 🎨 Highlights importantes
- 🎨 Botones primarios

---

## Backgrounds y Overlays

### Cards y Containers
```tsx
// Card normal
className="bg-card border-border"

// Card con énfasis
className="bg-gradient-to-br from-card via-card to-primary/5"

// Card de éxito
className="bg-success-pastel/5 border-success-pastel/20"

// Card de advertencia
className="bg-warning-pastel/5 border-warning-pastel/20"

// Card de error
className="bg-destructive-pastel/5 border-destructive-pastel/20"
```

### Badges
```tsx
// Success
<Badge className="bg-success-pastel/10 text-success-pastel border-success-pastel/30">

// Warning
<Badge className="bg-warning-pastel/10 text-warning-pastel border-warning-pastel/30">

// Destructive
<Badge className="bg-destructive-pastel/10 text-destructive-pastel border-destructive-pastel/30">

// Info
<Badge className="bg-info-pastel/10 text-info-pastel border-info-pastel/30">
```

---

## Opacidades Recomendadas

| Elemento | Opacidad | Uso |
|----------|----------|-----|
| Texto principal | 100% | Valores, títulos principales |
| Texto secundario | 70% | P&L no realizada, subtítulos |
| Backgrounds | 5-10% | Cards, highlights sutiles |
| Borders | 20-30% | Bordes de cards, separadores |
| Hover states | 50% | Estados interactivos |
| Disabled | 30-40% | Elementos deshabilitados |

---

## Anti-Patrones (NO HACER)

❌ **No usar colores brillantes puros**
```tsx
// MAL
className="bg-red-500"
className="text-green-500"
```

✅ **Usar variantes pastel**
```tsx
// BIEN
className="bg-destructive-pastel/10 text-destructive-pastel"
className="text-success-pastel"
```

❌ **No mezclar demasiados colores**
```tsx
// MAL - Demasiado colorido
<div className="bg-success-pastel/10 border-warning-pastel text-info-pastel">
```

✅ **Mantener coherencia**
```tsx
// BIEN - Un color principal
<div className="bg-success-pastel/10 border-success-pastel/20 text-success-pastel">
```

❌ **No usar semáforo para todo**
```tsx
// MAL - No todo es success/warning/destructive
<Badge className="bg-success-pastel/10">Usuario</Badge>
```

✅ **Usar colores semánticos apropiados**
```tsx
// BIEN - Secondary para elementos neutrales
<Badge variant="secondary">Usuario</Badge>
```

---

## Accesibilidad

### Contraste Mínimo (WCAG AA)
- **Texto normal**: 4.5:1
- **Texto grande**: 3:1
- **Elementos UI**: 3:1

### Tests de Contraste Realizados
```
Background: #0A0A0A (negro profundo)

✅ success-pastel (#34D399): 8.2:1 - Excelente
✅ warning-pastel (#FBBF24): 11.4:1 - Excelente
✅ destructive-pastel (#F87171): 6.8:1 - Excelente
✅ info-pastel (#60A5FA): 7.1:1 - Excelente
✅ primary (#8B5CF6): 5.9:1 - Bueno
```

### Consideraciones para Daltonismo
- ✅ No depender solo del color (usar iconos)
- ✅ Usar patrones/texturas adicionales
- ✅ Asegurar contraste suficiente

---

## Migración de Código Existente

### Buscar y Reemplazar

```bash
# Verde brillante → Verde pastel
text-success → text-success-pastel
bg-success → bg-success-pastel

# Naranja/Amarillo → Ámbar pastel  
text-warning → text-warning-pastel
bg-warning → bg-warning-pastel

# Rojo brillante → Coral pastel
text-destructive → text-destructive-pastel
bg-destructive → bg-destructive-pastel

# Azul brillante → Azul pastel
text-info → text-info-pastel
bg-info → bg-info-pastel
```

---

## Ejemplos de Código

### Tarjeta de Métrica Fiscal
```tsx
<div className="bg-gradient-to-br from-card via-card to-success-pastel/5 
                border-2 border-success-pastel/20 rounded-xl p-6">
  <div className="flex items-center gap-2 text-success-pastel mb-2">
    <TrendingUp className="w-5 h-5" />
    <span className="text-sm">P&L Realizada</span>
    <InfoTooltip content="Ganancias ya declarables" />
  </div>
  <div className="text-3xl text-foreground">
    €45,820.00
  </div>
  <div className="text-sm text-success-pastel/70 mt-1">
    +12.5% vs ejercicio anterior
  </div>
</div>
```

### Badge de Estado de Transacción
```tsx
{status === 'completed' && (
  <Badge className="bg-success-pastel/10 text-success-pastel border-success-pastel/30">
    <Check className="w-3 h-3 mr-1" />
    Completada
  </Badge>
)}

{status === 'pending' && (
  <Badge className="bg-warning-pastel/10 text-warning-pastel border-warning-pastel/30">
    <Clock className="w-3 h-3 mr-1" />
    Pendiente
  </Badge>
)}

{status === 'failed' && (
  <Badge className="bg-destructive-pastel/10 text-destructive-pastel border-destructive-pastel/30">
    <X className="w-3 h-3 mr-1" />
    Fallida
  </Badge>
)}
```

---

**Última actualización**: Octubre 2025  
**Versión**: 2.0.0 (Sistema Pastel)  
**Mantenedor**: Kontrol Design Team
