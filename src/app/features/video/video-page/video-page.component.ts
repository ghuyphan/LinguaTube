import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect, computed, untracked, PLATFORM_ID, DestroyRef, viewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { SubtitleDisplayComponent } from '../subtitle-display/subtitle-display.component';
import { VocabularyListComponent } from '../../vocabulary/vocabulary-list/vocabulary-list.component';
import { PlaylistPanelComponent } from '../../playlist/playlist-panel/playlist-panel.component';
import { WordPopupComponent } from '../../dictionary/word-popup/word-popup.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { TurnstileComponent } from '../../../shared/components/turnstile/turnstile.component';
import { OptionPickerComponent, OptionItem } from '../../../shared/components/option-picker/option-picker.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { YoutubeService } from '../youtube.service';
import { SubtitleService } from '../subtitle.service';
import { TranscriptService } from '../transcript.service';
import { VocabularyService } from '../../vocabulary';
import { SettingsService, I18nService, SeoService, ToastService, VideoRecommendationService } from '../../../core/services';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { HistoryService } from '../../history/history.service';
import { AddToPlaylistDialogComponent } from '../../playlist/add-to-playlist-dialog/add-to-playlist-dialog.component';
import { PlaylistService } from '../../playlist/playlist.service';
import { Playlist, PlaylistWithVideos, Token, SupportedLearningLanguage, SubtitleCue, ProficiencyLevelTier, RecommendedVideo, getLanguageFlagUrl } from '../../../models';
import { VideoLevelService } from '../../../core/services/video-level.service';
import { formatTime } from '../../../core/utils';

export type FeedItem =
  | { kind: 'video'; video: RecommendedVideo }
  | { kind: 'playlist'; playlist: Playlist };

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
    TurnstileComponent,
    OptionPickerComponent
  ],
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  protected youtube = inject(YoutubeService);
  private subtitles = inject(SubtitleService);
  protected transcript = inject(TranscriptService);
  private vocab = inject(VocabularyService); // Injected for main page actions
  private settings = inject(SettingsService);
  private historyService = inject(HistoryService);
  protected playlistService = inject(PlaylistService);
  private videoLevel = inject(VideoLevelService);
  protected videoRecommendation = inject(VideoRecommendationService);
  i18n = inject(I18nService);
  private seo = inject(SeoService);
  toast = inject(ToastService);

  showAiConfirmDialog = signal(false);
  aiCaptchaToken = signal<string | null>(null);
  isSubmittingAi = signal(false);

  // Home Dashboard tabs: single transcribed videos vs curated playlists
  homeTab = signal<'videos' | 'playlists'>('videos');
  recommendedVideos = this.videoRecommendation.recommendedVideos;
  isVideosLoading = this.videoRecommendation.isLoading;
  readonly isLoadingMore = this.videoRecommendation.isLoadingMore;
  readonly hasMoreVideos = this.videoRecommendation.hasMore;
  readonly scrollSentinel = viewChild<ElementRef<HTMLDivElement>>('scrollSentinel');
  private sentinelObserver: IntersectionObserver | null = null;
  formatVideoTime = formatTime;

  // Feed refresh state
  readonly isRefreshing = signal<boolean>(false);
  readonly isFeedRefreshing = computed(() =>
    this.isRefreshing() || (this.homeTab() === 'videos' ? (this.isVideosLoading() || this.playlistService.isRecommendedLoading()) : this.playlistService.isRecommendedLoading())
  );

  // Video level filter state for recommended videos
  videoLevelFilter = signal<string>('all');
  showLevelFilter = signal<boolean>(false);

  readonly levelFilterOptions = computed<OptionItem[]>(() => {
    const lang = this.settings.settings().language;
    let beginnerBadge = 'N5';
    let elemBadge = 'N4';
    let interBadge = 'N3';
    let upperBadge = 'N2';
    let advBadge = 'N1';

    if (lang === 'zh') {
      beginnerBadge = 'HSK 1';
      elemBadge = 'HSK 2';
      interBadge = 'HSK 3-4';
      upperBadge = 'HSK 5';
      advBadge = 'HSK 6';
    } else if (lang === 'ko') {
      beginnerBadge = 'TOPIK 1';
      elemBadge = 'TOPIK 2';
      interBadge = 'TOPIK 3-4';
      upperBadge = 'TOPIK 5';
      advBadge = 'TOPIK 6';
    } else if (lang === 'en') {
      beginnerBadge = 'A1';
      elemBadge = 'A2';
      interBadge = 'B1';
      upperBadge = 'B2';
      advBadge = 'C1-C2';
    }

    return [
      { value: 'all', label: this.i18n.t('level.allLevels') || 'All Levels', icon: 'sparkles' },
      { value: 'beginner', label: this.i18n.t('level.beginner') || 'Beginner', badge: beginnerBadge },
      { value: 'elementary', label: this.i18n.t('level.elementary') || 'Elementary', badge: elemBadge },
      { value: 'intermediate', label: this.i18n.t('level.intermediate') || 'Intermediate', badge: interBadge },
      { value: 'upper_intermediate', label: this.i18n.t('level.upper_intermediate') || this.i18n.t('level.upperIntermediate') || 'Upper Intermediate', badge: upperBadge },
      { value: 'advanced', label: this.i18n.t('level.advanced') || 'Advanced', badge: advBadge }
    ];
  });

  readonly filteredRecommendedVideos = computed(() => {
    const videos = this.recommendedVideos();
    const filter = this.videoLevelFilter();
    if (!filter || filter === 'all') return videos;
    return videos.filter(v => v.tier === filter);
  });

  getLevelFilterLabel(): string {
    const val = this.videoLevelFilter();
    const found = this.levelFilterOptions().find(o => o.value === val);
    return found ? found.label : (this.i18n.t('level.allLevels') || 'All Levels');
  }

  onLevelFilterChange(level: string): void {
    this.videoLevelFilter.set(level);
    this.showLevelFilter.set(false);
  }

  // Sidebar tab state (only used when playlist is active)
  sidebarTab = signal<'playlist' | 'vocab'>('playlist');

  // Immediately read URL param to prevent initial layout shift while playlist fetches
  readonly activePlaylistId = signal<string | null>(
    this.route.snapshot.queryParamMap.get('playlist')
  );

  readonly hasPlaylist = computed(() => {
    return !!this.playlistService.currentPlaylist() || !!this.activePlaylistId();
  });

  // On mobile, only display the in-flow playlist card if the playlist has multiple videos
  readonly hasMultiplePlaylistVideos = computed(() => {
    const playlist = this.playlistService.currentPlaylist();
    return !!playlist && playlist.videos.length > 1;
  });

  readonly showMobilePlaylistCard = computed(() => {
    // Temporarily show on mobile even when there's 1 video per user testing request
    return this.hasPlaylist();
  });

  // Playlist navigation helpers (disabled when playlist has only 1 video)
  canPlayPrev = computed(() => {
    const playlist = this.playlistService.currentPlaylist();
    if (!playlist || playlist.videos.length <= 1) return false;
    return this.playlistService.currentIndex() > 0 || this.playlistService.isLooping();
  });
  canPlayNext = computed(() => {
    const playlist = this.playlistService.currentPlaylist();
    if (!playlist || playlist.videos.length <= 1) return false;
    return this.playlistService.currentIndex() < playlist.videos.length - 1 || this.playlistService.isLooping();
  });

  showLearnHome = computed(() => !this.youtube.currentVideo() && !this.youtube.pendingVideoId());
  currentLearningLanguage = computed(() => this.getLanguageName(this.settings.settings().language));
  featuredPlaylists = this.playlistService.recommendedPlaylists;
  isFeaturedLoading = this.playlistService.isRecommendedLoading;
  currentLangVocabCount = computed(() => {
    const lang = this.settings.settings().language;
    return this.vocab.vocabulary().filter(w => w.language === lang).length;
  });

  getPlaylistLevel(playlist: Playlist): { level: string; tier: ProficiencyLevelTier } | null {
    return this.videoLevel.resolvePlaylistLevel(playlist);
  }

  readonly filteredFeaturedPlaylists = computed(() => {
    const playlists = this.featuredPlaylists();
    const filter = this.videoLevelFilter();
    if (!filter || filter === 'all') return playlists;
    return playlists.filter(p => {
      const lvl = this.getPlaylistLevel(p);
      return lvl?.tier === filter;
    });
  });

  /**
   * Unified feed items: Interleaves recommended playlists into the video feed (YouTube style),
   * or shows strictly playlists when the 'playlists' chip is selected.
   */
  readonly feedItems = computed<FeedItem[]>(() => {
    // During coordinated feed loading, do not output partial items to prevent layout shifts
    if (this.isFeedLoading()) {
      return [];
    }

    const tab = this.homeTab();
    const playlists = this.filteredFeaturedPlaylists();
    const videos = this.filteredRecommendedVideos();

    if (tab === 'playlists') {
      return playlists.map(playlist => ({ kind: 'playlist' as const, playlist }));
    }

    if (playlists.length === 0) {
      return videos.map(video => ({ kind: 'video' as const, video }));
    }

    if (videos.length === 0) {
      return playlists.map(playlist => ({ kind: 'playlist' as const, playlist }));
    }

    // YouTube-style interleaving:
    // Place 1 playlist card after every 4 videos (e.g. at index 3, 7, 11...)
    const items: FeedItem[] = [];
    let playlistIdx = 0;
    const interval = 4;

    videos.forEach((video, index) => {
      if (index > 0 && index % interval === 0 && playlistIdx < playlists.length) {
        items.push({ kind: 'playlist' as const, playlist: playlists[playlistIdx++] });
      }
      items.push({ kind: 'video' as const, video });
    });

    while (playlistIdx < playlists.length && items.length < 3) {
      items.push({ kind: 'playlist' as const, playlist: playlists[playlistIdx++] });
    }

    return items;
  });

  readonly isFeedLoading = computed(() => {
    if (this.homeTab() === 'playlists') {
      return this.isFeaturedLoading() && this.filteredFeaturedPlaylists().length === 0;
    }

    const videosLoading = this.isVideosLoading();
    const playlistsLoading = this.isFeaturedLoading();
    const hasVideos = this.filteredRecommendedVideos().length > 0;
    const hasPlaylists = this.filteredFeaturedPlaylists().length > 0;

    // If neither has finished loading or we don't have existing content:
    if (!hasVideos || (!hasPlaylists && playlistsLoading)) {
      return videosLoading || playlistsLoading;
    }

    return false;
  });

  readonly getFlagUrl = getLanguageFlagUrl;

  aiDiamondCost = computed(() => (this.youtube.duration() > 10 * 60 ? 2 : 1));
  isVideoTooLongForAI = computed(() => this.youtube.duration() > 20 * 60);

  selectedWord = signal<Token | null>(null);
  currentSentence = signal<string>('');
  isVideoFullscreen = signal(false);

  onSidebarWordSelect(token: Token): void {
    this.selectedWord.set(token);
    this.currentSentence.set(token.surface);
  }

  onPlayRecommendedVideo(video: RecommendedVideo): void {
    if (!video?.videoId) return;
    this.saveScrollPosition();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: video.videoId, v: null },
      queryParamsHandling: 'merge'
    });
    void this.loadVideoFromUrl(video.videoId);
  }

  showAddToPlaylistDialog = signal(false);

  // Language Mismatch Alert
  readonly showLanguageMismatchDialog = signal(false);
  private mismatchDetectedLang = signal<string | null>(null);

  // Playlist Video Menu State
  videoMenuOpen = signal(false);
  menuVideoIndex = signal(-1);
  menuVideoId = signal('');
  mobilePlaylistSheetOpen = signal(false);
  isShareCopied = signal(false);

  // Vocab State
  vocabDeleteOpen = signal(false);
  vocabDeleteId = signal<string | null>(null);
  vocabMenuOpen = signal(false);

  // ============================================
  // PULL-TO-REFRESH & SCROLL RETENTION (YouTube-style)
  // ============================================
  private savedFeedScrollY = 0;
  private previousShowLearnHome = true;

  readonly pullDistance = signal(0);
  readonly isPullActive = signal(false);
  private touchStartY = 0;
  private touchStartX = 0;

  readonly pullOpacity = computed(() => {
    if (this.isRefreshing()) return 1;
    const dist = this.pullDistance();
    if (dist <= 0) return 0;
    return Math.min(dist / 35, 1);
  });

  readonly pullIndicatorY = computed(() => {
    if (this.isRefreshing()) return 16;
    return Math.min(this.pullDistance() * 0.65, 52);
  });

  readonly pullRotation = computed(() => {
    return Math.min(this.pullDistance() * 3.5, 180);
  });

  saveScrollPosition(): void {
    if (isPlatformBrowser(this.platformId) && this.showLearnHome()) {
      this.savedFeedScrollY = window.scrollY;
    }
  }

  onFeedTouchStart(e: TouchEvent): void {
    if (!this.showLearnHome() || this.isRefreshing()) return;
    if (isPlatformBrowser(this.platformId) && window.scrollY <= 2) {
      const touch = e.touches[0];
      if (touch) {
        this.touchStartY = touch.clientY;
        this.touchStartX = touch.clientX;
      }
    }
  }

  onFeedTouchMove(e: TouchEvent): void {
    if (!this.showLearnHome() || this.isRefreshing() || !this.touchStartY) return;
    if (isPlatformBrowser(this.platformId) && window.scrollY <= 2) {
      const touch = e.touches[0];
      if (!touch) return;
      const deltaY = touch.clientY - this.touchStartY;
      const deltaX = touch.clientX - this.touchStartX;

      // Only track if moving downwards and predominantly vertical (not horizontal chip scrolling)
      if (deltaY > 8 && deltaY > Math.abs(deltaX) * 1.2) {
        this.isPullActive.set(true);
        // Apply smooth resistance damping
        const damped = (deltaY - 8) * 0.42;
        this.pullDistance.set(Math.min(damped, 80));
      } else if (deltaY <= 0) {
        this.pullDistance.set(0);
        this.isPullActive.set(false);
      }
    }
  }

  onFeedTouchEnd(): void {
    if (this.pullDistance() >= 48 && !this.isRefreshing()) {
      this.pullDistance.set(48);
      void this.refreshRecommendations().finally(() => {
        this.pullDistance.set(0);
        this.isPullActive.set(false);
      });
    } else {
      this.pullDistance.set(0);
      this.isPullActive.set(false);
    }
    this.touchStartY = 0;
    this.touchStartX = 0;
  }

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

  getLanguageName(lang: string | null | undefined): string {
    if (!lang) return '';
    const code = lang.toLowerCase().trim().split('-')[0].split('_')[0];
    switch (code) {
      case 'ja': return this.i18n.t('settings.japanese') || 'Japanese';
      case 'zh': return this.i18n.t('settings.chinese') || 'Chinese';
      case 'ko': return this.i18n.t('settings.korean') || 'Korean';
      case 'en': return this.i18n.t('settings.english') || 'English';
      case 'vi': return this.i18n.t('settings.vietnamese') || 'Vietnamese';
      default: return code.toUpperCase();
    }
  }

  /**
   * Returns normalized, deduplicated languages filtered strictly to supported learning languages (ja, zh, ko, en)
   * with the active learning language prioritized first.
   */
  getVideoLanguages(video: RecommendedVideo | null | undefined): string[] {
    if (!video?.languages || !Array.isArray(video.languages) || video.languages.length === 0) {
      return [];
    }
    const currentLang = (this.settings.settings().language || '').toLowerCase().trim();
    const supportedCodes = new Set(['ja', 'zh', 'ko', 'en']);
    const normalized = Array.from(new Set(
      video.languages
        .map(l => (typeof l === 'string' ? l.toLowerCase().trim().split('-')[0].split('_')[0] : ''))
        .filter(l => supportedCodes.has(l))
    ));
    if (normalized.length === 0) {
      return [];
    }
    if (normalized.length <= 1) return normalized;

    return normalized.sort((a, b) => {
      if (a === currentLang) return -1;
      if (b === currentLang) return 1;
      return 0;
    });
  }

  getLanguagesTooltip(langs: string[]): string {
    if (!langs || langs.length === 0) return '';
    return langs.map(l => this.getLanguageName(l)).join(', ');
  }

  formatLanguagesBadge(langs: string[]): string {
    if (!langs || langs.length === 0) return '';
    return langs.map(l => l.toUpperCase()).join(' / ');
  }

  readonly failedAvatars = signal<Set<string>>(new Set());

  getChannelInitial(name: string | null | undefined): string {
    if (!name) return '▶';
    const trimmed = name.trim();
    return trimmed ? trimmed.charAt(0).toUpperCase() : '▶';
  }

  onAvatarError(videoId: string): void {
    if (!videoId) return;
    this.failedAvatars.update(set => {
      const next = new Set(set);
      next.add(videoId);
      return next;
    });
  }

  hasAvatarFailed(videoId: string): boolean {
    return this.failedAvatars().has(videoId);
  }

  private lastLang = '';
  private wasPlayingBeforeWordLookup = false;
  private skipNextMismatchDialog = false;

  constructor() {
    // Reset SEO title when video changes or is cleared
    effect(() => {
      const video = this.youtube.currentVideo();
      if (video?.title) {
        this.seo.updateVideoSeo(video.title, video.id);
      } else if (!video) {
        this.seo.resetVideoSeo();
      }
    });

    // Scroll restoration when returning to home feed (YouTube-style)
    effect(() => {
      const isHome = this.showLearnHome();
      if (isHome && !this.previousShowLearnHome) {
        // Just returned from video to home feed!
        if (isPlatformBrowser(this.platformId) && this.savedFeedScrollY > 0) {
          const targetScroll = this.savedFeedScrollY;
          setTimeout(() => {
            window.scrollTo({ top: targetScroll, behavior: 'instant' });
          }, 10);
        }
      } else if (!isHome && this.previousShowLearnHome) {
        // Just opened video from feed
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
      this.previousShowLearnHome = isHome;
    });

    // Setup IntersectionObserver for Infinite Scroll Sentinel
    effect(() => {
      const sentinelRef = this.scrollSentinel();
      if (!isPlatformBrowser(this.platformId)) return;

      if (this.sentinelObserver) {
        this.sentinelObserver.disconnect();
        this.sentinelObserver = null;
      }

      if (sentinelRef?.nativeElement) {
        this.sentinelObserver = new IntersectionObserver((entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            this.onSentinelIntersect();
          }
        }, {
          rootMargin: '350px 0px',
          threshold: 0.05
        });
        this.sentinelObserver.observe(sentinelRef.nativeElement);
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.sentinelObserver) {
        this.sentinelObserver.disconnect();
        this.sentinelObserver = null;
      }
      this.seo.resetVideoSeo();
      this.transcript.reset();
      this.subtitles.clear();
      this.videoLevel.reset();
    });

    // Automatically fetch server-side recommended playlists and videos when active language or difficulty tier changes
    let previousRecommendLang = '';
    effect(() => {
      const currentLang = this.settings.settings().language;
      if (previousRecommendLang && previousRecommendLang !== currentLang) {
        untracked(() => {
          this.videoLevelFilter.set('all');
          this.savedFeedScrollY = 0;
        });
      }
      previousRecommendLang = currentLang;

      const currentTier = this.videoLevelFilter();
      const tierParam = currentTier === 'all' ? undefined : currentTier;

      // Only load recommendations if the user is on the home dashboard (not actively watching a video)
      if (this.showLearnHome()) {
        void Promise.all([
          this.playlistService.loadRecommendedPlaylists(currentLang, tierParam),
          this.videoRecommendation.loadRecommendedVideos(currentLang, tierParam)
        ]);
      }
    });

    // Watch for language changes and handle video vs home feed appropriately
    effect(() => {
      const currentLang = this.settings.settings().language;
      const currentVideo = this.youtube.currentVideo();

      // Only act if:
      // 1. There's a current video
      // 2. Language has actually changed from what we last used
      // 3. We're not in the initial load (lastLang is set)
      if (currentVideo && this.lastLang && this.lastLang !== currentLang) {

        this.lastLang = currentLang;

        // Close any open mismatch dialog
        this.showLanguageMismatchDialog.set(false);
        this.mismatchDetectedLang.set(null);

        if (this.skipNextMismatchDialog) {
          // User explicitly confirmed switching to the video's authentic language
          this.skipNextMismatchDialog = false;
          this.subtitles.clear();
          this.transcript.reset();
          this.videoLevel.reset();
          this.fetchCaptions(currentVideo.id);
        } else {
          // User changed their target learning language in sidebar / settings while watching a video!
          // Clear current video and return to Home feed for the newly chosen learning language
          this.savedFeedScrollY = 0;
          this.videoLevel.reset();
          this.playlistService.clearCurrentPlaylist();
          this.youtube.reset();
          this.subtitles.clear();
          this.transcript.reset();
          void this.router.navigate(['/video'], { queryParams: {} });
        }
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

      if (this.activePlaylistId() && playlistVideo && (!currentVideo || currentVideo.id !== playlistVideo.videoId) && !isLoading) {
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

  // ==================== Feed Refresh ====================

  /**
   * Select feed tab and optional level filter directly from YouTube chips carousel
   */
  selectFeedTab(tab: 'videos' | 'playlists', level?: string): void {
    if (tab === 'videos') {
      if (this.homeTab() === 'videos' && level && this.videoLevelFilter() === level) {
        // Re-clicking active "All" chip triggers a feed refresh
        if (level === 'all') {
          void this.refreshRecommendations();
        }
        return;
      }
      this.homeTab.set('videos');
      if (level !== undefined) {
        this.videoLevelFilter.set(level);
      }
    } else {
      this.homeTab.set('playlists');
    }
  }

  /**
   * Sentinel intersection callback for infinite scrolling
   */
  onSentinelIntersect(): void {
    if (this.homeTab() !== 'videos') return;
    if (!this.hasMoreVideos() || this.isLoadingMore() || this.isVideosLoading()) return;

    const currentLang = this.settings.settings().language;
    const currentTier = this.videoLevelFilter();
    const tierParam = currentTier === 'all' ? undefined : currentTier;

    void this.videoRecommendation.loadMoreRecommendedVideos(currentLang, tierParam);
  }

  /**
   * Refresh recommended videos/playlists with candidate shuffling and cache eviction (YouTube-style)
   */
  async refreshRecommendations(): Promise<void> {
    if (this.isRefreshing()) return;
    this.isRefreshing.set(true);

    try {
      const currentLang = this.settings.settings().language;
      const currentTier = this.videoLevelFilter();
      const tierParam = currentTier === 'all' ? undefined : currentTier;

      // Minimum 400ms feedback duration ensures clear, tactile spinner rotation
      const delayPromise = new Promise(resolve => setTimeout(resolve, 400));
      if (isPlatformBrowser(this.platformId) && window.scrollY > 60) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      const fetchPromise = this.homeTab() === 'playlists'
        ? this.playlistService.loadRecommendedPlaylists(currentLang, tierParam, 12, true)
        : Promise.all([
            this.videoRecommendation.loadRecommendedVideos(currentLang, tierParam, 16, true),
            this.playlistService.loadRecommendedPlaylists(currentLang, tierParam, 6, true)
          ]);

      await Promise.all([fetchPromise, delayPromise]);
      this.toast.show(this.i18n.t('playlist.feedUpdated') || 'Recommendations updated', { type: 'success', icon: 'refresh-cw', duration: 2000 });
    } catch {
      this.toast.show(this.i18n.t('common.error'), { type: 'error', duration: 2500 });
    } finally {
      this.isRefreshing.set(false);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Listen for feed refresh requests (e.g. from bottom nav tab double-tap)
      this.videoRecommendation.refreshRequested$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (this.showLearnHome()) {
            void this.refreshRecommendations();
          }
        });

      this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
        const videoId = params.get('id') || params.get('v');
        const playlistId = params.get('playlist');
        this.activePlaylistId.set(playlistId);
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
                if (videoId && this.youtube.currentVideo()?.id !== videoId && this.youtube.pendingVideoId() !== videoId) {
                  this.subtitles.clear();
                  this.transcript.reset();
                  this.videoLevel.reset();
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
          // If no playlist param in URL, clear active playlist to avoid ghost states
          this.playlistService.clearCurrentPlaylist();
        }

        // Load Video Logic
        if (videoId) {
          const currentVideo = this.youtube.currentVideo();

          // If coming from playlist, we might already have the video set, check ID
          if (!currentVideo || currentVideo.id !== videoId) {
            this.subtitles.clear();
            this.transcript.reset();
            this.videoLevel.reset();
            this.lastLang = currentLang;
            this.loadVideoFromUrl(videoId);
          } else {
            // Check if we need to refetch (no subtitles loaded)
            if (this.subtitles.subtitles().length === 0) {
              this.subtitles.clear();
              this.transcript.reset();
              this.videoLevel.reset();
              this.lastLang = currentLang;
              this.fetchCaptions(videoId);
            } else {
              this.lastLang = currentLang;
            }

            // Ensure video plays and updates history timestamp when re-visited
            this.youtube.play();
            void this.historyService.touchVideo(videoId);
          }
        } else {
          // No video ID in URL - clear current video and playlist so Learn Hub / Home is displayed cleanly
          this.playlistService.clearCurrentPlaylist();
          this.activePlaylistId.set(null);
          if (this.youtube.currentVideo() || this.youtube.pendingVideoId()) {
            this.youtube.reset();
          }
          this.subtitles.clear();
          this.transcript.reset();
          this.videoLevel.reset();
        }
      });
    }
  }

  private async loadVideoFromUrl(videoId: string): Promise<void> {
    this.saveScrollPosition();
    try {
      this.videoLevel.reset();
      const lang = this.settings.settings().language;
      const cached = this.videoLevel.getCachedLevel(videoId, lang);
      if (cached) {
        this.videoLevel.currentLevel.set(cached);
      }
      this.youtube.pendingVideoId.set(videoId);
      await this.waitForElement('youtube-player');
      await this.youtube.initPlayer('youtube-player', videoId);

      // Resume from saved progress or 't' query param if available
      const urlTime = this.route.snapshot.queryParamMap.get('t');
      if (urlTime) {
        const parsedTime = parseInt(urlTime, 10);
        if (!isNaN(parsedTime) && parsedTime > 0) {
          this.youtube.seekTo(parsedTime);
        }
      } else {
        const historyItem = this.historyService.getByVideoId(videoId);
        if (historyItem && historyItem.progress > 0 && historyItem.progress < 95 && historyItem.duration) {
          const resumeSeconds = Math.floor((historyItem.duration * historyItem.progress) / 100);
          if (resumeSeconds > 3) {
            this.youtube.seekTo(resumeSeconds);
          }
        }
      }

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
   * Manual AI generation trigger - opens human verification dialog
   */
  onManualAITrigger(): void {
    const currentVideo = this.youtube.currentVideo();
    if (!currentVideo) return;

    this.aiCaptchaToken.set(null);
    this.isSubmittingAi.set(false);
    this.showAiConfirmDialog.set(true);
  }

  onLanguageSwitchFromSubtitle(lang: string): void {
    const validLangs: SupportedLearningLanguage[] = ['ja', 'zh', 'ko', 'en'];
    if (validLangs.includes(lang as SupportedLearningLanguage)) {
      this.skipNextMismatchDialog = true;
      this.settings.setLanguage(lang as SupportedLearningLanguage);
    }
  }

  onRetryCaptions(): void {
    const currentVideo = this.youtube.currentVideo();
    if (currentVideo) {
      this.subtitles.clear();
      this.transcript.clearCache(currentVideo.id);
      this.transcript.reset();
      this.videoLevel.reset();
      this.fetchCaptions(currentVideo.id, true);
    }
  }

  onCaptchaResolved(token: string): void {
    this.aiCaptchaToken.set(token);
  }

  onCloseAiConfirmDialog(): void {
    this.showAiConfirmDialog.set(false);
    this.aiCaptchaToken.set(null);
    this.isSubmittingAi.set(false);
  }

  confirmGenerateAI(): void {
    const currentVideo = this.youtube.currentVideo();
    const lang = this.settings.settings().language;
    const token = this.aiCaptchaToken();

    if (!currentVideo || !token || this.isSubmittingAi() || this.isVideoTooLongForAI() || this.transcript.diamonds() < this.aiDiamondCost()) return;

    this.isSubmittingAi.set(true);
    this.showAiConfirmDialog.set(false);

    const duration = Math.round(this.youtube.duration()) || undefined;

    this.transcript.generateWithAI(currentVideo.id, lang, undefined, token, duration, currentVideo.title, currentVideo.channel)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cues) => {
          this.isSubmittingAi.set(false);
          if (cues.length > 0) {
            this.handleCaptionsSuccess(cues, lang);
          }
        },
        error: (err) => {
          this.isSubmittingAi.set(false);
          console.error('[VideoPage] Manual AI error:', err);
        }
    });
  }

  navigateTo(route: string): void {
    void this.router.navigate([route]);
  }

  openExplore(): void {
    void this.router.navigate(['/explore']);
  }

  startPlaylist(playlist: Playlist): void {
    const firstVideoId = playlist.videoIds[0];
    if (!firstVideoId) {
      return;
    }
    this.saveScrollPosition();

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
    this.vocab.exportAsFile('json');
  }

  exportVocabAnki(): void {
    this.vocab.exportAsFile('anki');
  }

  importVocabJSON(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    void this.vocab.importFromFile(file).catch(err => {
      console.error('Import failed', err);
    });
    input.value = '';
  }

  private fetchCaptions(videoId: string, forceRefresh = false): void {
    const lang = this.settings.settings().language;
    const duration = Math.round(this.youtube.duration()) || undefined;
    const currentVid = this.youtube.currentVideo();
    this.transcript.fetchTranscript(videoId, lang, duration, currentVid?.title, currentVid?.channel, forceRefresh)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cues) => {
          if (cues.length > 0) {
            this.handleCaptionsSuccess(cues, lang);
          } else {
            this.checkLanguageMismatch();
          }
        },
        error: (err) => {
          console.log('Auto-caption fetch failed:', err);
          this.checkLanguageMismatch();
        }
      });
  }

  private checkLanguageMismatch(): void {
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

  private handleCaptionsSuccess(cues: SubtitleCue[], requestedLang: string) {
    // Reset index first to prevent showing old cue during transition
    this.subtitles.currentCueIndex.set(-1);
    this.subtitles.subtitles.set(cues);

    // Detect actual language returned by backend
    const detectedFull = this.transcript.detectedLanguage();
    const detected = detectedFull?.split('-')[0]?.toLowerCase(); // Handle en-US, ja-JP
    const validLangs = ['ja', 'zh', 'ko', 'en'];

    // Enrich history with verified server subtitle languages (sub_languages)
    const currentVideo = this.youtube.currentVideo();
    if (currentVideo) {
      const resolvedLang = (detected && validLangs.includes(detected)) ? detected : (requestedLang || 'en');
      const verifiedSubs = this.transcript.subLanguages();
      const langsToSave = verifiedSubs.length > 0 ? verifiedSubs : [resolvedLang];
      void this.historyService.updateLanguages(currentVideo.id, langsToSave);
    }

    // Use detected language for tokenization (silently - no popup)
    let tokenPromise: Promise<void>;
    if (detected && validLangs.includes(detected)) {
      const targetLang = detected as 'ja' | 'zh' | 'ko' | 'en';
      this.subtitles.setLanguageState(targetLang, requestedLang as 'ja' | 'zh' | 'ko' | 'en');
      tokenPromise = this.subtitles.tokenizeAllCues(targetLang);

      // Check for mismatch: requested language differs from detected
      // Only show dialog if this is NOT from a user-initiated language switch
      const reqNorm = requestedLang?.split('-')[0]?.toLowerCase();
      if (reqNorm && reqNorm !== targetLang && !this.skipNextMismatchDialog) {
        this.mismatchDetectedLang.set(targetLang);
        this.showLanguageMismatchDialog.set(true);
      }

      // Reset the skip flag after processing
      this.skipNextMismatchDialog = false;
    } else {
      const lang = requestedLang as 'ja' | 'zh' | 'ko' | 'en';
      this.subtitles.setLanguageState(lang, lang);
      tokenPromise = this.subtitles.tokenizeAllCues(lang);
      this.skipNextMismatchDialog = false;
    }

    // Evaluate difficulty level for video
    const activeLang = (detected && validLangs.includes(detected))
      ? (detected as 'ja' | 'zh' | 'ko' | 'en')
      : (requestedLang as 'ja' | 'zh' | 'ko' | 'en');

    const serverLevels = this.transcript.serverLevels();

    const runAssessment = () => {
      if (currentVideo && !this.videoLevel.currentLevel()) {
        const currentCues = this.subtitles.subtitles();
        const evalCues = (currentCues && currentCues.length > 0) ? currentCues : cues;
        void this.videoLevel.assessLevel(
          currentVideo.id,
          activeLang,
          currentVideo.title,
          currentVideo.channel,
          evalCues,
          serverLevels
        ).then(levelInfo => {
          if (levelInfo) {
            void this.historyService.updateLevel(currentVideo.id, levelInfo.level);
          }
        });
      }
    };

    // Fast-path: assess immediately from D1 server levels, title heuristics, or cache in 0ms!
    if (currentVideo) {
      void this.videoLevel.assessLevel(
        currentVideo.id,
        activeLang,
        currentVideo.title,
        currentVideo.channel,
        [], // Fast-path: checks serverLevels, title/channel, and cache with zero waiting
        serverLevels
      ).then(initialInfo => {
        if (initialInfo) {
          void this.historyService.updateLevel(currentVideo.id, initialInfo.level);
        } else {
          // If metadata and server level were missing, run linguistic evaluation after tokenization completes
          tokenPromise.then(runAssessment).catch(runAssessment);
        }
      });
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
    this.activePlaylistId.set(null);
    this.sidebarTab.set('vocab');
    this.playlistService.clearCurrentPlaylist();
    // Remove query param
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { playlist: null },
      queryParamsHandling: 'merge'
    });
  }

  onPlaylistVideoSelect(_videoId: string): void {
    // Automatically close the mobile bottom sheet when a video is chosen
    this.mobilePlaylistSheetOpen.set(false);
  }

  toggleMobilePlaylist(): void {
    this.mobilePlaylistSheetOpen.update(v => !v);
  }

  openMobilePlaylistSheet(): void {
    this.mobilePlaylistSheetOpen.set(true);
  }

  closeMobilePlaylistSheet(): void {
    this.mobilePlaylistSheetOpen.set(false);
  }

  async onShareMobile(playlist: PlaylistWithVideos): Promise<void> {
    const currentVideo = this.youtube.currentVideo();
    const videoId = currentVideo?.id;
    const shareUrl = this.playlistService.getShareUrl(playlist.id, videoId);
    const shareData = {
      title: playlist.title,
      text: `Listen to ${playlist.title} on Voca`,
      url: shareUrl
    };

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or dismissed share sheet
      }
    }

    const success = await this.playlistService.copyShareLink(playlist.id, videoId);
    if (success) {
      this.isShareCopied.set(true);
      this.toast.success(this.i18n.t('playlist.linkCopied') || 'Link copied!');
      setTimeout(() => this.isShareCopied.set(false), 2000);
    }
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
}
