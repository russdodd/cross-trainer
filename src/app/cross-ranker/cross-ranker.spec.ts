// The ranking is only as trustworthy as its cube maths, and a wrong hold or a
// mis-mapped frame would produce advice that looks plausible and does not solve
// the cross. These specs pin the things that would fail silently.

import { cross } from '../cstimer/cross.js';
import { distanceTable, enumerateSolutions, optimalLength, N_STATES } from './cross-states.js';
import { rankSolutions, relabelForHold, recommend, recommendPairAware, FRONT_COLOURS, EXTRA_MOVE_MARGIN, PAIR_WEIGHT } from './cross-ranker.js';
import { selfCheck, crossSolved, crossEdgesAfterScramble, applyMove, parseMove } from './cube-tracker.js';
import { selfCheck as pairSelfCheck, CATEGORIES, rankOf, stateAfterScramble, applyTokens, categorizeAll, bestRank } from './pair-state.js';
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

  // crossSolved is strict about alignment, and the validation harness depends on
  // that: it uses it to prove a recommended line genuinely solves the cross.
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

describe('recommendPairAware', () => {
  it('passes the oriented tracker self-checks', () => {
    expect(() => pairSelfCheck()).not.toThrow();
  });

  // The cube-verified founding case (docs/improvement-ideas.md §6): same three
  // moves, and the order of the last two decides whether the already-connected
  // blue-orange pair survives. The rescue is free — identical score.
  it('rescues the pre-made pair on the verified level 3 #5 case, for free', () => {
    const scramble = decodeScramble(scrambles[2][5]);
    const { best, pairAware } = recommendPairAware(scramble);
    expect(best.base.join(' ')).toBe("D' B2 L2");
    expect(pairAware.base.join(' ')).toBe("D' L2 B2");
    expect(pairAware.differs).toBe(true);
    expect(pairAware.category).toBe('connected-U');
    expect(pairAware.slot).toBe('BR');
    expect(pairAware.premade).toBe(true);
    expect(pairAware.score).toBeCloseTo(best.score, 5);
  });

  it('recommends a pair-aware line that actually solves the cross', () => {
    for (const level of [2, 3, 4, 5]) {
      const scramble = decodeScramble(scrambles[level - 1][7]);
      const { optimal, pairAware } = recommendPairAware(scramble);
      expect(pairAware.length).toBeLessThanOrEqual(optimal + 1);
      expect(CATEGORIES).toContain(pairAware.category);
      // the solver, independently
      const combined = scramble + ' ' + toWcaFrame(pairAware.base).join(' ');
      expect(cross.solve(combined)[1].length).withContext(`level ${level}`).toBe(0);
    }
  });

  it('only deviates from the ergonomic pick when the pair outcome pays for it', () => {
    for (const level of [3, 4, 5]) {
      const scramble = decodeScramble(scrambles[level - 1][9]);
      const { best, pairAware } = recommendPairAware(scramble);
      if (pairAware.differs) {
        // ties in the combined objective keep the ergonomic pick, so a switch
        // means a strictly better pair category that more than covers the
        // ergonomic sacrifice at PAIR_WEIGHT
        const ergoRank = bestRank(categorizeAll(applyTokens(stateAfterScramble(scramble), best.base)));
        const awareRank = rankOf[pairAware.category];
        expect(awareRank).toBeLessThan(ergoRank);
        expect(pairAware.score - best.score).toBeLessThan(PAIR_WEIGHT * (ergoRank - awareRank));
      }
    }
  });
});
