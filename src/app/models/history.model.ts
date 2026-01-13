/**
 * History model for tracking watched videos
 * Matches PocketBase 'history' collection schema
 */
export interface HistoryItem {
    id: string;                              // PocketBase record ID or local UUID
    video_id: string;                        // YouTube video ID (required)
    title: string;                           // Video title
    thumbnail?: string;                      // Thumbnail URL
    channel?: string;                        // Channel name
    duration?: number;                       // Video duration in seconds
    language: 'ja' | 'zh' | 'ko' | 'en';    // Content language (deprecated, use languages)
    languages?: ('ja' | 'zh' | 'ko' | 'en')[];  // Available transcript languages (optional for backward compat)
    watched_at: Date;                        // Last watched timestamp
    progress: number;                        // Playback progress (0-100%)
    is_favorite: boolean;                    // Favorited flag
    synced?: boolean;                        // Synchronization status
}

/**
 * Local storage format for guest users
 */
export interface LocalHistoryData {
    items: HistoryItem[];
    updatedAt: string;
}
