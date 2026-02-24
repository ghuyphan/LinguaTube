import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="toggle-switch">
        <input 
            type="checkbox" 
            [checked]="checked()" 
            (change)="onToggle($event)"
            [disabled]="disabled()"
        />
        <span class="slider"></span>
    </label>
  `,
  styles: [`
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 36px;
      height: 20px;
      flex-shrink: 0;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
    }

    .toggle-switch .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background-color: var(--bg-tertiary);
      transition: var(--transition-fast);
      border-radius: 20px;
    }

    .toggle-switch .slider::before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: var(--transition-fast);
      border-radius: 50%;
      box-shadow: none;
    }

    .toggle-switch input:checked + .slider {
      background-color: var(--accent-primary);
    }

    .toggle-switch input:focus-visible + .slider {
      box-shadow: var(--focus-ring);
    }

    .toggle-switch input:checked + .slider::before {
      transform: translateX(16px);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent {
  checked = input<boolean>(false);
  disabled = input<boolean>(false);

  checkedChange = output<boolean>();

  onToggle(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.checkedChange.emit(inputElement.checked);
  }
}
