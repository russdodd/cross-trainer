import { pairTrackingData } from './PairTrackingData';
import {
  decodePairFeatures,
  gradeScramble,
  indicesForBand,
  recommendPair,
  ScrambleGrade,
  totalDisruptions,
} from './pair-tracking';

// These expectations come from scripts/analyze-pair-tracking.mjs, whose analysis is
// independently validated (it asserts the cross is actually solved for all 8000
// scrambles) and whose sample output was checked on a real cube. If the encoder in
// the script and the decoder here ever drift apart, these numbers stop matching.
describe('pair tracking data', () => {
  it('has features for every scramble', () => {
    expect(pairTrackingData.length).toBe(8);
    for (const bucket of pairTrackingData) {
      expect(bucket.length).toBe(1000);
      for (const entry of bucket) {
        expect(entry.length).toBe(8);
      }
    }
  });

  it('reproduces the analysed grade distribution per level', () => {
    const expected: Record<number, Record<ScrambleGrade, number>> = {
      1: { easy: 984, medium: 0, hard: 0, none: 16 },
      2: { easy: 961, medium: 24, hard: 0, none: 15 },
      3: { easy: 855, medium: 127, hard: 3, none: 15 },
      4: { easy: 624, medium: 329, hard: 37, none: 10 },
      5: { easy: 365, medium: 526, hard: 98, none: 11 },
      6: { easy: 172, medium: 592, hard: 225, none: 11 },
      7: { easy: 65, medium: 482, hard: 440, none: 13 },
      8: { easy: 15, medium: 305, hard: 669, none: 11 },
    };
    for (let level = 1; level <= 8; level++) {
      const counts: Record<ScrambleGrade, number> = { easy: 0, medium: 0, hard: 0, none: 0 };
      for (let i = 0; i < 1000; i++) {
        counts[gradeScramble(decodePairFeatures(level, i))]++;
      }
      expect(counts).withContext(`level ${level}`).toEqual(expected[level]);
    }
  });

  // Level 3, scramble #1 — solution "L D L", verified on a cube.
  it('decodes a cube-verified scramble', () => {
    const pairs = decodePairFeatures(3, 0);
    expect(pairs).toEqual([
      { slot: 'FR', colors: 'green-orange', cornerDisruptions: 0, cornerLayer: 'U', edgeDisruptions: 2, edgeLayer: 'E' },
      { slot: 'FL', colors: 'green-red', cornerDisruptions: 1, cornerLayer: 'D', edgeDisruptions: 2, edgeLayer: 'E' },
      { slot: 'BR', colors: 'blue-orange', cornerDisruptions: 3, cornerLayer: 'D', edgeDisruptions: 0, edgeLayer: 'U' },
      { slot: 'BL', colors: 'blue-red', cornerDisruptions: 2, cornerLayer: 'U', edgeDisruptions: 0, edgeLayer: 'E' },
    ]);
    expect(gradeScramble(pairs)).toBe('easy');
    expect(recommendPair(pairs)!.colors).toBe('green-orange');
  });

  // Level 5, scramble #2 — the untouched blue-red pair the user drilled.
  it('decodes the fully untouched sample pair', () => {
    const pairs = decodePairFeatures(5, 1);
    const blueRed = pairs.find((p) => p.colors === 'blue-red')!;
    expect(totalDisruptions(blueRed)).toBe(0);
    expect(blueRed.cornerLayer).toBe('U');
    expect(blueRed.edgeLayer).toBe('U');
    expect(recommendPair(pairs)!.colors).toBe('blue-red');
  });
});

describe('pair tracking model', () => {
  it('only ever recommends a pair whose corner ends on top', () => {
    for (let level = 1; level <= 8; level++) {
      for (let i = 0; i < 1000; i++) {
        const best = recommendPair(decodePairFeatures(level, i));
        if (best) {
          expect(best.cornerLayer).withContext(`level ${level} #${i}`).toBe('U');
        }
      }
    }
  });

  it('grades a scramble by its best qualifying pair', () => {
    for (let level = 1; level <= 8; level++) {
      for (let i = 0; i < 1000; i++) {
        const pairs = decodePairFeatures(level, i);
        const best = recommendPair(pairs);
        const grade = gradeScramble(pairs);
        if (!best) {
          expect(grade).toBe('none');
          continue;
        }
        const total = totalDisruptions(best);
        const expected = total <= 2 ? 'easy' : total <= 4 ? 'medium' : 'hard';
        expect(grade).withContext(`level ${level} #${i}`).toBe(expected);
      }
    }
  });

  it('indexes only scrambles matching the requested band', () => {
    const indices = indicesForBand(5, 'hard');
    expect(indices.length).toBe(98);
    for (const i of indices) {
      expect(gradeScramble(decodePairFeatures(5, i))).toBe('hard');
    }
  });

  it('reports no hard scrambles at levels 1-2, where the cross is too short to disrupt a pair', () => {
    expect(indicesForBand(1, 'hard')).toEqual([]);
    expect(indicesForBand(2, 'hard')).toEqual([]);
  });
});
