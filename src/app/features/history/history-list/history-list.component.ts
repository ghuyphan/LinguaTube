import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    input,
    output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { InfiniteScrollDirective } from '../../../shared/directives';
import { HistoryService } from '../history.service';
import { I18nService, AuthService, VideoLevelService } from '../../../core/services';
import { HistoryItem, ProficiencyLevelTier, getLanguageFlagUrl } from '../../../models';
import { formatTime, getYouTubeThumbnail } from '../../../core/utils';

@Component({
    selector: 'app-history-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent, EmptyStateComponent, InfiniteScrollDirective],
    templateUrl: './history-list.component.html',
    styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent {
    protected historyService = inject(HistoryService);
    protected videoLevelService = inject(VideoLevelService);
    private router = inject(Router);
    readonly auth = inject(AuthService);
    readonly i18n = inject(I18nService);
    readonly getFlagUrl = getLanguageFlagUrl;

    // Inputs
    items = input.required<HistoryItem[]>();
    filter = input<string>('all');
    isLoading = input<boolean>(false);
    hasMore = input<boolean>(false);
    totalCount = input<number>(0);
    hasActiveFilters = input<boolean>(false);

    // Outputs
    itemRemoved = output<HistoryItem>();
    favoriteAdded = output<HistoryItem>();
    loadMore = output<void>();
    clearFilters = output<void>();

    // Animation states
    deletingItems = signal<Set<string>>(new Set());
    animatingFavorites = signal<Set<string>>(new Set());

    // ─────────────────────────────────────────────────────────────
    // Actions
    // ─────────────────────────────────────────────────────────────

    onPlayVideo(item: HistoryItem): void {
        this.router.navigate(['/video'], { queryParams: { id: item.video_id } });
    }

    onToggleFavorite(item: HistoryItem, event: Event): void {
        event.stopPropagation();

        if (!item.is_favorite) {
            this.animatingFavorites.update(set => new Set(set).add(item.id));
            this.favoriteAdded.emit(item);

            // Fallback timeout in case animationend does not fire
            setTimeout(() => this.onFavoriteAnimationEnd(item.id), 450);
        }

        this.historyService.toggleFavorite(item.id);
    }

    onFavoriteAnimationEnd(itemId: string): void {
        this.animatingFavorites.update(set => {
            if (!set.has(itemId)) return set;
            const newSet = new Set(set);
            newSet.delete(itemId);
            return newSet;
        });
    }

    onRemoveItem(item: HistoryItem, event: Event): void {
        event.stopPropagation();

        // Animate exit then delete
        this.deletingItems.update(set => new Set(set).add(item.id));

        // Fallback timer in case animationend does not fire (prefers-reduced-motion)
        setTimeout(() => this.finishRemoveItem(item), 300);
    }

    onItemAnimationEnd(event: AnimationEvent, item: HistoryItem): void {
        if ((event.animationName === 'collapseOut' || event.animationName === 'listItemOut') && this.isDeleting(item.id)) {
            this.finishRemoveItem(item);
        }
    }

    private finishRemoveItem(item: HistoryItem): void {
        if (!this.isDeleting(item.id)) return;

        this.historyService.removeFromHistory(item.id);
        this.itemRemoved.emit(item);

        this.deletingItems.update(set => {
            const newSet = new Set(set);
            newSet.delete(item.id);
            return newSet;
        });
    }

    isDeleting(itemId: string): boolean {
        return this.deletingItems().has(itemId);
    }

    isAnimatingFavorite(itemId: string): boolean {
        return this.animatingFavorites().has(itemId);
    }

    // ─────────────────────────────────────────────────────────────
    // Formatters & Helpers
    // ─────────────────────────────────────────────────────────────

    getThumbnail(videoId: string): string {
        return getYouTubeThumbnail(videoId);
    }

    formatDuration(seconds?: number): string {
        if (!seconds || seconds <= 0) return '';
        return formatTime(seconds);
    }

    getRelativeTime(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return this.i18n.t('history.justNow') || 'Just now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;
        return new Date(date).toLocaleDateString();
    }

    private levelCache = new Map<string, { level: string; tier: ProficiencyLevelTier } | null>();

    getItemLevel(item: HistoryItem): { level: string; tier: ProficiencyLevelTier } | null {
        const key = item.id || item.video_id;
        if (this.levelCache.has(key)) {
            return this.levelCache.get(key) ?? null;
        }
        const result = this.videoLevelService.resolveLevel(
            item.video_id,
            item.language || (item.languages?.[0]),
            item.title,
            item.channel,
            item.level
        );
        if (this.levelCache.size >= 500) {
            this.levelCache.clear();
        }
        this.levelCache.set(key, result);
        return result;
    }

    getLanguagesTooltip(langs?: string[]): string {
        if (!langs || langs.length === 0) return '';
        const names: Record<string, string> = {
            ja: this.i18n.t('settings.japanese') || 'Japanese',
            zh: this.i18n.t('settings.chinese') || 'Chinese',
            ko: this.i18n.t('settings.korean') || 'Korean',
            en: this.i18n.t('settings.english') || 'English',
        };
        return langs.map(l => names[l] || l.toUpperCase()).join(', ');
    }

    onBrowseVideos(): void {
        this.router.navigate(['/video']);
    }
}