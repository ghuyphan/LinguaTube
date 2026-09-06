import { Component, inject, input, output, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { GrammarPattern } from '../../../models';
import { I18nService } from '../../../core/services';
import { GrammarService } from '../../../services';

@Component({
    selector: 'app-grammar-popup',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, BottomSheetComponent],
    templateUrl: './grammar-popup.component.html',
    styleUrl: './grammar-popup.component.scss'
})
export class GrammarPopupComponent {
    i18n = inject(I18nService);
    grammar = inject(GrammarService);

    pattern = input<GrammarPattern | null>(null);
    isOpen = input<boolean>(false);
    closed = output<void>();

    constructor() {
        // Trigger translation lazy loading when popup is open for a non-English UI language
        effect(() => {
            const p = this.pattern();
            const open = this.isOpen();
            const uiLang = this.i18n.currentLanguage();

            if (p && open && uiLang !== 'en') {
                this.grammar.loadTranslation(p.language, uiLang);
            }
        });
    }

    // Localized pattern merged reactively with translation pack
    displayPattern = computed(() => {
        const p = this.pattern();
        if (!p) return null;

        const uiLang = this.i18n.currentLanguage();
        if (uiLang === 'en') return p;

        // Reactive tracking: automatically re-evaluates whenever a translation pack finishes loading
        this.grammar.loadedTranslations();

        const trans = this.grammar.getLoadedTranslation(p.language, uiLang)?.[p.id];
        if (!trans) return p;

        return {
            ...p,
            title: trans.title || p.title,
            shortExplanation: trans.shortExplanation || p.shortExplanation,
            longExplanation: trans.longExplanation || p.longExplanation,
            formation: trans.formation || p.formation,
            examples: p.examples.map((ex, idx) => ({
                ...ex,
                translation: trans.examples?.[idx]?.translation || ex.translation
            }))
        };
    });

    // Get level badge class
    levelClass = computed(() => {
        const p = this.displayPattern();
        if (!p) return '';

        const level = p.level.toLowerCase();
        if (level.includes('n5') || level.includes('a1') || level.includes('1')) return 'level-beginner';
        if (level.includes('n4') || level.includes('a2') || level.includes('2')) return 'level-elementary';
        if (level.includes('n3') || level.includes('b1') || level.includes('3')) return 'level-intermediate';
        if (level.includes('n2') || level.includes('b2') || level.includes('4')) return 'level-upper-intermediate';
        if (level.includes('n1') || level.includes('c1') || level.includes('c2') || level.includes('5') || level.includes('6')) return 'level-advanced';
        return 'level-default';
    });

    onSheetClosed(): void {
        this.closed.emit();
    }
}

