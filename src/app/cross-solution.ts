// The recommended cross solution for a scramble, read from generated data.
//
// crossSolutionData is produced offline by scripts/analyze-pair-tracking.mjs, which
// runs the cross-ranker for every scramble in Scrambles.ts and stores the line it
// picks. Serving it from a lookup keeps the ranker (~0.6s at level 8) off the
// runtime entirely — the app never solves or ranks in the browser.

import { crossSolutionData } from './CrossSolutionData';

export interface CrossSolution {
  /** Face to hold in front, white on the bottom. */
  holdColour: string;
  /** The ranker's ergonomic cost; lower is faster to execute. */
  turnSpeed: number;
  /** WCA-notation moves as executed in that hold. */
  moves: string;
}

export function crossSolutionFor(level: number, index: number): CrossSolution {
  const [holdColour, turnSpeed, moves] = crossSolutionData[level - 1][index];
  return { holdColour, turnSpeed, moves };
}
