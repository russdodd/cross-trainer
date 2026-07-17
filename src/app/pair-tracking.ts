// First-F2L-pair tracking difficulty.
//
// Every scramble in Scrambles.ts has pre-computed features in PairTrackingData.ts
// describing how each of the 4 F2L pairs behaves during the recommended (ergonomic)
// cross solution — the same line the app ships (see cross-solution.ts): how many
// solution moves displace each piece, and which layer it ends in. Those features
// were produced (and cube-verified) by scripts/analyze-pair-tracking.mjs.
//
// The model has two axes:
//   favourability - a pair is only worth tracking if its corner ends in the top
//     layer. After the cross is solved a corner can only be on top or stuck in an
//     F2L slot, so a corner in the D layer means an extraction and a worse case.
//   disruptions - how much work the tracking itself takes. A scramble is graded by
//     its BEST qualifying pair, since that is the one a solver would pick.

import { pairTrackingData } from './PairTrackingData';

export type TrackingBand = 'easy' | 'medium' | 'hard';
/** 'none' = no pair ends with its corner on top, so there is nothing worth tracking. */
export type ScrambleGrade = TrackingBand | 'none';

export const EASY_MAX = 2;
export const MEDIUM_MAX = 4;

export interface PairFeatures {
  /** F2L slot the pair belongs in, e.g. "FR". */
  slot: string;
  /** The pair's two non-white colours, e.g. "green-orange". */
  colors: string;
  cornerDisruptions: number;
  edgeDisruptions: number;
  /** 'U' = ends on top, 'D' = ends stuck in an F2L slot. */
  cornerLayer: 'U' | 'D';
  /** 'U' = ends on top, 'E' = ends stuck in an F2L slot. */
  edgeLayer: 'U' | 'E';
}

// Slot order and colours assume the scramble is applied white-top / green-front,
// then flipped z2 to solve. Must match PAIRS in analyze-pair-tracking.mjs.
const SLOTS = ['FR', 'FL', 'BR', 'BL'];
const SLOT_COLORS: Record<string, string> = {
  FR: 'green-orange',
  FL: 'green-red',
  BR: 'blue-orange',
  BL: 'blue-red',
};

// Mirrors the encoder in analyze-pair-tracking.mjs:
//   char = ALPHABET[disruptions * 2 + (endsOnTop ? 1 : 0)]
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef';

export function decodePairFeatures(level: number, index: number): PairFeatures[] {
  const enc = pairTrackingData[level - 1][index];
  const pairs: PairFeatures[] = [];
  for (let i = 0; i < 4; i++) {
    const c = ALPHABET.indexOf(enc[i * 2]);
    const e = ALPHABET.indexOf(enc[i * 2 + 1]);
    pairs.push({
      slot: SLOTS[i],
      colors: SLOT_COLORS[SLOTS[i]],
      cornerDisruptions: c >> 1,
      cornerLayer: (c & 1) === 1 ? 'U' : 'D',
      edgeDisruptions: e >> 1,
      edgeLayer: (e & 1) === 1 ? 'U' : 'E',
    });
  }
  return pairs;
}

export function totalDisruptions(pair: PairFeatures): number {
  return pair.cornerDisruptions + pair.edgeDisruptions;
}

/** A pair is only worth tracking if its corner ends on top rather than in a slot. */
export function qualifies(pair: PairFeatures): boolean {
  return pair.cornerLayer === 'U';
}

export function bandOf(total: number): TrackingBand {
  if (total <= EASY_MAX) {
    return 'easy';
  }
  if (total <= MEDIUM_MAX) {
    return 'medium';
  }
  return 'hard';
}

export function gradeScramble(pairs: PairFeatures[]): ScrambleGrade {
  const qualifying = pairs.filter(qualifies);
  if (!qualifying.length) {
    return 'none';
  }
  return bandOf(Math.min(...qualifying.map(totalDisruptions)));
}

/** Fewest disruptions, tie-broken toward an edge that also ends on top. */
export function recommendPair(pairs: PairFeatures[]): PairFeatures | null {
  const qualifying = pairs.filter(qualifies);
  if (!qualifying.length) {
    return null;
  }
  return [...qualifying].sort(
    (a, b) =>
      totalDisruptions(a) - totalDisruptions(b) ||
      (a.edgeLayer === 'U' ? 0 : 1) - (b.edgeLayer === 'U' ? 0 : 1)
  )[0];
}

const times = (n: number) => `${n}×`;

/** Human-readable evidence for one pair, so a grade can be checked against the cube. */
export function describePair(pair: PairFeatures): string {
  const corner = `corner moved ${times(pair.cornerDisruptions)}, ends on top`;
  const cornerSlot = `corner moved ${times(pair.cornerDisruptions)}, ends in a slot`;
  const edge = `edge moved ${times(pair.edgeDisruptions)}, ends on top`;
  const edgeSlot = `edge moved ${times(pair.edgeDisruptions)}, ends in a slot`;
  return `${pair.cornerLayer === 'U' ? corner : cornerSlot}; ${pair.edgeLayer === 'U' ? edge : edgeSlot}`;
}

/** Verdict for one pair: its band, or why it is not worth tracking. */
export function pairVerdict(pair: PairFeatures): string {
  return qualifies(pair) ? bandOf(totalDisruptions(pair)) : 'excluded';
}

/** Indices of the scrambles at `level` whose grade matches `band`. Cached per level+band. */
const indexCache = new Map<string, number[]>();
export function indicesForBand(level: number, band: TrackingBand): number[] {
  const key = `${level}:${band}`;
  const cached = indexCache.get(key);
  if (cached) {
    return cached;
  }
  const indices: number[] = [];
  for (let i = 0; i < pairTrackingData[level - 1].length; i++) {
    if (gradeScramble(decodePairFeatures(level, i)) === band) {
      indices.push(i);
    }
  }
  indexCache.set(key, indices);
  return indices;
}
