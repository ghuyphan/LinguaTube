import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { SettingsSheetComponent } from './components/settings-sheet/settings-sheet.component';
import { VocabularyQuickViewComponent } from './components/vocabulary-quick-view/vocabulary-quick-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    IconComponent,
    SettingsSheetComponent,
    VocabularyQuickViewComponent
  ],
  template: `
    <div class="app">
      <!-- Desktop only header -->
      <app-header class="desktop-header" />

      <main class="main">
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
            routerLinkActive="active"
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
            routerLinkActive="active"
          >
            <app-icon name="book-open" [size]="20" />
            <span>Words</span>
          </a>
          <a
            class="bottom-nav__item"
            routerLink="/study"
            routerLinkActive="active"
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

    /* Desktop: show header, hide bottom nav */
    @media (min-width: 769px) {
      .bottom-nav {
        display: none !important;
      }
    }

    /* Mobile: hide header, show bottom nav */
    @media (max-width: 768px) {
      .desktop-header {
        display: none !important;
      }

      .main {
        padding: 0 0 calc(64px + var(--space-sm)) 0;
      }
    }
  `]
})
export class AppComponent {
  private platformId = inject(PLATFORM_ID);

  showSettingsSheet = signal(false);
  showAddedSheet = signal(false);

  toggleSettingsSheet(): void {
    this.showAddedSheet.set(false);
    this.showSettingsSheet.update(v => !v);
  }

  toggleAddedSheet(): void {
    this.showSettingsSheet.set(false);
    this.showAddedSheet.update(v => !v);
  }
}
