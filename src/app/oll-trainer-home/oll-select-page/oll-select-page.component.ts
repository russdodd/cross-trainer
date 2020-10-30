import { Component, OnInit } from '@angular/core';
import { OllTypes} from '../oll-alg-info/oll-alg-types'
import { NgForm } from '@angular/forms';
import { OllSelectedStateService } from '../../oll-selected-state.service';

@Component({
  selector: 'app-oll-select-page',
  templateUrl: './oll-select-page.component.html',
  styleUrls: ['./oll-select-page.component.css']
})
export class OllSelectPageComponent implements OnInit {
  ollTypes = OllTypes;
  submitForm(form: NgForm) {
    if(!form.valid) {
      return false;
    } else {
      console.log("radio value:")
      console.log(form.value['select-oll-type'])
      this.setOllType(form.value['select-oll-type'])
    }
  } 
  ngOnInit() {
  }

  setOllType(ollType: string) {
    this.ollStateService.setOllType(ollType);
  }
  constructor(private ollStateService: OllSelectedStateService) {}
}
