import { Component, ChangeDetectionStrategy, inject, signal, computed, output, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { SwitchComponent } from '../../shared/components/switch/switch.component';
import { SettingsService, I18nService, GamificationService, ToastService, AuthService, SupabaseService } from '../../core/services';
import { UILanguage } from '../../core/services/i18n.service';
import { StreakService } from '../../services/streak.service';
import { GrammarService } from '../../services/grammar.service';
import { SupportedLearningLanguage } from '../../models';

export interface LearningLangOption {
    code: SupportedLearningLanguage;
    name: string;
    nativeName: string;
    flag: string;
    tag: string;
    defaultCompanion: string;
}

export interface LevelOption {
    id: 'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced';
    titleKey: string;
    descKey: string;
    icon: IconName;
    rankKey: 'novice' | 'apprentice' | 'adept' | 'veteran' | 'master';
    stageNumber: number;
    tierClass: string;
}

export interface CompanionOption {
    id: string;
    name: string;
    shortName: string;
    url: string;
    focus: string;
    trait: string;
    quote: string;
}

@Component({
    selector: 'app-onboarding',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent, SwitchComponent],
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.scss'],
    host: {
        '(document:keydown.escape)': 'skip()',
        '(document:keydown.arrowright)': 'onKeyRight()',
        '(document:keydown.arrowleft)': 'onKeyLeft()',
        '(document:keydown.enter)': 'nextStep()'
    }
})
export class OnboardingComponent implements OnInit, OnDestroy {
    private settings = inject(SettingsService);
    public i18n = inject(I18nService);
    private gamification = inject(GamificationService);
    private streak = inject(StreakService);
    private grammar = inject(GrammarService);
    private toast = inject(ToastService);
    private auth = inject(AuthService);
    private supabase = inject(SupabaseService);

    @ViewChild('bodyContainer') bodyContainer?: ElementRef<HTMLElement>;

    /** Emitted when onboarding is finished or skipped */
    dismissed = output<void>();

    /** Keep reward ownership distinct from the first-time completion flag */
    readonly starterPackClaimed = computed(() => this.settings.onboardingRewardClaimed());

    /** Total 4-step streamlined game journey: Realm -> Companion -> Difficulty -> Adventurer License */
    readonly totalSteps = 4;
    readonly steps = [1, 2, 3, 4] as const;

    /** Current active step */
    currentStep = signal<1 | 2 | 3 | 4>(1);

    /** Directional animation */
    slideDirection = signal<'left' | 'right'>('left');

    /** Smooth exit animation state */
    isClosing = signal(false);

    /** Target learning language */
    selectedLang = signal<SupportedLearningLanguage>(
        this.settings.settings().language || 'ja'
    );

    /** Selected companion avatar */
    selectedCompanion = signal<string>(
        this.settings.companionClass() || 'wizard'
    );

    /** Starting Level Tier */
    selectedLevel = signal<'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced'>(
        (this.settings.settings().preferredLevel && this.settings.settings().preferredLevel !== 'all'
            ? this.settings.settings().preferredLevel as 'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced'
            : 'beginner')
    );

    /** Subtitle translation language (app UI locale) */
    selectedTargetLang = signal<string>(
        this.settings.settings().dualSubtitleTargetLang || this.i18n.currentLanguage() || 'en'
    );

    /** Dual subtitle translation enabled toggle */
    showDualSubtitles = signal<boolean>(
        this.settings.settings().showDualSubtitles ?? true
    );

    /** Available translation languages matching app UI locales */
    readonly translationLanguages = [
        { code: 'vi' as const, name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '/flags/vn.svg' },
        { code: 'en' as const, name: 'English', nativeName: 'English', flag: '/flags/gb.svg' },
        { code: 'ja' as const, name: 'Japanese', nativeName: '日本語', flag: '/flags/jp.svg' },
        { code: 'ko' as const, name: 'Korean', nativeName: '한국어', flag: '/flags/kr.svg' },
        { code: 'zh' as const, name: 'Chinese', nativeName: '中文', flag: '/flags/cn.svg' }
    ];

    /** Touch gesture coordinates for swipe navigation */
    private touchStartX = 0;
    private touchStartY = 0;

    /** Preserved document styles for clean scroll restoration */
    private previousBodyOverflow = '';
    private previousBodyTouchAction = '';
    private previousHtmlOverflow = '';

    /** Supported learning languages */
    readonly learningLanguages: LearningLangOption[] = [
        {
            code: 'ja',
            name: 'Japanese',
            nativeName: '日本語',
            flag: '/flags/jp.svg',
            tag: 'Anime & Daily Life',
            defaultCompanion: 'wizard'
        },
        {
            code: 'ko',
            name: 'Korean',
            nativeName: '한국어',
            flag: '/flags/kr.svg',
            tag: 'K-Drama & Slang',
            defaultCompanion: 'bard'
        },
        {
            code: 'zh',
            name: 'Chinese',
            nativeName: '中文',
            flag: '/flags/cn.svg',
            tag: 'Hanzi & Podcasts',
            defaultCompanion: 'alchemist'
        },
        {
            code: 'en',
            name: 'English',
            nativeName: 'English',
            flag: '/flags/gb.svg',
            tag: 'Global Cinema & Idioms',
            defaultCompanion: 'ranger'
        }
    ];

    /** 8 Companion Guide Archetypes Aligned with Avatar Presets */
    readonly companionRoster: CompanionOption[] = [
        {
            id: 'wizard',
            name: 'Scholar Mage',
            shortName: 'Mage',
            url: '/avatars/wizard.svg',
            focus: 'Grammar & Syntax Insight',
            trait: 'Grammar Insight',
            quote: "I'll decode every complex sentence and grammar puzzle for you!"
        },
        {
            id: 'knight',
            name: 'Guardian Knight',
            shortName: 'Knight',
            url: '/avatars/knight.svg',
            focus: 'Daily Streak Protector',
            trait: 'Streak Ward',
            quote: 'Your daily streak will never falter under my unbreakable shield!'
        },
        {
            id: 'shinobi',
            name: 'Shadow Shinobi',
            shortName: 'Shinobi',
            url: '/avatars/shinobi.svg',
            focus: 'Fast Native Dialogue',
            trait: 'High-Speed Tracker',
            quote: "We'll master rapid native speech before they even realize it!"
        },
        {
            id: 'ranger',
            name: 'Immersion Ranger',
            shortName: 'Ranger',
            url: '/avatars/ranger.svg',
            focus: 'Everyday Slang & Idioms',
            trait: 'Slang & Idioms',
            quote: 'Everyday slang, idioms, and natural street talk are our domain!'
        },
        {
            id: 'miner',
            name: 'Sentence Miner',
            shortName: 'Miner',
            url: '/avatars/miner.svg',
            focus: 'Word & Sentence Mining',
            trait: 'Word Mining',
            quote: "Every sentence hides hidden gold—let's mine every nugget of vocabulary!"
        },
        {
            id: 'alchemist',
            name: 'Vocab Alchemist',
            shortName: 'Alchemist',
            url: '/avatars/alchemist.svg',
            focus: 'Word & Flashcard Mining',
            trait: 'Word Alchemy',
            quote: 'Every word you encounter will be transmuted into golden knowledge!'
        },
        {
            id: 'bard',
            name: 'Minstrel Bard',
            shortName: 'Bard',
            url: '/avatars/bard.svg',
            focus: 'Pitch Accent & Cadence',
            trait: 'Pitch & Rhythm',
            quote: "Let's tune your ears to the natural pitch accent and rhythm of native speech!"
        },
        {
            id: 'sovereign',
            name: 'Mythic Sovereign',
            shortName: 'Sovereign',
            url: '/avatars/sovereign.svg',
            focus: 'Polyglot Mastery',
            trait: 'Polyglot Master',
            quote: 'A true sovereign conquers all tongues without fear. The realm is yours!'
        }
    ];

    /** Level calibration options aligned with backend tiers */
    readonly levelOptions: LevelOption[] = [
        {
            id: 'beginner',
            titleKey: 'level.beginner',
            descKey: 'onboarding.levels.beginnerDesc',
            icon: 'sprout',
            rankKey: 'novice',
            stageNumber: 1,
            tierClass: 'stone'
        },
        {
            id: 'elementary',
            titleKey: 'level.elementary',
            descKey: 'onboarding.levels.elementaryDesc',
            icon: 'book-open',
            rankKey: 'apprentice',
            stageNumber: 2,
            tierClass: 'bronze'
        },
        {
            id: 'intermediate',
            titleKey: 'level.intermediate',
            descKey: 'onboarding.levels.intermediateDesc',
            icon: 'broadsword',
            rankKey: 'adept',
            stageNumber: 3,
            tierClass: 'silver'
        },
        {
            id: 'upper_intermediate',
            titleKey: 'level.upper_intermediate',
            descKey: 'onboarding.levels.upperIntermediateDesc',
            icon: 'winged-sword',
            rankKey: 'veteran',
            stageNumber: 4,
            tierClass: 'gold'
        },
        {
            id: 'advanced',
            titleKey: 'level.advanced',
            descKey: 'onboarding.levels.advancedDesc',
            icon: 'laurel-crown',
            rankKey: 'master',
            stageNumber: 5,
            tierClass: 'platinum'
        }
    ];

    /** Active realm computed from selection */
    activeRealm = computed(() => {
        const code = this.selectedLang();
        return this.learningLanguages.find(l => l.code === code) || this.learningLanguages[0];
    });

    /** Active companion computed from selection */
    activeCompanion = computed(() => {
        const id = this.selectedCompanion();
        return this.companionRoster.find(c => c.id === id) || this.companionRoster[0];
    });

    /** Active companion dialogue quote */
    companionQuote = computed(() => {
        const id = this.selectedCompanion();
        return this.getCompanionQuote(id) || this.activeCompanion().quote;
    });

    /** Active level computed from selection */
    activeLevel = computed(() => {
        const id = this.selectedLevel();
        return this.levelOptions.find(l => l.id === id) || this.levelOptions[0];
    });

    getCompanionName(id: string): string {
        const keyMap: Record<string, string> = {
            wizard: this.i18n.t('onboarding.companions.wizard'),
            knight: this.i18n.t('onboarding.companions.knight'),
            shinobi: this.i18n.t('onboarding.companions.shinobi'),
            ranger: this.i18n.t('onboarding.companions.ranger'),
            miner: this.i18n.t('onboarding.companions.miner'),
            alchemist: this.i18n.t('onboarding.companions.alchemist'),
            bard: this.i18n.t('onboarding.companions.bard'),
            sovereign: this.i18n.t('onboarding.companions.sovereign')
        };
        return keyMap[id] || id;
    }

    getCompanionTrait(id: string): string {
        const keyMap: Record<string, string> = {
            wizard: this.i18n.t('onboarding.companions.wizardTrait'),
            knight: this.i18n.t('onboarding.companions.knightTrait'),
            shinobi: this.i18n.t('onboarding.companions.shinobiTrait'),
            ranger: this.i18n.t('onboarding.companions.rangerTrait'),
            miner: this.i18n.t('onboarding.companions.minerTrait'),
            alchemist: this.i18n.t('onboarding.companions.alchemistTrait'),
            bard: this.i18n.t('onboarding.companions.bardTrait'),
            sovereign: this.i18n.t('onboarding.companions.sovereignTrait')
        };
        return keyMap[id] || '';
    }

    getCompanionQuote(id: string): string {
        const keyMap: Record<string, string> = {
            wizard: this.i18n.t('onboarding.companions.wizardQuote'),
            knight: this.i18n.t('onboarding.companions.knightQuote'),
            shinobi: this.i18n.t('onboarding.companions.shinobiQuote'),
            ranger: this.i18n.t('onboarding.companions.rangerQuote'),
            miner: this.i18n.t('onboarding.companions.minerQuote'),
            alchemist: this.i18n.t('onboarding.companions.alchemistQuote'),
            bard: this.i18n.t('onboarding.companions.bardQuote'),
            sovereign: this.i18n.t('onboarding.companions.sovereignQuote')
        };
        return keyMap[id] || '';
    }

    getRankName(rankKey: string): string {
        const map: Record<string, string> = {
            novice: this.i18n.t('onboarding.ranks.novice'),
            apprentice: this.i18n.t('onboarding.ranks.apprentice'),
            adept: this.i18n.t('onboarding.ranks.adept'),
            veteran: this.i18n.t('onboarding.ranks.veteran'),
            master: this.i18n.t('onboarding.ranks.master')
        };
        return map[rankKey] || rankKey;
    }

    getLevelDesc(tier: string): string {
        const map: Record<string, string> = {
            beginner: this.i18n.t('onboarding.levels.beginnerDesc'),
            elementary: this.i18n.t('onboarding.levels.elementaryDesc'),
            intermediate: this.i18n.t('onboarding.levels.intermediateDesc'),
            upper_intermediate: this.i18n.t('onboarding.levels.upperIntermediateDesc'),
            advanced: this.i18n.t('onboarding.levels.advancedDesc')
        };
        return map[tier] || '';
    }

    getLevelTitle(titleKey: string): string {
        const map: Record<string, string> = {
            'level.beginner': this.i18n.t('level.beginner'),
            'level.elementary': this.i18n.t('level.elementary'),
            'level.intermediate': this.i18n.t('level.intermediate'),
            'level.upper_intermediate': this.i18n.t('level.upper_intermediate'),
            'level.advanced': this.i18n.t('level.advanced')
        };
        return map[titleKey] || '';
    }

    getRealmVibe(code: string): string {
        const map: Record<string, string> = {
            ja: this.i18n.t('onboarding.realmVibes.ja'),
            ko: this.i18n.t('onboarding.realmVibes.ko'),
            zh: this.i18n.t('onboarding.realmVibes.zh'),
            en: this.i18n.t('onboarding.realmVibes.en')
        };
        return map[code] || '';
    }

    getLanguageName(code: string): string {
        const map: Record<string, string> = {
            ja: this.i18n.t('settings.japanese'),
            ko: this.i18n.t('settings.korean'),
            zh: this.i18n.t('settings.chinese'),
            en: this.i18n.t('settings.english'),
            vi: this.i18n.t('settings.vietnamese') || 'Tiếng Việt'
        };
        return map[code] || code;
    }

    toggleDualSubtitles(): void {
        this.triggerHaptic(8);
        this.showDualSubtitles.update(v => !v);
    }

    ngOnInit(): void {
        if (typeof document !== 'undefined') {
            const body = document.body;
            const html = document.documentElement;

            this.previousBodyOverflow = body.style.overflow;
            this.previousBodyTouchAction = body.style.touchAction;
            this.previousHtmlOverflow = html.style.overflow;

            body.style.overflow = 'hidden';
            body.style.touchAction = 'none';
            html.style.overflow = 'hidden';
        }
    }

    ngOnDestroy(): void {
        if (typeof document !== 'undefined') {
            const body = document.body;
            const html = document.documentElement;

            body.style.overflow = this.previousBodyOverflow;
            body.style.touchAction = this.previousBodyTouchAction;
            html.style.overflow = this.previousHtmlOverflow;
        }
    }

    private triggerHaptic(duration: number | number[] = 10): void {
        try {
            if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                navigator.vibrate(duration);
            }
        } catch {
            // Silently ignore
        }
    }

    /* --- Level Exam Badge Helper --- */
    getLevelExamBadge(tier: string): string {
        const lang = this.selectedLang();
        if (lang === 'zh') {
            if (tier === 'beginner') return 'HSK 1';
            if (tier === 'elementary') return 'HSK 2';
            if (tier === 'intermediate') return 'HSK 3-4';
            if (tier === 'upper_intermediate') return 'HSK 5';
            return 'HSK 6';
        }
        if (lang === 'ko') {
            if (tier === 'beginner') return 'TOPIK 1';
            if (tier === 'elementary') return 'TOPIK 2';
            if (tier === 'intermediate') return 'TOPIK 3-4';
            if (tier === 'upper_intermediate') return 'TOPIK 5';
            return 'TOPIK 6';
        }
        if (lang === 'en') {
            if (tier === 'beginner') return 'A1';
            if (tier === 'elementary') return 'A2';
            if (tier === 'intermediate') return 'B1';
            if (tier === 'upper_intermediate') return 'B2';
            return 'C1-C2';
        }
        // Japanese default
        if (tier === 'beginner') return 'JLPT N5';
        if (tier === 'elementary') return 'JLPT N4';
        if (tier === 'intermediate') return 'JLPT N3';
        if (tier === 'upper_intermediate') return 'JLPT N2';
        return 'JLPT N1';
    }

    /* --- Interactive Handlers --- */
    selectLanguage(code: SupportedLearningLanguage): void {
        this.triggerHaptic(10);
        this.selectedLang.set(code);

        const found = this.learningLanguages.find(l => l.code === code);
        if (found?.defaultCompanion) {
            this.selectedCompanion.set(found.defaultCompanion);
        }

        if (this.selectedTargetLang() === code) {
            this.selectedTargetLang.set(code === 'en' ? 'ja' : 'en');
        }
    }

    selectTargetLang(code: string): void {
        this.triggerHaptic(10);
        this.selectedTargetLang.set(code);
        if (['en', 'vi', 'ja', 'ko', 'zh'].includes(code)) {
            this.i18n.setLanguage(code as UILanguage);
        }
    }

    selectCompanion(comp: CompanionOption): void {
        this.triggerHaptic(12);
        this.selectedCompanion.set(comp.id);
    }

    selectLevel(tier: 'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced'): void {
        this.triggerHaptic(10);
        this.selectedLevel.set(tier);
    }

    /* --- Navigation Handlers --- */
    nextStep(): void {
        this.triggerHaptic(8);
        if (this.currentStep() < this.totalSteps) {
            this.slideDirection.set('left');
            this.currentStep.update(s => (s + 1) as 1 | 2 | 3 | 4);
            this.resetScroll();
        } else {
            this.startLearning();
        }
    }

    prevStep(): void {
        this.triggerHaptic(8);
        if (this.currentStep() > 1) {
            this.slideDirection.set('right');
            this.currentStep.update(s => (s - 1) as 1 | 2 | 3 | 4);
            this.resetScroll();
        }
    }

    private resetScroll(): void {
        if (this.bodyContainer?.nativeElement) {
            this.bodyContainer.nativeElement.scrollTop = 0;
        }
    }

    /**
     * Activates real archetype perk and returns a localized summary message.
     * Note: Does NOT modify user profile avatar (auth.user.picture).
     */
    private applyCompanionPerk(companionId: string): string {
        switch (companionId) {
            case 'knight': {
                // Guardian Knight: Guarantees full Frost Ward streak freeze shield (2/2) in inventory
                this.streak.grantBonusFreeze(1);
                return this.i18n.t('onboarding.perkKnight') || 'Guardian Knight: Frost Ward Streak Shield activated!';
            }
            case 'wizard': {
                // Scholar Mage: In-depth grammar pattern recognition turned ON
                this.grammar.grammarModeEnabled.set(true);
                return this.i18n.t('onboarding.perkWizard') || 'Scholar Mage: Grammar & Syntax Insights turned ON!';
            }
            case 'alchemist': {
                // Vocab Alchemist: Extra +25 XP word-mining bonus (Total +75 XP!)
                this.gamification.addXP(25, 'alchemist_word_mining_bonus');
                return this.i18n.t('onboarding.perkAlchemist') || 'Vocab Alchemist: +25 Extra Bonus XP transmuted!';
            }
            case 'ranger': {
                // Immersion Ranger: Dual Subtitles enabled for real talk
                this.showDualSubtitles.set(true);
                return this.i18n.t('onboarding.perkRanger') || 'Immersion Ranger: Dual Subtitles enabled for real talk!';
            }
            case 'bard': {
                // Minstrel Bard: Phonetic pronunciation ruby annotations active
                this.settings.setReadingDisplayMode('annotated');
                return this.i18n.t('onboarding.perkBard') || 'Minstrel Bard: Phonetic Pronunciation guides enabled!';
            }
            case 'miner': {
                // Sentence Miner: Extra +35 XP word-mining discovery
                this.gamification.addXP(35, 'miner_word_mining_bonus');
                return this.i18n.t('onboarding.perkMiner') || 'Sentence Miner: Word-mining radar calibrated! +35 Miner XP discovered!';
            }
            case 'sovereign': {
                // Mythic Sovereign: Dual Subtitles & Grammar Insights active simultaneously
                this.showDualSubtitles.set(true);
                this.grammar.grammarModeEnabled.set(true);
                return this.i18n.t('onboarding.perkSovereign') || 'Mythic Sovereign: Polyglot Mantle bestowed! Dual Subtitles & Grammar Insights active!';
            }
            case 'shinobi':
            default: {
                // Shadow Shinobi: High-speed native immersion controls calibrated
                this.settings.updateSettings({ playbackSpeed: 1.0 });
                return this.i18n.t('onboarding.perkShinobi') || 'Shadow Shinobi: Rapid native immersion calibrated!';
            }
        }
    }

    startLearning(): void {
        this.triggerHaptic([20, 50, 30]);
        this.isClosing.set(true);

        const companion = this.selectedCompanion();
        const isFirstTime = !this.settings.onboardingRewardClaimed();

        // Activate genuine archetype perk
        const perkMsg = this.applyCompanionPerk(companion);

        if (isFirstTime) {
            // Award real +50 Starter XP & ignite streak
            this.gamification.addXP(50, 'onboarding_starter_pack');
            void this.streak.recordActivity();
            this.toast.show(
                `${this.i18n.t('onboarding.starterPackClaimed') || 'Starter Pack Activated! +50 XP & Day 1 Streak ignited.'} ${perkMsg}`,
                { type: 'success', icon: 'sparkles', duration: 5500 }
            );
        } else {
            this.toast.show(
                perkMsg,
                { type: 'success', icon: 'check', duration: 3500 }
            );
        }

        // Persist target language to Supabase profile on the server if authenticated
        if (this.auth.isLoggedIn()) {
            const userId = this.auth.getUserId();
            if (userId) {
                void this.supabase.client
                    .from('profiles')
                    .update({ target_lang: this.selectedLang() })
                    .eq('id', userId);
            }
        }

        setTimeout(() => {
            this.settings.completeOnboarding({
                language: this.selectedLang(),
                companionClass: companion,
                preferredLevel: this.selectedLevel(),
                dualSubtitleTargetLang: this.selectedTargetLang(),
                showDualSubtitles: this.showDualSubtitles(),
                onboardingRewardClaimed: true
            });
            this.dismissed.emit();
        }, 280);
    }

    skip(): void {
        this.triggerHaptic(8);
        this.isClosing.set(true);

        const companion = this.selectedCompanion() || 'wizard';
        const isFirstTime = !this.settings.onboardingRewardClaimed();
        if (isFirstTime) {
            this.gamification.addXP(50, 'onboarding_starter_pack');
            void this.streak.recordActivity();
            this.applyCompanionPerk(companion);
        }

        // Persist target language to Supabase profile on the server if authenticated
        if (this.auth.isLoggedIn()) {
            const userId = this.auth.getUserId();
            if (userId) {
                void this.supabase.client
                    .from('profiles')
                    .update({ target_lang: this.selectedLang() })
                    .eq('id', userId);
            }
        }

        setTimeout(() => {
            this.settings.completeOnboarding({
                language: this.selectedLang(),
                companionClass: companion,
                preferredLevel: this.selectedLevel() || 'all',
                dualSubtitleTargetLang: this.selectedTargetLang(),
                showDualSubtitles: this.showDualSubtitles(),
                onboardingRewardClaimed: true
            });
            this.dismissed.emit();
        }, 160);
    }

    /* --- Touch & Keyboard Gestures --- */
    onTouchStart(event: TouchEvent): void {
        if (event.touches.length === 1) {
            this.touchStartX = event.touches[0].clientX;
            this.touchStartY = event.touches[0].clientY;
        }
    }

    onTouchEnd(event: TouchEvent): void {
        if (event.changedTouches.length === 1) {
            const deltaX = event.changedTouches[0].clientX - this.touchStartX;
            const deltaY = event.changedTouches[0].clientY - this.touchStartY;

            if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
                if (deltaX < 0) {
                    if (this.currentStep() < this.totalSteps) {
                        this.nextStep();
                    }
                } else {
                    if (this.currentStep() > 1) {
                        this.prevStep();
                    }
                }
            }
        }
    }

    onKeyRight(): void {
        if (this.currentStep() < this.totalSteps) {
            this.nextStep();
        }
    }

    onKeyLeft(): void {
        if (this.currentStep() > 1) {
            this.prevStep();
        }
    }
}
