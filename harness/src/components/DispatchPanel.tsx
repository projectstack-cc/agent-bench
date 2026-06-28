import { Hammer, Copy, Zap, AlertTriangle } from 'lucide-react'
import { useHarnessStore } from '../store/harness'

const AGENT_OPTIONS = [
  'ceo', 'frontend', 'backend', 'qa-critic',
  'research', 'content', 'ue-dev', 'librarian', 'zernio-mcp',
]

export function DispatchPanel() {
  const {
    task, setTask,
    selectedAgent, setSelectedAgent,
    activeProject, projects, setActiveProject,
    builtPrompt, isBuilding, isExecuting,
  } = useHarnessStore()

  const handleBuild = () => {
    // Phase 2: wire CEO engine
    console.log('TODO: build prompt', { task, selectedAgent, activeProject })
  }

  const handleCopy = () => {
    if (builtPrompt) navigator.clipboard.writeText(builtPrompt)
  }

  const handleExecute = () => {
    // Phase 5: wire API layer
    console.log('TODO: execute via API')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        padding: 'var(--space-4)',
        borderBottom: '1px solid var(--color-border)',
        flexShrink: 0,
      }}
    >
      {/* Task input */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 'var(--space-2)',
          }}
        >
          Task
        </label>
        <textarea
          className="form-textarea"
          rows={4}
          placeholder="Describe what you need the agent to do..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) handleBuild()
          }}
          style={{ width: '100%' }}
        />
      </div>

      {/* Agent + Project row */}
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <div style={{ flex: 1 }}>
          <label
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 'var(--space-2)',
            }}
          >
            Route to
          </label>
          <select
            className="form-select"
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            style={{ height: '36px' }}
          >
            {AGENT_OPTIONS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 'var(--space-2)',
            }}
          >
            Project
          </label>
          <select
            className="form-select"
            value={activeProject}
            onChange={(e) => setActiveProject(e.target.value)}
            style={{ height: '36px' }}
          >
            {projects.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Challenge warning (placeholder) */}
      {task.toLowerCase().includes('rewrite everything') && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-warning)',
          }}
        >
          <AlertTriangle size={12} />
          Challenge detected: scope trigger keyword
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <button
          className="btn btn-primary"
          onClick={handleBuild}
          disabled={!task.trim() || isBuilding}
          style={{ flex: 1 }}
          title="Build Prompt (Ctrl+Enter)"
        >
          <Hammer size={14} />
          {isBuilding ? 'Building...' : 'Build Prompt'}
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleCopy}
          disabled={!builtPrompt}
          title="Copy to Clipboard (Ctrl+Shift+C)"
        >
          <Copy size={14} />
          Copy
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleExecute}
          disabled={!builtPrompt || isExecuting}
          title="Execute via API (Ctrl+Shift+E)"
        >
          <Zap size={14} />
          {isExecuting ? 'Running...' : 'Execute'}
        </button>
      </div>
    </div>
  )
}
