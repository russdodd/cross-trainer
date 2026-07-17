import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { OllTrainerComponent } from './oll-trainer.component';

describe('OllTrainerComponent', () => {
  let component: OllTrainerComponent;
  let fixture: ComponentFixture<OllTrainerComponent>;

  // <app-d3-cube> and <app-oll-alg> are stubbed: this asserts the component
  // constructs, and booting a real D3 cube would test something else entirely.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OllTrainerComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OllTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
