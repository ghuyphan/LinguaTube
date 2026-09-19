import { Component, ChangeDetectionStrategy, input, output, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CreatePlaylistDialogComponent } from '../../../shared/components/create-playlist-dialog/create-playlist-dialog.component';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../../../models';
import { I18nService, ToastService } from '../../../core/services';

@Component({
    selector: 'app-add-to-playlist-dialog',
    standalone: true,
    imports: [CommonModule, BottomSheetComponent, IconComponent, CreatePlaylistDialogComponent],
    templateUrl: './add-to-playlist-dialog.component.html',
    styleUrls: ['./add-to-playlist-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToPlaylistDialogComponent {
    playlistService = inject(PlaylistService);
    i18n = inject(I18nService);
    toast = inject(ToastService);

    // Inputs
    isOpen = input<boolean>(false);
    videoId = input.required<string>();

    // Outputs
    closed = output<void>();

    // State
    showCreateDialog = signal(false);

    // Computed
    playlists = this.playlistService.myPlaylists;

    readonly savedPlaylistIds = computed(() => {
        const vid = this.videoId();
        const set = new Set<string>();
        for (const pl of this.playlists()) {
            if (pl.videoIds.includes(vid)) {
                set.add(pl.id);
            }
        }
        return set;
    });

    // Helper to check if video is in playlist
    isInPlaylist(playlist: Playlist): boolean {
        return this.savedPlaylistIds().has(playlist.id);
    }

    onTogglePlaylist(playlist: Playlist): void {
        const videoId = this.videoId();
        const isCurrentlyInPlaylist = this.isInPlaylist(playlist);

        if (isCurrentlyInPlaylist) {
            this.playlistService.removeVideo(playlist.id, videoId);
            this.toast.info(this.i18n.t('playlist.removedSuccess', { title: playlist.title }) || `Removed from ${playlist.title}`);
        } else {
            this.playlistService.addVideo(playlist.id, videoId);
            this.toast.success(this.i18n.t('playlist.addedSuccess', { title: playlist.title }) || `Added to ${playlist.title}`);
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
