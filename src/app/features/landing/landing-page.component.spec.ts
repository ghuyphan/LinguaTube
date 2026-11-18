import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { LANDING_COPY } from './landing.i18n';
import { I18nService } from '../../core/services';
import { LearningLanguageService } from '../../services';

describe('LandingPageComponent', () => {
  let fixture: ComponentFixture<LandingPageComponent>;
  let switchLanguageSpy: jasmine.Spy;
  let router: Router;

  beforeEach(async () => {
    switchLanguageSpy = jasmine.createSpy('switchLanguage');

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [
        provideRouter([]),
        {
          provide: I18nService,
          useValue: {
            t: (key: string) => key,
            currentLanguage: signal('en')
          }
        },
        {
          provide: LearningLanguageService,
          useValue: {
            switchLanguage: switchLanguageSpy
          }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
    fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
  });

  it('renders hero, 5 supported languages, 4 features, and Flutter download targets', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent).toContain(LANDING_COPY.en.heroTitle);
    expect(el.querySelectorAll('.landing-lang-card').length).toBe(5);
    expect(el.querySelectorAll('.landing-feature-card').length).toBe(4);
    expect(el.querySelector('#download')).toBeTruthy();
    expect(el.querySelectorAll('.landing-download-card').length).toBe(fixture.componentInstance.downloadTargets.length);
  });

  it('switches learning language and navigates to /video when a language card is clicked', () => {
    const langButtons = fixture.nativeElement.querySelectorAll('.landing-lang-card');
    (langButtons[4] as HTMLButtonElement).click(); // Vietnamese
    expect(switchLanguageSpy).toHaveBeenCalledWith('vi', { navigateHome: false });
    expect(router.navigate).toHaveBeenCalledWith(['/video']);
  });
});
