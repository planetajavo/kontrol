# 💸 Guía de Colores para Transacciones - Kontrol

## ⚠️ DEPRECATED - See New Documentation

**This guide is outdated.** The color system has been completely redesigned.

Please refer to the new unified documentation:

📖 **[TRANSACTIONS_UI_UNIFIED.md](./TRANSACTIONS_UI_UNIFIED.md)**

---

## 🔄 Migration Summary

### What Changed

#### ❌ Old System (Removed)
- Background colors on badges (`bg-*-pastel/10`)
- Green for buy transactions
- Red for sell transactions
- Weak borders (`border-*-pastel/20`)

#### ✅ New System (Current)
- **Border-only design** (no backgrounds)
- **Purple** for buy/send transactions (🛒📤)
- **Pink** for sell/manual transactions (💰✏️📋)
- **Indigo** for transfers (🔄)
- **Teal** for swaps (🔀)
- **Cyan** for receive (📥)
- **Bold borders** (`border-2`)
- **Emoji icons** for quick identification

---

## 📚 New Color Mapping

| Old Type | Old Color | New Color | Emoji |
|----------|-----------|-----------|-------|
| Buy | `success-pastel` (green) | `purple-pastel` | 🛒 |
| Sell | `destructive-pastel` (red) | `pink-pastel` | 💰 |
| Transfer | `info-pastel` (blue) | `indigo-pastel` | 🔄 |
| Swap | `warning-pastel` (amber) | `teal-pastel` | 🔀 |

**New types added:**
- Send: `purple-pastel` 📤
- Receive: `cyan-pastel` 📥
- Manual: `pink-pastel` ✏️
- Manual CSV: `pink-pastel` 📋

---

## 🎯 Quick Migration Guide

### Old Code
```tsx
// ❌ Don't use this anymore
<Badge className="bg-success-pastel/10 text-success-pastel border-success-pastel/20">
  Compra
</Badge>
```

### New Code
```tsx
// ✅ Use this instead
<Badge className="text-purple-pastel border-purple-pastel border-2 flex items-center gap-1.5">
  <span>🛒</span>
  <span>Compra</span>
</Badge>
```

---

## 📖 Complete Documentation

For complete information, examples, and implementation details, see:

**→ [TRANSACTIONS_UI_UNIFIED.md](./TRANSACTIONS_UI_UNIFIED.md)**

This includes:
- ✅ Complete color palette reference
- ✅ Code examples for all transaction types
- ✅ Component implementation patterns
- ✅ Accessibility guidelines
- ✅ Future extension plans
- ✅ Visual examples and diagrams

---

**Last Updated:** October 18, 2025  
**Status:** Deprecated - Use TRANSACTIONS_UI_UNIFIED.md instead
