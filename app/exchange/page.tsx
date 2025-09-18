'use client';

import { useState } from 'react';
import { EmailListExchange } from '@/components/exchange/EmailListExchange';
import { ListMarketplace } from '@/components/exchange/ListMarketplace';
import { CreateListModal } from '@/components/exchange/CreateListModal';
import Taskbar from '@/components/Taskbar';

export default function ExchangePage() {
  const [activeView, setActiveView] = useState<'exchange' | 'marketplace'>('exchange');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeList, setActiveList] = useState<string | null>(null);

  // User's mailing lists
  const [mailingLists] = useState([
    { 
      id: 'list-001', 
      name: 'Crypto Investors Premium', 
      icon: '💎', 
      subscribers: 45000,
      shares: 750,
      totalShares: 10000,
      value: 187.50,
      type: 'premium' as const,
      dividendYield: 8.5,
      lastDividend: 0.002,
      change24h: 12.5
    },
    { 
      id: 'list-002', 
      name: 'Tech Startup Founders', 
      icon: '🚀', 
      subscribers: 12000,
      shares: 200,
      totalShares: 5000,
      value: 100.00,
      type: 'verified' as const,
      dividendYield: 6.2,
      lastDividend: 0.003,
      change24h: -3.2
    },
    { 
      id: 'list-003', 
      name: 'E-commerce Buyers', 
      icon: '🛒', 
      subscribers: 125000,
      shares: 1500,
      totalShares: 20000,
      value: 150.00,
      type: 'targeted' as const,
      dividendYield: 5.5,
      lastDividend: 0.0005,
      change24h: 5.7
    },
    { 
      id: 'list-004', 
      name: 'Gaming Community', 
      icon: '🎮', 
      subscribers: 85000,
      shares: 500,
      totalShares: 15000,
      value: 40.00,
      type: 'general' as const,
      dividendYield: 4.8,
      lastDividend: 0.0004,
      change24h: 8.9
    }
  ]);

  const totalPortfolioValue = mailingLists.reduce((sum, list) => sum + list.value, 0);
  const totalDividends = mailingLists.reduce((sum, list) => sum + (list.lastDividend * list.shares), 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'premium': return 'text-yellow-400';
      case 'verified': return 'text-green-400';
      case 'targeted': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Taskbar />
      
      {/* Title Header */}
      <header className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <img 
                  src="/bitcoin-email-icon.jpg" 
                  alt="Bitcoin Email" 
                  width="48" 
                  height="48"
                  className="rounded-lg"
                  onError={(e) => {
                    // Fallback to inline SVG if image fails
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const svg = document.createElement('div');
                    svg.innerHTML = `
                      <svg width="48" height="48" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" fill="#2a2a2a" rx="6"/>
                        <g transform="translate(20, 20)">
                          <path d="M -10 -5 L -10 6 L 10 6 L 10 -5 Z" fill="#ef4444"/>
                          <path d="M -10 -5 L 0 1 L 10 -5 Z" fill="#ef4444"/>
                          <path d="M -10 -5 L 0 1 M 10 -5 L 0 1" stroke="#2a2a2a" stroke-width="0.8" fill="none"/>
                          <text x="0" y="4" font-family="Arial" font-size="10" font-weight="bold" fill="#2a2a2a" text-anchor="middle">₿</text>
                        </g>
                      </svg>
                    `;
                    target.parentNode?.appendChild(svg.firstElementChild!);
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="text-red-500">Bitcoin</span>{' '}
                  <span className="text-white">Email Exchange</span>
                </h1>
                <p className="text-gray-400 text-sm">Decentralized Mailing List Marketplace</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex h-[calc(100vh-32px-88px)]">
        {/* Sidebar with Mailing Lists */}
        <div className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col">
          {/* Portfolio Summary */}
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-white font-semibold mb-3">Your Portfolio</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Total Value</span>
                <span className="text-white font-medium">${totalPortfolioValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Total Dividends</span>
                <span className="text-green-400 font-medium">${totalDividends.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Lists Owned</span>
                <span className="text-white font-medium">{mailingLists.length}</span>
              </div>
            </div>
          </div>

          {/* Lists */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Your Lists</h3>
              <div className="space-y-2">
                {mailingLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => setActiveList(list.id)}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-all ${
                      activeList === list.id 
                        ? 'bg-gray-800 border-l-2 border-red-500' 
                        : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{list.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{list.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs ${getTypeColor(list.type)}`}>{list.type}</span>
                          <span className="text-gray-500 text-xs">
                            {list.subscribers.toLocaleString()} subs
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div>
                            <p className="text-gray-400 text-xs">Value</p>
                            <p className="text-white font-medium text-sm">${list.value.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-xs">24h</p>
                            <p className={`font-medium text-sm ${
                              list.change24h > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {list.change24h > 0 ? '+' : ''}{list.change24h}%
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-700/50">
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-xs">Shares</span>
                            <span className="text-gray-300 text-xs">
                              {list.shares}/{list.totalShares}
                            </span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-gray-500 text-xs">Yield</span>
                            <span className="text-yellow-400 text-xs font-medium">
                              {list.dividendYield}% APY
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
                >
                  + Create New List
                </button>
                <button
                  onClick={() => window.location.href = '/tokenize'}
                  className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
                >
                  Tokenize List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-black/80 border-b border-red-900/30 backdrop-blur-xl sticky top-0 z-40">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Bitcoin Email Exchange
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Trade tokenized mailing lists • Earn dividends • Build your portfolio
                  </p>
                </div>
                
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-500 hover:to-red-400 transition-all transform hover:scale-105 shadow-lg"
                >
                  + Create List NFT
                </button>
              </div>

              {/* View Tabs */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setActiveView('exchange')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeView === 'exchange'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Exchange
                </button>
                <button
                  onClick={() => setActiveView('marketplace')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeView === 'marketplace'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Marketplace
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {activeView === 'exchange' ? (
              <EmailListExchange />
            ) : (
              <ListMarketplace />
            )}
          </div>
        </div>
      </div>

      {/* Create List Modal */}
      {showCreateModal && (
        <CreateListModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}