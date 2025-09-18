'use client';

import React, { useState } from 'react';

interface CreateListModalProps {
  onClose: () => void;
}

export function CreateListModal({ onClose }: CreateListModalProps) {
  const [step, setStep] = useState(1);
  const [listData, setListData] = useState({
    title: '',
    description: '',
    type: 'general',
    category: '',
    csvFile: null as File | null,
    totalShares: 10000,
    initialPrice: 0.1,
    dividendPercentage: 5,
    payoutAddress: '',
    tags: [] as string[],
    features: [] as string[],
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setListData({ ...listData, csvFile: file });
    }
  };

  const handleCreateNFT = () => {
    // Here would be the blockchain interaction to create the NFT
    console.log('Creating NFT with data:', listData);
    // Generate .nft file with metadata
    // Mint NFT on BSV blockchain
    // Store payout address in metadata
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-red-900/30 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 px-6 py-4 border-b border-red-900/30">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Create Mailing List NFT</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Progress Steps */}
          <div className="flex gap-4 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center gap-2 ${
                  step >= s ? 'text-red-400' : 'text-gray-500'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step >= s
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'border-gray-600'
                  }`}
                >
                  {s}
                </div>
                <span className="text-sm">
                  {s === 1 ? 'List Details' : s === 2 ? 'Upload Data' : 'Tokenization'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  List Title
                </label>
                <input
                  type="text"
                  value={listData.title}
                  onChange={(e) => setListData({ ...listData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  placeholder="e.g., Premium Crypto Investors USA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={listData.description}
                  onChange={(e) => setListData({ ...listData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  rows={4}
                  placeholder="Describe your mailing list..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    List Type
                  </label>
                  <select
                    value={listData.type}
                    onChange={(e) => setListData({ ...listData, type: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  >
                    <option value="general">General</option>
                    <option value="targeted">Targeted</option>
                    <option value="verified">Verified</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={listData.category}
                    onChange={(e) => setListData({ ...listData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="crypto">Crypto & Blockchain</option>
                    <option value="b2b">B2B Enterprise</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="gaming">Gaming</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload CSV File
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
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {listData.csvFile ? (
                      <p className="text-white">{listData.csvFile.name}</p>
                    ) : (
                      <>
                        <p className="text-gray-300 mb-2">Click to upload CSV file</p>
                        <p className="text-gray-500 text-sm">Maximum file size: 100MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">CSV Format Requirements:</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• First row must contain headers</li>
                  <li>• Required columns: email</li>
                  <li>• Optional columns: name, phone, company, tags</li>
                  <li>• UTF-8 encoding required</li>
                </ul>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Shares
                  </label>
                  <input
                    type="number"
                    value={listData.totalShares}
                    onChange={(e) => setListData({ ...listData, totalShares: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Initial Price per Share (BSV)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={listData.initialPrice}
                    onChange={(e) => setListData({ ...listData, initialPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Revenue Share Percentage
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={listData.dividendPercentage}
                    onChange={(e) => setListData({ ...listData, dividendPercentage: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-white font-medium w-12">{listData.dividendPercentage}%</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Percentage of email revenue distributed to shareholders
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  BSV Payout Address
                </label>
                <input
                  type="text"
                  value={listData.payoutAddress}
                  onChange={(e) => setListData({ ...listData, payoutAddress: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none font-mono text-sm"
                  placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                />
                <p className="text-gray-500 text-sm mt-2">
                  This address will receive revenue and distribute dividends
                </p>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                  <strong>Important:</strong> Once created, the payout address and dividend percentage
                  cannot be changed. They will be permanently encoded in the NFT metadata.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-800 flex justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
          >
            Previous
          </button>
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleCreateNFT}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-medium transition-all"
            >
              Create NFT & List
            </button>
          )}
        </div>
      </div>
    </div>
  );
}