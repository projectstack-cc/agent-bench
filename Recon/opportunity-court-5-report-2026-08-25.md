# Opportunity Court V — Micro-SaaS & BYOK Reassessment

**Date:** 2026-08-25
**Convened by:** CEO Agent (board session, per `agent-ceo.md` Board
Convening protocol)
**Target:** Micro SaaS tools OR BYOK AI tools the company can actually
profit from — convened at the founder's explicit request to revisit the
BYOK question pragmatically.
**Founder's framing, verbatim intent:** *"I know in the past we had
mentioned BYOK AI tools are questionable because someone could just
engineer the same tool. But in hindsight, I have yet to make a dollar
anywhere so let's see what our options really are."*
**Methodology:** Full board gauntlet (Court IV shape) + one new scoring
axis forced by the founder's statement — see below.

---

## The new input this court must honor

The founder said the quiet part out loud: **six courts/research passes,
one live landing page, zero dollars.** Every prior court optimized for
*defensibility* — moats, whitespace, kill-switches before building. That
filter has never once been reached by an actual customer paying actual
money. This court therefore adds an explicit scoring dimension:

> **Speed-to-first-dollar:** weeks from decision to a stranger paying
> money, and how much certainty exists on that path.

This does not replace the existing criteria (crowding, stack fit, unit
economics, founder constraints). It breaks ties and re-weights them.
Moats matter at $5K/mo. They matter very little at $1. The company has
proven it can produce analysis; it has not proven it can produce revenue.

### The BYOK reassessment, stated plainly before any vote

The standing pattern (`patterns.md`) says BYOK undermines the moat of
thin AI wrappers. Three executives independently stress-tested whether
that pattern is being applied too broadly:

1. **The pattern has two conditions, not one.** BYOK kills a product when
   the value-add over the raw API call is thin *AND* the customer is
   capable of replicating the workflow. For a customer who will never
   write a batching script with error handling, resume, rate-limit
   backoff, and structured output validation — which is most BYOK-key-
   holders outside engineering — the key is not the product. They pay
   for the workflow around the key.
2. **BYOK eliminates the exact risk class that killed the company's
   closest-to-shipped product.** `step3-ai` was iceboxed solely over
   AI-API cold-start cash-flow exposure. BYOK reduces founder marginal
   API cost to approximately zero. The pattern that killed BYOK and the
   pattern that killed step3-ai are in direct tension *for the same
   product*, and the court had never put them in the same room.
3. **First-dollar sequencing.** A BYOK product can be sold before the
   founder carries any inference cost. That property is worth real money
   to a company with zero revenue and no ad budget — arguably more than
   a defensible moat it hasn't earned yet.

**Court position:** BYOK is downgraded from "red flag for weak
differentiation" to "pricing/cost instrument whose moat-risk depends on
who the customer is." The `patterns.md` entry stays binding — it is
correct *as scoped* (thin wrapper + builder-class customer) — but future
courts must check both conditions, not cite the pattern as a blanket
rejection.

---

## Who's in the room

Same roster as Court IV: `coo` → `ceo` (challenge, default NO) → `cto` →
`cfo` → `marketing` → `product` → `ux` → `security` → `qa-critic` → open
debate → premortem → final deliberation. All harness-level agents reading
`briefing.md`; no mission dispatches required.

---

## The candidates

| # | Candidate | Type | One-line |
|---|-----------|------|----------|
| A | **NestAPI — nesting/packing engine as a service** | Micro SaaS, non-AI | The bin-packing engine, exposed as an API + simple web UI for shops that can't afford nesting software |
| B | **BYOK Batch AI workbench** | BYOK AI | Run an LLM over spreadsheets/bulk documents with the customer's own key; one-time purchase |
| C | **step3-ai un-iceboxed under BYOK** | BYOK AI | Direct re-trial of the icebox decision — BYOK removes its only named kill reason |
| D | **BYOK AI usage dashboard/gateway** | BYOK AI | Spend tracking across providers for small teams |
| E | **pdf-forge as a product** | Micro tool | PDF→Markdown CLI, productized |

---

## ROUND ONE — COO: Research

### Candidate A: NestAPI

**What it is:** Kerf-aware 2D nesting/bin-packing (sheet goods, plate,
laser/plasma cutting layouts) exposed as (a) a clean REST API for
developers building shop software, and (b) a dead-simple web app for
shop operators who currently lay out cuts in CAD by hand or eyeball.

**Market reality (Medium confidence):**
- Incumbent nesting software (SigmaNEST, ProNest, Lantek) is enterprise-
  priced, seat-licensed, and sales-led. Real complaint data shows small
  shops balking at $5K–15K/yr seats.
- The wedge is not competing with SigmaNEST. It is the long tail: job
  shops, laser-cutting service bureaus, sign makers, cabinet shops doing
  modest-volume nesting who use Fusion/AutoCAD manually today.
- Fulcrum bundles nesting (known since 2026-07-17) — but Fulcrum sells a
  full MES. Shops that don't want an MES still need nesting.

**Information asymmetry (High confidence — the strongest in company
history):** this is not a hypothesized engine. It is production-proven,
581-commit ERP-grade code, already validated against real manufacturing
load at XPanda Foam, IP confirmed owned by the founder. Every previous
candidate this company evaluated required building the core asset first.
This one requires exposing an asset that exists.

**Competitive whitespace (Medium-High):** standalone nesting API-first
services exist but are few and either enterprise-oriented or weak on
kerf-awareness for irregular parts. Verification is precisely the spike
that has been pending since July — this court formalizes it rather than
re-deriving it.

**COO confidence: Medium-High.** First candidate ever where the core
technical risk is zero and only market-wedge questions remain.

### Candidate B: BYOK Batch AI Workbench

**What it is:** Upload a CSV/spreadsheet/document set, supply your own
OpenAI/Anthropic key, define a prompt/column operation once, run it over
every row/document with retries, caching, cost preview, and export.

**Crowding check (Medium-High confidence):** this category exists.
Multiple "AI for spreadsheets" tools ship BYOK tiers. None dominates;
several are indie-built and thinly maintained. This is a contested-but-
not-settled category — closer to the "AI compliance land grab" shape
(`patterns.md`) than to the fully-saturated horizontal-function shape.

**Buyer:** ops folks, researchers, marketers, analysts who have an API
key (or can get one in 2 minutes) and will not write a script. Builder-
class customers are a minority of this buyer set — partially satisfying
BYOK condition 2 above, but not fully: some buyers *are* engineers.

**Distribution:** HN, GitHub, Gumroad/Stripe one-time listing. No content
treadmill needed for a one-time-purchase dev-tool-shaped product — launch
posts do the work. Fits founder constraints directly.

**COO confidence: Medium.** Real demand, real competition, low
differentiation ceiling — but near-zero cost to test.

### Candidate C: step3-ai un-iceboxed under BYOK

**What it is:** The existing, most-complete product in the portfolio
(Stripe, Clerk, Supabase, defined video→PDF-manual pipeline), re-priced
as BYOK + per-conversion one-time fee instead of subscription-with-
founder-borne-API-cost.

**The direct question:** the icebox's *only* named reason was cold-start
cash-flow (`products.md`, High confidence, founder-stated). BYOK removes
it. The secondary objection (BYOK destroys a thin wrapper's moat) needs
re-testing against the two-condition standard: video→manual involves
frame sampling, transcript+visual extraction, section structuring, and
PDF generation — meaningfully more pipeline than a single API call. It
is not maximally thin. But its customers (training/documentation people)
are also not builders. Both conditions lean toward survivable.

**COO confidence: Medium.** The honest problem is different now: nobody
has ever validated demand for it. Technical completeness ≠ demand. The
icebox protected against API cost; it did nothing about the unvalidated
demand question, which BYOK doesn't answer either.

### Candidates D & E

- **D (BYOK AI usage dashboard/gateway)** — checked and killed in round
  one (High confidence): OpenRouter, LiteLLM (OSS), Helicone, Portkey.
  Funded competitors plus a dominant free/open-source option. Filed so
  it isn't re-researched.
- **E (pdf-forge productized)** — killed in round one (High
  confidence): free equivalents abound (Microsoft's markitdown et al.).
  Its value is as internal mission tooling (already serving
  `pdf-forge-pilot`), not a product. Noted as a reusable capability,
  not a candidate.

---

## ROUND TWO — CEO Challenge (default NO)

**A (NestAPI):** "You'd be productizing your employer-adjacent work —
conflict-of-interest noise, and extraction means rebuilding, not copying
(per `HQ/DECISIONS.md`). Also: API-first distribution means developers,
and developers are the worst-paying customers on earth." *Survives.* IP
ownership is confirmed and the rebuild-informed-by-knowledge path is
already the documented plan. Developer-API is the *channel*, not the
whole market — the web-app face serves operators directly. Extraction
cost is real and goes into the CTO round.

**B (Batch AI):** "You're selling a for-loop to people who could write a
for-loop. And the ones who can't will churn the moment ChatGPT adds
'upload CSV' properly." *Survives, wounded.* The for-loop isn't the
product; reliability-at-volume is. But platform-absorption risk is real
and permanent. This is a cash register, not a franchise — acceptable
*under this court's new axis*, and only under it.

**C (step3-ai):** "Un-iceboxing because the cost objection died doesn't
mean the demand objection died. You'd be reviving a product nobody ever
asked to exist." *Survives conditionally.* Correct — which is why the
recommendation out of this court is a demand-validation step, not a
build step. The code already exists; the missing asset is evidence.

**D, E:** Challenges upheld both kills. No debate warranted.

---

## ROUND THREE — CTO: Feasibility

**A (NestAPI):** Stack fit High. Workers/D1/R2 + a pure-computation core;
no third-party inference dependency, so zero AI-API cold-start exposure
by construction. Honest cost: the extraction mandate means a clean-room
reimplementation informed by the founder's knowledge — realistically
2–4 weeks for an API-shaped core (the ERP's version is entangled with
ERP concerns), not a weekend port. Web UI another 1–2 weeks. Stripe
billing engine reusable as-is. **CTO confidence: Medium-High — highest
of anything evaluated since Court II.**

**B (Batch AI):** Trivially feasible, 1–2 week build including Stripe/
Gumroad checkout. BYOK keys stored client-side or encrypted-at-rest —
security round flags key handling below. **CTO confidence: High.**

**C (step3-ai):** Code exists; the work is BYOK key-entry UX, a cost-
preview calculator, and re-pricing plumbing. Days, not weeks. **CTO
confidence: High — conditional entirely on the demand question.**

---

## ROUND FOUR — CFO

**A:** Usage-based or tiered ($29–79/mo, or per-sheet-part pricing).
Zero marginal inference cost; compute is arithmetic. Break-even at
double-digit customers. Path to $5K/mo: 70–170 accounts depending on
tier mix. Cold-start risk: none (no API costs). **CFO confidence:
Medium-High.**

**B:** $49–79 one-time. Zero recurring cost. One-time purchase matches
the filed consumer-billing pattern and eliminates churn anxiety. $5K/mo
requires ~80–100 sales/mo sustained — that is a *volume* business needing
repeat launches; realistic steady-state is more like $500–1,500/mo
absent ongoing promotion. **Be honest about the ceiling: this is a
first-dollar machine, not a thesis-satisfier. CFO confidence: Medium.**

**C:** Per-conversion pricing ($15–30/conversion one-time, BYOK for
inference). Day-1 paid conversions cover essentially all founder-borne
cost by construction — the exact formula the icebox demanded, satisfied
structurally rather than by volume. **CFO confidence: Medium — same
demand caveat.**

---

## ROUND FIVE — Marketing

**A:** Reachable without content marketing: r/CNC, r/lasercutting,
Practical Machinist, CNCzone, maker forums; the builder-community
crowding-check technique (`patterns.md`) doubles as free validation here.
Direct outreach to small laser service bureaus is feasible. **Medium-
High — best channel fit since Court IV's trade-association finding.**

**B:** HN "Show HN" + GitHub + Gumroad. One-shot launch distribution,
no treadmill. Crowded feed, but a one-time-purchase BYOK utility is the
single most launch-friendly product shape that exists for this founder.
**Medium-High for first dollars, Low for durability.**

**C:** Hardest of the three: training/content teams aren't a concentrated
community; no obvious non-treadmill channel. **Low-Medium — this alone
keeps it ranked below where its technical readiness would place it.**

---

## ROUND SIX — Product

- **A:** ICP: owner-operator of a small cutting/service shop or the dev
  building shop tooling. JTBD: "quote and cut without paying SigmaNEST
  money or eyeballing layouts." Pitch: **"Nesting for everyone else."**
- **B:** ICP: key-holding non-builder professional with a repetitive AI
  chore. JTBD: "do this to all 2,000 rows reliably while I eat lunch."
  Pitch: **"Your API key, applied to everything."**
- **C:** Positioning unchanged from original concept; no new positioning
  work authorized until demand evidence exists — deliberately.

---

## ROUND SEVEN — UX

- **A:** Low friction for the web face (paste part dims → get layout →
  download DXF). API face is dev-standard. Trust hinges on layout
  quality vs. their current manual result — demonstrable in seconds.
- **B:** Onboarding is the whole product: paste key → upload file → see
  cost preview before running. Cost-preview-before-run is the trust
  feature; get it wrong (surprise charges) and the product is dead.
- **C:** Existing flows; BYOK entry adds moderate setup friction for a
  non-builder audience — noted as a genuine tension with its buyer.

## ROUND EIGHT — Security

- **A:** Cleanest possible: user-uploaded geometry, no PII, no AI, no
  advisory liability (a bad layout wastes material, it doesn't hurt
  anyone). Employer-separation hygiene: clean-room rebuild, documented,
  per standing decisions. **High confidence, low risk.**
- **B:** Customer API keys handled in-browser/local storage preferred;
  if server-side, encrypt at rest and never log. ToS must be explicit
  that the founder never touches the key. Manageable, standard work.
- **C:** Video uploads of internal training material = medium sensitivity;
  BYOK reduces data-handling exposure (content goes provider-direct),
  which is a genuine security *benefit* of the model worth stating.

## ROUND NINE — QA-Critic: break every assumption

**On the court itself:** "Six courts. Zero revenue. The failure mode
isn't bad candidates — it's that every court outputs 'research spike'
and nothing outputs 'invoice.' Whatever you pick here, the deliverable
must be a *payment link*, not a *finding*. I am watching for this court
to produce a seventh document instead of a first dollar." — **Accepted
verbatim. This criticism is the court's headline output constraint.**

**On A:** "Assumption: the engine generalizes beyond foam-block nesting.
Kerf-aware 2D sheet nesting and your 3D block-packing may share intuition
but not code — you're rebuilding anyway, so prove the rebuild produces
correct layouts on real-world part shapes before selling." Valid — folded
into the spike.

**On B:** "Assumption: buyers won't script it. Counter-assumption: the
buyers who find this product *at all* skew heavily builder-class,
because discovery happens on HN/GitHub." Strongest critique of the day.
Mitigation: price at impulse level ($49), treat as experiment with a
pre-committed time box.

**On C:** "Demand was never validated. BYOK fixes cost, not desire."
Unanswerable except by evidence. Folded into recommendation.

---

## Open Debate

CTO: A is the only candidate where the hardest engineering is already
proven. CFO: A also has the cleanest margin structure. Marketing: B wins
on raw speed-to-first-dollar — days, not weeks. Product: A builds equity;
B harvests cash. Security: no disqualifiers anywhere. QA-Critic: "B is
a weekend project — do B to learn what charging money feels like, while
A's spike runs in parallel. They don't compete for the same weeks."

CEO synthesis: these are complements, not rivals. B is the fastest
possible first-dollar lesson; A is the first credible *portfolio-income*
candidate the company has ever produced from an owned asset.

---

## Premortem

*It's November 2026; this court failed. What killed it?*

- **QA-Critic:** "We shipped B, made $137 total, learned checkout works,
  and treated that as the milestone — then never ran A's spike because
  the emotional need ('I made a dollar') was satisfied. The experiment
  cannibalized the strategy."
- **Marketing:** "A's spike came back ambiguous — Fulcrum's bundling plus
  two API-first entrants — and instead of talking to ten shop owners, we
  filed it and convened Court VI. Sixth court. Zero dollars, again."
- **CTO:** "A's extraction ballooned: the clean-room rebuild hit irregular-
  polygon edge cases and quietly became a three-month project."
- **Product:** "B's builder-class buyers used it once, loved it, and
  refunded nothing but never returned — and we had no second product for
  them."

CEO synthesis of premortem risks: (1) first-dollar satisfaction killing
follow-through; (2) spike ambiguity resolved by filing instead of
outreach; (3) extraction scope creep; (4) B having no follow-on path.
All four have named mitigations in the verdict.

---

## Final Deliberation & Ranked Output

| Rank | Candidate | Verdict | Key strength | Key risk |
|------|-----------|---------|--------------|----------|
| 1 | **NestAPI** | **GO — spike + build path** | Only candidate built on a proven owned asset; no AI-cost exposure | Extraction scope; wedge unverified (Fulcrum) |
| 2 | **BYOK Batch AI** | **GO — time-boxed experiment** | Fastest first dollar physically possible; zero marginal cost | Platform absorption; builder-skewed buyers |
| 3 | **step3-ai (BYOK)** | **CONDITIONAL — demand-check first** | Code exists; BYOK satisfies its own icebox formula structurally | Demand never validated; weak channel |
| 4 | BYOK usage dashboard | REJECTED | — | Funded + OSS saturation |
| 5 | pdf-forge productized | NOT A PRODUCT | Real internal capability | Free equivalents everywhere |

**Verdict details:**

1. **NestAPI (rank 1):** Run the long-pending nesting wedge spike *now*,
   concretized to four checks: (a) Fulcrum's bundled nesting depth,
   (b) existing nesting APIs' pricing/kerf capability, (c) ten direct
   data points from small cutting-shop owners/operators, (d) a 50-part
   correctness benchmark for the rebuilt 2D engine. All four pass →
   Milestone 1: API + minimal web layout tool, one beta shop, Stripe
   live within 6 weeks of spike completion.
2. **BYOK Batch AI (rank 2):** Explicitly parallel, explicitly capped:
   2 weekends max, Gumroad or Stripe one-time at $49, launch once on
   HN/GitHub, then *stop*. Success metric is learning-that-money-flows +
   $X collected, not growth. Pre-committed abandonment date protects
   against premortem risk #1.
3. **step3-ai (rank 3):** Icebox stays technically intact but its
   revisit condition is amended: BYOK + per-conversion pricing satisfies
   the cost formula *structurally*. Remaining blocker is demand evidence.
   If Batch AI's launch surfaces any video/manual demand signals, run a
   landing-page smoke test before any code changes.

**VFFI note (required for honesty):** Court IV's GO on the VFFI spike is
not rescinded — it remains the top technology-push candidate. But VFFI
requires buyer outreach before anything shippable exists, while NestAPI
requires the same effort class and starts from a working engine. These
share the founder's scarce hours; the founder picks the order, and this
court's recommendation is NestAPI-spike first purely on speed-to-evidence.

**Methodology finding for `patterns.md`:** Moat-first filtering produced
six consecutive zero-revenue cycles. Speed-to-first-dollar is added as an
explicit tie-breaking axis, and the BYOK pattern is amended: it is a
moat-killer only when *both* thin-value-add AND builder-class-customer
hold; it is simultaneously the strongest available mitigation for
AI-API cold-start risk. Confidence: Medium-High — one court, but the
zero-revenue base rate is itself six points of evidence.

---

*End of Opportunity Court V report. Filed to
`Recon/opportunity-court-5-report-2026-08-25.md`. Company Intelligence
files (`products.md`, `patterns.md`, `strategic-direction.md`,
`project-history.md`) should be updated per the Librarian's gated-write
standard.*
---

## AMENDED VERDICT (2026-08-25, post-court founder challenge) — **NO-GO ON ALL COUNTS**

This addendum supersedes the ranked output above. It exists because the
founder challenged rank 2 directly after the court adjourned, and the
challenge held — then cascaded upward.

**Rank 2 (BYOK Batch AI): KILLED by founder challenge.** The objection,
verbatim in substance: *"most people can just upload it into ChatGPT and say
'do this' — who pays $49 when they're already paying for AI?"* The court
concedes this is correct at impulse price. The value-add over "paste it into
the assistant you already pay for" requires *arguing* (chat drops rows, chat
hits limits) rather than being *felt*. Products you argue people into are bad
products at $49. Additionally, the buyers with genuinely large batch problems
discover tools on HN/GitHub — i.e., builder-class buyers who script it
themselves; non-builders with bulk needs don't frequent launch venues. The
addressable intersection (scale × reliability × cost-sensitivity × zero
scripting) is real but narrowing with every model release, and unreachable
through channels the founder will tolerate.

**Rank 3 (step3-ai under BYOK): unamended** — icebox conditions stand; not
activated by anything here.

**Rank 1 (NestAPI): DOWNGRADED GO → CONDITIONAL, then NO-GO as a build
commitment pending spike (2026-08-25 follow-up research pass).** Post-court
verification found:

- **App tier definitively closed:** SigmaNEST/SigmaTEK 26, ProNest
  (Hypertherm), Lantek, Radan/Metalix, TruTops settle the paid tier as they
  have for 25+ years — but critically, **the free tier here is genuinely
  good, not token**: `deepnest-next` (MIT, actively maintained v1.5.6,
  signed builds, Discord community) advertises upcoming cloud nesting, and
  SVGnest (2.6k stars) claims parity with commercial software in its own
  README. Any app-shaped positioning dies exactly like KDM's Notion-feature
  risk — except the free incumbent already works, today.
- **API tier unresolved:** direct competitive searches that session were
  bot-blocked/broken (DDG wall, mangled Bing results). No clean self-serve
  commercial nesting REST API surfaced through enterprise-adjacent channels
  (NestLib, SigmaNEST SDK are integration-partner territory), but per Global
  Constitution Rule 1, absence in a broken search session is not evidence of
  absence. Treat the API gap as **unknown**, not open.
- **Net:** NestAPI cannot proceed as ranked without the four-check spike —
  and given the founder's subsequent direction to broaden entirely away from
  history-adjacent candidates (below), the spike is deprioritized, not
  scheduled. Filed as researched-and-hold, revisit only if the broader
  pivot fails AND a working search session resolves check 1–2 favorably.

**Strategic consequence — founder directive, same day:** zero revenue across
six courts and seven-plus research passes triggered an explicit course
correction: stop sourcing candidates from founder history adjacent domains
(manufacturing, trades, documents) entirely. Next court targets **micro
tools/extensions in markets with no relation to founder history** — content
creation, gaming, crypto mooted by the founder, with pdf-forge cited as the
build-shape exemplar, under a hard minimal/no-investment constraint, with
the founder explicitly questioning whether SaaS remains the right end-game
shape at all. See Opportunity Court VI.

**New methodology finding for `patterns.md` (from the founder's challenge,
generalized):** any candidate whose value-add over *"paste it into the AI you
already pay for"* needs explaining is auto-suspect — effectively the step3-ai
BYOK insight promoted to a first-pass demand filter. Also amended: the BYOK
pattern is a moat-killer only when thin-value-add AND builder-class-customer
hold together, and is simultaneously the strongest available mitigation for
AI-API cold-start risk.




