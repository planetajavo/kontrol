import React from 'react';

const TransactionsPage: React.FC = () => {
  return (
    <div className="github-content">
      {/* Header */}
      <div className="github-content-header">
        <h1 className="github-content-title">Transactions 📊</h1>
        <p className="github-content-subtitle">Complete transaction history and analysis</p>
        
        {/* Stats */}
        <div className="github-stats">
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"/>
            </svg>
            <span>Total Transactions</span>
            <strong>1,234</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            <span>Missing</span>
            <strong>23</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 000 2v12a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5h-13zM1 2a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm7.5 3a.5.5 0 00-.5.5v6a.5.5 0 001 0V6.707l2.146 2.147a.5.5 0 00.708-.708L8.5 5.707V5.5a.5.5 0 00-.5-.5z"/>
            </svg>
            <span>This Month</span>
            <strong>89</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="github-tabs">
        <a href="#all" className="github-tab active">All</a>
        <a href="#missing" className="github-tab">Missing</a>
        <a href="#import" className="github-tab">Import</a>
        <a href="#export" className="github-tab">Export</a>
        <a href="#settings" className="github-tab">Settings</a>
      </div>

      {/* Main Content */}
      <div className="github-main-content">
        {/* Transaction List Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">All Transactions</h2>
            <div className="github-card-actions">
              <button className="github-btn-secondary">Filter</button>
              <button className="github-btn-primary">Import</button>
            </div>
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
              <div className="transaction-item">
                <div className="transaction-icon">💰</div>
                <div className="transaction-details">
                  <div className="transaction-type">Staking</div>
                  <div className="transaction-asset">Ethereum 2.0</div>
                  <div className="transaction-time">3 days ago</div>
                </div>
                <div className="transaction-amount positive">+0.02 ETH</div>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon">🏦</div>
                <div className="transaction-details">
                  <div className="transaction-type">Deposit</div>
                  <div className="transaction-asset">USDC</div>
                  <div className="transaction-time">1 week ago</div>
                </div>
                <div className="transaction-amount positive">+5,000 USDC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Missing Transactions Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Missing Transactions</h2>
            <a href="#resolve" className="github-btn">Resolve All</a>
          </div>
          <div className="github-card-content">
            <div className="missing-transactions">
              <div className="missing-item">
                <div className="missing-icon">⚠️</div>
                <div className="missing-details">
                  <div className="missing-type">Unidentified Transfer</div>
                  <div className="missing-description">0.1 BTC from unknown address</div>
                  <div className="missing-time">2 days ago</div>
                </div>
                <div className="missing-actions">
                  <button className="github-btn-secondary">Review</button>
                </div>
              </div>
              <div className="missing-item">
                <div className="missing-icon">❓</div>
                <div className="missing-details">
                  <div className="missing-type">Missing Fee</div>
                  <div className="missing-description">Gas fee for ETH transaction</div>
                  <div className="missing-time">1 week ago</div>
                </div>
                <div className="missing-actions">
                  <button className="github-btn-secondary">Review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
