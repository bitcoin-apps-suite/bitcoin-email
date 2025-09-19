'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExchangePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main app with exchange hash
    router.replace('/#exchange');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid #27272a',
          borderTopColor: '#ef4444',
          borderRadius: '50%',
          margin: '0 auto 1.5rem',
          animation: 'spin 1s linear infinite'
        }} />
        <p>Redirecting to Exchange...</p>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}