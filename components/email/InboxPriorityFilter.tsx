'use client';

import React, { useState } from 'react';

interface InboxPriorityFilterProps {
  onFilterChange?: (minPayment: number) => void;
  className?: string;
}

export const InboxPriorityFilter: React.FC<InboxPriorityFilterProps> = ({
  onFilterChange,
  className = ''
}) => {
  const [minPayment, setMinPayment] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Preset amounts in USD
  const presets = [
    { label: 'Free', value: 0 },
    { label: '1¢', value: 0.01 },
    { label: '10¢', value: 0.10 },
    { label: '$1', value: 1.00 },
    { label: '$5', value: 5.00 },
    { label: '$10', value: 10.00 },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMinPayment(value);
    if (onFilterChange && isEnabled) {
      onFilterChange(value);
    }
  };

  const handlePresetClick = (value: number) => {
    setMinPayment(value);
    if (onFilterChange && isEnabled) {
      onFilterChange(value);
    }
  };

  const toggleEnabled = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    if (onFilterChange) {
      onFilterChange(newEnabled ? minPayment : 0);
    }
  };

  const formatCurrency = (value: number) => {
    if (value === 0) return 'Free';
    if (value < 1) return `${(value * 100).toFixed(0)}¢`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className={`bg-gray-900 rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-white">Inbox Priority</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={toggleEnabled}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${
              isEnabled ? 'bg-bitcoin-orange-500' : 'bg-gray-600'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${
                isEnabled ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </div>
          </label>
        </div>
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Current Setting */}
      <div className="mb-3">
        <p className="text-xs text-gray-400 mb-1">
          Minimum payment to reach your inbox:
        </p>
        <p className="text-2xl font-bold text-bitcoin-orange-400">
          {formatCurrency(minPayment)}
        </p>
      </div>

      {/* Slider */}
      {isEnabled && (
        <div className="space-y-3">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              step="0.01"
              value={minPayment}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${minPayment}%, #374151 ${minPayment}%, #374151 100%)`
              }}
            />
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handlePresetClick(preset.value)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  Math.abs(minPayment - preset.value) < 0.001
                    ? 'bg-bitcoin-orange-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-4 pt-4 border-t border-gray-700 space-y-3">
          <div>
            <label className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Auto-archive low payment emails</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </label>
          </div>
          <div>
            <label className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Show payment amount in subject</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </label>
          </div>
          <div>
            <label className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Notify for high-value emails</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </label>
          </div>
          
          <div className="pt-3">
            <p className="text-xs text-gray-500">
              Emails with payments below your threshold will be moved to a "Low Priority" folder.
              You can still access them anytime.
            </p>
          </div>
        </div>
      )}

      {/* Info */}
      {!isEnabled && (
        <p className="text-xs text-gray-500 mt-3">
          All emails will reach your inbox regardless of payment amount.
        </p>
      )}
    </div>
  );
};

export default InboxPriorityFilter;