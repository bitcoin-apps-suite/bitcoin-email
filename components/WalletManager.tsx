'use client';

import { useState, useEffect } from 'react';
import { tokenEncryption, TokenWallet, TokenMessage } from '@/services/tokenEncryption';

interface WalletManagerProps {
  className?: string;
}

export function WalletManager({ className = '' }: WalletManagerProps) {
  const [wallets, setWallets] = useState<TokenWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<TokenWallet | null>(null);
  const [tokenBalances, setTokenBalances] = useState<Map<string, Map<string, number>>>(new Map());
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleConnectWallet = async (type: TokenWallet['type']) => {
    try {
      const wallet = await tokenEncryption.connectWallet(type);
      setWallets([...wallets, wallet]);
      
      // Update balances
      const walletBalance = await tokenEncryption.getWalletTokenBalance(wallet.address);
      const newBalances = new Map(tokenBalances);
      newBalances.set(wallet.address, walletBalance);
      setTokenBalances(newBalances);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnectWallet = async (walletAddress: string) => {
    try {
      await tokenEncryption.disconnectWallet(walletAddress);
      setWallets(wallets.filter(w => w.address !== walletAddress));
      
      // Remove from balances
      const newBalances = new Map(tokenBalances);
      newBalances.delete(walletAddress);
      setTokenBalances(newBalances);
      
      if (selectedWallet?.address === walletAddress) {
        setSelectedWallet(null);
      }
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

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

  return (
    <div className={`wallet-manager ${className}`}>
      <button
        className="wallet-manager-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        title="Token Wallet Manager"
      >
        <div className="wallet-indicator">
          <span className="wallet-icon">💼</span>
          <span className="token-count">{getTotalTokenCount()}</span>
        </div>
        <span className="wallet-text">
          {wallets.length} Wallet{wallets.length !== 1 ? 's' : ''}
        </span>
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
        <div className="wallet-manager-dropdown">
          <div className="wallet-manager-header">
            <h3>Token Message Wallets</h3>
            <p>Manage encrypted messages across tokens</p>
          </div>

          <div className="wallet-list">
            {wallets.length === 0 ? (
              <div className="no-wallets">
                <p>No wallets connected</p>
                <span>Connect a BSV wallet to store token messages</span>
              </div>
            ) : (
              wallets.map(wallet => {
                const walletBalance = tokenBalances.get(wallet.address) || new Map();
                const tokenCount = Array.from(walletBalance.values()).reduce((a, b) => a + b, 0);
                
                return (
                  <div 
                    key={wallet.id} 
                    className={`wallet-item ${selectedWallet?.id === wallet.id ? 'selected' : ''}`}
                    onClick={() => setSelectedWallet(wallet)}
                  >
                    <div 
                      className="wallet-icon-badge"
                      style={{ backgroundColor: getWalletColor(wallet.type) }}
                    >
                      {getWalletIcon(wallet.type)}
                    </div>
                    
                    <div className="wallet-info">
                      <div className="wallet-name">{wallet.type}</div>
                      <div className="wallet-address">{wallet.address}</div>
                    </div>
                    
                    <div className="wallet-stats">
                      <div className="token-badge">
                        {tokenCount} token{tokenCount !== 1 ? 's' : ''}
                      </div>
                      {wallet.balance !== undefined && (
                        <div className="balance-badge">
                          {wallet.balance.toFixed(2)} BSV
                        </div>
                      )}
                    </div>

                    <button
                      className="disconnect-wallet-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDisconnectWallet(wallet.address);
                      }}
                      title="Disconnect wallet"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {selectedWallet && (
            <div className="wallet-details">
              <h4>Token Messages</h4>
              <div className="token-breakdown">
                {Array.from(tokenBalances.get(selectedWallet.address) || new Map()).map(([tokenType, count]) => (
                  <div key={tokenType} className="token-type-item">
                    <span className="token-type-name">{tokenType}</span>
                    <span className="token-type-count">{count} messages</span>
                  </div>
                ))}
                {selectedWallet.tokens.length === 0 && (
                  <p className="no-tokens">No token messages yet</p>
                )}
              </div>
            </div>
          )}

          <div className="wallet-manager-footer">
            <p className="wallet-info-text">
              Each message is encrypted and stored on-chain as a token transaction
            </p>
          </div>
        </div>
      )}
    </div>
  );
}