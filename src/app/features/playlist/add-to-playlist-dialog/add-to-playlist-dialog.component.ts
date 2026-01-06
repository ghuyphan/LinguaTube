import { Component, ChangeDetectionStrategy, input, output, inject, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CreatePlaylistDialogComponent } from '../../../shared/components/create-playlist-dialog/create-playlist-dialog.component';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../../../models';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
    selector: 'app-add-to-playlist-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule, BottomSheetComponent, IconComponent, CreatePlaylistDialogComponent],
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

    onTogglePlaylist(playlist: Playlist, event: Event): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        const videoId = this.videoId();

        if (isChecked) {
            this.playlistService.addVideo(playlist.id, videoId)
                .then(() => {
                    // Optional: Show toast
                });
        } else {
            this.playlistService.removeVideo(playlist.id, videoId)
                .then(() => {
                    // Optional: Show toast
                });
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
