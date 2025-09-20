#!/bin/bash

# Create GitHub issues for Bitcoin Email development tasks

REPO="bitcoin-apps-suite/bitcoin-email"

echo "Creating Major Feature Issues (10M tokens each)..."

# Issue #1
gh issue create --repo $REPO \
  --title "Blockchain Email Storage System" \
  --body "## 🎯 Task: Blockchain Email Storage System

### 💰 Reward: 10,000,000 \$BMAIL (1% equity)

### 📋 Description
Implement full BSV blockchain storage for emails with encryption.

### ✅ Requirements
- Store email metadata on-chain
- Implement IPFS integration for attachments
- Create encryption/decryption system
- Optimize gas usage and transaction fees
- Create UI for blockchain storage settings
- Add backup and recovery mechanisms

### 🏷 Labels
\`major-feature\` \`10M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "major-feature" --label "10M-tokens" --label "help wanted"

# Issue #2
gh issue create --repo $REPO \
  --title "Complete HandCash Wallet Integration" \
  --body "## 🎯 Task: Complete HandCash Wallet Integration

### 💰 Reward: 10,000,000 \$BMAIL (1% equity)

### 📋 Description
Full HandCash Connect integration with payment flows.

### ✅ Requirements
- OAuth authentication with HandCash
- Send/receive payments functionality
- Balance display in UI
- Transaction history view
- QR code generation/scanning
- Payment notifications

### 🏷 Labels
\`major-feature\` \`10M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "major-feature" --label "10M-tokens" --label "help wanted"

# Issue #3
gh issue create --repo $REPO \
  --title "End-to-End Encryption System" \
  --body "## 🎯 Task: End-to-End Encryption System

### 💰 Reward: 10,000,000 \$BMAIL (1% equity)

### 📋 Description
Implement PGP-based E2E encryption for all emails.

### ✅ Requirements
- Key generation and management
- Encrypt/decrypt UI components
- Key exchange protocol
- Backward compatibility
- Key backup/recovery
- Multi-device support

### 🏷 Labels
\`major-feature\` \`10M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "major-feature" --label "10M-tokens" --label "help wanted"

# Issue #4
gh issue create --repo $REPO \
  --title "React Native Mobile App" \
  --body "## 🎯 Task: React Native Mobile App

### 💰 Reward: 10,000,000 \$BMAIL (1% equity)

### 📋 Description
Full-featured iOS/Android mobile application.

### ✅ Requirements
- React Native setup and configuration
- Push notifications
- Offline support
- App store deployment
- Biometric authentication
- Deep linking support

### 🏷 Labels
\`major-feature\` \`10M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "major-feature" --label "10M-tokens" --label "help wanted"

# Issue #5
gh issue create --repo $REPO \
  --title "Email List NFT Marketplace" \
  --body "## 🎯 Task: Email List NFT Marketplace

### 💰 Reward: 10,000,000 \$BMAIL (1% equity)

### 📋 Description
Complete NFT minting and trading system for email lists.

### ✅ Requirements
- NFT minting smart contracts
- Marketplace UI
- Trading mechanisms
- Royalty system
- List verification
- Ownership transfer

### 🏷 Labels
\`major-feature\` \`10M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "major-feature" --label "10M-tokens" --label "help wanted"

echo "Creating Minor Feature Issues (5M tokens each)..."

# Issue #6
gh issue create --repo $REPO \
  --title "Advanced Search & Filters" \
  --body "## 🎯 Task: Advanced Search & Filters

### 💰 Reward: 5,000,000 \$BMAIL (0.5% equity)

### 📋 Description
Full-text search with advanced filtering options.

### ✅ Requirements
- Elasticsearch/Algolia integration
- Filter UI components
- Search indexing
- Performance optimization
- Search history
- Saved searches

### 🏷 Labels
\`minor-feature\` \`5M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "minor-feature" --label "5M-tokens" --label "help wanted"

# Issue #7
gh issue create --repo $REPO \
  --title "Email Template Builder" \
  --body "## 🎯 Task: Email Template Builder

### 💰 Reward: 5,000,000 \$BMAIL (0.5% equity)

### 📋 Description
Drag-and-drop email template creation system.

### ✅ Requirements
- Visual editor interface
- Template storage system
- Variable/merge tag system
- Template gallery
- Export/import functionality
- Preview mode

### 🏷 Labels
\`minor-feature\` \`5M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "minor-feature" --label "5M-tokens" --label "help wanted"

# Issue #8
gh issue create --repo $REPO \
  --title "Contact Management System" \
  --body "## 🎯 Task: Contact Management System

### 💰 Reward: 5,000,000 \$BMAIL (0.5% equity)

### 📋 Description
Full CRM-style contact management.

### ✅ Requirements
- Contact database
- Import/export contacts
- Tagging and categorization
- Integration with email system
- Contact groups
- Contact sync

### 🏷 Labels
\`minor-feature\` \`5M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "minor-feature" --label "5M-tokens" --label "help wanted"

echo "Creating Maintenance Issues (2M tokens each)..."

# Issue #9
gh issue create --repo $REPO \
  --title "Unit Test Coverage (80%)" \
  --body "## 🎯 Task: Unit Test Coverage (80%)

### 💰 Reward: 2,000,000 \$BMAIL (0.2% equity)

### 📋 Description
Comprehensive unit test suite achieving 80% coverage.

### ✅ Requirements
- Jest/Vitest configuration
- Component tests
- Utility function tests
- Service tests
- 80% minimum coverage
- CI integration

### 🏷 Labels
\`maintenance\` \`2M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "maintenance" --label "2M-tokens" --label "help wanted"

# Issue #10
gh issue create --repo $REPO \
  --title "E2E Test Suite" \
  --body "## 🎯 Task: E2E Test Suite

### 💰 Reward: 2,000,000 \$BMAIL (0.2% equity)

### 📋 Description
Cypress/Playwright end-to-end tests.

### ✅ Requirements
- Critical user path coverage
- CI/CD integration
- Visual regression tests
- Cross-browser testing
- Test documentation
- Parallel execution

### 🏷 Labels
\`maintenance\` \`2M-tokens\` \`help-wanted\`

**To claim this task**: Comment below with your GitHub username and HandCash handle." \
  --label "maintenance" --label "2M-tokens" --label "help wanted"

echo "✅ Issues created successfully!"
echo "View all issues at: https://github.com/bitcoin-apps-suite/bitcoin-email/issues"