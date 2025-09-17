'use client';

import React from 'react';
import { Email } from '@/store/emailStore';

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onSelectEmail: (email: Email) => void;
  loading: boolean;
}

const EmailList: React.FC<EmailListProps> = ({ 
  emails, 
  selectedEmail, 
  onSelectEmail,
  loading 
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const emailDate = new Date(date);
    const diff = now.getTime() - emailDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return emailDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return emailDate.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return emailDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No emails in this folder
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onSelectEmail(email)}
          className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
            selectedEmail?.id === email.id ? 'bg-gray-50 dark:bg-gray-700' : ''
          } ${!email.read ? 'bg-white dark:bg-gray-800' : ''}`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {email.from.avatar ? (
                <img 
                  src={email.from.avatar} 
                  alt={email.from.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {email.from.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm truncate ${!email.read ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
                  {email.from.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                  {formatDate(email.date)}
                </span>
              </div>
              
              <div className={`text-sm truncate mb-1 ${!email.read ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                {email.subject}
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {email.body}
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                {email.starred && (
                  <span className="text-yellow-500">⭐</span>
                )}
                {email.labels.map((label) => (
                  <span 
                    key={label}
                    className="inline-block px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;