import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SettingsService, UILanguage, I18nService } from '../../services';

interface DemoWord {
    surface: string;
    reading: string;
    meaning: string;
    highlight?: boolean;
}

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

    step = signal<0 | 1>(0); // 0: UI Lang, 1: Learning Lang
    selectedLang = signal<'ja' | 'zh' | 'ko' | 'en' | null>(null);
    selectedUILang = signal<UILanguage>('en');
    isExiting = signal(false);

    // Interactive Demo State
    selectedWord = signal<DemoWord | null>(null);

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

    readonly demoSentences: Record<'ja' | 'zh' | 'ko' | 'en', DemoWord[]> = {
        ja: [
            { surface: '日本語', reading: 'にほんご', meaning: 'onboarding.demo.ja.japanese' },
            { surface: 'を', reading: 'o', meaning: 'onboarding.demo.ja.particle' },
            { surface: '勉強', reading: 'べんきょう', meaning: 'onboarding.demo.ja.study', highlight: true },
            { surface: 'しましょう', reading: 'shimashou', meaning: 'onboarding.demo.ja.letsDo' }
        ],
        zh: [
            { surface: '一起', reading: 'yīqǐ', meaning: 'onboarding.demo.zh.together', highlight: true },
            { surface: '学', reading: 'xué', meaning: 'onboarding.demo.zh.learn' },
            { surface: '中文', reading: 'zhōngwén', meaning: 'onboarding.demo.zh.chinese' },
            { surface: '吧', reading: 'ba', meaning: 'onboarding.demo.zh.suggestion' }
        ],
        ko: [
            { surface: '한국어', reading: 'hangugeo', meaning: 'onboarding.demo.ko.korean', highlight: true },
            { surface: '를', reading: 'reul', meaning: 'onboarding.demo.ko.particle' },
            { surface: '배우자', reading: 'baeuja', meaning: 'onboarding.demo.ko.letsLearn' }
        ],
        en: [
            { surface: 'Let\'s', reading: '', meaning: 'onboarding.demo.en.lets' },
            { surface: 'learn', reading: '', meaning: 'onboarding.demo.en.learn', highlight: true },
            { surface: 'together', reading: '', meaning: 'onboarding.demo.en.together' }
        ]
    };

    selectUILanguage(lang: UILanguage): void {
        this.selectedUILang.set(lang);
        this.i18n.setLanguage(lang);
    }

    nextStep(): void {
        this.step.set(1);
    }

    previousStep(): void {
        this.step.set(0);
        this.selectedLang.set(null); // Reset their learning lang choice just in case
    }

    selectLanguage(code: 'ja' | 'zh' | 'ko' | 'en'): void {
        this.selectedLang.set(code);
        this.selectedWord.set(null); // Reset demo popup
    }

    onDemoWordClick(word: DemoWord, event: Event): void {
        event.stopPropagation(); // Prevent bubbling to dismissPopup
        // Toggle: if same word clicked again, dismiss
        if (this.selectedWord() === word) {
            this.selectedWord.set(null);
        } else {
            this.selectedWord.set(word);
        }
    }

    dismissPopup(): void {
        this.selectedWord.set(null);
    }

    startLearning(): void {
        const lang = this.selectedLang();
        if (!lang) return;

        this.settings.setLanguage(lang);
        this.isExiting.set(true);

        setTimeout(() => {
            this.settings.completeOnboarding();
        }, 600);
    }
}
