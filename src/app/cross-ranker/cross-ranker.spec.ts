// The ranking is only as trustworthy as its cube maths, and a wrong hold or a
// mis-mapped frame would produce advice that looks plausible and does not solve
// the cross. These specs pin the things that would fail silently.

import { cross } from '../cstimer/cross.js';
import { distanceTable, enumerateSolutions, optimalLength, N_STATES } from './cross-states.js';
import { rankSolutions, relabelForHold, recommend, FRONT_COLOURS, EXTRA_MOVE_MARGIN } from './cross-ranker.js';
import { selfCheck, trackSolution, crossSolved, solvedCountAligned, crossEdgesAfterScramble, applyMove, parseMove } from './cube-tracker.js';
import { scrambles } from '../Scrambles';

const MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];
const decodeScramble = (enc: string) =>
  [...enc].map((ch) => MoveNamesWCA[ch.charCodeAt(0) - 65]).join(' ');

// z2 is its own inverse, so the same map takes a solving-frame move back to the
// WCA frame the scramble is written in.
const Z2: Record<string, string> = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'F', B: 'B' };
const toWcaFrame = (tokens: string[]) => tokens.map((t) => Z2[t[0]] + t.slice(1));

describe('cube-tracker', () => {
  it('passes its hand-verified self-checks', () => {
    expect(() => selfCheck()).not.toThrow();
  });

  it('scores a staged solution above one where everything lands at the end', () => {
    // contrived: both solve, but one builds up and one does not
    const scramble = decodeScramble(scrambles[5][0]);
    const { solutions } = enumerateSolutions(scramble, 1);
    const staged = solutions.map((s: string[]) => trackSolution(scramble, s).staged);
    expect(Math.max(...staged)).toBeGreaterThan(Math.min(...staged));
  });

  // The bug this guards: counting exact edge positions marked an ordered-but-
  // unaligned cross as unsolved until the final aligning D, so a solution that
  // was done from move one read as "everything lands at once". Scrambles.ts 4[14]
  // is the case: F2 D' B' D', where the trailing D' is pure alignment.
  it('counts an ordered-but-unaligned cross as done, not as landing at the end', () => {
    const scramble = decodeScramble(scrambles[3][14]);
    const solverLine = cross.solve(scramble)[1].map((m: string) => m.trim());
    expect(solverLine.join(' ')).toBe("F2 D' B' D'");

    const { solvedAfter, staged } = trackSolution(scramble, solverLine);

    expect(solvedAfter).toEqual([3, 3, 4, 4]);
    expect(staged).toBeCloseTo(0.875, 3);
  });

  describe('solvedCountAligned', () => {
    const SOLVED = [['D', 'F'], ['D', 'R'], ['D', 'B'], ['D', 'L']];

    it('counts a whole cross that is ordered but rotated as done', () => {
      for (const k of [1, 2, 3]) {
        expect(solvedCountAligned(SOLVED.map((e) => applyMove(e, 'D', k)))).toBe(4);
      }
    });

    it('credits a lone bottom edge from whichever offset suits it', () => {
      // only the green edge is placed, and it is a D away from home
      const state = [['D', 'R'], ['U', 'B'], ['U', 'F'], ['U', 'L']];
      expect(solvedCountAligned(state)).toBe(1);
    });

    it('credits two bottom edges that are in the right relative order', () => {
      const state = [['D', 'F'], ['D', 'R'], ['U', 'B'], ['U', 'L']];
      expect(solvedCountAligned(state)).toBe(2);
    });

    // The self-limiting property: no single D can place both, so they are not
    // both done, and the metric must not pretend otherwise.
    it('credits only one of two bottom edges in the wrong relative order', () => {
      // green at DF, orange at DB — orange belongs at DR, one step the other way
      const state = [['D', 'F'], ['D', 'B'], ['U', 'B'], ['U', 'L']];
      expect(solvedCountAligned(state)).toBe(1);
    });

    it('credits nothing when no cross edge is on the bottom', () => {
      expect(solvedCountAligned([['U', 'F'], ['U', 'R'], ['U', 'B'], ['U', 'L']])).toBe(0);
    });

    // A flipped edge sitting in its own slot is not done, however you rotate.
    it('does not credit a flipped bottom edge', () => {
      const state = [['F', 'D'], ['U', 'R'], ['U', 'B'], ['U', 'L']];
      expect(solvedCountAligned(state)).toBe(0);
    });
  });

  // crossSolved must stay strict: the validation harness uses it to prove a
  // recommended line genuinely solves the cross, alignment included.
  it('keeps crossSolved strict about alignment', () => {
    const solved = [['D', 'F'], ['D', 'R'], ['D', 'B'], ['D', 'L']];
    expect(crossSolved(solved)).toBe(true);
    expect(crossSolved(solved.map((e) => applyMove(e, 'D', 1)))).toBe(false);
  });
});

describe('cross-states', () => {
  it('reproduces the state counts cross.js hardcodes', () => {
    // distanceTable() throws if the histogram disagrees; this pins the size too
    const dist = distanceTable();
    expect(dist.length).toBe(N_STATES);
    expect(dist[0]).toBe(0);
  });

  it('agrees with the solver on optimal length for every level', () => {
    for (let level = 1; level <= 8; level++) {
      const scramble = decodeScramble(scrambles[level - 1][0]);
      expect(optimalLength(scramble)).toBe(level);
      expect(cross.solve(scramble)[1].length).toBe(level);
    }
  });

  it("includes the solver's own solution among the enumerated optimal ones", () => {
    for (const level of [2, 4, 6, 7]) {
      const scramble = decodeScramble(scrambles[level - 1][1]);
      const solver = cross.solve(scramble)[1].map((m: string) => m.trim()).join(' ');
      const { solutions } = enumerateSolutions(scramble, 0);
      expect(solutions.map((s: string[]) => s.join(' '))).toContain(solver);
    }
  });

  it('only ever emits solutions of optimal or optimal+1 length', () => {
    const scramble = decodeScramble(scrambles[4][2]);
    const { optimal, solutions } = enumerateSolutions(scramble, 1);
    for (const sol of solutions) {
      expect(sol.length).toBeGreaterThanOrEqual(optimal);
      expect(sol.length).toBeLessThanOrEqual(optimal + 1);
    }
  });
});

describe('relabelForHold', () => {
  it('leaves U and D alone and cycles the side faces', () => {
    // holding the old R face in front means a move called R is now called F
    expect(relabelForHold(['R', 'U', 'D2'], 1)).toEqual(['F', 'U', 'D2']);
    expect(relabelForHold(['F'], 1)).toEqual(['L']);
    expect(relabelForHold(['L'], 1)).toEqual(['B']);
    expect(relabelForHold(['B'], 1)).toEqual(['R']);
  });

  it('preserves modifiers', () => {
    expect(relabelForHold(["R'", 'B2'], 1)).toEqual(["F'", 'R2']);
  });

  it('returns to the original after four turns', () => {
    const moves = ["R", "B2", "L'", 'U', 'D2', 'F'];
    expect(relabelForHold(moves, 4)).toEqual(moves);
  });

  it('has a colour for every hold', () => {
    expect(FRONT_COLOURS.length).toBe(4);
    expect(FRONT_COLOURS[0]).toBe('green');
  });
});

describe('rankSolutions', () => {
  it('recommends a line that actually solves the cross, at every level', () => {
    for (let level = 1; level <= 8; level++) {
      const scramble = decodeScramble(scrambles[level - 1][3]);
      const { best } = recommend(scramble);

      // our tracker
      let state = crossEdgesAfterScramble(scramble);
      for (const token of best.base) {
        const [face, power] = parseMove(token);
        state = state.map((e: string[]) => applyMove(e, face, power));
      }
      expect(crossSolved(state)).withContext(`level ${level} tracker`).toBe(true);

      // and the solver itself, independently
      const combined = scramble + ' ' + toWcaFrame(best.base).join(' ');
      expect(cross.solve(combined)[1].length).withContext(`level ${level} solver`).toBe(0);
    }
  });

  it('never recommends a line longer than optimal+1', () => {
    const scramble = decodeScramble(scrambles[5][4]);
    const { optimal, best } = recommend(scramble);
    expect(best.length).toBeLessThanOrEqual(optimal + 1);
  });

  it('only pays for an extra move when it wins by the margin', () => {
    const scramble = decodeScramble(scrambles[5][6]);
    const { ranked } = rankSolutions(scramble, 1);
    const best = ranked[0];
    if (best.extraMoves > 0) {
      const bestOptimal: any = ranked.find((r: any) => r.extraMoves === 0);
      // the +1 line only wins if it beats the best optimal on raw ergonomics by
      // more than the margin it is charged
      expect(bestOptimal.ergo - best.ergo).toBeGreaterThan(EXTRA_MOVE_MARGIN - 1);
    }
  });

  it('scores the same solution differently in different holds', () => {
    const scramble = decodeScramble(scrambles[3][0]);
    const { ranked } = rankSolutions(scramble, 0);
    const holds = new Set(ranked.map((r: any) => r.holdColour));
    expect(holds.size).toBe(4);
    expect(new Set(ranked.map((r: any) => r.ergo)).size).toBeGreaterThan(1);
  });
});
