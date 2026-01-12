import { Signal } from '@angular/core';
import { Playlist } from '../../models';

export interface IPlaylistRepository {
    /**
     * Get all playlists as a reactive signal
     */
    getPlaylists(): Signal<Playlist[]>;

    /**
     * Get a single playlist by ID
     */
    getPlaylist(id: string): Promise<Playlist | null>;

    /**
     * Create a new playlist
     */
    createPlaylist(playlist: Playlist): Promise<void>;

    /**
     * Update an existing playlist
     */
    updatePlaylist(id: string, charges: Partial<Playlist>): Promise<void>;

    /**
     * Delete a playlist
     */
    deletePlaylist(id: string): Promise<void>;

    /**
     * Refresh data (trigger sync/reload)
     */
    refresh(): Promise<void>;
}
