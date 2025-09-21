'use client';

import { SessionProvider } from 'next-auth/react';
import { EmailProvider } from '@/contexts/EmailContext';
import { HandCashProvider } from '@/contexts/HandCashContext';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <EmailProvider>
        <HandCashProvider>
          {children}
        </HandCashProvider>
      </EmailProvider>
    </SessionProvider>
  );
}