// Per-agent tool allowlist, passed as `claude`'s `--allowedTools` on every dispatch.
// Dispatched runs have no interactive terminal, so any tool needing a permission
// prompt (WebSearch, WebFetch, Edit, Write, Bash) would otherwise be silently denied.
//
// Deliberately conservative: BASELINE preserves the full grant every agent had
// before this registry existed (WebSearch/WebFetch were added there on purpose,
// per project memory, to fix an earlier silent-denial bug — don't reintroduce
// that failure mode by guessing a narrower list per agent from a one-line
// Identity read). Only override BASELINE where an agent's own definition makes
// the mismatch unambiguous, not from inferred "probably doesn't need this."
// Mirrored for humans/agents at `Agents/_tool-registry.md`.
const BASELINE = ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob', 'Edit', 'Write', 'Bash']

export const AGENT_TOOLS: Record<string, string[]> = {
  // Reviewer role, explicit in its own dispatched task text: "don't rewrite
  // it yourself, just review." Write/Edit access contradicts that directly.
  'qa-critic': ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob', 'Bash'],
  // Identity: "delivers actionable intelligence" via response text; never
  // described as touching the codebase. No Edit/Write/Bash.
  research: ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob'],
  // Same pattern as research: delivers opportunity briefs as response text,
  // never described as touching a codebase or writing files itself.
  coo: ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob'],
  // Board-level advisory roles (same pattern as coo/research): each assesses
  // and delivers judgment as response text, none implement. `cto` reads the
  // codebase to verify reuse claims but doesn't write to it.
  cto: ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob'],
  cfo: ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob'],
  marketing: ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob'],
  product: ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob'],
  ux: ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob'],
  security: ['WebSearch', 'WebFetch', 'Read', 'Grep', 'Glob'],
  // Identity, verbatim: "You do not write marketing copy, design visuals, or
  // strategize content... you execute the publishing layer." Doesn't edit
  // the codebase at all. (Its actual publish action needs the Zernio MCP
  // server's tools, which aren't in this static list — see the registry doc.)
  'zernio-mcp': ['Read', 'Grep', 'Glob'],
}

export function toolsForAgent(agent: string | undefined): string[] {
  if (!agent) return BASELINE
  return AGENT_TOOLS[agent] ?? BASELINE
}
