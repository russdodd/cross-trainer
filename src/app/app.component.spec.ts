import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cube-trainer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cube-trainer');
  });

  // The CLI's original assertion looked for the starter template's
  // "cube-trainer app is running!" banner, which was replaced by the router
  // outlet and footer years ago. Assert what the shell actually renders.
  it('renders the router outlet and the footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.querySelector('footer')?.textContent).toContain('built by russ dodd');
  });

  // The deploy marker: refreshing after a deploy shows the new build time.
  it('renders a version tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const tag = fixture.nativeElement.querySelector('.version-tag');

    expect(tag).toBeTruthy();
    expect(tag.textContent.trim().length).toBeGreaterThan(0);
  });
});
