import { Component, inject, signal, computed, ChangeDetectionStrategy, OnDestroy, PLATFORM_ID, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SwitchComponent } from '../../../shared/components/switch/switch.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { VocabularyService } from '../vocabulary.service';
import { SettingsService, I18nService, AudioService, ToastService, KeyboardShortcutService, GamificationService } from '../../../core/services';
import { StreakService } from '../../../services/streak.service';
import { GrammarService } from '../../../services/grammar.service';
import { SupportedLearningLanguage, SupportedGrammarLang, VocabularyItem, getLanguageFlagUrl } from '../../../models';
import { calculateSRSPreview, SRSIntervalPreview } from '../../../core/utils';
import { getReadingDisplayLabel } from '../../../shared/utils/language.utils';
import { FormatTimePipe } from '../../../shared/pipes';

const STUDY_AUTOPLAY_KEY = 'linguatube_study_autoplay';
const STUDY_CLOZE_KEY = 'linguatube_study_cloze';

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseCardMeaning(rawMeaning: string | undefined | null, isGrammar: boolean): { meaningPrimary: string; meaningHint: string | null } {
    if (!rawMeaning) return { meaningPrimary: '', meaningHint: null };

    if (isGrammar) {
        const semiIdx = rawMeaning.indexOf(';');
        const colonIdx = rawMeaning.indexOf(':');
        const splitIdx = semiIdx !== -1 ? semiIdx : (colonIdx !== -1 && colonIdx < 60 ? colonIdx : -1);

        if (splitIdx !== -1) {
            const desc = rawMeaning.substring(0, splitIdx).trim();
            let gloss = rawMeaning.substring(splitIdx + 1).trim();
            if (gloss.endsWith('.')) gloss = gloss.slice(0, -1).trim();

            if (gloss.includes("'") || gloss.includes('"') || gloss.includes('‘') || gloss.includes('“')) {
                const cleanGloss = gloss
                    .replace(/^['"‘“]|['"’”]$/g, '')
                    .replace(/['"’”]\s*,\s*['"‘“]/g, ' / ')
                    .replace(/['"‘“’”]/g, '')
                    .trim();
                return { meaningPrimary: cleanGloss || gloss, meaningHint: desc };
            }
            return { meaningPrimary: gloss, meaningHint: desc };
        }

        const quoteMatches = rawMeaning.match(/['"‘“]([^'"‘“”]+)['"’”]/g);
        if (quoteMatches && quoteMatches.length > 0) {
            const cleanGloss = quoteMatches
                .map(m => m.replace(/['"‘“”]/g, '').trim())
                .filter(Boolean)
                .join(' / ');
            if (cleanGloss) {
                const desc = rawMeaning.replace(/It can be translated as\s*['"‘“].*$/i, '').trim();
                const hint = desc && desc !== cleanGloss ? (desc.endsWith('.') ? desc.slice(0, -1) : desc) : null;
                return { meaningPrimary: cleanGloss, meaningHint: hint };
            }
        }
        return { meaningPrimary: rawMeaning, meaningHint: null };
    }

    if (rawMeaning.includes(';')) {
        const parts = rawMeaning.split(';').map(p => p.trim()).filter(Boolean);
        if (parts.length > 1) {
            return { meaningPrimary: parts.slice(0, 3).join(' • '), meaningHint: null };
        }
    }

    return { meaningPrimary: rawMeaning, meaningHint: null };
}

function maskClozeSentence(sentence: string, word: string): string {
    if (!sentence || !word) return sentence || '';
    try {
        let cleanWord = word.replace(/^[~～〜]/, '').replace(/[~～〜]$/, '').trim();
        if ((cleanWord.startsWith('(') && cleanWord.endsWith(')')) || (cleanWord.startsWith('（') && cleanWord.endsWith('）'))) {
            cleanWord = cleanWord.slice(1, -1).trim();
        }
        const wordToMatch = cleanWord || word;
        return sentence.replace(new RegExp(escapeRegex(wordToMatch), 'gi'), '【 ... 】');
    } catch {
        return sentence;
    }
}

@Component({
    selector: 'app-study-mode',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, RouterLink, IconComponent, SwitchComponent, EmptyStateComponent, FormatTimePipe],
    templateUrl: './study-mode.component.html',
    styleUrls: ['./study-mode.component.scss']
})
export class StudyModeComponent implements OnDestroy {
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router);

    vocab = inject(VocabularyService);
    settings = inject(SettingsService);
    i18n = inject(I18nService);
    streak = inject(StreakService);
    grammar = inject(GrammarService);
    gamification = inject(GamificationService);
    audioService = inject(AudioService);
    toast = inject(ToastService);
    keyboardService = inject(KeyboardShortcutService);

    // Gamification & Game Feel Signals
    sessionEarnedXp = signal(0);
    currentCombo = signal(0);
    maxCombo = signal(0);
    floatingXp = signal<{ id: number; text: string; bonus: boolean } | null>(null);
    cardFeedback = signal<'success' | 'wrong' | null>(null);
    isGradingCard = signal(false);
    private floatingXpCounter = 0;
    private floatingXpTimer: ReturnType<typeof setTimeout> | null = null;
    private gradeDelayTimer: ReturnType<typeof setTimeout> | null = null;

    readonly comboTier = computed<'fire' | 'electric' | 'super'>(() => {
        const combo = this.currentCombo();
        if (combo >= 10) return 'super';
        if (combo >= 5) return 'electric';
        return 'fire';
    });

    // Study Deck Selection: all (both) vs words vs grammar
    studyDeck = signal<'all' | 'words' | 'grammar'>('all');

    // Options (reactive signals)
    includeNew = signal(true);
    includeLearning = signal(true);
    includeKnown = signal(false);
    dueOnly = signal(false);
    reverseMode = signal(false);
    sessionSize = signal<number | 'all'>(10);
    autoPlayAudio = signal(true);
    clozeMode = signal(false);

    // Active Card State
    isStudying = signal(false);
    isComplete = signal(false);
    isAnswerRevealed = signal(false);
    peekReading = signal(false);
    studyCards = signal<VocabularyItem[]>([]);
    currentIndex = signal(0);
    initialCardCount = signal(0);
    missedCardIds = signal<Set<string>>(new Set());

    sessionStats = signal({ total: 0, correct: 0, incorrect: 0 });

    // Session timer
    sessionStartTime = signal<Date | null>(null);
    elapsedSeconds = signal(0);
    private timerInterval: ReturnType<typeof setInterval> | null = null;

    // Daily goal & progress (shared from VocabularyService)
    dailyGoal = this.vocab.dailyGoal;
    cardsCompletedToday = this.vocab.cardsCompletedToday;
    goalProgress = this.vocab.goalProgress;

    // Confetti
    showConfetti = signal(false);
    private confettiTimeout: ReturnType<typeof setInterval> | null = null;

    // Swipe gestures
    touchStartX = 0;
    touchStartY = 0;
    private touchMoved = false;
    private isCardTouchActive = false;
    private lastTouchEndTime = 0;
    swipeOffset = signal(0);
    isSwiping = signal(false);

    currentLanguage = this.settings.language;

    deckCounts = computed(() => {
        const currentLang = this.currentLanguage();
        this.grammar.loadedLanguages();
        let words = 0;
        let grammar = 0;

        for (const item of this.vocab.vocabulary()) {
            if (item.language !== currentLang || item.level === 'ignored') continue;
            if (this.grammar.isGrammar(item.word, item.language)) {
                grammar++;
            } else {
                words++;
            }
        }
        return { all: words + grammar, words, grammar };
    });

    deckStats = computed(() => {
        const currentLang = this.currentLanguage();
        this.grammar.loadedLanguages();
        const deck = this.studyDeck();
        let total = 0;
        let newCount = 0;
        let learningCount = 0;
        let knownCount = 0;

        for (const item of this.vocab.vocabulary()) {
            if (item.language !== currentLang || item.level === 'ignored') continue;
            const isGrammar = this.grammar.isGrammar(item.word, item.language);
            if (deck === 'words' && isGrammar) continue;
            if (deck === 'grammar' && !isGrammar) continue;

            total++;
            if (item.level === 'new') newCount++;
            else if (item.level === 'learning') learningCount++;
            else if (item.level === 'known') knownCount++;
        }

        return { total, new: newCount, learning: learningCount, known: knownCount };
    });

    // Due today count
    dueToday = computed(() => {
        const currentLang = this.currentLanguage();
        this.grammar.loadedLanguages();
        const deck = this.studyDeck();
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        let count = 0;

        for (const item of this.vocab.vocabulary()) {
            if (item.language !== currentLang || item.level === 'ignored') continue;
            const isGrammar = this.grammar.isGrammar(item.word, item.language);
            if (deck === 'words' && isGrammar) continue;
            if (deck === 'grammar' && !isGrammar) continue;
            if (!item.nextReviewDate || new Date(item.nextReviewDate) <= today) {
                count++;
            }
        }

        return count;
    });

    // Filtered available cards based on study preferences
    readonly filteredAvailableItems = computed(() => {
        const currentLang = this.currentLanguage();
        this.grammar.loadedLanguages();
        const incNew = this.includeNew();
        const incLearning = this.includeLearning();
        const incKnown = this.includeKnown();
        const onlyDue = this.dueOnly();
        const deck = this.studyDeck();
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        return this.vocab.vocabulary().filter(item => {
            if (item.language !== currentLang) return false;
            if (deck === 'words' && this.grammar.isGrammar(item.word, item.language)) return false;
            if (deck === 'grammar' && !this.grammar.isGrammar(item.word, item.language)) return false;
            if (onlyDue && item.nextReviewDate && new Date(item.nextReviewDate) > today) return false;
            if (item.level === 'new' && incNew) return true;
            if (item.level === 'learning' && incLearning) return true;
            if (item.level === 'known' && incKnown) return true;
            return false;
        });
    });

    availableCards = computed(() => this.filteredAvailableItems().length);

    sessionCardCount = computed(() => {
        const avail = this.availableCards();
        const limit = this.sessionSize();
        if (limit === 'all') return avail;
        return Math.min(avail, limit);
    });

    estimatedMinutes = computed(() => {
        const count = this.sessionCardCount();
        return Math.max(1, Math.round(count * 0.3));
    });

    currentCard = computed(() => {
        const cards = this.studyCards();
        const index = this.currentIndex();
        return cards[index] || null;
    });

    readonly cardViewModel = computed(() => {
        const item = this.currentCard();
        if (!item) return null;
        this.grammar.loadedLanguages();
        this.grammar.loadedTranslations();
        const pattern = this.grammar.findPattern(item.word, item.language);
        const isGrammar = !!pattern || this.grammar.isGrammar(item.word, item.language);
        const uiLang = this.i18n.currentLanguage();
        const trans = (isGrammar && pattern && uiLang !== 'en')
            ? this.grammar.getLoadedTranslation(item.language as SupportedGrammarLang, uiLang)?.[pattern.id]
            : null;
        const formation = trans?.formation || pattern?.formation || null;
        const rawMeaning = (isGrammar && trans)
            ? (trans.shortExplanation || trans.title || item.meaning)
            : item.meaning;

        const { meaningPrimary, meaningHint } = parseCardMeaning(rawMeaning, isGrammar);

        const grammarLevel = pattern?.level || null;
        const reading = this.settings.getReadingText(item.language, item);
        const primaryText = this.settings.useReadingOnly(item.language) && reading ? reading : item.word;
        const hasReading = !isGrammar && !!reading && reading !== item.word;
        const showReadingBack = hasReading && this.settings.showReadingAnnotation(item.language);
        const showReadingFront = hasReading && this.peekReading();
        const hasContext = !!item.sourceSentence?.trim();
        const isFlipped = this.isAnswerRevealed();

        const maskedSentence = (this.clozeMode() && hasContext && item.word)
            ? maskClozeSentence(item.sourceSentence!, item.word)
            : (item.sourceSentence || '');

        return {
            item,
            showAnswer: isFlipped,
            reading,
            primaryText,
            hasReading,
            showReadingBack,
            showReadingFront,
            hasContext,
            maskedSentence,
            sourceVideoId: item.sourceVideoId,
            sourceTimestamp: item.sourceTimestamp,
            isGrammar,
            pattern,
            formation,
            grammarLevel,
            localizedMeaning: rawMeaning,
            meaningPrimary,
            meaningHint
        };
    });

    openGrammarPattern(event?: Event): void {
        if (event) event.stopPropagation();
        const vm = this.cardViewModel();
        if (vm?.pattern) {
            this.grammar.showPopup(vm.pattern);
        }
    }

    readonly intervalPreviews = computed<SRSIntervalPreview>(() => {
        const card = this.currentCard();
        if (!card) return { again: '<10m', hard: '1d', good: '3d', easy: '6d' };
        return calculateSRSPreview(card);
    });

    // Session progress for sidebar & header
    cardsRemainingInQueue = computed(() => Math.max(0, this.studyCards().length - this.currentIndex()));

    sessionAccuracy = computed(() => {
        const s = this.sessionStats();
        if (s.total === 0) return 100;
        return Math.round((s.correct / s.total) * 100);
    });

    currentLanguageLabel = computed(() => {
        switch (this.currentLanguage()) {
            case 'ja': return this.i18n.t('settings.japanese');
            case 'zh': return this.i18n.t('settings.chinese');
            case 'ko': return this.i18n.t('settings.korean');
            default: return this.i18n.t('settings.english');
        }
    });

    currentLanguageFlag = computed(() => getLanguageFlagUrl(this.currentLanguage()));

    currentReadingDisplayLabel = computed(() => {
        const language = this.currentLanguage();
        return getReadingDisplayLabel(this.settings.getReadingDisplayMode(language), language, k => this.i18n.t(k));
    });

    startDueOnlySession(): void {
        this.dueOnly.set(true);
        this.startSession();
    }

    readonly filteredLanguageVocabulary = computed(() => {
        const lang = this.currentLanguage();
        return this.vocab.vocabulary().filter(item => item.language === lang && item.level !== 'ignored');
    });

    constructor() {
        // Reset study session to overview screen when navigation tab or reset is triggered
        effect(() => {
            const trigger = this.vocab.studyResetTrigger();
            if (trigger > 0) {
                this.endSession();
            }
        });

        // Preload grammar translations when learning language or UI language changes
        effect(() => {
            const lang = this.currentLanguage() as SupportedGrammarLang;
            const uiLang = this.i18n.currentLanguage();
            if (lang && uiLang && uiLang !== 'en') {
                void this.grammar.loadTranslation(lang, uiLang);
            }
        });

        // Preload active and upcoming card audio for 0ms instant playback
        effect(() => {
            const card = this.currentCard();
            if (card && isPlatformBrowser(this.platformId)) {
                void this.audioService.preloadWord(card.word, card.language as SupportedLearningLanguage);
                const cards = this.studyCards();
                const nextCard = cards[this.currentIndex() + 1];
                if (nextCard) {
                    void this.audioService.preloadWord(nextCard.word, nextCard.language as SupportedLearningLanguage);
                }
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            const storedAutoPlay = localStorage.getItem(STUDY_AUTOPLAY_KEY);
            if (storedAutoPlay !== null) {
                this.autoPlayAudio.set(storedAutoPlay === 'true');
            }
            const storedCloze = localStorage.getItem(STUDY_CLOZE_KEY);
            if (storedCloze !== null) {
                this.clozeMode.set(storedCloze === 'true');
            }

            // Register study mode active check with centralized KeyboardShortcutService (suppressed when inspect modal is open)
            this.keyboardService.setStudyActiveCallback(() => this.isStudying() && !this.isComplete() && !this.grammar.isPopupVisible());

            // Handle study keyboard shortcuts (Space, 1-4, R)
            this.keyboardService.events$
                .pipe(takeUntilDestroyed())
                .subscribe(event => {
                    if (!this.isStudying() || this.isComplete()) return;
                    if (event.type === 'study-flip') {
                        if (!this.isAnswerRevealed()) {
                            this.flipCard();
                        }
                    } else if (event.type === 'study-rate') {
                        if (this.isAnswerRevealed()) {
                            this.markAnswer(event.data.rating);
                        }
                    } else if (event.type === 'study-audio') {
                        const vm = this.cardViewModel();
                        if (vm) {
                            this.playAudio(vm.primaryText, vm.item.language, undefined, vm.item.audio);
                        }
                    }
                });
        }
    }

    ngOnDestroy(): void {
        this.keyboardService.setStudyActiveCallback(null);
        this.stopTimer();
        this.audioService.stopAudio();
        if (this.confettiTimeout) {
            clearTimeout(this.confettiTimeout);
            this.confettiTimeout = null;
        }
        if (this.floatingXpTimer) {
            clearTimeout(this.floatingXpTimer);
            this.floatingXpTimer = null;
        }
        if (this.gradeDelayTimer) {
            clearTimeout(this.gradeDelayTimer);
            this.gradeDelayTimer = null;
        }
    }

    toggleDeck(level: 'new' | 'learning' | 'known'): void {
        if (level === 'new') this.includeNew.update(v => !v);
        else if (level === 'learning') this.includeLearning.update(v => !v);
        else if (level === 'known') this.includeKnown.update(v => !v);
    }

    setSessionSize(size: number | 'all'): void {
        this.sessionSize.set(size);
    }

    setAutoPlayAudio(enabled: boolean): void {
        this.autoPlayAudio.set(enabled);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(STUDY_AUTOPLAY_KEY, enabled.toString());
        }
    }

    setClozeMode(enabled: boolean): void {
        this.clozeMode.set(enabled);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(STUDY_CLOZE_KEY, enabled.toString());
        }
    }

    togglePeekReading(event?: Event): void {
        if (event) event.stopPropagation();
        this.peekReading.update(v => !v);
    }

    playAudio(text: string, lang?: string, event?: Event, audioUrl?: string): void {
        if (event) event.stopPropagation();
        const targetLang = (lang || this.currentLanguage()) as SupportedLearningLanguage;
        const cleanText = text.replace(/^[~～〜]/, '').replace(/[~～〜]$/, '').trim();
        void this.audioService.playWord(cleanText || text, targetLang, audioUrl);
    }

    openVideoScene(videoId: string, timestamp?: number, event?: Event): void {
        if (event) event.stopPropagation();
        const t = Math.floor(timestamp || 0);
        void this.router.navigate(['/video'], { queryParams: { v: videoId, t } });
    }

    startSession(): void {
        const items = [...this.filteredAvailableItems()];
        if (items.length === 0) return;

        const today = new Date();
        today.setHours(23, 59, 59, 999);

        // Sort by overdue first, then by level priority
        items.sort((a, b) => {
            const aDate = a.nextReviewDate ? new Date(a.nextReviewDate) : new Date(0);
            const bDate = b.nextReviewDate ? new Date(b.nextReviewDate) : new Date(0);

            const aOverdue = aDate <= today;
            const bOverdue = bDate <= today;
            if (aOverdue && !bOverdue) return -1;
            if (!aOverdue && bOverdue) return 1;

            if (aDate.getTime() !== bDate.getTime()) {
                return aDate.getTime() - bDate.getTime();
            }

            const levelOrder = { new: 0, learning: 1, known: 2, ignored: 3 };
            return levelOrder[a.level] - levelOrder[b.level];
        });

        const limit = this.sessionSize();
        const sessionItems = limit === 'all' ? items : items.slice(0, limit);

        this.studyCards.set(sessionItems);

        this.initialCardCount.set(sessionItems.length);
        this.missedCardIds.set(new Set());
        this.currentIndex.set(0);
        this.isAnswerRevealed.set(false);
        this.peekReading.set(false);
        this.isStudying.set(true);
        this.isComplete.set(false);
        this.sessionStats.set({ total: 0, correct: 0, incorrect: 0 });
        this.sessionEarnedXp.set(0);
        this.currentCombo.set(0);
        this.maxCombo.set(0);
        this.floatingXp.set(null);
        this.cardFeedback.set(null);
        this.isGradingCard.set(false);
        this.swipeOffset.set(0);

        this.sessionStartTime.set(new Date());
        this.elapsedSeconds.set(0);
        this.startTimer();
    }

    flipCard(): void {
        const currentlyFlipped = this.isAnswerRevealed();
        this.isAnswerRevealed.set(!currentlyFlipped);

        if (!currentlyFlipped && this.autoPlayAudio()) {
            const vm = this.cardViewModel();
            if (vm) {
                this.playAudio(vm.primaryText, vm.item.language, undefined, vm.item.audio);
            }
        }
    }

    onCardClick(event?: MouseEvent): void {
        if (this.lastTouchEndTime !== 0 && Date.now() - this.lastTouchEndTime < 400) {
            return;
        }
        if (event && (event.target as HTMLElement)?.closest?.('button, a, .card-action-interactive')) {
            return;
        }
        this.flipCard();
    }

    markAnswer(answer: 'wrong' | 'hard' | 'good' | 'easy'): void {
        if (this.isGradingCard()) return;
        const card = this.currentCard();
        if (!card) return;

        let quality: number;
        let isCorrect = false;
        let baseXp = 0;

        if (answer === 'wrong') {
            quality = 1;
            baseXp = 0;
        } else if (answer === 'hard') {
            quality = 3;
            isCorrect = true;
            baseXp = 5;
        } else if (answer === 'good') {
            quality = 4;
            isCorrect = true;
            baseXp = 10;
        } else {
            quality = 5;
            isCorrect = true;
            baseXp = 15;
        }

        // Track missed cards for review missed action & handle combo streaks
        if (!isCorrect) {
            this.missedCardIds.update(set => {
                const next = new Set(set);
                next.add(card.id);
                return next;
            });
            this.currentCombo.set(0);
            this.cardFeedback.set('wrong');
        } else {
            const newCombo = this.currentCombo() + 1;
            this.currentCombo.set(newCombo);
            if (newCombo > this.maxCombo()) {
                this.maxCombo.set(newCombo);
            }

            // Streak combo bonus calculation
            let comboBonus = 0;
            if (newCombo >= 10) {
                comboBonus = 10;
            } else if (newCombo >= 5) {
                comboBonus = 5;
            } else if (newCombo >= 3) {
                comboBonus = 2;
            }

            const totalXp = baseXp + comboBonus;
            this.gamification.addXP(totalXp);
            this.sessionEarnedXp.update(prev => prev + totalXp);

            // Trigger floating XP pop-up
            if (this.floatingXpTimer) {
                clearTimeout(this.floatingXpTimer);
            }
            this.floatingXp.set({
                id: ++this.floatingXpCounter,
                text: `+${totalXp} XP`,
                bonus: comboBonus > 0
            });
            this.floatingXpTimer = setTimeout(() => {
                this.floatingXp.set(null);
            }, 950);

            this.cardFeedback.set('success');
        }

        // Record SRS review for daily missions & stats
        this.gamification.recordSRSReview();

        this.sessionStats.update(prev => ({
            total: prev.total + 1,
            correct: isCorrect ? prev.correct + 1 : prev.correct,
            incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
        }));

        // Update vocabulary using SM-2 algorithm
        this.vocab.markReviewedSRS(card.id, quality);

        // Update daily progress
        this.vocab.incrementDailyProgress();

        // Failed card recycling: append to end of session queue
        if (answer === 'wrong') {
            this.studyCards.update(cards => [
                ...cards,
                card
            ]);
        }

        this.swipeOffset.set(0);
        this.audioService.stopAudio();

        this.isGradingCard.set(true);

        // Tactile micro-delay (220ms) for snappy visual feedback before advancing card
        if (this.gradeDelayTimer) {
            clearTimeout(this.gradeDelayTimer);
        }
        this.gradeDelayTimer = setTimeout(() => {
            this.cardFeedback.set(null);

            // Next card or complete
            if (this.currentIndex() < this.studyCards().length - 1) {
                this.currentIndex.update(i => i + 1);
                this.isAnswerRevealed.set(false);
                this.peekReading.set(false);
            } else {
                this.stopTimer();
                this.isStudying.set(false);
                this.isComplete.set(true);
                this.streak.recordActivity().then(() => {
                    this.showStreakToast();
                });
                this.triggerConfetti();
            }
            this.isGradingCard.set(false);
        }, 220);
    }

    private showStreakToast(): void {
        const result = this.streak.lastActivityResult();
        const streakCount = this.streak.currentStreak();
        if (!result && streakCount <= 0) return;

        let message = '';
        if (result?.isNewRecord) {
            message = `${this.i18n.t('streak.newRecord') || 'New Streak Record! 🔥'} ${this.i18n.t('streak.daysReached', { count: streakCount })}`;
        } else if (result?.freezeUsed) {
            message = `${this.i18n.t('streak.saved') || 'Streak Saved! ❄️'} ${this.i18n.t('streak.freezeUsed') || 'You used a streak freeze.'}`;
        } else {
            message = `${this.i18n.t('streak.extended') || 'Streak Extended! 🔥'} ${this.i18n.t('streak.onStreak', { count: streakCount })}`;
        }

        this.toast.show(message, {
            type: 'warning',
            icon: 'fire',
            duration: 4000
        });
    }

    reviewMissedCards(): void {
        const missedIds = this.missedCardIds();
        if (missedIds.size === 0) return;

        const missedItems = this.vocab.vocabulary().filter(v => missedIds.has(v.id));
        if (missedItems.length === 0) return;

        this.studyCards.set(missedItems);
        this.initialCardCount.set(missedItems.length);
        this.missedCardIds.set(new Set());
        this.currentIndex.set(0);
        this.isAnswerRevealed.set(false);
        this.peekReading.set(false);
        this.isStudying.set(true);
        this.isComplete.set(false);
        this.sessionStats.set({ total: 0, correct: 0, incorrect: 0 });
        this.currentCombo.set(0);
        this.floatingXp.set(null);
        this.cardFeedback.set(null);
        this.isGradingCard.set(false);
        this.swipeOffset.set(0);

        this.sessionStartTime.set(new Date());
        this.elapsedSeconds.set(0);
        this.startTimer();
    }

    endSession(): void {
        this.stopTimer();
        this.audioService.stopAudio();
        this.isStudying.set(false);
        this.isComplete.set(false);
        this.showConfetti.set(false);
        this.swipeOffset.set(0);
        this.isSwiping.set(false);
    }

    resetSession(): void {
        this.isComplete.set(false);
        this.showConfetti.set(false);
        this.startSession();
    }

    private startTimer(): void {
        this.timerInterval = setInterval(() => {
            this.elapsedSeconds.update(s => s + 1);
        }, 1000);
    }

    private stopTimer(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    private triggerConfetti(): void {
        this.showConfetti.set(true);
        if (this.confettiTimeout) {
            clearTimeout(this.confettiTimeout);
        }
        this.confettiTimeout = setTimeout(() => {
            this.showConfetti.set(false);
            this.confettiTimeout = null;
        }, 3000);
    }

    onTouchStart(event: TouchEvent): void {
        if (!this.isStudying()) return;
        if ((event.target as HTMLElement)?.closest('.card-action-interactive')) {
            this.isCardTouchActive = false;
            return;
        }
        this.isCardTouchActive = true;
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
        this.touchMoved = false;
    }

    onTouchMove(event: TouchEvent): void {
        if (!this.isCardTouchActive || !this.touchStartX || !this.touchStartY) return;

        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;
        const deltaX = currentX - this.touchStartX;
        const deltaY = Math.abs(currentY - this.touchStartY);

        if (Math.abs(deltaX) > 10 || deltaY > 10) {
            this.touchMoved = true;
        }

        if (this.isAnswerRevealed()) {
            if (deltaY > 60) {
                this.isSwiping.set(false);
                this.swipeOffset.set(0);
                return;
            }
            if (Math.abs(deltaX) > 10) {
                this.isSwiping.set(true);
                this.swipeOffset.set(deltaX);
            }
        }
    }

    onTouchEnd(event?: TouchEvent): void {
        this.lastTouchEndTime = Date.now();
        if (!this.isCardTouchActive) return;
        this.isCardTouchActive = false;

        if ((event?.target as HTMLElement)?.closest('.card-action-interactive')) {
            return;
        }

        if (this.isSwiping()) {
            this.isSwiping.set(false);
            const offset = this.swipeOffset();
            const threshold = 75;

            if (offset < -threshold) {
                this.markAnswer('wrong');
                return;
            } else if (offset > threshold) {
                this.markAnswer('good');
                return;
            } else {
                this.swipeOffset.set(0);
            }
        }

        if (!this.touchMoved) {
            this.flipCard();
        }
    }

    onTouchCancel(): void {
        this.isCardTouchActive = false;
        this.isSwiping.set(false);
        this.swipeOffset.set(0);
        this.touchMoved = false;
    }
}
