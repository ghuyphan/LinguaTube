import { Injectable, computed, inject, signal, effect } from '@angular/core';
import { SubtitleCue } from '../../models';
import { SubtitleService, YoutubeService, I18nService } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';

export type QuizMode = 'dictation' | 'translation';
export type QuizState = 'idle' | 'active' | 'completed';
export type QuestionState = 'waiting' | 'listening' | 'answering' | 'success' | 'failed';

export interface QuizStats {
    total: number;
    correct: number;
    streak: number;
}

export interface ComparisonChar {
    char: string;
    isCorrect: boolean;
    isMissing?: boolean;  // Character exists in target but not in input
    isExtra?: boolean;    // Character exists in input but not in target
}

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private subtitleService = inject(SubtitleService);
    private youtubeService = inject(YoutubeService);
    private i18n = inject(I18nService);

    // State
    readonly state = signal<QuizState>('idle');
    readonly mode = signal<QuizMode>('dictation');
    readonly questionState = signal<QuestionState>('waiting');

    readonly currentCue = signal<SubtitleCue | null>(null);
    readonly currentInput = signal('');
    readonly feedbackMessage = signal<string | null>(null);

    readonly stats = signal<QuizStats>({
        total: 0,
        correct: 0,
        streak: 0
    });

    // Comparison result for showing diff on failure
    readonly answerComparison = signal<ComparisonChar[]>([]);
    readonly correctAnswer = signal<string>('');

    // Computed
    readonly isActive = computed(() => this.state() === 'active');
    readonly isListening = computed(() => this.questionState() === 'listening');

    // Computed helper signals for template access
    readonly streak = computed(() => this.stats().streak);
    readonly correctAnswers = computed(() => this.stats().correct);
    readonly totalQuestions = computed(() => this.stats().total);

    private playbackTimeout: ReturnType<typeof setTimeout> | null = null;
    private currentCueIndex = -1;

    constructor() {
        // Effect to monitor video time when listening
        effect(() => {
            if (this.questionState() === 'listening' && this.isActive() && this.currentCue()) {
                const time = this.youtubeService.currentTime();
                const cue = this.currentCue()!;

                // Allow a small buffer (0.1s)
                if (time >= cue.endTime - 0.1) {
                    this.pauseAndPrompt();
                }
            }
        });

        // Cleanup on destroy/inactive not strictly needed due to service lifecycle but good practice to clear timeouts
    }

    startQuiz(mode: QuizMode = 'dictation'): void {
        const currentCue = this.subtitleService.currentCue();
        if (!currentCue) {
            console.warn('Cannot start quiz: no active cue');
            return;
        }

        this.mode.set(mode);
        this.state.set('active');
        this.stats.set({ total: 0, correct: 0, streak: 0 });

        // Start from current cue
        this.currentCueIndex = this.subtitleService.currentCueIndex();
        this.setupQuestion(currentCue);
    }

    switchMode(newMode: QuizMode): void {
        this.mode.set(newMode);
        // Re-setup current question to update prompt/logic
        if (this.currentCue()) {
            this.setupQuestion(this.currentCue()!);
        }
    }

    stopQuiz(): void {
        this.state.set('idle');
        this.questionState.set('waiting');
        this.currentCue.set(null);
        this.clearPlaybackTimeout();
    }

    private setupQuestion(cue: SubtitleCue): void {
        this.currentCue.set(cue);
        this.currentInput.set('');
        this.feedbackMessage.set(null);
        this.questionState.set('waiting'); // Brief wait before playing

        // Auto-play the segment
        this.playSegment();
    }

    playSegment(): void {
        const cue = this.currentCue();
        if (!cue) return;

        this.questionState.set('listening');
        this.youtubeService.seekTo(cue.startTime);
        this.youtubeService.play();
    }

    replaySegment(): void {
        this.playSegment();
    }

    private pauseAndPrompt(): void {
        this.youtubeService.pause();
        this.questionState.set('answering');
    }

    checkAnswer(input: string): boolean {
        const cue = this.currentCue();
        if (!cue) return false;

        this.currentInput.set(input);
        let isCorrect = false;

        // Similarity threshold - 85% match is considered correct
        const SIMILARITY_THRESHOLD = 0.85;

        // Determine the target text based on mode
        let targetText: string;
        if (this.mode() === 'dictation') {
            targetText = cue.text;
        } else {
            const translations = this.subtitleService.cueTranslations();
            targetText = translations.get(cue.id) || '';
        }

        const normalizedInput = this.normalize(input);
        const normalizedTarget = this.normalize(targetText);

        // Use fuzzy matching for better UX
        const similarity = this.calculateSimilarity(normalizedInput, normalizedTarget);
        isCorrect = similarity >= SIMILARITY_THRESHOLD;

        if (isCorrect) {
            this.answerComparison.set([]);
            this.correctAnswer.set('');
            this.handleSuccess();
        } else {
            // Generate comparison for display
            this.correctAnswer.set(targetText);
            this.answerComparison.set(this.generateComparison(input, targetText));
            this.handleFailure();
        }

        return isCorrect;
    }

    private handleSuccess(): void {
        this.questionState.set('success');
        this.stats.update(s => ({
            total: s.total + 1,
            correct: s.correct + 1,
            streak: s.streak + 1
        }));

        // Auto-advance after delay (tracked for cleanup)
        this.clearPlaybackTimeout();
        this.playbackTimeout = setTimeout(() => {
            this.nextQuestion();
        }, 1500);
    }

    private handleFailure(): void {
        this.questionState.set('failed');
        this.stats.update(s => ({
            ...s,
            streak: 0
        }));
        // Allow retry
    }

    nextQuestion(): void {
        const cues = this.subtitleService.subtitles();
        if (this.currentCueIndex < cues.length - 1) {
            this.currentCueIndex++;
            this.setupQuestion(cues[this.currentCueIndex]);
        } else {
            this.finishQuiz();
        }
    }

    skipQuestion(): void {
        this.stats.update(s => ({ ...s, total: s.total + 1, streak: 0 }));
        this.nextQuestion();
    }

    retryQuestion(): void {
        // Reset state to allow user to try again
        this.questionState.set('answering');
        this.currentInput.set('');
        this.answerComparison.set([]);
    }

    private finishQuiz(): void {
        this.state.set('completed');
    }

    private normalize(text: string): string {
        return text.toLowerCase()
            // Remove Western punctuation
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g, "")
            // Remove CJK punctuation (Chinese, Japanese, Korean)
            .replace(/[。、！？「」『』【】（）《》〈〉・：；，""''～…—－]/g, "")
            // Remove Japanese-specific punctuation
            .replace(/[｡､｢｣]/g, "")
            // Normalize all whitespace (including full-width spaces) to single space
            .replace(/[\s\u3000]+/g, " ")
            .trim();
    }

    /**
     * Calculate similarity ratio between two strings (0-1)
     * Uses a simple character-based approach suitable for CJK and Latin text
     */
    private calculateSimilarity(input: string, target: string): number {
        if (target.length === 0) return input.length === 0 ? 1 : 0;
        if (input.length === 0) return 0;

        // For very short strings, be stricter
        if (target.length <= 3) {
            return input === target ? 1 : 0;
        }

        // Levenshtein distance
        const matrix: number[][] = [];
        for (let i = 0; i <= input.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= target.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= input.length; i++) {
            for (let j = 1; j <= target.length; j++) {
                const cost = input[i - 1] === target[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,      // deletion
                    matrix[i][j - 1] + 1,      // insertion
                    matrix[i - 1][j - 1] + cost // substitution
                );
            }
        }

        const distance = matrix[input.length][target.length];
        const maxLength = Math.max(input.length, target.length);
        return 1 - distance / maxLength;
    }

    /**
     * Generate character-by-character comparison for display
     * Shows which characters are correct, wrong, missing, or extra
     */
    private generateComparison(input: string, target: string): ComparisonChar[] {
        const result: ComparisonChar[] = [];

        // Use dynamic programming to find the longest common subsequence
        // This gives us a better alignment than simple character-by-character comparison
        const m = input.length;
        const n = target.length;

        // Build LCS matrix
        const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (input[i - 1] === target[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // Backtrack to find alignment
        let i = m, j = n;
        const alignedPairs: { inputChar: string | null; targetChar: string | null }[] = [];

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && input[i - 1] === target[j - 1]) {
                alignedPairs.unshift({ inputChar: input[i - 1], targetChar: target[j - 1] });
                i--; j--;
            } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
                alignedPairs.unshift({ inputChar: null, targetChar: target[j - 1] });
                j--;
            } else {
                alignedPairs.unshift({ inputChar: input[i - 1], targetChar: null });
                i--;
            }
        }

        // Convert aligned pairs to comparison result
        for (const pair of alignedPairs) {
            if (pair.inputChar !== null && pair.targetChar !== null) {
                // Both present and matching
                result.push({ char: pair.inputChar, isCorrect: true });
            } else if (pair.inputChar !== null && pair.targetChar === null) {
                // Extra character in input (user typed something that shouldn't be there)
                result.push({ char: pair.inputChar, isCorrect: false, isExtra: true });
            } else if (pair.inputChar === null && pair.targetChar !== null) {
                // Missing character (user didn't type something they should have)
                result.push({ char: pair.targetChar, isCorrect: false, isMissing: true });
            }
        }

        return result;
    }

    private clearPlaybackTimeout(): void {
        if (this.playbackTimeout) {
            clearTimeout(this.playbackTimeout);
            this.playbackTimeout = null;
        }
    }
}
