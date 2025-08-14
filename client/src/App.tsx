import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from './lib/api'

interface AppInfo {
  id: string
  name: string
  description: string
  icon: string
  category: string
  provider: string
  url: string
  enabled: boolean
}

const availableApps: AppInfo[] = [
  {
    id: 'claude',
    name: 'CLAUDE',
    description: 'Advanced AI assistant for complex reasoning and code generation',
    icon: '🧠',
    category: 'AI Assistant',
    provider: 'Anthropic',
    url: 'http://provider.sfo.computer:32192/',
    enabled: true,
  },
  {
    id: 'gemini',
    name: 'GEMINI',
    description: 'Multi-modal AI with vision and advanced capabilities',
    icon: '💎',
    category: 'AI Assistant',
    provider: 'Google',
    url: 'http://provider.sfo.computer:32193/',
    enabled: true,
  },
  {
    id: 'visual-studio',
    name: 'VISUAL STUDIO',
    description: 'Professional development environment',
    icon: '💻',
    category: 'Development',
    provider: 'Microsoft',
    url: 'http://provider.sfo.computer:32404/',
    enabled: true,
  },
  {
    id: 'opencode',
    name: 'OPENCODE',
    description: 'Open-source code editor and development platform',
    icon: '🔧',
    category: 'Development',
    provider: 'Community',
    url: 'http://provider.sfo.computer:32406/',
    enabled: true,
  },
  {
    id: 'charm-crush',
    name: 'CHARM CRUSH',
    description: 'Bug crushing and code optimization specialist',
    icon: '🐛',
    category: 'Debugging',
    provider: 'SafeMode',
    url: 'http://provider.sfo.computer:31984/',
    enabled: true,
  },
]

interface RunningApp {
  id: string
  name: string
  icon: string
}

export default function App() {
  const [viewMode, setViewMode] = useState<'retro' | 'dark' | 'cypherpunk'>('retro')
  const [runningApps, setRunningApps] = useState<RunningApp[]>([])
  const [loadingApp, setLoadingApp] = useState<string | null>(null)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [signupEmail, setSignupEmail] = useState('')

  const getThemeClasses = (baseClasses = '') => {
    const themeMap: Record<string, string> = {
      cypherpunk: 'bg-slate-900 border-cyan-400 text-cyan-100',
      dark: 'bg-gray-800 border-gray-600 text-gray-100',
      retro: 'bg-retro-beige border-retro-border text-retro-light',
    }
    return `${baseClasses} ${themeMap[viewMode]}`
  }

  const handleAppLaunch = (appName: string, url?: string) => {
    const finalUrl = url || availableApps.find((a) => a.name === appName)?.url
    if (!finalUrl) return
    const newWindow = window.open(finalUrl, '_blank')
    if (newWindow) newWindow.focus()
    const appInfo = availableApps.find((a) => a.name === appName)
    if (!appInfo) return
    setRunningApps((prev) => {
      const exists = prev.find((app) => app.id === appInfo.id)
      if (!exists) {
        return [...prev, { id: appInfo.id, name: appName, icon: appInfo.icon }]
      }
      return prev
    })
    setLoadingApp(appName)
    setTimeout(() => setLoadingApp(null), 1000)
  }

  const emailSignupMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest('POST', '/api/signup', { email })
    },
    onSuccess: () => {
      alert('Thank you for signing up!')
      setShowSignupModal(false)
      setSignupEmail('')
    },
    onError: (error: any) => {
      alert(error.message || 'Failed to sign up.')
    },
  })

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    emailSignupMutation.mutate(signupEmail)
  }

  return (
    <div className={getThemeClasses('min-h-screen flex flex-col') + ` ${viewMode}`}>
      {/* Top navigation */}
      <div className="flex items-center justify-between px-6 py-3 border-b">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">SafeMode</div>
          <div className="text-sm opacity-70">
            Never send a human to do a machine's job
          </div>
        </div>
        <div>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as any)}
            className="border px-2 py-1 rounded"
          >
            <option value="retro">Retro</option>
            <option value="dark">Dark</option>
            <option value="cypherpunk">Cypherpunk</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <div>Credits: 0</div>
          <button
            onClick={() => setShowSignupModal(true)}
            className="border px-3 py-1 rounded"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-8 flex-1">
        {availableApps
          .filter((app) => app.enabled)
          .map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppLaunch(app.name, app.url)}
              className="flex flex-col items-center justify-center p-4 border rounded hover:bg-opacity-75"
            >
              <div className="text-3xl mb-2">{app.icon}</div>
              <div className="font-semibold">{app.name}</div>
              <div className="text-xs text-center mt-1">{app.description}</div>
            </button>
          ))}
      </div>

      {/* Taskbar */}
      <div className="taskbar border-t p-2 flex items-center space-x-2">
        {runningApps.map((app) => (
          <div key={app.id} className="px-2 py-1 border rounded flex items-center space-x-1">
            <span>{app.icon}</span>
            <span>{app.name}</span>
          </div>
        ))}
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className={getThemeClasses('w-full max-w-md mx-4 rounded-lg shadow-2xl')}>
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-xl font-bold">Join SafeMode</h2>
              <button onClick={() => setShowSignupModal(false)}>✕</button>
            </div>
            <div className="px-6 py-6">
              <p className="text-sm mb-6">
                Get early access to SafeMode and be the first to know when our AI agent team becomes available.
              </p>
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 rounded border"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 border px-3 py-2 rounded"
                  >
                    {emailSignupMutation.isPending ? 'Signing Up...' : 'Sign Up'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSignupModal(false)}
                    className="border px-3 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
