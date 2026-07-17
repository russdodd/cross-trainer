
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
import { LineChoice, LineFeedbackService } from '../line-feedback.service';
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

interface ComparisonLine {
  moves: string;
  holdColour: string;
  ergo: number;
}

/** A blind A/B between the ranker's pick and the solver's line. */
interface LineComparison {
  a: ComparisonLine;
  b: ComparisonLine;
  /** Which side is ours. Randomised, and not revealed until the vote is in. */
  recommendedSide: 'A' | 'B';
  /** Same moves either side, only the hold differs. */
  holdsOnly: boolean;
  extraMoves: number;
  staged: number;
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

    // Blind line comparison. Off by default: it withholds the solution until you
    // vote, which is the wrong trade during ordinary practice.
    public blindMode = false;
    public comparison: LineComparison | null = null;
    public lineChoice: LineChoice | null = null;
    public lineVoted = false;
    public lineFeedbackCount = 0;
    public lineChoices: { value: LineChoice, label: string }[] = [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'equal', label: 'About equal' },
    ];

    constructor(
        private feedback: TrackingFeedbackService,
        private lineFeedback: LineFeedbackService,
    ) {
        this.feedbackCount = this.feedback.count();
        this.lineFeedbackCount = this.lineFeedback.count();
    }

    /**
     * In blind mode nothing that identifies the lines may show until the vote is
     * in — that includes the pair tracking, which describes the solver's line and
     * would give the game away.
     */
    get revealVisible(): boolean {
        return !!this.solution && (!this.blindMode || this.lineVoted || !this.comparison);
    }

    get voteVisible(): boolean {
        return this.blindMode && !!this.comparison && !this.lineVoted;
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
        this.comparison = this.blindMode ? this.buildComparison(solverLine, best) : null;
        return false;
    }

    toggleBlindMode(): boolean {
        this.blindMode = !this.blindMode;
        // The current reveal was drawn for the other mode, so start it over rather
        // than half-hiding a solution that has already been seen.
        this.clearSolution();
        return false;
    }

    selectLine(choice: LineChoice): boolean {
        if (!this.lineVoted) {
            this.lineChoice = choice;
        }
        return false;
    }

    get canSubmitLine(): boolean {
        return !!this.comparison && this.lineChoice !== null && !this.lineVoted;
    }

    submitLineVote(): boolean {
        if (!this.canSubmitLine) {
            return false;
        }
        const c = this.comparison!;
        const recommended = c.recommendedSide === 'A' ? c.a : c.b;
        const solver = c.recommendedSide === 'A' ? c.b : c.a;

        this.lineFeedback.record({
            timestamp: new Date().toISOString(),
            level: this.scrambleLevel,
            scrambleIndex: this.scrambleIndex,
            scramble: this.scramble,
            choice: this.lineChoice!,
            recommendedSide: c.recommendedSide,
            // "equal" is a real answer, not a failure to agree — keep it distinct.
            agreed: this.lineChoice === 'equal' ? null : this.lineChoice === c.recommendedSide,
            holdsOnly: c.holdsOnly,
            extraMoves: c.extraMoves,
            staged: c.staged,
            ergoRecommended: recommended.ergo,
            ergoSolver: solver.ergo,
            movesRecommended: recommended.moves,
            holdRecommended: recommended.holdColour,
            movesSolver: solver.moves,
            holdSolver: solver.holdColour,
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
        this.comparison = null;
        this.lineChoice = null;
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
        parts.push(`cross builds up ${best.solvedAfter.join(', ')}`);

        return {
            moves: best.moves.join('  '),
            holdColour: best.holdColour,
            evidence: parts.join(' · '),
        };
    }

    /**
     * The blind A/B. Sides are randomised so the vote judges the lines, not the
     * labels — which is the whole point, since the ranker's weights were set from
     * score distributions rather than from anyone's hands.
     *
     * Returns null when there is genuinely nothing to judge: the ranker picked the
     * solver's line, in the solver's hold.
     */
    private buildComparison(solverLine: string[], best: any): LineComparison | null {
        if (!best) {
            return null;
        }
        const holdsOnly = best.base.join(' ') === solverLine.join(' ');
        const sameHold = best.holdColour === FRONT_COLOURS[0];
        if (holdsOnly && sameHold) {
            return null;
        }

        const ours: ComparisonLine = {
            moves: best.moves.join('  '),
            holdColour: best.holdColour,
            ergo: best.ergo,
        };
        const theirs: ComparisonLine = {
            moves: solverLine.join('  '),
            holdColour: FRONT_COLOURS[0],
            ergo: ergonomics(solverLine),
        };
        const recommendedSide: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';

        return {
            a: recommendedSide === 'A' ? ours : theirs,
            b: recommendedSide === 'A' ? theirs : ours,
            recommendedSide,
            holdsOnly,
            extraMoves: best.extraMoves,
            staged: best.staged,
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
