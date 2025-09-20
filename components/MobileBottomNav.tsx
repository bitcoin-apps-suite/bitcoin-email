'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './MobileBottomNav.css';

const MobileBottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      path: '/',
      label: 'Email',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    {
      path: '/exchange',
      label: 'Lists',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </svg>
      )
    },
    {
      path: '/tokenize',
      label: 'Tokens',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      )
    },
    {
      path: '/portfolio',
      label: 'Portfolio',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-4zm-6-2h4v2h-4V4zm10 15H4V8h2v2h2V8h8v2h2V8h2v11z"/>
        </svg>
      )
    },
    {
      path: '/contributions',
      label: 'Tasks',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
        </svg>
      )
    }
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`mobile-nav-item ${pathname === item.path ? 'active' : ''}`}
          onClick={() => handleNavClick(item.path)}
          aria-label={item.label}
        >
          <div className="mobile-nav-icon">{item.icon}</div>
          <span className="mobile-nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileBottomNav;