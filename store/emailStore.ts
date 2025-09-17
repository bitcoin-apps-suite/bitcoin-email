import { create } from 'zustand';

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: {
    name?: string;
    email: string;
  }[];
  subject: string;
  body: string;
  date: Date;
  read: boolean;
  starred: boolean;
  labels: string[];
  attachments: any[];
  folder: 'inbox' | 'sent' | 'drafts' | 'trash';
  connectionId: string;
}

interface EmailStore {
  emails: Email[];
  loading: boolean;
  error: string | null;
  
  fetchEmails: (folder: string) => Promise<void>;
  sendEmail: (email: Partial<Email>) => Promise<void>;
  markAsRead: (id: string) => void;
  toggleStar: (id: string) => void;
  moveToTrash: (id: string) => void;
  deleteEmail: (id: string) => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  emails: [
    // Demo emails for development
    {
      id: '1',
      from: {
        name: 'Satoshi Nakamoto',
        email: 'satoshi@bitcoin.org',
      },
      to: [{ email: 'user@example.com' }],
      subject: 'Bitcoin: A Peer-to-Peer Electronic Cash System',
      body: 'I\'ve been working on a new electronic cash system that\'s fully peer-to-peer, with no trusted third party...',
      date: new Date('2008-10-31'),
      read: false,
      starred: true,
      labels: ['important'],
      attachments: [],
      folder: 'inbox',
      connectionId: 'demo'
    },
    {
      id: '2',
      from: {
        name: 'HandCash Team',
        email: 'hello@handcash.io',
      },
      to: [{ email: 'user@example.com' }],
      subject: 'Welcome to HandCash Connect!',
      body: 'Your wallet is now connected to Bitcoin Email. You can now send and receive Bitcoin payments directly through email...',
      date: new Date(Date.now() - 86400000),
      read: true,
      starred: false,
      labels: [],
      attachments: [],
      folder: 'inbox',
      connectionId: 'demo'
    },
    {
      id: '3',
      from: {
        name: 'GitHub',
        email: 'noreply@github.com',
      },
      to: [{ email: 'user@example.com' }],
      subject: 'Your Bitcoin Email repository has been starred',
      body: 'Someone just starred your Bitcoin Email repository! Keep up the great work on building the future of decentralized communication...',
      date: new Date(Date.now() - 172800000),
      read: false,
      starred: false,
      labels: ['github'],
      attachments: [],
      folder: 'inbox',
      connectionId: 'demo'
    }
  ],
  loading: false,
  error: null,
  
  fetchEmails: async (folder) => {
    set({ loading: true, error: null });
    
    try {
      // TODO: Implement actual email fetching from connected accounts
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, just filter demo emails by folder
      set((state) => ({
        loading: false,
        emails: state.emails.filter(e => e.folder === folder || folder === 'inbox')
      }));
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
  
  sendEmail: async (email) => {
    set({ loading: true, error: null });
    
    try {
      // TODO: Implement actual email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEmail: Email = {
        id: Date.now().toString(),
        from: {
          name: 'You',
          email: 'user@example.com'
        },
        to: email.to || [],
        subject: email.subject || '',
        body: email.body || '',
        date: new Date(),
        read: true,
        starred: false,
        labels: [],
        attachments: [],
        folder: 'sent',
        connectionId: 'current',
        ...email
      };
      
      set((state) => ({
        loading: false,
        emails: [...state.emails, newEmail]
      }));
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
  
  markAsRead: (id) => {
    set((state) => ({
      emails: state.emails.map(e => 
        e.id === id ? { ...e, read: true } : e
      )
    }));
  },
  
  toggleStar: (id) => {
    set((state) => ({
      emails: state.emails.map(e => 
        e.id === id ? { ...e, starred: !e.starred } : e
      )
    }));
  },
  
  moveToTrash: (id) => {
    set((state) => ({
      emails: state.emails.map(e => 
        e.id === id ? { ...e, folder: 'trash' } : e
      )
    }));
  },
  
  deleteEmail: (id) => {
    set((state) => ({
      emails: state.emails.filter(e => e.id !== id)
    }));
  }
}));