'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import HandCashService, { 
  HandCashProfile, 
  HandCashAuthToken, 
  HandCashPayment,
  HandCashTransactionResult 
} from '@/lib/handcash/HandCashService';
import { useEmail } from './EmailContext';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface HandCashContextType {
  // Auth state
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: HandCashProfile | null;
  
  // Auth methods
  login: () => void;
  logout: () => void;
  handleAuthCallback: (code: string) => Promise<void>;
  
  // Payment methods
  sendPayment: (payment: HandCashPayment) => Promise<HandCashTransactionResult | null>;
  createPaymentRequest: (amount: number, description?: string) => Promise<string | null>;
  
  // Email with payment
  sendEmailWithPayment: (
    to: string[],
    subject: string,
    content: string,
    paymentAmount?: number
  ) => Promise<boolean>;
  
  // Data storage
  storeData: (key: string, data: any) => Promise<void>;
  retrieveData: (key: string) => Promise<any>;
  
  // Friends
  getFriends: () => Promise<HandCashProfile[]>;
  
  // Transaction history
  getTransactions: () => Promise<any[]>;
}

const HandCashContext = createContext<HandCashContextType | undefined>(undefined);

export function HandCashProvider({ children }: { children: React.ReactNode }) {
  const [handCashService] = useState(() => new HandCashService());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<HandCashProfile | null>(null);
  
  const router = useRouter();
  const emailContext = useEmail();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check localStorage for saved token
        const savedToken = localStorage.getItem('handcash_token');
        if (savedToken) {
          const token: HandCashAuthToken = JSON.parse(savedToken);
          
          // Check if token is expired
          const tokenExpiry = localStorage.getItem('handcash_token_expiry');
          if (tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
            handCashService.setAuthToken(token);
            
            // Get profile
            const userProfile = await handCashService.getUserProfile();
            setProfile(userProfile);
            setIsAuthenticated(true);
            
            // Initialize email service with HandCash account
            const emailAccount = await handCashService.createEmailAccount();
            await emailContext.initialize(emailAccount);
            
            toast.success(`Welcome back, ${userProfile.handle}!`);
          } else {
            // Token expired, try to refresh
            try {
              const newToken = await handCashService.refreshToken();
              saveToken(newToken);
              
              const userProfile = await handCashService.getUserProfile();
              setProfile(userProfile);
              setIsAuthenticated(true);
              
              // Initialize email service
              const emailAccount = await handCashService.createEmailAccount();
              await emailContext.initialize(emailAccount);
            } catch {
              // Refresh failed, clear session
              clearSession();
            }
          }
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Save token to localStorage
  const saveToken = (token: HandCashAuthToken) => {
    localStorage.setItem('handcash_token', JSON.stringify(token));
    localStorage.setItem(
      'handcash_token_expiry', 
      (Date.now() + token.expiresIn * 1000).toString()
    );
  };

  // Clear session
  const clearSession = () => {
    localStorage.removeItem('handcash_token');
    localStorage.removeItem('handcash_token_expiry');
    setIsAuthenticated(false);
    setProfile(null);
    handCashService.logout();
  };

  // Login
  const login = useCallback(() => {
    const authUrl = handCashService.getAuthUrl();
    window.location.href = authUrl;
  }, [handCashService]);

  // Logout
  const logout = useCallback(() => {
    clearSession();
    toast.success('Logged out successfully');
    router.push('/');
  }, [router]);

  // Handle auth callback
  const handleAuthCallback = useCallback(async (code: string) => {
    try {
      setIsLoading(true);
      
      // Exchange code for token
      const token = await handCashService.exchangeAuthCode(code);
      saveToken(token);
      
      // Get profile
      const userProfile = await handCashService.getUserProfile();
      setProfile(userProfile);
      setIsAuthenticated(true);
      
      // Initialize email service with HandCash account
      const emailAccount = await handCashService.createEmailAccount();
      await emailContext.initialize(emailAccount);
      
      toast.success(`Welcome, ${userProfile.handle}!`);
      router.push('/');
      
    } catch (error) {
      console.error('Authentication failed:', error);
      toast.error('Authentication failed. Please try again.');
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [handCashService, emailContext, router]);

  // Send payment
  const sendPayment = useCallback(async (
    payment: HandCashPayment
  ): Promise<HandCashTransactionResult | null> => {
    if (!isAuthenticated) {
      toast.error('Please login with HandCash first');
      return null;
    }

    try {
      setIsLoading(true);
      const result = await handCashService.sendPayment(payment);
      
      toast.success(
        `Payment sent! Amount: ${payment.amount} ${payment.currencyCode}`
      );
      
      return result;
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handCashService]);

  // Create payment request
  const createPaymentRequest = useCallback(async (
    amount: number,
    description?: string
  ): Promise<string | null> => {
    if (!isAuthenticated) {
      toast.error('Please login with HandCash first');
      return null;
    }

    try {
      const request = await handCashService.createPaymentRequest(
        amount,
        'BSV',
        description
      );
      
      toast.success('Payment request created!');
      return request.paymentRequestUrl;
      
    } catch (error) {
      console.error('Failed to create payment request:', error);
      toast.error('Failed to create payment request');
      return null;
    }
  }, [isAuthenticated, handCashService]);

  // Send email with payment
  const sendEmailWithPayment = useCallback(async (
    to: string[],
    subject: string,
    content: string,
    paymentAmount?: number
  ): Promise<boolean> => {
    if (!isAuthenticated) {
      toast.error('Please login with HandCash first');
      return false;
    }

    try {
      setIsLoading(true);
      
      // Send via HandCash service
      const result = await handCashService.sendEmailWithPayment(
        to,
        subject,
        content,
        paymentAmount,
        'BSV'
      );
      
      if (result.success) {
        // Also send via email service for local storage
        await emailContext.sendEmail({
          to,
          subject,
          content,
          contentType: 'html',
          payment: paymentAmount ? {
            amount: paymentAmount,
            currency: 'BSV',
            txId: result.paymentTxId
          } : undefined,
          blockchain: {
            txId: result.emailTxId || '',
            confirmed: true
          }
        });
        
        toast.success(
          paymentAmount 
            ? `Email sent with ${paymentAmount} BSV payment!`
            : 'Email sent!'
        );
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to send email with payment:', error);
      toast.error('Failed to send email');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handCashService, emailContext]);

  // Store data
  const storeData = useCallback(async (key: string, data: any) => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated');
    }
    
    await handCashService.storeData(key, data, true);
  }, [isAuthenticated, handCashService]);

  // Retrieve data
  const retrieveData = useCallback(async (key: string): Promise<any> => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated');
    }
    
    return await handCashService.retrieveData(key, true);
  }, [isAuthenticated, handCashService]);

  // Get friends
  const getFriends = useCallback(async (): Promise<HandCashProfile[]> => {
    if (!isAuthenticated) {
      return [];
    }
    
    try {
      return await handCashService.getFriends();
    } catch (error) {
      console.error('Failed to get friends:', error);
      return [];
    }
  }, [isAuthenticated, handCashService]);

  // Get transactions
  const getTransactions = useCallback(async (): Promise<any[]> => {
    if (!isAuthenticated) {
      return [];
    }
    
    try {
      return await handCashService.getTransactionHistory();
    } catch (error) {
      console.error('Failed to get transactions:', error);
      return [];
    }
  }, [isAuthenticated, handCashService]);

  const value: HandCashContextType = {
    isAuthenticated,
    isLoading,
    profile,
    login,
    logout,
    handleAuthCallback,
    sendPayment,
    createPaymentRequest,
    sendEmailWithPayment,
    storeData,
    retrieveData,
    getFriends,
    getTransactions
  };

  return (
    <HandCashContext.Provider value={value}>
      {children}
    </HandCashContext.Provider>
  );
}

export function useHandCash() {
  const context = useContext(HandCashContext);
  if (context === undefined) {
    throw new Error('useHandCash must be used within HandCashProvider');
  }
  return context;
}

export default HandCashContext;