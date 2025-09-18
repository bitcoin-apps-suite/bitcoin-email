'use client';

import React, { useState } from 'react';
import Taskbar from '@/components/Taskbar';
import { ConnectionBadge } from '@/components/ConnectionBadge';
import { ConnectionsModal } from '@/components/ConnectionsModal';

export default function TokenizePage() {
  const [step, setStep] = useState(1);
  const [activeList, setActiveList] = useState<string | null>(null);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [connections, setConnections] = useState<any[]>([
    {
      id: 'demo-handcash',
      type: 'handcash',
      name: 'HandCash',
      handle: '$satoshi',
      status: 'connected'
    }
  ]);
  
  const [tokenizeData, setTokenizeData] = useState({
    // Basic Info
    listName: '',
    description: '',
    category: '',
    tags: [] as string[],
    
    // List Data
    csvFile: null as File | null,
    listSize: 0,
    verifiedEmails: 0,
    
    // Token Economics
    totalShares: 10000,
    initialPrice: 0.1,
    treasuryReserve: 20, // % held by creator
    publicOffering: 50, // % for initial sale
    liquidityPool: 30, // % for exchange liquidity
    
    // Revenue Sharing
    dividendPercentage: 10,
    payoutFrequency: 'monthly',
    minimumPayout: 0.001,
    
    // Smart Contract Settings
    payoutAddress: '',
    contractType: 'standard',
    votingRights: false,
    transferRestrictions: 'none',
    vestingSchedule: false,
    
    // Metadata
    websiteUrl: '',
    socialLinks: {
      twitter: '',
      telegram: '',
      discord: ''
    },
    
    // Advanced Settings
    autoReinvest: false,
    compoundDividends: false,
    burnMechanism: false,
    buybackProgram: false,
    stakingRewards: false,
    referralProgram: false,
    
    // Compliance
    kycRequired: false,
    accreditedOnly: false,
    jurisdictionRestrictions: [] as string[],
    termsAccepted: false
  });

  const [tagInput, setTagInput] = useState('');

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setTokenizeData({ ...tokenizeData, csvFile: file });
      // In production, would parse CSV to get list size and verified count
      setTokenizeData(prev => ({ 
        ...prev, 
        listSize: Math.floor(Math.random() * 100000), 
        verifiedEmails: Math.floor(Math.random() * 80000) 
      }));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTokenizeData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTokenizeData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleTokenize = () => {
    console.log('Tokenizing with data:', tokenizeData);
    // Here would be the blockchain interaction to create the NFT
  };

  const categories = [
    'Crypto & Blockchain',
    'B2B Enterprise',
    'E-commerce',
    'Gaming',
    'Finance',
    'Healthcare',
    'Real Estate',
    'Technology',
    'Marketing',
    'Education'
  ];

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
                <span className="text-white">Email</span>
              </h1>
              <p className="text-gray-400 text-sm" style={{ fontWeight: '300' }}>Tokenize Mailing List</p>
            </div>
          </div>
          
          <ConnectionBadge 
            connections={connections} 
            onOpenModal={() => setShowConnectionsModal(true)} 
          />
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
                    onClick={() => {
                      setActiveList(list.id);
                      // Pre-fill tokenization form with selected list
                      if (list.id === activeList) {
                        setTokenizeData(prev => ({
                          ...prev,
                          listName: list.name,
                          listSize: list.subscribers
                        }));
                      }
                    }}
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
                            <p className="text-gray-400 text-xs">Yield</p>
                            <p className="text-yellow-400 text-xs font-medium">
                              {list.dividendYield}% APY
                            </p>
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
                  onClick={() => window.location.href = '/'}
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
                  ← Back to Email
                </button>
                <button
                  onClick={() => window.location.href = '/exchange'}
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
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Tokenize Mailing List</h1>
              <p className="text-gray-400">Convert your email list into a tradeable NFT with revenue sharing</p>
            </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[
            { num: 1, label: 'List Information' },
            { num: 2, label: 'Token Economics' },
            { num: 3, label: 'Smart Contract' },
            { num: 4, label: 'Review & Deploy' }
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center ${s.num < 4 ? 'flex-1' : ''}`}
            >
              <div
                className={`flex items-center cursor-pointer`}
                onClick={() => setStep(s.num)}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    step >= s.num
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'border-gray-600 text-gray-500'
                  }`}
                >
                  {s.num}
                </div>
                <span className={`ml-3 ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>
                  {s.label}
                </span>
              </div>
              {s.num < 4 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  step > s.num ? 'bg-red-600' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Content - Beveled Panel Style */}
        <div style={{ 
          background: 'linear-gradient(145deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.9))',
          border: '1px solid rgba(55, 65, 81, 0.3)',
          borderRadius: '4px',
          padding: '32px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 6px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl mb-6" style={{ fontWeight: '300' }}>List Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  List Name *
                </label>
                <input
                  type="text"
                  value={tokenizeData.listName}
                  onChange={(e) => setTokenizeData({ ...tokenizeData, listName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  placeholder="e.g., Premium Crypto Investors USA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={tokenizeData.description}
                  onChange={(e) => setTokenizeData({ ...tokenizeData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  rows={4}
                  placeholder="Describe your mailing list, target audience, and value proposition..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={tokenizeData.category}
                    onChange={(e) => setTokenizeData({ ...tokenizeData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags (Press Enter to add)
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    placeholder="Add tags..."
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tokenizeData.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(idx)}
                          className="text-red-300 hover:text-red-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload CSV File *
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {tokenizeData.csvFile ? (
                      <div>
                        <p className="text-white mb-2">{tokenizeData.csvFile.name}</p>
                        <div className="grid grid-cols-2 gap-4 mt-4 max-w-xs mx-auto">
                          <div className="bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-400 text-xs">Total Emails</p>
                            <p className="text-white font-bold">{tokenizeData.listSize.toLocaleString()}</p>
                          </div>
                          <div className="bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-400 text-xs">Verified</p>
                            <p className="text-white font-bold">{tokenizeData.verifiedEmails.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-300 mb-2">Click to upload CSV file</p>
                        <p className="text-gray-500 text-sm">Maximum file size: 100MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl mb-6" style={{ fontWeight: '300' }}>Token Economics</h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Shares to Issue
                  </label>
                  <input
                    type="number"
                    value={tokenizeData.totalShares}
                    onChange={(e) => setTokenizeData({ ...tokenizeData, totalShares: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  />
                  <p className="text-gray-500 text-xs mt-1">Standard: 10,000 shares</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Initial Price per Share (BSV)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={tokenizeData.initialPrice}
                    onChange={(e) => setTokenizeData({ ...tokenizeData, initialPrice: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Market Cap: {(tokenizeData.totalShares * tokenizeData.initialPrice).toFixed(2)} BSV
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Share Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-300">Treasury Reserve (Creator)</label>
                      <span className="text-white font-medium">{tokenizeData.treasuryReserve}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={tokenizeData.treasuryReserve}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, treasuryReserve: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-300">Public Offering</label>
                      <span className="text-white font-medium">{tokenizeData.publicOffering}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="70"
                      value={tokenizeData.publicOffering}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, publicOffering: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-300">Liquidity Pool</label>
                      <span className="text-white font-medium">{tokenizeData.liquidityPool}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="40"
                      value={tokenizeData.liquidityPool}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, liquidityPool: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
                <p className="text-yellow-400 text-sm mt-2">
                  Total: {tokenizeData.treasuryReserve + tokenizeData.publicOffering + tokenizeData.liquidityPool}% 
                  (must equal 100%)
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Revenue Sharing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dividend Percentage
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="5"
                        max="25"
                        step="0.5"
                        value={tokenizeData.dividendPercentage}
                        onChange={(e) => setTokenizeData({ ...tokenizeData, dividendPercentage: Number(e.target.value) })}
                        className="flex-1"
                      />
                      <span className="text-white font-medium w-12">{tokenizeData.dividendPercentage}%</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">% of revenue distributed to shareholders</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Payout Frequency
                    </label>
                    <select
                      value={tokenizeData.payoutFrequency}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, payoutFrequency: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-600/50 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Projected Returns</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Est. Monthly Revenue</p>
                    <p className="text-white font-medium">1,000 BSV</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Shareholder Payout</p>
                    <p className="text-white font-medium">{(1000 * tokenizeData.dividendPercentage / 100).toFixed(0)} BSV</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Est. APY</p>
                    <p className="text-green-400 font-medium">
                      {((1000 * tokenizeData.dividendPercentage / 100 * 12) / (tokenizeData.totalShares * tokenizeData.initialPrice) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl mb-6" style={{ fontWeight: '300' }}>Smart Contract Settings</h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  BSV Payout Address *
                </label>
                <input
                  type="text"
                  value={tokenizeData.payoutAddress}
                  onChange={(e) => setTokenizeData({ ...tokenizeData, payoutAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none font-mono text-sm"
                  placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                />
                <p className="text-yellow-400 text-xs mt-2">
                  ⚠️ This address will be permanently encoded in the NFT metadata and cannot be changed
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contract Type
                  </label>
                  <select
                    value={tokenizeData.contractType}
                    onChange={(e) => setTokenizeData({ ...tokenizeData, contractType: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  >
                    <option value="standard">Standard NFT</option>
                    <option value="dao">DAO-Governed</option>
                    <option value="bonding">Bonding Curve</option>
                    <option value="fixed">Fixed Supply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Transfer Restrictions
                  </label>
                  <select
                    value={tokenizeData.transferRestrictions}
                    onChange={(e) => setTokenizeData({ ...tokenizeData, transferRestrictions: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  >
                    <option value="none">None (Freely Tradeable)</option>
                    <option value="lockup">6 Month Lockup</option>
                    <option value="whitelist">Whitelist Only</option>
                    <option value="approval">Requires Approval</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Advanced Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.votingRights}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, votingRights: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <p className="text-white">Voting Rights</p>
                      <p className="text-gray-500 text-xs">Shareholders can vote on decisions</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.vestingSchedule}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, vestingSchedule: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <p className="text-white">Vesting Schedule</p>
                      <p className="text-gray-500 text-xs">Gradual token release</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.autoReinvest}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, autoReinvest: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <p className="text-white">Auto-Reinvest</p>
                      <p className="text-gray-500 text-xs">Automatic dividend reinvestment</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.compoundDividends}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, compoundDividends: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <p className="text-white">Compound Dividends</p>
                      <p className="text-gray-500 text-xs">Compound interest on payouts</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.burnMechanism}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, burnMechanism: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <p className="text-white">Burn Mechanism</p>
                      <p className="text-gray-500 text-xs">Deflationary token burns</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.buybackProgram}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, buybackProgram: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <p className="text-white">Buyback Program</p>
                      <p className="text-gray-500 text-xs">Revenue-funded buybacks</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.stakingRewards}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, stakingRewards: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <p className="text-white">Staking Rewards</p>
                      <p className="text-gray-500 text-xs">Extra yield for staking</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.referralProgram}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, referralProgram: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <p className="text-white">Referral Program</p>
                      <p className="text-gray-500 text-xs">Rewards for referrals</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Compliance Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.kycRequired}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, kycRequired: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-white">Require KYC for buyers</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tokenizeData.accreditedOnly}
                      onChange={(e) => setTokenizeData({ ...tokenizeData, accreditedOnly: e.target.checked })}
                      className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-white">Accredited investors only</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl mb-6" style={{ fontWeight: '300' }}>Review & Deploy</h2>

              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">NFT Summary</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 text-sm">List Name</p>
                    <p className="text-white font-medium">{tokenizeData.listName || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white font-medium">{tokenizeData.category || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">List Size</p>
                    <p className="text-white font-medium">{tokenizeData.listSize.toLocaleString()} emails</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Verified Emails</p>
                    <p className="text-white font-medium">{tokenizeData.verifiedEmails.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Token Economics</h3>
                
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-400 text-sm">Total Shares</p>
                    <p className="text-white font-medium">{tokenizeData.totalShares.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Price per Share</p>
                    <p className="text-white font-medium">{tokenizeData.initialPrice} BSV</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Market Cap</p>
                    <p className="text-white font-medium">{(tokenizeData.totalShares * tokenizeData.initialPrice).toFixed(2)} BSV</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Dividend Rate</p>
                    <p className="text-yellow-400 font-medium">{tokenizeData.dividendPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Payout Frequency</p>
                    <p className="text-white font-medium capitalize">{tokenizeData.payoutFrequency}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Contract Type</p>
                    <p className="text-white font-medium capitalize">{tokenizeData.contractType}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Smart Contract Address</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 break-all">
                  {tokenizeData.payoutAddress || 'No payout address specified'}
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-6">
                <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Important Notice</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Once deployed, the following cannot be changed:
                </p>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                  <li>Payout address (permanently encoded in NFT metadata)</li>
                  <li>Total share supply</li>
                  <li>Dividend percentage</li>
                  <li>Smart contract type and restrictions</li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tokenizeData.termsAccepted}
                    onChange={(e) => setTokenizeData({ ...tokenizeData, termsAccepted: e.target.checked })}
                    className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-red-600 focus:ring-red-500 mt-0.5"
                  />
                  <div>
                    <p className="text-white">I accept the terms and conditions</p>
                    <p className="text-gray-400 text-sm mt-1">
                      I understand that this will create an immutable NFT on the BSV blockchain and that 
                      certain parameters cannot be changed after deployment. I confirm that I have the 
                      rights to tokenize this mailing list.
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-blue-900/20 border border-blue-600/50 rounded-lg p-6">
                <h3 className="text-blue-400 font-semibold mb-2">Deployment Cost</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-300">NFT Minting Fee</p>
                    <p className="text-gray-500 text-sm">One-time blockchain fee</p>
                  </div>
                  <p className="text-white font-bold text-2xl">0.05 BSV</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            style={{
              padding: '8px 16px',
              background: step === 1 ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)',
              color: step === 1 ? 'rgba(156, 163, 175, 0.5)' : 'rgba(209, 213, 219, 1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              fontSize: '12px',
              fontWeight: '300',
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s'
            }}
          >
            Previous
          </button>
          
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              style={{
                padding: '8px 16px',
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
              Next Step
            </button>
          ) : (
            <button
              onClick={handleTokenize}
              disabled={!tokenizeData.termsAccepted || !tokenizeData.payoutAddress}
              style={{
                padding: '8px 20px',
                background: (!tokenizeData.termsAccepted || !tokenizeData.payoutAddress)
                  ? 'rgba(0, 0, 0, 0.3)'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))',
                color: (!tokenizeData.termsAccepted || !tokenizeData.payoutAddress)
                  ? 'rgba(156, 163, 175, 0.5)'
                  : 'white',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '2px',
                fontSize: '12px',
                fontWeight: '300',
                cursor: (!tokenizeData.termsAccepted || !tokenizeData.payoutAddress) ? 'not-allowed' : 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (tokenizeData.termsAccepted && tokenizeData.payoutAddress) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 1), rgba(0, 0, 0, 0.9))';
                }
              }}
              onMouseLeave={(e) => {
                if (tokenizeData.termsAccepted && tokenizeData.payoutAddress) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))';
                }
              }}
            >
              Deploy NFT to Blockchain
            </button>
          )}
            </div>
          </div>
        </div>
      </div>

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