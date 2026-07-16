import { useEffect, useRef, useState } from 'react'
import { Terminal, DollarSign, Clock, AlertCircle, Cpu, Send, Trash2 } from 'lucide-react'
import { useHarnessStore } from '../store/harness'

export function ExecutionPanel() {
  const { tasks, selectedTaskId, followUp, removeTask } = useHarnessStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [followUpText, setFollowUpText] = useState('')

  const activeTask = tasks.find((t) => t.id === selectedTaskId)
  const executionChunks = activeTask?.chunks ?? []
  const isExecuting = activeTask?.status === 'running'
  const activeSessionId = activeTask?.sessionId ?? null

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [executionChunks])

  const modelChunk = executionChunks.find(c => c.type === 'status' && c.meta?.model)
  const doneChunks = executionChunks.filter(c => c.type === 'done')
  const lastDone = doneChunks[doneChunks.length - 1]

  const handleFollowUp = () => {
    const msg = followUpText.trim()
    if (!msg || isExecuting) return
    setFollowUpText('')
    followUp(msg)
  }

  const handleClear = () => {
    if (activeTask) removeTask(activeTask.id)
  }

  const totalCost = doneChunks.reduce((sum, c) => sum + (c.meta?.costUsd ?? 0), 0)

  if (!activeTask) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
        Build a prompt, then click Execute to dispatch it — select a run in the Task Board to view its output.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-3)',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
          background: 'var(--color-surface)',
          fontSize: 'var(--text-xs)',
        }}
      >
        <Terminal size={12} style={{ color: 'var(--color-text-muted)' }} />

        {isExecuting ? (
          <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="dot-online" style={{ width: 6, height: 6, borderRadius: '50%', display: 'inline-block' }} />
            Running...
          </span>
        ) : modelChunk?.meta?.model ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)' }}>
            <Cpu size={10} />
            {modelChunk.meta.model}
          </span>
        ) : (
          <span style={{ color: 'var(--color-text-muted)' }}>Execution output</span>
        )}

        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {lastDone?.meta?.durationMs != null && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)' }}>
              <Clock size={10} />
              {(lastDone.meta.durationMs / 1000).toFixed(1)}s
            </span>
          )}
          {totalCost > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)' }}>
              <DollarSign size={10} />
              {totalCost.toFixed(4)}
            </span>
          )}
          {executionChunks.length > 0 && !isExecuting && (
            <button
              onClick={handleClear}
              title="Remove from Task Board"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Trash2 size={11} />
            </button>
          )}
        </span>
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--space-3)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          lineHeight: 1.7,
          color: 'var(--color-text)',
        }}
      >
        {executionChunks.length === 0 && (
          <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', margin: 0 }}>
            Starting…
          </p>
        )}

        {executionChunks.map((chunk, i) => {
          if (chunk.type === 'text') {
            return <span key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{chunk.text}</span>
          }
          if (chunk.type === 'status' && !chunk.meta?.model) {
            return (
              <div key={i} style={{ color: 'var(--color-text-muted)', margin: 'var(--space-3) 0 var(--space-2)', fontStyle: 'italic' }}>
                {chunk.text}
              </div>
            )
          }
          if (chunk.type === 'error') {
            return (
              <div key={i} style={{ display: 'flex', gap: 'var(--space-2)', color: 'var(--color-danger)', margin: 'var(--space-1) 0' }}>
                <AlertCircle size={12} style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ whiteSpace: 'pre-wrap' }}>{chunk.text}</span>
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Follow-up input — shown after first complete response */}
      {!isExecuting && activeSessionId && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            flexShrink: 0,
          }}
        >
          <input
            type="text"
            className="form-textarea"
            placeholder="Follow-up message… (Enter to send)"
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleFollowUp() } }}
            style={{ flex: 1, height: '34px', padding: '0 var(--space-3)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}
          />
          <button
            className="btn btn-primary"
            onClick={handleFollowUp}
            disabled={!followUpText.trim()}
            style={{ height: '34px', padding: '0 var(--space-3)' }}
          >
            <Send size={12} />
          </button>
        </div>
      )}
    </div>
  )
}
