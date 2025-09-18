import { EmailEncryption } from '../encryption/EmailEncryption';
import { EmailAccount } from '../email/EmailService';

export interface HandCashProfile {
  handle: string;
  paymail: string;
  displayName: string;
  avatarUrl?: string;
  publicKey?: string;
}

export interface HandCashPayment {
  to: string;
  amount: number;
  currencyCode: 'BSV' | 'USD' | 'EUR';
  description?: string;
  attachment?: {
    format: 'json' | 'base64';
    value: any;
  };
}

export interface HandCashTransactionResult {
  transactionId: string;
  rawTransactionHex?: string;
  fee: number;
  participants: {
    handle: string;
    amount: number;
    type: 'sender' | 'receiver';
  }[];
}

export interface HandCashAuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  scope: string[];
}

export class HandCashService {
  private authToken: HandCashAuthToken | null = null;
  private profile: HandCashProfile | null = null;
  private readonly APP_ID = process.env.NEXT_PUBLIC_HANDCASH_APP_ID || '';
  private readonly APP_SECRET = process.env.NEXT_PUBLIC_HANDCASH_APP_SECRET || '';
  private readonly REDIRECT_URL = process.env.NEXT_PUBLIC_HANDCASH_REDIRECT_URL || 'http://localhost:3000/auth/callback';
  private readonly API_BASE = 'https://cloud.handcash.io';
  private readonly CONNECT_API = 'https://connect.handcash.io/v3';

  /**
   * Get OAuth authorization URL
   */
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.APP_ID,
      redirect_uri: this.REDIRECT_URL,
      response_type: 'code',
      scope: 'auth.user_info payments.write data.read data.write friends.read'
    });

    return `https://app.handcash.io/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeAuthCode(code: string): Promise<HandCashAuthToken> {
    try {
      const response = await fetch(`${this.API_BASE}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: this.APP_ID,
          client_secret: this.APP_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.REDIRECT_URL
        })
      });

      if (!response.ok) {
        throw new Error('Failed to exchange auth code');
      }

      const data = await response.json();
      
      this.authToken = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        scope: data.scope?.split(' ') || []
      };

      // Get user profile after authentication
      await this.getUserProfile();

      return this.authToken;
    } catch (error) {
      console.error('HandCash auth error:', error);
      throw error;
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(): Promise<HandCashProfile> {
    if (!this.authToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.CONNECT_API}/profile`, {
        headers: {
          'Authorization': `Bearer ${this.authToken.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get profile');
      }

      const data = await response.json();
      
      this.profile = {
        handle: data.handle,
        paymail: data.paymail,
        displayName: data.displayName || data.handle,
        avatarUrl: data.avatarUrl,
        publicKey: data.publicKey
      };

      return this.profile;
    } catch (error) {
      console.error('Failed to get HandCash profile:', error);
      throw error;
    }
  }

  /**
   * Send payment via HandCash
   */
  async sendPayment(payment: HandCashPayment): Promise<HandCashTransactionResult> {
    if (!this.authToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.CONNECT_API}/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.authToken.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payments: [{
            destination: payment.to,
            amount: payment.amount,
            currencyCode: payment.currencyCode
          }],
          description: payment.description,
          attachment: payment.attachment
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Payment failed');
      }

      const result = await response.json();
      
      return {
        transactionId: result.transactionId,
        rawTransactionHex: result.rawTransactionHex,
        fee: result.totalFee,
        participants: result.participants || []
      };
    } catch (error) {
      console.error('HandCash payment error:', error);
      throw error;
    }
  }

  /**
   * Get payment request for receiving money
   */
  async createPaymentRequest(
    amount: number,
    currencyCode: 'BSV' | 'USD' | 'EUR' = 'BSV',
    description?: string
  ): Promise<{
    paymentRequestId: string;
    paymentRequestUrl: string;
    expiresAt: Date;
  }> {
    if (!this.authToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.CONNECT_API}/payment-requests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.authToken.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          currencyCode,
          description,
          expiresIn: 3600 // 1 hour
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment request');
      }

      const data = await response.json();
      
      return {
        paymentRequestId: data.id,
        paymentRequestUrl: data.url,
        expiresAt: new Date(data.expiresAt)
      };
    } catch (error) {
      console.error('Failed to create payment request:', error);
      throw error;
    }
  }

  /**
   * Get encryption keys from HandCash profile
   */
  async getEncryptionKeys(): Promise<{
    privateKey: string;
    publicKey: string;
    encryptionKey: string;
  }> {
    if (!this.profile) {
      throw new Error('Profile not loaded');
    }

    // Derive encryption keys from HandCash handle and paymail
    const keys = EmailEncryption.deriveKeysFromAuth(
      this.profile.handle,
      this.profile.paymail
    );

    return keys;
  }

  /**
   * Create email account from HandCash profile
   */
  async createEmailAccount(): Promise<EmailAccount> {
    if (!this.profile) {
      throw new Error('Profile not loaded');
    }

    const keys = await this.getEncryptionKeys();

    return {
      handle: this.profile.handle,
      paymail: this.profile.paymail,
      privateKey: keys.privateKey,
      publicKey: keys.publicKey,
      encryptionKey: keys.encryptionKey
    };
  }

  /**
   * Store data on HandCash cloud
   */
  async storeData(key: string, data: any, encrypted: boolean = true): Promise<void> {
    if (!this.authToken) {
      throw new Error('Not authenticated');
    }

    let dataToStore = data;
    
    if (encrypted && this.profile) {
      const keys = await this.getEncryptionKeys();
      // Encrypt data before storing
      dataToStore = EmailEncryption.encryptWithAES(
        JSON.stringify(data),
        keys.encryptionKey,
        this.profile.handle
      );
    }

    try {
      await fetch(`${this.CONNECT_API}/data/${key}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.authToken.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: dataToStore,
          encrypted
        })
      });
    } catch (error) {
      console.error('Failed to store data:', error);
      throw error;
    }
  }

  /**
   * Retrieve data from HandCash cloud
   */
  async retrieveData(key: string, encrypted: boolean = true): Promise<any> {
    if (!this.authToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.CONNECT_API}/data/${key}`, {
        headers: {
          'Authorization': `Bearer ${this.authToken.accessToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to retrieve data');
      }

      const data = await response.json();
      
      if (encrypted && this.profile) {
        const keys = await this.getEncryptionKeys();
        // Decrypt data
        const decrypted = EmailEncryption.decryptWithAES(
          data.value,
          keys.encryptionKey,
          this.profile.handle
        );
        return JSON.parse(decrypted);
      }

      return data.value;
    } catch (error) {
      console.error('Failed to retrieve data:', error);
      throw error;
    }
  }

  /**
   * Get friends list
   */
  async getFriends(): Promise<HandCashProfile[]> {
    if (!this.authToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.CONNECT_API}/friends`, {
        headers: {
          'Authorization': `Bearer ${this.authToken.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get friends');
      }

      const data = await response.json();
      
      return data.friends.map((friend: any) => ({
        handle: friend.handle,
        paymail: friend.paymail,
        displayName: friend.displayName || friend.handle,
        avatarUrl: friend.avatarUrl,
        publicKey: friend.publicKey
      }));
    } catch (error) {
      console.error('Failed to get friends:', error);
      return [];
    }
  }

  /**
   * Send encrypted email with payment
   */
  async sendEmailWithPayment(
    to: string[],
    subject: string,
    content: string,
    paymentAmount?: number,
    currencyCode: 'BSV' | 'USD' = 'BSV'
  ): Promise<{
    emailTxId?: string;
    paymentTxId?: string;
    success: boolean;
  }> {
    try {
      const results: any = {};

      // If payment is included, send it first
      if (paymentAmount && paymentAmount > 0) {
        const payment = await this.sendPayment({
          to: to[0], // Send to first recipient
          amount: paymentAmount,
          currencyCode,
          description: `Email payment: ${subject}`,
          attachment: {
            format: 'json',
            value: {
              type: 'email_payment',
              subject,
              timestamp: Date.now()
            }
          }
        });
        
        results.paymentTxId = payment.transactionId;
      }

      // Store email metadata on HandCash cloud
      const emailData = {
        from: this.profile?.handle,
        to,
        subject,
        content,
        timestamp: Date.now(),
        paymentTxId: results.paymentTxId
      };

      const emailId = `email_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      await this.storeData(emailId, emailData, true);
      
      results.emailTxId = emailId;
      results.success = true;

      return results;
    } catch (error) {
      console.error('Failed to send email with payment:', error);
      return { success: false };
    }
  }

  /**
   * Check if authenticated
   */
  isAuthenticated(): boolean {
    return !!this.authToken && !!this.profile;
  }

  /**
   * Get current profile
   */
  getCurrentProfile(): HandCashProfile | null {
    return this.profile;
  }

  /**
   * Set auth token (for restoring session)
   */
  setAuthToken(token: HandCashAuthToken): void {
    this.authToken = token;
  }

  /**
   * Logout
   */
  logout(): void {
    this.authToken = null;
    this.profile = null;
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<HandCashAuthToken> {
    if (!this.authToken?.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${this.API_BASE}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: this.APP_ID,
          client_secret: this.APP_SECRET,
          refresh_token: this.authToken.refreshToken,
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      
      this.authToken = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || this.authToken.refreshToken,
        expiresIn: data.expires_in,
        scope: data.scope?.split(' ') || this.authToken.scope
      };

      return this.authToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(limit: number = 50): Promise<any[]> {
    if (!this.authToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.CONNECT_API}/transactions?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.authToken.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get transactions');
      }

      const data = await response.json();
      return data.transactions || [];
    } catch (error) {
      console.error('Failed to get transactions:', error);
      return [];
    }
  }
}

export default HandCashService;