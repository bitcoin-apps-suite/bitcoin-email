'use client';

import React, { useState, useCallback } from 'react';

interface PaymailInputProps {
  value: string;
  onChange: (value: string) => void;
  multiple?: boolean;
  className?: string;
  placeholder?: string;
}

export const PaymailInput: React.FC<PaymailInputProps> = ({
  value,
  onChange,
  multiple = false,
  className = '',
  placeholder = 'satoshi@handcash.io, user@moneybutton.com'
}) => {
  const [isValid, setIsValid] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Validate paymail/email/cashhandle format
  const validateAddress = useCallback((address: string) => {
    // Remove $ prefix if it's a cashhandle
    const cleaned = address.trim().replace(/^\$/, '');
    
    // Check if it's a valid email/paymail format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if it's a cashhandle (alphanumeric, can have underscores)
    const cashhandleRegex = /^[a-zA-Z0-9_]{1,99}$/;
    
    return emailRegex.test(cleaned) || cashhandleRegex.test(cleaned);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (multiple) {
      const addresses = newValue.split(',').map(a => a.trim()).filter(Boolean);
      const allValid = addresses.length === 0 || addresses.every(validateAddress);
      setIsValid(allValid);
    } else {
      setIsValid(!newValue || validateAddress(newValue));
    }

    // Generate suggestions for common paymail domains
    if (newValue && !newValue.includes('@') && newValue.length > 2) {
      setSuggestions([
        `${newValue}@handcash.io`,
        `${newValue}@moneybutton.com`,
        `${newValue}@relayx.io`,
        `$${newValue}` // Cashhandle format
      ]);
    } else {
      setSuggestions([]);
    }
  };

  const applySuggestion = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
    setIsValid(true);
  };

  const getAddressType = (address: string) => {
    if (address.startsWith('$')) return 'cashhandle';
    if (address.includes('@')) {
      if (address.endsWith('@handcash.io')) return 'handcash';
      if (address.endsWith('@moneybutton.com')) return 'moneybutton';
      if (address.endsWith('@relayx.io')) return 'relayx';
      return 'paymail';
    }
    return 'unknown';
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 pr-10 
            border rounded-md shadow-sm 
            focus:outline-none focus:ring-bitcoin-orange-500 focus:border-bitcoin-orange-500 
            dark:bg-gray-700 dark:text-white
            ${isValid 
              ? 'border-gray-300 dark:border-gray-600' 
              : 'border-red-500 dark:border-red-400'
            }
            ${className}
          `}
        />
        
        {/* Address type indicator */}
        {value && isValid && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {getAddressType(value) === 'cashhandle' && (
              <span className="text-green-500 text-sm font-bold">$</span>
            )}
            {getAddressType(value) === 'handcash' && (
              <span className="text-blue-500 text-xs">HC</span>
            )}
            {getAddressType(value) === 'paymail' && (
              <svg className="w-4 h-4 text-bitcoin-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => applySuggestion(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            >
              <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
              <span className="ml-2 text-xs text-gray-500">
                {suggestion.startsWith('$') ? 'Cashhandle' : 'Paymail'}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Validation message */}
      {!isValid && value && (
        <p className="mt-1 text-xs text-red-500">
          Please enter a valid paymail address (user@domain.com) or cashhandle ($handle)
        </p>
      )}
    </div>
  );
};

export default PaymailInput;