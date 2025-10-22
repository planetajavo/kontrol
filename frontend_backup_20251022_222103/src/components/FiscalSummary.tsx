import { Download, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export default function FiscalSummary() {
  const fiscalData = {
    year: 2025,
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-foreground mb-2">Resumen Fiscal</h1>
          <p className="text-muted-foreground">
            Análisis fiscal del año {fiscalData.year}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Year Selector */}
      <div className="bg-muted rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">Año fiscal</span>
          </div>
          <div className="flex gap-2">
            {[2023, 2024, 2025].map((year) => (
              <button
                key={year}
                className={`px-6 py-3 rounded-xl transition-all ${
                  year === fiscalData.year
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-card border border-border hover:bg-background'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
