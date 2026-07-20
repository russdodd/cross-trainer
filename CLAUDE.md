# cross-trainer

Personal speedcubing practice tool. Angular 20 SPA with two features: a **Cross Trainer** (actively used) and an **OLL Trainer** (rarely used). Deployed to Cloudflare Workers on merge to `main`.

Feature backlog with analysis and the user's verdicts: `docs/improvement-ideas.md` — check it before proposing improvements.

## Stack

- Angular 20 / TypeScript 5.9 (upgraded from Angular 10 in July 2026)
- esbuild-based `@angular/build:application` builder (replaces the old webpack-based `@angular-devkit/build-angular:browser`)
- D3 v7 (OLL cube visualisation; upgraded from v6)
- RxJS 7.x (upgraded from 6.x)
- No backend; all logic runs client-side

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `HomeComponent` | Nav landing with links to both tools |
| `/cross-component` | `CrossComponent` | Cross trainer |
| `/oll-trainer-home` | `OllTrainerHomeModule` (lazy) | OLL trainer shell |
| `/oll-trainer-home/select` | `OllSelectPageComponent` | Choose OLL category |
| `/oll-trainer-home/cube` | `OllTrainerComponent` | OLL practice cube |

## Cross Trainer (primary feature)

**Purpose:** Practice solving the white cross and transitioning to F2L. User picks a difficulty range (1–8 moves to solve; the "to" dropdown snaps to the "from" value so single-level practice needs one click) and optionally a first-pair tracking band, gets a scramble from a random level in the range, and can reveal the recommended (ergonomic) solution — the line to actually execute plus the face to hold in front — labelled with the picked level, plus how each F2L pair behaves during it.

**Key files:**
- `src/app/cross/cross.component.html` — `.controls` flex row (from/to level dropdowns 1–8, tracking band dropdown + its collapsible methodology explainer, pair-aware checkbox), + `<app-scramble>`
- `src/app/cross/cross.component.ts` — holds `minLevel`/`maxLevel` range state (To options filtered to ≥ From), `trackingBand`, `showMethodology`, and `pairAware`
- `src/app/scramble/scramble.component.ts` — all the logic
- `src/app/Scrambles.ts` — 8 arrays × 1000 pre-computed scrambles (character-encoded). **⚠️ Precious — never regenerate or edit; everything else keys off these indices.**
- `src/app/cross-solution.ts` — reads the shipped recommended solution for a scramble (a lookup)
- `src/app/CrossSolutionData.ts` — **generated**; per-scramble `[holdColour, turnSpeed, moves]` for the ranker's chosen line
- `src/app/pair-tracking.ts` — first-pair tracking difficulty model (see below)
- `src/app/PairTrackingData.ts` — **generated**; per-scramble pair features, computed against the recommended line
- `src/app/pair-aware-solution.ts` — reads the pair-aware pick + builds its one-sentence reason (see the pair-aware mode section)
- `src/app/PairAwareSolutionData.ts` — **generated**; per-scramble featured-pair meta + sparse map of the lines that differ from the ergonomic pick
- `scripts/analyze-pair-tracking.mjs` — generates **all three** data files above; the analysis/validation harness (runs the ranker per scramble)
- `scripts/analyze-pair-preservation.mjs` — the Phase A measurement harness behind the pair-aware mode (analysis only, no emit flags; §6 numbers)
- `src/app/tracking-feedback.service.ts` — dev tools rating store (see below)
- `src/app/cross-ranker/` — human-optimal solution ranking, run **offline only** (see below); includes `pair-state.js`, the oriented pair tracker behind the pair-aware mode
- `scripts/analyze-cross-ranking.mjs` — its analysis/validation harness; also emits the README charts
- `scripts/impact-chart.mjs` — the README chart's SVG renderer; `scripts/render-impact-charts.mjs` re-renders it from saved numbers
- `docs/img/` — **generated**; the README's impact charts (light + dark SVG) and the JSON they were drawn from
- `src/app/cstimer/cross.js` — cross solver (ported from cstimer)
- `src/app/cstimer/kernel.js`, `mathlib.js`, `mersenneTwister.js` — solver support libs

**⚠️ Never modify the `src/app/cstimer/*` files.** They are fragile vendored code with no tests, and busting the solver breaks the whole trainer. Call `cross.solve()` read-only; build any cube maths you need as a separate module. (The runtime app no longer calls the solver at all — it's used only offline by the generation scripts — but the vendored files stay untouched.)

**Flow:**

1. User selects a level range and clicks "Get Scramble"
2. `ScrambleComponent.newScramble()` gets the range via `@Input() minLevel/maxLevel` (bound from `CrossComponent` via `ngModel`) and picks a uniform random level in it
3. Picks `scrambles[level-1][randomIndex]` — a character-encoded scramble string
4. Decodes each char using `charCodeAt - 'A'.charCodeAt(0)` as an index into `MoveNamesWCA`
5. Displays the resulting WCA-notation scramble string
6. "Get Solution" reads `crossSolutionFor(level, index)` from `CrossSolutionData.ts` — a pure lookup: the recommended (ergonomic) line, the face to hold in front, and its turn-speed cost. Shown as "Solution (Level 6)" with the hold and a turn-speed label. **No solving or ranking happens in the browser** — every line was computed offline (see the ranker section below). Moves are WCA notation as executed in the recommended hold.
7. The pair-tracking reveal is rendered from `PairTrackingData.ts` (a lookup, no extra solving), describing that same recommended line
8. With the **pair-aware checkbox** on, step 6 reads `pairAwareSolutionFor(level, index)` instead (`PairAwareSolutionData.ts`, also a pure lookup): usually the same line, sometimes one that trades a little ergonomics for a better first-pair outcome, always with a one-sentence reason ("keeps your already-connected green-orange pair — it ends connected on top"). The tracking reveal then describes *that* line (alternate lines ship their own encoded features). Flipping the toggle hides a revealed solution rather than swapping it

**Scramble encoding:** Each character A–R maps to a move index. `MoveNamesWCA = ["R","R2","R'","B","B2","B'","L","L2","L'","F","F2","F'","D","D2","D'","U","U2","U'"]`.

### First-pair tracking difficulty

Grades each scramble by how hard it is to track the first F2L pair through the **recommended (ergonomic) cross solution** — the same line the app shows. (It used to grade the raw solver line; since that line is no longer displayed, both the bucketing and the reveal now describe the line you actually execute.) Two axes:

- **Favourability (filter):** a pair is only worth tracking if its **corner ends in the U layer**. Once the cross is solved a corner can only be on top or stuck in an F2L slot (and an edge only in U or an E-slice slot — the cross occupies every D edge slot), so a corner in D always means an extraction.
- **Disruptions (dial):** how many solution moves displace either piece, counted even if a later move puts it back. A scramble is graded by its **best qualifying pair**, since that's the one a solver would pick. Bands: easy ≤2, medium 3–4, hard 5+.

Levels 1–2 have no hard cases and every level has ~8–16 scrambles with no qualifying pair, so empty band × level combinations are real and the UI shows a message instead of a scramble. Full distribution and rationale: `docs/improvement-ideas.md` §4.

**Regenerating the data** (needed if the model/thresholds change **or the ranker is retuned**, since the shipped line now depends on `EXTRA_MOVE_MARGIN`):

```bash
node scripts/analyze-pair-tracking.mjs \
  --emit-ts src/app/PairTrackingData.ts \
  --emit-solution src/app/CrossSolutionData.ts \
  --emit-pair-aware src/app/PairAwareSolutionData.ts   # ~15 min (runs the ranker per scramble) — background it
```

Emits **all three** shipped data files from one pass. It sources each solution from `recommendPairAware()` (whose `best` is identical to `recommend().best`, so adding the pair-aware emit never changes the ergonomic files), keeping the displayed solutions and their tracking features in lockstep. `--limit N` runs a fast smoke test on N scrambles/level and refuses to emit (never overwrite the shipped data with a truncated file). The script is self-validating: it asserts the cross is genuinely solved after applying scramble + solution for all 8000 scrambles — which now also independently re-verifies every recommended line — and that the pair data round-trips. `pair-tracking.spec.ts` asserts the shipped data reproduces the expected distribution (update those numbers when you regenerate); the reveal/bucketing will fail loudly if the script's encoder and `pair-tracking.ts`'s decoder drift apart.

### Dev tools rating box

The easy/medium/hard thresholds above were chosen analytically and have never been validated in hand. The dev tools box at the bottom of the cross trainer collects the evidence to settle that: rate each scramble **too hard / ok / too easy**, then export the CSV and see whether the ratings line up with the grades the model assigned.

- `TrackingFeedbackService` (`providedIn: 'root'`) wraps `localStorage` key `cross-trainer.tracking-feedback.v1` — a JSON array of `TrackingFeedbackRecord` (`timestamp`, `rating`, `level`, `grade`, `bandFilter`, `solutionRevealed`, `solutionMatch`, `pairAware`, `scrambleIndex`, `scramble`). `toCsv()` emits those as columns in that order. `pairAware` records which mode showed the line being judged (added after `solutionMatch`, same no-migration pattern: old rows lack it ⇒ blank cell).
- **`solutionMatch` (`same` / `different` / null)** records whether the user's own cross matched the suggested line. It is **optional** — the difficulty rating alone gates Submit — and its buttons appear only once the solution has been revealed (you can't compare to a suggestion you haven't seen). Unanswered ⇒ null ⇒ blank CSV cell. Added after the key was created, so old rows simply lack it; no migration, no key bump.
- **Submit is the only writer.** Getting a new scramble without submitting records nothing — a skipped rating is silence, not a verdict of "ok". `ScrambleComponent.resetRating()` clears the selection on every `newScramble()`.
- **One vote per draw.** `canSubmit` gates on `!submitted`, so re-clicking Submit (or forgetting you already voted) can't double-count. The gate is on the **Get Scramble click, not the scramble's identity** — drawing the same case again tomorrow is a genuine second data point and does record. Note the guard lives in the model, checked synchronously in `submitRating()`; the template's `*ngIf` hiding the buttons is cosmetic, and a DOM-only guard would lose the race to a fast double-click.
- `solutionRevealed` is a **latch** set in `toggleSolution()`, not a read of the current button state — hiding the solution again doesn't un-see it.
- Reads are defensive (`try`/`catch` → `[]`): a corrupt or hand-edited key must never break the trainer.
- **No backend, and no network surface** — "service" here is Angular DI, not an API. `wrangler.toml` stays assets-only.

**⚠️ localStorage is origin-scoped, and this is the sharp edge.** `localhost:4200`, a branch preview (`<branch>-cross-trainer.russell-dodd.workers.dev`), prod (`cross-trainer.russell-dodd.workers.dev`) and the planned `russdodd.dev` custom domain each keep a **separate store that never merges**. Collect real data on prod only; treat localhost and preview ratings as throwaway. Pointing `russdodd.dev` at this Worker will look like the history vanished — it hasn't, it's parked on `workers.dev` — so **export the CSV before any domain move**. The CSV is also the only backup against clearing browsing data.

### Human-optimal solutions + hold guidance (now THE solution)

`src/app/cross-ranker/` picks a line that's nicer to *execute* than the raw solver line, and says how to hold the cube for it. **This is the solution the app shows** — it graduated from an experimental side-panel in July 2026, and the solver's line is no longer displayed at all. The ranker runs **offline only**: `scripts/analyze-pair-tracking.mjs` bakes its pick for every scramble into `CrossSolutionData.ts`, and the runtime just looks it up.

Why it exists: `cross.solve()` returns whichever optimal line its IDA* search reaches first, and that search tries faces in the fixed order F, R, U, B, L, D — so the answer skews **F/B-heavy**, the least finger-friendly faces. It also never says which face to hold in front.

| File | Role |
|---|---|
| `cross-states.js` | Exact BFS distance table over all 190,080 cross states + enumeration of every optimal / optimal+1 line |
| `algSpeed.js` | **Vendored** from [Trangium's MovecountCoefficient](https://github.com/trangium/trangium.github.io) (MIT, © 2021 trangium). Simulates grips/fingertricks; lower = faster. Body verbatim; only a header + `export` added |
| `cube-tracker.js` | Oriented cross-edge tracker (position **and** orientation, unlike the pair-tracking one). Used to prove a recommended line really solves the cross |
| `cross-ranker.js` | Scores candidates × 4 holds; `ergonomics()` is the only caller of algSpeed |

**Scoring:** `score = ergonomics + EXTRA_MOVE_MARGIN × extraMoves`, minimised over candidates × 4 holds. Both knobs are exported constants in `cross-ranker.js`. **Since the pick is now baked into `CrossSolutionData.ts`, retuning a knob requires a data regen** (see the pair-tracking regen command) — they are no longer live at runtime.

- **A third term, "staging", was tried and removed (July 2026).** The idea (the user's) was to reward building the cross in stages rather than having every piece interact at once. Two metrics were tried: "breaks an already-placed edge" was inert (~0 for nearly every optimal cross solution), and its replacement — area under the "edges done so far" curve — changed **~1% of picks** even after its own bug was fixed, because ergonomic differences between candidates dwarfed its ~0.25 spread. It only ever separated genuine ties. Removed as complexity for negligible benefit; the full story and numbers are in `docs/improvement-ideas.md` §5. **Ergonomics and the hold are what make the recommendations good.**
- `EXTRA_MOVE_MARGIN` exists because algSpeed already prices the extra move's turning time, so without it a +1 line wins on noise (8.0 vs 7.9). It charges the +1 line for memory load algSpeed doesn't model. At 1.5, +1 usage drops from ~35% → ~6%.

**Why it duplicates cross.js's state maths:** `cross.js` keeps `fullmv`/`pmul`/`fmul`/`cmv` private and exposes only `solve()`. Enumerating *all* solutions needs the state space directly, and the solver must not be touched — so `cross-states.js` rebuilds the tables from `mathlib`'s public exports. It is not guesswork: its BFS histogram is asserted against the state counts `cross.js` hardcodes in `getEasyCross`, and it throws if they disagree.

**Frames and holds:** everything works in `sols[1]`'s z2 frame (white bottom, green front → U=yellow, D=white, F=green, B=blue, L=red, R=orange). A hold is `k` y-rotations; `relabelForHold` maps `R→F, F→L, L→B, B→R` per rotation (holding the old R face in front means a move called R is now called F). `FRONT_COLOURS = [green, orange, blue, red]` for k=0..3.

**Cost:** none at runtime — it's precomputed. The offline pass is where the ~0.6s/scramble at level 8 (up to ~39k candidates × 4 holds) lands, ~10 min for all 8000. (An earlier iteration ran the ranker live on solution reveal, then warmed it on scramble draw to hide the lag; precomputing into a file superseded both — the browser never solves or ranks now.)

**Regenerating the README charts:**

```bash
node scripts/analyze-cross-ranking.mjs --all --emit-charts docs/img   # ~10 min — background it
```

`--emit-charts` refuses to run without `--all` (it fails fast): the figures are published, and a sample would publish sampling noise as fact. Emitting from this run is deliberate — the same pass asserts every recommended line actually solves the cross, so a chart can't drift from the code. It also writes the numbers as JSON, so a **restyle** (wording, colours) re-renders in a second with `node scripts/render-impact-charts.mjs` instead of costing another full run.

**Wired into pair tracking (since it graduated).** `PairTrackingData.ts` is now generated against the ranker's line, so the tracking reveal and the difficulty bucketing describe the same line the app shows — no more "which panel is which line" caveat. The two data files come from one `analyze-pair-tracking.mjs` pass and stay in lockstep.

**Measured: extra moves don't pay.** Gain from allowing N extra moves, vs the best optimal-length line across all 4 holds (levels 3–6, 80 scrambles):

| extra | avg gain | best case | % beats +0 | % beats by >1.5 |
|-------|----------|-----------|------------|-----------------|
| +1    | 0.02     | 2.50      | 39%        | 9%              |
| +2    | −0.39    | 2.00      | 28%        | 4%              |
| +3    | −0.86    | 1.60      | 23%        | 1%              |

**Don't build +2/+3** — they're monotonically worse and their best cases *shrink*, because algSpeed already charges each extra move's turning time and smoother fingertricks rarely repay it. (XCross is the thing that makes extra moves pay, because they buy an F2L pair; a plain cross only buys smoothness.) +1 survives only for the 9% that clear the margin.

### Pair-aware mode (July 2026)

An **advanced mode toggle** on the cross page: the solution may spend a little ergonomics to leave the first F2L pair in a better state — most visibly, keeping a pair that was already connected after the scramble instead of breaking it. Off by default (the user's progression principle: learn the pure ergonomic cross first). Full measurement and design record: `docs/improvement-ideas.md` §6; the user cube-verified the founding cases before it was built.

- **Selection:** `recommendPairAware()` in `cross-ranker.js` rescoring the same candidates as `recommend()` (all optimal/+1 lines × best hold) with `score + PAIR_WEIGHT × categoryRank`. Categories (user-ranked, in `pair-state.js`): solved > connected-U > both-U > connected-vertical > connected-slot > split > buried, judged by the best pair. `PAIR_WEIGHT = 1`, calibrated like `EXTRA_MOVE_MARGIN` was: it changes 27–55% of picks at levels 4–8 for a median sacrifice of 0.6–1.2 (≈ one move). Ties keep the ergonomic pick. A strict pair-first "phased" selection was measured (~3 sacrifice/pick) and rejected.
- **`pair-state.js`** is the oriented tracker that makes "connected" detectable: ordered sticker tuples (the position-only tracker's `sortPos` is exactly what discards orientation), hand-derived self-checks.
- **Data:** `PairAwareSolutionData.ts` ships 2-char meta per scramble (featured slot, +4 if pre-made; category) plus a **sparse** per-level map holding only the lines that differ — everything else falls back to `CrossSolutionData.ts` at lookup time. Alternate lines carry their own PairTrackingData-encoded features so the reveal describes the line on screen, plus the featured pair's category under the *ergonomic* line, which feeds the on-screen comparison row ("Ergonomic pick was … — this pair: corner buried in a slot") so the trade stays checkable line against line. The runtime reason/outcome sentences are built from the meta in `pair-aware-solution.ts` (`reasonFor()`/`outcomeFor()`), not shipped as text.
- **Known quirk:** the band **filter** (easy/medium/hard dropdown) still buckets by the ergonomic line's features even in pair-aware mode — only the reveal switches. Acceptable v1 trade; revisit if grades feel wrong in that mode.
- **Known quirk:** when the pair-aware line *solves* a pair outright, the tracking reveal recommends a different pair — right (a solved pair needs no tracking; the reveal answers "which pair to track next"), but the expanded per-pair row then calls the solved pair "excluded — corner ends in a slot", which reads oddly for a pair sitting solved in its slot.
- Retuning `PAIR_WEIGHT` (or the category ranking) requires the full three-file regen above.

### Line verdicts — removed (July 2026)

There used to be a "is the experimental line better?" dev-tools box (`line-feedback.service.ts`, `scripts/analyze-line-votes.mjs`, a `better / about the same / worse` vote) collecting evidence on whether the ranker's line beat the solver's. It was **removed** once the user judged the experimental line reliably better in hand — the vote had stopped earning its complexity. It started as a blind A/B, lost the blinding (a tell was obvious: solver lines are F/B-heavy, recommendations R/U-heavy), and finally went entirely. If the ranker ever needs re-validating against real hands, restore it from git history rather than rebuilding: the design notes on why an open preference report is biased toward the tool's own pick, and why the "worse" rows and by-face slices were the informative part, are in that history and in `docs/improvement-ideas.md` §5.

Measured effect over all 8000 scrambles (see `docs/improvement-ideas.md` §5 and the README charts): **49%** get a genuinely different line (0% at level 1, 99% at level 8); a further **35%** get the solver's own line in a better hold (`L D L` → `R D R` — the same solve from a better angle, and the free win); **4%** spend an extra move. Ergo gain averages ~5 at levels 7–8; F/B moves drop 3.23 → 2.83 at level 8.

**Cross solver (`cstimer/cross.js`):** BFS/IDA* solver operating on a compact cube state representation (permutation + flip indices). Exported as `cross.solve(scrambleString)`. These are vendored JS files compiled with `allowJs: true` in tsconfig — they are ES module format and do not have type declarations.

## OLL Trainer (secondary feature)

**Purpose:** Two-sided OLL recognition practice. User selects an OLL category, then drills cases from that category with a D3-rendered isometric cube view.

**Key files:**
- `src/app/oll-trainer-home/oll-alg-info/oll-alg-info.ts` — all 57 OLL cases as `OllAlg[]` (id, name, SVG src, type/category, alg string)
- `src/app/oll-trainer-home/oll-alg-info/oll-alg-types.ts` — OLL category constants
- `src/app/oll-selected-state.service.ts` — singleton sharing state between Select and Trainer pages via RxJS Subjects
- `src/app/oll-trainer-home/oll-select-page/` — radio form to pick category, pushes to service
- `src/app/oll-trainer-home/oll-trainer/d3-cube/d3-cube.component.ts` — D3 SVG isometric cube (renders U, L, F faces)
- `src/app/oll-trainer-home/oll-trainer/d3-cube/cube-state.service.ts` — simulates cube state, applies move sequences, exposes face arrays for rendering
- `src/app/oll-trainer-home/oll-trainer/oll-alg/oll-alg.component.ts` — lists algorithms filtered to current category
- `src/assets/oll-pics/` — 57 SVG diagrams (1.svg–57.svg), one per OLL case

**OLL categories** (types): dot, square, lightning, fish, knight move, edges oriented, corners oriented, awkward, p, t, c, w, and more.

**D3 cube rendering:** `D3CubeComponent.initCube()` calls `CubeStateService` to apply a reversed algorithm to a solved cube, then renders the resulting U/L/F sticker colours as three skewed SVG rect grids using CSS matrix transforms to fake isometric perspective. Clears the SVG with `d3.select("svg").remove()` before each redraw.

## Deployment

### Current setup (Cloudflare Workers — active)

Hosted on **Cloudflare Workers with static assets** (NOT Cloudflare Pages — the project type is Worker+Assets). Connected to GitHub `russdodd/cross-trainer`. Deploying to prod is **merging to `main`** — Cloudflare detects the push, builds, and deploys automatically. Live at `cross-trainer.russell-dodd.workers.dev` (and `russdodd.dev` once the custom domain is pointed here).

**Config files (all committed):**
- `wrangler.toml` — `name = "cross-trainer"`, `[assets] directory = "dist/cube-trainer/browser"` (the `browser/` subfolder is the esbuild application builder output), `not_found_handling = "single-page-application"` (SPA deep-link fallback — the Workers-native way)
- `.nvmrc` = `20` (Cloudflare Workers Builds uses this to select Node version)
- `package.json`: `build` = `ng build` (production build by default in Angular 20, no hacks needed); a `prebuild` step runs `scripts/gen-version.mjs`, which stamps `src/app/version.ts` with the build time + commit SHA so the deployed page shows when it was built (a fixed `.version-tag` in the bottom-right corner of `AppComponent`). npm runs `prebuild` automatically before `build`, so Cloudflare's `npm run build` picks it up. `version.ts` is committed as a **placeholder** (`dev build`); `ng serve`/`ng test` don't trigger `prebuild`, so it stays the placeholder locally and is only stamped for real during a deploy build. The commit SHA comes from a Cloudflare env var, falling back to `git rev-parse` (unverified against the live Workers Builds env — after the first deploy, confirm the corner shows a real SHA, not blank; the timestamp works regardless). **To tell a deploy has gone live: refresh and watch the corner timestamp change.**

**Cloudflare dashboard build settings (Settings → Build):**
- Build command: `npm run build`
- Deploy command (used for the **production branch**, `main`): `npx wrangler deploy` — 100% production traffic
- Non-production branch deploy command (used for every other branch): `npx wrangler versions upload` — uploads a version and prints a **preview alias URL** (`https://<branch-name>-cross-trainer.russell-dodd.workers.dev`), 0% production traffic
- Production branch: `main`
- (Do NOT prefix `npm install &&` to the build command — Cloudflare already does a clean install)

**Previewing before merge:** pushing any non-`main` branch makes Cloudflare build and upload a preview instance at `https://<branch-name>-cross-trainer.russell-dodd.workers.dev` (0% production traffic). This is the easy way to eyeball a change in a real deployed environment before merging to `main`.

**Important gotcha:** if the non-production branch deploy command is ever left as `npx wrangler deploy` (e.g. right after scaffolding a new Worker, or if reset), **every branch push deploys straight to 100% production traffic**, regardless of the "Production branch" setting — that setting alone does not protect prod. This bit us once (July 2026): a `modernize-angular` branch push briefly went live on `cross-trainer.russell-dodd.workers.dev` before the non-production command was corrected. Always verify Settings → Build has the two commands set differently before trusting branch pushes to be safe previews.

**Why Workers not Pages:** Misidentifying the project type causes deploy failures. `wrangler deploy` (Workers) vs `wrangler pages deploy` (Pages) are different commands. The `.workers.dev` URL and `versions upload` as the default deploy command are the tells.

### Legacy setup (DigitalOcean droplet — no longer used)

The original deploy was: SSH to a DO droplet → `git pull` → `docker-compose up`. The multi-stage `Dockerfile` (Node 12 build → nginx 1.16-alpine on port 80) and `docker-compose.yml` are kept in the repo for reference / local use but are **not** the active deploy path.

## Known quirks

- `cross.solve()` returns one solution per cross face (D, U, L, R, F, B); `sols[1]` — the white cross — is the only one used (offline, by the generation scripts). `sols[0]` is the D-face (yellow) cross, not metadata.
- `algSpeed()` returns an **error string**, not a number, for input it can't parse — always go through `ergonomics()` in `cross-ranker.js`, which throws rather than letting a NaN into a score. Its `ignoreauf` flag must stay `false`: with it on it silently strips a leading/trailing U, which is right for an alg with an AUF but wrong for a cross solution where every move is real.
- Level 8 is only **102 distinct cross states** in the whole space (all 1000 level-8 scrambles map onto them), which is why its candidate lists are so large.
- `npx ng test --watch=false --browsers=ChromeHeadless` is **green** and should stay that way — any failure is a real one. (Until July 2026 six scaffolded specs failed and had to be triaged by hand every run; they were fixed by giving each TestBed what its template actually needs — `FormsModule` for `ngModel`/`ngForm`, `provideRouter([])` for `routerLink`, `NO_ERRORS_SCHEMA` to stub heavy children like the D3 cube. `AppComponent`'s spec had been asserting the CLI starter's "app is running!" banner.)
- All components use `standalone: false` (NgModule-based architecture) — this is still fully supported in Angular 20 and was chosen to avoid a full standalone migration during the Angular 10→20 upgrade. `angular.json` schematics set `standalone: false` as the default for any newly generated components.
- `tsconfig.json` has `strictTemplates: false` — a deliberate trade-off made during the upgrade to avoid fixing all template binding types at once. Can be enabled as a follow-up.
- `package-lock.json` is **intentionally untracked** (removed in commit `57c3e820` so Cloudflare's Linux x64 build generates its own from a clean install; the old one was macOS ARM64). It regenerates locally on `npm install` / `ng build` and shows as `??` — **never commit it.**
