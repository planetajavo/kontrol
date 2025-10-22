// ============================================================================
// BALANCE BY LOCATION - Widget de distribución por exchange/wallet con seguridad
// ============================================================================

import { motion } from 'motion/react';
import { Shield, Wallet, Building2, AlertTriangle, Package } from 'lucide-react';
import { useState } from 'react';
import InfoTooltip from './shared/InfoTooltip';
import { Badge } from './ui/badge';

interface LocationData {
  id: string;
  name: string;
  type: 'hardware' | 'hot' | 'exchange' | 'paper';
  value: number;
  percentage: number;
  icon: any;
  securityLevel: 'high' | 'medium' | 'low';
}

interface BalanceByLocationProps {
  isVisible?: boolean;
}

export default function BalanceByLocation({ isVisible = true }: BalanceByLocationProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // Datos coherentes con AssetsSection.tsx
  const locations: LocationData[] = [
    // Hardware Wallets
    {
      id: 'cold-storage',
      name: 'Cold Storage',
      type: 'hardware',
      value: 87234.12,
      percentage: 29.3,
      icon: Shield,
      securityLevel: 'high'
    },
    // Hot Wallets
    {
      id: 'defi-positions',
      name: 'Posiciones DeFi',
      type: 'hot',
      value: 42890.67,
      percentage: 14.4,
      icon: Wallet,
      securityLevel: 'medium'
    },
    {
      id: 'principal-trading',
      name: 'Principal Trading',
      type: 'hot',
      value: 45678.90,
      percentage: 15.3,
      icon: Wallet,
      securityLevel: 'medium'
    },
    {
      id: 'multi-chain',
      name: 'Multi-Chain',
      type: 'hot',
      value: 23567.45,
      percentage: 7.9,
      icon: Wallet,
      securityLevel: 'medium'
    },
    {
      id: 'defi-wallet',
      name: 'DeFi Wallet',
      type: 'hot',
      value: 12456.78,
      percentage: 4.2,
      icon: Wallet,
      securityLevel: 'medium'
    },
    // Paper Wallets
    {
      id: 'nft-collection',
      name: 'NFT Collection',
      type: 'paper',
      value: 8945.23,
      percentage: 3.0,
      icon: Package,
      securityLevel: 'high'
    },
    // Exchanges
    {
      id: 'binance',
      name: 'Binance',
      type: 'exchange',
      value: 34567.89,
      percentage: 11.6,
      icon: Building2,
      securityLevel: 'low'
    },
    {
      id: 'coinbase',
      name: 'Coinbase',
      type: 'exchange',
      value: 23456.78,
      percentage: 7.9,
      icon: Building2,
      securityLevel: 'low'
    },
    {
      id: 'kraken',
      name: 'Kraken',
      type: 'exchange',
      value: 18923.45,
      percentage: 6.4,
      icon: Building2,
      securityLevel: 'low'
    },
  ];

  const totalValue = locations.reduce((sum, loc) => sum + loc.value, 0);
  
  const hardwarePercentage = locations
    .filter(loc => loc.type === 'hardware')
    .reduce((sum, loc) => sum + loc.percentage, 0);
  
  const paperPercentage = locations
    .filter(loc => loc.type === 'paper')
    .reduce((sum, loc) => sum + loc.percentage, 0);
  
  const hotPercentage = locations
    .filter(loc => loc.type === 'hot')
    .reduce((sum, loc) => sum + loc.percentage, 0);
  
  const exchangePercentage = locations
    .filter(loc => loc.type === 'exchange')
    .reduce((sum, loc) => sum + loc.percentage, 0);

  // Security score calculation: hardware+paper (50%), hot (30%), exchange (10%)
  const securePercentage = hardwarePercentage + paperPercentage;
  const securityScore = Math.round((securePercentage * 0.5) + (hotPercentage * 0.3) + (exchangePercentage * 0.1));

  const getSecurityLabel = (level: string) => {
    switch (level) {
      case 'high':
        return { text: 'Seguro', color: 'text-success-pastel' };
      case 'medium':
        return { text: 'Moderado', color: 'text-warning-pastel' };
      case 'low':
        return { text: 'Riesgo', color: 'text-destructive-pastel' };
      default:
        return { text: 'Unknown', color: 'text-muted-foreground' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-xl border border-border shadow-xl overflow-hidden"
    >
      <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-foreground">Security Score</h3>
          <div className="text-3xl text-success-pastel">
            {securityScore}
          </div>
          <InfoTooltip 
            content={
              <div className="space-y-2">
                <p><strong>Hardware Wallets:</strong> Máxima seguridad - tus claves nunca salen del dispositivo.</p>
                <p><strong>Hot Wallets:</strong> Seguridad moderada - conveniente pero conectado a internet.</p>
                <p><strong>Exchanges:</strong> Mantén solo lo que estés tradeando activamente.</p>
              </div>
            }
            side="right"
          />
        </div>
        <p className="text-muted-foreground text-sm">
          Distribución de fondos y nivel de seguridad
        </p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-muted/30 rounded-xl">
        <div className="text-center">
          <div className="text-success-pastel text-2xl mb-1">{securePercentage.toFixed(1)}%</div>
          <div className="text-muted-foreground text-xs flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Seguro</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-warning-pastel text-2xl mb-1">{hotPercentage.toFixed(1)}%</div>
          <div className="text-muted-foreground text-xs flex items-center justify-center gap-1">
            <Wallet className="w-3 h-3" />
            <span>Hot Wallets</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-destructive-pastel text-2xl mb-1">{exchangePercentage.toFixed(1)}%</div>
          <div className="text-muted-foreground text-xs flex items-center justify-center gap-1">
            <Building2 className="w-3 h-3" />
            <span>CEX</span>
          </div>
        </div>
      </div>

      {/* Security Recommendation - Moved before list */}
      <div className="mb-6 p-4 bg-gradient-to-r from-success-pastel/10 to-success-pastel/5 border border-success-pastel/20 rounded-xl">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-success-pastel flex-shrink-0" />
          <div className="text-muted-foreground text-sm">
            {securePercentage > 50 ? 'Excelente distribución de seguridad' : 'Considera usar más hardware wallets para mejorar tu score'}
          </div>
        </div>
      </div>

      {/* Locations List - Scrolleable with fixed height */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pr-2">
        {locations.map((location, index) => {
          const Icon = location.icon;
          const isHovered = hoveredLocation === location.id;
          const security = getSecurityLabel(location.securityLevel);

          return (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
              className={`
                group relative p-4 rounded-xl transition-all duration-300
                ${isHovered 
                  ? 'bg-accent/50 shadow-lg scale-[1.01]' 
                  : 'bg-muted/30 hover:bg-accent/30'
                }
              `}
            >
              <div className="relative flex items-center gap-4">
                {/* Icon - SIN background de color */}
                <div className="p-3 rounded-lg bg-card/50 border border-border/50 flex-shrink-0">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground font-semibold truncate">
                      {location.name}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${security.color} border-current`}
                    >
                      {security.text}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    {isVisible ? (
                      <span className="text-muted-foreground">
                        €{location.value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">€••••••</span>
                    )}
                    <span className="text-primary">
                      {location.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Warning for CEX - Solo al hacer hover */}
              {location.type === 'exchange' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
                  className="mt-3 pt-3 border-t border-border/50 flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5 text-warning-pastel" />
                  <span>
                    Recomendado: Solo mantén fondos en exchanges si estás operando activamente
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      </div>
    </motion.div>
  );
}
