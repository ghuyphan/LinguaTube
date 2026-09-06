import { Injectable, signal, computed, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class PwaService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private deferredPrompt = signal<BeforeInstallPromptEvent | null>(null);
  readonly isStandalone = signal<boolean>(false);
  readonly isIOS = signal<boolean>(false);
  readonly isInstalled = signal<boolean>(false);
  readonly showIosInstallGuide = signal<boolean>(false);

  /**
   * canInstall is true if:
   * 1. The app is NOT running in standalone mode (already installed & opened from home screen)
   * 2. The app was NOT just installed in this session
   * 3. Either a native beforeinstallprompt event was captured OR we are on iOS Safari
   */
  readonly canInstall = computed(() => {
    if (this.isStandalone() || this.isInstalled()) {
      return false;
    }
    return !!this.deferredPrompt() || this.isIOS();
  });

  private cleanupFns: Array<() => void> = [];

  constructor() {
    if (!this.isBrowser) return;

    this.detectEnvironment();
    this.initEventListeners();
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
  }

  private detectEnvironment(): void {
    // 1. Detect standalone display mode
    const standaloneQuery = window.matchMedia('(display-mode: standalone)');
    const isStandalone = standaloneQuery.matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    this.isStandalone.set(isStandalone);

    const handleStandaloneChange = (e: MediaQueryListEvent): void => {
      this.isStandalone.set(e.matches);
    };

    if (typeof standaloneQuery.addEventListener === 'function') {
      standaloneQuery.addEventListener('change', handleStandaloneChange);
      this.cleanupFns.push(() => standaloneQuery.removeEventListener('change', handleStandaloneChange));
    } else {
      const legacyQuery = standaloneQuery as MediaQueryList & {
        addListener?: (listener: (e: MediaQueryListEvent) => void) => void;
        removeListener?: (listener: (e: MediaQueryListEvent) => void) => void;
      };
      if (typeof legacyQuery.addListener === 'function') {
        legacyQuery.addListener(handleStandaloneChange);
        this.cleanupFns.push(() => legacyQuery.removeListener?.(handleStandaloneChange));
      }
    }

    // 2. Detect iOS device (iPhone / iPad / iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleMobile = /iphone|ipad|ipod/.test(userAgent) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1); // iPadOS 13+
    this.isIOS.set(isAppleMobile);
  }

  private initEventListeners(): void {
    // Listen for beforeinstallprompt
    const onBeforeInstallPrompt = (e: Event): void => {
      e.preventDefault();
      this.deferredPrompt.set(e as BeforeInstallPromptEvent);
    };

    // Listen for appinstalled
    const onAppInstalled = (): void => {
      this.isInstalled.set(true);
      this.deferredPrompt.set(null);
      this.showIosInstallGuide.set(false);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    this.cleanupFns.push(() => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    });
  }

  /**
   * Trigger the PWA installation flow.
   * If on Chromium / Android / Desktop with deferredPrompt: prompt native dialog.
   * If on iOS: open the iOS step-by-step visual bottom sheet.
   */
  async install(): Promise<boolean> {
    const promptEvent = this.deferredPrompt();
    if (promptEvent) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === 'accepted') {
          this.isInstalled.set(true);
          this.deferredPrompt.set(null);
          return true;
        }
        return false;
      } catch (err) {
        console.warn('[PWA] Prompt error:', err);
        return false;
      }
    }

    if (this.isIOS()) {
      this.showIosInstallGuide.set(true);
      return false;
    }

    return false;
  }

  openIosInstallGuide(): void {
    this.showIosInstallGuide.set(true);
  }

  closeIosInstallGuide(): void {
    this.showIosInstallGuide.set(false);
  }
}
