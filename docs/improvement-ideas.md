# Improvement ideas

Backlog of feature ideas for cross-trainer, with analysis. Newest at the bottom of each section.

## 1. Difficulty range instead of single level — ✅ DONE (July 2026)

**Idea:** Choose a lower and upper bound (e.g. 5–7) and get a random mix of difficulties, instead of drilling one level. Upper bound defaults to the lower bound so the common single-level case costs no extra clicks.

**Analysis:**

- Cheap to build. Scrambles are already bucketed by level in `Scrambles.ts` (8 × 1000), so this is just: pick a random level in `[lo, hi]`, then a random scramble from that bucket. Since every bucket has 1000 entries, uniform-over-levels is also uniform-over-scrambles.
- UI: a second dropdown ("to level") that snaps to the first one's value whenever the first changes. Guard against `hi < lo` by clamping.
- Training bonus: not knowing the difficulty in advance is itself good practice — recognition under uncertainty is closer to a real solve. Could optionally show the level of the current scramble only alongside the solution.
- Good excuse to replace the `document.getElementById("Level")` DOM read with proper Angular binding while touching this code.

**Verdict:** Do it. Low effort, clear value.

**Implemented:** two dropdowns in `CrossComponent` (To snaps to From on change, To options filtered to ≥ From), range passed to `ScrambleComponent` via `@Input`s, level picked uniformly in range, and the picked level revealed only alongside the solution ("Solution (Level 6)"). The `document.getElementById` DOM read and the dead `TextScramble` code were removed in the process.

## 2. Prune scramble moves that don't move cross pieces

**Idea:** Scrambling is done white-on-top, so moves that don't touch any of the 4 white cross edges (e.g. an opening D move) waste scrambling time. Step through the scramble tracking the cross edges; drop any move that doesn't move one, apply the ones that do.

**Analysis:**

- **Correctness:** the pruned scramble is exactly cross-equivalent. The cross state (positions + orientations of the 4 white edges) only changes when a move touches a cross edge, so skipping a non-touching move leaves the cross state identical — same solution, same difficulty level. Only the *rest* of the cube ends up in a different state.
- **Measured savings** (simulated the exact algorithm over all 8000 pre-computed scrambles, including merging same-face moves that become adjacent after pruning, e.g. `U D U` → `U2`):

  | Level | Avg length | After pruning | Avg moves saved |
  |-------|-----------|---------------|-----------------|
  | 1–2   | 20.2      | ~16.0         | 4.3             |
  | 3–4   | 20.3      | ~16.3         | 4.0             |
  | 5–6   | 20.4      | ~16.9         | 3.6             |
  | 7–8   | 20.6      | ~17.2         | 3.4             |

  60–77% of scrambles save 3+ moves; the best cases save 11–14. So it clears the "only worth it if it's more than one or two moves" bar — roughly 17–21% shorter scrambles.
- **Trade-off:** after a pruned scramble the full cube state differs from the original scramble, so finishing the solve after the cross is on a "wrong" cube. Since this is a cross trainer, that's acceptable — but make it a **toggle** ("cross-only scramble"), not a permanent change, to keep the finish-the-solve option.
- **Implementation is small:** no full cube simulation needed — track just the 4 edge positions through the 6 face-turn cycles (~40 lines, done at display time in `ScrambleComponent`). Pruning + adjacent-move merging can loop until stable.

**Verdict:** Worth it as a toggle. Savings are real (~3.5–4 moves every scramble adds up over a session).

**User's take (July 2026):** less bullish. In the best cases pruning cuts a 20-move scramble to ~6 moves, and a 6-move scramble is basically handing you the cross solution — you'd read the cross off the scramble instead of the cube. **Variant if revisited:** enforce a minimum pruned length (e.g. 10 moves) — prune greedily but stop skipping moves once dropping more would take the scramble under the floor, so a pruned scramble never degenerates into the solution. Parked for now.

## 3. Inspection timer (Claude's suggestion)

**Idea:** The skill this tool actually trains is *planning the cross (and ideally the first F2L pair) during WCA inspection*. Add a 15-second inspection countdown: "Get Scramble" starts the timer; at 0 (or with a stricter option, hide the scramble at 0) you should have the cross fully planned. Optionally show elapsed time when you reveal the solution, so you can see whether you planned it inside inspection.

**Analysis:**

- Directly targets the stated purpose ("practice cross and transition to F2L") in a way raw scrambles don't — it adds time pressure, which is the thing that breaks cross planning in real solves.
- Zero backend, small UI: a countdown display + optional "hide scramble at 0" checkbox. Spacebar as the "new scramble" shortcut fits naturally here and removes mouse round-trips between attempts.
- Pairs well with idea 1: random difficulty range + inspection clock ≈ realistic solve simulation.

**Verdict:** High training value per line of code. Good candidate after ideas 1–2.

**User's take (July 2026):** not convinced by forced time pressure. Training philosophy: take as long as you need to plan properly; speed under 15s comes naturally once you're good enough, whereas a countdown forces rushing before the skill is there. Parked — at most a passive elapsed-time display, never a forcing mechanism.

## 4. First-pair tracking difficulty — ✅ DONE (July 2026)

**Idea:** The user practices tracking the first F2L pair through the cross solution. Grade every pre-computed scramble by how hard that tracking is, add a control to filter by difficulty, and reveal how each pair actually behaved alongside the solution.

**Analysis:**

- **Two axes, not one.** The original framing ("easy = the pair isn't touched by the cross solve") turned out to grade the wrong thing. Cube-tested verdict: an untouched pair is "extremely easy... barely testing your tracking skills, it's really just testing your ability to recognize good cases to track." So the model splits into:
  - **Favourability = a filter.** Which pairs are worth tracking at all — an F2L-quality question, not a tracking-difficulty one.
  - **Disruptions = the dial.** How many solution moves displace either piece (counted even if a later move returns it).
- **The cube makes favourability clean.** Once the cross is solved, a corner can only be in the U layer or stuck in an F2L slot, and an edge only in U or an E-slice slot — the cross occupies every D edge slot. So "ends on the bottom" always means "needs extraction". The filter is therefore just: **corner ends on top**. Only ~11–16 scrambles per 1000 have no such pair.
- **Grade = the best qualifying pair**, since that's the one you'd actually pick — otherwise the drill is dodgeable by tracking a trivial pair.
- **Bands: easy 0–2, medium 3–4, hard 5+** total disruptions. Chosen from the distribution, not guessed:

  | Level | Easy | Medium | Hard | None |
  |---|---|---|---|---|
  | 1 | 984 | 0 | 0 | 16 |
  | 2 | 961 | 24 | 0 | 15 |
  | 3 | 855 | 127 | 3 | 15 |
  | 4 | 624 | 329 | 37 | 10 |
  | 5 | 365 | 526 | 98 | 11 |
  | 6 | 172 | 592 | 225 | 11 |
  | 7 | 65 | 482 | 440 | 13 |
  | 8 | 15 | 305 | 669 | 11 |

  Levels 1–2 have no hard cases — a 1–2 move cross can't disrupt a pair five times. The UI shows a message instead of a scramble for empty band × level combinations.
- **Trade-off accepted:** the filter allows the edge anywhere, so ~40% of recommended pairs have the edge in a slot. The reveal shows this, so it stays judgeable in practice.
- **Rejected for v1:** tracking orientation (twist/flip). All the stated criteria are positional. Would let us spot already-connected "gift" pairs (~13% of corner-in-slot cases have the edge in that same slot), so worth revisiting if grades ever feel wrong.

**Implemented:** `scripts/analyze-pair-tracking.mjs` (analysis + data generation), `src/app/PairTrackingData.ts` (generated), `src/app/pair-tracking.ts` (model), `pair-tracking.spec.ts` (guards the distribution and the encoder/decoder contract), plus a band dropdown on `CrossComponent` and the pair reveal in `ScrambleComponent`.

**Verification:** the analysis is self-checking — it asserts the cross is genuinely solved after scramble + solution for all 8000 scrambles, which validates the tracker, the z2 frame mapping and the solver call together. Five worked samples were checked on a real cube. In the app, the reveal prints per-pair evidence ("corner moved 2×, ends on top; edge moved 0×, ends on top") so every grade stays checkable during normal practice.

## 5. Human-optimal solution + hold guidance — ✅ GRADUATED (July 2026)

**Graduated to THE solution.** After the user judged the ranker's line reliably better in hand, the experimental side-panel was removed and the ranker's pick became the only solution the app shows; the raw solver line is no longer displayed. The pick is now **precomputed offline** into `CrossSolutionData.ts` (served by a lookup — no solving/ranking in the browser), and `PairTrackingData.ts` was regenerated against it, so the tracking reveal and difficulty bucketing describe the shown line. Retuning `EXTRA_MOVE_MARGIN` now needs a data regen. The analysis below is the design record from when it was experimental.

**Idea (user's):** the displayed solution often isn't finger-optimal. Sometimes a 9-move line beats an 8-move one because it's finger-friendlier or easier to hold in memory (fewer interacting pieces — solving edges in stages). The tool also never says which face to hold in front. Get all optimal and optimal+1 solutions and rank them for "human optimal". Inspired by a [cubedb.net cross tool thread](https://www.reddit.com/r/Cubers/comments/qcz1b6/cubedbnet_efficient_cross_practice_tool_inspired/).

**The bug underneath it:** `cross.solve()` returns whichever optimal line its IDA* search finds first, and that search tries faces in fixed order F, R, U, B, L, D. So the trainer has been systematically showing **F/B-heavy solutions** — the worst faces for your hands. This wasn't a subjective preference; it was a real bias worth fixing.

**Analysis:**

- **Enumeration is cheap and exact.** The cross state space is only 190,080 states, so an exact BFS distance table (~40ms) allows enumerating *every* optimal and optimal+1 line — no changes to the fragile solver, which keeps its tables private. The table's histogram is asserted against the counts `cross.js` itself hardcodes.
- **Ergonomics is a solved problem, by someone else.** [Trangium's algSpeed](https://github.com/trangium/trangium.github.io) (MIT) simulates grips, fingertricks and regrips. Measured face costs: R 0.80 < U 1.00 < D 1.40 < L 1.50 < F 2.30 < **B 3.50** — exactly the axis the solver's search order was blind to. 2.8µs/call, so scoring tens of thousands of candidates is affordable.
- **Measured effect** (480 scrambles, every one validated):

  | Level | different line | avg ergo gain | F/B moves | staged |
  |-------|---------------|---------------|-----------|--------|
  | 4     | 45%           | 1.78          | 1.40 → 1.23 | 0.50 → 0.50 |
  | 6     | 87%           | 3.71          | 2.43 → 2.10 | 0.36 → 0.37 |
  | 7     | 98%           | 4.55          | 2.88 → 2.30 | 0.30 → 0.37 |
  | 8     | 98%           | 5.31          | 3.28 → 2.87 | 0.25 → 0.35 |

- **The hold is the free win.** Often the moves don't change at all — only the hold does. `L D L` becomes `R D R` by holding blue in front (ergo 5.6 → 3.5). Same physical solution, zero cost. Recommended holds come out evenly spread (green 29%, red 25%, orange 24%, blue 22%), which is what you'd expect if the advice is real.
- **The first cognitive-load metric was junk.** "Breaks an already-placed edge" is ~0 for nearly every optimal cross solution, so it ranked nothing. Replaced by `staged`: the area under the "edges done so far" curve, which discriminates on 100% of scrambles.
- **The second one was subtly wrong too — see below.** It counted exact edge positions, which misreads an ordered-but-unaligned cross.
- **+1 lines need a margin.** algSpeed already prices the extra move's turning time, so without a margin a +1 line wins on noise (8.0 vs 7.9 — an extra move for nothing). `EXTRA_MOVE_MARGIN = 1.5` charges it for the memory load algSpeed doesn't model; +1 usage drops 35% → 6%, keeping only clear wins like `F2 B2 R` (9.0) → `R2 L' F L'` (4.6).
- **Cost:** ~0.6s at level 8 (up to 39k candidates × 4 holds), <20ms at typical levels. Runs on reveal.

**User's take (July 2026):** the staged idea is right but "disrupting placed edges can be fine" — hence staging is only ever a light tiebreaker, and the optimal+1 cap means it can never prefer an 11-move line over a 7-move one. Shipped as clearly-marked experimental to judge cube-in-hand.

**Implemented:** `src/app/cross-ranker/{cross-states,cube-tracker,cross-ranker}.js` + vendored `algSpeed.js`, `cross-ranker.spec.ts`, `scripts/analyze-cross-ranking.mjs`. Originally an "Experimental" panel in `ScrambleComponent` with pair tracking describing the solver's line; see the graduation note at the top of this section for the current shape.

**Verification:** the analysis asserts every recommended line solves the cross by two independent routes — our own tracker, and `cross.solve()` on scramble + solution — across all sampled scrambles and levels.

### Extra moves: measured, and mostly against the idea (July 2026)

The founding hunch was "sometimes a 9-move line beats an 8-move one". The user then asked the sharper question — how does +1 compare to +0 across the board, and would +2/+3 help? Gain = how much better the best line gets if you allow N extra moves, measured against the best **optimal-length** line across all 4 holds, so it isolates what the extra move itself buys (levels 3–6, 80 scrambles):

| extra | avg gain | best case | % beats +0 at all | % beats by >1.5 |
|-------|----------|-----------|-------------------|-----------------|
| +1    | 0.02     | 2.50      | 39%               | 9%              |
| +2    | −0.39    | 2.00      | 28%               | 4%              |
| +3    | −0.86    | 1.60      | 23%               | 1%              |

- **+1 is marginal**: 0.02 ergo on average — less than a single R move (0.80). It's a rare-but-real win: 9% of scrambles clear the 1.5 margin, worth up to 2.50.
- **+2/+3 are strictly worse**, and not just on average — their *best cases shrink* (2.50 → 2.00 → 1.60) and they win less often. **Don't build them.** Each extra move costs turning time that algSpeed already charges, and smoother fingertricks rarely repay it.
- **The user's XCross suspicion was correct.** XCross adds moves to also solve an F2L pair — the extra moves buy a *pair*. Adding moves to a plain cross buys only smoothness, which doesn't cover the cost. Cross walkthroughs that "add a bunch of moves" are almost certainly doing XCross.
- **Is the 1.5 margin huge?** No — algSpeed is unbounded and time-like (a 7-move cross scores ~9–16) and one move costs 0.80 (R) to 3.50 (B), so 1.5 ≈ one L move. The real story is that +1 barely does anything regardless.

**Verdict:** keep +1 with the margin (it's the 9% that prompted the whole idea), never build +2/+3.

### The `staged` metric was measuring the wrong thing — fixed (July 2026)

Found by the user before any votes were collected, which mattered: the harness exists to calibrate `STAGING_WEIGHT`, and it would have calibrated against a broken signal.

**The bug:** `solvedCount` tested exact absolute position. But a cross edge on the bottom, white down, in correct *relative* order is effectively done — the solver stops thinking about it and aligns the whole cross with one D at the end. Counting exact positions marked those pieces unsolved until that final turn, so a solution that was three-quarters done from move one read as "everything lands at once".

**Fix:** `staged`/`solvedAfter` use `solvedCountAligned` — the most edges simultaneously home under a single best D offset. Self-limiting: two bottom edges in the wrong relative order credit 1, not 2. `crossSolved` stays strict, since the validation harness needs "solved" to mean aligned.

**Evidence (960 scrambles, solver's line), independently reproduced:**

| | exact | alignment-tolerant |
|---|---|---|
| mean staged | 0.530 | 0.693 |
| systematic understatement | | 0.163 |
| solutions where the two disagree | | 56.5% |
| solutions ending in a purely-aligning D | | 18.4% |

Worked case (Scrambles.ts 4[14], solver's line `F2 D' B' D'`): progress was `0,0,0,4` = 0.25 ("all at once"); it is really `3,3,4,4` = 0.88. Three edges are ordered from move one and the trailing `D'` is pure alignment. The old docstring's own showcase for "all at once" (8[0], cited at 0.13) was the same misread — it's actually `0,0,0,1,2,3,4,4` = 0.44.

**Consequences:**

- Candidate spread shrank 0.38 → **0.25**, so `STAGING_WEIGHT` went 1.0 → **1.5** to keep the intended ~0.38 max score shift.
- **Only ~7% of recommendations changed** (0% at level 3, ~12% at level 7). The metric was now right on 57% of solutions it had misread, but the staging term is dominated by ergonomics, so few picks move.
- **The old metric flattered the feature.** It showed recommendations *improving* staged (level 8: 0.25 → 0.34). Corrected, they slightly *reduce* it (0.44 → 0.40): the ranker trades a little staging for a lot of ergonomics (+5.03 at level 8). A defensible trade, but the honest picture.
- **Staging turned out close to inert**: at 1.5 it changed ~1% of picks (2.5 → ~4%), and only ever separated genuine ties. Which led directly to:

### Staging removed — ✅ DONE (July 2026)

Fixing the metric is what made it measurable, and the measurement killed it. Even correct, `staged` changed ~1% of the lines shown, because ergonomic differences between candidates (spanning several algSpeed units) dwarf staged's ~0.25 spread. Where it did decide, the ergo and staged deltas were both ~0.00 — genuine ties.

**User's verdict:** *"I think we remove it. it seems to be adding complexity for the benefit that is almost negligible."*

Removed: `STAGING_WEIGHT`, `solvedCountAligned`, `trackSolution`, the `staged`/`breaks`/`solvedAfter` fields, the `staged` CSV column, and the "edges done as you go" evidence line. `cube-tracker.js` remains — the validation harness uses it (with strict `crossSolved`) to prove a recommended line really solves the cross.

Scoring is now `ergonomics + EXTRA_MOVE_MARGIN × extraMoves`, minimised over candidates × 4 holds.

**The lesson, twice over:** the cognitive-load idea was intuitive and both attempts to operationalise it failed — the first inert, the second real but dominated. **Ergonomics and the hold are the whole win.** If staging is revisited, it needs a different experiment: A/B two lines matched on ergonomics but far apart on staging, so the idea is judged on its own rather than as a tiebreaker that never breaks anything.

### Line verdicts — built then removed (July 2026)

**Removed** after the user judged the experimental line reliably better in hand: the vote had stopped earning its complexity, so `line-feedback.service.ts`, its box, and `scripts/analyze-line-votes.mjs` were deleted. The analysis below is kept as the record of why it existed and why an open preference test is hard to trust — restore from git history rather than rebuilding if the ranker ever needs re-validating against real hands.

`EXTRA_MOVE_MARGIN` (1.5) was calibrated from score distributions, not hands. The dev tools carried a **better / about the same / worse** box on the experimental line, stored via `line-feedback.service.ts` (localStorage + CSV, mirroring the tracking-difficulty store but kept separate — one store per question). `node scripts/analyze-line-votes.mjs <csv>` sliced by `holdsOnly`, `extraMoves`, and by face.

**It shipped as a blind A/B first, and the blinding lasted one session.** User's verdict: *"It's super obvious which blind is computer vs ergonomic."* And they're right — blinding only works when the options carry no tell, and these do: the solver's line is F/B-heavy, ours is R/U-heavy. Randomising the sides fooled nobody, cost the reader the context of knowing which was which, and required withholding the whole reveal (solution, experimental panel, pair tracking) until a vote landed — a lot of machinery for a disguise anyone could see through. Removed; the storage key went to `v2` rather than migrating, since the v1 rows answered a different question.

**What that costs, honestly:** an open preference report carries some pull toward the tool's own pick. There's no fixing that here — the tell is intrinsic to what the feature does. So read a high "better" rate with suspicion; the **"worse"** rows and the by-face slices are the parts that can actually surprise us. If a genuinely blind test is ever wanted, it would have to compare two lines *without* an obvious signature — e.g. two candidates matched on face mix but differing on the thing being tested.

**What a verdict actually measures.** Since staging is gone, the recommendation is "best algSpeed across candidates and holds" — so a verdict is a referendum on **algSpeed's ergonomics model plus the hold choice**, nothing else.

**A "worse" verdict is not automatically the voter's gap.** Treating it that way would make the experiment unfalsifiable. algSpeed is one hobbyist's model of one grip style, and — the untested part — it was built to score OLL/PLL algs from a settled home grip, not cross lines executed cold out of inspection, full of D moves, with no AUF. The face slices exist to separate the two explanations: "worse" spiking on lines containing B or L suggests an undrilled fingertrick; flat across faces suggests the model doesn't fit these hands. For a personal tool, "nicer for you" is the right target — if the hands disagree with algSpeed, follow the hands.

**Open questions / next:** collect verdicts and settle `EXTRA_MOVE_MARGIN` (the only knob left) and whether algSpeed transfers to cross at all; F2L-pair preservation as a ranking term is still deferred.

## 6. Pair-preserving cross choice — measured (July 2026), awaiting verdict

**Idea (user's):** the ergonomic cross is chosen with zero awareness of the first F2L pair, which looks like a blind spot: sometimes a near-equal candidate — same length, or one extra move — would keep an already-connected corner+edge pair intact, or leave the best pair in a materially better state. This is standard human technique ("pair preservation", "cross+1 planning" — CubeSkills/Cubefreak/jperm), *not* XCross and not superhuman, but it walks that line, so it was measured before anything shipped.

**Guardrails (user's, non-negotiable):**
- Human-executable and **learnable**: every proposed line switch must have a one-sentence reason. The harness tags each reason `inspection-visible` (a pre-made pair you can see before solving) or `trackable` (an end state you can predict by tracking through the planned line — the exact skill this app trains). Nothing is proposed on evidence a human couldn't act on.
- Not XCross: candidates stay plain cross lines ≤ optimal+1. Key insight: the ranker's enumeration already contains *every* human trick up to one extra move (including "insert a U mid-cross to dodge the pair"), so this is purely a selection/scoring question — no new search.

**Outcome categories** (the user's ranking, best→worst; judged by the best pair, since that's the one you'd play): `solved` (free XCross) > `connected-U` (intact block on top) > `both-U` (unconnected but both on top) > `connected-vertical` / `connected-slot` (intact block, edge in the E-slice — split into corner-up vs corner-buried sub-cases) > `split` (corner up, edge in a slot) > `buried` (corner stuck in a slot).

**Machinery:** `scripts/pair-state.mjs` — an *oriented* pair tracker (ordered sticker tuples; the position-only tracker's sort is exactly what discards orientation), with hand-derived self-checks (R carries the solved FR block up intact; R U R' extracts it to UFL/UF; R2 U splits it; F2 makes a vertical pair; quarter-turn⁴ and sexy⁶ identities). `scripts/analyze-pair-preservation.mjs` — the harness; analysis-only by construction (no emit flags exist), and it asserts every candidate line solves the cross with position *and* orientation, which is stricter than the shipped generator's check. `--limit N` smoke / `--all` full (~15 min, background it).

**Measured, all 8000 scrambles:**

*Pre-made connected pairs exist after ~14–19% of scrambles at every level.* What the current pick does with them, and what a ≤+1 candidate could do (kept-top = ends solved/connected-on-top; Δ = score cost of the cheapest rescue):

| Level | premade | kept-top by current | rescuable ≤+1 | unrescuable | Δ med | Δ p90 |
|---|---|---|---|---|---|---|
| 1 | 14% | 36% | 16% | 48% | 2.5 | 2.5 |
| 2 | 16% | 29% | 28% | 43% | 2.5 | 3.6 |
| 3 | 14% | 30% | 45% | 25% | 2.6 | 4.7 |
| 4 | 17% | 19% | 67% | 14% | 2.6 | 5.0 |
| 5 | 15% | 23% | 70% | 6% | 2.7 | 4.0 |
| 6 | 14% | 17% | 83% | 0% | 1.9 | 4.0 |
| 7 | 16% | 12% | 88% | 0% | 1.6 | 2.9 |
| 8 | 19% | 5% | 95% | 0% | 1.2 | 2.5 |

The user's blind-spot hunch is confirmed and it *grows with level*: at levels 6–8 the current pick keeps a pre-made pair on top only 5–17% of the time, yet 83–95% of the broken ones are rescuable within the existing candidate budget, at a falling cost (median 1.2–1.9 ≈ one move's worth of algSpeed). 1–3% of rescues at levels 3+ are **literally free (Δ = 0.0)** — often the same moves reordered: `D' B2 L2` buries the pair, `D' L2 B2` keeps it connected on top, same score.

*Beyond pre-made pairs:* the current pick's best-pair category averages rank ~2.6 (mostly `both-U`) at every level, while the best achievable within ≤+1 falls from 2.2 (level 1) to **0.0 (level 8)** — at level 7, 944/1000 scrambles have a candidate that outright *solves* a pair; at level 8, 1000/1000 (huge candidate sets, only 102 distinct states). But cheap is rarer than possible: a free-ish outright solve (Δ ≤ 1.5) exists on 4–12% of scrambles at levels 6–8, and a *near-free category upgrade* (Δ ≤ 0.5) on 18–30%.

*Selection architectures* (the user's open question — phased "pair first, ergo second" vs a combined score; representative levels):

| Level | architecture | changed | Δ med | Δ p90 | gain (ranks) |
|---|---|---|---|---|---|
| 4 | phased uncapped | 66% | 2.8 | 4.9 | 2.05 |
| 4 | phased cap 1.5 | 19% | 0.7 | 1.4 | 2.41 |
| 4 | combined W=1 | 27% | 1.2 | 2.5 | 2.92 |
| 6 | phased uncapped | 95% | 3.1 | 5.6 | 2.14 |
| 6 | phased cap 1.5 | 40% | 0.7 | 1.4 | 2.20 |
| 6 | combined W=1 | 36% | 0.6 | 1.8 | 2.57 |
| 8 | phased uncapped | 99% | 3.0 | 4.6 | 2.62 |
| 8 | phased cap 1.5 | 68% | 0.8 | 1.4 | 2.05 |
| 8 | combined W=1 | 55% | 0.6 | 1.7 | 2.39 |

**Uncapped phased is confirmed expensive** (median sacrifice ~3 algSpeed units — about two moves — for ~2 category ranks): the user's instinct to be careful was right. The sweet spot is a *bounded* trade either way: capped phased (≤1.5) and combined W=1 both buy ~2–3 category ranks for a median Δ of 0.6–0.8, changing 20–55% of picks. Combined W=1 edges out capped-phased on gain-per-cost and has one smooth knob, same shape as `EXTRA_MOVE_MARGIN`. (Full sweep W ∈ {0.5,1,2,3} and caps {0.75,1.5} in the harness output.)

*XCross comparison (levels 3–6, 100 scrambles each, min extra moves for cross + a full solved pair):*

| Level | +0 | +1 | +2 | +3 | none ≤+3 |
|---|---|---|---|---|---|
| 3 | 1% | 7% | 15% | 49% | 28% |
| 4 | 0% | 7% | 47% | 42% | 4% |
| 5 | 3% | 18% | 58% | 21% | 0% |
| 6 | 4% | 43% | 53% | 0% | 0% |

"Just do XCross instead" is a different, bigger trade: at levels 3–5 a full pair usually costs +2/+3 extra moves (the territory already measured as ergonomically unpaying unless the pair repays it — which for XCross it does, but as a separate skill with real move-count cost). Preservation within ≤+1 is not XCross-lite; it's the free slice: keep what's already there, upgrade the category when a near-equal line happens to.

**Worked samples** (in the harness output; two of the best): level 3 #5 — `D' B2 L2` vs `D' L2 B2`, identical score 6.4, the first buries the already-connected blue-orange pair, the second ends it connected on top. Level 4 #207 — `R2 F' B' L2` vs `R2 F' L2 B'`, identical score 7.8, buried vs connected-U. Same moves, different order. Cube-check these before trusting the model.

**Caveats, honestly:** Δ is in algSpeed units (~0.8 = one R move; the +1 margin is 1.5) — "cheap" means cheap *by the model the ranker already trusts*. The `trackable` tier (candidate ends the pair well without a pre-made pair to see) is only actionable via the tracking skill; if only `inspection-visible` switches are wanted, the rescuable numbers in table 1 are the whole feature. At levels 1–2 pre-made pairs are often unrescuable (small candidate sets) — this is a mid-to-high-level feature.

**Open (Phase B, gated on the verdict):** whether to ship as a combined score term (W≈1) vs capped-phased; whether it changes THE solution or lives on a **separate page/mode** — the user leans toward pair-awareness being a later-stage skill layered on after the ergonomic cross is solid, possibly with the pair-tracking controls moving there too. A regen of `CrossSolutionData.ts`/`PairTrackingData.ts` is required either way if any pick changes.

**Cube-verified (July 2026):** both headline worked samples confirmed in hand — level 3 #5 ("100% spot on... captures the essence, a mini building block") and level 4 #207 ("100% this is also a valid case"). Notably the two are near-identical geometry: pair block at DBL/DL, white hidden at the back, one colour on the floor, and the order of the last two moves decides whether the block survives.

**User's verdict (July 2026): build it.** Phase B approved as a **combined score** (ergonomics + `PAIR_WEIGHT` × category rank, W≈1 from the measured sweep) surfaced as a **pair-aware mode toggle on the cross page** — off shows today's ergonomic line untouched (the learn-the-cross-first path), on shows the pair-aware pick with its one-sentence human reason. Replacing the solution outright was rejected (conflicts with the progression instinct); a separate page was rejected (the two trainers would share almost all UI).

**Implemented (July 2026):** `recommendPairAware()` + `PAIR_WEIGHT = 1` in `cross-ranker.js` over the oriented tracker `cross-ranker/pair-state.js` (moved in from the Phase A harness); `PairAwareSolutionData.ts` generated by the same `analyze-pair-tracking.mjs` pass as the other two data files (sparse: only differing lines are stored, with their own tracking features so the reveal describes the shown line); `pair-aware-solution.ts` builds the reason sentence from shipped meta; checkbox on `CrossComponent`, reveal wiring + `pairAware` CSV column in the feedback store. When the pick differs the reveal also shows a **comparison row** — the ergonomic line, its speed, and what it would have done to the same featured pair — added at the user's request so the mode's trades stay checkable in place. The ergonomic path is untouched — `recommendPairAware().best` is identical to `recommend().best`, verified by regen diff. Known v1 quirk: the band filter still buckets by the ergonomic line's features in pair-aware mode; only the reveal switches.

## Smaller / future ideas

- **Keyboard-first flow:** spacebar = new scramble, `S` = toggle solution.
- **Session stats in localStorage:** scrambles attempted per level, how often the solution was revealed (a proxy for "couldn't plan it").
- **Color neutrality mode:** scramble is normal, but you're told to solve the cross on a random color. Needs the solver to solve non-white crosses (check what the other entries in `cross.solve()`'s result array contain — cstimer's cross tool solves all 6 faces, which may already be sitting in `sols`).
