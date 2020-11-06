import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OllAlgComponent } from './oll-trainer/oll-alg/oll-alg.component';
import { D3CubeComponent } from './oll-trainer/d3-cube/d3-cube.component';
import { OllTrainerHomeComponent } from './oll-trainer-home.component';
import { OllTrainerComponent } from './oll-trainer/oll-trainer.component';
import { OllSelectPageComponent } from './oll-select-page/oll-select-page.component';
import { RouterModule } from '@angular/router';
import { OllRoutes } from './oll-trainer-home.routes';
import { TileComponent } from './oll-trainer/oll-alg/tile/tile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OllAlgComponent,
    D3CubeComponent,
    OllTrainerHomeComponent,
    OllSelectPageComponent,
    OllTrainerComponent,
    TileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OllRoutes),
    FormsModule
  ],
  bootstrap: [OllTrainerHomeComponent]
})
export class OllTrainerHomeModule { }
