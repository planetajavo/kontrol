// ============================================================================
// TAX BRACKET OPTIMIZER - Optimizador de Tramos Fiscales
// ============================================================================
// Widget profesional que muestra los tramos fiscales de capital gains en España
// con visualización de "vasos comunicantes" y sugerencias inteligentes de optimización

import { motion } from 'motion/react';
import { 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  Calculator,
  Lightbulb,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { useState, useMemo } from 'react';
import InfoTooltip from './shared/InfoTooltip';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface TaxBracketOptimizerProps {
  isVisible?: boolean;
  currentGains?: number; // Ganancias actuales en el año
}

// Definición de tramos fiscales españoles para capital gains
const TAX_BRACKETS = [
  { min: 0, max: 6000, rate: 19, color: 'from-success-pastel to-success', label: 'Tramo 1' },
  { min: 6000, max: 50000, rate: 21, color: 'from-info-pastel to-info', label: 'Tramo 2' },
  { min: 50000, max: 200000, rate: 23, color: 'from-warning-pastel to-warning', label: 'Tramo 3' },
  { min: 200000, max: 300000, rate: 27, color: 'from-warning to-destructive-pastel', label: 'Tramo 4' },
  { min: 300000, max: Infinity, rate: 30, color: 'from-destructive-pastel to-destructive', label: 'Tramo 5' },
];

export default function TaxBracketOptimizer({ 
  isVisible = true,
  currentGains = 48200 // Valor por defecto para demostración
}: TaxBracketOptimizerProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Calcular impuestos por tramos
  const taxCalculation = useMemo(() => {
    let remainingGains = currentGains;
    let totalTax = 0;
    const bracketDetails = [];

    // Procesar TODOS los tramos, no solo los que tienen valor
    for (const bracket of TAX_BRACKETS) {
      const bracketSize = bracket.max === Infinity 
        ? 1000000 // Usar un tamaño de referencia para el último tramo
        : bracket.max - bracket.min;
      
      const amountInBracket = remainingGains > 0 ? Math.min(remainingGains, bracketSize) : 0;
      const taxInBracket = amountInBracket * (bracket.rate / 100);

      bracketDetails.push({
        ...bracket,
        amountInBracket,
        taxInBracket,
        percentageFilled: bracket.max === Infinity 
          ? (amountInBracket > 0 ? Math.min((amountInBracket / 1000000) * 100, 100) : 0)
          : (amountInBracket / bracketSize) * 100,
        isFull: amountInBracket >= bracketSize,
        isPartial: amountInBracket > 0 && amountInBracket < bracketSize,
        isEmpty: amountInBracket === 0,
        remainingToFill: bracketSize - amountInBracket,
      });

      totalTax += taxInBracket;
      remainingGains -= amountInBracket;
    }

    // Encontrar el tramo actual
    const currentBracketIndex = bracketDetails.findIndex(b => b.isPartial);
    const currentBracket = bracketDetails[currentBracketIndex];
    const nextBracket = bracketDetails[currentBracketIndex + 1];

    // Calcular optimización
    let suggestion = null;
    if (currentBracket && nextBracket) {
      const remainingInCurrentBracket = currentBracket.max - currentGains;
      const additionalTaxIfExceed = (remainingInCurrentBracket + 1) * (nextBracket.rate / 100);
      const currentTaxRate = currentBracket.rate;
      const nextTaxRate = nextBracket.rate;

      if (remainingInCurrentBracket < 5000) {
        suggestion = {
          type: 'warning',
          remainingAmount: remainingInCurrentBracket,
          currentRate: currentTaxRate,
          nextRate: nextTaxRate,
          rateDifference: nextTaxRate - currentTaxRate,
        };
      }
    }

    return {
      totalTax,
      netGains: currentGains - totalTax,
      effectiveRate: (totalTax / currentGains) * 100,
      bracketDetails,
      currentBracket,
      nextBracket,
      suggestion,
    };
  }, [currentGains]);

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
            <Calculator className="w-5 h-5 text-primary" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-foreground">Optimizador de Tramos</h3>
                <InfoTooltip 
                  content={
                    <div className="space-y-2">
                      <p><strong>Tramos fiscales de capital gains en España (IRPF):</strong></p>
                      <p>• Hasta 6.000€: 19%</p>
                      <p>• 6.001€ - 50.000€: 21%</p>
                      <p>• 50.001€ - 200.000€: 23%</p>
                      <p>• 200.001€ - 300.000€: 27%</p>
                      <p>• Más de 300.000€: 30%</p>
                    </div>
                  }
                  side="right"
                  iconSize={14}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Ganancias de capital 2025</p>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className="gap-1.5 bg-primary/10 border-primary/30 text-primary"
          >
            <TrendingUp className="w-3 h-3" />
            Activo
          </Badge>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {/* Current Gains */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Ganancias Realizadas</span>
            </div>
            {isVisible ? (
              <div className="text-2xl text-foreground">
                €{currentGains.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </div>
            ) : (
              <div className="text-2xl text-foreground">€••••••</div>
            )}
            <div className="text-xs text-muted-foreground mt-1">Año fiscal 2025</div>
          </div>

          {/* Total Tax */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Impuesto Total</span>
            </div>
            {isVisible ? (
              <div className="text-2xl text-foreground">
                €{taxCalculation.totalTax.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </div>
            ) : (
              <div className="text-2xl text-foreground">€••••••</div>
            )}
            <div className="text-xs text-muted-foreground mt-1">
              ~{taxCalculation.effectiveRate.toFixed(2)}% efectivo
            </div>
          </div>

          {/* Net Gains */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Ganancia Neta</span>
            </div>
            {isVisible ? (
              <div className="text-2xl text-foreground">
                €{taxCalculation.netGains.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </div>
            ) : (
              <div className="text-2xl text-foreground">€••••••</div>
            )}
            <div className="text-xs text-muted-foreground mt-1">Después de impuestos</div>
          </div>
        </div>

        {/* Smart Alert - Optimization Suggestion */}
        {taxCalculation.suggestion && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-card border border-border"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm text-foreground mb-1 flex items-center gap-2">
                  ⚡ Sugerencia de Optimización
                  <Badge variant="outline" className="text-xs">
                    Ahorra impuestos
                  </Badge>
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Estás a <span className="text-foreground">
                    €{taxCalculation.suggestion.remainingAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </span> del siguiente tramo fiscal.
                </p>
                <div className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg border border-border">
                  <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Recomendación:</strong> Si vendes más de €
                    {taxCalculation.suggestion.remainingAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}, 
                    el excedente tributará al <span className="text-foreground">
                      {taxCalculation.suggestion.nextRate}%
                    </span> en lugar del actual <span className="text-foreground">
                      {taxCalculation.suggestion.currentRate}%
                    </span>.
                    {' '}Considera diferir ventas al próximo ejercicio o usa estrategias de compensación de pérdidas.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tax Brackets Visualization - Horizontal Progress Bars */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm text-foreground">Distribución por Tramos</h4>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
              <ChevronRight className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Visual representation of brackets as horizontal bars */}
          <div className="flex gap-1 md:gap-2 items-end">
            {TAX_BRACKETS.map((bracket, index) => {
              // Encontrar los datos calculados para este tramo
              const bracketData = taxCalculation.bracketDetails[index];
              const fillPercentage = bracketData.percentageFilled;
              const bracketSize = bracket.max === Infinity ? 1000000 : bracket.max - bracket.min;
              const remainingAmount = bracketData.remainingToFill;

              // Definir colores sólidos según el tramo
              const solidColors = [
                '#34D399', // success-pastel - Tramo 1 (19%)
                '#60A5FA', // info-pastel - Tramo 2 (21%)
                '#FBBF24', // warning-pastel - Tramo 3 (23%)
                '#FB923C', // orange - Tramo 4 (27%)
                '#F87171', // destructive-pastel - Tramo 5 (30%)
              ];

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  {/* Bracket Bar Container */}
                  <div className="relative w-full h-16 md:h-20 bg-muted/20 rounded overflow-hidden">
                    {/* Filled portion */}
                    {fillPercentage > 0 && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fillPercentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                        className="absolute bottom-0 left-0 top-0 flex items-center justify-center"
                        style={{ backgroundColor: solidColors[index] }}
                      >
                        {/* Ripple effect when partial */}
                        {bracketData.isPartial && (
                          <motion.div
                            animate={{ 
                              opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                            className="absolute inset-0 bg-white"
                          />
                        )}
                      </motion.div>
                    )}

                    {/* Empty portion with remaining amount */}
                    {!bracketData.isFull && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isVisible && (
                          <span className="text-[9px] md:text-[10px] text-muted-foreground/80 z-10 px-1">
                            +€{remainingAmount.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Status Icon */}
                    {bracketData.isFull && (
                      <div className="absolute top-0.5 right-0.5">
                        <CheckCircle2 className="w-3 h-3 text-white/80" />
                      </div>
                    )}
                  </div>

                  {/* Bracket Info */}
                  <div className="text-center">
                    <div className="text-[10px] md:text-xs text-foreground">
                      {bracket.rate}%
                    </div>
                    <div className="text-[8px] md:text-[9px] text-muted-foreground/70">
                      T{index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Breakdown */}
          {showDetails && isVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 pt-4 border-t border-border"
            >
              <h5 className="text-xs text-muted-foreground mb-3">Desglose Detallado por Tramo</h5>
              {taxCalculation.bracketDetails
                .filter(b => b.amountInBracket > 0)
                .map((bracket, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-2 h-8 rounded-full bg-muted"
                      />
                      <div>
                        <div className="text-sm text-foreground">
                          Tramo {index + 1} • {bracket.rate}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          €{bracket.min.toLocaleString('es-ES')} - €
                          {bracket.max === Infinity ? '∞' : bracket.max.toLocaleString('es-ES')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-foreground">
                        €{bracket.amountInBracket.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Impuesto: €{bracket.taxInBracket.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
