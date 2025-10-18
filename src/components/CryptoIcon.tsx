import React from 'react';

interface CryptoIconProps {
  symbol: string;
  size?: number;
  className?: string;
  variant?: 'color' | 'black' | 'white' | 'icon';
}

/**
 * CryptoIcon component - Displays cryptocurrency icons using cryptocurrency-icons library
 * 
 * @param symbol - Cryptocurrency symbol (e.g., 'btc', 'eth', 'usdt')
 * @param size - Icon size in pixels (default: 32)
 * @param className - Additional CSS classes
 * @param variant - Icon variant: 'color' (default), 'black', 'white', or 'icon'
 * 
 * Supports 400+ cryptocurrencies including:
 * BTC, ETH, USDT, BNB, SOL, ADA, XRP, DOT, MATIC, AVAX, LINK, UNI, AAVE, and many more
 */
export function CryptoIcon({ 
  symbol, 
  size = 32, 
  className = '',
  variant = 'color'
}: CryptoIconProps) {
  const normalizedSymbol = symbol.toLowerCase().trim();
  
  // Map common variations to standard symbols
  const symbolMap: Record<string, string> = {
    'bitcoin': 'btc',
    'ethereum': 'eth',
    'tether': 'usdt',
    'binancecoin': 'bnb',
    'solana': 'sol',
    'cardano': 'ada',
    'ripple': 'xrp',
    'polkadot': 'dot',
    'polygon': 'matic',
    'avalanche': 'avax',
    'chainlink': 'link',
    'uniswap': 'uni',
  };

  const finalSymbol = symbolMap[normalizedSymbol] || normalizedSymbol;
  
  // cryptocurrency-icons CDN URL
  const baseUrl = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master';
  const iconUrl = `${baseUrl}/svg/${variant}/${finalSymbol}.svg`;
  
  return (
    <img
      src={iconUrl}
      alt={`${symbol} icon`}
      width={size}
      height={size}
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      onError={(e) => {
        // Fallback to a generic crypto icon or placeholder
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        // Insert a fallback circle with the first letter
        const parent = target.parentElement;
        if (parent && !parent.querySelector('.crypto-fallback')) {
          const fallback = document.createElement('div');
          fallback.className = `crypto-fallback inline-flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold ${className}`;
          fallback.style.width = `${size}px`;
          fallback.style.height = `${size}px`;
          fallback.style.fontSize = `${size * 0.5}px`;
          fallback.textContent = symbol.charAt(0).toUpperCase();
          parent.appendChild(fallback);
        }
      }}
    />
  );
}

/**
 * CryptoIconList - Predefined list of popular cryptocurrencies
 */
export const popularCryptos = [
  { symbol: 'btc', name: 'Bitcoin' },
  { symbol: 'eth', name: 'Ethereum' },
  { symbol: 'usdt', name: 'Tether' },
  { symbol: 'bnb', name: 'Binance Coin' },
  { symbol: 'sol', name: 'Solana' },
  { symbol: 'usdc', name: 'USD Coin' },
  { symbol: 'xrp', name: 'Ripple' },
  { symbol: 'ada', name: 'Cardano' },
  { symbol: 'avax', name: 'Avalanche' },
  { symbol: 'doge', name: 'Dogecoin' },
  { symbol: 'dot', name: 'Polkadot' },
  { symbol: 'matic', name: 'Polygon' },
  { symbol: 'dai', name: 'Dai' },
  { symbol: 'link', name: 'Chainlink' },
  { symbol: 'uni', name: 'Uniswap' },
  { symbol: 'ltc', name: 'Litecoin' },
  { symbol: 'atom', name: 'Cosmos' },
  { symbol: 'xlm', name: 'Stellar' },
  { symbol: 'algo', name: 'Algorand' },
  { symbol: 'vet', name: 'VeChain' },
  { symbol: 'icp', name: 'Internet Computer' },
  { symbol: 'fil', name: 'Filecoin' },
  { symbol: 'aave', name: 'Aave' },
  { symbol: 'mkr', name: 'Maker' },
  { symbol: 'comp', name: 'Compound' },
  { symbol: 'snx', name: 'Synthetix' },
  { symbol: 'sushi', name: 'SushiSwap' },
  { symbol: 'crv', name: 'Curve' },
  { symbol: 'yfi', name: 'Yearn Finance' },
  { symbol: 'grt', name: 'The Graph' },
  { symbol: 'near', name: 'NEAR Protocol' },
  { symbol: 'ftm', name: 'Fantom' },
  { symbol: 'sand', name: 'The Sandbox' },
  { symbol: 'mana', name: 'Decentraland' },
  { symbol: 'axs', name: 'Axie Infinity' },
];

/**
 * ExchangeIcon - Icons for popular exchanges
 */
interface ExchangeIconProps {
  exchange: string;
  size?: number;
  className?: string;
}

export function ExchangeIcon({ exchange, size = 32, className = '' }: ExchangeIconProps) {
  const normalizedExchange = exchange.toLowerCase().trim();
  
  // Map of exchange logos
  const exchangeLogos: Record<string, string> = {
    'binance': 'bnb',
    'coinbase': 'usdc', // Placeholder, could use custom logo
    'kraken': 'btc', // Placeholder
    'kucoin': 'btc', // Placeholder
    'bybit': 'btc', // Placeholder
    'okx': 'btc', // Placeholder
    'huobi': 'btc', // Placeholder
  };
  
  const symbol = exchangeLogos[normalizedExchange] || 'btc';
  
  return (
    <div className={`relative ${className}`}>
      <CryptoIcon symbol={symbol} size={size} />
      <div 
        className="absolute -bottom-1 -right-1 bg-card border border-border rounded-full px-1 text-xs"
        style={{ fontSize: size * 0.25 }}
      >
        {exchange.substring(0, 2).toUpperCase()}
      </div>
    </div>
  );
}

export default CryptoIcon;
