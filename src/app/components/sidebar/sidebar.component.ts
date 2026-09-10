import { Component, inject, signal, computed, ChangeDetectionStrategy, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { OptionPickerComponent, OptionItem } from '../../shared/components/option-picker/option-picker.component';
import { SettingsService, AuthService, I18nService, AppUpdateService } from '../../core/services';
import { YoutubeService, SubtitleService, TranscriptService, PlayerViewService } from '../../features/video';
import { VocabularyService } from '../../features/vocabulary';
import { PlaylistService } from '../../features/playlist/playlist.service';
import { StreakService } from '../../services/streak.service';
import { GamificationService } from '../../core/services/gamification.service';
import { SUPPORTED_LANGUAGES } from '../../models';
import { VideoRecommendationService } from '../../core/services/video-recommendation.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent, OptionPickerComponent],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    private router = inject(Router);
    playerView = inject(PlayerViewService);
    settings = inject(SettingsService);
    vocab = inject(VocabularyService);
    youtube = inject(YoutubeService);
    subtitles = inject(SubtitleService);
    auth = inject(AuthService);
    i18n = inject(I18nService);
    transcript = inject(TranscriptService);
    streak = inject(StreakService);
    playlistService = inject(PlaylistService);
    gamification = inject(GamificationService);
    appUpdate = inject(AppUpdateService);
    videoRecommendation = inject(VideoRecommendationService);

    private currentUrl = toSignal(
        this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map(e => e.urlAfterRedirects),
            startWith(this.router.url)
        )
    );

    brandTitle = computed(() => {
        const tier = this.auth.subscriptionTier();
        if (tier === 'premium') return 'Premium';
        if (tier === 'pro') return 'Pro';
        return this.i18n.t('app.title') || 'Voca';
    });

    hasActiveVideoSession = computed(() => !!this.youtube.currentVideo() && !(this.currentUrl()?.startsWith('/video') ?? false));

    onLearnClick(event: MouseEvent): void {
        const isOnVideoPage = this.router.url.startsWith('/video');
        const activeVideo = this.youtube.currentVideo();

        if (isOnVideoPage) {
            event.preventDefault();
            if (!activeVideo) {
                // Already on Home Feed: scroll to top and refresh feed!
                const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
                if (scrollY > 80) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    this.videoRecommendation.triggerHomeFeedRefresh();
                }
            } else {
                // Tapping Watch or Brand while watching: Toggle miniplayer without destroying playback!
                if (!this.playerView.isMiniplayer()) {
                    this.playerView.minimize();
                } else {
                    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
                    if (scrollY > 80) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        this.playerView.expand();
                    }
                }
            }
        } else if (activeVideo) {
            // Navigating back from another page while video is active: Resume current video
            event.preventDefault();
            this.playerView.expand();
            const playlistId = this.playlistService.currentPlaylist()?.id;
            void this.router.navigate(['/video'], {
                queryParams: {
                    id: activeVideo.id,
                    ...(playlistId ? { playlist: playlistId } : {})
                }
            });
        }
    }

    onNewVideoClick(): void {
        this.openCommandPalette.emit();
    }

    onStudyClick(_event: MouseEvent): void {
        if (this.router.url.startsWith('/study')) {
            this.vocab.requestStudyReset();
        }
    }

    isCollapsed = computed(() => this.settings.settings().sidebarCollapsed);
    openSettings = output<void>();
    openCommandPalette = output<void>();
    openStreak = output<void>();
    openAiCredits = output<void>();
    openAchievements = output<void>();
    openProUpgrade = output<void>();
    showLangPicker = signal(false);

    // Learning language options with display info
    readonly learningLanguages = SUPPORTED_LANGUAGES;

    // Computed for current learning language display
    currentLang = computed(() => {
        const code = this.settings.settings().language;
        return this.learningLanguages.find(l => l.code === code) || this.learningLanguages[0];
    });

    // Computed options for OptionPicker
    learningLangOptions = computed<OptionItem[]>(() =>
        this.learningLanguages.map(l => ({
            value: l.code,
            label: l.name,
            iconUrl: l.flag
        }))
    );

    toggleCollapse(): void {
        this.settings.setSidebarCollapsed(!this.isCollapsed());
    }

    setLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
        if (this.settings.settings().language === lang) return;
        this.subtitles.clear();
        this.transcript.reset();
        this.settings.setLanguage(lang);
        this.showLangPicker.set(false);
    }

    onLangSelected(value: string): void {
        this.setLanguage(value as 'ja' | 'zh' | 'ko' | 'en');
    }

    toggleTheme(): void {
        const effectiveTheme = this.settings.getEffectiveTheme();
        const next = effectiveTheme === 'dark' ? 'light' : 'dark';
        this.settings.setTheme(next);
    }
}
