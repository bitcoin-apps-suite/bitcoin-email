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

interface TaskbarProps {
  isAuthenticated?: boolean;
  currentUser?: any;
  onLogout?: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  isAuthenticated = false, 
  currentUser = null, 
  onLogout = () => {} 
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
        { label: 'About Bitcoin Email', action: () => console.log('About') },
        { divider: true },
        { label: 'Preferences...', action: () => console.log('Preferences'), shortcut: '⌘,' },
        { divider: true },
        { label: 'Hide Bitcoin Email', shortcut: '⌘H' },
        { label: 'Hide Others', shortcut: '⌥⌘H' },
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
      label: 'Help',
      items: [
        { label: 'Bitcoin Email Help', action: () => console.log('Help') },
        { label: 'Keyboard Shortcuts', action: () => console.log('Shortcuts') },
        { divider: true },
        { label: 'Report Bug', action: () => console.log('Report Bug') },
        { label: 'Feature Request', action: () => console.log('Feature Request') },
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
      window.open(item.href, '_blank');
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
              <button
                className={`menu-button ${activeMenu === menu.label ? 'active' : ''}`}
                onClick={() => handleMenuClick(menu.label)}
              >
                {menu.label}
              </button>
              
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
                        <span className="item-label">{item.label}</span>
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