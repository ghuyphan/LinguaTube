import { Component, ChangeDetectionStrategy, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-search-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="app-search-box">
      <app-icon name="search" [size]="14" class="search-icon" />
      <input
        type="search"
        enterkeyhint="search"
        [value]="value()"
        (input)="onInput($event)"
        (keydown.enter)="submitted.emit(value())"
        [placeholder]="placeholder()"
        class="search-input"
        [attr.spellcheck]="spellcheck()"
        autocomplete="off"
      />
      @if (value()) {
        <button type="button" class="clear-btn" (click)="clear()" [attr.aria-label]="clearAriaLabel()">
          <app-icon name="x" [size]="12" />
        </button>
      }
    </div>
  `
})
export class SearchInputComponent {
  value = model<string>('');
  placeholder = input<string>('Search...');
  clearAriaLabel = input<string>('Clear search');
  spellcheck = input<boolean>(false);

  submitted = output<string>();
  cleared = output<void>();

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
  }

  clear(): void {
    this.value.set('');
    this.cleared.emit();
  }
}
