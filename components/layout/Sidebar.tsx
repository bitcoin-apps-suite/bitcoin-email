'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface MenuItem {
  icon: string;
  label: string;
  path: string;
  count?: number;
}

const menuItems: MenuItem[] = [
  { icon: '📥', label: 'Inbox', path: '/inbox', count: 6 },
  { icon: '✏️', label: 'Compose', path: '/compose' },
  { icon: '📤', label: 'Sent', path: '/sent', count: 23 },
  { icon: '📁', label: 'Drafts', path: '/drafts', count: 2 },
  { icon: '⭐', label: 'Starred', path: '/starred', count: 3 },
  { icon: '🗑️', label: 'Trash', path: '/trash' },
  { icon: '💰', label: 'Payments', path: '/payments', count: 8 },
  { icon: '👥', label: 'Contacts', path: '/contacts' },
  { icon: '⚙️', label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-dark-100 border-r border-border-color h-full transition-all duration-300`}>
      <div className="p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 mb-4 hover:bg-dark-200 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d={collapsed ? "M13 5l7 7-7 7" : "M11 19l-7-7 7-7"} />
          </svg>
        </button>

        <Link
          href="/compose"
          className="w-full flex items-center justify-center gap-2 p-3 mb-4 bg-bitcoin-red-500 hover:bg-bitcoin-red-600 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {!collapsed && <span className="font-medium">New Email</span>}
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center justify-between px-3 py-2 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-dark-200 text-bitcoin-red-400 border-l-2 border-bitcoin-red-400' 
                    : 'hover:bg-dark-200 text-gray-300 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && <span className="text-sm">{item.label}</span>}
                </div>
                {!collapsed && item.count && (
                  <span className="text-xs bg-dark-300 px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="mt-8 p-4 bg-dark-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Storage Used</span>
              <span className="text-xs text-bitcoin-red-400">2.3 GB</span>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-2">
              <div className="bg-bitcoin-red-500 h-2 rounded-full" style={{ width: '46%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">2.3 GB of 5 GB used</p>
          </div>
        )}
      </div>
    </aside>
  );
}