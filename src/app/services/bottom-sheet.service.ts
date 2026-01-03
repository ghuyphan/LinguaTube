import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BodyScrollService } from './body-scroll.service';

/**
 * Reference to a registered sheet in the stack
 */
export interface SheetRef {
    id: string;
    close: () => void;
}

/**
 * Centralized service for managing bottom sheet stacking and back button handling.
 * 
 * Features:
 * - LIFO (Last In, First Out) stack for proper nested sheet dismissal
 * - Single popstate listener for back button handling
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

    // Bound handler for cleanup
    private boundPopStateHandler = this.onPopState.bind(this);

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

        // Set up popstate listener if not already active
        if (!this.historyListenerActive) {
            window.addEventListener('popstate', this.boundPopStateHandler);
            this.historyListenerActive = true;
        }

        // Lock body scroll
        this.bodyScroll.lock();

        // Return unregister function
        return () => this.unregister(sheet.id);
    }

    /**
     * Unregister a sheet (removes from stack without triggering close callback)
     */
    private unregister(id: string): void {
        this.sheetStack.update(stack => stack.filter(s => s.id !== id));

        // Unlock scroll
        this.bodyScroll.unlock();

        // Clean up listener if no more sheets
        if (this.sheetStack().length === 0 && this.historyListenerActive) {
            window.removeEventListener('popstate', this.boundPopStateHandler);
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

        // Remove from stack first to prevent double-close
        this.unregister(topSheet.id);

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
            this.unregister(stack[i].id);
            stack[i].close();
        }

        // Clean up any remaining history states
        // Note: This is a best-effort cleanup
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
    private onPopState(event: PopStateEvent): void {
        // Check if this popstate is for a bottom sheet
        // When back is pressed, we need to close the topmost sheet
        const stack = this.sheetStack();
        if (stack.length === 0) return;

        // The popstate just occurred, meaning a sheet's history entry was popped
        // We need to close the topmost sheet
        const topSheet = stack[stack.length - 1];

        // Check if the popped state belongs to our sheet system
        // If event.state is null or doesn't have our sheetId, the top sheet was popped
        const newStateSheetId = event.state?.sheetId;

        // Find if this sheetId is still in our stack
        const isStillInStack = newStateSheetId && stack.some(s => s.id === newStateSheetId);

        // If the new state's sheet is not the top of our stack, close the top
        if (!isStillInStack || newStateSheetId !== topSheet.id) {
            // Don't manipulate history - it was already popped by the back button
            this.unregister(topSheet.id);
            topSheet.close();
        }
    }

    /**
     * Get z-index for a sheet based on its position in the stack
     * Base z-index is 1000, each nested sheet adds 10
     */
    getZIndex(sheetId: string): number {
        const stack = this.sheetStack();
        const index = stack.findIndex(s => s.id === sheetId);
        return 1000 + (index >= 0 ? index * 10 : 0);
    }
}
