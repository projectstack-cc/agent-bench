import { Settings, ScrollText, Bot } from 'lucide-react'
import { useHarnessStore } from '../store/harness'

interface TitleBarProps {
  onOpenSettings: () => void
  onOpenLogs: () => void
}

export function TitleBar({ onOpenSettings, onOpenLogs }: TitleBarProps) {
  const { activeProject, projects, setActiveProject } = useHarnessStore()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: '0 var(--space-4)',
        height: '44px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      <Bot size={16} color="var(--color-primary)" strokeWidth={2} />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--color-text)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Agent Harness
      </span>

      <div style={{ flex: 1 }} />

      {/* Project switcher */}
      <div style={{ position: 'relative' }}>
        <select
          value={activeProject}
          onChange={(e) => setActiveProject(e.target.value)}
          className="form-select"
          style={{
            padding: 'var(--space-1) var(--space-3)',
            minHeight: 'unset',
            height: '30px',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            width: 'auto',
            minWidth: '140px',
            cursor: 'pointer',
          }}
        >
          {projects.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
        <button
          className="btn btn-ghost"
          onClick={onOpenSettings}
          title="Settings"
          style={{ minHeight: '30px', padding: 'var(--space-1) var(--space-2)' }}
        >
          <Settings size={14} />
          <span style={{ fontSize: 'var(--text-xs)' }}>Settings</span>
        </button>
        <button
          className="btn btn-ghost"
          onClick={onOpenLogs}
          title="Session Logs"
          style={{ minHeight: '30px', padding: 'var(--space-1) var(--space-2)' }}
        >
          <ScrollText size={14} />
          <span style={{ fontSize: 'var(--text-xs)' }}>Logs</span>
        </button>
      </div>
    </div>
  )
}
