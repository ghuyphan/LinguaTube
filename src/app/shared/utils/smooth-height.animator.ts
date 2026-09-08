export interface SmoothHeightAnimatorOptions {
  /**
   * Transition duration in milliseconds (default: 220).
   */
  duration?: number;

  /**
   * CSS easing function (default: 'cubic-bezier(0.32, 0.72, 0, 1)').
   */
  easing?: string;

  /**
   * CSS class added to container element while height animation is in progress (default: 'animating-height').
   */
  animatingClass?: string;

  /**
   * Buffer in milliseconds after duration before forcing cleanup of animatingClass (default: 130).
   */
  safetyBufferMs?: number;

  /**
   * Optional predicate callback to check if animation should proceed.
   * If it returns false, baseline heights are updated without running animation.
   */
  isReady?: () => boolean;

  /**
   * Optional callback when an animation starts.
   */
  onStart?: () => void;

  /**
   * Optional callback when an animation finishes or cancels.
   */
  onFinish?: () => void;
}

/**
 * Reusable utility that smoothly animates a container's height whenever
 * the observed inner content changes height (via ResizeObserver and Web Animations API).
 *
 * Key features:
 * - Decouples observation (inner element) from animated container (outer element).
 * - Filters subpixel jitter and width-only reflows to avoid premature cancellation.
 * - Samples in-flight rendered height to seamlessly handle rapid interruptions.
 * - Suppresses animations during window resizing or under prefers-reduced-motion.
 * - Includes safety timeouts to guarantee CSS class cleanup.
 */
export class SmoothHeightAnimator {
  private inner: HTMLElement | null = null;
  private container: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private currentAnimation: Animation | null = null;
  private safetyTimer: ReturnType<typeof setTimeout> | null = null;
  private windowResizeTimer: ReturnType<typeof setTimeout> | null = null;
  private windowResizeListener: (() => void) | null = null;
  private isWindowResizing = false;

  private lastContainerHeight = 0;
  private lastContentHeight = 0;

  constructor(private readonly options: SmoothHeightAnimatorOptions = {}) {}

  /**
   * Attach the animator to observe the inner content element and animate the outer container element.
   */
  attach(inner: HTMLElement, container: HTMLElement): void {
    if (this.inner === inner && this.container === container && this.resizeObserver) {
      return;
    }

    this.detach();

    this.inner = inner;
    this.container = container;

    if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') {
      return;
    }

    this.lastContainerHeight = container.offsetHeight || inner.offsetHeight;
    this.lastContentHeight = inner.offsetHeight;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.inner) {
          const height = entry.borderBoxSize?.[0]?.blockSize ?? this.inner?.offsetHeight ?? 0;
          this.onResize(height);
          break;
        }
      }
    });

    this.resizeObserver.observe(inner);
    this.setupWindowResizeListener();
  }

  /**
   * Reset baseline heights to current rendered heights without animating.
   * Useful after entry animations complete or when modal/sheet is opened.
   */
  resetBaseline(): void {
    if (this.container) {
      this.lastContainerHeight = this.container.offsetHeight;
    }
    if (this.inner) {
      this.lastContentHeight = this.inner.offsetHeight;
    }
  }

  /**
   * Cancel any active height animation and remove the animating class.
   */
  cancel(): void {
    if (this.currentAnimation) {
      this.currentAnimation.cancel();
      this.currentAnimation = null;
    }
    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }
    if (this.container) {
      const cls = this.options.animatingClass ?? 'animating-height';
      this.container.classList.remove(cls);
    }
  }

  /**
   * Detach the observer, cancel animations, remove listeners and reset all state.
   */
  detach(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.cancel();
    this.removeWindowResizeListener();
    this.inner = null;
    this.container = null;
    this.lastContainerHeight = 0;
    this.lastContentHeight = 0;
  }

  /**
   * Whether a height transition animation is actively running.
   */
  get isAnimating(): boolean {
    return this.currentAnimation !== null;
  }

  private onResize(contentHeight: number): void {
    if (!this.inner || !this.container) return;

    // Filter out horizontal/width changes or subpixel noise when height hasn't changed
    if (this.lastContentHeight > 0 && Math.abs(contentHeight - this.lastContentHeight) <= 1) {
      return;
    }

    // If Web Animations API is not supported in this environment
    if (typeof this.container.animate !== 'function') {
      this.lastContainerHeight = this.container.offsetHeight || contentHeight;
      this.lastContentHeight = contentHeight;
      return;
    }

    // If window is resizing, adapt immediately without animation to prevent rubber-banding
    if (this.isWindowResizing) {
      this.cancel();
      this.lastContainerHeight = this.container.offsetHeight || contentHeight;
      this.lastContentHeight = contentHeight;
      return;
    }

    // Check user prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.cancel();
      this.lastContainerHeight = this.container.offsetHeight || contentHeight;
      this.lastContentHeight = contentHeight;
      return;
    }

    // Check readiness predicate (e.g. sheet open, entry animation finished, not dragging)
    if (this.options.isReady && !this.options.isReady()) {
      this.lastContainerHeight = this.container.offsetHeight || contentHeight;
      this.lastContentHeight = contentHeight;
      return;
    }

    // Baseline measurement: record initial height without animating so entry animation is clean
    if (this.lastContainerHeight <= 0 || this.lastContentHeight <= 0) {
      this.lastContainerHeight = this.container.offsetHeight || contentHeight;
      this.lastContentHeight = contentHeight;
      return;
    }

    let oldHeight = this.lastContainerHeight || this.lastContentHeight;
    if (this.currentAnimation) {
      // Sample in-flight rendered height to seamlessly handle rapid interruptions
      oldHeight = this.container.getBoundingClientRect().height;
      this.cancel();
    }

    this.lastContentHeight = contentHeight;
    const newHeight = this.container.offsetHeight || contentHeight;
    this.lastContainerHeight = newHeight;

    // Only animate if there is a noticeable height change (> 2px)
    if (Math.abs(newHeight - oldHeight) <= 2 || oldHeight <= 0) {
      return;
    }

    const cls = this.options.animatingClass ?? 'animating-height';
    this.container.classList.add(cls);

    const duration = this.options.duration ?? 220;
    const easing = this.options.easing ?? 'cubic-bezier(0.32, 0.72, 0, 1)';
    const safetyBuffer = this.options.safetyBufferMs ?? 130;

    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
    }
    this.safetyTimer = setTimeout(() => {
      this.cleanupAnimationState();
    }, duration + safetyBuffer);

    this.options.onStart?.();

    try {
      this.currentAnimation = this.container.animate(
        [
          { height: `${oldHeight}px` },
          { height: `${newHeight}px` }
        ],
        {
          duration,
          easing
        }
      );

      const cleanup = () => {
        this.cleanupAnimationState();
        this.options.onFinish?.();
      };

      this.currentAnimation.onfinish = cleanup;
      this.currentAnimation.oncancel = cleanup;
    } catch {
      this.cleanupAnimationState();
    }
  }

  private cleanupAnimationState(): void {
    this.currentAnimation = null;
    if (this.container) {
      const cls = this.options.animatingClass ?? 'animating-height';
      this.container.classList.remove(cls);
    }
    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }
  }

  private setupWindowResizeListener(): void {
    if (typeof window === 'undefined' || this.windowResizeListener) return;

    this.windowResizeListener = () => {
      this.isWindowResizing = true;
      if (this.windowResizeTimer) {
        clearTimeout(this.windowResizeTimer);
      }
      this.windowResizeTimer = setTimeout(() => {
        this.isWindowResizing = false;
        if (this.container) {
          this.lastContainerHeight = this.container.offsetHeight;
        }
      }, 150);
    };

    window.addEventListener('resize', this.windowResizeListener, { passive: true });
  }

  private removeWindowResizeListener(): void {
    if (typeof window !== 'undefined' && this.windowResizeListener) {
      window.removeEventListener('resize', this.windowResizeListener);
      this.windowResizeListener = null;
    }
    if (this.windowResizeTimer) {
      clearTimeout(this.windowResizeTimer);
      this.windowResizeTimer = null;
    }
    this.isWindowResizing = false;
  }
}
