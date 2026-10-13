# Agent Harness v2 — Tauri Desktop IDE
## End-to-End Scope Plan
**Date:** 2026-06-27
**Owner:** Zer0Flaw
**Shell:** Tauri 2.x (Rust) + React + Vite + TypeScript + Tailwind
**Status:** Phase 0 — In Progress

---

## What We're Building

A standalone desktop app (.exe) that is the permanent home for the Zer0Flaw agent team.
Open it, pick a project, write a task — the CEO assembles the full agent prompt with all
relevant context and memory injected. Copy to Cline, or execute directly via API.

**Three vault connection modes:** Direct file path | Obsidian vault (OneDrive) | MCP server
**Pluggable APIs:** Claude | OpenRouter | OpenAI | Ollama — per-agent or global override
**IDE UI style:** From agent-frontend.md design system — monospace, dark, hairline borders, no glassmorphism

---

## UI Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ [≡] AGENT HARNESS          [tiny-world ▾]   [Settings] [Logs]  │  ← TitleBar
├───────────────┬─────────────────────────────────────────────────┤
│ AGENTS        │ DISPATCH                                        │
│               │                                                 │
│ ● CEO         │  Task ───────────────────────────────────────── │
│ ● frontend    │  ┌───────────────────────────────────────────┐  │
│ ● backend     │  │ Build the login page for TapIn...         │  │
│ ● qa-critic   │  │                                           │  │
│ ● research    │  └───────────────────────────────────────────┘  │
│ ● content     │                                                 │
│ ● ue-dev      │  Route to ──────────── Project ──────────────── │
│ ● librarian   │  [CEO (auto) ▾]          [tiny-world ▾]        │
│ ● zernio-mcp  │                                                 │
│               │  [Build Prompt]   [Copy]   [Execute via API]   │
├───────────────├─────────────────────────────────────────────────┤
│ MEMORY        │ PROMPT PREVIEW                          [chars] │
│               │                                                 │
│ 3 sessions    │  # CEO Dispatch                                 │
│ › 20260627    │  **Agent:** frontend                            │
│ › 20260626    │  **Project:** tiny-world                        │
│ › 20260625    │  **Task:** Build the login page...              │
│               │  ...                                            │
│ Vault         │  # Agent Definition                             │
│ [Obsidian ▾]  │  You are the Frontend Agent...                  │
│               │                                                 │
│ API           │  # Relevant Memories                            │
│ [Claude ▾]    │  ## tiny-world / 2026-06-27...                  │
└───────────────┴─────────────────────────────────────────────────┘
│ STATUS: Vault connected · 9 agents · tiny-world loaded · ready  │  ← StatusBar
└─────────────────────────────────────────────────────────────────┘
```

**Design rules (verbatim from agent-frontend.md):**
- Dark mode default: `--color-bg-dark: #0F1117`, `--color-surface-dark: #1A1D29`
- `JetBrains Mono` for ALL prompt preview text
- 1px hairline borders for structure — no box-shadow hierarchy
- Lucide icons only, no emoji
- No decorative gradients
- Touch targets ≥ 44px

---

## Phase 0: Foundation ← CURRENT
**Goal:** Runnable empty shell. Git history starts here.

### Steps
1. `git init` in `C:\Users\scook\.dev\agent-bench`
2. Scaffold Tauri 2 + React + Vite + TypeScript inside `agent-bench/harness/`
3. Install deps: `tailwindcss`, `zustand`, `lucide-react`, `@tauri-apps/plugin-fs`
4. Wire design-system CSS tokens from agent-frontend.md
5. Stub `App.tsx` with 3-panel layout skeleton (no data)

### Debug Gate
`npm run tauri dev` opens a window with the 3-panel layout. Nothing functional yet.

---

## Phase 1: Core Shell UI
**Goal:** All panels rendered, project switcher works, agent list shows.

### Components
```
harness/src/components/
├── TitleBar.tsx        project switcher dropdown + settings/logs buttons
├── AgentSidebar.tsx    agent roster list, status dots
├── DispatchPanel.tsx   task textarea, agent picker, project picker, action buttons
├── PromptPreview.tsx   monospace scrollable preview, char count
├── MemoryPanel.tsx     recent sessions list, vault selector, API selector
├── SessionHistory.tsx  browsable history tab
└── StatusBar.tsx       vault connection status, agent count, ready indicator
```

### Zustand store shape
```ts
interface HarnessStore {
  activeProject: string
  selectedAgent: string | 'ceo-auto'
  vaultMode: 'direct' | 'obsidian' | 'mcp'
  vaultPath: string
  apiProvider: 'claude' | 'openrouter' | 'openai' | 'ollama'
  apiKeys: Record<string, string>
  agents: AgentDef[]
  projects: string[]
  task: string
  builtPrompt: string | null
  sessions: SessionLog[]
  matchedMemories: Memory[]
  setTask: (t: string) => void
  buildPrompt: () => Promise<void>
  executePrompt: () => Promise<void>
  copyToClipboard: () => void
}
```

### Debug Gate
Agent list renders all 9 agents. Project switcher shows projects. Task input accepts text.
Buttons render (not functional yet).

---

## Phase 2: CEO Engine (TypeScript port of ceo.py)
**Goal:** Build Prompt produces identical output to `python ceo.py -t "..." -a frontend -p tiny-world`

### Files
```
harness/src/engine/
├── ceo.ts           CEO assembler — main entry point
├── types.ts         AgentDef, ProjectContext, SessionLog, Memory
└── challenge.ts     keyword detection + ERP firewall
```

### Core function
```ts
export async function assemblePrompt(params: {
  task: string
  agent: string
  project: string
  vault: VaultConnector
}): Promise<{ prompt: string; challenges: string[]; blocked: boolean }> {
  const { blocked, reason } = checkFirewall(params.agent, params.project)
  if (blocked) return { prompt: '', challenges: [reason], blocked: true }

  const challenges = detectChallenges(params.task)
  const agentDef   = await params.vault.loadAgent(params.agent)
  const projectCtx = await params.vault.loadProjectContext(params.project)
  const memories   = await params.vault.loadMemories(params.agent, params.project)
  // ↑ NEW: memory injection (Step 4 from agent-ceo.md — missing from ceo.py)

  const prompt = buildPromptString({ agent: params.agent, project: params.project,
    task: params.task, agentDef, projectCtx, memories,
    timestamp: new Date().toISOString() })

  return { prompt, challenges, blocked: false }
}
```

### Challenge/firewall config (from agent-ceo.md)
```ts
const CHALLENGE_KEYWORDS = [
  'rewrite everything', 'start over', 'scrap it', 'burn it down',
  '6 month', '6-month', 'massive refactor', 'full redesign',
  'skip tests', 'skip auth', 'quick and dirty',
]
const ERP_PROJECT       = 'xpanda-ops-platform'
const ERP_AGENT_PREFIXES = ['xpanda-', 'erp-']
```

### Debug Gate
Prompt output matches `python ceo.py` character-for-character (minus timestamp).
Challenge keywords trigger yellow warning bar. ERP firewall shows red blocked state.

---

## Phase 3: Vault Connector
**Goal:** All three vault modes load real files; settings panel lets you switch.

### Interface
```ts
export interface VaultConnector {
  listAgents(): Promise<string[]>
  loadAgent(name: string): Promise<string>
  loadProjectContext(project: string): Promise<ProjectContext>
  listProjects(): Promise<string[]>
  loadMemories(agent: string, project: string): Promise<Memory[]>
  writeSessionLog(log: SessionLog): Promise<void>
}
```

### Three implementations
- **DirectConnector** — reads `agent-bench/` root via `@tauri-apps/plugin-fs`
  - `Agents/agent-{name}.md` → `loadAgent(name)`
  - `Projects/{project}/` → `loadProjectContext(project)`
  - `Memories/{agent}/` + `Memories/{project}/` → `loadMemories()`
  - `.ceo-logs/session-{ts}.json` → `writeSessionLog()`
- **ObsidianConnector** — identical to Direct but root = OneDrive vault path
- **MCPConnector** — stub (implemented Phase 7)

### Settings panel
```
Mode: ○ Direct  ● Obsidian  ○ MCP
Path: C:\Users\scook\OneDrive\Documents\Obsidian Vault
      [Browse...]
[Test Connection]  ✓ 9 agents, 2 projects found
```

### Debug Gate
Switch modes in settings → prompt loads real agent-frontend.md content.
Test Connection shows file counts.

---

## Phase 4: Memory Engine
**Goal:** Top 3 relevant memories auto-injected into every CEO prompt.

### Scoring
```ts
function computeScore(task: string, mem: Memory): number {
  const taskWords = new Set(task.toLowerCase().split(/\W+/))
  const overlap   = mem.content.toLowerCase().split(/\W+/)
                       .filter(w => taskWords.has(w)).length
  const ageMs     = Date.now() - mem.timestamp
  const recency   = Math.max(0, 1 - ageMs / (30 * 24 * 60 * 60 * 1000))
  return overlap + recency * 5
}
```

Memory injected at max 500 chars each. Shown in Memory panel with hover preview.
Creates `Memories/` directory scaffold on first run if it doesn't exist.

### Debug Gate
Session `session-20260627_215659.json` surfaces when task mentions "tiny-world".
Memory section appears in prompt preview.

---

## Phase 5: Pluggable API Layer
**Goal:** Execute button streams a real response.

### Interface
```ts
export interface APIProvider {
  name: string
  models: string[]
  complete(prompt: string, model: string, onChunk: (text: string) => void): Promise<string>
}
```

### Implementations
- `claude.ts` — Anthropic API via fetch (SSE streaming)
- `openrouter.ts` — OpenAI-compatible, base `https://openrouter.ai/api/v1`
- `openai.ts` — base `https://api.openai.com/v1`
- `ollama.ts` — local, base `http://localhost:11434`, no key needed

**Per-agent routing** (from agent-ceo.md logic):
- architecture / schema / auth / payment → Claude (premium)
- research, content, qa-critic agents → Claude (premium)
- default → OpenRouter (cheap)

**API keys** stored in Tauri encrypted store (OS keychain). Never plain files.

### Debug Gate
Execute button streams Claude response within 5 seconds.

---

## Phase 6: Session Logging
**Goal:** Every dispatch writes a log; history is browsable.

### Log format (extends existing .ceo-logs/ schema)
```json
{
  "timestamp": "20260627_220500",
  "agent": "frontend",
  "project": "tiny-world",
  "task": "Build login page",
  "api_routing": "claude",
  "vault_mode": "obsidian",
  "prompt_length_chars": 15234,
  "response_length_chars": 4200,
  "memories_injected": 2,
  "challenges": [],
  "duration_ms": 8400
}
```

### Debug Gate
New log file written after dispatch. Visible in History tab after app restart.

---

## Phase 7: MCP Connector
**Goal:** Vault loads via MCP/HTTP — Obsidian Local REST API plugin.

**User prerequisite:** Install "Local REST API" Obsidian community plugin → note port (27123) + key.

```ts
export class MCPConnector implements VaultConnector {
  async loadAgent(name: string): Promise<string> {
    const res = await fetch(`${this.url}/vault/Agents/agent-${name}.md`,
      { headers: { Authorization: `Bearer ${this.apiKey}` } })
    return res.text()
  }
  // ...
}
```

Fallback: if MCP unreachable → orange status warning, falls back to DirectConnector.

### Debug Gate
Obsidian running + plugin enabled → "✓ MCP Connected, 9 agents found".

---

## Phase 8: Polish + Package
**Goal:** Shippable .exe, keyboard shortcuts, Open Project picker.

### Keyboard shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Build Prompt |
| `Ctrl+Shift+C` | Copy to Clipboard |
| `Ctrl+Shift+E` | Execute via API |
| `Ctrl+K` | Focus task input |
| `Ctrl+,` | Open Settings |

### Packaging
```bash
npm run tauri build
# → harness/src-tauri/target/release/bundle/msi/AgentHarness_1.0.0_x64_en-US.msi
```

### Debug Gate
.msi installs on clean Windows machine. App works fully offline (Direct vault mode).

---

## Full File Structure

```
agent-bench/
├── Agents/                          # existing — agent .md definitions
├── project_files/                   # existing — this plan lives here
├── .ceo-logs/                       # existing — session audit trail
├── Memories/                        # NEW (Phase 4 creates this)
│   ├── frontend/
│   ├── backend/
│   ├── tiny-world/
│   └── tapin/
└── harness/                         # NEW — Tauri desktop app
    ├── src-tauri/
    │   ├── src/
    │   │   ├── main.rs
    │   │   └── commands/
    │   │       ├── fs.rs
    │   │       └── clipboard.rs
    │   ├── Cargo.toml
    │   └── tauri.conf.json
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── components/
        │   ├── TitleBar.tsx
        │   ├── AgentSidebar.tsx
        │   ├── DispatchPanel.tsx
        │   ├── PromptPreview.tsx
        │   ├── MemoryPanel.tsx
        │   ├── SessionHistory.tsx
        │   ├── SettingsModal.tsx
        │   └── StatusBar.tsx
        ├── engine/
        │   ├── ceo.ts
        │   ├── challenge.ts
        │   ├── memory.ts
        │   ├── types.ts
        │   ├── vault/
        │   │   ├── connector.ts
        │   │   ├── direct.ts
        │   │   ├── obsidian.ts
        │   │   └── mcp.ts
        │   └── api/
        │       ├── provider.ts
        │       ├── claude.ts
        │       ├── openrouter.ts
        │       ├── openai.ts
        │       └── ollama.ts
        ├── store/
        │   └── harness.ts
        └── styles/
            └── design-system.css
```

---

## Phase Progress Tracker

| Phase | Name | Status |
|-------|------|--------|
| 0 | Foundation — git init + Tauri scaffold | 🔄 In Progress |
| 1 | Core Shell UI | ⬜ Pending |
| 2 | CEO Engine (ceo.py port) | ⬜ Pending |
| 3 | Vault Connector | ⬜ Pending |
| 4 | Memory Engine | ⬜ Pending |
| 5 | Pluggable API Layer | ⬜ Pending |
| 6 | Session Logging | ⬜ Pending |
| 7 | MCP Connector | ⬜ Pending |
| 8 | Polish + Package | ⬜ Pending |

---

## Phase 4.5: Workspace (Open Folder) — VS Code-style folder mode

**Goal:** Open any folder on disk (not just the vault) as a working directory — file tree in a new
Explorer panel, click-to-preview file content, and agent execution (`claude` CLI) runs with that
folder as its `cwd`. Kept as a concept separate from the vault: vault = agent brain (Agents/Projects/
Memories, fixed in Settings), workspace = the hands (whatever folder is open, drives execution cwd).

### What shipped
- `@tauri-apps/plugin-dialog` added (native folder picker) + Rust plugin registration in `lib.rs`
- `fs:scope` broadened to `{"path": "**"}` so arbitrary user-chosen folders are readable (personal
  desktop tool — full-disk-access model like VS Code, not a sandboxed multi-user app)
- `src/engine/workspace/fs.ts` — `pickFolder()`, `listDir()` (lazy, dirs-first, hides `.git`/
  `node_modules`/`target`/`.cargo`), `readWorkspaceFile()`
- Store: `workspaceRoot`, `workspaceEntries` (lazy per-dir cache), `expandedDirs`, `selectedFilePath`,
  `fileContent`; actions `openFolder()`, `toggleDir()`, `openFile()`
- `ExplorerPanel.tsx` — recursive tree, stacked above `AgentSidebar` in the left column
- `FilePanel.tsx` — read-only file preview, third center tab ("File") alongside Prompt Preview /
  Execution Output
- `executeWithClaude`/`runClaude` now accept `cwd`; `execute()`/`followUp()` pass `workspaceRoot`
- StatusBar shows the open workspace path

### Explicitly deferred (not in this pass)
- No code editor (Monaco) — file view is read-only preview only
- No save/write-back, no multi-root workspaces, no search-across-files
- No `.gitignore`-aware filtering (only a fixed hide-list)

### Debug Gate
Open Folder → tree renders → click a file → content shows in File tab → Execute runs `claude` with
that folder as cwd (verify via a prompt like "list files in this directory").

---

## Backlog (not scheduled — architecture not settled yet)

- **Rebrand to "Project Xyril"** — give the harness an entity/persona identity (Jarvis-style — "Xyril"
  as the name behind the assistant, not just "Agent Harness" as a tool). Revisit once core
  architecture (Phases 5–8) is stable; naming/identity work now would be premature relative to the
  plumbing still in flight.

- **Delta-aware scraper on app open** — a modified `obsidian_scraper.py` that only re-scrapes
  files changed since its last run (mtime/hash check), run automatically each time the harness opens
  so the vault's indexed state stays current without a full re-scrape every time. Supersedes/answers
  Open Question #2 below once built. Needs the vault reorg (this session, librarian pass) done first
  so there's a stable structure to diff against.

- **Ever-evolving agents** — agents that improve at their specialty over time rather than staying
  static prompt+definition files. Likely builds on Phase 7 (Memory Promotion Pipeline) — the
  mechanism for turning session outcomes into durable learnings is the same mechanism that would let
  an agent's definition/memory get measurably better with use. Not scoped yet; revisit once Phase 7
  is underway rather than designing it cold now.

- **CEO "hire a new agent"** — when the CEO detects a need for a new specialist (no existing agent
  fits a task's domain), it should be able to trigger a "hiring" flow: dispatch the `research` agent
  to search GitHub for existing agent definitions/prompts that fit the gap, evaluate candidates, and
  adapt the best fit into a new `Agents/agent-{name}.md` definition instead of writing one from
  scratch. Depends on the Workflow Engine (Phase 8) to have somewhere to run a multi-step
  research → draft → review flow; not buildable as a one-off action today.

---

## Open Questions (not blockers)

1. **Auto-routing badge vs manual-only** — CEO suggests agent based on task keywords, or always manual picker?
2. **Scraper integration** — "Sync from dev" button in UI (runs obsidian_scraper.py), or keep as bat?
3. **Cross-platform** — Windows-first now; macOS/Linux via `tauri build --target` later.
