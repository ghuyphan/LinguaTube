import {
    Component,
    ChangeDetectionStrategy,
    input,
    output,
    inject,
    computed,
    signal,
    OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarMatch, SubtitleCue, SupportedLearningLanguage, Token } from '../../../../../models';
import { SettingsService, VocabularyService } from '../../../../../services';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';

/**
 * FullscreenSubtitleComponent
 * 
 * Renders large, interactive subtitles in fullscreen mode.
 * Handles tokenization display, word lookup implementation details,
 * dual subtitle rendering, and vertical drag & positioning.
 */
@Component({
    selector: 'app-fullscreen-subtitle',
    standalone: true,
    imports: [CommonModule, IconComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="fullscreen-subtitle" 
      [class.controls-visible]="areControlsVisible()" 
      [class.is-top]="isTop()"
      [class.is-near-bottom]="isNearBottom()"
      [class.is-dragging]="isDragging()"
      [ngClass]="fontSizeClass()"
      [class.popup-open]="fsPopupVisible()" 
      [class.has-content]="subtitlesVisible() && !!currentCue()"
      [style.--sub-y]="yPercent()">
      
      @if (subtitlesVisible() && currentCue(); as cue) {
        <div class="fs-subtitle-inner">
          <!-- Dedicated Vertical Drag & Snap Handle -->
          <button type="button"
            class="fs-drag-handle"
            (pointerdown)="onHandlePointerDown($event)"
            [attr.aria-label]="isTop() ? 'Move subtitle to bottom (drag or tap)' : 'Move subtitle to top (drag or tap)'"
            [title]="isTop() ? 'Move subtitle to bottom (drag or tap)' : 'Move subtitle to top (drag or tap)'">
            <app-icon name="grip-vertical" [size]="14" />
          </button>

          <div class="fs-subtitle-content">
            <div class="fs-subtitle-text" [class]="'text-' + language()">
              <!-- Direct text display if tokenizing -->
              @if (isTokenizing()) {
                <span class="fs-word">{{ cue.text }}</span>
              } @else { 
                <!-- Interactive token display -->
                @for (token of tokens(); track $index) {
                  @if (token.isPunctuation) {
                    <span class="fs-word fs-word--punctuation">{{ token.surface }}</span>
                  } @else {
                    <button type="button"
                      class="fs-word" 
                      [class.fs-word--saved]="vocab.hasWord(token.surface)"
                      [class.fs-word--grammar]="isGrammarToken($index)" 
                      [attr.aria-label]="'Look up ' + token.surface"
                      (click)="onWordClick(token, cue.text, $index, $event)">
                      
                      @if (showReadingAnnotation() && getReading(token)) {
                        <ruby>{{ token.surface }}<rt>{{ getReading(token) }}</rt></ruby>
                      } @else {
                        {{ getDisplayText(token) }}
                      }
                    </button>
                  }
                } 
              }
            </div>

            <!-- Dual Subtitles -->
            @if (showDualSubtitles()) {
              @if (isDualSubLoading()) {
                <div class="fs-subtitle-translation skeleton-text"></div>
              } @else if (currentTranslation()) {
                <div class="fs-subtitle-translation">
                  {{ currentTranslation() }}
                </div>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
    styleUrl: './fullscreen-subtitle.component.scss'
})
export class FullscreenSubtitleComponent implements OnDestroy {
    vocab = inject(VocabularyService);
    settings = inject(SettingsService);

    // Inputs
    currentCue = input.required<SubtitleCue | null>();
    tokens = input<Token[]>([]);
    language = input<SupportedLearningLanguage>('ja');
    isTokenizing = input<boolean>(false);
    areControlsVisible = input<boolean>(false);
    fsPopupVisible = input<boolean>(false);
    fontSizeClass = input<string>('text-medium');
    subtitlesVisible = input<boolean>(true);
    yPercent = input<number>(82);

    // Dual Subtitle Inputs
    showDualSubtitles = input<boolean>(false);
    isDualSubLoading = input<boolean>(false);
    currentTranslation = input<string | null>(null);

    // Grammar Inputs
    grammarMatches = input<GrammarMatch[]>([]);

    // Outputs
    wordClicked = output<{ token: Token; context: string; event: MouseEvent }>();
    grammarClicked = output<{ index: number; event: MouseEvent }>();
    positionChanged = output<number>();
    togglePosition = output<void>();

    // Drag State
    isDragging = signal(false);
    private dragStartY = 0;
    private dragStartPercent = 82;
    private hasMoved = false;
    private cleanupDragListeners: (() => void) | null = null;

    // Computed
    isTop = computed(() => this.yPercent() < 50);
    isNearBottom = computed(() => this.yPercent() > 68);
    showReadingAnnotation = computed(() => this.settings.showReadingAnnotation(this.language()));

    onHandlePointerDown(event: PointerEvent): void {
        if (event.button !== 0) return;
        event.stopPropagation();
        event.preventDefault();

        this.cleanupDragListeners?.();

        const target = event.currentTarget as HTMLElement;
        try {
            target.setPointerCapture(event.pointerId);
        } catch {}

        this.dragStartY = event.clientY;
        this.dragStartPercent = this.yPercent();
        this.hasMoved = false;
        this.isDragging.set(true);

        const onPointerMove = (moveEvent: PointerEvent) => {
            if (moveEvent.pointerId !== event.pointerId) return;
            const deltaY = moveEvent.clientY - this.dragStartY;
            if (Math.abs(deltaY) > 4) {
                this.hasMoved = true;
            }

            const container = target.closest('.video-container') as HTMLElement | null;
            const containerHeight = container?.clientHeight || window.innerHeight;
            const deltaPercent = (deltaY / containerHeight) * 100;
            const rawPercent = this.dragStartPercent + deltaPercent;

            const clamped = Math.max(8, Math.min(85, Math.round(rawPercent)));
            this.positionChanged.emit(clamped);
        };

        const onPointerUp = (upEvent: PointerEvent) => {
            if (upEvent.pointerId !== event.pointerId) return;
            this.isDragging.set(false);
            try {
                target.releasePointerCapture(upEvent.pointerId);
            } catch {}

            this.cleanupDragListeners?.();
            this.cleanupDragListeners = null;

            if (!this.hasMoved) {
                this.togglePosition.emit();
            } else {
                const current = this.yPercent();
                if (current < 24) {
                    this.positionChanged.emit(12);
                } else if (current > 72) {
                    this.positionChanged.emit(82);
                }
            }
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);

        this.cleanupDragListeners = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
        };
    }

    ngOnDestroy(): void {
        this.cleanupDragListeners?.();
        this.cleanupDragListeners = null;
    }
    isGrammarToken(index: number): boolean {
        return this.grammarMatches().some(match => match.tokenIndices.includes(index));
    }

    getReading(token: Token): string | undefined {
        return this.settings.getReadingText(this.language(), token) || undefined;
    }

    getDisplayText(token: Token): string {
        if (this.settings.useReadingOnly(this.language())) {
            return this.getReading(token) || token.surface;
        }

        return token.surface;
    }

    onWordClick(token: Token, context: string, index: number, event: MouseEvent): void {
        if (this.isGrammarToken(index)) {
            this.grammarClicked.emit({ index, event });
        } else {
            this.wordClicked.emit({ token, context, event });
        }
    }
}
