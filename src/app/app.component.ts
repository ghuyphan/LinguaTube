import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, computed, Injector, afterNextRender, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith, interval, Subject, takeUntil, fromEvent } from 'rxjs';
import { IconComponent } from './shared/components/icon/icon.component';
import { SettingsSheetComponent } from './components/settings-sheet/settings-sheet.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomSheetComponent } from './shared/components/bottom-sheet/bottom-sheet.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { CommandPaletteComponent } from './shared/components/command-palette/command-palette.component';
import { StreakDialogComponent } from './components/streak-dialog/streak-dialog.component';
import { AiCreditsDialogComponent } from './components/ai-credits-dialog/ai-credits-dialog.component';
import { YoutubeService, I18nService, SettingsService, TranscriptService, SubtitleService } from './services';
import { StreakService } from './services/streak.service';
import { BottomSheetService } from './services/bottom-sheet.service';
import { PlaylistService } from './features/playlist/playlist.service';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    IconComponent,
    SettingsSheetComponent,
    SidebarComponent,
    BottomSheetComponent,
    OnboardingComponent,
    CommandPaletteComponent,
    StreakDialogComponent,
    AiCreditsDialogComponent
  ],
  template: `
    <div class="app" [class.has-sidebar]="true" [class.sidebar-collapsed]="sidebarCollapsed()">
      
      @if (!settings.settings().hasCompletedOnboarding) {
        @defer {
          <app-onboarding />
        } @placeholder {
          <div class="onboarding-loading"></div>
        }
      } @else {
        <!-- Desktop Sidebar (lazy loaded) -->
        @defer (on idle) {
          <app-sidebar 
            class="desktop-sidebar"
            (openSettings)="showSettingsSheet.set(true)"
            (openCommandPalette)="showCommandPalette.set(true)"
            (openStreak)="showStreakSheet.set(true)"
            (openAiCredits)="showAiCreditsSheet.set(true)"
          />
        }

        <div class="app__content">
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
              (click)="onLearnNavClick($event)"
              [class.active]="!anySheetOpen() && isRouteActive('/video')"
            >
              <div class="bottom-nav__icon-wrap">
                <app-icon name="play-circle" [size]="20" />
                @if (hasActiveVideoSession()) {
                  <span class="now-playing-dot"></span>
                }
              </div>
              <span>{{ i18n.t('nav.watch') }}</span>
            </a>
            <a
              class="bottom-nav__item"
              routerLink="/study"
              [class.active]="!anySheetOpen() && isRouteActive('/study')"
            >
              <app-icon name="graduation-cap" [size]="20" />
              <span>{{ i18n.t('nav.review') }}</span>
            </a>
            <a
              class="bottom-nav__item"
              routerLink="/dictionary"
              [class.active]="!anySheetOpen() && isRouteActive('/dictionary')"
            >
              <app-icon name="book-open" [size]="20" />
              <span>{{ i18n.t('nav.vocab') }}</span>
            </a>
            <a
              class="bottom-nav__item"
              routerLink="/explore"
              [class.active]="!anySheetOpen() && (isRouteActive('/explore') || isRouteActive('/playlists'))"
            >
              <app-icon name="list-video" [size]="20" />
              <span>{{ i18n.t('nav.playlists') }}</span>
            </a>
            <button
              class="bottom-nav__item"
              [class.active]="showMoreSheet() || isRouteActive('/history')"
              (click)="toggleMoreSheet()"
            >
              <app-icon name="more-horizontal" [size]="20" />
              <span>{{ i18n.t('nav.more') }}</span>
            </button>
          </div>
        </nav>

        <!-- More Menu Sheet -->
        <app-bottom-sheet
          [isOpen]="showMoreSheet()"
          [title]="i18n.t('nav.more') || 'More'"
          [showCloseButton]="false"
          [maxHeight]="'auto'"
          (closed)="showMoreSheet.set(false)"
        >
          <div class="more-menu">
            <!-- Mobile Motivation & AI Credits Quick Bar -->
            <div class="more-menu__stats">
              <button class="more-stat-card" (click)="showMoreSheet.set(false); showStreakSheet.set(true)">
                <app-icon name="fire" [size]="20" class="stat-icon--fire" />
                <div class="more-stat-info">
                  <span class="more-stat-val">{{ streak.currentStreak() }}</span>
                  <span class="more-stat-lbl">{{ i18n.t('streak.dayStreak') || 'Day Streak' }}</span>
                </div>
              </button>
              <button class="more-stat-card" (click)="showMoreSheet.set(false); showAiCreditsSheet.set(true)">
                <app-icon name="diamond" [size]="20" class="stat-icon--diamond" />
                <div class="more-stat-info">
                  <span class="more-stat-val">{{ transcript.diamonds() }}/{{ transcript.maxDiamonds() }}</span>
                  <span class="more-stat-lbl">{{ i18n.t('subtitle.aiCredits') }}</span>
                </div>
              </button>
            </div>

            <!-- Action Rows -->
            <button class="more-menu__item" (click)="openNewVideo()">
              <div class="more-menu__item-icon">
                <app-icon name="plus" [size]="18" />
              </div>
              <div class="more-menu__item-text">
                <span class="more-menu__item-title">{{ i18n.t('nav.newVideo') }}</span>
              </div>
              <app-icon name="chevron-right" [size]="16" class="more-menu__chevron" />
            </button>

            <button class="more-menu__item" (click)="navigateFromMore('/history')">
              <div class="more-menu__item-icon">
                <app-icon name="clock" [size]="18" />
              </div>
              <div class="more-menu__item-text">
                <span class="more-menu__item-title">{{ i18n.t('history.title') }}</span>
              </div>
              <app-icon name="chevron-right" [size]="16" class="more-menu__chevron" />
            </button>

            <div class="more-menu__divider"></div>

            <button class="more-menu__item" (click)="showMoreSheet.set(false); showSettingsSheet.set(true)">
              <div class="more-menu__item-icon">
                <app-icon name="settings" [size]="18" />
              </div>
              <div class="more-menu__item-text">
                <span class="more-menu__item-title">{{ i18n.t('nav.settings') }}</span>
              </div>
              <app-icon name="chevron-right" [size]="16" class="more-menu__chevron" />
            </button>
          </div>
        </app-bottom-sheet>

        <!-- Bottom Sheets -->
        @defer (when showSettingsSheet()) {
          <app-settings-sheet 
            [isOpen]="showSettingsSheet()" 
            (closed)="showSettingsSheet.set(false)" 
            (openStreak)="showSettingsSheet.set(false); showStreakSheet.set(true)"
            (openAiCredits)="showSettingsSheet.set(false); showAiCreditsSheet.set(true)"
          />
        }

        @defer (when showStreakSheet()) {
          <app-bottom-sheet
            [isOpen]="showStreakSheet()"
            [title]="i18n.t('streak.dayStreak') || 'Streak'"
            [showCloseButton]="true"
            (closed)="showStreakSheet.set(false)"
          >
            <app-streak-dialog (dismissed)="sheetService.closeTop()" />
          </app-bottom-sheet>
        }

        @defer (when showAiCreditsSheet()) {
          <app-bottom-sheet
            [isOpen]="showAiCreditsSheet()"
            [title]="i18n.t('subtitle.aiCredits') || 'AI Credits'"
            [showCloseButton]="true"
            (closed)="showAiCreditsSheet.set(false)"
          >
            <app-ai-credits-dialog (dismissed)="sheetService.closeTop()" />
          </app-bottom-sheet>
        }

        <!-- Command Palette (lazy loaded on demand) -->
        @defer (when showCommandPalette()) {
          <app-command-palette
            [isOpen]="showCommandPalette()"
            (submitted)="onCommandPaletteSearch($event)"
            (closed)="showCommandPalette.set(false)"
          />
        }
      }

      <!-- Update Available Sheet (always available, even during onboarding) -->
      <app-bottom-sheet
        [isOpen]="showUpdateSheet()"
        [title]="i18n.t('app.updateAvailable') || 'Update Available'"
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
      min-height: var(--app-height, 100dvh);
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
      padding: var(--space-lg) 0;
    }

    /* Desktop: with sidebar */
    @media (min-width: 769px) and (min-height: 501px) {
      .app.has-sidebar {
        flex-direction: row;
      }

      .app.has-sidebar .app__content {
        /* Use exact sidebar width - content adjusts smoothly when sidebar toggles */
        padding-left: 15.625rem; /* Match .sidebar width exactly */
        transition: padding-left 0.3s cubic-bezier(0.2, 0, 0, 1);
      }

      .app.has-sidebar.sidebar-collapsed .app__content {
        padding-left: 4.5rem; /* Match .sidebar.collapsed width exactly */
      }

      .bottom-nav {
        display: none !important;
      }
    }

    /* Mobile portrait: hide sidebar, show bottom nav */
    @media (max-width: 768px) {
      .desktop-sidebar {
        display: none !important;
      }

      .app__content {
        margin-left: 0;
        width: 100%;
      }

      .main {
        padding: var(--space-md) 0 calc(var(--bottom-nav-total-height) + var(--space-xs)) 0;
      }

      .main.video-active {
        padding-top: 0;
      }
    }

    /* Landscape phones: treat as mobile */
    @media (max-height: 500px) and (orientation: landscape) {
      .desktop-sidebar {
        display: none !important;
      }

      .app__content {
        margin-left: 0;
        width: 100%;
      }

      .main {
        padding: var(--space-sm) 0 calc(var(--bottom-nav-total-height) + var(--space-xs)) 0;
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

    /* More Menu */
    .more-menu {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: var(--space-xs) 0 var(--space-sm);
    }

    .more-menu__stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-sm);
      padding: 0 var(--space-md) var(--space-xs);
    }

    .more-stat-card {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: 0.75rem var(--space-sm);
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      cursor: pointer;
      text-align: left;
      transition: background-color var(--transition-fast), border-color var(--transition-fast);
    }

    .more-stat-card:active {
      background: var(--bg-hover);
      border-color: var(--accent-primary);
    }

    .stat-icon--fire {
      color: #f59e0b;
      flex-shrink: 0;
    }

    .stat-icon--diamond {
      color: #60a5fa;
      flex-shrink: 0;
    }

    .more-stat-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .more-stat-val {
      font-size: 0.9375rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1.1;
    }

    .more-stat-lbl {
      font-size: 0.6875rem;
      color: var(--text-muted);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .more-menu__item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: 0.625rem var(--space-md);
      margin: 0 var(--space-xs);
      width: calc(100% - var(--space-sm));
      background: none;
      border: none;
      border-radius: var(--border-radius-md);
      color: var(--text-primary);
      cursor: pointer;
      transition: background-color var(--transition-fast);
    }

    .more-menu__item:active {
      background: var(--bg-hover);
    }

    .more-menu__item-icon {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: var(--border-radius-sm);
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      flex-shrink: 0;
    }

    .more-menu__item-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: left;
      min-width: 0;
    }

    .more-menu__item-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .more-menu__chevron {
      color: var(--text-muted);
      flex-shrink: 0;
    }

    .more-menu__divider {
      height: 1px;
      background: var(--border-color);
      margin: var(--space-xs) var(--space-md);
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
  streak = inject(StreakService);
  transcript = inject(TranscriptService);
  private subtitles = inject(SubtitleService);
  protected playlistService = inject(PlaylistService);
  protected sheetService = inject(BottomSheetService);
  private swUpdate = inject(SwUpdate);

  hasActiveVideoSession = computed(() => !!this.youtube.currentVideo() && !this.router.url.startsWith('/video'));

  private destroy$ = new Subject<void>();
  private cleanupFns: Array<() => void> = [];
  private lastUpdateCheck = 0;
  private readonly UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour
  private readonly MIN_CHECK_INTERVAL = 10 * 60 * 1000; // 10 minutes minimum between checks

  constructor() {
    this.initViewportSizing();
    this.initServiceWorkerUpdates();
    this.initKeyboardShortcuts();
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(cleanup => cleanup());
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initViewportSizing(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    afterNextRender(() => {
      const root = this.document.documentElement;
      const standaloneQuery = window.matchMedia('(display-mode: standalone)');
      const updateViewportState = () => {
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        root.style.setProperty('--app-height', `${Math.round(viewportHeight)}px`);

        const isStandalone = standaloneQuery.matches ||
          (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

        root.classList.toggle('standalone-mode', isStandalone);
      };

      updateViewportState();

      const handleResize = () => updateViewportState();

      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('orientationchange', handleResize);
      this.cleanupFns.push(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      });

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
        this.cleanupFns.push(() => window.visualViewport?.removeEventListener('resize', handleResize));
      }

      if (typeof standaloneQuery.addEventListener === 'function') {
        standaloneQuery.addEventListener('change', handleResize);
        this.cleanupFns.push(() => standaloneQuery.removeEventListener('change', handleResize));
      } else {
        standaloneQuery.addListener(handleResize);
        this.cleanupFns.push(() => standaloneQuery.removeListener(handleResize));
      }
    }, { injector: this.injector });
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
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(this.document, 'visibilitychange')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
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
  showStreakSheet = signal(false);
  showAiCreditsSheet = signal(false);
  showUpdateSheet = signal(false);
  showCommandPalette = signal(false);
  showMoreSheet = signal(false);
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
  anySheetOpen = computed(() =>
    this.showSettingsSheet() || this.showStreakSheet() || this.showCommandPalette() || this.showAiCreditsSheet() || this.showMoreSheet()
  );

  // Check if current route matches
  isRouteActive(route: string): boolean {
    return this.currentUrl()?.startsWith(route) ?? false;
  }

  /**
   * Initialize keyboard shortcuts (Cmd/Ctrl + K for command palette)
   */
  private initKeyboardShortcuts(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        // Cmd/Ctrl + K to open command palette
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
          event.preventDefault();
          this.showCommandPalette.set(true);
        }
      });
  }

  onLearnNavClick(event: MouseEvent): void {
    const isOnVideoPage = this.router.url.startsWith('/video');
    const activeVideo = this.youtube.currentVideo();

    if (isOnVideoPage) {
      // Already on video page: Clicking Watch again clears current video to return to search/spotlight
      event.preventDefault();
      this.playlistService.clearCurrentPlaylist();
      this.youtube.reset();
      this.subtitles.clear();
      this.transcript.reset();
      void this.router.navigate(['/video'], { queryParams: {} });
    } else if (activeVideo) {
      // Navigating back from another page while video is active: Resume current video
      event.preventDefault();
      const playlistId = this.playlistService.currentPlaylist()?.id;
      void this.router.navigate(['/video'], {
        queryParams: {
          id: activeVideo.id,
          ...(playlistId ? { playlist: playlistId } : {})
        }
      });
    }
  }

  toggleSettingsSheet(): void {
    this.showSettingsSheet.update(v => !v);
  }

  toggleMoreSheet(): void {
    this.showMoreSheet.update(v => !v);
  }

  openNewVideo(): void {
    this.showMoreSheet.set(false);
    if (this.router.url === '/video' && !this.youtube.currentVideo() && !this.youtube.pendingVideoId()) {
      const inputEl = this.document.querySelector('.spotlight-input') as HTMLInputElement | null;
      if (inputEl) {
        inputEl.focus();
        return;
      }
    }
    this.showCommandPalette.set(true);
  }

  navigateFromMore(route: string): void {
    this.showMoreSheet.set(false);
    this.router.navigate([route]);
  }

  onCommandPaletteSearch(videoId: string): void {
    this.showCommandPalette.set(false);
    this.router.navigate(['/video'], { queryParams: { id: videoId } });
  }

  /**
   * Apply the pending update and reload the app
   */
  applyUpdate(): void {
    this.showUpdateSheet.set(false);

    // Note: Don't delete IndexedDB - user data (vocabulary, history) lives there!
    // The service worker handles asset cache invalidation automatically.

    this.swUpdate.activateUpdate().then(() => {
      console.log('[SW] Update activated, reloading...');
      window.location.reload();
    });
  }
}
