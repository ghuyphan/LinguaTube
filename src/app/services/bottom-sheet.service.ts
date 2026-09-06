import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BodyScrollService } from './body-scroll.service';

/**
 * Reference to a registered sheet in the stack
 */
export interface SheetRef {
    id: string;
    close: () => void;
    allowEscape?: boolean;
}

/**
 * Centralized service for managing bottom sheet stacking and back button handling.
 * 
 * Features:
 * - LIFO (Last In, First Out) stack for proper nested sheet dismissal
 * - Single popstate listener for back button handling
 * - Single keydown listener for Escape key handling
 * - Automatic z-index management
 * - Coordinated scroll locking
 */
@Injectable({ providedIn: 'root' })
export class BottomSheetService {
    private platformId = inject(PLATFORM_ID);
    private bodyScroll = inject(BodyScrollService);

    // Stack of currently open sheets (topmost = last)
    private sheetStack = signal<SheetRef[]>([]);

    // Track if we've set up the popstate listener
    private historyListenerActive = false;

    // Bound handlers for cleanup
    private boundPopStateHandler = this.onPopState.bind(this);
    private boundKeyDownHandler = this.onKeyDown.bind(this);

    // Track when history.back() is called programmatically to ignore the resulting popstate event
    private poppingSheetId: string | null = null;

    // Flag to suppress history.back() when closing a sheet during route navigation
    private skipHistoryPop = false;

    /**
     * Skip popping browser history on the next sheet unregister (e.g. during route navigation)
     */
    skipNextHistoryPop(): void {
        this.skipHistoryPop = true;
    }

    /**
     * Get current stack depth (useful for z-index calculation)
     */
    get depth(): number {
        return this.sheetStack().length;
    }

    /**
     * Check if any sheets are currently open
     */
    get hasOpenSheets(): boolean {
        return this.sheetStack().length > 0;
    }

    /**
     * Register a sheet when it opens.
     * Returns an unregister function to be called when the sheet closes.
     */
    register(sheet: SheetRef): () => void {
        if (!isPlatformBrowser(this.platformId)) {
            return () => { };
        }

        // Add to stack
        this.sheetStack.update(stack => [...stack, sheet]);

        // Push history state for back button support
        this.pushHistoryState(sheet.id);

        // Set up listeners if not already active
        if (!this.historyListenerActive) {
            window.addEventListener('popstate', this.boundPopStateHandler);
            document.addEventListener('keydown', this.boundKeyDownHandler);
            this.historyListenerActive = true;
        }

        // Lock body scroll
        this.bodyScroll.lock();

        // Return unregister function
        return () => this.unregister(sheet.id, true);
    }

    /**
     * Unregister a sheet (removes from stack without triggering close callback)
     * @param id The sheet ID
     * @param popHistory Whether to pop the browser history state if this sheet pushed it
     */
    private unregister(id: string, popHistory = false): void {
        this.sheetStack.update(stack => stack.filter(s => s.id !== id));

        // Unlock scroll
        this.bodyScroll.unlock();

        if (this.skipHistoryPop) {
            popHistory = false;
            this.skipHistoryPop = false;
        }

        // Pop history entry if it belongs to this sheet and wasn't already popped by back button
        if (popHistory && isPlatformBrowser(this.platformId)) {
            try {
                if (window.history.state?.bottomSheet && window.history.state?.sheetId === id) {
                    this.poppingSheetId = id;
                    window.history.back();
                }
            } catch {
                // history navigation might fail in restricted environments
            }
        }

        // Clean up listeners if no more sheets
        if (this.sheetStack().length === 0 && this.historyListenerActive) {
            window.removeEventListener('popstate', this.boundPopStateHandler);
            document.removeEventListener('keydown', this.boundKeyDownHandler);
            this.historyListenerActive = false;
        }
    }

    /**
     * Close the topmost sheet (called by back button)
     * Returns true if a sheet was closed
     */
    closeTop(): boolean {
        const stack = this.sheetStack();
        if (stack.length === 0) return false;

        const topSheet = stack[stack.length - 1];

        // Remove from stack and cleanly pop history
        this.unregister(topSheet.id, true);

        // Call the close callback
        topSheet.close();

        return true;
    }

    /**
     * Close all open sheets
     */
    closeAll(): void {
        const stack = [...this.sheetStack()];

        // Close from top to bottom
        for (let i = stack.length - 1; i >= 0; i--) {
            this.unregister(stack[i].id, true);
            stack[i].close();
        }
    }

    /**
     * Push a history state for back button navigation
     */
    private pushHistoryState(sheetId: string): void {
        history.pushState({ bottomSheet: true, sheetId }, '');
    }

    /**
     * Handle browser back button
     */
    private onPopState(_event: PopStateEvent): void {
        // If this popstate was triggered programmatically by our own unregister(), ignore it
        if (this.poppingSheetId) {
            this.poppingSheetId = null;
            return;
        }

        const stack = this.sheetStack();
        if (stack.length === 0) return;

        // The popstate just occurred, meaning a sheet's history entry was already popped by the browser
        const topSheet = stack[stack.length - 1];

        // Don't call history.back() - it was already popped by the back button
        this.unregister(topSheet.id, false);
        topSheet.close();
    }

    /**
     * Handle global keydown events (specifically Escape)
     */
    private onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            const stack = this.sheetStack();
            if (stack.length === 0) return;

            const topSheet = stack[stack.length - 1];

            // Only close if the sheet allows it (default is true)
            if (topSheet.allowEscape !== false) {
                event.preventDefault();
                event.stopPropagation();

                // mimic back button behavior
                this.closeTop();

                // Ideally we should also pop history if we are manually closing, 
                // but we'll stick to established pattern for now to avoid side effects.
                if (isPlatformBrowser(this.platformId)) {
                    // Start a microtask to pop history? Or just leave it?
                    // The existing manual 'close()' does not pop history, so we won't either.
                }
            }
        }
    }

    /**
     * Get z-index for a sheet based on its position in the stack
     * Base z-index is 1000, each nested sheet adds 10
     */
    getZIndex(sheetId: string): number {
        const stack = this.sheetStack();
        const index = stack.findIndex(s => s.id === sheetId);
        return 2000 + (index >= 0 ? index * 10 : 0);
    }
}
