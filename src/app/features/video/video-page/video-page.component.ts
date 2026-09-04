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
import { TurnstileComponent } from '../../../shared/components/turnstile/turnstile.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { YoutubeService, SubtitleService, SettingsService, TranscriptService, I18nService, VocabularyService } from '../../../services';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { HistoryService } from '../../history/history.service';
import { AddToPlaylistDialogComponent } from '../../playlist/add-to-playlist-dialog/add-to-playlist-dialog.component';
import { PlaylistService } from '../../playlist/playlist.service';
import { Playlist, PlaylistWithVideos, Token, SupportedLearningLanguage } from '../../../models';

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
    TurnstileComponent
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
  i18n = inject(I18nService);

  showAiConfirmDialog = signal(false);
  aiCaptchaToken = signal<string | null>(null);
  isSubmittingAi = signal(false);

  // Sidebar tab state (only used when playlist is active)
  sidebarTab = signal<'playlist' | 'vocab'>('playlist');

  // Immediately read URL param to prevent initial layout shift while playlist fetches
  readonly activePlaylistId = signal<string | null>(
    this.route.snapshot.queryParamMap.get('playlist')
  );

  readonly hasPlaylist = computed(() => {
    return !!this.playlistService.currentPlaylist() || !!this.activePlaylistId();
  });

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
  featuredPlaylists = computed(() => {
    const language = this.settings.settings().language;
    const community = this.playlistService.communityPlaylists();
    const featured = community.filter(playlist => playlist.language === language && playlist.isFeatured);
    const fallback = community.filter(playlist => playlist.language === language);
    const list = featured.length > 0 ? featured : fallback;
    return list.slice(0, 3);
  });
  isFeaturedLoading = computed(() =>
    (!this.playlistService.hasLoadedCommunity() || this.playlistService.isCommunityLoading()) &&
    this.featuredPlaylists().length === 0
  );
  currentLangVocabCount = computed(() => {
    const lang = this.settings.settings().language;
    return this.vocab.vocabulary().filter(w => w.language === lang).length;
  });

  selectedWord = signal<Token | null>(null);
  currentSentence = signal<string>('');
  isVideoFullscreen = signal(false);

  onSidebarWordSelect(token: Token): void {
    this.selectedWord.set(token);
    this.currentSentence.set(token.surface);
  }

  showAddToPlaylistDialog = signal(false);

  // Language Mismatch Alert
  readonly showLanguageMismatchDialog = signal(false);
  private mismatchDetectedLang = signal<string | null>(null);

  // Playlist Video Menu State
  videoMenuOpen = signal(false);
  menuVideoIndex = signal(-1);
  menuVideoId = signal('');
  mobilePlaylistExpanded = signal(false);
  isShareCopied = signal(false);

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

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
        const videoId = params.get('id');
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
        }
      });
    }
  }

  private async loadVideoFromUrl(videoId: string): Promise<void> {
    try {
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
      this.transcript.reset();
      this.fetchCaptions(currentVideo.id);
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

    if (!currentVideo || !token || this.isSubmittingAi()) return;

    this.isSubmittingAi.set(true);
    this.showAiConfirmDialog.set(false);

    this.transcript.generateWithAI(currentVideo.id, lang, undefined, token)
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

    // Enrich history with actual available languages
    const currentVideo = this.youtube.currentVideo();
    if (currentVideo) {
      const availableLangs = this.transcript.availableLanguages().native;
      void this.historyService.updateLanguages(currentVideo.id, availableLangs);
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
    // Navigation is handled by effect() reacting to service state change
    // so we don't need to do anything here other than what the panel component already did (update service)
  }

  toggleMobilePlaylist(): void {
    this.mobilePlaylistExpanded.update(v => !v);
  }

  async onShareMobile(playlist: PlaylistWithVideos): Promise<void> {
    const currentVideo = this.youtube.currentVideo();
    const videoId = currentVideo?.id;
    const shareUrl = this.playlistService.getShareUrl(playlist.id, videoId);
    const shareData = {
      title: playlist.title,
      text: `Listen to ${playlist.title} on LinguaTube`,
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
