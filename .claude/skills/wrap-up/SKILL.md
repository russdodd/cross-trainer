---
name: wrap-up
description: End-of-session doc sync — distill this session's durable learnings into the central docs (CLAUDE.md, project skills) without duplicating git history or clobbering better existing info
---

# Session wrap-up: sync learnings to central docs

The goal is to keep sessions short and precise: each session ends by writing the
few things worth remembering into the docs, so the next session starts informed
instead of re-deriving context.

## What qualifies

Only **durable** knowledge — things a future session would otherwise have to
rediscover:

- New or changed workflows (deploy steps, preview URLs, build commands)
- Gotchas and invariants discovered the hard way (e.g. "lazy child routes must
  be relative to the module prefix")
- Corrections to existing docs that turned out wrong or stale
- New quirks for the CLAUDE.md "Known quirks" list
- Verification recipes → the `verify` skill, not CLAUDE.md

## What does NOT qualify

- **What changed and why** — that's the commit message; git history records it
- Session narrative ("we fixed X, then verified Y")
- Anything derivable from reading the code
- Anything only relevant to this one session

## How to write it

1. Review the session: list candidate learnings, filter hard against the
   criteria above. Zero learnings is a valid outcome — don't invent content.
2. For each learning, find where it belongs: the matching **existing section**
   of `CLAUDE.md`, or an existing project skill under `.claude/skills/`.
   Prefer editing in place over appending new sections.
3. **Before writing, read what's already there on that topic.** If existing
   text covers it better or more specifically, leave it alone or merge — never
   overwrite detail with a vaguer summary. If existing text is now wrong,
   correct it rather than adding a contradicting line elsewhere.
4. Keep each addition to 1–3 sentences. If it needs more, it's probably a new
   doc section or skill — say so and ask.
5. Show the user a one-line-per-edit summary of what was written where.
6. If the docs changed, offer to commit (docs: prefix); don't push to `main`
   without being asked — merging to `main` deploys.
