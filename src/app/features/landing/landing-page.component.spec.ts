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

  it('renders hero, 5 supported languages, 4 features, and mobile download targets', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim()).toContain(LANDING_COPY.en.heroTitle);
    expect(el.querySelectorAll('.landing-lang-card').length).toBe(5);
    expect(el.querySelectorAll('.landing-feature-card').length).toBe(4);
    expect(el.querySelector('#download')).toBeTruthy();
    expect(el.querySelectorAll('.landing-download-card').length).toBe(fixture.componentInstance.downloadTargets.length);
  });

  it('opens a pasted YouTube URL directly in /video and surfaces validation errors for invalid input', () => {
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector<HTMLInputElement>('.hero-launcher__input')!;
    const form = el.querySelector<HTMLFormElement>('.hero-launcher')!;

    input.value = 'not a youtube link';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(el.querySelector('.hero-launcher__error')?.textContent).toContain(LANDING_COPY.en.urlError);

    input.value = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(el.querySelector('.hero-launcher__error')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/video'], { queryParams: { id: 'dQw4w9WgXcQ' } });
  });

  it('updates the interactive dictionary lookup when clicking subtitle tokens and switching demo language', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.demo-lookup__word')?.textContent?.trim()).toBe('動画');

    const tokens = el.querySelectorAll<HTMLButtonElement>('.demo-token');
    tokens[3].click();
    fixture.detectChanges();
    expect(el.querySelector('.demo-lookup__word')?.textContent?.trim()).toBe('見て');
    expect(el.querySelector('.demo-lookup__grammar')?.textContent).toContain('〜て (N5)');

    const saveBtn = el.querySelector<HTMLButtonElement>('.demo-save-btn')!;
    saveBtn.click();
    fixture.detectChanges();
    expect(saveBtn.getAttribute('aria-pressed')).toBe('true');

    const langTabs = el.querySelectorAll<HTMLButtonElement>('.workbench__tab');
    langTabs[1].click();
    fixture.detectChanges();
    expect(el.querySelector('.demo-lookup__word')?.textContent?.trim()).toBe('熟悉');
  });

  it('switches learning language and navigates to /video when a language card is clicked', () => {
    const langButtons = fixture.nativeElement.querySelectorAll('.landing-lang-card');
    (langButtons[4] as HTMLButtonElement).click(); // Vietnamese
    expect(switchLanguageSpy).toHaveBeenCalledWith('vi', { navigateHome: false });
    expect(router.navigate).toHaveBeenCalledWith(['/video']);
  });
});
