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
  template: `
    @if (isOpen()) {
      <div 
        class="sheet-overlay" 
        [class.closing]="isClosing()"
        (click)="onBackdropClick($event)"
        (touchend)="onBackdropTouch($event)"
      >
        <div 
          class="sheet"
          #sheetEl
          [class.closing]="isClosing() && !isDragClosing()"
          [class.drag-closing]="isDragClosing()"
          [class.dragging]="isDragging()"
          [class.animated]="hasAnimated()"
          [class.desktop-modal]="!isMobile"
          [style.maxHeight]="maxHeight()"
          (click)="$event.stopPropagation()"
          (animationend)="onAnimationEnd($event)"
          (touchstart)="onTouchStart($event)"
          (touchmove)="onTouchMove($event)"
          (touchend)="onTouchEnd($event)"
        >
          <!-- Drag Handle - visible on mobile -->
          @if (showDragHandle()) {
            <div class="sheet-drag-handle">
              <div class="sheet-drag-indicator"></div>
            </div>
          }

          <!-- Content projection -->
          <div class="sheet-content" #sheetContent>
            <ng-content />
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .sheet-overlay {
      position: fixed;
      inset: 0;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1100;
      padding: var(--space-md);
    }

    /* Backdrop pseudo-element - fades independently of sheet */
    .sheet-overlay::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      animation: fadeIn 0.25s ease-out forwards;
    }

    .sheet-overlay.closing::before {
      animation: fadeOut 0.2s ease-in forwards;
    }

    /* Desktop: centered modal */
    .sheet {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 420px;
      max-height: 80vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
      animation: scaleIn 0.2s cubic-bezier(0.32, 0.72, 0, 1) forwards;
      will-change: transform, opacity;
    }

    .sheet.closing {
      animation: scaleOut 0.15s cubic-bezier(0.32, 0.72, 0, 1) forwards;
    }

    /* Drag-to-close: no CSS animation, uses inline transition */
    .sheet.drag-closing {
      animation: none !important;
    }

    .sheet.dragging {
      animation: none !important;
      transition: none !important;
    }

    /* After entry animation completes, disable it to prevent replay */
    .sheet.animated {
      animation: none;
    }

    /* Snap-back transition when drag ends without dismiss */
    .sheet.animated:not(.dragging):not(.closing):not(.drag-closing) {
      transition: transform 0.25s cubic-bezier(0.32, 0.72, 0, 1);
    }

    /* Drag handle */
    .sheet-drag-handle {
      display: none;
      padding: 12px 0 4px;
      cursor: grab;
      touch-action: none;
    }

    .sheet-drag-indicator {
      width: 36px;
      height: 4px;
      background: var(--border-color);
      border-radius: 2px;
      margin: 0 auto;
      transition: background 0.2s;
    }

    .sheet-drag-handle:active .sheet-drag-indicator {
      background: var(--text-muted);
    }

    .sheet-content {
      flex: 1;
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
    }

    /* Hide scrollbar on desktop modals */
    .sheet.desktop-modal .sheet-content {
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */
    }

    .sheet.desktop-modal .sheet-content::-webkit-scrollbar {
      display: none; /* Chrome/Safari/Opera */
    }

    /* Mobile: bottom sheet style */
    @media (max-width: 768px) {
      .sheet-overlay {
        padding: 0;
        align-items: flex-end;
      }

      .sheet-overlay::before {
        animation: fadeIn 0.3s ease-out forwards;
      }

      .sheet-overlay.closing::before {
        animation: fadeOut 0.25s ease-in forwards;
      }

      .sheet {
        max-width: 100%;
        width: 100%;
        margin: 0;
        max-height: 85vh;
        border-radius: 16px 16px 0 0;
        animation: mobileSlideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        touch-action: none;
      }

      .sheet.closing {
        animation: mobileSlideDown 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
      }

      .sheet-drag-handle {
        display: block;
      }

      .sheet-content {
        touch-action: pan-y;
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
    }

    /* Landscape phones: bottom sheet but with limited width for better UX */
    @media (max-height: 500px) and (orientation: landscape) {
      .sheet-overlay {
        padding: 0;
        align-items: flex-end;
        justify-content: center;
      }

      .sheet-overlay::before {
        animation: fadeIn 0.3s ease-out forwards;
      }

      .sheet-overlay.closing::before {
        animation: fadeOut 0.25s ease-in forwards;
      }

      .sheet {
        max-width: 600px;
        width: 80%;
        max-height: calc(100vh - 80px);
        border-radius: 16px 16px 0 0;
        animation: mobileSlideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards;
      }

      .sheet.closing {
        animation: mobileSlideDown 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
      }

      .sheet-drag-handle {
        display: block;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    /* Desktop animations - scale effect */
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes scaleOut {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }

    /* Mobile animations - slide from bottom */
    @keyframes mobileSlideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    @keyframes mobileSlideDown {
      from { transform: translateY(0); }
      to { transform: translateY(100%); }
    }
  `]
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
