import { Injectable, inject, PLATFORM_ID, NgZone, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { YoutubeService } from '../../features/video/youtube.service';
import { QuizService } from '../../features/video/quiz.service';
import { SEEK_STEP, ARROW_SEEK_STEP, FRAME_STEP } from '../../features/video/video-player/video-player.constants';

export type KeyboardShortcutEvent =
    | { type: 'open-command-palette' }
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
    | { type: 'toggle-subtitle-position' }
    | { type: 'nudge-subtitle-position'; data: { direction: 'up' | 'down' } }
    | { type: 'cycle-font-size' }
    | { type: 'toggle-dual-subtitles' }
    | { type: 'toggle-miniplayer' }
    | { type: 'toggle-cue-loop' }
    | { type: 'study-flip' }
    | { type: 'study-rate'; data: { rating: 'wrong' | 'hard' | 'good' | 'easy' } }
    | { type: 'study-audio' };

@Injectable({
    providedIn: 'root'
})
export class KeyboardShortcutService implements OnDestroy {
    private platformId = inject(PLATFORM_ID);
    private ngZone = inject(NgZone);
    private youtube = inject(YoutubeService);
    private quiz = inject(QuizService);

    private eventSubject = new Subject<KeyboardShortcutEvent>();
    readonly events$: Observable<KeyboardShortcutEvent> = this.eventSubject.asObservable();

    private isListening = false;
    private boundKeyDown: ((e: KeyboardEvent) => void) | null = null;
    private boundResize: (() => void) | null = null;

    // Optional context providers
    private fsPopupVisibleCheck: (() => boolean) | null = null;
    private studyActiveCheck: (() => boolean) | null = null;

    constructor() {
        if (!isPlatformBrowser(this.platformId)) return;
        this.setupListeners();
    }

    ngOnDestroy(): void {
        this.teardownListeners();
    }

    /**
     * Set a callback to check if flashcard study mode is currently active
     */
    setStudyActiveCallback(fn: (() => boolean) | null): void {
        this.studyActiveCheck = fn;
    }

    /**
     * Set a callback to check if a fullscreen popup/dialog is currently visible
     */
    setFsPopupVisibleCallback(fn: (() => boolean) | null): void {
        this.fsPopupVisibleCheck = fn;
    }

    /**
     * Determines whether the current device is touch-primary or mobile viewport.
     * Mobile/touch devices do not require persistent keyboard event listeners.
     */
    isTouchDevice(): boolean {
        if (!isPlatformBrowser(this.platformId)) return true;
        const hasCoarsePointer = window.matchMedia?.('(pointer: coarse) and (hover: none)')?.matches ?? false;
        const isMobileViewport = (window.innerWidth <= 768 || window.innerHeight <= 500);
        return hasCoarsePointer || isMobileViewport;
    }

    /**
     * Sets up responsive listener management outside NgZone to avoid change detection thrashing.
     */
    private setupListeners(): void {
        this.boundKeyDown = (e: KeyboardEvent) => this.onKeyDown(e);
        this.boundResize = () => this.syncListenerState();

        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('resize', this.boundResize!, { passive: true });
        });

        this.syncListenerState();
    }

    /**
     * Attaches or detaches the keydown listener based on device mode (zero mobile overhead).
     */
    private syncListenerState(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        if (this.isTouchDevice()) {
            if (this.isListening) {
                document.removeEventListener('keydown', this.boundKeyDown!);
                this.isListening = false;
            }
        } else {
            if (!this.isListening && this.boundKeyDown) {
                this.ngZone.runOutsideAngular(() => {
                    document.addEventListener('keydown', this.boundKeyDown!, { passive: false });
                });
                this.isListening = true;
            }
        }
    }

    private teardownListeners(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        if (this.isListening && this.boundKeyDown) {
            document.removeEventListener('keydown', this.boundKeyDown);
            this.isListening = false;
        }
        if (this.boundResize) {
            window.removeEventListener('resize', this.boundResize);
            this.boundResize = null;
        }
    }

    /**
     * Handles keyboard events directly. Can be called manually or via window listener.
     * Returns true if the event was recognized and handled.
     */
    handleKeyDown(event: KeyboardEvent, isFsPopupVisible?: boolean, isFullscreen?: boolean): boolean {
        // 1. Global shortcut: Cmd/Ctrl + K (Command Palette) - works even when inputs are not focused
        if ((event.metaKey || event.ctrlKey) && (event.key === 'k' || event.key === 'K')) {
            event.preventDefault();
            this.emitEvent({ type: 'open-command-palette' });
            return true;
        }

        // 2. Ignore all shortcut keys when user is typing inside input, textarea, select, or editable element
        const target = event.target as HTMLElement | null;
        if (target && (
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.isContentEditable ||
            target.closest('input, textarea, select, [contenteditable="true"]')
        )) {
            return false;
        }

        // 3. Resolve Fullscreen State
        const doc = typeof document !== 'undefined' ? (document as unknown as { fullscreenElement?: Element; webkitFullscreenElement?: Element }) : null;
        const activeFullscreen = isFullscreen ?? !!(doc?.fullscreenElement || doc?.webkitFullscreenElement);
        const activeFsPopup = isFsPopupVisible ?? (this.fsPopupVisibleCheck ? this.fsPopupVisibleCheck() : false);

        // 4. Escape handling
        if (event.code === 'Escape') {
            if (activeFsPopup) {
                this.emitEvent({ type: 'toggle-fullscreen', data: { action: 'close-popup' } });
                return true;
            }
            if (activeFullscreen) {
                this.emitEvent({ type: 'toggle-fullscreen', data: { action: 'exit-fullscreen' } });
                return true;
            }
            return false;
        }

        // 4.5 Study Mode Shortcuts (Active when reviewing flashcards)
        if (this.studyActiveCheck && this.studyActiveCheck()) {
            if (event.code === 'Space' || event.code === 'Enter') {
                event.preventDefault();
                this.emitEvent({ type: 'study-flip' });
                return true;
            }
            if (event.code === 'KeyR') {
                event.preventDefault();
                this.emitEvent({ type: 'study-audio' });
                return true;
            }
            if (event.key === '1' || event.code === 'Digit1' || event.code === 'Numpad1') {
                event.preventDefault();
                this.emitEvent({ type: 'study-rate', data: { rating: 'wrong' } });
                return true;
            }
            if (event.key === '2' || event.code === 'Digit2' || event.code === 'Numpad2') {
                event.preventDefault();
                this.emitEvent({ type: 'study-rate', data: { rating: 'hard' } });
                return true;
            }
            if (event.key === '3' || event.code === 'Digit3' || event.code === 'Numpad3') {
                event.preventDefault();
                this.emitEvent({ type: 'study-rate', data: { rating: 'good' } });
                return true;
            }
            if (event.key === '4' || event.code === 'Digit4' || event.code === 'Numpad4') {
                event.preventDefault();
                this.emitEvent({ type: 'study-rate', data: { rating: 'easy' } });
                return true;
            }
        }

        // 5. Video Playback Shortcuts (requires active video)
        if (!this.youtube.currentVideo()) return false;

        switch (event.code) {
            case 'Space':
            case 'KeyK':
                event.preventDefault();
                this.emitEvent({ type: 'toggle-play' });
                return true;

            // ArrowLeft: Fine seek (-5s, YouTube standard)
            case 'ArrowLeft':
                event.preventDefault();
                if (this.quiz.isActive()) {
                    this.quiz.replaySegment();
                } else {
                    this.emitEvent({ type: 'seek', data: { direction: 'left', seconds: -ARROW_SEEK_STEP } });
                }
                return true;

            // ArrowRight: Fine seek (+5s, YouTube standard)
            case 'ArrowRight':
                event.preventDefault();
                if (this.quiz.isActive()) {
                    this.quiz.skipQuestion();
                } else {
                    this.emitEvent({ type: 'seek', data: { direction: 'right', seconds: ARROW_SEEK_STEP } });
                }
                return true;

            // KeyJ: Medium seek jump (-10s, YouTube standard)
            case 'KeyJ':
                event.preventDefault();
                if (this.quiz.isActive()) {
                    this.quiz.replaySegment();
                } else {
                    this.emitEvent({ type: 'seek', data: { direction: 'left', seconds: -SEEK_STEP } });
                }
                return true;

            // KeyL: Medium seek jump (+10s, YouTube standard) OR Shift+L: Toggle cue loop
            case 'KeyL':
                event.preventDefault();
                if (event.shiftKey) {
                    // Shift+L: Subtitle cue looping (cleanly separated from Seek +10s!)
                    this.emitEvent({ type: 'toggle-cue-loop' });
                } else if (this.quiz.isActive()) {
                    this.quiz.skipQuestion();
                } else {
                    this.emitEvent({ type: 'seek', data: { direction: 'right', seconds: SEEK_STEP } });
                }
                return true;

            case 'ArrowUp':
                event.preventDefault();
                this.emitEvent({ type: 'adjust-volume', data: { amount: 5 } });
                return true;

            case 'ArrowDown':
                event.preventDefault();
                this.emitEvent({ type: 'adjust-volume', data: { amount: -5 } });
                return true;

            case 'KeyM':
                event.preventDefault();
                this.emitEvent({ type: 'toggle-mute' });
                return true;

            case 'KeyF':
                event.preventDefault();
                this.emitEvent({ type: 'toggle-fullscreen', data: { action: 'toggle' } });
                return true;

            // Miniplayer toggle (YouTube standard 'i' key)
            case 'KeyI':
                event.preventDefault();
                this.emitEvent({ type: 'toggle-miniplayer' });
                return true;

            // Captions toggle (YouTube 'c' key)
            case 'KeyC':
                event.preventDefault();
                this.emitEvent({ type: 'toggle-captions' });
                return true;

            // Playlist Next (Shift + N)
            case 'KeyN':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.emitEvent({ type: 'playlist-next' });
                    return true;
                }
                break;

            // Playlist Previous (Shift + P)
            case 'KeyP':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.emitEvent({ type: 'playlist-prev' });
                    return true;
                }
                break;

            // Toggle Subtitle Position in Fullscreen (V)
            case 'KeyV':
                if (activeFullscreen) {
                    event.preventDefault();
                    this.emitEvent({ type: 'toggle-subtitle-position' });
                    return true;
                }
                break;

            // Nudge Subtitle Position in Fullscreen ([ / ])
            case 'BracketLeft':
                if (activeFullscreen) {
                    event.preventDefault();
                    this.emitEvent({ type: 'nudge-subtitle-position', data: { direction: 'up' } });
                    return true;
                }
                break;

            case 'BracketRight':
                if (activeFullscreen) {
                    event.preventDefault();
                    this.emitEvent({ type: 'nudge-subtitle-position', data: { direction: 'down' } });
                    return true;
                }
                break;

            // Toggle Dual Subtitles (D)
            case 'KeyD':
                event.preventDefault();
                this.emitEvent({ type: 'toggle-dual-subtitles' });
                return true;

            // Cycle Subtitle Font Size (Shift + S)
            case 'KeyS':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.emitEvent({ type: 'cycle-font-size' });
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
                    this.emitEvent({ type: 'adjust-speed', data: { action: 'decrease' } });
                    return true;
                } else if (!this.youtube.intendedPlayingState()) {
                    event.preventDefault();
                    this.emitEvent({ type: 'step-frame', data: { seconds: -FRAME_STEP } });
                    return true;
                }
                break;

            // Period: '>' (Shift+.) increases speed, '.' paused steps 1 frame forward
            case 'Period':
                if (event.shiftKey) {
                    event.preventDefault();
                    this.emitEvent({ type: 'adjust-speed', data: { action: 'increase' } });
                    return true;
                } else if (!this.youtube.intendedPlayingState()) {
                    event.preventDefault();
                    this.emitEvent({ type: 'step-frame', data: { seconds: FRAME_STEP } });
                    return true;
                }
                break;
        }

        return false;
    }

    private onKeyDown(event: KeyboardEvent): void {
        this.handleKeyDown(event);
    }

    private emitEvent(event: KeyboardShortcutEvent): void {
        this.ngZone.run(() => {
            this.eventSubject.next(event);
        });
    }
}
