import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OllTrainerComponent } from './oll-trainer.component';

describe('OllTrainerComponent', () => {
  let component: OllTrainerComponent;
  let fixture: ComponentFixture<OllTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OllTrainerComponent ]
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
