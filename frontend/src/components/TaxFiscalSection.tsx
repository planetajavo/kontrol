// ============================================================================
// TAX & FISCAL SECTION - Clean Purple Theme
// ============================================================================

import { useState } from 'react';
import { Download, MoreVertical, Plus, Trash2, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import CollapsibleSection from './CollapsibleSection';
import ResumenFiscal from './ResumenFiscal';
import TaxBracketOptimizer from './TaxBracketOptimizer';
import { CryptoIcon } from './CryptoIcon';

interface SimulatedSale {
  id: string;
  asset: string;
  quantity: number;
  targetPrice: number;
  buyPrice: number;
}

export default function TaxFiscalSection() {
  // Visibility state
  const [isVisible, setIsVisible] = useState(true);
  
  // Collapse all state
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);
  
  // Simulated sales state
  const [simulatedSales, setSimulatedSales] = useState<SimulatedSale[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');

  // Available assets (mock data - this would come from user's portfolio)
  const availableAssets = [
    { symbol: 'BTC', name: 'Bitcoin', available: 0.5, buyPrice: 60000 },
    { symbol: 'ETH', name: 'Ethereum', available: 2.5, buyPrice: 3200 },
    { symbol: 'SOL', name: 'Solana', available: 50, buyPrice: 140 },
    { symbol: 'ADA', name: 'Cardano', available: 1000, buyPrice: 0.45 },
    { symbol: 'MATIC', name: 'Polygon', available: 500, buyPrice: 0.85 },
  ];

  // Tax calculation for capital gains (used by Exit Strategy Planner)
  const TAX_BRACKETS_CAPITAL_GAINS = [
    { min: 0, max: 6000, rate: 19 },
    { min: 6000, max: 50000, rate: 21 },
    { min: 50000, max: 200000, rate: 23 },
    { min: 200000, max: 300000, rate: 27 },
    { min: 300000, max: Infinity, rate: 30 },
  ];

  const calculateCapitalGainsTax = (profit: number) => {
    if (profit <= 0) return 0;
    
    let remainingProfit = profit;
    let totalTax = 0;

    for (const bracket of TAX_BRACKETS_CAPITAL_GAINS) {
      if (remainingProfit <= 0) break;

      const bracketSize = bracket.max - bracket.min;
      const taxableInBracket = Math.min(remainingProfit, bracketSize);
      const taxForBracket = taxableInBracket * (bracket.rate / 100);

      totalTax += taxForBracket;
      remainingProfit -= taxableInBracket;
    }

    return totalTax;
  };

  // Calculate profit/loss for a sale
  const calculateProfit = (sale: SimulatedSale) => {
    const grossIncome = sale.quantity * sale.targetPrice;
    const cost = sale.quantity * sale.buyPrice;
    return grossIncome - cost;
  };

  // Add new simulated sale
  const handleAddSimulatedSale = () => {
    const asset = availableAssets.find(a => a.symbol === selectedAsset);
    if (!asset) return;

    const newSale: SimulatedSale = {
      id: Date.now().toString(),
      asset: selectedAsset,
      quantity: 0,
      targetPrice: 0,
      buyPrice: asset.buyPrice,
    };

    setSimulatedSales([...simulatedSales, newSale]);
  };

  // Update sale quantity
  const handleUpdateQuantity = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setSimulatedSales(simulatedSales.map(sale => 
      sale.id === id ? { ...sale, quantity: numValue } : sale
    ));
  };

  // Update sale target price
  const handleUpdateTargetPrice = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setSimulatedSales(simulatedSales.map(sale => 
      sale.id === id ? { ...sale, targetPrice: numValue } : sale
    ));
  };

  // Remove sale
  const handleRemoveSale = (id: string) => {
    setSimulatedSales(simulatedSales.filter(sale => sale.id !== id));
  };

  // Calculate totals
  const totals = simulatedSales.reduce((acc, sale) => {
    const grossIncome = sale.quantity * sale.targetPrice;
    const profit = calculateProfit(sale);
    const tax = calculateCapitalGainsTax(profit);
    const netAfterTaxes = grossIncome - tax;

    return {
      grossIncome: acc.grossIncome + grossIncome,
      totalProfit: acc.totalProfit + profit,
      totalTaxes: acc.totalTaxes + tax,
      netAfterTaxes: acc.netAfterTaxes + netAfterTaxes,
    };
  }, { grossIncome: 0, totalProfit: 0, totalTaxes: 0, netAfterTaxes: 0 });

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-foreground">Tax Optimizer</h1>
        <p className="text-muted-foreground">Gestión fiscal y planificación de estrategias</p>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12 py-3 md:py-4 border-b border-border">
        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => {
              setAllCollapsed(!allCollapsed);
              setCollapseKey(prev => prev + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {allCollapsed ? (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="hidden sm:inline">Expandir todo</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="hidden sm:inline">Contraer todo</span>
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span className="hidden sm:inline">Ocultar valores</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Mostrar valores</span>
              </>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Exportar Excel</DropdownMenuItem>
              <DropdownMenuItem>Programar reporte</DropdownMenuItem>
              <DropdownMenuItem>Configuración fiscal</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </div>

      {/* Resumen Fiscal */}
      <CollapsibleSection
        key={`resumen-${collapseKey}`}
        title="Resumen Fiscal"
        description="Ejercicio fiscal 2025"
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-primary/10 text-primary">2025</Badge>}
      >
        <ResumenFiscal isVisible={isVisible} />
      </CollapsibleSection>

      {/* Optimizador de Tramos */}
      <CollapsibleSection
        key={`optimizer-${collapseKey}`}
        title="Optimizador de Tramos"
        description="Distribución fiscal inteligente y recomendaciones"
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-success-pastel/20 text-success-pastel border-success-pastel/30">Nuevo</Badge>}
      >
        <TaxBracketOptimizer isVisible={isVisible} currentGains={48200} />
      </CollapsibleSection>

      {/* Exit Strategy Planner */}
      <CollapsibleSection 
        key={`planner-${collapseKey}`}
        title="Exit Strategy Planner" 
        description="Simula ventas y calcula impuestos"
        defaultOpen={!allCollapsed}
        badge={simulatedSales.length > 0 ? (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            {simulatedSales.length} {simulatedSales.length === 1 ? 'simulación' : 'simulaciones'}
          </Badge>
        ) : undefined}
      >
        <div className="space-y-4">
          {/* Add Simulation Controls */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Selecciona activo
                </label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAssets.map((asset) => (
                      <SelectItem key={asset.symbol} value={asset.symbol}>
                        <div className="flex items-center gap-2">
                          <CryptoIcon symbol={asset.symbol.toLowerCase()} size={20} />
                          <span>{asset.symbol}</span>
                          <span className="text-muted-foreground text-sm">
                            • {asset.available} disponibles
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddSimulatedSale} className="gap-2">
                <Plus className="w-4 h-4" />
                Simular Venta
              </Button>
            </div>
          </div>

          {/* Simulated Sales Table */}
          {simulatedSales.length > 0 ? (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Table Header */}
              <div className="bg-muted/30 border-b border-border px-4 py-3">
                <div className="grid grid-cols-12 gap-3 text-sm text-muted-foreground">
                  <div className="col-span-2">Asset</div>
                  <div className="col-span-2">Cantidad</div>
                  <div className="col-span-2">Precio Objetivo</div>
                  <div className="col-span-2">Ingresos Brutos</div>
                  <div className="col-span-2">Impuestos</div>
                  <div className="col-span-2">Neto Tras Impuestos</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {simulatedSales.map((sale) => {
                  const grossIncome = sale.quantity * sale.targetPrice;
                  const profit = calculateProfit(sale);
                  const tax = calculateCapitalGainsTax(profit);
                  const netAfterTaxes = grossIncome - tax;
                  const asset = availableAssets.find(a => a.symbol === sale.asset);

                  return (
                    <div key={sale.id} className="px-4 py-3 hover:bg-muted/20 transition-colors">
                      <div className="grid grid-cols-12 gap-3 items-center">
                        {/* Asset */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <CryptoIcon symbol={sale.asset.toLowerCase()} size={24} />
                            <span className="font-medium">{sale.asset}</span>
                          </div>
                        </div>

                        {/* Quantity (Editable) */}
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={sale.quantity || ''}
                            onChange={(e) => handleUpdateQuantity(sale.id, e.target.value)}
                            placeholder="0.00"
                            className="h-9"
                            step="0.0001"
                            min="0"
                            max={asset?.available}
                          />
                        </div>

                        {/* Target Price (Editable) */}
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={sale.targetPrice || ''}
                            onChange={(e) => handleUpdateTargetPrice(sale.id, e.target.value)}
                            placeholder="0.00"
                            className="h-9"
                            step="0.01"
                            min="0"
                          />
                        </div>

                        {/* Gross Income */}
                        <div className="col-span-2">
                          <div className="text-sm">
                            €{grossIncome.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>

                        {/* Taxes */}
                        <div className="col-span-2">
                          <div className={`text-sm ${profit > 0 ? 'text-destructive-pastel' : 'text-success-pastel'}`}>
                            {profit > 0 ? '-' : ''}€{tax.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>

                        {/* Net After Taxes */}
                        <div className="col-span-1">
                          <div className={`font-semibold ${profit > 0 ? 'text-success-pastel' : 'text-foreground'}`}>
                            €{netAfterTaxes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSale(sale.id)}
                            className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive-pastel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Table Footer - Totals */}
              <div className="bg-primary/5 border-t-2 border-primary/30 px-4 py-4">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-6 font-semibold text-foreground">
                    Totales
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-foreground">
                      €{totals.grossIncome.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-muted-foreground">Ingresos brutos</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-destructive-pastel">
                      -€{totals.totalTaxes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-muted-foreground">Impuestos</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-semibold text-success-pastel">
                      €{totals.netAfterTaxes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-muted-foreground">Total neto</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <div className="text-muted-foreground mb-2">
                No hay simulaciones activas
              </div>
              <div className="text-sm text-muted-foreground">
                Selecciona un activo y haz clic en "Simular Venta" para comenzar
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>
    </div>
  );
}
