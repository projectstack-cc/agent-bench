# Deployment: auditsafeai-brc-pilot

**This is the company's first real Deployment** — the first mission run
through `roster.md`/`brief.md` for real, per `hq-v2-architecture.md` §13
step 5 (previously unstarted). Treat the pattern itself as being
validated here, not just the project.

## Roster

| Executive | HQ Version Pinned | Mission Overlay |
|-----------|--------------------|-------------------|
| `cto` | v1 | Owns the retrieval-grounded scoring architecture and the de-risking pilot design (how the wife's accuracy grading actually gets run and recorded). Hallucination-risk mitigation is this mission's single most important technical concern — treat it as the Feasibility Doctrine's top-ranked risk, not one of several. Stack decided 2026-07-23: Vercel + Next.js + Supabase + Clerk, full-context + prompt-caching grounding (not RAG — corpus fits in-context at M1's scale, and full-context removes the retrieval-miss false-negative risk RAG would add). See `Projects/AuditSafeAI/planning/decisions.md`. |
| `backend` | v1 | Builds the zip ingestion pipeline (pdf.js + Claude-vision fallback for scanned docs), document classification (SOP/food-safety-plan/record), and the scoring orchestration that calls the BRC specialist agent (`Projects/AuditSafeAI/agents/`, not yet written). The record/controlled-document classification boundary must be built correctly now even though generation isn't in scope this milestone — see `Projects/AuditSafeAI/planning/PRD.md`'s permanent boundary. Scoring runs as a background job with the UI polling for status, not a synchronous request — a full-context call across a whole document set won't fit inside one serverless invocation's execution-time limit. Data layer: Supabase (Postgres + Storage). |
| `frontend` | v1 | Added 2026-07-23, scoped deliberately narrow: upload flow (zip in) + report view (polls the background scoring job, renders findings/citations/severity) — nothing beyond what's needed to run the pilot against the wife's real documents. No dashboards, no multi-user surface, no styling investment beyond functional. Auth via Clerk. |
| `qa-critic` | v1 | Independently evaluates whether the pilot's accuracy result actually clears the bar defined in `Projects/AuditSafeAI/planning/PRD.md` — do not accept a self-report from `cto`/`backend` that it "seems good." A pass/fail call here is the actual Milestone 1→2 gate. Also owns the citation-verification check (does a cited clause ID actually exist and actually support the claim) and the eval harness built from the wife's documents' already-known gaps — this runs *before* her one real validation pass, not alongside it, since that pass is scarce and is the actual grading mechanism. |
| `security` | v1 | Reviews data handling for the wife's real uploaded BRC documents during this internal pilot (proprietary business content, even though she's a known, informed user) and begins scoping what the eventual Terms & Conditions will need to cover — full legal review is out of scope for this milestone, but the requirements list isn't. |
