import { Component, ChangeDetectionStrategy, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SettingsService, I18nService } from '../../core/services';
import { SupportedLearningLanguage, SUPPORTED_LANGUAGES } from '../../models';

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

    readonly learningLanguages = SUPPORTED_LANGUAGES;

    getLanguageName(code: string): string {
        const map: Record<string, string> = { ja: 'japanese', zh: 'chinese', ko: 'korean', en: 'english' };
        return this.i18n.t(`settings.${map[code]}`) || code;
    }

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
