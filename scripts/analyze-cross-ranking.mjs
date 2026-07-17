// Phase A analysis for human-optimal cross solutions.
//
// cross.solve() returns whichever optimal solution its IDA* search finds first,
// and since that search tries faces in the fixed order F, R, U, B, L, D, the
// answer skews towards F/B-heavy lines - the least finger-friendly faces. It also
// never says which face to hold in front.
//
// This script enumerates every optimal and optimal+1 solution, scores each across
// the 4 white-bottom holds (ergonomics via Trangium's algSpeed), and reports what
// changes vs what the trainer shows today, with worked samples to check against a
// real cube.
//
// The solver (src/app/cstimer/*) is used strictly read-only via cross.solve().
//
// Usage:
//   node scripts/analyze-cross-ranking.mjs                # 150 scrambles/level
//   node scripts/analyze-cross-ranking.mjs --sample 400
//   node scripts/analyze-cross-ranking.mjs --all          # all 8000 (slow, ~10 min)
//   node scripts/analyze-cross-ranking.mjs --samples 25   # worked examples to print
//   node scripts/analyze-cross-ranking.mjs --all --emit-charts docs/img
//                                                         # regenerate the README charts
//
// The charts are emitted from this run on purpose: the same pass that draws them
// is the one that asserts every recommended line actually solves the cross, so a
// published figure can never come from numbers nobody validated. Regenerate with
// --all - a sampled run would publish sampling noise as fact.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { renderImpactChart } from './impact-chart.mjs';
import { cross } from '../src/app/cstimer/cross.js';
import { distanceTable } from '../src/app/cross-ranker/cross-states.js';
import { rankSolutions, EXTRA_MOVE_MARGIN, FRONT_COLOURS } from '../src/app/cross-ranker/cross-ranker.js';
import { selfCheck, crossEdgesAfterScramble, crossSolved, applyMove, parseMove } from '../src/app/cross-ranker/cube-tracker.js';
import { algSpeed } from '../src/app/cross-ranker/algSpeed.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

// Scrambles.ts is plain JS; import it so the file stays the single source of truth.
const scramblesSrc = readFileSync(join(root, 'src/app/Scrambles.ts'), 'utf8');
const { scrambles } = await import(
  'data:text/javascript;base64,' + Buffer.from(scramblesSrc).toString('base64')
);

const MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];
const decodeScramble = (enc) => [...enc].map((ch) => MoveNamesWCA[ch.charCodeAt(0) - 65]).join(' ');

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? fallback : Number(process.argv[i + 1]);
};
const PER_LEVEL = process.argv.includes('--all') ? 1000 : arg('--sample', 150);
const N_SAMPLES = arg('--samples', 15);
const emitIdx = process.argv.indexOf('--emit-charts');
const EMIT_CHARTS = emitIdx === -1 ? null : process.argv[emitIdx + 1];
// Fail before the ~10 minute run, not after it.
if (EMIT_CHARTS && PER_LEVEL < 1000) {
  throw new Error(`--emit-charts needs --all: a ${PER_LEVEL}/level sample would publish sampling noise to the README`);
}

// z2 is its own inverse, so the same map takes a solving-frame move back to the
// WCA (white-top) frame the scramble is written in.
const Z2 = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'F', B: 'B' };
const toWcaFrame = (tokens) => tokens.map((t) => Z2[t[0]] + t.slice(1));

// ---------------------------------------------------------------------------
// Validation. Two independent checks that the recommended line really solves the
// cross: our own tracker, and the vendored solver itself.
// ---------------------------------------------------------------------------
function assertSolves(scrambleStr, baseTokens) {
  // 1. our tracker: scramble then solution, in the solving frame
  let state = crossEdgesAfterScramble(scrambleStr);
  for (const token of baseTokens) {
    const [face, power] = parseMove(token);
    state = state.map((e) => applyMove(e, face, power));
  }
  if (!crossSolved(state)) {
    throw new Error(`tracker says cross NOT solved\n  scramble: ${scrambleStr}\n  solution: ${baseTokens.join(' ')}`);
  }

  // 2. the solver: after scramble + solution the cross needs no further moves
  const combined = scrambleStr + ' ' + toWcaFrame(baseTokens).join(' ');
  const remaining = cross.solve(combined)[1];
  if (remaining.length !== 0) {
    throw new Error(
      `solver says cross NOT solved (needs ${remaining.length} more)\n  scramble: ${scrambleStr}\n  solution: ${baseTokens.join(' ')}`
    );
  }
}

// ---------------------------------------------------------------------------
// Analysis
// ---------------------------------------------------------------------------
const countFaces = (tokens, faces) => tokens.filter((t) => faces.includes(t[0])).length;

function analyze() {
  selfCheck();
  console.log('tracker self-checks passed');

  const t0 = Date.now();
  distanceTable();
  console.log(`distance table built and validated against cross.js's own state counts (${Date.now() - t0}ms)`);
  console.log(`\nextra-move margin: ${EXTRA_MOVE_MARGIN}  |  sample: ${PER_LEVEL}/level\n`);

  const rows = [];
  const samples = [];

  for (let level = 1; level <= 8; level++) {
    const stride = Math.max(1, Math.floor(1000 / PER_LEVEL));
    const stats = {
      level, n: 0, changed: 0, reheldOnly: 0, usedExtra: 0, holds: {}, ergoGain: [], fbBefore: 0, fbAfter: 0,
      candidates: 0, ms: 0,
    };

    for (let i = 0; i < 1000 && stats.n < PER_LEVEL; i += stride) {
      const scrambleStr = decodeScramble(scrambles[level - 1][i]);

      // what the trainer shows today
      const current = cross.solve(scrambleStr)[1].map((s) => s.trim());

      const t = Date.now();
      const { ranked, candidateCount } = rankSolutions(scrambleStr, 1);
      stats.ms += Date.now() - t;
      const best = ranked[0];

      assertSolves(scrambleStr, best.base);
      if (!ranked.some((r) => r.base.join(' ') === current.join(' '))) {
        throw new Error(`cross.js's own solution is missing from the candidate set\n  scramble: ${scrambleStr}\n  cross.js: ${current.join(' ')}`);
      }

      const currentErgo = algSpeed(current.join(' '), false, false);

      stats.n++;
      stats.candidates += candidateCount;
      // `base` is the canonical green-front statement of a line, so a difference
      // there is a genuinely different set of turns. Same base + a different hold
      // is the SAME physical solve, just described from another angle - counted
      // separately rather than folded in, or the headline would flatter itself.
      const sameLine = best.base.join(' ') === current.join(' ');
      if (!sameLine) stats.changed++;
      if (sameLine && best.holdColour !== FRONT_COLOURS[0]) stats.reheldOnly++;
      if (best.extraMoves > 0) stats.usedExtra++;
      stats.holds[best.holdColour] = (stats.holds[best.holdColour] || 0) + 1;
      stats.ergoGain.push(currentErgo - best.ergo);
      stats.fbBefore += countFaces(current, 'FB');
      stats.fbAfter += countFaces(best.moves, 'FB');

      if (samples.length < N_SAMPLES && level >= 3 && (i / stride) % 17 === 0) {
        samples.push({ level, scrambleStr, current, currentErgo, best });
      }
    }
    rows.push(stats);
  }

  // ---- report ----
  const pct = (a, b) => ((100 * a) / b).toFixed(0) + '%';
  const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;

  console.log('Recommended vs what the trainer shows today');
  console.log('(ergo gain: how much faster to execute, in algSpeed units, bigger is better)');
  console.log('lvl    n   changed  used +1   avg ergo gain   F/B moves        avg cands   ms/scramble');
  for (const r of rows) {
    const fb = `${(r.fbBefore / r.n).toFixed(2)} -> ${(r.fbAfter / r.n).toFixed(2)}`;
    console.log(
      `  ${r.level}  ${String(r.n).padStart(4)}  ${pct(r.changed, r.n).padStart(6)}  ${pct(r.usedExtra, r.n).padStart(7)}   ` +
      `${avg(r.ergoGain).toFixed(2).padStart(12)}   ${fb.padEnd(14)}  ${String(Math.round(r.candidates / r.n)).padStart(7)}   ${(r.ms / r.n).toFixed(0).padStart(6)}`
    );
  }

  const allHolds = {};
  for (const r of rows) for (const [k, v] of Object.entries(r.holds)) allHolds[k] = (allHolds[k] || 0) + v;
  const totalN = rows.reduce((a, r) => a + r.n, 0);
  console.log('\nRecommended hold (front face):');
  for (const [colour, n] of Object.entries(allHolds).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${colour.padEnd(7)} ${String(n).padStart(5)}  ${pct(n, totalN)}`);
  }

  const totalChanged = rows.reduce((a, r) => a + r.changed, 0);
  const totalExtra = rows.reduce((a, r) => a + r.usedExtra, 0);
  const totalReheld = rows.reduce((a, r) => a + r.reheldOnly, 0);
  console.log(`\nOverall: ${pct(totalChanged, totalN)} of scrambles get a genuinely different line; a further ${pct(totalReheld, totalN)} get the solver's own line in a better hold; ${pct(totalExtra, totalN)} spend an extra move.`);
  console.log(`Validated: every recommended line solves the cross, by both our tracker and the solver (${totalN} scrambles).`);

  if (EMIT_CHARTS) {
    const chartRows = rows.map((r) => ({
      level: r.level,
      changedPct: (100 * r.changed) / r.n,
      extraPct: (100 * r.usedExtra) / r.n,
      reheldOnlyPct: (100 * r.reheldOnly) / r.n,
      n: r.n,
    }));
    mkdirSync(join(root, EMIT_CHARTS), { recursive: true });
    for (const mode of ['light', 'dark']) {
      const path = join(root, EMIT_CHARTS, `cross-ranker-impact-${mode}.svg`);
      writeFileSync(path, renderImpactChart(chartRows, mode));
      console.log(`wrote ${path}`);
    }
    // The numbers alongside the picture, so a restyle doesn't cost another
    // 10-minute run and the published figure stays auditable.
    const dataPath = join(root, EMIT_CHARTS, 'cross-ranker-impact.json');
    writeFileSync(dataPath, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), perLevel: chartRows }, null, 2) + '\n');
    console.log(`wrote ${dataPath}`);
  }

  console.log('\n' + '='.repeat(78));
  console.log('WORKED EXAMPLES - check these against a cube');
  console.log('='.repeat(78));
  for (const s of samples) {
    console.log(`\nLevel ${s.level}  scramble:  ${s.scrambleStr}`);
    console.log(`  today      green front  ${s.current.join(' ').padEnd(26)} ergo ${s.currentErgo.toFixed(1).padStart(4)}`);
    console.log(`  recommend  ${(s.best.holdColour + ' front').padEnd(12)} ${s.best.moves.join(' ').padEnd(26)} ergo ${s.best.ergo.toFixed(1).padStart(4)}${s.best.extraMoves ? '  (+1 move)' : ''}`);
    if (s.best.base.join(' ') !== s.current.join(' ')) {
      console.log(`             (the same recommended line, stated green-front: ${s.best.base.join(' ')})`);
    } else {
      console.log(`             (same moves as today - only the hold changed)`);
    }
  }
}

analyze();
