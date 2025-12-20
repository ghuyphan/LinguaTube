import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';

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
    IconComponent
  ],
  template: `
    <div class="app">
      <app-header />

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
            <app-icon name="video" [size]="20" />
            <span>Video</span>
          </a>
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
        </div>
      </nav>
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
      padding: var(--space-lg) 0;
    }

    /* Desktop */
    @media (min-width: 769px) {
      .bottom-nav {
        display: none !important;
      }
    }

    /* Tablet & Mobile */
    @media (max-width: 768px) {
      .main {
        padding: var(--space-sm) 0 calc(64px + var(--space-sm)) 0;
      }
    }
  `]
})
export class AppComponent { }
