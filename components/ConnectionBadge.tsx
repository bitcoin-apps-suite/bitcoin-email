'use client';

import { useState } from 'react';

interface Connection {
  id: string;
  type: 'handcash' | 'gmail' | 'outlook' | 'hotmail' | 'yahoo' | 'other';
  name: string;
  email?: string;
  handle?: string;
  status: 'connected' | 'disconnected' | 'error';
}

interface ConnectionBadgeProps {
  connections: Connection[];
  onOpenModal: () => void;
  className?: string;
}

export function ConnectionBadge({ connections, onOpenModal, className = '' }: ConnectionBadgeProps) {
  const connectedCount = connections.filter(c => c.status === 'connected').length;
  const hasHandCash = connections.some(c => c.type === 'handcash' && c.status === 'connected');
  const hasEmail = connections.some(c => c.type !== 'handcash' && c.status === 'connected');

  const getStatusColor = () => {
    if (connectedCount === 0) return 'disconnected';
    if (hasHandCash && hasEmail) return 'full';
    return 'partial';
  };

  const getStatusText = () => {
    if (connectedCount === 0) return 'Not Connected';
    if (connectedCount === 1) return '1 Connection';
    return `${connectedCount} Connections`;
  };

  const statusColor = getStatusColor();

  return (
    <button
      onClick={onOpenModal}
      className={`connection-badge ${statusColor} ${className}`}
      title="Manage Connections"
    >
      <div className="connection-status-indicator">
        <div className={`status-dot ${statusColor}`} />
        {hasHandCash && (
          <div className="handcash-indicator">
            <span className="handcash-symbol">$</span>
          </div>
        )}
      </div>

      <div className="connection-details">
        <span className="connection-count">{getStatusText()}</span>
        <span className="connection-subtitle">
          {connectedCount === 0 
            ? 'Connect accounts' 
            : hasHandCash && hasEmail 
              ? 'Bitcoin + Email' 
              : hasHandCash 
                ? 'Bitcoin only' 
                : 'Email only'
          }
        </span>
      </div>

      <div className="connection-chevron">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
  );
}