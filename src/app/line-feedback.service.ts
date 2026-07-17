// Blind votes on which cross line is nicer to execute.
//
// The ranker's weights (STAGING_WEIGHT, EXTRA_MOVE_MARGIN in cross-ranker.js)
// were calibrated from score distributions, not from anyone's hands. Each record
// pairs a blind verdict with what the ranker thought, so the weights can be set
// on evidence instead.
//
// Deliberately separate from tracking-feedback.service.ts: that rates how hard a
// pair is to TRACK, this rates how nice a line is to TURN. One store per
// question keeps both answerable.
//
// Storage is localStorage, so votes are scoped to the origin that made them:
// localhost, a branch preview and prod each keep a separate store and never
// merge. Collect on one origin, and treat the CSV export as the only backup.

import { Injectable } from '@angular/core';

export type LineChoice = 'A' | 'B' | 'equal';

export interface LineFeedbackRecord {
  timestamp: string;
  /** Cross difficulty, 1–8. */
  level: number;
  /** (level, scrambleIndex) identifies the row in Scrambles.ts. */
  scrambleIndex: number;
  scramble: string;
  /** Which side the voter picked, with the sides shown in random order. */
  choice: LineChoice;
  /** Which side was the ranker's pick — the thing being judged. */
  recommendedSide: 'A' | 'B';
  /** Did the vote match the ranker? null when the voter called it equal. */
  agreed: boolean | null;
  /** True when both lines are the same moves and only the hold differs. */
  holdsOnly: boolean;
  /** Moves the recommendation added over optimal (0 or 1). Slices the margin question. */
  extraMoves: number;
  /** Staged-ness of the recommended line, 0–1. */
  staged: number;
  ergoRecommended: number;
  ergoSolver: number;
  movesRecommended: string;
  holdRecommended: string;
  movesSolver: string;
  holdSolver: string;
}

const STORAGE_KEY = 'cross-trainer.line-feedback.v1';

const COLUMNS: (keyof LineFeedbackRecord)[] = [
  'timestamp',
  'level',
  'scrambleIndex',
  'scramble',
  'choice',
  'recommendedSide',
  'agreed',
  'holdsOnly',
  'extraMoves',
  'staged',
  'ergoRecommended',
  'ergoSolver',
  'movesRecommended',
  'holdRecommended',
  'movesSolver',
  'holdSolver',
];

@Injectable({ providedIn: 'root' })
export class LineFeedbackService {

  all(): LineFeedbackRecord[] {
    // Never let a corrupt or hand-edited key break the trainer — the votes are a
    // side experiment, the practice tool is the point.
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

  record(entry: LineFeedbackRecord): void {
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
