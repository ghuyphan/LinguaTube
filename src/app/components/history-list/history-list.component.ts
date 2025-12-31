import { Component, ChangeDetectionStrategy, inject, signal, input, output, OnInit, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { HistoryService, I18nService, AuthService, SyncService } from '../../services';
import { HistoryItem } from '../../models';

interface SwipeState {
    itemId: string | null;
    startX: number;
    currentX: number;
    swiping: boolean;
}

// Track if initial animation has played this session
const ANIMATION_KEY = 'history-list-animated';

@Component({
    selector: 'app-history-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    template: `
    @if (items().length === 0) {
      <div class="empty-state" [class.animate]="shouldAnimate()">
        <app-icon name="play-circle" [size]="32" class="empty-state__icon" />
        <p class="empty-state__title">{{ i18n.t('history.noHistory') }}</p>
        <p class="empty-state__hint">{{ i18n.t('history.noHistoryHint') }}</p>
      </div>
    } @else {
      <div class="history-items" [class.filter-animate]="filterAnimating()">
        @for (item of items(); track item.id; let i = $index) {
          <div 
            class="history-item-wrapper"
            [class.animate]="shouldAnimate()"
            [style.--animation-delay]="i * 50 + 'ms'"
          >
            <!-- Delete action background (revealed on swipe) -->
            <div class="swipe-action swipe-action--delete">
              <app-icon name="trash-2" [size]="20" />
            </div>

            <!-- Main item (swipeable) -->
            <div 
              class="history-item"
              [class.swiping]="swipeState().itemId === item.id && swipeState().swiping"
              [style.transform]="getSwipeTransform(item.id)"
              (touchstart)="onTouchStart($event, item)"
              (touchmove)="onTouchMove($event, item)"
              (touchend)="onTouchEnd($event, item)"
              (click)="onPlayVideo(item)"
            >
              <!-- Thumbnail -->
              <div class="history-item__thumb">
                <img 
                  [src]="item.thumbnail || getThumbnail(item.video_id)" 
                  [alt]="item.title"
                  loading="lazy"
                />
                @if (item.progress > 0) {
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="item.progress"></div>
                  </div>
                }
              </div>

              <!-- Content -->
              <div class="history-item__content">
                <span class="history-item__title">{{ item.title }}</span>
                <div class="history-item__meta">
                  <span class="lang-badge">{{ item.language.toUpperCase() }}</span>
                  <span class="channel-name">{{ item.channel }}</span>
                  <span class="time-ago">{{ getRelativeTime(item.watched_at) }}</span>
                </div>
              </div>

              <!-- Actions (desktop) -->
              <div class="history-item__actions desktop-only">
                <button 
                  class="action-btn favorite-btn" 
                  [class.active]="item.is_favorite"
                  (click)="onToggleFavorite(item, $event)"
                  [attr.aria-label]="i18n.t('history.favorites')">
                  <app-icon name="heart" [size]="18" />
                </button>
                <button 
                  class="action-btn delete-btn"
                  (click)="onRemoveItem(item, $event)"
                  [attr.aria-label]="i18n.t('history.removeFromHistory')">
                  <app-icon name="x" [size]="18" />
                </button>
              </div>

              <!-- Favorite button only on mobile (delete via swipe) -->
              <div class="history-item__actions mobile-only">
                <button 
                  class="action-btn favorite-btn" 
                  [class.active]="item.is_favorite"
                  (click)="onToggleFavorite(item, $event)"
                  [attr.aria-label]="i18n.t('history.favorites')">
                  <app-icon name="heart" [size]="18" />
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    }
  `,
    styles: [`
    :host {
      display: block;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--space-2xl);
      color: var(--text-muted);
    }

    .empty-state.animate {
      animation: fadeSlideIn 0.3s ease-out;
    }

    .empty-state__icon {
      margin-bottom: var(--space-md);
      opacity: 0.5;
    }

    .empty-state__title {
      font-size: 1rem;
      color: var(--text-primary);
      margin: 0 0 var(--space-xs);
    }

    .empty-state__hint {
      margin: 0;
      font-size: 0.875rem;
    }

    .history-items {
      display: flex;
      flex-direction: column;
    }

    /* Subtle filter switch animation */
    .history-items.filter-animate {
      animation: filterFade 0.25s ease-out;
    }

    @keyframes filterFade {
      from {
        opacity: 0.5;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .history-item-wrapper {
      position: relative;
      overflow: hidden;
    }

    .history-item-wrapper.animate {
      animation: fadeSlideIn 0.3s ease-out backwards;
      animation-delay: var(--animation-delay, 0ms);
    }

    /* Swipe action background */
    .swipe-action {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .swipe-action--delete {
      background: var(--error);
    }

    .history-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      background: var(--bg-card);
      cursor: pointer;
      transition: background-color var(--transition-fast);
      will-change: transform;
    }

    .history-item.swiping {
      transition: none;
    }

    @media (hover: hover) {
      .history-item:hover {
        background-color: var(--bg-secondary);
      }

      .history-item:hover .delete-btn {
        opacity: 1;
      }
    }

    .history-item__thumb {
      position: relative;
      width: 100px;
      height: 56px;
      flex-shrink: 0;
      border-radius: var(--border-radius);
      overflow: hidden;
      background: var(--bg-tertiary);
    }

    .history-item__thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(0, 0, 0, 0.5);
    }

    .progress-fill {
      height: 100%;
      background: var(--accent-primary);
    }

    .history-item__content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .history-item__title {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--text-primary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.3;
    }

    .history-item__meta {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: 0.75rem;
      color: var(--text-muted);
      flex-wrap: wrap;
    }

    .lang-badge {
      padding: 1px 5px;
      font-size: 0.625rem;
      font-weight: 600;
      background: var(--bg-tertiary);
      color: var(--text-secondary);
      border-radius: var(--border-radius-sm);
    }

    .channel-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 120px;
    }

    .time-ago {
      color: var(--text-muted);
    }

    .history-item__actions {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: var(--text-muted);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .favorite-btn.active {
      color: var(--accent-primary);
    }

    .delete-btn {
      opacity: 0;
    }

    @media (hover: hover) {
      .action-btn:hover {
        background: var(--bg-tertiary);
      }

      .favorite-btn:hover {
        color: var(--accent-primary);
      }

      .delete-btn:hover {
        color: var(--error);
      }
    }

    .desktop-only {
      display: flex;
    }

    .mobile-only {
      display: none;
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
      .desktop-only {
        display: none !important;
      }

      .mobile-only {
        display: flex;
      }

      .history-item {
        gap: var(--space-sm);
        padding: var(--space-sm);
        touch-action: pan-y pinch-zoom;
      }

      .history-item__thumb {
        width: 72px;
        height: 40px;
      }

      .history-item__title {
        font-size: 0.8125rem;
      }

      .history-item__meta {
        font-size: 0.6875rem;
        gap: var(--space-xs);
      }

      .channel-name {
        display: none;
      }

      .action-btn {
        width: 36px;
        height: 36px;
      }
    }

    /* Entry animation keyframe (uses global) */
    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Delete animation */
    @keyframes slideOutLeft {
      to {
        transform: translateX(-100%);
        opacity: 0;
      }
    }

    .history-item-wrapper.deleting {
      animation: slideOutLeft 0.25s ease-out forwards;
    }
  `]
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

    // Animation state - only first render per session
    shouldAnimate = signal(false);

    // Filter change animation
    filterAnimating = signal(false);
    private lastFilter = '';

    // Swipe state
    swipeState = signal<SwipeState>({
        itemId: null,
        startX: 0,
        currentX: 0,
        swiping: false
    });

    private readonly SWIPE_THRESHOLD = 80;
    private readonly MAX_SWIPE = 100;

    constructor() {
        // Track filter changes for animation
        effect(() => {
            const currentFilter = this.filter();
            if (this.lastFilter && this.lastFilter !== currentFilter) {
                // Filter changed - trigger animation
                this.filterAnimating.set(true);
                setTimeout(() => this.filterAnimating.set(false), 300);
            }
            this.lastFilter = currentFilter;
        });
    }

    ngOnInit(): void {
        // Only animate on first render per session
        if (isPlatformBrowser(this.platformId)) {
            const hasAnimated = sessionStorage.getItem(ANIMATION_KEY);
            if (!hasAnimated) {
                this.shouldAnimate.set(true);
                sessionStorage.setItem(ANIMATION_KEY, 'true');
            }
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

        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;
        return new Date(date).toLocaleDateString();
    }

    getSwipeTransform(itemId: string): string {
        const state = this.swipeState();
        if (state.itemId !== itemId) return 'translateX(0)';

        const offset = Math.max(-this.MAX_SWIPE, Math.min(0, state.currentX - state.startX));
        return `translateX(${offset}px)`;
    }

    onTouchStart(event: TouchEvent, item: HistoryItem): void {
        // Only enable swipe on mobile
        if (window.innerWidth > 768) return;

        const touch = event.touches[0];
        this.swipeState.set({
            itemId: item.id,
            startX: touch.clientX,
            currentX: touch.clientX,
            swiping: true
        });
    }

    onTouchMove(event: TouchEvent, item: HistoryItem): void {
        const state = this.swipeState();
        if (!state.swiping || state.itemId !== item.id) return;

        const touch = event.touches[0];
        const deltaX = touch.clientX - state.startX;

        // Only allow left swipe (negative deltaX)
        if (deltaX < -10) {
            event.preventDefault(); // Prevent scroll when swiping
        }

        this.swipeState.update(s => ({
            ...s,
            currentX: touch.clientX
        }));
    }

    onTouchEnd(event: TouchEvent, item: HistoryItem): void {
        const state = this.swipeState();
        if (!state.swiping || state.itemId !== item.id) return;

        const offset = state.currentX - state.startX;

        // If swiped past threshold, delete
        if (offset < -this.SWIPE_THRESHOLD) {
            this.animateAndDelete(item, event);
        } else {
            // Reset swipe
            this.swipeState.set({
                itemId: null,
                startX: 0,
                currentX: 0,
                swiping: false
            });
        }
    }

    private animateAndDelete(item: HistoryItem, event: Event): void {
        event.stopPropagation();

        // Find wrapper and add delete animation class
        const wrapper = (event.target as HTMLElement).closest('.history-item-wrapper');
        if (wrapper) {
            wrapper.classList.add('deleting');

            // Wait for animation, then delete
            setTimeout(() => {
                this.historyService.removeFromHistory(item.id);

                if (this.auth.isLoggedIn()) {
                    this.syncService.deleteHistoryFromServer(item.video_id);
                }

                this.itemRemoved.emit(item);
            }, 250);
        }

        // Reset swipe state
        this.swipeState.set({
            itemId: null,
            startX: 0,
            currentX: 0,
            swiping: false
        });
    }

    onPlayVideo(item: HistoryItem): void {
        // Don't navigate if swiping
        const state = this.swipeState();
        if (state.swiping && Math.abs(state.currentX - state.startX) > 10) {
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
        this.historyService.removeFromHistory(item.id);

        if (this.auth.isLoggedIn()) {
            this.syncService.deleteHistoryFromServer(item.video_id);
        }

        this.itemRemoved.emit(item);
    }
}
