// Ranks cross solutions by how pleasant they are for a human, not just by length.
//
// cross.solve() returns whichever optimal solution its IDA* search reaches first,
// and because that search tries faces in the fixed order F, R, U, B, L, D, the
// result skews towards F/B-heavy lines - the least finger-friendly faces. It also
// says nothing about how to hold the cube.
//
// So: enumerate every optimal and optimal+1 solution, score each one in all four
// white-bottom holds, and pick the best. The signal is ergonomics - Trangium's
// algSpeed (see algSpeed.js), which simulates grips and fingertricks.
//
// There used to be a second "staging" term: a bonus for building the cross in
// stages rather than having every piece interact at once. It was removed in July
// 2026 after being measured. Even once its metric was fixed to tolerate cross
// alignment, it changed ~1% of picks, and only ever separated genuine ties -
// ergonomic differences between candidates dwarfed its ~0.25 spread. It bought
// nothing for the machinery it cost. See docs/improvement-ideas.md §5.

import { algSpeed } from './algSpeed.js';
import { enumerateSolutions } from './cross-states.js';
import {
  stateAfterScramble,
  applyTokens,
  crossSolved,
  categorizeAll,
  bestRank,
  rankOf,
  SLOTS,
  SLOT_COLORS,
  isConnected,
} from './pair-state.js';

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

/** Every candidate scored in every hold, best first. */
export function rankSolutions(scrambleStr, extra = 1) {
  const { optimal, solutions } = enumerateSolutions(scrambleStr, extra);
  const ranked = [];

  for (const tokens of solutions) {
    const extraMoves = tokens.length - optimal;
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
        score: ergo + EXTRA_MOVE_MARGIN * extraMoves,
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

/**
 * What one category rank of first-pair outcome is worth, in algSpeed units.
 *
 * Measured over all 8000 scrambles (docs/improvement-ideas.md §6): at 1, the
 * pick changes on 27-55% of scrambles at levels 4-8, buying ~2.5 category ranks
 * for a median sacrifice of 0.6-1.2 — under one move. Strictly prioritising the
 * pair (the "phased" architecture) cost ~3 per pick and was rejected.
 */
export const PAIR_WEIGHT = 1;

/**
 * The recommended solution when the first F2L pair is taken into account.
 *
 * Same candidates as recommend() — every optimal and optimal+1 line in its best
 * hold — rescored as score + PAIR_WEIGHT x (best pair's category rank), where
 * categories are the human-ranked outcomes in pair-state.js (solved > connected
 * on top > both on top > ...). A pair outcome only changes the pick when it is
 * worth its ergonomic cost; ties keep the ergonomic pick. The pair's fate is
 * decided by the physical moves alone, so each line is evaluated once (holds
 * only relabel it).
 *
 * Returns both picks plus what the winning line does for its featured pair —
 * enough to build the one-sentence human reason the UI shows.
 */
export function recommendPairAware(scrambleStr, extra = 1) {
  const { optimal, candidateCount, ranked } = rankSolutions(scrambleStr, extra);
  const start = stateAfterScramble(scrambleStr);
  const premadeSlots = SLOTS.filter((slot) =>
    isConnected(start.get('c' + slot), start.get('e' + slot))
  );

  // ranked is sorted by score, so the first sighting of each base is that
  // physical line in its best hold — and the first entry overall is recommend()'s pick.
  const seen = new Set();
  let winner = null;
  let ergonomic = null; // the first unique base IS recommend()'s pick
  for (const cand of ranked) {
    const key = cand.base.join(' ');
    if (seen.has(key)) continue;
    seen.add(key);
    const end = applyTokens(start, cand.base);
    if (!crossSolved(end)) {
      throw new Error(`candidate "${cand.base.join(' ')}" does not solve the cross for "${scrambleStr}"`);
    }
    const cats = categorizeAll(end);
    const rank = bestRank(cats);
    const combined = cand.score + PAIR_WEIGHT * rank;
    const entry = { cand, cats, rank, combined };
    if (!ergonomic) ergonomic = entry;
    if (!winner || combined < winner.combined) {
      winner = entry;
    }
  }

  // Featured pair: the slot delivering the winning line's best category,
  // preferring one that was already connected after the scramble (the most
  // human-visible reason), then slot order for determinism.
  const featuredSlot =
    SLOTS.filter((slot) => rankOf[winner.cats[slot]] === winner.rank).sort(
      (a, b) => (premadeSlots.includes(a) ? 0 : 1) - (premadeSlots.includes(b) ? 0 : 1)
    )[0];

  return {
    optimal,
    candidateCount,
    best: ranked[0],
    pairAware: {
      ...winner.cand,
      differs: winner.cand !== ranked[0],
      category: winner.cats[featuredSlot],
      slot: featuredSlot,
      colors: SLOT_COLORS[featuredSlot],
      premade: premadeSlots.includes(featuredSlot),
      /** The SAME featured pair's fate under the ergonomic line — the apples-to-apples comparison. */
      ergonomicCategory: ergonomic.cats[featuredSlot],
    },
  };
}
