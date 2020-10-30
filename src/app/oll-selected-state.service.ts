import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OllAlg } from './oll-trainer-home/oll-alg';
import { OllAlgs } from './oll-trainer-home/oll-alg-info/oll-alg-info';

@Injectable({
  providedIn: 'root'
})
export class OllSelectedStateService {
  private ollTypeSource = new Subject<string>();
  ollType:string = 'dot'
  ollType$ = this.ollTypeSource.asObservable();
  
  private curOllSource = new Subject<string>();
  curOll:string = "alg1"
  curOll$ = this.curOllSource.asObservable();

  setOllType(ollType: string){
    this.ollTypeSource.next(ollType);
    this.ollType = ollType;
  }

  getCurOllType(): string {
    return this.ollType
  }

  drawNewOll(): string {
    var olls: OllAlg[] = OllAlgs.filter(elem => elem.type == this.ollType)
    var ollNames: string[] = olls.map(elem => elem.name)
    var newOll = this.getRandomOll(ollNames)
    this.curOll = newOll
    return this.curOll
  }

  getRandomOll(olls: string[]) {
    return olls[this.getRandomInt(olls.length - 1)]
  }

  setOll(curOll: string){
    this.curOllSource.next(curOll);
    this.curOll = curOll;
  }

  getOll(): string {
    return this.curOll
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
