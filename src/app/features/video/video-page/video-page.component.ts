import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect, computed, PLATFORM_ID, DestroyRef, HostListener } from '@angular/core';
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
import { YoutubeService, SubtitleService, SettingsService, TranscriptService, I18nService, VocabularyService, DictionaryService } from '../../../services';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { HistoryService } from '../../history/history.service';
import { AddToPlaylistDialogComponent } from '../../playlist/add-to-playlist-dialog/add-to-playlist-dialog.component';
import { ExpandablePlaylistComponent } from '../../playlist/expandable-playlist/expandable-playlist.component';
import { PlaylistService } from '../../playlist/playlist.service';
import { Playlist, Token } from '../../../models';

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
    ExpandablePlaylistComponent
  ],
  templateUrl: './video-page.component.html',
  styles: [`
    /* Hidden file input for import */
    .hidden-input {
        display: none;
    }
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr minmax(340px, 25vw);
      gap: var(--space-lg);
      align-items: start;
      max-width: 100%;
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
      max-height: calc((min(100vw, 1280px) - 340px - 48px) * 0.5625);
      overflow: hidden;
      z-index: 50;
      display: flex;
      flex-direction: column;
    }

    /* Tab switcher */
    .sidebar-tabs {
      display: flex;
      gap: 2px;
      padding: var(--space-xs);
      background: var(--bg-secondary);
      border-radius: var(--border-radius-lg);
      margin-bottom: var(--space-sm);
      flex-shrink: 0;
    }

    .sidebar-tab {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      padding: var(--space-sm) var(--space-md);
      background: transparent;
      border: none;
      border-radius: var(--border-radius);
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .sidebar-tab:hover {
      color: var(--text-primary);
      background: var(--bg-tertiary);
    }

    .sidebar-tab.active {
      background: var(--bg-card);
      color: var(--text-primary);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    /* Tab content fills remaining space */
    .sidebar-content {
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    .desktop-only {
      display: block;
    }

    .learn-home {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      padding: var(--space-lg);
      overflow: hidden;
    }

    .learn-home__hero {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: var(--space-md);
      padding: var(--space-lg);
      border-radius: var(--border-radius-lg);
      background:
        radial-gradient(circle at top left, rgba(var(--accent-primary-rgb), 0.18), transparent 52%),
        linear-gradient(180deg, rgba(var(--accent-primary-rgb), 0.08), rgba(var(--accent-primary-rgb), 0.03));
      border: 1px solid rgba(var(--accent-primary-rgb), 0.12);
    }

    .learn-home__hero-copy {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .learn-home__eyebrow {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent-primary);
    }

    .learn-home__title {
      margin: 0;
      font-size: clamp(1.4rem, 2vw, 2rem);
      color: var(--text-primary);
    }

    .learn-home__subtitle {
      margin: 0;
      color: var(--text-secondary);
      max-width: 32rem;
    }

    .learn-home__hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
    }

    .learn-home__quick-grid,
    .learn-home__history-list,
    .learn-home__playlist-grid {
      display: grid;
      gap: var(--space-md);
    }

    .learn-home__quick-grid,
    .learn-home__history-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .learn-home__playlist-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .quick-link-card,
    .history-resume-card,
    .featured-playlist-card {
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      background: var(--bg-card);
      color: inherit;
    }

    .quick-link-card {
      display: flex;
      align-items: start;
      gap: var(--space-sm);
      padding: var(--space-md);
      text-align: left;
    }

    .quick-link-card div {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .quick-link-card strong {
      color: var(--text-primary);
    }

    .quick-link-card span {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .learn-home__section {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .learn-home__section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-sm);
    }

    .learn-home__section-header h3 {
      margin: 0;
      font-size: 1rem;
      color: var(--text-primary);
    }

    .learn-home__link-btn {
      border: none;
      background: none;
      color: var(--accent-primary);
      font-weight: 600;
      cursor: pointer;
    }

    .history-resume-card {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm);
      text-align: left;
    }

    .history-resume-card img {
      width: 4.5rem;
      height: 3.25rem;
      border-radius: var(--border-radius);
      object-fit: cover;
      flex-shrink: 0;
    }

    .history-resume-card__copy {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      flex: 1;
    }

    .history-resume-card__copy strong,
    .featured-playlist-card__body strong {
      font-size: 0.875rem;
      color: var(--text-primary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .history-resume-card__copy span,
    .featured-playlist-card__body span {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .featured-playlist-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      text-align: left;
    }

    .featured-playlist-card__thumb {
      aspect-ratio: 16 / 9;
      background: var(--bg-secondary);
      overflow: hidden;
    }

    .featured-playlist-card__thumb img,
    .featured-playlist-card__placeholder {
      width: 100%;
      height: 100%;
    }

    .featured-playlist-card__thumb img {
      object-fit: cover;
    }

    .featured-playlist-card__placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
    }

    .featured-playlist-card__body {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: var(--space-md);
    }

    .learn-home__empty {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
      padding: var(--space-md);
      border: 1px dashed var(--border-color);
      border-radius: var(--border-radius-lg);
      background: var(--bg-secondary);
    }

    .learn-home__empty p {
      margin: 0;
      color: var(--text-secondary);
    }

    .layout-main.has-video-bar {
       /* Padding when video bar is visible */
       padding-bottom: 72px;
    }

      /* ============================================
         MOBILE VIDEO BAR - REMOVED (Replaced by ExpandablePlaylistComponent)
         ============================================ */
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

      .learn-home {
        padding: var(--space-md);
      }

      .learn-home__hero,
      .learn-home__empty {
        flex-direction: column;
        align-items: start;
      }

      .learn-home__quick-grid,
      .learn-home__history-list,
      .learn-home__playlist-grid {
        grid-template-columns: 1fr;
      }
      
      .layout-main.has-video-bar {
         /* Padding when video bar is visible (ExpandablePlaylistComponent) */
         padding-bottom: 72px;
      }
    }

    @media (max-width: 480px) {
      .layout-main {
        gap: var(--space-md);
      }
    }


    /* Menu Sheet Styles */
    .menu-sheet {
        padding: var(--space-md);
    }

    .menu-sheet__title {
        font-size: var(--text-md);
        font-weight: 600;
        color: var(--text-primary);
        text-align: center;
        margin: 0 0 var(--space-md);
    }

    .menu-sheet__options {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .menu-option {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-md);
        background: transparent;
        border: none;
        border-radius: var(--border-radius);
        font-size: var(--text-base);
        color: var(--text-primary);
        cursor: pointer;
        transition: background var(--transition-fast);
    }

    @media (hover: hover) {
        .menu-option:hover:not(:disabled) {
            background: var(--bg-secondary);
        }
    }

    .menu-option app-icon {
        color: var(--text-secondary);
    }

    .menu-option:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .menu-option--danger {
        color: var(--error);
    }

    .menu-option--danger app-icon {
        color: var(--error);
    }

    .menu-divider {
        height: 1px;
        background: var(--border-color);
        margin: 4px 0;
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
  private vocab = inject(VocabularyService); // Injected for main page actions
  private dictionary = inject(DictionaryService); // Injected for main page actions
  private settings = inject(SettingsService);
  private historyService = inject(HistoryService);
  protected playlistService = inject(PlaylistService);
  i18n = inject(I18nService);

  showCommandPalette = signal(false);

  // Sidebar tab state (only used when playlist is active)
  sidebarTab = signal<'playlist' | 'vocab'>('playlist');

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

  showLearnHome = computed(() => !this.youtube.currentVideo() && !this.youtube.pendingVideoId());
  currentLearningLanguage = computed(() => this.getLanguageName(this.settings.settings().language));
  recentHistoryItems = computed(() => this.historyService.historyByLanguage().slice(0, 3));
  featuredPlaylists = computed(() => {
    const language = this.settings.settings().language;
    const community = this.playlistService.communityPlaylists();
    const featured = community.filter(playlist => playlist.language === language && playlist.isFeatured);
    const fallback = community.filter(playlist => playlist.language === language);
    const list = featured.length > 0 ? featured : fallback;
    return list.slice(0, 3);
  });

  selectedWord = signal<Token | null>(null);
  currentSentence = signal<string>('');
  isVideoFullscreen = signal(false);

  showAddToPlaylistDialog = signal(false);

  // Language Mismatch Alert
  readonly showLanguageMismatchDialog = signal(false);
  private mismatchDetectedLang = signal<string | null>(null);

  // Playlist Video Menu State
  videoMenuOpen = signal(false);
  menuVideoIndex = signal(-1);
  menuVideoId = signal('');

  // Vocab State
  vocabDeleteOpen = signal(false);
  vocabDeleteId = signal<string | null>(null);
  vocabMenuOpen = signal(false);

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
    if (this.playlistService.communityPlaylists().length === 0) {
      void this.playlistService.loadCommunityPlaylists();
    }

    // Watch for language changes and refetch captions when language changes
    effect(() => {
      const currentLang = this.settings.settings().language;
      const currentVideo = this.youtube.currentVideo();

      // Only refetch if:
      // 1. There's a current video
      // 2. Language has actually changed from what we last used
      // 3. We're not in the initial load (lastLang is set)
      if (currentVideo && this.lastLang && this.lastLang !== currentLang) {

        this.lastLang = currentLang;

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
      const isLoading = this.playlistService.isLoading();

      // console.log('[VideoPage] Effect check:', { 
      //   playlistVideo: playlistVideo?.videoId, 
      //   currentVideo: currentVideo?.id, 
      //   isLoading 
      // });

      if (playlistVideo && (!currentVideo || currentVideo.id !== playlistVideo.videoId) && !isLoading) {
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

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
        const videoId = params.get('id');
        const playlistId = params.get('playlist');
        const currentLang = this.settings.settings().language;

        // Load playlist if present and different
        if (playlistId && this.playlistService.currentPlaylist()?.id !== playlistId) {
          this.playlistService.loadPlaylist(playlistId)
            .then(playlist => {
              // Check if the requested video (or persistent URL param) is in this playlist
              const index = videoId ? playlist.videos.findIndex(v => v.videoId === videoId) : -1;

              if (index >= 0) {
                // Video is part of this playlist - sync the internal index
                this.playlistService.setCurrentIndex(index);

                // Safeguard: Ensure video is loaded if it matches the requested ID to prevent sync issues
                // This handles race conditions where the outer video load might have been skipped or lost
                if (videoId && this.youtube.currentVideo()?.id !== videoId && this.youtube.pendingVideoId() !== videoId) {
                  this.subtitles.clear();
                  this.transcript.reset();
                  this.loadVideoFromUrl(videoId);
                }
              } else if (playlist.videos.length > 0) {
                // Video not in playlist (or no ID provided) - Start playlist from beginning
                this.router.navigate([], {
                  relativeTo: this.route,
                  queryParams: { id: playlist.videos[0].videoId },
                  queryParamsHandling: 'merge',
                  replaceUrl: true
                });
              }
            })
            .catch(err => {
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
          if (savedVideoId && !playlistId) {
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


      this.transcript.generateWithAI(currentVideo.id, lang)
        .pipe(takeUntilDestroyed(this.destroyRef))
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

  navigateTo(route: string): void {
    void this.router.navigate([route]);
  }

  openExplore(): void {
    void this.router.navigate(['/explore']);
  }

  resumeHistory(videoId: string): void {
    void this.router.navigate(['/video'], { queryParams: { id: videoId } });
  }

  startPlaylist(playlist: Playlist): void {
    const firstVideoId = playlist.videoIds[0];
    if (!firstVideoId) {
      return;
    }

    void this.router.navigate(['/video'], {
      queryParams: {
        id: firstVideoId,
        playlist: playlist.id
      }
    });
  }

  // Playlist Menu Actions
  onOpenPlaylistMenu(event: { videoId: string, index: number, event: Event }): void {
    this.menuVideoId.set(event.videoId);
    this.menuVideoIndex.set(event.index);
    this.videoMenuOpen.set(true);
  }

  async moveVideoUp(): Promise<void> {
    const playlist = this.playlistService.currentPlaylist();
    const index = this.menuVideoIndex();
    if (!playlist || index <= 0) return;

    const videoIds = [...playlist.videoIds];
    [videoIds[index - 1], videoIds[index]] = [videoIds[index], videoIds[index - 1]];

    await this.playlistService.reorderVideos(playlist.id, videoIds);
    this.videoMenuOpen.set(false);
  }

  async moveVideoDown(): Promise<void> {
    const playlist = this.playlistService.currentPlaylist();
    const index = this.menuVideoIndex();
    if (!playlist || index >= playlist.videos.length - 1) return;

    const videoIds = [...playlist.videoIds];
    [videoIds[index], videoIds[index + 1]] = [videoIds[index + 1], videoIds[index]];

    await this.playlistService.reorderVideos(playlist.id, videoIds);
    this.videoMenuOpen.set(false);
  }

  async moveVideoToTop(): Promise<void> {
    const playlist = this.playlistService.currentPlaylist();
    const index = this.menuVideoIndex();
    if (!playlist || index <= 0) return;

    const videoIds = [...playlist.videoIds];
    const [movedItem] = videoIds.splice(index, 1);
    videoIds.unshift(movedItem);

    await this.playlistService.reorderVideos(playlist.id, videoIds);
    this.videoMenuOpen.set(false);
  }

  async moveVideoToBottom(): Promise<void> {
    const playlist = this.playlistService.currentPlaylist();
    const index = this.menuVideoIndex();
    if (!playlist || index >= playlist.videos.length - 1) return;

    const videoIds = [...playlist.videoIds];
    const [movedItem] = videoIds.splice(index, 1);
    videoIds.push(movedItem);

    await this.playlistService.reorderVideos(playlist.id, videoIds);
    this.videoMenuOpen.set(false);
  }

  async removeVideo(): Promise<void> {
    const playlist = this.playlistService.currentPlaylist();
    const videoId = this.menuVideoId();
    if (!playlist || !videoId) return;

    await this.playlistService.removeVideo(playlist.id, videoId);
    this.videoMenuOpen.set(false);
  }

  // Vocab Actions
  onVocabDeleteRequest(id: string): void {
    this.vocabDeleteId.set(id);
    this.vocabDeleteOpen.set(true);
  }

  confirmVocabDelete(): void {
    const id = this.vocabDeleteId();
    if (id) {
      this.vocab.deleteWord(id);
    }
    this.vocabDeleteOpen.set(false);
    this.vocabDeleteId.set(null);
  }

  exportVocabJSON(): void {
    const json = this.vocab.exportToJSON();
    this.downloadFile(json, 'voca-vocabulary.json', 'application/json');
  }

  exportVocabAnki(): void {
    const tsv = this.vocab.exportToAnki();
    this.downloadFile(tsv, 'voca-anki.tsv', 'text/tab-separated-values');
  }

  importVocabJSON(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        this.vocab.importFromJSON(content);
        // Toast handled via service or simple alert for now? relying on list to update
      } catch (err) {
        console.error('Import failed', err);
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  private downloadFile(content: string, filename: string, type: string): void {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private fetchCaptions(videoId: string): void {
    const lang = this.settings.settings().language;
    this.transcript.fetchTranscript(videoId, lang)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
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
    this.showLanguageMismatchDialog.set(false);
    this.mismatchDetectedLang.set(null);
  }

  onMismatchCancel() {
    // User explicitly chose to keep current language despite mismatch
    // Don't pester them again for this video/session
    this.skipNextMismatchDialog = true;
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

  onPlaylistVideoSelect(_videoId: string): void {
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



  toggleShuffle(): void {
    this.playlistService.toggleShuffle();
  }

  openCommandPalette(): void {
    if (isPlatformBrowser(this.platformId) && !this.showCommandPalette()) {
      // Push history state when opening
      history.pushState({ commandPalette: true }, '');
    }
    this.showCommandPalette.set(true);
  }

  onCommandPaletteSearch(videoId: string): void {
    if (this.playlistService.currentPlaylist()) {
      // If in a playlist, queue the video instead of navigating away
      this.playlistService.queueVideo(videoId);
      this.showCommandPalette.set(false);
    } else {
      // Standard navigation
      this.showCommandPalette.set(false);
      this.router.navigate(['/video'], { queryParams: { id: videoId } });
    }
  }

  onCommandPaletteClosed(): void {
    // Called when palette emits 'closed' (manual close)
    this.showCommandPalette.set(false);

    // Revert history state if we initiated it
    if (isPlatformBrowser(this.platformId)) {
      history.back();
    }
  }

  // Listen for back button/gesture
  @HostListener('window:popstate', ['$event'])
  onPopState(_event: PopStateEvent) {
    if (this.showCommandPalette()) {
      // Palette is open and user pressed back -> close it
      // Don't call history.back() here because popstate means we already went back!
      this.showCommandPalette.set(false);
    }
  }
}
