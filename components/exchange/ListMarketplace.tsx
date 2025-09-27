'use client';

import React, { useState } from 'react';
import './exchange.mobile.css';

interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  category: string;
  listSize: number;
  price: number;
  owner: string;
  rating: number;
  reviews: number;
  tags: string[];
  samples: number;
  verified: boolean;
  deliveryTime: string;
  responseRate: number;
  features: string[];
}

export function ListMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Commenting out unused state - may be needed for future price filter feature
  // const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  
  const categories = [
    'All Categories',
    'Crypto & Blockchain',
    'E-commerce',
    'B2B Enterprise',
    'Healthcare',
    'Real Estate',
    'Gaming',
    'Education',
    'Finance',
    'Marketing Agencies'
  ];

  const listings: MarketplaceListing[] = [
    {
      id: 'mp-001',
      title: 'Verified Crypto Traders - USA',
      description: 'High-quality list of active cryptocurrency traders in the United States with verified trading history',
      category: 'Crypto & Blockchain',
      listSize: 25000,
      price: 499,
      owner: '$cryptodata',
      rating: 4.8,
      reviews: 127,
      tags: ['crypto', 'traders', 'usa', 'verified'],
      samples: 100,
      verified: true,
      deliveryTime: 'Instant',
      responseRate: 15.2,
      features: ['Email verified', 'Phone numbers', 'Social profiles', 'Trading volume data']
    },
    {
      id: 'mp-002',
      title: 'SaaS Decision Makers',
      description: 'C-level executives and decision makers at SaaS companies with 50+ employees',
      category: 'B2B Enterprise',
      listSize: 8500,
      price: 799,
      owner: '$b2bleads',
      rating: 4.9,
      reviews: 89,
      tags: ['b2b', 'saas', 'executives', 'enterprise'],
      samples: 50,
      verified: true,
      deliveryTime: '24 hours',
      responseRate: 8.7,
      features: ['LinkedIn profiles', 'Company size', 'Revenue data', 'Direct emails']
    },
    {
      id: 'mp-003',
      title: 'NFT Collectors Database',
      description: 'Active NFT collectors with purchase history across OpenSea, Rarible, and Magic Eden',
      category: 'Crypto & Blockchain',
      listSize: 45000,
      price: 349,
      owner: '$nftinsights',
      rating: 4.6,
      reviews: 203,
      tags: ['nft', 'collectors', 'web3', 'ethereum'],
      samples: 200,
      verified: false,
      deliveryTime: 'Instant',
      responseRate: 12.3,
      features: ['Wallet addresses', 'Collection preferences', 'Average spend', 'Discord handles']
    }
  ];

  return (
    <div>
      {/* Search and Filters */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-8">
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search mailing lists..."
            className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
          />
          <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors">
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-red-600/50 transition-all"
          >
            {/* Card Header */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    {listing.title}
                    {listing.verified && (
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{listing.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${listing.price}</p>
                  <p className="text-gray-500 text-xs">per list</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {listing.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 text-xs">List Size</p>
                  <p className="text-white font-medium">{listing.listSize.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Response Rate</p>
                  <p className="text-white font-medium">{listing.responseRate}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Delivery</p>
                  <p className="text-white font-medium">{listing.deliveryTime}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Free Samples</p>
                  <p className="text-white font-medium">{listing.samples}</p>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {listing.features.length > 3 && (
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                    +{listing.features.length - 3} more
                  </span>
                )}
              </div>

              {/* Rating and Owner */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(listing.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-400 text-sm ml-1">
                      {listing.rating} ({listing.reviews})
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">by {listing.owner}</p>
              </div>
            </div>

            {/* Card Actions */}
            <div className="bg-gray-900/80 px-6 py-4 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors">
                Buy Now
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors">
          Load More Listings
        </button>
      </div>
    </div>
  );
}