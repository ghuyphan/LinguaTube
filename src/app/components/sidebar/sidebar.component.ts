import { Component, inject, signal, computed, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { OptionPickerComponent, OptionItem } from '../../shared/components/option-picker/option-picker.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService, AuthService, I18nService, TranscriptService } from '../../services';
import { PlaylistService } from '../../features/playlist/playlist.service';
import { StreakService } from '../../services/streak.service';
import { SUPPORTED_LANGUAGES } from '../../models';

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
    settings = inject(SettingsService);
    vocab = inject(VocabularyService);
    youtube = inject(YoutubeService);
    subtitles = inject(SubtitleService);
    auth = inject(AuthService);
    i18n = inject(I18nService);
    transcript = inject(TranscriptService);
    streak = inject(StreakService);
    playlistService = inject(PlaylistService);

    hasActiveVideoSession = computed(() => !!this.youtube.currentVideo() && !this.router.url.startsWith('/video'));

    onLearnClick(event: MouseEvent): void {
        const isOnVideoPage = this.router.url.startsWith('/video');
        const activeVideo = this.youtube.currentVideo();

        if (isOnVideoPage) {
            // Already on video page: Clicking Watch again clears current video to return to search/spotlight
            event.preventDefault();
            this.playlistService.clearCurrentPlaylist();
            this.youtube.reset();
            this.subtitles.clear();
            this.transcript.reset();
            void this.router.navigate(['/video'], { queryParams: {} });
        } else if (activeVideo) {
            // Navigating back from another page while video is active: Resume current video
            event.preventDefault();
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
        if (this.router.url === '/video' && !this.youtube.currentVideo() && !this.youtube.pendingVideoId()) {
            const inputEl = document.querySelector('.spotlight-input') as HTMLInputElement | null;
            if (inputEl) {
                inputEl.focus();
                return;
            }
        }
        this.openCommandPalette.emit();
    }

    isCollapsed = computed(() => this.settings.settings().sidebarCollapsed);
    openSettings = output<void>();
    openCommandPalette = output<void>();
    openStreak = output<void>();
    openAiCredits = output<void>();
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
