export type ChunkType = 'text' | 'status' | 'error' | 'done'

export interface ExecutionChunk {
  type: ChunkType
  text: string
  meta?: {
    model?: string
    sessionId?: string
    costUsd?: number
    durationMs?: number
  }
}

export type ChunkHandler = (chunk: ExecutionChunk) => void

export interface ExecuteOptions {
  model?: string
  resumeSessionId?: string
  cwd?: string
  agent?: string
}

export type TaskStatus = 'running' | 'done' | 'error'

export interface DispatchTask {
  id: string
  agent: string
  project: string
  task: string
  model: string
  cwd?: string
  status: TaskStatus
  chunks: ExecutionChunk[]
  sessionId: string | null
  createdAt: number
}

export function extractResponseText(chunks: ExecutionChunk[]): string {
  return chunks.filter((c) => c.type === 'text').map((c) => c.text).join('\n')
}
