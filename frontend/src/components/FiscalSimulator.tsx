import { useState, useMemo } from 'react';
import { X, Calendar, TrendingUp, Download, AlertTriangle, Lightbulb } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';

// Tramos fiscales españoles para ganancias patrimoniales
const TAX_BRACKETS = [
  { min: 0, max: 6000, rate: 19 },
  { min: 6000, max: 50000, rate: 21 },
  { min: 50000, max: 200000, rate: 23 },
  { min: 200000, max: 300000, rate: 27 },
  { min: 300000, max: Infinity, rate: 30 },
];

// Función para calcular impuestos por tramos
function calculateTaxByBrackets(gains: number) {
  let remainingGains = gains;
  let totalTax = 0;
  const bracketDetails = [];

  for (const bracket of TAX_BRACKETS) {
    if (remainingGains <= 0) break;

    const bracketSize = bracket.max === Infinity ? 1000000 : bracket.max - bracket.min;
    const amountInBracket = Math.min(remainingGains, bracketSize);
    const taxInBracket = amountInBracket * (bracket.rate / 100);

    bracketDetails.push({
      ...bracket,
      amountInBracket,
      taxInBracket,
      percentageFilled: bracket.max === Infinity 
        ? Math.min((amountInBracket / 1000000) * 100, 100)
        : (amountInBracket / bracketSize) * 100,
    });

    totalTax += taxInBracket;
    remainingGains -= amountInBracket;
  }

  // Encontrar si está cerca del siguiente tramo
  const currentBracketIndex = bracketDetails.findIndex(b => b.amountInBracket > 0 && b.amountInBracket < (b.max === Infinity ? 1000000 : b.max - b.min));
  const currentBracket = bracketDetails[currentBracketIndex];
  const nextBracket = TAX_BRACKETS[currentBracketIndex + 1];

  let warning = null;
  if (currentBracket && nextBracket) {
    const remainingInBracket = currentBracket.max - (gains - (currentBracket.max - currentBracket.amountInBracket));
    if (remainingInBracket < 5000) {
      warning = {
        remaining: remainingInBracket,
        currentRate: currentBracket.rate,
        nextRate: nextBracket.rate,
        nextBracketStart: currentBracket.max,
      };
    }
  }

  return {
    totalTax,
    effectiveRate: gains > 0 ? (totalTax / gains) * 100 : 0,
    netGains: gains - totalTax,
    bracketDetails,
    warning,
  };
}

interface FiscalSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FiscalSimulator({ isOpen, onClose }: FiscalSimulatorProps) {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [amount, setAmount] = useState(10000);
  const [saleDate, setSaleDate] = useState('2025-12-31');

  const assets = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', amount: 0.5, value: 32500, profit: 5000, color: 'bg-orange-500' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', amount: 2.5, value: 8750, profit: 1200, color: 'bg-blue-500' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', amount: 50, value: 7500, profit: -500, color: 'bg-purple-500' },
    { id: 'matic', name: 'Polygon', symbol: 'MATIC', amount: 1000, value: 890, profit: 150, color: 'bg-indigo-500' },
  ];

  // Calcular impuestos en tiempo real según el monto
  const taxCalculation = useMemo(() => calculateTaxByBrackets(amount), [amount]);

  // Generar escenarios optimizados
  const scenarios = useMemo(() => {
    const currentYear = calculateTaxByBrackets(amount);
    const splitHalf = amount / 2;
    const firstHalf = calculateTaxByBrackets(splitHalf);
    const totalSplit = firstHalf.totalTax * 2; // Aproximación

    // Si está cerca del siguiente tramo, sugerir diferir
    const shouldDefer = currentYear.warning && currentYear.warning.remaining < 3000;

    return [
      {
        name: 'Vender todo ahora',
        taxAmount: currentYear.totalTax,
        effectiveRate: currentYear.effectiveRate,
        savings: 0,
        recommendation: !shouldDefer,
        description: 'Liquidación inmediata de posiciones',
      },
      {
        name: 'Esperar hasta 2026',
        taxAmount: calculateTaxByBrackets(amount * 0.85).totalTax, // Simulando posible reducción
        effectiveRate: calculateTaxByBrackets(amount * 0.85).effectiveRate,
        savings: currentYear.totalTax - calculateTaxByBrackets(amount * 0.85).totalTax,
        recommendation: shouldDefer,
        description: 'Diferir al próximo ejercicio fiscal',
      },
      {
        name: 'Vender en 2 partes',
        taxAmount: totalSplit,
        effectiveRate: (totalSplit / amount) * 100,
        savings: currentYear.totalTax - totalSplit,
        recommendation: false,
        description: 'Dividir entre dos ejercicios',
      },
    ].sort((a, b) => b.savings - a.savings);
  }, [amount]);

  const toggleAsset = (assetId: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const totalValue = assets
    .filter(a => selectedAssets.includes(a.id))
    .reduce((sum, a) => sum + a.value, 0);

  const totalProfit = assets
    .filter(a => selectedAssets.includes(a.id))
    .reduce((sum, a) => sum + a.profit, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Simulador Fiscal Interactivo
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Left: Configuration */}
          <div className="space-y-6">
            {/* Asset Selection */}
            <div>
              <Label className="mb-3 block">Selecciona Activos para Simular</Label>
              <div className="space-y-2 p-4 border-2 border-dashed border-neutral-300 rounded-lg min-h-[200px]">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => toggleAsset(asset.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedAssets.includes(asset.id)
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-600'
                        : 'bg-card border-2 border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${asset.color} text-white rounded-lg flex items-center justify-center`}>
                          {asset.symbol[0]}
                        </div>
                        <div>
                          <div className="text-neutral-900">{asset.name}</div>
                          <div className="text-neutral-500">
                            {asset.amount} {asset.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-neutral-900">{asset.value.toLocaleString('es-ES')}€</div>
                        <div className={asset.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {asset.profit >= 0 ? '+' : ''}{asset.profit.toLocaleString('es-ES')}€
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount Slider */}
            <div>
              <Label>Monto a Simular: {amount.toLocaleString('es-ES')}€</Label>
              <Slider
                value={[amount]}
                onValueChange={([value]) => setAmount(value)}
                max={50000}
                min={1000}
                step={500}
                className="mt-3"
              />
            </div>

            {/* Date Picker */}
            <div>
              <Label htmlFor="sale-date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Fecha de Venta Estimada
              </Label>
              <Input
                id="sale-date"
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Summary */}
            <Card className="bg-neutral-50">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Activos seleccionados</span>
                    <span className="text-neutral-900">{selectedAssets.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Valor total</span>
                    <span className="text-neutral-900">{totalValue.toLocaleString('es-ES')}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Ganancia estimada</span>
                    <span className={totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString('es-ES')}€
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Simular Escenarios
            </Button>
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            {/* Warning Alert */}
            {taxCalculation.warning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-warning/10 border border-warning/30 rounded-lg"
              >
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm text-foreground mb-1">⚡ Alerta de Cambio de Tramo</h4>
                    <p className="text-sm text-muted-foreground">
                      Estás a <span className="text-warning font-semibold">
                        €{taxCalculation.warning.remaining.toLocaleString('es-ES', { minimumFractionDigits: 0 })}
                      </span> del siguiente tramo fiscal. Si vendes más de este monto, el excedente tributará al{' '}
                      <span className="text-warning font-semibold">{taxCalculation.warning.nextRate}%</span> en lugar del actual{' '}
                      <span className="text-success-pastel font-semibold">{taxCalculation.warning.currentRate}%</span>.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tax Brackets Chart */}
            <div>
              <Label className="mb-3 block">Distribución por Tramos Fiscales</Label>
              <div className="space-y-3">
                {taxCalculation.bracketDetails.map((bracket, idx) => {
                  const colors = ['bg-success-pastel', 'bg-info-pastel', 'bg-warning-pastel', 'bg-orange-500', 'bg-destructive-pastel'];
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-muted-foreground text-sm">
                          {bracket.rate}% • €{bracket.min.toLocaleString('es-ES')} - {bracket.max === Infinity ? '∞' : '€' + bracket.max.toLocaleString('es-ES')}
                        </span>
                        <span className="text-foreground font-semibold">
                          €{bracket.amountInBracket.toLocaleString('es-ES', { minimumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="h-8 bg-muted/20 rounded-lg overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bracket.percentageFilled}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          className={`h-full ${colors[idx]} transition-all`}
                        />
                        {bracket.amountInBracket > 0 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-foreground/70 font-medium">
                              €{bracket.taxInBracket.toLocaleString('es-ES', { minimumFractionDigits: 0 })} impuesto
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tax Summary */}
              <div className="mt-4 p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Impuesto Total:</span>
                  <span className="text-xl text-destructive-pastel">
                    €{taxCalculation.totalTax.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tipo Efectivo:</span>
                  <span className="text-sm text-foreground font-semibold">
                    {taxCalculation.effectiveRate.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Scenarios Table */}
            <div>
              <Label className="mb-3 block">Escenarios Optimizados</Label>
              <div className="space-y-3">
                {scenarios.map((scenario, idx) => (
                  <Card
                    key={idx}
                    className={`transition-all cursor-pointer ${
                      scenario.recommendation
                        ? 'border-2 border-success-pastel bg-success-pastel/5'
                        : 'border border-border hover:border-primary/30'
                    }`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-foreground mb-1">{scenario.name}</div>
                          <div className="text-xs text-muted-foreground mb-2">{scenario.description}</div>
                          {scenario.recommendation && (
                            <Badge className="bg-success-pastel text-white border-0">
                              ✓ Recomendado
                            </Badge>
                          )}
                        </div>
                        {scenario.savings > 0 && (
                          <div className="text-right">
                            <div className="text-xs text-success-pastel">Ahorro</div>
                            <div className="text-success-pastel font-semibold">
                              €{scenario.savings.toLocaleString('es-ES', { minimumFractionDigits: 0 })}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                        <div>
                          <div className="text-xs text-muted-foreground">Impuestos</div>
                          <div className="text-foreground">
                            €{scenario.taxAmount.toLocaleString('es-ES', { minimumFractionDigits: 0 })}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Tasa efectiva</div>
                          <div className="text-foreground">{scenario.effectiveRate.toFixed(2)}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Exportar Simulación
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
