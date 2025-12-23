import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { SubtitleDisplayComponent } from '../../components/subtitle-display/subtitle-display.component';
import { VocabularyListComponent } from '../../components/vocabulary-list/vocabulary-list.component';
import { WordPopupComponent } from '../../components/word-popup/word-popup.component';
import { YoutubeService, SubtitleService, SettingsService, TranscriptService } from '../../services';
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
        [currentSentence]="currentSentence()"
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
export class VideoPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private youtube = inject(YoutubeService);
  private subtitles = inject(SubtitleService);
  private transcript = inject(TranscriptService);
  private settings = inject(SettingsService);

  selectedWord = signal<Token | null>(null);
  currentSentence = signal<string>('');

  ngOnInit(): void {
    // Read video ID from URL query parameter
    this.route.queryParamMap.subscribe(params => {
      const videoId = params.get('id');
      // Only load if there's an ID and no video is currently loaded
      if (videoId && !this.youtube.currentVideo()) {
        this.loadVideoFromUrl(videoId);
      }
    });
  }

  private async loadVideoFromUrl(videoId: string): Promise<void> {
    try {
      // Wait for DOM element to exist
      await this.waitForElement('youtube-player');
      await this.youtube.initPlayer('youtube-player', videoId);
      this.fetchCaptions(videoId);
    } catch (err) {
      console.error('Failed to load video from URL:', err);
    }
  }

  private waitForElement(elementId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 10;

      const check = () => {
        const element = document.getElementById(elementId);
        if (element) {
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error(`Element #${elementId} not found after ${maxAttempts} attempts`));
        } else {
          attempts++;
          setTimeout(check, 50 * attempts);
        }
      };

      requestAnimationFrame(check);
    });
  }

  private fetchCaptions(videoId: string): void {
    const lang = this.settings.settings().language;
    this.transcript.fetchTranscript(videoId, lang).subscribe({
      next: (cues) => {
        if (cues.length > 0) {
          this.subtitles.subtitles.set(cues);
          this.subtitles.tokenizeAllCues(lang);
        }
      },
      error: (err) => console.log('Auto-caption fetch failed:', err)
    });
  }

  onWordClicked(event: { token: Token; sentence: string }): void {
    this.selectedWord.set(event.token);
    this.currentSentence.set(event.sentence);
  }
}
