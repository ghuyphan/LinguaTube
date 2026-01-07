import { Component, ChangeDetectionStrategy, inject, signal, computed, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CreatePlaylistDialogComponent } from '../../../shared/components/create-playlist-dialog/create-playlist-dialog.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { I18nService } from '../../../services';
import { Playlist } from '../../../models';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-playlist-page',
    standalone: true,
    imports: [CommonModule, IconComponent, CreatePlaylistDialogComponent, ScrollingModule, BottomSheetComponent],
    templateUrl: './playlist-page.component.html',
    styleUrls: ['./playlist-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistPageComponent {
    playlistService = inject(PlaylistService);
    i18n = inject(I18nService);
    private router = inject(Router);

    showCreateDialog = signal(false);
    editingPlaylist = signal<Playlist | null>(null);

    view = signal<'my' | 'community'>('my');

    // Menu State
    menuOpen = signal(false);
    deleteConfirmationOpen = signal(false);
    selectedPlaylist = signal<Playlist | null>(null);

    playlists = this.playlistService.myPlaylists;
    communityPlaylists = this.playlistService.communityPlaylists;

    // Virtualization Logic
    private screenWidth = signal(typeof window !== 'undefined' ? window.innerWidth : 1200);

    constructor() {
        if (typeof window !== 'undefined') {
            fromEvent(window, 'resize')
                .pipe(debounceTime(200), takeUntilDestroyed())
                .subscribe(() => this.screenWidth.set(window.innerWidth));
        }
    }

    columns = computed(() => {
        // Approximate container width (screenWidth - sidebar 340px - padding 48px)
        // Adjust logic based on actual layout breakpoints if needed
        // For simplicity, we assume grid takes available space
        const containerWidth = this.screenWidth() < 768 ? this.screenWidth() - 32 : this.screenWidth() - 340 - 64;
        const minColWidth = 240;
        const gap = 16;
        const cols = Math.floor((containerWidth + gap) / (minColWidth + gap));
        return Math.max(1, cols);
    });

    itemHeight = computed(() => {
        // Mobile compact view vs Desktop card view
        return this.columns() === 1 ? 100 : 320;
    });

    currentList = computed(() => this.view() === 'my' ? this.playlists() : this.communityPlaylists());

    virtualRows = computed(() => {
        const list = this.currentList();
        const cols = this.columns();
        const rows: Playlist[][] = [];
        for (let i = 0; i < list.length; i += cols) {
            rows.push(list.slice(i, i + cols));
        }
        return rows;
    });

    openMenu(playlist: Playlist, event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.selectedPlaylist.set(playlist);
        this.menuOpen.set(true);
    }

    closeMenu(): void {
        this.menuOpen.set(false);
    }

    onEditPlaylist(): void {
        const p = this.selectedPlaylist();
        this.closeMenu();
        if (p) {
            this.editingPlaylist.set(p);
            this.showCreateDialog.set(true);
        }
    }

    onDeletePlaylist(): void {
        this.closeMenu();
        // Delay opening confirmation slightly to allow menu transition
        setTimeout(() => {
            this.deleteConfirmationOpen.set(true);
        }, 100);
    }

    confirmDelete(): void {
        const p = this.selectedPlaylist();
        if (p) {
            this.playlistService.deletePlaylist(p.id);
        }
        this.deleteConfirmationOpen.set(false);
        this.selectedPlaylist.set(null);
    }

    cancelDelete(): void {
        this.deleteConfirmationOpen.set(false);
        this.selectedPlaylist.set(null);
    }

    onDialogClosed(): void {
        this.showCreateDialog.set(false);
        this.editingPlaylist.set(null);
    }

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
