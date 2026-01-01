import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    input,
    output,
    OnInit,
    PLATFORM_ID,
    effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { HistoryService, I18nService, AuthService, SyncService } from '../../../services';
import { HistoryItem } from '../../../models';

type SwipeState = 'closed' | 'revealed';

interface ActiveSwipe {
    itemId: string;
    startX: number;
    startY: number;
    currentX: number;
    startState: SwipeState;
    directionLocked: boolean | null; // null = undetermined, true = horizontal, false = vertical
}

const ANIMATION_KEY = 'history-list-animated';
const REVEAL_WIDTH = 72;
const DELETE_THRESHOLD = 160;
const DIRECTION_LOCK_THRESHOLD = 10;
const VELOCITY_THRESHOLD = 0.5;

@Component({
    selector: 'app-history-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './history-list.component.html',
    styleUrl: './history-list.component.scss',
})
export class HistoryListComponent implements OnInit {
    private historyService = inject(HistoryService);
    private router = inject(Router);
    private syncService = inject(SyncService);
    private auth = inject(AuthService);
    private platformId = inject(PLATFORM_ID);

    i18n = inject(I18nService);

    // Inputs
    items = input.required<HistoryItem[]>();
    filter = input<string>('all');

    // Outputs
    itemRemoved = output<HistoryItem>();
    favoriteAdded = output<HistoryItem>();

    // Animation state
    shouldAnimate = signal(false);
    filterAnimating = signal(false);
    private lastFilter = '';

    // Swipe state
    private activeSwipe: ActiveSwipe | null = null;
    private swipeStartTime = 0;

    // Track which item has delete button revealed
    revealedItemId = signal<string | null>(null);

    // Track items being deleted (for animation)
    deletingItems = signal<Set<string>>(new Set());

    // Track current swipe offset per item (for template binding)
    swipeOffsets = signal<Map<string, number>>(new Map());

    // Track favorite animation
    animatingFavorites = signal<Set<string>>(new Set());

    constructor() {
        effect(() => {
            const currentFilter = this.filter();
            if (this.lastFilter && this.lastFilter !== currentFilter) {
                this.filterAnimating.set(true);
                setTimeout(() => this.filterAnimating.set(false), 300);
            }
            this.lastFilter = currentFilter;
        });
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const hasAnimated = sessionStorage.getItem(ANIMATION_KEY);
            if (!hasAnimated) {
                this.shouldAnimate.set(true);
                sessionStorage.setItem(ANIMATION_KEY, 'true');
            }
        }
    }

    // ─────────────────────────────────────────────────────────────
    // Touch Handlers
    // ─────────────────────────────────────────────────────────────

    onTouchStart(event: TouchEvent, item: HistoryItem): void {
        // Close any other revealed item
        const currentRevealed = this.revealedItemId();
        if (currentRevealed && currentRevealed !== item.id) {
            this.closeItem(currentRevealed);
        }

        const touch = event.touches[0];
        const startState: SwipeState = this.revealedItemId() === item.id ? 'revealed' : 'closed';

        this.activeSwipe = {
            itemId: item.id,
            startX: touch.clientX,
            startY: touch.clientY,
            currentX: touch.clientX,
            startState,
            directionLocked: null,
        };
        this.swipeStartTime = Date.now();
    }

    onTouchMove(event: TouchEvent, item: HistoryItem): void {
        if (!this.activeSwipe || this.activeSwipe.itemId !== item.id) return;

        const touch = event.touches[0];
        const deltaX = touch.clientX - this.activeSwipe.startX;
        const deltaY = touch.clientY - this.activeSwipe.startY;

        // Determine direction if not locked
        if (this.activeSwipe.directionLocked === null) {
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            if (absX > DIRECTION_LOCK_THRESHOLD || absY > DIRECTION_LOCK_THRESHOLD) {
                // Only allow horizontal swipe if:
                // - Swiping left (deltaX < 0), OR
                // - Swiping right AND item is revealed (to close it)
                const isHorizontal = absX > absY;
                const isLeftSwipe = deltaX < 0;
                const isRevealed = this.activeSwipe.startState === 'revealed';

                if (isHorizontal && (isLeftSwipe || isRevealed)) {
                    this.activeSwipe.directionLocked = true;
                } else {
                    // Vertical scroll or invalid right swipe - abort
                    this.activeSwipe = null;
                    return;
                }
            } else {
                return; // Wait for more movement
            }
        }

        if (!this.activeSwipe.directionLocked) return;

        // Prevent vertical scroll while swiping horizontally
        event.preventDefault();

        this.activeSwipe.currentX = touch.clientX;

        // Calculate offset based on start state
        let offset: number;
        if (this.activeSwipe.startState === 'revealed') {
            offset = deltaX - REVEAL_WIDTH;
        } else {
            offset = deltaX;
        }

        // Clamp: no right swipe past 0, allow left swipe with resistance past delete threshold
        if (offset > 0) {
            offset = 0; // Hard stop at 0, no right swipe past closed
        } else if (offset < -DELETE_THRESHOLD) {
            const overshoot = Math.abs(offset) - DELETE_THRESHOLD;
            offset = -(DELETE_THRESHOLD + overshoot * 0.3);
        }

        this.updateSwipeOffset(item.id, offset);
    }

    onTouchEnd(event: TouchEvent, item: HistoryItem): void {
        if (!this.activeSwipe || this.activeSwipe.itemId !== item.id) return;

        const deltaX = this.activeSwipe.currentX - this.activeSwipe.startX;
        const elapsed = Date.now() - this.swipeStartTime;
        const velocity = Math.abs(deltaX) / elapsed;
        const startState = this.activeSwipe.startState;

        // Calculate total offset from closed position
        let totalOffset: number;
        if (startState === 'revealed') {
            totalOffset = Math.abs(deltaX - REVEAL_WIDTH);
        } else {
            totalOffset = Math.abs(deltaX);
        }

        const isLeftSwipe = deltaX < 0;
        const isQuickSwipe = velocity > VELOCITY_THRESHOLD && Math.abs(deltaX) > 30;

        // Decision logic
        if (isLeftSwipe && (totalOffset >= DELETE_THRESHOLD || (isQuickSwipe && totalOffset > REVEAL_WIDTH))) {
            // Full swipe → Delete
            this.triggerHaptic();
            this.deleteItemWithAnimation(item);
        } else if (isLeftSwipe && (Math.abs(deltaX) > 30 || isQuickSwipe)) {
            // Partial left swipe → Reveal
            this.revealItem(item.id);
        } else if (!isLeftSwipe && startState === 'revealed' && deltaX > 30) {
            // Right swipe while revealed → Close
            this.closeItem(item.id);
        } else {
            // Return to previous state
            if (startState === 'revealed') {
                this.revealItem(item.id);
            } else {
                this.closeItem(item.id);
            }
        }

        this.activeSwipe = null;
    }

    // ─────────────────────────────────────────────────────────────
    // Swipe State Management
    // ─────────────────────────────────────────────────────────────

    private updateSwipeOffset(itemId: string, offset: number): void {
        this.swipeOffsets.update(map => {
            const newMap = new Map(map);
            newMap.set(itemId, offset);
            return newMap;
        });
    }

    private revealItem(itemId: string): void {
        this.revealedItemId.set(itemId);
        this.updateSwipeOffset(itemId, -REVEAL_WIDTH);
    }

    private closeItem(itemId: string): void {
        if (this.revealedItemId() === itemId) {
            this.revealedItemId.set(null);
        }
        this.updateSwipeOffset(itemId, 0);

        // Clean up after animation
        setTimeout(() => {
            this.swipeOffsets.update(map => {
                const newMap = new Map(map);
                newMap.delete(itemId);
                return newMap;
            });
        }, 300);
    }

    private deleteItemWithAnimation(item: HistoryItem): void {
        // Animate off screen
        this.updateSwipeOffset(item.id, -window.innerWidth);
        this.deletingItems.update(set => new Set(set).add(item.id));
        this.revealedItemId.set(null);

        setTimeout(() => {
            this.deleteItem(item);
        }, 280);
    }

    private deleteItem(item: HistoryItem): void {
        this.historyService.removeFromHistory(item.id);

        if (this.auth.isLoggedIn()) {
            this.syncService.deleteHistoryFromServer(item.video_id);
        }

        this.itemRemoved.emit(item);

        // Clean up
        this.deletingItems.update(set => {
            const newSet = new Set(set);
            newSet.delete(item.id);
            return newSet;
        });
        this.swipeOffsets.update(map => {
            const newMap = new Map(map);
            newMap.delete(item.id);
            return newMap;
        });
    }

    private triggerHaptic(): void {
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }

    // ─────────────────────────────────────────────────────────────
    // Template Helpers
    // ─────────────────────────────────────────────────────────────

    getSwipeTransform(itemId: string): string {
        const offset = this.swipeOffsets().get(itemId) ?? 0;
        return `translateX(${offset}px)`;
    }

    isRevealed(itemId: string): boolean {
        return this.revealedItemId() === itemId;
    }

    isDeleting(itemId: string): boolean {
        return this.deletingItems().has(itemId);
    }

    isSwiping(itemId: string): boolean {
        return this.activeSwipe?.itemId === itemId && this.activeSwipe.directionLocked === true;
    }

    isPastThreshold(itemId: string): boolean {
        const offset = Math.abs(this.swipeOffsets().get(itemId) ?? 0);
        return offset >= DELETE_THRESHOLD;
    }

    getThumbnail(videoId: string): string {
        return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
    }

    getRelativeTime(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return this.i18n.t('history.justNow') || 'now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;
        return new Date(date).toLocaleDateString();
    }

    // ─────────────────────────────────────────────────────────────
    // Actions
    // ─────────────────────────────────────────────────────────────

    onPlayVideo(item: HistoryItem): void {
        // Don't navigate if swiping
        if (this.activeSwipe?.itemId === item.id) return;

        // Don't navigate if revealed - close instead
        if (this.revealedItemId() === item.id) {
            this.closeItem(item.id);
            return;
        }

        this.router.navigate(['/video'], { queryParams: { id: item.video_id } });
    }

    onToggleFavorite(item: HistoryItem, event: Event): void {
        event.stopPropagation();

        // Trigger animation and emit event if becoming favorite
        if (!item.is_favorite) {
            this.animatingFavorites.update(set => new Set(set).add(item.id));
            this.favoriteAdded.emit(item);

            // Remove animation class after it completes
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

    isAnimatingFavorite(itemId: string): boolean {
        return this.animatingFavorites().has(itemId);
    }

    onRemoveItem(item: HistoryItem, event: Event): void {
        event.stopPropagation();
        this.deleteItemWithAnimation(item);
    }

    trackByItemId(index: number, item: HistoryItem): string {
        return item.id;
    }
}