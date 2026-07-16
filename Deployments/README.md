# Deployments

Each subfolder is one mission: `Deployments/{mission-slug}/`. Nothing
here yet — no mission has run through this pattern for real.

## Structure per mission

```
Deployments/{mission-slug}/
├── roster.md      # which executives, which HQ version pinned, mission overlay
├── brief.md       # Mission Objectives, Success Metrics, Constraints, Required Skills,
│                    Company/Founder Context excerpts (not full copies)
├── memories/
│   └── {agent}.md # mission-local only — never auto-merges to HQ
└── debrief.md      # written at mission close, run through the Debrief Gate
```

## The core rule

A deployment is a **reference + delta**, not a copy. `roster.md` pins an
HQ executive version and states what's different for this mission in a
short overlay — it never duplicates the executive's full definition. See
`project_files/hq-v2-architecture.md` §3 for why (token efficiency,
duplication control) and `agent-librarian.md`'s Deployment Onboarding
section for who scaffolds this.

## roster.md template

```markdown
# Deployment: {mission-slug}
## Roster
| Executive | HQ Version Pinned | Mission Overlay |
|-----------|--------------------|-------------------|
| {agent}   | v{n}               | {one paragraph — what's different here} |
```
