import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OllSelectedStateService {
  private ollTypeSource = new Subject<string>();
  ollType:string = 'dot'
  ollType$ = this.ollTypeSource.asObservable();

  setOll(ollType: string){
    this.ollTypeSource.next(ollType);
    this.ollType = ollType;
  }

  getCurOll(): string {
    return this.ollType
  }
}
