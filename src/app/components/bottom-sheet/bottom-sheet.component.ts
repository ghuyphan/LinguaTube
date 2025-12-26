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
  OnDestroy
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss'
})
export class BottomSheetComponent implements OnDestroy {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  // View children
  sheetEl = viewChild<ElementRef<HTMLElement>>('sheetEl');
  sheetContent = viewChild<ElementRef<HTMLElement>>('sheetContent');

  // Inputs
  isOpen = input<boolean>(false);
  maxHeight = input<string>('85vh');
  showDragHandle = input<boolean>(true);
  allowBackdropClose = input<boolean>(true);

  // Outputs
  closed = output<void>();

  // Internal state
  isClosing = signal(false);
  isDragging = signal(false);
  isDragClosing = signal(false); // Tracks if closing via drag (uses transition, not animation)
  hasAnimated = signal(false); // Tracks if entry animation has completed
  dragOffset = signal(0);

  // Drag gesture state
  private touchStartY = 0;
  private touchCurrentY = 0;
  private touchStartTime = 0;
  private isDragGesture = false;
  private historyPushed = false;

  // Thresholds
  private readonly DISMISS_THRESHOLD = 80;
  private readonly VELOCITY_THRESHOLD = 0.5; // pixels per ms
  private readonly ANIMATION_DURATION = 250;

  // Unique ID for this sheet instance (for nested sheet history state management)
  private readonly sheetId = Math.random().toString(36).substring(2, 9);

  // Bound handler for popstate
  private boundPopStateHandler = this.onPopState.bind(this);

  // Check if mobile
  get isMobile(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return window.innerWidth <= 768 || window.innerHeight <= 500;
  }

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        // Only lock scroll on mobile - desktop modals don't need it
        if (this.isMobile) {
          this.lockBodyScroll(true);
          this.pushHistoryState();
        }
        this.isClosing.set(false);
        this.isDragClosing.set(false);
        // Reset hasAnimated when sheet opens (animation will play)
        this.hasAnimated.set(false);
      } else {
        // Clean up history state when closed externally
        if (this.historyPushed) {
          this.historyPushed = false;
        }
        // Reset animation state when closed
        this.hasAnimated.set(false);
        this.isDragClosing.set(false);
      }
    });
  }

  /**
   * Handle animation end to mark entry animation as complete
   */
  onAnimationEnd(event: AnimationEvent): void {
    // Only mark as animated for entry animations (scaleIn for desktop, mobileSlideUp for mobile)
    if (event.animationName === 'mobileSlideUp' || event.animationName === 'scaleIn') {
      this.hasAnimated.set(true);
    }
  }

  /**
   * Push history state for back button support on mobile
   */
  private pushHistoryState(): void {
    if (!isPlatformBrowser(this.platformId) || this.historyPushed) return;

    // Push a new history entry with unique sheet ID so nested sheets don't conflict
    history.pushState({ bottomSheet: true, sheetId: this.sheetId }, '');
    this.historyPushed = true;

    // Listen for popstate (back button/gesture)
    window.addEventListener('popstate', this.boundPopStateHandler);
  }

  /**
   * Handle browser back button/gesture
   */
  private onPopState(event: PopStateEvent): void {
    // Only handle popstate for this specific sheet instance
    // This prevents nested sheets from closing parent sheets
    if (this.isOpen() && this.isMobile && this.historyPushed) {
      this.historyPushed = false; // Mark as not pushed since history already popped
      // Prevent default close and do our animated close
      this.animatedClose(false); // Don't manipulate history again
    }
  }

  private lockBodyScroll(lock: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (lock) {
      const scrollY = window.scrollY;
      this.document.body.classList.add('no-scroll');
      this.document.body.style.setProperty('position', 'fixed');
      this.document.body.style.setProperty('width', '100%');
      this.document.body.style.setProperty('top', `-${scrollY}px`);
    } else {
      const scrollY = this.document.body.style.top;
      this.document.body.classList.remove('no-scroll');
      this.document.body.style.removeProperty('position');
      this.document.body.style.removeProperty('width');
      this.document.body.style.removeProperty('top');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  // Touch gesture handlers for drag-to-dismiss
  onTouchStart(event: TouchEvent): void {
    if (!this.isMobile) return;

    const sheetContent = this.sheetContent()?.nativeElement;
    const isAtTop = !sheetContent || sheetContent.scrollTop <= 0;
    const touch = event.touches[0];

    const sheetEl = this.sheetEl()?.nativeElement;
    if (sheetEl) {
      const rect = sheetEl.getBoundingClientRect();
      const touchRelativeY = touch.clientY - rect.top;

      // Start drag if in handle area (top 50px) or at scroll top
      if (touchRelativeY < 50 || isAtTop) {
        this.touchStartY = touch.clientY;
        this.touchCurrentY = touch.clientY;
        this.touchStartTime = Date.now();
        this.isDragGesture = false;
      }
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (this.touchStartY === 0) return;

    const touch = event.touches[0];
    const deltaY = touch.clientY - this.touchStartY;

    // Only allow dragging down
    if (deltaY > 5) {
      this.isDragGesture = true;

      // Set dragging state only once at start
      if (!this.isDragging()) {
        this.isDragging.set(true);
        // Mark as animated to prevent entry animation replay on snap-back
        this.hasAnimated.set(true);
      }

      // Direct DOM manipulation for 60fps smooth follow (bypasses Angular)
      const sheetEl = this.sheetEl()?.nativeElement;
      if (sheetEl) {
        sheetEl.style.transform = `translateY(${deltaY}px)`;
      }

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
    const sheetEl = this.sheetEl()?.nativeElement;

    // Dismiss if:
    // 1. Dragged past threshold, OR
    // 2. Velocity is high enough (quick flick gesture)
    if (deltaY > this.DISMISS_THRESHOLD || velocity > this.VELOCITY_THRESHOLD) {
      // Animate from current position to off-screen
      if (sheetEl) {
        // Add transition for smooth animation from current position
        sheetEl.style.transition = 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)';
        sheetEl.style.transform = 'translateY(100%)';
      }

      // Trigger backdrop fade and cleanup after animation
      this.animatedCloseFromDrag();
    } else {
      // Snap back to original position
      // hasAnimated class prevents entry animation from replaying
      this.isDragging.set(false);

      // Animate to translateY(0) using CSS transition
      if (sheetEl) {
        // Use requestAnimationFrame for proper timing
        requestAnimationFrame(() => {
          sheetEl.style.transition = 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)';
          sheetEl.style.transform = 'translateY(0)';

          // Clean up after transition completes
          setTimeout(() => {
            if (sheetEl) {
              sheetEl.style.transform = '';
              sheetEl.style.transition = '';
            }
          }, 260); // Slightly longer than transition duration
        });
      }
    }

    this.resetDragState();
  }

  private resetDragState(): void {
    this.touchStartY = 0;
    this.touchCurrentY = 0;
    this.touchStartTime = 0;
    this.isDragGesture = false;
  }

  /**
   * Handle backdrop click for close animation
   */
  onBackdropClick(event: Event): void {
    // Only close if clicking directly on the overlay (not the sheet)
    if (event.target === event.currentTarget && this.allowBackdropClose()) {
      this.animatedClose();
    }
  }

  /**
   * Handle backdrop touchend for mobile - ensures smooth animation
   */
  onBackdropTouch(event: TouchEvent): void {
    // Only close if touching directly on the overlay (not the sheet)
    if (event.target === event.currentTarget && this.allowBackdropClose()) {
      event.preventDefault(); // Prevent ghost click
      this.animatedClose();
    }
  }

  close(): void {
    this.animatedClose();
  }

  private animatedClose(popHistory: boolean = true): void {
    this.isClosing.set(true);
    this.isDragging.set(false);
    this.dragOffset.set(0);

    // Remove popstate listener
    window.removeEventListener('popstate', this.boundPopStateHandler);

    // Pop history state if we pushed one
    if (popHistory && this.historyPushed) {
      this.historyPushed = false;
      history.back();
    }

    setTimeout(() => {
      this.isClosing.set(false);
      // Only unlock scroll on mobile
      if (this.isMobile) {
        this.lockBodyScroll(false);
      }
      this.closed.emit();
    }, this.ANIMATION_DURATION);
  }

  /**
   * Close animation specifically for drag-to-dismiss
   * Sheet animates via inline styles, we just handle backdrop and cleanup
   */
  private animatedCloseFromDrag(popHistory: boolean = true): void {
    // Set drag closing to use inline transition instead of CSS animation
    this.isDragClosing.set(true);
    this.isClosing.set(true);
    this.isDragging.set(false);
    this.dragOffset.set(0);

    // Remove popstate listener
    window.removeEventListener('popstate', this.boundPopStateHandler);

    // Pop history state if we pushed one
    if (popHistory && this.historyPushed) {
      this.historyPushed = false;
      history.back();
    }

    // Clean up after animation
    setTimeout(() => {
      this.isClosing.set(false);
      this.isDragClosing.set(false);
      // Clean up inline styles
      const sheetEl = this.sheetEl()?.nativeElement;
      if (sheetEl) {
        sheetEl.style.transform = '';
        sheetEl.style.transition = '';
      }
      // Only unlock scroll on mobile
      if (this.isMobile) {
        this.lockBodyScroll(false);
      }
      this.closed.emit();
    }, this.ANIMATION_DURATION);
  }

  ngOnDestroy(): void {
    // Clean up
    window.removeEventListener('popstate', this.boundPopStateHandler);
    if (this.isMobile) {
      this.lockBodyScroll(false);
    }
    // Pop history if still pushed
    if (this.historyPushed) {
      this.historyPushed = false;
      history.back();
    }
  }
}
