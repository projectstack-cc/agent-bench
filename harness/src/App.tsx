import { useEffect, useState } from 'react'
import { TitleBar } from './components/TitleBar'
import { AgentSidebar } from './components/AgentSidebar'
import { ExplorerPanel } from './components/ExplorerPanel'
import { DispatchPanel } from './components/DispatchPanel'
import { PromptPreview } from './components/PromptPreview'
import { ExecutionPanel } from './components/ExecutionPanel'
import { FilePanel } from './components/FilePanel'
import { MemoryPanel } from './components/MemoryPanel'
import { StatusBar } from './components/StatusBar'
import { useHarnessStore } from './store/harness'

export default function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [showLogs, setShowLogs] = useState(false)
  const { centerTab, setCenterTab, initTaskBoard } = useHarnessStore()

  useEffect(() => {
    void initTaskBoard()
  }, [initTaskBoard])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'var(--color-bg)',
        overflow: 'hidden',
      }}
    >
      <TitleBar
        onOpenSettings={() => setShowSettings(true)}
        onOpenLogs={() => setShowLogs(true)}
      />

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '220px',
            flexShrink: 0,
            borderRight: '1px solid var(--color-border)',
          }}
        >
          <ExplorerPanel />
          <AgentSidebar />
        </div>

        {/* Center — dispatch + tabbed bottom panel */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <DispatchPanel />

          {/* Tab bar */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              flexShrink: 0,
            }}
          >
            {(['preview', 'output', 'file'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setCenterTab(tab)}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  color: centerTab === tab ? 'var(--color-text)' : 'var(--color-text-muted)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: centerTab === tab
                    ? '1px solid var(--color-accent)'
                    : '1px solid transparent',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  letterSpacing: '0.04em',
                  transition: 'color 0.1s',
                }}
              >
                {tab === 'preview' ? 'Prompt Preview' : tab === 'output' ? 'Execution Output' : 'File'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {centerTab === 'preview' ? <PromptPreview /> : centerTab === 'output' ? <ExecutionPanel /> : <FilePanel />}
          </div>
        </div>

        <MemoryPanel />
      </div>

      <StatusBar />

      {showSettings && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setShowSettings(false)}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              width: '480px',
              maxWidth: '90vw',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--text-base)', fontWeight: 600 }}>
              Settings
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              Vault connection, API keys, and agent configuration — coming soon.
            </p>
            <button className="btn btn-secondary" onClick={() => setShowSettings(false)} style={{ marginTop: 'var(--space-4)' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {showLogs && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setShowLogs(false)}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              width: '560px',
              maxWidth: '90vw',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--text-base)', fontWeight: 600 }}>
              Session Logs
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              Session history viewer — coming soon.
            </p>
            <button className="btn btn-secondary" onClick={() => setShowLogs(false)} style={{ marginTop: 'var(--space-4)' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
