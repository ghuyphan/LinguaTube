import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { RouteExperienceService } from './route-experience.service';

@Component({ standalone: true, template: '<p>Page</p>' })
class TestPageComponent {}

// Exercise production metadata and redirects without loading feature providers.
const experienceTestRoutes = routes.map(route => route.loadComponent
  ? { ...route, loadComponent: undefined, component: TestPageComponent }
  : route);

describe('Resolved route experience', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(experienceTestRoutes)] }));

  it('defaults to a quiet public layout before initial navigation resolves', () => {
    const experience = TestBed.inject(RouteExperienceService);
    expect(experience.publicLayout()).toBeTrue();
    expect(experience.onboardingEligible()).toBeFalse();
  });

  it('keeps public documents, aliases, recovery and unknown URLs free of learning UI', async () => {
    const experience = TestBed.inject(RouteExperienceService);
    const harness = await RouterTestingHarness.create();
    for (const path of ['/terms', '/tos?from=email#terms-section-2', '/terms-of-service', '/privacy-policy', '/privacy', '/learner/abc', '/account/recovery?code=test', '/auth/mobile-recovery#token', '/missing']) {
      await harness.navigateByUrl(path);
      expect(experience.publicLayout()).withContext(path).toBeTrue();
      expect(experience.onboardingEligible()).withContext(path).toBeFalse();
    }
  });

  it('enables onboarding only for learning destinations after redirects', async () => {
    const experience = TestBed.inject(RouteExperienceService);
    const harness = await RouterTestingHarness.create();
    for (const path of ['/', '/video?id=test#player', '/video/abc', '/dictionary', '/study', '/history', '/explore', '/playlists', '/playlist', '/vocabulary']) {
      await harness.navigateByUrl(path);
      expect(experience.publicLayout()).withContext(path).toBeFalse();
      expect(experience.onboardingEligible()).withContext(path).toBeTrue();
    }
    expect(TestBed.inject(Router).url).toBe('/dictionary');
    for (const path of ['/account', '/account/subscription?return=payment']) {
      await harness.navigateByUrl(path);
      expect(experience.publicLayout()).withContext(path).toBeFalse();
      expect(experience.onboardingEligible()).withContext(path).toBeFalse();
    }
  });
});
