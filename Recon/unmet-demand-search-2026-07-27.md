# Unmet-Demand Search — Report & Verdict

**Date:** 2026-07-27 (same day as, and a direct continuation of, `Recon/
claude-artifacts-scan-2026-07-27.md` — a distinct technique, filed
separately per that session's own recommendation)
**Convened by:** CEO persona, per `HQ/Executives/agent-ceo.md`
**Directive:** After the artifacts scan found evidence-free titles rather
than pain points, the founder proposed a methodology change: instead of
finding pain and checking whether it's solved, search directly for
**unanswered demand** — "is there a tool for X" asks with no good reply,
standing unfulfilled feature requests, and startup postmortems where the
underlying demand was real but execution/timing failed. Is there a way to
research things people have looked for but don't have solutions to?

---

## ROUND ONE — Chief Opportunity Officer: Research

### Technique 1 — HN Algolia direct API search (works; blind `site:` search does not)

Unlike this morning's `claude.ai/public/artifacts` scan, Hacker News's own
search API (`hn.algolia.com/api/v1/search`) returns real, queryable
results — not paraphrased summaries. Two searches run:
`"someone should build"` and `"wish there was a tool"`. Results were real
but almost entirely old (2009-2013), low-engagement (single-digit to
low-teens points), and consumer/personal in nature (a doodle-sharing site,
a Klout-for-blogs idea, calendar reminder gripes) — none founder-fit, none
with enough engagement to represent real demand rather than one person's
passing comment. **Not a productive vein on its own**, but the API access
pattern itself is reusable for the next session.

### Technique 2 — Startup postmortems, sorted by validated-vs-unvalidated demand

Pulled two 2025 postmortems via the same HN Algolia access:
- **Basis Robotics (Jan 2025):** demand never validated — the founder's own
  words, "after our release, not one person tried our software." A clean
  negative example, not a lead.
- **Content Goblin (2025):** demand *was* validated — hit $15k MRR within
  weeks — then failed on niche narrowness, a single-channel distribution
  collapse (one YouTube promoter's audience capped out), unsustainable
  unit economics, and ChatGPT closing the tool's speed advantage. A real
  example of the shape the founder asked about (real demand, execution/
  timing failure), though not itself a candidate — a consumer/creator AI
  tool, not founder-fit.

### Technique 3 — Reddit, via authenticated browser (WebFetch is blocked; browser tool works)

**Real tooling finding, worth carrying forward:** `WebFetch` cannot reach
`www.reddit.com` or `old.reddit.com` at all (hard tool-level refusal,
independent of Reddit's own bot-detection, which also separately blocked
the browser tool on `www.reddit.com`'s new UI with a JS challenge).
`old.reddit.com` via the authenticated `claude-in-chrome` browser tool
**does** work and returns real content. This is the only route into
Reddit this session found — the next session shouldn't have to
rediscover it.

Pulled `r/SomebodyMakeThis` and `r/AppIdeas` top-of-year. Most posts on
both auto-reject under `coo`'s own Automatic Rejections on inspection —
dating/social apps requiring network effects, physical products, viral-
audience-dependent ideas (a "who ghosted a plan" matcher, a stranger-
birthday-gift site, a landlord/tenant dating-style app). Two software
ideas with real engagement were checked independently for crowding and
both are already served: a renter's move-in/out timestamped-photo
dispute vault (DepositGenie, Oxmaint, TimestampIt, rentalinspectionreport.com
— several direct hits, plus 2025 California legislation, AB 2801,
mandating exactly this kind of documentation, which likely accelerated a
wave of competitors), and a corporate-ownership transparency app (already
covered by OpenOwnership, a funded global NGO database — 27M+ beneficial-
ownership records, 140 jurisdictions — not a solo-founder-scale wedge
regardless of demand).

### Technique 4 — A curated complaint-mining post, with unprompted third-party crowding-checks in the replies

The single richest source this session found: a `r/AppIdeas` post
(`Mysterious_Yard_7803`, 305 points, 107 comments) claiming to track 700+
Reddit complaints over 3 months, filtered for 50+ upvotes and "I'd pay for
this" replies, surfacing 7 candidate ideas with specific dollar figures
and (claimed, not independently verified) upvote counts per source thread.

**Important caveat, stated directly in the thread by both the OP and a
commenter:** the OP discloses building a paid/free product
(`idearupt.ai`) off this exact content and admits it in a reply ("i built
a tool in this space not gonna hide that"); a separate commenter calls the
post out directly as marketing. **Treat the OP's own upvote-count
citations as an unverified, commercially-motivated claim, not sourced
fact** — this session could not independently verify `idearupt.ai`'s
claimed thread-links (the site is JS-rendered and returned no fetchable
content).

**What is trustworthy: the reply thread itself**, from independent,
unprompted, financially-disinterested commenters. Five of the seven ideas
were named-competitor-refuted live in the comments:

| # | Idea | Refuted by (in-thread or independently checked) |
|---|------|---------------------------------------------------|
| 1 | Invoice-dispute auto-escalation for freelancers | **Checked independently, not by the thread:** `usecollect.co` ("Collect") is a direct, existing match — identical 4-stage escalation, 50-state small-claims filing kit, $9/dispute |
| 2 | Competitor price tracker for small e-commerce | In-thread: Price Parrot exists at $49/mo; OP concedes the real gap (sub-$49/mo, sub-$10k/mo sellers) is narrower than claimed |
| 3 | Contract red-flag scanner | In-thread, multiple: Genie AI (genieai.co), a live Chrome extension (ClauseCloud) posted directly in the thread, repatch.app, iusvigi.com, plus "people already paste it into ChatGPT for free" — also flagged for real liability exposure by commenters (taking on the customer's legal risk for a subscription fee) |
| 4 | GDPR/privacy compliance checker for small sites | In-thread: dwiteai.com named as already covering it; same liability-transfer risk raised as #3, discussed at length |
| 5 | Client feedback collector with better response rates | **Checked independently:** adjacent category is crowded (SurveySparrow, Survicate, SmartSurvey, ProProfs, Tally) — no single tool matches the specific "2-3 questions + smart send timing" combination by name, but this is a feature-level difference inside an already-served category, not an open product gap. Not a candidate. |
| 6 | Dead-simple recurring task manager for solo operators | In-thread, OP and multiple commenters agree: "already covered by many options" (Notion, Asana, Monday, Todoist) — the surviving complaint is about bloat, not absence, and one commenter noted they're already building this. Same crowded-but-simplicity-wedge shape as this company's own nesting-engine finding (`patterns.md`), not a clean opening. |
| 7 | Screenshot-to-bug-report widget | In-thread: Sentry, Bugsnag, LogRocket named directly as already doing this |

**All seven, once checked (five by the thread itself, two independently
this session), are already served.** None advance.

---

## CEO CHALLENGE

Is there a softer read of #5 or #6 worth keeping alive as "the closest
thing to a gap"? No — both have a real incumbent category, and the
surviving differentiation in each is a feature-level detail (send timing,
UI simplicity), not a product a buyer would search for on its own. Same
standard this board has held all four other rejected categories to;
softening it here because the technique changed would be inconsistent.

---

## FINAL VERDICT

**No candidate cleared the bar.** But the real finding this session
produces is methodological, not another rejected list:

**Demand-first search converges on vendor-served just as reliably as
pain-first search did — including against rich, dollar-quantified,
explicitly-framed-as-"nobody's-built-this" demand data.** This is the
sixth consecutive research pass this cycle to reach "real signal, already
served" (four 2026-07-20 market scans + this morning's artifacts scan +
this pass), and the second to use a materially different technique from
the first four. **Do not read this as proof the market is universally
saturated** — this pass sampled one curated list from one poster with a
commercial incentive to make ideas sound open, and it is also the *most
picked-over* possible sample (305 points, 107 comments of builders already
reading and acting on it). What it does support: two independent
techniques, applied honestly, have now converged on the same result.

**A genuinely reusable technique came out of this pass, independent of
any specific candidate:** letting a builder-community audience crowding-
check a candidate idea (post it, or find where someone already has) is
faster and higher-signal than one-at-a-time competitive WebSearches —
commenters are unprompted, financially disinterested, and hostile-by-
default rather than confirming. Filed in `patterns.md` as a named
verification method for the *next* candidate, whatever its source.

---

## Confidence

**High** — every crowding claim in the table above is either a direct
independent WebSearch this session ran (rows 1, 5) or a specific named
competitor stated by an unprompted third-party commenter (rows 2, 3, 4, 6,
7), not inferred. **Medium** on the OP's own upvote/thread-count claims
— explicitly flagged as commercially motivated and unverified, not relied
on for any rejection decision above (every rejection above rests on a
named competitor, not the OP's demand claims). **Low, not asserted as
fact** — whether `idearupt.ai`'s underlying database genuinely links to
real source threads; this session's tooling could not verify it either
way.
