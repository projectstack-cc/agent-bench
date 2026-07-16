import { useHarnessStore } from '../store/harness'
import type { AgentDef } from '../engine/types'

const AGENT_LABELS: Record<string, string> = {
  ceo:        'CEO',
  frontend:   'Frontend',
  backend:    'Backend',
  'qa-critic':'QA Critic',
  research:   'Research',
  content:    'Content',
  'ue-dev':   'UE Dev',
  ops:        'Ops',
  coo:        'COO',
  cto:        'CTO',
  cfo:        'CFO',
  marketing:  'Marketing',
  product:    'Product',
  ux:         'UX',
  security:   'Security',
  librarian:  'Librarian',
  'zernio-mcp': 'Zernio MCP',
}

function AgentRow({ agent, selected, onClick }: {
  agent: AgentDef
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        width: '100%',
        padding: 'var(--space-2) var(--space-3)',
        background: selected ? 'var(--color-surface-hover)' : 'transparent',
        border: 'none',
        borderLeft: selected ? '2px solid var(--color-primary)' : '2px solid transparent',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background var(--transition-fast)',
      }}
    >
      <span className={`dot dot-${agent.status}`} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: selected ? 600 : 400,
            color: selected ? 'var(--color-text)' : 'var(--color-text-secondary)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {AGENT_LABELS[agent.name] ?? agent.name}
        </div>
        <div
          style={{
            fontSize: '0.65rem',
            color: 'var(--color-text-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {agent.apiPreference === 'none' ? 'vault-only' : agent.apiPreference}
        </div>
      </div>
    </button>
  )
}

export function AgentSidebar() {
  const { agents, selectedAgent, setSelectedAgent } = useHarnessStore()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-surface)',
        flexShrink: 0,
        maxHeight: '260px',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          padding: 'var(--space-2) var(--space-3)',
          borderBottom: '1px solid var(--color-border)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Agents
      </div>

      {agents.map((agent) => (
        <AgentRow
          key={agent.name}
          agent={agent}
          selected={selectedAgent === agent.name}
          onClick={() => setSelectedAgent(agent.name)}
        />
      ))}
    </div>
  )
}
