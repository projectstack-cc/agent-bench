# Folder Dives

One file per pass: `FolderDives/{repo-slug}-{date}.md`. Nothing here yet —
no Folder Dive has run for real.

## Purpose

Analyze a repository (an existing project, or an entry from the retiring
Obsidian vault) to extract reusable engines, components, technical
capabilities, repeated architectural patterns, unfinished work, and
abandoned opportunities — and turn that into **recommended**
`HQ/CompanyIntelligence/` updates. Never writes `CompanyIntelligence/`
directly.

## Process (see `project_files/hq-v2-architecture.md` §7)

1. `cto` reads the repo and extracts technical findings.
2. Librarian cross-checks against current Company Intelligence for
   duplication or conflict, and proposes the filing.
3. CEO/user approves before anything actually lands in `CompanyIntelligence/`
   — same gate as Debrief, same reviewers, one shared mechanism.

## Report template

```markdown
# Folder Dive: {repo-slug} — {date}

## Reusable engines found
## Reusable components found
## Technical capabilities found
## Repeated architectural patterns found
## Unfinished work found
## Abandoned opportunities found

## Recommended Company Intelligence updates
(file → proposed change, one per finding, ready for the Librarian gate)
```
