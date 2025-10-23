import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GitHubHeader from './components/GitHubHeader';
import GitHubSidebar from './components/GitHubSidebar';
import DashboardPage from './pages/DashboardPage';
import ExitPlannerPage from './pages/ExitPlannerPage';
import TransactionsPage from './pages/TransactionsPage';
import PortfolioPage from './pages/PortfolioPage';
import TaxPage from './pages/TaxPage';
import CompliancePage from './pages/CompliancePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="github-app">
        <GitHubHeader />
        <div className="github-layout">
          <GitHubSidebar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/exit-planner" element={<ExitPlannerPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/transactions/all" element={<TransactionsPage />} />
            <Route path="/transactions/missing" element={<TransactionsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/wallets" element={<PortfolioPage />} />
            <Route path="/portfolio/cex" element={<PortfolioPage />} />
            <Route path="/portfolio/defi" element={<PortfolioPage />} />
            <Route path="/tax" element={<TaxPage />} />
            <Route path="/tax/pnl" element={<TaxPage />} />
            <Route path="/tax/optimizer" element={<TaxPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/compliance/personal-info" element={<CompliancePage />} />
            <Route path="/compliance/identity-docs" element={<CompliancePage />} />
            <Route path="/compliance/origin-funds" element={<CompliancePage />} />
            <Route path="/compliance/regulations" element={<CompliancePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;