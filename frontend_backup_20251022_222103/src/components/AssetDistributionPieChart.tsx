// ============================================================================
// ASSET DISTRIBUTION PIE CHART - Professional Layout with Real Crypto Colors
// ============================================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { TrendingUp, TrendingDown, ChevronDown, Target } from 'lucide-react';
import { CryptoIcon } from './CryptoIcon';
import InfoTooltip from './shared/InfoTooltip';
import { Badge } from './ui/badge';

interface WalletHolding {
  name: string;
  address: string;
  nativeAmount: number;
  value: number;
}

interface AssetData {
  name: string;
  value: number;
  percentage: number;
  change24h: number;
  symbol: string;
  color: string;
  nativeAmount: number; // Amount in native asset
  wallets?: WalletHolding[]; // Wallet breakdown
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: AssetData;
  }>;
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: AssetData;
  percent: number;
  value: number;
}

// Real crypto brand colors
const CRYPTO_COLORS: Record<string, string> = {
  BTC: '#F7931A', // Bitcoin Orange
  ETH: '#627EEA', // Ethereum Blue
  SOL: '#14F195', // Solana Green
  ADA: '#0033AD', // Cardano Blue
  MATIC: '#8247E5', // Polygon Purple
  USDT: '#26A17B', // Tether Green
  BNB: '#F3BA2F', // Binance Yellow
  XRP: '#23292F', // Ripple Black
  DOT: '#E6007A', // Polkadot Pink
  AVAX: '#E84142', // Avalanche Red
  LINK: '#2A5ADA', // Chainlink Blue
  UNI: '#FF007A', // Uniswap Pink
  OTHER: '#71717A', // Gray for others
};

// Custom Active Shape with subtle expansion
const renderActiveShape = (props: ActiveShapeProps) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={1}
      />
    </g>
  );
};

// Minimal Tooltip with native amount
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isOthers = data.symbol === 'OTROS';

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card/95 backdrop-blur-xl border border-border rounded-lg p-3 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <CryptoIcon symbol={data.symbol} size={20} />
          <span className="text-foreground font-semibold">{data.name}</span>
        </div>
        
        <div className="space-y-1 text-sm">
          {isOthers ? (
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Activos</span>
              <span className="text-foreground">{data.nativeAmount} activos</span>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Cantidad</span>
              <span className="text-foreground">{data.nativeAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} {data.symbol}</span>
            </div>
          )}
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Valor</span>
            <span className="text-foreground">€{data.value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Portfolio</span>
            <span className="text-primary">{data.percentage.toFixed(2)}%</span>
          </div>
        </div>
      </motion.div>
    );
  }
  return null;
};

interface AssetDistributionPieChartProps {
  isVisible?: boolean;
}

export default function AssetDistributionPieChart({ isVisible = true }: AssetDistributionPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [expandedAssets, setExpandedAssets] = useState<Set<string>>(new Set());

  // Mock data with real crypto colors, native amounts and wallet breakdown
  const rawData: AssetData[] = [
    { 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      value: 45820, 
      percentage: 45.2, 
      change24h: 2.34, 
      color: CRYPTO_COLORS.BTC, 
      nativeAmount: 0.5234,
      wallets: [
        { name: 'Ledger Nano X', address: '1A1z...P2Sh', nativeAmount: 0.3234, value: 28320 },
        { name: 'Trezor', address: 'bc1q...x7ty', nativeAmount: 0.2000, value: 17500 },
      ]
    },
    { 
      name: 'Ethereum', 
      symbol: 'ETH', 
      value: 28500, 
      percentage: 28.1, 
      change24h: 1.82, 
      color: CRYPTO_COLORS.ETH, 
      nativeAmount: 12.45,
      wallets: [
        { name: 'MetaMask', address: '0x742...d4E8', nativeAmount: 8.45, value: 19350 },
        { name: 'Coinbase Wallet', address: '0xAb5...9F2c', nativeAmount: 4.00, value: 9150 },
      ]
    },
    { 
      name: 'Solana', 
      symbol: 'SOL', 
      value: 12300, 
      percentage: 12.1, 
      change24h: -0.45, 
      color: CRYPTO_COLORS.SOL, 
      nativeAmount: 145.67,
      wallets: [
        { name: 'Phantom', address: 'DYw...8Qp', nativeAmount: 100.00, value: 8440 },
        { name: 'Solflare', address: 'Hvw...2Mn', nativeAmount: 45.67, value: 3860 },
      ]
    },
    { 
      name: 'Cardano', 
      symbol: 'ADA', 
      value: 8200, 
      percentage: 8.1, 
      change24h: 3.21, 
      color: CRYPTO_COLORS.ADA, 
      nativeAmount: 18543.21,
      wallets: [
        { name: 'Yoroi', address: 'addr1...xy9k', nativeAmount: 12000.00, value: 5310 },
        { name: 'Daedalus', address: 'addr1...mn3p', nativeAmount: 6543.21, value: 2890 },
      ]
    },
    { 
      name: 'Polygon', 
      symbol: 'MATIC', 
      value: 4180, 
      percentage: 4.1, 
      change24h: -1.12, 
      color: CRYPTO_COLORS.MATIC, 
      nativeAmount: 5234.89,
      wallets: [
        { name: 'MetaMask', address: '0x8f2...3Bc1', nativeAmount: 5234.89, value: 4180 },
      ]
    },
    { 
      name: 'LINK', 
      symbol: 'LINK', 
      value: 1200, 
      percentage: 1.2, 
      change24h: 0.56, 
      color: CRYPTO_COLORS.LINK, 
      nativeAmount: 84.32,
      wallets: [
        { name: 'Binance', address: 'Exchange', nativeAmount: 84.32, value: 1200 },
      ]
    },
    { 
      name: 'UNI', 
      symbol: 'UNI', 
      value: 0.80, 
      percentage: 0.001, 
      change24h: -0.23, 
      color: CRYPTO_COLORS.UNI, 
      nativeAmount: 0.15,
      wallets: [
        { name: 'MetaMask', address: '0x123...abc', nativeAmount: 0.15, value: 0.80 },
      ]
    },
    { 
      name: 'DOT', 
      symbol: 'DOT', 
      value: 0.50, 
      percentage: 0.0005, 
      change24h: 1.45, 
      color: CRYPTO_COLORS.DOT, 
      nativeAmount: 0.08,
      wallets: [
        { name: 'Polkadot.js', address: '15oF...wX2p', nativeAmount: 0.08, value: 0.50 },
      ]
    },
  ];

  // Group assets with less than €1 into "Otros"
  const othersThreshold = 1;
  const regularAssets = rawData.filter(asset => asset.value >= othersThreshold);
  const othersAssets = rawData.filter(asset => asset.value < othersThreshold);
  
  const othersTotal = othersAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalValue = rawData.reduce((sum, asset) => sum + asset.value, 0);
  
  const data: AssetData[] = othersAssets.length > 0 
    ? [
        ...regularAssets,
        {
          name: 'Otros',
          symbol: 'OTROS',
          value: othersTotal,
          percentage: (othersTotal / totalValue) * 100,
          change24h: 0,
          color: CRYPTO_COLORS.OTHER,
          nativeAmount: othersAssets.length, // Show count of other assets
          wallets: othersAssets.map(asset => ({
            name: asset.name,
            address: asset.symbol,
            nativeAmount: asset.nativeAmount,
            value: asset.value,
          }))
        }
      ]
    : regularAssets;

  const toggleAssetExpansion = (symbol: string) => {
    setExpandedAssets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(symbol)) {
        newSet.delete(symbol);
      } else {
        newSet.add(symbol);
      }
      return newSet;
    });
  };

  // Categorize assets for diversification score
  const diversification = useMemo(() => {
    const btc = data.find(a => a.symbol === 'BTC');
    const largeCap = data.filter(a => ['ETH', 'BNB', 'XRP', 'SOL', 'ADA'].includes(a.symbol));
    const midCap = data.filter(a => ['MATIC', 'DOT', 'AVAX', 'LINK', 'UNI'].includes(a.symbol));
    const lowCap = data.filter(a => !['BTC', 'ETH', 'BNB', 'XRP', 'SOL', 'ADA', 'MATIC', 'DOT', 'AVAX', 'LINK', 'UNI', 'OTHER'].includes(a.symbol));
    
    const btcPercentage = btc ? btc.percentage : 0;
    const largeCapPercentage = largeCap.reduce((sum, a) => sum + a.percentage, 0);
    const midCapPercentage = midCap.reduce((sum, a) => sum + a.percentage, 0);
    const lowCapPercentage = lowCap.reduce((sum, a) => sum + a.percentage, 0);
    
    // Calculate diversification score (0-100)
    // Ideal: BTC 30-50%, Large Cap 30-40%, Mid Cap 15-20%, Low Cap 5-10%
    const btcScore = Math.max(0, 100 - Math.abs(btcPercentage - 40) * 2);
    const largeScore = Math.max(0, 100 - Math.abs(largeCapPercentage - 35) * 2);
    const midScore = Math.max(0, 100 - Math.abs(midCapPercentage - 17.5) * 3);
    const lowScore = Math.max(0, 100 - Math.abs(lowCapPercentage - 7.5) * 4);
    
    const overallScore = Math.round((btcScore + largeScore + midScore + lowScore) / 4);
    
    return {
      btc: btcPercentage,
      largeCap: largeCapPercentage,
      midCap: midCapPercentage,
      lowCap: lowCapPercentage,
      score: overallScore,
      rating: overallScore >= 75 ? 'Excelente' : overallScore >= 50 ? 'Buena' : overallScore >= 25 ? 'Moderada' : 'Baja'
    };
  }, [data]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-xl border border-border shadow-xl overflow-hidden"
    >
      <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-foreground">Portfolio Distribution</h3>
            <InfoTooltip 
              content="Visualiza cómo se distribuye tu portfolio entre diferentes activos. Haz hover sobre cada segmento para ver detalles."
              side="right"
            />
          </div>
          <div className="text-muted-foreground text-sm">{data.length} assets</div>
        </div>

        {/* Diversification Score */}
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">Diversificación</span>
              <InfoTooltip 
                content="Score basado en distribución óptima: BTC 30-50%, Large Cap 30-40%, Mid Cap 15-20%, Low Cap 5-10%"
                iconSize={12}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl ${
                diversification.score >= 75 ? 'text-success-pastel' :
                diversification.score >= 50 ? 'text-warning-pastel' :
                'text-destructive-pastel'
              }`}>
                {diversification.score}
              </span>
              <Badge variant={
                diversification.score >= 75 ? 'default' : 'outline'
              } className={
                diversification.score >= 75 ? 'bg-success-pastel/20 text-success-pastel' :
                diversification.score >= 50 ? 'bg-warning-pastel/20 text-warning-pastel border-warning-pastel/30' :
                'bg-destructive-pastel/20 text-destructive-pastel border-destructive-pastel/30'
              }>
                {diversification.rating}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-card/50 rounded">
              <span className="text-muted-foreground">BTC</span>
              <span className="text-foreground font-medium">{diversification.btc.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-card/50 rounded">
              <span className="text-muted-foreground">Large Cap</span>
              <span className="text-foreground font-medium">{diversification.largeCap.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-card/50 rounded">
              <span className="text-muted-foreground">Mid Cap</span>
              <span className="text-foreground font-medium">{diversification.midCap.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-card/50 rounded">
              <span className="text-muted-foreground">Low Cap</span>
              <span className="text-foreground font-medium">{diversification.lowCap.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Pie Chart (LEFT) + Asset List (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        
        {/* LEFT: Pie Chart - Smaller */}
        <div className="w-full h-[280px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="transparent"
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      filter: activeIndex === index ? 'brightness(1.2) drop-shadow(0 0 8px currentColor)' : 'brightness(1)',
                      opacity: activeIndex !== undefined && activeIndex !== index ? 0.3 : 1,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* RIGHT: Asset List - Scrollable */}
        <div className="space-y-2">
          <div className="text-muted-foreground text-xs mb-3 uppercase tracking-wider">
            Holdings ({data.length} assets)
          </div>
          
          <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            {data.map((asset, index) => {
              const isPositive = asset.change24h >= 0;
              const isExpanded = expandedAssets.has(asset.symbol);
              const isOthers = asset.symbol === 'OTROS';
              const hasWallets = asset.wallets && asset.wallets.length > 0;

              return (
                <motion.div
                  key={asset.symbol}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-muted/30 rounded-lg overflow-hidden"
                >
                  {/* Main Asset Row */}
                  <button
                    onClick={() => hasWallets && toggleAssetExpansion(asset.symbol)}
                    className={`
                      w-full flex items-center gap-3 p-3 transition-all duration-200 group
                      ${hasWallets ? 'hover:bg-accent/30 cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    {/* Icon + Name */}
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <div 
                        className="p-1.5 rounded-md flex-shrink-0"
                        style={{ 
                          backgroundColor: `${asset.color}15`,
                        }}
                      >
                        <CryptoIcon symbol={asset.symbol} size={20} />
                      </div>
                      
                      <div className="flex flex-col items-start min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 w-full">
                          <span className="text-foreground text-sm font-medium truncate">
                            {asset.name}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {asset.symbol}
                          </span>
                        </div>
                        
                        {/* Native Amount + EUR Value */}
                        <div className="flex items-center gap-2 text-xs">
                          {isVisible ? (
                            <>
                              <span className="text-muted-foreground">
                                {isOthers 
                                  ? `${asset.nativeAmount} activos` 
                                  : `${asset.nativeAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} ${asset.symbol}`
                                }
                              </span>
                              <span className="text-muted-foreground/50">•</span>
                              <span className="text-muted-foreground">
                                €{asset.value.toLocaleString('es-ES')}
                              </span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">€••••••</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Percentage + Change + Expand */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* 24h Change */}
                      {!isOthers && (
                        <div className={`flex items-center gap-0.5 text-xs ${isPositive ? 'text-success' : 'text-destructive'}`}>
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          <span>{isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
                        </div>
                      )}

                      {/* Percentage Badge */}
                      <div 
                        className="px-2.5 py-1 rounded-md font-semibold text-xs min-w-[50px] text-center"
                        style={{ 
                          backgroundColor: `${asset.color}20`,
                          color: asset.color,
                        }}
                      >
                        {asset.percentage.toFixed(1)}%
                      </div>

                      {/* Expand Icon */}
                      {hasWallets && (
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      )}
                    </div>
                  </button>

                  {/* Expanded Wallet List */}
                  <AnimatePresence>
                    {isExpanded && hasWallets && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border/50"
                      >
                        <div className="px-3 py-2 space-y-1.5">
                          {asset.wallets!.map((wallet, wIndex) => (
                            <div
                              key={wIndex}
                              className="flex items-center justify-between text-xs py-1.5 px-2 bg-card/50 rounded"
                            >
                              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                <span className="text-foreground font-medium truncate">
                                  {wallet.name}
                                </span>
                                <span className="text-muted-foreground/70 text-[10px] truncate">
                                  {wallet.address}
                                </span>
                              </div>
                              {isVisible && (
                                <div className="flex flex-col items-end gap-0.5 ml-2">
                                  <span className="text-foreground font-medium">
                                    {isOthers 
                                      ? `€${wallet.value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`
                                      : `${wallet.nativeAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} ${asset.symbol}`
                                    }
                                  </span>
                                  <span className="text-muted-foreground text-[10px]">
                                    €{wallet.value.toLocaleString('es-ES')}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
