import { Injectable, signal, computed, inject, PLATFORM_ID, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { fromEvent, interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from './toast.service';
import { I18nService } from './i18n.service';
import {
  ServerVersionInfo,
  CURRENT_RELEASE_INFO,
  getLocalizedHighlights,
  isVersionOlder
} from '../../data/changelog.data';

export interface CheckUpdateOptions {
  isManual?: boolean;
  trigger?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  private swUpdate = inject(SwUpdate);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private toast = inject(ToastService);
  private i18n = inject(I18nService);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Current client release metadata
  readonly currentVersion = signal<string>(CURRENT_RELEASE_INFO.version);
  readonly currentRelease = signal<ServerVersionInfo>(CURRENT_RELEASE_INFO);

  // Server state metadata & breaking change protection
  readonly serverVersionInfo = signal<ServerVersionInfo | null>(null);
  readonly incomingVersion = signal<string | null>(null);
  readonly forceUpdateRequired = signal<boolean>(false);
  readonly isMaintenanceMode = signal<boolean>(false);
  readonly maintenanceMessage = signal<string | null>(null);

  // Reactive state signals for UI components
  readonly isEnabled = signal<boolean>(false);
  readonly updateAvailable = signal<boolean>(false);
  readonly isChecking = signal<boolean>(false);
  readonly showUpdateSheet = signal<boolean>(false);
  readonly isApplyingUpdate = signal<boolean>(false);
  readonly showReloadFallback = signal<boolean>(false);
  readonly lastChecked = signal<Date | null>(null);

  // Localized highlights for the current incoming update
  readonly incomingHighlights = computed<string[]>(() => {
    const serverInfo = this.serverVersionInfo();
    const lang = this.i18n.currentLanguage();
    if (serverInfo) {
      return getLocalizedHighlights(serverInfo.highlights, lang);
    }
    return getLocalizedHighlights(this.currentRelease().highlights, lang);
  });

  // Localized highlights for current installed release
  readonly currentHighlights = computed<string[]>(() => {
    const lang = this.i18n.currentLanguage();
    return getLocalizedHighlights(this.currentRelease().highlights, lang);
  });

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
    } else {
      this.initUpdateListeners();
      this.initBackgroundTriggers();
    }

    // Always fetch server version on startup to verify API compatibility & changelog
    void this.fetchServerVersion();

    // Greet user with celebratory toast if app was just updated
    this.checkPostUpdateCelebration();
  }

  /**
   * Fetch current server version metadata, changelog, and breaking migration flags.
   */
  async fetchServerVersion(): Promise<ServerVersionInfo | null> {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const res = await fetch('/api/version', { cache: 'no-cache' });
      if (res.ok) {
        const data: ServerVersionInfo = await res.json();
        this.serverVersionInfo.set(data);

        // Check if server version is newer than installed client
        if (isVersionOlder(this.currentVersion(), data.version)) {
          this.incomingVersion.set(data.version);
        }

        // Enforce update if forceUpdate is true OR client is older than minSupportedVersion
        const requiresForce = data.forceUpdate || isVersionOlder(this.currentVersion(), data.minSupportedVersion);
        if (requiresForce) {
          console.warn('[AppUpdate] Breaking change detected: force update required to meet minimum version', data.minSupportedVersion);
          this.forceUpdateRequired.set(true);
          this.updateAvailable.set(true);
          this.showUpdateSheet.set(true);
        }

        if (data.maintenance) {
          this.isMaintenanceMode.set(true);
          this.maintenanceMessage.set(data.maintenanceMessage || 'Server maintenance in progress.');
        } else {
          this.isMaintenanceMode.set(false);
          this.maintenanceMessage.set(null);
        }

        return data;
      }
    } catch (err) {
      console.warn('[AppUpdate] Failed to fetch server version metadata:', err);
    }
    return null;
  }

  /**
   * Listen to version update events from Angular Service Worker
   */
  private initUpdateListeners(): void {
    // 1. Version ready event (new bundle downloaded & prepared)
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(async () => {
        console.log('[AppUpdate] New version ready for activation');
        await this.fetchServerVersion();
        this.updateAvailable.set(true);
        this.showUpdateSheet.set(true);
        this.isChecking.set(false);
      });

    // 2. Installation failure event
    this.swUpdate.versionUpdates
      .pipe(
        filter(evt => evt.type === 'VERSION_INSTALLATION_FAILED'),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(evt => {
        console.warn('[AppUpdate] Version installation failed:', evt);
        this.isChecking.set(false);
      });

    // 3. Unrecoverable state handler (cache corruption / broken hashes)
    this.swUpdate.unrecoverable
      .pipe(takeUntilDestroyed(this.destroyRef))
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
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (document.visibilityState === 'visible') {
            void this.checkForUpdate({ isManual: false, trigger: 'visibility' });
          }
        });
    }

    // 3. Periodic hourly check
    interval(this.PERIODIC_CHECK_INTERVAL)
      .pipe(takeUntilDestroyed(this.destroyRef))
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

    const now = Date.now();
    if (!isManual && now - this.lastCheckTimestamp < this.MIN_BACKGROUND_CHECK_INTERVAL) {
      return false;
    }

    this.isChecking.set(true);
    console.log(`[AppUpdate] Checking for updates (trigger: ${trigger})`);

    try {
      // Sync server metadata on manual checks
      if (isManual) {
        await this.fetchServerVersion();
      }

      if (!this.swUpdate.isEnabled) {
        if (isManual) {
          this.toast.info(this.i18n.t('settings.upToDate') || 'App is up to date');
        }
        return false;
      }

      const hasUpdate = await this.swUpdate.checkForUpdate();
      this.lastCheckTimestamp = Date.now();
      this.lastChecked.set(new Date());

      if (hasUpdate) {
        console.log('[AppUpdate] Update found and currently downloading...');
        await this.fetchServerVersion();
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
   * Apply the pending update and reload the application with a graceful transition.
   * Cleans up sheets and displays a dedicated full-screen updating transition overlay.
   */
  async applyUpdate(): Promise<void> {
    if (this.isApplyingUpdate()) {
      return;
    }

    // 1. Pause any active video/audio so background media does not bleed into the overlay
    if (typeof document !== 'undefined') {
      document.querySelectorAll<HTMLMediaElement>('video, audio').forEach(el => {
        try { el.pause(); } catch {}
      });
    }

    // 2. Mark post-update version in localStorage for celebratory feedback
    const nextVer = this.incomingVersion() || this.currentVersion();
    try {
      localStorage.setItem('voca_post_update_version', nextVer);
    } catch {}

    // 3. Dismiss the sheet and activate the smooth updating transition overlay
    this.showUpdateSheet.set(false);
    this.isApplyingUpdate.set(true);

    // 4. Safety fallback: if reload takes longer than 8s, give user a direct reload action
    setTimeout(() => {
      if (this.isApplyingUpdate()) {
        this.showReloadFallback.set(true);
      }
    }, 8000);

    try {
      console.log('[AppUpdate] Activating update...');
      if (this.swUpdate.isEnabled) {
        await this.swUpdate.activateUpdate();
        console.log('[AppUpdate] Update activated successfully');
      }
    } catch (err) {
      console.warn('[AppUpdate] activateUpdate encountered an error, proceeding with hard reload:', err);
    } finally {
      // Allow the smooth transition overlay to display for at least 650ms before reloading
      await new Promise(resolve => setTimeout(resolve, 650));

      // IndexedDB user data (vocabulary, history, streaks) is safely persisted
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  }

  /**
   * Force manual reload from escape hatch button
   */
  forceReload(): void {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  /**
   * Displays celebratory post-update toast if the app was recently reloaded into a new version.
   */
  private checkPostUpdateCelebration(): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      const updatedVersion = localStorage.getItem('voca_post_update_version');
      if (updatedVersion) {
        localStorage.removeItem('voca_post_update_version');
        const msg = this.i18n.t('app.updateSuccess', { version: updatedVersion }) || `Updated to v${updatedVersion}!`;
        setTimeout(() => {
          this.toast.show(msg, {
            type: 'success',
            icon: 'sparkles',
            duration: 5000
          });
        }, 1200);
      }
    } catch {
      // localStorage unavailable or restricted
    }
  }

  /**
   * Reopen the update prompt if an update is available.
   */
  promptUpdate(): void {
    if (this.updateAvailable() || this.forceUpdateRequired()) {
      this.showUpdateSheet.set(true);
    }
  }

  /**
   * Dismiss the update sheet for now.
   * Locked if a breaking change force-update is active.
   */
  dismissUpdate(): void {
    if (this.forceUpdateRequired()) {
      return; // Non-dismissible when breaking changes are enforced
    }
    this.showUpdateSheet.set(false);
  }

  /**
   * Recover from corrupted cache or broken service worker state.
   * Instead of abruptly reloading the user's active page, prompt them gracefully.
   */
  private handleUnrecoverableState(): void {
    console.error('[AppUpdate] Unrecoverable SW state detected; requesting graceful update rather than sudden reload');
    if (!this.isBrowser) {
      return;
    }
    // Flag update as available & required so user can confirm when ready
    this.updateAvailable.set(true);
    this.forceUpdateRequired.set(true);
    this.showUpdateSheet.set(true);
  }
}
