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

## Flows worth driving

- **Cross trainer** (`/cross-component`): two level dropdowns (changing "from" snaps "to" to match; "to" options filtered to ≥ "from"); "Get Scramble" → WCA move string appears; "Get Solution" → solution line appears with "(Level N)" in the Solution heading.
- **OLL trainer** (`/oll-trainer-home`): "Select" nav link → `/oll-trainer-home/select`, 14 radio buttons; "Trainer" nav link → `/oll-trainer-home/cube`, D3 SVG cube with 27 `rect` stickers. Also deep-link each URL directly (SPA fallback path).

## Gotchas

- OLL child routes are registered under the lazy `oll-trainer-home` prefix (see `oll-trainer-home.routes.ts`); child paths must be relative (`select`, `cube`), not `oll-trainer-home/select`.
- Stop the server with `lsof -ti :4299 | xargs kill` (background task will report exit 143 — that's the SIGTERM, not a failure).
- Angular re-renders **asynchronously** after events: reading the DOM immediately after a Playwright `click()`/`selectOption()` races the render and produces false failures (stale text, missing elements). Poll for the expected DOM state before asserting instead of reading right after the action.
