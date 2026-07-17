// Oriented cross-edge tracker.
//
// scripts/analyze-pair-tracking.mjs has a position-only tracker, which is all it
// needs ("was this piece displaced?"). Staging needs more: an edge is only
// *solved* if it is both home AND correctly oriented, since a flipped edge in the
// right slot is not solved. So we track each sticker's face rather than just the
// piece's position.
//
// Representation: an edge is an ordered pair [faceOfWhiteSticker, faceOfOther].
// A face turn maps every sticker's face letter through ROT (the turned face maps
// to itself), which handles position and orientation in one step.
//
// Frame: white bottom, green front (the solving frame, i.e. cross.solve()'s
// sols[1]) - so U=yellow, D=white, F=green, B=blue, L=red, R=orange.

/** Where each face's letters go under a clockwise quarter turn of that face. */
const ROT = {
  U: { F: 'L', L: 'B', B: 'R', R: 'F' },
  D: { F: 'R', R: 'B', B: 'L', L: 'F' },
  R: { F: 'U', U: 'B', B: 'D', D: 'F' },
  L: { F: 'D', D: 'B', B: 'U', U: 'F' },
  F: { U: 'R', R: 'D', D: 'L', L: 'U' },
  B: { U: 'L', L: 'D', D: 'R', R: 'U' },
};

/** The 4 white cross edges, by the colour of their non-white sticker. */
export const CROSS_EDGES = [
  { colour: 'green', home: ['D', 'F'] },
  { colour: 'orange', home: ['D', 'R'] },
  { colour: 'blue', home: ['D', 'B'] },
  { colour: 'red', home: ['D', 'L'] },
];

/** Colour of the face at each position, in the solving frame. */
export const FACE_COLOUR = { U: 'yellow', D: 'white', F: 'green', B: 'blue', L: 'red', R: 'orange' };

/** Apply one quarter turn to a single sticker's face letter. */
const turnSticker = (sticker, face) => (sticker === face ? sticker : ROT[face][sticker]);

/**
 * Apply `power` quarter turns of `face` to an oriented edge [white, other].
 *
 * A turn only moves pieces that sit on the turned face, so edges elsewhere are
 * returned untouched. That guard is also what keeps the ROT lookup total: for an
 * edge on the face, one sticker is on `face` itself (and stays) and the other is
 * necessarily on one of the four side faces ROT[face] maps.
 */
export function applyMove(edge, face, power) {
  if (edge[0] !== face && edge[1] !== face) {
    return edge;
  }
  let cur = edge;
  for (let i = 0; i < power; i++) {
    cur = [turnSticker(cur[0], face), turnSticker(cur[1], face)];
  }
  return cur;
}

const sameEdge = (a, b) => a[0] === b[0] && a[1] === b[1];

/** "R2" / "U" / "F'" -> [face, quarterTurns]. */
export function parseMove(token) {
  const face = token[0];
  const power = token[1] === '2' ? 2 : token[1] === "'" ? 3 : 1;
  return [face, power];
}

/** z2 relabel: scrambles are executed white-top/green-front, we work white-bottom. */
const Z2 = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'F', B: 'B' };

/** A WCA scramble string as [face, power] pairs in the solving (z2) frame. */
export function scrambleMovesInSolvingFrame(scrambleStr) {
  return scrambleStr
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const [face, power] = parseMove(token);
      return [Z2[face], power];
    });
}

/** Positions of the 4 cross edges after a scramble, in the solving frame. */
export function crossEdgesAfterScramble(scrambleStr) {
  const state = CROSS_EDGES.map((e) => e.home);
  const moves = scrambleMovesInSolvingFrame(scrambleStr);
  return state.map((edge) => {
    let cur = edge;
    for (const [face, power] of moves) {
      cur = applyMove(cur, face, power);
    }
    return cur;
  });
}

/** True once every cross edge is home and correctly oriented. */
export function crossSolved(state) {
  return state.every((edge, i) => sameEdge(edge, CROSS_EDGES[i].home));
}

const solvedCount = (state) => state.filter((edge, i) => sameEdge(edge, CROSS_EDGES[i].home)).length;

/**
 * Walk a solution, measuring how it gets to the cross.
 *
 * `staged` is the cognitive-load signal: the area under the "edges solved so far"
 * curve, normalised so 1 means everything was already done and 0 means nothing
 * lands until the final move. Higher is easier to hold in your head, because the
 * cross gets built in stages rather than every piece interacting at once:
 *
 *   F' L B R' F U R2 U  -> progress 0,1,2,2,3,3,4,4  staged 0.59  (staged)
 *   D' U' B' L' R' F R2 D' -> progress 0,0,0,0,0,0,0,4  staged 0.13  (all at once)
 *
 * `breaks` (a placed edge being disturbed again) is reported as evidence, but it
 * is a poor ranking signal on its own - optimal cross solutions almost never
 * break a placed edge, so it is 0 for nearly every candidate. `staged` subsumes
 * it anyway: breaking an edge pushes the progress curve back down.
 */
export function trackSolution(scrambleStr, solutionTokens) {
  let state = crossEdgesAfterScramble(scrambleStr);
  let breaks = 0;
  const solvedAfter = [];
  for (const token of solutionTokens) {
    const [face, power] = parseMove(token);
    const next = state.map((edge) => applyMove(edge, face, power));
    for (let i = 0; i < state.length; i++) {
      if (sameEdge(state[i], CROSS_EDGES[i].home) && !sameEdge(next[i], CROSS_EDGES[i].home)) {
        breaks++;
      }
    }
    state = next;
    solvedAfter.push(solvedCount(state));
  }
  const staged = solutionTokens.length
    ? solvedAfter.reduce((a, b) => a + b, 0) / (CROSS_EDGES.length * solutionTokens.length)
    : 1;
  return { breaks, staged, solvedAfter, state };
}

/**
 * Hand-verified facts about the tracker. Cheap, and the whole ranking rests on
 * this being right, so it runs before any analysis.
 */
export function selfCheck() {
  const expect = (edge, face, power, want, note) => {
    const got = applyMove(edge, face, power);
    if (!sameEdge(got, want)) {
      throw new Error(`tracker self-check failed: ${face}${power} on ${edge} -> ${got}, expected ${want} (${note})`);
    }
  };

  // F clockwise cycles the front face's edges UF -> FR -> DF -> FL -> UF
  expect(['D', 'F'], 'F', 1, ['L', 'F'], 'F sends the DF edge to FL, white sticker onto L');
  expect(['U', 'F'], 'F', 1, ['R', 'F'], 'F sends the UF edge to FR');
  // R does not flip edges (orientation convention: only F/B quarter turns do)
  expect(['D', 'R'], 'R', 1, ['F', 'R'], 'R sends the DR edge to FR');
  expect(['D', 'R'], 'R', 2, ['U', 'R'], 'R2 sends the DR edge to UR');
  // moves that miss a piece leave it alone
  expect(['D', 'F'], 'U', 1, ['D', 'F'], 'U does not touch bottom-layer edges');
  expect(['D', 'F'], 'R', 1, ['D', 'F'], 'R does not touch the DF edge');
  // D moves the cross edges without flipping them
  expect(['D', 'F'], 'D', 1, ['D', 'R'], 'D sends the DF edge to DR, white stays on D');

  const positions = [
    ['D', 'F'], ['D', 'R'], ['D', 'B'], ['D', 'L'],
    ['U', 'F'], ['F', 'R'], ['U', 'B'], ['B', 'L'],
  ];

  // every quarter turn, 4x, is the identity
  for (const face of Object.keys(ROT)) {
    for (const edge of positions) {
      let cur = edge;
      for (let i = 0; i < 4; i++) {
        cur = applyMove(cur, face, 1);
      }
      if (!sameEdge(cur, edge)) {
        throw new Error(`tracker self-check failed: ${face}^4 is not the identity on ${edge}`);
      }
    }
  }

  // (R U R' U')^6 is the identity
  const sexy = [['R', 1], ['U', 1], ['R', 3], ['U', 3]];
  for (const edge of positions) {
    let cur = edge;
    for (let rep = 0; rep < 6; rep++) {
      for (const [face, power] of sexy) {
        cur = applyMove(cur, face, power);
      }
    }
    if (!sameEdge(cur, edge)) {
      throw new Error(`tracker self-check failed: (R U R' U')^6 is not the identity on ${edge}`);
    }
  }
}
