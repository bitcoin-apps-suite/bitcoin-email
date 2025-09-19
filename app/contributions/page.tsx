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

const ContributionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tokenomics' | 'leaderboard' | 'how-to'>('overview');
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);
  const [prsAllocated, setPrsAllocated] = useState({ major: 3, minor: 8, maintenance: 15 });

  useEffect(() => {
    // Check URL hash on mount and handle navigation
    const hash = window.location.hash.substring(1);
    if (hash === 'leaderboard' || hash === 'tokenomics' || hash === 'how-to') {
      setActiveTab(hash as any);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.substring(1);
      if (newHash === 'leaderboard' || newHash === 'tokenomics' || newHash === 'how-to' || newHash === 'overview') {
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
          📊 Overview
        </button>
        <button 
          className={`tab ${activeTab === 'tokenomics' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('tokenomics');
            window.location.hash = 'tokenomics';
          }}
        >
          🪙 Token Economics
        </button>
        <button 
          className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('leaderboard');
            window.location.hash = 'leaderboard';
          }}
        >
          🏆 Leaderboard
        </button>
        <button 
          className={`tab ${activeTab === 'how-to' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('how-to');
            window.location.hash = 'how-to';
          }}
        >
          🚀 How to Contribute
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
    </div>
  );
};

export default ContributionsPage;