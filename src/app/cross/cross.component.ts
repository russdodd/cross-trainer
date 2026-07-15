import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-cross',
  templateUrl: './cross.component.html',
  styleUrls: ['./cross.component.css']
})
export class CrossComponent {

  levels = [1, 2, 3, 4, 5, 6, 7, 8];
  minLevel = 1;
  maxLevel = 1;

  get maxLevelOptions(): number[] {
    return this.levels.filter(l => l >= this.minLevel);
  }

  onMinLevelChange(level: number): void {
    this.minLevel = level;
    this.maxLevel = level;
  }

}
