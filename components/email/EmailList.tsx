'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Email {
  id: string;
  from: string;
  to?: string[];
  subject: string;
  text?: string;
  html?: string;
  date?: string;
  preview?: string;
  timestamp?: string;
  hasPayment?: boolean;
  paymentAmount?: number;
  isRead?: boolean;
  isStarred?: boolean;
  isEncrypted?: boolean;
  onChain?: boolean;
  attachments?: unknown[];
}

interface EmailListProps {
  onSelectEmail: (email: Email) => void;
}

export function EmailList({ onSelectEmail }: EmailListProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMockData, setIsMockData] = useState(false);
  const [filter, setFilter] = useState<'all' | 'paid' | 'starred'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/email/receive?limit=20');
      const data = await response.json();
      
      if (data.emails) {
        // Transform API emails to our format
        const transformedEmails = data.emails.map((email: Email) => ({
          ...email,
          preview: email.text?.substring(0, 150) || 'No preview available',
          timestamp: formatDate(email.date),
          isRead: false,
          isStarred: false,
          isEncrypted: true,
          onChain: false,
          hasPayment: false,
        }));
        setEmails(transformedEmails);
        setIsMockData(data.mock === true);
      }
    } catch (error) {
      console.error('Failed to fetch emails:', error);
      setIsMockData(true);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

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
    <div className="flex flex-col h-full bg-gray-900">
      <div className="border-b border-gray-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            Inbox
            {isMockData && (
              <span className="ml-2 text-xs text-bitcoin-orange-400 font-normal">
                (Demo Mode)
              </span>
            )}
          </h2>
          <button
            onClick={() => router.push('/compose')}
            className="p-2 bg-bitcoin-orange-500 hover:bg-bitcoin-orange-600 rounded transition-colors"
            title="Compose Email"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              filter === 'all' 
                ? 'bg-bitcoin-orange-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            All Mail
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              filter === 'paid' 
                ? 'bg-bitcoin-orange-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span className="mr-1">$</span>Paid
          </button>
          <button
            onClick={() => setFilter('starred')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              filter === 'starred' 
                ? 'bg-bitcoin-orange-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span className="mr-1">★</span>Starred
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search emails..."
            className="w-full bg-gray-800 rounded px-4 py-2 pl-10 text-sm text-white placeholder-gray-500"
          />
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-3 border-bitcoin-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredEmails.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p>No emails yet</p>
            <button
              onClick={() => router.push('/compose')}
              className="mt-4 px-4 py-2 bg-bitcoin-orange-500 hover:bg-bitcoin-orange-600 text-white rounded transition-colors text-sm"
            >
              Compose First Email
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filteredEmails.map(email => (
              <div
                key={email.id}
                onClick={() => handleSelectEmail(email)}
                className={`p-4 hover:bg-gray-800/50 cursor-pointer transition-colors ${
                  selectedId === email.id ? 'bg-gray-800/50 border-l-2 border-bitcoin-orange-500' : ''
                } ${!email.isRead ? 'bg-gray-800/30' : ''}`}
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
                      <svg className="w-4 h-4 text-bitcoin-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                      </svg>
                    )}
                    {email.isEncrypted && (
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{email.timestamp}</span>
                </div>
                <h3 className={`text-sm mb-1 ${!email.isRead ? 'font-medium text-white' : 'text-gray-200'}`}>
                  {email.subject || '(No Subject)'}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{email.preview}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}