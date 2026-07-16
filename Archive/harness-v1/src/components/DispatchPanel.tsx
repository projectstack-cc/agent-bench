import type React from 'react'
import { useState } from 'react'
import { Hammer, Copy, Zap, AlertTriangle, UserPlus } from 'lucide-react'
import { useHarnessStore } from '../store/harness'

const AGENT_OPTIONS = [
  'ceo', 'frontend', 'backend', 'qa-critic',
  'research', 'content', 'ue-dev', 'ops', 'coo',
  'cto', 'cfo', 'marketing', 'product', 'ux', 'security',
  'librarian', 'zernio-mcp',
]

const MODEL_OPTIONS = [
  { value: 'haiku',  label: 'Haiku  — fast / cheap' },
  { value: 'sonnet', label: 'Sonnet — balanced' },
  { value: 'opus',   label: 'Opus   — powerful' },
  { value: 'fable',  label: 'Fable  — latest' },
]

export function DispatchPanel() {
  const {
    task, setTask,
    selectedAgent, setSelectedAgent,
    activeProject, projects, setActiveProject,
    selectedModel, setSelectedModel,
    builtPrompt, challenges, isBuilding,
    buildPrompt, copyToClipboard, execute, hireAgent,
  } = useHarnessStore()
  const [isHiring, setIsHiring] = useState(false)

  const handleBuild = () => buildPrompt()
  const handleCopy = () => copyToClipboard()
  const handleExecute = () => execute()
  const handleHireAgent = async () => {
    setIsHiring(true)
    try {
      await hireAgent(task)
    } finally {
      setIsHiring(false)
    }
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 'var(--space-2)',
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

      {/* Agent + Project + Model row */}
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Route to</label>
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
          <label style={labelStyle}>Project</label>
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

        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Model</label>
          <select
            className="form-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{ height: '36px' }}
          >
            {MODEL_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Challenge / firewall warnings */}
      {challenges.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
            padding: 'var(--space-2) var(--space-3)',
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-warning)',
          }}
        >
          {challenges.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <AlertTriangle size={12} style={{ flexShrink: 0 }} />
              {c}
            </div>
          ))}
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
          disabled={!builtPrompt}
          title="Dispatch — runs in the Task Board (Ctrl+Shift+E)"
        >
          <Zap size={14} />
          Execute
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleHireAgent}
          disabled={!task.trim() || isHiring}
          title="Hire a new agent — research existing patterns, draft, and review a new agent definition for the gap described in Task above (3 chained dispatches, no Build Prompt needed)"
        >
          <UserPlus size={14} />
          {isHiring ? 'Hiring...' : 'Hire Agent'}
        </button>
      </div>
    </div>
  )
}
