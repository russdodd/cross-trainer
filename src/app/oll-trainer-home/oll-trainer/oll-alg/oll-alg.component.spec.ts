import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OllAlgComponent } from './oll-alg.component';

describe('OllAlgComponent', () => {
  let component: OllAlgComponent;
  let fixture: ComponentFixture<OllAlgComponent>;

  // <app-tile> is stubbed; *ngFor needs CommonModule.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CommonModule ],
      declarations: [ OllAlgComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OllAlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
