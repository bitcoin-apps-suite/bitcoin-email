'use client';

import React, { useState, useEffect } from 'react';
import './contributions.css';

interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
  type: string;
}

interface Contributor {
  githubUsername: string;
  avatar?: string;
  commits: number;
  prs: number;
  tier: 'major' | 'minor' | 'maintenance';
  bmailTokens: number;
  rank: number;
}

// Token Economics Configuration - UNIFIED COMMUNITY SYSTEM
const TOKEN_ECONOMICS = {
  totalSupply: 1_000_000_000, // 1 billion $BMAIL tokens
  teamReserve: 0, // No team reserve - we're all one community
  communityPool: 1_000_000_000, // 100% for all contributors - ALL TOKENS AVAILABLE FOR GRANTS
  maxTokensPerTask: null, // No limits - grant-based allocation
  
  // Grant-based system - existing posted amounts maintained
  tiers: {
    major: {
      name: 'Major Grant',
      tokens: 5_000_000, // Keep existing posted amounts
      maxPRs: null, // No limits on number of grants
      description: 'Major features, blockchain integration, platform overhauls',
      examples: ['Blockchain email storage', 'HandCash integration', 'End-to-end encryption', 'Mobile app']
    },
    minor: {
      name: 'Minor Grant', 
      tokens: 2_500_000, // Keep existing posted amounts
      maxPRs: null, // No limits on number of grants
      description: 'New components, enhancements, optimizations',
      examples: ['UI components', 'API endpoints', 'Performance improvements', 'Documentation']
    },
    maintenance: {
      name: 'Maintenance Grant',
      tokens: 1_000_000, // Keep existing posted amounts
      maxPRs: null, // No limits on number of grants
      description: 'Bug fixes, tests, refactoring, dependencies',
      examples: ['Bug fixes', 'Unit tests', 'Code cleanup', 'Dependency updates']
    }
  },
  // Total available: 1B tokens (100%) - all tokens available for contributors
};

// Task definitions with SPECIFIC GitHub issues and token allocations (max 1% = 10M tokens per task)
const AVAILABLE_TASKS = {
  major: [
    { 
      id: 'blockchain-storage', 
      title: 'Blockchain Email Storage System', 
      description: 'Implement full BSV blockchain storage for emails with encryption', 
      tokens: 2_500_000, 
      claimed: false, 
      claimedBy: null, 
      githubIssue: '#1',
      issueUrl: 'https://github.com/bitcoin-apps-suite/bitcoin-email/issues/1'
    },
    { id: 'handcash-integration', title: 'Complete HandCash Wallet Integration', description: 'Full HandCash Connect integration with payment flows', tokens: 2_500_000, claimed: true, claimedBy: 'satoshi_dev', githubIssue: 'TBD' },
    { id: 'end-to-end-encryption', title: 'End-to-End Encryption System', description: 'Implement PGP-based E2E encryption for all emails', tokens: 2_500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'mobile-app', title: 'React Native Mobile App', description: 'Full-featured iOS/Android mobile application', tokens: 2_500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'nft-marketplace', title: 'Email List NFT Marketplace', description: 'Complete NFT minting and trading system for email lists', tokens: 2_500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'ai-spam-filter', title: 'AI-Powered Spam Detection', description: 'Machine learning spam filter with blockchain verification', tokens: 2_500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'defi-integration', title: 'DeFi Yield Generation', description: 'Integrate DeFi protocols for email list revenue sharing', tokens: 2_500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'ipfs-attachments', title: 'IPFS Attachment Storage', description: 'Decentralized file storage for email attachments', tokens: 2_500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'desktop-app', title: 'Electron Desktop Application', description: 'Native desktop app for Windows/Mac/Linux', tokens: 2_500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'calendar-integration', title: 'Blockchain Calendar System', description: 'Decentralized calendar with smart contract events', tokens: 2_500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' }
  ],
  minor: [
    { id: 'dark-mode', title: 'Dark Mode Theme System', description: 'Complete dark mode with theme switching', tokens: 1_250_000, claimed: true, claimedBy: 'alice_dev', githubIssue: 'TBD' },
    { id: 'search-functionality', title: 'Advanced Search & Filters', description: 'Full-text search with advanced filtering options', tokens: 1_250_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'email-templates', title: 'Email Template Builder', description: 'Drag-and-drop email template creation system', tokens: 1_250_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'contact-management', title: 'Contact Management System', description: 'Full CRM-style contact management', tokens: 1_250_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'analytics-dashboard', title: 'Analytics Dashboard', description: 'Email analytics and engagement tracking', tokens: 1_250_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'api-documentation', title: 'API Documentation Site', description: 'Complete API docs with interactive examples', tokens: 1_250_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts System', description: 'Gmail-style keyboard navigation', tokens: 1_250_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'notification-system', title: 'Push Notifications', description: 'Web push and mobile notifications', tokens: 1_250_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'import-export', title: 'Import/Export System', description: 'Bulk email import/export functionality', tokens: 1_250_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'multi-language', title: 'Internationalization (i18n)', description: 'Multi-language support system', tokens: 1_250_000, claimed: false, claimedBy: null, githubIssue: 'TBD' }
  ],
  maintenance: [
    { id: 'unit-tests', title: 'Unit Test Coverage (80%)', description: 'Comprehensive unit test suite', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'e2e-tests', title: 'E2E Test Suite', description: 'Cypress/Playwright end-to-end tests', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'performance-optimization', title: 'Performance Optimization', description: 'Code splitting and lazy loading', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'accessibility', title: 'WCAG 2.1 Accessibility', description: 'Full accessibility compliance', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'security-audit', title: 'Security Audit & Fixes', description: 'Comprehensive security review', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'docker-setup', title: 'Docker Configuration', description: 'Complete Docker deployment setup', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'ci-cd', title: 'CI/CD Pipeline', description: 'GitHub Actions deployment pipeline', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'error-handling', title: 'Error Handling System', description: 'Comprehensive error boundaries and logging', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'rate-limiting', title: 'Rate Limiting', description: 'API rate limiting and throttling', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'monitoring', title: 'Monitoring & Alerting', description: 'Application monitoring setup', tokens: 500_000, claimed: false, claimedBy: null, githubIssue: 'TBD' }
  ]
};

const ContributionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'tokenomics' | 'leaderboard' | 'how-to'>('overview');
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);
  const [prsAllocated, setPrsAllocated] = useState({ major: 3, minor: 8, maintenance: 15 });
  const [tasks, setTasks] = useState(AVAILABLE_TASKS);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  useEffect(() => {
    // Check URL hash on mount and handle navigation
    const hash = window.location.hash.substring(1);
    if (hash === 'leaderboard' || hash === 'tokenomics' || hash === 'how-to' || hash === 'tasks') {
      setActiveTab(hash as any);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.substring(1);
      if (newHash === 'leaderboard' || newHash === 'tokenomics' || newHash === 'how-to' || newHash === 'overview' || newHash === 'tasks') {
        setActiveTab(newHash as any);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (activeTab === 'leaderboard') {
      fetchContributors();
    }
  }, [activeTab]);

  const fetchContributors = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-email/contributors');
      if (!response.ok) throw new Error('Failed to fetch contributors');
      
      const githubContributors: GitHubContributor[] = await response.json();
      
      const transformedContributors: Contributor[] = githubContributors
        .filter(c => c.type === 'User')
        .map((contributor, index) => {
          // Determine tier based on contribution count
          let tier: 'major' | 'minor' | 'maintenance';
          let bmailTokens = 0;
          
          if (contributor.contributions > 50) {
            tier = 'major';
            bmailTokens = TOKEN_ECONOMICS.tiers.major.tokens;
          } else if (contributor.contributions > 20) {
            tier = 'minor';
            bmailTokens = TOKEN_ECONOMICS.tiers.minor.tokens;
          } else {
            tier = 'maintenance';
            bmailTokens = TOKEN_ECONOMICS.tiers.maintenance.tokens;
          }
          
          return {
            githubUsername: contributor.login,
            avatar: contributor.avatar_url,
            commits: contributor.contributions,
            prs: Math.ceil(contributor.contributions / 5), // Estimate PRs
            tier,
            bmailTokens,
            rank: index + 1
          };
        });
      
      setContributors(transformedContributors);
    } catch (err) {
      console.error('Error fetching contributors:', err);
    } finally {
      setLoading(false);
    }
  };

  const tokensAllocated = 
    (prsAllocated.major * TOKEN_ECONOMICS.tiers.major.tokens) +
    (prsAllocated.minor * TOKEN_ECONOMICS.tiers.minor.tokens) +
    (prsAllocated.maintenance * TOKEN_ECONOMICS.tiers.maintenance.tokens);
  
  const tokensRemaining = TOKEN_ECONOMICS.communityPool - tokensAllocated;
  const prsRemaining = 0; // Removed targetPRs reference

  const handleClaimTask = (task: any, tier: string) => {
    setSelectedTask({ ...task, tier });
    setShowClaimModal(true);
  };

  const handleClaimSubmit = (githubUsername: string, handcashHandle: string) => {
    if (!selectedTask) return;
    
    // Update task as claimed
    const updatedTasks = { ...tasks };
    const taskList = updatedTasks[selectedTask.tier as keyof typeof updatedTasks];
    const taskIndex = taskList.findIndex(t => t.id === selectedTask.id);
    
    if (taskIndex !== -1) {
      taskList[taskIndex] = {
        ...taskList[taskIndex],
        claimed: true,
        claimedBy: githubUsername
      };
      setTasks(updatedTasks);
    }
    
    setShowClaimModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="contributions-page">
      <div className="contributions-header">
        <h1>$BMAIL Token Rewards Program</h1>
        <p>Earn tokens by contributing to the world's first blockchain-powered email client</p>
      </div>

      <div className="contributions-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('overview');
            window.location.hash = 'overview';
          }}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('tasks');
            window.location.hash = 'tasks';
          }}
        >
          Tasks
        </button>
        <button 
          className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('leaderboard');
            window.location.hash = 'leaderboard';
          }}
        >
          Leaderboard
        </button>
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('all');
            window.location.hash = 'all';
          }}
        >
          ALL
        </button>
        <button 
          className={`tab ${activeTab === 'grants' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('grants');
            window.location.hash = 'grants';
          }}
        >
          GRANTS
        </button>
        <button 
          className={`tab ${activeTab === 'how-to' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('how-to');
            window.location.hash = 'how-to';
          }}
        >
          How to Contribute
        </button>
      </div>

      <div className="contributions-content">
        {activeTab === 'overview' && (
          <div className="content-section">
            <div className="token-allocation-summary">
              <div className="allocation-card highlight">
                <h3>Community Pool</h3>
                <div className="big-number">{(TOKEN_ECONOMICS.communityPool / 1_000_000).toFixed(0)}M</div>
                <div className="label">$BMAIL Tokens (100%)</div>
              </div>
              <div className="allocation-card">
                <h3>Allocated So Far</h3>
                <div className="big-number">{(tokensAllocated / 1_000_000).toFixed(0)}M</div>
                <div className="label">Across {prsAllocated.major + prsAllocated.minor + prsAllocated.maintenance} PRs</div>
              </div>
              <div className="allocation-card">
                <h3>Remaining</h3>
                <div className="big-number">{(tokensRemaining / 1_000_000).toFixed(0)}M</div>
                <div className="label">For {prsRemaining} PRs</div>
              </div>
            </div>

            <h2>🎯 Three-Tier Reward System</h2>
            <div className="tier-cards">
              <div className="tier-card major">
                <div className="tier-header">
                  <h3>⭐ Major Features</h3>
                  <div className="tier-reward">10M $BMAIL</div>
                </div>
                <p>{TOKEN_ECONOMICS.tiers.major.description}</p>
                <div className="tier-examples">
                  <strong>Examples:</strong>
                  <ul>
                    {TOKEN_ECONOMICS.tiers.major.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
                <div className="tier-stats">
                  <span className="allocated">{prsAllocated.major} completed</span>
                  <span className="remaining">{tasks.major.length} tasks offered</span>
                </div>
              </div>

              <div className="tier-card minor">
                <div className="tier-header">
                  <h3>✨ Minor Features</h3>
                  <div className="tier-reward">3M $BMAIL</div>
                </div>
                <p>{TOKEN_ECONOMICS.tiers.minor.description}</p>
                <div className="tier-examples">
                  <strong>Examples:</strong>
                  <ul>
                    {TOKEN_ECONOMICS.tiers.minor.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
                <div className="tier-stats">
                  <span className="allocated">{prsAllocated.minor} completed</span>
                  <span className="remaining">{tasks.minor.length} tasks offered</span>
                </div>
              </div>

              <div className="tier-card maintenance">
                <div className="tier-header">
                  <h3>🔧 Maintenance</h3>
                  <div className="tier-reward">1M $BMAIL</div>
                </div>
                <p>{TOKEN_ECONOMICS.tiers.maintenance.description}</p>
                <div className="tier-examples">
                  <strong>Examples:</strong>
                  <ul>
                    {TOKEN_ECONOMICS.tiers.maintenance.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
                <div className="tier-stats">
                  <span className="allocated">{prsAllocated.maintenance} completed</span>
                  <span className="remaining">{tasks.maintenance.length} tasks offered</span>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'leaderboard' && (
          <div className="content-section" id="leaderboard">
            <h2>🏆 Top Contributors</h2>
            
            {loading && <div className="loading">Loading contributors...</div>}
            
            <div className="leaderboard-list">
              {!loading && contributors.slice(0, 20).map((contributor) => (
                <div key={contributor.githubUsername} className={`leaderboard-item tier-${contributor.tier}`}>
                  <div className="rank">#{contributor.rank}</div>
                  {contributor.avatar && (
                    <img src={contributor.avatar} alt={contributor.githubUsername} className="avatar" />
                  )}
                  <div className="contributor-details">
                    <div className="username">
                      <a href={`https://github.com/${contributor.githubUsername}`} target="_blank" rel="noopener noreferrer">
                        @{contributor.githubUsername}
                      </a>
                    </div>
                    <div className="stats">
                      <span>{contributor.commits} commits</span>
                      <span>•</span>
                      <span>~{contributor.prs} PRs</span>
                      <span>•</span>
                      <span className={`tier-badge ${contributor.tier}`}>
                        {TOKEN_ECONOMICS.tiers[contributor.tier].name}
                      </span>
                    </div>
                  </div>
                  <div className="tokens-earned">
                    <div className="token-amount">{(contributor.bmailTokens / 1_000_000).toFixed(0)}M</div>
                    <div className="token-label">$BMAIL</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="content-section">
            <h2>Available Tasks</h2>
            <p>Claim a task by connecting your GitHub account and HandCash wallet. Maximum 1% equity (10M tokens) per task.</p>
            
            <div className="task-sections">
              <div className="task-tier">
                <h3>Major Features (10M $BMAIL each)</h3>
                <div className="task-list">
                  {tasks.major.map((task) => (
                    <div key={task.id} className={`task-row major ${task.claimed ? 'claimed' : ''}`}>
                      <div className="task-main">
                        <div className="task-title-section">
                          <h4>{task.title}</h4>
                          <div className="task-reward">10M $BMAIL</div>
                        </div>
                        <p className="task-description">{task.description}</p>
                      </div>
                      <div className="task-actions">
                        <a 
                          href="https://github.com/bitcoin-apps-suite/bitcoin-email/issues"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="github-issue-button"
                        >
                          View on GitHub
                        </a>
                        {task.claimed ? (
                          <div className="claimed-status">
                            <span className="claimed-text">Claimed by @{task.claimedBy}</span>
                          </div>
                        ) : (
                          <div className="claim-actions">
                            <button 
                              className="claim-button github"
                              onClick={() => handleClaimTask(task, 'major')}
                            >
                              Sign in with GitHub
                            </button>
                            <button 
                              className="claim-button handcash"
                              onClick={() => handleClaimTask(task, 'major')}
                            >
                              Sign in with HandCash
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="task-tier">
                <h3>Minor Features (3M $BMAIL each)</h3>
                <div className="task-list">
                  {tasks.minor.map((task) => (
                    <div key={task.id} className={`task-row minor ${task.claimed ? 'claimed' : ''}`}>
                      <div className="task-main">
                        <div className="task-title-section">
                          <h4>{task.title}</h4>
                          <div className="task-reward">3M $BMAIL</div>
                        </div>
                        <p className="task-description">{task.description}</p>
                      </div>
                      <div className="task-actions">
                        <a 
                          href="https://github.com/bitcoin-apps-suite/bitcoin-email/issues"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="github-issue-button"
                        >
                          View on GitHub
                        </a>
                        {task.claimed ? (
                          <div className="claimed-status">
                            <span className="claimed-text">Claimed by @{task.claimedBy}</span>
                          </div>
                        ) : (
                          <div className="claim-actions">
                            <button 
                              className="claim-button github"
                              onClick={() => handleClaimTask(task, 'minor')}
                            >
                              Sign in with GitHub
                            </button>
                            <button 
                              className="claim-button handcash"
                              onClick={() => handleClaimTask(task, 'minor')}
                            >
                              Sign in with HandCash
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="task-tier">
                <h3>Maintenance Tasks (1M $BMAIL each)</h3>
                <div className="task-list">
                  {tasks.maintenance.map((task) => (
                    <div key={task.id} className={`task-row maintenance ${task.claimed ? 'claimed' : ''}`}>
                      <div className="task-main">
                        <div className="task-title-section">
                          <h4>{task.title}</h4>
                          <div className="task-reward">1M $BMAIL</div>
                        </div>
                        <p className="task-description">{task.description}</p>
                      </div>
                      <div className="task-actions">
                        <a 
                          href="https://github.com/bitcoin-apps-suite/bitcoin-email/issues"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="github-issue-button"
                        >
                          View on GitHub
                        </a>
                        {task.claimed ? (
                          <div className="claimed-status">
                            <span className="claimed-text">Claimed by @{task.claimedBy}</span>
                          </div>
                        ) : (
                          <div className="claim-actions">
                            <button 
                              className="claim-button github"
                              onClick={() => handleClaimTask(task, 'maintenance')}
                            >
                              Sign in with GitHub
                            </button>
                            <button 
                              className="claim-button handcash"
                              onClick={() => handleClaimTask(task, 'maintenance')}
                            >
                              Sign in with HandCash
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'all' && (
          <div className="content-section">
            <h2>Complete $BMAIL Token Program Overview</h2>
            
            {/* Overview Section */}
            <div className="all-section">
              <h3>🎯 Program Overview</h3>
              <div className="token-allocation-summary">
                <div className="allocation-card highlight">
                  <h3>Community Pool</h3>
                  <div className="big-number">{(TOKEN_ECONOMICS.communityPool / 1_000_000).toFixed(0)}M</div>
                  <div className="label">$BMAIL Tokens (100%)</div>
                </div>
                <div className="allocation-card">
                  <h3>Allocated So Far</h3>
                  <div className="big-number">{(tokensAllocated / 1_000_000).toFixed(0)}M</div>
                  <div className="label">Across {prsAllocated.major + prsAllocated.minor + prsAllocated.maintenance} PRs</div>
                </div>
                <div className="allocation-card">
                  <h3>Remaining</h3>
                  <div className="big-number">{(tokensRemaining / 1_000_000).toFixed(0)}M</div>
                  <div className="label">Available for distribution</div>
                </div>
              </div>
            </div>

            {/* Token Distribution */}
            <div className="all-section">
              <h3>🎁 Token Distribution for Contributors</h3>
              <div className="grant-allocation-info">
                <div className="grant-principle">
                  <h4>🌟 100% Community Owned - No Team Reserve</h4>
                  <p>All 1 billion $BMAIL tokens are available to contributors. We're all one community - those who do the work earn the tokens.</p>
                </div>
                
                <div className="grant-examples">
                  <div className="grant-tier">
                    <h4>🚀 Major Features</h4>
                    <p><strong>2.5M $BMAIL</strong> per task • 10 tasks available</p>
                    <p className="grant-description">Blockchain integration, HandCash wallet, encryption, mobile apps, NFT marketplace</p>
                  </div>
                  
                  <div className="grant-tier">
                    <h4>✨ Minor Features</h4>
                    <p><strong>1.25M $BMAIL</strong> per task • 10 tasks available</p>
                    <p className="grant-description">Dark mode, search, templates, contact management, analytics dashboard</p>
                  </div>
                  
                  <div className="grant-tier">
                    <h4>🔧 Maintenance Tasks</h4>
                    <p><strong>500K $BMAIL</strong> per task • 10 tasks available</p>
                    <p className="grant-description">Testing, optimization, accessibility, security audits, CI/CD setup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Tasks Preview */}
            <div className="all-section">
              <h3>🎯 Sample Available Tasks</h3>
              <p>Current structured tasks with preset values (full grant system coming soon):</p>
              
              <div className="task-preview">
                <h4>Major Features (2.5M $BMAIL each)</h4>
                <div className="task-preview-list">
                  {tasks.major.slice(0, 3).map((task) => (
                    <div key={task.id} className="task-preview-item major">
                      <h5>{task.title}</h5>
                      <p>{task.description}</p>
                    </div>
                  ))}
                  <div className="task-preview-more">+ {tasks.major.length - 3} more major tasks available</div>
                </div>
              </div>
              
              <div className="task-preview">
                <h4>Minor Features (1.25M $BMAIL each)</h4>
                <div className="task-preview-list">
                  {tasks.minor.slice(0, 3).map((task) => (
                    <div key={task.id} className="task-preview-item minor">
                      <h5>{task.title}</h5>
                      <p>{task.description}</p>
                    </div>
                  ))}
                  <div className="task-preview-more">+ {tasks.minor.length - 3} more minor tasks available</div>
                </div>
              </div>
            </div>

            {/* How to Contribute */}
            <div className="all-section">
              <h3>🚀 How to Contribute</h3>
              <div className="contribution-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Choose a Task</h4>
                    <p>Browse available tasks or apply for custom grants</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Connect Accounts</h4>
                    <p>Sign in with GitHub and connect your HandCash wallet</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Start Working</h4>
                    <p>Fork the repository and start implementing</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Submit & Get Paid</h4>
                    <p>Create a PR, get it merged, receive your $BMAIL tokens</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Contributors Preview */}
            <div className="all-section">
              <h3>🏆 Top Contributors</h3>
              <div className="contributors-preview">
                {!loading && contributors.slice(0, 5).map((contributor) => (
                  <div key={contributor.githubUsername} className={`contributor-preview tier-${contributor.tier}`}>
                    {contributor.avatar && (
                      <img src={contributor.avatar} alt={contributor.githubUsername} className="contributor-avatar-small" />
                    )}
                    <div className="contributor-info-preview">
                      <div className="username">@{contributor.githubUsername}</div>
                      <div className="tokens">{(contributor.bmailTokens / 1_000_000).toFixed(0)}M $BMAIL</div>
                    </div>
                  </div>
                ))}
                <div className="see-all-contributors">
                  <button onClick={() => setActiveTab('leaderboard')}>View All Contributors</button>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <h3>Ready to Contribute?</h3>
              <p>Join our community of developers building the future of decentralized email</p>
              <div className="cta-buttons">
                <a href="https://github.com/bitcoin-apps-suite/bitcoin-email" target="_blank" rel="noopener noreferrer" className="cta-button primary">
                  View Repository
                </a>
                <button onClick={() => setActiveTab('grants')} className="cta-button secondary">
                  Apply for Grant
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'grants' && (
          <div className="content-section">
            <h2>Grant Applications</h2>
            
            <div className="grants-header">
              <h3>Apply for Future $BMAIL Grants</h3>
              <p>Have an idea beyond our current 32 predefined tasks? Apply for a grant from the remaining token pool. All 1B tokens are available to the community.</p>
            </div>

            <div className="grant-application-form">
              <div className="form-section">
                <h4>Project Information</h4>
                <div className="form-group">
                  <label>Project Title</label>
                  <input type="text" placeholder="e.g., Advanced AI Email Categorization System" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label>Project Description</label>
                  <textarea 
                    placeholder="Describe your project in detail, including technical approach, expected timeline, and deliverables..."
                    className="form-textarea"
                    rows={6}
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Grant Category</label>
                  <select className="form-select">
                    <option value="">Select category</option>
                    <option value="major">Major Grant (Complex features, infrastructure)</option>
                    <option value="minor">Minor Grant (New features, enhancements)</option>
                    <option value="maintenance">Maintenance Grant (Fixes, optimization)</option>
                    <option value="research">Research Grant (Exploration, prototyping)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Requested Token Amount</label>
                  <input type="number" placeholder="e.g., 5000000" className="form-input" />
                  <small className="form-hint">Amount in $BMAIL tokens. Justify your request in the description above.</small>
                </div>
                
                <div className="form-group">
                  <label>Timeline</label>
                  <input type="text" placeholder="e.g., 4-6 weeks" className="form-input" />
                </div>
              </div>

              <div className="form-section">
                <h4>Your Information</h4>
                <div className="form-group">
                  <label>GitHub Username</label>
                  <input type="text" placeholder="your-github-username" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label>HandCash Handle</label>
                  <input type="text" placeholder="$your-handcash-handle" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label>Experience Level</label>
                  <select className="form-select">
                    <option value="">Select experience</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="advanced">Advanced (5+ years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Portfolio/Previous Work</label>
                  <textarea 
                    placeholder="Share links to your GitHub projects, portfolio, or relevant experience..."
                    className="form-textarea"
                    rows={4}
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <h4>Technical Details</h4>
                <div className="form-group">
                  <label>Technologies You'll Use</label>
                  <input type="text" placeholder="e.g., React, TypeScript, Node.js, BSV SDK" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label>Dependencies/Requirements</label>
                  <textarea 
                    placeholder="List any external dependencies, APIs, or special requirements for your project..."
                    className="form-textarea"
                    rows={3}
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Success Metrics</label>
                  <textarea 
                    placeholder="How will we measure the success of your project? Include specific, measurable outcomes..."
                    className="form-textarea"
                    rows={3}
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    I agree to the contribution guidelines and understand that grants are awarded based on merit and project value
                  </label>
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    I commit to providing regular progress updates and maintaining open communication throughout development
                  </label>
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    I understand that grants are paid upon successful completion and merge of the project
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary grant-submit">Submit Grant Application</button>
                <button type="button" className="btn-secondary">Save as Draft</button>
              </div>
            </div>

            <div className="grants-info">
              <h4>Grant Review Process</h4>
              <div className="process-steps">
                <div className="process-step">
                  <span className="step-number">1</span>
                  <div className="step-content">
                    <h5>Initial Review</h5>
                    <p>Applications reviewed within 48-72 hours for completeness and feasibility</p>
                  </div>
                </div>
                <div className="process-step">
                  <span className="step-number">2</span>
                  <div className="step-content">
                    <h5>Technical Assessment</h5>
                    <p>Core team evaluates technical merit, alignment with project goals, and resource requirements</p>
                  </div>
                </div>
                <div className="process-step">
                  <span className="step-number">3</span>
                  <div className="step-content">
                    <h5>Grant Award</h5>
                    <p>Approved applicants receive grant details and can begin work immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'how-to' && (
          <div className="content-section">
            <h2>🚀 How to Start Contributing</h2>
            
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Fork & Clone</h3>
                  <p>Fork the repository and clone it to your local machine</p>
                  <code>git clone https://github.com/bitcoin-apps-suite/bitcoin-email.git</code>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Find an Issue</h3>
                  <p>Browse open issues or propose a new feature</p>
                  <a href="https://github.com/bitcoin-apps-suite/bitcoin-email/issues" target="_blank" rel="noopener noreferrer">
                    View Open Issues →
                  </a>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Develop & Test</h3>
                  <p>Create your feature branch and implement your solution</p>
                  <code>git checkout -b feature/your-feature-name</code>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Submit PR</h3>
                  <p>Push your changes and create a pull request</p>
                  <a href="https://github.com/bitcoin-apps-suite/bitcoin-email/pulls" target="_blank" rel="noopener noreferrer">
                    Create Pull Request →
                  </a>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Earn $BMAIL</h3>
                  <p>Once merged, receive your $BMAIL tokens based on contribution tier</p>
                  <div className="tier-summary">
                    <span>Major: 10M</span>
                    <span>•</span>
                    <span>Minor: 3M</span>
                    <span>•</span>
                    <span>Maintenance: 1M</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="guidelines">
              <h3>📋 Contribution Guidelines</h3>
              <ul>
                <li><strong>Code Quality:</strong> Follow existing code style and patterns</li>
                <li><strong>Testing:</strong> Include tests for new features</li>
                <li><strong>Documentation:</strong> Update docs for API changes</li>
                <li><strong>Commit Messages:</strong> Use clear, descriptive commit messages</li>
                <li><strong>PR Description:</strong> Explain what, why, and how</li>
              </ul>
            </div>

            <div className="cta-section">
              <h3>Ready to Contribute?</h3>
              <p>Join our community of developers building the future of decentralized email</p>
              <div className="cta-buttons">
                <a href="https://github.com/bitcoin-apps-suite/bitcoin-email" target="_blank" rel="noopener noreferrer" className="cta-button primary">
                  View Repository
                </a>
                <a href="https://github.com/bitcoin-apps-suite/bitcoin-email/issues/new" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                  Propose Feature
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Task Claiming Modal */}
      {showClaimModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowClaimModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Claim Task: {selectedTask.title}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowClaimModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {/* Left Column - Task Details */}
              <div className="modal-column">
                <div className="task-info">
                  <h4>Task Details</h4>
                  <p><strong>Reward:</strong> {(selectedTask.tokens / 1_000_000).toFixed(0)}M $BMAIL</p>
                  <p><strong>Description:</strong> {selectedTask.description}</p>
                  <p><strong>Repository:</strong> <a href="https://github.com/bitcoin-apps-suite/bitcoin-email" target="_blank" rel="noopener noreferrer" className="text-bitcoin-red-500 hover:text-bitcoin-red-600">bitcoin-apps-suite/bitcoin-email</a></p>
                </div>
                
                <div className="claim-requirements">
                  <h4>Requirements to Claim:</h4>
                  <div className="requirement-item">
                    <input type="checkbox" id="github-connected" />
                    <label htmlFor="github-connected">
                      Connect GitHub Account
                      <span className="requirement-status">✓ Connected</span>
                    </label>
                  </div>
                  <div className="requirement-item">
                    <input type="checkbox" id="handcash-connected" />
                    <label htmlFor="handcash-connected">
                      Connect HandCash Wallet
                      <span className="requirement-status">⚠ Required</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Form and Agreement */}
              <div className="modal-column">
                <div className="claim-form">
                  <h4>Connect Your Accounts</h4>
                  <div className="form-group">
                    <label>GitHub Username:</label>
                    <input 
                      type="text" 
                      placeholder="your-github-username"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>HandCash Handle:</label>
                    <input 
                      type="text" 
                      placeholder="$your-handcash-handle"
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="claim-agreement">
                  <h4>Agreement</h4>
                  <p>By claiming this task, you agree to:</p>
                  <ul>
                    <li>Complete the task within 30 days</li>
                    <li>Follow the project's contribution guidelines</li>
                    <li>Submit a pull request for review</li>
                    <li>Provide your HandCash wallet for token distribution</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowClaimModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => handleClaimSubmit('placeholder-user', '$placeholder')}
              >
                Claim Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionsPage;