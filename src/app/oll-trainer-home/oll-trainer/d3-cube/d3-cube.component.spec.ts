import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3CubeComponent } from './d3-cube.component';

describe('D3CubeComponent', () => {
  let component: D3CubeComponent;
  let fixture: ComponentFixture<D3CubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3CubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3CubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
