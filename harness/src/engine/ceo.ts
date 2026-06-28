// CEO Prompt Assembler — TypeScript port of Agents/ceo.py
// Phase 2 implementation. Stubs return placeholder output until then.

import type { VaultConnector } from './vault/connector'
import { detectChallenges, checkFirewall } from './challenge'
import type { Memory } from './types'

export interface AssembleParams {
  task: string
  agent: string
  project: string
  vault: VaultConnector
}

export interface AssembleResult {
  prompt: string
  challenges: string[]
  blocked: boolean
  blockReason?: string
}

export async function assemblePrompt(params: AssembleParams): Promise<AssembleResult> {
  const { task, agent, project, vault } = params

  // 1. Firewall check
  const { blocked, reason } = checkFirewall(agent, project)
  if (blocked) {
    return { prompt: '', challenges: [reason], blocked: true, blockReason: reason }
  }

  // 2. Challenge detection
  const challenges = detectChallenges(task)

  // 3. Load from vault
  const agentDef    = await vault.loadAgent(agent)
  const projectCtx  = await vault.loadProjectContext(project)
  const memories    = await vault.loadMemories(agent, project)

  // 4. Build prompt (CEO Dispatch format — matches ceo.py output exactly)
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19)

  const promptParts: string[] = [
    '# CEO Dispatch',
    `**Agent:** ${agent}`,
    `**Project:** ${project}`,
    `**Task:** ${task}`,
    `**Time:** ${timestamp}`,
    '',
    '---',
    '',
    '# Agent Definition',
    agentDef,
  ]

  const ctxSections: string[] = []
  if (projectCtx.prd)         ctxSections.push(`## PRD\n${projectCtx.prd}`)
  if (projectCtx.apiContract) ctxSections.push(`## Api Contract\n${projectCtx.apiContract}`)
  if (projectCtx.decisions)   ctxSections.push(`## Decisions\n${projectCtx.decisions}`)
  if (projectCtx.conventions) ctxSections.push(`## Conventions\n${projectCtx.conventions}`)
  if (projectCtx.readme)      ctxSections.push(`## Readme\n${projectCtx.readme}`)

  if (ctxSections.length > 0) {
    promptParts.push('', '---', '', '# Project Context', ctxSections.join('\n\n'))
  }

  if (memories.length > 0) {
    const memSection = memories
      .slice(0, 3)
      .map((m) => `## ${m.agent ?? m.project ?? 'session'} / ${new Date(m.timestamp).toISOString().slice(0, 10)}\n${m.content.slice(0, 500)}`)
      .join('\n\n')
    promptParts.push('', '---', '', '# Relevant Memories', memSection)
  }

  promptParts.push('', '---', '', '# Your Task', task, '', 'Execute per your agent definition. Deliver the specified output.')

  return {
    prompt: promptParts.join('\n'),
    challenges,
    blocked: false,
  }
}

export function rankMemories(task: string, memories: Memory[]): Memory[] {
  const taskWords = new Set(task.toLowerCase().split(/\W+/).filter(Boolean))

  return memories
    .map((mem) => {
      const memWords = mem.content.toLowerCase().split(/\W+/).filter(Boolean)
      const overlap  = memWords.filter((w) => taskWords.has(w)).length
      const ageMs    = Date.now() - mem.timestamp
      const recency  = Math.max(0, 1 - ageMs / (30 * 24 * 60 * 60 * 1000))
      return { ...mem, score: overlap + recency * 5 }
    })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3)
}
