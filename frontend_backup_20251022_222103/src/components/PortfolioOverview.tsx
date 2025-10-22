// ============================================================================
// PORTFOLIO OVERVIEW - Widget del dashboard con gráfico de balance
// ============================================================================

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import PortfolioBalanceChart from './PortfolioBalanceChart';

type BalancePeriod = '4h' | '1d' | '1m' | '1y' | 'all';

interface PortfolioOverviewProps {
  isCollapsed?: boolean;
  isVisible?: boolean;
}

// Current portfolio value (constant)
const CURRENT_BALANCE = 102150;

// Generate realistic BTC balance data
const generateBalanceData = (period: BalancePeriod) => {
  
  switch (period) {
    case '4h':
      // Last 8 data points, ending at current balance
      const values4h = [100420, 100680, 100520, 101190, 101350, 101580, 101820, CURRENT_BALANCE];
      return values4h.map((value, i) => {
        const hour = new Date().getHours() - (8 - i - 1);
        return {
          date: `${hour >= 0 ? hour : 24 + hour}:00`,
          value
        };
      });
    
    case '1d':
      // Last 24 hours, ending at current balance
      return Array.from({ length: 24 }, (_, i) => {
        const progressRatio = i / 23; // 0 to 1
        const baseValue = 99800;
        const variance = Math.sin(i * 0.5) * 600;
        const trend = (CURRENT_BALANCE - baseValue) * progressRatio;
        return {
          date: `${i.toString().padStart(2, '0')}:00`,
          value: Math.round(baseValue + variance + trend)
        };
      });
    
    case '1m':
      // Last 30 days, ending at current balance
      const values1m = [
        94800, 95200, 96100, 95600, 96800, 97800, 97200, 98100,
        98900, 99300, 98700, 99700, 100600, 100100, 100900, 101400,
        101200, 102300, 101800, 102600, 102100, 101500, 102400, 103400,
        102900, 103800, 103300, 101900, 102400, CURRENT_BALANCE
      ];
      return values1m.map((value, i) => ({
        date: `${i + 1}`,
        value
      }));
    
    case '1y':
      // Last 12 months, ending at current balance
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const values1y = [
        64200, 76800, 105450, 100350, 96300, 92250, 100200, 89100,
        94650, 101700, 106800, CURRENT_BALANCE
      ];
      return months.map((month, i) => ({
        date: month,
        value: values1y[i]
      }));
    
    case 'all':
    default:
      // Historical data from 2015 to today, ending at current balance
      return [
        { date: '2015-01-01', value: 420 },
        { date: '2015-07-01', value: 405 },
        { date: '2016-01-01', value: 645 },
        { date: '2016-07-01', value: 975 },
        { date: '2017-01-01', value: 1500 },
        { date: '2017-06-01', value: 4050 },
        { date: '2017-12-01', value: 29250 },
        { date: '2018-02-01', value: 15750 },
        { date: '2018-06-01', value: 9600 },
        { date: '2018-12-01', value: 5700 },
        { date: '2019-06-01', value: 16800 },
        { date: '2019-12-01', value: 10800 },
        { date: '2020-03-01', value: 9600 },
        { date: '2020-07-01', value: 13950 },
        { date: '2020-12-01', value: 28800 },
        { date: '2021-04-01', value: 88350 },
        { date: '2021-11-01', value: 103500 },
        { date: '2022-01-01', value: 71550 },
        { date: '2022-06-01', value: 44700 },
        { date: '2022-11-01', value: 24750 },
        { date: '2023-01-01', value: 24900 },
        { date: '2023-06-01', value: 45300 },
        { date: '2023-12-01', value: 63450 },
        { date: '2024-03-01', value: 105450 },
        { date: '2024-06-01', value: 92250 },
        { date: '2024-09-01', value: 94650 },
        { date: '2024-12-01', value: 111450 },
        { date: '2025-01-01', value: CURRENT_BALANCE },
      ];
  }
};

// Get period label for display
const getPeriodLabel = (period: BalancePeriod): string => {
  switch (period) {
    case '4h': return 'Últimas 4 horas';
    case '1d': return 'Últimas 24 horas';
    case '1m': return 'Último mes';
    case '1y': return 'Último año';
    case 'all': return 'Todo el periodo';
    default: return 'Periodo seleccionado';
  }
};

export default function PortfolioOverview({ isCollapsed = false, isVisible = true }: PortfolioOverviewProps) {
  const [balancePeriod, setBalancePeriod] = useState<BalancePeriod>('all');
  
  // Generate data and calculate changes based on selected period
  const balanceData = useMemo(() => generateBalanceData(balancePeriod), [balancePeriod]);
  
  // Calculate change based on selected period (using CURRENT_BALANCE as end point)
  const initialValue = balanceData[0]?.value || 0;
  const changeValue = CURRENT_BALANCE - initialValue;
  const changePercent = ((changeValue / initialValue) * 100);

  // When collapsed, don't render content (only title shows in widget header)
  if (isCollapsed) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-xl border border-border shadow-xl overflow-hidden"
    >
      <div className="p-4 md:p-6">
        {/* Balance Row - Split Layout */}
        <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Left: Balance Info */}
          <div className="flex-1">
            <h4 className="text-sm text-muted-foreground mb-2">Balance Total</h4>
            
            {isVisible ? (
              <div className="text-3xl md:text-4xl text-foreground mb-3">
                €{CURRENT_BALANCE.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </div>
            ) : (
              <div className="text-3xl md:text-4xl text-foreground mb-3">
                €••••••
              </div>
            )}
          </div>

          {/* Right: Change % and Period Filters */}
          <div className="flex flex-col items-end gap-3">
            {/* Change Percentage */}
            <motion.div 
              key={`change-${balancePeriod}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.4,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="text-right"
            >
              <div className={`flex items-center gap-2 justify-end transition-colors duration-300 ${changePercent >= 0 ? 'text-success-pastel' : 'text-destructive-pastel'}`}>
                <motion.div
                  animate={{ rotate: changePercent < 0 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrendingUp className="w-4 h-4" />
                </motion.div>
                <span className="text-sm">
                  {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}% 
                  {isVisible && (
                    <span className="text-muted-foreground ml-1">
                      ({changePercent >= 0 ? '+' : ''}€{Math.abs(changeValue).toLocaleString('es-ES', { minimumFractionDigits: 2 })})
                    </span>
                  )}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{getPeriodLabel(balancePeriod)}</div>
            </motion.div>

            {/* Period Selector */}
            <div className="flex items-center gap-1 bg-card/50 backdrop-blur-sm rounded-lg p-1">
              {(['4h', '1d', '1m', '1y', 'all'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setBalancePeriod(period)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                    balancePeriod === period
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {period.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Row - Full Width, Reduced Height */}
        <motion.div 
          key={`chart-${balancePeriod}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1]
          }}
          className="rounded-xl md:rounded-2xl border-2 border-primary/30 p-4 md:p-6 overflow-hidden h-[220px] md:h-[240px]"
          style={{
            background: 'linear-gradient(to bottom right, var(--secondary), var(--accent))'
          }}
        >
          <PortfolioBalanceChart 
            className="w-full h-full" 
            period={balancePeriod}
            data={balanceData}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
