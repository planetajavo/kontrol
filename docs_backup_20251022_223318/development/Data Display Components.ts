// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down';
    period?: string;
  };
  icon?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  trend = 'neutral',
  loading = false,
  size = 'md'
}) => {
  return (
    <div className={cn('metric-card', `metric-card-${size}`)}>
      <div className="metric-header">
        {icon && <span className="metric-icon">{icon}</span>}
        <h3 className="metric-title">{title}</h3>
      </div>
      
      <div className="metric-value">
        {loading ? (
          <SkeletonText width="60%" />
        ) : (
          <>
            <span className="metric-number">{value}</span>
            {change && (
              <div className={cn('metric-change', `trend-${change.direction}`)}>
                <TrendIcon direction={change.direction} />
                <span>{Math.abs(change.value)}%</span>
                {change.period && <span className="period">{change.period}</span>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Usage Examples
<MetricCard
  title="Portfolio Value"
  value="$45,678.90"
  change={{ value: 12.5, direction: 'up', period: '24h' }}
  icon="📈"
  trend="positive"
/>

<MetricCard
  title="Unrealized P&L"
  value="-$1,234.56"
  change={{ value: 5.2, direction: 'down', period: '7d' }}
  icon="📉"
  trend="negative"
/>