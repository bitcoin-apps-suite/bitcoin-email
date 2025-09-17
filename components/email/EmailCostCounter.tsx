'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface EmailCostCounterProps {
  content: string;
  recipientCount?: number;
  onCostChange?: (cost: number) => void;
  className?: string;
}

// Pricing constants (in USD)
const COST_PER_CHARACTER = 0.000001; // $0.000001 per character (1/10,000th of a penny)
const COST_PER_RECIPIENT = 0.001; // $0.001 per recipient
const BLOCKCHAIN_STORAGE_MULTIPLIER = 2; // 2x cost for permanent blockchain storage
const ENCRYPTION_MULTIPLIER = 1.5; // 1.5x cost for encryption

export const EmailCostCounter: React.FC<EmailCostCounterProps> = ({
  content,
  recipientCount = 1,
  onCostChange,
  className = ''
}) => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [cost, setCost] = useState(0);
  const [isBlockchainStorage, setIsBlockchainStorage] = useState(true);
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [animatedCost, setAnimatedCost] = useState(0);

  // Calculate character and word count
  useEffect(() => {
    // Strip HTML tags for accurate count
    const textContent = content.replace(/<[^>]*>/g, '');
    const chars = textContent.length;
    const words = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    setCharCount(chars);
    setWordCount(words || 0);
  }, [content]);

  // Calculate cost
  useEffect(() => {
    let totalCost = charCount * COST_PER_CHARACTER;
    
    // Add recipient cost
    totalCost += recipientCount * COST_PER_RECIPIENT;
    
    // Apply multipliers
    if (isBlockchainStorage) {
      totalCost *= BLOCKCHAIN_STORAGE_MULTIPLIER;
    }
    if (isEncrypted) {
      totalCost *= ENCRYPTION_MULTIPLIER;
    }
    
    setCost(totalCost);
    
    if (onCostChange) {
      onCostChange(totalCost);
    }
  }, [charCount, recipientCount, isBlockchainStorage, isEncrypted, onCostChange]);

  // Animate cost counter
  useEffect(() => {
    const startValue = animatedCost;
    const endValue = cost;
    const duration = 300; // ms
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeOutCubic;
      
      setAnimatedCost(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [cost]);

  const formatCost = useCallback((value: number) => {
    if (value < 0.000001) {
      return '$0.00000000';
    } else if (value < 0.01) {
      // Show in cents with high precision
      const cents = value * 100;
      if (cents < 0.0001) {
        return `${cents.toFixed(8)}¢`;
      } else if (cents < 0.01) {
        return `${cents.toFixed(6)}¢`;
      } else {
        return `${cents.toFixed(4)}¢`;
      }
    } else {
      return `$${value.toFixed(4)}`;
    }
  }, []);

  const getCostColor = () => {
    if (animatedCost < 0.001) return '#00ff00'; // Green for very cheap
    if (animatedCost < 0.01) return '#ffcc00'; // Yellow for moderate
    return '#ff6600'; // Orange for higher cost
  };

  return (
    <div className={`flex items-center gap-4 text-sm ${className}`}>
      {/* Character/Word Count */}
      <div className="flex items-center gap-3 text-gray-500">
        <span>{charCount.toLocaleString()} chars</span>
        <span className="text-gray-700">•</span>
        <span>{wordCount.toLocaleString()} words</span>
      </div>

      {/* Cost Display */}
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Cost:</span>
        <span 
          className="font-mono font-bold transition-colors"
          style={{ color: getCostColor() }}
        >
          {formatCost(animatedCost)}
        </span>
      </div>

      {/* Storage Options */}
      <div className="flex items-center gap-3 ml-auto">
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={isBlockchainStorage}
            onChange={(e) => setIsBlockchainStorage(e.target.checked)}
            className="sr-only"
          />
          <div className={`w-8 h-5 rounded-full transition-colors ${
            isBlockchainStorage ? 'bg-bitcoin-orange-500' : 'bg-gray-600'
          }`}>
            <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform ${
              isBlockchainStorage ? 'translate-x-3.5' : 'translate-x-0.5'
            }`} />
          </div>
          <svg className="w-4 h-4 text-bitcoin-orange-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
          </svg>
          <span className="text-xs text-gray-500">On-chain</span>
        </label>

        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={isEncrypted}
            onChange={(e) => setIsEncrypted(e.target.checked)}
            className="sr-only"
          />
          <div className={`w-8 h-5 rounded-full transition-colors ${
            isEncrypted ? 'bg-green-500' : 'bg-gray-600'
          }`}>
            <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform ${
              isEncrypted ? 'translate-x-3.5' : 'translate-x-0.5'
            }`} />
          </div>
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-gray-500">Encrypted</span>
        </label>
      </div>
    </div>
  );
};

export default EmailCostCounter;