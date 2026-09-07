import { Component, input, output, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { IconComponent } from '../icon/icon.component';

export interface OptionItem {
    value: string;
    label: string;
    example?: string;   // Secondary example text (e.g. "日本語 (にほんご)")
    description?: string;
    icon?: string;      // Icon name (e.g. 'sparkles', 'book-open') or emoji
    iconUrl?: string;   // Image URL (for flags)
    badge?: string;     // Optional status badge text
    color?: string;     // Color variant ('new' | 'learning' | 'known' | 'ignored')
}

@Component({
    selector: 'app-option-picker',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, BottomSheetComponent, IconComponent],
    templateUrl: './option-picker.component.html',
    styleUrl: './option-picker.component.scss'
})
export class OptionPickerComponent {
    options = input.required<OptionItem[]>();
    value = input<string>('');
    isOpen = input<boolean>(false);
    title = input<string>('');
    // Optional manual z-index
    zIndex = input<number | undefined>(undefined);

    closed = output<void>();
    selected = output<string>();

    readonly sheet = viewChild(BottomSheetComponent);

    // Internal state to track selection until animation completes
    private selectedValue: string | null = null;

    isSvgIcon(icon?: string): boolean {
        if (!icon) return false;
        return /^[a-z0-9-]+$/.test(icon);
    }

    selectOption(value: string): void {
        this.selectedValue = value;
        this.sheet()?.close();
    }

    onSheetClosed(): void {
        if (this.selectedValue) {
            this.selected.emit(this.selectedValue);
            this.selectedValue = null;
        }
        this.closed.emit();
    }

    onClose(): void {
        // Triggered by back button or close button or background click
        this.sheet()?.close();
    }
}
