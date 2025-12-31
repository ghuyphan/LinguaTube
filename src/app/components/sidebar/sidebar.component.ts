import { Component, inject, signal, computed, ChangeDetectionStrategy, HostListener, output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService, AuthService, I18nService, TranscriptService, StreakService } from '../../services';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
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



    toggleCollapse(): void {
        this.settings.setSidebarCollapsed(!this.isCollapsed());
    }

    setLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
        if (this.settings.settings().language === lang) return;
        this.subtitles.clear();
        this.transcript.reset();
        this.settings.setLanguage(lang);
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
