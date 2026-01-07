import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { SubtitleDisplayComponent } from '../subtitle-display/subtitle-display.component';
import { VocabularyListComponent } from '../../vocabulary/vocabulary-list/vocabulary-list.component';
import { PlaylistPanelComponent } from '../../playlist/playlist-panel/playlist-panel.component';
import { WordPopupComponent } from '../../dictionary/word-popup/word-popup.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { YoutubeService, SubtitleService, SettingsService, TranscriptService, I18nService } from '../../../services';
import { HistoryService } from '../../history/history.service';
import { AddToPlaylistDialogComponent } from '../../playlist/add-to-playlist-dialog/add-to-playlist-dialog.component';
import { PlaylistService } from '../../playlist/playlist.service';
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
    PlaylistPanelComponent,
    AddToPlaylistDialogComponent,
    WordPopupComponent,
    ConfirmDialogComponent,
  ],
  template: `
    <div class="layout">
      <div class="layout-main">
        <app-video-player 
          (fullscreenWordClicked)="onWordClicked($event)" 
          (fullscreenChanged)="isVideoFullscreen.set($event)"
          (videoEnded)="onVideoEnded()"
          (saveClicked)="openAddToPlaylist()"
        />

        <app-subtitle-display 
          [isVideoFullscreen]="isVideoFullscreen()" 
          (wordClicked)="onWordClicked($event)" 
          (manualAITrigger)="onManualAITrigger()"
        />
      </div>

      <!-- Desktop sidebar: Show Playlist Panel if active, otherwise Vocabulary List -->
      <aside class="layout-sidebar desktop-only">
        @if (playlistService.currentPlaylist()) {
          <app-playlist-panel 
            (close)="closePlaylist()" 
            (videoSelect)="onPlaylistVideoSelect($event)"
          />
        } @else {
          <app-vocabulary-list />
        }
      </aside>
    </div>

    <!-- Add to Playlist Dialog -->
    @if (showAddToPlaylistDialog() && youtube.currentVideo(); as video) {
        <app-add-to-playlist-dialog
            [isOpen]="showAddToPlaylistDialog()"
            [videoId]="video.id"
            (closed)="showAddToPlaylistDialog.set(false)">
        </app-add-to-playlist-dialog>
    }

    <!-- Language Mismatch Alert -->
    @if (showLanguageMismatchDialog()) {
    <app-confirm-dialog
      [isOpen]="true" 
      [title]="i18n.t('subtitle.languageMismatch')"
      [message]="languageMismatchMessage()"
      [confirmText]="switchLanguageButtonText()"
      [showCancel]="false"
      [allowBackdropClose]="false"
      variant="default" 
      icon="alert-circle" 
      (confirmed)="onMismatchConfirm()">
    </app-confirm-dialog>
    }

    <!-- Word popup -->
    @defer (when selectedWord()) {
      <app-word-popup 
        [selectedWord]="selectedWord()"
        [currentSentence]="currentSentence()"
        (closed)="onWordPopupClosed()"
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
      align-self: start;
      position: sticky;
      top: var(--space-md);
      height: calc(100vh - 100px); /* Adjust based on header height */
      overflow: hidden;
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
        height: auto;
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
  protected youtube = inject(YoutubeService);
  private subtitles = inject(SubtitleService);
  private transcript = inject(TranscriptService);
  private settings = inject(SettingsService);
  private historyService = inject(HistoryService);
  protected playlistService = inject(PlaylistService);
  i18n = inject(I18nService);

  selectedWord = signal<Token | null>(null);
  currentSentence = signal<string>('');
  isVideoFullscreen = signal(false);

  showAddToPlaylistDialog = signal(false);

  // Language Mismatch Alert
  readonly showLanguageMismatchDialog = signal(false);
  private mismatchDetectedLang = signal<string | null>(null);

  readonly languageMismatchMessage = computed(() => {
    const requested = this.settings.settings().language;
    const detected = this.mismatchDetectedLang() || 'en';
    return this.i18n.t('subtitle.languageMismatchMessage')
      .replace('{{requested}}', this.getLanguageName(requested))
      .replace('{{detected}}', this.getLanguageName(detected));
  });

  readonly switchLanguageButtonText = computed(() => {
    const detected = this.mismatchDetectedLang() || 'en';
    return this.i18n.t('subtitle.switchLanguage')
      .replace('{{language}}', this.getLanguageName(detected));
  });

  private getLanguageName(lang: string): string {
    switch (lang) {
      case 'ja': return this.i18n.t('settings.japanese');
      case 'zh': return this.i18n.t('settings.chinese');
      case 'ko': return this.i18n.t('settings.korean');
      case 'en': return this.i18n.t('settings.english');
      default: return lang;
    }
  }

  private lastLang = '';
  private wasPlayingBeforeWordLookup = false;
  private skipNextMismatchDialog = false;

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

        // User intentionally changed language, don't show mismatch dialog on next fetch
        this.skipNextMismatchDialog = true;

        // Close any open mismatch dialog
        this.showLanguageMismatchDialog.set(false);
        this.mismatchDetectedLang.set(null);

        this.subtitles.clear();
        this.transcript.reset();
        this.fetchCaptions(currentVideo.id);
      }
    });

    // Effect to sync video changes from playlist
    effect(() => {
      const playlistVideo = this.playlistService.currentVideo();
      const currentVideo = this.youtube.currentVideo();

      if (playlistVideo && (!currentVideo || currentVideo.id !== playlistVideo.videoId)) {
        // Navigate to the video URL to keep URL in sync
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            id: playlistVideo.videoId,
            playlist: this.playlistService.currentPlaylist()?.id
          },
          queryParamsHandling: 'merge'
        });
      }
    });
  }

  ngOnInit(): void {
    // Read params
    this.route.queryParamMap.subscribe(params => {
      const videoId = params.get('id');
      const playlistId = params.get('playlist');
      const currentLang = this.settings.settings().language;

      // Load playlist if present and different
      if (playlistId && this.playlistService.currentPlaylist()?.id !== playlistId) {
        this.playlistService.loadPlaylist(playlistId).catch(err => {
          console.error('Failed to load playlist:', err);
          // Remove invalid playlist param
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { playlist: null },
            queryParamsHandling: 'merge'
          });
        });
      } else if (!playlistId) {
        this.playlistService.clearCurrentPlaylist();
      }

      // Load Video Logic
      if (videoId) {
        const currentVideo = this.youtube.currentVideo();

        // If coming from playlist, we might already have the video set, check ID
        if (!currentVideo || currentVideo.id !== videoId) {
          this.youtube.currentVideo.set(null);
          this.subtitles.clear();
          this.transcript.reset();
          this.lastLang = currentLang;
          this.loadVideoFromUrl(videoId);
        } else {
          // Check if we need to refetch (no subtitles loaded)
          if (this.subtitles.subtitles().length === 0) {
            this.subtitles.clear();
            this.transcript.reset();
            this.lastLang = currentLang;
            this.fetchCaptions(videoId);
          } else {
            this.lastLang = currentLang;
          }
        }
      } else {
        // No video ID - check localStorage for recovery
        const savedVideoId = this.youtube.getLastVideoId();
        if (savedVideoId) {
          this.router.navigate(['/video'], {
            queryParams: { id: savedVideoId },
            replaceUrl: true
          });
        }
      }
    });
  }

  private async loadVideoFromUrl(videoId: string): Promise<void> {
    try {
      this.youtube.pendingVideoId.set(videoId);
      await this.waitForElement('youtube-player');
      await this.youtube.initPlayer('youtube-player', videoId);
      this.fetchCaptions(videoId);
    } catch (err) {
      console.error('Failed to load video from URL:', err);
    } finally {
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

  /**
   * Manual AI generation trigger (rate limited: 3/hour for anonymous, 5/hour for free, 30/hour for premium)
   */
  onManualAITrigger(): void {
    const currentVideo = this.youtube.currentVideo();
    const lang = this.settings.settings().language;

    if (currentVideo) {
      console.log(`[VideoPage] Manually triggering AI generation for ${currentVideo.id} (${lang})`);

      this.transcript.generateWithAI(currentVideo.id, lang)
        .subscribe({
          next: (cues) => {
            if (cues.length > 0) {
              this.handleCaptionsSuccess(cues, lang);
            }
          },
          error: (err) => console.error('[VideoPage] Manual AI error:', err)
        });
    }
  }

  private fetchCaptions(videoId: string): void {
    const lang = this.settings.settings().language;
    this.transcript.fetchTranscript(videoId, lang).subscribe({
      next: (cues) => {
        if (cues.length > 0) {
          this.handleCaptionsSuccess(cues, lang);
        }
      },
      error: (err) => {
        console.log('Auto-caption fetch failed:', err);

        // Handle NO_NATIVE case where other languages might be available
        if (this.transcript.error() === 'NO_NATIVE' && !this.skipNextMismatchDialog) {
          const availableNative = this.transcript.availableLanguages().native;

          if (availableNative && availableNative.length > 0) {
            // Find a preferred language to suggest
            const preferred = ['ja', 'zh', 'ko', 'en'];
            const requested = this.settings.settings().language;

            // normalize function to match simpler codes
            const normalize = (l: string) => l.split('-')[0].toLowerCase();

            let suggestion = availableNative.find(l => preferred.includes(normalize(l)));
            if (!suggestion) suggestion = availableNative[0]; // fallback to first available

            if (suggestion) {
              const suggestionSimple = normalize(suggestion);

              // Only show if it's different from what we asked for
              if (normalize(requested) !== suggestionSimple) {
                console.log(`[VideoPage] No native for ${requested}, but found ${suggestion}. Showing mismatch dialog.`);
                this.mismatchDetectedLang.set(suggestionSimple);
                this.showLanguageMismatchDialog.set(true);
              }
            }
          }
        }

        // Always reset the skip flag after an attempt
        this.skipNextMismatchDialog = false;
      }
    });
  }

  private handleCaptionsSuccess(cues: any[], requestedLang: string) {
    // Reset index first to prevent showing old cue during transition
    this.subtitles.currentCueIndex.set(-1);
    this.subtitles.subtitles.set(cues);

    // Track in history with actual available languages
    const currentVideo = this.youtube.currentVideo();
    if (currentVideo) {
      const availableLangs = this.transcript.availableLanguages().native;
      this.historyService.addToHistory(currentVideo, availableLangs);
    }

    // Detect actual language returned by backend
    const detectedFull = this.transcript.detectedLanguage();
    const detected = detectedFull?.split('-')[0]?.toLowerCase(); // Handle en-US, ja-JP
    const validLangs = ['ja', 'zh', 'ko', 'en'];

    // Use detected language for tokenization (silently - no popup)
    if (detected && validLangs.includes(detected)) {
      const targetLang = detected as 'ja' | 'zh' | 'ko' | 'en';
      this.subtitles.setLanguageState(targetLang, requestedLang as 'ja' | 'zh' | 'ko' | 'en');
      this.subtitles.tokenizeAllCues(targetLang);

      // Check for mismatch: requested language differs from detected
      // Only show dialog if this is NOT from a user-initiated language switch
      if (requestedLang !== targetLang && !this.skipNextMismatchDialog) {
        this.mismatchDetectedLang.set(targetLang);
        this.showLanguageMismatchDialog.set(true);
      }

      // Reset the skip flag after processing
      this.skipNextMismatchDialog = false;
    } else {
      const lang = requestedLang as 'ja' | 'zh' | 'ko' | 'en';
      this.subtitles.setLanguageState(lang, lang);
      this.subtitles.tokenizeAllCues(lang);
      this.skipNextMismatchDialog = false;
    }
  }

  onMismatchConfirm() {
    // Switch to detected language
    const detected = this.mismatchDetectedLang();
    if (detected) {
      // Skip the dialog for the upcoming refetch triggered by language change
      this.skipNextMismatchDialog = true;
      this.settings.setLanguage(detected as 'ja' | 'zh' | 'ko' | 'en');
    }
    this.showLanguageMismatchDialog.set(false);
    this.mismatchDetectedLang.set(null);
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

  // Playlist Methods

  closePlaylist(): void {
    this.playlistService.clearCurrentPlaylist();
    // Remove query param
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { playlist: null },
      queryParamsHandling: 'merge'
    });
  }

  onPlaylistVideoSelect(videoId: string): void {
    // Navigation is handled by effect() reacting to service state change
    // so we don't need to do anything here other than what the panel component already did (update service)
  }

  onVideoEnded(): void {
    // Auto-advance playlist
    if (this.playlistService.currentPlaylist()) {
      const nextId = this.playlistService.playNext();
      if (nextId) {
        console.log('[VideoPage] Auto-advancing to next video:', nextId);
      }
    }
  }

  openAddToPlaylist(): void {
    this.showAddToPlaylistDialog.set(true);
  }
}
