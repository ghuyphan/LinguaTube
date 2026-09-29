import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * IdlePreloadStrategy
 *
 * Smoothly preloads lazy route chunks during browser idle time (after initial bootstrap).
 * This eliminates the startup "module preloading storm" while ensuring all page transitions
 * (/video, /study, /dictionary, /explore, /history) feel instantaneous on click.
 *
 * Features:
 * - 2-second grace period after bootstrap so initial page LCP, video player, and recommendations load with zero competition.
 * - Uses `requestIdleCallback` when available to run only when the main thread has free capacity.
 * - Respects user data-saver preferences (Save-Data header / 2G connections).
 * - Exposes `preloadNow(path)` for instant anticipatory prefetching on hover / touchstart.
 */
@Injectable({ providedIn: 'root' })
export class IdlePreloadStrategy implements PreloadingStrategy {
  private preloadFns = new Map<string, () => Observable<unknown>>();
  private loadedPaths = new Set<string>();
  private preloadIndex = 0;

  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    if (route.data && route.data['preload'] === false) {
      return of(null);
    }

    const path = route.path || '';
    this.preloadFns.set(path, load);

    // Stagger background preloads starting after a 2000ms grace period so routes don't burst concurrently
    const initialDelay = 2000 + (this.preloadIndex++ * 350);

    return timer(initialDelay).pipe(
      switchMap(() => {
        if (this.loadedPaths.has(path)) {
          return of(null);
        }

        // Respect Data Saver mode or constrained cellular networks
        if (typeof navigator !== 'undefined') {
          const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
          if (conn?.saveData || conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') {
            return of(null);
          }
        }

        // Execute during idle callback to never block user interactions or video frame rendering
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          return new Observable(observer => {
            const idleWindow = window as unknown as {
              requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number;
              cancelIdleCallback: (id: number) => void;
            };

            const handle = idleWindow.requestIdleCallback(() => {
              if (this.loadedPaths.has(path)) {
                observer.next(null);
                observer.complete();
                return;
              }

              this.loadedPaths.add(path);
              load().subscribe({
                next: val => observer.next(val),
                error: err => {
                  this.loadedPaths.delete(path);
                  observer.error(err);
                },
                complete: () => observer.complete()
              });
            }, { timeout: 6000 });

            return () => {
              if ('cancelIdleCallback' in idleWindow) {
                idleWindow.cancelIdleCallback(handle);
              }
            };
          });
        }

        // Fallback for browsers without requestIdleCallback
        return new Observable(observer => {
          if (this.loadedPaths.has(path)) {
            observer.next(null);
            observer.complete();
            return;
          }

          this.loadedPaths.add(path);
          return load().subscribe({
            next: val => observer.next(val),
            error: err => {
              this.loadedPaths.delete(path);
              observer.error(err);
            },
            complete: () => observer.complete()
          });
        });
      })
    );
  }

  private static readonly ROUTE_ALIASES: Record<string, string> = {
    '': 'video',
    'playlist': 'explore',
    'playlists': 'explore',
    'vocabulary': 'dictionary'
  };

  /**
   * Anticipatory prefetch triggered on pointerenter or touchstart.
   * Resolves aliases (e.g. /playlist -> explore) and safely handles any transient network glitch.
   */
  preloadNow(path: string): void {
    const rawPath = path.replace(/^\//, '').split('?')[0].split('#')[0];
    const cleanPath = IdlePreloadStrategy.ROUTE_ALIASES[rawPath] || rawPath;
    if (!this.loadedPaths.has(cleanPath)) {
      const load = this.preloadFns.get(cleanPath);
      if (load) {
        this.loadedPaths.add(cleanPath);
        load().subscribe({
          error: () => {
            // Unmark so future navigation or retry can attempt loading again
            this.loadedPaths.delete(cleanPath);
          }
        });
      }
    }
  }
}
