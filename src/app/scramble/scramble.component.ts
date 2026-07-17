
import { Component, Input } from '@angular/core';
import { scrambles } from '../Scrambles';
import { cross } from '../cstimer/cross.js';
import {
  decodePairFeatures,
  describePair,
  gradeScramble,
  indicesForBand,
  pairVerdict,
  recommendPair,
  TrackingBand,
} from '../pair-tracking';
import { Rating, TrackingFeedbackService } from '../tracking-feedback.service';
import { LineVerdict, LineFeedbackService } from '../line-feedback.service';
import { ergonomics, recommend, FRONT_COLOURS } from '../cross-ranker/cross-ranker.js';

export interface PairReveal {
  colors: string;
  verdict: string;
  evidence: string;
  recommended: boolean;
}

/** Experimental: the best line to actually execute, and how to hold the cube for it. */
export interface HumanReveal {
  moves: string;
  holdColour: string;
  evidence: string;
}

/**
 * What a verdict is judging: the experimental line against the solver's.
 *
 * This was a blind A/B until July 2026. Blinding only works if the two options
 * have no tell, and these do — the solver's line is F/B-heavy and the
 * recommendation is R/U-heavy, so which is which is obvious on sight. The
 * randomisation bought nothing and cost the reader context, so it went.
 */
interface LineJudgement {
  /** Null when the recommendation IS the solver's line, in its hold — nothing to judge. */
  holdsOnly: boolean;
  extraMoves: number;
  ergoRecommended: number;
  ergoSolver: number;
  movesRecommended: string;
  holdRecommended: string;
  movesSolver: string;
  holdSolver: string;
}

@Component({
  standalone: false,
  selector: 'app-scramble',
  templateUrl: './scramble.component.html',
  styleUrls: ['./scramble.component.css']
})
export class ScrambleComponent {

    @Input() minLevel = 1;
    @Input() maxLevel = 1;
    @Input() trackingBand: TrackingBand | 'any' = 'any';

    public scramble:any = "";
    public solution:any = "";
    public solutionLevel = 0;
    public message = "";
    public pairReveal: PairReveal[] = [];
    public humanReveal: HumanReveal | null = null;
    private scrambleLevel = 0;
    private scrambleIndex = 0;
    private GetSolution:string = "Get Solution";
    private HideSolution:string = "Hide Solution";

    public SolButtonText:any = this.GetSolution;

    public ratings: { value: Rating, label: string }[] = [
        { value: 'too-hard', label: 'Too hard' },
        { value: 'ok', label: 'OK' },
        { value: 'too-easy', label: 'Too easy' },
    ];
    public selectedRating: Rating | null = null;
    public submitted = false;
    public feedbackCount = 0;
    // Latched on reveal rather than read from the button, so hiding the solution
    // again doesn't pretend it was never seen.
    private revealedThisScramble = false;

    public judgement: LineJudgement | null = null;
    public lineVerdict: LineVerdict | null = null;
    public lineVoted = false;
    public lineFeedbackCount = 0;
    public lineVerdicts: { value: LineVerdict, label: string }[] = [
        { value: 'better', label: 'Better' },
        { value: 'same', label: 'About the same' },
        { value: 'worse', label: 'Worse' },
    ];

    constructor(
        private feedback: TrackingFeedbackService,
        private lineFeedback: LineFeedbackService,
    ) {
        this.feedbackCount = this.feedback.count();
        this.lineFeedbackCount = this.lineFeedback.count();
    }

    newScramble() {
        var MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];

        this.resetRating();

        let pick = this.pickScramble();
        if (!pick) {
            this.scramble = "";
            this.message = `No ${this.trackingBand} first-pair cases at level${this.minLevel === this.maxLevel ? '' : 's'} ${this.levelRangeText()}. Try a wider level range.`;
            this.clearSolution();
            return false;
        }

        var RandomScramble = scrambles[pick.level - 1][pick.index];
        var TextScrambleWithSpaces = "";

        for (var A = 0; A < RandomScramble.length; A++) {
            if (A > 0) {
                TextScrambleWithSpaces += " ";
            }
            TextScrambleWithSpaces += MoveNamesWCA[RandomScramble[A].charCodeAt(0) - 'A'.charCodeAt(0)];
        }

        this.scrambleLevel = pick.level;
        this.scrambleIndex = pick.index;
        this.scramble = TextScrambleWithSpaces;
        this.message = "";
        this.clearSolution();
        return false;
    }

    toggleSolution() {
        if (this.SolButtonText == this.HideSolution) {
            this.clearSolution();
            return false
        }
        if (this.scramble == "") {
            return false
        }
        this.SolButtonText = this.HideSolution;
        this.revealedThisScramble = true;

        var sols = cross.solve(this.scramble);
        const solverLine = sols[1].map((m: string) => m.trim());
        this.solution = sols[1].join('  ');
        this.solutionLevel = this.scrambleLevel;
        this.pairReveal = this.buildPairReveal();

        const best = recommend(this.scramble).best;
        this.humanReveal = this.buildHumanReveal(solverLine, best);
        this.judgement = this.buildJudgement(solverLine, best);
        return false;
    }

    selectLineVerdict(verdict: LineVerdict): boolean {
        if (!this.lineVoted) {
            this.lineVerdict = verdict;
        }
        return false;
    }

    get canSubmitLine(): boolean {
        return !!this.judgement && this.lineVerdict !== null && !this.lineVoted;
    }

    submitLineVote(): boolean {
        if (!this.canSubmitLine) {
            return false;
        }
        this.lineFeedback.record({
            timestamp: new Date().toISOString(),
            level: this.scrambleLevel,
            scrambleIndex: this.scrambleIndex,
            scramble: this.scramble,
            verdict: this.lineVerdict!,
            ...this.judgement!,
        });
        this.lineVoted = true;
        this.lineFeedbackCount = this.lineFeedback.count();
        return false;
    }

    downloadLineCsv(): boolean {
        this.download(this.lineFeedback.toCsv(), 'line-votes');
        return false;
    }

    clearLineFeedback(): boolean {
        if (confirm(`Delete all ${this.lineFeedbackCount} line votes? This cannot be undone.`)) {
            this.lineFeedback.clear();
            this.lineFeedbackCount = 0;
        }
        return false;
    }

    selectRating(rating: Rating): boolean {
        if (!this.submitted) {
            this.selectedRating = rating;
        }
        return false;
    }

    get canSubmit(): boolean {
        return this.scramble !== "" && this.selectedRating !== null && !this.submitted;
    }

    // The only writer. An unsubmitted scramble is deliberately not recorded — a
    // skipped rating is silence, not a verdict of "ok".
    submitRating(): boolean {
        if (!this.canSubmit) {
            return false;
        }
        this.feedback.record({
            timestamp: new Date().toISOString(),
            rating: this.selectedRating!,
            level: this.scrambleLevel,
            grade: gradeScramble(decodePairFeatures(this.scrambleLevel, this.scrambleIndex)),
            bandFilter: this.trackingBand,
            solutionRevealed: this.revealedThisScramble,
            scrambleIndex: this.scrambleIndex,
            scramble: this.scramble,
        });
        this.submitted = true;
        this.feedbackCount = this.feedback.count();
        return false;
    }

    downloadCsv(): boolean {
        this.download(this.feedback.toCsv(), 'tracking-feedback');
        return false;
    }

    clearFeedback(): boolean {
        if (confirm(`Delete all ${this.feedbackCount} ratings? This cannot be undone.`)) {
            this.feedback.clear();
            this.feedbackCount = 0;
        }
        return false;
    }

    private download(csv: string, name: string) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    private resetRating() {
        this.selectedRating = null;
        this.submitted = false;
        this.revealedThisScramble = false;
    }

    private clearSolution() {
        this.SolButtonText = this.GetSolution;
        this.solution = "";
        this.solutionLevel = 0;
        this.pairReveal = [];
        this.humanReveal = null;
        this.judgement = null;
        this.lineVerdict = null;
        this.lineVoted = false;
    }

    private levelRangeText(): string {
        return this.minLevel === this.maxLevel ? `${this.minLevel}` : `${this.minLevel}–${this.maxLevel}`;
    }

    // Pick a level uniformly in range, then a scramble from it. When a tracking band
    // is selected, only levels that actually contain that band are eligible — levels
    // 1–2 have no hard cases at all, for instance.
    private pickScramble(): { level: number, index: number } | null {
        if (this.trackingBand === 'any') {
            const level = this.minLevel + Math.floor(Math.random() * (this.maxLevel - this.minLevel + 1));
            return { level, index: Math.floor(Math.random() * 1000) };
        }

        const eligible: number[] = [];
        for (let level = this.minLevel; level <= this.maxLevel; level++) {
            if (indicesForBand(level, this.trackingBand).length) {
                eligible.push(level);
            }
        }
        if (!eligible.length) {
            return null;
        }
        const level = eligible[Math.floor(Math.random() * eligible.length)];
        const indices = indicesForBand(level, this.trackingBand);
        return { level, index: indices[Math.floor(Math.random() * indices.length)] };
    }

    // Experimental. The solver returns whichever optimal line its search reaches
    // first, which skews F/B-heavy and never says how to hold the cube. This ranks
    // every optimal and optimal+1 line across the 4 holds. Worst case (level 8) is
    // ~0.6s, so it runs on reveal rather than when the scramble is drawn.
    //
    // Deliberately NOT wired into the pair tracking above, which still describes
    // the solver's line.
    private buildHumanReveal(solverLine: string[], best: any): HumanReveal | null {
        if (!best) {
            return null;
        }

        const solverErgo = ergonomics(solverLine);
        const sameLine = best.base.join(' ') === solverLine.join(' ');
        const sameHold = best.holdColour === FRONT_COLOURS[0];
        const parts: string[] = [];

        // Careful with wording: a re-held line has different LETTERS but is the
        // same physical solution, so "same moves" next to visibly different moves
        // reads as a bug.
        if (sameLine && sameHold) {
            parts.push("no improvement found — this is the solver's line");
        } else if (sameLine) {
            parts.push("the solver's line, renamed for this hold — same turns, easier hand");
        } else if (best.extraMoves > 0) {
            parts.push(`a different line, ${best.length} moves (one more than optimal)`);
        } else {
            parts.push(`a different line, same ${best.length} moves`);
        }
        parts.push(`turn speed ${best.ergo.toFixed(1)} vs ${solverErgo.toFixed(1)} (lower is faster)`);

        return {
            moves: best.moves.join('  '),
            holdColour: best.holdColour,
            evidence: parts.join(' · '),
        };
    }

    /**
     * The context a verdict is recorded against.
     *
     * Null when there is genuinely nothing to judge: the ranker picked the solver's
     * own line, in the solver's own hold, so a verdict would be comparing a line
     * with itself.
     */
    private buildJudgement(solverLine: string[], best: any): LineJudgement | null {
        if (!best) {
            return null;
        }
        const holdsOnly = best.base.join(' ') === solverLine.join(' ');
        if (holdsOnly && best.holdColour === FRONT_COLOURS[0]) {
            return null;
        }
        return {
            holdsOnly,
            extraMoves: best.extraMoves,
            ergoRecommended: best.ergo,
            ergoSolver: ergonomics(solverLine),
            movesRecommended: best.moves.join('  '),
            holdRecommended: best.holdColour,
            movesSolver: solverLine.join('  '),
            holdSolver: FRONT_COLOURS[0],
        };
    }

    // Shown with the solution so every grade can be checked against the cube.
    private buildPairReveal(): PairReveal[] {
        const pairs = decodePairFeatures(this.scrambleLevel, this.scrambleIndex);
        const best = recommendPair(pairs);
        return pairs
            .map(pair => ({
                colors: pair.colors,
                verdict: pairVerdict(pair),
                evidence: describePair(pair),
                recommended: best !== null && pair.slot === best.slot,
            }))
            .sort((a, b) => Number(b.recommended) - Number(a.recommended));
    }
}
