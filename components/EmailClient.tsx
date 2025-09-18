'use client';

import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useRouter } from 'next/navigation';
import './EmailClient.css';
import { EmailList } from './email/EmailList';
import { EmailPreview } from './email/EmailPreview';
import { ComposeModal } from './email/ComposeModal';
import { ConnectionBadge } from './ConnectionBadge';
import { ConnectionsModal } from './ConnectionsModal';
import { WalletManager } from './WalletManager';
import './WalletManager.css';

const EmailClient: React.FC = () => {
  const router = useRouter();
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [activeList, setActiveList] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'emails' | 'lists'>('lists');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [connections, setConnections] = useState<any[]>([
    // Demo connections
    {
      id: 'demo-handcash',
      type: 'handcash',
      name: 'HandCash',
      handle: '$satoshi',
      status: 'connected'
    }
  ]);

  // Default email folders
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: '📥', count: 12 },
    { id: 'sent', name: 'Sent', icon: '📤', count: 0 },
    { id: 'drafts', name: 'Drafts', icon: '📝', count: 3 },
    { id: 'starred', name: 'Starred', icon: '⭐', count: 5 },
    { id: 'trash', name: 'Trash', icon: '🗑️', count: 0 },
  ];

  // User's mailing lists (NFTs they own or have shares in)
  const [mailingLists] = useState([
    { 
      id: 'list-001', 
      name: 'Crypto Investors Premium', 
      icon: '💎', 
      subscribers: 45000,
      shares: 750,
      totalShares: 10000,
      type: 'premium',
      dividendYield: 8.5
    },
    { 
      id: 'list-002', 
      name: 'Tech Startups', 
      icon: '🚀', 
      subscribers: 12000,
      shares: 200,
      totalShares: 5000,
      type: 'verified',
      dividendYield: 6.2
    },
    { 
      id: 'list-003', 
      name: 'E-commerce Buyers', 
      icon: '🛍️', 
      subscribers: 125000,
      shares: 1500,
      totalShares: 20000,
      type: 'targeted',
      dividendYield: 5.5
    },
    { 
      id: 'list-004', 
      name: 'Gaming Community', 
      icon: '🎮', 
      subscribers: 85000,
      shares: 0,
      totalShares: 15000,
      type: 'general',
      dividendYield: 4.8,
      isOwner: true
    },
    { 
      id: 'list-005', 
      name: 'DeFi Enthusiasts', 
      icon: '🏦', 
      subscribers: 32000,
      shares: 500,
      totalShares: 8000,
      type: 'premium',
      dividendYield: 7.2
    },
  ]);

  const quickActions = [
    { name: 'Create New List', icon: '➕', action: 'create' },
    { name: 'Import CSV', icon: '📁', action: 'import' },
    { name: 'My Portfolio', icon: '📊', action: 'portfolio' },
    { name: 'Earnings Report', icon: '💰', action: 'earnings' },
  ];

  return (
    <div className="email-client">
      {/* Sophisticated Header */}
      <header className="email-header">
        <div className="header-actions-left">
          <button className="icon-button">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <div className="title-section">
          <div className="app-title-container">
            <div className="app-logo envelope-logo">
              <img 
                src="/bitcoin-email-icon.jpg" 
                alt="Bitcoin Email" 
                width="40" 
                height="40"
                onError={(e) => {
                  // Fallback to SVG if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.insertAdjacentHTML('afterend', `
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" fill="#2a2a2a" rx="6"/>
                      <g transform="translate(20, 20)">
                        <path d="M -10 -5 L -10 6 L 10 6 L 10 -5 Z" fill="#ef4444"/>
                        <path d="M -10 -5 L 0 1 L 10 -5 Z" fill="#ef4444"/>
                        <path d="M -10 -5 L 0 1 M 10 -5 L 0 1" stroke="#2a2a2a" stroke-width="0.8" fill="none"/>
                        <text x="0" y="4" font-family="Arial" font-size="10" font-weight="bold" fill="#2a2a2a" text-anchor="middle">₿</text>
                      </g>
                    </svg>
                  `);
                }}
              />
            </div>
            <h1 className="app-title-header">
              <span className="bitcoin-text">Bitcoin</span> Email
            </h1>
          </div>
          <p className="app-subtitle">Decentralized Email on the Blockchain</p>
        </div>

        <div className="header-actions-right">
          <div className="search-bar-header">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="search-input-header"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button 
            className="compose-button-header"
            onClick={() => setShowCompose(true)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Compose</span>
          </button>

          <WalletManager className="wallet-manager-header" />
          
          <ConnectionBadge
            connections={connections}
            onOpenModal={() => setShowConnectionsModal(true)}
          />

          {/* GitHub Link */}
          <a
            href="https://github.com/bitcoin-apps-suite/bitcoin-email"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link-header"
            title="View on GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </header>

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
                {/* View Mode Toggle */}
                {!sidebarCollapsed && (
                  <div style={{ padding: '12px', borderBottom: '1px solid var(--email-border)' }}>
                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '4px' }}>
                      <button
                        onClick={() => setViewMode('lists')}
                        style={{
                          flex: 1,
                          padding: '6px 12px',
                          background: viewMode === 'lists' ? 'var(--email-red-primary)' : 'transparent',
                          color: viewMode === 'lists' ? 'white' : 'var(--email-text-muted)',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        📋 Lists
                      </button>
                      <button
                        onClick={() => setViewMode('emails')}
                        style={{
                          flex: 1,
                          padding: '6px 12px',
                          background: viewMode === 'emails' ? 'var(--email-red-primary)' : 'transparent',
                          color: viewMode === 'emails' ? 'white' : 'var(--email-text-muted)',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        📧 Emails
                      </button>
                    </div>
                  </div>
                )}

                <nav className="sidebar-nav">
                  {viewMode === 'emails' ? (
                    // Email folders view
                    <>
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
                    </>
                  ) : (
                    // Mailing lists view
                    <>
                      {!sidebarCollapsed && (
                        <div style={{ padding: '8px 12px', fontSize: '11px', opacity: 0.5, 
                          textTransform: 'uppercase', letterSpacing: '1px' }}>
                          My Lists
                        </div>
                      )}
                      {mailingLists.map((list) => (
                        <button
                          key={list.id}
                          onClick={() => setActiveList(list.id)}
                          className={`nav-item ${activeList === list.id ? 'active' : ''}`}
                          title={`${list.subscribers.toLocaleString()} subscribers • ${list.dividendYield}% yield`}
                        >
                          <span className="nav-icon">{list.icon}</span>
                          {!sidebarCollapsed && (
                            <>
                              <div style={{ flex: 1, textAlign: 'left' }}>
                                <span style={{ fontSize: '13px' }}>{list.name}</span>
                                <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>
                                  {list.isOwner ? '👑 Owner' : `${list.shares}/${list.totalShares} shares`}
                                </div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <span style={{ 
                                  fontSize: '11px', 
                                  color: 'var(--email-text-muted)',
                                  display: 'block'
                                }}>
                                  {(list.subscribers / 1000).toFixed(0)}K
                                </span>
                                <span style={{ 
                                  fontSize: '10px', 
                                  color: '#4ade80',
                                  fontWeight: '600'
                                }}>
                                  {list.dividendYield}%
                                </span>
                              </div>
                            </>
                          )}
                        </button>
                      ))}
                      
                      <div className="nav-divider" />
                      
                      {/* Quick Actions */}
                      {!sidebarCollapsed && (
                        <>
                          <div style={{ padding: '8px 12px', fontSize: '11px', opacity: 0.5, 
                            textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Quick Actions
                          </div>
                          {quickActions.map((action) => (
                            <button
                              key={action.action}
                              className="nav-item"
                              onClick={() => {
                                if (action.action === 'create') router.push('/exchange');
                                else if (action.action === 'portfolio') router.push('/exchange');
                              }}
                            >
                              <span className="nav-icon">{action.icon}</span>
                              <span>{action.name}</span>
                            </button>
                          ))}
                        </>
                      )}
                    </>
                  )}

                </nav>

                {!sidebarCollapsed && (
                  <>
                    <div className="sidebar-stats">
                      {viewMode === 'emails' ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <div className="stat-item">
                            <span className="stat-label">Portfolio Value</span>
                            <span className="stat-value">$12,450</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Total Dividends</span>
                            <span className="stat-value" style={{ color: '#4ade80' }}>+$342</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Lists Owned</span>
                            <span className="stat-value">1 / 5</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="nav-divider" />
                    
                    {/* Developer Menu */}
                    <div className="developer-menu">
                      <div style={{ padding: '8px 12px', fontSize: '11px', opacity: 0.5, 
                        textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Developers
                      </div>
                      <a 
                        href="https://bitcoin-apps-suite.github.io/bitcoin-email/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>Documentation</span>
                      </a>
                      <a 
                        href="https://github.com/bitcoin-apps-suite/bitcoin-email"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-item"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                      <a 
                        href="https://github.com/bitcoin-apps-suite/bitcoin-email/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Report Issues</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Panel>

          {/* Resize Handle between Sidebar and Email List */}
          <PanelResizeHandle className="resize-handle vertical" />

          {/* Email List Panel */}
          <Panel defaultSize={30} minSize={25} maxSize={50} className="email-list-panel">
            <div className="email-list-container">
              <EmailList 
                onSelectEmail={setSelectedEmail} 
                activeFolder={activeFolder}
                searchQuery={searchQuery}
              />
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

      {/* Connections Modal */}
      <ConnectionsModal
        isOpen={showConnectionsModal}
        onClose={() => setShowConnectionsModal(false)}
        connections={connections}
        onConnect={(type) => {
          // Demo connection logic
          const newConnection = {
            id: `demo-${type}-${Date.now()}`,
            type,
            name: type.charAt(0).toUpperCase() + type.slice(1),
            email: type !== 'handcash' ? `user@${type}.com` : undefined,
            handle: type === 'handcash' ? '$user' : undefined,
            status: 'connected' as const
          };
          setConnections(prev => [...prev, newConnection]);
        }}
        onDisconnect={(id) => {
          setConnections(prev => prev.filter(c => c.id !== id));
        }}
      />
    </div>
  );
};

export default EmailClient;