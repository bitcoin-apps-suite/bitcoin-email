'use client';

import React, { useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import './EmailClient.css';
import { EmailList } from './email/EmailList';
import { EmailPreview } from './email/EmailPreview';
import { ComposeModal } from './email/ComposeModal';

const EmailClient: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const folders = [
    { id: 'inbox', name: 'Inbox', icon: '📥', count: 12 },
    { id: 'sent', name: 'Sent', icon: '📤', count: 0 },
    { id: 'drafts', name: 'Drafts', icon: '📝', count: 3 },
    { id: 'starred', name: 'Starred', icon: '⭐', count: 5 },
    { id: 'trash', name: 'Trash', icon: '🗑️', count: 0 },
  ];

  const labels = [
    { name: 'Work', color: 'bg-blue-500' },
    { name: 'Personal', color: 'bg-green-500' },
    { name: 'Payments', color: 'bg-yellow-500' },
    { name: 'Bitcoin', color: 'bg-orange-500' },
  ];

  return (
    <div className="email-client">
      {/* Header Bar */}
      <div className="header-bar">
        <div className="header-left">
          <div className="logo-button">
            <span className="bitcoin-symbol">₿</span>
          </div>
          <div className="app-title">
            <span className="title-bitcoin">Bitcoin</span>
            <span className="title-email">Email</span>
          </div>
        </div>

        <div className="header-center">
          <div className="search-bar">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search emails..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="header-right">
          <button 
            className="compose-button"
            onClick={() => setShowCompose(true)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Compose</span>
          </button>

          <button className="icon-button">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button className="icon-button">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <div className="user-menu">
            <div className="status-indicator"></div>
            <span className="user-handle">@satoshi</span>
          </div>
        </div>
      </div>

      {/* Main Content with Resizable Panels */}
      <div className="main-content">
        <PanelGroup direction="horizontal" className="resizable-panel-group">
          {/* Sidebar Panel */}
          <Panel 
            defaultSize={sidebarCollapsed ? 5 : 18} 
            minSize={sidebarCollapsed ? 5 : 15}
            maxSize={sidebarCollapsed ? 5 : 25}
            className="sidebar-panel"
          >
            <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
              <button 
                className="sidebar-toggle"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={sidebarCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                </svg>
              </button>

              <div className="sidebar-content">
                <nav className="sidebar-nav">
                  {folders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setActiveFolder(folder.id)}
                      className={`nav-item ${activeFolder === folder.id ? 'active' : ''}`}
                    >
                      <span className="nav-icon">{folder.icon}</span>
                      {!sidebarCollapsed && (
                        <>
                          <span>{folder.name}</span>
                          {folder.count > 0 && (
                            <span style={{ marginLeft: 'auto', background: 'var(--email-red-primary)', 
                              padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                              {folder.count}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  ))}

                  <div className="nav-divider" />

                  {!sidebarCollapsed && (
                    <>
                      <div style={{ padding: '8px 12px', fontSize: '11px', opacity: 0.5, 
                        textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Labels
                      </div>
                      {labels.map((label) => (
                        <button key={label.name} className="nav-item">
                          <span className={`w-2 h-2 rounded-full ${label.color}`}></span>
                          <span>{label.name}</span>
                        </button>
                      ))}
                    </>
                  )}
                </nav>

                {!sidebarCollapsed && (
                  <div className="sidebar-stats">
                    <div className="stat-item">
                      <span className="stat-label">Storage Used</span>
                      <span className="stat-value">2.3 GB</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Chain Status</span>
                      <span className="stat-value">Connected</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Pending Payments</span>
                      <span className="stat-value">$0.42</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Panel>

          {/* Resize Handle between Sidebar and Email List */}
          <PanelResizeHandle className="resize-handle vertical" />

          {/* Email List Panel */}
          <Panel defaultSize={30} minSize={25} maxSize={50} className="email-list-panel">
            <div className="email-list-container">
              <EmailList onSelectEmail={setSelectedEmail} />
            </div>
          </Panel>

          {/* Resize Handle between Email List and Preview */}
          <PanelResizeHandle className="resize-handle vertical" />

          {/* Email Preview Panel */}
          <Panel defaultSize={52} minSize={40} className="email-preview-panel">
            <div className="email-preview-container">
              {selectedEmail ? (
                <EmailPreview email={selectedEmail} />
              ) : (
                <div className="empty-preview">
                  <svg className="empty-icon w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="empty-text">Select an email to read</h3>
                  </div>
                )}
              </div>
            </Panel>
          </PanelGroup>
        </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="composer-modal">
          <div className="composer-backdrop" onClick={() => setShowCompose(false)} />
          <div className="composer-container">
            <div className="composer-header">
              <h2 className="composer-title">New Message</h2>
              <button className="composer-close" onClick={() => setShowCompose(false)}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="composer-content">
              <ComposeModal onClose={() => setShowCompose(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailClient;