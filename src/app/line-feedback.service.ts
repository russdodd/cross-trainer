// Verdicts on whether the experimental line is actually nicer to execute.
//
// The ranker picks by algSpeed (a model of ergonomics) plus a hold, with
// EXTRA_MOVE_MARGIN calibrated from score distributions rather than from anyone's
// hands. Each record pairs a verdict with what the ranker thought, so that can be
// settled on evidence instead.
//
// This started as a BLIND A/B and the blinding was dropped (July 2026): the two
// lines have obvious signatures - the solver's is F/B-heavy, the recommendation is
// R/U-heavy - so anyone who knows what the tool does can tell them apart at a
// glance. Randomising the sides was theatre, and it cost the reader the context of
// knowing which line was which. What remains is an open preference report, which
// carries some pull toward the tool's own pick; "worse" verdicts and the by-face
// slices are the parts that can still surprise us.
//
// Deliberately separate from tracking-feedback.service.ts: that rates how hard a
// pair is to TRACK, this rates how nice a line is to TURN. One store per
// question keeps both answerable.
//
// Storage is localStorage, so votes are scoped to the origin that made them:
// localhost, a branch preview and prod each keep a separate store and never
// merge. Collect on one origin, and treat the CSV export as the only backup.

import { Injectable } from '@angular/core';

/** Is the experimental line nicer to execute than the solver's? */
export type LineVerdict = 'better' | 'same' | 'worse';

export interface LineFeedbackRecord {
  timestamp: string;
  /** Cross difficulty, 1–8. */
  level: number;
  /** (level, scrambleIndex) identifies the row in Scrambles.ts. */
  scrambleIndex: number;
  scramble: string;
  /** The judgement: is the experimental line better than the solver's? */
  verdict: LineVerdict;
  /** True when both lines are the same moves and only the hold differs. */
  holdsOnly: boolean;
  /** Moves the recommendation added over optimal (0 or 1). Slices the margin question. */
  extraMoves: number;
  ergoRecommended: number;
  ergoSolver: number;
  movesRecommended: string;
  holdRecommended: string;
  movesSolver: string;
  holdSolver: string;
}

// v2: the record shape changed when blinding was dropped (choice/recommendedSide/
// agreed -> verdict). A new key rather than a migration - the v1 rows judged a
// different question, and mixing shapes would emit blank columns into the CSV.
const STORAGE_KEY = 'cross-trainer.line-feedback.v2';

const COLUMNS: (keyof LineFeedbackRecord)[] = [
  'timestamp',
  'level',
  'scrambleIndex',
  'scramble',
  'verdict',
  'holdsOnly',
  'extraMoves',
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
