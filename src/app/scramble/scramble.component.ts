
import { Component, Input } from '@angular/core';
import { scrambles } from '../Scrambles';
import { cross } from '../cstimer/cross.js';

@Component({
  standalone: false,
  selector: 'app-scramble',
  templateUrl: './scramble.component.html',
  styleUrls: ['./scramble.component.css']
})
export class ScrambleComponent {

    @Input() minLevel = 1;
    @Input() maxLevel = 1;

    public scramble:any = "";
    public solution:any = "";
    public solutionLevel = 0;
    private scrambleLevel = 0;
    private GetSolution:string = "Get Solution";
    private HideSolution:string = "Hide Solution";

    public SolButtonText:any = this.GetSolution;


    newScramble() {
        var MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];

        let Level = this.minLevel + Math.floor(Math.random() * (this.maxLevel - this.minLevel + 1));
        var RandomScramble = scrambles[Level - 1][Math.floor(Math.random() * 1000)];
        var TextScrambleWithSpaces = "";

        for (var A = 0; A < RandomScramble.length; A++) {
            if (A > 0) {
                TextScrambleWithSpaces += " ";
            }
            TextScrambleWithSpaces += MoveNamesWCA[RandomScramble[A].charCodeAt(0) - 'A'.charCodeAt(0)];
        }

        this.scrambleLevel = Level;
        this.scramble = TextScrambleWithSpaces;
        this.solution = "";
        this.solutionLevel = 0;
        this.SolButtonText = this.GetSolution;
        return false;
    }

    toggleSolution() {
        if (this.SolButtonText == this.HideSolution) {
            this.SolButtonText = this.GetSolution;
            this.solution = "";
            this.solutionLevel = 0;
            return false
        }
        if (this.scramble == "") {
            return false
        }
        this.SolButtonText = this.HideSolution;

        var sols = cross.solve(this.scramble);
        this.solution = sols[1].join('  ');
        this.solutionLevel = this.scrambleLevel;
        return false;
    }
}
