# Reconnaissance

One file per pass: `Recon/{repo-slug}-{date}.md`. Formally replaces the
original "Folder Dive" concept (per the 2026-07-16 Executive Company
Audit, `project_files/hq-executive-audit-2026-07-16.md` §6) — same purpose,
renamed, and scoped to two modes instead of one.

## Purpose

**External Recon** — analyze a repository (an existing project, or an
entry from the retiring Obsidian vault) to extract reusable engines,
components, technical capabilities, repeated architectural patterns,
unfinished work, and abandoned opportunities.

**Internal Recon** (deferred until real mission data exists) — analyze
deployed executives' own performance across missions, feeding the
Promotion Board.

Both produce **recommended** `HQ/CompanyIntelligence/` updates only. Never
writes `CompanyIntelligence/` directly.

## Process

1. `cto` reads the repo and extracts technical findings.
2. Librarian cross-checks against current Company Intelligence for
   duplication or conflict, and proposes the filing.
3. CEO/user approves before anything actually lands in `CompanyIntelligence/`
   — same gate as Debrief, same reviewers, one shared mechanism.

## Report template

```markdown
# Recon: {repo-slug} — {date}

## Reusable engines found
## Reusable components found
## Technical capabilities found
## Repeated architectural patterns found
## Unfinished work found
## Abandoned opportunities found

## Recommended Company Intelligence updates
(file → proposed change, one per finding, ready for the Librarian gate)
```
