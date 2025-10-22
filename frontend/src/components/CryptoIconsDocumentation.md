# Crypto Icons Library - Kontrol Dashboard

## 📦 Librería de Iconos Crypto

Kontrol ahora incluye una librería completa de iconos de criptomonedas con más de **400+ logos** profesionales gracias a [cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons).

## 🚀 Uso Básico

### Importar el componente

```tsx
import { CryptoIcon } from './components/CryptoIcon';
```

### Uso simple

```tsx
<CryptoIcon symbol="btc" />
<CryptoIcon symbol="eth" size={48} />
<CryptoIcon symbol="bnb" size={64} variant="color" />
```

## 📝 Props del componente

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `symbol` | `string` | required | Símbolo de la criptomoneda (e.g., 'btc', 'eth', 'usdt') |
| `size` | `number` | `32` | Tamaño del icono en píxeles |
| `className` | `string` | `''` | Clases CSS adicionales |
| `variant` | `'color' \| 'black' \| 'white' \| 'icon'` | `'color'` | Variante del icono |

## 🎨 Variantes disponibles

### Color (por defecto)
Iconos a todo color con el branding oficial de cada criptomoneda.

```tsx
<CryptoIcon symbol="btc" variant="color" size={48} />
```

### Black
Silueta en negro, ideal para fondos claros.

```tsx
<CryptoIcon symbol="eth" variant="black" size={48} />
```

### White
Silueta en blanco, ideal para fondos oscuros.

```tsx
<CryptoIcon symbol="sol" variant="white" size={48} />
```

### Icon
Variante monocromática del icono.

```tsx
<CryptoIcon symbol="ada" variant="icon" size={48} />
```

## 💎 Criptomonedas Soportadas

### Top Cryptocurrencies

- **Bitcoin (BTC)**
- **Ethereum (ETH)**
- **Tether (USDT)**
- **Binance Coin (BNB)**
- **Solana (SOL)**
- **USD Coin (USDC)**
- **Ripple (XRP)**
- **Cardano (ADA)**
- **Avalanche (AVAX)**
- **Dogecoin (DOGE)**
- **Polkadot (DOT)**
- **Polygon (MATIC)**
- **Dai (DAI)**
- **Chainlink (LINK)**
- **Uniswap (UNI)**
- **Litecoin (LTC)**
- **Cosmos (ATOM)**
- **Stellar (XLM)**
- **Algorand (ALGO)**
- **VeChain (VET)**

### DeFi Tokens

- **Aave (AAVE)**
- **Maker (MKR)**
- **Compound (COMP)**
- **Synthetix (SNX)**
- **SushiSwap (SUSHI)**
- **Curve (CRV)**
- **Yearn Finance (YFI)**
- **The Graph (GRT)**

### NFT & Metaverse

- **The Sandbox (SAND)**
- **Decentraland (MANA)**
- **Axie Infinity (AXS)**

### Layer 1 & 2

- **NEAR Protocol (NEAR)**
- **Fantom (FTM)**
- **Internet Computer (ICP)**
- **Filecoin (FIL)**

Y muchas más... **400+ en total**!

## 🔍 Lista de Populares

Puedes importar la lista de criptomonedas populares:

```tsx
import { popularCryptos } from './components/CryptoIcon';

popularCryptos.map(crypto => (
  <div key={crypto.symbol}>
    <CryptoIcon symbol={crypto.symbol} />
    <span>{crypto.name}</span>
  </div>
))
```

## 🎯 Componente Showcase

Para explorar todos los iconos disponibles, usa el componente de demostración:

```tsx
import { CryptoIconShowcase } from './components/CryptoIconShowcase';

<CryptoIconShowcase />
```

Este componente incluye:
- ✅ Búsqueda por nombre o símbolo
- ✅ Selector de tamaño (16-64px)
- ✅ Selector de variantes (color, black, white, icon)
- ✅ Click para copiar código
- ✅ Grid responsive
- ✅ Instrucciones de uso

## 🛠️ Integración con WalletIconPicker

El `WalletIconPicker` ahora incluye dos pestañas:

1. **Crypto**: Iconos reales de criptomonedas con búsqueda
2. **Emoji**: Iconos emoji tradicionales

```tsx
import WalletIconPicker from './components/WalletIconPicker';

<WalletIconPicker
  currentIcon={walletIcon}
  onSelectIcon={(icon) => setWalletIcon(icon)}
>
  <button>Seleccionar icono</button>
</WalletIconPicker>
```

## 🎨 Renderizado condicional

Puedes renderizar diferentes tipos de iconos según el valor:

```tsx
function WalletIcon({ icon, size = 32 }) {
  // Si es un símbolo de crypto conocido
  const isCrypto = popularCryptos.some(c => c.symbol === icon);
  
  if (isCrypto) {
    return <CryptoIcon symbol={icon} size={size} />;
  }
  
  // Si no, mostrar como emoji
  return <span style={{ fontSize: size }}>{icon}</span>;
}
```

## 📦 CDN Source

Los iconos se cargan desde el CDN oficial:

```
https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/{symbol}.svg
```

## ⚡ Fallback Automático

Si un icono no está disponible, el componente muestra automáticamente un fallback con la primera letra del símbolo en un círculo con el color primario del tema.

## 🌐 Aliases Soportados

El componente soporta nombres completos además de símbolos:

```tsx
<CryptoIcon symbol="bitcoin" />    {/* → BTC */}
<CryptoIcon symbol="ethereum" />   {/* → ETH */}
<CryptoIcon symbol="tether" />     {/* → USDT */}
<CryptoIcon symbol="binancecoin" /> {/* → BNB */}
```

## 💡 Ejemplos de Uso Real

### En lista de wallets

```tsx
<div className="flex items-center gap-3">
  <CryptoIcon symbol="eth" size={40} />
  <div>
    <p className="font-medium">Ethereum Wallet</p>
    <p className="text-sm text-muted-foreground">0x742d...</p>
  </div>
</div>
```

### En tabla de transacciones

```tsx
<table>
  <tbody>
    {transactions.map(tx => (
      <tr key={tx.id}>
        <td>
          <CryptoIcon symbol={tx.asset} size={24} />
        </td>
        <td>{tx.amount}</td>
        <td>{tx.asset.toUpperCase()}</td>
      </tr>
    ))}
  </tbody>
</table>
```

### En badges

```tsx
<Badge variant="outline" className="gap-2">
  <CryptoIcon symbol="btc" size={16} />
  Bitcoin
</Badge>
```

### En gráficos de portfolio

```tsx
<div className="space-y-2">
  {holdings.map(holding => (
    <div key={holding.symbol} className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CryptoIcon symbol={holding.symbol} size={32} />
        <span>{holding.name}</span>
      </div>
      <span>${holding.value.toLocaleString()}</span>
    </div>
  ))}
</div>
```

## 🔧 Personalización Avanzada

### Con estilos custom

```tsx
<CryptoIcon 
  symbol="btc" 
  size={48}
  className="hover:scale-110 transition-transform cursor-pointer"
/>
```

### Con sombras

```tsx
<CryptoIcon 
  symbol="eth" 
  size={64}
  className="drop-shadow-lg"
/>
```

### En modo dark

```tsx
{/* Usa variant="white" en modo oscuro */}
<div className="dark:bg-gray-900 p-4">
  <CryptoIcon symbol="sol" variant="white" size={48} />
</div>
```

## 📚 Recursos Adicionales

- [Cryptocurrency Icons Repository](https://github.com/spothq/cryptocurrency-icons)
- [Lista completa de símbolos soportados](https://github.com/spothq/cryptocurrency-icons/tree/master/svg/color)

## 🎉 ¡Listo!

Ya tienes acceso a la librería más completa de iconos crypto para tu dashboard Kontrol. Disfruta de iconos profesionales y consistentes en todo tu aplicación.
