'use client';

import { useState, useEffect } from 'react';
import { EmailListExchange } from '@/components/exchange/EmailListExchange';
import { ListMarketplace } from '@/components/exchange/ListMarketplace';
import { CreateListModal } from '@/components/exchange/CreateListModal';

export default function ExchangePage() {
  const [activeView, setActiveView] = useState<'exchange' | 'marketplace'>('exchange');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="bg-black/80 border-b border-red-900/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeView === 'exchange' ? (
          <EmailListExchange />
        ) : (
          <ListMarketplace />
        )}
      </div>

      {/* Create List Modal */}
      {showCreateModal && (
        <CreateListModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}