import { create } from 'zustand'
import type { AgentDef, Memory, SessionLog, VaultMode, ApiProvider } from '../engine/types'

interface HarnessStore {
  // Active state
  activeProject: string
  selectedAgent: string
  task: string
  builtPrompt: string | null
  matchedMemories: Memory[]
  sessions: SessionLog[]
  isBuilding: boolean
  isExecuting: boolean

  // Config
  vaultMode: VaultMode
  vaultPath: string
  apiProvider: ApiProvider
  apiKeys: Record<ApiProvider, string>

  // Loaded data
  agents: AgentDef[]
  projects: string[]

  // Actions
  setActiveProject: (project: string) => void
  setSelectedAgent: (agent: string) => void
  setTask: (task: string) => void
  setVaultMode: (mode: VaultMode) => void
  setVaultPath: (path: string) => void
  setApiProvider: (provider: ApiProvider) => void
  setApiKey: (provider: ApiProvider, key: string) => void
  setBuiltPrompt: (prompt: string | null) => void
  setMatchedMemories: (memories: Memory[]) => void
  addSession: (session: SessionLog) => void
}

// Hardcoded agent roster (Phase 3 will load from vault)
const DEFAULT_AGENTS: AgentDef[] = [
  { name: 'ceo',        role: 'Orchestrator & Router',          apiPreference: 'claude',      status: 'idle' },
  { name: 'frontend',   role: 'UI/UX Engineer',                  apiPreference: 'openrouter',  status: 'idle' },
  { name: 'backend',    role: 'Backend & API Architect',          apiPreference: 'openrouter',  status: 'idle' },
  { name: 'qa-critic',  role: 'Code Reviewer',                   apiPreference: 'claude',      status: 'idle' },
  { name: 'research',   role: 'Market & Trend Analyst',           apiPreference: 'claude',      status: 'idle' },
  { name: 'content',    role: 'Marketing Copywriter',             apiPreference: 'claude',      status: 'idle' },
  { name: 'ue-dev',     role: 'Unreal Engine Developer',          apiPreference: 'claude',      status: 'idle' },
  { name: 'librarian',  role: 'Vault Organizer',                  apiPreference: 'none',        status: 'idle' },
  { name: 'zernio-mcp', role: 'Social Media Publisher',           apiPreference: 'claude',      status: 'idle' },
]

export const useHarnessStore = create<HarnessStore>((set) => ({
  activeProject: 'general',
  selectedAgent: 'ceo',
  task: '',
  builtPrompt: null,
  matchedMemories: [],
  sessions: [],
  isBuilding: false,
  isExecuting: false,

  vaultMode: 'direct',
  vaultPath: '',
  apiProvider: 'claude',
  apiKeys: { claude: '', openrouter: '', openai: '', ollama: '' },

  agents: DEFAULT_AGENTS,
  projects: ['general', 'tiny-world', 'tapin'],

  setActiveProject: (project) => set({ activeProject: project }),
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  setTask: (task) => set({ task }),
  setVaultMode: (vaultMode) => set({ vaultMode }),
  setVaultPath: (vaultPath) => set({ vaultPath }),
  setApiProvider: (apiProvider) => set({ apiProvider }),
  setApiKey: (provider, key) =>
    set((s) => ({ apiKeys: { ...s.apiKeys, [provider]: key } })),
  setBuiltPrompt: (builtPrompt) => set({ builtPrompt }),
  setMatchedMemories: (matchedMemories) => set({ matchedMemories }),
  addSession: (session) =>
    set((s) => ({ sessions: [session, ...s.sessions] })),
}))
