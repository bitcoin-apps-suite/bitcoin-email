'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuthStore';
import { HandCashService } from '@/services/HandCashService';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, login, setLoading } = useAuthStore();
  const handcashService = new HandCashService();

  useEffect(() => {
    // Check if already authenticated
    if (isAuthenticated) {
      router.push('/inbox');
      return;
    }

    // Check for stored session
    const accessToken = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');
    
    if (accessToken && userStr) {
      try {
        const user = JSON.parse(userStr);
        login(user, accessToken);
        router.push('/inbox');
      } catch (error) {
        console.error('Failed to restore session:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, login, router, setLoading]);

  const handleLogin = () => {
    handcashService.login();
  };

  const handleMockLogin = () => {
    // Create a mock user for demo purposes
    const mockUser = {
      handle: 'demo_user',
      paymail: 'demo@handcash.io',
      publicKey: 'mock_public_key_12345',
      avatarUrl: undefined,
      displayName: 'Demo User'
    };
    
    const mockToken = 'mock_access_token_for_demo_purposes';
    
    // Login with mock data
    login(mockUser, mockToken);
    
    // Small delay to ensure state is updated before navigation
    setTimeout(() => {
      router.push('/inbox');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-dark-100 to-black dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black tracking-tighter mb-2">
            <span className="bg-gradient-to-r from-bitcoin-orange-400 to-bitcoin-orange-600 bg-clip-text text-transparent">BITCOIN</span>
            <span className="text-white ml-2">EMAIL</span>
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">
            Decentralized • Encrypted • Unstoppable
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-lg p-6 border border-gray-800/50 shadow-2xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-bitcoin-orange-500 to-bitcoin-orange-600 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">E2E Encryption</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Military-grade security</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-bitcoin-orange-500 to-bitcoin-orange-600 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Native Bitcoin</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Instant micropayments</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-bitcoin-orange-500 to-bitcoin-orange-600 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">On-Chain Storage</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Permanent & immutable</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-bitcoin-orange-500 to-bitcoin-orange-600 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Zero Spam</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Pay-to-send protection</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700 dark:border-gray-600 space-y-3">
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-bitcoin-orange-500 to-bitcoin-orange-600 hover:from-bitcoin-orange-600 hover:to-bitcoin-orange-700 text-white font-bold py-3 px-6 rounded transition-all duration-200 uppercase tracking-wide text-sm"
              >
                Connect Wallet
              </button>

              <button
                onClick={handleMockLogin}
                className="w-full bg-transparent border border-gray-700 hover:border-gray-600 hover:bg-gray-900/50 text-gray-400 hover:text-white font-medium py-3 px-6 rounded transition-all duration-200 text-sm"
              >
                Try Demo
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-6">
            <a href="https://github.com/bitcoin-email" className="text-gray-600 hover:text-bitcoin-orange-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <span className="text-gray-700 text-xs">•</span>
            <a href="https://docs.bitcoin-email.com" className="text-gray-600 hover:text-bitcoin-orange-500 transition-colors text-xs uppercase tracking-wider font-medium">
              Documentation
            </a>
            <span className="text-gray-700 text-xs">•</span>
            <span className="text-gray-600 text-xs uppercase tracking-wider">BSV Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
}