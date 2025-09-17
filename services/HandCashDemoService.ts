/**
 * HandCash Demo Service
 * Simulates HandCash functionality for development and testing
 * without requiring real HandCash credentials
 */

import { HandCashUser, AuthTokens } from './HandCashService';

export class HandCashDemoService {
  private tokens: AuthTokens | null = null;
  private currentUser: HandCashUser | null = null;
  private mockBalance: number = 10000; // 10,000 satoshis

  constructor() {
    this.restoreSession();
  }

  private restoreSession(): void {
    if (typeof window === 'undefined') return;
    
    const savedTokens = localStorage.getItem('handcash_demo_tokens');
    const savedUser = localStorage.getItem('handcash_demo_user');
    
    if (savedTokens) {
      try {
        this.tokens = JSON.parse(savedTokens);
      } catch (error) {
        console.error('Failed to restore demo tokens:', error);
      }
    }
    
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (error) {
        console.error('Failed to restore demo user:', error);
      }
    }
  }

  private saveSession(): void {
    if (typeof window === 'undefined') return;
    
    if (this.tokens) {
      localStorage.setItem('handcash_demo_tokens', JSON.stringify(this.tokens));
    }
    if (this.currentUser) {
      localStorage.setItem('handcash_demo_user', JSON.stringify(this.currentUser));
    }
  }

  private clearSession(): void {
    if (typeof window === 'undefined') return;
    
    this.tokens = null;
    this.currentUser = null;
    localStorage.removeItem('handcash_demo_tokens');
    localStorage.removeItem('handcash_demo_user');
  }

  public async login(): Promise<void> {
    console.log('🎮 Demo Mode: Simulating HandCash login...');
    
    // Simulate OAuth flow with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock tokens
    this.tokens = {
      accessToken: 'demo_token_' + Math.random().toString(36).substr(2, 9),
      tokenType: 'Bearer',
      expiresIn: 3600
    };
    
    // Create demo user
    const userId = Math.random().toString(36).substr(2, 5);
    this.currentUser = {
      handle: `demo_user_${userId}`,
      paymail: `demo_${userId}@handcash.io`,
      publicKey: 'demo_public_key_' + Math.random().toString(36).substr(2, 20),
      displayName: `Demo User ${userId.toUpperCase()}`,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
    };
    
    this.saveSession();
    
    console.log('✅ Demo login successful:', this.currentUser);
  }

  public async handleCallback(callbackUrl: string): Promise<HandCashUser> {
    console.log('🎮 Demo Mode: Handling mock callback...');
    
    // In demo mode, we just simulate a successful callback
    if (!this.currentUser) {
      await this.login();
    }
    
    return this.currentUser!;
  }

  public async fetchUserProfile(): Promise<HandCashUser> {
    if (!this.currentUser) {
      throw new Error('Demo user not logged in');
    }
    return this.currentUser;
  }

  public async sendPayment(to: string, amount: number, description?: string): Promise<string> {
    if (!this.currentUser) {
      throw new Error('Demo user not authenticated');
    }

    console.log('🎮 Demo Mode: Simulating payment...');
    console.log(`  To: ${to}`);
    console.log(`  Amount: ${amount} satoshis`);
    console.log(`  Description: ${description || 'Bitcoin Email Payment'}`);

    // Simulate balance check
    if (amount > this.mockBalance) {
      throw new Error('Insufficient balance in demo wallet');
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update mock balance
    this.mockBalance -= amount;

    // Generate mock transaction ID
    const txId = 'demo_tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    console.log(`✅ Demo payment successful: ${txId}`);
    console.log(`  New balance: ${this.mockBalance} satoshis`);

    return txId;
  }

  public async getBalance(): Promise<number> {
    return this.mockBalance;
  }

  public logout(): void {
    console.log('🎮 Demo Mode: Logging out...');
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

  public isDemoMode(): boolean {
    return true;
  }
}