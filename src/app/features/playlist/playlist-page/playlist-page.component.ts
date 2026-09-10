import { Component, ChangeDetectionStrategy, inject, signal, computed, effect, ElementRef, viewChild, DestroyRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CreatePlaylistDialogComponent } from '../../../shared/components/create-playlist-dialog/create-playlist-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { OptionPickerComponent } from '../../../shared/components/option-picker/option-picker.component';
import { I18nService, ToastService, VideoLevelService } from '../../../core/services';
import { HistoryService } from '../../history/history.service';
import { Playlist, PlaylistLanguage, PlaylistVideo, ProficiencyLevelTier, SUPPORTED_LANGUAGES, getLanguageFlagUrl } from '../../../models';

@Component({
    selector: 'app-playlist-page',
    standalone: true,
    imports: [CommonModule, FormsModule, IconComponent, CreatePlaylistDialogComponent, ConfirmDialogComponent, OptionPickerComponent],
    templateUrl: './playlist-page.component.html',
    styleUrls: ['./playlist-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistPageComponent {
    playlistService = inject(PlaylistService);
    historyService = inject(HistoryService);
    videoLevelService = inject(VideoLevelService);
    i18n = inject(I18nService);
    toast = inject(ToastService);
    private router = inject(Router);

    showCreateDialog = signal(false);
    editingPlaylist = signal<Playlist | null>(null);

    view = signal<'community' | 'curated' | 'my'>('community');
    searchQuery = signal<string>('');

    // Menu State (dropdown anchored to 3-dots)
    menuOpen = signal(false);
    menuPosition = signal({ top: 0, left: 0 });
    deleteConfirmationOpen = signal(false);
    selectedPlaylist = signal<Playlist | null>(null);

    // Detail View State
    viewingPlaylist = signal<Playlist | null>(null);
    detailVideos = signal<PlaylistVideo[]>([]);
    detailVideosLoading = signal(false);

    // Language Filter
    languageFilter = signal<'all' | PlaylistLanguage>('all');
    showLanguageFilter = signal(false);
    readonly languageFilterOptions = computed(() => [
        { value: 'all', label: this.i18n.t('playlist.allLanguages') || 'All' },
        ...SUPPORTED_LANGUAGES.map(l => ({ value: l.code, label: l.name, iconUrl: l.flag }))
    ]);

    // Level Filter
    levelFilter = signal<string>('all');
    showLevelFilter = signal(false);
    readonly levelFilterOptions = computed(() => [
        { value: 'all', label: this.i18n.t('level.allLevels') || 'All Levels' },
        { value: 'beginner', label: this.i18n.t('level.beginner') || 'Beginner' },
        { value: 'elementary', label: this.i18n.t('level.elementary') || 'Elementary' },
        { value: 'intermediate', label: this.i18n.t('level.intermediate') || 'Intermediate' },
        { value: 'upper_intermediate', label: this.i18n.t('level.upper_intermediate') || this.i18n.t('level.upperIntermediate') || 'Upper Intermediate' },
        { value: 'advanced', label: this.i18n.t('level.advanced') || 'Advanced' }
    ]);

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

    getVideoProgress(videoId: string): number {
        const item = this.historyService.history().find(h => h.video_id === videoId);
        return item ? item.progress : 0;
    }

    isWatched(videoId: string): boolean {
        return this.getVideoProgress(videoId) >= 80;
    }

    isListLoading = computed(() => {
        if (this.view() === 'my') {
            return this.playlistService.isUserPlaylistsLoading() && this.playlists().length === 0;
        }
        return (!this.playlistService.hasLoadedCommunity() || this.playlistService.isCommunityLoading()) && this.communityPlaylists().length === 0;
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
        if (filter !== 'all') {
            list = list.filter(p => p.language === filter);
        }

        const lvl = this.levelFilter();
        if (lvl !== 'all') {
            list = list.filter(p => {
                const resolved = this.getPlaylistLevel(p);
                return resolved?.tier === lvl;
            });
        }

        const q = this.searchQuery().trim().toLowerCase();
        if (q) {
            list = list.filter(p =>
                p.title.toLowerCase().includes(q) ||
                (p.description && p.description.toLowerCase().includes(q)) ||
                (p.userName && p.userName.toLowerCase().includes(q))
            );
        }

        return list;
    });

    getPlaylistLevel(playlist: Playlist): { level: string; tier: ProficiencyLevelTier } | null {
        return this.videoLevelService.resolvePlaylistLevel(playlist);
    }

    getVideoLevel(video: PlaylistVideo, lang?: string): { level: string; tier: ProficiencyLevelTier } | null {
        return this.videoLevelService.resolveLevel(
            video.videoId,
            lang || this.viewingPlaylist()?.language || 'ja',
            video.title,
            video.channel || '',
            video.level
        );
    }

    getLevelFilterLabel(): string {
        const val = this.levelFilter();
        const found = this.levelFilterOptions().find(o => o.value === val);
        return found ? found.label : (this.i18n.t('level.allLevels') || 'All Levels');
    }

    onLevelFilterChange(value: string): void {
        this.shouldAnimate.set(true);
        this.levelFilter.set(value);
        this.showLevelFilter.set(false);
        if (this.view() === 'community' || this.view() === 'curated') {
            void this.playlistService.loadCommunityPlaylists(this.languageFilter(), value);
        }
    }

    // Progressive Loading (Infinite Scroll)
    pageSize = 24;
    visibleCount = signal<number>(24);

    readonly scrollSentinel = viewChild<ElementRef<HTMLDivElement>>('scrollSentinel');
    private sentinelObserver: IntersectionObserver | null = null;
    private platformId = inject(PLATFORM_ID);
    private destroyRef = inject(DestroyRef);
    private isExpanding = false;

    constructor() {
        void this.playlistService.loadUserPlaylists();
        void this.playlistService.loadCommunityPlaylists();

        effect(() => {
            // Re-read filters to reset visible count whenever search or filters change
            this.view();
            this.languageFilter();
            this.levelFilter();
            this.searchQuery();
            this.visibleCount.set(this.pageSize);
        });

        effect(() => {
            const sentinelRef = this.scrollSentinel();
            if (!isPlatformBrowser(this.platformId)) return;

            if (this.sentinelObserver) {
                this.sentinelObserver.disconnect();
                this.sentinelObserver = null;
            }

            if (sentinelRef?.nativeElement) {
                this.sentinelObserver = new IntersectionObserver((entries) => {
                    const entry = entries[0];
                    if (entry?.isIntersecting && this.hasMorePlaylists() && !this.isExpanding) {
                        this.isExpanding = true;
                        this.loadMore();
                        setTimeout(() => {
                            this.isExpanding = false;
                        }, 120);
                    }
                }, {
                    rootMargin: '600px 0px',
                    threshold: 0.05
                });
                this.sentinelObserver.observe(sentinelRef.nativeElement);
            }
        });

        this.destroyRef.onDestroy(() => {
            if (this.sentinelObserver) {
                this.sentinelObserver.disconnect();
                this.sentinelObserver = null;
            }
        });
    }

    onSearchChange(query: string): void {
        this.searchQuery.set(query);
    }

    visiblePlaylists = computed(() => {
        return this.currentList().slice(0, this.visibleCount());
    });

    hasMorePlaylists = computed(() => {
        return this.visibleCount() < this.currentList().length;
    });

    loadMore(): void {
        this.visibleCount.update(c => c + this.pageSize);
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
                this.toast.success(this.i18n.t('playlist.linkCopied') || 'Link copied!');
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
            void this.playlistService.loadCommunityPlaylists(this.languageFilter(), this.levelFilter());
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

    async removeVideoFromPlaylist(videoId: string, event: Event): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        const p = this.viewingPlaylist();
        if (!p || !this.isOwner(p)) return;

        try {
            await this.playlistService.removeVideo(p.id, videoId);
            this.detailVideos.update(list => list.filter(v => v.videoId !== videoId));
            const updated = {
                ...p,
                videoIds: p.videoIds.filter(id => id !== videoId)
            };
            this.viewingPlaylist.set(updated);
            this.toast.success(this.i18n.t('playlist.videoRemoved') || 'Video removed from playlist');
        } catch (err) {
            console.error('[PlaylistPage] Failed to remove video:', err);
        }
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
        return getLanguageFlagUrl(lang);
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
        const lang = value as 'all' | PlaylistLanguage;
        this.languageFilter.set(lang);
        this.showLanguageFilter.set(false);
        if (this.view() === 'community' || this.view() === 'curated') {
            void this.playlistService.loadCommunityPlaylists(lang, this.levelFilter());
        }
    }
}
