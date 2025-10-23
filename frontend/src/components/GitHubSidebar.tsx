import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const GitHubSidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <aside className="github-sidebar">
      <div className="github-sidebar-content">
        {/* Home */}
        <div className="github-sidebar-section">
          <div className="github-sidebar-title">HOME</div>
          <Link to="/dashboard" className={`github-sidebar-item ${location.pathname === '/' || location.pathname === '/dashboard' ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"/>
            </svg>
            Dashboard
          </Link>
          <Link to="/exit-planner" className={`github-sidebar-item ${location.pathname === '/exit-planner' ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            Exit Planner
            <span className="github-sidebar-count">67%</span>
          </Link>
        </div>

        {/* Transactions */}
        <div className="github-sidebar-section">
          <div className="github-sidebar-title">TRANSACTIONS</div>
          <Link to="/transactions/all" className={`github-sidebar-item ${location.pathname.startsWith('/transactions') ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 000 2v12a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5h-13zM1 2a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm7.5 3a.5.5 0 00-.5.5v6a.5.5 0 001 0V6.707l2.146 2.147a.5.5 0 00.708-.708L8.5 5.707V5.5a.5.5 0 00-.5-.5z"/>
            </svg>
            All
            <span className="github-sidebar-count">1,234</span>
          </Link>
          <Link to="/transactions/missing" className={`github-sidebar-item ${location.pathname === '/transactions/missing' ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            Missing
            <span className="github-sidebar-count">23</span>
          </Link>
        </div>

        {/* Portfolio */}
        <div className="github-sidebar-section">
          <div className="github-sidebar-title">PORTFOLIO</div>
          <Link to="/portfolio/wallets" className={`github-sidebar-item ${location.pathname.startsWith('/portfolio') ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v.217l7 4.2 7-4.2V4a1 1 0 00-1-1H2zm13 2.383l-4.708 2.825L15 11.105V5.383zm-7.027.854l-4.708-2.825L1 5.383v5.722l4.708-2.825L8 8.237z"/>
            </svg>
            Wallets
            <span className="github-sidebar-count">5</span>
          </Link>
          <Link to="/portfolio/cex" className={`github-sidebar-item ${location.pathname === '/portfolio/cex' ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            CEX
            <span className="github-sidebar-count">3</span>
          </Link>
          <Link to="/portfolio/defi" className={`github-sidebar-item ${location.pathname === '/portfolio/defi' ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            DeFi
            <span className="github-sidebar-count">12</span>
          </Link>
        </div>

        {/* Tax */}
        <div className="github-sidebar-section">
          <div className="github-sidebar-title">TAX</div>
          <Link to="/tax/pnl" className={`github-sidebar-item ${location.pathname.startsWith('/tax') ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"/>
            </svg>
            P&L
            <span className="github-sidebar-count">$45,230</span>
          </Link>
          <Link to="/tax/optimizer" className={`github-sidebar-item ${location.pathname === '/tax/optimizer' ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            Tax Optimizer
            <span className="github-sidebar-count">Active</span>
          </Link>
        </div>

        {/* Compliance */}
        <div className="github-sidebar-section">
          <div className="github-sidebar-title">COMPLIANCE</div>
          <Link to="/compliance/personal-info" className={`github-sidebar-item ${location.pathname.startsWith('/compliance') ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            Personal Info & KYC
            <span className="github-sidebar-count">✓</span>
          </Link>
          <Link to="/compliance/identity-docs" className={`github-sidebar-item ${location.pathname === '/compliance/identity-docs' ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M4 0h5.293A1 1 0 0110 1.707L14.293 6A1 1 0 0115 7.414V14a2 2 0 01-2 2H3a2 2 0 01-2-2V2a2 2 0 012-2zm5.5 6.5V2.5L13.5 6.5H9.5z"/>
            </svg>
            Identity Documents
            <span className="github-sidebar-count">3</span>
          </Link>
          <Link to="/compliance/origin-funds" className={`github-sidebar-item ${location.pathname === '/compliance/origin-funds' ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1 1.5A.5.5 0 011.5 1H3a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H1.5a.5.5 0 01-.5-.5v-2zM2 2v1h1V2H2zm0 3.5A.5.5 0 011.5 5H3a.5.5 0 01.5-.5v-2a.5.5 0 01-.5-.5H1.5a.5.5 0 01-.5.5v2zM2 4v1h1V4H2z"/>
            </svg>
            Origin of Funds
            <span className="github-sidebar-count">Pending</span>
          </Link>
          <Link to="/compliance/regulations" className={`github-sidebar-item ${location.pathname === '/compliance/regulations' ? 'active' : ''}`}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            Applicable Regulations
            <span className="github-sidebar-count">5</span>
          </Link>
        </div>

        {/* Settings */}
        <div className="github-sidebar-section">
          <div className="github-sidebar-title">Settings</div>
          <a href="#settings" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M7.429 1.525a6.593 6.593 0 011.142 0c.036.512.108 1.05.33 1.484a.81.81 0 00.716.44.483.483 0 01.45.68 7.602 7.602 0 01-1.988 2.153.81.81 0 00-.342.824c.052.417.133.85.33 1.234a.81.81 0 01-.342 1.113 7.602 7.602 0 01-2.153 1.988.81.81 0 00-.824.342c-.417.052-.85.133-1.234.33a.81.81 0 01-1.113-.342 7.602 7.602 0 01-1.988-2.153.81.81 0 00-.824-.342c-.417-.052-.85-.133-1.234-.33a.81.81 0 01-.342-1.113 7.602 7.602 0 011.988-2.153.81.81 0 00.342-.824c-.052-.417-.133-.85-.33-1.234a.81.81 0 01.342-1.113 7.602 7.602 0 012.153-1.988.81.81 0 00.824-.342c.417-.052.85-.133 1.234-.33zM6.5 4.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/>
            </svg>
            Settings
          </a>
        </div>
      </div>
    </aside>
  );
};

export default GitHubSidebar;
