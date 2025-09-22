'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  labels: Array<{
    name: string;
    color: string;
  }>;
  assignee: any;
  milestone: any;
}

export default function ContractsPage() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('all');

  useEffect(() => {
    fetchGitHubIssues();
  }, []);

  const fetchGitHubIssues = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/repos/bitcoin-apps-suite/bitcoin-email/issues?state=open&per_page=100'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      
      const data = await response.json();
      setIssues(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  const getBountyAmount = (issue: GitHubIssue): string | null => {
    // Look for bounty amount in labels or issue body
    const bountyLabel = issue.labels.find(label => 
      label.name.toLowerCase().includes('bounty') || 
      label.name.includes('$')
    );
    
    if (bountyLabel) {
      const match = bountyLabel.name.match(/\$?(\d+)/);
      if (match) return `$${match[1]}`;
    }
    
    // Check issue body for bounty amount
    const bodyMatch = issue.body?.match(/[Bb]ounty:?\s*\$?(\d+)/);
    if (bodyMatch) return `$${bodyMatch[1]}`;
    
    return null;
  };

  const getPriorityLevel = (issue: GitHubIssue): 'high' | 'medium' | 'low' => {
    const labels = issue.labels.map(l => l.name.toLowerCase());
    if (labels.includes('urgent') || labels.includes('critical') || labels.includes('high priority')) return 'high';
    if (labels.includes('medium priority')) return 'medium';
    return 'low';
  };

  const getUniqueLabels = (): string[] => {
    const labelSet = new Set<string>();
    issues.forEach(issue => {
      issue.labels.forEach(label => {
        if (!label.name.toLowerCase().includes('bounty')) {
          labelSet.add(label.name);
        }
      });
    });
    return Array.from(labelSet).sort();
  };

  const filteredIssues = selectedLabel === 'all' 
    ? issues 
    : issues.filter(issue => issue.labels.some(l => l.name === selectedLabel));

  const priorityColors = {
    high: 'border-red-500 bg-red-500/10',
    medium: 'border-yellow-500 bg-yellow-500/10',
    low: 'border-gray-500 bg-gray-500/10'
  };

  const priorityBadgeColors = {
    high: 'bg-red-500 text-white',
    medium: 'bg-yellow-500 text-black',
    low: 'bg-gray-500 text-white'
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 mt-4 md:mt-0">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-bitcoin-red-500">Contract</span> Opportunities
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Contribute to Bitcoin Email and earn Bitcoin for your work
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://github.com/bitcoin-apps-suite/bitcoin-email/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-bitcoin-red-500 hover:bg-bitcoin-red-600 rounded-lg font-semibold transition-colors"
            >
              Suggest New Feature
            </a>
            <Link
              href="/contributions"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
            >
              View Contributors
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedLabel('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedLabel === 'all'
                ? 'bg-bitcoin-red-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            All Issues ({issues.length})
          </button>
          {getUniqueLabels().map(label => (
            <button
              key={label}
              onClick={() => setSelectedLabel(label)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLabel === label
                  ? 'bg-bitcoin-red-500 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bitcoin-red-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={fetchGitHubIssues}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Issues Grid */}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredIssues.map(issue => {
              const priority = getPriorityLevel(issue);
              const bounty = getBountyAmount(issue);
              
              return (
                <div
                  key={issue.id}
                  className={`border rounded-xl p-6 hover:scale-[1.02] transition-all duration-200 ${priorityColors[priority]}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-gray-500 text-sm">#{issue.number}</span>
                    <div className="flex gap-2">
                      {bounty && (
                        <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                          {bounty}
                        </span>
                      )}
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityBadgeColors[priority]}`}>
                        {priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {issue.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {issue.body || 'No description available'}
                  </p>
                  
                  {/* Labels */}
                  {issue.labels.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {issue.labels.map(label => (
                        <span
                          key={label.name}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: `#${label.color}20`,
                            borderColor: `#${label.color}`,
                            borderWidth: '1px',
                            color: `#${label.color}`
                          }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                    <span className="text-xs text-gray-500">
                      {new Date(issue.created_at).toLocaleDateString()}
                    </span>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-bitcoin-red-500 hover:bg-bitcoin-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredIssues.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">No open issues found</p>
            <a
              href="https://github.com/bitcoin-apps-suite/bitcoin-email/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bitcoin-red-500 hover:text-bitcoin-red-400 underline"
            >
              Check GitHub for updates
            </a>
          </div>
        )}

        {/* How to Contribute Section */}
        <div className="mt-16 bg-gray-900 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6">How to Contribute</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-bitcoin-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose an Issue</h3>
              <p className="text-gray-400">
                Browse open issues and select one that matches your skills
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bitcoin-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit a PR</h3>
              <p className="text-gray-400">
                Fork the repo, implement your solution, and submit a pull request
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bitcoin-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
              <p className="text-gray-400">
                Once your PR is merged, receive payment in Bitcoin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}