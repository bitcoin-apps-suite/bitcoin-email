'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function GitHubAuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        setStatus('error');
        setErrorMessage(errorDescription || 'GitHub authorization was denied');
        return;
      }

      if (!code) {
        setStatus('error');
        setErrorMessage('No authorization code received from GitHub');
        return;
      }

      try {
        // Exchange code for access token
        const response = await fetch('/api/auth/github', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate with GitHub');
        }

        const data = await response.json();
        
        // Store the access token (you might want to use a more secure method)
        localStorage.setItem('github_token', data.access_token);
        
        setStatus('success');
        
        // Redirect to the main app or dashboard
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (error) {
        console.error('GitHub auth callback error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Authentication failed');
      }
    };

    handleCallback();
  }, [searchParams, router]);

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
        padding: '2rem',
        background: '#141414',
        borderRadius: '12px',
        border: '1px solid #27272a',
        maxWidth: '400px'
      }}>
        {status === 'loading' && (
          <>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid #27272a',
              borderTopColor: '#ef4444',
              borderRadius: '50%',
              margin: '0 auto 1.5rem',
              animation: 'spin 1s linear infinite'
            }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Authenticating with GitHub...</h2>
            <p style={{ color: '#a1a1aa' }}>Please wait while we complete the authentication.</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Authentication Successful!</h2>
            <p style={{ color: '#a1a1aa' }}>Redirecting you to Bitcoin Email...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              borderRadius: '50%',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Authentication Failed</h2>
            <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>{errorMessage}</p>
            <button
              onClick={() => router.push('/')}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Return to Home
            </button>
          </>
        )}
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

export default function GitHubAuthCallback() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#ffffff'
      }}>
        <div>Loading...</div>
      </div>
    }>
      <GitHubAuthCallbackContent />
    </Suspense>
  );
}