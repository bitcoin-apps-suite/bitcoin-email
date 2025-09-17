'use client';

import { useAuthStore } from '@/hooks/useAuthStore';
import { useState } from 'react';

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-14 bg-dark-200 border-b border-border-color flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-medium">
          <span className="text-bitcoin-red-400">Bitcoin</span>
          <span className="text-white ml-1">Email</span>
        </h1>
        <span className="text-xs text-gray-500">Blockchain-Powered Communication</span>
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated && user && (
          <>
            <button className="p-2 hover:bg-dark-300 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-dark-300 rounded-lg transition-colors"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.handle} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-bitcoin-red-500 flex items-center justify-center text-white font-medium">
                    {user.handle.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm">{user.handle}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-200 border border-border-color rounded-lg shadow-xl z-50">
                  <div className="p-3 border-b border-border-color">
                    <p className="text-sm font-medium">{user.displayName || user.handle}</p>
                    <p className="text-xs text-gray-400">{user.paymail}</p>
                  </div>
                  <div className="p-1">
                    <button className="w-full text-left px-3 py-2 hover:bg-dark-300 rounded transition-colors text-sm">
                      Settings
                    </button>
                    <button 
                      onClick={logout}
                      className="w-full text-left px-3 py-2 hover:bg-dark-300 rounded transition-colors text-sm text-red-400"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}