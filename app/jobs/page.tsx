'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import './jobs.css';
import { AVAILABLE_TASKS } from '../contributions/taskData';

interface JobContract {
  taskId: string;
  githubUsername: string;
  handcashHandle: string;
  tokenAmount: number;
  contractAcceptedAt: Date;
  status: 'pending' | 'in_progress' | 'under_review' | 'completed' | 'cancelled';
  prUrl?: string;
  paymentTxId?: string;
}

interface UserProfile {
  githubUsername?: string;
  handcashHandle?: string;
  githubConnected: boolean;
  handcashConnected: boolean;
}

const JobsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<'available' | 'my-contracts' | 'completed'>('available');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showContractModal, setShowContractModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    githubConnected: false,
    handcashConnected: false
  });
  const [contracts, setContracts] = useState<JobContract[]>([]);
  const [handcashAuthUrl, setHandcashAuthUrl] = useState('');

  // Combine all tasks from taskData
  const allJobs = [
    ...AVAILABLE_TASKS.major.filter(task => !task.claimed),
    ...AVAILABLE_TASKS.minor.filter(task => !task.claimed),
    ...AVAILABLE_TASKS.maintenance.filter(task => !task.claimed)
  ];

  useEffect(() => {
    // Check GitHub connection
    if (session?.user) {
      setUserProfile(prev => ({
        ...prev,
        githubConnected: true,
        githubUsername: session.user?.name || session.user?.email || ''
      }));
    }

    // Check HandCash connection (from localStorage or session)
    const handcashHandle = localStorage.getItem('handcashHandle');
    if (handcashHandle) {
      setUserProfile(prev => ({
        ...prev,
        handcashConnected: true,
        handcashHandle
      }));
    }

    // Load existing contracts from localStorage (temporary storage)
    const savedContracts = localStorage.getItem('jobContracts');
    if (savedContracts) {
      setContracts(JSON.parse(savedContracts));
    }
  }, [session]);

  useEffect(() => {
    // Generate HandCash auth URL
    const appId = process.env.NEXT_PUBLIC_HANDCASH_APP_ID;
    const redirectUrl = `${window.location.origin}/auth/callback/handcash`;
    if (appId) {
      setHandcashAuthUrl(
        `https://app.handcash.io/#/authorizeApp?appId=${appId}&redirectUrl=${encodeURIComponent(redirectUrl)}`
      );
    }
  }, []);

  const handleGitHubSignIn = async () => {
    await signIn('github', { callbackUrl: '/jobs' });
  };

  const handleHandCashConnect = () => {
    if (handcashAuthUrl) {
      window.location.href = handcashAuthUrl;
    }
  };

  const handleAcceptContract = (job: any) => {
    if (!userProfile.githubConnected || !userProfile.handcashConnected) {
      alert('Please connect both GitHub and HandCash to accept contracts');
      return;
    }
    
    setSelectedJob(job);
    setShowContractModal(true);
  };

  const confirmContract = () => {
    if (!selectedJob || !userProfile.githubUsername || !userProfile.handcashHandle) return;

    const newContract: JobContract = {
      taskId: selectedJob.id,
      githubUsername: userProfile.githubUsername,
      handcashHandle: userProfile.handcashHandle,
      tokenAmount: selectedJob.tokens,
      contractAcceptedAt: new Date(),
      status: 'in_progress',
    };

    const updatedContracts = [...contracts, newContract];
    setContracts(updatedContracts);
    localStorage.setItem('jobContracts', JSON.stringify(updatedContracts));
    
    setShowContractModal(false);
    setSelectedJob(null);
    setActiveTab('my-contracts');
  };

  const myContracts = contracts.filter(c => 
    c.githubUsername === userProfile.githubUsername && 
    c.status !== 'completed'
  );

  const completedContracts = contracts.filter(c => c.status === 'completed');

  const formatTokens = (tokens: number) => {
    return (tokens / 1_000_000).toFixed(2) + 'M';
  };

  return (
    <div className="jobs-container">
      {/* Header with Auth Status */}
      <div className="jobs-header">
        <h1>Bitcoin Email - Job Board</h1>
        <p className="jobs-subtitle">
          Accept contracts, deliver code, get paid in $BMAIL tokens
        </p>
        
        <div className="auth-status">
          <div className="auth-item">
            {userProfile.githubConnected ? (
              <div className="connected">
                <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
                <span>GitHub: {userProfile.githubUsername}</span>
                <button onClick={() => signOut()} className="disconnect-btn">Disconnect</button>
              </div>
            ) : (
              <button onClick={handleGitHubSignIn} className="connect-btn github-btn">
                <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
                Sign in with GitHub
              </button>
            )}
          </div>
          
          <div className="auth-item">
            {userProfile.handcashConnected ? (
              <div className="connected">
                <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                </svg>
                <span>HandCash: ${userProfile.handcashHandle}</span>
                <button 
                  onClick={() => {
                    localStorage.removeItem('handcashHandle');
                    setUserProfile(prev => ({
                      ...prev,
                      handcashConnected: false,
                      handcashHandle: undefined
                    }));
                  }} 
                  className="disconnect-btn"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button onClick={handleHandCashConnect} className="connect-btn handcash-btn">
                <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                </svg>
                Connect HandCash
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="jobs-tabs">
        <button
          className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Available Jobs ({allJobs.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'my-contracts' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-contracts')}
        >
          My Contracts ({myContracts.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({completedContracts.length})
        </button>
      </div>

      {/* Job Listings */}
      <div className="jobs-content">
        {activeTab === 'available' && (
          <div className="jobs-grid">
            {allJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className="token-badge">{formatTokens(job.tokens)} $BMAIL</span>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-footer">
                  <a 
                    href={job.issueUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    View Issue {job.githubIssue}
                  </a>
                  <button 
                    onClick={() => handleAcceptContract(job)}
                    className="accept-btn"
                    disabled={!userProfile.githubConnected || !userProfile.handcashConnected}
                  >
                    Accept Contract
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'my-contracts' && (
          <div className="contracts-list">
            {myContracts.length === 0 ? (
              <div className="empty-state">
                <p>No active contracts</p>
                <p className="hint">Accept a job to get started!</p>
              </div>
            ) : (
              myContracts.map((contract) => {
                const job = allJobs.find(j => j.id === contract.taskId);
                return job ? (
                  <div key={contract.taskId} className="contract-card">
                    <div className="contract-header">
                      <h3>{job.title}</h3>
                      <span className={`status-badge ${contract.status}`}>
                        {contract.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="contract-details">
                      <p>Accepted: {new Date(contract.contractAcceptedAt).toLocaleDateString()}</p>
                      <p>Reward: {formatTokens(contract.tokenAmount)} $BMAIL</p>
                      <p>GitHub: {contract.githubUsername}</p>
                      <p>HandCash: ${contract.handcashHandle}</p>
                    </div>
                    <div className="contract-actions">
                      <a 
                        href={job.issueUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-link"
                      >
                        Work on Issue
                      </a>
                      {contract.prUrl && (
                        <a 
                          href={contract.prUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="pr-link"
                        >
                          View PR
                        </a>
                      )}
                    </div>
                  </div>
                ) : null;
              })
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="completed-list">
            {completedContracts.length === 0 ? (
              <div className="empty-state">
                <p>No completed contracts yet</p>
              </div>
            ) : (
              completedContracts.map((contract) => (
                <div key={contract.taskId} className="completed-card">
                  <h4>{contract.taskId}</h4>
                  <p>Completed by: {contract.githubUsername}</p>
                  <p>Tokens: {formatTokens(contract.tokenAmount)} $BMAIL</p>
                  <p>Payment: {contract.paymentTxId || 'Processing...'}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Contract Acceptance Modal */}
      {showContractModal && selectedJob && (
        <div className="modal-overlay" onClick={() => setShowContractModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Contract Agreement</h2>
            <div className="contract-terms">
              <h3>{selectedJob.title}</h3>
              <p className="description">{selectedJob.description}</p>
              
              <div className="terms-section">
                <h4>Terms & Conditions:</h4>
                <ul>
                  <li>Task: Complete GitHub issue {selectedJob.githubIssue}</li>
                  <li>Reward: {formatTokens(selectedJob.tokens)} $BMAIL tokens</li>
                  <li>Payment: Upon successful PR merge to main branch</li>
                  <li>Review: Code must pass review and meet quality standards</li>
                  <li>Timeline: Best effort, no strict deadline</li>
                </ul>
              </div>

              <div className="contractor-info">
                <h4>Contractor Information:</h4>
                <p>GitHub: {userProfile.githubUsername}</p>
                <p>HandCash: ${userProfile.handcashHandle}</p>
              </div>

              <div className="warning-box">
                <strong>Important:</strong> This contract is binding. Once accepted, the agreed token amount 
                ({formatTokens(selectedJob.tokens)} $BMAIL) is locked and will be paid upon successful 
                completion, even if token economics change later.
              </div>
            </div>
            
            <div className="modal-actions">
              <button onClick={() => setShowContractModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={confirmContract} className="confirm-btn">
                Accept Contract
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;