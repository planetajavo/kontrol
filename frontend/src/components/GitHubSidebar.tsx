import React from 'react';

const GitHubSidebar: React.FC = () => {
  return (
    <aside className="github-sidebar">
      <div className="github-sidebar-content">
        {/* Repository Info */}
        <div className="github-sidebar-section">
          <div className="github-sidebar-title">Repository</div>
          <a href="#overview" className="github-sidebar-item active">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l5.45-4.072a.25.25 0 000-.4L5.4 8.2a.25.25 0 00-.4.2z"/>
            </svg>
            Overview
          </a>
          <a href="#releases" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 010 1.5H8.5v4.25a.75.75 0 01-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"/>
            </svg>
            Releases
          </a>
          <a href="#packages" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"/>
            </svg>
            Packages
          </a>
        </div>

        {/* Code */}
        <div className="github-sidebar-section">
          <div className="github-sidebar-title">Code</div>
          <a href="#code" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"/>
            </svg>
            Code
          </a>
          <a href="#issues" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
            </svg>
            Issues
            <span className="github-sidebar-count">12</span>
          </a>
          <a href="#pull-requests" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M1.5 3.25a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zm5.677-.177L9.573.677A.25.25 0 0110 .854V2.5h3A2.5 2.5 0 0115.5 5v6.628a2.251 2.251 0 11-1.5 0V5a1 1 0 00-1-1h-3v1.646a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 00-.75.75v11.5a.75.75 0 001.5 0V14h8.5a1 1 0 001-1v-2.628a2.251 2.251 0 111.5 0V13a2.5 2.5 0 01-2.5 2.5H2.25A2.25 2.25 0 010 13.25v-11.5a.75.75 0 00.75-.75zm11.5 12a.75.75 0 100-1.5.75.75 0 000 1.5zm0-3a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
            </svg>
            Pull requests
            <span className="github-sidebar-count">3</span>
          </a>
          <a href="#actions" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227zM7.5 6.432v3.136L9.864 8 7.5 6.432z"/>
            </svg>
            Actions
          </a>
          <a href="#projects" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v3.585a.746.746 0 01-.128.416l-1.5 2.25a.746.746 0 01-.622.334H1.75a.75.75 0 01-.75-.75V1.75zm1.75-.25a.25.25 0 00-.25.25v2.5h12.5v-2.5a.25.25 0 00-.25-.25H1.75zM14.25 6H1.75a.75.75 0 00-.75.75v6.5c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75v-6.5a.75.75 0 00-.75-.75zM2.5 7.25a.25.25 0 01.25-.25h10.5a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25v-5.5z"/>
            </svg>
            Projects
          </a>
          <a href="#wiki" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75z"/>
            </svg>
            Wiki
          </a>
          <a href="#security" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M7.467.133a1.75 1.75 0 011.066 0l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.7 1.7 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667L7.467.133zm.61 1.429a.25.25 0 00-.154 0L1.95 3.18a.25.25 0 00-.174.238v3.582c0 1.358.275 2.666 1.057 3.858.784 1.194 2.121 2.34 4.366 3.297a.2.2 0 00.154 0c2.245-.956 3.582-2.104 4.366-3.298.782-1.192 1.057-2.5 1.057-3.858V3.418a.25.25 0 00-.174-.238L8.078 1.562zM9.75 6.5a.75.75 0 00-1.5 0v3.379l1.28-1.28a.75.75 0 00-1.06-1.06l-2.5 2.5a.75.75 0 000 1.06l2.5 2.5a.75.75 0 001.06-1.06L8.25 10.379V6.5z"/>
            </svg>
            Security
          </a>
          <a href="#insights" className="github-sidebar-item">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227zM7.5 6.432v3.136L9.864 8 7.5 6.432z"/>
            </svg>
            Insights
          </a>
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
