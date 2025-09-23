'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Mail, BarChart } from 'lucide-react';

interface Subscriber {
  email: string;
  subscribedAt: string;
  source?: string;
}

interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export default function SPAMDashboard() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, thisWeek: 0, thisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSubscribers();
    const stored = localStorage.getItem('spam-subscribers');
    if (stored) {
      const subs = JSON.parse(stored);
      calculateStats(subs);
    }
  }, []);

  const loadSubscribers = async () => {
    try {
      const response = await fetch('/api/spam/subscribers');
      const data = await response.json();
      
      if (data.subscribers) {
        setSubscribers(data.subscribers);
        calculateStats(data.subscribers);
        localStorage.setItem('spam-subscribers', JSON.stringify(data.subscribers));
      } else {
        const stored = localStorage.getItem('spam-subscribers');
        if (stored) {
          const subs = JSON.parse(stored);
          setSubscribers(subs);
          calculateStats(subs);
        }
      }
    } catch (error) {
      console.error('Error loading subscribers:', error);
      const stored = localStorage.getItem('spam-subscribers');
      if (stored) {
        const subs = JSON.parse(stored);
        setSubscribers(subs);
        calculateStats(subs);
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (subs: Subscriber[]) => {
    const now = new Date();
    const today = now.toDateString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const stats = {
      total: subs.length,
      today: subs.filter(s => new Date(s.subscribedAt).toDateString() === today).length,
      thisWeek: subs.filter(s => new Date(s.subscribedAt) > weekAgo).length,
      thisMonth: subs.filter(s => new Date(s.subscribedAt) > monthAgo).length,
    };

    setStats(stats);
  };

  const sendTestNewsletter = async () => {
    setMessage('Sending test newsletter...');
    try {
      const response = await fetch('/api/spam/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          test: true,
          subject: '🥫 Test SPAM Newsletter',
          content: 'This is a test newsletter from the SPAM Dashboard.'
        })
      });
      const result = await response.json();
      setMessage(result.message || 'Test sent!');
    } catch (error) {
      setMessage('Error sending test newsletter');
    }
  };

  const exportCSV = () => {
    const csv = [
      'Email,Subscribed Date,Source',
      ...subscribers.map(s => `${s.email},${s.subscribedAt},${s.source || 'spam-signup'}`)
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spam-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const testSubscribe = async () => {
    const testEmail = `test-${Date.now()}@bitcoin-email.test`;
    try {
      const response = await fetch('/api/spam/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail })
      });
      const result = await response.json();
      
      const newSub = {
        email: testEmail,
        subscribedAt: new Date().toISOString(),
        source: 'test'
      };
      
      const updatedSubs = [...subscribers, newSub];
      setSubscribers(updatedSubs);
      calculateStats(updatedSubs);
      localStorage.setItem('spam-subscribers', JSON.stringify(updatedSubs));
      
      setMessage(`Test subscriber added: ${testEmail}`);
    } catch (error) {
      setMessage('Error adding test subscriber');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-red-500">🥫 SPAM Dashboard</h1>
          <button
            onClick={loadSubscribers}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Subscribers</p>
                <p className="text-3xl font-bold text-red-500">{stats.total}</p>
              </div>
              <Mail className="h-8 w-8 text-gray-600" />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Today</p>
                <p className="text-3xl font-bold text-green-500">{stats.today}</p>
              </div>
              <BarChart className="h-8 w-8 text-gray-600" />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Week</p>
                <p className="text-3xl font-bold text-yellow-500">{stats.thisWeek}</p>
              </div>
              <BarChart className="h-8 w-8 text-gray-600" />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-3xl font-bold text-purple-500">{stats.thisMonth}</p>
              </div>
              <BarChart className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={testSubscribe}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Add Test Subscriber
          </button>
          <button
            onClick={sendTestNewsletter}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            Send Test Newsletter
          </button>
          <button
            onClick={exportCSV}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Export CSV
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <p className="text-yellow-400">{message}</p>
          </div>
        )}

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Recent Subscribers</h2>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : subscribers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-2 px-4">Email</th>
                    <th className="text-left py-2 px-4">Subscribed</th>
                    <th className="text-left py-2 px-4">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.slice(-10).reverse().map((sub, idx) => (
                    <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800">
                      <td className="py-2 px-4">{sub.email}</td>
                      <td className="py-2 px-4">{new Date(sub.subscribedAt).toLocaleString()}</td>
                      <td className="py-2 px-4">{sub.source || 'spam-signup'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No subscribers yet. Signups will be tracked here.</p>
              <p className="text-sm text-gray-500">Note: Currently using local storage. Configure Google Sheets for persistent storage.</p>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold mb-2 text-yellow-400">⚠️ Important Notes:</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Subscribers are currently stored in browser localStorage (temporary)</li>
            <li>For persistent storage, set up Google Sheets integration (see SUBSCRIBER_SETUP.md)</li>
            <li>Check Vercel Function logs for all signups: <code className="bg-gray-800 px-2 py-1 rounded">vercel logs --follow</code></li>
            <li>Gmail welcome emails will auto-send if configured in .env.local</li>
          </ul>
        </div>
      </div>
    </div>
  );
}