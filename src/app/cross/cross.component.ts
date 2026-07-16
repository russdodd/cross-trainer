import { Component } from '@angular/core';
import { TrackingBand } from '../pair-tracking';

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

  trackingBand: TrackingBand | 'any' = 'any';
  trackingBands: { value: TrackingBand | 'any', label: string }[] = [
    { value: 'any', label: 'Any first pair' },
    { value: 'easy', label: 'Easy first pair to track' },
    { value: 'medium', label: 'Medium first pair to track' },
    { value: 'hard', label: 'Hard first pair to track' },
  ];

  showMethodology = false;

  get maxLevelOptions(): number[] {
    return this.levels.filter(l => l >= this.minLevel);
  }

  onMinLevelChange(level: number): void {
    this.minLevel = level;
    this.maxLevel = level;
  }

  toggleMethodology(): boolean {
    this.showMethodology = !this.showMethodology;
    return false;
  }

}
