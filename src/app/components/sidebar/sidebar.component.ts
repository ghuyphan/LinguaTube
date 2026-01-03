import { Component, inject, signal, computed, ChangeDetectionStrategy, output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { OptionPickerComponent, OptionItem } from '../../shared/components/option-picker/option-picker.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService, AuthService, I18nService, TranscriptService } from '../../services';
import { StreakService } from '../../services/streak.service';

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

    isCollapsed = computed(() => this.settings.settings().sidebarCollapsed);
    openSettings = output<void>();
    showLangPicker = signal(false);

    // Learning language options with display info
    readonly learningLanguages = [
        { code: 'ja' as const, name: '日本語', flag: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
        { code: 'zh' as const, name: '中文', flag: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
        { code: 'ko' as const, name: '한국어', flag: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
        { code: 'en' as const, name: 'English', flag: 'https://hatscripts.github.io/circle-flags/flags/gb.svg' }
    ];

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

    @ViewChild('googleBtnCollapsed') googleBtnCollapsed!: ElementRef;
    @ViewChild('googleBtnExpanded') googleBtnExpanded!: ElementRef;

    isLoggingIn = false;

    /**
     * Login with Google via PocketBase OAuth
     */
    async loginWithGoogle(): Promise<void> {
        if (this.isLoggingIn) return;
        this.isLoggingIn = true;
        try {
            await this.auth.loginWithGoogle();
        } catch (error) {
            console.error('[Sidebar] Google login failed:', error);
        } finally {
            this.isLoggingIn = false;
        }
    }
}
