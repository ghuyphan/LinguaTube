import { computed, inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

/** Resolved route policy, shared by the shell and automatic update feedback. */
@Injectable({ providedIn: 'root' })
export class RouteExperienceService {
  private readonly router = inject(Router);
  private readonly policy = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => {
      let route = this.router.routerState.snapshot.root;
      while (route.firstChild) route = route.firstChild;
      return {
        publicLayout: route.data['layout'] !== 'app',
        onboarding: route.data['onboarding'] === true,
      };
    }),
  ), { requireSync: true });

  readonly publicLayout = computed(() => this.policy().publicLayout);
  readonly onboardingEligible = computed(() => !this.publicLayout() && this.policy().onboarding);
}
