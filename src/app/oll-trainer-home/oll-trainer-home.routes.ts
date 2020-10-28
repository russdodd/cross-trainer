import { Routes } from '@angular/router';
import { OllTrainerHomeComponent } from './oll-trainer-home.component';
import { OllSelectPageComponent } from './oll-select-page/oll-select-page.component';

export const OllRoutes: Routes = [
    {
        path: '',
        component: OllTrainerHomeComponent,
        children: [{
          path: 'oll-trainer-home/select',
          component: OllSelectPageComponent,
        }]
      }    
];