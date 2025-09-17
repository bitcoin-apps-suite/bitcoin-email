'use client';

import { useState } from 'react';

interface Connection {
  id: string;
  type: 'bitcoinwallet' | 'handcash' | 'yours' | 'taal' | 'centbee' | 'gmail' | 'outlook' | 'hotmail' | 'yahoo' | 'imap' | 'pop3' | 'exchange' | 'protonmail' | 'icloud' | 'aol' | 'zoho' | 'fastmail' | 'mailru' | 'yandex' | 'gmx' | 'other';
  name: string;
  email?: string;
  handle?: string;
  status: 'connected' | 'disconnected' | 'error';
}

interface ConnectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  connections: Connection[];
  onConnect: (type: string) => void;
  onDisconnect: (id: string) => void;
}

export function ConnectionsModal({ 
  isOpen, 
  onClose, 
  connections, 
  onConnect, 
  onDisconnect 
}: ConnectionsModalProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'wallets'>('email');
  
  if (!isOpen) return null;

  const bsvWallets = [
    {
      id: 'bitcoinwallet',
      name: 'Bitcoin Wallet',
      description: 'Our native Bitcoin SV wallet',
      icon: '₿',
      color: '#ef4444',
      features: ['Native integration', 'Full BSV support', 'Token messages']
    },
    {
      id: 'handcash',
      name: 'HandCash',
      description: 'Bitcoin wallet and $handle payments',
      icon: '$',
      color: '#00d4aa',
      features: ['$handle payments', 'Bitcoin wallet', 'Instant transfers']
    },
    {
      id: 'yours',
      name: 'Yours Wallet',
      description: 'The standard BSV wallet',
      icon: 'Y',
      color: '#7c3aed',
      features: ['PayMail support', 'Token support', 'DeFi integration']
    },
    {
      id: 'taal',
      name: 'TAAL Wallet',
      description: 'Enterprise BSV wallet',
      icon: 'T',
      color: '#0ea5e9',
      features: ['Enterprise features', 'TAAL network', 'Advanced tools']
    },
    {
      id: 'centbee',
      name: 'Centbee',
      description: 'Mobile-first BSV wallet',
      icon: '🐝',
      color: '#fbbf24',
      features: ['Mobile wallet', 'Merchant tools', 'Remittance']
    }
  ];

  const priorityEmailProviders = [
    {
      id: 'imap',
      name: 'IMAP Server',
      description: 'Connect any IMAP email server',
      icon: '🔧',
      color: '#6b7280',
      features: ['Universal protocol', 'Custom servers', 'Full control'],
      priority: true
    },
    {
      id: 'pop3',
      name: 'POP3 Server',
      description: 'Connect any POP3 email server',
      icon: '📥',
      color: '#6b7280',
      features: ['Download emails', 'Legacy support', 'Simple setup'],
      priority: true
    },
    {
      id: 'exchange',
      name: 'Exchange',
      description: 'Microsoft Exchange Server',
      icon: '🏢',
      color: '#0078d4',
      features: ['Enterprise email', 'Calendar sync', 'Active Directory'],
      priority: true
    },
    {
      id: 'protonmail',
      name: 'ProtonMail',
      description: 'Encrypted email service',
      icon: '🔐',
      color: '#6d4aff',
      features: ['End-to-end encryption', 'Swiss privacy', 'Bridge support'],
      priority: true
    },
    {
      id: 'icloud',
      name: 'iCloud Mail',
      description: 'Apple iCloud email service',
      icon: '☁️',
      color: '#007aff',
      features: ['Apple ecosystem', 'iCloud sync', 'Hide My Email'],
      priority: true
    }
  ];

  const standardEmailProviders = [
    // Most popular services first
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Google Mail integration',
      icon: '📧',
      color: '#ea4335',
      features: ['Full inbox sync', 'Send/receive', 'Labels & filters']
    },
    {
      id: 'outlook',
      name: 'Outlook',
      description: 'Microsoft Outlook integration',
      icon: '📮',
      color: '#0078d4',
      features: ['Office 365 sync', 'Calendar integration', 'Enterprise features']
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      description: 'Yahoo Mail integration',
      icon: '📬',
      color: '#720e9e',
      features: ['Yahoo sync', 'Large storage', 'Mobile friendly']
    },
    {
      id: 'hotmail',
      name: 'Hotmail',
      description: 'Microsoft Hotmail integration',
      icon: '📪',
      color: '#0078d4',
      features: ['Legacy support', 'Basic email', 'Personal accounts']
    },
    {
      id: 'aol',
      name: 'AOL Mail',
      description: 'AOL email service',
      icon: '📨',
      color: '#ff0b00',
      features: ['AOL classic', 'Unlimited storage', 'AIM integration']
    },
    {
      id: 'zoho',
      name: 'Zoho Mail',
      description: 'Business email service',
      icon: '💼',
      color: '#dc2626',
      features: ['Business suite', 'Ad-free', 'Custom domains']
    },
    {
      id: 'fastmail',
      name: 'Fastmail',
      description: 'Privacy-focused email',
      icon: '🚀',
      color: '#2563eb',
      features: ['Privacy first', 'Custom domains', 'Calendars']
    },
    {
      id: 'mailru',
      name: 'Mail.ru',
      description: 'Russian email service',
      icon: '📮',
      color: '#005ff9',
      features: ['Cloud storage', 'Social features', 'Mail.ru ecosystem']
    },
    {
      id: 'yandex',
      name: 'Yandex Mail',
      description: 'Yandex email service',
      icon: '📧',
      color: '#fc3f1d',
      features: ['Yandex services', 'Spam protection', 'Translator']
    },
    {
      id: 'gmx',
      name: 'GMX Mail',
      description: 'European email service',
      icon: '📪',
      color: '#1c4587',
      features: ['European privacy', 'File storage', 'Organizer']
    }
  ];

  const getConnectionStatus = (providerId: string) => {
    return connections.find(c => c.type === providerId as any);
  };

  const handleConnect = (providerId: string) => {
    onConnect(providerId);
  };

  const handleDisconnect = (connection: Connection) => {
    onDisconnect(connection.id);
  };

  return (
    <div className="connections-modal-overlay">
      <div className="connections-modal">
        <div className="connections-modal-header">
          <h2>Account Connections</h2>
          <p>{activeTab === 'email' ? 'Connect your email accounts' : 'Connect your BSV wallets and manage token messages'}</p>
          <button className="close-btn" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="connection-tabs">
          <button 
            className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            <span className="tab-icon">📧</span>
            Email Services
          </button>
          <button 
            className={`tab-btn ${activeTab === 'wallets' ? 'active' : ''}`}
            onClick={() => setActiveTab('wallets')}
          >
            <span className="tab-icon">₿</span>
            BSV Wallets
          </button>
        </div>

        <div className="connections-content">
          {activeTab === 'email' ? (
            <>
              {/* Priority Email Services */}
              <div className="connection-section">
                <div className="section-header">
                  <div className="section-title">
                    <span className="section-icon">⚡</span>
                    <h3>Priority Services</h3>
                  </div>
                  <p className="section-description">Direct server connections and encrypted email services</p>
                </div>
                
                <div className="providers-grid priority-grid">
                  {priorityEmailProviders.map((provider) => {
                    const connection = getConnectionStatus(provider.id);
                    const isConnected = connection?.status === 'connected';

                    return (
                      <div key={provider.id} className={`provider-card priority ${isConnected ? 'connected' : ''}`}>
                        <div className="provider-header">
                          <div className="provider-icon" style={{ backgroundColor: provider.color }}>
                            {provider.icon}
                          </div>
                          <div className="provider-info">
                            <h3>{provider.name}</h3>
                            <p>{provider.description}</p>
                          </div>
                          <div className="provider-status">
                            {isConnected ? (
                              <button 
                                className="disconnect-btn"
                                onClick={() => handleDisconnect(connection)}
                              >
                                Disconnect
                              </button>
                            ) : (
                              <button 
                                className="connect-btn primary"
                                onClick={() => handleConnect(provider.id)}
                              >
                                Connect
                              </button>
                            )}
                          </div>
                        </div>

                        {isConnected && connection && (
                          <div className="connection-details">
                            <div className="connected-info">
                              <div className="status-indicator connected" />
                              <span>Connected as {connection.email}</span>
                            </div>
                          </div>
                        )}

                        <div className="provider-features">
                          {provider.features.map((feature, index) => (
                            <span key={index} className="feature-tag">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Standard Email Services */}
              <div className="connection-section">
                <div className="section-header">
                  <div className="section-title">
                    <span className="section-icon">📮</span>
                    <h3>Standard Services</h3>
                  </div>
                  <p className="section-description">Popular email providers with OAuth integration</p>
                </div>
                
                <div className="providers-grid">
                  {standardEmailProviders.map((provider) => {
                    const connection = getConnectionStatus(provider.id);
                    const isConnected = connection?.status === 'connected';

                    return (
                      <div key={provider.id} className={`provider-card ${isConnected ? 'connected' : ''}`}>
                        <div className="provider-header">
                          <div className="provider-icon" style={{ backgroundColor: provider.color }}>
                            {provider.icon}
                          </div>
                          <div className="provider-info">
                            <h3>{provider.name}</h3>
                            <p>{provider.description}</p>
                          </div>
                          <div className="provider-status">
                            {isConnected ? (
                              <button 
                                className="disconnect-btn"
                                onClick={() => handleDisconnect(connection)}
                              >
                                Disconnect
                              </button>
                            ) : (
                              <button 
                                className="connect-btn"
                                onClick={() => handleConnect(provider.id)}
                              >
                                Connect
                              </button>
                            )}
                          </div>
                        </div>

                        {isConnected && connection && (
                          <div className="connection-details">
                            <div className="connected-info">
                              <div className="status-indicator connected" />
                              <span>Connected as {connection.email}</span>
                            </div>
                          </div>
                        )}

                        <div className="provider-features">
                          {provider.features.map((feature, index) => (
                            <span key={index} className="feature-tag">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* BSV Wallets Section */}
              <div className="connection-section">
                <div className="section-header">
                  <div className="section-title">
                    <span className="section-icon">₿</span>
                    <h3>BSV Wallet Connections</h3>
                  </div>
                  <p className="section-description">Connect your Bitcoin SV wallets for payments and token message storage</p>
                </div>
                
                <div className="providers-grid wallets-grid">
                  {bsvWallets.map((provider) => {
                    const connection = getConnectionStatus(provider.id);
                    const isConnected = connection?.status === 'connected';

                    return (
                      <div key={provider.id} className={`provider-card ${isConnected ? 'connected' : ''}`}>
                        <div className="provider-header">
                          <div className="provider-icon" style={{ backgroundColor: provider.color }}>
                            {provider.icon}
                          </div>
                          <div className="provider-info">
                            <h3>{provider.name}</h3>
                            <p>{provider.description}</p>
                          </div>
                          <div className="provider-status">
                            {isConnected ? (
                              <button 
                                className="disconnect-btn"
                                onClick={() => handleDisconnect(connection)}
                              >
                                Disconnect
                              </button>
                            ) : (
                              <button 
                                className="connect-btn primary"
                                onClick={() => handleConnect(provider.id)}
                              >
                                Connect
                              </button>
                            )}
                          </div>
                        </div>

                        {isConnected && connection && (
                          <div className="connection-details">
                            <div className="connected-info">
                              <div className="status-indicator connected" />
                              <span>Connected as {connection.handle || connection.email}</span>
                            </div>
                          </div>
                        )}

                        <div className="provider-features">
                          {provider.features.map((feature, index) => (
                            <span key={index} className="feature-tag">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Token Wallet Info */}
              <div className="token-wallet-info">
                <div className="info-header">
                  <span className="info-icon">🔐</span>
                  <h3>Token Message Wallet</h3>
                </div>
                <p className="info-description">
                  This email client doubles as a multi-token wallet. Encrypted messages sent on various tokens 
                  are stored in your connected wallets. Each message represents a token transaction that can be 
                  decrypted and read only by you.
                </p>
                <div className="token-features">
                  <div className="token-feature">
                    <span className="feature-icon">🎯</span>
                    <div>
                      <h4>Private Addresses</h4>
                      <p>Each conversation uses unique addresses for privacy</p>
                    </div>
                  </div>
                  <div className="token-feature">
                    <span className="feature-icon">💎</span>
                    <div>
                      <h4>Multi-Token Support</h4>
                      <p>Store messages across different token types</p>
                    </div>
                  </div>
                  <div className="token-feature">
                    <span className="feature-icon">🔒</span>
                    <div>
                      <h4>End-to-End Encryption</h4>
                      <p>Messages encrypted on-chain, readable only by recipients</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="connections-footer">
          <div className="security-notice">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>All connections are encrypted and secure. No passwords are stored.</span>
          </div>
        </div>
      </div>
    </div>
  );
}