'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useBitcoinOS } from '../lib/useBitcoinOS'

interface BitcoinOSContextType {
  isInOS: boolean
  config: any
  theme: 'light' | 'dark'
  navigateHome: () => void
  openApp: (appName: string) => void
  showNotification: (title: string, message: string) => void
  setTitle: (title: string) => void
  sendToOS: (type: string, data?: any) => void
}

const BitcoinOSContext = createContext<BitcoinOSContextType | null>(null)

export const useBitcoinOSContext = () => {
  const context = useContext(BitcoinOSContext)
  if (!context) {
    throw new Error('useBitcoinOSContext must be used within a BitcoinOSProvider')
  }
  return context
}

interface BitcoinOSProviderProps {
  children: ReactNode
}

export default function BitcoinOSProvider({ children }: BitcoinOSProviderProps) {
  const bitcoinOS = useBitcoinOS()

  // Set app title when running in Bitcoin OS
  React.useEffect(() => {
    if (bitcoinOS.isInOS) {
      bitcoinOS.setTitle('Bitcoin Email')
    }
  }, [bitcoinOS.isInOS, bitcoinOS.setTitle])

  return (
    <BitcoinOSContext.Provider value={bitcoinOS}>
      {children}
    </BitcoinOSContext.Provider>
  )
}