// Pair-preserving cross choice — Phase A measurement harness. ANALYSIS ONLY:
// this script has no emit flags and cannot write shipped data.
//
// Question: among the ranker's own candidates (every optimal and optimal+1 line,
// scored across all 4 holds), how often would a near-equal pick leave the first
// F2L pair in a materially better state than the current ergonomic-only pick —
// especially by keeping a pair that was already connected after the scramble?
//
// The candidate set already contains every human trick up to one extra move
// (including "insert a U mid-cross to dodge the pair"), so this is purely a
// selection question — no new search.
//
// Outcome categories are the user's ranking (see pair-state.mjs CATEGORIES),
// best -> worst. A scramble/candidate is judged by its best pair, since that is
// the pair a solver would play.
//
// Also simulated, per the user's open design question: the two Phase B selection
// architectures — "phased" (best pair category first, most ergonomic survivor
// second, optionally capped) vs "combined" (score + W x category rank).
//
// Validation: every candidate line examined is asserted to solve the cross with
// the oriented tracker (position AND orientation — stricter than the position-only
// check in analyze-pair-tracking.mjs), which cross-checks pair-state.mjs, the move
// parsing, and the ranker's enumeration against each other on every line scored.
//
// Usage: node scripts/analyze-pair-preservation.mjs [--all | --limit N] [--no-xcross]
//   --limit N   first N scrambles per level (default 40) — fast smoke run
//   --all       all 1000 per level (~15 min; background it)
//   --no-xcross skip the +2/+3 XCross comparison pass (levels 3-6)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { rankSolutions } from '../src/app/cross-ranker/cross-ranker.js';
import { enumerateSolutions } from '../src/app/cross-ranker/cross-states.js';
import {
  solvedState,
  applyMoves,
  crossSolved,
  categorize,
  categorizeAll,
  bestRank,
  rankOf,
  CATEGORIES,
  SLOTS,
  SLOT_COLORS,
  isConnected,
  positionOf,
  selfCheck,
} from '../src/app/cross-ranker/pair-state.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

// --------------------------------------------------------------------------
// Scramble data (same data-URL import as the sibling harnesses)
// --------------------------------------------------------------------------
const scramblesSrc = readFileSync(join(root, 'src/app/Scrambles.ts'), 'utf8');
const { scrambles } = await import(
  'data:text/javascript;base64,' + Buffer.from(scramblesSrc).toString('base64')
);

const MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];
const decodeScramble = (enc) => [...enc].map((ch) => MoveNamesWCA[ch.charCodeAt(0) - 65]).join(' ');

const parseMove = (tok) => [tok[0], tok[1] === '2' ? 2 : tok[1] === "'" ? 3 : 1];
const Z2 = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'F', B: 'B' };
const scrambleMovesInSolvingFrame = (str) =>
  str.split(' ').map((tok) => {
    const [face, power] = parseMove(tok);
    return [Z2[face], power];
  });
const parseLine = (tokens) => tokens.map((t) => parseMove(t.trim()));

// --------------------------------------------------------------------------
// Args
// --------------------------------------------------------------------------
const args = process.argv.slice(2);
const all = args.includes('--all');
const limitIdx = args.indexOf('--limit');
const limit = all ? 1000 : limitIdx >= 0 ? Number(args[limitIdx + 1]) : 40;
const runXcross = !args.includes('--no-xcross');
if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
  throw new Error(`bad --limit ${limit}`);
}

const CONNECTED_TOP = rankOf['connected-U']; // "connected-U or better" threshold
const CAPS = [0.75, 1.5]; // capped-phased switch budgets, in score units
const WEIGHTS = [0.5, 1, 2, 3]; // combined-score W sweep

// --------------------------------------------------------------------------
// Per-scramble analysis
// --------------------------------------------------------------------------
function analyzeScramble(scrambleStr) {
  const start = applyMoves(solvedState(), scrambleMovesInSolvingFrame(scrambleStr));
  const premade = SLOTS.filter((slot) => isConnected(start.get('c' + slot), start.get('e' + slot)));

  const { ranked } = rankSolutions(scrambleStr);
  const current = ranked[0];

  // one entry per physical line, carrying its best hold (ranked is sorted by score,
  // so the first sighting of a base is that base's best hold)
  const byBase = new Map();
  for (const r of ranked) {
    const key = r.base.join(' ');
    if (!byBase.has(key)) byBase.set(key, r);
  }

  const evals = [];
  for (const cand of byBase.values()) {
    const end = applyMoves(start, parseLine(cand.base));
    if (!crossSolved(end)) {
      throw new Error(`cross not solved (oriented) by "${cand.base.join(' ')}" for "${scrambleStr}"`);
    }
    const cats = categorizeAll(end);
    evals.push({ cand, cats, rank: bestRank(cats), end });
  }

  const cur = evals[0]; // byBase preserves ranked order, so evals[0] is the current pick
  const s0 = current.score;

  // --- premade pair preservation ---
  const premadeInfo = premade.map((slot) => {
    const curRank = rankOf[cur.cats[slot]];
    const keptTop = curRank <= CONNECTED_TOP;
    let rescue = null;
    if (!keptTop) {
      for (const e of evals) {
        if (rankOf[e.cats[slot]] <= CONNECTED_TOP) {
          if (!rescue || e.cand.score < rescue.cand.score) rescue = e;
        }
      }
    }
    return { slot, keptTop, rescue, rescueDelta: rescue ? rescue.cand.score - s0 : null };
  });

  // --- outright pair solve (mini-XCross) within the existing <=+1 budget ---
  const curSolved = SLOTS.some((slot) => cur.cats[slot] === 'solved');
  let solver = null;
  if (!curSolved) {
    for (const e of evals) {
      if (SLOTS.some((slot) => e.cats[slot] === 'solved')) {
        if (!solver || e.cand.score < solver.cand.score) solver = e;
      }
    }
  }

  // --- selection architectures ---
  const bestR = Math.min(...evals.map((e) => e.rank));
  const pickMin = (list, key) =>
    list.reduce((best, e) => (best === null || key(e) < key(best) ? e : best), null);

  const phased = pickMin(
    evals.filter((e) => e.rank === bestR),
    (e) => e.cand.score
  );
  const capped = CAPS.map((cap) => {
    const eligible = evals.filter((e) => e.cand.score <= s0 + cap);
    const r = Math.min(...eligible.map((e) => e.rank));
    return pickMin(eligible.filter((e) => e.rank === r), (e) => e.cand.score);
  });
  const combined = WEIGHTS.map((w) => pickMin(evals, (e) => e.cand.score + w * e.rank));

  // near-free upgrade: a better pair outcome within 0.5 score of the current pick
  const freeBetter = evals.some((e) => e.cand.score <= s0 + 0.5 && e.rank < cur.rank);

  return { start, premade, premadeInfo, evals, cur, s0, bestR, phased, capped, combined, solver, curSolved, freeBetter };
}

// --------------------------------------------------------------------------
// Stats plumbing
// --------------------------------------------------------------------------
const counter = () => Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
const archAcc = () => ({ changed: 0, deltas: [], gains: [] });
const newLevelStats = () => ({
  n: 0,
  premadeScrambles: 0,
  premadePairs: 0,
  premadeKeptTop: 0,
  premadeRescuable: 0,
  premadeUnrescuable: 0,
  rescueDeltas: [],
  currentCats: counter(),
  bestCats: counter(),
  rankSumCurrent: 0,
  rankSumBest: 0,
  freeBetter: 0,
  curSolved: 0,
  miniXcross: 0,
  miniXcrossDeltas: [],
  phased: archAcc(),
  capped: CAPS.map(archAcc),
  combined: WEIGHTS.map(archAcc),
});

function recordArch(acc, pick, cur, s0) {
  if (!pick || pick.cand === cur.cand) return;
  acc.changed++;
  acc.deltas.push(pick.cand.score - s0);
  acc.gains.push(cur.rank - pick.rank);
}

const pct = (arr, p) => {
  if (!arr.length) return NaN;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))];
};
const mean = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : NaN);
const f = (x, d = 1) => (Number.isFinite(x) ? x.toFixed(d) : '—');
const pc = (num, den) => (den ? ((100 * num) / den).toFixed(0) + '%' : '—');

// --------------------------------------------------------------------------
// Worked-sample collection
// --------------------------------------------------------------------------
const rescueSamples = [];
const xcrossSamples = [];

function describeEnd(e, slot) {
  return `${e.cats[slot]} (corner ${positionOf(e.end.get('c' + slot))}, edge ${positionOf(e.end.get('e' + slot))})`;
}

function candidateLine(e) {
  const extra = e.cand.extraMoves ? ` (+${e.cand.extraMoves} move)` : '';
  return `${e.cand.base.map((t) => t.trim()).join(' ')}  [hold ${e.cand.holdColour} front: ${e.cand.moves.map((t) => t.trim()).join(' ')}]  score ${f(e.cand.score)}${extra}`;
}

function addSample(list, level, index, scramble, res, e, slot, reason, tier) {
  list.push({
    level,
    index,
    delta: e.cand.score - res.s0,
    text: [
      `level ${level}, scramble #${index} — ${scramble}`,
      `  pair: ${SLOT_COLORS[slot]} (${slot} slot); after the scramble: corner ${positionOf(res.start.get('c' + slot))}, edge ${positionOf(res.start.get('e' + slot))}${res.premade.includes(slot) ? ' — already connected' : ''}`,
      `  current : ${candidateLine(res.cur)}`,
      `            ${SLOT_COLORS[slot]} pair ends ${describeEnd(res.cur, slot)}`,
      `  proposed: ${candidateLine(e)}`,
      `            ${SLOT_COLORS[slot]} pair ends ${describeEnd(e, slot)}`,
      `  reason  : ${reason}  [${tier}]`,
      `  (piece positions are in the solving frame: white bottom, green front)`,
    ].join('\n'),
  });
}

// --------------------------------------------------------------------------
// Main pass
// --------------------------------------------------------------------------
selfCheck();
console.log('pair-state self-checks passed');
console.log(`analyzing ${limit} scramble(s) per level${all ? ' (--all)' : ''}\n`);

const stats = [];
for (let level = 1; level <= 8; level++) {
  const st = newLevelStats();
  const t0 = Date.now();
  for (let index = 0; index < limit; index++) {
    const scramble = decodeScramble(scrambles[level - 1][index]);
    const res = analyzeScramble(scramble);
    st.n++;

    if (res.premade.length) st.premadeScrambles++;
    st.premadePairs += res.premade.length;
    for (const p of res.premadeInfo) {
      if (p.keptTop) st.premadeKeptTop++;
      else if (p.rescue) {
        st.premadeRescuable++;
        st.rescueDeltas.push(p.rescueDelta);
        if (rescueSamples.length < 400 && p.rescueDelta <= 1.5) {
          addSample(
            rescueSamples, level, index, scramble, res, p.rescue, p.slot,
            `keeps your already-connected ${SLOT_COLORS[p.slot]} pair — ends ${p.rescue.cats[p.slot] === 'solved' ? 'solved in its slot' : 'connected on top'}`,
            'inspection-visible'
          );
        }
      } else st.premadeUnrescuable++;
    }

    st.currentCats[CATEGORIES[res.cur.rank]]++;
    st.bestCats[CATEGORIES[res.bestR]]++;
    st.rankSumCurrent += res.cur.rank;
    st.rankSumBest += res.bestR;
    if (res.freeBetter) st.freeBetter++;
    if (res.curSolved) st.curSolved++;
    if (res.solver) {
      st.miniXcross++;
      const delta = res.solver.cand.score - res.s0;
      st.miniXcrossDeltas.push(delta);
      if (xcrossSamples.length < 400 && delta <= 1.5) {
        const slot = SLOTS.find((s) => res.solver.cats[s] === 'solved');
        addSample(
          xcrossSamples, level, index, scramble, res, res.solver, slot,
          `solves the ${SLOT_COLORS[slot]} pair outright while doing the cross (free XCross)`,
          res.premade.includes(slot) ? 'inspection-visible' : 'trackable'
        );
      }
    }

    recordArch(st.phased, res.phased, res.cur, res.s0);
    res.capped.forEach((pick, i) => recordArch(st.capped[i], pick, res.cur, res.s0));
    res.combined.forEach((pick, i) => recordArch(st.combined[i], pick, res.cur, res.s0));
  }
  stats.push(st);
  console.log(`level ${level}: ${st.n} scrambles in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

// --------------------------------------------------------------------------
// XCross comparison pass (levels 3-6): min extra moves for a line that solves
// the cross AND a full pair, allowing up to +3
// --------------------------------------------------------------------------
let xcrossTable = null;
if (runXcross) {
  console.log('\nXCross comparison pass (levels 3-6, extra up to 3)...');
  xcrossTable = [];
  for (const level of [3, 4, 5, 6]) {
    const n = Math.min(limit, 100);
    const byExtra = [0, 0, 0, 0];
    let none = 0;
    const t0 = Date.now();
    for (let index = 0; index < n; index++) {
      const scramble = decodeScramble(scrambles[level - 1][index]);
      const start = applyMoves(solvedState(), scrambleMovesInSolvingFrame(scramble));
      const { optimal, solutions } = enumerateSolutions(scramble, 3);
      let found = null;
      for (const tokens of [...solutions].sort((a, b) => a.length - b.length)) {
        const end = applyMoves(start, parseLine(tokens));
        if (SLOTS.some((slot) => categorize(end.get('c' + slot), end.get('e' + slot), slot) === 'solved')) {
          found = tokens.length - optimal;
          break; // sorted by length, so the first hit is the minimum extra
        }
      }
      if (found === null) none++;
      else byExtra[found]++;
    }
    xcrossTable.push({ level, n, byExtra, none });
    console.log(`  level ${level}: ${n} scrambles in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  }
}

// --------------------------------------------------------------------------
// Report
// --------------------------------------------------------------------------
const row = (cells, widths) => cells.map((c, i) => String(c).padStart(widths[i])).join('  ');

console.log('\n=== 1. Pre-made connected pairs (exist after the scramble, before the cross) ===');
{
  const w = [5, 6, 10, 7, 9, 11, 12, 9, 9, 9];
  console.log(row(['level', 'n', '%premade', 'pairs', 'kept-top', 'rescuable', 'unrescuable', 'Δ med', 'Δ p90', 'Δ=0'], w));
  for (const [i, st] of stats.entries()) {
    console.log(
      row(
        [
          i + 1,
          st.n,
          pc(st.premadeScrambles, st.n),
          st.premadePairs,
          pc(st.premadeKeptTop, st.premadePairs),
          pc(st.premadeRescuable, st.premadePairs),
          pc(st.premadeUnrescuable, st.premadePairs),
          f(pct(st.rescueDeltas, 50)),
          f(pct(st.rescueDeltas, 90)),
          pc(st.rescueDeltas.filter((d) => d === 0).length, st.rescueDeltas.length),
        ],
        w
      )
    );
  }
  console.log('kept-top = current pick already leaves it solved/connected-on-top;');
  console.log('rescuable = broken by the current pick but some ≤+1 candidate keeps it solved/connected-on-top (Δ = score cost of the cheapest one)');
}

console.log('\n=== 2. Best-pair category of the current pick vs best achievable (≤+1) ===');
{
  const w = [5, ...CATEGORIES.map((c) => Math.max(c.length, 6)), 8, 8];
  console.log(row(['level', ...CATEGORIES, 'avg-cur', 'avg-best'], w));
  for (const [i, st] of stats.entries()) {
    console.log(row([i + 1, ...CATEGORIES.map((c) => `${st.currentCats[c]}/${st.bestCats[c]}`), f(st.rankSumCurrent / st.n, 2), f(st.rankSumBest / st.n, 2)], w));
  }
  console.log('cells are current/best-achievable counts; avg = mean category rank (0 = solved ... 6 = buried)');
}

console.log('\n=== 3. Opportunity summary ===');
{
  const w = [5, 6, 16, 14, 14, 12, 12];
  console.log(row(['level', 'n', 'free-upgrade≤0.5', 'cur-has-xcross', 'xcross-avail', 'xΔ med', 'xΔ≤1.5'], w));
  for (const [i, st] of stats.entries()) {
    console.log(
      row(
        [
          i + 1,
          st.n,
          pc(st.freeBetter, st.n),
          pc(st.curSolved, st.n),
          pc(st.miniXcross, st.n),
          f(pct(st.miniXcrossDeltas, 50)),
          pc(st.miniXcrossDeltas.filter((d) => d <= 1.5).length, st.n),
        ],
        w
      )
    );
  }
  console.log('free-upgrade = a candidate within 0.5 score beats the current pick\'s best-pair category;');
  console.log('xcross-avail = some ≤+1 candidate solves a full pair when the current pick does not');
}

console.log('\n=== 4. Selection architectures (how much ergonomics each would sacrifice) ===');
{
  const w = [5, 16, 9, 8, 8, 8, 9];
  console.log(row(['level', 'architecture', 'changed', 'Δ med', 'Δ p90', 'Δ max', 'gain avg'], w));
  for (const [i, st] of stats.entries()) {
    const entries = [
      ['phased (uncapped)', st.phased],
      ...CAPS.map((cap, j) => [`phased cap ${cap}`, st.capped[j]]),
      ...WEIGHTS.map((wgt, j) => [`combined W=${wgt}`, st.combined[j]]),
    ];
    for (const [name, acc] of entries) {
      console.log(
        row(
          [i + 1, name, pc(acc.changed, st.n), f(pct(acc.deltas, 50)), f(pct(acc.deltas, 90)), f(Math.max(...acc.deltas, 0)), f(mean(acc.gains), 2)],
          w
        )
      );
    }
  }
  console.log('changed = picks a different line than today; Δ = score cost vs the current pick; gain = category ranks improved');
}

if (xcrossTable) {
  console.log('\n=== 5. XCross comparison: min extra moves for cross + a full pair ===');
  const w = [5, 6, 8, 8, 8, 8, 8];
  console.log(row(['level', 'n', '+0', '+1', '+2', '+3', 'none'], w));
  for (const r of xcrossTable) {
    console.log(row([r.level, r.n, ...r.byExtra.map((c) => pc(c, r.n)), pc(r.none, r.n)], w));
  }
  console.log('+0/+1 are within the trainer\'s existing candidate budget; +2/+3 would need true XCross lines');
}

console.log('\n=== Worked samples (check these on a real cube) ===');
{
  const print = (title, list) => {
    console.log(`\n--- ${title} ---`);
    const picked = [...list].sort((a, b) => a.delta - b.delta).slice(0, 4);
    if (!picked.length) console.log('(none found in this sample)');
    for (const s of picked) console.log('\n' + s.text);
  };
  print('Pre-made pair rescues (cheapest first)', rescueSamples);
  print('Free/cheap outright pair solves within ≤+1 (cheapest first)', xcrossSamples);
}
