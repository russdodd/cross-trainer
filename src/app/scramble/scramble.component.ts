
import { Component } from '@angular/core';
import { scrambles } from '../Scrambles';
import { cross } from '../cstimer/cross.js';

@Component({
  selector: 'app-scramble',
  templateUrl: './scramble.component.html',
  styleUrls: ['./scramble.component.css']
})
export class ScrambleComponent {

    public scramble:any = "";
    public solution:any = "";
    private GetSolution:string = "Get Solution";
    private HideSolution:string = "Hide Solution";

    public SolButtonText:any = this.GetSolution;


    newScramble() {
        var MoveNames = ["R", "R2", "R'", "F", "F2", "F'", "L", "L2", "L'", "B", "B2", "B'", "U", "U2", "U'", "D", "D2", "D'"];
        var MoveNamesWCA;
        MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];

        let Level = +(<HTMLInputElement>document.getElementById("Level")).value;
        var RandomScramble = scrambles[Level - 1][Math.floor(Math.random() * 1000)];
        var TextScramble = "";
        var TextScrambleWithSpaces = "";
    
        for (var A = 0; A < RandomScramble.length; A++) {
            TextScramble += MoveNames[RandomScramble[A].charCodeAt(0) - 'A'.charCodeAt(0)];
            if (A > 0) {
                TextScrambleWithSpaces += " ";
            }
            TextScrambleWithSpaces += MoveNamesWCA[RandomScramble[A].charCodeAt(0) - 'A'.charCodeAt(0)];
            console.log("TextScrambleWithSpaces: " + TextScrambleWithSpaces)
        }
        
        this.scramble = TextScrambleWithSpaces;
        this.solution = "";
        this.SolButtonText = this.GetSolution;
        return false;
    }

    toggleSolution() {
        if (this.SolButtonText == this.HideSolution) {
            this.SolButtonText = this.GetSolution;
            this.solution = "";
            return false
        }
        if (this.scramble == "") {
            return false
        }
        this.SolButtonText = this.HideSolution;

        var scrambleArr = this.scramble.split(" ");
        console.log("scrambleArr: " + scrambleArr);
        var sols = cross.solve(scrambleArr.join(" "));
        console.log("sols" + sols + '\n' + "sols length: " + sols.length);
        for (var i = 0; i < sols.length; i++){
            console.log("sol " + i + ": " + sols[i]);
        }
        this.solution = sols[1].join('  ');
        return false;
    }
}