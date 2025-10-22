// ============================================================================
// INVESTMENT PERFORMANCE - Inversión Fiat y Rentabilidad Total
// ============================================================================

import { motion } from 'motion/react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  Percent,
  Building2,
  ArrowRight,
  PieChart
} from 'lucide-react';
import InfoTooltip from './shared/InfoTooltip';
import { Badge } from './ui/badge';
import { CryptoIcon } from './CryptoIcon';

interface InvestmentPerformanceProps {
  isVisible?: boolean;
}

interface BankTransfer {
  id: string;
  date: string;
  bank: string;
  exchange: string;
  amount: number;
  reference: string;
}

interface AssetHolding {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  percentage: number;
}

export default function InvestmentPerformance({ isVisible = true }: InvestmentPerformanceProps) {
  // Mock data - Based on bank transactions and fund origin
  const totalInvestedFiat = 65000; // Total invertido en fiat
  const currentPortfolioValue = 102150; // Valor actual del portfolio (de PortfolioOverview)
  
  // Calculate performance
  const absoluteProfit = currentPortfolioValue - totalInvestedFiat;
  const profitPercentage = ((absoluteProfit / totalInvestedFiat) * 100);
  const isProfit = absoluteProfit >= 0;
  
  // Bank transfers from banks to exchanges
  const bankTransfers: BankTransfer[] = [
    { id: '1', date: '2023-01-15', bank: 'BBVA', exchange: 'Binance', amount: 15000, reference: 'SEPA-2023-0015' },
    { id: '2', date: '2023-03-22', bank: 'Santander', exchange: 'Kraken', amount: 10000, reference: 'SEPA-2023-0089' },
    { id: '3', date: '2023-06-10', bank: 'BBVA', exchange: 'Coinbase', amount: 12000, reference: 'SEPA-2023-0156' },
    { id: '4', date: '2023-09-05', bank: 'CaixaBank', exchange: 'Binance', amount: 8000, reference: 'SEPA-2023-0234' },
    { id: '5', date: '2024-01-18', bank: 'Santander', exchange: 'Bitfinex', amount: 10000, reference: 'SEPA-2024-0012' },
    { id: '6', date: '2024-05-25', bank: 'BBVA', exchange: 'Kraken', amount: 10000, reference: 'SEPA-2024-0098' },
  ];

  // Current asset holdings
  const assetHoldings: AssetHolding[] = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.5234, value: 45820, percentage: 44.9 },
    { symbol: 'ETH', name: 'Ethereum', amount: 12.45, value: 28500, percentage: 27.9 },
    { symbol: 'SOL', name: 'Solana', amount: 145.67, value: 12300, percentage: 12.0 },
    { symbol: 'ADA', name: 'Cardano', amount: 18543.21, value: 8200, percentage: 8.0 },
    { symbol: 'MATIC', name: 'Polygon', amount: 5234.89, value: 4180, percentage: 4.1 },
    { symbol: 'LINK', name: 'Chainlink', amount: 84.32, value: 1200, percentage: 1.2 },
    { symbol: 'DOT', name: 'Polkadot', amount: 234.56, value: 1150, percentage: 1.1 },
    { symbol: 'UNI', name: 'Uniswap', amount: 156.78, value: 800, percentage: 0.8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-xl border border-border shadow-xl overflow-hidden"
    >
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-foreground">Inversión y Rentabilidad</h3>
                <InfoTooltip 
                  content="Capital invertido en fiat basado en transacciones bancarias y origen de fondos declarado. Rentabilidad calculada desde el inicio de tu actividad."
                  side="right"
                  iconSize={14}
                />
              </div>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className="text-xs border-primary/30 text-primary bg-primary/5"
          >
            Todo el tiempo
          </Badge>
        </div>

        {/* Main Metrics Grid - Always Expanded */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          
          {/* ========== TOTAL INVESTED - ALWAYS EXPANDED ========== */}
          <div className="rounded-xl border-2 border-info-pastel/20 bg-gradient-to-br from-info-pastel/5 via-info-pastel/3 to-transparent overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-info-pastel" />
                  <span className="text-sm text-muted-foreground">Total Invertido</span>
                  <InfoTooltip 
                    content="Suma de transferencias bancarias de tus bancos a exchanges verificadas."
                    iconSize={12}
                  />
                </div>
              </div>
              
              {isVisible ? (
                <div className="text-3xl text-info-pastel mb-2">
                  €{totalInvestedFiat.toLocaleString('es-ES')}
                </div>
              ) : (
                <div className="text-3xl text-foreground mb-2">
                  €••••••
                </div>
              )}
              
              <div className="text-xs text-muted-foreground mb-3">
                {bankTransfers.length} transferencias bancarias
              </div>
            </div>

            {/* Details - Always Visible */}
            <div className="border-t border-info-pastel/20">
              <div className="px-3 py-3 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <div className="text-xs text-muted-foreground mb-2 px-2">Transferencias bancarias:</div>
                <div className="space-y-1.5">
                  {bankTransfers.map((transfer) => (
                    <div
                      key={transfer.id}
                      className="flex items-center justify-between text-xs py-2 px-2 bg-card/50 rounded hover:bg-card/70 transition-colors"
                    >
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3 h-3 text-info-pastel flex-shrink-0" />
                          <span className="text-foreground font-medium">{transfer.bank}</span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">{transfer.exchange}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground/70 text-[10px]">
                          <span>{new Date(transfer.date).toLocaleDateString('es-ES')}</span>
                          <span>•</span>
                          <span className="truncate">{transfer.reference}</span>
                        </div>
                      </div>
                      {isVisible && (
                        <span className="text-foreground font-semibold ml-2 flex-shrink-0">
                          €{transfer.amount.toLocaleString('es-ES')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-info-pastel/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* ========== CURRENT VALUE - ALWAYS EXPANDED ========== */}
          <div className="rounded-xl border-2 border-purple-pastel/20 bg-gradient-to-br from-purple-pastel/5 via-purple-pastel/3 to-transparent overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-purple-pastel" />
                  <span className="text-sm text-muted-foreground">Valor Actual</span>
                  <InfoTooltip 
                    content="Valor total del portfolio basado en precios actuales de mercado."
                    iconSize={12}
                  />
                </div>
              </div>
              
              {isVisible ? (
                <div className="text-3xl text-purple-pastel mb-2">
                  €{currentPortfolioValue.toLocaleString('es-ES')}
                </div>
              ) : (
                <div className="text-3xl text-foreground mb-2">
                  €••••••
                </div>
              )}
              
              <div className="text-xs text-muted-foreground mb-3">
                {assetHoldings.length} activos
              </div>
            </div>

            {/* Details - Always Visible */}
            <div className="border-t border-purple-pastel/20">
              <div className="px-3 py-3 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <div className="text-xs text-muted-foreground mb-2 px-2">Desglose de activos:</div>
                <div className="space-y-1.5">
                  {assetHoldings.map((asset) => (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between text-xs py-2 px-2 bg-card/50 rounded hover:bg-card/70 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <CryptoIcon symbol={asset.symbol} size={16} />
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <span className="text-foreground font-medium">{asset.symbol}</span>
                          {isVisible && (
                            <span className="text-muted-foreground/70 text-[10px] truncate">
                              {asset.amount.toLocaleString('es-ES', { maximumFractionDigits: 8 })} {asset.symbol}
                            </span>
                          )}
                        </div>
                      </div>
                      {isVisible && (
                        <div className="flex flex-col items-end gap-0.5 ml-2">
                          <span className="text-foreground font-semibold">
                            €{asset.value.toLocaleString('es-ES')}
                          </span>
                          <span className="text-muted-foreground text-[10px]">
                            {asset.percentage.toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-purple-pastel/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* ========== PROFIT/ROI - ALWAYS EXPANDED ========== */}
          <div className={`rounded-xl border-2 overflow-hidden ${
            isProfit 
              ? 'border-success-pastel/20 bg-gradient-to-br from-success-pastel/5 via-success-pastel/3 to-transparent'
              : 'border-destructive-pastel/20 bg-gradient-to-br from-destructive-pastel/5 via-destructive-pastel/3 to-transparent'
          }`}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {isProfit ? (
                    <TrendingUp className="w-4 h-4 text-success-pastel" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive-pastel" />
                  )}
                  <span className="text-sm text-muted-foreground">Rentabilidad</span>
                  <InfoTooltip 
                    content="Ganancia o pérdida total con desglose del ROI."
                    iconSize={12}
                  />
                </div>
              </div>
              
              {isVisible ? (
                <div className={`text-3xl mb-2 ${
                  isProfit ? 'text-success-pastel' : 'text-destructive-pastel'
                }`}>
                  {isProfit ? '+' : ''}€{Math.abs(absoluteProfit).toLocaleString('es-ES')}
                </div>
              ) : (
                <div className="text-3xl text-foreground mb-2">
                  €••••••
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-3">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                  isProfit 
                    ? 'bg-success-pastel/20 text-success-pastel'
                    : 'bg-destructive-pastel/20 text-destructive-pastel'
                }`}>
                  <Percent className="w-3 h-3" />
                  <span className="text-xs font-semibold">
                    {isProfit ? '+' : ''}{profitPercentage.toFixed(2)}%
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">ROI</span>
              </div>
            </div>

            {/* Details - Always Visible */}
            <div className={`border-t ${isProfit ? 'border-success-pastel/20' : 'border-destructive-pastel/20'}`}>
              <div className="p-4">
                <div className="text-xs text-muted-foreground space-y-3">
                  {/* Formula */}
                  <div className="bg-card/50 rounded-lg p-3">
                    <div className="text-foreground font-medium mb-2">Cálculo del ROI:</div>
                    <div className="font-mono text-[10px] space-y-1">
                      <div>ROI = (Valor Actual - Inversión) / Inversión × 100</div>
                      {isVisible && (
                        <>
                          <div className="text-muted-foreground">
                            = (€{currentPortfolioValue.toLocaleString('es-ES')} - €{totalInvestedFiat.toLocaleString('es-ES')}) / €{totalInvestedFiat.toLocaleString('es-ES')} × 100
                          </div>
                          <div className={isProfit ? 'text-success-pastel' : 'text-destructive-pastel'}>
                            = {isProfit ? '+' : ''}{profitPercentage.toFixed(2)}%
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    {isProfit ? (
                      <p>
                        Tu portfolio ha generado un <strong className="text-success-pastel">rendimiento positivo de €{Math.abs(absoluteProfit).toLocaleString('es-ES')}</strong> sobre 
                        tu inversión inicial de €{totalInvestedFiat.toLocaleString('es-ES')}, 
                        equivalente a un ROI del <strong className="text-success-pastel">{profitPercentage.toFixed(2)}%</strong>.
                      </p>
                    ) : (
                      <p>
                        Tu portfolio refleja una <strong className="text-destructive-pastel">pérdida de €{Math.abs(absoluteProfit).toLocaleString('es-ES')}</strong> sobre 
                        tu inversión inicial de €{totalInvestedFiat.toLocaleString('es-ES')}, 
                        equivalente a un ROI del <strong className="text-destructive-pastel">{profitPercentage.toFixed(2)}%</strong>.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl pointer-events-none ${
              isProfit ? 'bg-success-pastel/10' : 'bg-destructive-pastel/10'
            }`} />
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
