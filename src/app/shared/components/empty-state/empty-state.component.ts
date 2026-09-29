import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../icon/icon.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  icon = input<IconName | null>(null);
  iconSize = input<number | null>(null);
  title = input<string>('');
  description = input<string>('');
  compact = input<boolean>(false);
  centered = input<boolean>(true);
  animate = input<boolean>(true);
  iconVariant = input<'default' | 'accent' | 'error'>('default');
}
