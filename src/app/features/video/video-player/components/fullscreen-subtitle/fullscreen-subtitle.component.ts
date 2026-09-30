import {
    Component,
    ChangeDetectionStrategy,
    input,
    output,
    inject,
    computed,
    signal,
    OnDestroy,
    NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarMatch, SubtitleCue, SupportedLearningLanguage, Token } from '../../../../../models';
import { SettingsService, I18nService } from '../../../../../core/services';
import { VocabularyService } from '../../../../vocabulary';
import {
    DEFAULT_FS_SUBTITLE_BOTTOM_Y,
    FS_SUBTITLE_DRAG_THRESHOLD_PX
} from '../../video-player.constants';

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
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="fullscreen-subtitle" 
      [class.controls-visible]="areControlsVisible()" 
      [class.is-top]="isTop()"
      [class.is-dragging]="isDragging()"
      [ngClass]="fontSizeClass()"
      [class.popup-open]="fsPopupVisible()" 
      [class.has-content]="subtitlesVisible() && !!activeCue()"
      [style.--sub-y]="yPercent()">
      
      @if (subtitlesVisible() && activeCue(); as cue) {
        <div class="fs-subtitle-card" (click)="$event.stopPropagation()">
          <!-- Centered Horizontal Drag Handle Bar -->
          <button type="button"
            class="fs-drag-handle-bar"
            (pointerdown)="onHandlePointerDown($event)"
            (click)="onHandleClick($event)"
            [attr.aria-label]="handleAriaLabel()"
            [title]="handleTitle()"
            (keydown.enter)="onHandleKeyToggle($event)"
            (keydown.space)="onHandleKeyToggle($event)">
            <span class="fs-drag-pill"></span>
          </button>

          <div class="fs-subtitle-content">
            <div class="fs-subtitle-text" [class]="'text-' + language()">
              <!-- Direct text display when tokens are empty or loading -->
              @if (viewTokens().length === 0) {
                @if (showReadingAnnotation()) {
                  <span class="fs-word"><ruby>{{ cue.text }}<rt aria-hidden="true" class="rt-empty">&#160;</rt></ruby></span>
                } @else {
                  <span class="fs-word">{{ cue.text }}</span>
                }
              } @else { 
                <!-- Interactive token display -->
                @for (vt of viewTokens(); track vt.surface + '-' + vt.index) {
                  @if (vt.isPunctuation) {
                    <span class="fs-word fs-word--punctuation" (click)="$event.stopPropagation()">
                      @if (showReadingAnnotation()) {
                        <ruby>{{ vt.surface }}<rt aria-hidden="true" class="rt-empty">&#160;</rt></ruby>
                      } @else {
                        {{ vt.surface }}
                      }
                    </span>
                  } @else {
                    <button type="button"
                      class="fs-word" 
                      [class.fs-word--saved]="vt.isSaved"
                      [class.fs-word--new]="vt.wordLevel === 'new'"
                      [class.fs-word--learning]="vt.wordLevel === 'learning'"
                      [class.fs-word--known]="vt.wordLevel === 'known'"
                      [class.fs-word--grammar]="vt.isGrammar" 
                      [attr.aria-label]="'Look up ' + vt.surface"
                      (click)="onWordClick(vt.token, cue.text, vt.index, $event)">
                      
                      @if (showReadingAnnotation()) {
                        @if (!prefersRomanized() && vt.rubyParts && vt.rubyParts.length > 0) {
                          @for (part of vt.rubyParts; track $index) {
                            @if (part.reading) {
                              <ruby>{{ part.text }}<rt aria-hidden="true">{{ part.reading }}</rt></ruby>
                            } @else {
                              <ruby>{{ part.text }}<rt aria-hidden="true" class="rt-empty">&#160;</rt></ruby>
                            }
                          }
                        } @else if (vt.reading) {
                          <ruby>{{ vt.surface }}<rt aria-hidden="true">{{ vt.reading }}</rt></ruby>
                        } @else {
                          <ruby>{{ vt.surface }}<rt aria-hidden="true" class="rt-empty">&#160;</rt></ruby>
                        }
                      } @else {
                        {{ vt.displayText }}
                      }
                    </button>
                  }
                } 
              }
            </div>

            <!-- Dual Subtitles -->
            <div class="fs-subtitle-translation-wrapper" [class.is-expanded]="showDualSubtitles()">
              <div class="fs-subtitle-translation-inner">
                @if (isDualSubLoading() && !currentTranslation()) {
                  <div class="fs-subtitle-translation fs-subtitle-translation--loading" [attr.aria-label]="i18n.t('subtitle.translating') || 'Translating subtitle...'">
                    <div class="fs-dual-sub-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                } @else if (currentTranslation() && currentTranslation()?.trim() !== cue.text.trim()) {
                  <div class="fs-subtitle-translation">
                    {{ currentTranslation() }}
                  </div>
                } @else {
                  <div class="fs-subtitle-translation fs-subtitle-translation--empty"></div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
    styleUrl: './fullscreen-subtitle.component.scss'
})
export class FullscreenSubtitleComponent implements OnDestroy {
    readonly i18n = inject(I18nService);
    vocab = inject(VocabularyService);
    settings = inject(SettingsService);
    private ngZone = inject(NgZone);

    // Inputs
    currentCue = input.required<SubtitleCue | null>();
    tokens = input<Token[]>([]);
    language = input<SupportedLearningLanguage>('ja');
    isTokenizing = input<boolean>(false);
    areControlsVisible = input<boolean>(false);
    fsPopupVisible = input<boolean>(false);
    fontSizeClass = input<string>('text-medium');
    subtitlesVisible = input<boolean>(true);
    yPercent = input<number>(DEFAULT_FS_SUBTITLE_BOTTOM_Y);

    // Dual Subtitle Inputs
    showDualSubtitles = input<boolean>(false);
    isDualSubLoading = input<boolean>(false);
    currentTranslation = input<string | null>(null);

    // Grammar Inputs
    grammarMatches = input<GrammarMatch[]>([]);

    // Outputs
    wordClicked = output<{ token: Token; context: string; event: MouseEvent }>();
    grammarClicked = output<{ index: number; event: MouseEvent }>();
    positionCommitted = output<number>();
    togglePosition = output<void>();
    dragStarted = output<void>();
    dragEnded = output<void>();

    // Drag State
    isDragging = signal(false);
    private dragStartY = 0;
    private hasMoved = false;
    private cleanupDragListeners: (() => void) | null = null;
    private currentSubEl: HTMLElement | null = null;
    private lastActiveCue: SubtitleCue | null = null;

    // Preserves last cue during dragging so silence between cues never causes the card to unmount mid-drag
    readonly activeCue = computed(() => {
        const cue = this.currentCue();
        if (cue) {
            this.lastActiveCue = cue;
            return cue;
        }
        return this.isDragging() ? this.lastActiveCue : null;
    });

    // Computed
    readonly isTop = computed(() => this.yPercent() < 50);
    readonly showReadingAnnotation = computed(() => this.settings.showReadingAnnotation(this.language()));
    readonly prefersRomanized = computed(() => this.settings.prefersRomanizedReading(this.language()));

    readonly handleAriaLabel = computed(() => {
        const key = this.isTop() ? 'player.moveSubtitleBottom' : 'player.moveSubtitleTop';
        const fallback = this.isTop() ? 'Move subtitle to bottom (tap or drag)' : 'Move subtitle to top (tap or drag)';
        return this.i18n.t(key) || fallback;
    });

    readonly handleTitle = computed(() => {
        const key = this.isTop() ? 'player.moveSubtitleBottom' : 'player.moveSubtitleTop';
        const fallback = this.isTop() ? 'Tap to move to bottom, or drag to reposition' : 'Tap to move to top, or drag to reposition';
        return this.i18n.t(key) || fallback;
    });

    readonly grammarTokenIndices = computed(() => {
        const matches = this.grammarMatches();
        const indices = new Set<number>();
        for (const match of matches) {
            for (const idx of match.tokenIndices) {
                indices.add(idx);
            }
        }
        return indices;
    });

    readonly viewTokens = computed(() => {
        this.vocab.lastModified?.();
        const tokens = this.tokens();
        const grammarIndices = this.grammarTokenIndices();
        const lang = this.language();
        const readingOnly = this.settings.useReadingOnly(lang);

        return tokens.map((token, index) => {
            const isGrammar = grammarIndices.has(index);
            const wordLevel = this.vocab.getWordLevel(token.surface)
                || (token.baseForm ? this.vocab.getWordLevel(token.baseForm) : null)
                || (token.reading ? this.vocab.getWordLevel(token.reading) : null);
            const isSaved = wordLevel !== null
                || this.vocab.hasWord(token.surface)
                || (token.baseForm ? this.vocab.hasWord(token.baseForm) : false)
                || (token.reading ? this.vocab.hasWord(token.reading) : false);
            const reading = this.settings.getReadingText(lang, token) || undefined;
            const displayText = readingOnly && reading ? reading : token.surface;

            return {
                token,
                index,
                isPunctuation: token.isPunctuation,
                surface: token.surface,
                isGrammar,
                isSaved,
                wordLevel,
                reading,
                displayText,
                rubyParts: token.rubyParts
            };
        });
    });

    onHandlePointerDown(event: PointerEvent): void {
        if (event.button !== 0 && event.pointerType === 'mouse') return;
        event.stopPropagation();
        event.preventDefault();
        this.startDrag(event);
    }

    onHandleClick(event: MouseEvent): void {
        event.stopPropagation();
        // Screen readers / assistive technology fire synthetic clicks with detail === 0
        if (event.detail === 0) {
            this.togglePosition.emit();
        }
    }

    onHandleKeyToggle(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        this.togglePosition.emit();
    }

    private startDrag(event: PointerEvent): void {
        this.cleanupDragListeners?.();

        const handle = event.currentTarget as HTMLElement;
        const subEl = handle.closest('.fullscreen-subtitle') as HTMLElement | null;
        if (!subEl) return;

        this.currentSubEl = subEl;

        try {
            handle.setPointerCapture(event.pointerId);
        } catch {}

        this.dragStartY = event.clientY;
        this.hasMoved = false;

        const container = handle.closest('.video-container') as HTMLElement | null;
        const containerHeight = container?.clientHeight || window.innerHeight;
        const subRect = subEl.getBoundingClientRect();
        const containerRect = container ? container.getBoundingClientRect() : { top: 0, bottom: containerHeight };

        // Current rendered positions in pixels relative to container top
        const currentTopPx = subRect.top - containerRect.top;
        const currentBottomPx = subRect.bottom - containerRect.top;

        // Guaranteed safety bounds: Top edge never goes off-screen (at least 14px from top)
        const minDeltaY = 14 - currentTopPx;

        // Bottom clearance: 16px min margin (matches --min-bottom-margin in CSS)
        const bottomMarginPx = 16;
        const maxDeltaY = (containerHeight - bottomMarginPx) - currentBottomPx;

        let latestDeltaY = 0;

        const onPointerMove = (moveEvent: PointerEvent) => {
            if (moveEvent.pointerId !== event.pointerId) return;

            const rawDeltaY = moveEvent.clientY - this.dragStartY;
            // Require intentional drag distance before engaging drag state, preventing accidental drag triggers on tap
            if (!this.hasMoved) {
                if (Math.abs(rawDeltaY) <= FS_SUBTITLE_DRAG_THRESHOLD_PX) return;
                this.hasMoved = true;
                this.ngZone.run(() => {
                    this.isDragging.set(true);
                    this.dragStarted.emit();
                });
            }

            latestDeltaY = Math.max(minDeltaY, Math.min(maxDeltaY, rawDeltaY));
            subEl.style.setProperty('--drag-y', `${latestDeltaY}px`);
        };

        const onPointerUp = (upEvent: PointerEvent) => {
            if (upEvent.pointerId !== event.pointerId) return;

            try {
                handle.releasePointerCapture(upEvent.pointerId);
            } catch {}

            const hadMoved = this.hasMoved;
            const finalDelta = latestDeltaY;
            this.cleanupDragListeners?.();
            this.cleanupDragListeners = null;

            this.ngZone.run(() => {
                this.isDragging.set(false);
                if (hadMoved) {
                    this.dragEnded.emit();
                    const isNowTop = (currentTopPx + currentBottomPx + 2 * finalDelta) / 2 < containerHeight / 2;
                    let targetPercent: number;

                    if (isNowTop) {
                        const topPercent = ((currentTopPx + finalDelta) / containerHeight) * 100;
                        targetPercent = Math.max(3, Math.min(45, Math.round(topPercent * 10) / 10));
                    } else {
                        const bottomPercent = ((currentBottomPx + finalDelta) / containerHeight) * 100;
                        const maxPercent = ((containerHeight - bottomMarginPx) / containerHeight) * 100;
                        targetPercent = Math.max(55, Math.min(Math.round(maxPercent * 10) / 10, Math.round(bottomPercent * 10) / 10));
                    }

                    subEl.classList.toggle('is-top', isNowTop);
                    subEl.style.setProperty('--sub-y', `${targetPercent}`);
                    this.positionCommitted.emit(targetPercent);
                } else {
                    this.togglePosition.emit();
                }
                subEl.style.removeProperty('--drag-y');
            });
        };

        const onWindowBlur = () => {
            onPointerUp(event);
        };

        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
            window.addEventListener('blur', onWindowBlur);
        });

        this.cleanupDragListeners = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
            window.removeEventListener('blur', onWindowBlur);
        };
    }

    ngOnDestroy(): void {
        if (this.isDragging()) {
            this.dragEnded.emit();
        }
        this.currentSubEl?.style.removeProperty('--drag-y');
        this.cleanupDragListeners?.();
        this.cleanupDragListeners = null;
    }

    onWordClick(token: Token, context: string, index: number, event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
        if (this.grammarTokenIndices().has(index)) {
            this.grammarClicked.emit({ index, event });
        } else {
            this.wordClicked.emit({ token, context, event });
        }
    }
}
