import { Component, OnInit } from '@angular/core';
import { OllTypes } from './oll-types';

@Component({
  selector: 'app-oll-trainer-home',
  templateUrl: './oll-trainer-home.component.html',
  styleUrls: ['./oll-trainer-home.component.css']
})
export class OllTrainerHomeComponent implements OnInit {
  constructor() { }
  private ollType:string = OllTypes.DotType
  ngOnInit(): void {
  }

}
