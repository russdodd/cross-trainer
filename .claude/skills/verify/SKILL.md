---
name: verify
description: Build, run, and drive cross-trainer to verify changes at the UI surface
---

# Verifying cross-trainer changes

Angular 20 SPA, no backend. All verification happens in the browser against `ng serve`.

## Launch

```bash
npx ng serve --port 4299   # run in background; up in ~15s, logs "Application bundle generation complete"
curl -s -o /dev/null -w "%{http_code}" http://localhost:4299/   # 200 when ready
```

## Drive (headless browser)

Playwright is NOT in this repo's deps. Install it in the scratchpad (`npm init -y && npm i playwright`), then launch Chromium with an explicit `executablePath` pointing at the newest cached browser under `~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell` — the npm-installed playwright version usually mismatches the cached browser revision and `npx playwright install` is a big download.

Collect console errors (`page.on('console')` / `page.on('pageerror')`) — Angular router failures like `NG04002: Cannot match any routes` are silent in the UI (clicks appear to do nothing) and only show up in the console.

**Screenshot and actually look at it — DOM assertions pass on invisible output.** Two real bugs did exactly that: a panel nested inside `.outder` (the purple solution box, white text) kept the inherited white ink on its own light background and rendered unreadable, and a chart label wider than its bar was silently clipped. Both were present and correct in the DOM. `page.screenshot({ path, fullPage: true })`, then read the image.

## Flows worth driving

- **Cross trainer** (`/cross-component`): three dropdowns — two level ones (changing "from" snaps "to" to match; "to" options filtered to ≥ "from") and a first-pair tracking band; "Get Scramble" → WCA move string appears; "Get Solution" → solution line appears with "(Level N)" in the Solution heading, plus four `.pair-row` entries with `.pair-recommended` on the best pair. Band + level combinations that hold no scrambles (e.g. Hard at levels 1–2) are expected: they render `.pair-message` and clear the scramble rather than drawing. `.methodology-toggle`, under the tracking dropdown, expands `.methodology-panel`.
  Also on reveal: `.human-reveal` (the experimental line + its hold) — drive it at **level 8**, both because that is the ~0.6s worst case and because it always has an alternative line to show. One `.dev-tools` block (tracking-difficulty rating) follows the solution; its buttons use the `.rating-option` / `.rating-submit` classes, so select within the block rather than by text — "A"-style labels collide with other elements.
- **OLL trainer** (`/oll-trainer-home`): "Select" nav link → `/oll-trainer-home/select`, 14 radio buttons; "Trainer" nav link → `/oll-trainer-home/cube`, D3 SVG cube with 27 `rect` stickers. Also deep-link each URL directly (SPA fallback path).

## Gotchas

- OLL child routes are registered under the lazy `oll-trainer-home` prefix (see `oll-trainer-home.routes.ts`); child paths must be relative (`select`, `cube`), not `oll-trainer-home/select`.
- Stop the server with `lsof -ti :4299 | xargs kill` (background task will report exit 143 — that's the SIGTERM, not a failure).
- Angular re-renders **asynchronously** after events: reading the DOM immediately after a Playwright `click()`/`selectOption()` races the render and produces false failures (stale text, missing elements). Poll for the expected DOM state before asserting instead of reading right after the action.
- Do **not** poll by stamping a sentinel into the DOM (`el.textContent = '__PENDING__'`) and waiting for it to change: overwriting `textContent` destroys the text node the `{{ }}` binding holds a reference to, so Angular's next update goes to a detached node and the wait never resolves. Capture the previous rendered value and wait for it to differ instead.
- `selectOption('easy')` fails with "did not find some options" on any `[ngValue]` select — Angular encodes those option values as `"0: 'easy'"`, not the bare value. Select by `{ index }` or by label.
