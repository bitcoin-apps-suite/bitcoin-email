'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './MobileMenu.css';

interface MobileMenuProps {
  currentPath?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ currentPath = '/' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { path: '/', label: 'Email' },
    { path: '/exchange', label: 'Exchange' },
    { path: '/tokenize', label: 'Tokenize' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contributions', label: 'Contribute' },
    { path: '/docs', label: 'Docs' }
  ];

  const handleMenuClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-trigger"
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
      >
        <div className={`hamburger ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <nav className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-title">
            <span className="bitcoin-text">Bitcoin</span> Email
          </div>
          <button 
            className="mobile-menu-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-menu-content">
          <div className="mobile-menu-section">
            <div className="mobile-menu-section-title">Navigation</div>
            {menuItems.map((item) => (
              <button
                key={item.path}
                className={`mobile-menu-item ${currentPath === item.path ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.path)}
              >
                <span className="mobile-menu-label">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mobile-menu-section">
            <div className="mobile-menu-section-title">Email Actions</div>
            <button className="mobile-menu-item" onClick={() => {
              router.push('/compose');
              setIsOpen(false);
            }}>
              <span className="mobile-menu-label">Compose Email</span>
            </button>
            <button className="mobile-menu-item">
              <span className="mobile-menu-label">Check Inbox</span>
            </button>
            <button className="mobile-menu-item">
              <span className="mobile-menu-label">View Sent</span>
            </button>
          </div>

          <div className="mobile-menu-section">
            <div className="mobile-menu-section-title">Blockchain & Security</div>
            <button className="mobile-menu-item">
              <span className="mobile-menu-label">Connect Wallet</span>
            </button>
            <button className="mobile-menu-item">
              <span className="mobile-menu-label">Encrypt Email</span>
            </button>
            <button className="mobile-menu-item">
              <span className="mobile-menu-label">Send Bitcoin</span>
            </button>
          </div>

          <div className="mobile-menu-section">
            <div className="mobile-menu-section-title">Tools & Help</div>
            <button className="mobile-menu-item">
              <span className="mobile-menu-label">Settings</span>
            </button>
            <a 
              href="https://github.com/bitcoin-apps-suite/bitcoin-email" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mobile-menu-item"
              onClick={() => setIsOpen(false)}
            >
              <span className="mobile-menu-label">GitHub Repository</span>
            </a>
            <button className="mobile-menu-item" onClick={() => {
              router.push('/docs');
              setIsOpen(false);
            }}>
              <span className="mobile-menu-label">Documentation</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;