import { Clock, Database } from 'lucide-react'
import { useHarnessStore } from '../store/harness'
import type { VaultMode, ApiProvider } from '../engine/types'

const VAULT_OPTIONS: { value: VaultMode; label: string }[] = [
  { value: 'direct',   label: 'Direct' },
  { value: 'obsidian', label: 'Obsidian' },
  { value: 'mcp',      label: 'MCP' },
]

const API_OPTIONS: { value: ApiProvider; label: string }[] = [
  { value: 'claude',      label: 'Claude' },
  { value: 'openrouter',  label: 'OpenRouter' },
  { value: 'openai',      label: 'OpenAI' },
  { value: 'ollama',      label: 'Ollama' },
]

export function MemoryPanel() {
  const {
    matchedMemories, sessions,
    vaultMode, setVaultMode,
    apiProvider, setApiProvider,
  } = useHarnessStore()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--color-border)',
        width: '160px',
        flexShrink: 0,
        background: 'var(--color-surface)',
        overflowY: 'auto',
      }}
    >
      {/* Memory section */}
      <div
        style={{
          padding: 'var(--space-2) var(--space-3)',
          borderBottom: '1px solid var(--color-border)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
        }}
      >
        <Clock size={10} />
        Memory
      </div>

      <div style={{ padding: 'var(--space-2)' }}>
        {matchedMemories.length > 0 ? (
          matchedMemories.map((mem) => (
            <div
              key={mem.id}
              style={{
                padding: 'var(--space-2)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 'var(--space-1)',
                cursor: 'pointer',
                border: '1px solid var(--color-border)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
              }}
              title={mem.content.slice(0, 200)}
            >
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)', marginBottom: 2 }}>
                {mem.title.slice(0, 20)}
              </div>
              <div style={{ color: 'var(--color-text-muted)' }}>
                {mem.agent ?? mem.project}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            {sessions.length > 0 ? `${sessions.length} session${sessions.length > 1 ? 's' : ''}` : 'no sessions yet'}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      {/* Vault selector */}
      <div
        style={{
          borderTop: '1px solid var(--color-border)',
          padding: 'var(--space-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 'var(--space-1)',
            }}
          >
            <Database size={9} /> Vault
          </div>
          <select
            className="form-select"
            value={vaultMode}
            onChange={(e) => setVaultMode(e.target.value as VaultMode)}
            style={{ height: '28px', fontSize: 'var(--text-xs)' }}
          >
            {VAULT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <div
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 'var(--space-1)',
            }}
          >
            API
          </div>
          <select
            className="form-select"
            value={apiProvider}
            onChange={(e) => setApiProvider(e.target.value as ApiProvider)}
            style={{ height: '28px', fontSize: 'var(--text-xs)' }}
          >
            {API_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
