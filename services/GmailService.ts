import { useAuthStore } from '@/store/authStore';

export class GmailService {
  private clientId: string;
  private redirectUri: string;
  private scope: string;

  constructor() {
    // Use the Google Client ID from .env.local
    this.clientId = '833923457801-3msbifmirrfok54so070gah2gbl9r6u8.apps.googleusercontent.com';
    this.redirectUri = 'http://localhost:3004/auth/callback/google';
    this.scope = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
  }

  async login() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${this.clientId}` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(this.scope)}` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = authUrl;
  }

  async handleCallback(callbackUrl: string): Promise<boolean> {
    try {
      // Parse the callback URL to get the access token
      const url = new URL(callbackUrl);
      let accessToken = null;

      // Check if token is in hash fragment (for implicit flow)
      if (url.hash) {
        const hashParams = new URLSearchParams(url.hash.substring(1));
        accessToken = hashParams.get('access_token');
      }
      
      // Check query params as fallback
      if (!accessToken) {
        const params = new URLSearchParams(url.search);
        accessToken = params.get('access_token');
      }

      if (!accessToken) {
        console.error('No access token found in callback URL');
        return false;
      }

      // Fetch user profile
      const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const profile = await profileResponse.json();

      // Store the access token and user info in localStorage
      localStorage.setItem('gmail_access_token', accessToken);
      localStorage.setItem('gmail_user', JSON.stringify(profile));

      // Add connection to store if available
      if (typeof useAuthStore !== 'undefined') {
        const { addConnection } = useAuthStore.getState();
        
        addConnection({
          id: `gmail-${profile.id}`,
          type: 'gmail',
          email: profile.email,
          displayName: profile.name,
          avatarUrl: profile.picture,
          accessToken: accessToken,
          expiresAt: Date.now() + 3600000 // 1 hour
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to handle Gmail callback:', error);
      return false;
    }
  }

  async fetchEmails(accessToken: string) {
    try {
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }

      const data = await response.json();
      
      // Fetch full message details for each email
      const emails = await Promise.all(
        data.messages.slice(0, 20).map(async (msg: any) => {
          const messageResponse = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );
          return messageResponse.json();
        })
      );

      return this.parseGmailMessages(emails);
    } catch (error) {
      console.error('Failed to fetch Gmail emails:', error);
      throw error;
    }
  }

  private parseGmailMessages(messages: any[]) {
    return messages.map(msg => {
      const headers = msg.payload.headers;
      const getHeader = (name: string) => headers.find((h: any) => h.name === name)?.value || '';
      
      let body = '';
      if (msg.payload.parts) {
        const textPart = msg.payload.parts.find((p: any) => p.mimeType === 'text/plain');
        if (textPart && textPart.body.data) {
          body = atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }
      } else if (msg.payload.body && msg.payload.body.data) {
        body = atob(msg.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      }

      return {
        id: msg.id,
        from: {
          email: getHeader('From'),
          name: getHeader('From').split('<')[0].trim()
        },
        to: [{
          email: getHeader('To'),
          name: getHeader('To').split('<')[0].trim()
        }],
        subject: getHeader('Subject'),
        body: body,
        date: new Date(parseInt(msg.internalDate)),
        read: !msg.labelIds?.includes('UNREAD'),
        starred: msg.labelIds?.includes('STARRED'),
        labels: msg.labelIds || [],
        attachments: [],
        folder: 'inbox',
        connectionId: 'gmail'
      };
    });
  }

  async sendEmail(accessToken: string, to: string, subject: string, body: string) {
    const email = [
      `To: ${to}`,
      `Subject: ${subject}`,
      ``,
      body
    ].join('\n');

    const encodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_');

    try {
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: encodedEmail
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return response.json();
    } catch (error) {
      console.error('Failed to send Gmail:', error);
      throw error;
    }
  }
}