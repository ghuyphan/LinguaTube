import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { SubtitleDisplayComponent } from '../../components/subtitle-display/subtitle-display.component';
import { VocabularyListComponent } from '../../components/vocabulary-list/vocabulary-list.component';
import { WordPopupComponent } from '../../components/word-popup/word-popup.component';
import { YoutubeService } from '../../services';
import { Token } from '../../models';

@Component({
  selector: 'app-video-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    VideoPlayerComponent,
    SubtitleDisplayComponent,
    VocabularyListComponent,
    WordPopupComponent
  ],
  template: `
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

    <!-- Word popup -->
    @defer (when selectedWord()) {
      <app-word-popup 
        [selectedWord]="selectedWord()"
        (closed)="selectedWord.set(null)"
      />
    }
  `,
  styles: [`
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
      
      .layout {
        gap: var(--space-sm);
      }
      
      .layout-main {
        gap: var(--space-sm);
      }
    }

    @media (max-width: 480px) {
      .layout-main {
        gap: var(--space-sm);
      }
    }
  `]
})
export class VideoPageComponent {
  private router = inject(Router);
  private youtube = inject(YoutubeService);

  selectedWord = signal<Token | null>(null);

  constructor() {
    // Pause video when navigating away
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      // Only pause if the player is ready and playing
      if (this.youtube.isReady() && this.youtube.isPlaying()) {
        this.youtube.pauseVideo();
      }
    });
  }

  onWordClicked(token: Token): void {
    this.selectedWord.set(token);
  }
}
