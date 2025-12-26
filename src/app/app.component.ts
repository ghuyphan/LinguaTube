import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, computed, Injector, afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { SettingsSheetComponent } from './components/settings-sheet/settings-sheet.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { YoutubeService, I18nService, SettingsService } from './services';

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
    SidebarComponent
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
            routerLinkActive="active"
          >
            <app-icon name="play-circle" [size]="20" />
            <span>{{ i18n.t('nav.video') }}</span>
          </a>
          <a
            class="bottom-nav__item"
            routerLink="/dictionary"
            routerLinkActive="active"
          >
            <app-icon name="book-open" [size]="20" />
            <span>{{ i18n.t('nav.words') }}</span>
          </a>
          <a
            class="bottom-nav__item"
            routerLink="/study"
            routerLinkActive="active"
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
      <app-settings-sheet 
        [isOpen]="showSettingsSheet()" 
        (closed)="showSettingsSheet.set(false)" 
      />

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
  `]
})
export class AppComponent {
  private platformId = inject(PLATFORM_ID);
  private youtube = inject(YoutubeService);
  private router = inject(Router);
  private injector = inject(Injector);
  i18n = inject(I18nService);
  settings = inject(SettingsService);

  constructor() {
    // Lazy load SyncService after first render to reduce initial bundle size
    afterNextRender(() => {
      import('./services/sync.service').then(({ SyncService }) => {
        this.injector.get(SyncService);
      });
    });
  }

  showSettingsSheet = signal(false);
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

  toggleSettingsSheet(): void {
    this.showSettingsSheet.update(v => !v);
  }
}
