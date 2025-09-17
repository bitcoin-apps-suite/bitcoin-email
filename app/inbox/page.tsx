'use client';

import { useState } from 'react';
import { EmailList } from '@/components/email/EmailList';
import { EmailPreview } from '@/components/email/EmailPreview';

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

export default function InboxPage() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  return (
    <div className="flex h-screen bg-black">
      <div className="w-1/3 border-r border-red-900/30 bg-gray-900">
        <EmailList onSelectEmail={setSelectedEmail} />
      </div>
      <div className="flex-1 bg-gray-900">
        {selectedEmail ? (
          <EmailPreview email={selectedEmail} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 bg-black">
            <div className="text-center">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400">Select an email to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}