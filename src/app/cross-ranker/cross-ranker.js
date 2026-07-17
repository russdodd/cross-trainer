// Ranks cross solutions by how pleasant they are for a human, not just by length.
//
// cross.solve() returns whichever optimal solution its IDA* search reaches first,
// and because that search tries faces in the fixed order F, R, U, B, L, D, the
// result skews towards F/B-heavy lines - the least finger-friendly faces. It also
// says nothing about how to hold the cube.
//
// So: enumerate every optimal and optimal+1 solution, score each one in all four
// white-bottom holds, and pick the best. Two signals:
//
//   ergonomics - Trangium's algSpeed (see algSpeed.js), which simulates grips and
//     fingertricks. This is the dominant term.
//   staging    - a small bonus for building the cross in stages rather than
//     having every piece interact at once (see trackSolution), standing in for
//     cognitive load.
//
// Staging can only ever choose between candidates that are already within one
// move of optimal, so it can never prefer a long solution over a short one.

import { algSpeed } from './algSpeed.js';
import { enumerateSolutions } from './cross-states.js';
import { trackSolution } from './cube-tracker.js';

/**
 * How much a fully staged solution (staged=1) is worth in algSpeed units.
 *
 * Deliberately small: ergonomics decides, staging only breaks ties. Candidate
 * staged values span ~0.25, so at 1.5 this shifts a score by ~0.38 - enough to
 * separate ergonomically similar lines, not enough to override a real ergonomic
 * difference. Set to 0 to disable staging entirely.
 *
 * Was 1.0 when `staged` counted exact edge positions and spanned ~0.38; the
 * alignment-tolerant fix shrank the spread to ~0.25, so the weight rose to keep
 * the same intended influence.
 *
 * Measured, and worth knowing before leaning on it: this term is close to inert.
 * At 1.5 it changes ~1% of picks (2.5 changes ~4%), and where it does, the
 * ergonomic and staged deltas are both ~0.00 - i.e. it only ever separates
 * genuine ties, because ergonomic differences between candidates are far larger
 * than 0.25. That is the design working as intended, not a bug, but it means the
 * staged signal is not what makes the recommendations good. The blind line votes
 * (line-feedback.service.ts) are the way to settle whether it should be stronger.
 */
export const STAGING_WEIGHT = 1.5;

/**
 * What each extra move must earn, in algSpeed units, to be worth showing.
 *
 * algSpeed already prices the extra move's turning time, so without this an
 * optimal+1 line wins on any improvement at all - including noise like 8.0 vs
 * 7.9, which is not worth an extra move to remember. This charges the +1 line for
 * the memory load algSpeed doesn't model, so it has to win by a clear margin.
 */
export const EXTRA_MOVE_MARGIN = 1.5;

/** Faces that keep their name under a y rotation. */
const FIXED_FACES = { U: 'U', D: 'D' };

// One y rotation as a relabel. Rotating the cube so the face on the RIGHT comes
// to the FRONT means a move that used to be called "R" is now called "F"; the old
// front swings to the left, and so on round the cycle.
const Y_RELABEL = { R: 'F', F: 'L', L: 'B', B: 'R', ...FIXED_FACES };

/** Colour facing you after k y-rotations, starting from white bottom / green front. */
export const FRONT_COLOURS = ['green', 'orange', 'blue', 'red'];

/** Rewrite a solution as it would be executed with a different face in front. */
export function relabelForHold(tokens, k) {
  return tokens.map((token) => {
    let face = token[0];
    for (let i = 0; i < k; i++) {
      face = Y_RELABEL[face];
    }
    return face + token.slice(1);
  });
}

/**
 * Ergonomic cost of a sequence; lower is faster to execute.
 *
 * algSpeed returns an error string rather than a number if it cannot parse a
 * move, so this refuses to let one quietly become NaN in a score. It is also the
 * only place that calls the vendored scorer: callers get a plain number.
 *
 * `ignoreauf` must stay false. With it on, algSpeed strips a leading/trailing U
 * ("U R U R' U'" then scores the same as "R U R' U'"), which is right for an alg
 * with an AUF but wrong here - every move of a cross solution is a real move.
 *
 * @param {string[]} tokens
 * @returns {number}
 */
export function ergonomics(tokens) {
  const score = algSpeed(tokens.join(' '), false, false);
  if (typeof score !== 'number' || !isFinite(score)) {
    throw new Error(`algSpeed could not score "${tokens.join(' ')}": ${JSON.stringify(score)}`);
  }
  return score;
}

/**
 * Every candidate scored in every hold, best first.
 *
 * `breaks` is a property of the physical solution, so it is computed once per
 * candidate rather than once per hold - rotating the cube cannot change which
 * edges get disturbed.
 */
export function rankSolutions(scrambleStr, extra = 1) {
  const { optimal, solutions } = enumerateSolutions(scrambleStr, extra);
  const ranked = [];

  for (const tokens of solutions) {
    const { breaks, staged, solvedAfter } = trackSolution(scrambleStr, tokens);
    const extraMoves = tokens.length - optimal;
    const adjustment = EXTRA_MOVE_MARGIN * extraMoves - STAGING_WEIGHT * staged;
    for (let k = 0; k < 4; k++) {
      const moves = relabelForHold(tokens, k);
      const ergo = ergonomics(moves);
      ranked.push({
        /** The solution as executed in this hold. */
        moves,
        /** The same solution in the default green-front frame, as cross.js states it. */
        base: tokens,
        holdColour: FRONT_COLOURS[k],
        length: tokens.length,
        extraMoves,
        ergo,
        breaks,
        staged,
        solvedAfter,
        score: ergo + adjustment,
      });
    }
  }

  ranked.sort((a, b) => a.score - b.score || a.length - b.length);
  return { optimal, candidateCount: solutions.length, ranked };
}

/** The single recommended solution for a scramble. */
export function recommend(scrambleStr, extra = 1) {
  const { optimal, candidateCount, ranked } = rankSolutions(scrambleStr, extra);
  return { optimal, candidateCount, best: ranked[0], ranked };
}
