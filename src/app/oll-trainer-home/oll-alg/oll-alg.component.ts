import { Component, OnInit } from '@angular/core';
import { OllAlg } from '../oll-alg';
import { OllAlgs } from '../oll-alg-info/oll-alg-info';
import * as OllDefs from '../oll-alg-info/oll-alg-types';
import { OllSelectedStateService } from '../../oll-selected-state.service';

@Component({
  selector: 'app-oll-alg',
  templateUrl: './oll-alg.component.html',
  styleUrls: ['./oll-alg.component.css']
})
export class OllAlgComponent implements OnInit {
  // ollAlg: OllAlg = {
  //   id: 1,
  //   name: 'alg1',
  //   src: 'assets/oll-pics/1.svg'
  // };
  ollAlgs = OllAlgs;

  private ollType: string = OllDefs.Dot;
  constructor(private ollStateService: OllSelectedStateService) {
    ollStateService.ollType$.subscribe(
      ollType => {
        this.ollType = ollType;
        console.log("parent setting type")
        console.log(this.ollType);
        this.ollAlgs = OllAlgs.filter(elem => elem.type == ollType)
      });
  }

  ngOnInit() {
    const curElem = this.ollStateService.getCurOll()
    this.ollAlgs = OllAlgs.filter(elem => elem.type == curElem)
  }
  onClickOll(event: any) {
    
  }
}