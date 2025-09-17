# Bitcoin Email - Step-by-Step Implementation Plan

## 🎯 Overview
This document provides a detailed, actionable implementation plan for building Bitcoin Email from scratch. Each step includes specific commands, code snippets, and checkpoints.

---

## Phase 1: Project Foundation (Week 1)

### Step 1: Initialize Project Structure

```bash
# Create project with Next.js (following Bitcoin Drive's pattern)
npx create-next-app@latest bitcoin-email --typescript --tailwind --app

# Navigate to project
cd bitcoin-email

# Install core dependencies
npm install @bsv/sdk@1.7.6 \
  crypto-js@4.2.0 \
  axios@1.7.9 \
  react-query@3.39.3 \
  zustand@5.0.2 \
  react-quill@2.0.0 \
  react-hot-toast@2.4.1
```

### Step 2: Project Structure Setup

```bash
# Create directory structure
mkdir -p src/{components,services,hooks,utils,types,styles}
mkdir -p src/components/{auth,email,layout,common,modals}
mkdir -p src/app/{inbox,compose,settings,contacts}
mkdir -p public/{images,icons}
```

### Step 3: Environment Configuration

```bash
# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_HANDCASH_APP_ID=your_handcash_app_id
NEXT_PUBLIC_HANDCASH_APP_SECRET=your_app_secret
NEXT_PUBLIC_HANDCASH_REDIRECT_URL=http://localhost:3000/auth/callback
NEXT_PUBLIC_BSV_NETWORK=mainnet
NEXT_PUBLIC_ENCRYPTION_ENABLED=true
NEXT_PUBLIC_API_URL=http://localhost:3000/api
EOF
```

### Step 4: Configure Tailwind for Red Theme

```javascript
// tailwind.config.ts
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bitcoin-red': {
          50: '#ffebeb',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff4444',
          500: '#ff3333',
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        dark: {
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3a3a3a',
        }
      },
      fontFamily: {
        'display': ['SF Pro Display', 'Helvetica Neue', 'system-ui'],
      }
    }
  }
}
```

### Step 5: Create Base Styles

```css
/* src/styles/globals.css */
:root {
  --color-primary: #ff4444;
  --color-primary-dark: #cc0000;
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --border-color: rgba(255, 255, 255, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'SF Pro Display', -apple-system, sans-serif;
}
```

---

## Phase 2: HandCash Authentication (Week 2)

### Step 6: Create HandCash Service

```typescript
// src/services/HandCashService.ts
import axios from 'axios';

export interface HandCashUser {
  handle: string;
  paymail: string;
  publicKey: string;
  avatarUrl?: string;
  displayName?: string;
}

export class HandCashService {
  private readonly AUTH_URL = 'https://app.handcash.io/auth/authorize';
  private readonly API_BASE = 'https://api.handcash.io';
  private readonly APP_ID = process.env.NEXT_PUBLIC_HANDCASH_APP_ID!;
  private readonly REDIRECT_URL = process.env.NEXT_PUBLIC_HANDCASH_REDIRECT_URL!;

  getAuthUrl(): string {
    const params = new URLSearchParams({
      app_id: this.APP_ID,
      redirect_uri: this.REDIRECT_URL,
      response_type: 'code',
      scope: 'auth.user_info,pay.one_time'
    });
    return `${this.AUTH_URL}?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<{ accessToken: string; user: HandCashUser }> {
    const response = await axios.post(`${this.API_BASE}/auth/token`, {
      app_id: this.APP_ID,
      app_secret: process.env.NEXT_PUBLIC_HANDCASH_APP_SECRET,
      code,
      grant_type: 'authorization_code'
    });

    const accessToken = response.data.access_token;
    const user = await this.getUserInfo(accessToken);
    
    return { accessToken, user };
  }

  async getUserInfo(accessToken: string): Promise<HandCashUser> {
    const response = await axios.get(`${this.API_BASE}/user/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    return {
      handle: response.data.handle,
      paymail: response.data.paymail,
      publicKey: response.data.publicKey,
      avatarUrl: response.data.avatarUrl,
      displayName: response.data.displayName
    };
  }
}
```

### Step 7: Create Auth Store

```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { HandCashUser } from '@/services/HandCashService';

interface AuthState {
  user: HandCashUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: HandCashUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  
  login: (user, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, accessToken: token, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    set({ user: null, accessToken: null, isAuthenticated: false });
  }
}));
```

### Step 8: Create Login Component

```tsx
// src/components/auth/LoginButton.tsx
import { HandCashService } from '@/services/HandCashService';

export function LoginButton() {
  const handcash = new HandCashService();
  
  const handleLogin = () => {
    window.location.href = handcash.getAuthUrl();
  };

  return (
    <button 
      onClick={handleLogin}
      className="px-6 py-3 bg-bitcoin-red-500 hover:bg-bitcoin-red-600 
                 rounded-lg font-medium transition-colors"
    >
      Sign in with HandCash
    </button>
  );
}
```

---

## Phase 3: Core UI Components (Week 3)

### Step 9: Create Layout Components

```tsx
// src/components/layout/Header.tsx
export function Header() {
  return (
    <header className="h-14 bg-dark-200 border-b border-border-color flex items-center px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-medium text-bitcoin-red-400">
          Bitcoin Email
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <UserProfile />
        <NotificationBell />
      </div>
    </header>
  );
}
```

### Step 10: Create Sidebar Navigation

```tsx
// src/components/layout/Sidebar.tsx
const menuItems = [
  { icon: '📥', label: 'Inbox', path: '/inbox', count: 12 },
  { icon: '✏️', label: 'Compose', path: '/compose' },
  { icon: '📤', label: 'Sent', path: '/sent' },
  { icon: '📁', label: 'Drafts', path: '/drafts', count: 3 },
  { icon: '💰', label: 'Payments', path: '/payments' },
  { icon: '⚙️', label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-dark-100 border-r border-border-color h-full">
      <nav className="p-4">
        {menuItems.map(item => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </nav>
    </aside>
  );
}
```

---

## Phase 4: Email Composition (Week 4)

### Step 11: Create Rich Text Editor

```tsx
// src/components/email/EmailComposer.tsx
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function EmailComposer() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachPayment, setAttachPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-dark-200 rounded-lg p-6">
        <input
          type="text"
          placeholder="To: (paymail address)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full bg-dark-300 rounded px-4 py-2 mb-4"
        />
        
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-dark-300 rounded px-4 py-2 mb-4"
        />
        
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          className="bg-dark-300 mb-4 min-h-[300px]"
        />
        
        {attachPayment && <PaymentAttachment />}
        
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setAttachPayment(!attachPayment)}
            className="text-bitcoin-red-400"
          >
            💰 Attach Payment
          </button>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-dark-300 rounded">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-bitcoin-red-500 rounded">
              Send & Hash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 5: Encryption & Blockchain (Week 5-6)

### Step 12: Implement Encryption Service

```typescript
// src/services/EncryptionService.ts
import CryptoJS from 'crypto-js';

export class EncryptionService {
  private encryptionKey: string;

  constructor(userHandle: string, accessToken: string) {
    // Derive encryption key from user data
    const keyData = `${userHandle}_${accessToken.substring(0, 32)}`;
    this.encryptionKey = CryptoJS.SHA256(keyData).toString();
  }

  encryptEmail(email: EmailData): EncryptedEmail {
    const emailString = JSON.stringify(email);
    const encrypted = CryptoJS.AES.encrypt(emailString, this.encryptionKey).toString();
    const hash = CryptoJS.SHA256(emailString).toString();
    
    return {
      encrypted,
      hash,
      timestamp: Date.now(),
      sender: email.from,
      recipient: email.to
    };
  }

  decryptEmail(encryptedData: string): EmailData {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  hashEmail(email: EmailData): string {
    return CryptoJS.SHA256(JSON.stringify(email)).toString();
  }
}
```

### Step 13: Create Blockchain Service

```typescript
// src/services/BlockchainService.ts
import { PrivateKey, PublicKey, Transaction, Script } from '@bsv/sdk';

export class BlockchainService {
  private network = process.env.NEXT_PUBLIC_BSV_NETWORK || 'mainnet';

  async storeEmailHash(hash: string, metadata: EmailMetadata): Promise<string> {
    // Create OP_RETURN transaction with email hash
    const opReturnScript = Script.fromASM(`OP_FALSE OP_RETURN ${Buffer.from(JSON.stringify({
      protocol: 'bitcoin-email',
      version: '1.0',
      hash,
      timestamp: Date.now(),
      sender: metadata.sender,
      recipient: metadata.recipient
    })).toString('hex')}`);

    const tx = new Transaction();
    tx.addOutput({
      script: opReturnScript,
      satoshis: 0
    });

    // Broadcast transaction
    const txid = await this.broadcastTransaction(tx);
    return txid;
  }

  async storeFullEmail(encryptedEmail: string): Promise<string> {
    // Use OP_PUSHDATA4 for larger content
    const script = Script.fromASM(`OP_FALSE OP_RETURN OP_PUSHDATA4 ${Buffer.from(encryptedEmail).toString('hex')}`);
    
    const tx = new Transaction();
    tx.addOutput({
      script,
      satoshis: 0
    });

    return await this.broadcastTransaction(tx);
  }

  private async broadcastTransaction(tx: Transaction): Promise<string> {
    // Implementation would connect to BSV network
    // This is a simplified example
    const response = await fetch(`https://api.whatsonchain.com/v1/bsv/${this.network}/tx/raw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ txhex: tx.toString() })
    });
    
    const result = await response.json();
    return result.txid;
  }
}
```

---

## Phase 6: Payment Integration (Week 7)

### Step 14: Implement Payment Service

```typescript
// src/services/PaymentService.ts
export class PaymentService {
  constructor(private accessToken: string) {}

  async attachPayment(amount: number, currency: string = 'USD'): Promise<PaymentData> {
    // Convert to satoshis
    const satoshis = await this.convertToSatoshis(amount, currency);
    
    return {
      amount: satoshis,
      currency: 'SAT',
      originalAmount: amount,
      originalCurrency: currency,
      timestamp: Date.now()
    };
  }

  async sendPayment(paymail: string, amount: number): Promise<string> {
    // Use HandCash API to send payment
    const response = await fetch('https://api.handcash.io/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        destinations: [{
          paymail,
          amount,
          currency: 'SAT'
        }],
        description: 'Bitcoin Email Payment'
      })
    });

    const result = await response.json();
    return result.transactionId;
  }

  async setInboxPrice(price: number): Promise<void> {
    // Store inbox pricing in user settings
    localStorage.setItem('inboxPrice', price.toString());
  }

  async verifyPayment(txid: string): Promise<boolean> {
    // Verify payment on blockchain
    const response = await fetch(`https://api.whatsonchain.com/v1/bsv/main/tx/${txid}`);
    return response.ok;
  }
}
```

---

## Phase 7: Inbox Management (Week 8)

### Step 15: Create Email List Component

```tsx
// src/components/email/EmailList.tsx
export function EmailList() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  useEffect(() => {
    fetchEmails();
  }, [filter]);

  return (
    <div className="flex-1 bg-dark-100">
      <div className="border-b border-border-color p-4">
        <div className="flex gap-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All Mail
          </FilterButton>
          <FilterButton active={filter === 'paid'} onClick={() => setFilter('paid')}>
            💰 Paid
          </FilterButton>
          <FilterButton active={filter === 'unpaid'} onClick={() => setFilter('unpaid')}>
            Free
          </FilterButton>
        </div>
      </div>
      
      <div className="divide-y divide-border-color">
        {emails.map(email => (
          <EmailItem key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
}
```

### Step 16: Create Email Storage Service

```typescript
// src/services/EmailStorageService.ts
export class EmailStorageService {
  private db: IDBDatabase | null = null;

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('BitcoinEmailDB', 1);
      
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('emails')) {
          const store = db.createObjectStore('emails', { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp');
          store.createIndex('sender', 'sender');
          store.createIndex('txid', 'txid');
        }
      };
    });
  }

  async saveEmail(email: Email): Promise<void> {
    const transaction = this.db!.transaction(['emails'], 'readwrite');
    const store = transaction.objectStore('emails');
    await store.add(email);
  }

  async getEmails(filter?: EmailFilter): Promise<Email[]> {
    const transaction = this.db!.transaction(['emails'], 'readonly');
    const store = transaction.objectStore('emails');
    const emails = await store.getAll();
    
    if (filter) {
      return emails.filter(email => this.matchesFilter(email, filter));
    }
    
    return emails;
  }
}
```

---

## Phase 8: Spam Protection (Week 9)

### Step 17: Implement Micropayment Gate

```typescript
// src/services/SpamProtectionService.ts
export class SpamProtectionService {
  private whitelist: Set<string> = new Set();
  private inboxPrice: number = 0;

  async checkSenderPayment(sender: string, payment?: PaymentData): Promise<boolean> {
    // Check if sender is whitelisted
    if (this.whitelist.has(sender)) {
      return true;
    }

    // Check if payment meets minimum
    if (!payment || payment.amount < this.inboxPrice) {
      return false;
    }

    // Verify payment on blockchain
    const paymentService = new PaymentService();
    return await paymentService.verifyPayment(payment.txid);
  }

  async addToWhitelist(paymail: string): Promise<void> {
    this.whitelist.add(paymail);
    await this.saveWhitelist();
  }

  async setInboxPrice(satoshis: number): Promise<void> {
    this.inboxPrice = satoshis;
    localStorage.setItem('inboxPrice', satoshis.toString());
  }

  async refundSpam(email: Email): Promise<string> {
    if (email.payment) {
      // Process refund
      const paymentService = new PaymentService();
      return await paymentService.sendPayment(
        email.sender,
        email.payment.amount
      );
    }
    return '';
  }
}
```

---

## Phase 9: API Development (Week 10)

### Step 18: Create REST API

```typescript
// src/app/api/emails/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Validate request
  if (!body.to || !body.subject || !body.body) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Encrypt email
  const encryptionService = new EncryptionService(user.handle, accessToken);
  const encrypted = encryptionService.encryptEmail(body);

  // Store on blockchain
  const blockchainService = new BlockchainService();
  const txid = await blockchainService.storeEmailHash(encrypted.hash, {
    sender: body.from,
    recipient: body.to
  });

  // Process payment if attached
  if (body.payment) {
    const paymentService = new PaymentService(accessToken);
    const paymentTxid = await paymentService.sendPayment(body.to, body.payment.amount);
    encrypted.paymentTxid = paymentTxid;
  }

  return NextResponse.json({
    success: true,
    txid,
    hash: encrypted.hash,
    timestamp: encrypted.timestamp
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || 'all';
  
  const storageService = new EmailStorageService();
  await storageService.init();
  const emails = await storageService.getEmails({ type: filter });
  
  return NextResponse.json({ emails });
}
```

---

## Phase 10: SDK & Integration Tools (Week 11-12)

### Step 19: Create JavaScript SDK

```typescript
// sdk/src/BitcoinEmail.ts
export class BitcoinEmail {
  private apiUrl: string;
  private apiKey: string;

  constructor(config: BitcoinEmailConfig) {
    this.apiUrl = config.apiUrl || 'https://api.bitcoin-email.com';
    this.apiKey = config.apiKey;
  }

  async send(email: EmailOptions): Promise<EmailResponse> {
    const response = await fetch(`${this.apiUrl}/v1/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    });

    return response.json();
  }

  async getInbox(options?: InboxOptions): Promise<Email[]> {
    const params = new URLSearchParams(options as any);
    const response = await fetch(`${this.apiUrl}/v1/inbox?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    return response.json();
  }

  async attachPayment(amount: number, currency: string = 'USD'): Promise<PaymentData> {
    // Implementation
  }

  async verifyEmail(hash: string): Promise<VerificationResult> {
    // Verify email hash on blockchain
  }
}

// Export for npm package
export default BitcoinEmail;
```

### Step 20: Create Gmail Extension

```javascript
// extensions/gmail/manifest.json
{
  "manifest_version": 3,
  "name": "Bitcoin Email for Gmail",
  "version": "1.0.0",
  "description": "Add paymail and Bitcoin payments to Gmail",
  "permissions": ["activeTab", "storage"],
  "content_scripts": [{
    "matches": ["*://mail.google.com/*"],
    "js": ["content.js"]
  }],
  "background": {
    "service_worker": "background.js"
  }
}
```

```javascript
// extensions/gmail/content.js
// Inject Bitcoin Email features into Gmail
(function() {
  // Add payment button to compose window
  const addPaymentButton = () => {
    const toolbar = document.querySelector('.btC');
    if (toolbar && !document.querySelector('.bitcoin-email-button')) {
      const button = document.createElement('div');
      button.className = 'bitcoin-email-button';
      button.innerHTML = '💰 Attach BSV';
      button.onclick = openPaymentModal;
      toolbar.appendChild(button);
    }
  };

  // Monitor for compose windows
  const observer = new MutationObserver(addPaymentButton);
  observer.observe(document.body, { childList: true, subtree: true });
})();
```

---

## Testing & Deployment Checklist

### Development Testing
- [ ] Unit tests for all services (Jest)
- [ ] Integration tests for API endpoints
- [ ] E2E tests for critical user flows (Playwright)
- [ ] Security audit for encryption/key management
- [ ] Performance testing for blockchain operations

### Pre-Launch
- [ ] SSL certificate configuration
- [ ] Environment variables secured
- [ ] Database backups configured
- [ ] Monitoring and logging setup
- [ ] Rate limiting implemented

### Launch
- [ ] Deploy to production server
- [ ] DNS configuration
- [ ] HandCash app approval
- [ ] Beta user onboarding
- [ ] Support channels active

### Post-Launch
- [ ] Monitor transaction success rates
- [ ] Track user engagement metrics
- [ ] Gather feedback via surveys
- [ ] Address critical bugs
- [ ] Plan feature iterations

---

## Quick Start Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run test suite
npm run lint         # Lint code

# Deployment
npm run deploy       # Deploy to production
npm run migrate      # Run database migrations

# SDK
npm run sdk:build    # Build SDK package
npm run sdk:publish  # Publish to npm
```

## Resource Links

- HandCash API Docs: https://docs.handcash.io
- Bitcoin SV SDK: https://github.com/bitcoin-sv/js-sdk
- Paymail Specification: https://paymail.org
- Project Repository: https://github.com/bitcoin-email/bitcoin-email

---

This implementation plan provides a concrete, step-by-step guide to building Bitcoin Email from the ground up, with all the code snippets and architecture decisions needed to create a production-ready blockchain email client.