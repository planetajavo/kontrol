import { CryptoIcon, popularCryptos } from './CryptoIcon';

interface SmartIconProps {
  icon: string;
  size?: number;
  className?: string;
}

/**
 * SmartIcon - Renders crypto icons or emojis intelligently
 * If the icon is a known crypto symbol, renders CryptoIcon
 * Otherwise, renders as emoji
 */
export function SmartIcon({ icon, size = 32, className = '' }: SmartIconProps) {
  // Check if it's a crypto symbol
  const isCrypto = popularCryptos.some(c => c.symbol === icon.toLowerCase());
  
  if (isCrypto) {
    return <CryptoIcon symbol={icon.toLowerCase()} size={size} className={className} />;
  }
  
  // Render as emoji
  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ fontSize: `${size * 0.8}px` }}
    >
      {icon}
    </span>
  );
}

export default SmartIcon;
