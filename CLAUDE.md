# cross-trainer

Personal speedcubing practice tool. Angular 20 SPA with two features: a **Cross Trainer** (actively used) and an **OLL Trainer** (rarely used). Deployed to Cloudflare Workers on merge to `main`.

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

**Purpose:** Practice solving the white cross and transitioning to F2L. User picks a difficulty level (1–8 moves to solve), gets a scramble, and can reveal the optimal solution.

**Key files:**
- `src/app/cross/cross.component.html` — level dropdown (1–8) + `<app-scramble>`
- `src/app/cross/cross.component.ts` — thin shell, no logic
- `src/app/scramble/scramble.component.ts` — all the logic
- `src/app/Scrambles.ts` — 8 arrays × 1000 pre-computed scrambles (character-encoded)
- `src/app/cstimer/cross.js` — cross solver (ported from cstimer)
- `src/app/cstimer/kernel.js`, `mathlib.js`, `mersenneTwister.js` — solver support libs

**Flow:**

1. User selects level and clicks "Get Scramble"
2. `ScrambleComponent.newScramble()` reads the level via `document.getElementById("Level")` (direct DOM access, not Angular binding)
3. Picks `scrambles[level-1][randomIndex]` — a character-encoded scramble string
4. Decodes each char using `charCodeAt - 'A'.charCodeAt(0)` as an index into `MoveNamesWCA`
5. Displays the resulting WCA-notation scramble string
6. "Get Solution" calls `cross.solve(scrambleStr)` → returns array of solution arrays; `sols[1]` is displayed (the first element `sols[0]` is skipped — likely a metadata entry)

**Scramble encoding:** Each character A–R maps to a move index. `MoveNamesWCA = ["R","R2","R'","B","B2","B'","L","L2","L'","F","F2","F'","D","D2","D'","U","U2","U'"]`. There is also a `MoveNames` array built in the same loop but never used — dead code.

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

**Important gotcha:** if the non-production branch deploy command is ever left as `npx wrangler deploy` (e.g. right after scaffolding a new Worker, or if reset), **every branch push deploys straight to 100% production traffic**, regardless of the "Production branch" setting — that setting alone does not protect prod. This bit us once (July 2026): a `modernize-angular` branch push briefly went live on `cross-trainer.russell-dodd.workers.dev` before the non-production command was corrected. Always verify Settings → Build has the two commands set differently before trusting branch pushes to be safe previews.

**Why Workers not Pages:** Misidentifying the project type causes deploy failures. `wrangler deploy` (Workers) vs `wrangler pages deploy` (Pages) are different commands. The `.workers.dev` URL and `versions upload` as the default deploy command are the tells.

### Legacy setup (DigitalOcean droplet — no longer used)

The original deploy was: SSH to a DO droplet → `git pull` → `docker-compose up`. The multi-stage `Dockerfile` (Node 12 build → nginx 1.16-alpine on port 80) and `docker-compose.yml` are kept in the repo for reference / local use but are **not** the active deploy path.

## Known quirks

- Level dropdown value is read via `document.getElementById` in `ScrambleComponent`, not Angular two-way binding.
- `TextScramble` (using `MoveNames`) is built in `newScramble()` but never used — dead code.
- `sols[0]` from `cross.solve()` is skipped; `sols[1]` is shown. The solver returns a header/metadata entry at index 0.
- All components use `standalone: false` (NgModule-based architecture) — this is still fully supported in Angular 20 and was chosen to avoid a full standalone migration during the Angular 10→20 upgrade. `angular.json` schematics set `standalone: false` as the default for any newly generated components.
- `tsconfig.json` has `strictTemplates: false` — a deliberate trade-off made during the upgrade to avoid fixing all template binding types at once. Can be enabled as a follow-up.
