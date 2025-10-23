import React from 'react';

const TaxPage: React.FC = () => {
  return (
    <div className="github-content">
      {/* Header */}
      <div className="github-content-header">
        <h1 className="github-content-title">Tax Management 💰</h1>
        <p className="github-content-subtitle">Automated tax calculations and compliance reporting</p>
        
        {/* Stats */}
        <div className="github-stats">
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"/>
            </svg>
            <span>P&L</span>
            <strong>$45,230</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            <span>Tax Optimizer</span>
            <strong>Active</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 000 2v12a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5h-13zM1 2a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm7.5 3a.5.5 0 00-.5.5v6a.5.5 0 001 0V6.707l2.146 2.147a.5.5 0 00.708-.708L8.5 5.707V5.5a.5.5 0 00-.5-.5z"/>
            </svg>
            <span>Tax Year</span>
            <strong>2024</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="github-tabs">
        <a href="#pnl" className="github-tab active">P&L</a>
        <a href="#optimizer" className="github-tab">Tax Optimizer</a>
        <a href="#reports" className="github-tab">Reports</a>
        <a href="#settings" className="github-tab">Settings</a>
      </div>

      {/* Main Content */}
      <div className="github-main-content">
        {/* P&L Summary Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Profit & Loss Summary</h2>
            <div className="github-card-meta">2024 Tax Year</div>
          </div>
          <div className="github-card-content">
            <div className="tax-stats">
              <div className="tax-stat">
                <div className="tax-stat-value positive">$45,230.50</div>
                <div className="tax-stat-label">Realized Gains</div>
              </div>
              <div className="tax-stat">
                <div className="tax-stat-value negative">-$12,450.25</div>
                <div className="tax-stat-label">Realized Losses</div>
              </div>
              <div className="tax-stat">
                <div className="tax-stat-value positive">$32,780.25</div>
                <div className="tax-stat-label">Net P&L</div>
              </div>
              <div className="tax-stat">
                <div className="tax-stat-value">$8,195.06</div>
                <div className="tax-stat-label">Estimated Tax</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Optimizer Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Tax Optimization</h2>
            <div className="github-card-status active">Active</div>
          </div>
          <div className="github-card-content">
            <div className="optimizer-content">
              <div className="optimizer-strategies">
                <h4>Active Strategies</h4>
                <div className="strategy-item">
                  <div className="strategy-icon">📊</div>
                  <div className="strategy-details">
                    <div className="strategy-name">Tax Loss Harvesting</div>
                    <div className="strategy-description">Automatically selling losing positions to offset gains</div>
                  </div>
                  <div className="strategy-status active">Active</div>
                </div>
                <div className="strategy-item">
                  <div className="strategy-icon">⏰</div>
                  <div className="strategy-details">
                    <div className="strategy-name">Timing Optimization</div>
                    <div className="strategy-description">Optimizing transaction timing for tax efficiency</div>
                  </div>
                  <div className="strategy-status active">Active</div>
                </div>
                <div className="strategy-item">
                  <div className="strategy-icon">🔄</div>
                  <div className="strategy-details">
                    <div className="strategy-name">Wash Sale Prevention</div>
                    <div className="strategy-description">Preventing wash sale rule violations</div>
                  </div>
                  <div className="strategy-status active">Active</div>
                </div>
              </div>

              <div className="optimizer-savings">
                <h4>Tax Savings This Year</h4>
                <div className="savings-amount">$3,450.75</div>
                <div className="savings-description">Estimated savings from optimization strategies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Reports Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Tax Reports</h2>
            <button className="github-btn-primary">Generate Report</button>
          </div>
          <div className="github-card-content">
            <div className="reports-list">
              <div className="report-item">
                <div className="report-icon">📄</div>
                <div className="report-details">
                  <div className="report-name">Form 8949</div>
                  <div className="report-description">Sales and Other Dispositions of Capital Assets</div>
                  <div className="report-status ready">Ready</div>
                </div>
                <button className="github-btn-secondary">Download</button>
              </div>
              <div className="report-item">
                <div className="report-icon">📊</div>
                <div className="report-details">
                  <div className="report-name">Schedule D</div>
                  <div className="report-description">Capital Gains and Losses</div>
                  <div className="report-status ready">Ready</div>
                </div>
                <button className="github-btn-secondary">Download</button>
              </div>
              <div className="report-item">
                <div className="report-icon">📈</div>
                <div className="report-details">
                  <div className="report-name">Transaction Summary</div>
                  <div className="report-description">Complete transaction history for tax year</div>
                  <div className="report-status ready">Ready</div>
                </div>
                <button className="github-btn-secondary">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxPage;
