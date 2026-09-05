import { Injectable, signal, inject, NgZone } from '@angular/core';
import { YoutubeService } from '../../youtube.service';
import {
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
        zone?: 'left' | 'right' | 'center';
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
        initialVideoTime: 0
    };

    private lastTapZone: 'left' | 'right' | null = null;
    private lastTapTime = 0;
    private pendingTapTimeout: ReturnType<typeof setTimeout> | null = null;
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
    handleTouchStart(event: TouchEvent): void {
        if (event.touches.length !== 1) return;

        const touch = event.touches[0];
        this.touchState = {
            startX: touch.clientX,
            startY: touch.clientY,
            startTime: Date.now(),
            hasMoved: false,
            initialVideoTime: this.youtube.currentTime()
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
            this.clearPendingTap();
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
     * @returns GestureEvent or null if buffered / no action taken
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

        // Handle tap with spatial zoning
        return this.handleTap(containerRect);
    }

    // ========================================
    // TAP DETECTION (Spatial Zoning)
    // ========================================

    /**
     * Process tap with spatial zones:
     * - Center (40% width): Instant single-tap (0ms lag, no delay)
     * - Left / Right Wings (30% width each): Double-tap seek with 250ms single-tap buffer
     */
    private handleTap(containerRect: DOMRect): GestureEvent | null {
        const x = this.touchState.startX - containerRect.left;
        const width = containerRect.width;
        const now = Date.now();

        // Determine zone:
        // Left 35%: rewind wing
        // Right 35%: forward wing
        // Center 30%: zero-latency controls toggle
        let zone: 'left' | 'right' | 'center';
        if (x < width * 0.35) {
            zone = 'left';
        } else if (x > width * 0.65) {
            zone = 'right';
        } else {
            zone = 'center';
        }

        // 1. CENTER: Zero-latency instant single tap!
        if (zone === 'center') {
            this.clearPendingTap();
            this.lastTapZone = null;
            const event: GestureEvent = {
                type: 'single-tap',
                data: { zone: 'center' }
            };
            this.onGesture?.(event);
            return event;
        }

        // 2. WINGS: Double-tap detection
        const isDoubleTap = this.lastTapZone === zone && (now - this.lastTapTime < 300);

        if (isDoubleTap) {
            // Second (or third) tap of double-tap sequence!
            this.clearPendingTap();
            this.lastTapTime = now;

            const seekSeconds = SEEK_STEP;
            if (zone === 'left') {
                this.youtube.seekRelative(-seekSeconds);
            } else {
                this.youtube.seekRelative(seekSeconds);
            }

            // Accumulate seek for feedback animation (+10s, +20s, +30s)
            if (this.seekDirection() === zone) {
                this.seekAccumulator.update(v => v + seekSeconds);
            } else {
                this.seekAccumulator.set(seekSeconds);
                this.seekDirection.set(zone);
            }

            const event: GestureEvent = {
                type: zone === 'left' ? 'double-tap-left' : 'double-tap-right',
                data: { zone, seconds: SEEK_STEP }
            };
            this.onGesture?.(event);
            return event;
        }

        // First tap on a wing: buffer for 250ms before triggering single-tap
        this.clearPendingTap();
        this.lastTapZone = zone;
        this.lastTapTime = now;

        this.pendingTapTimeout = setTimeout(() => {
            this.pendingTapTimeout = null;
            this.lastTapZone = null;
            this.seekAccumulator.set(0);
            this.seekDirection.set(null);

            this.ngZone.run(() => {
                this.onGesture?.({
                    type: 'single-tap',
                    data: { zone }
                });
            });
        }, 250);

        return null;
    }

    private clearPendingTap(): void {
        if (this.pendingTapTimeout) {
            clearTimeout(this.pendingTapTimeout);
            this.pendingTapTimeout = null;
        }
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
        this.clearPendingTap();
        this.gestureSeekActive.set(false);
    }
}
