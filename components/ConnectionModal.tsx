'use client';

import React, { useState } from 'react';
import { HandCashService } from '@/services/HandCashService';
import { GmailService } from '@/services/GmailService';

interface ConnectionModalProps {
  onClose: () => void;
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({ onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const providers = [
    {
      id: 'handcash',
      name: 'HandCash',
      icon: '₿',
      color: 'bg-orange-500',
      description: 'Connect with your HandCash wallet for Bitcoin-powered email',
      available: true
    },
    {
      id: 'gmail',
      name: 'Gmail',
      icon: '📧',
      color: 'bg-red-500',
      description: 'Connect your Gmail account',
      available: true
    },
    {
      id: 'outlook',
      name: 'Outlook',
      icon: '📮',
      color: 'bg-blue-500',
      description: 'Connect your Outlook/Hotmail account',
      available: false,
      comingSoon: true
    },
    {
      id: 'proton',
      name: 'ProtonMail',
      icon: '🔒',
      color: 'bg-purple-500',
      description: 'Connect your ProtonMail account',
      available: false,
      comingSoon: true
    },
    {
      id: 'icloud',
      name: 'iCloud',
      icon: '☁️',
      color: 'bg-gray-500',
      description: 'Connect your iCloud email',
      available: false,
      comingSoon: true
    }
  ];

  const handleConnect = async (providerId: string) => {
    setIsConnecting(true);
    
    try {
      switch (providerId) {
        case 'handcash':
          const handcashService = new HandCashService();
          await handcashService.login();
          break;
          
        case 'gmail':
          const gmailService = new GmailService();
          await gmailService.login();
          break;
          
        case 'outlook':
          // TODO: Implement Outlook OAuth
          alert('Outlook integration coming soon!');
          break;
          
        default:
          alert(`${providerId} integration coming soon!`);
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Failed to connect. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Connect Email Account
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-8rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => provider.available && handleConnect(provider.id)}
                disabled={!provider.available || isConnecting}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  provider.available
                    ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer'
                    : 'border-gray-100 dark:border-gray-800 opacity-50 cursor-not-allowed'
                }`}
              >
                {provider.comingSoon && (
                  <span className="absolute top-2 right-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
                    Coming Soon
                  </span>
                )}
                
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 ${provider.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {provider.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {provider.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {provider.description}
                    </p>
                  </div>
                </div>

                {provider.available && (
                  <div className="flex items-center justify-center mt-3">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Connect →
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Why connect multiple accounts?
            </h3>
            <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Manage all your emails in one unified inbox</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Send Bitcoin payments directly through email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>End-to-end encryption for enhanced privacy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Switch between accounts seamlessly</span>
              </li>
            </ul>
          </div>
        </div>

        {isConnecting && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connecting your account...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionModal;