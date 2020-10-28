import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OllSelectedStateService {
  private ollTypeSource = new Subject<string>();

  ollType$ = this.ollTypeSource.asObservable();

  sendOll(ollType: string){
    this.ollTypeSource.next(ollType);
  }
}
