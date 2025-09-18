import { BlockchainService, BlockchainEmail, EmailMetadata } from '../blockchain/BlockchainService';
import { EmailEncryption, EncryptedEmail } from '../encryption/EmailEncryption';
import { PrivateKey } from '@bsv/sdk';
import CryptoJS from 'crypto-js';

export interface EmailAccount {
  handle: string;
  paymail: string;
  privateKey: string;
  publicKey: string;
  encryptionKey: string;
}

export interface EmailMessage {
  id?: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  content: string;
  contentType: 'text' | 'html';
  attachments?: EmailAttachment[];
  timestamp?: number;
  folder?: 'inbox' | 'sent' | 'drafts' | 'trash' | 'starred';
  read?: boolean;
  starred?: boolean;
  important?: boolean;
  labels?: string[];
  replyTo?: string;
  payment?: {
    amount: number;
    currency: 'BSV' | 'USD';
    txId?: string;
  };
  blockchain?: {
    txId: string;
    blockHeight?: number;
    confirmed: boolean;
  };
}

export interface EmailAttachment {
  name: string;
  type: string;
  size: number;
  data: string; // Base64 encoded
}

export interface EmailFilter {
  folder?: string;
  unread?: boolean;
  starred?: boolean;
  from?: string;
  to?: string;
  subject?: string;
  hasAttachment?: boolean;
  hasPayment?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export class EmailService {
  private blockchainService: BlockchainService;
  private account: EmailAccount | null = null;

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.blockchainService = new BlockchainService(network);
  }

  /**
   * Initialize email service with account
   */
  async initialize(account: EmailAccount): Promise<void> {
    this.account = account;
  }

  /**
   * Send an email with blockchain storage and encryption
   */
  async sendEmail(email: EmailMessage): Promise<{
    success: boolean;
    txId?: string;
    fee?: number;
    error?: string;
  }> {
    try {
      if (!this.account) {
        throw new Error('Email service not initialized');
      }

      // Generate email ID
      email.id = this.generateEmailId();
      email.timestamp = Date.now();
      email.from = this.account.paymail;

      // Get recipient public keys (simplified - would need key lookup service)
      const recipientPublicKeys = await this.lookupRecipientKeys(email.to);

      // Encrypt email
      const encryptedEmail = EmailEncryption.encryptEmail(
        email.subject,
        email.content,
        email.attachments,
        this.account.privateKey,
        recipientPublicKeys
      );

      // Create blockchain email
      const blockchainEmail: BlockchainEmail = {
        metadata: {
          id: email.id,
          from: email.from,
          to: email.to,
          subject: email.subject, // Store encrypted subject hash for searchability
          timestamp: email.timestamp,
          encrypted: true,
          hash: '' // Will be set by blockchain service
        },
        encryptedContent: encryptedEmail.encryptedContent,
        attachmentHashes: email.attachments?.map(a => 
          CryptoJS.SHA256(JSON.stringify(a)).toString()
        )
      };

      // Store on blockchain
      const privateKey = PrivateKey.fromWif(this.account.privateKey);
      const result = await this.blockchainService.storeEmail(blockchainEmail, privateKey);

      // Update email with blockchain info
      email.blockchain = {
        txId: result.txId,
        confirmed: false
      };

      // Store in sent folder (local storage for demo)
      await this.saveToLocalFolder(email, 'sent');

      // If payment attached, process it
      if (email.payment) {
        await this.processPayment(email.payment, email.to, result.txId);
      }

      return {
        success: true,
        txId: result.txId,
        fee: result.fee
      };

    } catch (error) {
      console.error('Failed to send email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email'
      };
    }
  }

  /**
   * Receive emails from blockchain
   */
  async receiveEmails(): Promise<EmailMessage[]> {
    try {
      if (!this.account) {
        throw new Error('Email service not initialized');
      }

      // Get emails from blockchain for this address
      const emailMetadata = await this.blockchainService.searchEmailsByAddress(
        this.account.paymail
      );

      const emails: EmailMessage[] = [];

      for (const metadata of emailMetadata) {
        if (metadata.txId) {
          // Retrieve full email from blockchain
          const blockchainEmail = await this.blockchainService.retrieveEmail(metadata.txId);
          
          if (blockchainEmail) {
            // Decrypt email
            const decryptedEmail = await this.decryptBlockchainEmail(blockchainEmail);
            if (decryptedEmail) {
              emails.push(decryptedEmail);
            }
          }
        }
      }

      // Save to inbox
      for (const email of emails) {
        await this.saveToLocalFolder(email, 'inbox');
      }

      return emails;

    } catch (error) {
      console.error('Failed to receive emails:', error);
      return [];
    }
  }

  /**
   * Get emails from local storage
   */
  async getEmails(filter?: EmailFilter): Promise<EmailMessage[]> {
    // For demo, use localStorage
    const storedEmails = localStorage.getItem('bitcoin_emails');
    if (!storedEmails) return [];

    let emails: EmailMessage[] = JSON.parse(storedEmails);

    // Apply filters
    if (filter) {
      if (filter.folder) {
        emails = emails.filter(e => e.folder === filter.folder);
      }
      if (filter.unread !== undefined) {
        emails = emails.filter(e => !e.read === filter.unread);
      }
      if (filter.starred !== undefined) {
        emails = emails.filter(e => e.starred === filter.starred);
      }
      if (filter.from) {
        emails = emails.filter(e => e.from.includes(filter.from));
      }
      if (filter.subject) {
        emails = emails.filter(e => 
          e.subject.toLowerCase().includes(filter.subject.toLowerCase())
        );
      }
      if (filter.hasPayment !== undefined) {
        emails = emails.filter(e => !!e.payment === filter.hasPayment);
      }
    }

    // Sort by timestamp descending
    emails.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    return emails;
  }

  /**
   * Get email by ID
   */
  async getEmail(id: string): Promise<EmailMessage | null> {
    const emails = await this.getEmails();
    return emails.find(e => e.id === id) || null;
  }

  /**
   * Update email (mark as read, star, move to folder, etc.)
   */
  async updateEmail(id: string, updates: Partial<EmailMessage>): Promise<boolean> {
    try {
      const emails = await this.getEmails();
      const emailIndex = emails.findIndex(e => e.id === id);
      
      if (emailIndex === -1) return false;

      // Apply updates
      emails[emailIndex] = {
        ...emails[emailIndex],
        ...updates
      };

      // Save back to storage
      localStorage.setItem('bitcoin_emails', JSON.stringify(emails));

      return true;
    } catch (error) {
      console.error('Failed to update email:', error);
      return false;
    }
  }

  /**
   * Delete email
   */
  async deleteEmail(id: string, permanent: boolean = false): Promise<boolean> {
    try {
      if (permanent) {
        // Permanent delete
        const emails = await this.getEmails();
        const filtered = emails.filter(e => e.id !== id);
        localStorage.setItem('bitcoin_emails', JSON.stringify(filtered));
      } else {
        // Move to trash
        await this.updateEmail(id, { folder: 'trash' });
      }

      return true;
    } catch (error) {
      console.error('Failed to delete email:', error);
      return false;
    }
  }

  /**
   * Search emails
   */
  async searchEmails(query: string): Promise<EmailMessage[]> {
    const emails = await this.getEmails();
    
    const lowerQuery = query.toLowerCase();
    
    return emails.filter(email => 
      email.subject.toLowerCase().includes(lowerQuery) ||
      email.content.toLowerCase().includes(lowerQuery) ||
      email.from.toLowerCase().includes(lowerQuery) ||
      email.to.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Get email statistics
   */
  async getStatistics(): Promise<{
    total: number;
    unread: number;
    sent: number;
    received: number;
    withPayments: number;
    totalPaymentsReceived: number;
    totalPaymentsSent: number;
  }> {
    const emails = await this.getEmails();
    
    const unread = emails.filter(e => !e.read && e.folder === 'inbox').length;
    const sent = emails.filter(e => e.folder === 'sent').length;
    const received = emails.filter(e => e.folder === 'inbox').length;
    const withPayments = emails.filter(e => e.payment).length;
    
    const paymentsReceived = emails
      .filter(e => e.payment && e.folder === 'inbox')
      .reduce((sum, e) => sum + (e.payment?.amount || 0), 0);
    
    const paymentsSent = emails
      .filter(e => e.payment && e.folder === 'sent')
      .reduce((sum, e) => sum + (e.payment?.amount || 0), 0);

    return {
      total: emails.length,
      unread,
      sent,
      received,
      withPayments,
      totalPaymentsReceived: paymentsReceived,
      totalPaymentsSent: paymentsSent
    };
  }

  /**
   * Private helper methods
   */
  private generateEmailId(): string {
    return `email_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  private async lookupRecipientKeys(recipients: string[]): Promise<string[]> {
    // In production, this would query a key server or paymail endpoint
    // For demo, generate dummy keys
    return recipients.map(r => {
      const seed = CryptoJS.SHA256(r).toString();
      const pk = PrivateKey.fromString(seed);
      return pk.toPublicKey().toHex();
    });
  }

  private async decryptBlockchainEmail(
    blockchainEmail: BlockchainEmail
  ): Promise<EmailMessage | null> {
    try {
      if (!this.account) return null;

      // Create encrypted email object for decryption
      const encryptedEmail: EncryptedEmail = {
        encryptedContent: blockchainEmail.encryptedContent,
        encryptedSubject: blockchainEmail.metadata.subject, // This would be encrypted
        recipientPublicKeys: [], // Would be stored in blockchain
        senderPublicKey: '', // Would be stored in blockchain
        signature: '', // Would be stored in blockchain
        iv: '', // Would be stored in blockchain
        salt: '' // Would be stored in blockchain
      };

      // Decrypt (simplified for demo)
      const decrypted = EmailEncryption.decryptEmail(
        encryptedEmail,
        this.account.privateKey
      );

      return {
        id: blockchainEmail.metadata.id,
        from: blockchainEmail.metadata.from,
        to: blockchainEmail.metadata.to,
        subject: decrypted.subject,
        content: decrypted.content,
        contentType: 'html',
        timestamp: blockchainEmail.metadata.timestamp,
        folder: 'inbox',
        read: false,
        blockchain: {
          txId: blockchainEmail.metadata.txId || '',
          blockHeight: blockchainEmail.metadata.blockHeight,
          confirmed: !!blockchainEmail.metadata.blockHeight
        }
      };

    } catch (error) {
      console.error('Failed to decrypt email:', error);
      return null;
    }
  }

  private async saveToLocalFolder(email: EmailMessage, folder: string): Promise<void> {
    email.folder = folder as any;
    
    const storedEmails = localStorage.getItem('bitcoin_emails');
    const emails: EmailMessage[] = storedEmails ? JSON.parse(storedEmails) : [];
    
    // Check if email already exists
    const existingIndex = emails.findIndex(e => e.id === email.id);
    if (existingIndex >= 0) {
      emails[existingIndex] = email;
    } else {
      emails.push(email);
    }
    
    localStorage.setItem('bitcoin_emails', JSON.stringify(emails));
  }

  private async processPayment(
    payment: EmailMessage['payment'],
    recipients: string[],
    emailTxId: string
  ): Promise<void> {
    // In production, this would create a BSV transaction
    // For demo, we'll just log it
    console.log('Processing payment:', {
      amount: payment?.amount,
      recipients,
      emailTxId
    });
  }

  /**
   * Export emails
   */
  async exportEmails(format: 'json' | 'csv'): Promise<string> {
    const emails = await this.getEmails();
    
    if (format === 'json') {
      return JSON.stringify(emails, null, 2);
    } else {
      // CSV export
      const headers = ['From', 'To', 'Subject', 'Date', 'Folder'];
      const rows = emails.map(e => [
        e.from,
        e.to.join(';'),
        e.subject,
        new Date(e.timestamp || 0).toISOString(),
        e.folder || 'inbox'
      ]);
      
      return [headers, ...rows].map(r => r.join(',')).join('\n');
    }
  }

  /**
   * Import emails
   */
  async importEmails(data: string, format: 'json' | 'csv'): Promise<number> {
    try {
      let emails: EmailMessage[] = [];
      
      if (format === 'json') {
        emails = JSON.parse(data);
      } else {
        // Parse CSV (simplified)
        const lines = data.split('\n');
        const headers = lines[0].split(',');
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          emails.push({
            from: values[0],
            to: values[1].split(';'),
            subject: values[2],
            content: '',
            contentType: 'text',
            timestamp: new Date(values[3]).getTime(),
            folder: values[4] as any
          });
        }
      }
      
      // Save imported emails
      for (const email of emails) {
        email.id = this.generateEmailId();
        await this.saveToLocalFolder(email, email.folder || 'inbox');
      }
      
      return emails.length;
    } catch (error) {
      console.error('Failed to import emails:', error);
      return 0;
    }
  }
}

export default EmailService;