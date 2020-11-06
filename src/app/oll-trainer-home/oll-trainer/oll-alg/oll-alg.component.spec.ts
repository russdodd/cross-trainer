import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OllAlgComponent } from './oll-alg.component';

describe('OllAlgComponent', () => {
  let component: OllAlgComponent;
  let fixture: ComponentFixture<OllAlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OllAlgComponent ]
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
