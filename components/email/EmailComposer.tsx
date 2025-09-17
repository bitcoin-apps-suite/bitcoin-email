'use client';

import React, { useState } from 'react';
import { render } from '@react-email/render';
import { EmailTemplate } from './EmailTemplate';
import { EmailCostCounter } from './EmailCostCounter';
import { PaymailInput } from './PaymailInput';

interface EmailComposerProps {
  onSend?: (emailData: {
    to: string[];
    subject: string;
    html: string;
    text: string;
  }) => Promise<void>;
  className?: string;
}

export const EmailComposer: React.FC<EmailComposerProps> = ({
  onSend,
  className = '',
}) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonUrl, setButtonUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSend || !to || !subject || !content) return;

    setIsLoading(true);
    try {
      const emailHtml = await render(
        <EmailTemplate
          subject={subject}
          content={content}
          recipientName={recipientName || undefined}
          buttonText={buttonText || undefined}
          buttonUrl={buttonUrl || undefined}
        />
      );

      await onSend({
        to: to.split(',').map(email => email.trim()),
        subject,
        html: emailHtml,
        text: content,
      });

      // Reset form
      setTo('');
      setSubject('');
      setContent('');
      setRecipientName('');
      setButtonText('');
      setButtonUrl('');
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-gray-900 border border-red-900/30 rounded-lg shadow-2xl p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-6">
        Compose Email
      </h2>
      
      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-300 mb-2">
            To (Paymail, Cashhandle, or Email)
          </label>
          <PaymailInput
            value={to}
            onChange={setTo}
            multiple={true}
            placeholder="satoshi@handcash.io, $alice, bob@moneybutton.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-800 text-white"
            placeholder="Email subject"
            required
          />
        </div>

        <div>
          <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recipient Name (optional)
          </label>
          <input
            type="text"
            id="recipientName"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-800 text-white"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-800 text-white"
            placeholder="Your message here..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Button Text (optional)
            </label>
            <input
              type="text"
              id="buttonText"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-800 text-white"
              placeholder="Click Here"
            />
          </div>

          <div>
            <label htmlFor="buttonUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Button URL (optional)
            </label>
            <input
              type="url"
              id="buttonUrl"
              value={buttonUrl}
              onChange={(e) => setButtonUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-800 text-white"
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Cost Counter */}
        <div className="pt-4 border-t border-gray-700 dark:border-gray-600">
          <EmailCostCounter
            content={content}
            recipientCount={to.split(',').filter(e => e.trim()).length}
            onCostChange={setEstimatedCost}
            className="text-gray-400"
          />
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-gray-500">
            Estimated cost: <span className="font-bold text-bitcoin-orange-400">{estimatedCost < 0.01 ? `${(estimatedCost * 100).toFixed(6)}¢` : `$${estimatedCost.toFixed(4)}`}</span>
          </div>
          <button
            type="submit"
            disabled={isLoading || !to || !subject || !content}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : `Send Email (${estimatedCost < 0.01 ? `${(estimatedCost * 100).toFixed(4)}¢` : `$${estimatedCost.toFixed(4)}`})`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailComposer;