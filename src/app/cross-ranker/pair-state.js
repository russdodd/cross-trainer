// Oriented F2L-pair state tracker. Offline only: imported by cross-ranker.js
// (which itself runs only inside the generation/analysis scripts) — the runtime
// app never loads it.
//
// The pair tracker in analyze-pair-tracking.mjs is position-only: it sorts each
// position string, which is exactly the step that throws orientation away. This
// module keeps the same sticker rotation maps but tracks an ORDERED tuple per
// piece — tuple[i] is the face the piece's i-th home sticker currently points at —
// so it can tell a genuinely connected (correctly aligned 1×1×2) corner+edge pair
// from two pieces that merely sit next to each other.
//
// Frame: the z2 solving frame used everywhere else offline (white on D, green on
// F, so U=yellow, R=orange, L=red, B=blue). Scramble moves must be relabelled
// through z2 before being applied here, exactly as analyze-pair-tracking.mjs does.
//
// Tuple convention:
//   corner for slot "FR": home ['D','F','R']  (sticker order: white, green, orange)
//   edge   for slot "FR": home ['F','R']      (sticker order: green, orange)
//
// Connectedness: the corner and edge form an intact block iff each shared colour's
// stickers point at the same face — corner[1] === edge[0] && corner[2] === edge[1].
// That also forces adjacency: the corner then occupies a position containing both
// of the edge's faces, i.e. one of the two corners flanking that edge.

// A quarter turn of face X sends the stickers of any piece on X through this map;
// stickers on X itself stay on X. Same table as analyze-pair-tracking.mjs.
const ROT = {
  U: { F: 'L', L: 'B', B: 'R', R: 'F' },
  D: { F: 'R', R: 'B', B: 'L', L: 'F' },
  R: { F: 'U', U: 'B', B: 'D', D: 'F' },
  L: { F: 'D', D: 'B', B: 'U', U: 'F' },
  F: { U: 'R', R: 'D', D: 'L', L: 'U' },
  B: { U: 'L', L: 'D', D: 'R', R: 'U' },
};

/** Apply one move to an oriented tuple. A piece is on face X iff a sticker points at X. */
export function applyOriented(tuple, face, power) {
  if (!tuple.includes(face)) return tuple;
  let cur = tuple;
  for (let i = 0; i < power; i++) {
    cur = cur.map((f) => (f === face ? f : ROT[face][f]));
  }
  return cur;
}

const COLOR = { U: 'yellow', D: 'white', F: 'green', B: 'blue', L: 'red', R: 'orange' };

export const SLOTS = ['FR', 'FL', 'BR', 'BL'];
export const SLOT_COLORS = Object.fromEntries(
  SLOTS.map((slot) => [slot, [...slot].map((f) => COLOR[f]).join('-')])
);

export const CROSS_EDGES = ['DF', 'DR', 'DB', 'DL'];

/** Fresh solved state: piece id -> oriented tuple. Ids: "cFR"/"eFR" per slot, "xDF" per cross edge. */
export function solvedState() {
  const state = new Map();
  for (const slot of SLOTS) {
    state.set('c' + slot, ['D', slot[0], slot[1]]);
    state.set('e' + slot, [slot[0], slot[1]]);
  }
  for (const ce of CROSS_EDGES) {
    state.set('x' + ce, [ce[0], ce[1]]);
  }
  return state;
}

const parseMove = (tok) => [tok[0], tok[1] === '2' ? 2 : tok[1] === "'" ? 3 : 1];

// The scramble is executed in the WCA white-top/green-front frame; the solving
// frame is z2 from there, so every scramble move letter maps through z2. Same
// convention as analyze-pair-tracking.mjs.
const Z2 = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'F', B: 'B' };

/** State of all tracked pieces after a WCA scramble, in the solving frame. */
export function stateAfterScramble(scrambleStr) {
  return applyMoves(
    solvedState(),
    scrambleStr.split(' ').map((tok) => {
      const [face, power] = parseMove(tok);
      return [Z2[face], power];
    })
  );
}

/** Apply solution tokens (already in the solving frame, e.g. cross-ranker `base`). */
export function applyTokens(state, tokens) {
  return applyMoves(state, tokens.map((t) => parseMove(t.trim())));
}

/** Apply [face, power] moves to every piece, returning a new state. */
export function applyMoves(state, moves) {
  const next = new Map();
  for (const [id, tuple] of state) {
    let cur = tuple;
    for (const [face, power] of moves) cur = applyOriented(cur, face, power);
    next.set(id, cur);
  }
  return next;
}

const tupleEq = (a, b) => a.length === b.length && a.every((f, i) => f === b[i]);

/** True iff every cross edge is exactly home — position AND orientation. */
export function crossSolved(state) {
  return CROSS_EDGES.every((ce) => tupleEq(state.get('x' + ce), [ce[0], ce[1]]));
}

export function isConnected(corner, edge) {
  return corner[1] === edge[0] && corner[2] === edge[1];
}

const DISPLAY_ORDER = 'UDFBLR';
/** Position as a conventional string, e.g. UFR — the set of faces the stickers point at. */
export const positionOf = (tuple) =>
  [...tuple].sort((a, b) => DISPLAY_ORDER.indexOf(a) - DISPLAY_ORDER.indexOf(b)).join('');

export const layerOf = (tuple) => (tuple.includes('U') ? 'U' : tuple.includes('D') ? 'D' : 'E');

// Pair outcome categories, the user's ranking, best (rank 0) -> worst.
// "connected, edge in the middle" is split into its two geometric sub-cases
// (corner on top vs corner buried in the slot) so their ranks can be judged
// separately on evidence; the user only ranked the bucket as a whole.
export const CATEGORIES = [
  'solved', // pair sitting solved in its own slot — a free XCross
  'connected-U', // intact block lying in the U layer
  'both-U', // not connected, but corner and edge both on top
  'connected-vertical', // intact block standing corner-on-top over an E-slot
  'connected-slot', // intact block parked in a slot (corner in D), not solved
  'split', // corner on top, edge stuck in an E-slot, not connected
  'buried', // corner stuck in a slot — the extraction case
];
export const rankOf = Object.fromEntries(CATEGORIES.map((c, i) => [c, i]));

/** Category of one pair given its oriented corner and edge tuples. */
export function categorize(corner, edge, slot) {
  const connected = isConnected(corner, edge);
  const cLayer = layerOf(corner);
  const eLayer = layerOf(edge);
  if (connected && tupleEq(corner, ['D', slot[0], slot[1]])) return 'solved';
  if (connected) {
    if (cLayer === 'U' && eLayer === 'U') return 'connected-U';
    if (cLayer === 'U') return 'connected-vertical';
    return 'connected-slot';
  }
  if (cLayer === 'U' && eLayer === 'U') return 'both-U';
  if (cLayer === 'U') return 'split';
  return 'buried';
}

/** Category per slot for a full state. */
export function categorizeAll(state) {
  const out = {};
  for (const slot of SLOTS) {
    out[slot] = categorize(state.get('c' + slot), state.get('e' + slot), slot);
  }
  return out;
}

/** Best (lowest) category rank across the four pairs. */
export function bestRank(categories) {
  return Math.min(...SLOTS.map((slot) => rankOf[categories[slot]]));
}

// ---------------------------------------------------------------------------
// Self-checks: hand-verified facts. Every claim below was derived move by move
// on paper before being written down.
// ---------------------------------------------------------------------------
export function selfCheck() {
  const applySeq = (seq) =>
    applyMoves(
      solvedState(),
      seq.split(' ').map((tok) => [tok[0], tok[1] === '2' ? 2 : tok[1] === "'" ? 3 : 1])
    );
  const expectCat = (seq, slot, want, note) => {
    const state = applySeq(seq);
    const got = categorize(state.get('c' + slot), state.get('e' + slot), slot);
    if (got !== want) {
      throw new Error(`self-check failed: after "${seq}" ${slot} pair is ${got}, expected ${want} (${note})`);
    }
  };

  // solved cube: every pair solved, cross solved
  const home = solvedState();
  for (const slot of SLOTS) {
    if (categorize(home.get('c' + slot), home.get('e' + slot), slot) !== 'solved') {
      throw new Error(`self-check failed: solved cube, ${slot} pair not "solved"`);
    }
  }
  if (!crossSolved(home)) throw new Error('self-check failed: solved cube, cross not solved');

  // R rotates the solved FR block onto the R face: corner UFR (white to F), edge UR — intact, on top
  expectCat('R', 'FR', 'connected-U', 'R carries the FR block up intact');
  // R U R' pulls the FR pair out as a block: corner UFL (white to L), edge UF
  expectCat("R U R'", 'FR', 'connected-U', "R U R' extracts the pair intact to the top");
  const rur = applySeq("R U R'");
  if (positionOf(rur.get('cFR')) !== 'UFL' || positionOf(rur.get('eFR')) !== 'UF') {
    throw new Error("self-check failed: R U R' should leave FR corner at UFL, edge at UF");
  }
  // R2 U moves the corner away while the edge stays at BR: broken, corner up / edge in a slot
  expectCat('R2 U', 'FR', 'split', 'R2 U splits the pair');
  // F2 stands the FR block corner-up over the FL slot (corner UFL, edge FL)
  expectCat('F2', 'FR', 'connected-vertical', 'F2 makes a vertical pair over FL');
  expectCat('F2', 'FL', 'connected-vertical', 'F2 makes a vertical pair of FL over FR');
  // U alone touches neither piece of any solved pair
  for (const slot of SLOTS) expectCat('U', slot, 'solved', 'U leaves D/E-layer pieces alone');

  // every quarter turn applied 4x is the identity on position AND orientation
  for (const face of Object.keys(ROT)) {
    for (const [id, tuple] of home) {
      let cur = tuple;
      for (let i = 0; i < 4; i++) cur = applyOriented(cur, face, 1);
      if (!tupleEq(cur, tuple)) throw new Error(`self-check failed: ${face}^4 != identity on ${id}`);
    }
  }
  // (R U R' U') x6 is the identity on position AND orientation
  const sexy = [['R', 1], ['U', 1], ['R', 3], ['U', 3]];
  for (const [id, tuple] of home) {
    let cur = tuple;
    for (let rep = 0; rep < 6; rep++) for (const [f, p] of sexy) cur = applyOriented(cur, f, p);
    if (!tupleEq(cur, tuple)) throw new Error(`self-check failed: (RUR'U')^6 != identity on ${id}`);
  }
}
