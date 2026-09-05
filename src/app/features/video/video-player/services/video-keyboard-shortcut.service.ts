import { Injectable, inject } from '@angular/core';
import { YoutubeService } from '../../youtube.service';
import { QuizService } from '../../quiz.service';
import { SEEK_STEP, ARROW_SEEK_STEP, FRAME_STEP } from '../video-player.constants';
import { Subject } from 'rxjs';

export type KeyboardShortcutEvent =
    | { type: 'toggle-play' }
    | { type: 'seek'; data: { direction: 'left' | 'right'; seconds: number } }
    | { type: 'adjust-volume'; data: { amount: number } }
    | { type: 'toggle-mute' }
    | { type: 'toggle-fullscreen'; data: { action: 'close-popup' | 'exit-fullscreen' | 'toggle' } }
    | { type: 'adjust-speed'; data: { action: 'decrease' | 'increase' } }
    | { type: 'toggle-captions' }
    | { type: 'playlist-next' }
    | { type: 'playlist-prev' }
    | { type: 'step-frame'; data: { seconds: number } }
    | { type: 'toggle-shortcuts-dialog' }
    | { type: 'toggle-subtitle-position' };

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

        const target = event.target as HTMLElement | null;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) {
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

        // Help dialog ('?' or 'Shift + /')
        if (event.key === '?' || (event.shiftKey && event.code === 'Slash')) {
            event.preventDefault();
            this.eventSubject.next({ type: 'toggle-shortcuts-dialog' });
            return true;
        }

        switch (event.code) {
            case 'Space':
            case 'KeyK':
                event.preventDefault();
                this.eventSubject.next({ type: 'toggle-play' });
                return true;

            // ArrowLeft: Fine seek (-5s, YouTube standard)
            case 'ArrowLeft':
                event.preventDefault();
                if (this.quiz.isActive()) {
                    this.quiz.replaySegment();
                } else {
                    this.eventSubject.next({ type: 'seek', data: { direction: 'left', seconds: -ARROW_SEEK_STEP } });
                }
                return true;

            // ArrowRight: Fine seek (+5s, YouTube standard)
            case 'ArrowRight':
                event.preventDefault();
                if (this.quiz.isActive()) {
                    this.quiz.skipQuestion();
                } else {
                    this.eventSubject.next({ type: 'seek', data: { direction: 'right', seconds: ARROW_SEEK_STEP } });
                }
                return true;

            // KeyJ: Medium seek jump (-10s, YouTube standard)
            case 'KeyJ':
                event.preventDefault();
                if (this.quiz.isActive()) {
                    this.quiz.replaySegment();
                } else {
                    this.eventSubject.next({ type: 'seek', data: { direction: 'left', seconds: -SEEK_STEP } });
                }
                return true;

            // KeyL: Medium seek jump (+10s, YouTube standard)
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

            // Captions toggle (YouTube 'c' key)
            case 'KeyC':
                event.preventDefault();
                this.eventSubject.next({ type: 'toggle-captions' });
                return true;

            // Playlist Next (Shift + N)
            case 'KeyN':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.eventSubject.next({ type: 'playlist-next' });
                    return true;
                }
                break;

            // Playlist Previous (Shift + P)
            case 'KeyP':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.eventSubject.next({ type: 'playlist-prev' });
                    return true;
                }
                break;

            // Toggle Subtitle Position in Fullscreen (V)
            case 'KeyV':
                if (isFullscreen) {
                    event.preventDefault();
                    this.eventSubject.next({ type: 'toggle-subtitle-position' });
                    return true;
                }
                break;

            // Jump to 0% - 90% (supports both Digit and Numpad)
            case 'Digit0':
            case 'Digit1':
            case 'Digit2':
            case 'Digit3':
            case 'Digit4':
            case 'Digit5':
            case 'Digit6':
            case 'Digit7':
            case 'Digit8':
            case 'Digit9':
            case 'Numpad0':
            case 'Numpad1':
            case 'Numpad2':
            case 'Numpad3':
            case 'Numpad4':
            case 'Numpad5':
            case 'Numpad6':
            case 'Numpad7':
            case 'Numpad8':
            case 'Numpad9': {
                event.preventDefault();
                const numMatch = event.code.match(/^(?:Digit|Numpad)(\d)$/);
                if (numMatch) {
                    const num = parseInt(numMatch[1], 10);
                    this.youtube.seekTo((num / 10) * this.youtube.duration());
                    return true;
                }
                break;
            }

            case 'Home':
                event.preventDefault();
                this.youtube.seekTo(0);
                return true;

            case 'End':
                event.preventDefault();
                this.youtube.seekTo(this.youtube.duration());
                return true;

            // Comma: '<' (Shift+,) decreases speed, ',' paused steps 1 frame backward
            case 'Comma':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.eventSubject.next({ type: 'adjust-speed', data: { action: 'decrease' } });
                    return true;
                } else if (!this.youtube.intendedPlayingState()) {
                    event.preventDefault();
                    this.eventSubject.next({ type: 'step-frame', data: { seconds: -FRAME_STEP } });
                    return true;
                }
                break;

            // Period: '>' (Shift+.) increases speed, '.' paused steps 1 frame forward
            case 'Period':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.eventSubject.next({ type: 'adjust-speed', data: { action: 'increase' } });
                    return true;
                } else if (!this.youtube.intendedPlayingState()) {
                    event.preventDefault();
                    this.eventSubject.next({ type: 'step-frame', data: { seconds: FRAME_STEP } });
                    return true;
                }
                break;
        }

        return false;
    }
}
