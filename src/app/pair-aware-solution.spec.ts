// The pair-aware reveal is trustworthy only if the runtime decoder agrees with
// the offline encoder (pair-state.js / analyze-pair-tracking.mjs) about category
// order and symbol table, and if the sparse fallback really serves the ergonomic
// line. These specs pin both, plus the cube-verified founding case.

import { PAIR_CATEGORIES, pairAwareSolutionFor, reasonFor, outcomeFor } from './pair-aware-solution';
import { pairAwareMeta, pairAwareAlternates } from './PairAwareSolutionData';
import { crossSolutionFor } from './cross-solution';
import { decodePairFeaturesFrom } from './pair-tracking';
import { CATEGORIES } from './cross-ranker/pair-state.js';

describe('pair-aware solution data', () => {
  it('keeps the runtime category order in sync with the offline encoder', () => {
    const runtimeOrder: string[] = [...PAIR_CATEGORIES];
    expect(runtimeOrder).toEqual(CATEGORIES);
  });

  it('has one meta entry per scramble and alternates only at valid indices', () => {
    expect(pairAwareMeta.length).toBe(8);
    expect(pairAwareAlternates.length).toBe(8);
    for (let level = 1; level <= 8; level++) {
      expect(pairAwareMeta[level - 1].length).toBe(1000);
      for (const enc of pairAwareMeta[level - 1]) {
        expect(enc.length).toBe(2);
      }
      for (const key of Object.keys(pairAwareAlternates[level - 1])) {
        expect(Number(key)).toBeGreaterThanOrEqual(0);
        expect(Number(key)).toBeLessThan(1000);
      }
    }
  });

  // The cube-verified case from docs/improvement-ideas.md §6: the ergonomic pick
  // buries the already-connected blue-orange pair; the pair-aware line keeps it,
  // for an identical turn speed.
  it('serves the verified level 3 #5 rescue', () => {
    const sol = pairAwareSolutionFor(3, 5);
    expect(sol.differs).toBe(true);
    expect(sol.moves).toBe("D' B2 R2");
    expect(sol.holdColour).toBe('orange');
    expect(sol.slot).toBe('BR');
    expect(sol.colors).toBe('blue-orange');
    expect(sol.category).toBe('connected-U');
    expect(sol.premade).toBe(true);
    expect(sol.turnSpeed).toBe(crossSolutionFor(3, 5).turnSpeed);
    expect(sol.reason).toContain('already-connected blue-orange pair');
    // the shipped features for the alternate line decode, and its featured pair
    // really ends corner-up
    const pairs = decodePairFeaturesFrom(sol.pairFeatures!);
    expect(pairs.length).toBe(4);
    expect(pairs.find(p => p.slot === 'BR')!.cornerLayer).toBe('U');
    // the comparison row: the ergonomic line buried this same pair (cube-verified)
    expect(sol.ergonomic!.moves).toBe(crossSolutionFor(3, 5).moves);
    expect(sol.ergonomic!.category).toBe('buried');
    expect(sol.ergonomic!.outcome).toBe('corner buried in a slot');
  });

  it('falls back to the ergonomic line when the pick did not change', () => {
    const index = Array.from({ length: 1000 }, (_, i) => i).find(
      i => pairAwareAlternates[0][i] === undefined
    )!;
    const sol = pairAwareSolutionFor(1, index);
    const ergo = crossSolutionFor(1, index);
    expect(sol.differs).toBe(false);
    expect(sol.moves).toBe(ergo.moves);
    expect(sol.holdColour).toBe(ergo.holdColour);
    expect(sol.turnSpeed).toBe(ergo.turnSpeed);
    expect(sol.pairFeatures).toBeNull();
    expect(sol.ergonomic).toBeNull();
  });

  it('words every category and names the pair', () => {
    const seen = new Set<string>();
    for (const category of PAIR_CATEGORIES) {
      const reason = reasonFor(category, 'green-orange', false);
      expect(reason).toContain(category === 'buried' ? 'pair outcome' : 'green-orange');
      seen.add(reason);
    }
    expect(seen.size).toBe(PAIR_CATEGORIES.length);
    // the premade flavour is a distinct sentence where it matters
    expect(reasonFor('connected-U', 'blue-red', true)).not.toBe(reasonFor('connected-U', 'blue-red', false));
    // every category also has a distinct short outcome label for the comparison row
    expect(new Set(PAIR_CATEGORIES.map(outcomeFor)).size).toBe(PAIR_CATEGORIES.length);
  });
});
