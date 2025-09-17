'use client';

import React, { useState, useRef, useEffect } from 'react';
import ConnectionModal from './ConnectionModal';
import { useAuthStore } from '@/store/authStore';

const ConnectionManager: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { connections, activeConnection, setActiveConnection, removeConnection } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'handcash': return '₿';
      case 'gmail': return '📧';
      case 'outlook': return '📮';
      default: return '✉️';
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'handcash': return 'text-orange-500';
      case 'gmail': return 'text-red-500';
      case 'outlook': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {connections.length > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <span className={`text-lg ${getConnectionColor(activeConnection?.type || '')}`}>
                  {getConnectionIcon(activeConnection?.type || '')}
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {activeConnection?.email || activeConnection?.handle || 'Select Account'}
                </span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Add Account
              </span>
            </>
          )}
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
            <div className="p-2">
              <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 px-2 py-1">
                Connected Accounts
              </div>
              
              {connections.length === 0 ? (
                <div className="px-2 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No accounts connected
                </div>
              ) : (
                <div className="space-y-1">
                  {connections.map((connection) => (
                    <div
                      key={connection.id}
                      className={`flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                        activeConnection?.id === connection.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                      }`}
                      onClick={() => setActiveConnection(connection)}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-lg ${getConnectionColor(connection.type)}`}>
                          {getConnectionIcon(connection.type)}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {connection.email || connection.handle}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {connection.type}
                          </div>
                        </div>
                      </div>
                      {activeConnection?.id === connection.id && (
                        <span className="text-green-500 text-sm">✓</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeConnection(connection.id);
                        }}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                <button
                  onClick={() => {
                    setShowConnectionModal(true);
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showConnectionModal && (
        <ConnectionModal onClose={() => setShowConnectionModal(false)} />
      )}
    </>
  );
};

export default ConnectionManager;