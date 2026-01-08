import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect, computed, PLATFORM_ID, DestroyRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { SubtitleDisplayComponent } from '../subtitle-display/subtitle-display.component';
import { VocabularyListComponent } from '../../vocabulary/vocabulary-list/vocabulary-list.component';
import { PlaylistPanelComponent } from '../../playlist/playlist-panel/playlist-panel.component';
import { WordPopupComponent } from '../../dictionary/word-popup/word-popup.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { CommandPaletteComponent } from '../../../shared/components/command-palette/command-palette.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    CommandPaletteComponent,
  ],
  template: `
    <div class="layout">
      <div class="layout-main" [class.has-video-bar]="!!youtube.currentVideo()">
        <app-video-player 
          (fullscreenWordClicked)="onWordClicked($event)" 
          (fullscreenChanged)="isVideoFullscreen.set($event)"
          (videoEnded)="onVideoEnded()"
          (saveClicked)="openAddToPlaylist()"
          (playlistNext)="onPlaylistNext()"
          (playlistPrev)="onPlaylistPrev()"
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

      <!-- Unified Mobile Video Bar -->
      <div class="mobile-video-bar desktop-none" 
           [class.hidden]="!youtube.currentVideo() && !playlistService.currentPlaylist()"
           [class.has-playlist]="!!playlistService.currentPlaylist()"
           (click)="onMobileBarClick()">
        
        <!-- Playlist Thumbnail (only when in playlist) -->
        @if (playlistService.currentPlaylist()) {
          <div class="bar-thumb" [class.skeleton]="!playlistService.currentVideo()?.thumbnail">
            @if (playlistService.currentVideo()?.thumbnail; as thumb) {
              <img [src]="thumb" alt="">
            }
          </div>
        }

        <!-- Title & Meta Wrapper -->
        <div style="flex: 1; min-width: 0; display: flex; align-items: center; gap: 8px; overflow: hidden;">
          @for (video of [playlistService.currentVideo() || youtube.currentVideo()]; track ($any(video)?.videoId || $any(video)?.id)) {
            <div class="bar-title">{{ video?.title || '' }}</div>
            
            <!-- Playlist position indicator -->
            @if (playlistService.currentPlaylist(); as playlist) {
              <span class="bar-meta">{{ playlistService.currentIndex() + 1 }}/{{ playlist.videos.length }}</span>
            }
          }
        </div>
        
        <!-- Search button (circle) -->
        <button class="bar-search-btn" 
          (click)="openCommandPalette(); $event.stopPropagation()"
          aria-label="Search new video">
          <app-icon name="search" [size]="18" />
        </button>
      </div>
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
        (videoSelect)="onPlaylistVideoSelect($event)"
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

    <!-- Command Palette -->
    <app-command-palette
      [isOpen]="showCommandPalette()"
      (closed)="showCommandPalette.set(false)"
    />

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
      /* 
       * Match video player height:
       * Video is 16:9 aspect ratio in the main column
       * Main column = 100% - 340px sidebar - gap
       * Video height = (container width - 340px - 32px) * 9/16
       * Simplified: use calc with approximate values
       */
      max-height: calc((100vw - 340px - 48px) * 0.5625);
      overflow: hidden;
      z-index: 50;
      
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
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

    .desktop-only {
      display: block;
    }

      .layout-main.has-video-bar {
         /* Padding when video bar is visible */
         padding-bottom: 72px;
      }

      /* ============================================
         MOBILE VIDEO BAR - Pill Style
         ============================================ */
      .mobile-video-bar {
        display: none;
        position: fixed;
        left: var(--space-md);
        right: var(--space-md);
        bottom: calc(var(--bottom-nav-height) + var(--space-xs));
        height: 44px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 24px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        z-index: var(--z-fixed);
        cursor: pointer;
        overflow: hidden;
        /* Smooth Scale/position transitions */
        transition: transform var(--transition-normal) cubic-bezier(0.2, 0.8, 0.2, 1), 
                    background-color var(--transition-fast),
                    opacity var(--transition-normal);
        align-items: center;
        padding: 0 var(--space-xs) 0 var(--space-xs);
        gap: var(--space-xs);
        
        /* Entry Animation default state */
        animation: barSlideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
      }

      @keyframes barSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .mobile-video-bar:active {
        transform: scale(0.98);
        background-color: var(--bg-secondary);
      }

      .mobile-video-bar.hidden {
        display: none !important;
      }

      /* Bar buttons */
      .bar-btn {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: var(--border-radius-round);
        background: transparent;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      .bar-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .bar-btn--primary {
        background: var(--accent-primary);
        color: white;
      }

      @media (hover: hover) {
        .bar-btn:not(:disabled):hover {
          background: var(--bg-secondary);
        }
        .bar-btn--primary:hover {
          opacity: 0.9;
          background: var(--accent-primary);
        }
      }

      /* Playlist thumbnail */
      .bar-thumb {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        background: var(--bg-secondary); /* Placeholder color always visible */
        margin-left: -4px;
        position: relative; /* Context for absolute img */
      }
      
      .bar-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        animation: fadeIn 0.3s ease-out forwards; /* Smooth fade in when loaded */
      }

      @keyframes fadeIn {
        to { opacity: 1; }
      }

      .bar-thumb.skeleton {
        background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
        background-size: 200% 100%;
        animation: skeleton-shimmer 1.5s infinite;
      }

      @keyframes skeleton-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* Bar title */
      .bar-title {
        font-size: 0.8125rem;
        color: var(--text-primary);
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-width: 0;
        animation: textSlideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
      }

      .bar-meta {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-weight: 500;
        flex-shrink: 0;
        animation: textSlideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
        /* Add a small staggering delay */
        animation-delay: 0.05s;
      }
      
      @keyframes textSlideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Circular search button */
      .bar-search-btn {
        width: 36px;
        height: 36px;
        min-height: 36px;
        max-height: 36px;
        border: none;
        border-radius: 50%;
        background: var(--accent-primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        align-self: center;
        cursor: pointer;
        transition: transform var(--transition-fast), opacity var(--transition-fast);
      }

      .bar-search-btn:active {
        transform: scale(0.92);
      }

      @media (hover: hover) {
        .bar-search-btn:hover {
          opacity: 0.9;
        }
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

      .desktop-none {
        display: flex;
      }

      .layout {
        gap: var(--space-md);
      }
      
      .layout-main {
        gap: var(--space-md);
        padding-bottom: 16px;
      }
      
      .layout-main.has-video-bar {
         /* Padding when video bar is visible */
         padding-bottom: 72px;
      }

      .mobile-video-bar {
        display: flex;
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
  private destroyRef = inject(DestroyRef);
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
  showCommandPalette = signal(false);

  // Playlist navigation helpers
  canPlayPrev = computed(() => {
    if (!this.playlistService.currentPlaylist()) return false;
    return this.playlistService.currentIndex() > 0 || this.playlistService.isLooping();
  });
  canPlayNext = computed(() => {
    const playlist = this.playlistService.currentPlaylist();
    if (!playlist) return false;
    return this.playlistService.currentIndex() < playlist.videos.length - 1 || this.playlistService.isLooping();
  });

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

  // Animation control
  shouldAnimateEntry = signal(false);

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

  ngOnInit() {
    // Only animate the video bar entry if it hasn't been shown yet in this session
    if (!this.playlistService.hasShownMobileBar) {
      this.shouldAnimateEntry.set(true);
      this.playlistService.hasShownMobileBar = true;
      // Reset after animation completes to prevent re-animation on video changes
      setTimeout(() => this.shouldAnimateEntry.set(false), 350);
    }

    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
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
            // this.youtube.currentVideo.set(null); // Removed to prevent UI flicker
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

  onPlaylistNext(): void {
    this.playlistService.playNext();
  }

  onPlaylistPrev(): void {
    this.playlistService.playPrevious();
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

  // Mobile video bar methods
  onMobileBarClick(): void {
    if (this.playlistService.currentPlaylist()) {
      this.showMobilePlaylistSheet.set(true);
    }
  }

  toggleShuffle(): void {
    this.playlistService.toggleShuffle();
  }

  openCommandPalette(): void {
    this.showCommandPalette.set(true);
  }
}
