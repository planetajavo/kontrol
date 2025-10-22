import { CryptoIcon } from './CryptoIcon';

interface NetworkBadgeProps {
  network: string;
  size?: 'sm' | 'md';
}

// Network data with crypto symbols and colors
const networkData: Record<string, { symbol: string; color: string; name: string }> = {
  ethereum: { symbol: 'eth', color: '#627EEA', name: 'Ethereum' },
  bitcoin: { symbol: 'btc', color: '#F7931A', name: 'Bitcoin' },
  bsc: { symbol: 'bnb', color: '#F3BA2F', name: 'BSC' },
  polygon: { symbol: 'matic', color: '#8247E5', name: 'Polygon' },
  arbitrum: { symbol: 'eth', color: '#28A0F0', name: 'Arbitrum' },
  optimism: { symbol: 'eth', color: '#FF0420', name: 'Optimism' },
  solana: { symbol: 'sol', color: '#14F195', name: 'Solana' },
  avalanche: { symbol: 'avax', color: '#E84142', name: 'Avalanche' },
  base: { symbol: 'eth', color: '#0052FF', name: 'Base' },
  plasma: { symbol: 'eth', color: '#9945FF', name: 'Plasma' },
};

export default function NetworkBadge({ network, size = 'sm' }: NetworkBadgeProps) {
  const networkKey = network.toLowerCase();
  const data = networkData[networkKey] || { symbol: 'btc', color: '#6B7280', name: network };
  
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2 py-1 gap-1.5',
  };

  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <span 
      className={`inline-flex items-center rounded-md font-medium ${sizeClasses[size]}`}
      style={{ 
        backgroundColor: `${data.color}15`,
        color: data.color,
      }}
    >
      <CryptoIcon symbol={data.symbol} size={iconSize} />
      <span>{data.name}</span>
    </span>
  );
}
