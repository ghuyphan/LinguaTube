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
    private scrollY = 0;

    constructor() {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    /**
     * Lock body scroll
     * Increments counter so we only unlock when all modals are closed
     */
    lock(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        if (this.openModalsCount === 0) {
            this.scrollY = window.scrollY;

            this.renderer.addClass(this.document.body, 'no-scroll');
            this.renderer.setStyle(this.document.body, 'position', 'fixed');
            this.renderer.setStyle(this.document.body, 'width', '100%');
            this.renderer.setStyle(this.document.body, 'top', `-${this.scrollY}px`);
        }

        this.openModalsCount++;
    }

    /**
     * Unlock body scroll
     * Decrements counter and only unlocks if no modals are left open
     */
    unlock(): void {
        if (!isPlatformBrowser(this.platformId) || this.openModalsCount === 0) return;

        this.openModalsCount--;

        if (this.openModalsCount === 0) {
            this.renderer.removeClass(this.document.body, 'no-scroll');
            this.renderer.removeStyle(this.document.body, 'position');
            this.renderer.removeStyle(this.document.body, 'width');
            this.renderer.removeStyle(this.document.body, 'top');
            window.scrollTo(0, this.scrollY);
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
