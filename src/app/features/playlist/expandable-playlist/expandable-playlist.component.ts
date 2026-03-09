
import { Component, ChangeDetectionStrategy, signal, input, output, inject, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistWithVideos, VideoInfo } from '../../../models';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PlaylistPanelComponent } from '../playlist-panel/playlist-panel.component';
import { BodyScrollService } from '../../../services/body-scroll.service';

@Component({
    selector: 'app-expandable-playlist',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent, PlaylistPanelComponent],
    templateUrl: './expandable-playlist.component.html',
    styleUrls: ['./expandable-playlist.component.scss']
})
export class ExpandablePlaylistComponent implements OnDestroy {
    private bodyScroll = inject(BodyScrollService);

    // Inputs
    currentVideo = input<VideoInfo | null>(null);
    playlist = input<PlaylistWithVideos | null>(null);
    currentIndex = input<number>(0);
    isHidden = input<boolean>(false); // Hide when command palette is open

    // Outputs
    videoSelect = output<string>();
    requestClose = output<void>();
    openMenu = output<{ videoId: string, index: number, event: Event }>();
    openCommandPalette = output<void>();
    addToPlaylist = output<void>();
    prevVideo = output<void>();
    nextVideo = output<void>();

    // State
    isExpanded = signal(false);
    isAnimating = signal(false);
    isTransitioning = signal(false); // Animation state for video switches

    // Track previous video id for transition detection
    private _lastVideoId: string | null = null;

    // Computed navigation state
    canGoPrev = () => this.playlist() && this.currentIndex() > 0;
    canGoNext = () => {
        const pl = this.playlist();
        return pl && this.currentIndex() < pl.videos.length - 1;
    };

    constructor() {
        // Handle body scroll locking side effect
        effect(() => {
            if (this.isExpanded()) {
                this.bodyScroll.lock();
            } else {
                this.bodyScroll.unlock();
            }
        });

        // Detect video changes and trigger transition animation
        effect(() => {
            const video = this.currentVideo();
            const videoId = video?.id ?? null;

            if (this._lastVideoId !== null && videoId !== null && this._lastVideoId !== videoId) {
                // Video changed, trigger transition
                this.isTransitioning.set(true);
                setTimeout(() => this.isTransitioning.set(false), 250);
            }
            this._lastVideoId = videoId;
        });
    }

    ngOnDestroy() {
        // Ensure we unlock if component is destroyed while expanded
        if (this.isExpanded()) {
            this.bodyScroll.unlock();
        }
    }

    toggleExpand() {
        if (!this.playlist()) {
            return; // Single mode doesn't expand
        }
        this.isExpanded.update(v => !v);
    }

    collapse() {
        this.isExpanded.set(false);
    }

    expand() {
        if (this.playlist()) {
            this.isExpanded.set(true);
        }
    }

    onActionClick(event: Event) {
        event.stopPropagation();
        this.toggleExpand();
    }

    onVideoSelect(videoId: string) {
        this.videoSelect.emit(videoId);
    }

    onPrev(event: Event) {
        event.stopPropagation();
        if (this.canGoPrev()) {
            this.prevVideo.emit();
        }
    }

    onNext(event: Event) {
        event.stopPropagation();
        if (this.canGoNext()) {
            this.nextVideo.emit();
        }
    }

    // Single video mode handlers
    onSearchClick(event: Event) {
        event.stopPropagation();
        this.openCommandPalette.emit();
    }

    onAddToPlaylistClick(event: Event) {
        event.stopPropagation();
        this.addToPlaylist.emit();
    }
}
