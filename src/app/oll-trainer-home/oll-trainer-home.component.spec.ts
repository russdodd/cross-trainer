import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { OllTrainerHomeComponent } from './oll-trainer-home.component';

describe('OllComponent', () => {
  let component: OllTrainerHomeComponent;
  let fixture: ComponentFixture<OllTrainerHomeComponent>;

  // The shell is nav links plus a router outlet, so it needs the router
  // directives and a (empty) route config to construct.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterOutlet, RouterLink, RouterLinkActive ],
      declarations: [ OllTrainerHomeComponent ],
      providers: [ provideRouter([]) ]
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
