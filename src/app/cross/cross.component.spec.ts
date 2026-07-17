import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CrossComponent } from './cross.component';
import { ScrambleComponent } from '../scramble/scramble.component';

describe('CrossComponent', () => {
  let component: CrossComponent;
  let fixture: ComponentFixture<CrossComponent>;

  // The template binds the level dropdowns with ngModel and renders a real
  // <app-scramble>, so both have to be present or the component cannot compile.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CrossComponent, ScrambleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
