import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OllTrainerHomeComponent } from './oll-trainer-home.component';

describe('OllComponent', () => {
  let component: OllTrainerHomeComponent;
  let fixture: ComponentFixture<OllTrainerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OllTrainerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OllTrainerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
