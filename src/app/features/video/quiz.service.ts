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

        if (this.mode() === 'dictation') {
            const normalizedInput = this.normalize(input);
            const normalizedTarget = this.normalize(cue.text);

            // Simple exact match for now, maybe fuzzy later
            isCorrect = normalizedInput === normalizedTarget;
        } else {
            // Translation mode: Check against dual subtitle
            // We access the signal directly from the service
            const translations = this.subtitleService.cueTranslations();
            const targetTranslation = translations.get(cue.id);

            if (targetTranslation) {
                const normalizedInput = this.normalize(input);
                const normalizedTarget = this.normalize(targetTranslation);
                // Fuzzy-ish match: input should be somewhat close or contain key words
                // For strict MVP: exact match (normalized)
                isCorrect = normalizedInput === normalizedTarget;
                // Relaxed: if input is > 50% similar or contains the main words? 
                // Levenshtein distance would be better but simple inclusion might pass for now
                if (!isCorrect && normalizedTarget.length > 5) {
                    isCorrect = normalizedTarget.includes(normalizedInput) && normalizedInput.length > normalizedTarget.length * 0.6;
                }
            } else {
                // Fallback if no translation loaded
                isCorrect = input.length > 2;
            }
        }

        if (isCorrect) {
            this.handleSuccess();
        } else {
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

    private finishQuiz(): void {
        this.state.set('completed');
    }

    private normalize(text: string): string {
        return text.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s{2,}/g, " ")
            .trim();
    }

    private clearPlaybackTimeout(): void {
        if (this.playbackTimeout) {
            clearTimeout(this.playbackTimeout);
            this.playbackTimeout = null;
        }
    }
}
