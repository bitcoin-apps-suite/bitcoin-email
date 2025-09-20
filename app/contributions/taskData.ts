// Task definitions with SPECIFIC GitHub issues and strict token limits
// Maximum 1% (10M tokens) per task, total 49% (490M tokens) for community

export const GITHUB_REPO = 'https://github.com/bitcoin-apps-suite/bitcoin-email';

export const AVAILABLE_TASKS = {
  major: [
    { 
      id: 'blockchain-storage', 
      title: 'Blockchain Email Storage System', 
      description: 'Implement full BSV blockchain storage for emails with encryption', 
      tokens: 10_000_000, // 1% max
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#1',
      issueUrl: `${GITHUB_REPO}/issues/1`
    },
    { 
      id: 'handcash-integration', 
      title: 'Complete HandCash Wallet Integration', 
      description: 'Full HandCash Connect integration with payment flows', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#2',
      issueUrl: `${GITHUB_REPO}/issues/2`
    },
    { 
      id: 'end-to-end-encryption', 
      title: 'End-to-End Encryption System', 
      description: 'Implement PGP-based E2E encryption for all emails', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#3',
      issueUrl: `${GITHUB_REPO}/issues/3`
    },
    { 
      id: 'mobile-app', 
      title: 'React Native Mobile App', 
      description: 'Full-featured iOS/Android mobile application', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#4',
      issueUrl: `${GITHUB_REPO}/issues/4`
    },
    { 
      id: 'nft-marketplace', 
      title: 'Email List NFT Marketplace', 
      description: 'Complete NFT minting and trading system for email lists', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#5',
      issueUrl: `${GITHUB_REPO}/issues/5`
    },
    { 
      id: 'ai-spam-filter', 
      title: 'AI-Powered Spam Detection', 
      description: 'Machine learning spam filter with blockchain verification', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#6',
      issueUrl: `${GITHUB_REPO}/issues/6`
    },
    { 
      id: 'defi-integration', 
      title: 'DeFi Yield Generation', 
      description: 'Integrate DeFi protocols for email list revenue sharing', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#7',
      issueUrl: `${GITHUB_REPO}/issues/7`
    },
    { 
      id: 'ipfs-attachments', 
      title: 'IPFS Attachment Storage', 
      description: 'Decentralized file storage for email attachments', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#8',
      issueUrl: `${GITHUB_REPO}/issues/8`
    },
    { 
      id: 'desktop-app', 
      title: 'Electron Desktop Application', 
      description: 'Native desktop app for Windows/Mac/Linux', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#9',
      issueUrl: `${GITHUB_REPO}/issues/9`
    },
    { 
      id: 'calendar-integration', 
      title: 'Blockchain Calendar System', 
      description: 'Decentralized calendar with smart contract events', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#10',
      issueUrl: `${GITHUB_REPO}/issues/10`
    },
    { 
      id: 'p2p-messaging', 
      title: 'Peer-to-Peer Messaging', 
      description: 'Direct P2P messaging without central servers', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#11',
      issueUrl: `${GITHUB_REPO}/issues/11`
    },
    { 
      id: 'multi-chain', 
      title: 'Multi-Chain Support', 
      description: 'Support for Ethereum, Polygon, and other chains', 
      tokens: 10_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#12',
      issueUrl: `${GITHUB_REPO}/issues/12`
    }
  ],
  minor: [
    { 
      id: 'dark-mode', 
      title: 'Dark Mode Theme System', 
      description: 'Complete dark mode with theme switching', 
      tokens: 5_000_000, // 0.5%
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#13',
      issueUrl: `${GITHUB_REPO}/issues/13`
    },
    { 
      id: 'search-functionality', 
      title: 'Advanced Search & Filters', 
      description: 'Full-text search with advanced filtering options', 
      tokens: 5_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#14',
      issueUrl: `${GITHUB_REPO}/issues/14`
    },
    { 
      id: 'email-templates', 
      title: 'Email Template Builder', 
      description: 'Drag-and-drop email template creation system', 
      tokens: 5_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#15',
      issueUrl: `${GITHUB_REPO}/issues/15`
    },
    { 
      id: 'contact-management', 
      title: 'Contact Management System', 
      description: 'Full CRM-style contact management', 
      tokens: 5_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#16',
      issueUrl: `${GITHUB_REPO}/issues/16`
    },
    { 
      id: 'analytics-dashboard', 
      title: 'Analytics Dashboard', 
      description: 'Email analytics and engagement tracking', 
      tokens: 5_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#17',
      issueUrl: `${GITHUB_REPO}/issues/17`
    },
    { 
      id: 'api-documentation', 
      title: 'API Documentation Site', 
      description: 'Complete API docs with interactive examples', 
      tokens: 5_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#18',
      issueUrl: `${GITHUB_REPO}/issues/18`
    },
    { 
      id: 'keyboard-shortcuts', 
      title: 'Keyboard Shortcuts System', 
      description: 'Gmail-style keyboard navigation', 
      tokens: 5_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#19',
      issueUrl: `${GITHUB_REPO}/issues/19`
    },
    { 
      id: 'notification-system', 
      title: 'Push Notifications', 
      description: 'Web push and mobile notifications', 
      tokens: 5_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#20',
      issueUrl: `${GITHUB_REPO}/issues/20`
    },
    { 
      id: 'import-export', 
      title: 'Import/Export System', 
      description: 'Bulk email import/export functionality', 
      tokens: 5_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#21',
      issueUrl: `${GITHUB_REPO}/issues/21`
    },
    { 
      id: 'multi-language', 
      title: 'Internationalization (i18n)', 
      description: 'Multi-language support system', 
      tokens: 5_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#22',
      issueUrl: `${GITHUB_REPO}/issues/22`
    }
  ],
  maintenance: [
    { 
      id: 'unit-tests', 
      title: 'Unit Test Coverage (80%)', 
      description: 'Comprehensive unit test suite', 
      tokens: 2_000_000, // 0.2%
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#23',
      issueUrl: `${GITHUB_REPO}/issues/23`
    },
    { 
      id: 'e2e-tests', 
      title: 'E2E Test Suite', 
      description: 'Cypress/Playwright end-to-end tests', 
      tokens: 2_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#24',
      issueUrl: `${GITHUB_REPO}/issues/24`
    },
    { 
      id: 'performance-optimization', 
      title: 'Performance Optimization', 
      description: 'Code splitting and lazy loading', 
      tokens: 2_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#25',
      issueUrl: `${GITHUB_REPO}/issues/25`
    },
    { 
      id: 'accessibility', 
      title: 'WCAG 2.1 Accessibility', 
      description: 'Full accessibility compliance', 
      tokens: 2_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#26',
      issueUrl: `${GITHUB_REPO}/issues/26`
    },
    { 
      id: 'security-audit', 
      title: 'Security Audit & Fixes', 
      description: 'Comprehensive security review', 
      tokens: 2_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#27',
      issueUrl: `${GITHUB_REPO}/issues/27`
    },
    { 
      id: 'docker-setup', 
      title: 'Docker Configuration', 
      description: 'Complete Docker deployment setup', 
      tokens: 2_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#28',
      issueUrl: `${GITHUB_REPO}/issues/28`
    },
    { 
      id: 'ci-cd', 
      title: 'CI/CD Pipeline', 
      description: 'GitHub Actions deployment pipeline', 
      tokens: 2_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#29',
      issueUrl: `${GITHUB_REPO}/issues/29`
    },
    { 
      id: 'error-handling', 
      title: 'Error Handling System', 
      description: 'Comprehensive error boundaries and logging', 
      tokens: 2_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#30',
      issueUrl: `${GITHUB_REPO}/issues/30`
    },
    { 
      id: 'rate-limiting', 
      title: 'Rate Limiting', 
      description: 'API rate limiting and throttling', 
      tokens: 2_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#31',
      issueUrl: `${GITHUB_REPO}/issues/31`
    },
    { 
      id: 'monitoring', 
      title: 'Monitoring & Alerting', 
      description: 'Application monitoring setup', 
      tokens: 2_000_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#32',
      issueUrl: `${GITHUB_REPO}/issues/32`
    }
  ]
};