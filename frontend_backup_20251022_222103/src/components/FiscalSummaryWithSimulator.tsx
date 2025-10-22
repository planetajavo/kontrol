import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface Asset {
  id: string;
  crypto: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
  profit: number;
}

interface FiscalSummaryWithSimulatorProps {
  selectedYear: number;
}

export default function FiscalSummaryWithSimulator({ selectedYear }: FiscalSummaryWithSimulatorProps) {
  const [simulatorAssets, setSimulatorAssets] = useState<Asset[]>([
    { id: '1', crypto: 'BTC', amount: 0.5, buyPrice: 60000, currentPrice: 65000, profit: 2500 },
    { id: '2', crypto: 'ETH', amount: 2.5, buyPrice: 3200, currentPrice: 3500, profit: 750 },
    { id: '3', crypto: 'SOL', amount: 50, buyPrice: 140, currentPrice: 150, profit: 500 },
  ]);

  const fiscalData = {
    year: selectedYear,
    netProfit: 45820,
    taxDebt: 9164,
    taxRate: 20,
    brackets: [
      { name: 'Hasta 12.450€', rate: 19, amount: 2365, max: 12450 },
      { name: '12.450€ - 20.200€', rate: 24, amount: 1860, max: 7750 },
      { name: '20.200€ - 35.200€', rate: 30, amount: 4939, max: 15000 },
      { name: 'Más de 35.200€', rate: 37, amount: 0, max: 10000 },
    ]
  };

  const calculateSimulatedTax = () => {
    const totalProfit = simulatorAssets.reduce((sum, asset) => sum + asset.profit, 0);
    return totalProfit * 0.21; // Simplified tax calculation
  };

  const handleSellPercentage = (assetId: string, percentage: number) => {
    setSimulatorAssets(simulatorAssets.map(asset => {
      if (asset.id === assetId) {
        const newAmount = asset.amount * (1 - percentage / 100);
        const soldAmount = asset.amount * (percentage / 100);
        const newProfit = (asset.currentPrice - asset.buyPrice) * newAmount;
        return { ...asset, amount: newAmount, profit: newProfit };
      }
      return asset;
    }));
  };

  return (
    <div className="space-y-8">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column - Fiscal Summary */}
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6">
            {/* Net Profit */}
            <div className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="text-muted-foreground">Beneficio Neto</div>
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="text-foreground mb-2">
                €{fiscalData.netProfit.toLocaleString('es-ES')}
              </div>
              <div className="text-emerald-600">
                +12.5% vs año anterior
              </div>
            </div>

            {/* Tax Debt */}
            <div className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="text-muted-foreground">Deuda Fiscal Estimada</div>
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-rose-600" />
                </div>
              </div>
              <div className="text-foreground mb-2">
                €{fiscalData.taxDebt.toLocaleString('es-ES')}
              </div>
              <div className="text-muted-foreground">
                ~{fiscalData.taxRate}% tipo efectivo
              </div>
            </div>
          </div>

          {/* Tax Brackets */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <h3 className="text-foreground mb-8">Tramos Impositivos</h3>
            <div className="space-y-8">
              {fiscalData.brackets.map((bracket, idx) => {
                const percentage = (bracket.amount / bracket.max) * 100;
                const isActive = bracket.amount > 0;

                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-foreground mb-1">
                          {bracket.name}
                        </div>
                        <div className="text-muted-foreground">
                          Tipo: {bracket.rate}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`mb-1 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                          €{bracket.amount.toLocaleString('es-ES')}
                        </div>
                        <div className="text-muted-foreground">
                          de €{bracket.max.toLocaleString('es-ES')}
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={percentage} 
                      className={`h-3 ${isActive ? '' : 'opacity-30'}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Simulator */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-2 border-primary/30 p-8">
            <div className="mb-8">
              <h2 className="text-foreground mb-2">Simulador Fiscal</h2>
              <p className="text-muted-foreground">
                Arrastra los sliders para simular escenarios de venta
              </p>
            </div>

            {/* Assets to Simulate */}
            <div className="space-y-6 mb-8">
              {simulatorAssets.map((asset) => (
                <div key={asset.id} className="bg-card rounded-xl p-6 border border-primary/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-foreground mb-1">
                        {asset.amount.toFixed(4)} {asset.crypto}
                      </div>
                      <div className="text-muted-foreground">
                        Ganancia: €{asset.profit.toLocaleString('es-ES')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground mb-1">Precio</div>
                      <div className="text-foreground">
                        €{asset.currentPrice.toLocaleString('es-ES')}
                      </div>
                    </div>
                  </div>

                  {/* Sell Percentage Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 75, 100].map((percentage) => (
                      <button
                        key={percentage}
                        onClick={() => handleSellPercentage(asset.id, percentage)}
                        className="px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg transition-all"
                      >
                        {percentage}%
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Results */}
            <div className="bg-card rounded-xl p-6 border-2 border-primary/30">
              <div className="text-muted-foreground mb-2">Impacto fiscal simulado</div>
              <div className="text-foreground mb-4">
                €{calculateSimulatedTax().toLocaleString('es-ES')}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Beneficio total</div>
                  <div className="text-foreground">
                    €{simulatorAssets.reduce((sum, a) => sum + a.profit, 0).toLocaleString('es-ES')}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Ahorro vs actual</div>
                  <div className="text-emerald-600">
                    €{(fiscalData.taxDebt - calculateSimulatedTax()).toLocaleString('es-ES')}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <Button 
                onClick={() => setSimulatorAssets([
                  { id: '1', crypto: 'BTC', amount: 0.5, buyPrice: 60000, currentPrice: 65000, profit: 2500 },
                  { id: '2', crypto: 'ETH', amount: 2.5, buyPrice: 3200, currentPrice: 3500, profit: 750 },
                  { id: '3', crypto: 'SOL', amount: 50, buyPrice: 140, currentPrice: 150, profit: 500 },
                ])}
                variant="outline"
                className="flex-1"
              >
                Resetear
              </Button>
              <Button className="flex-1">
                Guardar escenario
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
