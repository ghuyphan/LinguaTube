import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CreatePlaylistDialogComponent } from '../../../shared/components/create-playlist-dialog/create-playlist-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { OptionPickerComponent } from '../../../shared/components/option-picker/option-picker.component';
import { I18nService } from '../../../services';
import { Playlist, PlaylistLanguage, PlaylistVideo, SUPPORTED_LANGUAGES } from '../../../models';

@Component({
    selector: 'app-playlist-page',
    standalone: true,
    imports: [CommonModule, IconComponent, CreatePlaylistDialogComponent, ConfirmDialogComponent, OptionPickerComponent],
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

    view = signal<'community' | 'curated' | 'my'>('community');

    // Menu State (dropdown anchored to 3-dots)
    menuOpen = signal(false);
    menuPosition = signal({ top: 0, left: 0 });
    deleteConfirmationOpen = signal(false);
    selectedPlaylist = signal<Playlist | null>(null);
    toastMessage = signal('');

    // Detail View State
    viewingPlaylist = signal<Playlist | null>(null);
    detailVideos = signal<PlaylistVideo[]>([]);
    detailVideosLoading = signal(false);

    // Language Filter
    languageFilter = signal<'all' | PlaylistLanguage>('all');
    showLanguageFilter = signal(false);
    readonly languageFilterOptions = [
        { value: 'all', label: this.i18n.t('playlist.allLanguages') || 'All' },
        ...SUPPORTED_LANGUAGES.map(l => ({ value: l.code, label: l.name, iconUrl: l.flag }))
    ];

    // Animation State
    shouldAnimate = signal(this.playlistService.myPlaylists().length === 0);

    playlists = this.playlistService.myPlaylists;
    communityPlaylists = this.playlistService.communityPlaylists;
    featuredPlaylists = computed(() => this.communityPlaylists().filter(playlist => playlist.isFeatured));

    readonly supportedLanguages = SUPPORTED_LANGUAGES;

    // Active playlist state for sidebar
    activePlaylist = this.playlistService.currentPlaylist;
    currentVideo = this.playlistService.currentVideo;
    currentIndex = this.playlistService.currentIndex;

    totalPlaylistsCount = computed(() =>
        this.playlists().length + this.communityPlaylists().length
    );

    playlistSubtitle = computed(() => {
        const count = this.totalPlaylistsCount();
        const lang = this.i18n.currentLanguage();
        if (lang === 'vi') {
            return `${count} danh sách phát`;
        }
        const singular = this.i18n.t('playlist.playlist')?.toLowerCase() || 'playlist';
        const plural = this.i18n.t('playlist.title')?.toLowerCase() || 'playlists';
        return `${count} ${count === 1 ? singular : plural}`;
    });

    totalVideosCount = computed(() => {
        const userVideos = this.playlists().reduce((acc, p) => acc + (p.videoIds?.length || 0), 0);
        const commVideos = this.communityPlaylists().reduce((acc, p) => acc + (p.videoIds?.length || 0), 0);
        return userVideos + commVideos;
    });

    languagePlaylistsCount = computed(() => {
        const list = this.view() === 'my' ? this.playlists() : this.communityPlaylists();
        const counts: Record<string, number> = { all: list.length };
        for (const lang of SUPPORTED_LANGUAGES) {
            counts[lang.code] = list.filter(p => p.language === lang.code).length;
        }
        return counts;
    });

    getActivePlaylistPercent(): number {
        const p = this.activePlaylist();
        if (!p) return 0;
        const total = p.videos?.length || p.videoIds?.length || 1;
        const current = this.currentIndex() + 1;
        return Math.min(100, Math.round((current / total) * 100));
    }

    resumeActivePlaylist(): void {
        const p = this.activePlaylist();
        const v = this.currentVideo();
        if (p && v) {
            this.router.navigate(['/video'], {
                queryParams: { id: v.videoId, playlist: p.id }
            });
        } else if (p && p.videoIds.length > 0) {
            this.router.navigate(['/video'], {
                queryParams: { id: p.videoIds[0], playlist: p.id }
            });
        }
    }

    isOwner(playlist?: Playlist | null): boolean {
        if (!playlist) return false;
        return this.playlists().some(p => p.id === playlist.id);
    }

    isListLoading = computed(() => {
        if (this.view() === 'my') {
            return this.playlistService.isUserPlaylistsLoading() && this.playlists().length === 0;
        }
        return this.playlistService.isCommunityLoading() && this.communityPlaylists().length === 0;
    });

    currentList = computed(() => {
        let list: Playlist[];
        if (this.view() === 'my') {
            list = this.playlists();
        } else if (this.view() === 'curated') {
            list = this.featuredPlaylists();
        } else {
            list = this.communityPlaylists();
        }

        const filter = this.languageFilter();
        if (filter === 'all') return list;
        return list.filter(p => p.language === filter);
    });

    constructor() {
        void this.playlistService.loadUserPlaylists();
        void this.playlistService.loadCommunityPlaylists();
    }

    // Pagination
    currentPage = signal(1);
    pageSize = 24;

    paginatedPlaylists = computed(() => {
        const list = this.currentList();
        const startIndex = (this.currentPage() - 1) * this.pageSize;
        return list.slice(startIndex, startIndex + this.pageSize);
    });

    totalPages = computed(() => Math.ceil(this.currentList().length / this.pageSize));

    nextPage(): void {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.update(p => p + 1);
            this.scrollToTop();
        }
    }

    prevPage(): void {
        if (this.currentPage() > 1) {
            this.currentPage.update(p => p - 1);
            this.scrollToTop();
        }
    }

    private scrollToTop(): void {
        const panel = document.querySelector('.panel-content') || document.querySelector('.playlist-detail-panel');
        if (panel) {
            panel.scrollTop = 0;
        }
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    openMenu(playlist: Playlist, event: Event): void {
        event.preventDefault();
        event.stopPropagation();

        const btn = event.currentTarget as HTMLElement | null;
        if (btn) {
            const rect = btn.getBoundingClientRect();
            const menuWidth = 160;
            let left = rect.right - menuWidth;
            if (left < 10) left = 10;
            if (left + menuWidth > window.innerWidth - 10) {
                left = window.innerWidth - menuWidth - 10;
            }

            let top = rect.bottom + 4;
            if (top + 130 > window.innerHeight) {
                top = Math.max(10, rect.top - 130);
            }

            this.menuPosition.set({ top, left });
        }

        this.selectedPlaylist.set(playlist);
        this.menuOpen.set(true);
    }

    closeMenu(): void {
        this.menuOpen.set(false);
    }

    async onSharePlaylist(): Promise<void> {
        const p = this.selectedPlaylist() || this.viewingPlaylist();
        this.closeMenu();
        if (p) {
            const success = await this.playlistService.copyShareLink(p.id);
            if (success) {
                this.toastMessage.set(this.i18n.t('playlist.linkCopied') || 'Link copied!');
                setTimeout(() => this.toastMessage.set(''), 3000);
            }
        }
    }

    onEditPlaylist(): void {
        const p = this.selectedPlaylist() || this.viewingPlaylist();
        this.closeMenu();
        if (p) {
            this.editingPlaylist.set(p);
            this.showCreateDialog.set(true);
        }
    }

    onDeletePlaylist(): void {
        this.closeMenu();
        const p = this.selectedPlaylist() || this.viewingPlaylist();
        if (p) {
            this.selectedPlaylist.set(p);
            this.deleteConfirmationOpen.set(true);
        }
    }

    async onPlaylistUpdated(): Promise<void> {
        await this.playlistService.loadUserPlaylists();
        const currentViewing = this.viewingPlaylist();
        if (currentViewing) {
            const updated = this.playlists().find(p => p.id === currentViewing.id);
            if (updated) {
                this.viewingPlaylist.set(updated);
            }
        }
    }

    confirmDelete(): void {
        const p = this.selectedPlaylist();
        if (p) {
            this.playlistService.deletePlaylist(p.id);
        }
        this.deleteConfirmationOpen.set(false);
        this.selectedPlaylist.set(null);

        // Return to list view if deleting the currently viewed playlist
        if (this.viewingPlaylist()?.id === p?.id) {
            this.viewingPlaylist.set(null);
        }
    }

    cancelDelete(): void {
        this.deleteConfirmationOpen.set(false);
        this.selectedPlaylist.set(null);
    }

    onDialogClosed(): void {
        this.showCreateDialog.set(false);
        this.editingPlaylist.set(null);
    }

    setView(view: 'community' | 'curated' | 'my'): void {
        this.shouldAnimate.set(true);
        this.view.set(view);
        this.viewingPlaylist.set(null); // Reset detail view when switching tabs
        if ((view === 'community' || view === 'curated') && this.communityPlaylists().length === 0) {
            this.playlistService.loadCommunityPlaylists();
        }
    }

    // Detail View Methods
    async openPlaylistDetail(playlist: Playlist): Promise<void> {
        this.viewingPlaylist.set(playlist);
        this.detailVideos.set([]);
        this.detailVideosLoading.set(true);
        this.scrollToTop();

        try {
            const videos = await this.playlistService.getPlaylistVideos(playlist.videoIds);
            if (this.viewingPlaylist()?.id === playlist.id) {
                this.detailVideos.set(videos);
            }
        } catch (error) {
            console.error('[PlaylistPage] Failed to hydrate playlist videos:', error);
        } finally {
            if (this.viewingPlaylist()?.id === playlist.id) {
                this.detailVideosLoading.set(false);
            }
        }
    }

    closeDetail(): void {
        this.viewingPlaylist.set(null);
        this.detailVideos.set([]);
        this.detailVideosLoading.set(false);
    }

    playAll(): void {
        const p = this.viewingPlaylist();
        if (p && p.videoIds.length > 0) {
            this.router.navigate(['/video'], {
                queryParams: {
                    id: p.videoIds[0],
                    playlist: p.id
                }
            });
        }
    }

    playSpecificVideo(videoId: string): void {
        const p = this.viewingPlaylist();
        if (p) {
            this.router.navigate(['/video'], {
                queryParams: {
                    id: videoId,
                    playlist: p.id
                }
            });
        }
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

    getFlagUrl(lang: 'all' | PlaylistLanguage): string {
        if (lang === 'all') return '';
        const found = SUPPORTED_LANGUAGES.find(l => l.code === lang);
        return found?.flag || SUPPORTED_LANGUAGES[0].flag;
    }

    getLanguageFilterLabel(): string {
        const filter = this.languageFilter();
        if (filter === 'all') {
            return this.i18n.t('playlist.allLanguages');
        }

        return SUPPORTED_LANGUAGES.find(language => language.code === filter)?.name || this.i18n.t('playlist.allLanguages');
    }

    onLanguageFilterChange(value: string): void {
        this.shouldAnimate.set(true);
        this.languageFilter.set(value as 'all' | PlaylistLanguage);
        this.showLanguageFilter.set(false);
    }
}
