'use client';

import React, { useState } from 'react';
import { PaymailInput } from './PaymailInput';
import { EmailCostCounter } from './EmailCostCounter';
import { PostalStamp } from './PostalStamp';

interface ComposeModalProps {
  onClose: () => void;
}

export function ComposeModal({ onClose }: ComposeModalProps) {
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const [encryptEmail, setEncryptEmail] = useState(true);
  const [storeOnChain, setStoreOnChain] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!to || !subject) {
      alert('Please fill in recipient and subject');
      return;
    }

    setSending(true);
    try {
      // Mock sending for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Sending email:', { to, subject, body, paymentAmount, selectedStamp, encryptEmail, storeOnChain });
      onClose();
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="compose-modal-content">
      {/* Header */}
      <div className="compose-header">
        <div className="compose-header-left">
          <h2>New Message</h2>
          <div className="compose-badges">
            {encryptEmail && <span className="compose-badge encrypted">🔒 Encrypted</span>}
            {storeOnChain && <span className="compose-badge onchain">⛓️ On-Chain</span>}
            {paymentAmount > 0 && <span className="compose-badge payment">💰 ${paymentAmount}</span>}
            {selectedStamp && <span className="compose-badge stamp">📮 Stamped</span>}
          </div>
        </div>
        <div className="compose-header-actions">
          <button className="compose-header-btn" onClick={() => setEncryptEmail(!encryptEmail)}>
            <svg className="w-4 h-4" fill={encryptEmail ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
          <button className="compose-header-btn" onClick={() => setStoreOnChain(!storeOnChain)}>
            <svg className="w-4 h-4" fill={storeOnChain ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="compose-form">
        <div className="compose-from-field">
          <label>From</label>
          <div className="compose-from-display">
            <div className="from-avatar">S</div>
            <span>satoshi@handcash.io</span>
          </div>
        </div>

        <div className="compose-field">
          <label>To</label>
          <div className="compose-field-row">
            <PaymailInput 
              value={to}
              onChange={setTo}
              placeholder="Enter email, paymail, or $handle..."
            />
            <div className="compose-field-toggle">
              <button 
                className={`compose-toggle-btn ${showCc ? 'active' : ''}`}
                onClick={() => setShowCc(!showCc)}
              >
                Cc
              </button>
              <button 
                className={`compose-toggle-btn ${showBcc ? 'active' : ''}`}
                onClick={() => setShowBcc(!showBcc)}
              >
                Bcc
              </button>
            </div>
          </div>
        </div>

        {showCc && (
          <div className="compose-field">
            <label>Cc</label>
            <PaymailInput 
              value={cc}
              onChange={setCc}
              placeholder="Carbon copy recipients..."
            />
          </div>
        )}

        {showBcc && (
          <div className="compose-field">
            <label>Bcc</label>
            <PaymailInput 
              value={bcc}
              onChange={setBcc}
              placeholder="Blind carbon copy recipients..."
            />
          </div>
        )}

        <div className="compose-field">
          <label>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject..."
            className="compose-input"
          />
        </div>

        <PostalStamp
          selectedStamp={selectedStamp}
          onStampSelect={setSelectedStamp}
        />

        <div className="compose-payment-field">
          <label>Additional Payment (Optional)</label>
          <div className="payment-input-row">
            <div className="payment-input-wrapper">
              <span className="payment-currency">$</span>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="payment-input"
              />
            </div>
            <span className="payment-help">Extra payment beyond postal stamp</span>
          </div>
        </div>

        <div className="compose-body-field">
          <label>Message</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message..."
            className="compose-textarea"
          />
          <EmailCostCounter 
            content={body}
            className="compose-cost-counter"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="compose-footer">
        <div className="compose-footer-left">
          <button className="compose-footer-btn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span>Attach</span>
          </button>
          <button className="compose-footer-btn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Image</span>
          </button>
          <button className="compose-footer-btn">
            <span style={{ fontSize: '16px' }}>⏰</span>
            <span>Schedule</span>
          </button>
        </div>

        <div className="compose-footer-right">
          <button className="compose-footer-btn secondary" onClick={onClose}>
            <span>Cancel</span>
          </button>
          <button 
            className="compose-footer-btn primary" 
            onClick={handleSend}
            disabled={sending || !to.trim()}
          >
            {sending ? (
              <>
                <div className="compose-spinner"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}