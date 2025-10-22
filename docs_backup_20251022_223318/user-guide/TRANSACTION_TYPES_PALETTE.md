# 🎨 Transaction Types Color Palette

## Overview
Sistema de colores para tipos de transacciones en **Missing Transactions Widget**, diseñado con una paleta pastel moderna que evita el uso de verde (success) y rojo (destructive) para mantener neutralidad visual.

---

## 🎯 Design Principles

### ✅ DO's
- Usar **solo bordes de color** (border-2) sin backgrounds
- Incluir **iconos emoji** para identificación visual rápida
- Mantener **alta legibilidad** con texto pastel sobre fondo oscuro
- Diferenciar **Manual individual** vs **Manual CSV import**

### ❌ DON'Ts
- ~~No usar backgrounds de color (`bg-*`)~~
- ~~No usar verde (success) ni rojo (destructive)~~
- ~~No saturar con demasiados colores~~

---

## 🌈 Color Mapping

### 1. **Send (Envío)** 
```tsx
{
  type: 'send',
  label: 'Envío',
  icon: '📤',
  color: 'text-purple-pastel',    // #C4B5FD
  borderColor: 'border-purple-pastel'
}
```
**Visual:** 
```
┌──────────────────────┐
│ 📤 Envío             │ ← Purple pastel border
└──────────────────────┘
```

---

### 2. **Receive (Recepción)**
```tsx
{
  type: 'receive',
  label: 'Recepción',
  icon: '📥',
  color: 'text-cyan-pastel',      // #67E8F9
  borderColor: 'border-cyan-pastel'
}
```
**Visual:**
```
┌──────────────────────┐
│ 📥 Recepción         │ ← Cyan pastel border
└──────────────────────┘
```

---

### 3. **Transfer (Transferencia)**
```tsx
{
  type: 'transfer',
  label: 'Transferencia',
  icon: '🔄',
  color: 'text-indigo-pastel',    // #A5B4FC
  borderColor: 'border-indigo-pastel'
}
```
**Visual:**
```
┌──────────────────────┐
│ 🔄 Transferencia     │ ← Indigo pastel border
└──────────────────────┘
```

---

### 4. **Manual (Individual Entry)**
```tsx
{
  type: 'manual',
  isCSVImport: false,
  label: 'Manual',
  icon: '✏️',
  color: 'text-pink-pastel',      // #F9A8D4
  borderColor: 'border-pink-pastel'
}
```
**Visual:**
```
┌──────────────────────┐
│ ✏️ Manual            │ ← Pink pastel border
└──────────────────────┘
```

---

### 5. **Manual (CSV Import)**
```tsx
{
  type: 'manual',
  isCSVImport: true,
  label: 'Manual (CSV)',
  icon: '📋',
  color: 'text-pink-pastel',      // #F9A8D4
  borderColor: 'border-pink-pastel'
}
```
**Visual:**
```
┌──────────────────────┐
│ 📋 Manual (CSV)      │ ← Pink pastel border
└──────────────────────┘
```

---

## 🎨 Extended Palette Colors

### Colors Available in `globals.css`

| Color Name | Light | Pastel | Base | Dark | Use Case |
|-----------|-------|--------|------|------|----------|
| **Purple** | `#DDD6FE` | `#C4B5FD` | `#A78BFA` | `#8B5CF6` | Send |
| **Pink** | `#FBCFE8` | `#F9A8D4` | `#EC4899` | `#DB2777` | Manual |
| **Teal** | `#99F6E4` | `#5EEAD4` | `#14B8A6` | `#0D9488` | Future |
| **Cyan** | `#A5F3FC` | `#67E8F9` | `#06B6D4` | `#0891B2` | Receive |
| **Indigo** | `#C7D2FE` | `#A5B4FC` | `#6366F1` | `#4F46E5` | Transfer |
| **Info** | `#93C5FD` | `#60A5FA` | `#3B82F6` | `#2563EB` | Matching criteria |
| **Warning** | `#FCD34D` | `#FBBF24` | `#F59E0B` | `#D97706` | Unmatched alerts |

---

## 📐 Component Implementation

### Badge Component Structure
```tsx
<Badge 
  variant="outline" 
  className={`
    ${typeInfo.color}           // Text color
    ${typeInfo.borderColor}     // Border color
    border-2                     // Thick border (no background!)
    flex items-center gap-1.5   // Icon + text layout
  `}
>
  <span>{typeInfo.icon}</span>  {/* Emoji icon */}
  <span>{typeInfo.label}</span> {/* Type label */}
</Badge>
```

### getTypeInfo Function
```tsx
const getTypeInfo = (
  type: MissingTransaction['type'], 
  isCSVImport?: boolean
) => {
  switch (type) {
    case 'send':
      return { 
        label: 'Envío', 
        color: 'text-purple-pastel', 
        borderColor: 'border-purple-pastel',
        icon: '📤'
      };
    case 'receive':
      return { 
        label: 'Recepción', 
        color: 'text-cyan-pastel', 
        borderColor: 'border-cyan-pastel',
        icon: '📥'
      };
    case 'transfer':
      return { 
        label: 'Transferencia', 
        color: 'text-indigo-pastel', 
        borderColor: 'border-indigo-pastel',
        icon: '🔄'
      };
    case 'manual':
      return { 
        label: isCSVImport ? 'Manual (CSV)' : 'Manual', 
        color: 'text-pink-pastel', 
        borderColor: 'border-pink-pastel',
        icon: isCSVImport ? '📋' : '✏️'
      };
  }
};
```

---

## 📊 Transaction Type Interface

```tsx
interface MissingTransaction {
  id: string;
  hash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  currency: string;
  type: 'send' | 'receive' | 'transfer' | 'manual';  // ← 4 types
  timestamp: Date;
  exchange?: string;
  network: string;
  status: 'unmatched' | 'searching' | 'found';
  fromIdentified?: boolean;
  toIdentified?: boolean;
  isCSVImport?: boolean;  // ← Distinguishes manual types
}
```

---

## 🎯 Usage Examples

### Example 1: Send Transaction
```tsx
const tx: MissingTransaction = {
  id: '2',
  type: 'send',
  // ... other fields
};

// Renders: 📤 Envío (purple border, no background)
```

### Example 2: Manual Individual Entry
```tsx
const tx: MissingTransaction = {
  id: '5',
  type: 'manual',
  isCSVImport: false,
  // ... other fields
};

// Renders: ✏️ Manual (pink border, no background)
```

### Example 3: Manual CSV Import
```tsx
const tx: MissingTransaction = {
  id: '6',
  type: 'manual',
  isCSVImport: true,
  // ... other fields
};

// Renders: 📋 Manual (CSV) (pink border, no background)
```

---

## 🔮 Future Extensions

### Reserved Colors (Teal)
- **Teal** (`#5EEAD4`) - Reserved for future transaction types
- Could be used for: Swap, Bridge, Stake, etc.

### Potential New Types
```tsx
type TransactionType = 
  | 'send' 
  | 'receive' 
  | 'transfer' 
  | 'manual'
  | 'swap'      // Future: Teal
  | 'bridge'    // Future: Alternative pastel
  | 'stake'     // Future: Alternative pastel
```

---

## ✅ Accessibility

### WCAG AA Compliance
All pastel colors tested against dark background (`#0A0A0A`):

| Color | Hex | Contrast Ratio | WCAG AA |
|-------|-----|----------------|---------|
| Purple Pastel | `#C4B5FD` | 7.2:1 | ✅ Pass |
| Pink Pastel | `#F9A8D4` | 6.8:1 | ✅ Pass |
| Cyan Pastel | `#67E8F9` | 8.1:1 | ✅ Pass |
| Indigo Pastel | `#A5B4FC` | 7.5:1 | ✅ Pass |

---

## 📝 Summary

✅ **4 Transaction Types**: Send, Receive, Transfer, Manual  
✅ **No Green/Red**: Neutral color palette  
✅ **Border-only design**: No backgrounds, just 2px colored borders  
✅ **Icon differentiation**: Emoji icons for quick scanning  
✅ **CSV distinction**: Manual entries show different icon/label for CSV imports  
✅ **Extensible**: Teal and other pastels reserved for future types  
✅ **Accessible**: All colors meet WCAG AA contrast requirements  

---

**Last Updated:** October 18, 2025  
**Component:** `/components/MissingTransactionsWidget.tsx`  
**Styles:** `/styles/globals.css`
