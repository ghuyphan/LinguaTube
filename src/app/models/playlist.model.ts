/**
 * Playlist models for shareable playlist feature
 * Matches PocketBase 'playlists' collection schema
 */

export type PlaylistVisibility = 'private' | 'unlisted' | 'published';
export type PlaylistLanguage = 'ja' | 'zh' | 'ko' | 'en';

/**
 * Core playlist interface matching PocketBase schema
 */
export interface Playlist {
    id: string;
    userId: string;
    userName?: string;  // Creator's display name (expanded from user relation)
    title: string;
    description?: string;
    visibility: PlaylistVisibility;
    language: PlaylistLanguage;
    tags: string[];
    videoIds: string[];
    videoCount: number;
    thumbnail?: string;
    saveCount: number;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    synced?: boolean;
}

/**
 * Video item within a playlist with display metadata
 */
export interface PlaylistVideo {
    videoId: string;
    title: string;
    thumbnail: string;
    channel?: string;
    duration?: number;
    position: number;  // Index in playlist (0-based)
}

/**
 * Playlist with hydrated video metadata for display
 */
export interface PlaylistWithVideos extends Playlist {
    videos: PlaylistVideo[];
    isOwner: boolean;      // Current user owns this playlist
    isSaved: boolean;      // Current user has saved this playlist
}

/**
 * Input for creating a new playlist
 */
export interface CreatePlaylistInput {
    title: string;
    description?: string;
    visibility?: PlaylistVisibility;
    language?: PlaylistLanguage;
    tags?: string[];
}

/**
 * Playlist save record (user saving another's playlist)
 */
export interface PlaylistSave {
    id: string;
    userId: string;
    playlistId: string;
    savedAt: Date;
}

/**
 * Predefined tags for playlist categorization
 */
export const PLAYLIST_TAGS = [
    'music',
    'anime',
    'drama',
    'news',
    'learning',
    'podcast',
    'vlog',
    'gaming'
] as const;

export type PlaylistTag = typeof PLAYLIST_TAGS[number];

/**
 * Local storage format for guest users
 */
export interface LocalPlaylistData {
    playlists: Playlist[];
    updatedAt: string;
}

/**
 * PocketBase playlist record schema
 */
export interface PlaylistRecord {
    id: string;
    user?: string;
    title?: string;
    description?: string;
    visibility?: PlaylistVisibility;
    language?: PlaylistLanguage;
    tags?: string[];
    video_ids?: string[];
    video_count?: number;
    thumbnail?: string;
    save_count?: number;
    is_featured?: boolean;
    created: string;
    updated: string;
    expand?: {
        user?: {
            name?: string;
            username?: string;
        };
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

/**
 * Maps a PocketBase record to a Playlist entity
 */
export function mapRecordToPlaylist(record: PlaylistRecord | Record<string, unknown>): Playlist {
    const r = record as PlaylistRecord;
    const userName = r.expand?.user?.name || r.expand?.user?.username;

    return {
        id: r.id,
        userId: r.user || '',
        userName: userName,
        title: r.title || '',
        description: r.description,
        visibility: r.visibility || 'private',
        language: r.language || 'en',
        tags: r.tags || [],
        videoIds: r.video_ids || [],
        videoCount: r.video_count || 0,
        thumbnail: r.thumbnail,
        saveCount: r.save_count || 0,
        isFeatured: r.is_featured || false,
        createdAt: r.created ? new Date(r.created) : new Date(),
        updatedAt: r.updated ? new Date(r.updated) : new Date(),
        synced: true
    };
}

