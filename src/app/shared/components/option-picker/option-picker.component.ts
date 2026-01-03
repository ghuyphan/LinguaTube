import { Component, input, output, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { IconComponent } from '../icon/icon.component';

export interface OptionItem {
    value: string;
    label: string;
    icon?: string;      // Emoji or icon name
    iconUrl?: string;   // Image URL (for flags)
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
    // Optional nav padding
    navPadding = input<boolean>(false);

    closed = output<void>();
    selected = output<string>();

    @ViewChild(BottomSheetComponent) sheet!: BottomSheetComponent;

    // Internal state to track selection until animation completes
    private selectedValue: string | null = null;

    selectOption(value: string): void {
        this.selectedValue = value;
        this.sheet.close();
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
        this.sheet.close();
    }
}
