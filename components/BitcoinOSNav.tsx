'use client'

import { useState, useRef, useEffect } from 'react'
import { Bitcoin, Grid, X } from 'lucide-react'

export default function BitcoinOSNav() {
  const [showAppsMenu, setShowAppsMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const bitcoinApps = [
    { name: 'Bitcoin OS', color: '#000000', url: 'https://bitcoin-os.vercel.app', icon: Grid },
    { name: 'Bitcoin Wallet', color: '#f7931a', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', color: '#ef4444', url: 'https://bitcoin-email.vercel.app', current: true },
    { name: 'Bitcoin Music', color: '#8b5cf6', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', color: '#3b82f6', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Spreadsheet', color: '#10b981', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Calendar', color: '#eab308', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Search', color: '#ec4899', url: 'https://bitcoin-search.vercel.app' },
    { name: 'Bitcoin Shares', color: '#f43f5e', url: 'https://bitcoin-shares.vercel.app' },
    { name: 'Bitcoin Jobs', color: '#f59e0b', url: 'https://bitcoin-jobs.vercel.app' },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAppsMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="fixed top-4 left-4 z-[9999]" ref={menuRef}>
      <button
        onClick={() => setShowAppsMenu(!showAppsMenu)}
        className="bg-black/80 backdrop-blur hover:bg-black/90 rounded-lg p-2 shadow-lg border border-gray-800 transition-all hover:scale-105"
        title="Bitcoin Apps"
      >
        <Bitcoin className="w-5 h-5 text-bitcoin-orange" />
      </button>

      {showAppsMenu && (
        <div className="absolute top-12 left-0 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl min-w-[240px] overflow-hidden">
          <div className="bg-gradient-to-r from-bitcoin-orange to-amber-500 text-white px-3 py-2 flex items-center justify-between">
            <span className="text-sm font-semibold">Bitcoin Apps Suite</span>
            <button 
              onClick={() => setShowAppsMenu(false)}
              className="hover:bg-white/20 rounded p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          
          <div className="p-2 max-h-[400px] overflow-y-auto">
            {bitcoinApps.map((app) => {
              const isOS = app.name === 'Bitcoin OS'
              const Icon = app.icon || Bitcoin
              
              return (
                <a
                  key={app.name}
                  href={app.url}
                  className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded transition-colors ${
                    app.current ? 'bg-gray-800/50 border border-gray-700' : ''
                  } ${isOS ? 'border-b border-gray-700 mb-2 pb-3' : ''}`}
                  title={app.name}
                >
                  <Icon 
                    className="w-4 h-4 flex-shrink-0" 
                    style={{ color: app.color }} 
                  />
                  <span className="text-sm text-white">
                    {app.name}
                    {app.current && <span className="text-xs text-gray-400 ml-2">(current)</span>}
                  </span>
                </a>
              )
            })}
          </div>
          
          <div className="border-t border-gray-700 px-3 py-2">
            <div className="text-xs text-gray-500 text-center">
              THE BITCOIN CORPORATION LTD
            </div>
          </div>
        </div>
      )}
    </div>
  )
}