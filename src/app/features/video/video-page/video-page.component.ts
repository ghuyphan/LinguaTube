import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect, computed, untracked, PLATFORM_ID, DestroyRef, viewChild, ElementRef, NgZone } from '@angular/core';
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
import { PlayerViewService } from '../services/player-view.service';
import { VocabularyService } from '../../vocabulary';
import { SettingsService, I18nService, SeoService, ToastService, VideoRecommendationService, AiJobManagerService } from '../../../core/services';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { HistoryService } from '../../history/history.service';
import { AddToPlaylistDialogComponent } from '../../playlist/add-to-playlist-dialog/add-to-playlist-dialog.component';
import { PlaylistService } from '../../playlist/playlist.service';
import { Playlist, PlaylistWithVideos, Token, SupportedLearningLanguage, SubtitleCue, ProficiencyLevelTier, RecommendedVideo, getLanguageFlagUrl } from '../../../models';
import { VideoLevelService } from '../../../core/services/video-level.service';
import { LearningLanguageService } from '../../../services/learning-language.service';
import { formatTime } from '../../../core/utils';
import { normalizeLanguageCode } from '../../../shared/utils/language.utils';

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
    WordPopupComponent,
    ConfirmDialogComponent,
    BottomSheetComponent,
    TurnstileComponent,
    OptionPickerComponent,
    IconComponent,
    AddToPlaylistDialogComponent
  ],
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private ngZone = inject(NgZone);
  protected youtube = inject(YoutubeService);
  private subtitles = inject(SubtitleService);
  protected transcript = inject(TranscriptService);
  private vocab = inject(VocabularyService); // Injected for main page actions
  private settings = inject(SettingsService);
  private historyService = inject(HistoryService);
  protected playlistService = inject(PlaylistService);
  private videoLevel = inject(VideoLevelService);
  protected videoRecommendation = inject(VideoRecommendationService);
  protected playerView = inject(PlayerViewService);
  i18n = inject(I18nService);
  private seo = inject(SeoService);
  toast = inject(ToastService);
  private learningLanguage = inject(LearningLanguageService);
  protected aiJobManager = inject(AiJobManagerService);

  showAiConfirmDialog = signal(false);
  aiCaptchaToken = signal<string | null>(null);
  isSubmittingAi = signal(false);
  selectedAiLanguage = signal<SupportedLearningLanguage>('ja');
  readonly supportedAiLanguages = this.learningLanguage.supportedLanguages;

  getAiLanguageLabel(code: string): string {
    const lang = this.supportedAiLanguages.find(l => l.code === code);
    return lang ? lang.name : code.toUpperCase();
  }

  // Home Dashboard tabs: single transcribed videos vs curated playlists
  homeTab = signal<'videos' | 'playlists'>('videos');
  recommendedVideos = this.videoRecommendation.recommendedVideos;
  isVideosLoading = this.videoRecommendation.isLoading;
  readonly isVideosError = this.videoRecommendation.hasError;
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
  videoLevelFilter = signal<string>(
    (this.settings.settings().preferredLevel && this.settings.settings().preferredLevel !== 'all')
      ? this.settings.settings().preferredLevel!
      : 'all'
  );
  showLevelFilter = signal<boolean>(false);
  readonly isLevelSwitching = signal<boolean>(false);

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
      { value: 'all', label: this.i18n.t('level.allLevels') || 'All Levels', icon: 'chart-bar' },
      { value: 'beginner', label: this.i18n.t('level.beginner') || 'Beginner', badge: beginnerBadge },
      { value: 'elementary', label: this.i18n.t('level.elementary') || 'Elementary', badge: elemBadge },
      { value: 'intermediate', label: this.i18n.t('level.intermediate') || 'Intermediate', badge: interBadge },
      { value: 'upper_intermediate', label: this.i18n.t('level.upper_intermediate') || this.i18n.t('level.upperIntermediate') || 'Upper Intermediate', badge: upperBadge },
      { value: 'advanced', label: this.i18n.t('level.advanced') || 'Advanced', badge: advBadge }
    ];
  });

  readonly videoPlayer = viewChild<VideoPlayerComponent>('videoPlayer');
  readonly searchQuery = signal<string>('');

  onSearchQueryChange(query: string): void {
    const trimmed = query || '';
    this.searchQuery.set(trimmed);
    if (!trimmed && this.videoRecommendation.activeSearchQuery()) {
      // Bar was cleared while a server query was active -> restore home feed
      const lang = this.settings.settings().language;
      const tier = this.videoLevelFilter();
      void this.videoRecommendation.clearSearch(lang, tier);
    }
  }

  async onSearchSubmit(query: string): Promise<void> {
    const trimmed = (query || '').trim();
    this.searchQuery.set(trimmed);
    if (!trimmed) {
      this.clearSearch();
      return;
    }
    const lang = this.settings.settings().language;
    const tier = this.videoLevelFilter();
    await this.videoRecommendation.loadRecommendedVideos(lang, tier, 16, true, trimmed);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.videoPlayer()?.clearUrl();
    const lang = this.settings.settings().language;
    const tier = this.videoLevelFilter();
    void this.videoRecommendation.clearSearch(lang, tier);
  }

  readonly filteredRecommendedVideos = computed(() => {
    let videos = this.recommendedVideos();
    const filter = this.videoLevelFilter();
    if (filter && filter !== 'all') {
      videos = videos.filter(v => v.tier === filter);
    }
    const q = this.searchQuery().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    if (!q) return videos;

    return videos.filter(v => {
      const title = v.title?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() || '';
      const channel = v.channel?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() || '';
      const level = v.level?.toLowerCase() || '';
      if (title.includes(q) || channel.includes(q) || level.includes(q)) return true;
      if (v.matchedWords?.some(w => w.toLowerCase().includes(q))) return true;
      return false;
    });
  });

  getLevelFilterLabel(): string {
    const val = this.videoLevelFilter();
    const found = this.levelFilterOptions().find(o => o.value === val);
    return found ? found.label : (this.i18n.t('level.allLevels') || 'All Levels');
  }

  onLevelFilterChange(level: string): void {
    if (level !== this.videoLevelFilter()) {
      const lang = this.settings.settings().language;
      if (!this.videoRecommendation.hasCache(lang, level)) {
        this.isLevelSwitching.set(true);
      }
      this.videoLevelFilter.set(level);
    }
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

  readonly showMobilePlaylistCard = computed(() => {
    // Temporarily show on mobile even when there's 1 video per user testing request
    return this.hasPlaylist();
  });

  showLearnHome = computed(() =>
    (!this.youtube.currentVideo() && !this.youtube.pendingVideoId()) || this.playerView.isMiniplayer()
  );
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
    let playlists = this.featuredPlaylists();
    const filter = this.videoLevelFilter();
    if (filter && filter !== 'all') {
      playlists = playlists.filter(p => {
        const lvl = this.getPlaylistLevel(p);
        return lvl?.tier === filter;
      });
    }
    const q = this.searchQuery().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    if (!q) return playlists;

    return playlists.filter(p => {
      const title = p.title?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() || '';
      const desc = p.description?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() || '';
      const author = p.userName?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() || '';
      return title.includes(q) || desc.includes(q) || author.includes(q);
    });
  });

  /**
   * Unified feed items: Interleaves recommended playlists into the video feed (YouTube style),
   * or shows strictly playlists when the 'playlists' chip is selected.
   */
  readonly feedItems = computed<FeedItem[]>(() => {
    // Return empty while feed is loading to render skeleton grid cleanly without layout shifts
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
    // Suppress full skeleton grid during pull-to-refresh to preserve inline pull spinner
    if (this.isRefreshing()) {
      return false;
    }

    if (this.homeTab() === 'playlists') {
      return this.isFeaturedLoading() && this.filteredFeaturedPlaylists().length === 0;
    }

    // Videos tab: show skeleton whenever fetching videos from server or switching uncached levels
    return this.isVideosLoading() || this.isLevelSwitching();
  });

  readonly getFlagUrl = getLanguageFlagUrl;

  aiDiamondCost = computed(() => (this.youtube.duration() > 10 * 60 ? 2 : 1));
  isVideoTooLongForAI = computed(() => this.youtube.duration() > 20 * 60);

  selectedWord = signal<Token | null>(null);
  currentSentence = signal<string>('');
  isVideoFullscreen = signal(false);

  onSidebarWordSelect(token: Token): void {
    this.youtube.acquirePauseLock('word-lookup');
    this.selectedWord.set(token);
    this.currentSentence.set(token.surface);
  }

  onPlayRecommendedVideo(video: RecommendedVideo): void {
    if (!video?.videoId) return;
    this.playerView.expand();
    this.saveScrollPosition();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: video.videoId, v: null },
      queryParamsHandling: 'merge'
    });
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

  // ============================================
  // PULL-TO-REFRESH & SCROLL RETENTION (YouTube-style)
  // ============================================
  private savedFeedScrollY = 0;
  private previousShowLearnHome = true;
  private isNavigatingToWatch = false;
  private isRestoringFeedScroll = false;

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
    if (isPlatformBrowser(this.platformId) && this.showLearnHome() && !this.isNavigatingToWatch && !this.isRestoringFeedScroll) {
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

  onChipsWheel(e: WheelEvent): void {
    if (e.deltaY && !e.deltaX) {
      const container = e.currentTarget as HTMLElement;
      if (container && container.scrollWidth > container.clientWidth) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }
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

  onThumbnailError(event: Event, videoId: string): void {
    const img = event.target as HTMLImageElement;
    if (!img || !videoId) return;
    const step = img.dataset['fallbackStep'];
    if (!step) {
      img.dataset['fallbackStep'] = '1';
      img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    } else if (step === '1') {
      img.dataset['fallbackStep'] = '2';
      img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }
  }

  hasAvatarFailed(videoId: string): boolean {
    return this.failedAvatars().has(videoId);
  }

  private lastLang = '';
  private skipNextMismatchDialog = false;
  private isSwitchingTrack = false;

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
        // Just returned from video to home feed / miniplayer!
        if (isPlatformBrowser(this.platformId) && this.savedFeedScrollY > 0) {
          const targetScroll = this.savedFeedScrollY;
          this.isRestoringFeedScroll = true;
          // Synchronously restore scroll position so the initial paint doesn't jump
          window.scrollTo({ top: targetScroll, behavior: 'instant' });
          requestAnimationFrame(() => {
            if (Math.abs(window.scrollY - targetScroll) > 5) {
              window.scrollTo({ top: targetScroll, behavior: 'instant' });
            }
            this.isRestoringFeedScroll = false;
          });
        }
      } else if (!isHome && this.previousShowLearnHome) {
        // Just opened video from feed (reset window scroll to 0 so video player is at the top)
        if (isPlatformBrowser(this.platformId)) {
          this.isNavigatingToWatch = true;
          window.scrollTo({ top: 0, behavior: 'instant' });
          requestAnimationFrame(() => {
            this.isNavigatingToWatch = false;
          });
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
          rootMargin: '600px 0px',
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
      this.resetSubtitleAndTranscriptState();
    });

    this.aiJobManager.jobCompleted$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ videoId, language, requestedLanguage, cues }) => {
      if (this.youtube.currentVideo()?.id === videoId) {
        const activeLang = (requestedLanguage || language) as SupportedLearningLanguage;
        if (['ja', 'zh', 'ko', 'en'].includes(activeLang)) {
          this.learningLanguage.switchLanguage(activeLang, { navigateHome: false });
        }
        this.handleCaptionsSuccess(cues, activeLang, language);
      }
    });

    // Automatically fetch server-side recommended playlists and videos when active language or difficulty tier changes
    let previousRecommendLang = '';
    let previousRecommendTier = '';
    effect(() => {
      const currentLang = this.settings.settings().language;
      const currentTier = this.videoLevelFilter();
      const tierParam = currentTier === 'all' ? undefined : currentTier;

      const langChanged = previousRecommendLang !== '' && previousRecommendLang !== currentLang;
      const tierChanged = previousRecommendTier !== '' && previousRecommendTier !== currentTier;
      const isInitial = previousRecommendLang === '';

      previousRecommendLang = currentLang;
      previousRecommendTier = currentTier;

      if (langChanged) {
        untracked(() => {
          const prefLevel = this.settings.settings().preferredLevel;
          this.videoLevelFilter.set(prefLevel && prefLevel !== 'all' ? prefLevel : 'all');
          this.savedFeedScrollY = 0;
        });
      }

      // Best Practice: Only fetch when language changes, tier filter changes, initial load,
      // or if on feed and videos have never been loaded yet (e.g. direct /video?id deep-link).
      // Minimizing, expanding, or closing the player NEVER triggers redundant network fetches!
      const hasVideos = untracked(() => this.videoRecommendation.recommendedVideos().length > 0);
      const isHome = untracked(() => this.showLearnHome());

      if (isInitial || langChanged || tierChanged || (isHome && !hasVideos)) {
        void Promise.all([
          this.playlistService.loadRecommendedPlaylists(currentLang, tierParam),
          this.videoRecommendation.loadRecommendedVideos(currentLang, tierParam)
        ]).finally(() => {
          this.isLevelSwitching.set(false);
        });
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

        if (this.isSwitchingTrack) {
          // If we are actively switching tracks, do NOT re-tokenize existing cues!
          // The in-flight fetchTranscript will deliver fresh cues for the new track.
          return;
        }

        if (this.skipNextMismatchDialog) {
          // User explicitly confirmed switching to the video's authentic language
          this.skipNextMismatchDialog = false;
          const existingCues = this.subtitles.subtitles();
          if (existingCues && existingCues.length > 0) {
            this.handleCaptionsSuccess(existingCues, currentLang);
          } else {
            this.resetSubtitleAndTranscriptState();
            this.fetchCaptions(currentVideo.id);
          }
        }
      }
    });

    // Effect to sync video changes from playlist
    effect(() => {
      const playlistVideo = this.playlistService.currentVideo();
      const currentVideo = this.youtube.currentVideo();
      const isLoading = this.playlistService.isLoading();

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
      if (level !== undefined && level !== this.videoLevelFilter()) {
        const lang = this.settings.settings().language;
        if (!this.videoRecommendation.hasCache(lang, level)) {
          this.isLevelSwitching.set(true);
        }
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
    } catch {
      this.toast.show(this.i18n.t('common.error'), { type: 'error', duration: 2500 });
    } finally {
      this.isRefreshing.set(false);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Passive scroll listener outside NgZone to avoid change detection on every pixel
      this.ngZone.runOutsideAngular(() => {
        const onScroll = () => {
          if (this.showLearnHome() && !this.isNavigatingToWatch && !this.isRestoringFeedScroll) {
            this.savedFeedScrollY = window.scrollY;
          }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        this.destroyRef.onDestroy(() => {
          window.removeEventListener('scroll', onScroll);
        });
      });

      // Listen for feed refresh requests (e.g. from bottom nav tab double-tap)
      this.videoRecommendation.refreshRequested$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (this.showLearnHome()) {
            void this.refreshRecommendations();
          }
        });

      this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
        const rawId = params.get('id') || params.get('v');
        const videoId = rawId && /^[a-zA-Z0-9_-]{11}$/.test(rawId) ? rawId : null;
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
                  this.resetSubtitleAndTranscriptState();
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
            this.resetSubtitleAndTranscriptState();
            this.lastLang = currentLang;
            this.loadVideoFromUrl(videoId);
          } else {
            // Check if we need to refetch (no subtitles loaded)
            if (this.subtitles.subtitles().length === 0) {
              this.resetSubtitleAndTranscriptState();
              this.lastLang = currentLang;
              this.fetchCaptions(videoId);
            } else {
              this.lastLang = currentLang;
            }

            // Ensure video plays and updates history timestamp when re-visited
            this.youtube.play();
            void this.historyService.touchVideo(videoId);
          }
        } else if (!this.playerView.isMiniplayer()) {
          // No video ID in URL and not in miniplayer mode - clear current video and playlist so Learn Hub / Home is displayed cleanly
          this.playlistService.clearCurrentPlaylist();
          this.activePlaylistId.set(null);
          if (this.youtube.currentVideo() || this.youtube.pendingVideoId()) {
            this.youtube.reset();
          }
          this.resetSubtitleAndTranscriptState();
        }
      });
    }
  }

  private resetSubtitleAndTranscriptState(): void {
    this.subtitles.clear();
    this.transcript.reset();
    this.videoLevel.reset();
  }

  private async loadVideoFromUrl(videoId: string): Promise<void> {
    this.playerView.expand();
    this.saveScrollPosition();
    this.selectedWord.set(null);
    this.currentSentence.set('');
    try {
      this.videoLevel.reset();
      const lang = this.settings.settings().language;
      const cached = this.videoLevel.getCachedLevel(videoId, lang);
      if (cached) {
        this.videoLevel.currentLevel.set(cached);
      }

      // Compute resume time from 't' query param or watch history before player init
      let resumeSeconds = 0;
      const urlTime = this.route.snapshot.queryParamMap.get('t');
      if (urlTime) {
        const parsedTime = parseInt(urlTime, 10);
        if (!isNaN(parsedTime) && parsedTime > 0) {
          resumeSeconds = parsedTime;
        }
      } else {
        const historyItem = this.historyService.getByVideoId(videoId);
        if (historyItem && historyItem.progress > 0 && historyItem.progress < 95 && historyItem.duration) {
          const calculated = Math.floor((historyItem.duration * historyItem.progress) / 100);
          if (calculated > 3) {
            resumeSeconds = calculated;
          }
        }
      }

      this.youtube.pendingVideoId.set(videoId);
      await this.waitForElement('youtube-player');
      await this.youtube.initPlayer('youtube-player', videoId, resumeSeconds);

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
  onManualAITrigger(lang?: string): void {
    const currentVideo = this.youtube.currentVideo();
    if (!currentVideo) return;

    const targetLang = lang ? normalizeLanguageCode(lang) : normalizeLanguageCode(this.settings.settings().language);
    const validLang: SupportedLearningLanguage = ['ja', 'zh', 'ko', 'en'].includes(targetLang)
      ? (targetLang as SupportedLearningLanguage)
      : (normalizeLanguageCode(this.settings.settings().language) as SupportedLearningLanguage) || 'ja';

    this.selectedAiLanguage.set(validLang);
    this.aiCaptchaToken.set(null);
    this.isSubmittingAi.set(false);
    this.showAiConfirmDialog.set(true);
  }

  onLanguageSwitchFromSubtitle(lang: string): void {
    const validLangs: SupportedLearningLanguage[] = ['ja', 'zh', 'ko', 'en'];
    if (validLangs.includes(lang as SupportedLearningLanguage)) {
      this.skipNextMismatchDialog = true;
      this.learningLanguage.switchLanguage(lang as SupportedLearningLanguage, { navigateHome: false });
    }
  }

  onRetryCaptions(): void {
    const currentVideo = this.youtube.currentVideo();
    if (!currentVideo) return;

    const currentError = this.transcript.error();

    // If the failure was an AI timeout, service error, or quota, cancel old job and re-open AI dialog to retry
    if (currentError === 'AI_TIMEOUT' || currentError === 'AI_SERVICE_ERROR' || currentError === 'AI_JOB_FAILED' || currentError === 'AI_FAILED' || currentError === 'AI_QUOTA_EXCEEDED' || currentError === 'NO_SPEECH_DETECTED') {
      this.aiJobManager.cancelJob(currentVideo.id);
      this.showAiConfirmDialog.set(true);
      return;
    }

    const hasActiveJob = this.aiJobManager.hasActiveJob(currentVideo.id);
    // If an active AI job is already tracking in background, trigger immediate check
    if (hasActiveJob) {
      this.aiJobManager.reconcileActiveJobs();
      return;
    }

    this.resetSubtitleAndTranscriptState();
    this.transcript.clearCache(currentVideo.id);
    this.fetchCaptions(currentVideo.id, true);
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
    const lang = this.selectedAiLanguage();
    const token = this.aiCaptchaToken();

    if (!currentVideo || !token || this.isSubmittingAi() || this.isVideoTooLongForAI() || this.transcript.diamonds() < this.aiDiamondCost()) return;

    // Immediately invalidate single-use Turnstile token to prevent replay
    this.aiCaptchaToken.set(null);

    this.isSubmittingAi.set(true);
    this.showAiConfirmDialog.set(false);
    this.skipNextMismatchDialog = true;

    // Clean up any existing stale/aborted job in aiJobManager for this video
    this.aiJobManager.cancelJob(currentVideo.id);

    const duration = Math.round(this.youtube.duration()) || undefined;

    this.transcript.generateWithAI(currentVideo.id, lang, undefined, token, duration, currentVideo.title, currentVideo.channel, true)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cues) => {
          this.isSubmittingAi.set(false);
          if (cues.length > 0) {
            this.learningLanguage.switchLanguage(lang, { navigateHome: false });
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
    this.playerView.expand();
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
      // If the user has diamonds available to transcribe in their chosen language,
      // let the subtitle panel display the prominent AI button without popping up an intrusive switch modal
      if (this.transcript.diamonds() > 0) {
        this.skipNextMismatchDialog = false;
        return;
      }

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

  private handleCaptionsSuccess(cues: SubtitleCue[], requestedLang: string, detectedLangOverride?: string) {
    // Reset index first to prevent showing old cue during transition
    this.subtitles.currentCueIndex.set(-1);
    this.subtitles.subtitles.set(cues);

    // Immediately synchronize the active cue with the current player playback time
    // (Crucial for resuming video at an existing timestamp where captions arrive after seek)
    this.subtitles.updateCurrentCue(this.youtube.currentTime());

    // Detect actual language returned by backend (or explicit override from async job)
    const detectedFull = detectedLangOverride || this.transcript.detectedLanguage();
    const detected = normalizeLanguageCode(detectedFull);
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
      const reqNorm = normalizeLanguageCode(requestedLang);
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
      const activeVideo = this.youtube.currentVideo();
      if (activeVideo && currentVideo && activeVideo.id === currentVideo.id) {
        const current = this.videoLevel.currentLevel();
        if (!current) {
          const currentCues = this.subtitles.subtitles();
          const evalCues = (currentCues && currentCues.length > 0) ? currentCues : cues;
          void this.videoLevel.assessLevel(
            activeVideo.id,
            activeLang,
            activeVideo.title,
            activeVideo.channel,
            evalCues,
            serverLevels
          ).then(levelInfo => {
            if (levelInfo) {
              void this.historyService.updateLevel(activeVideo.id, levelInfo.level);
            }
          });
        }
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
      const norm = normalizeLanguageCode(detected);
      if (['ja', 'zh', 'ko', 'en'].includes(norm)) {
        // Skip the dialog for the upcoming refetch triggered by language change
        this.skipNextMismatchDialog = true;
        this.learningLanguage.switchLanguage(norm as SupportedLearningLanguage, { navigateHome: false });
      }
    }
    this.showLanguageMismatchDialog.set(false);
    this.mismatchDetectedLang.set(null);
  }

  onMismatchCancel() {
    // User explicitly chose to keep target learning language despite mismatch
    this.skipNextMismatchDialog = true;
    this.showLanguageMismatchDialog.set(false);
    this.mismatchDetectedLang.set(null);

    // Clear mismatched subtitles from the player
    this.subtitles.subtitles.set([]);
    this.subtitles.currentCueIndex.set(-1);

    // Note: Do not automatically re-open the AI modal here.
    // The subtitle display cleanly offers the "Generate AI Subtitles" action in the empty state,
    // avoiding an inescapable modal loop.
  }

  onSelectTrack(trackStr: string): void {
    const currentVid = this.youtube.currentVideo();
    if (!currentVid || !trackStr) return;

    if (trackStr === '__subtitles_off__') {
      if (this.subtitles.subtitlesVisible()) {
        this.subtitles.toggleSubtitlesVisible();
      }
      return;
    }

    const isAI = trackStr.startsWith('ai:');
    const rawLang = isAI ? trackStr.slice(3) : trackStr;
    const norm = normalizeLanguageCode(rawLang);

    if (!['ja', 'zh', 'ko', 'en'].includes(norm)) {
      console.warn('[VideoPage] Unsupported track language selected:', rawLang);
      return;
    }

    const duration = Math.round(this.youtube.duration()) || undefined;
    this.isSwitchingTrack = true;
    this.skipNextMismatchDialog = true;

    // Switch active learning language without navigating home
    this.learningLanguage.switchLanguage(norm as SupportedLearningLanguage, { navigateHome: false });

    // Make sure subtitles are visible when a track is explicitly selected
    if (!this.subtitles.subtitlesVisible()) {
      this.subtitles.toggleSubtitlesVisible();
    }

    this.transcript.fetchTranscript(currentVid.id, norm, duration, currentVid.title, currentVid.channel, false)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cues) => {
          this.isSwitchingTrack = false;
          if (cues.length > 0) {
            this.handleCaptionsSuccess(cues, norm);
          }
        },
        error: (err) => {
          this.isSwitchingTrack = false;
          console.error('Failed to load selected track:', err);
        }
      });
  }

  onWordClicked(event: { token: Token; sentence: string }): void {
    // Acquire pause lock for word lookup so video stays paused across all screen sizes
    this.youtube.acquirePauseLock('word-lookup');
    this.selectedWord.set(event.token);
    this.currentSentence.set(event.sentence);
  }

  onWordPopupClosed(): void {
    this.selectedWord.set(null);
    // Release pause lock so video resumes smoothly if it was playing before
    this.youtube.releasePauseLock('word-lookup');
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
    this.playerView.expand();
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
