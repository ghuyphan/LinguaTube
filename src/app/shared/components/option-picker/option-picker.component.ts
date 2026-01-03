import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
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

    closed = output<void>();
    selected = output<string>();

    selectOption(value: string): void {
        this.selected.emit(value);
        this.closed.emit();
    }

    onClose(): void {
        this.closed.emit();
    }
}
