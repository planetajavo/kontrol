import React from 'react';

const GitHubContent: React.FC = () => {
  return (
    <main className="github-content">
      {/* Header */}
      <div className="github-content-header">
        <h1 className="github-content-title">KONTROL 🎉</h1>
        <p className="github-content-subtitle">Portfolio Management Platform for Crypto-Fiscal Compliance</p>
        
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
        <a href="#code" className="github-tab active">Code</a>
        <a href="#issues" className="github-tab">Issues</a>
        <a href="#pull-requests" className="github-tab">Pull requests</a>
        <a href="#actions" className="github-tab">Actions</a>
        <a href="#projects" className="github-tab">Projects</a>
        <a href="#wiki" className="github-tab">Wiki</a>
        <a href="#security" className="github-tab">Security</a>
        <a href="#insights" className="github-tab">Insights</a>
      </div>

      {/* Main Content */}
      <div className="github-main-content">
        {/* README Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">README.md</h2>
            <div className="github-card-meta">Last updated 2 hours ago</div>
          </div>
          <div className="github-card-content">
            <h3>🎯 KONTROL - Portfolio Management Platform</h3>
            <p>
              A comprehensive crypto-fiscal compliance platform designed to help users manage their cryptocurrency portfolios 
              with full tax compliance and regulatory adherence.
            </p>
            
            <h4>✨ Features</h4>
            <ul>
              <li>📊 <strong>Portfolio Tracking</strong> - Real-time portfolio monitoring across multiple exchanges</li>
              <li>💰 <strong>Tax Compliance</strong> - Automated tax calculations and reporting</li>
              <li>🔍 <strong>Transaction Analysis</strong> - Detailed transaction history and analytics</li>
              <li>🛡️ <strong>Security First</strong> - Bank-level security for all operations</li>
              <li>📈 <strong>Performance Metrics</strong> - Advanced performance tracking and reporting</li>
            </ul>

            <h4>🚀 Quick Start</h4>
            <div className="github-code">
              <pre>{`# Clone the repository
git clone https://github.com/planetajavo/kontrol.git

# Install dependencies
cd kontrol/frontend
npm install

# Start development server
npm run dev

# Open http://localhost:3000`}</pre>
            </div>

            <h4>📋 Requirements</h4>
            <ul>
              <li>Node.js 18+</li>
              <li>npm or yarn</li>
              <li>Modern web browser</li>
            </ul>
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
