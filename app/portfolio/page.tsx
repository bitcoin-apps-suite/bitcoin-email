'use client';

import React, { useState } from 'react';
import Taskbar from '@/components/Taskbar';
import { ConnectionBadge } from '@/components/ConnectionBadge';
import { ConnectionsModal } from '@/components/ConnectionsModal';
import { useRouter } from 'next/navigation';

export default function PortfolioPage() {
  const router = useRouter();
  const [activeList, setActiveList] = useState<string | null>(null);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [connections, setConnections] = useState<any[]>([
    {
      id: 'demo-handcash',
      type: 'handcash',
      name: 'HandCash',
      handle: '$satoshi',
      status: 'connected'
    }
  ]);
  
  // Enhanced mailing lists with more data
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
      change24h: 12.5,
      marketCap: 1875,
      volume24h: 342,
      category: 'Finance',
      subcategory: 'Cryptocurrency',
      performance: 'outperform'
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
      change24h: -3.2,
      marketCap: 500,
      volume24h: 89,
      category: 'Technology',
      subcategory: 'Startups',
      performance: 'underperform'
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
      change24h: 5.7,
      marketCap: 3000,
      volume24h: 567,
      category: 'Commerce',
      subcategory: 'Retail',
      performance: 'neutral'
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
      change24h: 8.9,
      marketCap: 600,
      volume24h: 234,
      category: 'Entertainment',
      subcategory: 'Gaming',
      performance: 'outperform'
    },
    { 
      id: 'list-005', 
      name: 'NFT Collectors Elite', 
      icon: '🎨', 
      subscribers: 32000,
      shares: 1200,
      totalShares: 8000,
      value: 240.00,
      type: 'premium' as const,
      dividendYield: 9.2,
      lastDividend: 0.0018,
      change24h: 18.7,
      marketCap: 1920,
      volume24h: 892,
      category: 'Finance',
      subcategory: 'Digital Assets',
      performance: 'outperform'
    },
    { 
      id: 'list-006', 
      name: 'Healthcare Professionals', 
      icon: '🏥', 
      subscribers: 28000,
      shares: 0,
      totalShares: 10000,
      value: 0,
      type: 'verified' as const,
      dividendYield: 5.8,
      lastDividend: 0,
      change24h: 2.3,
      marketCap: 2800,
      volume24h: 156,
      category: 'Healthcare',
      subcategory: 'Medical',
      performance: 'neutral',
      isOwner: true
    }
  ]);

  const totalPortfolioValue = mailingLists.reduce((sum, list) => sum + list.value, 0);
  const totalDividends = mailingLists.reduce((sum, list) => sum + (list.lastDividend * list.shares), 0);
  const totalShares = mailingLists.reduce((sum, list) => sum + list.shares, 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'premium': return '#fbbf24';
      case 'verified': return '#4ade80';
      case 'targeted': return '#3b82f6';
      default: return '#9ca3af';
    }
  };

  const categories = ['All', 'Finance', 'Technology', 'Commerce', 'Entertainment', 'Healthcare'];

  return (
    <div className="min-h-screen bg-black text-white">
      <Taskbar />
      
      {/* Title Header */}
      <header className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative">
              <img 
                src="/bitcoin-email-icon.jpg" 
                alt="Bitcoin Email" 
                width="48" 
                height="48"
                className="rounded-lg"
                onError={(e) => {
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
              <h1 className="text-3xl" style={{ fontWeight: '300' }}>
                <span className="text-red-500">Bitcoin</span>{' '}
                <span className="text-white">Email Portfolio</span>
              </h1>
              <p className="text-gray-400 text-sm" style={{ fontWeight: '300' }}>Manage your tokenized mailing list investments</p>
            </div>
          </div>
          
          <ConnectionBadge 
            connections={connections} 
            onOpenModal={() => setShowConnectionsModal(true)} 
          />
        </div>
      </header>

      <div className="flex h-[calc(100vh-32px-88px)]">
        {/* Sidebar */}
        <div className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col">
          {/* Portfolio Performance */}
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-white font-light mb-3">Portfolio Performance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-xs">Total Value</span>
                  <span className="text-white text-sm font-light">${totalPortfolioValue.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-red-600 to-red-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-xs">Monthly Dividends</span>
                  <span className="text-green-400 text-sm font-light">${(totalDividends * 30).toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-green-600 to-green-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-xs">Active Positions</span>
                  <span className="text-white text-sm font-light">{mailingLists.filter(l => l.shares > 0 || l.isOwner).length}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-gray-500 text-xs">24h Change</p>
                <p className="text-green-400 text-sm font-light">+$142.50</p>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-gray-500 text-xs">Best Performer</p>
                <p className="text-white text-sm font-light">NFT Elite</p>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-gray-500 text-xs">Total Shares</p>
                <p className="text-white text-sm font-light">{totalShares.toLocaleString()}</p>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-gray-500 text-xs">Avg. Yield</p>
                <p className="text-yellow-400 text-sm font-light">6.5%</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 flex-1">
            <div className="space-y-2">
              <button
                onClick={() => router.push('/tokenize')}
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
              
              <button
                onClick={() => router.push('/exchange')}
                style={{
                  width: '100%',
                  padding: '8px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  color: 'rgba(209, 213, 219, 1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: '300',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
                }}
              >
                View Exchange
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div style={{ padding: '24px' }}>
            {/* Portfolio Header */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '300', marginBottom: '8px' }}>
                <span style={{ color: 'var(--email-red-primary)' }}>Investment</span>{' '}
                <span style={{ color: 'white' }}>Portfolio</span>
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--email-text-muted)', fontWeight: '300' }}>
                Track performance, manage positions, and monitor dividend yields
              </p>
            </div>

            {/* Portfolio Stats Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px', 
              marginBottom: '32px' 
            }}>
              {[
                { label: 'Total Portfolio Value', value: `$${totalPortfolioValue.toFixed(2)}`, change: '+15.2%', color: 'white' },
                { label: 'Monthly Dividends', value: `$${(totalDividends * 30).toFixed(2)}`, change: '+8.3%', color: '#4ade80' },
                { label: 'Average Yield', value: '6.5% APY', change: '+0.8%', color: '#fbbf24' },
                { label: 'Total Positions', value: mailingLists.length, change: '+2', color: '#3b82f6' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(145deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.9))',
                    border: '1px solid rgba(55, 65, 81, 0.3)',
                    borderRadius: '4px',
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Shine effect */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      animation: 'shine 3s infinite'
                    }}
                  />
                  <p style={{ fontSize: '12px', color: 'var(--email-text-muted)', marginBottom: '4px', fontWeight: '300' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: '300', color: stat.color }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '12px', color: '#4ade80', marginTop: '4px', fontWeight: '300' }}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat.toLowerCase())}
                  style={{
                    padding: '6px 12px',
                    background: filterCategory === cat.toLowerCase() 
                      ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))' 
                      : 'rgba(0, 0, 0, 0.3)',
                    color: filterCategory === cat.toLowerCase() ? 'white' : 'var(--email-text-muted)',
                    border: filterCategory === cat.toLowerCase() 
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
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio Grid with Enhanced Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '20px' 
            }}>
              {mailingLists
                .filter(list => filterCategory === 'all' || list.category.toLowerCase() === filterCategory)
                .map((list) => (
                <div 
                  key={list.id}
                  style={{ 
                    background: 'linear-gradient(145deg, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.95))',
                    borderRadius: '4px', 
                    padding: '20px',
                    border: '1px solid rgba(55, 65, 81, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 16px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 12px 24px rgba(239, 68, 68, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 16px rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.3)';
                  }}
                >
                  {/* Performance Indicator Glow */}
                  {list.performance === 'outperform' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '60px',
                        height: '60px',
                        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.4), transparent)',
                        borderRadius: '50%',
                        filter: 'blur(20px)',
                        animation: 'pulse 2s infinite'
                      }}
                    />
                  )}

                  {/* Animated Shine Effect */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                      animation: 'shine 4s infinite'
                    }}
                  />

                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'start', marginBottom: '16px' }}>
                    <span style={{ fontSize: '36px', marginRight: '12px' }}>{list.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '300', color: 'white', marginBottom: '4px' }}>
                        {list.name}
                      </h4>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ 
                          fontSize: '10px', 
                          padding: '2px 6px',
                          background: `linear-gradient(135deg, ${getTypeColor(list.type)}20, transparent)`,
                          border: `1px solid ${getTypeColor(list.type)}40`,
                          color: getTypeColor(list.type),
                          borderRadius: '2px',
                          textTransform: 'uppercase',
                          backdropFilter: 'blur(10px)'
                        }}>
                          {list.type}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--email-text-muted)' }}>
                          {list.category} • {list.subcategory}
                        </span>
                      </div>
                    </div>
                    {/* Performance Badge */}
                    <div style={{
                      padding: '4px 8px',
                      background: list.performance === 'outperform' 
                        ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(0, 0, 0, 0.2))'
                        : list.performance === 'underperform'
                        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(0, 0, 0, 0.2))'
                        : 'linear-gradient(135deg, rgba(156, 163, 175, 0.2), rgba(0, 0, 0, 0.2))',
                      borderRadius: '2px',
                      border: `1px solid ${
                        list.performance === 'outperform' ? 'rgba(74, 222, 128, 0.3)' :
                        list.performance === 'underperform' ? 'rgba(239, 68, 68, 0.3)' :
                        'rgba(156, 163, 175, 0.3)'
                      }`
                    }}>
                      <span style={{ 
                        fontSize: '10px', 
                        color: list.performance === 'outperform' ? '#4ade80' :
                               list.performance === 'underperform' ? '#ef4444' : '#9ca3af',
                        textTransform: 'uppercase',
                        fontWeight: '300'
                      }}>
                        {list.performance}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '12px', 
                    marginBottom: '16px',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '2px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div>
                      <p style={{ fontSize: '10px', color: 'var(--email-text-muted)', marginBottom: '2px', fontWeight: '300' }}>
                        Position
                      </p>
                      <p style={{ fontSize: '13px', color: 'white', fontWeight: '300' }}>
                        ${list.value.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', color: 'var(--email-text-muted)', marginBottom: '2px', fontWeight: '300' }}>
                        Shares
                      </p>
                      <p style={{ fontSize: '13px', color: 'white', fontWeight: '300' }}>
                        {list.shares > 0 ? `${list.shares}/${list.totalShares}` : 
                         list.isOwner ? 'Owner' : '0'}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', color: 'var(--email-text-muted)', marginBottom: '2px', fontWeight: '300' }}>
                        24h Change
                      </p>
                      <p style={{ 
                        fontSize: '13px', 
                        color: list.change24h > 0 ? '#4ade80' : '#ef4444', 
                        fontWeight: '300' 
                      }}>
                        {list.change24h > 0 ? '+' : ''}{list.change24h}%
                      </p>
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--email-text-muted)', fontWeight: '300' }}>
                        Dividend Yield
                      </span>
                      <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: '300' }}>
                        {list.dividendYield}% APY
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '4px', 
                      background: 'rgba(0, 0, 0, 0.5)', 
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${(list.dividendYield / 10) * 100}%`, 
                        height: '100%',
                        background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                        boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
                        transition: 'width 0.3s'
                      }} />
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(55, 65, 81, 0.3)'
                  }}>
                    <button
                      onClick={() => router.push('/exchange')}
                      style={{
                        flex: 1,
                        padding: '6px',
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(0, 0, 0, 0.3))',
                        color: 'var(--email-red-primary)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '2px',
                        fontSize: '11px',
                        fontWeight: '300',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(0, 0, 0, 0.4))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(0, 0, 0, 0.3))';
                      }}
                    >
                      Trade
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '6px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        color: 'var(--email-text-muted)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '2px',
                        fontSize: '11px',
                        fontWeight: '300',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes shine {
          0% { left: -100%; }
          50%, 100% { left: 200%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Connections Modal */}
      {showConnectionsModal && (
        <ConnectionsModal 
          isOpen={showConnectionsModal}
          connections={connections}
          onClose={() => setShowConnectionsModal(false)}
          onConnect={(type) => console.log('Connect:', type)}
          onDisconnect={(id) => console.log('Disconnect:', id)}
        />
      )}
    </div>
  );
}