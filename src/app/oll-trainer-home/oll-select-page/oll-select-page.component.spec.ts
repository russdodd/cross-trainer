import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OllSelectPageComponent } from './oll-select-page.component';

describe('OllSelectPageComponent', () => {
  let component: OllSelectPageComponent;
  let fixture: ComponentFixture<OllSelectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OllSelectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OllSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
