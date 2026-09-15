import { Component, ChangeDetectionStrategy, inject, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { SettingsService, I18nService } from '../../core/services';
import { UILanguage } from '../../core/services/i18n.service';
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

    /** Current active step (1: Target Lang, 2: Starting Level, 3: Subtitle Translation) */
    currentStep = signal<1 | 2 | 3>(1);
    readonly totalSteps = 3;
    readonly steps = [1, 2, 3] as const;

    /** Progress percentage for the top progress bar */
    progressPercentage = computed(() => (this.currentStep() / this.totalSteps) * 100);

    getStepProgressText(): string {
        const template = this.i18n.t('onboarding.stepProgress') || 'Step {{current}} of {{total}}';
        return template
            .replace('{{current}}', String(this.currentStep()))
            .replace('{{total}}', String(this.totalSteps));
    }

    /** Target learning language - defaults to current settings or 'ja' */
    selectedLang = signal<SupportedLearningLanguage>(
        this.settings.settings().language || 'ja'
    );

    /** Native/Subtitle translation language - defaults to settings or browser UI language */
    selectedTargetLang = signal<string>(
        this.settings.settings().dualSubtitleTargetLang || this.i18n.currentLanguage() || 'en'
    );

    /** Starting level tier ('beginner' | 'intermediate' | 'advanced') */
    selectedLevel = signal<'beginner' | 'intermediate' | 'advanced'>('beginner');

    readonly learningLanguages = SUPPORTED_LANGUAGES;

    /** Available translation languages matching i18n */
    readonly translationLanguages = this.i18n.availableLanguages;

    /** Proficiency tiers for level selection */
    readonly levelTiers: Array<{
        id: 'beginner' | 'intermediate' | 'advanced';
        tier: 'beginner' | 'intermediate' | 'advanced';
        icon: IconName;
    }> = [
        { id: 'beginner', tier: 'beginner', icon: 'sparkles' },
        { id: 'intermediate', tier: 'intermediate', icon: 'book-open' },
        { id: 'advanced', tier: 'advanced', icon: 'zap' }
    ];

    getLanguageName(code: string): string {
        const map: Record<string, string> = { ja: 'japanese', zh: 'chinese', ko: 'korean', en: 'english' };
        return this.i18n.t(`settings.${map[code]}`) || code;
    }

    getLanguageFeature(code: string): string {
        return this.i18n.t(`onboarding.langFeatures.${code}`) || '';
    }

    getLevelDesc(tier: 'beginner' | 'intermediate' | 'advanced'): string {
        return this.i18n.t(`onboarding.levels.${tier}Desc`) || '';
    }

    getLevelBadge(tier: 'beginner' | 'intermediate' | 'advanced'): string {
        const lang = this.selectedLang();
        if (lang === 'zh') {
            if (tier === 'beginner') return 'HSK 1-2';
            if (tier === 'intermediate') return 'HSK 3-4';
            return 'HSK 5-6';
        }
        if (lang === 'ko') {
            if (tier === 'beginner') return 'TOPIK 1';
            if (tier === 'intermediate') return 'TOPIK 2-3';
            return 'TOPIK 4-6';
        }
        if (lang === 'en') {
            if (tier === 'beginner') return 'CEFR A1-A2';
            if (tier === 'intermediate') return 'CEFR B1-B2';
            return 'CEFR C1-C2';
        }
        // Japanese
        if (tier === 'beginner') return 'JLPT N5-N4';
        if (tier === 'intermediate') return 'JLPT N3';
        return 'JLPT N2-N1';
    }

    selectLanguage(code: SupportedLearningLanguage): void {
        this.selectedLang.set(code);
    }

    selectLevel(tier: 'beginner' | 'intermediate' | 'advanced'): void {
        this.selectedLevel.set(tier);
    }

    selectTargetLang(code: string): void {
        this.selectedTargetLang.set(code);
        if (['en', 'vi', 'ja', 'ko', 'zh'].includes(code)) {
            this.i18n.setLanguage(code as UILanguage);
        }
    }

    nextStep(): void {
        if (this.currentStep() < 3) {
            this.currentStep.update(s => (s + 1) as 1 | 2 | 3);
        } else {
            this.startLearning();
        }
    }

    prevStep(): void {
        if (this.currentStep() > 1) {
            this.currentStep.update(s => (s - 1) as 1 | 2 | 3);
        }
    }

    startLearning(): void {
        this.settings.completeOnboarding({
            language: this.selectedLang(),
            dualSubtitleTargetLang: this.selectedTargetLang(),
            preferredLevel: this.selectedLevel()
        });
        this.dismissed.emit();
    }

    skip(): void {
        this.settings.completeOnboarding({
            language: this.selectedLang(),
            dualSubtitleTargetLang: this.selectedTargetLang(),
            preferredLevel: 'all'
        });
        this.dismissed.emit();
    }
}
