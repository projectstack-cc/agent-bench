# Products

**First populated 2026-07-17**, via the first real Reconnaissance sweep
(`Recon/2026-07-17-INDEX.md`). Status reflects what Recon could verify
from a repo-level read plus the founder's direct corrections — not a
guarantee of current completion state where noted as unread.

---

## xpanda-ops-platform → a real future product candidate (de-branded)

**Confidence: High on the technical asset; the market plan is the
founder's own stated intent, not yet a scoped mission.**

## Food-safety audit gap-analysis platform (SQF/BRC/FDA/FSQA) — active candidate, not yet scored (2026-07-20)

**Confidence: Medium** — real, lived-experience-sourced demand (the
founder's wife directly requested this be built: drop a zip of existing
audit/compliance documents, parse it, identify gaps against SQF, FSQA,
FDA, and BRC requirements). This is the first candidate all session
sourced from genuine information asymmetry rather than a blind market
scan — see `patterns.md`'s "lean on lived experience" finding. **Not
rejected, but not yet clear either** — real, already-forming competition
found in the exact product shape described, so scoring needs more detail
from the wife directly before this goes further.

**Market is real and large:** Food safety/HACCP compliance software is
estimated at roughly $1–4B in 2026 depending on market definition,
growing at 8–12% CAGR, driven by FDA FSMA and GFSI-scheme (SQF/BRC/FSSC
22000) certification requirements. Pain is real and well-documented:
audit prep is a genuine time sink, and "gap between written procedure and
actual practice" is explicitly named as one of the most common
audit-failure patterns.

**Direct competition already exists in almost exactly this shape:**
IONI (`ioni.ai`) explicitly supports uploading SOPs/HACCP
plans/recipes/supplier certificates (Word/PDF/Excel, "no reformatting")
and using AI to read them against SQF, BRCGS, FSMA, CFIA, and FSSC 22000
— very close to the described workflow, though positioned toward
*building* a compliance program from documents rather than *checking* an
existing one before a recertification audit. Superior Food Safety runs a
"GFSI Readiness Assessment AI" (positioned more as a consulting
lead-generator than a standalone self-serve product). FoodReady and
iFactory are AI-branded but are actually ongoing QMS/IoT-monitoring
platforms, not document-upload gap-checkers — a real distinction, not
just naming. The broader established category (SafetyChain, FoodLogiQ,
TraceGains, Icicle, QT9, FoodDocs) is enterprise-sales-cycle, ongoing-QMS
software, not self-serve document analysis. **This space is in an active
"AI-powered compliance" land grab as of very early 2026** (IONI's own
content dated January 2026) — the market hasn't settled, quality bars
appear inconsistent across entrants, but it is genuinely being raced for
right now, not empty.

**Answered directly by the founder, 2026-07-20 — this sharpens
considerably:**

- **Role:** Quality and FSQA Systems Manager overseeing **two branches
  currently, with active growth toward more** — a real multi-site
  persona, not a single-facility user. Matters because a multi-site FSQA
  manager's tool needs (cross-branch consistency, comparable scoring
  across sites) are a meaningfully different product than a single-plant
  QA tool.
- **Hasn't tried IONI or any competitor** — not because she's unaware of
  the pain, but because **her employer has already judged existing
  tools' cost too high.** This is direct, first-hand pricing-gap
  evidence from inside the actual target segment, stronger than anything
  surfaced by web search this session — the enterprise-priced incumbents
  genuinely don't reach this buyer.
- **Go-to-market already de-risked:** the founder does not plan to
  charge her — she becomes the flagship beta user, getting free access
  in exchange for real usage reports. Real-user validation before any
  commercialization decision, no cold distribution problem to solve
  first.
- **The recertification-vs-build distinction is confirmed real, and
  specific:** per the founder relaying her expertise — an initial
  certification audit treats a program as "infantile," tolerates more
  gaps, and pushes the facility into the certification. **Recertification
  is materially harder**, specifically hunting for gaps that existed
  originally and were never fixed, new gaps that formed over time, and
  drift/decay in the program. IONI's "build your plan, live in days not
  months" framing is optimized for the *first* job; her need is squarely
  the *second* — a genuinely distinct, underserved position, not just a
  restatement of what IONI already does.
- **V1 scope, as she described it:** upload the existing compliance
  system, get a score calibrated to what an actual auditor evaluates,
  identify specific gaps, get suggested fixes.
- **V2 scope:** generate corrected/updated **controlled documents only**
  (SOPs, food safety plans, and similar program documents) as
  downloadable .doc files. **Explicitly and deliberately excludes any
  filled-out record/log document** — reason: the system must never
  enable or resemble "pencil whipping" (falsifying records to show work
  that wasn't actually done, a real food-safety-integrity and liability
  concern, not a hypothetical one). **Correction (2026-07-20): this
  boundary is the founder's own quality-management experience (a
  different industry), not the wife's — she asked for the tool, the
  document-control scope discipline is the founder's domain judgment
  applied to her request.** Both work in quality; don't attribute this
  specific insight to her specifically going forward.

**Real risk to name, not soften:** this product would be giving
compliance judgments about food safety programs. A wrong gap analysis
(missing a real critical gap) or a flawed auto-generated SOP carries
real liability exposure — this is advisory software in a domain where
"advisory" still touches public-health stakes, not simply a
convenience tool. Her own no-pencil-whipping boundary is exactly the
right instinct; the same rigor needs to extend to the tool always being
reviewed by a qualified human before anything it produces is
implemented, and to being explicit about what it is (a second-opinion
gap-check) versus what it isn't (a replacement for professional
judgment). Flagged for `security` and `cto` review, not treated as
disqualifying — unlike the skin-economy candidate's regulatory exposure,
this is a design-discipline risk, addressable by scope and disclosure,
not a structural dead end.

**Not yet run:** a real `cto`/`product`/`cfo`/`security` evaluation.

Currently built and maintained by the founder as an employee of XPanda
Foam (salaried role — not this company's asset today, generates no
current revenue). **The founder owns the platform's IP and has a concrete
plan: once complete, strip XPanda Foam branding and bring it to market as
its own product.** This is arguably the strongest candidate in the entire
company's history — a production-proven ERP (581 commits, real incidents
found and fixed) built around a genuinely hard, generalizable technical
core (the kerf-aware bin-packing engine, `engines.md`), not a from-scratch
idea needing validation.

**Not yet a mission:** "complete" isn't defined, no de-branding scope
exists, and no Opportunity Court pass has evaluated this specific
opportunity (market size for a generalized nesting/ERP tool, competitive
landscape, pricing, target buyer beyond foam manufacturing). Worth a real
`coo`/`product`/`cfo` evaluation when the founder is ready to scope it as
an actual mission — this file records that the opportunity exists, it
doesn't pre-judge that evaluation.

**Extraction doesn't have to wait for the whole platform.** Per the
founder directly, individual tools/components (the bin-packing engine
being the clearest candidate) can be extracted and monetized before the
entire platform is de-branded — de-branding isn't all-or-nothing.

**Hard access constraint, standing (`HQ/DECISIONS.md`):** read-only
Reconnaissance only, permanently, until whatever's being extracted is
actually separated from the live system. No writes, no execution, no
agent dispatch against the live repo in any other capacity — it runs its
own task-executing agents against a real production system at XPanda
Foam, and the founder cannot risk any failure there. Extraction means
building a new, separate implementation informed by the founder's own
knowledge of the pattern, not touching the live repo.

## Voice-First Field Intelligence (VFFI) — active candidate, GO for research spike (2026-08-04)

**Confidence: Medium-High** — the first candidate sourced through
technology-enabled whitespace discovery (a new methodology, see
`patterns.md`), not pain-point mining or demand-first search. Cleared
Opportunity Court IV's full board gauntlet (`coo`/`ceo`/`cto`/`cfo`/
`marketing`/`product`/`ux`/`security`/`qa-critic`). Full report:
`Recon/opportunity-court-4-report-2026-08-04.md`.

**What it is:** Field workers (electricians, plumbers, HVAC techs,
roofers, inspectors) dictate what happened on a job site in natural
language. The AI structures it into: project progress updates, time
tracking entries, material lists, client reports, and follow-up tasks —
without anyone touching a keyboard or filling out a form.

**Why now (technology thresholds crossed in 2024):** Whisper API made
speech-to-text free ($0.006/min) and accurate in noisy environments.
Structured output (JSON mode) made it reliable enough for business data.
The combination — voice input → AI structuring → business data — was not
productizable 18 months ago. It is now.

**Competitive whitespace:** No voice-first + AI-structured data capture
tool exists for trades. Procore ($30B+ market cap), BuilderTrend
($200+/mo), and Fieldwire (acquired by Hilti) are all keyboard/tablet-
first and enterprise/mid-market. Voice dictation apps (Dragon, Otter)
don't structure output into business data. The intersection is empty.

**Unit economics:** $39/mo pricing, ~$3.50/mo variable cost (Whisper +
LLM API), 91% gross margin. No AI-API cold-start risk (cheap free trial:
~$0.15 for 5 voice captures). Path to $5K/mo: 130 users (0.005% of 2.5M
US trade businesses).

**Distribution:** Trade associations (IBEW, PHCC, ACCA, NRCA) — not
app-store-style distribution. Buyer reachable without audience-building
or content marketing. Direct outreach via state contractor license
databases is feasible.

**Founder fit:** Steve has field-operations experience (XPanda Foam is a
manufacturing business with field operations). Understands the paperwork
burden from the inside.

**Stack fit:** React + Cloudflare Workers + Whisper API + LLM API. All
within the founder's proven stack. Reusable assets: Stripe subscription
billing engine (`engines.md`), Clerk + Supabase pattern (`patterns.md`).
Build time (MVP): 4–6 weeks.

**Key risk (testable before building):** Trade-specific terminology
accuracy. Trades have highly specific jargon ("12-2 ROMEX," "THHN wire,"
"schedule 40 PVC," "NEC 210.8(A)"). General AI models may not know these
terms. **Kill switch:** feed 10 real electrician field-work descriptions
through the pipeline; if accuracy is below 80%, the product needs a
trade-specific vocabulary layer (a moat, but a 2–4 week addition).

**Status: GO for a wedge-research spike, not a build commitment.** Three
tests: (1) terminology accuracy test (1 day), (2) buyer validation — talk
to 5–10 trade business owners about paperwork burden (1 week), (3)
competitive check — verify no one has built this since the last court
(1 day). If all three pass, scope a Milestone 1 MVP (electricians only,
one beta user, 4–6 week build). If buyer validation fails, fall back to
CTT (below).

## Contract Transparency Tool (CTT) — HOLD, strong second product (2026-08-04)

**Confidence: Medium** — survived Opportunity Court IV's full board
gauntlet but ranked below VFFI on liability risk and occasional-use
pattern. Worth revisiting as a second product after VFFI establishes
revenue. Full report: `Recon/opportunity-court-4-report-2026-08-04.md`.

**What it is:** Upload any contract (SaaS agreement, lease, employment
offer, vendor agreement, freelancer contract). The AI reads it and flags
risky clauses in plain language — "this auto-renews unless you cancel 60
days before," "you're liable for indirect damages," "this IP assignment
covers work you do on your own time." Not legal advice — risk awareness.

**Why now:** RAG + legal document understanding + structured output all
crossed the productizability threshold in 2024. AI can now reliably
understand legal language and identify risk patterns.

**Competitive whitespace:** No plain-language contract risk reader for
non-lawyers exists. LawGeex, Ironclad are enterprise ($500+/mo).
LegalZoom is document generation, not analysis. The gap between is empty.

**Why ranked below VFFI:** (1) Liability risk — if the tool misses a
risky clause, real harm + potential lawsuit. Mitigated by scope ("risk
awareness, not legal advice") but not eliminated. (2) Occasional-use
pattern — people sign contracts maybe once a month, making retention
harder. VFFI's daily-use pattern means lower churn.

**Unit economics:** $25/mo pricing, ~$0.10/contract variable cost, 85%
gross margin. Path to $5K/mo: 200 users. But occasional-use churn risk
makes the path less certain than VFFI's.

**Fallback if VFFI buyer validation fails:** Run the same spike pattern
(legal accuracy test, buyer validation, competitive check).

## ProjectStack Web Solutions

**Confidence: High on existence, direct from the founder on status.** A
live client-services landing page (`projectstack.cc`), positioned as a
custom-systems agency for real businesses, based in Casselberry, FL. Has
its own GitHub org (`projectstack-cc`) hosting `precision-maintenance` and
`tapin`. **Per the founder (2026-07-17): zero revenue, zero interested
clients to date.** See `founder-profile.md` for the full framing — this is
a real, already-tried go-to-market attempt, not a revenue line.

## precision-maintenance

**Confidence: High on existence, unconfirmed on client/billing status.** A
live site for an HVAC business, hosted under `projectstack-cc`. Vanilla
HTML/CSS/JS + GitHub Pages (see `patterns.md`). Whether this represents
actual paying client work is an open question — not assumed either way.

## TapIn

**Confidence: High that it's a real, substantial product; Low on current
completion status** (Recon read the repo shape, not the app itself).
Digital business cards, hosted under `projectstack-cc`. Monorepo
(`apps`/`packages`), has its own `CHANGELOG.md`/`backlog.md`. Worth a
direct status check before assuming where it actually stands.

## step3-ai ("video-to-manual") — ICEBOXED (2026-07-17)

**Status: explicitly iceboxed by the founder, not being pursued, until
supporting revenue exists elsewhere to fund free-trial API cost.** Not
"stalled" or "unclear" — a deliberate, current decision. Revisit
condition is specific and checkable: another revenue source funding the
company's AI-API exposure, not a fixed date and not "when the pipeline
gets tested."

**Confidence: High** — reason for the original stall confirmed directly by
the founder. **The most complete, closest-to-shippable product found in
this entire Recon pass** — full Stripe payments, Clerk auth, Supabase, a
defined video-to-PDF-manual conversion pipeline (`/convert`, `/dashboard`,
`/jobs` routes). None of that technical completeness is in question — the
icebox is a capital-allocation decision, not a verdict on the product.

**Why it stalled originally, and why the icebox condition is specific:**
the conversion pipeline depends on AI API calls with real per-conversion
cost — a cold-start cash-flow problem, since running it before there's
revenue means absorbing that cost with nothing to cover it. The founder
considered and rejected premium-only pricing (paying before you can test
the product is a real conversion/refund/review risk) and Bring-Your-Own-
API-Key (undermines the product's own moat, see `patterns.md`). The actual
constraint, stated directly: **day-1 paid conversions must cover the cost
of any free trial usage** — not eventual volume, not accumulated
recurring revenue. That's a real formula (minimum viable price ≥ cost per
free trial use ÷ day-1 conversion rate), not yet modeled with real numbers
— API cost basis and expected conversion rate are both still unknown.

**Not the current priority for any executive** — `cto`/`cfo` should not
spend further hours here until the revisit condition is met.

**A real, reusable lesson from evaluating and rejecting Bring-Your-Own-API-
Key:** the founder considered BYOK to shift API cost onto the customer,
and rejected it with a sharp insight — anyone with their own AI API key
could likely replicate this workflow themselves without needing the
product at all. **This is a genuine competitive-moat risk specific to thin
AI-wrapper products**, not just a step3-ai detail — filed as a pattern in
`patterns.md` for any future AI-powered opportunity this company
evaluates.

## Tiny World

**Confidence: High.** Phaser.js toddler educational game. Itch.io/PWA
distribution, $9.99 one-time purchase (see `patterns.md`'s billing-model
pattern). Has its own `planning/` directory with a real decisions log.

## pdf-tools (GitHub-only)

**Confidence: Medium** — surveyed via WebFetch, not a local read; removed
locally for disk space. A "Document Modification center," React+Vite,
127 commits — substantial, not a stub. Directly matches the founder's own
stated interest in document/CSV/PDF automation as an opportunity category
(`agent-coo.md`'s Opportunity Discovery list). **This may already be that
opportunity, built.** Recommend a direct clone-and-read pass before
evaluating any new document-automation opportunity in a future Opportunity
Court session.

## packslip-pro

**Confidence: High on state, Medium on original intent.** Scaffolded, never
customized past template — stalled. Matches a real `coo`-relevant
opportunity category (Shopify + document automation) — the same category
`pdf-tools` matches, and `pdf-tools` is far more developed. Check
`pdf-tools` first if this category comes up again; flag `packslip-pro` for
a founder decision (revive or formally close out) rather than letting it
sit ambiguously.

## cinevault (GitHub-only)

**Confidence: Medium** — surveyed via WebFetch, not a local read. Movie
tracker, React/Supabase/Clerk/TMDB, PWA, CI/CD via GitHub Actions.

## formflow (GitHub-only)

**Confidence: Low-Medium** — WebFetch couldn't load the README; survey was
incomplete. 4 commits — likely early-stage or abandoned. Recommend a
direct, authenticated check if this project's status ever matters to a
real decision.

---

## Researched and rejected — domain-experience-driven search (2026-07-17)

Per the founder's direction to search from lived operational experience
running `xpanda-ops-platform`, not just the one extractable algorithm —
four hypotheses generated directly from that platform's own modules and
documented pain points, each given real market research at the same
evidence bar as both Opportunity Court sessions. **All four are real,
correctly-identified pains. All four are already served by funded
competitors, with no confirmed wedge for any.** Recorded so they aren't
re-researched later without new information:

- **First-Pass-Yield/scrap tracking** — from the platform's own deferred
  scrap-DB blocker. Real pain; already served (Fabrico, Guidewheel,
  GlobalReader, isoTracker) as the "modern alternative to $500K+ legacy
  MES."
- **QC/inspection checklists** — the most saturated of the four.
  SafetyCulture dominates this exact low-end segment already.
- **Job-shop/custom-fabrication tracking & costing** — real, funded,
  vertical-specific competitors (Fulcrum, Paperless Parts, MIE Trak Pro).
  **Notable finding for the nesting engine specifically: Fulcrum already
  bundles nesting integrations** — a real competitor to check directly
  during that candidate's own wedge research, not just the standalone
  nesting vendors already known.
- **OSHA/safety compliance** — saturated; SafetyCulture again (the only
  vendor competing across two of these four categories).

**Build-time finding, worth keeping:** every one of these four is
technically *easier* to build than the nesting engine — and none of that
mattered, because competitive crowding, not build time, was the actual
constraint in all five candidates evaluated (these four plus the nesting
engine). Domain fluency reliably generates real hypotheses; it doesn't by
itself find an uncontested market. Full research and sources:
`Recon/domain-experience-research-2026-07-17.md`.

## Researched and rejected — PC gaming market scan (2026-07-20)

**Confidence: High** — every claim below is sourced and cited in the full
report; see `Recon/pc-gaming-overlay-tools-research-2026-07-20.md`. First
of a planned series of cross-market scans, run independent of
`xpanda-ops-platform`'s domain experience — see `strategic-direction.md`.

Two full research rounds (alt-tabbed-to tools specifically, then PC
gaming tools generally) found real pain in every direction, and none of
it cleared the evidence bar:

- **In-game overlay/browser/companion apps** (the "what do gamers
  alt-tab to" angle) — real, well-documented pain (88% of players use a
  browser while gaming; alt-tab causes a real FPS/stutter penalty), but
  already served at platform scale by Overwolf (113M MAU, ~75% of the
  third-party game-enhancement market, $100M ad revenue in 2024). The
  narrower "lightweight, non-Overwolf-dependent" wedge is real (Hexgate
  proves it viable) but is a distribution uphill fight against a free
  incumbent and requires native Windows/DirectX overlay-hooking
  engineering — a stack mismatch against the founder's React/TypeScript/
  Cloudflare profile.
- **CS2/skin-economy trust & verification tooling** — the strongest
  candidate by market size found this session ($6.77B item-economy
  market cap, ~27.9M distinct owners), with real, specific friction
  (verifying third-party trading-site legitimacy before trading). **Not
  pursued despite the market size**, for two reasons: already served
  (SkinSearch, ProConsumer, Scamadviser, Trustpilot-reliance are the
  community's existing norm), and it sits on live, escalating legal
  exposure — an active New York AG lawsuit against Valve (Feb 2026) and
  a federal class action (Mar 2026) both target CS2's case-opening
  mechanic as illegal gambling, with FTC and EU regulatory precedent
  moving the same direction. Close enough to `coo`'s "heavy compliance"
  Automatic Rejection category to disqualify as a primary recommendation,
  not just a low score.
- **Multi-launcher fragmentation, mod manager friction, game-save
  backup/cloud-sync gaps** — all real, all already adequately served by
  an existing free tool or entrenched incumbent (Playnite, Nexus Mods'
  Vortex, Ludusavi), with insufficient evidence of an underserved,
  monetizable gap behind any of them.

**Net effect:** the whole PC gaming tools market is filed as researched-
and-rejected, not just one idea within it — so it isn't re-scanned blind
later without new information. Full research and sources:
`Recon/pc-gaming-overlay-tools-research-2026-07-20.md`.

## Researched and rejected — e-commerce market scan (2026-07-20)

**Confidence: High** — every claim below is sourced and cited in the full
report; see `Recon/ecommerce-tools-research-2026-07-20.md`. Second in the
cross-market opportunity-scan series, run immediately after the PC gaming
scan above.

Seven candidates researched — multi-channel inventory sync, Amazon
suppressed-listing monitoring, Shopify/e-commerce bookkeeping
reconciliation, returns/reverse logistics, sales tax nexus compliance,
TikTok Shop tooling, and cross-border customs/duty calculation — and none
cleared the evidence bar:

- **Multi-channel inventory sync** — real pain, well-served across price
  tiers (Sellbrite for small sellers, Linnworks/ChannelAdvisor for
  enterprise, though ChannelAdvisor draws real cost complaints).
- **Amazon suppressed-listing monitoring** — severe, well-evidenced pain
  (one seller reported losing $50–55K in two weeks) but already served
  by real-time monitoring products (SentryKit, AmzMonitor, SellerPulse).
- **Shopify/e-commerce bookkeeping reconciliation** — the strongest fit
  for the founder's document/data-automation skillset (Shopify's
  multi-payout-stream reconciliation is reportedly the #1 QuickBooks
  Online ecommerce error), but already crowded across price tiers: A2X,
  Synder, Taxomate, Link My Books, Bookkeep, Parex Bridge — at least six
  direct competitors. Real quality complaints exist against incumbents
  (an execution-quality opening, not an open market).
- **Returns/reverse logistics** — large (~30% return rate) but dominated
  by well-funded, enterprise-leaning incumbents (Loop, Narvar, AfterShip
  Returns).
- **Sales tax nexus compliance** — genuine anxiety-driven pain, already
  well-served (Avalara, TaxJar, Numeral, Quaderno), and carries real
  accuracy/liability stakes if a tool gets a jurisdiction wrong —
  compliance-adjacent caution, not pursued.
- **TikTok Shop tooling** — the freshest channel checked specifically to
  test whether a newer platform is still underserved; it isn't. Already
  has a full competitive set (Dashboardly, Glew, TrueProfit for profit
  analytics; ShopSync, SlashCart, QuickSync, VeriSync, SKU IQ, AfterShip
  for sync) within roughly 2-3 years of the channel existing.
- **Cross-border customs/duty calculation** — inconclusive; only
  surfaced factual documentation, not evidence of active user
  frustration.

**Pattern worth carrying into the next market scan:** every candidate
with strong off-the-shelf distribution (Shopify App Store specifically)
was already crowded — often within a couple of years of the underlying
channel even existing. App-store-style distribution is exactly what
`coo`'s own scoring rubric rewards most, and that's precisely why other
indie developers find and fill these gaps fast. A market with weaker
off-the-shelf distribution might paradoxically have more real, unfilled
gaps for that reason. Full research and sources:
`Recon/ecommerce-tools-research-2026-07-20.md`.

## Researched and rejected — horizontal business-function scan, all 13 (2026-07-20)

**Confidence: High** — every claim below is sourced and cited in the full
report; see `Recon/business-functions-overhead-research-2026-07-20.md`.
Third in the cross-market opportunity-scan series, stepping outside
specific industries per the founder's direction to scan named business
functions directly: Sales, Customer support, Procurement, HR, Finance,
Inventory, Scheduling, Compliance, Training, Document management,
Reporting, Quality management, Asset management.

**Every one of the thirteen shows the identical saturation shape:** a
mature, named SaaS category with a free-template fallback at the bottom
and paid competitors at every price tier up to enterprise. Ten were
freshly searched; Compliance and Quality management were already known
rejected via the 2026-07-17 domain-experience research (SafetyCulture
dominates both). No specific, differentiated, underserved gap surfaced in
any of the ten fresh searches.

**The real finding is strategic, not a rejected product list:** named
horizontal business functions are, if anything, *more* contested than
either vertical market scanned so far this session — they're the most
obvious, most continuously-targeted unit of market segmentation in all of
software, going back to the 1990s ERP wave through today's microSaaS
wave. Searching "which named function has pain" is structurally searching
the most heavily mapped territory that exists. **Recommendation:** the
next scan should target a specific function-×-vertical or
function-×-persona intersection — a narrow enough slice that general
tools are a known poor fit — not another general function or industry
taken alone. Full research and sources:
`Recon/business-functions-overhead-research-2026-07-20.md`.

## Researched and rejected — function-×-vertical intersection check (2026-07-20)

**Confidence: High.** Direct follow-through on the recommendation above:
three specific, narrow, low-tech-attention function-×-vertical
intersections were checked (document/reporting automation matched against
the founder's stack strength) rather than another general axis —
self-managed HOA administration, independent funeral home paperwork, and
home inspection report writing. **All three found real, specific,
citable pain — and all three already have multiple dedicated vendors:**

- **Self-managed HOA administration** (meeting minutes, violation
  tracking, compliance) — real pain (volunteer boards, ~27–30% of US
  associations self-managed), but already served by name-specific
  vendors across price points: PayHOA ($54/mo flat), Join It ($29/mo),
  ManageCasa, Perfect HOA, Solume, Communitrak.
- **Independent funeral home paperwork** (death-certificate filing,
  double data entry) — real, well-articulated pain, already served
  (Passare, integrating directly with state Electronic Death
  Registration Systems; WellDeparted, from $49/mo; Smart Director; SRS
  Procession). Passare draws real complaints (weak QuickBooks
  integration/reporting) — a possible execution-quality opening, not an
  open market.
- **Home inspection report writing** (2–4 hours per report, the
  single biggest time sink in solo inspection businesses) — real,
  severe, well-quantified pain, already served by name-specific,
  mature tools (Spectora, HomeGauge, Home Inspector Pro, DoorstepHQ)
  with dictation and comment-library features already standard.

**The finding that actually matters:** even fairly obscure, low-profile
verticals already have dedicated software. Four consecutive search
rounds this session — two industries, thirteen named functions, and now
three specific function-×-vertical intersections — have found a
committed vendor for every real pain point identified, at every level of
specificity tried. **This is evidence about the search method, not just
the four market sets:** external market research (searching for named
pain and checking who already serves it) is not converging on an open
gap. The one approach that generated genuinely differentiated-feeling
hypotheses all session was the 2026-07-17 domain-experience research —
drawing on the founder's own lived, non-searchable operational
experience, not a market search. Recommendation carried to
`strategic-direction.md`: the next move should draw on a domain the
founder (or a reachable source) has real information asymmetry in,
rather than a fifth blind external scan.


## Researched and scored — Opportunity Court VI, micro tools beyond founder history (2026-08-26)

**Confidence: Medium-High** — full board gauntlet against live evidence
(HN Algolia revenue signals, degraded-search caveats noted per Constitution
Rule 1). Full report: `Recon/opportunity-court-6-report-2026-08-26.md`.
Context: convened on the founder's post-Court-V directive to broaden beyond
history-adjacent domains entirely — content creation, gaming/PC builders,
crypto mooted explicitly — under a minimal-to-zero-investment constraint,
with SaaS shape itself declared an open question. Verdict framing from the
court: **seven consecutive opportunity sessions have ended without shipping
a payment link; demand evidence comes from buyer exposure, not more board
deliberation.**

Dispositions:

- **GO (conditional, portfolio-shaped): local-first file utilities +
  non-developer-facing extension utilities.** Checkout-first, not
  build-first: pdf-forge (and siblings in its shape) get landing pages +
  Gumroad/Stripe one-time pricing *before any further code*. Evidence for
  the class: CSS Scan (~$70K lifetime, solo, one-time purchase), pdf-forge
  exemplar. Gate: non-developer sufferers only (`patterns.md`'s Batch AI
  buyer-skew lesson is a hard admission filter).
- **HOLD: game-dev micro-tooling.** Proven niche spend exists (SFX Engine
  ≈ $2K MRR, publicly shared) but modest ceiling and love-driven
  competition; revisits only after the checkout-first play produces either
  revenue or a validated pain.
- **REJECTED: content-creation micro-tools** — saturated, AI-platform
  absorption risk; fails the "paste-it-into-your-AI" felt-value filter.
- **REJECTED: PC-builder/hardware-buyer tools** — prior art confirmed
  (pc-kombo, AI PC-build tools); distribution depends on SEO/affiliate
  channels incompatible with founder constraints.
- **REJECTED: cryptocurrency tools (incl. the satirical own-coin option)** —
  dead demand signal on HN (launches registering ~2 points), compliance
  adjacency, regulatory exposure on own-coin issuance. Filed so this
  territory isn't re-scanned without materially new information.

**Process finding (the court's primary deliverable):** default flips to
*sell first → build on click-through → analyze failures*. codified as a
proposed standing rule in `patterns.md` (smoke-test gate).


## Researched and rejected — Opportunity Court V, all counts NO-GO (2026-08-25)

**Confidence: High** — this court's GO verdicts were amended to NO-GO
post-session: rank 2 died on the founder's direct challenge, rank 1 died on
follow-up verification. Full report incl. amended verdict:
`Recon/opportunity-court-5-report-2026-08-25.md`. Recorded so nothing here
is re-scored without new information.

- **NestAPI** — sell the founder's proven bin-packing engine as a self-serve
  nesting API for small laser/CNC shops; the only candidate in five courts
  built on an already-working owned asset. **Downgraded GO → conditional →
  deprioritized:** the app tier is closed by production-grade free
  incumbents (`deepnest-next` MIT/actively-maintained, SVGnest claiming
  commercial parity); the *API* gap is formally unknown, not open — the one
  search session that could verify it was bot-blocked end-to-end. Not
  killed permanently: it remains the best single asset-backed candidate on
  file, but the founder directed the next court entirely away from
  history-adjacent domains, so the four-check spike is parked, not
  scheduled.
- **BYOK Batch AI workbench** — bring-your-own-key batch LLM operations over
  CSVs/docs at $49 one-time, pitched as the fastest possible first dollar.
  **Killed by founder challenge post-court:** its value-add over "upload it
  to ChatGPT/Claude and say 'do this'" must be argued, not felt; buyers with
  real scale are builders who script it themselves. Promoted the generalized
  filter now standing in `patterns.md`.
- **BYOK usage dashboard, pdf-forge productized** — rejected in-court
  (saturation; free equivalents everywhere respectively).

**step3-ai note:** Court V found BYOK structurally satisfies its icebox
formula, but demand was never validated — icebox stands unchanged.

---

## Researched and rejected — technology-enabled whitespace discovery, Court IV (2026-08-04)

**Confidence: High.** Three candidates from Opportunity Court IV that did
not survive the full board gauntlet. Recorded so they aren't re-researched
later without new information. Full report:
`Recon/opportunity-court-4-report-2026-08-04.md`.

- **Knowledge Decay Monitor (KDM)** — an AI that monitors documentation
  (Notion, Confluence, GitHub wikis) for staleness and flags knowledge at
  risk of being lost when key employees leave. **Rejected by QA-Critic:**
  the problem is latent, not felt — most teams don't know their docs are
  stale until something breaks, and selling prevention is harder than
  selling cure. Plus the feature of Notion risk is too strong — Notion,
  Confluence, and GitBook all have the data and AI capability to add
  staleness monitoring as a native feature. The cross-tool integration
  angle is the only real moat, and that is a complex integration play.

- **Dynamic Equipment Knowledge Base (DEKB)** — upload equipment manuals
  (PDFs with text, schematics, and diagrams), get an AI that answers
  equipment-specific questions. **Rejected on technology immaturity:**
  multimodal AI can understand some technical diagrams, but specialized
  schematics are beyond current capability. The knowledge that matters
  (tribal knowledge, service bulletins, forum posts) is not in the manual
  anyway. This candidate is ahead of its technology — revisit when
  multimodal AI can reliably read specialized schematics.

- **Personal Decision Intelligence Platform (DIP)** — an AI-powered
  decision journal that tracks decisions, outcomes, and builds a personal
  decision-quality scorecard. **Rejected on market size:** decision
  journaling is a niche practice (Kahneman, Annie Duke), not a mass market.
  The outcome feedback loop is too long (6+ months for most decisions) to
  drive engagement. The buyer (individual knowledge worker) has low
  willingness to pay and high churn risk. The most genuinely novel candidate
  — the category does not exist at all — but also the weakest business.

**Methodology note:** these three were sourced through technology-enabled
whitespace discovery, not pain-point mining — see patterns.md new
technology-enabled whitespace discovery finding. Two candidates from the
same court survived (VFFI and CTT, above) — the methodology produced a
different result than six consecutive demand-side passes, which all
converged on real pain, already vendor-served.
