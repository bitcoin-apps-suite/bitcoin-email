'use client';

import React, { useState, useRef, useEffect } from 'react';
import './Taskbar.css';

interface DropdownItem {
  label?: string;
  action?: () => void;
  href?: string;
  divider?: boolean;
  shortcut?: string;
  icon?: string;
}

interface DropdownMenu {
  label: string;
  items: DropdownItem[];
}

interface TaskbarUser {
  handle?: string;
  email?: string;
}

interface TaskbarProps {
  isAuthenticated?: boolean;
  currentUser?: TaskbarUser | null;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  isAuthenticated = false, 
  currentUser = null
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showBitcoinSuite, setShowBitcoinSuite] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const bitcoinApps = [
    { name: 'Bitcoin Auth', color: '#ef4444', url: '#' },
    { name: 'Bitcoin Chat', color: '#ff6500', url: '#' },
    { name: 'Bitcoin Domains', color: '#eab308', url: '#' },
    { name: 'Bitcoin Draw', color: '#10b981', url: '#' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Email', color: '#ef4444', url: '#', current: true },
    { name: 'Bitcoin Exchange', color: '#3b82f6', url: '/exchange' },
    { name: 'Bitcoin Music', color: '#8b5cf6', url: '#' },
    { name: 'Bitcoin Paint', color: '#a855f7', url: '#' },
    { name: 'Bitcoin Pics', color: '#ec4899', url: '#' },
    { name: 'Bitcoin Registry', color: '#f43f5e', url: '#' },
    { name: 'Bitcoin Shares', color: '#f43f5e', url: '#' },
    { name: 'Bitcoin Spreadsheets', color: '#3b82f6', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Video', color: '#65a30d', url: '#' },
    { name: 'Bitcoin Wallet', color: '#f59e0b', url: '#' },
    { name: 'Bitcoin Writer', color: '#ff9500', url: 'https://bitcoin-writer.vercel.app' }
  ];

  const menus: DropdownMenu[] = [
    {
      label: 'Bitcoin Email',
      items: [
        { label: 'Home', href: '/', shortcut: '⌘H' },
        { divider: true },
        { label: 'About Bitcoin Email', href: '/docs' },
        { label: 'Preferences...', action: () => console.log('Preferences'), shortcut: '⌘,' },
        { divider: true },
        { label: 'Hide Bitcoin Email', shortcut: '⌥⌘H' },
        { label: 'Hide Others', shortcut: '⌥⇧⌘H' },
        { label: 'Show All' },
        { divider: true },
        { label: 'Quit Bitcoin Email', action: () => console.log('Quit'), shortcut: '⌘Q' }
      ]
    },
    {
      label: 'File',
      items: [
        { label: 'New Email', action: () => console.log('New Email'), shortcut: '⌘N' },
        { label: 'Open...', action: () => console.log('Open'), shortcut: '⌘O' },
        { divider: true },
        { label: 'Save Email', action: () => console.log('Save'), shortcut: '⌘S' },
        { label: 'Save As...', action: () => console.log('Save As'), shortcut: '⇧⌘S' },
        { divider: true },
        { label: 'Import Emails', action: () => console.log('Import') },
        { label: 'Export Mailbox', action: () => console.log('Export') },
        { divider: true },
        { label: 'Print Email', action: () => console.log('Print'), shortcut: '⌘P' }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', action: () => console.log('Undo'), shortcut: '⌘Z' },
        { label: 'Redo', action: () => console.log('Redo'), shortcut: '⇧⌘Z' },
        { divider: true },
        { label: 'Cut', action: () => console.log('Cut'), shortcut: '⌘X' },
        { label: 'Copy', action: () => console.log('Copy'), shortcut: '⌘C' },
        { label: 'Paste', action: () => console.log('Paste'), shortcut: '⌘V' },
        { divider: true },
        { label: 'Select All', action: () => console.log('Select All'), shortcut: '⌘A' },
        { divider: true },
        { label: 'Find', action: () => console.log('Find'), shortcut: '⌘F' },
        { label: 'Find Next', action: () => console.log('Find Next'), shortcut: '⌘G' }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Mail Client', href: '/' },
        { label: 'Lists Exchange', href: '/#exchange' },
        { divider: true },
        { label: 'Show Inbox', action: () => console.log('Show Inbox') },
        { label: 'Show Sent', action: () => console.log('Show Sent') },
        { label: 'Show Drafts', action: () => console.log('Show Drafts') },
        { label: 'Show Trash', action: () => console.log('Show Trash') },
        { divider: true },
        { label: 'Toggle Sidebar', action: () => console.log('Toggle Sidebar'), shortcut: '⌘/' },
        { label: 'Toggle Preview', action: () => console.log('Toggle Preview') },
        { divider: true },
        { label: 'Refresh', action: () => console.log('Refresh'), shortcut: '⌘R' }
      ]
    },
    {
      label: 'Blockchain',
      items: [
        { label: 'Email Lists Exchange', href: '/#exchange' },
        { label: '$BMAIL Token', href: '/token' },
        { divider: true },
        { label: 'Connect Wallet', action: () => console.log('Connect Wallet') },
        { label: 'View Balance', action: () => console.log('View Balance') },
        { divider: true },
        { label: 'Send Bitcoin Email', action: () => console.log('Send Bitcoin Email') },
        { label: 'Encrypt Email', action: () => console.log('Encrypt Email') },
        { divider: true },
        { label: 'Blockchain Explorer', action: () => console.log('Blockchain Explorer') },
        { label: 'Transaction History', action: () => console.log('Transaction History') }
      ]
    },
    {
      label: 'Tools',
      items: [
        { label: 'Tokenize List', href: '/tokenize' },
        { divider: true },
        { label: 'Email Templates', action: () => console.log('Email Templates') },
        { label: 'Signature Manager', action: () => console.log('Signature Manager') },
        { divider: true },
        { label: 'Import Contacts', action: () => console.log('Import Contacts') },
        { label: 'Export Contacts', action: () => console.log('Export Contacts') },
        { divider: true },
        { label: 'Backup Mailbox', action: () => console.log('Backup Mailbox') },
        { label: 'Restore Mailbox', action: () => console.log('Restore Mailbox') }
      ]
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M' },
        { label: 'Zoom' },
        { divider: true },
        { label: 'Bring All to Front' }
      ]
    },
    {
      label: 'Developers',
      items: [
        { label: 'Contributions & Rewards', href: '/contributions' },
        { label: 'Documentation', href: '/docs' },
        { label: 'GitHub Repository', href: 'https://github.com/bitcoin-apps-suite/bitcoin-email' },
        { divider: true },
        { label: 'API Documentation', href: '/docs#api' },
        { label: 'SDK & Libraries', href: '/docs#sdk' },
        { divider: true },
        { label: 'Submit Pull Request', href: 'https://github.com/bitcoin-apps-suite/bitcoin-email/pulls' },
        { label: 'Report Issues', href: 'https://github.com/bitcoin-apps-suite/bitcoin-email/issues' },
        { divider: true },
        { label: 'Token Economics', href: '/contributions#tokenomics' },
        { label: 'Contributor Leaderboard', href: '/contributions#leaderboard' }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Bitcoin Email Help', action: () => console.log('Help') },
        { label: 'Keyboard Shortcuts', action: () => console.log('Shortcuts') },
        { divider: true },
        { label: 'Report Bug', href: 'https://github.com/bitcoin-apps-suite/bitcoin-email/issues/new?template=bug_report.md' },
        { label: 'Feature Request', href: 'https://github.com/bitcoin-apps-suite/bitcoin-email/issues/new?template=feature_request.md' },
        { divider: true },
        { label: 'Contact Support', action: () => console.log('Contact Support') }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setShowBitcoinSuite(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
  };

  const handleItemClick = (item: DropdownItem) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      // Check if it's an internal route
      if (item.href.startsWith('/')) {
        window.location.href = item.href;
      } else {
        window.open(item.href, '_blank');
      }
    }
    setActiveMenu(null);
  };

  return (
    <div className="taskbar" ref={menuRef}>
      <div className="taskbar-left">
        <button
          onClick={() => {
            setShowBitcoinSuite(!showBitcoinSuite);
            setActiveMenu(null);
          }}
          className="bitcoin-logo"
          title="Bitcoin Suite Apps"
          style={{ backgroundColor: showBitcoinSuite ? 'rgba(239, 68, 68, 0.1)' : 'transparent' }}
        >
          <span className="bitcoin-symbol">₿</span>
        </button>
        
        {showBitcoinSuite && (
          <div className="bitcoin-suite-dropdown">
            <div className="bitcoin-suite-header">
              Bitcoin Apps
            </div>
            {bitcoinApps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target={app.url.startsWith('http') ? '_blank' : undefined}
                rel={app.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`bitcoin-app-item ${app.current ? 'current-app' : ''}`}
                onClick={() => setShowBitcoinSuite(false)}
              >
                <span 
                  className="app-bitcoin-symbol"
                  style={{ color: app.color }}
                >
                  ₿
                </span>
                <span className="app-name">
                  {app.name}
                  {app.current && <span className="current-text">(current)</span>}
                </span>
              </a>
            ))}
          </div>
        )}

        <div className="menu-items">
          {menus.map((menu) => (
            <div key={menu.label} className="menu-item">
              {menu.label === 'Bitcoin Email' ? (
                <button
                  className={`menu-button menu-home-link ${activeMenu === menu.label ? 'active' : ''}`}
                  onClick={(e) => {
                    if (activeMenu === menu.label) {
                      e.preventDefault();
                      setActiveMenu(null);
                    } else {
                      window.location.href = '/';
                    }
                  }}
                  onMouseEnter={() => setActiveMenu(menu.label)}
                  title="Click to go home"
                >
                  {menu.label}
                </button>
              ) : (
                <button
                  className={`menu-button ${activeMenu === menu.label ? 'active' : ''}`}
                  onClick={() => handleMenuClick(menu.label)}
                >
                  {menu.label}
                </button>
              )}
              
              {activeMenu === menu.label && (
                <div className="dropdown-menu">
                  {menu.items.map((item, index) => (
                    item.divider ? (
                      <div key={index} className="dropdown-divider" />
                    ) : (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleItemClick(item)}
                      >
                        <span className="item-label">
                          {item.icon && <span style={{ marginRight: '8px' }}>{item.icon}</span>}
                          {item.label}
                        </span>
                        {item.shortcut && (
                          <span className="item-shortcut">{item.shortcut}</span>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="taskbar-right">
        <a 
          href="/token" 
          className="bmail-token-link"
          title="$BMAIL Token"
        >
          <span className="token-text">$BMAIL</span>
        </a>
        <a 
          href="/contributions" 
          className="contributions-link"
          title="Leaderboard & Rewards"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </a>
        <a 
          href="/docs" 
          className="docs-link"
          title="Documentation"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </a>
        <a 
          href="https://github.com/bitcoin-apps-suite/bitcoin-email" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
          title="View on GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <div className="status-area">
          {isAuthenticated ? (
            <>
              <span className="user-info">{currentUser?.handle || 'Connected'}</span>
              <span className="status-indicator connected">●</span>
            </>
          ) : (
            <>
              <span className="user-info">Not Connected</span>
              <span className="status-indicator disconnected">●</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;