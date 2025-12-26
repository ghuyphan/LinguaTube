/**
 * Video Player Constants
 * Centralizes all magic numbers and timing constants for the video player component.
 */

// ============================================
// TIMING CONSTANTS (milliseconds)
// ============================================

/** Delay before auto-hiding controls during playback */
export const CONTROLS_AUTO_HIDE_DELAY = 3000;

/** Delay before auto-hiding controls after tap-to-show */
export const CONTROLS_TAP_HIDE_DELAY = 4000;

/** Minimum time controls must be visible before tap-to-hide works */
export const CONTROLS_VISIBLE_MIN_TIME = 500;

/** Time window for detecting double-tap */
export const DOUBLE_TAP_DELAY = 350;

/** Delay before long press activates 2x speed */
export const LONG_PRESS_DELAY = 500;

/** Delay before hiding volume slider */
export const VOLUME_SLIDER_HIDE_DELAY = 500;

/** Interval for tracking buffered progress */
export const BUFFERED_TRACKING_INTERVAL = 1000;

/** Interval for checking element existence */
export const WAIT_ELEMENT_INTERVAL = 50;

/** Max attempts to find element before failing */
export const WAIT_ELEMENT_MAX_ATTEMPTS = 20;

// ============================================
// FEEDBACK DURATIONS (milliseconds)
// ============================================

export const FEEDBACK_DURATION = {
    playPause: 400,
    seek: 800,
    ripple: 600,
    volume: 600,
} as const;

// ============================================
// GESTURE CONSTANTS
// ============================================

/** Seek step in seconds for tap/keyboard seek */
export const SEEK_STEP = 10;

/** Pixels of movement before registering as swipe */
export const SWIPE_THRESHOLD = 20;

/** Seconds of seek per pixel of horizontal swipe */
export const GESTURE_SEEK_SENSITIVITY = 0.15;

// ============================================
// ZONE PERCENTAGES
// ============================================

/** Width percentage for left tap zone */
export const ZONE_LEFT_WIDTH = 0.3;

/** Width percentage for right tap zone */
export const ZONE_RIGHT_WIDTH = 0.7;

/** Width percentage for volume gesture activation zone */
export const VOLUME_GESTURE_ZONE = 0.6;

// ============================================
// FULLSCREEN API TYPES
// ============================================

/**
 * Extended Document interface with vendor-prefixed fullscreen APIs
 */
export interface FullscreenDocument extends Document {
    readonly webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void>;
}

/**
 * Extended HTMLElement interface with vendor-prefixed fullscreen APIs
 */
export interface FullscreenElement extends HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>;
}

// Note: ScreenOrientation lock/unlock is handled via 'any' casts in the component
// since the API is not universally supported and has complex types

// ============================================
// PLAYBACK SPEED TYPE
// ============================================

export type PlaybackSpeed = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

export const PLAYBACK_SPEEDS: PlaybackSpeed[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const FONT_SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
export type FontSize = typeof FONT_SIZES[number];
