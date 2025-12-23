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
        (click)="allowBackdropClose() && close()"
      >
        <div 
          class="sheet"
          #sheetEl
          [class.closing]="isClosing()"
          [class.desktop-modal]="!isMobile"
          [style.transform]="isDragging() ? 'translateY(' + dragOffset() + 'px)' : null"
          [style.maxHeight]="maxHeight()"
          (click)="$event.stopPropagation()"
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
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1100;
      padding: var(--space-md);
      animation: fadeIn 0.15s ease forwards;
    }

    .sheet-overlay.closing {
      animation: fadeOut 0.2s ease forwards;
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
      animation: slideUp 0.2s ease;
      will-change: transform;
    }

    .sheet.closing {
      animation: slideDown 0.2s ease forwards;
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

    /* Mobile: bottom sheet style */
    @media (max-width: 768px) {
      .sheet-overlay {
        padding: 0;
        align-items: flex-end;
      }

      .sheet {
        max-width: 100%;
        width: 100%;
        margin: 0;
        max-height: 85vh;
        border-radius: 16px 16px 0 0;
        animation: mobileSlideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards;
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

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes slideDown {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(16px);
      }
    }

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
    dragOffset = signal(0);

    // Drag gesture state
    private touchStartY = 0;
    private touchCurrentY = 0;
    private isDragGesture = false;

    // Thresholds
    private readonly DISMISS_THRESHOLD = 100;
    private readonly ANIMATION_DURATION = 250;

    // Check if mobile
    get isMobile(): boolean {
        if (!isPlatformBrowser(this.platformId)) return false;
        return window.innerWidth <= 768;
    }

    constructor() {
        effect(() => {
            if (this.isOpen()) {
                this.lockBodyScroll(true);
                this.isClosing.set(false);
            }
        });
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
                this.isDragGesture = false;
            }
        }
    }

    onTouchMove(event: TouchEvent): void {
        if (this.touchStartY === 0) return;

        const touch = event.touches[0];
        const deltaY = touch.clientY - this.touchStartY;

        // Only allow dragging down
        if (deltaY > 10) {
            this.isDragGesture = true;
            this.isDragging.set(true);

            // Apply rubber-band resistance
            const resistance = 0.5;
            this.dragOffset.set(deltaY * resistance);

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

        // Dismiss if dragged far enough
        if (deltaY > this.DISMISS_THRESHOLD) {
            this.animatedClose();
        } else {
            // Snap back
            this.isDragging.set(false);
            this.dragOffset.set(0);
        }

        this.resetDragState();
    }

    private resetDragState(): void {
        this.touchStartY = 0;
        this.touchCurrentY = 0;
        this.isDragGesture = false;
    }

    close(): void {
        this.animatedClose();
    }

    private animatedClose(): void {
        this.isClosing.set(true);
        this.isDragging.set(false);
        this.dragOffset.set(0);

        setTimeout(() => {
            this.isClosing.set(false);
            this.lockBodyScroll(false);
            this.closed.emit();
        }, this.ANIMATION_DURATION);
    }

    ngOnDestroy(): void {
        this.lockBodyScroll(false);
    }
}
