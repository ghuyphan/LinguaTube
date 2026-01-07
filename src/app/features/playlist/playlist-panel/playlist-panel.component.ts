import { Component, ChangeDetectionStrategy, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../playlist.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { I18nService } from '../../../services';

@Component({
    selector: 'app-playlist-panel',
    standalone: true,
    imports: [CommonModule, IconComponent, BottomSheetComponent],
    templateUrl: './playlist-panel.component.html',
    styleUrls: ['./playlist-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistPanelComponent {
    playlistService = inject(PlaylistService);
    i18n = inject(I18nService);

    close = output<void>();
    videoSelect = output<string>();

    // Menu state
    menuOpen = signal(false);
    selectedVideoIndex = signal<number>(-1);
    selectedVideoId = signal<string>('');

    onVideoClick(videoId: string, index: number): void {
        this.playlistService.setCurrentIndex(index);
        this.videoSelect.emit(videoId);
    }

    async onShare(): Promise<void> {
        const playlist = this.playlistService.currentPlaylist();
        if (playlist) {
            await this.playlistService.copyShareLink(playlist.id);
            // TODO: Show toast "Link copied"
        }
    }

    // Open video menu (3-dot)
    openVideoMenu(index: number, videoId: string, event: Event): void {
        event.stopPropagation(); // Prevent triggering video click
        this.selectedVideoIndex.set(index);
        this.selectedVideoId.set(videoId);
        this.menuOpen.set(true);
    }

    // Move video up in playlist
    async moveVideoUp(): Promise<void> {
        const playlist = this.playlistService.currentPlaylist();
        const index = this.selectedVideoIndex();
        if (!playlist || index <= 0) return;

        const videoIds = [...playlist.videoIds];
        [videoIds[index - 1], videoIds[index]] = [videoIds[index], videoIds[index - 1]];

        await this.playlistService.reorderVideos(playlist.id, videoIds);
        this.menuOpen.set(false);
    }

    // Move video down in playlist
    async moveVideoDown(): Promise<void> {
        const playlist = this.playlistService.currentPlaylist();
        const index = this.selectedVideoIndex();
        if (!playlist || index >= playlist.videos.length - 1) return;

        const videoIds = [...playlist.videoIds];
        [videoIds[index], videoIds[index + 1]] = [videoIds[index + 1], videoIds[index]];

        await this.playlistService.reorderVideos(playlist.id, videoIds);
        this.menuOpen.set(false);
    }

    // Remove video from playlist
    async removeVideo(): Promise<void> {
        const playlist = this.playlistService.currentPlaylist();
        const videoId = this.selectedVideoId();
        if (!playlist || !videoId) return;

        await this.playlistService.removeVideo(playlist.id, videoId);
        this.menuOpen.set(false);
    }
}
