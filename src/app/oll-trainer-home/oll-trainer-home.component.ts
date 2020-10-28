import { Component, OnInit } from '@angular/core';
import * as OllDefs from './oll-alg-info/oll-alg-types';
import { OllSelectedStateService } from '../oll-selected-state.service';

@Component({
  selector: 'app-oll-trainer-home',
  templateUrl: './oll-trainer-home.component.html',
  styleUrls: ['./oll-trainer-home.component.css']
})
export class OllTrainerHomeComponent implements OnInit {
  private ollType: string = OllDefs.Dot;
  constructor(private ollStateService: OllSelectedStateService) {
    ollStateService.ollType$.subscribe(
      ollType => {
        this.ollType = ollType;
        console.log("parent setting type")
        console.log(this.ollType);
      });
  }

  ngOnInit(): void {
  }
  }
