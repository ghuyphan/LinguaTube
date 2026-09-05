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
import { HistoryService, I18nService, AuthService } from '../../../services';
import { HistoryItem } from '../../../models';
import { formatTime, getYouTubeThumbnail } from '../../../core/utils';

@Component({
    selector: 'app-history-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './history-list.component.html',
    styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent {
    protected historyService = inject(HistoryService);
    private router = inject(Router);
    readonly auth = inject(AuthService);
    readonly i18n = inject(I18nService);

    // Inputs
    items = input.required<HistoryItem[]>();
    filter = input<string>('all');
    isLoading = input<boolean>(false);

    // Outputs
    itemRemoved = output<HistoryItem>();
    favoriteAdded = output<HistoryItem>();

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

            setTimeout(() => {
                this.animatingFavorites.update(set => {
                    const newSet = new Set(set);
                    newSet.delete(item.id);
                    return newSet;
                });
            }, 400);
        }

        this.historyService.toggleFavorite(item.id);
    }

    onRemoveItem(item: HistoryItem, event: Event): void {
        event.stopPropagation();

        // Animate exit then delete
        this.deletingItems.update(set => new Set(set).add(item.id));

        setTimeout(() => {
            this.historyService.removeFromHistory(item.id);
            this.itemRemoved.emit(item);

            this.deletingItems.update(set => {
                const newSet = new Set(set);
                newSet.delete(item.id);
                return newSet;
            });
        }, 260);
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
}