import {
  Component,
  input,
  output,
  signal,
  effect,
  inject,
  ChangeDetectionStrategy,
  ElementRef,
  viewChild,
  PLATFORM_ID,
  OnDestroy,
  computed,
  DestroyRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BottomSheetService } from '../../../services/bottom-sheet.service';
import { generateRandomId } from '../../../core/utils';
import { I18nService } from '../../../core/services/i18n.service';
import { SmoothHeightAnimator } from '../../utils/smooth-height.animator';
import { DomTeleporter } from '../../utils/teleport.utils';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss'
})
export class BottomSheetComponent implements OnDestroy {
  readonly i18n = inject(I18nService);
  private sheetService = inject(BottomSheetService);
  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);

  // View children
  sheetEl = viewChild<ElementRef<HTMLElement>>('sheetEl');
  sheetContent = viewChild<ElementRef<HTMLElement>>('sheetContent');
  contentInner = viewChild<ElementRef<HTMLElement>>('contentInner');

  // Inputs
  isOpen = input<boolean>(false);
  title = input<string>('');
  ariaLabel = input<string>('');
  maxHeight = input<string>('85vh');
  maxWidth = input<string>('440px');
  showDragHandle = input<boolean>(true);
  allowBackdropClose = input<boolean>(true);
  allowEscapeClose = input<boolean>(true);
  showCloseButton = input<boolean>(false);
  squareCorners = input<boolean>(false);

  // Optional manual z-index override
  zIndex = input<number | undefined>(undefined);

  // Optional custom CSS panel class
  panelClass = input<string>('');

  // Computed accessibility label
  effectiveAriaLabel = computed(() => this.title() || this.ariaLabel() || 'Dialog');

  // Outputs
  closed = output<void>();

  // Internal state
  readonly shouldRender = signal(false);
  isClosing = signal(false);
  isDragging = signal(false);
  isDragClosing = signal(false); // Tracks if closing via drag (uses transition, not animation)
  hasAnimated = signal(false); // Tracks if entry animation has completed
  dragOffset = signal(0);

  // Teleportation state to escape parent stacking contexts
  private readonly teleporter = new DomTeleporter();

  // Drag gesture state
  private touchStartY = 0;
  private touchCurrentY = 0;
  private touchStartTime = 0;
  private isDragGesture = false;

  // Thresholds
  private readonly DISMISS_THRESHOLD = 80;
  private readonly VELOCITY_THRESHOLD = 0.5; // pixels per ms
  private readonly ANIMATION_DURATION = 220;

  // Unique ID for this sheet instance
  private readonly sheetId = generateRandomId(8);

  // Unregister function from service (called when sheet closes)
  private unregisterFn: (() => void) | null = null;

  // Computed z-index based on stack position (or manual override)
  computedZIndex = computed(() => this.zIndex() ?? this.sheetService.getZIndex(this.sheetId));

  // Computed whether this sheet is topmost in stack (for inert background modal trap defense)
  readonly isTopmost = computed(() => this.sheetService.isTopmost(this.sheetId));

  // Check if mobile (reactive signal updating on resize/orientation)
  readonly isMobile = signal(false);
  private closeTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private readonly destroyRef = inject(DestroyRef);

  private previouslyFocusedElement: HTMLElement | null = null;
  private keydownListener: ((e: KeyboardEvent) => void) | null = null;
  private initialFocusTimer: ReturnType<typeof setTimeout> | null = null;

  // Dynamic height animator for smooth height transitions on dynamic content changes
  private readonly heightAnimator = new SmoothHeightAnimator({
    duration: 220,
    easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
    animatingClass: 'animating-height',
    isReady: () => this.shouldRender() && !this.isClosing() && !this.isDragClosing() && !this.isDragging()
  });
  private animationSafetyTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId) && typeof window.matchMedia === 'function') {
      const mobileQuery = window.matchMedia('(max-width: 768px), (max-height: 500px)');
      this.isMobile.set(mobileQuery.matches);
      const onQueryChange = (e: MediaQueryListEvent) => this.isMobile.set(e.matches);
      mobileQuery.addEventListener('change', onQueryChange);
      this.destroyRef.onDestroy(() => mobileQuery.removeEventListener('change', onQueryChange));
    }

    effect(() => {
      const open = this.isOpen();
      if (open) {
        if (this.closeTimeoutId) {
          clearTimeout(this.closeTimeoutId);
          this.closeTimeoutId = null;
        }

        this.shouldRender.set(true);
        this.isClosing.set(false);
        this.isDragClosing.set(false);
        // Reset hasAnimated when sheet opens (animation will play)
        this.hasAnimated.set(false);

        if (isPlatformBrowser(this.platformId) && document.activeElement instanceof HTMLElement) {
          this.previouslyFocusedElement = document.activeElement;
        }

        this.teleport();

        // Register with service - it handles scroll locking and history
        if (!this.unregisterFn) {
          this.unregisterFn = this.sheetService.register({
            id: this.sheetId,
            close: () => this.onServiceClose(),
            allowEscape: this.allowEscapeClose()
          });
        }

        this.setupFocusTrap();

        // Safety timeout in case animationend does not fire
        if (this.animationSafetyTimer) {
          clearTimeout(this.animationSafetyTimer);
        }
        this.animationSafetyTimer = setTimeout(() => {
          this.animationSafetyTimer = null;
          if (this.shouldRender() && !this.hasAnimated()) {
            this.hasAnimated.set(true);
            this.heightAnimator.resetBaseline();
          }
        }, 350);
      } else {
        // If closed externally (e.g. parent sets isOpen = false), animate out first if currently rendered
        if (this.shouldRender() && !this.isClosing()) {
          this.startClosingAnimation();
        } else if (!this.shouldRender()) {
          if (this.unregisterFn) {
            this.unregisterFn();
            this.unregisterFn = null;
          }
          this.restoreFocus();
          this.restore();
        }
      }
    });

    // Observe inner content resize to trigger smooth height animations
    effect(() => {
      const inner = this.contentInner()?.nativeElement;
      const sheet = this.sheetEl()?.nativeElement;
      if (this.shouldRender() && inner && sheet) {
        this.heightAnimator.attach(inner, sheet);
      } else {
        this.heightAnimator.detach();
      }
    });
  }

  /**
   * Teleport sheet to document.body (or fullscreen element)
   * so it escapes all ancestor stacking contexts, overflow:hidden, and transforms.
   */
  private teleport(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.teleporter.teleport(this.elementRef.nativeElement as HTMLElement);
  }

  /**
   * Restore sheet back to its original parent in the component tree.
   */
  private restore(): void {
    this.teleporter.restore(this.elementRef.nativeElement as HTMLElement);
  }

  /**
   * Called by the BottomSheetService when back button is pressed
   * This should NOT manipulate history (service handles that)
   */
  private onServiceClose(): void {
    this.unregisterFn = null;
    this.startClosingAnimation();
  }

  /**
   * Handle animation end to mark entry animation as complete or cleanup on exit animation
   */
  onAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget) return;
    const name = event.animationName || '';
    // Support Angular ViewEncapsulation prefixed names (e.g. _ngcontent-c..._scaleIn)
    if (name.endsWith('mobileSlideUp') || name.endsWith('scaleIn')) {
      this.hasAnimated.set(true);
      this.heightAnimator.resetBaseline();
    } else if (name.endsWith('mobileSlideDown') || name.endsWith('scaleOut')) {
      if (this.isClosing() && !this.isDragClosing()) {
        this.finishClose();
      }
    }
  }

  // Touch gesture handlers for drag-to-dismiss
  private dragStartedInHandle = false;

  onTouchStart(event: TouchEvent): void {
    if (!this.isMobile()) return;
    this.heightAnimator.cancel();

    const touch = event.touches[0];
    const sheetEl = this.sheetEl()?.nativeElement;
    if (!sheetEl) return;

    const rect = sheetEl.getBoundingClientRect();
    const touchRelativeY = touch.clientY - rect.top;

    // Only start drag tracking from the drag handle area (top 50px)
    // This prevents scroll-down gestures from triggering dismiss
    if (touchRelativeY < 50) {
      this.dragStartedInHandle = true;
      this.touchStartY = touch.clientY;
      this.touchCurrentY = touch.clientY;
      this.touchStartTime = Date.now();
      this.isDragGesture = false;
    } else {
      this.dragStartedInHandle = false;
    }
  }

  onTouchMove(event: TouchEvent): void {
    // Only allow drag if it started from the handle area
    if (!this.dragStartedInHandle || this.touchStartY === 0) return;

    const touch = event.touches[0];
    const deltaY = touch.clientY - this.touchStartY;

    // Only allow dragging down
    if (deltaY > 5 || this.isDragGesture) {
      this.isDragGesture = true;

      // Set dragging state only once at start
      if (!this.isDragging()) {
        this.isDragging.set(true);
        // Mark as animated to prevent entry animation replay on snap-back
        this.hasAnimated.set(true);
      }

      // Update offset for CSS variable (clamped to >= 0 so sheet never lifts up)
      this.dragOffset.set(Math.max(0, deltaY));

      // Prevent scroll while dragging
      event.preventDefault();
    }

    this.touchCurrentY = touch.clientY;
  }

  onTouchEnd(_event: TouchEvent): void {
    if (!this.isDragGesture) {
      this.resetDragState();
      return;
    }

    const deltaY = this.touchCurrentY - this.touchStartY;
    const deltaTime = Date.now() - this.touchStartTime;
    const velocity = deltaY / deltaTime; // pixels per ms
    // Dismiss if:
    // 1. Dragged past threshold, OR
    // 2. Velocity is high enough (quick flick gesture)
    if (deltaY > this.DISMISS_THRESHOLD || velocity > this.VELOCITY_THRESHOLD) {
      // Dismiss - set offset to trigger close via CSS
      this.dragOffset.set(window.innerHeight);
      this.startClosingAnimation(true);
    } else {
      // Snap back - just reset offset, CSS transition handles animation
      this.isDragging.set(false);
      this.dragOffset.set(0);
    }

    this.resetDragState();
  }

  private resetDragState(): void {
    this.touchStartY = 0;
    this.touchCurrentY = 0;
    this.touchStartTime = 0;
    this.isDragGesture = false;
    this.dragStartedInHandle = false;
  }

  /**
   * Dismiss sheet on backdrop click or touch (preventing ghost clicks on mobile)
   */
  onBackdropDismiss(event: Event): void {
    if (event.target === event.currentTarget && this.allowBackdropClose()) {
      if (event.type === 'touchend') {
        event.preventDefault(); // Prevent ghost click
      }
      this.startClosingAnimation();
    }
  }

  close(event?: Event): void {
    event?.stopPropagation();
    this.startClosingAnimation();
  }

  private blurFocusedDescendant(): void {
    if (isPlatformBrowser(this.platformId) && document.activeElement instanceof HTMLElement) {
      if (this.sheetEl()?.nativeElement?.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    }
  }

  /**
   * Initiates the exit animation.
   * If fromDrag is true, uses CSS transition on translateY instead of keyframe animation.
   */
  private startClosingAnimation(fromDrag = false): void {
    if (!this.shouldRender() || this.isClosing()) return;

    this.blurFocusedDescendant();
    this.heightAnimator.detach();

    // Under prefers-reduced-motion, finish immediately without waiting for animations
    if (isPlatformBrowser(this.platformId) && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.finishClose();
      return;
    }

    if (fromDrag) {
      this.isDragClosing.set(true);
      this.isClosing.set(true);
      this.isDragging.set(false);
    } else {
      this.isDragClosing.set(false);
      this.isClosing.set(true);
      this.isDragging.set(false);
      this.dragOffset.set(0);
    }

    if (this.closeTimeoutId) {
      clearTimeout(this.closeTimeoutId);
    }
    // Safety fallback: if animationend event doesn't fire, complete closure
    this.closeTimeoutId = setTimeout(() => {
      this.finishClose();
    }, this.ANIMATION_DURATION + 30);
  }

  /**
   * Completes the sheet dismissal after the exit animation completes.
   * Cleans up service registration, restores focus, and unmounts DOM.
   */
  private finishClose(): void {
    if (this.closeTimeoutId) {
      clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
    }
    if (!this.shouldRender()) {
      return;
    }

    this.shouldRender.set(false);
    this.isClosing.set(false);
    this.isDragClosing.set(false);
    this.dragOffset.set(0);

    // Unregister from service (handles history and scroll unlock)
    if (this.unregisterFn) {
      this.unregisterFn();
      this.unregisterFn = null;
    }

    this.restoreFocus();
    this.restore();
    this.closed.emit();
  }

  private setupFocusTrap(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.removeFocusTrap();

    this.keydownListener = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const host = this.sheetEl()?.nativeElement;
      if (!host) return;

      const focusable = host.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', this.keydownListener);

    // Initial focus into sheet
    this.initialFocusTimer = setTimeout(() => {
      this.initialFocusTimer = null;
      const host = this.sheetEl()?.nativeElement;
      if (!host) return;
      const first = host.querySelector<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      first?.focus({ preventScroll: true });
    }, 50);
  }

  private removeFocusTrap(): void {
    if (this.initialFocusTimer) {
      clearTimeout(this.initialFocusTimer);
      this.initialFocusTimer = null;
    }
    if (this.keydownListener) {
      window.removeEventListener('keydown', this.keydownListener);
      this.keydownListener = null;
    }
  }

  private restoreFocus(): void {
    this.removeFocusTrap();
    if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
      try {
        if (this.previouslyFocusedElement.isConnected) {
          this.previouslyFocusedElement.focus({ preventScroll: true });
        }
      } catch { }
      this.previouslyFocusedElement = null;
    }
  }

  ngOnDestroy(): void {
    this.heightAnimator.detach();
    if (this.animationSafetyTimer) {
      clearTimeout(this.animationSafetyTimer);
      this.animationSafetyTimer = null;
    }
    if (this.closeTimeoutId) {
      clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
    }
    this.restoreFocus();
    // Clean up - unregister if still open
    if (this.unregisterFn) {
      this.unregisterFn();
      this.unregisterFn = null;
    }
    this.restore();
  }
}
