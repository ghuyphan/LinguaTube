# Video Player Component Migration Guide

This document describes the changes made during the refactoring of the video player component.

## Summary

The video player component has been refactored to improve code quality, fix memory leaks, enhance accessibility, and resolve SCSS specificity issues.

## New Files

| File | Purpose |
|------|---------|
| `video-player.constants.ts` | Centralized constants, timing values, and TypeScript types for fullscreen APIs |

## Breaking Changes

None. All changes are internal refactoring with no API changes to the component.

## TypeScript Changes

### Constants Extraction
All magic numbers moved to `video-player.constants.ts`:
- Timing: `CONTROLS_AUTO_HIDE_DELAY`, `DOUBLE_TAP_DELAY`, `LONG_PRESS_DELAY`, etc.
- Gestures: `SEEK_STEP`, `SWIPE_THRESHOLD`, `GESTURE_SEEK_SENSITIVITY`
- Fullscreen types: `FullscreenDocument`, `FullscreenElement`

### Memory Leak Fix
The `startSeeking()` method now uses bound class methods (`boundOnSeekMove`, `boundOnSeekUp`) instead of inline closures, allowing proper cleanup in `ngOnDestroy()`.

### Buffered Tracking
The `bufferedInterval` now pauses when video is paused and resumes when playing, reducing unnecessary CPU usage.

### Long Press 2x Speed
The long press feature is now fully implemented - hold touch for 500ms to activate 2x playback speed.

### Removed Dead Code
- `handleTap()` method (unused, `onOverlayClick` handles desktop clicks)
- `transcriptSubscription` field (unused)

## HTML/Accessibility Changes

| Change | Reason |
|--------|--------|
| `<span class="fs-word">` → `<button type="button">` | Keyboard accessibility |
| Added `aria-label` to all interactive buttons | Screen reader support |
| Added `role="dialog"` + `aria-modal="true"` to popup | Proper modal semantics |
| Added `role="slider"` + ARIA attributes to progress bar | Accessible seek control |
| Added `aria-hidden="true"` to decorative icons | Cleaner screen reader output |

## SCSS Changes

### New Variables (top of file)
- Dimension variables: `$big-play-btn-size`, `$progress-handle-size`, etc.
- Z-index documentation: `$z-player-overlay`, `$z-custom-controls`, etc.
- Color fallbacks: `$accent-primary-fallback`

### Specificity Fix
The `.is-fullscreen .desktop-only` rule now only applies on desktop (min-width: 641px), preventing it from overriding mobile styles.

### Button Reset
Added button reset styles to `.fs-word` class to handle the span→button change.

## Testing Recommendations

1. **Playback controls** - Verify play/pause, seek, double-tap works
2. **Long press** - Hold on video for 500ms, verify 2x speed activates
3. **Fullscreen** - Enter fullscreen, click word, verify popup opens correctly
4. **Mobile** - Verify desktop-only controls stay hidden on mobile in fullscreen
5. **Keyboard** - Tab through controls, verify focus rings and labels
