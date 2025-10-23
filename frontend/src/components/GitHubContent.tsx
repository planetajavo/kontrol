import React from 'react';

const GitHubContent: React.FC = () => {
  return (
    <main className="github-content">
      {/* Header */}
      <div className="github-content-header">
        <h1 className="github-content-title">Dashboard 📊✨</h1>
        <p className="github-content-subtitle">Crypto Portfolio Management & Tax Compliance Platform</p>
        
        {/* Stats */}
        <div className="github-stats">
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>Public</span>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zM14.5 6.5a.5.5 0 11-1 0 .5.5 0 011 0zM14.5 9.5a.5.5 0 11-1 0 .5.5 0 011 0zM16 6.5a2 2 0 11-4 0 2 2 0 014 0zM16 9.5a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span>2 contributors</span>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>MIT License</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="github-tabs">
        <a href="#overview" className="github-tab active">Overview</a>
        <a href="#transactions" className="github-tab">Transactions</a>
        <a href="#portfolio" className="github-tab">Portfolio</a>
        <a href="#analytics" className="github-tab">Analytics</a>
        <a href="#reports" className="github-tab">Reports</a>
        <a href="#settings" className="github-tab">Settings</a>
      </div>

      {/* Main Content */}
      <div className="github-main-content">
        {/* Portfolio Summary Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Portfolio Summary</h2>
            <div className="github-card-meta">Updated 2 minutes ago</div>
          </div>
          <div className="github-card-content">
            <div className="portfolio-stats">
              <div className="stat-item">
                <div className="stat-value">$125,430.50</div>
                <div className="stat-label">Total Value</div>
                <div className="stat-change positive">+12.5%</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">$8,250.30</div>
                <div className="stat-label">24h Change</div>
                <div className="stat-change positive">+6.8%</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">23</div>
                <div className="stat-label">Assets</div>
                <div className="stat-change neutral">+2</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Recent Transactions</h2>
            <a href="#view-all" className="github-btn">View All</a>
          </div>
          <div className="github-card-content">
            <div className="transaction-list">
              <div className="transaction-item">
                <div className="transaction-icon">📈</div>
                <div className="transaction-details">
                  <div className="transaction-type">Buy</div>
                  <div className="transaction-asset">Bitcoin (BTC)</div>
                  <div className="transaction-time">2 hours ago</div>
                </div>
                <div className="transaction-amount positive">+0.5 BTC</div>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon">📉</div>
                <div className="transaction-details">
                  <div className="transaction-type">Sell</div>
                  <div className="transaction-asset">Ethereum (ETH)</div>
                  <div className="transaction-time">5 hours ago</div>
                </div>
                <div className="transaction-amount negative">-2.1 ETH</div>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon">🔄</div>
                <div className="transaction-details">
                  <div className="transaction-type">Swap</div>
                  <div className="transaction-asset">USDC → USDT</div>
                  <div className="transaction-time">1 day ago</div>
                </div>
                <div className="transaction-amount neutral">1,000 USDC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exit Planner Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Exit Planner</h2>
            <a href="#configure" className="github-btn">Configure</a>
          </div>
          <div className="github-card-content">
            <div className="exit-planner-content">
              <div className="exit-planner-stats">
                <div className="exit-stat">
                  <div className="exit-stat-value">$2.1M</div>
                  <div className="exit-stat-label">Target Exit Value</div>
                </div>
                <div className="exit-stat">
                  <div className="exit-stat-value">18</div>
                  <div className="exit-stat-label">Months to Target</div>
                </div>
                <div className="exit-stat">
                  <div className="exit-stat-value">67%</div>
                  <div className="exit-stat-label">Progress</div>
                </div>
              </div>
              
              <div className="exit-planner-strategy">
                <h4>Exit Strategy</h4>
                <div className="strategy-item">
                  <div className="strategy-icon">📊</div>
                  <div className="strategy-details">
                    <div className="strategy-name">DCA Out Strategy</div>
                    <div className="strategy-description">Gradual sell-off over 12 months</div>
                  </div>
                  <div className="strategy-status active">Active</div>
                </div>
                <div className="strategy-item">
                  <div className="strategy-icon">🎯</div>
                  <div className="strategy-details">
                    <div className="strategy-name">Price Targets</div>
                    <div className="strategy-description">BTC: $120K, ETH: $8K</div>
                  </div>
                  <div className="strategy-status pending">Pending</div>
                </div>
              </div>

              <div className="exit-planner-actions">
                <button className="github-btn-primary">Update Strategy</button>
                <button className="github-btn-secondary">View Details</button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginTop: '24px' }}>
          <div className="github-card">
            <div className="github-card-header">
              <h3 className="github-card-title">🔐 Security</h3>
            </div>
            <div className="github-card-content">
              <p>End-to-end encryption and secure key management for maximum protection of your financial data.</p>
            </div>
          </div>

          <div className="github-card">
            <div className="github-card-header">
              <h3 className="github-card-title">📊 Analytics</h3>
            </div>
            <div className="github-card-content">
              <p>Advanced analytics and reporting tools to help you make informed investment decisions.</p>
            </div>
          </div>

          <div className="github-card">
            <div className="github-card-header">
              <h3 className="github-card-title">🌍 Multi-Exchange</h3>
            </div>
            <div className="github-card-content">
              <p>Support for all major cryptocurrency exchanges with real-time data synchronization.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="github-btn github-btn-primary">
            <svg viewBox="0 0 16 16" width="16" height="16" style={{ marginRight: '8px' }}>
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Star
          </button>
          <button className="github-btn">
            <svg viewBox="0 0 16 16" width="16" height="16" style={{ marginRight: '8px' }}>
              <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75H9.25v2.128a.75.75 0 01-1.5 0V8.5H6.25a.75.75 0 01-.75-.75v-.878z"/>
            </svg>
            Fork
          </button>
          <button className="github-btn">
            <svg viewBox="0 0 16 16" width="16" height="16" style={{ marginRight: '8px' }}>
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Watch
          </button>
        </div>
      </div>
    </main>
  );
};

export default GitHubContent;
