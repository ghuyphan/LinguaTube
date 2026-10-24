import { Component, computed, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { I18nService, SettingsService, SeoService, PwaService, GamificationService, AppUpdateService, KeyboardShortcutService } from './core/services';
import { YoutubeService, TranscriptService, PlayerViewService } from './features/video';
import { StreakService } from './services/streak.service';
import { GrammarService } from './services/grammar.service';
import { BottomSheetService } from './services/bottom-sheet.service';
import { PlaylistService } from './features/playlist/playlist.service';
import { VocabularyService } from './features/vocabulary/vocabulary.service';
import { VideoRecommendationService } from './core/services/video-recommendation.service';
import { IdlePreloadStrategy } from './core/strategies/idle-preload.strategy';

@Component({ standalone: true, template: '' })
class TestPageComponent {}
const experienceTestRoutes = routes.map(route => route.loadComponent ? { ...route, loadComponent: undefined, component: TestPageComponent } : route);

describe('Shell onboarding transitions', () => {
  const locale = signal('en');
  const languages = ['en', 'vi', 'ja', 'ko', 'zh'].map(code => ({ code, nativeName: code, flag: code }));
  const selectLanguage = jasmine.createSpy('setLanguage').and.callFake((code: string) => locale.set(code));
  const state = signal({ language: 'ja', hasCompletedOnboarding: false });
  const complete = jasmine.createSpy('completeOnboarding').and.callFake(() => state.update(value => ({ ...value, hasCompletedOnboarding: true })));
  beforeEach(() => {
    state.set({ language: 'ja', hasCompletedOnboarding: false });
    complete.calls.reset();
    locale.set('en');
    selectLanguage.calls.reset();
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(experienceTestRoutes),
        ...[SeoService, GamificationService, AppUpdateService, YoutubeService, TranscriptService, PlayerViewService, StreakService, BottomSheetService, PlaylistService, VocabularyService, VideoRecommendationService, IdlePreloadStrategy].map(provide => ({ provide, useValue: {} })),
        { provide: I18nService, useValue: {
          availableLanguages: languages,
          currentLanguageInfo: computed(() => languages.find(language => language.code === locale())!),
          setLanguage: selectLanguage,
        } },
        { provide: SettingsService, useValue: { settings: state, completeOnboarding: complete } },
        { provide: KeyboardShortcutService, useValue: { events$: EMPTY } },
        { provide: GrammarService, useValue: { closePopup: jasmine.createSpy('closePopup') } },
        { provide: PwaService, useValue: { closeIosInstallGuide: jasmine.createSpy('closeGuide') } },
      ],
    }).overrideComponent(AppComponent, { set: { template: '', imports: [] } });
  });

  it('closes learning sheets on public navigation without completing or rewarding onboarding', async () => {
    const fixture = TestBed.createComponent(AppComponent), app = fixture.componentInstance;
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/video'); fixture.detectChanges();
    expect(app.onboardingVisible()).toBeTrue();
    app.showSettingsSheet.set(true); app.showStreakSheet.set(true); app.showCommandPalette.set(true);
    await router.navigateByUrl('/privacy?from=onboarding#data'); fixture.detectChanges();
    expect(app.onboardingVisible()).toBeFalse();
    expect(app.showSettingsSheet()).toBeFalse();
    expect(app.showStreakSheet()).toBeFalse();
    expect(app.showCommandPalette()).toBeFalse();
    expect(complete).not.toHaveBeenCalled();
    expect(state().hasCompletedOnboarding).toBeFalse();
    await router.navigateByUrl('/study'); fixture.detectChanges();
    expect(app.onboardingVisible()).toBeTrue();
    app.dismissOnboarding(); fixture.detectChanges();
    expect(complete).toHaveBeenCalledTimes(1);
    await router.navigateByUrl('/terms'); await router.navigateByUrl('/video'); fixture.detectChanges();
    expect(app.onboardingVisible()).toBeFalse();
    fixture.destroy();
  });

  it('keeps completed users and account/recovery visits out of onboarding', async () => {
    state.update(value => ({ ...value, hasCompletedOnboarding: true }));
    const fixture = TestBed.createComponent(AppComponent), app = fixture.componentInstance;
    const router = TestBed.inject(Router);
    for (const path of ['/video', '/account', '/account/subscription', '/account/recovery', '/auth/mobile-recovery', '/missing']) {
      await router.navigateByUrl(path); fixture.detectChanges();
      expect(app.onboardingVisible()).withContext(path).toBeFalse();
    }
    expect(complete).not.toHaveBeenCalled();
    fixture.destroy();
  });
  it('accepts supported picker selections and closes the public picker on navigation', async () => {
    const fixture = TestBed.createComponent(AppComponent), app = fixture.componentInstance;
    app.showPublicLanguagePicker.set(true);
    app.setPublicLanguage('invalid');
    expect(selectLanguage).not.toHaveBeenCalled();
    app.setPublicLanguage('ja');
    expect(selectLanguage).toHaveBeenCalledWith('ja');
    expect(app.currentPublicLanguage().code).toBe('ja');
    expect(app.showPublicLanguagePicker()).toBeFalse();
    app.showPublicLanguagePicker.set(true);
    await TestBed.inject(Router).navigateByUrl('/privacy');
    fixture.detectChanges();
    expect(app.showPublicLanguagePicker()).toBeFalse();
    expect(complete).not.toHaveBeenCalled();
    fixture.destroy();
  });

});
