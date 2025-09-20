'use client';

import React, { useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useRouter } from 'next/navigation';
import './EmailClient.css';
import './EmailClient.mobile.css';
import { EmailList } from './email/EmailList';
import { EmailPreview } from './email/EmailPreview';
import { ComposeModal } from './email/ComposeModal';
import { ConnectionBadge } from './ConnectionBadge';
import { ConnectionsModal } from './ConnectionsModal';
import { WalletManager } from './WalletManager';
import { EmailListExchange } from './exchange/EmailListExchange';
import { ListMarketplace } from './exchange/ListMarketplace';
import { CreateListModal } from './exchange/CreateListModal';
import './WalletManager.css';

const EmailClient: React.FC = () => {
  const router = useRouter();
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [activeList, setActiveList] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'emails' | 'lists' | 'exchange'>('emails');
  const [exchangeView, setExchangeView] = useState<'exchange' | 'marketplace'>('exchange');
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash === 'email' || hash === 'emails') {
        setViewMode('emails');
      } else if (hash === 'lists' || hash === 'list') {
        setViewMode('lists');
      } else if (hash === 'exchange') {
        setViewMode('exchange');
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash when view mode changes
  useEffect(() => {
    const newHash = viewMode === 'emails' ? 'email' : viewMode;
    if (window.location.hash !== `#${newHash}`) {
      window.history.replaceState(null, '', `#${newHash}`);
    }
  }, [viewMode]);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
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

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Default email folders
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: '', count: 12 },
    { id: 'sent', name: 'Sent', icon: '', count: 0 },
    { id: 'drafts', name: 'Drafts', icon: '', count: 3 },
    { id: 'starred', name: 'Starred', icon: '', count: 5 },
    { id: 'trash', name: 'Trash', icon: '', count: 0 },
  ];

  // User's mailing lists (NFTs they own or have shares in)
  const [mailingLists] = useState([
    { 
      id: 'list-001', 
      name: 'Crypto Investors Premium', 
      icon: '', 
      subscribers: 45000,
      shares: 750,
      totalShares: 10000,
      type: 'premium',
      dividendYield: 8.5
    },
    { 
      id: 'list-002', 
      name: 'Tech Startups', 
      icon: '', 
      subscribers: 12000,
      shares: 200,
      totalShares: 5000,
      type: 'verified',
      dividendYield: 6.2
    },
    { 
      id: 'list-003', 
      name: 'E-commerce Buyers', 
      icon: '', 
      subscribers: 125000,
      shares: 1500,
      totalShares: 20000,
      type: 'targeted',
      dividendYield: 5.5
    },
    { 
      id: 'list-004', 
      name: 'Gaming Community', 
      icon: '', 
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
      icon: '', 
      subscribers: 32000,
      shares: 500,
      totalShares: 8000,
      type: 'premium',
      dividendYield: 7.2
    },
  ]);

  const quickActions = [
    { name: 'Create New List', icon: '', action: 'create' },
    { name: 'Import CSV', icon: '', action: 'import' },
    { name: 'My Portfolio', icon: '', action: 'portfolio' },
    { name: 'Earnings Report', icon: '', action: 'earnings' },
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
          {!isMobile && (
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
          )}

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

          {/* Twitter/X Link */}
          <a
            href="https://x.com/bitcoin_email"
            target="_blank"
            rel="noopener noreferrer"
            className="twitter-link-header"
            title="Follow us on X"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

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
                        onClick={() => setViewMode('emails')}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          background: viewMode === 'emails' ? 'var(--email-red-primary)' : 'transparent',
                          color: viewMode === 'emails' ? 'white' : 'var(--email-text-muted)',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        Email
                      </button>
                      <button
                        onClick={() => setViewMode('lists')}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          background: viewMode === 'lists' ? 'var(--email-red-primary)' : 'transparent',
                          color: viewMode === 'lists' ? 'white' : 'var(--email-text-muted)',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        Lists
                      </button>
                      <button
                        onClick={() => setViewMode('exchange')}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          background: viewMode === 'exchange' ? 'var(--email-red-primary)' : 'transparent',
                          color: viewMode === 'exchange' ? 'white' : 'var(--email-text-muted)',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        Exchange
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
                          {folder.icon && <span className="nav-icon">{folder.icon}</span>}
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
                  ) : viewMode === 'lists' ? (
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
                          {list.icon && <span className="nav-icon">{list.icon}</span>}
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
                              {action.icon && <span className="nav-icon">{action.icon}</span>}
                              <span>{action.name}</span>
                            </button>
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    // Exchange view
                    <>
                      {!sidebarCollapsed && (
                        <>
                          <div style={{ padding: '12px' }}>
                            <button
                              onClick={() => setShowCreateListModal(true)}
                              style={{
                                width: '100%',
                                padding: '8px',
                                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))',
                                color: 'white',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '2px',
                                fontSize: '12px',
                                fontWeight: '300',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 1), rgba(0, 0, 0, 0.9))';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))';
                              }}
                            >
                              <span>+</span> Create List NFT
                            </button>
                          </div>

                          <div style={{ padding: '8px 12px', fontSize: '11px', opacity: 0.5, 
                            textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Exchange Views
                          </div>
                          
                          <button
                            onClick={() => setExchangeView('exchange')}
                            className={`nav-item ${exchangeView === 'exchange' ? 'active' : ''}`}
                          >
                            <span className="nav-icon">📊</span>
                            <span>Trading Exchange</span>
                          </button>
                          
                          <button
                            onClick={() => setExchangeView('marketplace')}
                            className={`nav-item ${exchangeView === 'marketplace' ? 'active' : ''}`}
                          >
                            <span className="nav-icon">🛒</span>
                            <span>Marketplace</span>
                          </button>

                          <div style={{ padding: '8px 12px', fontSize: '11px', opacity: 0.5, 
                            textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px' }}>
                            Your Lists
                          </div>
                        </>
                      )}
                      
                      {mailingLists.map((list) => (
                        <button
                          key={list.id}
                          onClick={() => setActiveList(list.id)}
                          className={`nav-item ${activeList === list.id ? 'active' : ''}`}
                        >
                          {list.icon && <span className="nav-icon">{list.icon}</span>}
                          {!sidebarCollapsed && (
                            <>
                              <span style={{ flex: 1 }}>{list.name}</span>
                              <span style={{ fontSize: '11px', opacity: 0.7 }}>
                                {list.shares > 0 ? `${list.shares} shares` : 'Owner'}
                              </span>
                            </>
                          )}
                        </button>
                      ))}
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
                      ) : viewMode === 'lists' ? (
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
                      ) : (
                        <>
                          <div className="stat-item">
                            <span className="stat-label">Market Cap</span>
                            <span className="stat-value">$12.5M</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">24h Volume</span>
                            <span className="stat-value">$1.9M</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Active NFTs</span>
                            <span className="stat-value">247</span>
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

          {/* Main Content based on viewMode */}
          {viewMode === 'exchange' ? (
            // Exchange View - Full Width
            <>
              <Panel defaultSize={82} className="exchange-panel">
                <div style={{ height: '100%', overflow: 'auto', background: 'var(--email-background-primary)' }}>
                  {/* Exchange Header */}
                  <div style={{ 
                    background: 'linear-gradient(to bottom, var(--email-background-secondary), var(--email-background-primary))',
                    borderBottom: '1px solid var(--email-border)',
                    padding: '16px 24px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h1 className="app-title-header" style={{ fontSize: '32px', marginBottom: '4px' }}>
                          <span className="bitcoin-text">Bitcoin</span> Email Lists Exchange
                        </h1>
                        <p className="app-subtitle">
                          Trade tokenized mailing lists • Earn dividends • Build your portfolio
                        </p>
                      </div>
                      <button
                        onClick={() => setShowCreateListModal(true)}
                        style={{
                          padding: '6px 14px',
                          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))',
                          color: 'white',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '2px',
                          fontSize: '12px',
                          fontWeight: '300',
                          cursor: 'pointer',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 1), rgba(0, 0, 0, 0.9))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))';
                        }}
                      >
                        + Create List NFT
                      </button>
                    </div>
                    
                    {/* Exchange View Tabs */}
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button
                        onClick={() => setExchangeView('exchange')}
                        style={{
                          padding: '6px 12px',
                          background: exchangeView === 'exchange' 
                            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))' 
                            : 'rgba(0, 0, 0, 0.3)',
                          color: exchangeView === 'exchange' ? 'white' : 'var(--email-text-muted)',
                          border: exchangeView === 'exchange' 
                            ? '1px solid rgba(239, 68, 68, 0.3)' 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '2px',
                          fontSize: '12px',
                          fontWeight: '300',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        Exchange
                      </button>
                      <button
                        onClick={() => setExchangeView('marketplace')}
                        style={{
                          padding: '6px 12px',
                          background: exchangeView === 'marketplace' 
                            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))' 
                            : 'rgba(0, 0, 0, 0.3)',
                          color: exchangeView === 'marketplace' ? 'white' : 'var(--email-text-muted)',
                          border: exchangeView === 'marketplace' 
                            ? '1px solid rgba(239, 68, 68, 0.3)' 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '2px',
                          fontSize: '12px',
                          fontWeight: '300',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        Marketplace
                      </button>
                    </div>
                  </div>

                  {/* Exchange Content */}
                  <div style={{ padding: '24px' }}>
                    {exchangeView === 'exchange' ? (
                      <EmailListExchange />
                    ) : (
                      <ListMarketplace />
                    )}
                  </div>
                </div>
              </Panel>
            </>
          ) : viewMode === 'lists' ? (
            // Lists View - Show mailing lists management
            <>
              <Panel defaultSize={82} className="lists-panel">
                <div style={{ height: '100%', overflow: 'auto', background: 'var(--email-background-primary)', padding: '24px' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Lists Header */}
                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '28px', fontWeight: '300', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--email-red-primary)' }}>Mailing Lists</span>{' '}
                        <span style={{ color: 'white' }}>Portfolio</span>
                      </h2>
                      <p style={{ fontSize: '14px', color: 'var(--email-text-muted)', fontWeight: '300' }}>
                        Manage your tokenized mailing lists, track performance, and monitor dividends
                      </p>
                    </div>

                    {/* Portfolio Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ background: 'var(--email-background-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--email-border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--email-text-muted)', marginBottom: '4px', fontWeight: '300' }}>Total Portfolio Value</p>
                        <p style={{ fontSize: '24px', fontWeight: '300', color: 'white' }}>$12,450</p>
                        <p style={{ fontSize: '12px', color: '#4ade80', marginTop: '4px', fontWeight: '300' }}>+15.2% this month</p>
                      </div>
                      <div style={{ background: 'var(--email-background-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--email-border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--email-text-muted)', marginBottom: '4px', fontWeight: '300' }}>Total Dividends Earned</p>
                        <p style={{ fontSize: '24px', fontWeight: '300', color: '#4ade80' }}>$342</p>
                        <p style={{ fontSize: '12px', color: 'var(--email-text-muted)', marginTop: '4px', fontWeight: '300' }}>Last 30 days</p>
                      </div>
                      <div style={{ background: 'var(--email-background-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--email-border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--email-text-muted)', marginBottom: '4px', fontWeight: '300' }}>Active Lists</p>
                        <p style={{ fontSize: '24px', fontWeight: '300', color: 'white' }}>{mailingLists.length}</p>
                        <p style={{ fontSize: '12px', color: 'var(--email-text-muted)', marginTop: '4px', fontWeight: '300' }}>1 owned, 4 shares</p>
                      </div>
                      <div style={{ background: 'var(--email-background-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--email-border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--email-text-muted)', marginBottom: '4px', fontWeight: '300' }}>Avg. Yield</p>
                        <p style={{ fontSize: '24px', fontWeight: '300', color: '#fbbf24' }}>6.4%</p>
                        <p style={{ fontSize: '12px', color: 'var(--email-text-muted)', marginTop: '4px', fontWeight: '300' }}>APY</p>
                      </div>
                    </div>

                    {/* Lists Grid */}
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '300', color: 'white' }}>Your Lists</h3>
                      <button 
                        onClick={() => router.push('/tokenize')}
                        style={{ 
                          padding: '6px 14px',
                          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))',
                          color: 'white',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '2px',
                          fontSize: '12px',
                          fontWeight: '300',
                          cursor: 'pointer',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 1), rgba(0, 0, 0, 0.9))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))';
                        }}
                      >
                        + Tokenize New List
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                      {mailingLists.map((list) => (
                        <div 
                          key={list.id}
                          style={{ 
                            background: 'var(--email-background-secondary)', 
                            borderRadius: '12px', 
                            padding: '20px',
                            border: '1px solid var(--email-border)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--email-red-primary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--email-border)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'start', marginBottom: '16px' }}>
                            {list.icon && <span style={{ fontSize: '32px', marginRight: '12px' }}>{list.icon}</span>}
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: '16px', fontWeight: '300', color: 'white', marginBottom: '4px' }}>
                                {list.name}
                              </h4>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ 
                                  fontSize: '11px', 
                                  padding: '2px 8px', 
                                  background: list.type === 'premium' ? 'rgba(251, 191, 36, 0.2)' : 
                                             list.type === 'verified' ? 'rgba(74, 222, 128, 0.2)' :
                                             list.type === 'targeted' ? 'rgba(59, 130, 246, 0.2)' : 
                                             'rgba(156, 163, 175, 0.2)',
                                  color: list.type === 'premium' ? '#fbbf24' : 
                                         list.type === 'verified' ? '#4ade80' :
                                         list.type === 'targeted' ? '#3b82f6' : 
                                         '#9ca3af',
                                  borderRadius: '4px',
                                  textTransform: 'uppercase'
                                }}>
                                  {list.type}
                                </span>
                                <span style={{ fontSize: '12px', color: 'var(--email-text-muted)' }}>
                                  {list.subscribers.toLocaleString()} subscribers
                                </span>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                              <p style={{ fontSize: '11px', color: 'var(--email-text-muted)', marginBottom: '2px', fontWeight: '300' }}>Shares Owned</p>
                              <p style={{ fontSize: '14px', color: 'white', fontWeight: '300' }}>
                                {list.shares > 0 ? `${list.shares} / ${list.totalShares}` : 
                                 list.isOwner ? `Owner (${list.totalShares})` : '0'}
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize: '11px', color: 'var(--email-text-muted)', marginBottom: '2px', fontWeight: '300' }}>Dividend Yield</p>
                              <p style={{ fontSize: '14px', color: '#fbbf24', fontWeight: '300' }}>{list.dividendYield}% APY</p>
                            </div>
                          </div>

                          <div style={{ borderTop: '1px solid var(--email-border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                            <button 
                              onClick={() => setViewMode('exchange')}
                              style={{ 
                                fontSize: '12px', 
                                color: 'var(--email-red-primary)', 
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '300'
                              }}
                            >
                              View on Exchange →
                            </button>
                            <button 
                              style={{ 
                                fontSize: '12px', 
                                color: 'var(--email-text-muted)', 
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '300'
                              }}
                            >
                              Manage
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add New List Card */}
                      <div 
                        style={{ 
                          background: 'transparent', 
                          borderRadius: '12px', 
                          padding: '20px',
                          border: '2px dashed var(--email-border)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: '200px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onClick={() => router.push('/tokenize')}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--email-red-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--email-border)';
                        }}
                      >
                        <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }}>+</div>
                        <p style={{ fontSize: '14px', color: 'var(--email-text-muted)', textAlign: 'center' }}>
                          Tokenize a new mailing list
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            </>
          ) : (
            // Email View - Split Panels
            <>
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
            </>
          )}
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

      {/* Create List Modal for Exchange */}
      {showCreateListModal && (
        <CreateListModal onClose={() => setShowCreateListModal(false)} />
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="mobile-bottom-nav">
          <button
            className={`mobile-nav-item ${viewMode === 'emails' ? 'active' : ''}`}
            onClick={() => setViewMode('emails')}
          >
            <span className="mobile-nav-icon">📧</span>
            <span className="mobile-nav-label">Email</span>
          </button>
          <button
            className={`mobile-nav-item ${viewMode === 'lists' ? 'active' : ''}`}
            onClick={() => setViewMode('lists')}
          >
            <span className="mobile-nav-icon">📋</span>
            <span className="mobile-nav-label">Lists</span>
          </button>
          <button
            className={`mobile-nav-item ${viewMode === 'exchange' ? 'active' : ''}`}
            onClick={() => setViewMode('exchange')}
          >
            <span className="mobile-nav-icon">📊</span>
            <span className="mobile-nav-label">Exchange</span>
          </button>
          <button
            className={`mobile-nav-item ${showMobileMenu ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span className="mobile-nav-icon">☰</span>
            <span className="mobile-nav-label">More</span>
          </button>
        </nav>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <>
          <div 
            className={`mobile-menu-overlay ${showMobileMenu ? 'open' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          />
          <div className={`mobile-menu ${showMobileMenu ? 'open' : ''}`}>
            <div className="mobile-menu-header">
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: 'white', marginBottom: '2px' }}>Menu</h3>
                <p style={{ fontSize: '11px', color: 'var(--email-text-muted)' }}>Bitcoin Email</p>
              </div>
              <button 
                className="mobile-menu-close"
                onClick={() => setShowMobileMenu(false)}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {viewMode === 'emails' && (
              <div className="mobile-menu-section">
                <div className="mobile-menu-section-title">Folders</div>
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => { setActiveFolder(folder.id); setShowMobileMenu(false); }}
                    className={`mobile-menu-item ${activeFolder === folder.id ? 'active' : ''}`}
                  >
                    {folder.icon && <span>{folder.icon}</span>}
                    <span style={{ flex: 1 }}>{folder.name}</span>
                    {folder.count > 0 && (
                      <span style={{ 
                        background: 'var(--email-red-primary)', 
                        padding: '2px 6px', 
                        borderRadius: '10px', 
                        fontSize: '11px' 
                      }}>
                        {folder.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {viewMode === 'lists' && (
              <div className="mobile-menu-section">
                <div className="mobile-menu-section-title">My Lists</div>
                {mailingLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => { setActiveList(list.id); setShowMobileMenu(false); }}
                    className={`mobile-menu-item ${activeList === list.id ? 'active' : ''}`}
                  >
                    {list.icon && <span>{list.icon}</span>}
                    <span style={{ flex: 1 }}>{list.name}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="mobile-menu-section">
              <div className="mobile-menu-section-title">Quick Actions</div>
              <button 
                onClick={() => { setShowCompose(true); setShowMobileMenu(false); }}
                className="mobile-menu-item"
              >
                <span>✏️</span>
                <span>Compose Email</span>
              </button>
              <button 
                onClick={() => { setShowConnectionsModal(true); setShowMobileMenu(false); }}
                className="mobile-menu-item"
              >
                <span>🔌</span>
                <span>Connections</span>
              </button>
            </div>

            <div className="mobile-menu-section">
              <div className="mobile-menu-section-title">Resources</div>
              <button
                onClick={() => { router.push('/token'); setShowMobileMenu(false); }}
                className="mobile-menu-item"
              >
                <span>🪙</span>
                <span>$BMAIL Token</span>
              </button>
              <button
                onClick={() => { router.push('/tokenize'); setShowMobileMenu(false); }}
                className="mobile-menu-item"
              >
                <span>🏷️</span>
                <span>Tokenize List</span>
              </button>
              <a 
                href="https://github.com/bitcoin-apps-suite/bitcoin-email"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowMobileMenu(false)}
                className="mobile-menu-item"
                style={{ textDecoration: 'none' }}
              >
                <span>📚</span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailClient;