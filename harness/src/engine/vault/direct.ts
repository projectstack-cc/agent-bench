// DirectConnector — reads vault structure from a local file path.
// Phase 3 implementation: will use @tauri-apps/plugin-fs for actual I/O.
// Stubs return placeholder data so the UI compiles in Phase 0.

import type { VaultConnector } from './connector'
import type { Memory, ProjectContext, SessionLog } from '../types'

export class DirectConnector implements VaultConnector {
  private rootPath: string

  constructor(rootPath: string) {
    this.rootPath = rootPath
  }

  async listAgents(): Promise<string[]> {
    // Phase 3: read rootPath/Agents/agent-*.md, return names
    return [
      'ceo', 'frontend', 'backend', 'qa-critic',
      'research', 'content', 'ue-dev', 'librarian', 'zernio-mcp',
    ]
  }

  async loadAgent(name: string): Promise<string> {
    // Phase 3: read rootPath/Agents/agent-{name}.md
    return `[Phase 3] Agent definition for '${name}' — will load from ${this.rootPath}/Agents/agent-${name}.md`
  }

  async loadProjectContext(project: string): Promise<ProjectContext> {
    // Phase 3: read prd.md, api-contract.md, decisions.md, conventions.md, README.md
    return {
      name: project,
      readme: `[Phase 3] Project context for '${project}' — will load from ${this.rootPath}/Projects/${project}/`,
    }
  }

  async listProjects(): Promise<string[]> {
    // Phase 3: list directories in rootPath/Projects/
    return ['general', 'tiny-world', 'tapin']
  }

  async loadMemories(_agent: string, _project: string): Promise<Memory[]> {
    // Phase 4: scan rootPath/Memories/{agent}/ and rootPath/Memories/{project}/
    return []
  }

  async writeSessionLog(log: SessionLog): Promise<void> {
    // Phase 6: write to rootPath/.ceo-logs/session-{timestamp}.json
    console.log('[Phase 6] writeSessionLog stub:', log)
  }
}
