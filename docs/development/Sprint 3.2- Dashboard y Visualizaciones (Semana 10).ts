// frontend/pages/dashboard.tsx
const Dashboard: React.FC = () => {
    const { data: portfolio, isLoading: portfolioLoading } = useQuery(
        ['portfolio', 'overview'],
        fetchPortfolioOverview
    );
    
    const { data: performance, isLoading: performanceLoading } = useQuery(
        ['portfolio', 'performance'],
        fetchPortfolioPerformance
    );
    
    const { data: allocation, isLoading: allocationLoading } = useQuery(
        ['portfolio', 'allocation'],
        fetchPortfolioAllocation
    );
    
    const isLoading = portfolioLoading || performanceLoading || allocationLoading;
    
    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <main className="dashboard-main">
                {/* Header */}
                <DashboardHeader />
                
                {/* Portfolio Overview */}
                <section className="portfolio-overview">
                    <div className="overview-grid">
                        <MetricCard
                            title="Total Portfolio Value"
                            value={formatCurrency(portfolio?.totalValue)}
                            change={{
                                value: portfolio?.change24h || 0,
                                direction: portfolio?.change24h >= 0 ? 'up' : 'down',
                                period: '24h'
                            }}
                            icon="📈"
                            loading={isLoading}
                            size="lg"
                        />
                        
                        <MetricCard
                            title="Realized P&L"
                            value={formatCurrency(portfolio?.realizedPnl)}
                            trend={portfolio?.realizedPnl >= 0 ? 'positive' : 'negative'}
                            icon="💰"
                            loading={isLoading}
                        />
                        
                        <MetricCard
                            title="Unrealized P&L"
                            value={formatCurrency(portfolio?.unrealizedPnl)}
                            trend={portfolio?.unrealizedPnl >= 0 ? 'positive' : 'negative'}
                            icon="📊"
                            loading={isLoading}
                        />
                        
                        <MetricCard
                            title="Assets"
                            value={portfolio?.assetCount?.toString()}
                            icon="🪙"
                            loading={isLoading}
                        />
                    </div>
                </section>
                
                {/* Charts Section */}
                <section className="charts-section">
                    <div className="charts-grid">
                        {/* Allocation Chart */}
                        <div className="chart-card">
                            <h3>Portfolio Allocation</h3>
                            {allocationLoading ? (
                                <SkeletonChart />
                            ) : (
                                <AllocationChart
                                    data={allocation}
                                    onSegmentClick={handleAssetClick}
                                />
                            )}
                        </div>
                        
                        {/* Performance Chart */}
                        <div className="chart-card">
                            <div className="chart-header">
                                <h3>Performance</h3>
                                <PerformancePeriodSelector
                                    periods={['1D', '1W', '1M', '1Y', 'All']}
                                    selectedPeriod={selectedPeriod}
                                    onPeriodChange={setSelectedPeriod}
                                />
                            </div>
                            {performanceLoading ? (
                                <SkeletonChart />
                            ) : (
                                <PerformanceChart
                                    data={performance}
                                    period={selectedPeriod}
                                />
                            )}
                        </div>
                    </div>
                </section>
                
                {/* Data Sources Status */}
                <section className="data-sources-section">
                    <DataSourcesManager />
                </section>
                
                {/* Recent Activity */}
                <section className="recent-activity">
                    <h3>Recent Activity</h3>
                    <TransactionList
                        transactions={portfolio?.recentTransactions}
                        loading={isLoading}
                    />
                </section>
            </main>
            
            {/* Portfolio Chat Widget */}
            <PortfolioChat
                position="bottom-right"
                userData={portfolio}
                onMessageSend={handleChatMessage}
            />
        </div>
    );
};

// frontend/components/charts/AllocationChart.tsx
export const AllocationChart: React.FC<AllocationChartProps> = ({
    data,
    onSegmentClick,
    interactive = true
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    
    // Configuración del chart
    const chartConfig = useMemo(() => ({
        type: 'pie' as const,
        data: {
            labels: data.map(item => item.asset),
            datasets: [
                {
                    data: data.map(item => item.percentage),
                    backgroundColor: data.map(item => item.color),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right' as const,
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context: any) => {
                            const item = data[context.dataIndex];
                            return `${item.asset}: ${item.percentage}% (${formatCurrency(item.value)})`;
                        }
                    }
                }
            },
            onClick: interactive ? (event: any, elements: any[]) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const asset = data[index].asset;
                    onSegmentClick?.(asset);
                }
            } : undefined
        }
    }), [data, interactive, onSegmentClick]);
    
    return (
        <div className="allocation-chart" ref={chartRef}>
            <div className="chart-container">
                <Pie data={chartConfig.data} options={chartConfig.options} />
            </div>
        </div>
    );
};

# Entregables
• frontend/pages/dashboard.tsx
• frontend/components/charts/AllocationChart.tsx
• frontend/components/charts/PerformanceChart.tsx
• frontend/components/TransactionList.tsx
• frontend/components/SkeletonChart.tsx
• frontend/hooks/usePortfolioData.ts
• frontend/utils/chart-formatters.ts
• frontend/styles/charts.css