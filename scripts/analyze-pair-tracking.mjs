// Phase A analysis for first-pair tracking difficulty.
//
// For every pre-computed scramble, tracks each of the 4 F2L pairs (white corner +
// matching E-slice edge) through the displayed optimal cross solution and records:
//   - how many solution moves displace the corner / the edge ("disruptions")
//   - which layer each piece ends in (U = top while solving, E = middle, D = bottom)
//
// The solver (src/app/cstimer/*) is used strictly read-only via cross.solve().
// All cube math here is an independent piece tracker, self-checked before use and
// cross-validated by asserting the solution actually solves the cross for all
// 8000 scrambles.
//
// Frames: scrambles are applied white-top/green-front (WCA). cross.solve()'s
// sols[1] is the white cross with moves in the z2-rotated frame (white flipped to
// the bottom, as you'd actually solve). This script works entirely in that solving
// frame: the scramble is mapped through z2 and the solution applies as-is.
//
// Usage: node scripts/analyze-pair-tracking.mjs [--features-out <path.json>]

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { cross } from '../src/app/cstimer/cross.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

// ---------------------------------------------------------------------------
// Load scramble data (Scrambles.ts is plain JS; import it via a data URL so the
// file stays the single source of truth)
// ---------------------------------------------------------------------------
const scramblesSrc = readFileSync(join(root, 'src/app/Scrambles.ts'), 'utf8');
const { scrambles } = await import(
  'data:text/javascript;base64,' + Buffer.from(scramblesSrc).toString('base64')
);

const MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];
const decodeScramble = (enc) =>
  [...enc].map((ch) => MoveNamesWCA[ch.charCodeAt(0) - 65]).join(' ');

// ---------------------------------------------------------------------------
// Piece tracker: a position is a sorted string of face letters ("DFR", "FR").
// A quarter turn of face X sends the other face letters of any position on X
// through the rotation map below; pieces not on X don't move. Orientation is
// irrelevant here — a face turn always changes the position of every piece on
// that face, so "displaced" is fully captured by position change.
// ---------------------------------------------------------------------------
const ROT = {
  U: { F: 'L', L: 'B', B: 'R', R: 'F' },
  D: { F: 'R', R: 'B', B: 'L', L: 'F' },
  R: { F: 'U', U: 'B', B: 'D', D: 'F' },
  L: { F: 'D', D: 'B', B: 'U', U: 'F' },
  F: { U: 'R', R: 'D', D: 'L', L: 'U' },
  B: { U: 'L', L: 'D', D: 'R', R: 'U' },
};

const sortPos = (s) => [...s].sort().join('');

function applyMove(pos, face, power) {
  if (!pos.includes(face)) return pos;
  let cur = pos;
  for (let i = 0; i < power; i++) {
    cur = sortPos([...cur].map((f) => (f === face ? f : ROT[face][f])));
  }
  return cur;
}

// "R2" / "U" / "F'" -> [face, power]
function parseWcaMove(tok) {
  const face = tok[0];
  const power = tok[1] === '2' ? 2 : tok[1] === "'" ? 3 : 1;
  return [face, power];
}

// solver solution entry: 2 chars, letter + one of " 2'"
function parseSolMove(tok) {
  const face = tok[0];
  const power = tok[1] === '2' ? 2 : tok[1] === "'" ? 3 : 1;
  return [face, power];
}

// z2 relabel: the scramble is executed in the original (white-top) frame; to work
// in the solving frame every scramble move letter maps through z2.
const Z2 = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'F', B: 'B' };

function scrambleMovesInSolvingFrame(scrambleStr) {
  return scrambleStr.split(' ').map((tok) => {
    const [face, power] = parseWcaMove(tok);
    return [Z2[face], power];
  });
}

// ---------------------------------------------------------------------------
// Pieces of interest (IDs = home position in the solving frame: white on D,
// green on F; so U = yellow, R = orange, L = red, B = blue)
// ---------------------------------------------------------------------------
const COLOR = { U: 'yellow', D: 'white', F: 'green', B: 'blue', L: 'red', R: 'orange' };
const PAIRS = ['FR', 'FL', 'BR', 'BL'].map((slot) => ({
  slot,
  corner: sortPos('D' + slot),
  edge: sortPos(slot),
  colors: [...slot].map((f) => COLOR[f]).join('-'),
}));
const CROSS_EDGES = ['DF', 'DR', 'DB', 'DL'].map(sortPos);

const layerOf = (pos) => (pos.includes('U') ? 'U' : pos.includes('D') ? 'D' : 'E');

// conventional cubing order for display: UBL not "BLU"
const DISPLAY_ORDER = 'UDFBLR';
const displayPos = (pos) =>
  [...pos].sort((a, b) => DISPLAY_ORDER.indexOf(a) - DISPLAY_ORDER.indexOf(b)).join('');

// ---------------------------------------------------------------------------
// Tracker self-checks (hand-verified single-move piece destinations, identities)
// ---------------------------------------------------------------------------
function selfCheck() {
  const expect = (pos, face, power, want, note) => {
    const got = applyMove(sortPos(pos), face, power);
    if (got !== sortPos(want)) {
      throw new Error(`self-check failed: ${face}${power} on ${pos} -> ${got}, expected ${want} (${note})`);
    }
  };
  // hand-derived quarter-turn facts
  expect('DFR', 'R', 1, 'UFR', 'R sends down-front-right corner to up-front-right');
  expect('FR', 'R', 1, 'UR', 'R sends front-right edge to up-right');
  expect('UR', 'R', 1, 'BR', 'R sends up-right edge to back-right');
  expect('UF', 'U', 1, 'UL', 'U clockwise sends front edge to the left');
  expect('UFR', 'U', 1, 'UFL', 'U clockwise sends front-right corner to front-left');
  expect('UF', 'F', 1, 'FR', 'F clockwise sends top-front edge to right-front');
  expect('UFR', 'F', 1, 'DFR', 'F clockwise sends top-front-right corner down-right');
  expect('DF', 'D', 1, 'DR', 'D clockwise sends bottom-front edge to the right');
  expect('UL', 'L', 1, 'FL', 'L clockwise sends up-left edge to front-left');
  expect('UB', 'B', 1, 'BL', 'B clockwise sends up-back edge to back-left');
  expect('DFR', 'U', 1, 'DFR', 'U does not move bottom-layer pieces');

  // every quarter turn applied 4x is the identity, on every position
  const allPositions = [...PAIRS.flatMap((p) => [p.corner, p.edge]), ...CROSS_EDGES, 'BUL', 'UB'];
  for (const face of Object.keys(ROT)) {
    for (const pos of allPositions.map(sortPos)) {
      let cur = pos;
      for (let i = 0; i < 4; i++) cur = applyMove(cur, face, 1);
      if (cur !== pos) throw new Error(`self-check failed: ${face}^4 != identity on ${pos}`);
    }
  }
  // (R U R' U') x6 is the identity
  const sexy = [['R', 1], ['U', 1], ['R', 3], ['U', 3]];
  for (const pos of allPositions.map(sortPos)) {
    let cur = pos;
    for (let rep = 0; rep < 6; rep++) for (const [f, p] of sexy) cur = applyMove(cur, f, p);
    if (cur !== pos) throw new Error(`self-check failed: (RUR'U')^6 != identity on ${pos}`);
  }
  console.log('tracker self-checks passed');
}

// ---------------------------------------------------------------------------
// Per-scramble analysis
// ---------------------------------------------------------------------------
function analyzeScramble(scrambleStr) {
  const sols = cross.solve(scrambleStr);
  const solution = sols[1].map(parseSolMove); // white cross, solving (z2) frame

  // positions after the scramble, in the solving frame
  const state = new Map(); // piece id -> current position
  for (const p of PAIRS) {
    state.set(p.corner, p.corner);
    state.set(p.edge, p.edge);
  }
  for (const e of CROSS_EDGES) state.set(e, e);
  for (const [face, power] of scrambleMovesInSolvingFrame(scrambleStr)) {
    for (const [id, pos] of state) state.set(id, applyMove(pos, face, power));
  }

  // walk the solution counting disruptions per tracked piece
  const disruptions = new Map([...state.keys()].map((id) => [id, 0]));
  for (const [face, power] of solution) {
    for (const [id, pos] of state) {
      const next = applyMove(pos, face, power);
      if (next !== pos) disruptions.set(id, disruptions.get(id) + 1);
      state.set(id, next);
    }
  }

  // cross-validation: the 4 cross edges must be home again
  for (const e of CROSS_EDGES) {
    if (state.get(e) !== e) {
      throw new Error(`cross not solved after solution! scramble="${scrambleStr}" edge ${e} at ${state.get(e)}`);
    }
  }

  const pairs = PAIRS.map((p) => ({
    slot: p.slot,
    colors: p.colors,
    cornerDisruptions: disruptions.get(p.corner),
    edgeDisruptions: disruptions.get(p.edge),
    cornerLayer: layerOf(state.get(p.corner)),
    edgeLayer: layerOf(state.get(p.edge)),
    cornerFinal: state.get(p.corner),
    edgeFinal: state.get(p.edge),
  }));

  return { solutionLength: solution.length, solution: sols[1].map((s) => s.trim()).join(' '), pairs };
}

// ---------------------------------------------------------------------------
// Difficulty model. Two axes:
//   favourability (a filter) - a pair is only worth tracking if its corner ends
//     in the U layer; a corner in the D layer is stuck in an F2L slot.
//   disruptions  (the dial)  - total moves that displaced either piece. The
//     grade of a scramble is the MINIMUM over qualifying pairs, i.e. the best
//     option available, since that is the pair a solver would actually pick.
// Mirrors src/app/pair-tracking.ts - keep the two in sync (the spec there
// asserts the distribution these thresholds produce).
// ---------------------------------------------------------------------------
const EASY_MAX = 2;
const MEDIUM_MAX = 4;

const totalDisruptions = (p) => p.cornerDisruptions + p.edgeDisruptions;
const qualifies = (p) => p.cornerLayer === 'U';

function bandOf(total) {
  if (total <= EASY_MAX) return 'easy';
  if (total <= MEDIUM_MAX) return 'medium';
  return 'hard';
}

// 'none' = no pair ends with its corner on top; excluded from filtered draws.
function gradeScramble(pairs) {
  const q = pairs.filter(qualifies);
  return q.length ? bandOf(Math.min(...q.map(totalDisruptions))) : 'none';
}

// The pair to recommend: fewest disruptions, tie-broken toward an edge that
// ends on top (a better F2L case).
function recommendPair(pairs) {
  const q = pairs.filter(qualifies);
  if (!q.length) return null;
  return [...q].sort(
    (a, b) =>
      totalDisruptions(a) - totalDisruptions(b) ||
      (a.edgeLayer === 'U' ? 0 : 1) - (b.edgeLayer === 'U' ? 0 : 1)
  )[0];
}

// ---------------------------------------------------------------------------
// Encoding for the shipped data module. Two chars per pair, 8 per scramble:
//   char = ALPHABET[disruptions * 2 + (endsOnTop ? 1 : 0)]
// 32 symbols covers disruption counts up to 15 (observed max: corner 8, edge 6).
// Mirrors decodePairFeatures() in src/app/pair-tracking.ts.
// ---------------------------------------------------------------------------
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef';
const MAX_DISRUPTIONS = 15;

function encodePairs(pairs) {
  let out = '';
  for (const p of pairs) {
    if (p.cornerDisruptions > MAX_DISRUPTIONS || p.edgeDisruptions > MAX_DISRUPTIONS) {
      throw new Error(`disruption count exceeds encoding range: ${JSON.stringify(p)}`);
    }
    if (p.cornerLayer !== 'U' && p.cornerLayer !== 'D') throw new Error(`bad corner layer ${p.cornerLayer}`);
    if (p.edgeLayer !== 'U' && p.edgeLayer !== 'E') throw new Error(`bad edge layer ${p.edgeLayer}`);
    out += ALPHABET[p.cornerDisruptions * 2 + (p.cornerLayer === 'U' ? 1 : 0)];
    out += ALPHABET[p.edgeDisruptions * 2 + (p.edgeLayer === 'U' ? 1 : 0)];
  }
  return out;
}

// Independent decode, used only to assert the emitted data round-trips.
function decodePairs(enc) {
  const pairs = [];
  for (let i = 0; i < 4; i++) {
    const c = ALPHABET.indexOf(enc[i * 2]);
    const e = ALPHABET.indexOf(enc[i * 2 + 1]);
    if (c < 0 || e < 0) throw new Error(`bad encoded char in "${enc}"`);
    pairs.push({
      slot: PAIRS[i].slot,
      colors: PAIRS[i].colors,
      cornerDisruptions: c >> 1,
      cornerLayer: c & 1 ? 'U' : 'D',
      edgeDisruptions: e >> 1,
      edgeLayer: e & 1 ? 'U' : 'E',
    });
  }
  return pairs;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
selfCheck();

const featuresOutIdx = process.argv.indexOf('--features-out');
const featuresOut = featuresOutIdx > -1 ? process.argv[featuresOutIdx + 1] : null;
const emitTsIdx = process.argv.indexOf('--emit-ts');
const emitTs = emitTsIdx > -1 ? process.argv[emitTsIdx + 1] : null;

const results = []; // [level-1][index] -> analysis
console.log('analyzing 8 levels x 1000 scrambles...');
const t0 = Date.now();
for (let level = 1; level <= 8; level++) {
  const bucket = [];
  for (let i = 0; i < 1000; i++) {
    const scrambleStr = decodeScramble(scrambles[level - 1][i]);
    const a = analyzeScramble(scrambleStr);
    if (a.solutionLength !== level) {
      throw new Error(`bucket mismatch: level ${level} index ${i} has optimal cross length ${a.solutionLength}`);
    }
    bucket.push(a);
  }
  results.push(bucket);
  console.log(`  level ${level} done (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}
console.log('cross solved-state verified for all 8000 scrambles');

if (featuresOut) {
  writeFileSync(featuresOut, JSON.stringify(results));
  console.log(`raw features written to ${featuresOut}`);
}

// --- emit the shipped data module ---------------------------------------------
if (emitTs) {
  const encoded = results.map((bucket) => bucket.map((a) => encodePairs(a.pairs)));

  // round-trip: decoding what we are about to ship must reproduce the features
  // that the cube-verified analysis produced.
  for (let level = 1; level <= 8; level++) {
    for (let i = 0; i < 1000; i++) {
      const want = results[level - 1][i].pairs;
      const got = decodePairs(encoded[level - 1][i]);
      for (let k = 0; k < 4; k++) {
        for (const f of ['cornerDisruptions', 'edgeDisruptions', 'cornerLayer', 'edgeLayer']) {
          if (want[k][f] !== got[k][f]) {
            throw new Error(`round-trip mismatch at level ${level} #${i} pair ${k} field ${f}`);
          }
        }
      }
    }
  }
  console.log('encoded data round-trips to the analysed features for all 8000 scrambles');

  const body = encoded
    .map((bucket, i) => `\n// level ${i + 1}\n[\n${bucket.map((s) => `"${s}"`).join(',\n')}\n]`)
    .join(',');
  writeFileSync(
    emitTs,
    `// GENERATED FILE - do not edit by hand.\n` +
      `// Regenerate with: node scripts/analyze-pair-tracking.mjs --emit-ts src/app/PairTrackingData.ts\n` +
      `//\n` +
      `// First-F2L-pair tracking features, one entry per scramble in Scrambles.ts.\n` +
      `// Each entry is 8 chars: 2 per pair in slot order FR, FL, BR, BL, encoding how\n` +
      `// many moves of the optimal cross solution displaced each piece and which layer\n` +
      `// it ends in. Decode with decodePairFeatures() in pair-tracking.ts.\n` +
      `export const pairTrackingData: string[][] = [${body}\n];\n`
  );
  console.log(`data module written to ${emitTs}`);
}

// --- report: the shipped model -------------------------------------------------
console.log('\n=== scramble grade by level (filter: corner ends on top; bands 0-2 / 3-4 / 5+) ===');
console.log('level |  easy | medium |  hard |  none');
for (let level = 1; level <= 8; level++) {
  const counts = { easy: 0, medium: 0, hard: 0, none: 0 };
  for (const a of results[level - 1]) counts[gradeScramble(a.pairs)]++;
  console.log(
    `  ${level}   | ${String(counts.easy).padStart(5)} | ${String(counts.medium).padStart(6)} | ` +
    `${String(counts.hard).padStart(5)} | ${String(counts.none).padStart(5)}`
  );
}

// --- supporting distributions --------------------------------------------------
const maxD = 9;
console.log('\n=== disruptions of the recommended pair (min over corner-on-top pairs), per level ===');
console.log('level | ' + [...Array(maxD)].map((_, i) => String(i).padStart(4)).join(' ') + '   9+  none');
for (let level = 1; level <= 8; level++) {
  const hist = Array(maxD + 1).fill(0);
  let none = 0;
  for (const a of results[level - 1]) {
    const best = recommendPair(a.pairs);
    if (!best) { none++; continue; }
    hist[Math.min(totalDisruptions(best), maxD)]++;
  }
  console.log(`  ${level}   | ` + hist.map((n) => String(n).padStart(4)).join(' ') + String(none).padStart(6));
}

console.log('\n=== total disruptions of ALL pairs, split by where the corner ends (4000 pairs/level) ===');
console.log('level | corner | ' + [...Array(maxD)].map((_, i) => String(i).padStart(4)).join(' ') + '   9+');
for (let level = 1; level <= 8; level++) {
  const hist = { U: Array(maxD + 1).fill(0), D: Array(maxD + 1).fill(0) };
  for (const a of results[level - 1]) {
    for (const p of a.pairs) hist[p.cornerLayer][Math.min(totalDisruptions(p), maxD)]++;
  }
  for (const layer of ['U', 'D']) {
    const label = layer === 'U' ? 'top   ' : 'slot  ';
    console.log(`  ${level}   | ${label} | ` + hist[layer].map((n) => String(n).padStart(4)).join(' '));
  }
}

// --- worked samples for cube-in-hand verification ------------------------------
console.log('\n=== worked samples (verify on a real cube; scramble white-top green-front, then flip z2) ===');
const samplePicks = [[3, 0], [5, 0], [5, 1], [6, 0], [7, 0]];
for (const [level, idx] of samplePicks) {
  const scrambleStr = decodeScramble(scrambles[level - 1][idx]);
  const a = results[level - 1][idx];
  console.log(`\nLevel ${level}, scramble #${idx + 1}: ${scrambleStr}`);
  console.log(`  cross solution (after z2, white down / green front): ${a.solution}`);
  for (const p of a.pairs) {
    const verdict = qualifies(p)
      ? `${bandOf(totalDisruptions(p))} (${totalDisruptions(p)} disruptions)`
      : 'excluded - corner ends in a slot';
    console.log(
      `  ${p.colors.padEnd(13)} corner moved ${p.cornerDisruptions}x -> ${displayPos(p.cornerFinal)} (${p.cornerLayer} layer), ` +
      `edge moved ${p.edgeDisruptions}x -> ${displayPos(p.edgeFinal)} (${p.edgeLayer} layer)  [${verdict}]`
    );
  }
  const best = recommendPair(a.pairs);
  console.log(
    `  scramble grade: ${gradeScramble(a.pairs)}` +
    (best ? `  |  recommended pair: ${best.colors}` : '  |  no pair ends with its corner on top')
  );
}
