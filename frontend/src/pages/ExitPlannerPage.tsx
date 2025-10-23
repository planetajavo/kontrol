import React from 'react';

const ExitPlannerPage: React.FC = () => {
  return (
    <div className="github-content">
      {/* Header */}
      <div className="github-content-header">
        <h1 className="github-content-title">Exit Planner 🎯</h1>
        <p className="github-content-subtitle">Strategic exit planning and portfolio optimization</p>
        
        {/* Stats */}
        <div className="github-stats">
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"/>
            </svg>
            <span>Target Value</span>
            <strong>$2.1M</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            <span>Progress</span>
            <strong>67%</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 000 2v12a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5h-13zM1 2a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm7.5 3a.5.5 0 00-.5.5v6a.5.5 0 001 0V6.707l2.146 2.147a.5.5 0 00.708-.708L8.5 5.707V5.5a.5.5 0 00-.5-.5z"/>
            </svg>
            <span>Months Left</span>
            <strong>18</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="github-tabs">
        <a href="#strategy" className="github-tab active">Strategy</a>
        <a href="#targets" className="github-tab">Price Targets</a>
        <a href="#timeline" className="github-tab">Timeline</a>
        <a href="#analysis" className="github-tab">Analysis</a>
        <a href="#settings" className="github-tab">Settings</a>
      </div>

      {/* Main Content */}
      <div className="github-main-content">
        {/* Exit Strategy Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Exit Strategy</h2>
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
                <h4>Current Strategy</h4>
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

        {/* Performance Analysis Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Performance Analysis</h2>
            <a href="#view-details" className="github-btn">View Details</a>
          </div>
          <div className="github-card-content">
            <div className="analysis-content">
              <div className="analysis-item">
                <div className="analysis-label">Current Portfolio Value</div>
                <div className="analysis-value">$1,407,000</div>
                <div className="analysis-change positive">+23.5%</div>
              </div>
              <div className="analysis-item">
                <div className="analysis-label">Remaining to Target</div>
                <div className="analysis-value">$693,000</div>
                <div className="analysis-change neutral">49.2%</div>
              </div>
              <div className="analysis-item">
                <div className="analysis-label">Monthly Target</div>
                <div className="analysis-value">$38,500</div>
                <div className="analysis-change positive">On Track</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitPlannerPage;
