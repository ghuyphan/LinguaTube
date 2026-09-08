import { Injectable, signal, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Subject, fromEvent, interval } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { I18nService } from './i18n.service';

export interface CheckUpdateOptions {
  isManual?: boolean;
  trigger?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService implements OnDestroy {
  private swUpdate = inject(SwUpdate);
  private platformId = inject(PLATFORM_ID);
  private toast = inject(ToastService);
  private i18n = inject(I18nService);
  private isBrowser = isPlatformBrowser(this.platformId);
  private destroy$ = new Subject<void>();

  // Reactive state signals for UI components
  readonly isEnabled = signal<boolean>(false);
  readonly updateAvailable = signal<boolean>(false);
  readonly isChecking = signal<boolean>(false);
  readonly showUpdateSheet = signal<boolean>(false);
  readonly currentVersion = signal<string>('1.0.0');
  readonly lastChecked = signal<Date | null>(null);

  // Timing constants
  private readonly MIN_BACKGROUND_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private readonly PERIODIC_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour
  private lastCheckTimestamp = 0;

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    const enabled = this.swUpdate.isEnabled;
    this.isEnabled.set(enabled);

    if (!enabled) {
      console.log('[AppUpdate] Service worker update detection is disabled in this environment.');
      return;
    }

    this.initUpdateListeners();
    this.initBackgroundTriggers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Listen to version update events from Angular Service Worker
   */
  private initUpdateListeners(): void {
    // 1. Version ready event (new bundle downloaded & prepared)
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('[AppUpdate] New version ready for activation');
        this.updateAvailable.set(true);
        this.showUpdateSheet.set(true);
        this.isChecking.set(false);
      });

    // 2. Installation failure event
    this.swUpdate.versionUpdates
      .pipe(
        filter(evt => evt.type === 'VERSION_INSTALLATION_FAILED'),
        takeUntil(this.destroy$)
      )
      .subscribe(evt => {
        console.warn('[AppUpdate] Version installation failed:', evt);
        this.isChecking.set(false);
      });

    // 3. Unrecoverable state handler (cache corruption / broken hashes)
    this.swUpdate.unrecoverable
      .pipe(takeUntil(this.destroy$))
      .subscribe(evt => {
        console.error('[AppUpdate] Unrecoverable state detected:', evt.reason);
        this.handleUnrecoverableState();
      });
  }

  /**
   * Initialize background update triggers:
   * - Startup delayed check (after initial app rendering)
   * - Tab focus / visibility change
   * - Hourly periodic check for long study sessions
   */
  private initBackgroundTriggers(): void {
    // 1. Startup check after initial app render (6 seconds delay)
    setTimeout(() => {
      void this.checkForUpdate({ isManual: false, trigger: 'startup' });
    }, 6000);

    // 2. Visibility change check (user resumes tab after switching away)
    if (typeof document !== 'undefined') {
      fromEvent(document, 'visibilitychange')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          if (document.visibilityState === 'visible') {
            void this.checkForUpdate({ isManual: false, trigger: 'visibility' });
          }
        });
    }

    // 3. Periodic hourly check
    interval(this.PERIODIC_CHECK_INTERVAL)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        void this.checkForUpdate({ isManual: false, trigger: 'interval' });
      });
  }

  /**
   * Check for updates with rate limiting for background triggers.
   * Manual checks (e.g. from Settings sheet) bypass the rate limit.
   */
  async checkForUpdate(options: CheckUpdateOptions = {}): Promise<boolean> {
    const isManual = options.isManual ?? false;
    const trigger = options.trigger ?? (isManual ? 'manual' : 'background');

    if (!this.isBrowser) {
      return false;
    }

    if (!this.swUpdate.isEnabled) {
      if (isManual) {
        this.toast.info(this.i18n.t('settings.upToDate') || 'App is up to date');
      }
      return false;
    }

    const now = Date.now();
    if (!isManual && now - this.lastCheckTimestamp < this.MIN_BACKGROUND_CHECK_INTERVAL) {
      return false;
    }

    this.isChecking.set(true);
    console.log(`[AppUpdate] Checking for updates (trigger: ${trigger})`);

    try {
      const hasUpdate = await this.swUpdate.checkForUpdate();
      this.lastCheckTimestamp = Date.now();
      this.lastChecked.set(new Date());

      if (hasUpdate) {
        console.log('[AppUpdate] Update found and currently downloading...');
        // VERSION_READY will be emitted once assets are fetched
        return true;
      }

      if (isManual) {
        this.toast.info(this.i18n.t('settings.upToDate') || 'App is up to date');
      }
      return false;
    } catch (err) {
      console.warn('[AppUpdate] Update check failed:', err);
      if (isManual) {
        this.toast.error(this.i18n.t('settings.updateCheckFailed') || 'Unable to check for updates. Please try again.');
      }
      return false;
    } finally {
      this.isChecking.set(false);
    }
  }

  /**
   * Apply the pending update and reload the application.
   * Cleans up sheets and ensures fallback reload even if activateUpdate rejects.
   */
  async applyUpdate(): Promise<void> {
    this.showUpdateSheet.set(false);

    try {
      console.log('[AppUpdate] Activating update...');
      await this.swUpdate.activateUpdate();
      console.log('[AppUpdate] Update activated successfully');
    } catch (err) {
      console.warn('[AppUpdate] activateUpdate encountered an error, proceeding with hard reload:', err);
    } finally {
      // IndexedDB user data (vocabulary, history, streaks) is safe
      window.location.reload();
    }
  }

  /**
   * Reopen the update prompt if an update is available.
   */
  promptUpdate(): void {
    if (this.updateAvailable()) {
      this.showUpdateSheet.set(true);
    }
  }

  /**
   * Dismiss the update sheet for now.
   * Keeps updateAvailable = true so badges and settings options stay visible.
   */
  dismissUpdate(): void {
    this.showUpdateSheet.set(false);
  }

  /**
   * Recover from corrupted cache or broken service worker state.
   */
  private handleUnrecoverableState(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (typeof caches !== 'undefined' && caches?.keys) {
      caches.keys()
        .then(names => Promise.all(names.map(name => caches.delete(name))))
        .catch(err => console.warn('[AppUpdate] Failed to delete caches:', err))
        .finally(() => {
          location.reload();
        });
    } else {
      location.reload();
    }
  }
}
