import { signal } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { AppUpdateService } from './app-update.service';
import { I18nService } from './i18n.service';
import { RouteExperienceService } from './route-experience.service';
import { ToastService } from './toast.service';

describe('Public-route update feedback', () => {
  let publicLayout: ReturnType<typeof signal<boolean>>;
  let show: jasmine.Spy;
  let savedVersion: string | null;
  beforeEach(() => {
    savedVersion = localStorage.getItem('voca_post_update_version');
    localStorage.setItem('voca_post_update_version', 'test-version');
    publicLayout = signal(true);
    show = jasmine.createSpy('show');
    spyOn(AppUpdateService.prototype, 'fetchServerVersion').and.resolveTo(null);
    TestBed.configureTestingModule({ providers: [
      { provide: SwUpdate, useValue: { isEnabled: false } },
      { provide: RouteExperienceService, useValue: { publicLayout } },
      { provide: ToastService, useValue: { show } },
      { provide: I18nService, useValue: { t: (key: string) => key, currentLanguage: signal('en') } },
    ] });
  });
  afterEach(() => {
    if (savedVersion === null) localStorage.removeItem('voca_post_update_version');
    else localStorage.setItem('voca_post_update_version', savedVersion);
  });

  it('keeps background checks but defers celebration until a non-public route', fakeAsync(() => {
    const update = TestBed.inject(AppUpdateService);
    TestBed.flushEffects(); tick(1500);
    expect(update.fetchServerVersion).toHaveBeenCalled();
    expect(show).not.toHaveBeenCalled();
    expect(localStorage.getItem('voca_post_update_version')).toBe('test-version');
    publicLayout.set(false); TestBed.flushEffects(); tick(1200);
    expect(show).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('voca_post_update_version')).toBeNull();
    publicLayout.set(true); TestBed.flushEffects();
    publicLayout.set(false); TestBed.flushEffects(); tick(1200);
    expect(show).toHaveBeenCalledTimes(1);
  }));

  it('cancels a pending celebration when the visitor switches to a legal document', fakeAsync(() => {
    publicLayout.set(false);
    TestBed.inject(AppUpdateService); TestBed.flushEffects(); tick(600);
    publicLayout.set(true); TestBed.flushEffects(); tick(1000);
    expect(show).not.toHaveBeenCalled();
    expect(localStorage.getItem('voca_post_update_version')).toBe('test-version');
    publicLayout.set(false); TestBed.flushEffects(); tick(1200);
    expect(show).toHaveBeenCalledTimes(1);
  }));
});
