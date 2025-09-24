'use client'

import { useBitcoinOSContext } from './BitcoinOSProvider'
import BitcoinOSNav from './BitcoinOSNav'

export default function ConditionalNav() {
  const { isInOS } = useBitcoinOSContext()

  if (isInOS) {
    return null
  }

  return <BitcoinOSNav />
}