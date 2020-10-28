import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrossComponent } from './cross/cross.component';
import { OllTrainerHomeComponent } from './oll-trainer-home/oll-trainer-home.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'cross-component', component: CrossComponent },
  { path: 'oll-trainer-home', loadChildren: './oll-trainer-home/oll-trainer-home.module#OllTrainerHomeModule' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
