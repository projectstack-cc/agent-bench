// Challenge detection + ERP firewall — from agent-ceo.md

const CHALLENGE_KEYWORDS = [
  'rewrite everything', 'start over', 'scrap it', 'burn it down',
  '6 month', '6-month', 'massive refactor', 'full redesign',
  'just use ai', 'ai will handle it', 'skip tests', 'skip auth',
  'no one will notice', 'temporary fix', 'quick and dirty',
]

const ERP_PROJECT = 'xpanda-ops-platform'
const ERP_AGENT_PREFIXES = ['xpanda-', 'erp-']

export function detectChallenges(task: string): string[] {
  const lower = task.toLowerCase()
  return CHALLENGE_KEYWORDS.filter((kw) => lower.includes(kw))
    .map((kw) => `Triggered: "${kw}"`)
}

export function checkFirewall(
  agent: string,
  project: string,
): { blocked: boolean; reason: string } {
  const isErpProject = project.toLowerCase().includes(ERP_PROJECT)
  const isErpAgent   = ERP_AGENT_PREFIXES.some((p) => agent.toLowerCase().startsWith(p))

  if (isErpProject && !isErpAgent) {
    return {
      blocked: true,
      reason: `[BLOCKED] '${agent}' cannot access ERP project '${project}'. Use an ERP agent (xpanda-*).`,
    }
  }
  if (isErpAgent && !isErpProject) {
    return {
      blocked: true,
      reason: `[BLOCKED] ERP agent '${agent}' is restricted to ERP projects. Use a general agent for '${project}'.`,
    }
  }
  return { blocked: false, reason: '' }
}
