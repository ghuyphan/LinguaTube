import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { SubtitleDisplayComponent } from '../subtitle-display/subtitle-display.component';
import { VocabularyListComponent } from '../../vocabulary/vocabulary-list/vocabulary-list.component';
import { WordPopupComponent } from '../../dictionary/word-popup/word-popup.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { YoutubeService, SubtitleService, SettingsService, TranscriptService, I18nService } from '../../../services';
import { Token } from '../../../models';

@Component({
  selector: 'app-video-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    VideoPlayerComponent,
    SubtitleDisplayComponent,
    VocabularyListComponent,
    WordPopupComponent,
    BottomSheetComponent,
    IconComponent
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
          (manualAITrigger)="onManualAITrigger()"
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
        (closed)="onWordPopupClosed()"
      />
    }

    <!-- Language Mismatch Sheet -->
    <app-bottom-sheet
      #mismatchSheet
      [isOpen]="showLangMismatchSheet()"
      [showCloseButton]="true"
      [maxHeight]="'auto'"
      [navPadding]="true"
      (closed)="showLangMismatchSheet.set(false)"
    >
      <div class="lang-mismatch-sheet">
        <div class="lang-mismatch-sheet__icon">
          <app-icon name="languages" [size]="32" />
        </div>
        <h3 class="lang-mismatch-sheet__title">{{ i18n.t('subtitle.languageMismatch') }}</h3>
        <p class="lang-mismatch-sheet__message">
          {{ getLangMismatchMessage() }}
        </p>
        <button class="lang-mismatch-sheet__btn" (click)="mismatchSheet.close()">
          {{ i18n.t('subtitle.gotIt') }}
        </button>
      </div>
    </app-bottom-sheet>
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
      align-self: start;
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

    /* Language Mismatch Sheet Styles */
    .lang-mismatch-sheet {
      padding: var(--space-lg);
      text-align: center;
    }

    .lang-mismatch-sheet__icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto var(--space-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(212, 165, 116, 0.15);
      border-radius: var(--border-radius-round);
      color: var(--warning);
    }

    .lang-mismatch-sheet__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--space-xs);
    }

    .lang-mismatch-sheet__message {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin: 0 0 var(--space-lg);
      line-height: 1.5;
    }

    .lang-mismatch-sheet__btn {
      width: 100%;
      padding: var(--space-md);
      border-radius: var(--border-radius);
      font-size: 0.9375rem;
      font-weight: 500;
      border: none;
      cursor: pointer;
      background: var(--accent-primary);
      color: white;
      transition: all var(--transition-fast);
    }

    @media (hover: hover) {
      .lang-mismatch-sheet__btn:hover {
        opacity: 0.9;
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
  i18n = inject(I18nService);

  selectedWord = signal<Token | null>(null);
  currentSentence = signal<string>('');
  isVideoFullscreen = signal(false);
  showLangMismatchSheet = signal(false);
  mismatchRequestedLang = signal('');
  mismatchDetectedLang = signal('');

  private lastLang = '';

  // Language name mapping for user-friendly display
  private readonly langNames: Record<string, string> = {
    ja: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
    en: 'English'
  };

  private wasPlayingBeforeWordLookup = false;

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
          this.youtube.currentVideo.set(null);
          this.subtitles.clear();
          this.transcript.reset();
          this.lastLang = currentLang;
          this.loadVideoFromUrl(videoId);
          this.lastLang = currentLang;
          this.loadVideoFromUrl(videoId);
        } else {
          // Check if we need to refetch:
          // 1. No subtitles loaded
          // 2. Language changed AND neither requested nor loaded language matches current preference
          //    (allows sticking with mismatched language if that's what we found for this requested lang)
          const needsRefetch = this.subtitles.subtitles().length === 0 ||
            (this.subtitles.requestedLanguage() !== currentLang &&
              this.subtitles.loadedLanguage() !== currentLang);

          if (needsRefetch) {
            this.subtitles.clear();
            this.transcript.reset();
            this.lastLang = currentLang;
            this.fetchCaptions(videoId);
          } else {
            // Restore lastLang from service state to prevent effect loop
            this.lastLang = currentLang;
          }
        }
      } else {
        // No video ID in URL - check localStorage for recovery
        const savedVideoId = this.youtube.getLastVideoId();
        if (savedVideoId) {
          // Redirect to URL with query param to keep URL as source of truth
          this.router.navigate(['/video'], {
            queryParams: { id: savedVideoId },
            replaceUrl: true  // Don't add to history
          });
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

  onManualAITrigger(): void {
    const currentVideo = this.youtube.currentVideo();
    const lang = this.settings.settings().language;

    if (currentVideo) {
      console.log(`[VideoPage] Manually triggering AI generation for ${currentVideo.id} (${lang})`);
      // Access private player safely with type assertion for now
      const duration = (this.youtube as any).player?.()?.getDuration() || 0;

      this.transcript.generateWithWhisper(currentVideo.id, undefined, lang, duration)
        .subscribe({
          next: (cues) => {
            if (cues.length > 0) {
              this.handleCaptionsSuccess(cues, lang, lang); // Assume AI gives us what we asked for (or detected)
            }
          },
          error: (err) => console.error('[VideoPage] Manual AI error:', err)
        });
    }
  }

  private fetchCaptions(videoId: string): void {
    const lang = this.settings.settings().language;
    // No forceRefresh anymore
    this.transcript.fetchTranscript(videoId, lang).subscribe({
      next: (cues) => {
        if (cues.length > 0) {
          this.handleCaptionsSuccess(cues, lang);
        }
      },
      error: (err) => console.log('Auto-caption fetch failed:', err)
    });
  }

  private handleCaptionsSuccess(cues: any[], requestedLang: string, forcedDetected?: string) {
    // Reset index first to prevent showing old cue during transition
    this.subtitles.currentCueIndex.set(-1);
    this.subtitles.subtitles.set(cues);

    // Detect actual language returned by backend (or forced if AI)
    const detectedFull = forcedDetected || this.transcript.detectedLanguage();
    const detected = detectedFull?.split('-')[0]?.toLowerCase(); // Handle en-US, ja-JP
    const validLangs = ['ja', 'zh', 'ko', 'en'];

    // Use detected language for tokenization
    if (detected && detected !== requestedLang && validLangs.includes(detected)) {
      console.log(`[VideoPage] Using ${detected} captions for tokenization (requested: ${requestedLang})`);
      const targetLang = detected as 'ja' | 'zh' | 'ko' | 'en';
      this.subtitles.setLanguageState(targetLang, requestedLang as 'ja' | 'zh' | 'ko' | 'en');
      this.subtitles.tokenizeAllCues(targetLang);

      if (!forcedDetected) {
        this.mismatchRequestedLang.set(requestedLang);
        this.mismatchDetectedLang.set(detected);
        this.showLangMismatchSheet.set(true);
      }
    } else {
      const lang = requestedLang as 'ja' | 'zh' | 'ko' | 'en';
      this.subtitles.setLanguageState(lang, lang);
      this.subtitles.tokenizeAllCues(lang);
    }
  }

  getLangMismatchMessage(): string {
    const requested = this.i18n.t(`settings.${this.langNames[this.mismatchRequestedLang()]?.toLowerCase() || 'english'}`);
    const detected = this.i18n.t(`settings.${this.langNames[this.mismatchDetectedLang()]?.toLowerCase() || 'english'}`);
    return this.i18n.t('subtitle.languageMismatchMessage')
      .replace('{{requested}}', requested)
      .replace('{{detected}}', detected);
  }

  onWordClicked(event: { token: Token; sentence: string }): void {
    // Pause video on mobile when looking up a word for better UX
    if (window.innerWidth <= 768) {
      this.wasPlayingBeforeWordLookup = this.youtube.isPlaying();
      if (this.wasPlayingBeforeWordLookup) {
        this.youtube.pause();
      }
    }
    this.selectedWord.set(event.token);
    this.currentSentence.set(event.sentence);
  }

  onWordPopupClosed(): void {
    this.selectedWord.set(null);

    // Resume video if it was playing before lookup
    if (window.innerWidth <= 768 && this.wasPlayingBeforeWordLookup) {
      this.youtube.play();
      this.wasPlayingBeforeWordLookup = false;
    }
  }
}
