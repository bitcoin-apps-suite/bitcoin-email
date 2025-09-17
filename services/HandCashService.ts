import axios from 'axios';

export interface HandCashUser {
  handle: string;
  paymail: string;
  publicKey?: string;
  avatarUrl?: string;
  displayName?: string;
}

export interface AuthTokens {
  accessToken: string;
  tokenType?: string;
  expiresIn?: number;
  refreshToken?: string;
}

export class HandCashService {
  private readonly AUTH_URL = 'https://app.handcash.io/#/authorizeApp';
  private readonly API_BASE = 'https://api.handcash.io';
  private readonly APP_ID = process.env.NEXT_PUBLIC_HANDCASH_APP_ID!;
  private readonly APP_SECRET = process.env.NEXT_PUBLIC_HANDCASH_APP_SECRET;
  private readonly REDIRECT_URL = process.env.NEXT_PUBLIC_HANDCASH_REDIRECT_URL!;
  
  private tokens: AuthTokens | null = null;
  private currentUser: HandCashUser | null = null;

  constructor() {
    // Try to restore session from localStorage
    this.restoreSession();
  }

  private restoreSession(): void {
    if (typeof window === 'undefined') return;
    
    const savedTokens = localStorage.getItem('handcash_tokens');
    const savedUser = localStorage.getItem('handcash_user');
    
    if (savedTokens) {
      try {
        this.tokens = JSON.parse(savedTokens);
      } catch (error) {
        console.error('Failed to restore tokens:', error);
      }
    }
    
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (error) {
        console.error('Failed to restore user:', error);
      }
    }
  }

  private saveSession(): void {
    if (typeof window === 'undefined') return;
    
    if (this.tokens) {
      localStorage.setItem('handcash_tokens', JSON.stringify(this.tokens));
      localStorage.setItem('handcash_tokens_saved_at', Date.now().toString());
    }
    if (this.currentUser) {
      localStorage.setItem('handcash_user', JSON.stringify(this.currentUser));
    }
  }

  private clearSession(): void {
    if (typeof window === 'undefined') return;
    
    this.tokens = null;
    this.currentUser = null;
    localStorage.removeItem('handcash_tokens');
    localStorage.removeItem('handcash_tokens_saved_at');
    localStorage.removeItem('handcash_user');
  }

  public getAuthorizationUrl(): string {
    if (!this.APP_ID) {
      throw new Error('HandCash App ID is not configured');
    }
    
    // HandCash OAuth URL format
    const authUrl = `${this.AUTH_URL}?appId=${this.APP_ID}`;
    
    console.log('Generated Auth URL:', authUrl);
    console.log('Redirect URL (configured in HandCash dashboard):', this.REDIRECT_URL);
    
    return authUrl;
  }

  public async login(): Promise<void> {
    try {
      if (!this.APP_ID) {
        console.error('HandCash App ID is not configured!');
        throw new Error('HandCash App ID is not configured. Please check your .env.local file.');
      }
      
      // Clear any existing session
      this.clearSession();
      
      const authUrl = this.getAuthorizationUrl();
      console.log('Redirecting to HandCash for authorization...');
      
      // Redirect to HandCash
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to start OAuth flow:', error);
      throw error;
    }
  }

  public async handleCallback(callbackUrl: string): Promise<HandCashUser> {
    try {
      console.log('Handling HandCash callback...');
      const url = new URL(callbackUrl);
      
      // HandCash returns the authToken in the hash fragment
      let authToken: string | null = null;
      
      // Check hash fragment
      if (url.hash) {
        const hashContent = url.hash.substring(1);
        if (hashContent.includes('=')) {
          const hashParams = new URLSearchParams(hashContent);
          authToken = hashParams.get('authToken') || hashParams.get('token');
        } else if (hashContent.length > 20) {
          authToken = hashContent;
        }
      }
      
      // Check query params as fallback
      if (!authToken) {
        const urlParams = new URLSearchParams(url.search);
        authToken = urlParams.get('authToken') || 
                   urlParams.get('auth_token') ||
                   urlParams.get('token');
      }
      
      // Check for errors
      const urlParams = new URLSearchParams(url.search);
      const hashParams = url.hash ? new URLSearchParams(url.hash.substring(1)) : new URLSearchParams();
      const error = urlParams.get('error') || hashParams.get('error');
      
      if (error) {
        const errorDescription = urlParams.get('error_description') || hashParams.get('error_description');
        throw new Error(`HandCash error: ${error} - ${errorDescription || 'Unknown error'}`);
      }
      
      if (!authToken) {
        throw new Error('No authToken received from HandCash');
      }
      
      // Store the auth token
      this.tokens = {
        accessToken: authToken,
        tokenType: 'Bearer'
      };
      
      // Fetch user profile
      const user = await this.fetchUserProfile();
      this.currentUser = user;
      
      // Save session
      this.saveSession();
      
      return user;
    } catch (error) {
      console.error('Callback handling failed:', error);
      throw error;
    }
  }

  public async fetchUserProfile(): Promise<HandCashUser> {
    if (!this.tokens?.accessToken) {
      throw new Error('No access token available');
    }

    // For now, use a fallback approach since HandCash SDK has issues with Next.js
    // In production, you would call your backend API to fetch the profile
    const tokenHash = this.tokens.accessToken.substring(0, 8).toLowerCase();
    const fallbackHandle = `user_${tokenHash}`;
    
    return {
      handle: fallbackHandle,
      paymail: `${fallbackHandle}@handcash.io`,
      publicKey: this.tokens.accessToken.substring(0, 20),
      displayName: `User ${tokenHash.toUpperCase()}`
    };
  }

  public async sendPayment(to: string, amount: number, description?: string): Promise<string> {
    if (!this.tokens?.accessToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await axios.post(
        'https://api.handcash.io/v3/payments',
        {
          destinations: [{
            paymail: to,
            amount,
            currency: 'SAT'
          }],
          description: description || 'Bitcoin Email Payment'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.tokens.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.transactionId;
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    }
  }

  public logout(): void {
    this.clearSession();
  }

  public isAuthenticated(): boolean {
    return this.tokens !== null && this.currentUser !== null;
  }

  public getCurrentUser(): HandCashUser | null {
    return this.currentUser;
  }

  public getAccessToken(): string | null {
    return this.tokens?.accessToken || null;
  }
}