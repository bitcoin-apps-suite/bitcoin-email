'use client';

import React, { useState } from 'react';
import './exchange.mobile.css';

interface EmailListNFT {
  id: string;
  title: string;
  type: 'premium' | 'verified' | 'targeted' | 'general';
  category: 'Finance' | 'Technology' | 'Commerce' | 'Entertainment' | 'Healthcare' | 'Education' | 'Real Estate' | 'Travel';
  subcategory: string;
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
  change7d: number;
  bid: number;
  ask: number;
  spread: number;
  pe_ratio: number;
  description?: string;
  tags?: string[];
  verified: boolean;
  createdAt: string;
  payoutAddress: string;
  openInterest: number;
  avgVolume: number;
}

export function EmailListExchange() {
  const [sortBy, setSortBy] = useState<'marketCap' | 'volume' | 'yield' | 'size' | 'change24h' | 'pe_ratio'>('marketCap');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSubcategory, setFilterSubcategory] = useState<string>('all');
  
  // Mock data - Wall Street grade market data
  const [lists] = useState<EmailListNFT[]>([
    {
      id: 'list-001',
      title: 'Crypto Hedge Fund Elite',
      type: 'premium',
      category: 'Finance',
      subcategory: 'Cryptocurrency',
      owner: '$cryptowhale',
      listSize: 145000,
      totalShares: 100000,
      circulatingSupply: 75000,
      pricePerShare: 2.85,
      dividendYield: 12.5,
      lastDividend: 0.032,
      marketCap: 285000,
      volume24h: 45000,
      change24h: 8.7,
      change7d: 22.3,
      bid: 2.83,
      ask: 2.87,
      spread: 0.04,
      pe_ratio: 18.5,
      description: 'Ultra high-net-worth crypto investors',
      tags: ['crypto', 'premium', 'whales'],
      verified: true,
      createdAt: '2025-01-02',
      payoutAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      openInterest: 15000,
      avgVolume: 38000
    },
    {
      id: 'list-002',
      title: 'Wall Street Traders',
      type: 'verified',
      category: 'Finance',
      subcategory: 'Traditional Markets',
      owner: '$goldmansachs',
      listSize: 87000,
      totalShares: 50000,
      circulatingSupply: 42000,
      pricePerShare: 4.25,
      dividendYield: 9.8,
      lastDividend: 0.041,
      marketCap: 212500,
      volume24h: 28000,
      change24h: -2.1,
      change7d: 5.6,
      bid: 4.22,
      ask: 4.28,
      spread: 0.06,
      pe_ratio: 15.2,
      description: 'Professional traders from major institutions',
      tags: ['finance', 'trading', 'institutional'],
      verified: true,
      createdAt: '2023-11-15',
      payoutAddress: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      openInterest: 8500,
      avgVolume: 25000
    },
    {
      id: 'list-003',
      title: 'Silicon Valley VCs',
      type: 'premium',
      category: 'Technology',
      subcategory: 'Venture Capital',
      owner: '$sequoia',
      listSize: 32000,
      totalShares: 25000,
      circulatingSupply: 18000,
      pricePerShare: 7.80,
      dividendYield: 7.2,
      lastDividend: 0.056,
      marketCap: 195000,
      volume24h: 18900,
      change24h: 5.3,
      change7d: 12.8,
      bid: 7.75,
      ask: 7.85,
      spread: 0.10,
      pe_ratio: 22.3,
      description: 'Verified venture capitalists and angel investors',
      tags: ['vc', 'tech', 'investment'],
      verified: true,
      createdAt: '2023-10-20',
      payoutAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      openInterest: 5200,
      avgVolume: 16000
    },
    {
      id: 'list-004',
      title: 'E-Commerce Powerbuyers',
      type: 'targeted',
      category: 'Commerce',
      subcategory: 'Online Retail',
      owner: '$amazonpro',
      listSize: 485000,
      totalShares: 200000,
      circulatingSupply: 150000,
      pricePerShare: 1.12,
      dividendYield: 6.5,
      lastDividend: 0.007,
      marketCap: 224000,
      volume24h: 89000,
      change24h: 3.2,
      change7d: -1.8,
      bid: 1.10,
      ask: 1.14,
      spread: 0.04,
      pe_ratio: 19.8,
      description: 'Premium e-commerce buyers $10k+ annual',
      tags: ['ecommerce', 'retail', 'premium'],
      verified: false,
      createdAt: '2025-01-08',
      payoutAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      openInterest: 22000,
      avgVolume: 75000
    },
    {
      id: 'list-005',
      title: 'AI Startup Founders',
      type: 'verified',
      category: 'Technology',
      subcategory: 'Artificial Intelligence',
      owner: '$openai',
      listSize: 28000,
      totalShares: 30000,
      circulatingSupply: 22000,
      pricePerShare: 5.45,
      dividendYield: 8.3,
      lastDividend: 0.045,
      marketCap: 163500,
      volume24h: 34000,
      change24h: 12.7,
      change7d: 28.9,
      bid: 5.42,
      ask: 5.48,
      spread: 0.06,
      pe_ratio: 25.6,
      description: 'Founders of AI/ML companies worldwide',
      tags: ['ai', 'founders', 'tech'],
      verified: true,
      createdAt: '2023-12-01',
      payoutAddress: '1K3NvcuZzVTueHW1qhkG2Cm3viRkh2EXJp',
      openInterest: 7800,
      avgVolume: 29000
    },
    {
      id: 'list-006',
      title: 'Medical Professionals USA',
      type: 'premium',
      category: 'Healthcare',
      subcategory: 'Physicians',
      owner: '$medtech',
      listSize: 156000,
      totalShares: 80000,
      circulatingSupply: 65000,
      pricePerShare: 2.20,
      dividendYield: 5.8,
      lastDividend: 0.012,
      marketCap: 176000,
      volume24h: 23000,
      change24h: -0.8,
      change7d: 3.2,
      bid: 2.18,
      ask: 2.22,
      spread: 0.04,
      pe_ratio: 16.7,
      description: 'Verified doctors and healthcare executives',
      tags: ['medical', 'healthcare', 'professional'],
      verified: true,
      createdAt: '2023-09-15',
      payoutAddress: '1M8s2S5bgAzSSzVTeL7zruvMPLvzSkEAuv',
      openInterest: 12000,
      avgVolume: 20000
    },
    {
      id: 'list-007',
      title: 'Gaming Whales International',
      type: 'targeted',
      category: 'Entertainment',
      subcategory: 'Gaming',
      owner: '$epicgames',
      listSize: 320000,
      totalShares: 150000,
      circulatingSupply: 120000,
      pricePerShare: 0.88,
      dividendYield: 4.2,
      lastDividend: 0.003,
      marketCap: 132000,
      volume24h: 45600,
      change24h: 6.9,
      change7d: 15.3,
      bid: 0.86,
      ask: 0.90,
      spread: 0.04,
      pe_ratio: 28.9,
      description: 'High-spending gamers $1k+ monthly',
      tags: ['gaming', 'entertainment', 'whales'],
      verified: false,
      createdAt: '2025-01-22',
      payoutAddress: '1GQdrgqAbkeEPUef1UpiTc4X1mUHMcyuGW',
      openInterest: 18000,
      avgVolume: 40000
    },
    {
      id: 'list-008',
      title: 'Real Estate Moguls',
      type: 'premium',
      category: 'Real Estate',
      subcategory: 'Commercial',
      owner: '$remax',
      listSize: 42000,
      totalShares: 40000,
      circulatingSupply: 32000,
      pricePerShare: 3.65,
      dividendYield: 7.8,
      lastDividend: 0.028,
      marketCap: 146000,
      volume24h: 18900,
      change24h: 2.1,
      change7d: -3.4,
      bid: 3.62,
      ask: 3.68,
      spread: 0.06,
      pe_ratio: 14.2,
      description: 'Commercial real estate investors',
      tags: ['realestate', 'commercial', 'investment'],
      verified: true,
      createdAt: '2023-08-10',
      payoutAddress: '15kiNKfDWsq7UsPg87UwxA8rVvWAjzRkYS',
      openInterest: 9500,
      avgVolume: 16000
    },
    {
      id: 'list-009',
      title: 'DeFi Protocol Users',
      type: 'verified',
      category: 'Finance',
      subcategory: 'DeFi',
      owner: '$uniswap',
      listSize: 245000,
      totalShares: 120000,
      circulatingSupply: 95000,
      pricePerShare: 1.78,
      dividendYield: 10.2,
      lastDividend: 0.018,
      marketCap: 213600,
      volume24h: 67800,
      change24h: 14.3,
      change7d: 31.2,
      bid: 1.76,
      ask: 1.80,
      spread: 0.04,
      pe_ratio: 32.1,
      description: 'Active DeFi users across all protocols',
      tags: ['defi', 'crypto', 'protocols'],
      verified: true,
      createdAt: '2023-11-28',
      payoutAddress: '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX',
      openInterest: 28000,
      avgVolume: 58000
    },
    {
      id: 'list-010',
      title: 'Fortune 500 Executives',
      type: 'premium',
      category: 'Finance',
      subcategory: 'Corporate',
      owner: '$forbes',
      listSize: 18000,
      totalShares: 20000,
      circulatingSupply: 16000,
      pricePerShare: 9.20,
      dividendYield: 6.4,
      lastDividend: 0.058,
      marketCap: 184000,
      volume24h: 12400,
      change24h: -1.2,
      change7d: 2.8,
      bid: 9.15,
      ask: 9.25,
      spread: 0.10,
      pe_ratio: 12.8,
      description: 'C-suite executives from Fortune 500',
      tags: ['executive', 'corporate', 'fortune500'],
      verified: true,
      createdAt: '2023-07-05',
      payoutAddress: '14wHehDqFEXazVGhJgMXSfnH7sN4k3cCtT',
      openInterest: 4200,
      avgVolume: 10000
    },
    {
      id: 'list-011',
      title: 'NFT Collectors Premium',
      type: 'targeted',
      category: 'Technology',
      subcategory: 'Web3',
      owner: '$opensea',
      listSize: 185000,
      totalShares: 100000,
      circulatingSupply: 78000,
      pricePerShare: 1.35,
      dividendYield: 5.6,
      lastDividend: 0.007,
      marketCap: 135000,
      volume24h: 52300,
      change24h: 8.9,
      change7d: -12.4,
      bid: 1.33,
      ask: 1.37,
      spread: 0.04,
      pe_ratio: 35.2,
      description: 'Verified NFT collectors and traders',
      tags: ['nft', 'web3', 'collectors'],
      verified: false,
      createdAt: '2023-12-15',
      payoutAddress: '1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN',
      openInterest: 15600,
      avgVolume: 45000
    },
    {
      id: 'list-012',
      title: 'Luxury Travel Enthusiasts',
      type: 'premium',
      category: 'Travel',
      subcategory: 'Luxury',
      owner: '$fourseasons',
      listSize: 68000,
      totalShares: 50000,
      circulatingSupply: 38000,
      pricePerShare: 2.90,
      dividendYield: 4.8,
      lastDividend: 0.013,
      marketCap: 145000,
      volume24h: 21000,
      change24h: 1.8,
      change7d: 6.2,
      bid: 2.87,
      ask: 2.93,
      spread: 0.06,
      pe_ratio: 18.3,
      description: 'High-net-worth luxury travelers',
      tags: ['travel', 'luxury', 'premium'],
      verified: true,
      createdAt: '2023-09-30',
      payoutAddress: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
      openInterest: 8900,
      avgVolume: 18000
    },
    {
      id: 'list-013',
      title: 'EdTech Platform Users',
      type: 'general',
      category: 'Education',
      subcategory: 'Online Learning',
      owner: '$coursera',
      listSize: 420000,
      totalShares: 180000,
      circulatingSupply: 140000,
      pricePerShare: 0.65,
      dividendYield: 3.8,
      lastDividend: 0.002,
      marketCap: 117000,
      volume24h: 38900,
      change24h: 4.5,
      change7d: 9.8,
      bid: 0.63,
      ask: 0.67,
      spread: 0.04,
      pe_ratio: 42.5,
      description: 'Active online learners and educators',
      tags: ['education', 'edtech', 'learning'],
      verified: false,
      createdAt: '2025-01-10',
      payoutAddress: '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF',
      openInterest: 32000,
      avgVolume: 35000
    },
    {
      id: 'list-014',
      title: 'Biotech Investors',
      type: 'verified',
      category: 'Healthcare',
      subcategory: 'Biotechnology',
      owner: '$pfizer',
      listSize: 52000,
      totalShares: 45000,
      circulatingSupply: 36000,
      pricePerShare: 4.15,
      dividendYield: 7.1,
      lastDividend: 0.029,
      marketCap: 187000,
      volume24h: 28700,
      change24h: -3.8,
      change7d: -8.2,
      bid: 4.12,
      ask: 4.18,
      spread: 0.06,
      pe_ratio: 21.4,
      description: 'Biotech and pharma investors',
      tags: ['biotech', 'pharma', 'investment'],
      verified: true,
      createdAt: '2023-10-12',
      payoutAddress: '1LfV1tSt3KNyHpFJnAzrqsLFdeD2EvU1MK',
      openInterest: 11200,
      avgVolume: 24000
    },
    {
      id: 'list-015',
      title: 'Streaming Media Creators',
      type: 'targeted',
      category: 'Entertainment',
      subcategory: 'Content Creation',
      owner: '$twitch',
      listSize: 280000,
      totalShares: 140000,
      circulatingSupply: 110000,
      pricePerShare: 0.92,
      dividendYield: 4.5,
      lastDividend: 0.004,
      marketCap: 128800,
      volume24h: 41200,
      change24h: 7.3,
      change7d: 18.6,
      bid: 0.90,
      ask: 0.94,
      spread: 0.04,
      pe_ratio: 38.7,
      description: 'Professional streamers and content creators',
      tags: ['streaming', 'content', 'creators'],
      verified: false,
      createdAt: '2025-01-05',
      payoutAddress: '1EYTDnm7RB3pzFjegQkjSwvLpH6PGzChEp',
      openInterest: 24500,
      avgVolume: 36000
    },
    {
      id: 'list-016',
      title: 'Private Equity Partners',
      type: 'premium',
      category: 'Finance',
      subcategory: 'Private Equity',
      owner: '$blackrock',
      listSize: 24000,
      totalShares: 30000,
      circulatingSupply: 25000,
      pricePerShare: 8.50,
      dividendYield: 8.9,
      lastDividend: 0.075,
      marketCap: 255000,
      volume24h: 19800,
      change24h: 2.4,
      change7d: 7.1,
      bid: 8.45,
      ask: 8.55,
      spread: 0.10,
      pe_ratio: 13.5,
      description: 'PE fund managers and LPs',
      tags: ['pe', 'finance', 'premium'],
      verified: true,
      createdAt: '2023-08-20',
      payoutAddress: '18MZhvh5msuUyfsAhqVvrmgRkBn2o3MD4A',
      openInterest: 6200,
      avgVolume: 17000
    },
    {
      id: 'list-017',
      title: 'Fashion Brand Ambassadors',
      type: 'targeted',
      category: 'Commerce',
      subcategory: 'Fashion',
      owner: '$gucci',
      listSize: 145000,
      totalShares: 80000,
      circulatingSupply: 62000,
      pricePerShare: 1.55,
      dividendYield: 5.2,
      lastDividend: 0.008,
      marketCap: 124000,
      volume24h: 33400,
      change24h: 3.8,
      change7d: -2.1,
      bid: 1.53,
      ask: 1.57,
      spread: 0.04,
      pe_ratio: 26.8,
      description: 'Fashion influencers and brand ambassadors',
      tags: ['fashion', 'influencer', 'luxury'],
      verified: false,
      createdAt: '2023-11-05',
      payoutAddress: '1ALpPe7MUq5qNTGRhe8gCowJZC5VLmqo5V',
      openInterest: 18600,
      avgVolume: 29000
    },
    {
      id: 'list-018',
      title: 'Green Energy Investors',
      type: 'verified',
      category: 'Technology',
      subcategory: 'Clean Energy',
      owner: '$tesla',
      listSize: 92000,
      totalShares: 60000,
      circulatingSupply: 48000,
      pricePerShare: 3.20,
      dividendYield: 6.8,
      lastDividend: 0.021,
      marketCap: 192000,
      volume24h: 42300,
      change24h: 9.2,
      change7d: 16.8,
      bid: 3.17,
      ask: 3.23,
      spread: 0.06,
      pe_ratio: 29.3,
      description: 'Clean energy and sustainability investors',
      tags: ['green', 'energy', 'sustainability'],
      verified: true,
      createdAt: '2023-09-18',
      payoutAddress: '1N52wHoVR79PMDishab2XmRHsbekCdGquK',
      openInterest: 14800,
      avgVolume: 38000
    },
    {
      id: 'list-019',
      title: 'Sports Betting Professionals',
      type: 'targeted',
      category: 'Entertainment',
      subcategory: 'Sports',
      owner: '$draftkings',
      listSize: 168000,
      totalShares: 90000,
      circulatingSupply: 72000,
      pricePerShare: 1.18,
      dividendYield: 4.3,
      lastDividend: 0.005,
      marketCap: 106200,
      volume24h: 48900,
      change24h: 11.6,
      change7d: 24.3,
      bid: 1.16,
      ask: 1.20,
      spread: 0.04,
      pe_ratio: 45.2,
      description: 'Professional sports bettors and analysts',
      tags: ['sports', 'betting', 'gambling'],
      verified: false,
      createdAt: '2025-01-18',
      payoutAddress: '1PMycacnJaSqwwJqjawXBErnLsZ7RkXUAs',
      openInterest: 28700,
      avgVolume: 42000
    },
    {
      id: 'list-020',
      title: 'Metaverse Land Owners',
      type: 'premium',
      category: 'Technology',
      subcategory: 'Virtual Reality',
      owner: '$meta',
      listSize: 78000,
      totalShares: 55000,
      circulatingSupply: 44000,
      pricePerShare: 2.75,
      dividendYield: 5.9,
      lastDividend: 0.016,
      marketCap: 151250,
      volume24h: 36800,
      change24h: -5.2,
      change7d: -18.9,
      bid: 2.72,
      ask: 2.78,
      spread: 0.06,
      pe_ratio: 52.8,
      description: 'Virtual real estate and metaverse investors',
      tags: ['metaverse', 'vr', 'virtual'],
      verified: true,
      createdAt: '2023-12-08',
      payoutAddress: '1NrjjqLpZRwNymwoH3xW4xEKanMRUBWJc7',
      openInterest: 19200,
      avgVolume: 32000
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

  // Get unique categories and subcategories
  const categories = ['all', ...Array.from(new Set(lists.map(l => l.category)))];
  const subcategories = filterCategory === 'all' 
    ? ['all']
    : ['all', ...Array.from(new Set(lists.filter(l => l.category === filterCategory).map(l => l.subcategory)))];

  const filteredLists = lists.filter(list => {
    const typeMatch = filterType === 'all' || list.type === filterType;
    const categoryMatch = filterCategory === 'all' || list.category === filterCategory;
    const subcategoryMatch = filterSubcategory === 'all' || list.subcategory === filterSubcategory;
    return typeMatch && categoryMatch && subcategoryMatch;
  });

  const sortedLists = [...filteredLists].sort((a, b) => {
    switch (sortBy) {
      case 'volume': return b.volume24h - a.volume24h;
      case 'yield': return b.dividendYield - a.dividendYield;
      case 'size': return b.listSize - a.listSize;
      case 'change24h': return b.change24h - a.change24h;
      case 'pe_ratio': return a.pe_ratio - b.pe_ratio;
      default: return b.marketCap - a.marketCap;
    }
  });

  return (
    <div>
      {/* Wall Street Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 30, 30, 0.5))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          padding: '16px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
          <p className="text-gray-400 text-xs uppercase tracking-wider">Market Cap</p>
          <p className="text-xl font-light text-white">$3.45B</p>
          <p className="text-green-400 text-xs">▲ 12.8%</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 30, 30, 0.5))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          padding: '16px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
          <p className="text-gray-400 text-xs uppercase tracking-wider">Volume 24h</p>
          <p className="text-xl font-light text-white">$642M</p>
          <p className="text-green-400 text-xs">▲ 23.5%</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 30, 30, 0.5))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          padding: '16px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
          <p className="text-gray-400 text-xs uppercase tracking-wider">Active Lists</p>
          <p className="text-xl font-light text-white">1,847</p>
          <p className="text-gray-400 text-xs">+142 today</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 30, 30, 0.5))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          padding: '16px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
          <p className="text-gray-400 text-xs uppercase tracking-wider">Avg. Yield</p>
          <p className="text-xl font-light text-white">6.82%</p>
          <p className="text-gray-400 text-xs">APY</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 30, 30, 0.5))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          padding: '16px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
          <p className="text-gray-400 text-xs uppercase tracking-wider">P/E Ratio</p>
          <p className="text-xl font-light text-white">24.3</p>
          <p className="text-red-400 text-xs">▼ 2.1%</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 30, 30, 0.5))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          padding: '16px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
          <p className="text-gray-400 text-xs uppercase tracking-wider">Open Interest</p>
          <p className="text-xl font-light text-white">$458M</p>
          <p className="text-green-400 text-xs">▲ 8.7%</p>
        </div>
      </div>

      {/* Professional Filters - Wall Street Style */}
      <div className="space-y-3 mb-6">
        {/* Category and Type Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setFilterSubcategory('all');
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.6))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '14px',
                width: '100%',
                outline: 'none'
              }}
              className="focus:border-red-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
          
          {filterCategory !== 'all' && (
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Subcategory</label>
              <select
                value={filterSubcategory}
                onChange={(e) => setFilterSubcategory(e.target.value)}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.6))',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none'
                }}
                className="focus:border-red-500"
              >
                {subcategories.map(sub => (
                  <option key={sub} value={sub}>
                    {sub === 'all' ? 'All Subcategories' : sub}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.6))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '14px',
                width: '100%',
                outline: 'none'
              }}
              className="focus:border-red-500"
            >
              <option value="marketCap">Market Cap</option>
              <option value="volume">24h Volume</option>
              <option value="yield">Dividend Yield</option>
              <option value="size">List Size</option>
              <option value="change24h">24h Change</option>
              <option value="pe_ratio">P/E Ratio</option>
            </select>
          </div>
        </div>
        
        {/* Type Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            style={{
              background: filterType === 'all' 
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.6))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              padding: '6px 16px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '300',
              transition: 'all 0.2s'
            }}
            className="hover:opacity-90"
          >
            All Types
          </button>
          <button
            onClick={() => setFilterType('premium')}
            style={{
              background: filterType === 'premium' 
                ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(0, 0, 0, 0.8))'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.6))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              padding: '6px 16px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '300',
              transition: 'all 0.2s'
            }}
            className="hover:opacity-90"
          >
            Premium
          </button>
          <button
            onClick={() => setFilterType('verified')}
            style={{
              background: filterType === 'verified' 
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(0, 0, 0, 0.8))'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.6))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              padding: '6px 16px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '300',
              transition: 'all 0.2s'
            }}
            className="hover:opacity-90"
          >
            Verified
          </button>
          <button
            onClick={() => setFilterType('targeted')}
            style={{
              background: filterType === 'targeted' 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(0, 0, 0, 0.8))'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.6))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              padding: '6px 16px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '300',
              transition: 'all 0.2s'
            }}
            className="hover:opacity-90"
          >
            Targeted
          </button>
          <button
            onClick={() => setFilterType('general')}
            style={{
              background: filterType === 'general' 
                ? 'linear-gradient(135deg, rgba(107, 114, 128, 0.9), rgba(0, 0, 0, 0.8))'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.6))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              padding: '6px 16px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '300',
              transition: 'all 0.2s'
            }}
            className="hover:opacity-90"
          >
            General
          </button>
        </div>
      </div>

      {/* Wall Street Exchange Table */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(10, 10, 10, 0.8))',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '2px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.8)'
      }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{
              background: 'linear-gradient(180deg, rgba(30, 30, 30, 0.9), rgba(0, 0, 0, 0.9))',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-light text-gray-400 uppercase tracking-wider">
                  Symbol / Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-light text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-right text-xs font-light text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-right text-xs font-light text-gray-400 uppercase tracking-wider">
                  Bid/Ask
                </th>
                <th className="px-4 py-3 text-right text-xs font-light text-gray-400 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-4 py-3 text-right text-xs font-light text-gray-400 uppercase tracking-wider">
                  Volume 24h
                </th>
                <th className="px-4 py-3 text-right text-xs font-light text-gray-400 uppercase tracking-wider">
                  Yield %
                </th>
                <th className="px-4 py-3 text-right text-xs font-light text-gray-400 uppercase tracking-wider">
                  P/E
                </th>
                <th className="px-4 py-3 text-right text-xs font-light text-gray-400 uppercase tracking-wider">
                  24h
                </th>
                <th className="px-4 py-3 text-right text-xs font-light text-gray-400 uppercase tracking-wider">
                  7d
                </th>
                <th className="px-4 py-3 text-center text-xs font-light text-gray-400 uppercase tracking-wider">
                  Trade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900">
              {sortedLists.map((list, index) => (
                <tr key={list.id} 
                    className="transition-colors"
                    style={{
                      background: index % 2 === 0 
                        ? 'rgba(0, 0, 0, 0.3)' 
                        : 'rgba(10, 10, 10, 0.3)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 
                        ? 'rgba(0, 0, 0, 0.3)' 
                        : 'rgba(10, 10, 10, 0.3)';
                    }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div style={{
                        width: '32px',
                        height: '32px',
                        background: `linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(0, 0, 0, 0.9))`,
                        borderRadius: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: '600',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        {list.title.substring(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-white font-light text-sm">
                            {list.title}
                          </span>
                          {list.verified && (
                            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="text-gray-500 text-xs">
                          <span className={`inline-block px-1.5 py-0.5 text-xs rounded border ${getTypeColor(list.type)}`}>
                            {list.type}
                          </span>
                          <span className="ml-2">{list.owner}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-gray-300 text-xs">{list.category}</div>
                      <div className="text-gray-500 text-xs">{list.subcategory}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-white font-light">${list.pricePerShare.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div>
                      <div className="text-green-400 text-xs">{list.bid.toFixed(2)}</div>
                      <div className="text-red-400 text-xs">{list.ask.toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-white font-light">${formatNumber(list.marketCap)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div>
                      <div className="text-gray-300 text-xs">${formatNumber(list.volume24h)}</div>
                      <div className="text-gray-500 text-xs">Avg: ${formatNumber(list.avgVolume)}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-yellow-400 font-light">{list.dividendYield.toFixed(1)}%</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-gray-300 text-xs">{list.pe_ratio.toFixed(1)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className={`font-light text-sm ${
                      list.change24h > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {list.change24h > 0 ? '+' : ''}{list.change24h.toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className={`font-light text-xs ${
                      list.change7d > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {list.change7d > 0 ? '+' : ''}{list.change7d.toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <button 
                      style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(0, 0, 0, 0.8))',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '2px',
                        padding: '4px 12px',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: '300',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}
                      className="hover:opacity-90"
                    >
                      TRADE
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