'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import EmailService, { EmailMessage, EmailAccount, EmailFilter } from '@/lib/email/EmailService';
import { EmailEncryption } from '@/lib/encryption/EmailEncryption';
import { toast } from 'react-hot-toast';

interface EmailContextType {
  // Account
  account: EmailAccount | null;
  isAuthenticated: boolean;
  
  // Emails
  emails: EmailMessage[];
  selectedEmail: EmailMessage | null;
  loading: boolean;
  
  // Folders
  currentFolder: string;
  folderCounts: Record<string, number>;
  
  // Actions
  initialize: (account: EmailAccount) => Promise<void>;
  sendEmail: (email: Partial<EmailMessage>) => Promise<boolean>;
  refreshEmails: () => Promise<void>;
  selectEmail: (email: EmailMessage | null) => void;
  updateEmail: (id: string, updates: Partial<EmailMessage>) => Promise<void>;
  deleteEmail: (id: string, permanent?: boolean) => Promise<void>;
  moveToFolder: (id: string, folder: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  toggleStar: (id: string) => Promise<void>;
  searchEmails: (query: string) => Promise<EmailMessage[]>;
  setCurrentFolder: (folder: string) => void;
  
  // Blockchain
  syncWithBlockchain: () => Promise<void>;
  getTransactionStatus: (txId: string) => Promise<boolean>;
  
  // Payments
  attachPayment: (emailId: string, amount: number) => Promise<void>;
  
  // Statistics
  stats: {
    total: number;
    unread: number;
    sent: number;
    received: number;
    withPayments: number;
  };
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [emailService] = useState(() => new EmailService('testnet'));
  const [account, setAccount] = useState<EmailAccount | null>(null);
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [folderCounts, setFolderCounts] = useState<Record<string, number>>({});
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    sent: 0,
    received: 0,
    withPayments: 0
  });

  // Initialize email service with account
  const initialize = useCallback(async (newAccount: EmailAccount) => {
    try {
      setLoading(true);
      
      // Derive encryption keys if not provided
      if (!newAccount.encryptionKey) {
        const keys = EmailEncryption.deriveKeysFromAuth(
          newAccount.handle,
          newAccount.paymail
        );
        newAccount.privateKey = keys.privateKey;
        newAccount.publicKey = keys.publicKey;
        newAccount.encryptionKey = keys.encryptionKey;
      }
      
      await emailService.initialize(newAccount);
      setAccount(newAccount);
      
      // Load initial emails
      await refreshEmails();
      
      toast.success('Email service initialized');
    } catch (error) {
      console.error('Failed to initialize email service:', error);
      toast.error('Failed to initialize email service');
    } finally {
      setLoading(false);
    }
  }, [emailService]);

  // Send email
  const sendEmail = useCallback(async (emailData: Partial<EmailMessage>): Promise<boolean> => {
    if (!account) {
      toast.error('Not authenticated');
      return false;
    }

    try {
      setLoading(true);
      
      const email: EmailMessage = {
        from: account.paymail,
        to: emailData.to || [],
        subject: emailData.subject || '',
        content: emailData.content || '',
        contentType: emailData.contentType || 'html',
        attachments: emailData.attachments,
        payment: emailData.payment,
        ...emailData
      };
      
      const result = await emailService.sendEmail(email);
      
      if (result.success) {
        toast.success(`Email sent! TxID: ${result.txId?.substring(0, 8)}...`);
        await refreshEmails();
        return true;
      } else {
        toast.error(result.error || 'Failed to send email');
        return false;
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Failed to send email');
      return false;
    } finally {
      setLoading(false);
    }
  }, [account, emailService]);

  // Refresh emails from storage
  const refreshEmails = useCallback(async () => {
    try {
      setLoading(true);
      
      const filter: EmailFilter = {
        folder: currentFolder !== 'all' ? currentFolder : undefined
      };
      
      const fetchedEmails = await emailService.getEmails(filter);
      setEmails(fetchedEmails);
      
      // Update folder counts
      const allEmails = await emailService.getEmails();
      const counts: Record<string, number> = {
        inbox: allEmails.filter(e => e.folder === 'inbox').length,
        sent: allEmails.filter(e => e.folder === 'sent').length,
        drafts: allEmails.filter(e => e.folder === 'drafts').length,
        starred: allEmails.filter(e => e.starred).length,
        trash: allEmails.filter(e => e.folder === 'trash').length,
      };
      setFolderCounts(counts);
      
      // Update stats
      const statistics = await emailService.getStatistics();
      setStats({
        total: statistics.total,
        unread: statistics.unread,
        sent: statistics.sent,
        received: statistics.received,
        withPayments: statistics.withPayments
      });
      
    } catch (error) {
      console.error('Failed to refresh emails:', error);
      toast.error('Failed to refresh emails');
    } finally {
      setLoading(false);
    }
  }, [currentFolder, emailService]);

  // Select email
  const selectEmail = useCallback((email: EmailMessage | null) => {
    setSelectedEmail(email);
    
    // Mark as read when selected
    if (email && !email.read) {
      markAsRead(email.id!);
    }
  }, []);

  // Update email
  const updateEmail = useCallback(async (id: string, updates: Partial<EmailMessage>) => {
    try {
      await emailService.updateEmail(id, updates);
      await refreshEmails();
    } catch (error) {
      console.error('Failed to update email:', error);
      toast.error('Failed to update email');
    }
  }, [emailService, refreshEmails]);

  // Delete email
  const deleteEmail = useCallback(async (id: string, permanent: boolean = false) => {
    try {
      await emailService.deleteEmail(id, permanent);
      
      if (selectedEmail?.id === id) {
        setSelectedEmail(null);
      }
      
      await refreshEmails();
      toast.success(permanent ? 'Email permanently deleted' : 'Email moved to trash');
    } catch (error) {
      console.error('Failed to delete email:', error);
      toast.error('Failed to delete email');
    }
  }, [emailService, refreshEmails, selectedEmail]);

  // Move to folder
  const moveToFolder = useCallback(async (id: string, folder: string) => {
    await updateEmail(id, { folder: folder as any });
    toast.success(`Email moved to ${folder}`);
  }, [updateEmail]);

  // Mark as read
  const markAsRead = useCallback(async (id: string) => {
    await updateEmail(id, { read: true });
  }, [updateEmail]);

  // Toggle star
  const toggleStar = useCallback(async (id: string) => {
    const email = emails.find(e => e.id === id);
    if (email) {
      await updateEmail(id, { starred: !email.starred });
    }
  }, [emails, updateEmail]);

  // Search emails
  const searchEmails = useCallback(async (query: string): Promise<EmailMessage[]> => {
    try {
      return await emailService.searchEmails(query);
    } catch (error) {
      console.error('Failed to search emails:', error);
      toast.error('Failed to search emails');
      return [];
    }
  }, [emailService]);

  // Sync with blockchain
  const syncWithBlockchain = useCallback(async () => {
    if (!account) {
      toast.error('Not authenticated');
      return;
    }

    try {
      setLoading(true);
      toast.loading('Syncing with blockchain...');
      
      const newEmails = await emailService.receiveEmails();
      
      if (newEmails.length > 0) {
        toast.success(`Received ${newEmails.length} new emails from blockchain`);
        await refreshEmails();
      } else {
        toast.success('No new emails');
      }
    } catch (error) {
      console.error('Failed to sync with blockchain:', error);
      toast.error('Failed to sync with blockchain');
    } finally {
      setLoading(false);
    }
  }, [account, emailService, refreshEmails]);

  // Get transaction status
  const getTransactionStatus = useCallback(async (txId: string): Promise<boolean> => {
    // Check blockchain for transaction confirmation
    // For demo, return true
    return true;
  }, []);

  // Attach payment to email
  const attachPayment = useCallback(async (emailId: string, amount: number) => {
    await updateEmail(emailId, {
      payment: {
        amount,
        currency: 'BSV'
      }
    });
    toast.success(`Payment of ${amount} BSV attached`);
  }, [updateEmail]);

  // Load emails when folder changes
  useEffect(() => {
    if (account) {
      refreshEmails();
    }
  }, [currentFolder, account]);

  // Load demo data on mount
  useEffect(() => {
    // Check for existing demo data
    const demoEmails = localStorage.getItem('bitcoin_emails_demo');
    if (!demoEmails) {
      // Create demo emails
      const demos: EmailMessage[] = [
        {
          id: 'demo1',
          from: 'satoshi@handcash.io',
          to: ['user@bitcoin.email'],
          subject: 'Welcome to Bitcoin Email!',
          content: '<h2>Welcome!</h2><p>Your blockchain-powered email is ready.</p>',
          contentType: 'html',
          timestamp: Date.now() - 86400000,
          folder: 'inbox',
          read: false,
          starred: true,
          blockchain: {
            txId: 'demo_tx_001',
            confirmed: true
          }
        },
        {
          id: 'demo2',
          from: 'support@bitcoin.email',
          to: ['user@bitcoin.email'],
          subject: 'Getting Started Guide',
          content: 'Learn how to use encrypted email with Bitcoin payments.',
          contentType: 'text',
          timestamp: Date.now() - 172800000,
          folder: 'inbox',
          read: true,
          payment: {
            amount: 0.001,
            currency: 'BSV',
            txId: 'payment_tx_001'
          }
        }
      ];
      
      localStorage.setItem('bitcoin_emails', JSON.stringify(demos));
      localStorage.setItem('bitcoin_emails_demo', 'true');
    }
  }, []);

  const value: EmailContextType = {
    account,
    isAuthenticated: !!account,
    emails,
    selectedEmail,
    loading,
    currentFolder,
    folderCounts,
    initialize,
    sendEmail,
    refreshEmails,
    selectEmail,
    updateEmail,
    deleteEmail,
    moveToFolder,
    markAsRead,
    toggleStar,
    searchEmails,
    setCurrentFolder,
    syncWithBlockchain,
    getTransactionStatus,
    attachPayment,
    stats
  };

  return (
    <EmailContext.Provider value={value}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmail must be used within EmailProvider');
  }
  return context;
}

export default EmailContext;