# Patterns

**First populated 2026-07-17**, via the first real Reconnaissance sweep
(`Recon/2026-07-17-INDEX.md`). These are recurring *technical* patterns
across projects — distinct from `success-history.md`/`failure-history.md`,
which are process lessons.

**Note on the `xpanda-ops-platform` entries below:** built by the founder
at XPanda Foam (employer, not owned business — not a company asset today),
but the platform's IP belongs to the founder, confirmed directly, with a
real plan to de-brand and bring it to market — see `products.md`.

---

## BYOK undermines the moat for thin AI-wrapper products

**Confidence: High** — the founder's own reasoning, from a real decision
(archiving `step3-ai`, see `products.md`), not a hypothetical. Bring-Your-
Own-API-Key looks like a natural fix for AI-API cost risk (shift the
marginal cost to the customer), but for a product whose value-add over the
underlying AI model is thin, BYOK can hand the customer everything they'd
need to replicate the workflow themselves — the product stops being worth
paying for the moment the customer has their own key. **Any future
AI-powered opportunity `coo`/`cto`/`cfo` evaluate should explicitly assess
how much value-add exists *beyond* the raw API call** (proprietary data,
a genuinely hard non-AI pipeline step, workflow/integration lock-in,
UX the customer wouldn't bother building themselves) before treating BYOK
as a viable cost-mitigation — it's a red flag for weak differentiation as
much as it's a pricing lever.

## AI-API-cost cold start — a real, named risk category

**Confidence: High** — the actual, confirmed reason `step3-ai` was
archived (`products.md`), not the unverified "unclear why it stalled"
guess Opportunity Court II worked with. A product with real per-use AI API
cost and no existing revenue faces a cash-flow gap: cost is incurred
before there's income to cover it, and no subscriber base yet to spread it
across. **`cfo` should treat this as a named, checkable risk for any
future AI-powered opportunity**, not just discover it after building —
usage-based/pay-per-use pricing, a hard free-tier cap, or a pre-sale/
waitlist model (revenue before or alongside spend) are the standard
mitigations worth evaluating up front, not after the product stalls.

## Clerk + Supabase — the company's de facto default SaaS starter stack

**Confidence: High** — 4 independent citations: `tapin`, `cinevault`,
`step3-ai`, and likely `formflow`. Strong enough to call a validated
default, not a coincidence. `cto` should treat this as the starting-point
stack for any future SaaS-shaped opportunity unless there's a specific
reason to deviate — it's already been chosen independently four times.

## One-time purchase over subscription, for consumer game/app products

**Confidence: High.** `tiny-world` and `lights-out` independently reached
the identical conclusion for the identical stated reason: billing-trust
anxiety in the target audience (parents, casual players) makes a one-time
purchase convert better than a subscription ask. Worth weighing directly
for any future consumer-facing (non-B2B) product `cfo`/`product` evaluate.

## Vanilla HTML/CSS/JS + GitHub Pages for small client marketing sites

**Confidence: High.** `precision-maintenance` and `projectstack` share the
exact shape: no framework, no build step, static hosting. A proven,
low-overhead delivery pattern specifically for small local-business client
sites — distinct from the React/Next.js pattern used for the company's own
SaaS-shaped products.

## Per-project decisions/ADR file as a build-time habit

**Confidence: High.** Three independent instances: `lights-out/planning/decisions.md`,
`tiny-world/planning/decisions.md`, `RadialNest_PROMPT.md`. This is
already a real, organically-occurring habit, not a process HQ is inventing
from scratch — the Debrief/Recon apparatus is formalizing something that
already happens per-project. Worth a Debrief/Recon template field
explicitly asking "was a decisions log kept for this mission" once real
missions start running, rather than losing this habit under HQ's more
formal structure.

## "Strangler fig" incremental modernization — live, in production

**Confidence: High.** Source: `xpanda-ops-platform`. The platform's stated
architecture is deliberately anti-framework (vanilla HTML/JS, `AGENTS.md`
explicitly bans introducing React platform-wide) — but a scoped
React/Next.js pilot ("Cutting v2") runs in parallel, isolated under a `/v2`
path prefix with its own deploy pipeline, alongside the stable legacy
system. A real, deliberate incremental-migration pattern: prove a new
stack on one bounded module before committing platform-wide. Worth
naming explicitly as a company capability for any future "should we
modernize this legacy piece" decision — more mature than a from-scratch
rewrite, and already validated in production.

## Server-side recomputation of client-submitted calculations

**Confidence: High.** Source: `xpanda-ops-platform` — the block-nesting
save route explicitly "recomputes authoritatively" server-side rather than
trusting client math. A real integrity/security pattern worth carrying
into any future product doing client-side computation with server
persistence.

## Next.js-on-Cloudflare-Workers-via-OpenNext — a named debugging reference

**Confidence: High.** Source: `xpanda-ops-platform`. A nontrivial
integration many teams struggle with, proven working here with specific,
dated bugs found and fixed: `basePath` vs. `assetPrefix` asset-routing
mismatches (two separate incidents), a stale-build asset cache bug from an
idempotency guard skipping a required file move, a missing CSS import
causing a fully-unstyled deploy, and a Windows-specific patch required for
`@opennextjs/aws` v0.3.x. The next Next.js-on-Workers migration this
company does shouldn't have to rediscover any of these — check this entry
first.

## A project-level constitution, independently convergent with HQ's own design

**Confidence: High.** `xpanda-ops-platform`'s `AGENTS.md` is functionally a
project-scoped constitution — explicit scope guardrails ("established,
treat as stable" vs. "intentionally not yet built"), tracked technical
debt with an explicit "don't fix unless asked" framing, and a strict
numbered-prompt implementation/changelog discipline. It predates this
session's HQ/V2 architecture entirely and independently arrived at similar
governance instincts. Worth reading directly — not just filing as a
curiosity — the next time `HQ/Executives/_constitution.md` or the
Deployment/Debrief templates get revised; it's a working, production-
tested reference, not a theoretical design.

## Versioned, hash-verified external skill dependencies (mechanism only)

**Confidence: High on the mechanism; explicitly NOT a company asset in
content.** `xpanda-ops-platform` fetches `.agents/skills/*` from a
third-party GitHub repo (`Leonxlnx/taste-skill`) via a hash-verified
`skills-lock.json`, not authored in-house. The skill *content* is not
company IP and must never be filed as such — but the lockfile *mechanism*
itself (versioned, hash-verified external dependencies for agent skills)
is a pattern worth knowing about if `HQ/Skills/` ever needs to reference
external, non-authored skills alongside its own.

## Stack mismatch alone doesn't disqualify an opportunity — conversion cost does

**Confidence: High** — explicit founder direction (2026-07-20), given
while scoping the cross-market opportunity-scan initiative (see
`strategic-direction.md`). Refines `agent-coo.md`'s scoring rubric and
`agent-cto.md`'s "stack-fit first" doctrine: a candidate that doesn't fit
the founder's default stack (React/TypeScript/Cloudflare/Node) should not
be auto-rejected or scored down on that basis alone if the actual cost to
convert it to a different, more suitable stack is low. The PC-gaming scan
(`products.md`, `Recon/pc-gaming-overlay-tools-research-2026-07-20.md`)
surfaced a concrete case this applies to: native Windows/DirectX overlay
engineering is a real stack mismatch, but the question that actually
matters is whether picking up or converting to the right stack for that
specific opportunity is cheap, not whether it matches today's default.
**Recommended follow-on, not made here:** `agent-coo.md`'s Build
Difficulty scoring and `agent-cto.md`'s Feasibility Doctrine §1
("stack-fit first") should get a gated edit reflecting this — flagged,
not silently rewritten, per this company's own governance standard for
agent-file changes.

## App-store-style distribution is a magnet other indie developers already comb

**Confidence: High** — observed independently in both markets scanned so
far this session (PC gaming's Overwolf catalog, `Recon/pc-gaming-overlay-
tools-research-2026-07-20.md`; e-commerce's Shopify App Store, `Recon/
ecommerce-tools-research-2026-07-20.md`). A channel with strong built-in
distribution (an app marketplace, a platform's own store) is exactly what
`agent-coo.md`'s scoring rubric rewards most ("the easier distribution
is, the higher the score") — but that same property makes it a magnet for
every other developer running the same playbook. TikTok Shop specifically
demonstrated this: a channel only ~2-3 years old already has a full
competitive set of sync and profit-analytics apps. **Implication for
future market scans:** a market with weaker off-the-shelf distribution
may paradoxically have more real, unfilled gaps, precisely because it's
less obvious to look at — worth weighing this explicitly against pure
distribution-ease scoring when picking the next market, not just when
scoring a candidate within one.

## Named horizontal business functions are the most contested search territory

**Confidence: High** — observed across all 13 functions checked in one
pass (`Recon/business-functions-overhead-research-2026-07-20.md`),
distinct from but compounding with the app-store-distribution pattern
above. A *named* function (Sales, HR, Scheduling, etc.) is inherently
guessable by every other founder who ever asked "what costs businesses
money" — it's been continuously targeted since the 1990s ERP wave through
today's microSaaS wave, so it arrives pre-saturated at every price tier
(free template through enterprise) independent of any one industry's
distribution channel. **Implication for future opportunity searches:**
real gaps are more likely to live at the *intersection* of a specific
function and a specific narrow vertical/persona than in either axis
searched alone — consistent with the 2026-07-17 domain-experience
research precedent, where genuine operational specificity reliably
surfaced real pain (even where it didn't clear the crowding bar). `coo`
should weight function-×-vertical specificity higher than "biggest named
category" when scoring where to look next, not just when scoring a
candidate once found.

## Blind external market search is not converging on an open gap — lean on lived experience instead

**Confidence: High** — four consecutive search rounds in one session
(two industries, thirteen named functions, three specific
function-×-vertical intersections; all filed in `products.md`/`Recon/`)
found a committed vendor for every real, citable pain point, at every
specificity level tried, down to genuinely obscure niches (self-managed
HOAs, independent funeral homes, solo home inspectors). **This is
evidence about the search method itself, not just about these four
market sets.** Thirty-plus years of SaaS/vertical-software
entrepreneurship has mapped the space of "named pain a web search can
find" far more thoroughly than intuition suggests. The one approach this
company has tried that produced genuinely differentiated-feeling
hypotheses was the 2026-07-17 domain-experience research — drawn from
the founder's own lived, non-searchable operational experience running
`xpanda-ops-platform`, not a market search. **Standing implication:**
future opportunity discovery should weight toward domains where the
founder (or a reachable source) has real information asymmetry —
something a competitor can't just Google — over another external scan
across a new market or function. This doesn't mean external scans are
worthless (they're still how competitive crowding gets verified) — it
means they're better used to *evaluate* a lived-experience-sourced
hypothesis than to *originate* one.

## "AI-powered compliance" is a live land grab, not settled territory (2026)

**Confidence: Medium** — observed while researching the food-safety
audit gap-analysis candidate (`products.md`). Multiple vendors (IONI,
Superior Food Safety, generic tools like ai-gap-analysis.com) are
actively branding "AI-powered gap analysis" for regulatory/compliance
document review right now, with content as fresh as January 2026 —
distinct from the mature, decade-old QMS incumbents (SafetyChain,
FoodLogiQ) in the same space. **Implication:** unlike the fully-settled
categories found in the last four scans, an "AI + compliance" niche found
this early in its own land-grab phase may still have room for a
better-executed entrant, precisely because quality and positioning
haven't converged yet — worth distinguishing "already has AI-branded
competitors" from "already settled" when scoring a candidate in any
similarly fast-moving AI-adjacent category going forward.

## A revealed-preference source can be evidence-free even when it's real

**Confidence: High** — observed directly (`Recon/claude-artifacts-scan-
2026-07-27.md`, 16 queries, two independent search shapes). Distinct from
the 2026-07-20 "blind search converges on vendor-served pain" finding
above, which was a *crowding* failure — real, citable pain found, always
already served. This is an earlier-stage failure: `claude.ai/public/
artifacts`, searched via blind web indexing, surfaces what people built
without the narrative of why — a title ("Daily Budget Calculator") is not
evidence of the frustration behind it, and asserting one from the title
alone is exactly the invented-user-sentiment failure Core Principle 3 and
the Global Constitution's Rule 1 exist to block. **Implication:** not every
plausible-sounding discovery channel converts to usable evidence just
because it's populated by real people solving real (if unstated) problems
— a source needs the *complaint*, not just the *artifact*, to be usable by
`coo`. If this specific source is revisited, it should be through direct
authenticated gallery access (this session's tooling 403'd on
`madewithclaude.com`/couldn't reach `claudeartifacts.net`), not blind
search, which is structurally capped at bare titles.

## AI-assisted one-off tooling is eroding the low end of consumer app markets

**Confidence: Medium** — a reasoned observation from the same scan above,
not independently verified against usage data. The handful of artifacts
that did surface (budget calculator, meal planner, exam study planner)
sit in maximally saturated consumer categories already served by
thousands of existing apps. Their existence isn't a market-gap signal —
it's evidence that for a short-lived personal need, a user building their
own five-minute tool now beats searching an app store, now that Claude
artifacts make building free and instant. Not an opportunity for this
founder (these are single-user throwaway tools, not products with
buyers), but worth carrying forward as a standing caveat on any future
consumer-app-category candidate `coo` scores: the bar for "is this
underserved" may be moving as build-your-own gets easier for end users
directly, independent of competitor headcount.

## Demand-first search converges on vendor-served, same as pain-first search

**Confidence: High** — observed directly (`Recon/unmet-demand-search-
2026-07-27.md`). A direct methodology test, requested by the founder after
the same-day artifacts scan: instead of finding pain and checking whether
it's solved, search directly for unanswered "does this exist" asks and
curated complaint-mining posts framed explicitly as "nobody's built this."
Seven candidates surfaced from the richest single source found (a 305-
point, 107-comment Reddit post with dollar-quantified complaints) — all
seven, once checked, already have a named, live competitor. **Sixth
consecutive research pass this cycle to reach "real signal, already
served"**, and the second to use a materially different technique from
the first four. **Explicit caveat, not to be dropped in future citations
of this finding:** this pass sampled one curated list from one poster with
a commercial incentive (they're marketing their own idea-database product
off the same post) to make ideas sound open, and the sample is itself the
most picked-over possible one — a high-engagement post builders have
already been reading and acting on for months. This is evidence that two
different techniques converge, not proof the market is universally
saturated; don't cite it as the latter.

## Builder-community crowding-check as a named verification technique

**Confidence: High** — the mechanism, not any specific finding, is the
reusable output. In `Recon/unmet-demand-search-2026-07-27.md`, five of
seven candidate ideas were refuted by name-specific competitors named
*unprompted* by independent commenters in the same Reddit thread the
ideas were posted to — no `coo` research budget spent on those five.
Unprompted, financially-disinterested, hostile-by-default community
crowding-checks are faster and higher-signal than one-at-a-time
competitive WebSearches. **Implication for future opportunity vetting:**
before or alongside a manual competitive-crowding check, look for (or
create) a forum/community context where a candidate idea would get this
kind of adversarial, free verification — it's a cheaper first pass than
building the check yourself.

## Technology-enabled whitespace discovery as a third methodology, distinct from pain-point mining and demand-first search

**Confidence: Medium-High** — observed directly during Opportunity Court IV
(2026-08-04, `Recon/opportunity-court-4-report-2026-08-04.md`), the first
court to use this methodology. When demand-pull methods (pain then check if
served) and demand-first methods (unmet demand then check if served) both
converged on "already vendor-served" across six consecutive research passes
(the standing finding above), technology-push methods (identify newly-
possible capabilities, check if productized, evaluate as business) surfaced
five genuinely novel candidates that demand-side methods would never have
found — because **people don't complain about not having something they
don't know is possible.** Pain-point mining finds pain that's already been
identified and served. Technology-enabled whitespace discovery finds
opportunities enabled by new technology but not yet identified as pain —
because the solution didn't exist when the pain was felt, so people built
workarounds and stopped looking. Two of the five candidates (VFFI and CTT)
survived the full board gauntlet; one (VFFI) cleared with a GO for research
spike. **Implication for future opportunity discovery:** when demand-side
methods converge on saturation, switch to technology-push — identify what
crossed the productizability threshold in the last 12 to 18 months
(Whisper, structured output, RAG, multimodal AI, AI agents, local LLMs)
and search for product categories that are now technically possible but
haven't been built yet. This doesn't replace demand-side methods — it
complements them. Demand-side verifies competitive crowding; technology-
push originates candidates that demand-side can't.

## Historical note, not a live pattern

Pre-HQ, a `Agents/` CEO-harness folder (the same convention this
repo used before the V2 migration) was deployed directly into at least two
other projects (`tiny-world`, `lights-out`), not just this repo. Real
evidence of how the agent-harness pattern was actually used before HQ
existed — superseded now that Deployments/roster.md replaces copying a
whole `Agents/` folder per project, not something to repeat going forward.

---

## External reference only — not a company asset

`odysseus` (found in `.dev/` but confirmed via `git remote` to belong to
`pewdiepie-archdaemon`, a third party — not built by this founder) has two
patterns worth *knowing about* if the founder's own long-term agent-
platform ambitions are ever pursued, but they must never be cited as
something this company built or owns:
- Persistent memory via vector DB.
- Hardware-aware local-model-fit selection.
