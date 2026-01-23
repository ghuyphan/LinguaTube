import { Component, ChangeDetectionStrategy, inject, signal, effect, computed, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService, QuestionState } from '../../video/quiz.service';
import { I18nService } from '../../../core/services/i18n.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-quiz-input',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, IconComponent],
    animations: [
        trigger('shake', [
            transition('* => true', [
                animate('0.4s ease-in-out', keyframes([
                    style({ transform: 'translateX(0)', offset: 0 }),
                    style({ transform: 'translateX(-10px)', offset: 0.2 }),
                    style({ transform: 'translateX(10px)', offset: 0.4 }),
                    style({ transform: 'translateX(-10px)', offset: 0.6 }),
                    style({ transform: 'translateX(10px)', offset: 0.8 }),
                    style({ transform: 'translateX(0)', offset: 1.0 })
                ]))
            ])
        ]),
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ],
    templateUrl: './quiz-input.component.html',
    styleUrl: './quiz-input.component.scss'
})
export class QuizInputComponent implements OnDestroy {
    quiz = inject(QuizService);
    i18n = inject(I18nService);

    @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;

    inputValue = signal('');
    isShake = signal(false);

    // Track timeouts for cleanup
    private timeouts: ReturnType<typeof setTimeout>[] = [];

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
                this.scheduleTimeout(() => {
                    this.inputField?.nativeElement?.focus();
                }, 100);
            } else if (state === 'success') {
                // Clear input after brief delay so user sees their correct answer
                this.scheduleTimeout(() => this.inputValue.set(''), 800);
            } else if (state === 'waiting' || state === 'listening') {
                // Clear immediately when starting new question
                this.inputValue.set('');
            }
        });
    }

    ngOnDestroy(): void {
        // Clear all pending timeouts
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts = [];
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
        this.inputField?.nativeElement?.focus();
    }

    toggleMode(): void {
        const newMode = this.quiz.mode() === 'dictation' ? 'translation' : 'dictation';
        this.quiz.switchMode(newMode);
        // Refocus input
        this.scheduleTimeout(() => this.inputField?.nativeElement?.focus(), 100);
    }

    onRetry(): void {
        // Reset to answering state so user can try again
        this.quiz.retryQuestion();
        this.inputValue.set('');
        this.scheduleTimeout(() => this.inputField?.nativeElement?.focus(), 100);
    }

    private triggerShake(): void {
        this.isShake.set(true);
        this.scheduleTimeout(() => this.isShake.set(false), 400);
    }

    private scheduleTimeout(callback: () => void, delay: number): void {
        const id = setTimeout(() => {
            callback();
            // Remove from tracked list after execution
            this.timeouts = this.timeouts.filter(t => t !== id);
        }, delay);
        this.timeouts.push(id);
    }
}
