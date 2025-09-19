'use client';

import React from 'react';

interface GitHubLoginButtonProps {
  redirectUri?: string;
  scope?: string;
  className?: string;
}

export default function GitHubLoginButton({ 
  redirectUri,
  scope = 'read:user user:email',
  className = ''
}: GitHubLoginButtonProps) {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    
    if (!clientId) {
      console.error('GitHub Client ID not configured');
      return;
    }

    // Determine redirect URI based on environment
    const callbackUrl = redirectUri || (
      typeof window !== 'undefined' 
        ? `${window.location.origin}/auth/callback/github`
        : 'http://localhost:3004/auth/callback/github'
    );

    // Construct GitHub OAuth URL
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: callbackUrl,
      scope: scope,
      state: Math.random().toString(36).substring(7), // Random state for security
    });

    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    
    // Redirect to GitHub OAuth
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: '#24292e',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
        ...(className ? {} : { width: '100%', justifyContent: 'center' })
      }}
      onMouseOver={(e) => e.currentTarget.style.background = '#1a1e22'}
      onMouseOut={(e) => e.currentTarget.style.background = '#24292e'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      Continue with GitHub
    </button>
  );
}