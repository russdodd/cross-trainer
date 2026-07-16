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
- `src/app/cross/cross.component.html` — from/to level dropdowns (1–8), tracking band dropdown, + `<app-scramble>`
- `src/app/cross/cross.component.ts` — holds `minLevel`/`maxLevel` range state (To options filtered to ≥ From) and `trackingBand`
- `src/app/scramble/scramble.component.ts` — all the logic
- `src/app/Scrambles.ts` — 8 arrays × 1000 pre-computed scrambles (character-encoded)
- `src/app/pair-tracking.ts` — first-pair tracking difficulty model (see below)
- `src/app/PairTrackingData.ts` — **generated**; per-scramble pair features
- `scripts/analyze-pair-tracking.mjs` — generates the above; the analysis/validation harness
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
- Existing component specs (`CrossComponent`, `AppComponent`, the four `Oll*` ones) fail on `main` due to incomplete TestBed configs (missing `FormsModule` / child declarations). Pre-existing, unrelated to any feature work — 6 failures, 7 passing was the baseline before pair tracking added 8 passing specs.
- All components use `standalone: false` (NgModule-based architecture) — this is still fully supported in Angular 20 and was chosen to avoid a full standalone migration during the Angular 10→20 upgrade. `angular.json` schematics set `standalone: false` as the default for any newly generated components.
- `tsconfig.json` has `strictTemplates: false` — a deliberate trade-off made during the upgrade to avoid fixing all template binding types at once. Can be enabled as a follow-up.
