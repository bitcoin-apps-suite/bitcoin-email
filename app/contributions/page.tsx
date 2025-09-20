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

// Token Economics Configuration
const TOKEN_ECONOMICS = {
  totalSupply: 1_000_000_000, // 1 billion $BMAIL tokens
  teamReserve: 510_000_000, // 51% team reserve
  communityPool: 490_000_000, // 49% for community contributions
  targetPRs: 100, // First 100 PRs get rewards
  
  // Tiered reward system
  tiers: {
    major: {
      name: 'Major Feature',
      tokens: 10_000_000, // 10M tokens per major PR
      maxPRs: 20, // Max 20 major PRs
      description: 'Core features, blockchain integration, major UI overhauls',
      examples: ['Blockchain email storage', 'HandCash integration', 'End-to-end encryption', 'Mobile app']
    },
    minor: {
      name: 'Minor Feature',
      tokens: 3_000_000, // 3M tokens per minor PR
      maxPRs: 30, // Max 30 minor PRs  
      description: 'New components, enhancements, optimizations',
      examples: ['UI components', 'API endpoints', 'Performance improvements', 'Documentation']
    },
    maintenance: {
      name: 'Maintenance',
      tokens: 1_000_000, // 1M tokens per maintenance PR
      maxPRs: 50, // Max 50 maintenance PRs
      description: 'Bug fixes, tests, refactoring, dependencies',
      examples: ['Bug fixes', 'Unit tests', 'Code cleanup', 'Dependency updates']
    }
  }
};

// Task definitions with token allocations (max 1% = 10M tokens per task)
const AVAILABLE_TASKS = {
  major: [
    { id: 'blockchain-storage', title: 'Blockchain Email Storage System', description: 'Implement full BSV blockchain storage for emails with encryption', tokens: 10_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'handcash-integration', title: 'Complete HandCash Wallet Integration', description: 'Full HandCash Connect integration with payment flows', tokens: 10_000_000, claimed: true, claimedBy: 'satoshi_dev', githubIssue: 'TBD' },
    { id: 'end-to-end-encryption', title: 'End-to-End Encryption System', description: 'Implement PGP-based E2E encryption for all emails', tokens: 10_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'mobile-app', title: 'React Native Mobile App', description: 'Full-featured iOS/Android mobile application', tokens: 10_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'nft-marketplace', title: 'Email List NFT Marketplace', description: 'Complete NFT minting and trading system for email lists', tokens: 10_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'ai-spam-filter', title: 'AI-Powered Spam Detection', description: 'Machine learning spam filter with blockchain verification', tokens: 10_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'defi-integration', title: 'DeFi Yield Generation', description: 'Integrate DeFi protocols for email list revenue sharing', tokens: 10_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'ipfs-attachments', title: 'IPFS Attachment Storage', description: 'Decentralized file storage for email attachments', tokens: 10_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'desktop-app', title: 'Electron Desktop Application', description: 'Native desktop app for Windows/Mac/Linux', tokens: 10_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'calendar-integration', title: 'Blockchain Calendar System', description: 'Decentralized calendar with smart contract events', tokens: 10_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' }
  ],
  minor: [
    { id: 'dark-mode', title: 'Dark Mode Theme System', description: 'Complete dark mode with theme switching', tokens: 3_000_000, claimed: true, claimedBy: 'alice_dev', githubIssue: 'TBD' },
    { id: 'search-functionality', title: 'Advanced Search & Filters', description: 'Full-text search with advanced filtering options', tokens: 3_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'email-templates', title: 'Email Template Builder', description: 'Drag-and-drop email template creation system', tokens: 3_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'contact-management', title: 'Contact Management System', description: 'Full CRM-style contact management', tokens: 3_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'analytics-dashboard', title: 'Analytics Dashboard', description: 'Email analytics and engagement tracking', tokens: 3_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'api-documentation', title: 'API Documentation Site', description: 'Complete API docs with interactive examples', tokens: 3_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts System', description: 'Gmail-style keyboard navigation', tokens: 3_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'notification-system', title: 'Push Notifications', description: 'Web push and mobile notifications', tokens: 3_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'import-export', title: 'Import/Export System', description: 'Bulk email import/export functionality', tokens: 3_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'multi-language', title: 'Internationalization (i18n)', description: 'Multi-language support system', tokens: 3_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' }
  ],
  maintenance: [
    { id: 'unit-tests', title: 'Unit Test Coverage (80%)', description: 'Comprehensive unit test suite', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'e2e-tests', title: 'E2E Test Suite', description: 'Cypress/Playwright end-to-end tests', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'performance-optimization', title: 'Performance Optimization', description: 'Code splitting and lazy loading', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'accessibility', title: 'WCAG 2.1 Accessibility', description: 'Full accessibility compliance', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'security-audit', title: 'Security Audit & Fixes', description: 'Comprehensive security review', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'docker-setup', title: 'Docker Configuration', description: 'Complete Docker deployment setup', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'ci-cd', title: 'CI/CD Pipeline', description: 'GitHub Actions deployment pipeline', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'error-handling', title: 'Error Handling System', description: 'Comprehensive error boundaries and logging', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'rate-limiting', title: 'Rate Limiting', description: 'API rate limiting and throttling', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' },
    { id: 'monitoring', title: 'Monitoring & Alerting', description: 'Application monitoring setup', tokens: 1_000_000, claimed: false, claimedBy: null, githubIssue: 'TBD' }
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
  const prsRemaining = TOKEN_ECONOMICS.targetPRs - (prsAllocated.major + prsAllocated.minor + prsAllocated.maintenance);

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
          className={`tab ${activeTab === 'tokenomics' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('tokenomics');
            window.location.hash = 'tokenomics';
          }}
        >
          Token Economics
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
                <div className="label">$BMAIL Tokens (49%)</div>
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
                  <span className="allocated">{prsAllocated.major}/{TOKEN_ECONOMICS.tiers.major.maxPRs} allocated</span>
                  <span className="remaining">{TOKEN_ECONOMICS.tiers.major.maxPRs - prsAllocated.major} spots left</span>
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
                  <span className="allocated">{prsAllocated.minor}/{TOKEN_ECONOMICS.tiers.minor.maxPRs} allocated</span>
                  <span className="remaining">{TOKEN_ECONOMICS.tiers.minor.maxPRs - prsAllocated.minor} spots left</span>
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
                  <span className="allocated">{prsAllocated.maintenance}/{TOKEN_ECONOMICS.tiers.maintenance.maxPRs} allocated</span>
                  <span className="remaining">{TOKEN_ECONOMICS.tiers.maintenance.maxPRs - prsAllocated.maintenance} spots left</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tokenomics' && (
          <div className="content-section" id="tokenomics">
            <h2>📈 $BMAIL Token Distribution</h2>
            
            <div className="distribution-chart">
              <div className="chart-visual">
                <div className="pie-chart">
                  <div className="slice team" style={{ '--percentage': '51%' } as React.CSSProperties}>
                    <span className="slice-label">Team Reserve<br/>51%</span>
                  </div>
                  <div className="slice community" style={{ '--percentage': '49%' } as React.CSSProperties}>
                    <span className="slice-label">Community<br/>49%</span>
                  </div>
                </div>
              </div>
              
              <div className="distribution-details">
                <h3>Total Supply: 1 Billion $BMAIL</h3>
                <div className="distribution-item">
                  <div className="dist-label">
                    <span className="dot team"></span>
                    Team Reserve (51%)
                  </div>
                  <div className="dist-value">510,000,000 $BMAIL</div>
                </div>
                <div className="distribution-item">
                  <div className="dist-label">
                    <span className="dot community"></span>
                    Community Contributions (49%)
                  </div>
                  <div className="dist-value">490,000,000 $BMAIL</div>
                </div>
              </div>
            </div>

            <h3>🎁 Community Allocation Breakdown</h3>
            <div className="allocation-breakdown">
              <div className="breakdown-item">
                <h4>Major Features (20 PRs)</h4>
                <div className="breakdown-bar">
                  <div className="bar-fill major" style={{ width: '40.8%' }}></div>
                </div>
                <div className="breakdown-stats">
                  <span>200,000,000 $BMAIL</span>
                  <span>40.8% of community pool</span>
                </div>
              </div>
              
              <div className="breakdown-item">
                <h4>Minor Features (30 PRs)</h4>
                <div className="breakdown-bar">
                  <div className="bar-fill minor" style={{ width: '18.4%' }}></div>
                </div>
                <div className="breakdown-stats">
                  <span>90,000,000 $BMAIL</span>
                  <span>18.4% of community pool</span>
                </div>
              </div>
              
              <div className="breakdown-item">
                <h4>Maintenance (50 PRs)</h4>
                <div className="breakdown-bar">
                  <div className="bar-fill maintenance" style={{ width: '10.2%' }}></div>
                </div>
                <div className="breakdown-stats">
                  <span>50,000,000 $BMAIL</span>
                  <span>10.2% of community pool</span>
                </div>
              </div>
              
              <div className="breakdown-item">
                <h4>Future Reserves</h4>
                <div className="breakdown-bar">
                  <div className="bar-fill future" style={{ width: '30.6%' }}></div>
                </div>
                <div className="breakdown-stats">
                  <span>150,000,000 $BMAIL</span>
                  <span>30.6% of community pool</span>
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