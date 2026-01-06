import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../playlist.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { VideoInfo } from '../../../models';

@Component({
    selector: 'app-playlist-panel',
    standalone: true,
    imports: [CommonModule, IconComponent],
    templateUrl: './playlist-panel.component.html',
    styleUrls: ['./playlist-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistPanelComponent {
    playlistService = inject(PlaylistService);

    close = output<void>();
    videoSelect = output<string>();

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
}
