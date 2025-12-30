import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, computed, Injector, afterNextRender, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith, interval, Subject, takeUntil } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { SettingsSheetComponent } from './components/settings-sheet/settings-sheet.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { YoutubeService, I18nService, SettingsService } from './services';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    IconComponent,
    SettingsSheetComponent,
    SidebarComponent,
    BottomSheetComponent
  ],
  template: `
    <div class="app" [class.has-sidebar]="true" [class.sidebar-collapsed]="sidebarCollapsed()">
      <!-- Desktop Sidebar (lazy loaded) -->
      @defer (on idle) {
        <app-sidebar 
          class="desktop-sidebar"
          (openSettings)="showSettingsSheet.set(true)"
        />
      }

      <div class="app__content">
        <!-- Desktop only header (hidden when sidebar is visible) -->
        <app-header class="desktop-header" />

        <main class="main" [class.video-active]="hasVideo()">
          <div class="container">
            <router-outlet />
          </div>
        </main>
      </div>

      <!-- Mobile Bottom Navigation -->
      <nav class="bottom-nav">
        <div class="bottom-nav__items">
          <a
            class="bottom-nav__item"
            routerLink="/video"
            [class.active]="!anySheetOpen() && isRouteActive('/video')"
          >
            <app-icon name="play-circle" [size]="20" />
            <span>{{ i18n.t('nav.video') }}</span>
          </a>
          <a
            class="bottom-nav__item"
            routerLink="/dictionary"
            [class.active]="!anySheetOpen() && isRouteActive('/dictionary')"
          >
            <app-icon name="book-open" [size]="20" />
            <span>{{ i18n.t('nav.words') }}</span>
          </a>
          <a
            class="bottom-nav__item"
            routerLink="/study"
            [class.active]="!anySheetOpen() && isRouteActive('/study')"
          >
            <app-icon name="graduation-cap" [size]="20" />
            <span>{{ i18n.t('nav.study') }}</span>
          </a>
          <button
            class="bottom-nav__item"
            [class.active]="showSettingsSheet()"
            (click)="toggleSettingsSheet()"
          >
            <app-icon name="settings" [size]="20" />
            <span>{{ i18n.t('nav.settings') }}</span>
          </button>
        </div>
      </nav>

      <!-- Bottom Sheets -->
      @defer (when showSettingsSheet()) {
        <app-settings-sheet 
          [isOpen]="showSettingsSheet()" 
          (closed)="showSettingsSheet.set(false)" 
        />
      }

      <!-- Update Available Sheet -->
      <app-bottom-sheet
        [isOpen]="showUpdateSheet()"
        [showCloseButton]="true"
        [maxHeight]="'auto'"
        (closed)="showUpdateSheet.set(false)"
      >
        <div class="update-sheet">
          <div class="update-sheet__icon">
            <app-icon name="rotate-ccw" [size]="32" />
          </div>
          <h3 class="update-sheet__title">{{ i18n.t('app.updateAvailable') }}</h3>
          <p class="update-sheet__message">{{ i18n.t('app.updateMessage') }}</p>
          <div class="update-sheet__actions">
            <button class="update-sheet__btn update-sheet__btn--secondary" (click)="showUpdateSheet.set(false)">
              {{ i18n.t('app.updateLater') }}
            </button>
            <button class="update-sheet__btn update-sheet__btn--primary" (click)="applyUpdate()">
              {{ i18n.t('app.updateNow') }}
            </button>
          </div>
        </div>
      </app-bottom-sheet>

    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--bg-primary);
    }

    .app__content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .main {
      flex: 1;
      padding: var(--space-xl) 0;
    }

    /* Desktop: with sidebar */
    @media (min-width: 769px) and (min-height: 501px) {
      .app.has-sidebar {
        flex-direction: row;
      }

      .app.has-sidebar .app__content {
        margin-left: 260px; /* Sidebar width */
        width: calc(100% - 260px);
        transition: margin-left var(--transition-normal), width var(--transition-normal);
      }

      .app.has-sidebar.sidebar-collapsed .app__content {
        margin-left: 68px; /* Collapsed sidebar width */
        width: calc(100% - 68px);
      }

      /* Hide old header when sidebar is visible */
      .desktop-header {
        display: none !important;
      }

      .bottom-nav {
        display: none !important;
      }

      .main {
        padding: var(--space-lg) var(--space-xl);
      }
    }

    /* Mobile portrait: hide sidebar, show bottom nav */
    @media (max-width: 768px) {
      .desktop-header {
        display: none !important;
      }

      .desktop-sidebar {
        display: none !important;
      }

      .app__content {
        margin-left: 0;
        width: 100%;
      }

      .main {
        padding: var(--space-md) 0 calc(64px + var(--space-sm)) 0;
      }

      .main.video-active {
        padding-top: 0;
      }
    }

    /* Landscape phones: treat as mobile */
    @media (max-height: 500px) and (orientation: landscape) {
      .desktop-header {
        display: none !important;
      }

      .desktop-sidebar {
        display: none !important;
      }

      .app__content {
        margin-left: 0;
        width: 100%;
      }

      .main {
        padding: var(--space-sm) 0 calc(64px + var(--space-sm)) 0;
      }

      .main.video-active {
        padding-top: 0;
      }
    }

    /* Update Sheet Styles */
    .update-sheet {
      padding: var(--space-lg);
      text-align: center;
    }

    .update-sheet__icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto var(--space-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(74, 111, 165, 0.1);
      border-radius: var(--border-radius-round);
      color: var(--info);
    }

    .update-sheet__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--space-xs);
    }

    .update-sheet__message {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin: 0 0 var(--space-lg);
      line-height: 1.5;
    }

    .update-sheet__actions {
      display: flex;
      gap: var(--space-sm);
    }

    .update-sheet__btn {
      flex: 1;
      padding: var(--space-md);
      border-radius: var(--border-radius);
      font-size: 0.9375rem;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .update-sheet__btn--secondary {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .update-sheet__btn--primary {
      background: var(--accent-primary);
      color: white;
    }

    @media (hover: hover) {
      .update-sheet__btn--secondary:hover {
        background: var(--bg-card);
      }

      .update-sheet__btn--primary:hover {
        opacity: 0.9;
      }
    }
  `]
})
export class AppComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private youtube = inject(YoutubeService);
  private router = inject(Router);
  private injector = inject(Injector);
  private document = inject(DOCUMENT);
  i18n = inject(I18nService);
  settings = inject(SettingsService);
  private swUpdate = inject(SwUpdate);

  private destroy$ = new Subject<void>();
  private lastUpdateCheck = 0;
  private readonly UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour
  private readonly MIN_CHECK_INTERVAL = 10 * 60 * 1000; // 10 minutes minimum between checks

  constructor() {
    this.initServiceWorkerUpdates();

    // Lazy load SyncService after first render to reduce initial bundle size
    afterNextRender(() => {
      import('./services/sync.service').then(({ SyncService }) => {
        this.injector.get(SyncService);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize service worker update detection with sensible triggers:
   * 1. Check on app startup
   * 2. Check when app regains focus (user switches back to the tab/app)
   * 3. Hourly fallback for long study sessions
   */
  private initServiceWorkerUpdates(): void {
    if (!this.swUpdate.isEnabled || !isPlatformBrowser(this.platformId)) {
      return;
    }

    // Subscribe to version updates - show update sheet instead of auto-reloading
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('[SW] New version ready, showing update notification...');
        this.showUpdateSheet.set(true);
      });

    // 1. Check on startup (with delay to not block initial render)
    setTimeout(() => this.checkForUpdate('startup'), 5000);

    // 2. Check when app regains focus (essential for study app - users switch tabs often)
    if (typeof document !== 'undefined') {
      this.document.addEventListener('visibilitychange', () => {
        if (this.document.visibilityState === 'visible') {
          this.checkForUpdate('visibility');
        }
      });
    }

    // 3. Hourly fallback for long study sessions
    interval(this.UPDATE_CHECK_INTERVAL)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkForUpdate('interval'));
  }

  /**
   * Check for updates with rate limiting to prevent excessive checks
   */
  private checkForUpdate(trigger: string): void {
    const now = Date.now();

    // Rate limit: don't check more than once every 5 minutes
    if (now - this.lastUpdateCheck < this.MIN_CHECK_INTERVAL) {
      return;
    }

    this.lastUpdateCheck = now;
    console.log(`[SW] Checking for updates (trigger: ${trigger})`);

    this.swUpdate.checkForUpdate()
      .then(hasUpdate => {
        if (hasUpdate) {
          console.log('[SW] Update found!');
        }
      })
      .catch(err => {
        console.warn('[SW] Update check failed:', err);
      });
  }

  showSettingsSheet = signal(false);
  showUpdateSheet = signal(false);
  sidebarCollapsed = computed(() => this.settings.settings().sidebarCollapsed);


  // Track current URL to know which page we're on
  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(this.router.url)
    )
  );

  // Check if video is loaded AND we're on the video page
  hasVideo = computed(() => {
    const isOnVideoPage = this.currentUrl()?.startsWith('/video') ?? false;
    const videoLoaded = !!this.youtube.currentVideo() || !!this.youtube.pendingVideoId();
    return isOnVideoPage && videoLoaded;
  });

  // Check if any sheet is open (for bottom nav active state)
  anySheetOpen = computed(() => this.showSettingsSheet());

  // Check if current route matches
  isRouteActive(route: string): boolean {
    return this.currentUrl()?.startsWith(route) ?? false;
  }

  toggleSettingsSheet(): void {
    this.showSettingsSheet.update(v => !v);
  }

  /**
   * Apply the pending update and reload the app
   */
  applyUpdate(): void {
    this.showUpdateSheet.set(false);
    this.swUpdate.activateUpdate().then(() => {
      console.log('[SW] Update activated, reloading...');
      window.location.reload();
    });
  }
}
