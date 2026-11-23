import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';
import { OfflinePlaylistRepository } from '../../core/repositories';
import { AuthService, SettingsService } from '../../core/services';
import { SupabaseService } from '../../core/services/supabase.service';
import { VideoLevelService } from '../../core/services/video-level.service';
import { YoutubeService } from '../video';
import { PlaylistService } from './playlist.service';

describe('PlaylistService share URLs', () => {
    let service: PlaylistService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...[AuthService, SettingsService, SupabaseService, VideoLevelService]
                    .map(provide => ({ provide, useValue: {} })),
                { provide: OfflinePlaylistRepository, useValue: { getPlaylists: () => signal([]) } },
                { provide: YoutubeService, useValue: { nextTrack$: EMPTY, previousTrack$: EMPTY } }
            ]
        });
        service = TestBed.inject(PlaylistService);
    });

    it('opens playlist details when sharing the playlist itself', () => {
        expect(service.getShareUrl('public-playlist_123'))
            .toBe(`${window.location.origin}/explore?playlist=public-playlist_123`);
    });

    it('keeps the selected video in the linked playlist', () => {
        expect(service.getShareUrl('public-playlist_123', 'dQw4w9WgXcQ'))
            .toBe(`${window.location.origin}/video?playlist=public-playlist_123&id=dQw4w9WgXcQ`);
    });
});
