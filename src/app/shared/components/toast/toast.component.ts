import { Component, ChangeDetectionStrategy, inject, ElementRef, PLATFORM_ID, OnDestroy, effect } from '@angular/core';
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
            <div 
                class="toast" 
                [class.toast--success]="toast.type === 'success'"
                [class.toast--error]="toast.type === 'error'"
                [class.toast--warning]="toast.type === 'warning'"
                [class.toast--info]="toast.type === 'info'"
                [class.toast--top]="toast.position === 'top'"
                [class.toast--bottom]="toast.position === 'bottom'"
                [class.toast--exiting]="toastService.isExiting()"
                role="status"
                aria-live="polite"
                (click)="onToastClick(toast)">
                <app-icon [name]="toast.icon" [size]="16" />
                <span class="toast__text">{{ toast.message }}</span>
                @if (toast.action; as action) {
                    <button 
                        type="button" 
                        class="toast__action-btn" 
                        (click)="$event.stopPropagation(); executeAction(action)">
                        {{ action.label }}
                    </button>
                }
            </div>
        }
    `
})
export class ToastComponent implements OnDestroy {
    readonly toastService = inject(ToastService);
    private readonly elementRef = inject(ElementRef);
    private readonly platformId = inject(PLATFORM_ID);

    private originalParent: Node | null = null;
    private nextSibling: Node | null = null;
    private isTeleported = false;

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

        const target = document.fullscreenElement || document.body;
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
        this.originalParent = null;
        this.nextSibling = null;
    }

    onToastClick(toast: ToastItem): void {
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
