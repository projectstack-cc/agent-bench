import { create } from 'zustand'
import type { AgentDef, Memory, SessionLog, VaultMode, ApiProvider } from '../engine/types'
import type { DispatchTask, ExecutionChunk } from '../engine/executor/types'
import { extractResponseText } from '../engine/executor/types'
import type { FileNode } from '../engine/workspace/fs'
import { assemblePrompt, rankMemories } from '../engine/ceo'
import { DirectConnector } from '../engine/vault/direct'
import { executeWithClaude, runClaude } from '../engine/executor/claude-code'
import { pickFolder, listDir, readWorkspaceFile } from '../engine/workspace/fs'
import { initDispatchStore, loadRecentDispatches, saveDispatch, deleteDispatch } from '../engine/db/dispatches'

interface HarnessStore {
  // Active state
  activeProject: string
  selectedAgent: string
  task: string
  builtPrompt: string | null
  challenges: string[]
  matchedMemories: Memory[]
  isBuilding: boolean
  centerTab: 'preview' | 'output' | 'file'
  selectedModel: string

  // Task Board (dispatch queue) — each Execute click spawns an independent tracked task
  tasks: DispatchTask[]
  selectedTaskId: string | null

  // Config
  vaultMode: VaultMode
  vaultPath: string
  apiProvider: ApiProvider
  apiKeys: Record<ApiProvider, string>

  // Loaded data
  agents: AgentDef[]
  projects: string[]

  // Workspace (Open Folder — separate from the vault)
  workspaceRoot: string | null
  workspaceEntries: Record<string, FileNode[]>
  expandedDirs: Record<string, boolean>
  selectedFilePath: string | null
  fileContent: string | null
  isFileLoading: boolean

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
  setSelectedModel: (model: string) => void
  buildPrompt: () => Promise<void>
  copyToClipboard: () => void
  execute: () => Promise<void>
  followUp: (message: string) => Promise<void>
  runDispatch: (params: { agent: string; project: string; task: string; prompt: string }) => Promise<DispatchTask>
  hireAgent: (gapDescription: string) => Promise<void>
  finalizeTask: (id: string) => void
  initTaskBoard: () => Promise<void>
  selectTask: (id: string | null) => void
  removeTask: (id: string) => void
  setCenterTab: (tab: 'preview' | 'output' | 'file') => void
  openFolder: () => Promise<void>
  toggleDir: (path: string) => Promise<void>
  openFile: (path: string) => Promise<void>
}

const DEFAULT_AGENTS: AgentDef[] = [
  { name: 'ceo',        role: 'Orchestrator & Router',          apiPreference: 'claude',      status: 'idle' },
  { name: 'frontend',   role: 'UI/UX Engineer',                  apiPreference: 'openrouter',  status: 'idle' },
  { name: 'backend',    role: 'Backend & API Architect',          apiPreference: 'openrouter',  status: 'idle' },
  { name: 'qa-critic',  role: 'Code Reviewer',                   apiPreference: 'claude',      status: 'idle' },
  { name: 'research',   role: 'Market & Trend Analyst',           apiPreference: 'claude',      status: 'idle' },
  { name: 'content',    role: 'Marketing Copywriter',             apiPreference: 'claude',      status: 'idle' },
  { name: 'ue-dev',     role: 'Unreal Engine Developer',          apiPreference: 'claude',      status: 'idle' },
  { name: 'ops',        role: 'Release & Reliability Engineer',   apiPreference: 'openrouter',  status: 'idle' },
  { name: 'coo',        role: 'Chief Opportunity Officer',        apiPreference: 'claude',      status: 'idle' },
  { name: 'cto',        role: 'Chief Technology Officer',         apiPreference: 'claude',      status: 'idle' },
  { name: 'cfo',        role: 'Chief Financial Officer',          apiPreference: 'claude',      status: 'idle' },
  { name: 'marketing',  role: 'Marketing Director',               apiPreference: 'claude',      status: 'idle' },
  { name: 'product',    role: 'Product Strategist',               apiPreference: 'claude',      status: 'idle' },
  { name: 'ux',         role: 'UX Director',                      apiPreference: 'claude',      status: 'idle' },
  { name: 'security',   role: 'Security Director',                apiPreference: 'claude',      status: 'idle' },
  { name: 'librarian',  role: 'Vault Organizer',                  apiPreference: 'none',        status: 'idle' },
  { name: 'zernio-mcp', role: 'Social Media Publisher',           apiPreference: 'claude',      status: 'idle' },
]

function appendTaskChunk(taskId: string, chunk: ExecutionChunk, state: HarnessStore): Partial<HarnessStore> {
  return {
    tasks: state.tasks.map((t) => {
      if (t.id !== taskId) return t
      const sessionId = chunk.type === 'status' && chunk.meta?.sessionId ? chunk.meta.sessionId : t.sessionId
      return { ...t, chunks: [...t.chunks, chunk], sessionId }
    }),
  }
}

function setTaskStatus(taskId: string, status: DispatchTask['status'], state: HarnessStore): Partial<HarnessStore> {
  return { tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)) }
}

export const useHarnessStore = create<HarnessStore>((set, get) => ({
  activeProject: 'general',
  selectedAgent: 'ceo',
  task: '',
  builtPrompt: null,
  challenges: [],
  matchedMemories: [],
  isBuilding: false,
  centerTab: 'preview',
  selectedModel: 'haiku',

  tasks: [],
  selectedTaskId: null,

  vaultMode: 'direct',
  vaultPath: 'C:\\Users\\scook\\.dev\\agent-bench',
  apiProvider: 'claude',
  apiKeys: { claude: '', openrouter: '', openai: '', ollama: '' },

  agents: DEFAULT_AGENTS,
  projects: ['general', 'tiny-world', 'tapin'],

  workspaceRoot: null,
  workspaceEntries: {},
  expandedDirs: {},
  selectedFilePath: null,
  fileContent: null,
  isFileLoading: false,

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
  setSelectedModel: (selectedModel) => set({ selectedModel }),
  setCenterTab: (tab) => set({ centerTab: tab }),

  initTaskBoard: async () => {
    try {
      await initDispatchStore()
      const tasks = await loadRecentDispatches()
      set({ tasks })
    } catch (e) {
      console.warn('[initTaskBoard] failed to load dispatch history:', e)
    }
  },

  selectTask: (id) => set({ selectedTaskId: id }),

  removeTask: (id) => {
    set((s) => ({
      tasks: s.tasks.filter((t) => t.id !== id),
      selectedTaskId: s.selectedTaskId === id ? null : s.selectedTaskId,
    }))
    void deleteDispatch(id).catch((e) => console.warn('[removeTask] db delete failed:', e))
  },

  openFolder: async () => {
    const path = await pickFolder()
    if (!path) return
    const children = await listDir(path)
    set({
      workspaceRoot: path,
      workspaceEntries: { [path]: children },
      expandedDirs: { [path]: true },
      selectedFilePath: null,
      fileContent: null,
    })
  },

  toggleDir: async (path: string) => {
    const { expandedDirs, workspaceEntries } = get()
    if (expandedDirs[path]) {
      set({ expandedDirs: { ...expandedDirs, [path]: false } })
      return
    }
    if (!workspaceEntries[path]) {
      const children = await listDir(path)
      set((s) => ({ workspaceEntries: { ...s.workspaceEntries, [path]: children } }))
    }
    set((s) => ({ expandedDirs: { ...s.expandedDirs, [path]: true } }))
  },

  openFile: async (path: string) => {
    set({ selectedFilePath: path, centerTab: 'file', isFileLoading: true, fileContent: null })
    try {
      const content = await readWorkspaceFile(path)
      set({ fileContent: content })
    } catch (e) {
      set({ fileContent: `[failed to read file: ${e instanceof Error ? e.message : String(e)}]` })
    } finally {
      set({ isFileLoading: false })
    }
  },

  buildPrompt: async () => {
    const { task, selectedAgent, activeProject, vaultPath } = get()
    if (!task.trim()) return

    set({ isBuilding: true, builtPrompt: null, challenges: [] })
    try {
      const vault = new DirectConnector(vaultPath)
      const result = await assemblePrompt({ task, agent: selectedAgent, project: activeProject, vault })

      if (result.blocked) {
        set({ challenges: result.challenges, builtPrompt: null })
        return
      }

      const memories = await vault.loadMemories(selectedAgent, activeProject)
      const ranked = rankMemories(task, memories)

      // Build synthesis prompt from raw ingredients (not the template)
      const agentDef = await vault.loadAgent(selectedAgent)
      const projectCtx = await vault.loadProjectContext(activeProject)
      const memSnippets = ranked
        .slice(0, 3)
        .map(m => `[${m.title}]: ${m.content.slice(0, 400)}`)
        .join('\n')

      const projectSnippet = [
        projectCtx.prd && `PRD: ${projectCtx.prd.slice(0, 600)}`,
        projectCtx.decisions && `Decisions: ${projectCtx.decisions.slice(0, 400)}`,
        projectCtx.conventions && `Conventions: ${projectCtx.conventions.slice(0, 400)}`,
      ].filter(Boolean).join('\n')

      const synthesisInput = [
        `You are a senior software architect writing a precise task prompt for an AI coding agent.`,
        ``,
        `Target agent: ${selectedAgent}`,
        `Agent role and capabilities:`,
        agentDef.slice(0, 800),
        ``,
        `Project: ${activeProject}`,
        projectSnippet ? `Project context:\n${projectSnippet}` : '',
        memSnippets ? `Relevant memories:\n${memSnippets}` : '',
        ``,
        `User's task: ${task}`,
        ``,
        `Write a tight, specific prompt for the agent. Address the agent directly (second person).`,
        `Be concrete — reference the actual project, files, or patterns where relevant.`,
        `200–500 words. Output ONLY the prompt, no preamble or commentary.`,
      ].filter(l => l !== undefined).join('\n')

      let finalPrompt = result.prompt
      try {
        const synthesized = await runClaude(synthesisInput, 'haiku')
        if (synthesized.trim()) finalPrompt = synthesized
      } catch (synthErr) {
        console.warn('[buildPrompt] AI synthesis failed, using template fallback:', synthErr)
      }

      set({ builtPrompt: finalPrompt, challenges: result.challenges, matchedMemories: ranked })
    } finally {
      set({ isBuilding: false })
    }
  },

  copyToClipboard: () => {
    const { builtPrompt } = get()
    if (builtPrompt) navigator.clipboard.writeText(builtPrompt)
  },

  execute: async () => {
    const { builtPrompt, selectedAgent, activeProject, task } = get()
    if (!builtPrompt) return
    await get().runDispatch({ agent: selectedAgent, project: activeProject, task, prompt: builtPrompt })
  },

  // Shared dispatch core — one tracked Task Board row per call. Used directly by
  // execute() (UI-driven, prompt already built) and by workflow steps like
  // hireAgent() (prompt assembled per-step, chained from the prior step's output).
  runDispatch: async ({ agent, project, task, prompt }) => {
    const { selectedModel, workspaceRoot } = get()

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const newTask: DispatchTask = {
      id,
      agent,
      project,
      task,
      model: selectedModel,
      cwd: workspaceRoot ?? undefined,
      status: 'running',
      chunks: [],
      sessionId: null,
      createdAt: Date.now(),
    }
    set((s) => ({ tasks: [newTask, ...s.tasks], selectedTaskId: id, centerTab: 'output' }))
    void saveDispatch(newTask).catch((e) => console.warn('[runDispatch] db insert failed:', e))

    try {
      await executeWithClaude(prompt, (chunk) => {
        set((s) => appendTaskChunk(id, chunk, s))
      }, { model: selectedModel, cwd: workspaceRoot ?? undefined, agent })
      set((s) => setTaskStatus(id, 'done', s))
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      set((s) => appendTaskChunk(id, { type: 'error', text: msg }, s))
      set((s) => setTaskStatus(id, 'error', s))
    } finally {
      get().finalizeTask(id)
    }
    return get().tasks.find((t) => t.id === id)!
  },

  hireAgent: async (gapDescription: string) => {
    const { vaultPath } = get()
    const vault = new DirectConnector(vaultPath)
    const project = 'general' // hiring a new agent is a harness-level operation, not project-specific

    const runStep = async (agent: string, stepTask: string) => {
      const result = await assemblePrompt({ task: stepTask, agent, project, vault })
      const finished = await get().runDispatch({ agent, project, task: stepTask, prompt: result.prompt })
      return extractResponseText(finished.chunks)
    }

    const researchText = await runStep(
      'research',
      `Search for existing AI agent definitions, prompts, or skill patterns (e.g. on GitHub, in public agent frameworks) that address this capability gap: "${gapDescription}". Return 2-3 concrete candidates with source names/links and a brief fit assessment for each — which one best matches this need and why.`
    )

    const draftText = await runStep(
      'ceo',
      `Based on this research into existing patterns:\n\n${researchText}\n\nDraft a new agent definition for the harness team addressing this capability gap: "${gapDescription}". Adapt the best-fit candidate above rather than writing from scratch. Match the existing agent definition format used in this harness: a "# Agent: {name}" header, "## Identity" section, "## Core Responsibilities" table, "## Deliverables Format" section, and "## Challenge Protocol" section. Output ONLY the markdown file content for Agents/agent-{name}.md, no preamble or commentary.`
    )

    await runStep(
      'qa-critic',
      `Review this draft agent definition against the librarian's Agent Definition Health checklist: has "# Agent: {name}" header, has "## Identity", has "## Core Responsibilities" or equivalent, has "## Deliverables Format", has "## Challenge Protocol", references a real/correct project stack (not generic filler), no broken internal links, file size reasonable (<20KB). Flag any issues found — don't rewrite it yourself, just review:\n\n${draftText}`
    )
  },

  followUp: async (message: string) => {
    const { tasks, selectedTaskId, selectedModel } = get()
    const activeTask = tasks.find((t) => t.id === selectedTaskId)
    if (!activeTask?.sessionId || !message.trim()) return
    const id = activeTask.id

    set((s) => appendTaskChunk(id, { type: 'status', text: `─── you: ${message} ───` }, s))
    set((s) => setTaskStatus(id, 'running', s))
    try {
      await executeWithClaude(message, (chunk) => {
        set((s) => appendTaskChunk(id, chunk, s))
      }, { model: selectedModel, resumeSessionId: activeTask.sessionId, cwd: activeTask.cwd, agent: activeTask.agent })
      set((s) => setTaskStatus(id, 'done', s))
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      set((s) => appendTaskChunk(id, { type: 'error', text: msg }, s))
      set((s) => setTaskStatus(id, 'error', s))
    } finally {
      get().finalizeTask(id)
    }
  },

  finalizeTask: (id: string) => {
    const { tasks, vaultMode, vaultPath, matchedMemories, challenges } = get()
    const finalTask = tasks.find((t) => t.id === id)
    if (!finalTask) return

    void saveDispatch(finalTask).catch((e) => console.warn('[finalizeTask] db update failed:', e))

    const responseText = finalTask.chunks.filter((c) => c.type === 'text').map((c) => c.text).join('\n')
    const lastDone = [...finalTask.chunks].reverse().find((c) => c.type === 'done')

    const log: SessionLog = {
      timestamp: new Date(finalTask.createdAt).toISOString(),
      agent: finalTask.agent,
      project: finalTask.project,
      task: finalTask.task,
      apiRouting: finalTask.model,
      vaultMode,
      promptLengthChars: finalTask.task.length,
      responseLengthChars: responseText.length,
      memoriesInjected: matchedMemories.length,
      challenges,
      durationMs: lastDone?.meta?.durationMs ?? 0,
    }
    const vault = new DirectConnector(vaultPath)
    void vault.writeSessionLog(log).catch((e) => console.warn('[finalizeTask] vault audit log failed:', e))

    // Memory Promotion Pipeline — every completed dispatch attempts promotion; the
    // synthesis step itself is the quality gate (skips via NOTHING_DURABLE sentinel).
    if (finalTask.status === 'done' && responseText.trim()) {
      void (async () => {
        try {
          const synthInput = [
            `You just completed a dispatch as the "${finalTask.agent}" agent on project "${finalTask.project}".`,
            ``,
            `Task given: ${finalTask.task}`,
            ``,
            `Final output:`,
            responseText.slice(0, 4000),
            ``,
            `Write a short durable memory note (3-6 sentences) capturing what was learned or decided —`,
            `facts, conventions, gotchas, or outcomes future dispatches to this agent/project should know.`,
            `Skip generic restating of the task. If nothing durable was learned, respond with exactly:`,
            `NOTHING_DURABLE`,
            `Output ONLY the note text (or NOTHING_DURABLE), no preamble.`,
          ].join('\n')
          const synthesized = (await runClaude(synthInput, 'haiku')).trim()
          if (!synthesized || synthesized === 'NOTHING_DURABLE') return

          const memoryContent = [
            `# ${finalTask.agent} / ${finalTask.project}`,
            ``,
            synthesized,
            ``,
            `---`,
            `Source: dispatch ${finalTask.id} · model ${finalTask.model} · ${new Date(finalTask.createdAt).toISOString()}`,
          ].join('\n')
          await vault.writeMemory(finalTask.agent, finalTask.project, memoryContent)
        } catch (e) {
          console.warn('[finalizeTask] memory promotion failed:', e)
        }
      })()
    }
  },
}))
