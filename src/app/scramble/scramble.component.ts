
import { Component, Input } from '@angular/core';
import { scrambles } from '../Scrambles';
import { cross } from '../cstimer/cross.js';
import {
  decodePairFeatures,
  describePair,
  indicesForBand,
  pairVerdict,
  recommendPair,
  TrackingBand,
} from '../pair-tracking';

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
    private scrambleLevel = 0;
    private scrambleIndex = 0;
    private GetSolution:string = "Get Solution";
    private HideSolution:string = "Hide Solution";

    public SolButtonText:any = this.GetSolution;


    newScramble() {
        var MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];

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

        var sols = cross.solve(this.scramble);
        this.solution = sols[1].join('  ');
        this.solutionLevel = this.scrambleLevel;
        this.pairReveal = this.buildPairReveal();
        return false;
    }

    private clearSolution() {
        this.SolButtonText = this.GetSolution;
        this.solution = "";
        this.solutionLevel = 0;
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
