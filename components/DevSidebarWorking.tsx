'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { 
  ChevronLeft,
  ChevronRight,
  Monitor,
  FileCode,
  Users,
  FileText,
  Coins,
  Github,
  GitPullRequest,
  ExternalLink,
  BookOpen,
  History,
  CheckCircle,
  ListTodo,
  Briefcase
} from 'lucide-react'

export default function DevSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Default to collapsed if no preference is saved
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })
  const [issueCount, setIssueCount] = useState<number | null>(null)

  // Fetch GitHub issues count
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-email/issues?state=open')
        const data = await response.json()
        setIssueCount(Array.isArray(data) ? data.length : null)
      } catch (error) {
        console.error('Error fetching issues:', error)
      }
    }
    fetchIssues()
  }, [])

  // Load collapsed state from localStorage and update document class
  useEffect(() => {
    const saved = localStorage.getItem('devSidebarCollapsed')
    if (saved) {
      setIsCollapsed(JSON.parse(saved))
    }
  }, [])

  // Update document class when sidebar state changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isCollapsed) {
        document.documentElement.classList.add('sidebar-collapsed')
        document.documentElement.classList.remove('sidebar-expanded')
      } else {
        document.documentElement.classList.add('sidebar-expanded')
        document.documentElement.classList.remove('sidebar-collapsed')
      }
    }
  }, [isCollapsed])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('devSidebarCollapsed', JSON.stringify(newState))
  }

  const menuItems = [
    { path: '/contracts', icon: Briefcase, label: 'Contracts' },
    { path: '/tasks', icon: ListTodo, label: 'Tasks' },
    { path: '/contributors', icon: Users, label: 'Contributors' },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    { path: '/token', icon: Coins, label: '$BMAIL Token' },
    { divider: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-email', icon: Github, label: 'Repository', external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-email/issues', icon: FileCode, label: 'Issues', badge: issueCount, external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-email/pulls', icon: GitPullRequest, label: 'Pull Requests', external: true },
    { divider: true },
    { path: '/api', icon: FileText, label: 'API Reference' },
    { path: '/changelog', icon: History, label: 'Changelog' },
    { path: '/status', icon: CheckCircle, label: 'Status' },
  ]

  const stats = {
    supply: '1,000,000,000',
    distributed: '150,000',
    contributors: '3',
    openTasks: issueCount || '10+'
  }

  return (
    <div 
      className={`fixed left-0 bottom-0 ${isCollapsed ? 'w-16' : 'w-[260px]'} transition-all duration-300 flex flex-col`}
      style={{
        top: '0',
        paddingTop: '100px',
        backgroundColor: '#111827',
        borderRight: '1px solid #374151',
        zIndex: 1
      }}
    >
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-red-500" />
            <span className="font-semibold text-white">Developer Hub</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            if (item.divider) {
              return <div key={index} className="my-2 border-t border-gray-700" />
            }

            const Icon = item.icon as React.ComponentType<{ className?: string }>
            const isActive = pathname === item.path
            const isExternal = item.external

            const linkContent = (
              <>
                <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-gray-400'}`} />
                {!isCollapsed && (
                  <>
                    <span className={`flex-1 text-sm ${isActive ? 'text-white font-medium' : 'text-gray-300'}`}>
                      {item.label}
                    </span>
                    {item.badge !== null && item.badge !== undefined && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                    {isExternal && <ExternalLink className="w-3 h-3 text-gray-500" />}
                  </>
                )}
              </>
            )

            if (isExternal) {
              return (
                <a
                  key={index}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-800 ${
                    isActive ? 'bg-gray-800' : ''
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  {linkContent}
                </a>
              )
            }

            return (
              <a
                key={index}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-800 ${
                  isActive ? 'bg-gray-800' : ''
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {linkContent}
              </a>
            )
          })}
        </nav>
      </div>

      {!isCollapsed && (
        <>
          <div className="p-4 border-t border-gray-700">
            <div className="text-xs text-gray-500 mb-3">TOKEN STATS</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Supply</span>
                <span className="text-red-500 font-mono">{stats.supply}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Distributed</span>
                <span className="text-green-500">{stats.distributed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contributors</span>
                <span className="text-blue-500">{stats.contributors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Open Tasks</span>
                <span className="text-yellow-500">{stats.openTasks}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">Start Contributing</p>
              <a
                href="/jobs"
                className="block w-full py-2 px-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                View Jobs
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}