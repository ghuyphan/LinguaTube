import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { SettingsService, UILanguage, I18nService } from '../../services';

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

    step = signal<0 | 1 | 2>(0); // 0: UI Lang, 1: Welcome, 2: Learning Lang
    selectedLang = signal<'ja' | 'zh' | 'ko' | 'en' | null>(null);
    selectedUILang = signal<UILanguage>('en'); // Default to English initially
    isExiting = signal(false);

    readonly learningLanguages = [
        { code: 'ja' as const, name: 'Japanese', nativeName: '日本語', flag: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
        { code: 'zh' as const, name: 'Chinese', nativeName: '中文', flag: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
        { code: 'ko' as const, name: 'Korean', nativeName: '한국어', flag: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
        { code: 'en' as const, name: 'English', nativeName: 'English', flag: 'https://hatscripts.github.io/circle-flags/flags/gb.svg' }
    ];

    readonly uiLanguages = [
        { code: 'en' as const, name: 'English', nativeName: 'English', flag: 'https://hatscripts.github.io/circle-flags/flags/gb.svg' },
        { code: 'ja' as const, name: 'Japanese', nativeName: '日本語', flag: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
        { code: 'zh' as const, name: 'Chinese', nativeName: '中文', flag: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
        { code: 'ko' as const, name: 'Korean', nativeName: '한국어', flag: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
        { code: 'vi' as const, name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: 'https://hatscripts.github.io/circle-flags/flags/vn.svg' }
    ];

    readonly features = computed<{ icon: IconName; text: string }[]>(() => [
        { icon: 'subtitles', text: this.i18n.t('onboarding.features.subtitles') },
        { icon: 'book-open', text: this.i18n.t('onboarding.features.dict') },
        { icon: 'sparkles', text: this.i18n.t('onboarding.features.srs') }
    ]);

    nextStep(): void {
        this.step.update(s => (s + 1) as 0 | 1 | 2);
    }

    selectUILanguage(lang: UILanguage): void {
        this.selectedUILang.set(lang);
        this.i18n.setLanguage(lang);
        // Auto advance to welcome step after short delay
        setTimeout(() => this.nextStep(), 300);
    }

    selectLanguage(code: 'ja' | 'zh' | 'ko' | 'en'): void {
        this.selectedLang.set(code);
    }

    startLearning(): void {
        const lang = this.selectedLang();
        if (!lang) return;

        // Set the learning language
        this.settings.setLanguage(lang);

        // Start exit animation
        this.isExiting.set(true);

        // Complete onboarding after animation
        setTimeout(() => {
            this.settings.completeOnboarding();
        }, 600);
    }
}
