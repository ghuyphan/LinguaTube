import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CreatePlaylistDialogComponent } from '../../../shared/components/create-playlist-dialog/create-playlist-dialog.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { OptionPickerComponent } from '../../../shared/components/option-picker/option-picker.component';
import { I18nService } from '../../../services';
import { Playlist, PlaylistLanguage, PlaylistVideo } from '../../../models';
const LANGUAGES = [
    { code: 'ja' as const, name: '日本語', flag: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
    { code: 'zh' as const, name: '中文', flag: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
    { code: 'ko' as const, name: '한국어', flag: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
    { code: 'en' as const, name: 'English', flag: 'https://hatscripts.github.io/circle-flags/flags/gb.svg' }
];

@Component({
    selector: 'app-playlist-page',
    standalone: true,
    imports: [CommonModule, IconComponent, CreatePlaylistDialogComponent, BottomSheetComponent, OptionPickerComponent],
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

    // Menu State
    menuOpen = signal(false);
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
        ...LANGUAGES.map(l => ({ value: l.code, label: l.name, iconUrl: l.flag }))
    ];

    // Animation State
    shouldAnimate = signal(this.playlistService.myPlaylists().length === 0);

    playlists = this.playlistService.myPlaylists;
    communityPlaylists = this.playlistService.communityPlaylists;
    featuredPlaylists = computed(() => this.communityPlaylists().filter(playlist => playlist.isFeatured));

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
        const panel = document.querySelector('.panel-content');
        if (panel) {
            panel.scrollTop = 0;
        }
    }

    openMenu(playlist: Playlist, event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.selectedPlaylist.set(playlist);
        this.menuOpen.set(true);
    }

    closeMenu(): void {
        this.menuOpen.set(false);
    }

    async onSharePlaylist(): Promise<void> {
        const p = this.selectedPlaylist();
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
        const p = this.selectedPlaylist();
        this.closeMenu();
        if (p) {
            this.editingPlaylist.set(p);
            this.showCreateDialog.set(true);
        }
    }

    onDeletePlaylist(): void {
        this.closeMenu();
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
        const found = LANGUAGES.find(l => l.code === lang);
        return found?.flag || LANGUAGES[0].flag;
    }

    getLanguageFilterLabel(): string {
        const filter = this.languageFilter();
        if (filter === 'all') {
            return this.i18n.t('playlist.allLanguages');
        }

        return LANGUAGES.find(language => language.code === filter)?.name || this.i18n.t('playlist.allLanguages');
    }

    onLanguageFilterChange(value: string): void {
        this.shouldAnimate.set(true);
        this.languageFilter.set(value as 'all' | PlaylistLanguage);
        this.showLanguageFilter.set(false);
    }
}
