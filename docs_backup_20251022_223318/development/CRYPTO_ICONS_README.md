# 🪙 Crypto Icons Library - Kontrol Dashboard

## ✨ Integración Completa de Iconos Crypto

Hemos integrado la librería **[cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons)** que proporciona acceso a **más de 400 iconos profesionales** de criptomonedas.

---

## 📦 Componentes Creados

### 1. **CryptoIcon** (`/components/CryptoIcon.tsx`)
Componente principal para mostrar iconos de criptomonedas.

```tsx
import { CryptoIcon } from './components/CryptoIcon';

// Uso básico
<CryptoIcon symbol="btc" />

// Con tamaño personalizado
<CryptoIcon symbol="eth" size={48} />

// Con variante
<CryptoIcon symbol="sol" variant="black" size={64} />
```

**Props:**
- `symbol` (string, required): Símbolo de la crypto (ej: 'btc', 'eth', 'usdt')
- `size` (number, default: 32): Tamaño en píxeles
- `className` (string): Clases CSS adicionales
- `variant` ('color' | 'black' | 'white' | 'icon', default: 'color'): Variante visual

### 2. **CryptoIconShowcase** (`/components/CryptoIconShowcase.tsx`)
Galería interactiva para explorar todos los iconos disponibles.

```tsx
import { CryptoIconShowcase } from './components/CryptoIconShowcase';

<CryptoIconShowcase />
```

**Características:**
- 🔍 Búsqueda por nombre o símbolo
- 📏 Selector de tamaños (16-64px)
- 🎨 Selector de variantes (color, black, white, icon)
- 📋 Click para copiar código
- 📱 Diseño responsive

### 3. **WalletIconPicker** (Actualizado)
Selector de iconos mejorado con soporte para crypto icons.

```tsx
import WalletIconPicker from './components/WalletIconPicker';

<WalletIconPicker
  currentIcon={icon}
  onSelectIcon={(newIcon) => setIcon(newIcon)}
>
  <Button>Seleccionar Icono</Button>
</WalletIconPicker>
```

**Pestañas:**
- 🪙 **Crypto**: 35+ iconos crypto populares con búsqueda
- 😀 **Emoji**: 50 emojis tradicionales

---

## 🌟 Características Principales

### ✅ 400+ Criptomonedas Soportadas

**Top Coins:**
BTC, ETH, USDT, BNB, SOL, USDC, XRP, ADA, AVAX, DOGE, DOT, MATIC, DAI, LINK, UNI, LTC, ATOM, XLM, ALGO, VET

**DeFi Tokens:**
AAVE, MKR, COMP, SNX, SUSHI, CRV, YFI, GRT

**NFT & Metaverse:**
SAND, MANA, AXS

**Layer 1 & 2:**
NEAR, FTM, ICP, FIL

### ✅ 4 Variantes Visuales

1. **Color** - Iconos a todo color (por defecto)
2. **Black** - Silueta negra para fondos claros
3. **White** - Silueta blanca para fondos oscuros  
4. **Icon** - Variante monocromática

### ✅ Fallback Inteligente

Si un icono no existe, muestra automáticamente un círculo con la inicial del símbolo usando el color primario del tema.

### ✅ Aliases de Nombres

Soporta nombres completos además de símbolos:

```tsx
<CryptoIcon symbol="bitcoin" />    // → BTC
<CryptoIcon symbol="ethereum" />   // → ETH
<CryptoIcon symbol="tether" />     // → USDT
<CryptoIcon symbol="binancecoin" /> // → BNB
```

---

## 🎯 Casos de Uso

### 1. Lista de Wallets

```tsx
<div className="flex items-center gap-3">
  <CryptoIcon symbol="eth" size={40} />
  <div>
    <p className="font-medium">Ethereum Wallet</p>
    <p className="text-sm text-muted-foreground">0x742d...</p>
  </div>
</div>
```

### 2. Tabla de Transacciones

```tsx
{transactions.map(tx => (
  <tr key={tx.id}>
    <td>
      <div className="flex items-center gap-2">
        <CryptoIcon symbol={tx.asset} size={24} />
        <span>{tx.asset.toUpperCase()}</span>
      </div>
    </td>
    <td>{tx.amount}</td>
    <td>€{tx.value}</td>
  </tr>
))}
```

### 3. Portfolio Distribution

```tsx
{holdings.map(holding => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <CryptoIcon symbol={holding.symbol} size={32} />
      <div>
        <p className="font-medium">{holding.name}</p>
        <p className="text-sm text-muted-foreground">
          {holding.amount} {holding.symbol.toUpperCase()}
        </p>
      </div>
    </div>
    <span className="font-semibold">
      €{holding.value.toLocaleString()}
    </span>
  </div>
))}
```

### 4. Badges con Iconos

```tsx
<Badge variant="outline" className="gap-2">
  <CryptoIcon symbol="btc" size={16} />
  Bitcoin
</Badge>
```

### 5. Asset Selector

```tsx
<Select>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {popularCryptos.map(crypto => (
      <SelectItem key={crypto.symbol} value={crypto.symbol}>
        <div className="flex items-center gap-2">
          <CryptoIcon symbol={crypto.symbol} size={20} />
          <span>{crypto.name}</span>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

## 🚀 Integración Actual

### ✅ Componentes Actualizados

1. **DashboardSection** - Iconos crypto en lista de transacciones
2. **WalletIconPicker** - Selector dual (Crypto + Emoji)
3. **CryptoIconShowcase** - Galería de demostración completa

### 🔜 Próximas Integraciones

- [ ] AssetsSection - Portfolio con iconos crypto
- [ ] TransactionsSection - Lista completa con iconos
- [ ] TaxFiscalSection - Gráficos de distribución por asset
- [ ] WalletsSection - Iconos en cards de wallets
- [ ] NetworkBadge - Iconos de redes blockchain

---

## 📚 Recursos Adicionales

### Lista Completa de Populares

Importa `popularCryptos` para acceder a la lista curada:

```tsx
import { popularCryptos } from './components/CryptoIcon';

// popularCryptos es un array de objetos:
// [
//   { symbol: 'btc', name: 'Bitcoin' },
//   { symbol: 'eth', name: 'Ethereum' },
//   ...
// ]
```

### ExchangeIcon Component

```tsx
import { ExchangeIcon } from './components/CryptoIcon';

<ExchangeIcon exchange="binance" size={32} />
```

---

## 🎨 Personalización

### Con Tailwind Classes

```tsx
<CryptoIcon 
  symbol="eth" 
  size={48}
  className="hover:scale-110 transition-transform cursor-pointer drop-shadow-lg"
/>
```

### Renderizado Condicional

```tsx
function SmartIcon({ icon, size = 32 }) {
  const isCrypto = popularCryptos.some(c => c.symbol === icon);
  
  return isCrypto ? (
    <CryptoIcon symbol={icon} size={size} />
  ) : (
    <span style={{ fontSize: size }}>{icon}</span>
  );
}
```

---

## 🌐 CDN Source

Los iconos se cargan desde el CDN oficial de jsDelivr:

```
https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/{variant}/{symbol}.svg
```

**Ventajas:**
- ✅ Sin instalación de dependencias
- ✅ Cache global CDN
- ✅ Siempre actualizado
- ✅ Rendimiento óptimo

---

## 📖 Documentación Completa

Para más detalles, consulta:
- [`/components/CryptoIconsDocumentation.md`](./components/CryptoIconsDocumentation.md) - Guía completa de uso
- [Repositorio oficial](https://github.com/spothq/cryptocurrency-icons) - Lista de todos los símbolos

---

## 💡 Tips & Best Practices

1. **Usa variant="color" por defecto** - Es la más reconocible
2. **Tamaño recomendado: 24-40px** - Para mejor visibilidad
3. **Implementa fallback** - El componente ya lo hace automáticamente
4. **Usa símbolos en minúsculas** - Más consistente
5. **Combina con badges** - Para contexto adicional

---

## ✨ Ejemplo Completo

```tsx
import { CryptoIcon, popularCryptos } from './components/CryptoIcon';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

function CryptoPortfolio() {
  const holdings = [
    { symbol: 'btc', amount: 0.5, value: 32500 },
    { symbol: 'eth', amount: 5.2, value: 12850 },
    { symbol: 'sol', amount: 150, value: 8250 },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Portfolio</h2>
      <div className="space-y-4">
        {holdings.map(holding => {
          const crypto = popularCryptos.find(c => c.symbol === holding.symbol);
          
          return (
            <div key={holding.symbol} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <CryptoIcon symbol={holding.symbol} size={40} />
                <div>
                  <p className="font-medium">{crypto?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {holding.amount} {holding.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">€{holding.value.toLocaleString()}</p>
                <Badge variant="secondary" className="mt-1">
                  {((holding.value / 53600) * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
```

---

## 🎉 ¡Listo para Usar!

Tu dashboard Kontrol ahora tiene acceso a **400+ iconos crypto profesionales**. Usa `<CryptoIcon symbol="btc" />` en cualquier componente y disfruta de iconos consistentes y de alta calidad en toda tu aplicación.

**Happy coding! 🚀**
