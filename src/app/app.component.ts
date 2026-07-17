import { Component } from '@angular/core';
import { VERSION } from './version';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cube-trainer';
  version = VERSION;
}
