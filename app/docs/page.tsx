'use client';

import React, { useState, useEffect } from 'react';
import './docs.css';

interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
  type: string;
}

interface Contributor {
  handle: string;
  name: string;
  githubUsername: string;
  avatar?: string;
  mergedPRs: number;
  commits: number;
  bmailTokens: number;
  contributions: string[];
  joinDate: string;
}

// Map GitHub usernames to HandCash handles and contribution details
const contributorDetails: Record<string, { handle: string; bmailMultiplier: number; contributions: string[] }> = {
  // Add real contributor mappings here as they join
  'example-user': {
    handle: '$exampleuser',
    bmailMultiplier: 1.5, // Bonus multiplier for core contributors
    contributions: ['Core features', 'Bug fixes']
  }
};

const DocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'docs' | 'contributors' | 'bmail'>('docs');
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check URL hash on mount and handle navigation
    const hash = window.location.hash.substring(1);
    if (hash === 'contributors' || hash === 'bmail') {
      setActiveTab(hash as any);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.substring(1);
      if (newHash === 'contributors' || newHash === 'bmail' || newHash === 'docs') {
        setActiveTab(newHash as any);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (activeTab === 'contributors') {
      fetchContributors();
    }
  }, [activeTab]);

  const fetchContributors = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch contributors from GitHub API
      const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-email/contributors');
      if (!response.ok) throw new Error('Failed to fetch contributors');
      
      const githubContributors: GitHubContributor[] = await response.json();
      
      // Transform GitHub data to our format with new token system
      const transformedContributors: Contributor[] = githubContributors
        .filter(c => c.type === 'User') // Filter out bots
        .map((contributor, index) => {
          const details = contributorDetails[contributor.login] || {};
          
          // Determine tier and tokens based on contribution level
          let bmailTokens = 0;
          let tier = '';
          if (contributor.contributions > 100) {
            bmailTokens = 10_000_000; // 10M for major contributors
            tier = 'Major';
          } else if (contributor.contributions > 50) {
            bmailTokens = 3_000_000; // 3M for minor contributors
            tier = 'Minor';
          } else if (contributor.contributions > 10) {
            bmailTokens = 1_000_000; // 1M for maintenance
            tier = 'Maintenance';
          } else {
            bmailTokens = 0; // Not yet eligible
            tier = 'Pending';
          }
          
          return {
            handle: details.handle || `$${contributor.login.toLowerCase()}`,
            name: contributor.login,
            githubUsername: contributor.login,
            avatar: contributor.avatar_url,
            mergedPRs: Math.round(contributor.contributions * 0.3), // Estimate PRs
            commits: contributor.contributions,
            bmailTokens: bmailTokens,
            contributions: details.contributions || [
              `${contributor.contributions} commits`,
              `${tier} contributor`
            ],
            joinDate: '2024-01-01' // Would need separate API call for actual date
          };
        });
      
      setContributors(transformedContributors);
    } catch (err) {
      console.error('Error fetching contributors:', err);
      setError('Failed to load contributors. Please try again later.');
      // Fallback to example data
      setContributors([
        {
          handle: '$contributor',
          name: 'Example Contributor',
          githubUsername: 'contributor',
          mergedPRs: 10,
          commits: 50,
          bmailTokens: 1000,
          contributions: ['Core features', 'Documentation', 'Bug fixes'],
          joinDate: '2024-01-01'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const totalContributors = contributors.length;
  const totalTokensDistributed = contributors.reduce((sum, c) => sum + c.bmailTokens, 0);
  const totalCommits = contributors.reduce((sum, c) => sum + c.commits, 0);

  return (
    <div className="docs-page">
      <div className="docs-header">
        <h1>Bitcoin Email Documentation</h1>
        <p>The world's first open-source, blockchain-powered email client</p>
      </div>

      <div className="docs-tabs">
        <button 
          className={`docs-tab ${activeTab === 'docs' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('docs');
            window.location.hash = 'docs';
          }}
        >
          📖 Documentation
        </button>
        <button 
          className={`docs-tab ${activeTab === 'bmail' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('bmail');
            window.location.hash = 'bmail';
          }}
        >
          🪙 $BMAIL Token
        </button>
        <button 
          className={`docs-tab ${activeTab === 'contributors' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('contributors');
            window.location.hash = 'contributors';
          }}
        >
          👥 Contributors
        </button>
      </div>

      <div className="docs-content">
        {activeTab === 'docs' && (
          <div className="docs-section">
            <h2>About Bitcoin Email</h2>
            <p>
              Bitcoin Email is a revolutionary email client that combines traditional email functionality 
              with blockchain technology, enabling secure, monetized, and decentralized communication.
            </p>

            <h3>🚀 Key Features</h3>
            <ul>
              <li><strong>Blockchain Storage:</strong> Emails stored on Bitcoin SV blockchain for immutability</li>
              <li><strong>End-to-End Encryption:</strong> Military-grade encryption using AES-256</li>
              <li><strong>Micropayments:</strong> Send and receive Bitcoin with every email</li>
              <li><strong>HandCash Integration:</strong> Seamless wallet authentication and payments</li>
              <li><strong>Token Economics:</strong> Earn $BMAIL tokens for contributing to the codebase</li>
              <li><strong>Mobile Optimized:</strong> Responsive design for all devices</li>
            </ul>

            <h3>🏗️ Architecture</h3>
            <p>
              Built with modern web technologies including Next.js 15, React 18, TypeScript, and Bitcoin SV SDK.
              The application follows a modular architecture with clear separation of concerns.
            </p>

            <h3>🔒 Security</h3>
            <p>
              All emails are encrypted client-side before being stored on the blockchain. 
              Private keys never leave your device, ensuring complete privacy and security.
            </p>

            <h3>💡 Getting Started</h3>
            <ol>
              <li>Connect your HandCash wallet</li>
              <li>Set up your email preferences</li>
              <li>Start sending blockchain-powered emails</li>
              <li>Earn $BMAIL tokens by contributing</li>
            </ol>

            <h3>🔗 Links</h3>
            <ul>
              <li><a href="https://github.com/bitcoin-apps-suite/bitcoin-email" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
              <li><a href="https://handcash.io" target="_blank" rel="noopener noreferrer">HandCash Wallet</a></li>
              <li><a href="https://bitcoinsv.com" target="_blank" rel="noopener noreferrer">Bitcoin SV</a></li>
            </ul>
          </div>
        )}

        {activeTab === 'bmail' && (
          <div className="docs-section">
            <h2>$BMAIL Token Economics</h2>
            
            <div className="token-stats">
              <div className="stat-card">
                <h3>Total Supply</h3>
                <div className="stat-value">1B</div>
                <div className="stat-label">$BMAIL Tokens</div>
              </div>
              <div className="stat-card">
                <h3>Community Pool</h3>
                <div className="stat-value">490M</div>
                <div className="stat-label">49% for Contributors</div>
              </div>
              <div className="stat-card">
                <h3>Team Reserve</h3>
                <div className="stat-value">510M</div>
                <div className="stat-label">51% Reserved</div>
              </div>
            </div>

            <h3>🎯 Three-Tier Reward System</h3>
            <div className="earning-methods">
              <div className="method-card">
                <h4>⭐ Major Features</h4>
                <p>10M $BMAIL per PR • Max 20 PRs</p>
                <p className="method-examples">Core features, blockchain integration, major UI overhauls</p>
              </div>
              <div className="method-card">
                <h4>✨ Minor Features</h4>
                <p>3M $BMAIL per PR • Max 30 PRs</p>
                <p className="method-examples">New components, enhancements, optimizations</p>
              </div>
              <div className="method-card">
                <h4>🔧 Maintenance</h4>
                <p>1M $BMAIL per PR • Max 50 PRs</p>
                <p className="method-examples">Bug fixes, tests, refactoring, dependencies</p>
              </div>
              <div className="method-card">
                <h4>🚀 First 100 PRs</h4>
                <p>340M $BMAIL allocated</p>
                <p className="method-examples">150M reserved for future initiatives</p>
              </div>
            </div>

            <h3>📊 Token Distribution</h3>
            <ul>
              <li><strong>51%</strong> - Team Reserve (510M $BMAIL)</li>
              <li><strong>49%</strong> - Community Contributors (490M $BMAIL)</li>
              <li className="sub-item"><strong>20%</strong> of total - Major Features (200M)</li>
              <li className="sub-item"><strong>9%</strong> of total - Minor Features (90M)</li>
              <li className="sub-item"><strong>5%</strong> of total - Maintenance (50M)</li>
              <li className="sub-item"><strong>15%</strong> of total - Future Initiatives (150M)</li>
            </ul>

            <h3>🔄 Token Utility</h3>
            <p>
              $BMAIL tokens power the Bitcoin Email codebase:
            </p>
            <ul>
              <li>Inbox monetization - Set minimum token requirements to receive emails</li>
              <li>Premium features - Access advanced functionality</li>
              <li>Governance voting - Shape the future of Bitcoin Email</li>
              <li>Email payments - Send/receive tokens with emails</li>
              <li>Priority support - Token holders get faster response times</li>
            </ul>

            <div className="token-cta">
              <h4>Ready to earn $BMAIL?</h4>
              <p>Check out our <a href="/contributions">Contributions & Rewards</a> page to start earning tokens!</p>
            </div>
          </div>
        )}

        {activeTab === 'contributors' && (
          <div className="docs-section">
            <h2>Contributors Hall of Fame</h2>
            
            <div className="contributor-stats">
              <div className="stat-card">
                <h3>Contributors</h3>
                <div className="stat-value">{totalContributors}</div>
                <div className="stat-label">Active Contributors</div>
              </div>
              <div className="stat-card">
                <h3>Total Commits</h3>
                <div className="stat-value">{totalCommits}</div>
                <div className="stat-label">Code Contributions</div>
              </div>
              <div className="stat-card">
                <h3>Tokens Earned</h3>
                <div className="stat-value">{totalTokensDistributed.toLocaleString()}</div>
                <div className="stat-label">$BMAIL Distributed</div>
              </div>
            </div>

            {loading && (
              <div className="loading-message">
                Loading contributors from GitHub...
              </div>
            )}
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="contributors-list">
              {!loading && contributors.map((contributor, index) => (
                <div key={contributor.githubUsername} className="contributor-card">
                  <div className="contributor-header">
                    <div className="contributor-rank">#{index + 1}</div>
                    {contributor.avatar && (
                      <img 
                        src={contributor.avatar} 
                        alt={contributor.name}
                        className="contributor-avatar"
                      />
                    )}
                    <div className="contributor-info">
                      <h3>{contributor.name}</h3>
                      <div className="contributor-handle">{contributor.handle}</div>
                      <div className="contributor-github">
                        <a 
                          href={`https://github.com/${contributor.githubUsername}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          @{contributor.githubUsername}
                        </a>
                      </div>
                    </div>
                    <div className="contributor-tokens">
                      <div className="token-amount">{contributor.bmailTokens.toLocaleString()}</div>
                      <div className="token-label">$BMAIL</div>
                    </div>
                  </div>
                  
                  <div className="contributor-stats">
                    <div className="stat-item">
                      <span className="stat-number">{contributor.commits}</span>
                      <span className="stat-text">Commits</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{contributor.mergedPRs}</span>
                      <span className="stat-text">Est. PRs</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{new Date(contributor.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      <span className="stat-text">Joined</span>
                    </div>
                  </div>
                  
                  <div className="contributor-contributions">
                    <h4>Key Contributions:</h4>
                    <ul>
                      {contributor.contributions.map((contribution, idx) => (
                        <li key={idx}>{contribution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="become-contributor">
              <h3>🚀 Become a Contributor</h3>
              <p>
                Join our growing community of developers and earn $BMAIL tokens for your contributions!
              </p>
              <a 
                href="https://github.com/bitcoin-apps-suite/bitcoin-email/issues" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contribute-button"
              >
                Start Contributing
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocsPage;