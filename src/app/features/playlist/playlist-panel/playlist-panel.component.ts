import { Component, ChangeDetectionStrategy, inject, output, signal, effect, input, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
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
export class PlaylistPanelComponent implements AfterViewInit {
    private _playlistService = inject(PlaylistService);
    private _i18n = inject(I18nService);

    // Public getters for template binding
    get playlistService() { return this._playlistService; }
    get i18n() { return this._i18n; }

    isMobile = input<boolean>(false);
    close = output<void>();
    videoSelect = output<string>();

    // ViewChildren for scroll management
    @ViewChildren('playlistItem') playlistItems!: QueryList<ElementRef<HTMLDivElement>>;

    // Menu state
    menuOpen = signal(false);
    selectedVideoIndex = signal<number>(-1);
    selectedVideoId = signal<string>('');

    private scrollPending = false;

    constructor() {
        // Track when scroll is needed
        effect(() => {
            const index = this._playlistService.currentIndex();
            const playlist = this._playlistService.currentPlaylist();

            if (playlist && index >= 0) {
                this.scrollPending = true;
                // Defer scroll to after view update
                queueMicrotask(() => this.scrollToCurrentIndex());
            }
        });
    }

    ngAfterViewInit(): void {
        // Subscribe to changes in the list
        this.playlistItems.changes.subscribe(() => {
            if (this.scrollPending) {
                this.scrollToCurrentIndex();
            }
        });
    }

    private scrollToCurrentIndex(): void {
        if (!this.scrollPending) return;

        const index = this._playlistService.currentIndex();
        const items = this.playlistItems?.toArray();

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
        if (playlist) {
            await this._playlistService.copyShareLink(playlist.id);
        }
    }

    openVideoMenu(index: number, videoId: string, event: Event): void {
        event.stopPropagation();
        this.selectedVideoIndex.set(index);
        this.selectedVideoId.set(videoId);
        this.menuOpen.set(true);
    }

    async moveVideoUp(): Promise<void> {
        const playlist = this._playlistService.currentPlaylist();
        const index = this.selectedVideoIndex();
        if (!playlist || index <= 0) return;

        const videoIds = [...playlist.videoIds];
        [videoIds[index - 1], videoIds[index]] = [videoIds[index], videoIds[index - 1]];

        await this._playlistService.reorderVideos(playlist.id, videoIds);
        this.menuOpen.set(false);
    }

    async moveVideoDown(): Promise<void> {
        const playlist = this._playlistService.currentPlaylist();
        const index = this.selectedVideoIndex();
        if (!playlist || index >= playlist.videos.length - 1) return;

        const videoIds = [...playlist.videoIds];
        [videoIds[index], videoIds[index + 1]] = [videoIds[index + 1], videoIds[index]];

        await this._playlistService.reorderVideos(playlist.id, videoIds);
        this.menuOpen.set(false);
    }

    async removeVideo(): Promise<void> {
        const playlist = this._playlistService.currentPlaylist();
        const videoId = this.selectedVideoId();
        if (!playlist || !videoId) return;

        await this._playlistService.removeVideo(playlist.id, videoId);
        this.menuOpen.set(false);
    }
}
