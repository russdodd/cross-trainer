import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() src: string;
  @Input() ollIdx: number;
  @Input() ollChosenIdx: number;
  constructor() { }

  ngOnInit(): void {
  }

}
