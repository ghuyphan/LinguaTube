import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { SubtitleDisplayComponent } from './components/subtitle-display/subtitle-display.component';
import { WordPopupComponent } from './components/word-popup/word-popup.component';
import { VocabularyListComponent } from './components/vocabulary-list/vocabulary-list.component';
import { DictionaryPanelComponent } from './components/dictionary-panel/dictionary-panel.component';
import { StudyModeComponent } from './components/study-mode/study-mode.component';
import { IconComponent } from './components/icon/icon.component';
import { Token } from './models';

type AppView = 'video' | 'dictionary' | 'study';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    VideoPlayerComponent,
    SubtitleDisplayComponent,
    WordPopupComponent,
    VocabularyListComponent,
    DictionaryPanelComponent,
    StudyModeComponent,
    IconComponent
  ],
  template: `
    <div class="app">
      <app-header />

      <main class="main">
        <div class="container">
          <!-- Video View (default) -->
          @if (currentView() === 'video') {
            <div class="layout">
              <div class="layout-main">
                <app-video-player />
                <app-subtitle-display (wordClicked)="onWordClicked($event)" />
              </div>

              <!-- Desktop sidebar -->
              <aside class="layout-sidebar desktop-only">
                <app-vocabulary-list />
              </aside>
            </div>
          }

          <!-- Dictionary View -->
          @if (currentView() === 'dictionary') {
            <div class="dictionary-view">
              <app-dictionary-panel />
              
              <div class="vocab-section mobile-only">
                <app-vocabulary-list />
              </div>
            </div>
          }

          <!-- Study View -->
          @if (currentView() === 'study') {
            <app-study-mode />
          }
        </div>
      </main>

      <!-- Mobile Bottom Navigation -->
      <nav class="bottom-nav">
        <div class="bottom-nav__items">
          <button 
            class="bottom-nav__item"
            [class.active]="currentView() === 'video'"
            (click)="setView('video')"
          >
            <app-icon name="video" [size]="20" />
            <span>Video</span>
          </button>
          <button 
            class="bottom-nav__item"
            [class.active]="currentView() === 'dictionary'"
            (click)="setView('dictionary')"
          >
            <app-icon name="book-open" [size]="20" />
            <span>Words</span>
          </button>
          <button 
            class="bottom-nav__item"
            [class.active]="currentView() === 'study'"
            (click)="setView('study')"
          >
            <app-icon name="graduation-cap" [size]="20" />
            <span>Study</span>
          </button>
        </div>
      </nav>

      <!-- Word popup -->
      <app-word-popup 
        [selectedWord]="selectedWord()"
        (closed)="selectedWord.set(null)"
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
      padding: var(--space-lg) 0;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: var(--space-lg);
      align-items: start;
    }

    .layout-main {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      min-width: 0;
    }

    .layout-sidebar {
      position: sticky;
      top: 80px;
    }

    .desktop-only {
      display: block;
    }

    .mobile-only {
      display: none;
    }

    /* Dictionary View */
    .dictionary-view {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      max-width: 600px;
      margin: 0 auto;
    }

    .vocab-section {
      margin-top: var(--space-md);
    }

    /* Desktop */
    @media (min-width: 769px) {
      .bottom-nav {
        display: none !important;
      }
    }

    /* Tablet & Mobile */
    @media (max-width: 1024px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .layout-sidebar {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .desktop-only {
        display: none;
      }

      .mobile-only {
        display: block;
      }

      .main {
        padding-bottom: 80px;
      }
    }

    @media (max-width: 480px) {
      .dictionary-view {
        gap: var(--space-md);
      }
    }
  `]
})
export class AppComponent {
  selectedWord = signal<Token | null>(null);
  currentView = signal<AppView>('video');

  onWordClicked(token: Token): void {
    this.selectedWord.set(token);
  }

  setView(view: AppView): void {
    this.currentView.set(view);
  }
}
