import { useHarnessStore } from '../store/harness'

export function StatusBar() {
  const { agents, vaultMode, activeProject, vaultPath } = useHarnessStore()

  const vaultLabel = vaultMode === 'direct'
    ? vaultPath ? 'direct' : 'direct (no path set)'
    : vaultMode === 'obsidian'
    ? 'obsidian vault'
    : 'mcp'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: '0 var(--space-4)',
        height: '24px',
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
          fontSize: '0.65rem',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span className="dot dot-online" style={{ width: 5, height: 5 }} />
        vault: {vaultLabel}
      </span>

      <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
        {agents.length} agents
      </span>

      <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
        project: {activeProject}
      </span>

      <span style={{ flex: 1 }} />

      <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
        ctrl+enter to build · ctrl+shift+c to copy
      </span>
    </div>
  )
}
