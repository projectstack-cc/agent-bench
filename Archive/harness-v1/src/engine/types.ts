export interface AgentDef {
  name: string
  role: string
  apiPreference: 'claude' | 'openrouter' | 'openai' | 'ollama' | 'none'
  status: 'online' | 'idle' | 'offline'
}

export interface ProjectContext {
  name: string
  prd?: string
  apiContract?: string
  decisions?: string
  conventions?: string
  readme?: string
}

export interface Memory {
  id: string
  agent?: string
  project?: string
  timestamp: number
  title: string
  content: string
  score?: number
}

export interface SessionLog {
  timestamp: string
  agent: string
  project: string
  task: string
  apiRouting: string
  vaultMode: 'direct' | 'obsidian' | 'mcp'
  promptLengthChars: number
  responseLengthChars: number
  memoriesInjected: number
  challenges: string[]
  durationMs: number
}

export type VaultMode = 'direct' | 'obsidian' | 'mcp'
export type ApiProvider = 'claude' | 'openrouter' | 'openai' | 'ollama'
