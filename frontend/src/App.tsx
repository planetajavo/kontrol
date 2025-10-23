import React from 'react';
import GitHubHeader from './components/GitHubHeader';
import GitHubSidebar from './components/GitHubSidebar';
import GitHubContent from './components/GitHubContent';
import './App.css';

function App() {
  return (
    <div className="github-app">
      <GitHubHeader />
      <div className="github-layout">
        <GitHubSidebar />
        <GitHubContent />
      </div>
    </div>
  );
}

export default App;