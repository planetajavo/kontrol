// Portfolio Allocation Chart
interface AllocationChartProps {
  data: Array<{
    asset: string;
    value: number;
    percentage: number;
    color: string;
  }>;
  onSegmentClick?: (asset: string) => void;
  interactive?: boolean;
}

export const AllocationChart: React.FC<AllocationChartProps> = ({
  data,
  onSegmentClick,
  interactive = true
}) => {
  return (
    <div className="allocation-chart">
      <div className="chart-container">
        <PieChart
          data={data}
          onSegmentClick={interactive ? onSegmentClick : undefined}
          animation={{ duration: 500 }}
        />
      </div>
      
      <div className="chart-legend">
        {data.map(item => (
          <div
            key={item.asset}
            className="legend-item"
            onClick={() => interactive && onSegmentClick?.(item.asset)}
          >
            <div
              className="legend-color"
              style={{ backgroundColor: item.color }}
            />
            <span className="legend-label">{item.asset}</span>
            <span className="legend-percentage">{item.percentage}%</span>
            <span className="legend-value">${item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};