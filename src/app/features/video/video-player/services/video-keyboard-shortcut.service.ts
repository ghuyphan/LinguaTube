import { Injectable, inject } from '@angular/core';
import { YoutubeService } from '../../youtube.service';
import { QuizService } from '../../quiz.service';
import { SEEK_STEP } from '../video-player.constants';
import { Subject } from 'rxjs';

export interface KeyboardShortcutEvent {
    type: 'toggle-play' | 'seek' | 'adjust-volume' | 'toggle-mute' | 'toggle-fullscreen' | 'adjust-speed';
    data?: any;
}

@Injectable({
    providedIn: 'root'
})
export class VideoKeyboardShortcutService {
    private youtube = inject(YoutubeService);
    // We can inject quiz service directly if it's provided in root
    private quiz = inject(QuizService);

    private eventSubject = new Subject<KeyboardShortcutEvent>();
    events$ = this.eventSubject.asObservable();

    handleKeyDown(event: KeyboardEvent, isFsPopupVisible: boolean, isFullscreen: boolean): boolean {
        if (!this.youtube.currentVideo()) return false;

        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
            return false;
        }

        if (event.code === 'Escape') {
            if (isFsPopupVisible) {
                this.eventSubject.next({ type: 'toggle-fullscreen', data: { action: 'close-popup' } });
                return true;
            }
            if (isFullscreen) {
                this.eventSubject.next({ type: 'toggle-fullscreen', data: { action: 'exit-fullscreen' } });
                return true;
            }
            return false;
        }

        switch (event.code) {
            case 'Space':
            case 'KeyK':
                event.preventDefault();
                this.eventSubject.next({ type: 'toggle-play' });
                return true;

            case 'ArrowLeft':
            case 'KeyJ':
                event.preventDefault();
                if (this.quiz.isActive()) {
                    this.quiz.replaySegment();
                } else {
                    this.eventSubject.next({ type: 'seek', data: { direction: 'left', seconds: -SEEK_STEP } });
                }
                return true;

            case 'ArrowRight':
            case 'KeyL':
                event.preventDefault();
                if (this.quiz.isActive()) {
                    this.quiz.skipQuestion();
                } else {
                    this.eventSubject.next({ type: 'seek', data: { direction: 'right', seconds: SEEK_STEP } });
                }
                return true;

            case 'ArrowUp':
                event.preventDefault();
                this.eventSubject.next({ type: 'adjust-volume', data: { amount: 5 } });
                return true;

            case 'ArrowDown':
                event.preventDefault();
                this.eventSubject.next({ type: 'adjust-volume', data: { amount: -5 } });
                return true;

            case 'KeyM':
                event.preventDefault();
                this.eventSubject.next({ type: 'toggle-mute' });
                return true;

            case 'KeyF':
                event.preventDefault();
                this.eventSubject.next({ type: 'toggle-fullscreen', data: { action: 'toggle' } });
                return true;

            case 'Digit0':
            case 'Numpad0':
                event.preventDefault();
                this.youtube.seekTo(0);
                return true;

            case 'Digit1':
            case 'Digit2':
            case 'Digit3':
            case 'Digit4':
            case 'Digit5':
            case 'Digit6':
            case 'Digit7':
            case 'Digit8':
            case 'Digit9':
                event.preventDefault();
                const num = parseInt(event.code.replace('Digit', ''));
                this.youtube.seekTo((num / 10) * this.youtube.duration());
                return true;

            case 'Home':
                event.preventDefault();
                this.youtube.seekTo(0);
                return true;

            case 'End':
                event.preventDefault();
                this.youtube.seekTo(this.youtube.duration());
                return true;

            case 'Comma':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.eventSubject.next({ type: 'adjust-speed', data: { action: 'decrease' } });
                    return true;
                }
                break;

            case 'Period':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.eventSubject.next({ type: 'adjust-speed', data: { action: 'increase' } });
                    return true;
                }
                break;
        }

        return false;
    }
}
