import { useState } from 'react'
import { TitleBar } from './components/TitleBar'
import { AgentSidebar } from './components/AgentSidebar'
import { DispatchPanel } from './components/DispatchPanel'
import { PromptPreview } from './components/PromptPreview'
import { MemoryPanel } from './components/MemoryPanel'
import { StatusBar } from './components/StatusBar'

export default function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [showLogs, setShowLogs] = useState(false)

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
      {/* Title bar */}
      <TitleBar
        onOpenSettings={() => setShowSettings(true)}
        onOpenLogs={() => setShowLogs(true)}
      />

      {/* Main area */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* Left sidebar — agent roster */}
        <AgentSidebar />

        {/* Center — dispatch + prompt preview */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <DispatchPanel />
          <PromptPreview />
        </div>

        {/* Right panel — memory + vault/api selectors */}
        <MemoryPanel />
      </div>

      {/* Status bar */}
      <StatusBar />

      {/* Settings modal placeholder */}
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
              Vault connection, API keys, and agent configuration — coming in Phase 3.
            </p>
            <button className="btn btn-secondary" onClick={() => setShowSettings(false)} style={{ marginTop: 'var(--space-4)' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Logs modal placeholder */}
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
              Session history viewer — coming in Phase 6.
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
