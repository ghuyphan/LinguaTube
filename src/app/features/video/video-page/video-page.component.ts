import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect, computed, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { SubtitleDisplayComponent } from '../subtitle-display/subtitle-display.component';
import { VocabularyListComponent } from '../../vocabulary/vocabulary-list/vocabulary-list.component';
import { PlaylistPanelComponent } from '../../playlist/playlist-panel/playlist-panel.component';
import { WordPopupComponent } from '../../dictionary/word-popup/word-popup.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { YoutubeService, SubtitleService, SettingsService, TranscriptService, I18nService } from '../../../services';
import { IconComponent } from '../../../shared/components/icon/icon.component';
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
    IconComponent,
    BottomSheetComponent,
  ],
  template: `
    <div class="layout">
      <div class="layout-main" [class.has-playlist-bar]="!!playlistService.currentPlaylist()">
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
      <aside class="layout-sidebar desktop-only" [class.swapping]="sidebarSwapping()">
        @if (playlistService.currentPlaylist()) {
          <app-playlist-panel 
            [class.slide-in-right]="sidebarSwapping()"
            (close)="closePlaylist()" 
            (videoSelect)="onPlaylistVideoSelect($event)"
          />
        } @else {
          <app-vocabulary-list [class.slide-in-left]="sidebarSwapping()" />
        }
      </aside>

      <!-- Mobile playlist Bar - only shows when viewing a playlist -->
      @if (playlistService.currentPlaylist(); as playlist) {
      <div 
        class="playlist-bar mobile-only" 
        (click)="showMobilePlaylistSheet.set(true)"
      >
        <div class="playlist-bar-content">
          <!-- Thumbnail -->
          <div class="playlist-thumb">
            @if (playlistService.currentVideo()?.thumbnail; as thumb) {
              <img [src]="thumb" alt="Thumbnail">
            }
          </div>

          <!-- Info -->
          <div class="playlist-info">
             <div class="playlist-meta">
               {{ i18n.t('nav.playlists') }} • {{ playlistService.currentIndex() + 1 }} / {{ playlist.videos.length }}
             </div>
             <div class="playlist-title">
               {{ playlistService.currentVideo()?.title || 'Unknown Title' }}
             </div>
          </div>

          <!-- Icon -->
          <div class="playlist-icon">
            <app-icon name="chevron-up" [size]="20" />
          </div>
        </div>
      </div>
      }
    </div>

    <!-- Mobile Playlist Bottom Sheet -->
    @if (playlistService.currentPlaylist()) {
    <app-bottom-sheet
      [isOpen]="showMobilePlaylistSheet()"
      [showCloseButton]="true"
      [maxHeight]="'70vh'"
      (closed)="showMobilePlaylistSheet.set(false)"
    >
      <app-playlist-panel 
        [isMobile]="true"
        (close)="showMobilePlaylistSheet.set(false); closePlaylist()" 
        (videoSelect)="onPlaylistVideoSelect($event); showMobilePlaylistSheet.set(false)"
      />
    </app-bottom-sheet>
    }

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
      z-index: 50; /* Ensure it's above video player content */
      
      /* Grid Overlay Strategy */
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 1fr;
    }
    
    .layout-sidebar > * {
      grid-column: 1;
      grid-row: 1;
      width: 100%;
    }

.layout-sidebar > app-vocabulary-list,
.layout-sidebar > app-playlist-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

    .desktop-only {
      display: block;
    }

      .layout-main.has-playlist-bar {
         /* Padding when playlist bar is visible (side-by-side with FAB) */
         padding-bottom: 120px;
      }

      .playlist-bar {
        display: none;
        position: fixed;
        left: var(--space-md);
        right: calc(var(--space-md) + 44px + var(--space-sm)); /* Leave room for FAB */
        bottom: calc(var(--bottom-nav-height) + var(--space-sm) + env(safe-area-inset-bottom, 0px)); /* Sits at same level as FAB */
        height: 56px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: var(--z-fixed);
        cursor: pointer;
        overflow: hidden;
        animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transition: transform var(--transition-fast), background-color var(--transition-fast);
      }

    .playlist-bar:active {
      transform: scale(0.98);
      background-color: var(--bg-secondary);
    }

    .playlist-bar-content {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 var(--space-sm);
      gap: var(--space-sm);
    }

    .playlist-thumb {
      width: 48px;
      height: 36px;
      border-radius: var(--border-radius-sm);
      overflow: hidden;
      flex-shrink: 0;
      background: var(--bg-secondary);
    }
    
    .playlist-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .playlist-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
    }

    .playlist-meta {
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .playlist-title {
      font-size: 0.875rem;
      color: var(--text-primary);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .playlist-icon {
      color: var(--text-secondary);
      padding: var(--space-xs);
    }

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
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
      
      .mobile-only {
        display: block;
      }

      .layout {
        gap: var(--space-md);
      }
      
      .layout-main {
        gap: var(--space-md);
        /* Default padding for FAB */
        padding-bottom: 100px;
      }
      
      .layout-main.has-playlist-bar {
         /* Padding when playlist bar is visible (side-by-side with FAB) */
         padding-bottom: 120px;
      }

      .fab-playlist {
        display: none; /* Hide old FAB if it still exists in other contexts, but we replaced the class */
      }
      
      .playlist-bar {
        display: block;
      }
    }

    @media (max-width: 480px) {
      .layout-main {
        gap: var(--space-md);
      }
    }

    /* Swap animations */
    .layout-sidebar.swapping > *,
    .panel-content.swapping > * {
      animation-duration: 250ms;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: forwards;
    }

    .slide-in-left {
      animation-name: slideInLeft;
    }

    .slide-in-right {
      animation-name: slideInRight;
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-16px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(16px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class VideoPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  protected youtube = inject(YoutubeService);
  private subtitles = inject(SubtitleService);
  private transcript = inject(TranscriptService);
  private settings = inject(SettingsService);
  private historyService = inject(HistoryService);
  protected playlistService = inject(PlaylistService);
  i18n = inject(I18nService);

  // Sidebar swap tracking
  private previousSidebarView = signal<'vocab' | 'playlist' | null>(null);
  sidebarSwapping = signal(false);

  // Mobile playlist sheet state
  showMobilePlaylistSheet = signal(false);

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

    // Sidebar swap detection - only animate when actually switching between views
    effect(() => {
      const currentView = this.playlistService.currentPlaylist() ? 'playlist' : 'vocab';
      const previous = this.previousSidebarView();

      // Only animate if BOTH previous and current are valid views (actual swap)
      if (previous !== null && previous !== currentView) {
        this.sidebarSwapping.set(true);
        setTimeout(() => this.sidebarSwapping.set(false), 300);
      }

      this.previousSidebarView.set(currentView);
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
        // Smart Recovery: If we have an active playlist and it contains this video,
        // don't clear it. Instead, restore the URL param.
        const currentPlaylist = this.playlistService.currentPlaylist();
        const currentVideoId = videoId || this.youtube.currentVideo()?.id;

        if (currentPlaylist && currentVideoId && currentPlaylist.videoIds.includes(currentVideoId)) {
          console.log('[VideoPage] Restoring playlist context for video:', currentVideoId);
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { playlist: currentPlaylist.id },
            queryParamsHandling: 'merge',
            replaceUrl: true // Don't create a new history entry for this fix
          });
        } else {
          this.playlistService.clearCurrentPlaylist();
        }
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
