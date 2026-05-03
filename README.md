# bMail — Bitcoin Email 📧 ₿

> **Brand:** bMail · **Token:** `$bMail` · **Repo:** `bitcoin-email` · **App:** [bitcoin-email.vercel.app](https://bitcoin-email.vercel.app)

[![License](https://img.shields.io/badge/license-Open%20BSV-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![BSV](https://img.shields.io/badge/BSV-Blockchain-orange)](https://bitcoinsv.com/)
[![Company](https://img.shields.io/badge/THE%20BITCOIN%20CORPORATION%20LTD-16735102-red)](https://find-and-update.company-information.service.gov.uk/company/16735102)

**bMail is a Gmail-API-compatible email service backed by 1Sat ordinals on Bitcoin SV.** Each message is a tokenised ordinal minted in the user's own wallet. Existing apps coded against the Gmail API run on bMail with a one-line swap via [`@bopen/bmail-googleapis-shim`](./docs/ARCHITECTURE_API_LAYERS.md).

> **Naming convention:** the brand is **bMail**, the GitHub repo is `bitcoin-email`, and the on-chain token is `$bMail`. All three refer to the same product. See [`docs/ARCHITECTURE_API_LAYERS.md`](./docs/ARCHITECTURE_API_LAYERS.md), [`docs/CLIENT_ARCHITECTURE.md`](./docs/CLIENT_ARCHITECTURE.md), and [`docs/openapi/bmail-v1.yaml`](./docs/openapi/bmail-v1.yaml) for the layered architecture.

Built by **The Bitcoin Corporation LTD** (UK Company No. 16735102)  
CEO: Richard Boase | CSO: Spamsom Mo  
*Making Bitcoin Work Again™*

Send emails with micropayments to eliminate spam. Store message hashes on-chain for immutability. Experience the future of email with true digital ownership and censorship resistance.

🌐 **Live Demo**: [https://bitcoin-email.vercel.app](https://bitcoin-email.vercel.app)  
📖 **Documentation**: [https://bitcoin-apps-suite.github.io/bitcoin-email/](https://bitcoin-apps-suite.github.io/bitcoin-email/)

## ✨ Features

### 💰 **Micropayments Anti-Spam System**
- Pay fractions of a cent per email to ensure delivery
- $0.0000001 per character (0.00001 cents)
- Automatic spam prevention through economic incentives

### 🔗 **Blockchain Integration**
- Store email hashes on BSV blockchain for permanent records
- Tamper-proof message verification
- Decentralized architecture with no central point of failure

### 🔒 **Security & Privacy**
- End-to-end encryption for all messages
- Private key management through HandCash
- Zero-knowledge proof capabilities

### 💳 **HandCash Wallet Integration**
- Seamless BSV payments with $handles
- OAuth 2.0 authentication
- Instant micropayments

### 📮 **Digital Postal Stamps**
- Collectible stamps for priority delivery
- Custom stamp marketplace
- Visual flair for your messages

### 📱 **Progressive Web App (PWA)**
- Install as a Chrome app to your dock
- Offline support with service workers
- Native app-like experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- HandCash Developer Account
- Google Cloud Console Account (for OAuth)
- BSV Wallet with small balance for testing

### Installation

```bash
# Clone the repository
git clone https://github.com/bitcoin-apps-suite/bitcoin-email.git
cd bitcoin-email

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your credentials in .env.local
# Add your HandCash App ID, Secret, and Google OAuth credentials

# Run the development server
npm run dev

# Open http://localhost:3004
```

### Environment Variables

Create a `.env.local` file with:

```env
# HandCash OAuth
NEXT_PUBLIC_HANDCASH_APP_ID=your_app_id
HANDCASH_APP_SECRET=your_app_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Service (optional)
EMAIL_FROM=noreply@yourdomain.com
EMAIL_PASSWORD=your_app_password

# BSV Network
BSV_NETWORK=mainnet # or testnet
BSV_PRIVATE_KEY=your_private_key
```

## 📦 Installing as a Chrome App

1. Visit [https://bitcoin-email.vercel.app](https://bitcoin-email.vercel.app) in Chrome
2. Click the install icon in the address bar (or the custom prompt)
3. Click "Install"
4. The app will be added to your dock/Applications

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: BSV SDK, HandCash Connect
- **Styling**: Tailwind CSS, Custom Dark Theme
- **Email**: React Email, Nodemailer
- **PWA**: next-pwa, Service Workers
- **Authentication**: OAuth 2.0 (HandCash & Google)

## 📚 API Documentation

### Send Email with Micropayment
```http
POST /api/email/send
Content-Type: application/json

{
  "to": ["recipient@example.com"],
  "subject": "Hello World",
  "html": "<p>Email content</p>",
  "text": "Plain text content",
  "paymentAmount": 0.00001,
  "encryptEmail": true,
  "storeOnChain": false
}
```

### Retrieve Emails
```http
GET /api/email/receive?limit=20&offset=0&folder=inbox
```

### Store Email Hash on Blockchain
```http
POST /api/blockchain/store
Content-Type: application/json

{
  "emailHash": "sha256_hash_of_email",
  "timestamp": 1234567890,
  "sender": "$handle",
  "recipient": "user@example.com"
}
```

## 🎨 Features Roadmap

- [x] PWA Installation Support
- [x] HandCash OAuth Integration
- [x] Email Cost Calculator
- [x] Dark Theme UI
- [x] Folder Navigation
- [x] Search Functionality
- [ ] Real BSV Micropayments
- [ ] On-Chain Storage
- [ ] Email Encryption
- [ ] Digital Stamp Marketplace
- [ ] Multi-wallet Support
- [ ] IPFS Integration
- [ ] Mobile Apps (iOS/Android)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/bitcoin-apps-suite/bitcoin-email/issues) page to report bugs or request features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bitcoin SV Community
- HandCash Team
- Next.js Team
- All contributors and testers

## 🔗 Links

- **Repository**: [https://github.com/bitcoin-apps-suite/bitcoin-email](https://github.com/bitcoin-apps-suite/bitcoin-email)
- **Documentation**: [https://bitcoin-apps-suite.github.io/bitcoin-email/](https://bitcoin-apps-suite.github.io/bitcoin-email/)
- **Live Demo**: [https://bitcoin-email.vercel.app](https://bitcoin-email.vercel.app)
- **Issues**: [https://github.com/bitcoin-apps-suite/bitcoin-email/issues](https://github.com/bitcoin-apps-suite/bitcoin-email/issues)
- **Bitcoin Apps Suite**: [https://github.com/bitcoin-apps-suite](https://github.com/bitcoin-apps-suite)

---

## 📜 License

This project is licensed under the **Open BSV License v4** - see the [LICENSE](LICENSE) file for details.

Copyright © 2025 The Bitcoin Corporation LTD (UK Company No. 16735102)

### Key License Terms:
- ✅ **Open Source**: Free to use, modify, and distribute
- ✅ **Commercial Use**: Permitted and encouraged
- ✅ **BSV Required**: Must use Bitcoin SV blockchain
- ✅ **Attribution**: Must credit The Bitcoin Corporation LTD
- ❌ **BTC Support**: Not permitted (BTC has been terminated)
- ❌ **Lightning Network**: Deprecated and not supported

## 🏢 About The Bitcoin Corporation LTD

We are the officially registered company working to restore Bitcoin to its original vision. As the legal entity behind Bitcoin's governance, we have:
- Terminated BTC for failure to scale
- Approved BSV as the official Bitcoin implementation  
- Deprecated Lightning Network for chronic underperformance

**Company Mission**: Making Bitcoin work as Satoshi intended - peer-to-peer electronic cash that actually scales.

**Leadership**:
- **CEO**: Richard Boase - Registered director, vision & strategy
- **CSO**: Spamsom Mo - Chief Spam Officer, memes & marketing

## 🤝 Contributing

We welcome contributions! Please ensure all code:
1. Follows the Open BSV License
2. Uses BSV blockchain exclusively
3. Maintains attribution to The Bitcoin Corporation LTD
4. Includes no BTC or Lightning Network support

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

**Built with ❤️ on Bitcoin SV by The Bitcoin Corporation LTD**  
*Making Bitcoin Work Again™*