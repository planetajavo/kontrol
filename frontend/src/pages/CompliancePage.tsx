import React from 'react';

const CompliancePage: React.FC = () => {
  return (
    <div className="github-content">
      {/* Header */}
      <div className="github-content-header">
        <h1 className="github-content-title">Compliance 🛡️</h1>
        <p className="github-content-subtitle">Regulatory compliance and KYC management</p>
        
        {/* Stats */}
        <div className="github-stats">
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"/>
            </svg>
            <span>KYC Status</span>
            <strong>✓ Verified</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1a7 7 0 110 14A7 7 0 018 1z"/>
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            <span>Documents</span>
            <strong>3</strong>
          </div>
          <div className="github-stat">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 000 2v12a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5h-13zM1 2a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm7.5 3a.5.5 0 00-.5.5v6a.5.5 0 001 0V6.707l2.146 2.147a.5.5 0 00.708-.708L8.5 5.707V5.5a.5.5 0 00-.5-.5z"/>
            </svg>
            <span>Regulations</span>
            <strong>5</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="github-tabs">
        <a href="#kyc" className="github-tab active">KYC</a>
        <a href="#documents" className="github-tab">Documents</a>
        <a href="#funds" className="github-tab">Origin of Funds</a>
        <a href="#regulations" className="github-tab">Regulations</a>
      </div>

      {/* Main Content */}
      <div className="github-main-content">
        {/* KYC Status Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">KYC Status</h2>
            <div className="github-card-status verified">✓ Verified</div>
          </div>
          <div className="github-card-content">
            <div className="kyc-content">
              <div className="kyc-info">
                <div className="kyc-item">
                  <div className="kyc-label">Full Name</div>
                  <div className="kyc-value">John Doe</div>
                  <div className="kyc-status verified">✓</div>
                </div>
                <div className="kyc-item">
                  <div className="kyc-label">Email</div>
                  <div className="kyc-value">john.doe@example.com</div>
                  <div className="kyc-status verified">✓</div>
                </div>
                <div className="kyc-item">
                  <div className="kyc-label">Phone</div>
                  <div className="kyc-value">+1 (555) 123-4567</div>
                  <div className="kyc-status verified">✓</div>
                </div>
                <div className="kyc-item">
                  <div className="kyc-label">Address</div>
                  <div className="kyc-value">123 Main St, New York, NY 10001</div>
                  <div className="kyc-status verified">✓</div>
                </div>
                <div className="kyc-item">
                  <div className="kyc-label">Date of Birth</div>
                  <div className="kyc-value">January 15, 1985</div>
                  <div className="kyc-status verified">✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Identity Documents Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Identity Documents</h2>
            <button className="github-btn-primary">Upload Document</button>
          </div>
          <div className="github-card-content">
            <div className="documents-list">
              <div className="document-item">
                <div className="document-icon">🆔</div>
                <div className="document-details">
                  <div className="document-name">Driver's License</div>
                  <div className="document-type">Government ID</div>
                  <div className="document-status verified">Verified</div>
                </div>
                <div className="document-actions">
                  <button className="github-btn-secondary">View</button>
                </div>
              </div>
              <div className="document-item">
                <div className="document-icon">📄</div>
                <div className="document-details">
                  <div className="document-name">Passport</div>
                  <div className="document-type">International ID</div>
                  <div className="document-status verified">Verified</div>
                </div>
                <div className="document-actions">
                  <button className="github-btn-secondary">View</button>
                </div>
              </div>
              <div className="document-item">
                <div className="document-icon">🏠</div>
                <div className="document-details">
                  <div className="document-name">Utility Bill</div>
                  <div className="document-type">Proof of Address</div>
                  <div className="document-status verified">Verified</div>
                </div>
                <div className="document-actions">
                  <button className="github-btn-secondary">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Origin of Funds Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Origin of Funds</h2>
            <div className="github-card-status pending">Pending Review</div>
          </div>
          <div className="github-card-content">
            <div className="funds-content">
              <div className="funds-item">
                <div className="funds-icon">💰</div>
                <div className="funds-details">
                  <div className="funds-source">Salary</div>
                  <div className="funds-amount">$75,000/year</div>
                  <div className="funds-status pending">Pending</div>
                </div>
              </div>
              <div className="funds-item">
                <div className="funds-icon">📈</div>
                <div className="funds-details">
                  <div className="funds-source">Investment Returns</div>
                  <div className="funds-amount">$25,000/year</div>
                  <div className="funds-status pending">Pending</div>
                </div>
              </div>
              <div className="funds-item">
                <div className="funds-icon">🏢</div>
                <div className="funds-details">
                  <div className="funds-source">Business Income</div>
                  <div className="funds-amount">$15,000/year</div>
                  <div className="funds-status pending">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applicable Regulations Card */}
        <div className="github-card">
          <div className="github-card-header">
            <h2 className="github-card-title">Applicable Regulations</h2>
            <button className="github-btn-primary">Update Compliance</button>
          </div>
          <div className="github-card-content">
            <div className="regulations-list">
              <div className="regulation-item">
                <div className="regulation-icon">🇺🇸</div>
                <div className="regulation-details">
                  <div className="regulation-name">FATCA (US)</div>
                  <div className="regulation-description">Foreign Account Tax Compliance Act</div>
                  <div className="regulation-status compliant">Compliant</div>
                </div>
              </div>
              <div className="regulation-item">
                <div className="regulation-icon">🇪🇺</div>
                <div className="regulation-details">
                  <div className="regulation-name">CRS (EU)</div>
                  <div className="regulation-description">Common Reporting Standard</div>
                  <div className="regulation-status compliant">Compliant</div>
                </div>
              </div>
              <div className="regulation-item">
                <div className="regulation-icon">🇬🇧</div>
                <div className="regulation-details">
                  <div className="regulation-name">MLR (UK)</div>
                  <div className="regulation-description">Money Laundering Regulations</div>
                  <div className="regulation-status compliant">Compliant</div>
                </div>
              </div>
              <div className="regulation-item">
                <div className="regulation-icon">🇨🇦</div>
                <div className="regulation-details">
                  <div className="regulation-name">PCMLTFA (CA)</div>
                  <div className="regulation-description">Proceeds of Crime and Terrorist Financing Act</div>
                  <div className="regulation-status compliant">Compliant</div>
                </div>
              </div>
              <div className="regulation-item">
                <div className="regulation-icon">🇦🇺</div>
                <div className="regulation-details">
                  <div className="regulation-name">AML/CTF (AU)</div>
                  <div className="regulation-description">Anti-Money Laundering and Counter-Terrorism Financing</div>
                  <div className="regulation-status compliant">Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
