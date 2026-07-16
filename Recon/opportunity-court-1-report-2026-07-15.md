# Opportunity Court — Board Meeting Transcript & Verdict

**Date:** 2026-07-15
**Convened by:** CEO persona, per `Agents/agent-ceo.md`
**Target:** $5,000/month portfolio income, disciplined selection, evidence over hype

## A note on who's actually in the room

Per the Global Constitution's Identity rule (state what you actually are), this
board is a mix of real and improvised personas:

- **CEO, COO (Chief Opportunity Officer), QA Director** — map directly to this
  harness's registered agents `Agents/agent-ceo.md`, `Agents/agent-coo.md`,
  and `Agents/agent-qa-critic.md`.
- **Operations Director** — maps loosely to `Agents/agent-ops.md`, whose real
  scope is deploy/rollback/incident response, not opportunity vetting. Used
  here for infra/operability judgment by extension, not as a literal fit.
- **CTO, CFO, Marketing Director, Product Strategist, UX Director, Security
  Director** — **no corresponding agent file exists in `Agents/`.** These are
  ad hoc personas role-played for this exercise only, not configured harness
  agents. Treat their output as structured single-session reasoning, not as
  a durable specialist you can re-dispatch later.

## A note on evidence coverage

The user's prompt asks for a Top 10. Real, citable evidence (a specific
thread, article, repo, or documented market data point — not a vibe) was
found for **6 candidates**. Three additional categories were researched and
are reported as **researched-and-rejected** with the evidence that killed
them, rather than padded into the ranked list to hit 10. Per the Global
Constitution's anti-hallucination rule and this board's own "evidence only"
mandate: a shorter honest list beats a padded one. Sourcing leaned on
general web search (no direct Reddit/HN full-text index access this
session), so treat "no result found" as "not found by this search," not
"doesn't exist" — flagged per-candidate below.

---

## ROUND ONE — Chief Opportunity Officer: Research

### Candidates with real evidence

**1. MCP metering & usage-based billing middleware**
Over 11,000 MCP servers are indexed across public registries, and the MCP
SDK reached ~97M downloads/month by early 2026 — but fewer than 5% of
servers charge for access. Direct quote from the UsageBox writeup: *"The
payment rail is an afternoon; the meter is the product"* — idempotent dedup,
per-tool pricing, per-agent caps, and invoice rollup are the actual hard,
unbuilt part. [UsageBox: How to Charge for an MCP Server in 2026](https://usagebox.com/articles/how-to-charge-for-mcp-server-2026-per-call-subscription-x402), [Godberry Studios: How to Monetize MCP Servers in 2026](https://godberrystudios.com/posts/how-to-monetize-mcp-servers-2026/), [Moesif: Monetizing MCP Servers](https://www.moesif.com/blog/api-strategy/model-context-protocol/Monetizing-MCP-Model-Context-Protocol-Servers-With-Moesif/)
**Confidence: High** (multiple independent sources, consistent numbers).

**2. GitHub Actions cost waste — analytics/governance angle**
Real, current complaint thread: *"Per minute charges for self hosted
runners? Wtf?"* on GitHub's own community discussions, describing the
per-minute billing model as "prohibitively expensive." [GitHub Community Discussion #182089](https://github.com/orgs/community/discussions/182089).
A funded competitor, **Blacksmith**, already sells faster/cheaper runners
and claims *"~70% less than GitHub runners"* — direct evidence people pay to
fix this. [Blacksmith: How to reduce spend in GitHub Actions](https://www.blacksmith.sh/blog/how-to-reduce-spend-in-github-actions).
**Confidence: High** on the pain; **Medium** on whether an *analytics-only*
(non-infra) wedge is monetizable — no direct evidence for that specific
sub-niche, reasoned from the parent pain.

**3. Cloudflare Workers observability gaps**
Real forum/GitHub complaint threads exist (`community.cloudflare.com`,
`cloudflare/workers-sdk` issues), but Cloudflare shipped **Workers Logs**
(GA, 7-day retention, structured queries) and native OpenTelemetry export to
Honeycomb/Grafana/Axiom/Sentry in 2026, materially closing this gap from the
inside. [Cloudflare: Introducing Workers Observability](https://blog.cloudflare.com/introducing-workers-observability-logs-metrics-and-queries-all-in-one-place/).
**Confidence: Medium** — real pain existed, but the vendor is actively
closing it, which is evidence *against* a durable wedge, not for one.

**4. Invoice/receipt OCR for SMBs**
Real pain (manual processing costs $12–30/invoice vs. $2.36 automated) but
an already-dense, low-price competitive field: Taggun ($4/mo), Veryfi (free
tier + $500/mo), Parseur, DocuClipper, and others. [DocuClipper: OCR Invoice Processing](https://www.docuclipper.com/blog/ocr-invoice-processing/), [Intuz: 9 Best OCR Software for Invoice Processing 2026](https://www.intuz.com/blog/best-ocr-tools-for-invoice-processing).
**Confidence: High** on pain, **High** on the market already being crowded
at prices a solo builder can't easily undercut.

**5. Self-hosted workflow automation (n8n/Automatisch) — missing nodes/integrations**
n8n's community node ecosystem is large and growing fast (5,834 nodes,
+4,759 since Feb 2025, ~13.6 nodes/day). [n8n community nodes count, via awesome-n8n / community stats](https://community.n8n.io/c/feature-requests/nodes/7).
**Confidence: Medium-Low** — the pace of community-built free nodes suggests
this gap is being filled faster by volunteers than a single paid product
could capture value from.

**6. VS Code extension as a monetizable product (not just distribution)**
Indie Hacker sourcing repeatedly frames VS Code extensions as a *distribution
channel* for a separate paid product, not as the revenue source itself; no
case study surfaced of an extension alone clearing anywhere near $5K/mo.
[Indie Hackers: "market your SaaS as a VS Code extension"](https://www.indiehackers.com/post/trust-me-market-your-saas-as-a-vs-code-extension-best-decision-i-ever-made-ca6fef2375).
**Confidence: Medium** that extension-as-product (vs. extension-as-funnel)
is a weak revenue model on its own.

### Researched, no usable evidence found this session (reported, not invented)
- Reddit-specific "manual CSV/PDF workflow rage" threads — searches returned
  no indexed results. Not claiming the pain doesn't exist; claiming this
  search didn't surface a citable source, so it's excluded rather than
  guessed at.
- JetBrains Marketplace unmet demand — search surfaced marketplace
  governance/security news, not a specific feature gap with evidence.
- Obsidian plugin monetization — Obsidian's own community norms lean
  donation-based, not paywalled; no evidence of a plugin-alone product
  clearing meaningful recurring revenue.

**COO recommendation for Round 2:** advance candidates 1 and 2 as primary,
3–6 as challenged-and-likely-cut. This is 2 strong candidates, not 10 — said
plainly rather than manufactured.

---

## ROUND TWO — CEO: Aggressive Challenge (default = NO)

**On #1 (MCP metering middleware):**
Why hasn't someone already won? *Someone already has a foothold* — UsageBox
targets this exact "solo-to-mid-market MCP developer" audience with the
identical "meter is the product" pitch this board would use. Moesif,
MCPize, Nevermined, and FluxA are also active in the same 18-month-old
space. Is demand real? Yes for the ecosystem (11K+ servers), but demand for
*paying to meter* is unproven — under 5% of servers charge at all today,
meaning the buyer pool for a metering tool is a fraction of a fraction.
Would I invest six months into this? **No, not as the sole bet** — I'd
invest 4-6 weeks as a fast, cheap wedge test, not a primary commitment,
given active funded-adjacent competition already using the same pitch.

**On #2 (GitHub Actions cost tooling):**
Why hasn't someone won? Blacksmith *has*, in the infra-replacement version —
but that requires operating compute (hosting runners), which is a
categorically different, much heavier business than this founder's stated
constraints (limited time, full-time employed) can support. The open
question is whether a **non-infra, analytics-only** wedge is defensible, or
whether it's a feature GitHub itself ships for free next quarter (this is
GitHub's own product surface — real platform risk). Would I invest six
months? **Conditionally** — only if scoped tightly to monitoring/alerting
(recurring value) rather than a one-time audit (single-use value, high
churn risk).

**Verdict entering Round 3:** #2 survives as the lead candidate, scoped
narrowly. #1 survives as a smaller, faster side bet, not the primary. #3–6
are cut — not fatal flaws in every case, but the evidence doesn't clear the
bar against the Founder Profile's time and audience constraints.

---

## ROUND THREE — CTO: Technical Feasibility

**#2, scoped as "Actions Ledger" (CI cost monitoring/alerting):**
- Architecture: GitHub App (OAuth, webhook subscriptions on workflow_run
  events) + Cloudflare Workers for ingestion/API + D1 or a small Postgres
  for usage history + a scheduled Worker for weekly digest emails/Slack
  alerts. This is squarely the founder's existing stack (Cloudflare, Node,
  TypeScript, API/DB design) — near-zero new-tech risk.
- No compute to operate (unlike Blacksmith) — Actions Ledger only *reads*
  Actions API usage data, it never runs a job. This removes the single
  biggest cost/ops-burden category in the whole opportunity set.
- Reuse potential: the same "usage-ingest → analyze → alert" engine is
  directly portable to a second product (Cloudflare Workers cost/AWS Lambda
  cost) later — genuine reusable engine, not just a one-off script.
- Technical risk: GitHub App review/verification queue, GitHub API rate
  limits at scale (org-level polling), and correctly reconstructing "wasted
  spend" (needs a defensible waste-heuristic, not just raw spend — this is
  a product-definition risk more than a technical one).

**#1 (MCP metering, scoped as a 4-6 week wedge):**
- Simple to prototype: a Workers-based reverse proxy in front of an MCP
  server's HTTP/SSE endpoint, logging calls to D1, exposing a dashboard.
  Technically easy; the hard part (per UsageBox's own framing) is billing
  correctness at the edge cases (dedup, partial failures, refunds) — real
  but scoped work, not a moonshot.
- Reuse potential: lower — this is a narrower, single-purpose tool unless
  it becomes a platform, which is a much bigger bet than "wedge."

**CTO verdict:** #2 is the stronger engineering bet — lower infra risk,
directly reuses founder's existing skill stack, and produces a reusable
engine. #1 is fine as a scoped, time-boxed experiment, not a 6-month build.

---

## ROUND FOUR — CFO: Financial Model

**Actions Ledger (#2):**
- Dev hours to MVP: ~120–160 hours (GitHub App auth flow, webhook ingestion,
  waste-heuristics v1, dashboard, digest emails) — roughly a focused 3-4
  week solo build at evenings/weekends pace, consistent with the "full-time
  employed, limited hours" constraint.
- Infra cost: near-zero at low scale (Cloudflare Workers/D1 free-to-cheap
  tiers; GitHub API calls are free).
- Pricing: per-org subscription, e.g. $19-49/mo tiered by repo count/seats —
  in line with adjacent devtool SaaS pricing patterns seen in this research
  (Blacksmith, Browserless-style tiers).
- Path to $100 → $500 → $1,000 MRR: 3-5 paying orgs gets to ~$100-150 MRR;
  20-30 orgs gets to $500-1,000 MRR. This is a plausible bottom-up curve for
  a GitHub Marketplace-distributed devtool, **not verified by any specific
  comp's actual conversion numbers** — no real SaaS benchmark was found
  during this research pass, so treat this curve as a reasoned estimate, not
  a cited fact.
- Portfolio contribution toward $5K/mo: meaningful but not sufficient alone
  at a realistic first-year scale; this is a "first brick," not the whole
  wall. **Confidence: Medium** — cost/build estimate is grounded, revenue
  curve is a reasoned guess.

**MCP metering wedge (#1):**
- Dev hours to a testable wedge: ~60-80 hours.
- Revenue plausibility is the weak point: per-call MCP monetization is
  explicitly described in sourced material as "barely worth metering" at
  small scale ($0.01/call × 50 calls/day ≈ $15/mo per customer) — meaning
  this needs either subscription pricing or high customer count to matter,
  and the buyer pool (MCP server operators who *want* to charge) is
  currently under 5% of an 11,000-server ecosystem. **Confidence: Low** on
  reaching $1,000 MRR within a normal first-year timeframe given how early
  and thin the "willing to pay for metering" segment currently is.

**CFO verdict:** #2 has the more defensible, if modest, path to recurring
revenue. #1 is cheap to test but the revenue case is currently thin evidence
stacked on thin evidence — fine as a bet, not as the primary allocation.

---

## ROUND FIVE — Marketing Director: Distribution Only

**Actions Ledger:** Discovery via GitHub Marketplace listing (native,
built-in discovery surface — no audience required), a single Product Hunt
launch (one-time event, not ongoing content), and organic word-of-mouth in
engineering Slack/Discord communities where cost complaints already surface
(per the Round 1 evidence thread itself). This satisfies the "reject
anything requiring constant social media" rule — a PH launch and a
marketplace listing are one-time/passive, not a content treadmill.

**MCP wedge:** Distribution is thinner — the buyer has to already run an MCP
server *and* want to charge for it, a narrow, currently-small audience with
no obvious single discovery surface yet (the MCP registries listed are
directories, not curated marketplaces with buyer intent, per the earlier
Medium article's own framing).

**Marketing verdict:** Actions Ledger has a materially easier distribution
story — an existing, intent-rich discovery channel (GitHub Marketplace)
that the MCP wedge doesn't yet have an equivalent of.

---

## ROUND SIX — Product Strategist: Positioning

**Actions Ledger — one sentence:** "See exactly where your GitHub Actions
minutes are being wasted, in dollars, every week." Understandable in under
10 seconds by the actual buyer (an eng lead or founder watching a GitHub
bill). Job-to-be-done is concrete and already has search intent proven by
the existing pain thread and Blacksmith's existence as a category-adjacent
answer.

**MCP wedge — one sentence:** "Metering and billing infrastructure for MCP
servers." Correct, but the buyer has to self-identify as "an MCP server
operator who wants to charge," which is a narrower and newer category — the
positioning is clear, the *addressable buyer* is the open question, not the
pitch.

---

## ROUND SEVEN — UX Director: Complexity & Friction

**Actions Ledger:** Onboarding should be a single OAuth "Install GitHub
App" flow with zero required configuration for a first useful report — the
biggest UX risk is the waste-heuristic producing false positives (flagging
"waste" that's actually intentional), which would erode trust fast. Ship a
narrow, conservative v1 heuristic set (missing caching, missing
concurrency/fail-fast, oversized runner for trivial jobs) rather than a
kitchen-sink of speculative rules — recommend cutting scope to 3-4 high-
confidence checks for v1, not the full waste taxonomy.

**MCP wedge:** Proxy-based metering introduces a real integration friction
point — the customer has to change their MCP server's deployment to route
through the meter, which is a meaningfully higher-friction ask than
"install a GitHub App."

---

## ROUND EIGHT — Security Director: Compliance, Privacy, Legal

**Actions Ledger:** A GitHub App requesting Actions/workflow read access
touches CI configuration and potentially secrets-adjacent metadata (not
secret values themselves, but job/workflow names could be sensitive in some
orgs) — scope the OAuth permission request to the minimum needed
(`actions: read`, not broader repo access) and state that explicitly in the
listing, since overscoped permission requests are a common Marketplace
rejection/trust issue. No obvious regulated-data exposure (no PII by
default). Platform policy risk: GitHub Marketplace app review requirements
must be met before listing — budget time for this in the roadmap.

**MCP wedge:** A billing proxy sits in the request/response path of
potentially sensitive tool-call payloads (the MCP server's actual data) —
meaningfully higher data-handling responsibility and a harder security
story to tell a customer than a read-only GitHub App.

**Security verdict:** Actions Ledger has the lower-risk data-handling
profile of the two.

---

## ROUND NINE — QA Director: Break Every Assumption

(This section is played by the `qa-critic` persona's actual standard —
verdict-first, specific, and per `Agents/agent-qa-critic.md`'s Always
section: a self-report isn't sufficient, and a suggested fix is a
hypothesis until checked — applied here to the *business* claims, not code.)

**Verdict on Actions Ledger: Needs Work, not Ship It, as currently scoped.**

- **Churn risk is the load-bearing unverified assumption.** A report/alert
  tool has genuine recurring value only if waste keeps recurring or
  changing. If a customer fixes the 3-4 flagged issues in month one, what's
  the month-two value? This needs to be product-designed as continuous
  monitoring (new PRs, new workflows, spend trend, regressions) from day
  one, not bolted on later — this is exactly the kind of assumption the
  Premortem below should stress-test, not something to accept because the
  CFO's revenue curve assumed steady subscriptions.
- **The waste-heuristic accuracy claim has zero real-world validation** —
  no evidence was gathered (or exists yet, since nothing is built) on false
  positive rates. Round 7's "ship 3-4 conservative checks" is the right
  mitigation, but it's a mitigation for a real, unverified risk, not a
  solved problem.
- **GitHub could ship this natively.** GitHub already added first-party
  Actions usage insights in some form; this board did not independently
  verify the current depth of GitHub's own native cost-insight UI before
  this report — that's a real gap in this research pass, flagged rather
  than papered over, and should be checked directly (log into a real GitHub
  org, look at Settings → Billing → Actions usage) before committing
  engineering time, not assumed either way.

**Maintenance burden:** GitHub Actions API surface changes over time;
budget ongoing maintenance, not a build-once product.

---

## ROUND TEN — Open Debate

**CFO to QA:** Your churn-risk challenge is fair, but it's a v1-scoping
question, not a kill — continuous monitoring vs. one-time report is a
design decision this board can make right now, not a reason to reject the
category.
**QA to CFO:** Agreed — changing my framing from "reject" to "conditional
on continuous-monitoring framing being locked in before any code is
written," which is a real position change based on the CFO's point, not a
rubber stamp.
**Security to Product Strategist:** The one-sentence pitch undersells the
"in dollars" framing — dollar amounts are what get a report forwarded to a
budget-holder; keep that literal in the product, not just the pitch.
**Marketing to CEO:** Reconfirming — GitHub Marketplace listing is the
correct primary channel; no reason found in this research to disagree with
Round 5.
**CEO synthesis:** No new evidence emerged in open debate that overturns
Round 2-9; the churn-risk mitigation (continuous monitoring, not one-time
audit) is now a locked v1 requirement, not a nice-to-have.

---

## PREMORTEM — It's One Year Later. It Failed. Why?

1. **GitHub shipped native cost-insight tooling that was "good enough,"**
   killing the wedge the way Cloudflare's own Workers Logs closed the
   observability-gap opportunity researched and rejected in Round 1. *This
   is the single highest-probability failure mode identified in this whole
   session* — it already happened once to a different candidate in this
   same research pass. **Warning sign to watch, discoverable before code:**
   check GitHub's own roadmap/changelog for Actions billing insights before
   committing further, and re-check monthly during build.
2. **Customers ran the report once, fixed the obvious waste, and churned**
   — the exact risk QA flagged in Round 9, if the continuous-monitoring
   requirement got quietly dropped under build-time pressure.
3. **False positives in the waste heuristic eroded trust in week one**,
   and word-of-mouth (the primary distribution channel per Round 5) worked
   in reverse. **Preventable by:** the conservative 3-4-check v1 scope from
   Round 7, actually held to, plus a manual accuracy check against 5-10 real
   repos before public launch — an experiment that costs a day, not a
   quarter.
4. **GitHub Marketplace review took materially longer than budgeted**,
   compressing the 30-day plan. **Preventable by:** submitting for app
   review in week 1 in parallel with feature build, not after.

---

## FINAL DELIBERATION — CEO

Not averaging the board's opinions. Reasoning through the actual
disagreement: QA's "Needs Work" verdict and the CFO's "conditional on
scoping" position aren't in conflict — they converge on the same fix
(continuous monitoring as a locked v1 requirement, conservative heuristic
scope, verify GitHub's native tooling gap directly before more time is
spent). The Security and CTO findings both independently favor this
candidate's lower operational/data-handling burden over the MCP wedge's.
Marketing and Product Strategist findings both independently favor this
candidate's clearer distribution and pitch. The only two dissenting signals
against it (QA's churn risk, the platform-risk premortem item) are both
addressed by a scoping decision available right now, not blocked on new
research. That convergence — five independent lines of reasoning landing on
the same candidate for different reasons — is a stronger signal than any
single score.

---

## FINAL OUTPUT — Ranked Candidates

*Six candidates carried real evidence into this board; ranked below. Fields
requested by the brief are populated where evidence supports a number, and
marked "estimate, not evidenced" where this board is reasoning rather than
citing.*

### 1. Actions Ledger — GitHub Actions cost monitoring & waste alerts
- Overall Score: **74/100**
- Demand 22/30 · Pain 17/20 · Marketplace Discovery 17/20 · Distribution
  16/20 · Revenue 6/10 · Build Difficulty (ease) 8/10 · Support Burden
  (favorable) 6/10 · Founder Fit 10/10 · Expansion 8/10 · Risk (inverted,
  lower is better) 14/20 flagged-risk
- **Confidence: Medium** — pain and founder-fit evidence is High; revenue
  curve and GitHub-native-competition status are reasoned estimates, not
  cited facts (see Round 9's unresolved verification gap).
- **Reasons to build:** direct founder-stack fit, no compute to operate, real
  cited pain, existing adjacent paid competitor validates willingness to
  pay, clear one-sentence pitch, native discovery channel (GitHub
  Marketplace), no audience required.
- **Reasons not to build:** platform risk if GitHub ships this natively
  (unverified as of this report), churn risk if not built as continuous
  monitoring from day one, no direct evidence yet of *this specific*
  sub-niche's willingness to pay (reasoned from adjacent evidence, not a
  direct citation).
- **Recommended MVP:** GitHub App (read-only `actions` scope) → weekly
  digest email with 3-4 conservative waste checks → simple dashboard.
- **Estimated build hours:** 120-160 (estimate, not evidenced).
- **Expected first revenue:** first paying org within 4-8 weeks of public
  listing (estimate, not evidenced).
- **Recommended pricing:** $19-49/mo tiered by repo/seat count (estimate,
  reasoned from adjacent devtool SaaS pricing patterns observed in
  research, not a direct comp).
- **Distribution strategy:** GitHub Marketplace listing (primary), one-time
  Product Hunt launch, organic engineering-community word of mouth.
- **Portfolio contribution:** meaningful first brick toward $5K/mo target,
  not sufficient alone at realistic year-one scale.

### 2. MCP metering & billing middleware (wedge-scoped, not primary)
- Overall Score: **58/100**
- **Confidence: Medium-Low** — ecosystem-scale evidence is High, but buyer
  willingness-to-pay evidence is Low, and direct competition (UsageBox)
  already occupies this exact positioning.
- **Reasons to build:** perfect technical fit, huge and fast-growing
  ecosystem, genuinely underserved billing-infra layer.
- **Reasons not to build:** UsageBox already has the identical pitch aimed
  at the identical buyer; <5% of the 11K-server ecosystem currently wants
  to charge at all, meaning the addressable buyer pool is thin *today*;
  per-call economics are explicitly described in sourced material as barely
  worth metering at small scale.
- **Recommended MVP:** 4-6 week Workers-based metering proxy, tested against
  2-3 real MCP servers, not committed to as a company.
- **Estimated build hours:** 60-80 (estimate, not evidenced).
- **Expected first revenue:** unclear — no evidence found to support a
  specific timeline; this is the honest answer, not a filled-in guess.
- **Recommended pricing:** subscription-based (per-call proven "barely
  worth metering" per source), estimate not evidenced.
- **Distribution strategy:** unclear — no curated marketplace with buyer
  intent currently exists for this category (directories only, per Round
  1's own source).
- **Portfolio contribution:** speculative; treat as a research/prototype
  bet, not a revenue line item.

### 3-6. Researched, ranked below the cut line — not recommended to build now
- **Cloudflare Workers observability tool** — real pain, but the vendor
  (Cloudflare itself) is actively closing the gap; building against a
  shrinking wedge. Confidence: Medium.
- **Invoice/receipt OCR for SMBs** — real pain, but a dense field of
  established competitors at prices ($4-29/mo) a solo builder can't easily
  undercut or differentiate against without a distinct angle not found in
  this research. Confidence: High on pain, High on the market being closed.
- **Self-hosted workflow automation missing nodes** — the volunteer
  ecosystem (n8n) is adding ~13.6 free nodes/day; a paid product competing
  with that velocity is a weak bet. Confidence: Medium-Low.
- **VS Code extension as standalone monetized product** — evidence points
  to extensions working as a distribution funnel for a separate paid
  product, not as the revenue source itself. Confidence: Medium.

---

## FINAL VERDICT

**Build: Actions Ledger — GitHub Actions cost monitoring & waste alerting.**

**Why it beats every other opportunity:** it's the only candidate where
every independent board function — CTO (stack fit, no infra to operate),
CFO (defensible if modest revenue path), Marketing (existing discovery
channel, no audience needed), Product (10-second pitch), Security (lowest
data-handling risk), and QA (real but *fixable-before-launch* risks) —
converged from different angles on the same answer, with dissent resolved
by a scoping decision available today rather than blocked on more research.
The MCP opportunity has a bigger ecosystem number attached to it, but a
smaller *proven* buyer pool and an already-occupied identical pitch;
optimizing for the ecosystem-size number over the buyer-evidence would be
exactly the TAM-chasing this board's brief explicitly rejects.

### 30-Day Execution Roadmap

**Week 1:** Verify the single highest-probability failure mode directly —
log into a real GitHub org's Settings → Billing → Actions usage and confirm
how much (or little) native cost-insight GitHub already ships. If GitHub
already solves this well, stop and re-open Round 1 rather than proceeding.
In parallel, submit the GitHub App for Marketplace review (longest lead
time item, per the Premortem).

**Week 2:** Build the ingestion core — GitHub App auth, `workflow_run`
webhook handling, Workers + D1 storage of run-level usage data.

**Week 3:** Build the 3-4 conservative waste heuristics (Round 7's scope
discipline) and the weekly digest email. Manually validate heuristic
accuracy against 5-10 real repos (the Premortem's cheapest preventable-
failure fix) before writing any more heuristics.

**Week 4:** Ship the minimal dashboard, lock in continuous-monitoring
framing (not one-time audit — the Round 9/10 non-negotiable), soft-launch
to a small set of real repos/orgs, and only then plan the Product Hunt
launch once real usage data confirms the heuristics hold up.

### Why not building anything else right now is the optimal decision

Engineering time is the scarce capital this board was chartered to protect.
Splitting attention across the MCP wedge, the OCR-crowded market, or the
Workers-observability shrinking gap would violate the founder's own
constraint set (limited hours) for candidates with weaker evidence, thinner
buyer pools, or actively closing windows. The disciplined move is one
scoped bet with the strongest convergent evidence, a 30-day MVP, and a
week-1 kill-switch check (native GitHub tooling) before further hours are
spent — not a portfolio of half-started experiments.
