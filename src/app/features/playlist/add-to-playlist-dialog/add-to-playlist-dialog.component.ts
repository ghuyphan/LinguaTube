import { Component, ChangeDetectionStrategy, input, output, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CreatePlaylistDialogComponent } from '../../../shared/components/create-playlist-dialog/create-playlist-dialog.component';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../../../models';
import { I18nService } from '../../../services';

import { MascotComponent } from '../../../components/mascot/mascot.component';

@Component({
    selector: 'app-add-to-playlist-dialog',
    standalone: true,
    imports: [CommonModule, BottomSheetComponent, IconComponent, CreatePlaylistDialogComponent, MascotComponent],
    templateUrl: './add-to-playlist-dialog.component.html',
    styleUrls: ['./add-to-playlist-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToPlaylistDialogComponent {
    playlistService = inject(PlaylistService);
    i18n = inject(I18nService);

    // Inputs
    isOpen = input<boolean>(false);
    videoId = input.required<string>();

    // Outputs
    closed = output<void>();

    @ViewChild(BottomSheetComponent) sheet!: BottomSheetComponent;

    // State
    showCreateDialog = signal(false);

    // Computed
    playlists = this.playlistService.myPlaylists;

    // Helper to check if video is in playlist
    isInPlaylist(playlist: Playlist): boolean {
        return playlist.videoIds.includes(this.videoId());
    }

    onTogglePlaylist(playlist: Playlist): void {
        const videoId = this.videoId();
        const isCurrentlyInPlaylist = this.isInPlaylist(playlist);

        if (isCurrentlyInPlaylist) {
            this.playlistService.removeVideo(playlist.id, videoId);
        } else {
            this.playlistService.addVideo(playlist.id, videoId);
        }
    }

    openCreateDialog(): void {
        this.showCreateDialog.set(true);
    }

    onCreateDialogClosed(): void {
        this.showCreateDialog.set(false);
    }

    onSheetClosed(): void {
        if (!this.showCreateDialog()) {
            this.closed.emit();
        }
    }
}
