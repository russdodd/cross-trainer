# cross-trainer

Personal speedcubing practice tool. Angular 10 SPA with two features: a **Cross Trainer** (actively used) and an **OLL Trainer** (rarely used). Deployed via Docker → nginx.

## Stack

- Angular 10 / TypeScript
- D3.js (OLL cube visualisation)
- Docker multi-stage build (Node build → nginx static serve)
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

**Cross solver (`cstimer/cross.js`):** BFS/IDA* solver operating on a compact cube state representation (permutation + flip indices). Exported as `cross.solve(scrambleString)`.

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

### Current setup (Cloudflare Pages — active)

Hosted on **Cloudflare Pages**, connected to the GitHub repo (`russdodd/cross-trainer`). Deploying to prod is just **merging to `main`** — Cloudflare detects the push, builds, and deploys automatically. PR branches get free preview URLs.

Cloudflare free tier also manages the `russdodd.dev` domain (DNS + proxy). The Pages custom domain wiring lives in the same Cloudflare account.

**Build config (set in the Cloudflare Pages dashboard):**
- Build command: `npm install && npm run build`
- Output directory: `dist/cube-trainer` (from `angular.json` → `outputPath`)
- Node version: 14 (pinned via `.nvmrc`; Angular 10 does not build cleanly on modern Node)

**SPA routing:** `src/_redirects` (copied into `dist/cube-trainer/_redirects` at build time via `angular.json` assets) contains `/* /index.html 200` so deep links and browser refreshes resolve to the app instead of 404ing.

### Legacy setup (DigitalOcean droplet — no longer used)

The original deploy was: SSH to a DO droplet → `git pull` → `docker-compose up`. The multi-stage `Dockerfile` (Node 12 build → nginx 1.16-alpine on port 80) and `docker-compose.yml` are kept in the repo for reference / local use but are **not** the active deploy path.

## Known quirks

- Level dropdown value is read via `document.getElementById` in `ScrambleComponent`, not Angular two-way binding.
- `TextScramble` (using `MoveNames`) is built in `newScramble()` but never used — dead code.
- `sols[0]` from `cross.solve()` is skipped; `sols[1]` is shown. The solver returns a header/metadata entry at index 0.
- Angular version is 10 (2020); the lazy-loaded OLL module uses the old string-based syntax (`'./oll-trainer-home/oll-trainer-home.module#OllTrainerHomeModule'`).
