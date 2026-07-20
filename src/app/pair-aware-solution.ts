// The pair-aware cross recommendation, read from generated data.
//
// Behind the "pair-aware" mode toggle: same candidates as the ergonomic pick,
// rescored offline with a first-pair term (see cross-ranker.js
// recommendPairAware), so a line that leaves the first F2L pair in a better
// state can win when the improvement is worth its ergonomic cost. Most picks
// don't change; the sparse alternates map holds only the lines that do, and
// everything else falls back to CrossSolutionData via crossSolutionFor().
//
// The reason string is built here from three shipped facts (featured slot,
// outcome category, whether the pair was already connected after the scramble)
// rather than shipping 8000 sentences.

import { pairAwareMeta, pairAwareAlternates } from './PairAwareSolutionData';
import { crossSolutionFor, CrossSolution } from './cross-solution';

// Pair-outcome categories, best to worst — must mirror CATEGORIES in
// cross-ranker/pair-state.js (the generator's encoder); the spec asserts it.
export const PAIR_CATEGORIES = [
  'solved',
  'connected-U',
  'both-U',
  'connected-vertical',
  'connected-slot',
  'split',
  'buried',
] as const;
export type PairCategory = (typeof PAIR_CATEGORIES)[number];

const SLOTS = ['FR', 'FL', 'BR', 'BL'];
const SLOT_COLORS: Record<string, string> = {
  FR: 'green-orange',
  FL: 'green-red',
  BR: 'blue-orange',
  BL: 'blue-red',
};

// Same symbol table as the generator's encoders.
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef';

export interface PairAwareSolution extends CrossSolution {
  /** False = the ergonomic line already won; the mode shows the same moves. */
  differs: boolean;
  /** The pair this line is judged by (its best outcome), e.g. "FR". */
  slot: string;
  colors: string;
  category: PairCategory;
  /** Was that pair already connected after the scramble (visible in inspection)? */
  premade: boolean;
  /** One-sentence human reason for what the line does for the featured pair. */
  reason: string;
  /**
   * Pair-tracking features of THIS line (PairTrackingData encoding), present
   * only when the line differs — otherwise the shipped PairTrackingData entry
   * already describes it.
   */
  pairFeatures: string | null;
  /**
   * The comparison row, present only when the line differs: the ergonomic pick
   * and what it would have done to the SAME featured pair — so the trade the
   * pair-aware mode made can be checked line against line.
   */
  ergonomic: (CrossSolution & { category: PairCategory; outcome: string }) | null;
}

export function pairAwareSolutionFor(level: number, index: number): PairAwareSolution {
  const meta = pairAwareMeta[level - 1][index];
  const slotCode = ALPHABET.indexOf(meta[0]);
  const slot = SLOTS[slotCode % 4];
  const premade = slotCode >= 4;
  const category = PAIR_CATEGORIES[ALPHABET.indexOf(meta[1])];
  const colors = SLOT_COLORS[slot];

  const alt = pairAwareAlternates[level - 1][index];
  const line: CrossSolution = alt
    ? { holdColour: alt[0], turnSpeed: alt[1], moves: alt[2] }
    : crossSolutionFor(level, index);

  let ergonomic: PairAwareSolution['ergonomic'] = null;
  if (alt) {
    const ergoCategory = PAIR_CATEGORIES[ALPHABET.indexOf(alt[4])];
    ergonomic = {
      ...crossSolutionFor(level, index),
      category: ergoCategory,
      outcome: outcomeFor(ergoCategory),
    };
  }

  return {
    ...line,
    differs: !!alt,
    slot,
    colors,
    category,
    premade,
    reason: reasonFor(category, colors, premade),
    pairFeatures: alt ? alt[3] : null,
    ergonomic,
  };
}

/** Short label for a pair outcome, for the comparison row. */
export function outcomeFor(category: PairCategory): string {
  switch (category) {
    case 'solved':
      return 'pair solved';
    case 'connected-U':
      return 'connected on top';
    case 'both-U':
      return 'corner and edge on top';
    case 'connected-vertical':
      return 'connected, edge in its slot';
    case 'connected-slot':
      return 'connected in a slot';
    case 'split':
      return 'corner up, edge in a slot';
    case 'buried':
      return 'corner buried in a slot';
  }
}

/** What this line does for its featured pair, in words a solver can check. */
export function reasonFor(category: PairCategory, colors: string, premade: boolean): string {
  switch (category) {
    case 'solved':
      return `solves the ${colors} pair outright — a free XCross`;
    case 'connected-U':
      return premade
        ? `keeps your already-connected ${colors} pair — it ends connected on top`
        : `ends with the ${colors} pair connected on top`;
    case 'both-U':
      return `leaves the ${colors} corner and edge both on top`;
    case 'connected-vertical':
      return `keeps the ${colors} pair connected — corner on top, edge in the slot beneath it`;
    case 'connected-slot':
      return `keeps the ${colors} pair connected, parked in a slot`;
    case 'split':
      return `the ${colors} corner ends on top, its edge in a slot`;
    case 'buried':
      return `no good pair outcome is available — every option leaves the best corner in a slot`;
  }
}
