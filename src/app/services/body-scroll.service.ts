import { Injectable, inject, RendererFactory2, Renderer2, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BodyScrollService {
    private document = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);
    private rendererFactory = inject(RendererFactory2);
    private renderer: Renderer2;

    // Counter to handle multiple open modals
    private openModalsCount = 0;

    // Listeners for event-based scroll blocking
    private wheelHandler: ((e: WheelEvent) => void) | null = null;
    private touchMoveHandler: ((e: TouchEvent) => void) | null = null;

    constructor() {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    /**
     * Check if an event target is inside an actively scrollable modal element
     */
    private isInsideScrollableModal(target: EventTarget | null): boolean {
        if (!(target instanceof HTMLElement)) return false;

        // Allow scrolling inside bottom sheet content, command palette, or scrollable dialog containers
        return !!target.closest(
            '.sheet-content, .command-palette__results, [role="dialog"] .overflow-y-auto, [data-modal-scrollable="true"], .modal-scroll-area, .dialog-body, .achievements-dialog, .streak-dialog, .ai-credits-dialog'
        );
    }

    /**
     * Lock background scroll
     * Preserves window.scrollY and position: sticky elements 100% by blocking scroll events on background/backdrop
     */
    lock(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        if (this.openModalsCount === 0) {
            this.renderer.addClass(this.document.body, 'modal-open');

            this.wheelHandler = (e: WheelEvent) => {
                if (!this.isInsideScrollableModal(e.target)) {
                    e.preventDefault();
                }
            };

            this.touchMoveHandler = (e: TouchEvent) => {
                if (!this.isInsideScrollableModal(e.target)) {
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                }
            };

            window.addEventListener('wheel', this.wheelHandler, { passive: false });
            window.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
        }

        this.openModalsCount++;
    }

    /**
     * Unlock background scroll
     * Decrements counter and only unlocks if no modals are left open
     */
    unlock(): void {
        if (!isPlatformBrowser(this.platformId) || this.openModalsCount === 0) return;

        this.openModalsCount--;

        if (this.openModalsCount === 0) {
            this.renderer.removeClass(this.document.body, 'modal-open');

            if (this.wheelHandler) {
                window.removeEventListener('wheel', this.wheelHandler);
                this.wheelHandler = null;
            }
            if (this.touchMoveHandler) {
                window.removeEventListener('touchmove', this.touchMoveHandler);
                this.touchMoveHandler = null;
            }
        }
    }

    /**
     * Force reset (useful for cleanup)
     */
    reset(): void {
        this.openModalsCount = 1;
        this.unlock();
    }
}
