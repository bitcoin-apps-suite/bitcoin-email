'use client';

import { useState, useEffect } from 'react';
import { tokenEncryption, TokenWallet } from '@/services/tokenEncryption';

interface Connection {
  id: string;
  type: 'handcash' | 'gmail' | 'outlook' | 'hotmail' | 'yahoo' | 'other';
  name: string;
  email?: string;
  handle?: string;
  status: 'connected' | 'disconnected' | 'error';
}

interface UnifiedConnectionsProps {
  connections: Connection[];
  onOpenModal: () => void;
  className?: string;
}

export function UnifiedConnections({ connections, onOpenModal, className = '' }: UnifiedConnectionsProps) {
  const [wallets, setWallets] = useState<TokenWallet[]>([]);
  const [tokenBalances, setTokenBalances] = useState<Map<string, Map<string, number>>>(new Map());
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'connections' | 'wallets'>('connections');

  useEffect(() => {
    loadWallets();
  }, []);

  const loadWallets = async () => {
    const connectedWallets = tokenEncryption.getConnectedWallets();
    setWallets(connectedWallets);
    
    // Load token balances for each wallet
    const balances = new Map<string, Map<string, number>>();
    for (const wallet of connectedWallets) {
      const walletBalance = await tokenEncryption.getWalletTokenBalance(wallet.address);
      balances.set(wallet.address, walletBalance);
    }
    setTokenBalances(balances);
  };

  const handleDisconnectWallet = async (walletAddress: string) => {
    try {
      await tokenEncryption.disconnectWallet(walletAddress);
      setWallets(wallets.filter(w => w.address !== walletAddress));
      
      // Remove from balances
      const newBalances = new Map(tokenBalances);
      newBalances.delete(walletAddress);
      setTokenBalances(newBalances);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const connectedCount = connections.filter(c => c.status === 'connected').length;
  const hasHandCash = connections.some(c => c.type === 'handcash' && c.status === 'connected');
  const hasEmail = connections.some(c => c.type !== 'handcash' && c.status === 'connected');
  const totalConnections = connectedCount + wallets.length;

  const getTotalTokenCount = () => {
    let total = 0;
    tokenBalances.forEach(walletBalance => {
      walletBalance.forEach(count => {
        total += count;
      });
    });
    return total;
  };

  const getWalletIcon = (type: string) => {
    const icons: Record<string, string> = {
      handcash: '$',
      moneybutton: '₿',
      relayx: '⚡',
      centbee: '🐝',
      simplycash: '💳',
      volt: '⚡'
    };
    return icons[type] || '💼';
  };

  const getWalletColor = (type: string) => {
    const colors: Record<string, string> = {
      handcash: '#00d4aa',
      moneybutton: '#4772fa',
      relayx: '#1d4ed8',
      centbee: '#fbbf24',
      simplycash: '#10b981',
      volt: '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  const getConnectionIcon = (type: string) => {
    const icons: Record<string, string> = {
      handcash: '$',
      gmail: '📧',
      outlook: '📨',
      hotmail: '📬',
      yahoo: '📮',
      other: '✉️'
    };
    return icons[type] || '📧';
  };

  const getStatusColor = () => {
    if (totalConnections === 0) return 'disconnected';
    if (hasHandCash && (hasEmail || wallets.length > 0)) return 'full';
    return 'partial';
  };

  const getStatusText = () => {
    if (totalConnections === 0) return 'Not Connected';
    if (totalConnections === 1) return '1 Connection';
    return `${totalConnections} Connections`;
  };

  const statusColor = getStatusColor();

  return (
    <div className={`unified-connections ${className}`}>
      <button
        className={`connection-toggle ${statusColor}`}
        onClick={() => setIsExpanded(!isExpanded)}
        title="Manage Connections & Wallets"
      >
        <div className="connection-status-indicator">
          <div className={`status-dot ${statusColor}`} />
          {hasHandCash && (
            <div className="handcash-indicator">
              <span className="handcash-symbol">$</span>
            </div>
          )}
          {wallets.length > 0 && (
            <div className="wallet-indicator">
              <span className="wallet-icon">💼</span>
              <span className="token-count">{getTotalTokenCount()}</span>
            </div>
          )}
        </div>

        <div className="connection-details">
          <span className="connection-count">{getStatusText()}</span>
          <span className="connection-subtitle">
            {totalConnections === 0 
              ? 'Connect accounts' 
              : hasHandCash && (hasEmail || wallets.length > 0)
                ? 'Bitcoin + Email' 
                : hasHandCash 
                  ? 'Bitcoin only' 
                  : 'Email only'
            }
          </span>
        </div>

        <svg 
          className={`chevron ${isExpanded ? 'expanded' : ''}`}
          width="12" 
          height="12" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="unified-dropdown">
          <div className="dropdown-header">
            <div className="tab-buttons">
              <button
                className={`tab-btn ${activeTab === 'connections' ? 'active' : ''}`}
                onClick={() => setActiveTab('connections')}
              >
                Connections
                {connectedCount > 0 && <span className="tab-badge">{connectedCount}</span>}
              </button>
              <button
                className={`tab-btn ${activeTab === 'wallets' ? 'active' : ''}`}
                onClick={() => setActiveTab('wallets')}
              >
                Wallets
                {wallets.length > 0 && <span className="tab-badge">{wallets.length}</span>}
              </button>
            </div>
          </div>

          {activeTab === 'connections' && (
            <div className="connections-tab">
              <div className="connection-list">
                {connections.length === 0 ? (
                  <div className="empty-state">
                    <p>No connections</p>
                    <span>Connect your email and Bitcoin accounts</span>
                  </div>
                ) : (
                  connections.map(connection => (
                    <div 
                      key={connection.id} 
                      className={`connection-item ${connection.status}`}
                    >
                      <div className="connection-icon">
                        {getConnectionIcon(connection.type)}
                      </div>
                      
                      <div className="connection-info">
                        <div className="connection-name">{connection.name}</div>
                        <div className="connection-identifier">
                          {connection.email || connection.handle || connection.type}
                        </div>
                      </div>
                      
                      <div className={`status-indicator ${connection.status}`}>
                        {connection.status === 'connected' ? '✓' : '○'}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button 
                className="manage-connections-btn"
                onClick={onOpenModal}
              >
                Manage Connections
              </button>
            </div>
          )}

          {activeTab === 'wallets' && (
            <div className="wallets-tab">
              <div className="wallet-list">
                {wallets.length === 0 ? (
                  <div className="empty-state">
                    <p>No wallets connected</p>
                    <span>Connect a BSV wallet to store token messages</span>
                  </div>
                ) : (
                  wallets.map(wallet => {
                    const walletBalance = tokenBalances.get(wallet.address) || new Map();
                    const tokenCount = Array.from(walletBalance.values()).reduce((a, b) => a + b, 0);
                    
                    return (
                      <div key={wallet.id} className="wallet-item">
                        <div 
                          className="wallet-icon-badge"
                          style={{ backgroundColor: getWalletColor(wallet.type) }}
                        >
                          {getWalletIcon(wallet.type)}
                        </div>
                        
                        <div className="wallet-info">
                          <div className="wallet-name">{wallet.type}</div>
                          <div className="wallet-address">
                            {wallet.address.substring(0, 8)}...{wallet.address.substring(wallet.address.length - 6)}
                          </div>
                        </div>
                        
                        <div className="wallet-stats">
                          <div className="token-badge">
                            {tokenCount} token{tokenCount !== 1 ? 's' : ''}
                          </div>
                        </div>

                        <button
                          className="disconnect-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDisconnectWallet(wallet.address);
                          }}
                          title="Disconnect"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="wallet-footer">
                <p className="wallet-info-text">
                  Messages encrypted on-chain as token transactions
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}