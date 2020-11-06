import { Routes } from '@angular/router';
import { OllTrainerHomeComponent } from './oll-trainer-home.component';
import { OllTrainerComponent } from './oll-trainer/oll-trainer.component';
import { OllSelectPageComponent } from './oll-select-page/oll-select-page.component';

export const OllRoutes: Routes = [
    {
        path: '',
        component: OllTrainerHomeComponent,
        children: [{
          path: 'oll-trainer-home/select',
          component: OllSelectPageComponent,
        },
        {
          path: 'oll-trainer-home/cube',
          component: OllTrainerComponent,
        }]
      }    
];