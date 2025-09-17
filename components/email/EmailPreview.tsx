'use client';

import { useState } from 'react';
import '../EmailPreview.css';

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

interface EmailPreviewProps {
  email: Email;
}

export function EmailPreview({ email }: EmailPreviewProps) {
  const [showRaw, setShowRaw] = useState(false);
  return (
    <div className="email-preview">
      {/* Email Header */}
      <div className="email-preview-header">
        <div className="email-preview-actions">
          <button className="email-action-btn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span>Reply</span>
          </button>
          <button className="email-action-btn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span>Forward</span>
          </button>
          <button className="email-action-btn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
          
          <div className="email-action-separator" />
          
          <button className="email-action-btn">
            <svg className="w-4 h-4" fill={email.isEncrypted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
          <button className="email-action-btn">
            <svg className="w-4 h-4" fill={email.onChain ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button className="email-action-btn" onClick={() => setShowRaw(!showRaw)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Email Subject */}
      <div className="email-preview-subject">
        <h2>{email.subject || '(No Subject)'}</h2>
        {email.hasPayment && (
          <span className="payment-badge">
            <span>₿</span> ${email.paymentAmount}
          </span>
        )}
      </div>
      {/* Email Metadata */}
      <div className="email-preview-meta">
        <div className="email-sender">
          <div className="sender-avatar">
            {email.from?.charAt(0).toUpperCase()}
          </div>
          <div className="sender-info">
            <div className="sender-name">{email.from}</div>
            <div className="sender-details">
              to {email.to?.join(', ') || 'you@handcash.io'} • {email.date ? new Date(email.date).toLocaleString() : 'Unknown date'}
            </div>
          </div>
        </div>

        <div className="email-badges">
          {email.isEncrypted && (
            <span className="email-badge encrypted">Encrypted</span>
          )}
          {email.onChain && (
            <span className="email-badge onchain">On-Chain</span>
          )}
          {email.hasPayment && (
            <span className="email-badge payment">Payment</span>
          )}
        </div>
      </div>
      {/* Email Content */}
      <div className="email-preview-content">
        {showRaw ? (
          <pre className="email-raw">
            {JSON.stringify(email, null, 2)}
          </pre>
        ) : (
          <div className="email-body">
            {email.html ? (
              <div dangerouslySetInnerHTML={{ __html: email.html }} />
            ) : (
              <div className="whitespace-pre-wrap">
                {email.text || email.preview || 'No content available'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Attachments */}
      {email.attachments && email.attachments.length > 0 && (
        <div className="email-attachments">
          <h3>Attachments ({email.attachments.length})</h3>
          <div className="attachment-list">
            {email.attachments.map((attachment: any, index) => (
              <div key={index} className="attachment-item">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span>Attachment {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reply Section */}
      <div className="email-reply-section">
        <div className="reply-buttons">
          <button className="reply-btn secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span>Reply</span>
          </button>
          <button className="reply-btn primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Reply with Payment</span>
          </button>
        </div>
      </div>
    </div>
  );
}