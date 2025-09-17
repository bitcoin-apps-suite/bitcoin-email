import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EmailConnection {
  id: string;
  type: 'handcash' | 'gmail' | 'outlook' | 'proton' | 'icloud';
  email?: string;
  handle?: string;
  displayName?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  avatarUrl?: string;
  publicKey?: string;
}

interface AuthStore {
  connections: EmailConnection[];
  activeConnection: EmailConnection | null;
  
  addConnection: (connection: EmailConnection) => void;
  removeConnection: (id: string) => void;
  setActiveConnection: (connection: EmailConnection) => void;
  updateConnection: (id: string, updates: Partial<EmailConnection>) => void;
  getConnectionById: (id: string) => EmailConnection | undefined;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      connections: [],
      activeConnection: null,
      
      addConnection: (connection) => {
        set((state) => {
          const newConnections = [...state.connections, connection];
          return {
            connections: newConnections,
            activeConnection: state.activeConnection || connection
          };
        });
      },
      
      removeConnection: (id) => {
        set((state) => {
          const newConnections = state.connections.filter(c => c.id !== id);
          const newActiveConnection = state.activeConnection?.id === id 
            ? newConnections[0] || null 
            : state.activeConnection;
          return {
            connections: newConnections,
            activeConnection: newActiveConnection
          };
        });
      },
      
      setActiveConnection: (connection) => {
        set({ activeConnection: connection });
      },
      
      updateConnection: (id, updates) => {
        set((state) => ({
          connections: state.connections.map(c => 
            c.id === id ? { ...c, ...updates } : c
          )
        }));
      },
      
      getConnectionById: (id) => {
        return get().connections.find(c => c.id === id);
      }
    }),
    {
      name: 'bitcoin-email-auth'
    }
  )
);