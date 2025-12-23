import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { SettingsSheetComponent } from './components/settings-sheet/settings-sheet.component';
import { VocabularyQuickViewComponent } from './components/vocabulary-quick-view/vocabulary-quick-view.component';
import { YoutubeService } from './services';

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
    VocabularyQuickViewComponent
  ],
  template: `
    <div class="app">
      <!-- Desktop only header -->
      <app-header class="desktop-header" />

      <main class="main" [class.video-active]="hasVideo()">
        <div class="container">
          <router-outlet />
        </div>
      </main>

      <!-- Mobile Bottom Navigation -->
      <nav class="bottom-nav">
        <div class="bottom-nav__items">
          <a
            class="bottom-nav__item"
            routerLink="/video"
            [class.active]="!anySheetOpen() && isRouteActive('/video')"
          >
            <app-icon name="play-circle" [size]="20" />
            <span>Video</span>
          </a>
          <button
            class="bottom-nav__item"
            [class.active]="showAddedSheet()"
            (click)="toggleAddedSheet()"
          >
            <app-icon name="bookmark-plus" [size]="20" />
            <span>Added</span>
          </button>
          <a
            class="bottom-nav__item"
            routerLink="/dictionary"
            [class.active]="!anySheetOpen() && isRouteActive('/dictionary')"
          >
            <app-icon name="book-open" [size]="20" />
            <span>Words</span>
          </a>
          <a
            class="bottom-nav__item"
            routerLink="/study"
            [class.active]="!anySheetOpen() && isRouteActive('/study')"
          >
            <app-icon name="graduation-cap" [size]="20" />
            <span>Study</span>
          </a>
          <button
            class="bottom-nav__item"
            [class.active]="showSettingsSheet()"
            (click)="toggleSettingsSheet()"
          >
            <app-icon name="settings" [size]="20" />
            <span>Settings</span>
          </button>
        </div>
      </nav>

      <!-- Bottom Sheets -->
      <app-settings-sheet 
        [isOpen]="showSettingsSheet()" 
        (closed)="showSettingsSheet.set(false)" 
      />
      <app-vocabulary-quick-view 
        [isOpen]="showAddedSheet()" 
        (closed)="showAddedSheet.set(false)" 
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

    .main {
      flex: 1;
      padding: var(--space-xl) 0;
    }

    /* Desktop: keep padding even with video active */
    /* Padding-top removal handled by mobile breakpoints below */

    /* Desktop: show header, hide bottom nav */
    /* Only hide on true desktop (wider than 769px AND taller than 500px, or has hover) */
    @media (min-width: 769px) and (min-height: 501px) {
      .bottom-nav {
        display: none !important;
      }
    }

    /* Mobile portrait: hide header, show bottom nav */
    @media (max-width: 768px) {
      .desktop-header {
        display: none !important;
      }

      .main {
        padding: var(--space-md) 0 calc(64px + var(--space-sm)) 0;
      }

      .main.video-active {
        padding-top: 0;
      }
    }

    /* Landscape phones: treat as mobile (hide header, adjust padding) */
    @media (max-height: 500px) and (orientation: landscape) {
      .desktop-header {
        display: none !important;
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

  showSettingsSheet = signal(false);
  showAddedSheet = signal(false);

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
  anySheetOpen = computed(() => this.showSettingsSheet() || this.showAddedSheet());

  // Check if current route matches
  isRouteActive(route: string): boolean {
    return this.currentUrl()?.startsWith(route) ?? false;
  }

  toggleSettingsSheet(): void {
    this.showAddedSheet.set(false);
    this.showSettingsSheet.update(v => !v);
  }

  toggleAddedSheet(): void {
    this.showSettingsSheet.set(false);
    this.showAddedSheet.update(v => !v);
  }
}
