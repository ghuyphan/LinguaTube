import { Signal } from '@angular/core';
import { HistoryItem } from '../../models';

export interface IHistoryRepository {
    /**
     * Get all history items as a reactive signal
     */
    getHistory(): Signal<HistoryItem[]>;

    /**
     * Add or update an item in history
     */
    addToHistory(item: HistoryItem): Promise<void>;

    /**
     * Remove an item from history
     */
    removeFromHistory(id: string): Promise<void>;

    /**
     * Clear all history
     */
    clearHistory(): Promise<void>;

    /**
     * Refresh data (trigger sync/reload)
     */
    refresh(): Promise<void>;
}
