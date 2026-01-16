import { Injectable, signal, inject, NgZone } from '@angular/core';
import { YoutubeService } from '../../youtube.service';
import {
    DOUBLE_TAP_DELAY,
    LONG_PRESS_DELAY,
    SWIPE_THRESHOLD,
    GESTURE_SEEK_SENSITIVITY,
    SEEK_STEP
} from '../video-player.constants';

/**
 * Touch state tracking for gesture detection
 */
export interface TouchState {
    startX: number;
    startY: number;
    startTime: number;
    hasMoved: boolean;
    initialVideoTime: number;
    initialVolume: number;
}

/**
 * Gesture events emitted by the service
 */
export type GestureEventType =
    | 'double-tap-left'
    | 'double-tap-right'
    | 'single-tap'
    | 'gesture-seek-complete'
    | 'long-press-start'
    | 'long-press-end';

export interface GestureEvent {
    type: GestureEventType;
    data?: {
        seekTime?: number;
        tapPosition?: { x: number; y: number };
        zone?: 'left' | 'right';
        seconds?: number;
    };
}

/**
 * GestureHandlerService
 * 
 * Handles all touch/gesture interactions for the video player:
 * - Double-tap to seek (left = rewind, right = forward)
 * - Long-press for 2x playback speed
 * - Horizontal swipe for scrubbing/seeking
 * - Single-tap for controls toggle
 * 
 * This service is provided at the component level so it has access
 * to the same YoutubeService instance as the VideoPlayerComponent.
 */
@Injectable()
export class GestureHandlerService {
    private ngZone = inject(NgZone);
    private youtube = inject(YoutubeService);

    // ========================================
    // PUBLIC STATE (Signals)
    // ========================================

    /** Whether gesture seek (horizontal swipe) is currently active */
    readonly gestureSeekActive = signal(false);

    /** Current seek time during gesture scrubbing */
    readonly gestureSeekTime = signal(0);

    /** Whether long-press 2x speed is active */
    readonly longPressActive = signal(false);

    /** Cumulative seek for double-tap feedback (e.g., +10s, +15s) */
    readonly seekAccumulator = signal(0);

    /** Direction of current seek for feedback animation */
    readonly seekDirection = signal<'left' | 'right' | null>(null);

    // ========================================
    // PRIVATE STATE
    // ========================================

    private touchState: TouchState = {
        startX: 0,
        startY: 0,
        startTime: 0,
        hasMoved: false,
        initialVideoTime: 0,
        initialVolume: 0
    };

    private lastTapInfo: { zone: string; time: number } | null = null;
    private longPressTimeout: ReturnType<typeof setTimeout> | null = null;
    private longPressSpeed = 1;

    // ========================================
    // EVENT CALLBACK
    // ========================================

    /** 
     * Callback for parent component to handle gesture events.
     * Set this after injection to receive gesture notifications.
     */
    onGesture: ((event: GestureEvent) => void) | null = null;

    // ========================================
    // TOUCH EVENT HANDLERS
    // ========================================

    /**
     * Handle touch start event on the overlay
     */
    handleTouchStart(event: TouchEvent, getCurrentVolume: () => number): void {
        if (event.touches.length !== 1) return;

        const touch = event.touches[0];
        this.touchState = {
            startX: touch.clientX,
            startY: touch.clientY,
            startTime: Date.now(),
            hasMoved: false,
            initialVideoTime: this.youtube.currentTime(),
            initialVolume: getCurrentVolume()
        };

        // Start long-press detection
        this.cancelLongPress();
        this.longPressTimeout = setTimeout(() => {
            this.activateLongPress();
        }, LONG_PRESS_DELAY);
    }

    /**
     * Handle touch move event on the overlay
     */
    handleTouchMove(event: TouchEvent): void {
        if (event.touches.length !== 1) return;

        const touch = event.touches[0];
        const deltaX = touch.clientX - this.touchState.startX;
        const deltaY = touch.clientY - this.touchState.startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        // Mark as moved if exceeds threshold
        if (absX > SWIPE_THRESHOLD || absY > SWIPE_THRESHOLD) {
            this.touchState.hasMoved = true;
            this.cancelLongPress();
        }

        // Horizontal swipe = seek scrub
        if (this.touchState.hasMoved && absX > absY) {
            if (event.cancelable) event.preventDefault();

            const seekDelta = deltaX * GESTURE_SEEK_SENSITIVITY;
            const newTime = Math.max(0, Math.min(
                this.youtube.duration(),
                this.touchState.initialVideoTime + seekDelta
            ));

            // Update state in zone for change detection
            this.ngZone.run(() => {
                this.gestureSeekActive.set(true);
                this.gestureSeekTime.set(newTime);
            });
        }
    }

    /**
     * Handle touch end event on the overlay
     * @param containerRect - Bounding rect of the video container for zone detection
     * @returns GestureEvent or null if no action taken
     */
    handleTouchEnd(containerRect: DOMRect): GestureEvent | null {
        this.cancelLongPress();
        this.deactivateLongPress();

        // Complete gesture seek
        if (this.gestureSeekActive()) {
            const time = this.gestureSeekTime();
            this.youtube.seekTo(time);
            this.gestureSeekActive.set(false);

            const event: GestureEvent = {
                type: 'gesture-seek-complete',
                data: { seekTime: time }
            };
            this.onGesture?.(event);
            return event;
        }

        // Ignore if moved (was a swipe)
        if (this.touchState.hasMoved) {
            return null;
        }

        // Handle tap
        return this.handleTap(containerRect);
    }

    // ========================================
    // TAP DETECTION
    // ========================================

    /**
     * Process a tap and detect single vs double tap
     */
    private handleTap(containerRect: DOMRect): GestureEvent {
        const x = this.touchState.startX - containerRect.left;
        const zone: 'left' | 'right' = x < containerRect.width * 0.5 ? 'left' : 'right';
        const now = Date.now();

        // Check for double-tap
        if (this.lastTapInfo &&
            this.lastTapInfo.zone === zone &&
            now - this.lastTapInfo.time < DOUBLE_TAP_DELAY) {
            this.lastTapInfo = null;

            // Double-tap: Seek in the tapped direction
            const seekSeconds = SEEK_STEP;
            if (zone === 'left') {
                this.youtube.seekRelative(-seekSeconds);
            } else {
                this.youtube.seekRelative(seekSeconds);
            }

            // Update accumulator for feedback animation
            if (this.seekDirection() === zone) {
                this.seekAccumulator.update(v => v + seekSeconds);
            } else {
                this.seekAccumulator.set(seekSeconds);
                this.seekDirection.set(zone);
            }

            const event: GestureEvent = {
                type: zone === 'left' ? 'double-tap-left' : 'double-tap-right',
                data: { zone, seconds: seekSeconds }
            };
            this.onGesture?.(event);
            return event;
        }

        // Single tap - record for potential double-tap
        this.lastTapInfo = { zone, time: now };

        const event: GestureEvent = {
            type: 'single-tap',
            data: { zone }
        };
        this.onGesture?.(event);
        return event;
    }

    /**
     * Reset seek feedback animation (call after animation ends)
     */
    resetSeekFeedback(): void {
        this.seekAccumulator.set(0);
        this.seekDirection.set(null);
    }

    // ========================================
    // LONG PRESS (2x Speed)
    // ========================================

    private activateLongPress(): void {
        if (!this.youtube.intendedPlayingState()) return;

        this.longPressSpeed = this.youtube.getPlaybackRate();
        this.longPressActive.set(true);
        this.youtube.setPlaybackRate(2);

        this.onGesture?.({ type: 'long-press-start' });
    }

    private deactivateLongPress(): void {
        if (this.longPressActive()) {
            this.youtube.setPlaybackRate(this.longPressSpeed);
            this.longPressActive.set(false);

            this.onGesture?.({ type: 'long-press-end' });
        }
    }

    private cancelLongPress(): void {
        if (this.longPressTimeout) {
            clearTimeout(this.longPressTimeout);
            this.longPressTimeout = null;
        }
    }

    // ========================================
    // CLEANUP
    // ========================================

    /**
     * Clean up any pending timeouts
     */
    destroy(): void {
        this.cancelLongPress();
        this.deactivateLongPress();
        this.gestureSeekActive.set(false);
    }
}
