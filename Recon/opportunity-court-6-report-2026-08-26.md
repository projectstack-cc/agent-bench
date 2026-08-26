# Opportunity Court VI — Micro Tools Beyond Founder History

**Date:** 2026-08-26
**Convened by:** CEO Agent (board session, per `agent-ceo.md` Board Convening protocol)
**Target:** Micro tools/extensions with **no connection to founder history**, minimal-to-zero investment required — spanning content creation, gaming/PC builders, cryptocurrency, and adjacent micro-tool categories
**Exemplar:** `Tools/pdf-forge` (the shape of the intended product class: small, self-contained, one-time-purchase utility)
**Context:** Court V (2026-08-25) returned **NO-GO on all counts** (Batch AI killed by the founder's own "can't they just ask ChatGPT?" test; NestAPI spiked-down after app-tier nesting saturation was confirmed live). This court was convened by direct founder directive to broaden horizons beyond SaaS if necessary: *"If this company doesn't start to find monetary pools, we may have to start rethinking our process."* That directive frames every round below.

---

## Evidence coverage note

Search tooling was heavily degraded again this session (Reddit bot-walled,
Google consent-walled, DDG intermittent) — the same failure mode as late
Court V research. The working source was the **Hacker News Algolia API**
(machine-readable, no bot-wall), supplemented by whatever vendor pages were
directly reachable. That skews the evidence toward builder-community signal.
Per Constitution Rule 1, absence-of-evidence from a degraded search session
is noted wherever relevant rather than papered over.

Live signals pulled during this court's research waves:

| Signal | Evidence | Source |
|--------|----------|--------|
| **SFX Engine — game-dev audio tooling ≈ $2K MRR** | Publicly shared revenue, indie-built | HN Algolia / launch threads |
| **CSS Scan — dev browser extension, ~$70K lifetime** | Publicly shared revenue; **one-time purchase** model | HN Algolia / maker threads |
| **Crypto tool launches register ~2 points** | Multiple Show-HN launches effectively ignored | HN Algolia |
| **MRR-sharing thread active August 2026** | Ongoing maker-revenue ecosystem | HN Algolia |
| **PC-builder tooling has prior art** | pc-kombo, AI PC-building tools already exist | HN Algolia / web |
| **TTRPG/streaming tool monetization weak** | Little willing-to-pay evidence surfaced | search probes |

---


## The candidates

Six candidates drawn from the four territories the founder named, plus
adjacent micro-tool shapes suggested by the pdf-forge exemplar:

| # | Candidate | Territory |
|---|-----------|-----------|
| A | **Dev/creator browser extension utility** (CSS Scan-shaped) | Cross-cutting |
| B | **Game-dev micro-tooling** (SFX Engine-shaped) | Gaming |
| C | **Content-creation micro-tools** | Content creation |
| D | **PC-builder / hardware-buyer tools** | PC builders |
| E | **Cryptocurrency portfolio/tax/market tools** | Crypto |
| F | **Local-first file utilities** (pdf-forge siblings) | Cross-cutting |

---

## ROUND ONE — COO: Research synthesis

### Candidate A: Dev/creator browser extension utility

Browser extensions are the best-evidenced micro-tool revenue pool found
outside founder-history territories: CSS Scan demonstrates a solo one-time-
purchase extension reaching ~$70K lifetime without subscriptions. Mechanism:
solve one repeated annoyance inside a workflow people already sit in; charge
once ($20–80 impulse tier); distribute via extension stores plus one launch
post. Zero infra cost, zero marginal cost. **Weakness:** discovery skews
builder-heavy (`patterns.md`'s app-store-distribution magnet applies), so
pick problems whose sufferer *isn't* a developer. **COO confidence:
Medium-High on category; Medium on any specific extension until a concrete
pain is pinned.**

### Candidate B: Game-dev micro-tooling

SFX Engine's public ~$2K MRR is direct proof indie game devs spend money on
small, focused tooling — and Unity/Godot asset ecosystems support paid
listings (distribution built-in; cuts both ways per `patterns.md`).
Small-but-real monthly ceiling, low build cost for utility-shaped entries,
and an audience that buys repeatedly within a known "tools/assets" budget.
**Weakness:** marketplace distribution draws indie-dev crowding; actual
willingness to pay concentrates in asset-like purchases more than tools.
**COO confidence: Medium.**

### Candidate C: Content-creation micro-tools

Instantly suspect under the standing filter filed after Batch AI's kill
("if you can't articulate who pays without comparing it to the AI they
already pay for, it's auto-suspect"). Creator pain points are exactly where
ChatGPT/Claude/CapCut absorption moves fastest, and the space carries
creator-economy competitor density. Research waves surfaced no unpicked
pocket reachable by a solo micro-tool. **COO confidence: Low-Medium.**

### Candidate D: PC-builder / hardware-buyer tools

Prior art confirmed live (pc-kombo, AI PC-build helpers). The buyer spends
money — but at vendors, via affiliate layers dependent on Google SEO /
paid placement: an ads-and-audience game this founder has ruled out.
Native-desktop stack mismatch noted per the conversion-cost doctrine (not
disqualifying alone, but real). **COO confidence: Low-Medium.**

### Candidate E: Cryptocurrency tools

Tonight's sharpest negative signal: multiple crypto-tool Show HNs drew
~2-point receptions — the builder community has stopped caring; consumer
wallet/portfolio trackers are saturated at every tier; tax angles carry
compliance adjacency (a recurring rejection trigger across this company's
history). The founder's own "maybe we develop our own cryptocurrency
(kind of a joke)" — formally assessed: securities/regulatory exposure,
zero pre-existing distribution, hostile climate for any new coin. Not a
joke anyone can afford. **COO confidence: Very Low. Reject wholesale.**

### Candidate F: Local-first file utilities (pdf-forge siblings)

The exemplar class itself: offline-capable, privacy-positive, one-time
purchase, near-zero infra. Document pain is perennial and real, but Court
history shows document automation is crowded at web scale — the
differentiator is local/private positioning ("your files never leave your
machine"), selling against cloud tools' privacy anxiety. Distribution
remains the unsolved leg (see CEO round). **COO confidence: Medium on
category viability; the gap is go-to-market, not product.**

---

## ROUND TWO — CEO: Aggressive Challenge (default = NO)

### Candidate A: Extensions

Challenge: "Name five specific extensions someone would pay $49 for right
now — if you can't, this is a category, not a candidate." Response
(accepted): correct — A survives only as a *category bet*, and the category
needs per-instance validation. Amended survival condition: any specific
extension enters build review only after a **pay-link smoke test** (the
lesson from Batch AI's post-court kill, made structural).

### Candidate B: Game-dev tools

Challenge: "$2K MRR is one data point, on a marketplace full of competitors
who do it for love. Where's the moat?" Response: there isn't one — survival
depends on attaching to a genuinely underserved engine/pipeline task and
accepting a modest ceiling. Weakened but alive.

### Candidate C: Content creation

Challenge: the standing filter above. No rebuttal offered. **Rejected.**

### Candidate D: PC builders

Challenge: affiliate/SEO dependence violates distribution constraints; prior
art live. **Rejected.**

### Candidate E: Crypto

Challenge: dead community signal + compliance adjacency + own-coin
regulatory reality. **Rejected.**

### Candidate F: File utilities

Challenge: "pdf-forge exists — did anyone ever pay for it?" Unanswered:
there is no checkout in front of pdf-forge, so its demand status is unknown
by construction. Survival condition identical to A: money-test before
further build effort.

## ROUND THREE — CTO / CFO / Marketing / Product / UX / Security (condensed)

- **CTO:** All six fit React/TS/web-tech or trivial packaging; extensions
  and local-first utilities have effectively zero backend cost. Any v1:
  days-to-two-weekends. No architectural objection anywhere.
- **CFO:** One-time-purchase economics dominate this entire class (matches
  `patterns.md`'s billing-model finding); no AI-API cold-start exposure in
  any surviving candidate; each needs roughly 200–400 sales for meaningful
  income — achievable *cumulatively across a portfolio*, which suits the
  thesis's $5K/mo portfolio-income frame better than any single-SaaS swing
  considered to date.
- **Marketing:** Distribution is THE binding constraint for every survivor.
  Extension stores/marketplaces = builder-magnet caveat; one-shot launches =
  spike-decay revenue. SEO/content games are ruled out by founder
  constraints (this partially killed D). Honest statement: no survivor has
  *strong* distribution; they have *cheap, weak* distribution.
- **Product:** Portfolio framing fits deliberately: eight one-time-purchase
  products averaging $150/mo decay-resistant beat hunting one unicorn.
  All surviving pitches pass one-sentence clarity.
- **UX:** Local-first + single-purpose = inherently low friction;
  extensions win on habit-integration (they live where the work happens).
- **Security:** All survivors are low-risk client-side. The crypto
  candidate carried the entire risk profile and is already out.

## ROUND FOUR — QA-Critic: Break Every Assumption

**Assumption 1: "Categories with proven solo-revenue stories will transfer."
Break:** CSS Scan and SFX Engine are survivorship exemplars — the same
launches' graveyards weren't sampled. Counter: accepted; hence pre-committed
time boxes and smoke tests on everything below.

**Assumption 2: "Zero investment keeps all options open." Break:** It also
keeps all outcomes closed — nothing surfaces demand like a working pay
button. Counter: adopted directly into the verdict structure. Every GO is
checkout-first.

**Assumption 3: "This court can originate the winning idea." Break:**
Seven consecutive formal sessions have converged on rejection or
spike-without-execution. The bottleneck is not idea generation — it's that
no session has shipped a payment link. The founder said it directly: rethink
the process. Counter: this court declines to crown another hypothetical
winner. **Verdict: survivors pass only as smoke-tested bets, and the
process change is this court's primary deliverable.**

## Open Debate → Premortem → Final Deliberation (CEO)

Debate collapsed quickly: C, D, E died in rounds one and two. The contest
was between A/F (distribution-common, validation-cheap) and B (proven
niche-spend, weaker scale).

Premortem (December 2026, nothing earned): three killers identified —
(1) another quarter of building pages with no checkout in front of them;
(2) picking extension ideas whose sufferers are developers who'd script it
themselves; (3) treating the smoke test as the finish line instead of the
gate to a fast build.

CEO synthesis: the founder's directive reordered priorities correctly.
Monetary pools first, romance later. The one thing we know beats another
round of analysis is converting pdf-forge and similar existing artifacts
into items with price tags on them.

---

## Ranked Output

| Rank | Candidate | Verdict | Key strength | Key risk |
|------|-----------|---------|--------------|----------|
| 1 | **F+A: local-first file utilities & non-dev-facing extensions** | **GO — checkout-first portfolio play** | Near-zero cost, proven one-time-purchase model | Distribution cheap-but-weak; demand unverified |
| 2 | **B: game-dev micro-tools** | HOLD — behind the same pay-test gate, attached to a genuinely underserved pipeline task | Proven niche spend (SFX Engine) | Modest ceiling; love-driven competition |
| 3 | C: content creation | REJECTED | Large market | AI-absorption + saturation; fails standing filter |
| 4 | D: PC builders | REJECTED | Big-ticket buyers | Prior art + affiliate/SEO-dependent distribution |
| 5 | E: crypto (incl. own coin) | REJECTED | — | Dead demand signal, compliance adjacency, regulatory exposure on own-coin |

---

## Verdict

**GO — conditional, portfolio-shaped, checkout-first. NOT a green light on
any specific product yet.**

Concrete sequence (the court's actual deliverable):

1. **Put a pay link in front of something this week.** pdf-forge gets a
   landing page + Gumroad/Stripe one-time price, no code changes required
   first. If buy-clicks never come, that is real data about every candidate
   in the F/A class simultaneously.
2. **Smoke-test rule for every future candidate** (proposed standing rule,
   see `patterns.md`): landing page + working "buy" button + one post to a
   relevant community *before* any build beyond scaffolding. If nobody
   clicks buy on a page, nobody buys a product.
3. **Extension ideas vetted for non-developer sufferers only** (Batch AI's
   buyer-skew lesson, carried forward as a gate).
4. **Game-dev tooling held** until step 1–2 produces either revenue or a
   validated non-dev pain worth building for.
5. **Process finding (primary):** seven consecutive opportunity sessions
   have now concluded without shipping a payment link. Demand evidence
   cannot be conjured by further board deliberation — it only comes from
   exposure to buyers. Default flips accordingly: *sell first, build on
   click-through, analyze only failures.*

---

*End of Opportunity Court VI report. Filed to `Recon/opportunity-court-6-report-2026-08-26.md`. Company Intelligence files (`strategic-direction.md`, `products.md`, `patterns.md`) to be updated per the Librarian's gated-write standard.*
