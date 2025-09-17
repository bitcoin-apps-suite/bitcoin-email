'use client';

import { useState } from 'react';

interface Connection {
  id: string;
  type: 'handcash' | 'gmail' | 'outlook' | 'hotmail' | 'yahoo' | 'other';
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
  if (!isOpen) return null;

  const bitcoinProviders = [
    {
      id: 'handcash',
      name: 'HandCash',
      description: 'Bitcoin wallet and $handle payments',
      icon: '$',
      color: '#00d4aa',
      features: ['$handle payments', 'Bitcoin wallet', 'Instant transfers']
    }
  ];

  const emailProviders = [
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
      id: 'hotmail',
      name: 'Hotmail',
      description: 'Microsoft Hotmail integration',
      icon: '📪',
      color: '#0078d4',
      features: ['Legacy support', 'Basic email', 'Personal accounts']
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      description: 'Yahoo Mail integration',
      icon: '📬',
      color: '#720e9e',
      features: ['Yahoo sync', 'Large storage', 'Mobile friendly']
    }
  ];

  const getConnectionStatus = (providerId: string) => {
    return connections.find(c => c.type === providerId as any);
  };

  const handleConnect = (providerId: string) => {
    // Simulate connection process
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
          <p>Connect your Bitcoin wallet and email accounts</p>
          <button className="close-btn" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="connections-content">
          {/* Wallet Connections Section */}
          <div className="connection-section">
            <div className="section-header">
              <div className="section-title">
                <span className="section-icon">₿</span>
                <h3>Wallet Connections</h3>
              </div>
              <p className="section-description">Connect your Bitcoin wallet for payments and $handle support</p>
            </div>
            
            <div className="providers-grid">
              {bitcoinProviders.map((provider) => {
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

          {/* Mail Connections Section */}
          <div className="connection-section">
            <div className="section-header">
              <div className="section-title">
                <span className="section-icon">📧</span>
                <h3>Mail Connections</h3>
              </div>
              <p className="section-description">Connect your email accounts to send and receive messages</p>
            </div>
            
            <div className="providers-grid">
              {emailProviders.map((provider) => {
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