'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import '../EmailList.css';

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
  activeFolder?: string;
  searchQuery?: string;
}

export function EmailList({ onSelectEmail, activeFolder = 'inbox', searchQuery = '' }: EmailListProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMockData, setIsMockData] = useState(false);
  const [filter, setFilter] = useState<'all' | 'paid' | 'starred'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [minPaymentFilter, setMinPaymentFilter] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  const fetchEmails = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

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
    // Filter by folder
    if (activeFolder === 'sent' && !email.from?.includes('@me')) return false;
    if (activeFolder === 'drafts') return false; // No drafts yet
    if (activeFolder === 'starred' && !email.isStarred) return false;
    if (activeFolder === 'trash') return false; // No trash yet
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        email.from?.toLowerCase().includes(query) ||
        email.subject?.toLowerCase().includes(query) ||
        email.text?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }
    
    // Apply payment filter
    if (minPaymentFilter > 0) {
      const paymentAmount = email.paymentAmount || 0;
      if (paymentAmount < minPaymentFilter) return false;
    }
    
    // Apply category filter
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

  const toggleStar = (e: React.MouseEvent, emailId: string) => {
    e.stopPropagation(); // Prevent email selection
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const _deleteEmail = (e: React.MouseEvent, emailId: string) => {
    e.stopPropagation(); // Prevent email selection
    setEmails(prev => prev.filter(email => email.id !== emailId));
  };

  return (
    <div className="email-list">
      <div className="email-list-header">
        <div className="email-list-title">
          <h2>
            Inbox
            {isMockData && (
              <span className="demo-badge">Demo Mode</span>
            )}
          </h2>
          <div className="email-header-actions">
            <button
              className="email-action-btn"
              onClick={() => setShowSettings(!showSettings)}
              title="Filter Settings"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>
            <button
              onClick={() => router.push('/compose')}
              className="compose-btn"
              title="Compose Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        <div className="email-filters">
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            All Mail
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`filter-btn ${filter === 'paid' ? 'active' : ''}`}
          >
            <span style={{ marginRight: '4px' }}>$</span>Paid
          </button>
          <button
            onClick={() => setFilter('starred')}
            className={`filter-btn ${filter === 'starred' ? 'active' : ''}`}
          >
            <span style={{ marginRight: '4px' }}>★</span>Starred
          </button>
        </div>

        <div className="email-search">
          <svg className="email-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search emails..."
            className="email-search-input"
          />
        </div>
        
        {/* Settings Dropdown */}
        {showSettings && (
          <div className="email-settings-dropdown">
            <div className="settings-section">
              <label className="settings-label">Minimum Payment Filter</label>
              <div className="payment-filter-row">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.01"
                  value={minPaymentFilter}
                  onChange={(e) => setMinPaymentFilter(Number(e.target.value))}
                  className="payment-slider"
                />
                <span className="payment-value">${minPaymentFilter.toFixed(2)}</span>
              </div>
              <div className="settings-help">Hide emails with payments below this amount</div>
            </div>
            <div className="settings-section">
              <label className="settings-checkbox">
                <input type="checkbox" defaultChecked />
                <span>Auto-archive low value emails</span>
              </label>
              <label className="settings-checkbox">
                <input type="checkbox" defaultChecked />
                <span>Notify for stamped emails</span>
              </label>
            </div>
          </div>
        )}
      </div>
      
      <div className="email-list-items">
        {isLoading ? (
          <div className="email-list-loading">
            <div className="email-list-spinner"></div>
          </div>
        ) : filteredEmails.length === 0 ? (
          <div className="email-list-empty">
            <svg className="email-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="email-empty-text">No emails yet</p>
            <button
              onClick={() => router.push('/compose')}
              className="email-empty-action"
            >
              Compose First Email
            </button>
          </div>
        ) : (
          <div>
            {filteredEmails.map(email => (
              <div
                key={email.id}
                onClick={() => handleSelectEmail(email)}
                className={`email-item ${selectedId === email.id ? 'selected' : ''} ${!email.isRead ? 'unread' : ''}`}
              >
                <div className="email-item-header">
                  <button
                    onClick={(e) => toggleStar(e, email.id)}
                    className={`email-star-btn ${email.isStarred ? 'starred' : ''}`}
                    title={email.isStarred ? 'Unstar' : 'Star'}
                  >
                    <svg className="w-4 h-4" fill={email.isStarred ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <div className="email-item-from">
                    <span className="email-item-sender">
                      {email.from}
                    </span>
                    <div className="email-item-badges">
                      {email.hasPayment && (
                        <span className="email-item-badge badge-payment">
                          ${email.paymentAmount}
                        </span>
                      )}
                      {email.onChain && (
                        <svg className="w-4 h-4 badge-onchain" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                        </svg>
                      )}
                      {email.isEncrypted && (
                        <svg className="w-4 h-4 badge-encrypted" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="email-item-time">{email.timestamp}</span>
                </div>
                <h3 className="email-item-subject">
                  {email.subject || '(No Subject)'}
                </h3>
                <p className="email-item-preview">{email.preview}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}