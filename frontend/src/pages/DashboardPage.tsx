import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="github-content">
      {/* Header */}
      <div className="github-content-header">
        <h1 className="github-content-title">Dashboard 📊✨🚀</h1>
        <p className="github-content-subtitle">Crypto Portfolio Management & Tax Compliance Platform</p>
        
        {/* Stats */}
        <div className="github-stats">
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"/>
            </svg>
            <span>Portfolio Value</span>
            <strong>$125,430.50</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            <span>24h Change</span>
            <strong>+6.8%</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 000 2v12a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5h-13zM1 2a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm7.5 3a.5.5 0 00-.5.5v6a.5.5 0 001 0V6.707l2.146 2.147a.5.5 0 00.708-.708L8.5 5.707V5.5a.5.5 0 00-.5-.5z"/>
            </svg>
            <span>Total Assets</span>
            <strong>23</strong>
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
      </div>
    </div>
  );
};

export default DashboardPage;
