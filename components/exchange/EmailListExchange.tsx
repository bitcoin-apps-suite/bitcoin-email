'use client';

import React, { useState } from 'react';

interface EmailListNFT {
  id: string;
  title: string;
  type: 'premium' | 'verified' | 'targeted' | 'general';
  owner: string;
  listSize: number;
  totalShares: number;
  circulatingSupply: number;
  pricePerShare: number;
  dividendYield: number;
  lastDividend: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  description?: string;
  tags?: string[];
  verified: boolean;
  createdAt: string;
  payoutAddress: string;
}

export function EmailListExchange() {
  const [sortBy, setSortBy] = useState<'marketCap' | 'volume' | 'yield' | 'size'>('marketCap');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Mock data - in production this would come from the blockchain
  const [lists] = useState<EmailListNFT[]>([
    {
      id: 'list-001',
      title: 'Crypto Investors Premium',
      type: 'premium',
      owner: '$cryptowhale',
      listSize: 45000,
      totalShares: 10000,
      circulatingSupply: 7500,
      pricePerShare: 0.25,
      dividendYield: 8.5,
      lastDividend: 0.002,
      marketCap: 2500,
      volume24h: 450,
      change24h: 12.5,
      description: 'High-value crypto investors and traders',
      tags: ['crypto', 'investors', 'premium'],
      verified: true,
      createdAt: '2024-01-15',
      payoutAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    },
    {
      id: 'list-002',
      title: 'Tech Startups Founders',
      type: 'verified',
      owner: '$techfounder',
      listSize: 12000,
      totalShares: 5000,
      circulatingSupply: 3200,
      pricePerShare: 0.5,
      dividendYield: 6.2,
      lastDividend: 0.003,
      marketCap: 2500,
      volume24h: 280,
      change24h: -3.2,
      description: 'Verified startup founders and CTOs',
      tags: ['tech', 'startups', 'founders'],
      verified: true,
      createdAt: '2024-02-01',
      payoutAddress: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
    },
    {
      id: 'list-003',
      title: 'E-commerce Buyers',
      type: 'targeted',
      owner: '$marketingpro',
      listSize: 125000,
      totalShares: 20000,
      circulatingSupply: 15000,
      pricePerShare: 0.1,
      dividendYield: 5.5,
      lastDividend: 0.0005,
      marketCap: 2000,
      volume24h: 890,
      change24h: 5.7,
      description: 'Active e-commerce shoppers',
      tags: ['ecommerce', 'buyers', 'retail'],
      verified: false,
      createdAt: '2024-01-20',
      payoutAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'
    },
    {
      id: 'list-004',
      title: 'Gaming Community',
      type: 'general',
      owner: '$gamer',
      listSize: 85000,
      totalShares: 15000,
      circulatingSupply: 12000,
      pricePerShare: 0.08,
      dividendYield: 4.8,
      lastDividend: 0.0004,
      marketCap: 1200,
      volume24h: 340,
      change24h: 8.9,
      description: 'Active gamers and streamers',
      tags: ['gaming', 'entertainment', 'streaming'],
      verified: false,
      createdAt: '2024-02-10',
      payoutAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'premium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-600';
      case 'verified': return 'text-green-400 bg-green-900/20 border-green-600';
      case 'targeted': return 'text-blue-400 bg-blue-900/20 border-blue-600';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-600';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const filteredLists = lists.filter(list => 
    filterType === 'all' || list.type === filterType
  );

  const sortedLists = [...filteredLists].sort((a, b) => {
    switch (sortBy) {
      case 'volume': return b.volume24h - a.volume24h;
      case 'yield': return b.dividendYield - a.dividendYield;
      case 'size': return b.listSize - a.listSize;
      default: return b.marketCap - a.marketCap;
    }
  });

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Market Cap</p>
          <p className="text-2xl font-bold text-white">$12.5M</p>
          <p className="text-green-400 text-sm">+15.2% (24h)</p>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">24h Volume</p>
          <p className="text-2xl font-bold text-white">$1.9M</p>
          <p className="text-green-400 text-sm">+23.5% (24h)</p>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Listed NFTs</p>
          <p className="text-2xl font-bold text-white">247</p>
          <p className="text-gray-400 text-sm">12 new today</p>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Avg. Yield</p>
          <p className="text-2xl font-bold text-white">6.25%</p>
          <p className="text-gray-400 text-sm">APY</p>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterType === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Lists
          </button>
          <button
            onClick={() => setFilterType('premium')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterType === 'premium'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Premium
          </button>
          <button
            onClick={() => setFilterType('verified')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterType === 'verified'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setFilterType('targeted')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterType === 'targeted'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Targeted
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
        >
          <option value="marketCap">Market Cap</option>
          <option value="volume">24h Volume</option>
          <option value="yield">Dividend Yield</option>
          <option value="size">List Size</option>
        </select>
      </div>

      {/* Exchange Table */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/80 border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  List NFT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  List Size
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Shares
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price/Share
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Yield
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {sortedLists.map((list) => (
                <tr key={list.id} className="hover:bg-gray-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {list.title.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium flex items-center gap-2">
                          {list.title}
                          {list.verified && (
                            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </p>
                        <p className="text-gray-500 text-xs">{list.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(list.type)}`}>
                      {list.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-300">{list.owner}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-gray-300">{formatNumber(list.listSize)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-right">
                      <p className="text-gray-300">{formatNumber(list.circulatingSupply)}</p>
                      <p className="text-gray-500 text-xs">/ {formatNumber(list.totalShares)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-gray-300">${list.pricePerShare}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-white font-medium">${formatNumber(list.marketCap)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-right">
                      <p className="text-yellow-400 font-medium">{list.dividendYield}%</p>
                      <p className="text-gray-500 text-xs">${list.lastDividend}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`font-medium ${
                      list.change24h > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {list.change24h > 0 ? '+' : ''}{list.change24h}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg font-medium transition-colors">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}