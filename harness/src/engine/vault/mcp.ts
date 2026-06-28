// MCPConnector — reads vault via MCP/HTTP (Obsidian Local REST API).
// Phase 7 implementation. Stub until then.

import type { VaultConnector } from './connector'
import type { Memory, ProjectContext, SessionLog } from '../types'

export class MCPConnector implements VaultConnector {
  private url: string
  private apiKey: string

  constructor(url: string, apiKey: string) {
    this.url = url
    this.apiKey = apiKey
  }

  async listAgents(): Promise<string[]> {
    throw new Error(`MCP connector not yet implemented (Phase 7) — url: ${this.url}`)
  }
  async loadAgent(_name: string): Promise<string> {
    throw new Error('MCP connector not yet implemented (Phase 7)')
  }
  async loadProjectContext(_project: string): Promise<ProjectContext> {
    throw new Error('MCP connector not yet implemented (Phase 7)')
  }
  async listProjects(): Promise<string[]> {
    throw new Error('MCP connector not yet implemented (Phase 7)')
  }
  async loadMemories(_agent: string, _project: string): Promise<Memory[]> {
    throw new Error('MCP connector not yet implemented (Phase 7)')
  }
  async writeSessionLog(_log: SessionLog): Promise<void> {
    throw new Error(`MCP connector not yet implemented (Phase 7) — key: ${this.apiKey.slice(0, 4)}***`)
  }
}
