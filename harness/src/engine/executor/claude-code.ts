import { Command } from '@tauri-apps/plugin-shell'
import type { ChunkHandler, ExecuteOptions } from './types'
import { toolsForAgent } from './tool-registry'

// `--allowedTools <list>` consumes whatever positional argument follows it —
// including the prompt itself, if the prompt comes after it on the command
// line. That silently ate every dispatched agent's prompt (0-char/0ms results
// in every .ceo-logs entry) and the CLI failed outright with "Input must be
// provided either through stdin or as a prompt argument." Fix: the prompt
// must immediately follow `-p`, before any other flag. Verified directly
// against the installed `claude` CLI, not assumed.

// Silent one-shot call — collects text via streaming, no session saved. Used
// only for internal synthesis (prompt-building, memory promotion), never for
// an agent dispatch, so it gets no tool access at all: the model has all the
// context it needs embedded in the prompt text already.
export async function runClaude(prompt: string, model = 'haiku'): Promise<string> {
  const cmd = Command.create('claude', [
    '-p', prompt,
    '--output-format', 'stream-json', '--verbose',
    '--model', model, '--no-session-persistence',
  ])

  let buf = ''
  let collected = ''

  return new Promise((resolve, reject) => {
    cmd.stdout.on('data', (chunk: string) => {
      buf += chunk
      const lines = buf.split('\n')
      buf = lines.pop() ?? ''
      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const ev = JSON.parse(line) as Record<string, unknown>
          if (ev.type === 'assistant') {
            const content = (ev.message as { content?: Array<{ type: string; text?: string }> })?.content
            const text = content?.find(c => c.type === 'text')?.text ?? ''
            if (text) collected = text
          }
        } catch { /* skip non-JSON lines */ }
      }
    })

    cmd.on('error', (err: string) => reject(new Error(err)))
    cmd.on('close', ({ code }: { code: number | null }) => {
      if (code === 0 || code === null) resolve(collected)
      else reject(new Error(`claude exited ${code}`))
    })

    cmd.spawn().catch(reject)
  })
}

type RawEvent = Record<string, unknown>

export async function executeWithClaude(
  prompt: string,
  onChunk: ChunkHandler,
  options: ExecuteOptions = {}
): Promise<void> {
  const args: string[] = ['-p', prompt, '--output-format', 'stream-json', '--verbose']

  if (options.model) args.push('--model', options.model)
  if (options.resumeSessionId) args.push('--resume', options.resumeSessionId)

  const tools = toolsForAgent(options.agent)
  if (tools.length > 0) args.push('--allowedTools', tools.join(','))

  const cmd = Command.create('claude', args, options.cwd ? { cwd: options.cwd } : undefined)
  let buf = ''

  return new Promise((resolve, reject) => {
    cmd.stdout.on('data', (chunk: string) => {
      buf += chunk
      const lines = buf.split('\n')
      buf = lines.pop() ?? ''
      for (const line of lines) {
        if (!line.trim()) continue
        try {
          parseEvent(JSON.parse(line) as RawEvent, onChunk)
        } catch {
          onChunk({ type: 'text', text: line })
        }
      }
    })

    cmd.stderr.on('data', (line: string) => {
      if (line.trim()) onChunk({ type: 'error', text: line })
    })

    cmd.on('error', (err: string) => reject(new Error(err)))

    cmd.on('close', ({ code }: { code: number | null }) => {
      if (code === 0 || code === null) resolve()
      else reject(new Error(`claude exited with code ${code}`))
    })

    cmd.spawn().catch(reject)
  })
}

function parseEvent(ev: RawEvent, onChunk: ChunkHandler) {
  if (ev.type === 'system' && ev.subtype === 'init') {
    const model = (ev.model as string | undefined) ?? 'claude'
    const sessionId = (ev.session_id as string | undefined) ?? ''
    onChunk({ type: 'status', text: model, meta: { model, sessionId } })
    return
  }

  if (ev.type === 'assistant') {
    const content = (ev.message as { content?: Array<{ type: string; text?: string }> })?.content
    const text = content?.find(c => c.type === 'text')?.text ?? ''
    if (text) onChunk({ type: 'text', text })
    return
  }

  if (ev.type === 'result') {
    const r = ev as { total_cost_usd?: number; duration_ms?: number; subtype?: string; error?: string }
    if (r.subtype === 'error') {
      onChunk({ type: 'error', text: r.error ?? 'Unknown error' })
    }
    onChunk({
      type: 'done',
      text: '',
      meta: { costUsd: r.total_cost_usd, durationMs: r.duration_ms },
    })
    return
  }
}
