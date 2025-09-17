'use client';

import { useState, useEffect } from 'react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  hasPayment?: boolean;
  paymentAmount?: number;
  isRead: boolean;
  isStarred: boolean;
  isEncrypted: boolean;
  onChain: boolean;
}

interface EmailListProps {
  onSelectEmail: (email: Email) => void;
}

// Mock data for demonstration
const mockEmails: Email[] = [
  {
    id: '1',
    from: 'alice@handcash.io',
    subject: 'Welcome to Bitcoin Email! 🚀',
    preview: 'Thanks for joining the future of encrypted communication. This email is stored on the blockchain and includes a welcome bonus...',
    timestamp: '2 hours ago',
    hasPayment: true,
    paymentAmount: 5.00,
    isRead: false,
    isStarred: false,
    isEncrypted: true,
    onChain: true
  },
  {
    id: '2',
    from: 'payments@freelancer.com',
    subject: 'Payment Received - $250 USD',
    preview: 'Your payment for web development services has been received. Thanks for using our encrypted payment system...',
    timestamp: '4 hours ago',
    hasPayment: true,
    paymentAmount: 250.00,
    isRead: false,
    isStarred: true,
    isEncrypted: true,
    onChain: true
  },
  {
    id: '3',
    from: 'bob@developer.com',
    subject: 'Invoice for services',
    preview: 'Please find attached the invoice for last month\'s consulting work. Payment can be sent directly via this email...',
    timestamp: '5 hours ago',
    hasPayment: false,
    isRead: true,
    isStarred: true,
    isEncrypted: true,
    onChain: true
  },
  {
    id: '4',
    from: 'newsletter@bitcoinnews.com',
    subject: 'Weekly Bitcoin News - Micropayments Rising',
    preview: 'This week in Bitcoin: Email micropayments see 300% increase, new applications emerge...',
    timestamp: '1 day ago',
    hasPayment: false,
    isRead: true,
    isStarred: false,
    isEncrypted: true,
    onChain: true
  },
  {
    id: '5',
    from: 'support@bitcoin-email.com',
    subject: 'Your email storage report',
    preview: 'You have 47 emails stored on-chain this month. Your blockchain storage usage: 2.3 MB...',
    timestamp: '2 days ago',
    hasPayment: false,
    isRead: true,
    isStarred: false,
    isEncrypted: true,
    onChain: true
  },
  {
    id: '6',
    from: 'spam@unknown.com',
    subject: 'URGENT: Click here for FREE crypto!',
    preview: 'This email didn\'t include the required $0.01 payment and has been marked as potential spam...',
    timestamp: '3 days ago',
    hasPayment: false,
    isRead: false,
    isStarred: false,
    isEncrypted: false,
    onChain: false
  }
];

export function EmailList({ onSelectEmail }: EmailListProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filter, setFilter] = useState<'all' | 'paid' | 'starred'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // Load emails (mock data for now)
    setEmails(mockEmails);
  }, []);

  const filteredEmails = emails.filter(email => {
    if (filter === 'paid') return email.hasPayment;
    if (filter === 'starred') return email.isStarred;
    return true;
  });

  const handleSelectEmail = (email: Email) => {
    setSelectedId(email.id);
    onSelectEmail(email);
    // Mark as read
    setEmails(prev => prev.map(e => 
      e.id === email.id ? { ...e, isRead: true } : e
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border-color p-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filter === 'all' 
                ? 'bg-bitcoin-red-500 text-white' 
                : 'bg-dark-200 text-gray-400 hover:text-white'
            }`}
          >
            All Mail
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filter === 'paid' 
                ? 'bg-bitcoin-red-500 text-white' 
                : 'bg-dark-200 text-gray-400 hover:text-white'
            }`}
          >
            💰 Paid
          </button>
          <button
            onClick={() => setFilter('starred')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filter === 'starred' 
                ? 'bg-bitcoin-red-500 text-white' 
                : 'bg-dark-200 text-gray-400 hover:text-white'
            }`}
          >
            ⭐ Starred
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search emails..."
            className="w-full bg-dark-200 rounded-lg px-4 py-2 pl-10 text-sm"
          />
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {filteredEmails.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No emails found</p>
          </div>
        ) : (
          <div className="divide-y divide-border-color">
            {filteredEmails.map(email => (
              <div
                key={email.id}
                onClick={() => handleSelectEmail(email)}
                className={`p-4 hover:bg-dark-100 cursor-pointer transition-colors ${
                  selectedId === email.id ? 'bg-dark-100 border-l-2 border-bitcoin-red-500' : ''
                } ${!email.isRead ? 'bg-dark-200/50' : ''}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium text-sm ${!email.isRead ? 'text-white' : 'text-gray-300'}`}>
                      {email.from}
                    </span>
                    {email.hasPayment && (
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">
                        ${email.paymentAmount}
                      </span>
                    )}
                    {email.onChain && (
                      <span className="text-bitcoin-red-400" title="Stored on blockchain">
                        ⛓️
                      </span>
                    )}
                    {email.isEncrypted && (
                      <span className="text-gray-400" title="Encrypted">
                        🔐
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{email.timestamp}</span>
                </div>
                <h3 className={`text-sm mb-1 ${!email.isRead ? 'font-medium text-white' : 'text-gray-200'}`}>
                  {email.subject}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">{email.preview}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}