import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Settings2, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import CollapsibleSection from './CollapsibleSection';
import InvestmentPerformance from './InvestmentPerformance';
import PortfolioOverview from './PortfolioOverview';
import AssetDistributionPieChart from './AssetDistributionPieChart';
import BalanceByLocation from './BalanceByLocation';
import AssetBalanceBreakdown from './AssetBalanceBreakdown';
import InfoTooltip from './shared/InfoTooltip';
import { Badge } from './ui/badge';
import DashboardCustomizeModal, { DashboardWidget } from './DashboardCustomizeModal';

// Default widget configuration
const defaultWidgets: DashboardWidget[] = [
  {
    id: 'investment-performance',
    name: 'Inversión y Rentabilidad',
    description: 'Capital invertido en fiat y rentabilidad total',
    enabled: true,
    order: 0
  },
  {
    id: 'portfolio-overview',
    name: 'Balance Over Time',
    description: 'Gráfico de balance y resumen general',
    enabled: true,
    order: 1
  },
  {
    id: 'security-score',
    name: 'Security Score',
    description: 'Distribución por ubicación y seguridad',
    enabled: true,
    order: 2
  },
  {
    id: 'balance-by-asset',
    name: 'Balance por Activo',
    description: 'Desglose detallado por wallet y address',
    enabled: true,
    order: 3
  },
  {
    id: 'portfolio-distribution',
    name: 'Portfolio Distribution',
    description: 'Distribución de activos con diversificación',
    enabled: true,
    order: 4
  }
];

export default function DashboardSection() {
  const [widgets, setWidgets] = useState<DashboardWidget[]>(defaultWidgets);
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [globalVisibility, setGlobalVisibility] = useState(true);
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);

  // Sort and filter widgets
  const activeWidgets = useMemo(() => {
    return widgets
      .filter(w => w.enabled)
      .sort((a, b) => a.order - b.order);
  }, [widgets]);

  const handleSaveWidgets = (newWidgets: DashboardWidget[]) => {
    setWidgets(newWidgets);
    // Here you could save to localStorage or backend
  };

  const renderWidget = (widget: DashboardWidget) => {
    switch (widget.id) {
      case 'investment-performance':
        return (
          <CollapsibleSection
            key={`${widget.id}-${collapseKey}`}
            title={
              <div className="flex items-center gap-2">
                <span>Inversión y Rentabilidad</span>
                <InfoTooltip 
                  content="Capital invertido en fiat basado en transacciones bancarias y origen de fondos. Rentabilidad total desde el inicio de tu actividad."
                  side="right"
                />
              </div>
            }
            description="Capital invertido y ROI total"
            defaultOpen={!allCollapsed}
          >
            <InvestmentPerformance isVisible={globalVisibility} />
          </CollapsibleSection>
        );

      case 'portfolio-overview':
        return (
          <CollapsibleSection
            key={`${widget.id}-${collapseKey}`}
            title={
              <div className="flex items-center gap-2">
                <span>Balance Over Time</span>
                <InfoTooltip 
                  content="Resumen ejecutivo de tu portfolio con gráfico de balance histórico."
                  side="right"
                />
              </div>
            }
            defaultOpen={!allCollapsed}
          >
            {(isCollapsed) => <PortfolioOverview isCollapsed={isCollapsed} isVisible={globalVisibility} />}
          </CollapsibleSection>
        );

      case 'security-score':
        return (
          <CollapsibleSection
            key={`${widget.id}-${collapseKey}`}
            title={
              <div className="flex items-center gap-2">
                <span>Security Score</span>
                <InfoTooltip 
                  content="Score de seguridad basado en la distribución de fondos entre hardware wallets, hot wallets y exchanges."
                  side="right"
                />
              </div>
            }
            description="Distribución de fondos y nivel de seguridad"
            defaultOpen={!allCollapsed}
            badge={<Badge className="bg-success-pastel/20 text-success-pastel">41</Badge>}
          >
            <BalanceByLocation isVisible={globalVisibility} />
          </CollapsibleSection>
        );

      case 'balance-by-asset':
        return (
          <CollapsibleSection
            key={`${widget.id}-${collapseKey}`}
            title={
              <div className="flex items-center gap-2">
                <span>Balance por Activo</span>
                <InfoTooltip 
                  content="Desglose detallado de cada activo por wallet y address específica."
                  side="right"
                />
              </div>
            }
            description="Distribución detallada por wallet y address"
            defaultOpen={!allCollapsed}
          >
            <AssetBalanceBreakdown isVisible={globalVisibility} />
          </CollapsibleSection>
        );

      case 'portfolio-distribution':
        return (
          <CollapsibleSection
            key={`${widget.id}-${collapseKey}`}
            title={
              <div className="flex items-center gap-2">
                <span>Portfolio Distribution</span>
                <InfoTooltip 
                  content="Distribución de activos con score de diversificación categorizado por BTC, Large Cap, Mid Cap y Low Cap."
                  side="right"
                />
              </div>
            }
            description="Distribución de activos y diversificación"
            defaultOpen={!allCollapsed}
          >
            <AssetDistributionPieChart isVisible={globalVisibility} />
          </CollapsibleSection>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 md:space-y-6"
    >
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <h1 className="text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Resumen general de tu actividad crypto</p>
      </motion.div>

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
            onClick={() => setGlobalVisibility(!globalVisibility)}
          >
            {globalVisibility ? (
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

          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => setCustomizeModalOpen(true)}
          >
            <Settings2 className="w-4 h-4" />
            <span className="hidden sm:inline">Personalizar Dashboard</span>
            <span className="sm:hidden">Personalizar</span>
          </Button>
        </div>
      </div>

      {/* Widgets Grid - Always 1 Column */}
      <div className="grid gap-4 md:gap-6 grid-cols-1">
        {activeWidgets.map(widget => (
          <div key={widget.id}>
            {renderWidget(widget)}
          </div>
        ))}
      </div>

      {/* Customize Modal */}
      <DashboardCustomizeModal
        open={customizeModalOpen}
        onClose={() => setCustomizeModalOpen(false)}
        widgets={widgets}
        onSaveWidgets={handleSaveWidgets}
      />
    </motion.div>
  );
}
