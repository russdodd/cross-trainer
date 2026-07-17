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

**Purpose:** Practice solving the white cross and transitioning to F2L. User picks a difficulty range (1–8 moves to solve; the "to" dropdown snaps to the "from" value so single-level practice needs one click) and optionally a first-pair tracking band, gets a scramble from a random level in the range, and can reveal the optimal solution (labelled with the picked level) plus how each F2L pair behaves during it.

**Key files:**
- `src/app/cross/cross.component.html` — `.controls` flex row (from/to level dropdowns 1–8, tracking band dropdown + its collapsible methodology explainer), + `<app-scramble>`
- `src/app/cross/cross.component.ts` — holds `minLevel`/`maxLevel` range state (To options filtered to ≥ From), `trackingBand`, and `showMethodology`
- `src/app/scramble/scramble.component.ts` — all the logic
- `src/app/Scrambles.ts` — 8 arrays × 1000 pre-computed scrambles (character-encoded)
- `src/app/pair-tracking.ts` — first-pair tracking difficulty model (see below)
- `src/app/PairTrackingData.ts` — **generated**; per-scramble pair features
- `scripts/analyze-pair-tracking.mjs` — generates the above; the analysis/validation harness
- `src/app/tracking-feedback.service.ts` — dev tools rating store (see below)
- `src/app/line-feedback.service.ts` — dev tools blind line-vote store (see below)
- `scripts/analyze-line-votes.mjs` — reads an exported line-votes CSV and reports agreement
- `src/app/cross-ranker/` — **experimental** human-optimal solution ranking (see below)
- `scripts/analyze-cross-ranking.mjs` — its analysis/validation harness
- `src/app/cstimer/cross.js` — cross solver (ported from cstimer)
- `src/app/cstimer/kernel.js`, `mathlib.js`, `mersenneTwister.js` — solver support libs

**⚠️ Never modify the `src/app/cstimer/*` files.** They are fragile vendored code with no tests, and busting the solver breaks the whole trainer. Call `cross.solve()` read-only; build any cube maths you need as a separate module.

**Flow:**

1. User selects a level range and clicks "Get Scramble"
2. `ScrambleComponent.newScramble()` gets the range via `@Input() minLevel/maxLevel` (bound from `CrossComponent` via `ngModel`) and picks a uniform random level in it
3. Picks `scrambles[level-1][randomIndex]` — a character-encoded scramble string
4. Decodes each char using `charCodeAt - 'A'.charCodeAt(0)` as an index into `MoveNamesWCA`
5. Displays the resulting WCA-notation scramble string
6. "Get Solution" calls `cross.solve(scrambleStr)` → returns **6 solutions, one per cross face, in order D, U, L, R, F, B** (see `faceStr`, cross.js:210). `sols[1]` is the white/U cross and is what's displayed, alongside the picked level ("Solution (Level 6)"). Its moves are in the **z2-rotated frame** — i.e. as you'd actually execute them after flipping white to the bottom; `moveIdx[1]` (`"FLDBRU"`) is the original→z2 letter mapping.
7. The pair-tracking reveal is rendered from `PairTrackingData.ts` (a lookup, no extra solving)

**Scramble encoding:** Each character A–R maps to a move index. `MoveNamesWCA = ["R","R2","R'","B","B2","B'","L","L2","L'","F","F2","F'","D","D2","D'","U","U2","U'"]`.

### First-pair tracking difficulty

Grades each scramble by how hard it is to track the first F2L pair through the displayed cross solution. Two axes:

- **Favourability (filter):** a pair is only worth tracking if its **corner ends in the U layer**. Once the cross is solved a corner can only be on top or stuck in an F2L slot (and an edge only in U or an E-slice slot — the cross occupies every D edge slot), so a corner in D always means an extraction.
- **Disruptions (dial):** how many solution moves displace either piece, counted even if a later move puts it back. A scramble is graded by its **best qualifying pair**, since that's the one a solver would pick. Bands: easy ≤2, medium 3–4, hard 5+.

Levels 1–2 have no hard cases and every level has ~11–16 scrambles with no qualifying pair, so empty band × level combinations are real and the UI shows a message instead of a scramble. Full distribution and rationale: `docs/improvement-ideas.md` §4.

**Regenerating the data** (only needed if the model or thresholds change):

```bash
node scripts/analyze-pair-tracking.mjs --emit-ts src/app/PairTrackingData.ts
```

The script is self-validating: it asserts the cross is genuinely solved after applying scramble + solution for all 8000 scrambles (which checks the tracker, the z2 frame mapping and the solver call together), and that the emitted data round-trips. `pair-tracking.spec.ts` asserts the shipped data reproduces the expected distribution — it will fail if the script's encoder and `pair-tracking.ts`'s decoder ever drift apart.

### Dev tools rating box

The easy/medium/hard thresholds above were chosen analytically and have never been validated in hand. The dev tools box at the bottom of the cross trainer collects the evidence to settle that: rate each scramble **too hard / ok / too easy**, then export the CSV and see whether the ratings line up with the grades the model assigned.

- `TrackingFeedbackService` (`providedIn: 'root'`) wraps `localStorage` key `cross-trainer.tracking-feedback.v1` — a JSON array of `TrackingFeedbackRecord` (`timestamp`, `rating`, `level`, `grade`, `bandFilter`, `solutionRevealed`, `scrambleIndex`, `scramble`). `toCsv()` emits those as columns in that order.
- **Submit is the only writer.** Getting a new scramble without submitting records nothing — a skipped rating is silence, not a verdict of "ok". `ScrambleComponent.resetRating()` clears the selection on every `newScramble()`.
- **One vote per draw.** `canSubmit` gates on `!submitted`, so re-clicking Submit (or forgetting you already voted) can't double-count. The gate is on the **Get Scramble click, not the scramble's identity** — drawing the same case again tomorrow is a genuine second data point and does record. Note the guard lives in the model, checked synchronously in `submitRating()`; the template's `*ngIf` hiding the buttons is cosmetic, and a DOM-only guard would lose the race to a fast double-click.
- `solutionRevealed` is a **latch** set in `toggleSolution()`, not a read of the current button state — hiding the solution again doesn't un-see it.
- Reads are defensive (`try`/`catch` → `[]`): a corrupt or hand-edited key must never break the trainer.
- **No backend, and no network surface** — "service" here is Angular DI, not an API. `wrangler.toml` stays assets-only.

**⚠️ localStorage is origin-scoped, and this is the sharp edge.** `localhost:4200`, a branch preview (`<branch>-cross-trainer.russell-dodd.workers.dev`), prod (`cross-trainer.russell-dodd.workers.dev`) and the planned `russdodd.dev` custom domain each keep a **separate store that never merges**. Collect real data on prod only; treat localhost and preview ratings as throwaway. Pointing `russdodd.dev` at this Worker will look like the history vanished — it hasn't, it's parked on `workers.dev` — so **export the CSV before any domain move**. The CSV is also the only backup against clearing browsing data.

### Human-optimal solutions + hold guidance (experimental)

`src/app/cross-ranker/` picks a line that's nicer to *execute* than the one the solver returns, and says how to hold the cube for it. Shown in a dashed "Experimental" panel under the solver's line. **Clearly marked as experimental on purpose** — it's an unproven model, and the solver's line stays the primary answer.

Why it exists: `cross.solve()` returns whichever optimal line its IDA* search reaches first, and that search tries faces in the fixed order F, R, U, B, L, D — so the answer skews **F/B-heavy**, the least finger-friendly faces. It also never says which face to hold in front.

| File | Role |
|---|---|
| `cross-states.js` | Exact BFS distance table over all 190,080 cross states + enumeration of every optimal / optimal+1 line |
| `algSpeed.js` | **Vendored** from [Trangium's MovecountCoefficient](https://github.com/trangium/trangium.github.io) (MIT, © 2021 trangium). Simulates grips/fingertricks; lower = faster. Body verbatim; only a header + `export` added |
| `cube-tracker.js` | Oriented cross-edge tracker (position **and** orientation, unlike the pair-tracking one) + the `staged` metric |
| `cross-ranker.js` | Scores candidates × 4 holds; `ergonomics()` is the only caller of algSpeed |

**Scoring:** `score = ergonomics + EXTRA_MOVE_MARGIN × extraMoves − STAGING_WEIGHT × staged`. All three knobs are exported constants in `cross-ranker.js`, tunable without regenerating anything.

- `staged` (0–1) is the area under the "cross edges done so far" curve: 1 = built in stages, 0 = everything lands on the last move. It replaced a "breaks a placed edge" metric that was **inert** (~0 for nearly every optimal cross solution).
- `staged` is **alignment-tolerant**: an edge on the bottom, white down, in the right relative order is counted done, because one final D aligns the whole cross and nobody tracks those pieces meanwhile. `solvedCountAligned` takes the best single D offset. It is self-limiting — two bottom edges in the wrong relative order credit 1, not 2, since no offset places both. **`crossSolved` stays strict** (the validation harness depends on it: an unaligned cross genuinely isn't solved).
- **Staging is close to inert in practice.** At `STAGING_WEIGHT = 1.5` it changes ~1% of picks (2.5 → ~4%), and where it does, the ergo and staged deltas are ~0.00 — it only separates genuine ties, because ergonomic differences between candidates dwarf staged's ~0.25 spread. That's the intended design, but it means **staging is not what makes the recommendations good** — ergonomics and the hold are. The blind line votes are the way to settle whether it deserves more weight.
- `EXTRA_MOVE_MARGIN` exists because algSpeed already prices the extra move's turning time, so without it a +1 line wins on noise (8.0 vs 7.9). It charges the +1 line for memory load algSpeed doesn't model. At 1.5, +1 usage drops from ~35% → ~6%.

**Why it duplicates cross.js's state maths:** `cross.js` keeps `fullmv`/`pmul`/`fmul`/`cmv` private and exposes only `solve()`. Enumerating *all* solutions needs the state space directly, and the solver must not be touched — so `cross-states.js` rebuilds the tables from `mathlib`'s public exports. It is not guesswork: its BFS histogram is asserted against the state counts `cross.js` hardcodes in `getEasyCross`, and it throws if they disagree.

**Frames and holds:** everything works in `sols[1]`'s z2 frame (white bottom, green front → U=yellow, D=white, F=green, B=blue, L=red, R=orange). A hold is `k` y-rotations; `relabelForHold` maps `R→F, F→L, L→B, B→R` per rotation (holding the old R face in front means a move called R is now called F). `FRONT_COLOURS = [green, orange, blue, red]` for k=0..3.

**Cost:** distance table ~40ms once; ranking is <20ms at typical levels but **~0.6s at level 8** (up to ~39k candidates × 4 holds). Runs on solution reveal, not scramble draw. If it ever feels janky, prefilter with a cheap weight table before algSpeed.

**Not wired into pair tracking.** `PairTrackingData.ts` describes the *solver's* line and was deliberately not regenerated, so the UI labels which panel describes which line. Revisit only if the experiment graduates.

**Measured: extra moves don't pay.** Gain from allowing N extra moves, vs the best optimal-length line across all 4 holds (levels 3–6, 80 scrambles):

| extra | avg gain | best case | % beats +0 | % beats by >1.5 |
|-------|----------|-----------|------------|-----------------|
| +1    | 0.02     | 2.50      | 39%        | 9%              |
| +2    | −0.39    | 2.00      | 28%        | 4%              |
| +3    | −0.86    | 1.60      | 23%        | 1%              |

**Don't build +2/+3** — they're monotonically worse and their best cases *shrink*, because algSpeed already charges each extra move's turning time and smoother fingertricks rarely repay it. (XCross is the thing that makes extra moves pay, because they buy an F2L pair; a plain cross only buys smoothness.) +1 survives only for the 9% that clear the margin.

### Blind line voting (dev tools)

`line-feedback.service.ts` + the "Blind line comparison" toggle exist because `STAGING_WEIGHT` / `EXTRA_MOVE_MARGIN` were calibrated from score distributions, not from anyone's hands.

**It has to be a mode, not a panel:** the solver's line is displayed prominently and the experimental panel names its pick, so a vote shown next to them wouldn't be blind. With the toggle on, "Get Solution" reveals *only* an A/B — solver line, experimental panel **and pair tracking** all stay hidden (pair tracking describes the solver's line, so it leaks). Sides are randomised; after voting everything reveals plus which side was which. `ScrambleComponent.revealVisible` / `voteVisible` gate this, and specs cover the no-leak property.

Separate store from `tracking-feedback.service.ts` on purpose: that rates how hard a pair is to **track**, this rates how nice a line is to **turn**. One store per question keeps both answerable. Export the CSV and run `node scripts/analyze-line-votes.mjs <csv>` — it slices agreement by `holdsOnly` (is the hold advice real?) and `extraMoves` (is the margin right?).

Measured effect (see `docs/improvement-ideas.md` §5): ~52% of scrambles get a different line; ergo gain averages ~5 at levels 7–8; F/B moves drop 3.28 → 2.87 at level 8. Often the moves don't change at all and only the hold does (`L D L` → `R D R`), which is a free win.

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
- `package.json`: `build` = `ng build` (production build by default in Angular 20, no hacks needed)

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

- `cross.solve()` returns one solution per cross face (D, U, L, R, F, B); `sols[1]` — the white cross — is the only one used. `sols[0]` is the D-face (yellow) cross, not metadata.
- `algSpeed()` returns an **error string**, not a number, for input it can't parse — always go through `ergonomics()` in `cross-ranker.js`, which throws rather than letting a NaN into a score. Its `ignoreauf` flag must stay `false`: with it on it silently strips a leading/trailing U, which is right for an alg with an AUF but wrong for a cross solution where every move is real.
- Level 8 is only **102 distinct cross states** in the whole space (all 1000 level-8 scrambles map onto them), which is why its candidate lists are so large.
- `npx ng test --watch=false --browsers=ChromeHeadless` is **green** and should stay that way — any failure is a real one. (Until July 2026 six scaffolded specs failed and had to be triaged by hand every run; they were fixed by giving each TestBed what its template actually needs — `FormsModule` for `ngModel`/`ngForm`, `provideRouter([])` for `routerLink`, `NO_ERRORS_SCHEMA` to stub heavy children like the D3 cube. `AppComponent`'s spec had been asserting the CLI starter's "app is running!" banner.)
- All components use `standalone: false` (NgModule-based architecture) — this is still fully supported in Angular 20 and was chosen to avoid a full standalone migration during the Angular 10→20 upgrade. `angular.json` schematics set `standalone: false` as the default for any newly generated components.
- `tsconfig.json` has `strictTemplates: false` — a deliberate trade-off made during the upgrade to avoid fixing all template binding types at once. Can be enabled as a follow-up.
