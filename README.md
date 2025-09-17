# Bitcoin Email 📧

> The world's first open-source, blockchain-powered email client with native Bitcoin payments and end-to-end encryption.

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)
[![Bitcoin SV](https://img.shields.io/badge/Bitcoin-SV-red.svg)](https://bitcoinsv.com/)
[![HandCash](https://img.shields.io/badge/Powered%20by-HandCash-red.svg)](https://handcash.io/)

## 🚀 Overview

Bitcoin Email revolutionizes digital communication by combining the familiarity of email with the power of blockchain technology. Every email is encrypted, hashed, and optionally stored on the Bitcoin SV blockchain, giving users complete ownership of their communications while enabling native payments through the paymail protocol.

## ✨ Key Features

- **🔐 Blockchain Security**: Every email hashed and stored on Bitcoin SV
- **💰 Native Payments**: Send money as easily as sending an email
- **🛡️ Spam Protection**: Charge micropayments to receive emails
- **🔒 End-to-End Encryption**: AES-256 encryption by default
- **👛 HandCash Integration**: Sign in with your Bitcoin wallet
- **📱 Cross-Platform**: Web, mobile, and desktop support
- **🔌 Universal Integration**: Plugins for Gmail, Outlook, and more
- **⚡ Open Source**: MIT licensed for maximum adoption

## 🎯 Why Bitcoin Email?

### For Users
- **Own Your Data**: Your emails, your keys, your control
- **Monetize Your Inbox**: Get paid for your attention
- **Zero Spam**: Economic disincentives eliminate unwanted emails
- **Send Money Instantly**: Attach BSV to any email

### For Developers
- **Open SDK**: Easy integration with any application
- **Paymail Protocol**: Standard for blockchain email
- **REST API**: Simple programmatic access
- **Plugin Architecture**: Extend functionality easily

### For Email Providers
- **Easy Adoption**: Reference implementation and tools
- **Future-Proof**: Blockchain-ready email infrastructure
- **New Revenue Streams**: Transaction fees and premium features
- **User Demand**: Growing market for blockchain features

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│          Bitcoin Email Client           │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐│
│  │Composer │  │  Inbox  │  │Settings ││
│  └─────────┘  └─────────┘  └─────────┘│
│                                         │
├─────────────────────────────────────────┤
│           Encryption Layer              │
│         (AES-256 + SHA-256)            │
├─────────────────────────────────────────┤
│          HandCash Wallet                │
│         (Auth & Payments)               │
├─────────────────────────────────────────┤
│         Bitcoin SV Blockchain           │
│     (Immutable Storage & Verification)  │
└─────────────────────────────────────────┘
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- HandCash account
- Bitcoin SV wallet with small balance for transactions

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bitcoin-email.git

# Navigate to project directory
cd bitcoin-email

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your HandCash app credentials

# Start development server
npm run dev
```

### Configuration

Create a `.env` file with:

```env
REACT_APP_HANDCASH_APP_ID=your_app_id
REACT_APP_HANDCASH_APP_SECRET=your_app_secret
REACT_APP_BSV_NETWORK=mainnet
REACT_APP_ENCRYPTION_ENABLED=true
```

## 🔧 Integration Guide

### For Email Providers

#### Gmail Integration
```javascript
// Install our Chrome extension
// Or use our Gmail API wrapper
import { GmailPaymail } from '@bitcoin-email/gmail-plugin';

const gmail = new GmailPaymail({
  apiKey: 'your_api_key'
});

gmail.enablePaymail();
```

#### Outlook Integration
```javascript
// Install our Outlook add-in
// Or use our Graph API integration
import { OutlookPaymail } from '@bitcoin-email/outlook-addon';

const outlook = new OutlookPaymail({
  clientId: 'your_client_id'
});

outlook.enableBlockchainFeatures();
```

### For Developers

#### SDK Usage
```javascript
import { BitcoinEmail } from '@bitcoin-email/sdk';

// Initialize client
const client = new BitcoinEmail({
  handcashAppId: 'your_app_id'
});

// Send blockchain email with payment
await client.send({
  to: 'user@handcash.io',
  subject: 'Payment for services',
  body: 'Thanks for your work!',
  attachments: [],
  payment: {
    amount: 5.00,
    currency: 'USD'
  }
});
```

#### REST API
```bash
# Send an email
POST /api/v1/emails
{
  "to": "recipient@paymail.com",
  "subject": "Hello from blockchain",
  "body": "This email is immutable!",
  "encrypt": true,
  "storeOnChain": true
}

# Get inbox with micropayment filter
GET /api/v1/inbox?minPayment=0.01
```

## 🎨 Design System

Bitcoin Email follows our suite's design language with a distinctive red theme:

```css
:root {
  --color-primary: #FF4444;     /* Bitcoin Red */
  --color-secondary: #CC0000;   /* Dark Red */
  --color-background: #000000;  /* Pure Black */
  --color-surface: #1a1a1a;     /* Dark Gray */
  --color-text: #FFFFFF;         /* White */
  --color-success: #00FF88;     /* Success Green */
}
```

## 📊 Monetization

### For Users
- **Free Tier**: 100 emails/month
- **Pro**: $9.99/month - Unlimited emails
- **Business**: $29.99/month - Team features

### For Developers
- **API Access**: Pay-per-use or monthly plans
- **SDK**: Free for open-source projects
- **Enterprise**: Custom pricing for large implementations

### Revenue Sharing
- 1% transaction fee on payments
- Split with wallet providers and miners
- Referral program for integrations

## 🗺️ Roadmap

### Phase 1: MVP ✅
- [x] HandCash authentication
- [x] Basic email send/receive
- [x] Encryption implementation
- [x] Payment attachments

### Phase 2: Enhanced Features 🚧
- [ ] Inbox monetization
- [ ] Advanced search
- [ ] Email templates
- [ ] Mobile apps

### Phase 3: Integration 📅
- [ ] Gmail plugin
- [ ] Outlook add-in
- [ ] Apple Mail extension
- [ ] Thunderbird addon

### Phase 4: Scale 🔮
- [ ] Enterprise features
- [ ] AI spam filtering
- [ ] Multi-chain support
- [ ] Decentralized routing

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Fork and clone the repo
git clone https://github.com/yourusername/bitcoin-email.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git commit -m 'Add amazing feature'

# Push to your fork
git push origin feature/amazing-feature

# Open a Pull Request
```

## 📜 Paymail Protocol Extensions

Bitcoin Email extends the paymail protocol with:

```json
{
  "capabilities": {
    "bitcoin-email": "1.0.0",
    "encrypted-mail": true,
    "inbox-pricing": true,
    "attachment-storage": "ipfs",
    "max-attachment-size": 104857600
  }
}
```

## 🔐 Security

- **Encryption**: AES-256-GCM for all emails
- **Key Derivation**: PBKDF2 from HandCash auth
- **Hash Storage**: SHA-256 on blockchain
- **Zero-Knowledge**: Servers never see plaintext
- **Audit Trail**: Immutable blockchain records

## 📚 Documentation

- [User Guide](docs/USER_GUIDE.md)
- [Developer Documentation](docs/DEVELOPER.md)
- [API Reference](docs/API.md)
- [Integration Examples](docs/EXAMPLES.md)
- [Security Whitepaper](docs/SECURITY.md)

## 🌟 Bitcoin Suite

Bitcoin Email is part of the Bitcoin productivity suite:

- **[Bitcoin Writer](https://github.com/bitcoin-writer)** - Blockchain word processor
- **[Bitcoin Drive](https://github.com/bitcoin-drive)** - Decentralized file storage
- **[Bitcoin Spreadsheet](https://github.com/bitcoin-spreadsheet)** - On-chain spreadsheets
- **Bitcoin Email** - Blockchain email client

## 💬 Community & Support

- **Discord**: [Join our server](https://discord.gg/bitcoin-email)
- **Twitter**: [@BitcoinEmail](https://twitter.com/bitcoinemail)
- **Email**: support@bitcoin-email.com
- **GitHub Issues**: [Report bugs](https://github.com/bitcoin-email/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- HandCash team for wallet infrastructure
- Bitcoin SV community for blockchain support
- Our users for feedback and support
- Open source contributors

## ⚠️ Disclaimer

Bitcoin Email is experimental software. While we implement best practices for security and encryption, users should understand the risks of blockchain technology and cryptocurrency transactions. Never share your private keys and always verify transaction details.

---

**Built with ❤️ for the Bitcoin community**

*Making email ownership real, one hash at a time.*