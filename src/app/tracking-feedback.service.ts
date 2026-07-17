// Ratings of how hard the first pair actually was to track, collected in-hand.
//
// The bands in pair-tracking.ts (easy ≤2, medium 3–4, hard 5+) were picked
// analytically and never checked against how a cross feels to solve. Each record
// pairs a subjective verdict with the grade the model gave that scramble, so the
// thresholds can be moved on evidence.
//
// Storage is localStorage, so ratings are scoped to the origin that made them:
// localhost, a branch preview and prod each keep a separate store and never merge.
// Collect on one origin, and treat the CSV export as the only backup.

import { Injectable } from '@angular/core';
import { ScrambleGrade, TrackingBand } from './pair-tracking';

export type Rating = 'too-hard' | 'ok' | 'too-easy';

export interface TrackingFeedbackRecord {
  timestamp: string;
  rating: Rating;
  /** Cross difficulty, 1–8. */
  level: number;
  /** The band the model assigned this scramble — what the rating is judging. */
  grade: ScrambleGrade;
  /** Band dropdown selection when the scramble was drawn. */
  bandFilter: TrackingBand | 'any';
  /** Whether the solution had been revealed before rating. */
  solutionRevealed: boolean;
  /** (level, scrambleIndex) identifies the row in Scrambles.ts. */
  scrambleIndex: number;
  scramble: string;
}

const STORAGE_KEY = 'cross-trainer.tracking-feedback.v1';

const COLUMNS: (keyof TrackingFeedbackRecord)[] = [
  'timestamp',
  'rating',
  'level',
  'grade',
  'bandFilter',
  'solutionRevealed',
  'scrambleIndex',
  'scramble',
];

@Injectable({ providedIn: 'root' })
export class TrackingFeedbackService {

  all(): TrackingFeedbackRecord[] {
    // Never let a corrupt or hand-edited key break the trainer — the ratings are
    // a side experiment, the practice tool is the point.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  count(): number {
    return this.all().length;
  }

  record(entry: TrackingFeedbackRecord): void {
    const records = this.all();
    records.push(entry);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      // Quota or a disabled store. Nothing useful to do mid-practice.
    }
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  toCsv(): string {
    const rows = this.all().map(r => COLUMNS.map(c => csvCell(r[c])).join(','));
    return [COLUMNS.join(','), ...rows].join('\n');
  }
}

function csvCell(value: unknown): string {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
