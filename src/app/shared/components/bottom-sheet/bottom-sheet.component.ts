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
  computed
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BottomSheetService } from '../../../services/bottom-sheet.service';


@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss'
})
export class BottomSheetComponent implements OnDestroy {
  private sheetService = inject(BottomSheetService);
  private platformId = inject(PLATFORM_ID);


  // View children
  sheetEl = viewChild<ElementRef<HTMLElement>>('sheetEl');
  sheetContent = viewChild<ElementRef<HTMLElement>>('sheetContent');

  // Inputs
  isOpen = input<boolean>(false);
  maxHeight = input<string>('85vh');
  showDragHandle = input<boolean>(true);
  allowBackdropClose = input<boolean>(true);
  showCloseButton = input<boolean>(false);
  // Optional padding for bottom navigation bar (for partial sheets)
  navPadding = input<boolean>(false);

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

  // Thresholds
  private readonly DISMISS_THRESHOLD = 80;
  private readonly VELOCITY_THRESHOLD = 0.5; // pixels per ms
  private readonly ANIMATION_DURATION = 250;

  // Unique ID for this sheet instance
  private readonly sheetId = Math.random().toString(36).substring(2, 9);

  // Unregister function from service (called when sheet closes)
  private unregisterFn: (() => void) | null = null;

  // Computed z-index based on stack position
  zIndex = computed(() => this.sheetService.getZIndex(this.sheetId));

  // Check if mobile
  get isMobile(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return window.innerWidth <= 768 || window.innerHeight <= 500;
  }

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        // Register with service - it handles scroll locking and history
        this.unregisterFn = this.sheetService.register({
          id: this.sheetId,
          close: () => this.onServiceClose()
        });

        this.isClosing.set(false);
        this.isDragClosing.set(false);
        // Reset hasAnimated when sheet opens (animation will play)
        this.hasAnimated.set(false);
      } else if (this.unregisterFn) {
        // If closed externally (not by service), unregister
        // This is handled in animatedClose, but this catches external close
      }
    });
  }

  /**
   * Called by the BottomSheetService when back button is pressed
   * This should NOT manipulate history (service handles that)
   */
  private onServiceClose(): void {
    // Trigger the closing animation and emit
    this.isClosing.set(true);
    this.isDragging.set(false);
    this.dragOffset.set(0);

    setTimeout(() => {
      this.isClosing.set(false);
      this.closed.emit();
    }, this.ANIMATION_DURATION);
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

  // Touch gesture handlers for drag-to-dismiss
  private dragStartedInHandle = false;

  onTouchStart(event: TouchEvent): void {
    if (!this.isMobile) return;

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
    if (deltaY > 5) {
      this.isDragGesture = true;

      // Set dragging state only once at start
      if (!this.isDragging()) {
        this.isDragging.set(true);
        // Mark as animated to prevent entry animation replay on snap-back
        this.hasAnimated.set(true);
      }

      // Update offset for CSS variable
      this.dragOffset.set(deltaY);

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
      this.animatedCloseFromDrag();
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

  private animatedClose(): void {
    this.isClosing.set(true);
    this.isDragging.set(false);
    this.dragOffset.set(0);

    // Unregister from service (this also handles history and scroll unlock)
    if (this.unregisterFn) {
      this.unregisterFn();
      this.unregisterFn = null;
    }

    setTimeout(() => {
      this.isClosing.set(false);
      this.closed.emit();
    }, this.ANIMATION_DURATION);
  }

  /**
   * Close animation specifically for drag-to-dismiss
   * Sheet animates via inline styles, we just handle backdrop and cleanup
   */
  private animatedCloseFromDrag(): void {
    // Set drag closing to use inline transition instead of CSS animation
    this.isDragClosing.set(true);
    this.isClosing.set(true);
    this.isDragging.set(false);
    // don't reset dragOffset to 0 here, it should be set to dismiss value by caller

    // Unregister from service
    if (this.unregisterFn) {
      this.unregisterFn();
      this.unregisterFn = null;
    }

    // Clean up after animation
    setTimeout(() => {
      this.isClosing.set(false);
      this.isDragClosing.set(false);
      this.dragOffset.set(0);
      this.closed.emit();
    }, this.ANIMATION_DURATION);
  }

  ngOnDestroy(): void {
    // Clean up - unregister if still open
    if (this.unregisterFn) {
      this.unregisterFn();
      this.unregisterFn = null;
    }
  }
}
