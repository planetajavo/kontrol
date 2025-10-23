import React from 'react';

const PortfolioPage: React.FC = () => {
  return (
    <div className="github-content">
      {/* Header */}
      <div className="github-content-header">
        <h1 className="github-content-title">Portfolio 💼</h1>
        <p className="github-content-subtitle">Multi-chain portfolio management and tracking</p>
        
        {/* Stats */}
        <div className="github-stats">
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"/>
            </svg>
            <span>Total Value</span>
            <strong>$125,430.50</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            <span>Wallets</span>
            <strong>5</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 000 2v12a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5h-13zM1 2a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm7.5 3a.5.5 0 00-.5.5v6a.5.5 0 001 0V6.707l2.146 2.147a.5.5 0 00.708-.708L8.5 5.707V5.5a.5.5 0 00-.5-.5z"/>
            </svg>
            <span>Assets</span>
            <strong>23</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="github-tabs">
        <a href="#wallets" className="github-tab active">Wallets</a>
        <a href="#cex" className="github-tab">CEX</a>
        <a href="#defi" className="github-tab">DeFi</a>
        <a href="#nft" className="github-tab">NFTs</a>
        <a href="#settings" className="github-tab">Settings</a>
      </div>

      {/* Main Content */}
      <div className="github-main-content">
        {/* Wallets Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Wallets</h2>
            <button className="github-btn-primary">Add Wallet</button>
          </div>
          <div className="github-card-content">
            <div className="wallet-list">
              <div className="wallet-item">
                <div className="wallet-icon">🔐</div>
                <div className="wallet-details">
                  <div className="wallet-name">MetaMask</div>
                  <div className="wallet-address">0x742d...35Cc</div>
                  <div className="wallet-value">$45,230.50</div>
                </div>
                <div className="wallet-status connected">Connected</div>
              </div>
              <div className="wallet-item">
                <div className="wallet-icon">🔑</div>
                <div className="wallet-details">
                  <div className="wallet-name">Ledger</div>
                  <div className="wallet-address">0x8f2a...9Bd1</div>
                  <div className="wallet-value">$32,100.25</div>
                </div>
                <div className="wallet-status connected">Connected</div>
              </div>
              <div className="wallet-item">
                <div className="wallet-icon">📱</div>
                <div className="wallet-details">
                  <div className="wallet-name">Trust Wallet</div>
                  <div className="wallet-address">0x3c5a...7Ef2</div>
                  <div className="wallet-value">$28,450.75</div>
                </div>
                <div className="wallet-status connected">Connected</div>
              </div>
            </div>
          </div>
        </div>

        {/* CEX Exchanges Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Centralized Exchanges</h2>
            <button className="github-btn-primary">Add Exchange</button>
          </div>
          <div className="github-card-content">
            <div className="exchange-list">
              <div className="exchange-item">
                <div className="exchange-icon">🟠</div>
                <div className="exchange-details">
                  <div className="exchange-name">Binance</div>
                  <div className="exchange-value">$15,230.50</div>
                  <div className="exchange-status">Active</div>
                </div>
                <div className="exchange-actions">
                  <button className="github-btn-secondary">Sync</button>
                </div>
              </div>
              <div className="exchange-item">
                <div className="exchange-icon">⚫</div>
                <div className="exchange-details">
                  <div className="exchange-name">Coinbase Pro</div>
                  <div className="exchange-value">$8,100.25</div>
                  <div className="exchange-status">Active</div>
                </div>
                <div className="exchange-actions">
                  <button className="github-btn-secondary">Sync</button>
                </div>
              </div>
              <div className="exchange-item">
                <div className="exchange-icon">🔵</div>
                <div className="exchange-details">
                  <div className="exchange-name">Kraken</div>
                  <div className="exchange-value">$5,450.75</div>
                  <div className="exchange-status">Active</div>
                </div>
                <div className="exchange-actions">
                  <button className="github-btn-secondary">Sync</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DeFi Protocols Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">DeFi Protocols</h2>
            <button className="github-btn-primary">Add Protocol</button>
          </div>
          <div className="github-card-content">
            <div className="defi-list">
              <div className="defi-item">
                <div className="defi-icon">🦄</div>
                <div className="defi-details">
                  <div className="defi-name">Uniswap V3</div>
                  <div className="defi-position">ETH/USDC LP</div>
                  <div className="defi-value">$12,450.00</div>
                </div>
                <div className="defi-apy">+15.2% APY</div>
              </div>
              <div className="defi-item">
                <div className="defi-icon">🏦</div>
                <div className="defi-details">
                  <div className="defi-name">Aave</div>
                  <div className="defi-position">USDC Lending</div>
                  <div className="defi-value">$8,200.00</div>
                </div>
                <div className="defi-apy">+8.5% APY</div>
              </div>
              <div className="defi-item">
                <div className="defi-icon">🌊</div>
                <div className="defi-details">
                  <div className="defi-name">Curve</div>
                  <div className="defi-position">3Pool</div>
                  <div className="defi-value">$5,800.00</div>
                </div>
                <div className="defi-apy">+4.2% APY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
