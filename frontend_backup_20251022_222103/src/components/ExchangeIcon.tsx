interface ExchangeIconProps {
  exchange: string;
  size?: number;
  className?: string;
}

// Exchange logos data - using simple SVG icons
const exchangeLogos: Record<string, { icon: JSX.Element; color: string }> = {
  binance: {
    color: '#F3BA2F',
    icon: (
      <svg viewBox="0 0 126.61 126.61" fill="currentColor">
        <g>
          <polygon points="38.73,53.2 32.08,59.85 32.08,66.5 38.73,73.15 45.38,66.5 45.38,59.85" />
          <polygon points="63.3,38.73 56.65,45.38 63.3,52.03 69.95,45.38" />
          <polygon points="87.88,53.2 81.23,59.85 81.23,66.5 87.88,73.15 94.53,66.5 94.53,59.85" />
          <polygon points="63.3,74.58 56.65,81.23 63.3,87.88 69.95,81.23" />
          <polygon points="63.3,53.2 56.65,59.85 56.65,66.5 63.3,73.15 69.95,66.5 69.95,59.85" />
        </g>
      </svg>
    )
  },
  coinbase: {
    color: '#0052FF',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4zm0 30c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10z"/>
      </svg>
    )
  },
  kraken: {
    color: '#5741D9',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <circle cx="24" cy="24" r="20"/>
        <path fill="white" d="M24 8c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm6 24l-6-6-6 6v-4l6-6 6 6v4zm0-12l-6-6-6 6v-4l6-6 6 6v4z"/>
      </svg>
    )
  },
  'crypto.com': {
    color: '#103F68',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <rect x="4" y="4" width="40" height="40" rx="8"/>
        <text x="24" y="32" fill="white" fontSize="24" textAnchor="middle" fontWeight="bold">C</text>
      </svg>
    )
  },
  bitfinex: {
    color: '#4AD166',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <circle cx="24" cy="24" r="20"/>
        <text x="24" y="32" fill="white" fontSize="24" textAnchor="middle" fontWeight="bold">B</text>
      </svg>
    )
  },
  kucoin: {
    color: '#24AE8F',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <rect x="4" y="4" width="40" height="40" rx="8"/>
        <text x="24" y="32" fill="white" fontSize="24" textAnchor="middle" fontWeight="bold">K</text>
      </svg>
    )
  },
  bybit: {
    color: '#F7A600',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <circle cx="24" cy="24" r="20"/>
        <text x="24" y="32" fill="white" fontSize="22" textAnchor="middle" fontWeight="bold">BY</text>
      </svg>
    )
  },
  okx: {
    color: '#000000',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <rect x="10" y="10" width="10" height="10"/>
        <rect x="28" y="10" width="10" height="10"/>
        <rect x="10" y="28" width="10" height="10"/>
        <rect x="28" y="28" width="10" height="10"/>
        <rect x="19" y="19" width="10" height="10"/>
      </svg>
    )
  },
  bitstamp: {
    color: '#1DB551',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <rect x="4" y="4" width="40" height="40" rx="8"/>
        <text x="24" y="32" fill="white" fontSize="22" textAnchor="middle" fontWeight="bold">BS</text>
      </svg>
    )
  },
};

export function ExchangeIcon({ exchange, size = 32, className = '' }: ExchangeIconProps) {
  const exchangeKey = exchange.toLowerCase().replace(/\s+/g, '');
  const data = exchangeLogos[exchangeKey] || exchangeLogos['binance']; // fallback

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ 
        width: size, 
        height: size,
        color: data.color
      }}
    >
      {data.icon}
    </div>
  );
}

export function getExchangeColor(exchange: string): string {
  const exchangeKey = exchange.toLowerCase().replace(/\s+/g, '');
  return exchangeLogos[exchangeKey]?.color || '#F3BA2F';
}

export default ExchangeIcon;
