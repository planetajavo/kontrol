// ============================================================================
// RESUMEN FISCAL - Widget de información fiscal del dashboard
// ============================================================================

import { motion } from 'motion/react';
import { 
  TrendingUp,
  AlertCircle,
  FileText,
  Calculator,
  Scale,
  ChevronDown,
  ChevronUp,
  History,
  UserPlus,
  Info
} from 'lucide-react';
import { useState } from 'react';
import InfoTooltip from './shared/InfoTooltip';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface ResumenFiscalProps {
  isVisible?: boolean;
}

export default function ResumenFiscal({ isVisible = true }: ResumenFiscalProps) {
  const [realizedExpanded, setRealizedExpanded] = useState(false);
  const [unrealizedExpanded, setUnrealizedExpanded] = useState(false);
  const [fifoByExchange, setFifoByExchange] = useState(false);
  
  // Fiscal data
  const currentYearRealizedPnL = 12450.50;
  const currentYearUnrealizedPnL = 8320.75;
  const pendingLossCompensation = -3200.00;
  const estimatedTax = 2965.00;
  
  const netTaxableGain = currentYearRealizedPnL + pendingLossCompensation;
  const effectiveTaxRate = (estimatedTax / currentYearRealizedPnL) * 100;
  
  // Mock detailed data
  const realizedTransactions = [
    { asset: 'BTC', amount: 8500.50, date: '2025-09-15', type: 'venta' },
    { asset: 'ETH', amount: 3200.00, date: '2025-08-22', type: 'venta' },
    { asset: 'SOL', amount: 750.00, date: '2025-07-10', type: 'venta' },
  ];
  
  const unrealizedPositions = [
    { asset: 'BTC', amount: 4200.75, purchasePrice: 45000, currentPrice: 48500 },
    { asset: 'ETH', amount: 2800.00, purchasePrice: 2200, currentPrice: 2450 },
    { asset: 'ADA', amount: 1320.00, purchasePrice: 0.35, currentPrice: 0.42 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-foreground">Resumen Fiscal 2025</h3>
                <InfoTooltip 
                  content={
                    <div className="space-y-2">
                      <p><strong>P&L Realizada:</strong> Ganancias/pérdidas de ventas ejecutadas. Declarable en IRPF 2025.</p>
                      <p><strong>P&L No Realizada:</strong> Plusvalía latente. No tributa hasta vender.</p>
                      <p><strong>Pérdidas Compensables:</strong> Pérdidas de años anteriores que reducen tu base imponible.</p>
                    </div>
                  }
                  side="right"
                  iconSize={14}
                />
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="gap-2">
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ver ejercicios pasados</span>
            <span className="sm:hidden">Historial</span>
          </Button>
        </div>

        {/* FIFO Calculation Mode Selector */}
        <div className="mb-6 p-4 bg-muted/20 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-primary" />
              <Label htmlFor="fifo-mode" className="text-sm text-foreground cursor-pointer">
                Modalidad de Cálculo
              </Label>
              <InfoTooltip 
                content={
                  <div className="space-y-2">
                    <p><strong>FIFO Global:</strong> Primero en entrar, primero en salir aplicado a todas tus adquisiciones, sin importar el exchange.</p>
                    <p><strong>FIFO por Exchange:</strong> Aplica FIFO de forma independiente en cada exchange. Respaldado por consulta vinculante V2253-21 de la AEAT.</p>
                  </div>
                }
                side="left"
                iconSize={12}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">FIFO Global</span>
              <Switch
                id="fifo-mode"
                checked={fifoByExchange}
                onCheckedChange={setFifoByExchange}
              />
              <span className="text-xs text-muted-foreground">FIFO por Exchange</span>
            </div>
          </div>

          {fifoByExchange && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-2 p-3 bg-info-pastel/10 rounded-lg border border-info-pastel/20"
            >
              <Info className="w-4 h-4 text-info-pastel flex-shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <strong className="text-foreground">Nota oficial:</strong> El cálculo FIFO por exchange está respaldado por la{' '}
                <span className="text-info-pastel font-semibold">consulta vinculante V2253-21</span> de la Agencia Tributaria española, 
                que permite aplicar el criterio FIFO de forma independiente en cada plataforma de intercambio.
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-4">
          {/* Fiscal Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Realized P&L - Collapsible */}
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <button
                onClick={() => setRealizedExpanded(!realizedExpanded)}
                className="w-full p-4 text-left hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calculator className={`w-4 h-4 ${
                      currentYearRealizedPnL >= 0 ? 'text-success-pastel' : 'text-destructive-pastel'
                    }`} />
                    <span className="text-sm text-muted-foreground">P&L Realizada</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        currentYearRealizedPnL >= 0
                          ? 'text-success-pastel border-success-pastel/30'
                          : 'text-destructive-pastel border-destructive-pastel/30'
                      }`}
                    >
                      Declarable
                    </Badge>
                  </div>
                  {realizedExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                {isVisible ? (
                  <div className={`text-2xl font-semibold ${
                    currentYearRealizedPnL >= 0 ? 'text-success-pastel' : 'text-destructive-pastel'
                  }`}>
                    {currentYearRealizedPnL >= 0 ? '+' : ''}€{currentYearRealizedPnL.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </div>
                ) : (
                  <div className="text-2xl font-semibold text-foreground">€••••••</div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  Ejercicio en curso • Click para detalles
                </div>
              </button>
              
              {realizedExpanded && isVisible && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-border px-4 pb-4"
                >
                  <div className="space-y-2 mt-3">
                    <div className="text-xs text-muted-foreground mb-2">Transacciones realizadas:</div>
                    {realizedTransactions.map((tx, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1.5 px-2 bg-black/10 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground font-medium">{tx.asset}</span>
                          <span className="text-muted-foreground">{tx.date}</span>
                        </div>
                        <span className={`font-semibold ${tx.amount >= 0 ? 'text-success-pastel' : 'text-destructive-pastel'}`}>
                          {tx.amount >= 0 ? '+' : ''}€{tx.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Unrealized P&L - Collapsible */}
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <button
                onClick={() => setUnrealizedExpanded(!unrealizedExpanded)}
                className="w-full p-4 text-left hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${
                      currentYearUnrealizedPnL >= 0 ? 'text-success-pastel/70' : 'text-destructive-pastel/70'
                    }`} />
                    <span className="text-sm text-muted-foreground">P&L No Realizada</span>
                    <Badge variant="outline" className="text-xs text-muted-foreground border-border">
                      Latente
                    </Badge>
                  </div>
                  {unrealizedExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                {isVisible ? (
                  <div className={`text-2xl font-semibold ${
                    currentYearUnrealizedPnL >= 0 ? 'text-success-pastel/70' : 'text-destructive-pastel/70'
                  }`}>
                    {currentYearUnrealizedPnL >= 0 ? '+' : ''}€{currentYearUnrealizedPnL.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </div>
                ) : (
                  <div className="text-2xl font-semibold text-foreground/70">€••••••</div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  Posiciones actuales • Click para detalles
                </div>
              </button>
              
              {unrealizedExpanded && isVisible && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-border px-4 pb-4"
                >
                  <div className="space-y-2 mt-3">
                    <div className="text-xs text-muted-foreground mb-2">Posiciones abiertas:</div>
                    {unrealizedPositions.map((pos, i) => (
                      <div key={i} className="text-xs py-1.5 px-2 bg-black/10 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-foreground font-medium">{pos.asset}</span>
                          <span className={`font-semibold ${pos.amount >= 0 ? 'text-success-pastel/70' : 'text-destructive-pastel/70'}`}>
                            {pos.amount >= 0 ? '+' : ''}€{pos.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                          <span>Compra: €{pos.purchasePrice.toLocaleString('es-ES')}</span>
                          <span>Actual: €{pos.currentPrice.toLocaleString('es-ES')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Loss Compensation & Tax Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Pending Loss Compensation */}
            <div className="p-3 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-3.5 h-3.5 text-warning-pastel" />
                <span className="text-xs text-muted-foreground">Pérdidas Compensables</span>
                <InfoTooltip 
                  content="Pérdidas de ejercicios anteriores (hasta 4 años) que puedes usar para reducir ganancias actuales."
                  iconSize={10}
                />
              </div>
              {isVisible ? (
                <div className="text-lg font-semibold text-warning-pastel">
                  €{Math.abs(pendingLossCompensation).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </div>
              ) : (
                <div className="text-lg font-semibold text-foreground">€••••</div>
              )}
              <div className="text-xs text-muted-foreground mt-1">De 2024</div>
              <button className="text-xs text-primary hover:underline mt-2">Ver pérdidas →</button>
            </div>

            {/* Net Taxable Gain */}
            <div className="p-3 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Scale className={`w-3.5 h-3.5 ${
                  netTaxableGain >= 0 ? 'text-info-pastel' : 'text-success-pastel'
                }`} />
                <span className="text-xs text-muted-foreground">Base Imponible Neta</span>
                <InfoTooltip 
                  content="Ganancia realizada después de aplicar compensación de pérdidas anteriores."
                  iconSize={10}
                />
              </div>
              {isVisible ? (
                <div className={`text-lg font-semibold ${
                  netTaxableGain >= 0 ? 'text-info-pastel' : 'text-success-pastel'
                }`}>
                  €{netTaxableGain.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </div>
              ) : (
                <div className="text-lg font-semibold text-foreground">€••••</div>
              )}
              <div className="text-xs text-muted-foreground mt-1">Tras compensar</div>
              <button className="text-xs text-primary hover:underline mt-2">Ver datos fiscales →</button>
            </div>

            {/* Estimated Tax */}
            <div className="p-3 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-3.5 h-3.5 text-destructive-pastel" />
                <span className="text-xs text-muted-foreground">Impuesto Estimado</span>
                <InfoTooltip 
                  content={`Estimación basada en tipo efectivo del ${effectiveTaxRate.toFixed(1)}% (tramos IRPF). Consulta con tu asesor fiscal.`}
                  iconSize={10}
                />
              </div>
              {isVisible ? (
                <div className="text-lg font-semibold text-destructive-pastel">
                  €{estimatedTax.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </div>
              ) : (
                <div className="text-lg font-semibold text-foreground">€••••</div>
              )}
              <div className="text-xs text-muted-foreground mt-1">~{effectiveTaxRate.toFixed(1)}% efectivo</div>
              <Button variant="outline" size="sm" className="w-full mt-2 h-7 text-xs">
                Generar informe
              </Button>
            </div>
          </div>

          {/* Previous Years Summary */}
          <div className="bg-muted/30 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-sm text-foreground">Ejercicios Anteriores</h5>
              <button className="text-xs text-primary hover:underline">Ver resumen →</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-card/50 rounded p-2">
                <div className="text-xs text-muted-foreground">2024</div>
                <div className="text-sm text-foreground">€8,450.00</div>
                <div className="text-xs text-success-pastel">Cerrado</div>
              </div>
              <div className="bg-card/50 rounded p-2">
                <div className="text-xs text-muted-foreground">2023</div>
                <div className="text-sm text-foreground">-€3,200.00</div>
                <div className="text-xs text-success-pastel">Cerrado</div>
              </div>
              <div className="bg-card/50 rounded p-2">
                <div className="text-xs text-muted-foreground">2022</div>
                <div className="text-sm text-foreground">€5,120.00</div>
                <div className="text-xs text-success-pastel">Cerrado</div>
              </div>
              <div className="bg-card/50 rounded p-2">
                <div className="text-xs text-muted-foreground">2021</div>
                <div className="text-sm text-foreground">€12,800.00</div>
                <div className="text-xs text-success-pastel">Cerrado</div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg border border-border">
            <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <strong className="text-foreground">Nota legal:</strong> Las estimaciones fiscales son orientativas. 
              Los cálculos reales dependen de tu situación personal, tramos de IRPF, deducciones aplicables y 
              normativa vigente. Consulta con un asesor fiscal profesional.
            </div>
          </div>

          {/* Connect Advisor Section */}
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div>
              <h5 className="text-sm text-foreground mb-1">Conecta tu asesor para total tranquilidad</h5>
              <p className="text-xs text-muted-foreground">Gestión fiscal profesional adaptada a tu situación</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all flex-shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              Conectar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
