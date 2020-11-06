import { Component, OnInit, Input} from '@angular/core';
import { OllSelectedStateService } from '../../../../oll-selected-state.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() src: string;
  @Input() ollId: string;
  @Input() chosenOllId: string;
  public greyed: boolean = false;
  constructor(private ollStateService: OllSelectedStateService) {}

  ngOnInit(): void {
  }

  checkGuess(): void {
    console.log("this.ollId: " + this.ollId)
    console.log("this.ollStateService.getOll(): " + this.ollStateService.getOll())
    if (this.ollId != this.ollStateService.getOll()) {
      this.greyed = true;
    }
  }
}
