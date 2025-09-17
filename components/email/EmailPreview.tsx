'use client';

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

interface EmailPreviewProps {
  email: Email;
}

export function EmailPreview({ email }: EmailPreviewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border-color p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{email.subject}</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-dark-200 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-dark-200 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <button className="p-2 hover:bg-dark-200 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bitcoin-red-500 flex items-center justify-center text-white font-medium">
              {email.from.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{email.from}</p>
              <p className="text-sm text-gray-400">To: you@handcash.io</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-400">
            <p>{email.timestamp}</p>
            {email.onChain && (
              <a href="#" className="text-bitcoin-red-400 hover:underline flex items-center gap-1 justify-end mt-1">
                <span>View on chain</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
        
        {email.hasPayment && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-sm font-medium text-green-400">Payment Attached</p>
                <p className="text-xs text-gray-400">Click to claim ${email.paymentAmount} USD</p>
              </div>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg transition-colors text-sm">
              Claim Payment
            </button>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">
              {email.preview}
            </p>
            <br />
            <p className="text-gray-300 leading-relaxed">
              This is a demonstration of Bitcoin Email, the world&apos;s first blockchain-powered email client. 
              Every email is encrypted end-to-end and can optionally be stored on the Bitcoin SV blockchain for 
              permanent, immutable record-keeping.
            </p>
            <br />
            <p className="text-gray-300 leading-relaxed">
              With native payment integration, you can send money as easily as sending an email. Recipients can 
              instantly claim payments attached to emails, and you can set up micropayment requirements to eliminate 
              spam from your inbox.
            </p>
            <br />
            <p className="text-gray-300 leading-relaxed">
              Best regards,<br />
              The Bitcoin Email Team
            </p>
          </div>
          
          {email.isEncrypted && (
            <div className="mt-8 p-4 bg-dark-200 rounded-lg border border-border-color">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>This email is end-to-end encrypted</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-border-color p-4">
        <div className="flex gap-2">
          <button className="flex-1 bg-dark-200 hover:bg-dark-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reply
          </button>
          <button className="flex-1 bg-bitcoin-red-500 hover:bg-bitcoin-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Reply with Payment
          </button>
        </div>
      </div>
    </div>
  );
}