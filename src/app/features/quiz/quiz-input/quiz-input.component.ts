import { Component, ChangeDetectionStrategy, inject, signal, effect, computed, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService, QuestionState } from '../../video/quiz.service'; // Adjust import path
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
export class QuizInputComponent {
    quiz = inject(QuizService);

    @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;

    inputValue = signal('');
    isShake = signal(false);

    stateClass = computed(() => {
        switch (this.quiz.questionState()) {
            case 'success': return 'is-success';
            case 'failed': return 'is-error';
            case 'listening': return 'is-listening';
            default: return '';
        }
    });

    constructor() {
        // Focus input when answering state begins
        effect(() => {
            if (this.quiz.questionState() === 'answering') {
                setTimeout(() => {
                    this.inputField?.nativeElement?.focus();
                }, 100);
            } else if (this.quiz.questionState() === 'success') {
                // Clear input on success (after delay handles in service usually, but good to reset UI)
                // setTimeout(() => this.inputValue.set(''), 1000); 
                // Actually, keep it to show what they typed? Let service reset it on next question.
            } else if (this.quiz.questionState() === 'waiting') {
                this.inputValue.set('');
            }
        });
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
        setTimeout(() => this.inputField?.nativeElement?.focus(), 100);
    }

    private triggerShake(): void {
        this.isShake.set(true);
        setTimeout(() => this.isShake.set(false), 400);
    }
}
