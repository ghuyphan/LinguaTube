import { Component, ChangeDetectionStrategy, inject, output, signal, effect, input, viewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../playlist.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { I18nService } from '../../../core/services';
import { YoutubeService } from '../../video';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-playlist-panel',
    standalone: true,
    imports: [CommonModule, IconComponent, DragDropModule],
    templateUrl: './playlist-panel.component.html',
    styleUrls: ['./playlist-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistPanelComponent {
    private _playlistService = inject(PlaylistService);
    private _i18n = inject(I18nService);
    protected youtube = inject(YoutubeService);

    // Public getters for template binding
    get playlistService() { return this._playlistService; }
    get i18n() { return this._i18n; }

    isMobile = input<boolean>(false);
    embedded = input<boolean>(false);
    shouldScrollIntoView = input<boolean>(true); // Default true for normal usage, parent can control
    requestClose = output<void>();
    videoSelect = output<string>();
    openMenu = output<{ videoId: string, index: number, event: Event }>();

    // UI State
    isCopied = signal(false);

    // Signal query for playlist item elements
    readonly playlistItems = viewChildren<ElementRef<HTMLDivElement>>('playlistItem');

    private scrollPending = false;

    constructor() {
        // Track when scroll is needed
        effect(() => {
            const index = this._playlistService.currentIndex();
            const playlist = this._playlistService.currentPlaylist();
            const shouldScroll = this.shouldScrollIntoView();
            const items = this.playlistItems();

            if (playlist && index >= 0 && shouldScroll && items.length > 0) {
                this.scrollPending = true;
                // Defer scroll to after view update
                queueMicrotask(() => this.scrollToCurrentIndex());
            }
        });
    }

    private scrollToCurrentIndex(): void {
        if (!this.scrollPending) return;

        const index = this._playlistService.currentIndex();
        const items = this.playlistItems();

        if (items && items[index]) {
            items[index].nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.scrollPending = false;
        }
    }

    onVideoClick(videoId: string, index: number): void {
        this._playlistService.setCurrentIndex(index);
        this.videoSelect.emit(videoId);
    }

    async onShare(): Promise<void> {
        const playlist = this._playlistService.currentPlaylist();
        if (!playlist) return;

        const currentVideo = this.youtube.currentVideo();
        const videoId = currentVideo?.id;
        const shareUrl = this._playlistService.getShareUrl(playlist.id, videoId);
        const shareData = {
            title: playlist.title,
            text: `Listen to ${playlist.title} on Voca`,
            url: shareUrl
        };

        if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                return;
            } catch {
                // User dismissed or failed; fall through to clipboard
            }
        }

        const success = await this._playlistService.copyShareLink(playlist.id, videoId);
        if (success) {
            this.isCopied.set(true);
            setTimeout(() => this.isCopied.set(false), 2000);
        }
    }

    async drop(event: CdkDragDrop<string[]>) {
        const playlist = this.playlistService.currentPlaylist();
        if (!playlist || !playlist.isOwner) return;

        // Calculate new order
        const videoIds = [...playlist.videoIds];
        const [movedItem] = videoIds.splice(event.previousIndex, 1);
        videoIds.splice(event.currentIndex, 0, movedItem);

        // Call service to update
        // The service now handles optimistic updates, state management, and persistency atomically
        await this.playlistService.reorderVideos(playlist.id, videoIds);
    }

    openVideoMenu(index: number, videoId: string, event: Event): void {
        event.stopPropagation();
        this.openMenu.emit({ videoId, index, event });
    }
}
