import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrambleComponent } from './scramble/scramble.component';
import { CrossComponent } from './cross/cross.component';
import { HomeComponent } from './home/home.component';
import { OllTrainerHomeModule } from './oll-trainer-home/oll-trainer-home.module';
import { OllTrainerHomeComponent } from './oll-trainer-home/oll-trainer-home.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrambleComponent,
    CrossComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OllTrainerHomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
