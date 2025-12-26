import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect } from '@angular/core';
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
        <app-video-player 
          (fullscreenWordClicked)="onWordClicked($event)" 
          (fullscreenChanged)="isVideoFullscreen.set($event)"
        />
        <app-subtitle-display 
          [isVideoFullscreen]="isVideoFullscreen()" 
          (wordClicked)="onWordClicked($event)" 
        />
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
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: var(--space-lg);
      align-items: start;
      max-width: 1280px;
      margin: 0 auto;
    }

    .layout-main {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      min-width: 0;
    }

    .layout-sidebar {
      position: sticky;
      top: var(--space-lg);
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

    @media (max-width: 768px), (max-height: 500px) and (orientation: landscape) {
      .desktop-only {
        display: none;
      }
      
      .layout {
        gap: var(--space-md);
      }
      
      .layout-main {
        gap: var(--space-md);
      }
    }

    @media (max-width: 480px) {
      .layout-main {
        gap: var(--space-md);
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
  isVideoFullscreen = signal(false);

  private lastLang = '';

  constructor() {
    // Watch for language changes and refetch captions when language changes
    effect(() => {
      const currentLang = this.settings.settings().language;
      const currentVideo = this.youtube.currentVideo();

      // Only refetch if:
      // 1. There's a current video
      // 2. Language has actually changed from what we last used
      // 3. We're not in the initial load (lastLang is set)
      if (currentVideo && this.lastLang && this.lastLang !== currentLang) {
        console.log(`[VideoPage] Language changed from ${this.lastLang} to ${currentLang}, refetching captions`);
        this.lastLang = currentLang;
        this.subtitles.clear();
        this.transcript.reset();
        this.fetchCaptions(currentVideo.id);
      }
    });
  }

  ngOnInit(): void {
    // Read video ID from URL query parameter
    this.route.queryParamMap.subscribe(params => {
      const videoId = params.get('id');
      const currentLang = this.settings.settings().language;

      if (videoId) {
        const currentVideo = this.youtube.currentVideo();
        // Load if no video OR if the video ID changed
        if (!currentVideo || currentVideo.id !== videoId) {
          // Clear old state before loading new video
          this.subtitles.clear();
          this.transcript.reset();
          this.lastLang = currentLang;
          this.loadVideoFromUrl(videoId);
        } else if (this.subtitles.subtitles().length === 0 || this.lastLang !== currentLang) {
          // Same video but no subtitles OR language changed - refetch
          this.subtitles.clear();
          this.transcript.reset();
          this.lastLang = currentLang;
          this.fetchCaptions(videoId);
        }
      }
    });
  }

  private async loadVideoFromUrl(videoId: string): Promise<void> {
    try {
      // Set pending video ID so the player container shows up
      this.youtube.pendingVideoId.set(videoId);
      // Wait for DOM element to exist
      await this.waitForElement('youtube-player');
      await this.youtube.initPlayer('youtube-player', videoId);
      this.fetchCaptions(videoId);
    } catch (err) {
      console.error('Failed to load video from URL:', err);
    } finally {
      // Clear pending state regardless of success/failure
      this.youtube.pendingVideoId.set(null);
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
          // Reset index first to prevent showing old cue during transition
          this.subtitles.currentCueIndex.set(-1);
          this.subtitles.subtitles.set(cues);

          // Auto-detect language mismatch
          const detectedFull = this.transcript.detectedLanguage();
          const detected = detectedFull?.split('-')[0]?.toLowerCase(); // Handle en-US, ja-JP
          const validLangs = ['ja', 'zh', 'ko', 'en'];

          if (detected && detected !== lang && validLangs.includes(detected)) {
            console.log(`[VideoPage] Auto-switching language from ${lang} to ${detected}`);
            this.settings.setLanguage(detected as 'ja' | 'zh' | 'ko' | 'en');
            this.subtitles.tokenizeAllCues(detected as 'ja' | 'zh' | 'ko' | 'en');
          } else {
            this.subtitles.tokenizeAllCues(lang);
          }
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
