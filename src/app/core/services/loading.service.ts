import { Injectable, signal, computed } from '@angular/core';

/**
 * Loading scopes for tracking different async operations
 */
export type LoadingScope =
    | 'transcript'      // Fetching/generating transcripts
    | 'subtitles'       // Loading/tokenizing subtitles
    | 'dictionary'      // Dictionary lookups
    | 'playlists'       // Loading playlists
    | 'history'         // Loading history
    | 'vocabulary'      // Vocabulary operations
    | 'sync'            // Background sync operations
    | 'translation';    // Translation requests

/**
 * Centralized Loading State Service
 * 
 * Provides a unified way to track loading states across the application.
 * Prevents inconsistent loading animations by centralizing state management.
 * 
 * Usage:
 * ```typescript
 * // In a component or service
 * loading = inject(LoadingService);
 * 
 * // Check if a specific scope is loading
 * isLoading = this.loading.isLoading('transcript');
 * 
 * // In template
 * @if (loading.isLoading('transcript')()) {
 *   <app-skeleton />
 * }
 * 
 * // Wrap async operations
 * await this.loading.wrap('transcript', async () => {
 *   return await this.fetchTranscript(videoId);
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
    // Internal state: Set of currently active loading scopes
    private readonly activeLoaders = signal<Set<LoadingScope>>(new Set());

    /**
     * Check if a specific scope is currently loading
     */
    isLoading(scope: LoadingScope) {
        return computed(() => this.activeLoaders().has(scope));
    }

    /**
     * Check if any scope is currently loading
     */
    readonly isAnyLoading = computed(() => this.activeLoaders().size > 0);

    /**
     * Get the count of active loading operations
     */
    readonly activeCount = computed(() => this.activeLoaders().size);

    /**
     * Get all currently active loading scopes
     */
    readonly activeScopes = computed(() => Array.from(this.activeLoaders()));

    /**
     * Start loading for a specific scope
     */
    start(scope: LoadingScope): void {
        this.activeLoaders.update(set => {
            const newSet = new Set(set);
            newSet.add(scope);
            return newSet;
        });
    }

    /**
     * Stop loading for a specific scope
     */
    stop(scope: LoadingScope): void {
        this.activeLoaders.update(set => {
            const newSet = new Set(set);
            newSet.delete(scope);
            return newSet;
        });
    }

    /**
     * Wrap an async operation with loading state management
     * Automatically starts loading before and stops after (even on error)
     */
    async wrap<T>(scope: LoadingScope, operation: () => Promise<T>): Promise<T> {
        this.start(scope);
        try {
            return await operation();
        } finally {
            this.stop(scope);
        }
    }

    /**
     * Create a scoped loading tracker for use in RxJS pipes
     * Returns start/stop functions bound to the scope
     */
    scoped(scope: LoadingScope) {
        return {
            start: () => this.start(scope),
            stop: () => this.stop(scope),
            isLoading: this.isLoading(scope)
        };
    }

    /**
     * Clear all loading states (useful for error recovery)
     */
    clearAll(): void {
        this.activeLoaders.set(new Set());
    }
}
