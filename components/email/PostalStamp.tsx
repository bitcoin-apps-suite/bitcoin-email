'use client';

import { useState } from 'react';

interface PostalStampProps {
  selectedStamp?: string | null;
  onStampSelect: (stamp: string | null) => void;
  className?: string;
}

export function PostalStamp({ selectedStamp, onStampSelect, className = '' }: PostalStampProps) {
  const [showStamps, setShowStamps] = useState(false);

  const stamps = [
    {
      id: 'none',
      name: 'No Stamp',
      description: 'Regular email',
      value: 0,
      icon: '✉️',
      color: 'transparent'
    },
    {
      id: 'standard',
      name: 'Standard Stamp',
      description: 'USPS/Royal Mail certified',
      value: 0.68,
      icon: '🏛️',
      color: '#1f4e79'
    },
    {
      id: 'priority',
      name: 'Priority Stamp',
      description: 'Government priority mail',
      value: 1.45,
      icon: '⚡',
      color: '#d73502'
    },
    {
      id: 'express',
      name: 'Express Stamp',
      description: 'Legal document express',
      value: 3.95,
      icon: '🚀',
      color: '#8b0000'
    },
    {
      id: 'certified',
      name: 'Certified Stamp',
      description: 'Court & government certified',
      value: 7.50,
      icon: '🏅',
      color: '#b8860b'
    }
  ];

  const currentStamp = stamps.find(s => s.id === selectedStamp) || stamps[0];

  return (
    <div className={`postal-stamp-selector ${className}`}>
      <label className="stamp-label">
        Postal Stamp
        <span className="stamp-info">
          Official postage for government/legal emails
        </span>
      </label>

      <div className="stamp-selector-wrapper">
        <button
          type="button"
          className="stamp-display"
          onClick={() => setShowStamps(!showStamps)}
        >
          <div className="stamp-preview">
            <span className="stamp-icon" style={{ backgroundColor: currentStamp.color }}>
              {currentStamp.icon}
            </span>
            <div className="stamp-details">
              <span className="stamp-name">{currentStamp.name}</span>
              <span className="stamp-value">
                {currentStamp.value > 0 ? `$${currentStamp.value}` : 'Free'}
              </span>
            </div>
          </div>
          <svg className="stamp-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d={showStamps ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
        </button>

        {showStamps && (
          <div className="stamp-dropdown">
            {stamps.map((stamp) => (
              <button
                key={stamp.id}
                type="button"
                className={`stamp-option ${selectedStamp === stamp.id ? 'selected' : ''}`}
                onClick={() => {
                  onStampSelect(stamp.id === 'none' ? null : stamp.id);
                  setShowStamps(false);
                }}
              >
                <div className="stamp-option-preview">
                  <span className="stamp-option-icon" style={{ backgroundColor: stamp.color }}>
                    {stamp.icon}
                  </span>
                  <div className="stamp-option-details">
                    <span className="stamp-option-name">{stamp.name}</span>
                    <span className="stamp-option-description">{stamp.description}</span>
                  </div>
                  <span className="stamp-option-value">
                    {stamp.value > 0 ? `$${stamp.value}` : 'Free'}
                  </span>
                </div>
                {stamp.value > 0 && (
                  <div className="stamp-legal-notice">
                    ₿ Bitcoin payment • Legally spendable • Government verified
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {currentStamp.value > 0 && (
        <div className="stamp-notice">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            This stamp enables delivery to government agencies and legal institutions.
            The Bitcoin payment is legally spendable by the recipient.
          </span>
        </div>
      )}
    </div>
  );
}