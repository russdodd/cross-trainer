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

## 5. Human-optimal solution + hold guidance — 🧪 EXPERIMENTAL (July 2026)

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
- **The first cognitive-load metric was junk.** "Breaks an already-placed edge" is ~0 for nearly every optimal cross solution, so it ranked nothing. Replaced by `staged`: the area under the "edges solved so far" curve, which discriminates on 100% of scrambles. `F' L B R' F U R2 U` (progress 0,1,2,2,3,3,4,4) vs `D' U' B' L' R' F R2 D'` (0,0,0,0,0,0,0,4) — the second is exactly the "boils the ocean" case.
- **+1 lines need a margin.** algSpeed already prices the extra move's turning time, so without a margin a +1 line wins on noise (8.0 vs 7.9 — an extra move for nothing). `EXTRA_MOVE_MARGIN = 1.5` charges it for the memory load algSpeed doesn't model; +1 usage drops 35% → 6%, keeping only clear wins like `F2 B2 R` (9.0) → `R2 L' F L'` (4.6).
- **Cost:** ~0.6s at level 8 (up to 39k candidates × 4 holds), <20ms at typical levels. Runs on reveal.

**User's take (July 2026):** the staged idea is right but "disrupting placed edges can be fine" — hence staging is only ever a light tiebreaker, and the optimal+1 cap means it can never prefer an 11-move line over a 7-move one. Shipped as clearly-marked experimental to judge cube-in-hand.

**Implemented:** `src/app/cross-ranker/{cross-states,cube-tracker,cross-ranker}.js` + vendored `algSpeed.js`, `cross-ranker.spec.ts`, `scripts/analyze-cross-ranking.mjs`, and an "Experimental" panel in `ScrambleComponent`. Pair tracking deliberately still describes the solver's line and is labelled as such.

**Verification:** the analysis asserts every recommended line solves the cross by two independent routes — our own tracker, and `cross.solve()` on scramble + solution — across all sampled scrambles and levels.

**Open questions / next:** tune `STAGING_WEIGHT` (1.0) and `EXTRA_MOVE_MARGIN` (1.5) against real solves; consider extending the dev-tools rating harness to rate the *recommended line* (kept separate for now so it doesn't muddy the tracking-difficulty data); F2L-pair preservation as a ranking term is still deferred (the tracker makes it cheap now).

## Smaller / future ideas

- **Keyboard-first flow:** spacebar = new scramble, `S` = toggle solution.
- **Session stats in localStorage:** scrambles attempted per level, how often the solution was revealed (a proxy for "couldn't plan it").
- **Color neutrality mode:** scramble is normal, but you're told to solve the cross on a random color. Needs the solver to solve non-white crosses (check what the other entries in `cross.solve()`'s result array contain — cstimer's cross tool solves all 6 faces, which may already be sitting in `sols`).
