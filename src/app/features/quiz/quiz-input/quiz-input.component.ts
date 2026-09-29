import { Component, ChangeDetectionStrategy, inject, signal, effect, computed, ElementRef, viewChild, OnDestroy, afterNextRender, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../video/quiz.service';
import { I18nService } from '../../../core/services/i18n.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
    selector: 'app-quiz-input',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, IconComponent],
    templateUrl: './quiz-input.component.html',
    styleUrl: './quiz-input.component.scss'
})
export class QuizInputComponent implements OnDestroy {
    quiz = inject(QuizService);
    i18n = inject(I18nService);
    private injector = inject(Injector);

    readonly inputField = viewChild<ElementRef<HTMLInputElement>>('inputField');

    inputValue = signal('');
    isShake = signal(false);

    private successTimeout: ReturnType<typeof setTimeout> | null = null;
    private shakeTimeout: ReturnType<typeof setTimeout> | null = null;

    stateClass = computed(() => {
        switch (this.quiz.questionState()) {
            case 'success': return 'is-success';
            case 'failed': return 'is-error';
            case 'listening': return 'is-listening';
            default: return '';
        }
    });

    getPlaceholder(): string {
        return this.quiz.mode() === 'dictation' ?
            this.i18n.t('quiz.placeholderDictation') :
            this.i18n.t('quiz.placeholderTranslation');
    }

    constructor() {
        // Focus input when answering state begins
        effect(() => {
            const state = this.quiz.questionState();

            if (state === 'answering') {
                this.focusInput();
            } else if (state === 'success') {
                // Clear input after brief delay so user sees their correct answer
                if (this.successTimeout) {
                    clearTimeout(this.successTimeout);
                }
                this.successTimeout = setTimeout(() => {
                    this.inputValue.set('');
                    this.successTimeout = null;
                }, 800);
            } else if (state === 'waiting' || state === 'listening') {
                this.inputValue.set('');
            }
        });
    }

    ngOnDestroy(): void {
        if (this.successTimeout) {
            clearTimeout(this.successTimeout);
            this.successTimeout = null;
        }
        if (this.shakeTimeout) {
            clearTimeout(this.shakeTimeout);
            this.shakeTimeout = null;
        }
    }

    onSubmit(): void {
        if (!this.inputValue().trim()) return;

        const correct = this.quiz.checkAnswer(this.inputValue());
        if (!correct) {
            this.triggerShake();
        }
    }

    onSkip(): void {
        this.quiz.skipQuestion();
    }

    onReplay(): void {
        this.quiz.playSegment();
        this.focusInput();
    }

    toggleMode(): void {
        const newMode = this.quiz.mode() === 'dictation' ? 'translation' : 'dictation';
        this.quiz.switchMode(newMode);
        this.focusInput();
    }

    onRetry(): void {
        // Reset to answering state so user can try again
        this.quiz.retryQuestion();
        this.inputValue.set('');
        this.focusInput();
    }

    onShakeAnimationEnd(event: AnimationEvent): void {
        if (event.animationName === 'quizShake' || event.animationName === 'shake') {
            if (this.shakeTimeout) {
                clearTimeout(this.shakeTimeout);
                this.shakeTimeout = null;
            }
            this.isShake.set(false);
        }
    }

    private triggerShake(): void {
        this.isShake.set(true);
        if (this.shakeTimeout) {
            clearTimeout(this.shakeTimeout);
        }
        this.shakeTimeout = setTimeout(() => {
            this.isShake.set(false);
            this.shakeTimeout = null;
        }, 450);
    }

    private focusInput(): void {
        afterNextRender(() => {
            this.inputField()?.nativeElement?.focus({ preventScroll: true });
        }, { injector: this.injector });
    }
}
