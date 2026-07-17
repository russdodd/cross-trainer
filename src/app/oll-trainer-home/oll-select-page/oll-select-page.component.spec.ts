import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { OllSelectPageComponent } from './oll-select-page.component';

describe('OllSelectPageComponent', () => {
  let component: OllSelectPageComponent;
  let fixture: ComponentFixture<OllSelectPageComponent>;

  // The radio form uses #myForm="ngForm" and ngModel; without FormsModule the
  // template fails to resolve the ngForm export (NG0301).
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
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
