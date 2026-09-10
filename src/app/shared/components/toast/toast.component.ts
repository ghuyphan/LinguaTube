import { Component, ChangeDetectionStrategy, inject, ElementRef, PLATFORM_ID, OnDestroy, effect, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastService, ToastAction, ToastItem } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-toast',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    template: `
        @if (toastService.currentToast(); as toast) {
            @for (item of [toast]; track item.id) {
                <div 
                    class="toast" 
                    [class.toast--success]="item.type === 'success'"
                    [class.toast--error]="item.type === 'error'"
                    [class.toast--warning]="item.type === 'warning'"
                    [class.toast--info]="item.type === 'info'"
                    [class.toast--top]="item.position === 'top'"
                    [class.toast--bottom]="item.position === 'bottom'"
                    [class.toast--fullscreen]="isFullscreen()"
                    [class.toast--exiting]="toastService.isExiting()"
                    [class.toast--dragging]="isDragging()"
                    [style.--touch-offset-y.px]="dragOffsetY()"
                    role="status"
                    aria-live="polite"
                    (mouseenter)="onMouseEnter()"
                    (mouseleave)="onMouseLeave()"
                    (touchstart)="onTouchStart($event)"
                    (touchmove)="onTouchMove($event, item)"
                    (touchend)="onTouchEnd(item)"
                    (touchcancel)="onTouchCancel()"
                    (click)="onToastClick($event, item)">
                    <app-icon [name]="item.icon" [size]="16" />
                    <span class="toast__text">{{ item.message }}</span>
                    @if (item.action; as action) {
                        <button 
                            type="button" 
                            class="toast__action-btn" 
                            (click)="$event.stopPropagation(); executeAction(action)">
                            {{ action.label }}
                        </button>
                    }
                </div>
            }
        }
    `
})
export class ToastComponent implements OnDestroy {
    readonly toastService = inject(ToastService);
    private readonly elementRef = inject(ElementRef);
    private readonly platformId = inject(PLATFORM_ID);

    readonly isFullscreen = signal(false);
    readonly isDragging = signal(false);
    readonly dragOffsetY = signal(0);

    private originalParent: Node | null = null;
    private nextSibling: Node | null = null;
    private isTeleported = false;
    private touchStartY = 0;
    private hasMoved = false;

    constructor() {
        effect(() => {
            const current = this.toastService.currentToast();
            if (current) {
                this.teleport();
            } else {
                this.restore();
            }
        });
    }

    ngOnDestroy(): void {
        this.restore();
    }

    /**
     * Teleport toast host to document.fullscreenElement (if active) or document.body
     * to escape any ancestor transform, overflow:hidden, or stacking context limitations.
     */
    private teleport(): void {
        if (!isPlatformBrowser(this.platformId) || this.isTeleported) return;
        const host = this.elementRef.nativeElement as HTMLElement;
        if (!host.parentNode) return;

        const fullscreenEl = document.fullscreenElement;
        const target = fullscreenEl || document.body;
        this.isFullscreen.set(!!fullscreenEl);

        if (host.parentNode === target) return;

        this.originalParent = host.parentNode;
        this.nextSibling = host.nextSibling;
        target.appendChild(host);
        this.isTeleported = true;
    }

    /**
     * Restore toast host back to its original parent in the component tree.
     */
    private restore(): void {
        if (!this.isTeleported || !this.originalParent) return;
        const host = this.elementRef.nativeElement as HTMLElement;
        try {
            if (host.parentNode) {
                if (this.nextSibling && this.originalParent.contains(this.nextSibling)) {
                    this.originalParent.insertBefore(host, this.nextSibling);
                } else {
                    this.originalParent.appendChild(host);
                }
            }
        } catch {
            // Parent was detached, safe to ignore
        }
        this.isTeleported = false;
        this.isFullscreen.set(false);
        this.originalParent = null;
        this.nextSibling = null;
    }

    onMouseEnter(): void {
        this.toastService.pause();
    }

    onMouseLeave(): void {
        this.toastService.resume();
    }

    onTouchStart(event: TouchEvent): void {
        if (event.touches.length !== 1) return;
        this.touchStartY = event.touches[0].clientY;
        this.hasMoved = false;
        this.toastService.pause();
    }

    onTouchMove(event: TouchEvent, toast: ToastItem): void {
        if (event.touches.length !== 1) return;
        const currentY = event.touches[0].clientY;
        const rawDelta = currentY - this.touchStartY;
        const isBottom = toast.position !== 'top';

        // Natural drag in dismiss direction with slight damping, high resistance in opposite direction
        let offset = 0;
        if (isBottom) {
            offset = rawDelta > 0 ? rawDelta * 0.85 : rawDelta * 0.2;
        } else {
            offset = rawDelta < 0 ? rawDelta * 0.85 : rawDelta * 0.2;
        }

        if (Math.abs(rawDelta) > 6) {
            this.hasMoved = true;
            this.isDragging.set(true);
            this.dragOffsetY.set(offset);
        }
    }

    onTouchEnd(toast: ToastItem): void {
        if (!this.isDragging()) {
            this.toastService.resume();
            return;
        }

        const offset = this.dragOffsetY();
        const isBottom = toast.position !== 'top';
        const dismissThreshold = 35;

        this.isDragging.set(false);

        if ((isBottom && offset > dismissThreshold) || (!isBottom && offset < -dismissThreshold)) {
            this.toastService.dismiss(toast.id);
            setTimeout(() => this.dragOffsetY.set(0), 200);
        } else {
            this.dragOffsetY.set(0);
            this.toastService.resume();
        }
    }

    onTouchCancel(): void {
        this.isDragging.set(false);
        this.dragOffsetY.set(0);
        this.toastService.resume();
    }

    onToastClick(event: MouseEvent, toast: ToastItem): void {
        if (this.hasMoved) {
            this.hasMoved = false;
            return;
        }
        const target = event.target as HTMLElement;
        if (target && target.closest('.toast__action-btn')) {
            return;
        }
        this.toastService.dismiss(toast.id);
    }

    async executeAction(action: ToastAction): Promise<void> {
        try {
            await action.action();
        } finally {
            this.toastService.dismiss();
        }
    }
}
