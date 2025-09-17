import CryptoJS from 'crypto-js';

export interface EmailData {
  id?: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  attachments?: Attachment[];
  payment?: PaymentData;
  timestamp: number;
}

export interface EncryptedEmail {
  encrypted: string;
  hash: string;
  timestamp: number;
  sender: string;
  recipient: string;
  paymentTxid?: string;
}

export interface Attachment {
  name: string;
  type: string;
  size: number;
  data: string; // Base64 encoded
}

export interface PaymentData {
  amount: number;
  currency: string;
  txid?: string;
  timestamp?: number;
}

export interface EmailMetadata {
  sender: string;
  recipient: string;
  subject?: string;
  timestamp: number;
  encrypted: boolean;
  hasPayment: boolean;
  paymentAmount?: number;
}

export class EncryptionService {
  private encryptionKey: string;

  constructor(userHandle: string, accessToken: string) {
    // Derive encryption key from user data
    const keyData = `${userHandle}_${accessToken.substring(0, 32)}`;
    this.encryptionKey = CryptoJS.SHA256(keyData).toString();
  }

  encryptEmail(email: EmailData): EncryptedEmail {
    const emailString = JSON.stringify(email);
    const encrypted = CryptoJS.AES.encrypt(emailString, this.encryptionKey).toString();
    const hash = CryptoJS.SHA256(emailString).toString();
    
    return {
      encrypted,
      hash,
      timestamp: Date.now(),
      sender: email.from,
      recipient: email.to,
      paymentTxid: email.payment?.txid
    };
  }

  decryptEmail(encryptedData: string): EmailData {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Failed to decrypt email:', error);
      throw new Error('Failed to decrypt email - invalid key or corrupted data');
    }
  }

  hashEmail(email: EmailData): string {
    return CryptoJS.SHA256(JSON.stringify(email)).toString();
  }

  encryptAttachment(attachment: Attachment): string {
    const attachmentString = JSON.stringify(attachment);
    return CryptoJS.AES.encrypt(attachmentString, this.encryptionKey).toString();
  }

  decryptAttachment(encryptedAttachment: string): Attachment {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedAttachment, this.encryptionKey);
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Failed to decrypt attachment:', error);
      throw new Error('Failed to decrypt attachment');
    }
  }

  generateEmailId(): string {
    return `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  validatePaymail(paymail: string): boolean {
    // Basic paymail validation
    const paymailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return paymailRegex.test(paymail);
  }

  // Generate a preview of encrypted content (for display without full decryption)
  generateEncryptedPreview(encrypted: string): string {
    // Return first 100 chars of encrypted string as preview
    return encrypted.substring(0, 100) + '...';
  }
}