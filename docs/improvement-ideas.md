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

## Smaller / future ideas

- **Keyboard-first flow:** spacebar = new scramble, `S` = toggle solution.
- **Session stats in localStorage:** scrambles attempted per level, how often the solution was revealed (a proxy for "couldn't plan it").
- **Color neutrality mode:** scramble is normal, but you're told to solve the cross on a random color. Needs the solver to solve non-white crosses (check what the other entries in `cross.solve()`'s result array contain — cstimer's cross tool solves all 6 faces, which may already be sitting in `sols`).
