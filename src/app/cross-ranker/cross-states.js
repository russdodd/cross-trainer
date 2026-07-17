// Cross state maths: exact solving distances and full solution enumeration.
//
// WHY THIS DUPLICATES cross.js
// ----------------------------
// cross.js keeps its move tables (pmul/fmul/cmv) and fullmv() private inside its
// closure, and exposes only solve()/getEasyCross(). We need to walk the state
// space directly to enumerate EVERY optimal (and optimal+1) solution rather than
// the single one its IDA* search happens to find first. Since src/app/cstimer/*
// is fragile vendored code that must never be modified, this module rebuilds the
// same tables from mathlib's public exports instead of reaching into cross.js.
//
// It is not guesswork: the BFS histogram below is asserted against the state
// counts cross.js itself hardcodes in getEasyCross (see distanceTable()).
//
// FRAMES
// ------
// Everything here works in the same frame as cross.solve()'s sols[1] (the white
// cross): moves are named as you'd execute them after flipping white to the
// bottom (z2), i.e. white bottom / green front. MOVE_IDX_U is cross.js's own
// original->z2 letter mapping, reused verbatim so our moves line up with its.

import { mathlib } from '../cstimer/mathlib.js';
import { kernel } from '../cstimer/kernel.js';

const { createMove, edgeMove, Cnk, getNPerm, setNPerm } = mathlib;

/** Size of the cross state space: C(12,4)*495 combos x 24 perms x 16 flips. */
export const N_STATES = 190080;

/** Move indices, matching cross.js's edgeMove(): 0=F 1=R 2=U 3=B 4=L 5=D. */
const FACES = 'FRUBLD';
const SUFFIX = ['', '2', "'"];

// cross.js's moveIdx[1] - the letter map for solving the U (white) face. Maps a
// scramble move letter to the index it turns into once white is on the bottom.
// It works out to U<->D, R<->L, F and B fixed, which is exactly z2.
const MOVE_IDX_U = 'FLDBRU';

let tables = null;

// Mirrors cross.js's private init(): builds the permutation/flip multiplication
// tables and the combination move table, then a combined transition function.
function initTables() {
  if (tables) {
    return tables;
  }
  const pmul = [];
  const fmul = [];
  const cmv = [];
  for (let i = 0; i < 24; i++) {
    pmul[i] = [];
  }
  for (let i = 0; i < 16; i++) {
    fmul[i] = [];
  }

  const i2f = (a, c) => {
    for (let b = 3; b >= 0; b--) {
      c[b] = a & 1;
      a >>= 1;
    }
  };
  const f2i = (c) => {
    let a = 0;
    for (let b = 0; b < 4; b++) {
      a <<= 1;
      a |= c[b];
    }
    return a;
  };

  const pm1 = [];
  const pm2 = [];
  const pm3 = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 24; j++) {
      setNPerm(pm1, i, 4);
      setNPerm(pm2, j, 4);
      for (let k = 0; k < 4; k++) {
        pm3[k] = pm1[pm2[k]];
      }
      pmul[i][j] = getNPerm(pm3, 4);
      if (i < 16) {
        i2f(i, pm1);
        for (let k = 0; k < 4; k++) {
          pm3[k] = pm1[pm2[k]];
        }
        fmul[i][j] = f2i(pm3);
      }
    }
  }

  function getmv(comb, m) {
    const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let r = 4;
    for (let i = 0; i < 12; i++) {
      if (comb >= Cnk[11 - i][r]) {
        comb -= Cnk[11 - i][r--];
        arr[i] = r << 1;
      } else {
        arr[i] = -1;
      }
    }
    edgeMove(arr, m);
    comb = 0;
    r = 4;
    let t = 0;
    const pm = [];
    for (let i = 0; i < 12; i++) {
      if (arr[i] >= 0) {
        comb += Cnk[11 - i][r--];
        pm[r] = arr[i] >> 1;
        t |= (arr[i] & 1) << (3 - r);
      }
    }
    return ((comb * 24 + getNPerm(pm, 4)) << 4) | t;
  }
  createMove(cmv, 495, getmv);

  // state index = comb*384 + perm*16 + flip; solved = 0
  const fullmv = (idx, move) => {
    const slice = cmv[move][~~(idx / 384)];
    const flip = fmul[idx & 15][(slice >> 4) % 24] ^ (slice & 15);
    const perm = pmul[(idx >> 4) % 24][(slice >> 4) % 24];
    return ~~(slice / 384) * 384 + 16 * perm + flip;
  };

  tables = { fullmv };
  return tables;
}

// Cumulative "states solvable in <= n moves", hardcoded in cross.js's
// getEasyCross(). Our independently built BFS must reproduce these exactly - it
// is the proof that this module's state maths matches the solver's.
const EXPECTED_CUMULATIVE = [1, 16, 174, 1568, 11377, 57758, 155012, 189978, 190080];

let distances = null;

/**
 * Exact optimal solving distance for every cross state, by BFS from solved.
 * Built once (~40ms) and memoised.
 *
 * Note: this deliberately does NOT reuse cross.js's fullPrun, which is a
 * depth-capped pruning table (values saturate), not exact distances.
 */
export function distanceTable() {
  if (distances) {
    return distances;
  }
  const { fullmv } = initTables();
  const dist = new Int8Array(N_STATES).fill(-1);
  dist[0] = 0;
  let frontier = [0];
  for (let d = 0; frontier.length; d++) {
    const next = [];
    for (const s of frontier) {
      for (let m = 0; m < 6; m++) {
        let x = s;
        for (let a = 0; a < 3; a++) {
          x = fullmv(x, m);
          if (dist[x] === -1) {
            dist[x] = d + 1;
            next.push(x);
          }
        }
      }
    }
    frontier = next;
  }

  // self-check against cross.js's own constants
  const cumulative = [];
  let seen = 0;
  for (let d = 0; d <= 8; d++) {
    for (let i = 0; i < N_STATES; i++) {
      if (dist[i] === d) {
        seen++;
      }
    }
    cumulative.push(seen);
  }
  for (let d = 0; d < EXPECTED_CUMULATIVE.length; d++) {
    if (cumulative[d] !== EXPECTED_CUMULATIVE[d]) {
      throw new Error(
        `cross-states BFS disagrees with cross.js at depth ${d}: got ${cumulative[d]}, expected ${EXPECTED_CUMULATIVE[d]}`
      );
    }
  }

  distances = dist;
  return distances;
}

/** The cross state a scramble leaves, in the white-cross solving frame. */
export function stateIndexForScramble(scrambleStr) {
  const { fullmv } = initTables();
  const moves = kernel.parseScramble(scrambleStr, FACES);
  let idx = 0;
  for (const move of moves) {
    const m = MOVE_IDX_U.indexOf(FACES.charAt(move[0]));
    for (let p = 0; p < move[2]; p++) {
      idx = fullmv(idx, m);
    }
  }
  return idx;
}

/** Optimal solution length for a scramble (its "level"). */
export function optimalLength(scrambleStr) {
  return distanceTable()[stateIndexForScramble(scrambleStr)];
}

/**
 * Every solution of length `optimal` through `optimal + extra`, as arrays of
 * move tokens ("R", "R2", "R'") in the solving frame.
 *
 * Unlike cross.js's search we only forbid consecutive moves of the SAME face; we
 * deliberately keep both orders of commuting moves (F B and B F). They reach the
 * same cross but have different fingertricks, and telling those apart is the
 * whole point of ranking.
 */
export function enumerateSolutions(scrambleStr, extra = 1) {
  const { fullmv } = initTables();
  const dist = distanceTable();
  const start = stateIndexForScramble(scrambleStr);
  const optimal = dist[start];

  const out = [];
  const seq = [];

  // exact-length walk: only record when the budget is spent exactly at solved
  const dfs = (state, remaining, lastFace) => {
    if (remaining === 0) {
      if (state === 0) {
        out.push(seq.slice());
      }
      return;
    }
    if (dist[state] > remaining) {
      return;
    }
    for (let m = 0; m < 6; m++) {
      if (m === lastFace) {
        continue;
      }
      let x = state;
      for (let a = 0; a < 3; a++) {
        x = fullmv(x, m);
        seq.push(FACES.charAt(m) + SUFFIX[a]);
        dfs(x, remaining - 1, m);
        seq.pop();
      }
    }
  };

  for (let len = optimal; len <= optimal + extra; len++) {
    dfs(start, len, -1);
  }

  return { optimal, solutions: out };
}
