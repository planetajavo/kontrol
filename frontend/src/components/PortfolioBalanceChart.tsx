import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type BalancePeriod = '4h' | '1d' | '1m' | '1y' | 'all';

interface BalanceDataPoint {
  date: string;
  value: number;
}

interface PortfolioBalanceChartProps {
  className?: string;
  compact?: boolean;
  period?: BalancePeriod;
  data?: BalanceDataPoint[];
}

export default function PortfolioBalanceChart({ 
  className = '', 
  compact = false,
  period = '1m',
  data = []
}: PortfolioBalanceChartProps) {

  if (compact) {
    return (
      <div className={className}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--primary)" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <XAxis 
            dataKey="date" 
            stroke="var(--muted-foreground)"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              // For 'all' period, show years
              if (period === 'all') {
                const date = new Date(value);
                return date.getFullYear().toString();
              }
              // For other periods, show the value as is
              return value;
            }}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis 
            stroke="var(--muted-foreground)"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '12px',
              padding: '8px 12px'
            }}
            formatter={(value: number) => [`€${value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`, 'Balance']}
            labelFormatter={(label) => {
              // Show appropriate label based on period
              if (period === 'all' || period === '1y') {
                const date = new Date(label);
                return date.toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                });
              }
              return label;
            }}
            labelStyle={{ color: 'var(--foreground)', marginBottom: '4px' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="var(--primary)" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--background)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
