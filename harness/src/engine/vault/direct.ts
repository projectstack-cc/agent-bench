import { readTextFile, readDir, exists, writeTextFile, mkdir } from '@tauri-apps/plugin-fs'
import type { VaultConnector } from './connector'
import type { Memory, ProjectContext, SessionLog } from '../types'

export class DirectConnector implements VaultConnector {
  private rootPath: string

  constructor(rootPath: string) {
    this.rootPath = rootPath
  }

  private p(...parts: string[]): string {
    return [this.rootPath, ...parts].join('\\')
  }

  async listAgents(): Promise<string[]> {
    try {
      const entries = await readDir(this.p('Agents'))
      return entries
        .filter((e) => e.name?.match(/^agent-.+\.md$/))
        .map((e) => e.name!.replace(/^agent-/, '').replace(/\.md$/, ''))
    } catch {
      return ['ceo','frontend','backend','qa-critic','research','content','ue-dev','ops','coo','cto','cfo','marketing','product','ux','security','librarian','zernio-mcp']
    }
  }

  async loadAgent(name: string): Promise<string> {
    try {
      return await readTextFile(this.p('Agents', `agent-${name}.md`))
    } catch {
      return `[agent-${name}.md not found at ${this.rootPath}]`
    }
  }

  async loadConstitution(): Promise<string> {
    try {
      return await readTextFile(this.p('Agents', '_constitution.md'))
    } catch {
      return ''
    }
  }

  async loadProjectContext(project: string): Promise<ProjectContext> {
    const base = this.p('Projects', project)
    const tryRead = async (file: string): Promise<string | undefined> => {
      try {
        const fileExists = await exists(this.p('Projects', project, file))
        if (!fileExists) return undefined
        return await readTextFile(this.p('Projects', project, file))
      } catch {
        return undefined
      }
    }

    const [prd, apiContract, decisions, conventions, readme] = await Promise.all([
      tryRead('prd.md'),
      tryRead('api-contract.md'),
      tryRead('decisions.md'),
      tryRead('conventions.md'),
      tryRead('README.md'),
    ])

    void base
    return { name: project, prd, apiContract, decisions, conventions, readme }
  }

  async listProjects(): Promise<string[]> {
    try {
      const entries = await readDir(this.p('Projects'))
      return entries.filter((e) => e.isDirectory).map((e) => e.name!)
    } catch {
      return ['general', 'tiny-world', 'tapin']
    }
  }

  async loadMemories(agent: string, project: string): Promise<Memory[]> {
    const memories: Memory[] = []

    const loadDir = async (dir: string, tag: { agent?: string; project?: string }) => {
      try {
        const dirExists = await exists(dir)
        if (!dirExists) return
        const entries = await readDir(dir)
        for (const entry of entries) {
          if (!entry.name?.endsWith('.md') && !entry.name?.endsWith('.json')) continue
          try {
            const content = await readTextFile(`${dir}\\${entry.name}`)
            const title = entry.name.replace(/\.(md|json)$/, '')
            // Parse timestamp from filename like session-20260627_220500 or YYYY-MM-DD
            const tsMatch = title.match(/(\d{8})_(\d{6})|(\d{4}-\d{2}-\d{2})/)
            let timestamp = Date.now()
            if (tsMatch) {
              timestamp = tsMatch[1]
                ? new Date(`${tsMatch[1].slice(0,4)}-${tsMatch[1].slice(4,6)}-${tsMatch[1].slice(6,8)}T${tsMatch[2].slice(0,2)}:${tsMatch[2].slice(2,4)}:${tsMatch[2].slice(4,6)}`).getTime()
                : new Date(tsMatch[3]).getTime()
            }
            memories.push({ id: `${dir}\\${entry.name}`, title, content, timestamp, ...tag })
          } catch { /* skip unreadable files */ }
        }
      } catch { /* skip missing dirs */ }
    }

    await Promise.all([
      loadDir(this.p('Memories', agent), { agent }),
      loadDir(this.p('Memories', project), { project }),
    ])

    return memories
  }

  async writeSessionLog(log: SessionLog): Promise<void> {
    const logsDir = this.p('.ceo-logs')
    try {
      const dirExists = await exists(logsDir)
      if (!dirExists) await mkdir(logsDir, { recursive: true })
      const filename = `session-${log.timestamp.replace(/[: ]/g, '_')}.json`
      await writeTextFile(`${logsDir}\\${filename}`, JSON.stringify(log, null, 2))
    } catch (e) {
      console.warn('[DirectConnector] writeSessionLog failed:', e)
    }
  }

  async writeMemory(agent: string, project: string, content: string): Promise<void> {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
    const filename = `${stamp}.md`

    for (const scopeDir of [this.p('Memories', agent), this.p('Memories', project)]) {
      try {
        const dirExists = await exists(scopeDir)
        if (!dirExists) await mkdir(scopeDir, { recursive: true })
        await writeTextFile(`${scopeDir}\\${filename}`, content)
      } catch (e) {
        console.warn(`[DirectConnector] writeMemory failed for ${scopeDir}:`, e)
      }
    }
  }
}
