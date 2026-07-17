
import { Component, Input } from '@angular/core';
import { scrambles } from '../Scrambles';
import {
  decodePairFeatures,
  describePair,
  gradeScramble,
  indicesForBand,
  pairVerdict,
  recommendPair,
  TrackingBand,
} from '../pair-tracking';
import { Rating, SolutionMatch, TrackingFeedbackService } from '../tracking-feedback.service';
import { crossSolutionFor } from '../cross-solution';

export interface PairReveal {
  colors: string;
  verdict: string;
  evidence: string;
  recommended: boolean;
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
    // The recommended line's hold and cost, shown alongside the solution.
    public holdColour = "";
    public turnSpeed = 0;
    public extraMove = false;
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
    public solutionMatches: { value: SolutionMatch, label: string }[] = [
        { value: 'same', label: 'Same' },
        { value: 'different', label: 'Different' },
    ];
    public selectedMatch: SolutionMatch | null = null;
    public submitted = false;
    public feedbackCount = 0;
    // Latched on reveal rather than read from the button, so hiding the solution
    // again doesn't pretend it was never seen.
    private revealedThisScramble = false;

    constructor(
        private feedback: TrackingFeedbackService,
    ) {
        this.feedbackCount = this.feedback.count();
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

        const sol = crossSolutionFor(this.scrambleLevel, this.scrambleIndex);
        this.solution = sol.moves;
        this.solutionLevel = this.scrambleLevel;
        this.holdColour = sol.holdColour;
        this.turnSpeed = sol.turnSpeed;
        // The scramble's level is its optimal length; the ranker may spend one extra.
        this.extraMove = sol.moves.split(' ').length > this.scrambleLevel;
        this.pairReveal = this.buildPairReveal();
        return false;
    }

    selectRating(rating: Rating): boolean {
        if (!this.submitted) {
            this.selectedRating = rating;
        }
        return false;
    }

    selectMatch(match: SolutionMatch): boolean {
        if (!this.submitted) {
            this.selectedMatch = match;
        }
        return false;
    }

    // Same/different only makes sense once the suggested line has been seen, so the
    // question is offered only after a reveal. Latched, so hiding it again keeps it.
    get canRateMatch(): boolean {
        return this.revealedThisScramble;
    }

    get canSubmit(): boolean {
        return this.scramble !== "" && this.selectedRating !== null && !this.submitted;
    }

    // The only writer. An unsubmitted scramble is deliberately not recorded — a
    // skipped rating is silence, not a verdict of "ok". solutionMatch is optional,
    // so it rides along as null when left unanswered.
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
            solutionMatch: this.selectedMatch,
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
        this.selectedMatch = null;
        this.submitted = false;
        this.revealedThisScramble = false;
    }

    private clearSolution() {
        this.SolButtonText = this.GetSolution;
        this.solution = "";
        this.solutionLevel = 0;
        this.holdColour = "";
        this.turnSpeed = 0;
        this.extraMove = false;
        this.pairReveal = [];
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
