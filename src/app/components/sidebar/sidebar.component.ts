import { Component, inject, signal, computed, linkedSignal, ChangeDetectionStrategy, output, HostListener } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { OptionPickerComponent } from '../../shared/components/option-picker/option-picker.component';
import { SettingsService, AuthService, I18nService, AppUpdateService, ToastService } from '../../core/services';
import { YoutubeService, TranscriptService, PlayerViewService } from '../../features/video';
import { VocabularyService } from '../../features/vocabulary';
import { PlaylistService } from '../../features/playlist/playlist.service';
import { StreakService } from '../../services/streak.service';
import { LearningLanguageService } from '../../services/learning-language.service';
import { GamificationService } from '../../core/services/gamification.service';
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
    auth = inject(AuthService);
    i18n = inject(I18nService);
    transcript = inject(TranscriptService);
    streak = inject(StreakService);
    playlistService = inject(PlaylistService);
    gamification = inject(GamificationService);
    appUpdate = inject(AppUpdateService);
    videoRecommendation = inject(VideoRecommendationService);
    learningLanguage = inject(LearningLanguageService);
    toast = inject(ToastService);

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

    readonly avatarImgFailed = linkedSignal({
        source: () => this.auth.user(),
        computation: () => false
    });

    userInitials = computed(() => {
        const name = this.auth.user()?.name || this.auth.user()?.email || '';
        if (!name) return 'U';
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    });

    hasActiveVideoSession = computed(() => !!this.youtube.currentVideo() && !(this.currentUrl()?.startsWith('/video') ?? false));

    onLearnClick(event: Event): void {
        const isOnVideoPage = this.router.url.startsWith('/video');
        const activeVideo = this.youtube.currentVideo();

        if (isOnVideoPage) {
            event?.preventDefault();
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
            event?.preventDefault();
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

    readonly currentLang = this.learningLanguage.currentLanguage;
    readonly learningLangOptions = this.learningLanguage.languageOptions;

    showStatsPopover = signal(false);

    toggleCollapse(): void {
        this.settings.setSidebarCollapsed(!this.isCollapsed());
    }

    setLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
        this.showLangPicker.set(false);
        this.learningLanguage.switchLanguage(lang);
    }

    onLangSelected(value: string): void {
        this.setLanguage(value as 'ja' | 'zh' | 'ko' | 'en');
    }

    onFooterUserClick(): void {
        if (this.isCollapsed()) {
            this.toggleStatsPopover();
        } else {
            this.openSettings.emit();
        }
    }

    toggleStatsPopover(event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.showStatsPopover.update(v => !v);
    }

    closeStatsPopover(): void {
        this.showStatsPopover.set(false);
    }

    onPopoverStreakClick(): void {
        this.closeStatsPopover();
        this.openStreak.emit();
    }

    onPopoverAchievementsClick(): void {
        this.closeStatsPopover();
        this.openAchievements.emit();
    }

    onPopoverAiCreditsClick(): void {
        this.closeStatsPopover();
        this.openAiCredits.emit();
    }

    onPopoverSettingsClick(): void {
        this.closeStatsPopover();
        this.openSettings.emit();
    }

    onPopoverUpgradeClick(): void {
        this.closeStatsPopover();
        this.openProUpgrade.emit();
    }

    onPopoverLoginClick(): void {
        this.closeStatsPopover();
        this.loginWithGoogle();
    }

    onPopoverSignOutClick(): void {
        this.closeStatsPopover();
        void this.auth.signOut();
    }

    @HostListener('document:keydown.escape')
    onEscape(): void {
        if (this.showStatsPopover()) {
            this.closeStatsPopover();
        }
    }

    loginWithGoogle(): void {
        this.auth.loginWithGoogle().then(profile => {
            if (profile) {
                this.toast.show(this.i18n.t('auth.signedInAs', { name: profile.name }) || `Signed in as ${profile.name}`, { type: 'success', icon: 'check-circle' });
            }
        }).catch(() => {
            this.toast.show(this.i18n.t('auth.signInFailed') || 'Sign in failed. Please try again.', { type: 'error', icon: 'alert-circle' });
        });
    }

    toggleTheme(): void {
        const effectiveTheme = this.settings.getEffectiveTheme();
        const next = effectiveTheme === 'dark' ? 'light' : 'dark';
        this.settings.setTheme(next);
    }
}
