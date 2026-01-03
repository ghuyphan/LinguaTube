import { Component, inject, input, output, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { GrammarPattern } from '../../../models';
import { I18nService } from '../../../core/services';

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

    pattern = input<GrammarPattern | null>(null);
    isOpen = input<boolean>(false);
    navPadding = input<boolean>(true);
    closed = output<void>();

    // Get level badge class
    levelClass = computed(() => {
        const p = this.pattern();
        if (!p) return '';

        const level = p.level.toLowerCase();
        if (level.includes('n5') || level.includes('1')) return 'level-beginner';
        if (level.includes('n4') || level.includes('2')) return 'level-elementary';
        if (level.includes('n3') || level.includes('3')) return 'level-intermediate';
        if (level.includes('n2') || level.includes('4')) return 'level-upper-intermediate';
        if (level.includes('n1') || level.includes('5') || level.includes('6')) return 'level-advanced';
        return 'level-default';
    });

    onSheetClosed(): void {
        this.closed.emit();
    }
}
