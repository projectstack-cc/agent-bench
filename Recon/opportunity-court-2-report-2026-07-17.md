# Opportunity Court II — Board Meeting Transcript & Verdict

**Date:** 2026-07-17
**Convened by:** CEO persona, per `HQ/Executives/agent-ceo.md`
**Input:** `HQ/CompanyIntelligence/` (briefing, founder-profile, products, engines,
patterns, technical-assets) as the real briefing document, per the
Headquarters architecture's design — this session reads Company
Intelligence rather than re-deriving it from scratch.

## Who's in the room

`ceo`, `coo`, `cto`, `cfo`, `marketing`, `product`, `ux`, `security` are
real registered executives (`HQ/Executives/`). `qa-critic` plays "QA
Director," `ops` plays "Operations Director" by extension — same
convention as the first Opportunity Court. No new personas invented.

## What's different this time

The first Opportunity Court (2026-07-15) researched exclusively new,
external opportunities. This session evaluates **two categories side by
side, on equal evidentiary footing**: Category A (new opportunities,
freshly researched) and Category B (existing internal assets already in
Company Intelligence — a working product, a proven engine, two stalled
attempts, and one failed go-to-market test). Working code is not a thumb
on the scale without evidence, and a fresh idea is not discounted just for
being unbuilt.

---

## ROUND ONE — Chief Opportunity Officer: Research

### Category B — existing internal candidates (from Company Intelligence, re-verified this session)

**B1. step3-ai / "video-to-manual"** — full Stripe + Clerk + Supabase
stack, a defined video-to-PDF-manual conversion pipeline
(`/convert`/`/dashboard`/`/jobs`). **Re-verified this session, not just
cited from the prior filing:** `git log` shows 5 total commits, the last
2026-05-26 ("Trigger redeploy"), before that 2026-05-01 ("Trigger
deployment"), before that setup commits from 2026-04-29–30. **This reads
as a short, ~1-week initial build followed by 7 weeks of no activity** —
not evidence of hitting a specific blocker, just deprioritization. No
market validation has been done on video-to-manual conversion demand
specifically — that gap is real and unresolved by this pass.
**Confidence: High** on stack/state, **Low** on actual market demand for
the product itself.

**B2. Kerf-aware bin-packing/nesting engine** (`xpanda-ops-platform`,
owned IP per the founder, extraction-only — read-only Recon access,
`HQ/DECISIONS.md`). Real market research this pass, not assumed:
nesting/cutting-optimization software is an **established, moderately
crowded market**, not blue ocean. Desktop/SaaS tiers exist at every price
point — ProNest LT $29.99/mo, MyNesting $49/mo, SigmaNEST $5,000–$20,000+/yr
enterprise — plus free tools (EZNESTING) and embeddable API/libraries
(Powernest, Nesting Center) already targeting the exact "small fabricator
without CAD/CAM budget" niche the founder's engine would naturally serve.
[Best Nesting Software 2026](https://lapas.io/blog/best-nesting-software-2026/),
[Nest&Cut](https://nestandcut.com/),
[Powernest](https://powernestlib.com/),
[EZNESTING](https://eznesting.com/).
**Confidence: High** that a real market and real competitors exist;
**Low** on whether the founder's specific technical strength (kerf-aware,
multi-orientation, proven in production) is enough differentiation against
free and cheap incumbents without a sharper wedge (e.g., non-metal
materials — fabric, glass, PCB — which the existing players are less
obviously optimized for, per this search pass; not independently confirmed).

**B3. pdf-tools / packslip-pro** (document automation, Shopify-adjacent).
Re-checked this session: `pdf-tools` (GitHub-only, `projectstack-cc` org)
confirmed 127 commits, "Document Modification center" (React+Vite), no
published release, `AGENTS.md`/`BACKLOG.md`/`Project_Context.md` present
(organized but unfinished). Real market research this pass: BOL/packing-
slip document automation is **crowded with funded, enterprise-grade
competitors** — SmartBOL, ABBYY Vantage, PackageX, Dashdoc, Freight Club —
several offering full OCR + API automation already.
[SmartBOL](https://smartbol.com/bill-of-lading-software/),
[PackageX](https://www.packagex.io/) (per search summary),
[Dashdoc](https://www.dashdoc.com/en-US/blog/electronic-bill-of-lading-software-us).
The founder's *own* best version of this pattern (the packing-slip parser
in `xpanda-ops-platform`) is the most production-proven of the three
internal attempts — but it's the one asset locked behind the read-only
access constraint. **Confidence: High** on market crowding; **Low** on any
clear differentiated angle for `pdf-tools`/`packslip-pro` specifically
against funded incumbents.

**B4. subscription-worker** — not itself an opportunity; a proven,
in-production Stripe billing engine that removes real build cost from
whichever candidate needs subscription billing. **Confidence: High.**

**B5. ProjectStack Web Solutions** — a real, already-tried go-to-market
attempt (client-services landing page), zero clients/zero revenue to date.
**Not a candidate — a real negative data point** on what channel does NOT
convert for this founder, weighted directly in Round 5. **Confidence:
High** (founder-stated directly).

### Category A — new opportunities (freshly researched this session)

General search for new, sharply-evidenced candidates (shop-floor job
tracking for small manufacturers, general logistics-automation
complaints) surfaced **real but soft evidence** — vendor-blog and
industry-content sources describing manufacturers as "over-specifying"
full ERP for what's actually a shop-floor visibility problem
[TotalControlPro](https://totalcontrolpro.com/blog/shop-floor-job-tracking-without-100k-erp/),
not a specific, citable complaint thread or a named funded competitor the
way the first Opportunity Court found for GitHub Actions cost tooling.
**No new candidate from this pass clears the evidence bar this board holds
itself to.** Reported honestly rather than manufactured into a stronger
candidate than the evidence supports — this session's real research budget
went deeper on Category B (informed by Company Intelligence) than on a
broad new Category A sweep, which is itself a reasonable trade given the
directive's emphasis on being "honed in," not just "diverse."

**COO recommendation for Round 2:** advance B1 (step3-ai) and B2
(nesting engine) as primary candidates; B3 (document automation) as
challenged-and-likely-cut given crowding; no Category A candidate this
pass clears the bar for serious consideration alongside them.

---

## ROUND TWO — CEO: Aggressive Challenge (default = NO)

**On B1 (step3-ai):** Why did it stall? Five commits, a one-week build,
then silence — this reads as "built, then deprioritized by a full-time job
and a second real project (XPanda Foam)," not "hit a wall." That's
actually a *good* sign for reviving it — no unsolved technical blocker
found in the commit history — but the demand question is completely
unanswered. Would I invest real hours finishing this without knowing
who'd pay for it? **No — not blind.** Week 1 of any plan has to answer
that before more code gets written.

**On B2 (nesting engine):** This is not an empty market — EZNESTING is
free, ProNest LT is $29.99/month, and dedicated API libraries already
target exactly the "no CAD budget" niche. Why would this founder win
against six-plus years of GAAP CAD/CAM incumbents? Only if there's a real,
narrow wedge (a material niche, a modern API-first developer experience
the legacy players don't have) — not proven this pass. Also: **it has to
be rebuilt from scratch**, not extracted — the live code can't be touched
per the standing access decision. That's a real build, not a copy-paste,
against a founder with limited hours. Would I invest six months? **No —**
a 2-3 week scoped spike to validate a specific wedge, not a blind
full rebuild.

**On B3 (document automation):** Funded, well-resourced competitors
already serve this space with OCR + API automation. The founder's best
version of this pattern is locked in the ERP. **Cut** — not enough
differentiation evidence, and the two accessible internal attempts
(`pdf-tools`, `packslip-pro`) are both less developed than what's already
been outcompeted by the market research above.

**Verdict entering Round 3:** B1 (step3-ai) advances as the lead
candidate — lowest technical risk, fastest to real-world signal. B2
(nesting engine) survives as a smaller, later bet requiring its own
validation spike, not a primary commitment. B3 is cut.

---

## ROUND THREE — CTO: Technical Feasibility

**B1 (step3-ai):** Stack is proven and modern (Next.js, Clerk, Supabase,
Stripe, `@react-pdf/renderer`, `dnd-kit`). No rebuild needed — this is a
"finish it" project, not a "build it" project. Real technical unknown:
whether the video-processing pipeline itself (the actual
video-to-instructions conversion logic) works end-to-end, or whether it
was scaffolded but never proven on a real video — **not verified this
pass**, and it's the single most important thing to check before anything
else. **CTO verdict: lowest engineering risk of any candidate this board
has evaluated in either session — contingent entirely on that one
unverified pipeline check.**

**B2 (nesting engine):** Rebuilding a kerf-aware, multi-orientation
bin-packing solver from the founder's own knowledge (not the live code) is
real, non-trivial algorithmic work — genuinely hard even for an
experienced engineer, likely 2-4 weeks for a defensible v1, not a weekend.
Reuse potential is high *conceptually* (the founder understands the
problem deeply) but low *literally* (no code can move). **CTO verdict:**
technically the most interesting candidate, but the access constraint
converts what looked like an "extraction" into a genuine from-scratch
build — scope it as a validation spike (a narrow single-material-type
demo), not a full rebuild, until the market wedge is confirmed.

---

## ROUND FOUR — CFO: Financial Model

**B1 (step3-ai):**
- Dev hours to relaunch: unknown until the video pipeline is checked —
  could be near-zero (finish loose ends) or substantial (fix a broken
  core pipeline). **This uncertainty is the single biggest risk in this
  candidate, and it's cheap to resolve** (a few hours of direct testing).
- Infra cost: near-zero at low scale (already on Clerk/Supabase/
  Vercel-or-Cloudflare-style stack, per Company Intelligence's validated
  default pattern).
- Pricing: Stripe is already wired — a paid tier is a configuration
  decision, not new infrastructure.
- Revenue path: **not modeled** — no market research on video-to-manual
  conversion demand exists yet. Flagged as the real gap, not filled in
  with an invented curve.

**B2 (nesting engine):**
- Dev hours for a validation spike: ~60-100 hours for a narrow, single-
  material demo (estimate, not evidenced).
- Pricing precedent exists in the market ($29.99-$49/mo desktop/SaaS
  tiers, free tier from EZNESTING) — meaning price competition is real,
  not hypothetical. A wedge product would likely need to compete near or
  below the free/cheap end initially, which pressures unit economics
  before volume — a real concern given the CFO's bottom-up modeling
  standard.

**CFO verdict:** B1 has the cheaper, faster path to a real revenue signal
*if* the pipeline check comes back clean. B2 has real technical
differentiation but a harder, more contested revenue path even with a
validated wedge. Recommend resolving B1's pipeline unknown before
committing further hours anywhere else — it's the cheapest experiment on
the board.

---

## ROUND FIVE — Marketing Director: Distribution Only

**B1 (step3-ai):** Distribution unclear and unresearched this pass — who
searches for "convert video to instruction manual"? Real candidate
channels exist in principle (YouTube-creator-adjacent tooling
marketplaces, a Product Hunt launch) but none confirmed. **This is a real
gap, not filled in.**

**B2 (nesting engine):** Existing competitors show the actual channels
that work in this space — CAD/CAM marketplace listings, fabricator trade
communities, embeddable-library placement (developer-facing distribution,
similar to how Powernest positions itself). A real, visible channel
precedent exists, unlike B1.

**On ProjectStack (the negative data point):** a positioned, well-built
landing page for a generic "custom systems for businesses" service pitch
produced zero clients. **Real lesson for both candidates:** a generic
value proposition with no specific, searchable buyer intent does not
convert for this founder. Whichever candidate proceeds needs a sharp,
specific one-sentence pitch with real search intent behind it (per
`product`'s Round 6), not a repeat of ProjectStack's broad positioning.

**Marketing verdict:** Neither candidate has a fully confirmed channel yet
— B2 has better precedent from competitor behavior; B1's channel is a real
open question the founder should research directly before launch, not
assumed.

---

## ROUND SIX — Product Strategist: Positioning

**B1, one sentence:** "Turn a screen-recording into a finished instruction
manual, automatically." Understandable in under 10 seconds — but the
buyer isn't obviously identified yet (SaaS onboarding teams? Course
creators? Internal enterprise training?). **Positioning is incomplete
until the ICP is named, which this pass didn't have the evidence to do.**

**B2, one sentence:** "Kerf-aware cutting optimization for fabricators who
don't want to pay for full CAD/CAM." Clear pitch, clear buyer (small
fabricators), but it's the *same* pitch several existing competitors
already use — the positioning problem isn't clarity, it's differentiation.

**Product verdict:** B1's positioning problem is "who's the buyer" (an
ICP gap); B2's positioning problem is "why this one, not the five
existing options" (a differentiation gap). B1's gap is cheaper to close —
a direct look at the product and a few candidate-buyer conversations settle
it fast. B2's gap requires the material-niche wedge to actually be real,
which needs its own research.

---

## ROUND SEVEN — UX Director: Complexity & Friction

**B1:** Onboarding shape is already implied by the existing routes
(`/convert` → `/dashboard` → `/jobs`) — a single core action (upload
video, get manual) is a good one-decision onboarding shape if the pipeline
actually works end-to-end. **Contingent on the same pipeline check CTO
flagged** — if the conversion quality is inconsistent, that becomes the
dominant UX risk (a bad first output kills trust immediately, same
false-positive-erodes-trust principle as the first Opportunity Court's
QA Director finding on Actions Ledger).

**B2:** A nesting tool's core friction is upload-material-spec →
see-optimized-layout — conceptually simple, but the existing competitors'
UX (mostly legacy desktop-software-feeling web apps, per this search pass)
suggests a genuinely modern, fast web UI could itself be a real
differentiator, not just the algorithm. Worth weighing as part of B2's
wedge if it's pursued.

---

## ROUND EIGHT — Security Director: Compliance, Privacy & Platform Risk

**B1:** User-uploaded video content — real storage/privacy handling
question (how long is raw video retained, is it used for anything beyond
conversion) that should be answered explicitly in any relaunch, not left
implicit. No regulated-data category by default (not health/financial),
but treat video content as sensitive-by-default until scoped otherwise.

**B2:** Low data-sensitivity profile — material specs and cut layouts are
not personal or regulated data. Lower risk than B1 on this axis.

**Neither candidate has an ERP-access or platform-policy conflict** — both
are clean of the `xpanda-ops-platform` access constraint's most acute risk
(B1 entirely; B2 as long as it stays a from-scratch rebuild, never a code
export).

---

## ROUND NINE — QA Director: Break Every Assumption

(Per `agent-qa-critic.md`'s standard: a self-report isn't sufficient, and
a suggested fix is a hypothesis until checked — applied here to both
candidates' business claims.)

**On B1: the single largest unverified assumption on this entire board is
that step3-ai's video-conversion pipeline actually works.** Five commits
and two "trigger redeploy" events are consistent with either "finished and
just needs a product decision" or "got the scaffolding working and never
proved the core feature." **This board cannot credibly verify demand,
pricing, or a 30-day roadmap until this one fact is checked.**
Recommend this be the literal first action, not week 3.

**On B2:** the "kerf-aware bin-packing engine" claim rests entirely on
Recon reading source code and changelog entries — real evidence, but
*this session did not re-verify it runs correctly* (no test execution,
per the standing access constraint, correctly). Treat "proven in
production" as true for XPanda Foam's use case specifically, not
as evidence it generalizes cleanly to other materials without real testing
once rebuilt.

**Maintenance burden:** B1 is a hosted SaaS product — ongoing cost of
video processing (compute-intensive) at scale is unmodeled and worth
checking before any pricing commitment. B2 (algorithm-only) has a lower
ongoing compute footprint once built.

---

## ROUND TEN — Open Debate

**CFO to QA:** Your pipeline-verification point is right, and it changes
the roadmap — week 1 isn't "relaunch," it's "test the pipeline on 3 real
videos and look at the output quality."
**QA to CFO:** Agreed — and if it fails that test, this board's verdict
should flip to B2 without a second full session, since B1's entire
advantage (near-zero build risk) evaporates if the core feature doesn't
actually work.
**Product to Marketing:** The ICP gap on B1 and the differentiation gap on
B2 are both real, but B1's is answerable in days; B2's needs its own
research pass. That's a real tiebreaker, not just a preference.
**Security to CEO:** Neither candidate has a blocking risk; both are
buildable candidates from a compliance standpoint.
**CEO synthesis:** No disagreement survives that changes the ranking.
B1 remains ahead on cost-to-verify and risk profile, contingent explicitly
on the pipeline check.

---

## PREMORTEM — It's One Year Later. It Failed. Why?

**If B1 (step3-ai) is chosen and fails:**
1. **The pipeline never actually worked well enough**, and this was
   discovered only after real marketing spend, not in week 1. *Highest-
   probability failure mode — directly why QA's recommendation to test
   first is non-negotiable, not optional.*
2. **No one wanted video-to-manual conversion at a price this founder
   could charge** — the ICP gap from Round 6 was never actually closed,
   just assumed away by "the stack looks done."
3. **Video storage/processing costs scaled faster than revenue** — the
   Security round's flagged-but-unmodeled cost risk materialized.

**If B2 (nesting engine) is chosen and fails:**
1. **No real wedge existed** — the founder built a technically excellent
   but undifferentiated competitor to five existing tools, several of
   which are free or cheaper.
2. **The from-scratch rebuild took materially longer than the founder's
   limited hours could sustain**, given a full-time job and XPanda Foam
   both already competing for time.

---

## FINAL DELIBERATION — CEO

Not averaging. B1 and B2 both have one board-identified blocking unknown
each — B1's is cheap and fast to resolve (test 3 videos, days not weeks);
B2's is expensive and slow to resolve (a real market/wedge research pass,
then a 2-4 week validation build). Every round that touched cost-to-verify
(CFO, QA, Product) independently favored B1 for exactly this reason. B2
remains the more technically remarkable asset and the stronger long-term
candidate *if* its wedge question gets answered favorably later — this
verdict doesn't retire it, it sequences it.

---

## FINAL OUTPUT — Ranked Candidates

### 1. step3-ai / "video-to-manual" — finish and validate
- **Overall Score: 71/100**
- **Confidence: Medium** — technical risk is genuinely low, but the
  single largest fact this verdict depends on (does the pipeline work) is
  unverified, and market/ICP/channel are all real, unresolved gaps.
- **Reasons to pursue:** near-zero rebuild cost, proven modern stack,
  Stripe billing already wired, cheapest board-identified next test of any
  candidate in either session.
- **Reasons not to:** demand, ICP, channel, and the core pipeline itself
  are all unverified — this is a research-then-decide candidate, not a
  ship-it candidate yet.
- **Recommended next step (not a full MVP):** verify the pipeline on 3
  real videos, name a specific ICP, and check for a specific buyer
  complaint thread this product would actually answer — all before
  writing more code.

### 2. Kerf-aware nesting engine extraction — validated wedge, not yet
- **Overall Score: 58/100**
- **Confidence: Medium** — the technical asset is real and High-confidence;
  the market opportunity is real but crowded, and no specific
  differentiated wedge is confirmed.
- **Reasons to pursue:** genuinely hard, proven technical core; founder
  has deep, demonstrated domain expertise; multiple viable price points
  exist in the real market (not zero-revenue-ceiling).
- **Reasons not to:** must be rebuilt from scratch (real access
  constraint); crowded market including free competitors; no confirmed
  differentiation beyond "the founder understands this well."
- **Recommended next step:** a scoped 1-week research spike (not a build)
  — is there a real underserved material niche (fabric/glass/PCB) or
  developer-facing API angle the existing players don't serve well.

### 3-4. Cut this session, not re-litigated
- **pdf-tools / packslip-pro (document automation)** — real but crowded
  by funded competitors (SmartBOL, ABBYY, PackageX); the founder's own
  best version of this pattern is locked behind the ERP access
  constraint. Confidence: Medium-High on the crowding finding.
- **New Category A candidates** — no candidate from this session's
  research cleared this board's evidence bar. Honestly reported as a gap
  in this pass's research depth, not papered over with a weak pick.

---

## FINAL VERDICT

**Immediate action: verify step3-ai's video-conversion pipeline. This is
not a 30-day build — it's a same-week test that determines everything
else.**

**Why it beats the alternative:** every board function that touched
cost-to-verify (CFO, QA, Product) converged on the same reasoning from
different angles — B1's blocking unknown is cheap and fast to resolve, and
resolving it either confirms the lowest-risk candidate on this entire
board (in either session) or cleanly redirects effort to B2 without having
wasted real build hours. B2 remains real and worth pursuing — it's
sequenced after, not rejected.

### 7-Day Verification Plan (deliberately not a 30-day build plan)

**Days 1-2:** Run 3 real, varied videos through step3-ai's actual
conversion pipeline. Judge output quality honestly — would a real user pay
for this output today?

**Days 3-4:** If the pipeline works: name a specific ICP (not "creators"
generically — a specific job-to-be-done and buyer), and check for at least
one real citable signal of demand (a complaint thread, a competitor
charging for something adjacent, a search-volume signal) — the same
evidence bar this board holds every other claim to.

**Days 5-7:** If both check out: scope a minimal relaunch (what's
genuinely missing vs. done), a real price point, and a specific
distribution channel — not before.

**If the pipeline fails the Day 1-2 check:** stop, don't sink more hours
into B1, and redirect the following week to B2's 1-week wedge-research
spike instead — this premortem branch is already scoped, not a restart
from zero.

### Why not the nesting engine right now

Not because it's weaker technically — every round agreed it's the more
remarkable asset. It's sequenced second because its blocking unknown (a
real market wedge against established, some-free competitors) costs a real
research week to resolve, while step3-ai's blocking unknown costs two
days. Spend the cheap verification first; this is the same capital-
discipline principle this board's own charter is built on, applied to
which question gets asked first, not just which product gets built first.

---

## Confidence

**High** — the technical state of `step3-ai` (commit history) and the
nesting-software market's existing competitors and pricing are directly
verified this session (git log, real search results with sources).
**Medium** — the specific "material-niche wedge" hypothesis for the
nesting engine is a reasoned possibility, not confirmed by this session's
research. **Low, flagged rather than guessed** — step3-ai's actual pipeline
quality and any specific ICP/demand signal for video-to-manual conversion;
this is exactly the gap the 7-Day Verification Plan exists to close before
any further hours are spent.
