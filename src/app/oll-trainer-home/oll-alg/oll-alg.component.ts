import { Component, OnInit } from '@angular/core';
import { OllAlg } from '../oll-alg';
import { OllAlgs } from '../oll-alg-info/oll-alg-info';

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

  constructor() { }

  ngOnInit() {
  }

}