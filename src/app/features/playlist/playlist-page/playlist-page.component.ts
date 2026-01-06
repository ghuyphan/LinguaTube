import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CreatePlaylistDialogComponent } from '../../../shared/components/create-playlist-dialog/create-playlist-dialog.component';
import { I18nService } from '../../../services';
import { Playlist } from '../../../models';

@Component({
    selector: 'app-playlist-page',
    standalone: true,
    imports: [CommonModule, IconComponent, CreatePlaylistDialogComponent],
    templateUrl: './playlist-page.component.html',
    styleUrls: ['./playlist-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistPageComponent {
    playlistService = inject(PlaylistService);
    i18n = inject(I18nService);
    private router = inject(Router);

    showCreateDialog = signal(false);
    view = signal<'my' | 'community'>('my');

    playlists = this.playlistService.myPlaylists;
    communityPlaylists = this.playlistService.communityPlaylists;

    setView(view: 'my' | 'community'): void {
        this.view.set(view);
        if (view === 'community' && this.communityPlaylists().length === 0) {
            this.playlistService.loadCommunityPlaylists();
        }
    }

    playPlaylist(playlist: Playlist): void {
        if (playlist.videoIds.length === 0) return;

        // Navigate to video page, loading first video and setting playlist context
        this.router.navigate(['/video'], {
            queryParams: {
                id: playlist.videoIds[0],
                playlist: playlist.id
            }
        });
    }

    getCreatorLabel(userId: string): string {
        const template = this.i18n.t('playlist.by') || 'by {{author}}';
        return template.replace('{{author}}', userId);
    }

    getVideoCountLabel(count: number): string {
        const template = this.i18n.t('playlist.videoCount') || '{{count}} video{{plural}}';
        return template
            .replace('{{count}}', count.toString())
            .replace('{{plural}}', count === 1 ? '' : 's');
    }
}
