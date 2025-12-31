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
    computed,
    HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { HistoryService, I18nService, AuthService, SyncService } from '../../services';
import { HistoryItem } from '../../models';

interface SwipeState {
    itemId: string | null;
    startX: number;
    startY: number;
    currentX: number;
    startTime: number;
    isHorizontalSwipe: boolean | null;
    velocity: number;
}

const ANIMATION_KEY = 'history-list-animated';

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

    // Animation state
    shouldAnimate = signal(false);
    filterAnimating = signal(false);
    private lastFilter = '';

    // Swipe configuration
    private readonly REVEAL_WIDTH = 72; // Width of revealed delete button
    private readonly DELETE_THRESHOLD = 160; // Swipe distance to trigger immediate delete
    private readonly DIRECTION_LOCK_THRESHOLD = 10;
    private readonly VELOCITY_THRESHOLD = 0.5; // px/ms for quick full-swipe delete

    // Swipe state
    swipeState = signal<SwipeState>({
        itemId: null,
        startX: 0,
        startY: 0,
        currentX: 0,
        startTime: 0,
        isHorizontalSwipe: null,
        velocity: 0,
    });

    // Item with revealed delete button (snapped open)
    revealedItemId = signal<string | null>(null);

    // Track items being deleted for animation
    deletingItems = signal<Set<string>>(new Set());

    // Computed: is swiping past delete threshold?
    isPastDeleteThreshold = computed(() => {
        const state = this.swipeState();
        if (!state.itemId || !state.isHorizontalSwipe) return false;
        const offset = Math.abs(state.currentX - state.startX);
        return offset >= this.DELETE_THRESHOLD;
    });

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

    // Close revealed item when clicking outside
    @HostListener('document:touchstart', ['$event'])
    onDocumentTouch(event: TouchEvent): void {
        if (!this.revealedItemId()) return;

        const target = event.target as HTMLElement;
        const wrapper = target.closest('.history-item-wrapper');

        // If clicking outside any history item, or on a different item, close revealed
        if (!wrapper) {
            this.revealedItemId.set(null);
        }
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

    // Get current swipe offset for an item
    getSwipeOffset(itemId: string): number {
        const state = this.swipeState();

        // If this item is being actively swiped
        if (state.itemId === itemId && state.isHorizontalSwipe) {
            const offset = state.currentX - state.startX;
            const absOffset = Math.abs(offset);
            const isRevealed = this.revealedItemId() === itemId;

            // Check if this is a "full swipe" gesture (fast or already past threshold)
            const isFullSwipe = state.velocity > this.VELOCITY_THRESHOLD ||
                absOffset >= this.DELETE_THRESHOLD ||
                (isRevealed && absOffset >= (this.DELETE_THRESHOLD - this.REVEAL_WIDTH));

            if (isRevealed) {
                // Starting from revealed position
                if (isFullSwipe) {
                    // Full swipe - follow finger off screen
                    return Math.min(0, offset - this.REVEAL_WIDTH);
                } else {
                    // Partial swipe - clamp at reveal position or allow closing
                    const newOffset = offset - this.REVEAL_WIDTH;
                    return Math.max(-this.REVEAL_WIDTH, Math.min(0, newOffset));
                }
            } else {
                // Starting from closed position
                if (isFullSwipe) {
                    // Full swipe - follow finger off screen
                    return Math.min(0, offset);
                } else {
                    // Partial swipe - clamp at reveal width
                    return Math.max(-this.REVEAL_WIDTH, Math.min(0, offset));
                }
            }
        }

        // If this item is revealed (snapped open)
        if (this.revealedItemId() === itemId) {
            return -this.REVEAL_WIDTH;
        }

        return 0;
    }

    // Check if item is being actively swiped
    isSwiping(itemId: string): boolean {
        const state = this.swipeState();
        return state.itemId === itemId && state.isHorizontalSwipe === true;
    }

    // Check if item has delete button revealed
    isRevealed(itemId: string): boolean {
        return this.revealedItemId() === itemId;
    }

    // Check if item is being deleted
    isDeleting(itemId: string): boolean {
        return this.deletingItems().has(itemId);
    }

    // Check if swipe is past delete threshold (for visual feedback)
    isSwipePastThreshold(itemId: string): boolean {
        const state = this.swipeState();
        if (state.itemId !== itemId || !state.isHorizontalSwipe) return false;

        const absOffset = Math.abs(state.currentX - state.startX);
        const isRevealed = this.revealedItemId() === itemId;
        const totalOffset = isRevealed ? absOffset + this.REVEAL_WIDTH : absOffset;

        // Only show "past threshold" if actually doing a full swipe
        const isFullSwipe = state.velocity > this.VELOCITY_THRESHOLD || totalOffset >= this.DELETE_THRESHOLD;
        return isFullSwipe && totalOffset >= this.DELETE_THRESHOLD;
    }

    // Get swipe progress for visual feedback (0 to 1)
    getSwipeProgress(itemId: string): number {
        const state = this.swipeState();
        if (state.itemId !== itemId || !state.isHorizontalSwipe) {
            // If revealed but not swiping, show partial progress
            if (this.revealedItemId() === itemId) {
                return this.REVEAL_WIDTH / this.DELETE_THRESHOLD;
            }
            return 0;
        }

        const absOffset = Math.abs(state.currentX - state.startX);
        const isRevealed = this.revealedItemId() === itemId;
        const totalOffset = isRevealed ? absOffset + this.REVEAL_WIDTH : absOffset;

        return Math.min(1, totalOffset / this.DELETE_THRESHOLD);
    }

    onTouchStart(event: TouchEvent, item: HistoryItem): void {
        if (window.innerWidth > 768) return;

        // If another item is revealed, close it first
        if (this.revealedItemId() && this.revealedItemId() !== item.id) {
            this.revealedItemId.set(null);
        }

        const touch = event.touches[0];
        this.swipeState.set({
            itemId: item.id,
            startX: touch.clientX,
            startY: touch.clientY,
            currentX: touch.clientX,
            startTime: Date.now(),
            isHorizontalSwipe: null,
            velocity: 0,
        });
    }

    onTouchMove(event: TouchEvent, item: HistoryItem): void {
        const state = this.swipeState();
        if (state.itemId !== item.id) return;

        const touch = event.touches[0];
        const deltaX = touch.clientX - state.startX;
        const deltaY = touch.clientY - state.startY;

        // Determine swipe direction if not yet locked
        if (state.isHorizontalSwipe === null) {
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            if (absX > this.DIRECTION_LOCK_THRESHOLD || absY > this.DIRECTION_LOCK_THRESHOLD) {
                // Only allow left swipe (or right swipe if already revealed)
                const isRevealed = this.revealedItemId() === item.id;
                const isHorizontal = absX > absY && (deltaX < 0 || isRevealed);

                this.swipeState.update((s) => ({ ...s, isHorizontalSwipe: isHorizontal }));

                if (!isHorizontal) {
                    this.resetSwipe();
                    return;
                }
            } else {
                return;
            }
        }

        if (!state.isHorizontalSwipe) return;

        event.preventDefault();

        const elapsed = Date.now() - state.startTime;
        const velocity = elapsed > 0 ? Math.abs(deltaX) / elapsed : 0;

        this.swipeState.update((s) => ({
            ...s,
            currentX: touch.clientX,
            velocity,
        }));

        // Haptic when crossing delete threshold
        if (this.isSwipePastThreshold(item.id)) {
            this.triggerHaptic();
        }
    }

    onTouchEnd(event: TouchEvent, item: HistoryItem): void {
        const state = this.swipeState();
        if (state.itemId !== item.id) return;

        // If not horizontal swipe, just reset
        if (!state.isHorizontalSwipe) {
            this.resetSwipe();
            return;
        }

        const rawOffset = state.currentX - state.startX;
        const absOffset = Math.abs(rawOffset);
        const isRevealed = this.revealedItemId() === item.id;

        // Calculate total offset from closed position
        const totalOffset = isRevealed ? absOffset + this.REVEAL_WIDTH : absOffset;

        // Check for full swipe delete (fast velocity OR past threshold)
        const isQuickSwipe = state.velocity > this.VELOCITY_THRESHOLD && absOffset > 40;
        const isPastThreshold = totalOffset >= this.DELETE_THRESHOLD;

        // Case 1: Full swipe delete
        if ((isQuickSwipe || isPastThreshold) && rawOffset < 0) {
            this.deleteItem(item);
            return;
        }

        // Case 2: Swiping left (opening)
        if (rawOffset < -20) {
            this.revealedItemId.set(item.id);
            this.resetSwipe();
            return;
        }

        // Case 3: Swiping right while revealed (closing)
        if (isRevealed && rawOffset > 20) {
            this.revealedItemId.set(null);
            this.resetSwipe();
            return;
        }

        // Case 4: Small movement - keep current state
        this.resetSwipe();
    }

    // Handle tap on delete button
    onDeleteButtonClick(event: Event, item: HistoryItem): void {
        event.stopPropagation();
        this.deleteItem(item);
    }

    private resetSwipe(): void {
        this.swipeState.set({
            itemId: null,
            startX: 0,
            startY: 0,
            currentX: 0,
            startTime: 0,
            isHorizontalSwipe: null,
            velocity: 0,
        });
    }

    private triggerHaptic(): void {
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }

    private deleteItem(item: HistoryItem): void {
        this.deletingItems.update((set) => new Set(set).add(item.id));
        this.revealedItemId.set(null);
        this.resetSwipe();

        setTimeout(() => {
            this.historyService.removeFromHistory(item.id);

            if (this.auth.isLoggedIn()) {
                this.syncService.deleteHistoryFromServer(item.video_id);
            }

            this.itemRemoved.emit(item);

            this.deletingItems.update((set) => {
                const newSet = new Set(set);
                newSet.delete(item.id);
                return newSet;
            });
        }, 280);
    }

    onPlayVideo(item: HistoryItem): void {
        const state = this.swipeState();

        // Don't navigate if was swiping
        if (state.itemId === item.id && state.isHorizontalSwipe) {
            return;
        }

        // Don't navigate if item is revealed (user should tap elsewhere to close)
        if (this.revealedItemId() === item.id) {
            this.revealedItemId.set(null);
            return;
        }

        this.router.navigate(['/video'], { queryParams: { v: item.video_id } });
    }

    onToggleFavorite(item: HistoryItem, event: Event): void {
        event.stopPropagation();
        this.historyService.toggleFavorite(item.id);
    }

    onRemoveItem(item: HistoryItem, event: Event): void {
        event.stopPropagation();
        this.deleteItem(item);
    }

    trackByItemId(index: number, item: HistoryItem): string {
        return item.id;
    }
}