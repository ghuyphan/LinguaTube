import { Component, ChangeDetectionStrategy, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SettingsService, I18nService } from '../../core/services';
import { SupportedLearningLanguage } from '../../models';

@Component({
    selector: 'app-onboarding',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
    private settings = inject(SettingsService);
    public i18n = inject(I18nService);

    /** Emitted when onboarding is finished or skipped */
    dismissed = output<void>();

    /** Target learning language - defaults to current settings or 'ja' */
    selectedLang = signal<SupportedLearningLanguage>(
        this.settings.settings().language || 'ja'
    );

    readonly learningLanguages = [
        { code: 'ja' as const, name: 'Japanese', nativeName: '日本語', flag: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
        { code: 'zh' as const, name: 'Chinese', nativeName: '中文', flag: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
        { code: 'ko' as const, name: 'Korean', nativeName: '한국어', flag: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
        { code: 'en' as const, name: 'English', nativeName: 'English', flag: 'https://hatscripts.github.io/circle-flags/flags/gb.svg' }
    ];

    selectLanguage(code: 'ja' | 'zh' | 'ko' | 'en'): void {
        this.selectedLang.set(code);
    }

    startLearning(): void {
        const lang = this.selectedLang();
        this.settings.setLanguage(lang);
        this.settings.completeOnboarding();
        this.dismissed.emit();
    }

    skip(): void {
        const lang = this.selectedLang();
        if (lang) {
            this.settings.setLanguage(lang);
        }
        this.settings.completeOnboarding();
        this.dismissed.emit();
    }
}
