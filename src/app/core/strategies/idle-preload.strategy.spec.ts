import { signal } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouteExperienceService } from '../services/route-experience.service';
import { IdlePreloadStrategy } from './idle-preload.strategy';

describe('Public-route preloading', () => {
  it('skips unrelated idle loads while retaining hover preloading after entering the app', fakeAsync(() => {
    const publicLayout = signal(true), load = jasmine.createSpy('load').and.returnValue(of(null));
    TestBed.configureTestingModule({ providers: [{ provide: RouteExperienceService, useValue: { publicLayout } }] });
    const strategy = TestBed.inject(IdlePreloadStrategy);
    strategy.preload({ path: 'dictionary' }, load).subscribe(); tick(3000);
    expect(load).not.toHaveBeenCalled();
    publicLayout.set(false);
    strategy.preloadNow('/dictionary');
    expect(load).toHaveBeenCalledTimes(1);
  }));

  it('rechecks the route when an already scheduled idle callback executes', fakeAsync(() => {
    const publicLayout = signal(false), load = jasmine.createSpy('load').and.returnValue(of(null));
    let idle!: IdleRequestCallback;
    spyOn(window, 'requestIdleCallback').and.callFake(callback => { idle = callback; return 1; });
    TestBed.configureTestingModule({ providers: [{ provide: RouteExperienceService, useValue: { publicLayout } }] });
    TestBed.inject(IdlePreloadStrategy).preload({ path: 'study' }, load).subscribe(); tick(2000);
    publicLayout.set(true);
    idle({ didTimeout: false, timeRemaining: () => 50 });
    expect(load).not.toHaveBeenCalled();
  }));
});
