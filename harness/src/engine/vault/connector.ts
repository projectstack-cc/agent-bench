import type { Memory, ProjectContext, SessionLog } from '../types'

export interface VaultConnector {
  listAgents(): Promise<string[]>
  loadAgent(name: string): Promise<string>
  loadProjectContext(project: string): Promise<ProjectContext>
  listProjects(): Promise<string[]>
  loadMemories(agent: string, project: string): Promise<Memory[]>
  writeSessionLog(log: SessionLog): Promise<void>
}
