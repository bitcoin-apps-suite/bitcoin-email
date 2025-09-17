'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmailComposer } from '@/components/email/EmailComposer';

export default function ComposePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSendEmail = async (emailData: {
    to: string[];
    subject: string;
    html: string;
    text: string;
  }) => {
    setIsLoading(true);
    setStatus('idle');
    
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      setStatus('success');
      setMessage('Email sent successfully!');
      
      // Redirect to inbox after 2 seconds
      setTimeout(() => {
        router.push('/inbox');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to send email');
      console.error('Send email error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push('/inbox')}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Inbox
          </button>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8">Compose Email</h1>

        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-600 rounded-lg">
            <p className="text-green-400">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-600 rounded-lg">
            <p className="text-red-400">{message}</p>
            <p className="text-xs text-gray-400 mt-2">
              Make sure you&apos;ve configured your email credentials in the .env.local file
            </p>
          </div>
        )}

        <EmailComposer 
          onSend={handleSendEmail}
          className="bg-gray-900/50 backdrop-blur-xl border-gray-800"
        />

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-bitcoin-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white">Sending email...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}