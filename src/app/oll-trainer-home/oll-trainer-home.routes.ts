import { Routes } from '@angular/router';
import { OllTrainerHomeComponent } from './oll-trainer-home.component';

export const OllRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'oll-trainer-home'
      },
      {
        path: 'oll-trainer-home',
        component: OllTrainerHomeComponent,
      }
];