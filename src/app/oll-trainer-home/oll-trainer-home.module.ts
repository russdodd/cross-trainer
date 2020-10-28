import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OllAlgComponent } from './oll-alg/oll-alg.component';
import { D3CubeComponent } from './d3-cube/d3-cube.component';
import { OllTrainerHomeComponent } from './oll-trainer-home.component';
import { RouterModule } from '@angular/router';
import { OllRoutes } from './oll-trainer-home.routes';


@NgModule({
  declarations: [
    OllAlgComponent,
    D3CubeComponent,
    OllTrainerHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OllRoutes)
  ],
  bootstrap: [OllTrainerHomeComponent]
})
export class OllTrainerHomeModule { }
