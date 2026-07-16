import { Clock, Database, ListTodo, X } from 'lucide-react'
import { useHarnessStore } from '../store/harness'
import type { VaultMode, ApiProvider } from '../engine/types'
import type { DispatchTask } from '../engine/executor/types'

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

const STATUS_COLOR: Record<DispatchTask['status'], string> = {
  running: 'var(--color-warning)',
  done: 'var(--color-primary)',
  error: 'var(--color-danger)',
}

function TaskRow({ task }: { task: DispatchTask }) {
  const { selectedTaskId, selectTask, setCenterTab, removeTask } = useHarnessStore()
  const selected = selectedTaskId === task.id
  const lastDone = [...task.chunks].reverse().find((c) => c.type === 'done')

  return (
    <div
      onClick={() => { selectTask(task.id); setCenterTab('output') }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-2)',
        padding: 'var(--space-2)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: 'var(--space-1)',
        cursor: 'pointer',
        border: '1px solid var(--color-border)',
        background: selected ? 'var(--color-surface-hover)' : 'transparent',
      }}
      title={task.task}
    >
      <span
        style={{
          width: 6, height: 6, borderRadius: '50%', marginTop: 4, flexShrink: 0,
          background: STATUS_COLOR[task.status],
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
          {task.agent}
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
          {task.task || '(no task text)'}
        </div>
        {task.status === 'done' && lastDone?.meta?.durationMs != null && (
          <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>
            {(lastDone.meta.durationMs / 1000).toFixed(1)}s
            {lastDone.meta.costUsd != null ? ` · $${lastDone.meta.costUsd.toFixed(4)}` : ''}
          </div>
        )}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); removeTask(task.id) }}
        title="Remove"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 2, flexShrink: 0 }}
      >
        <X size={10} />
      </button>
    </div>
  )
}

export function MemoryPanel() {
  const {
    matchedMemories, tasks,
    vaultMode, setVaultMode,
    apiProvider, setApiProvider,
  } = useHarnessStore()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--color-border)',
        width: '200px',
        flexShrink: 0,
        background: 'var(--color-surface)',
        overflowY: 'auto',
      }}
    >
      {/* Task Board — dispatch queue */}
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
        <ListTodo size={10} />
        Task Board
      </div>

      <div style={{ padding: 'var(--space-2)', maxHeight: '260px', overflowY: 'auto' }}>
        {tasks.length > 0 ? (
          tasks.map((t) => <TaskRow key={t.id} task={t} />)
        ) : (
          <div style={{ padding: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            no dispatches yet
          </div>
        )}
      </div>

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
            no memories matched
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
