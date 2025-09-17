'use client';

import React, { useEffect } from 'react';
import { Email, useEmailStore } from '@/store/emailStore';

interface EmailPreviewProps {
  email: Email;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ email }) => {
  const { markAsRead, toggleStar, moveToTrash } = useEmailStore();

  useEffect(() => {
    if (!email.read) {
      markAsRead(email.id);
    }
  }, [email.id, email.read]);

  const formatFullDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Email Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {email.subject}
          </h2>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleStar(email.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {email.starred ? (
                <span className="text-yellow-500 text-xl">⭐</span>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={() => moveToTrash(email.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {email.from.avatar ? (
            <img 
              src={email.from.avatar} 
              alt={email.from.name}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {email.from.name.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {email.from.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                &lt;{email.from.email}&gt;
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              to {email.to.map(t => t.email).join(', ')}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {formatFullDate(email.date)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium text-sm text-gray-700 dark:text-gray-300 transition-colors">
              Reply
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium text-sm text-gray-700 dark:text-gray-300 transition-colors">
              Forward
            </button>
          </div>
        </div>
      </div>

      {/* Email Body */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="prose dark:prose-invert max-w-none">
          {email.body.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>

        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Attachments ({email.attachments.length})
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {email.attachments.map((attachment, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {attachment.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailPreview;