import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProficiencyLevelTier, deriveLevelTier } from '../../../models/video-level.model';

export type LevelBadgeSize = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-level-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './level-badge.component.html',
  styleUrl: './level-badge.component.scss'
})
export class LevelBadgeComponent {
  /** The displayed text label (e.g. 'JLPT N4', 'CEFR B1', 'Beginner') */
  level = input<string | null | undefined>();

  /** The explicit difficulty tier. If omitted, automatically derived from `level`. */
  tier = input<ProficiencyLevelTier | string | null | undefined>();

  /** Sizing variant */
  size = input<LevelBadgeSize>('sm');

  /** Whether the level is currently being evaluated / analyzed */
  loading = input<boolean>(false);

  /** Whether the badge can be clicked/tapped (adds pointer, hover effects, accessibility role) */
  clickable = input<boolean>(false);

  /** Accessible tooltip override */
  customTitle = input<string | null | undefined>();

  /** Click event emitted when clicked or activated with Enter/Space */
  clicked = output<MouseEvent>();

  /** Effective tier after fallback / auto-derivation */
  readonly effectiveTier = computed<ProficiencyLevelTier>(() => {
    const explicit = this.tier();
    if (explicit) {
      return deriveLevelTier(explicit);
    }
    return deriveLevelTier(this.level());
  });

  /** Tooltip text */
  readonly badgeTitle = computed(() => {
    const custom = this.customTitle();
    if (custom) return custom;
    if (this.loading()) return 'Evaluating difficulty level...';
    return this.level() || '';
  });

  onClick(event: MouseEvent): void {
    if (this.clickable() && !this.loading()) {
      this.clicked.emit(event);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.clickable() && !this.loading() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.clicked.emit(event as unknown as MouseEvent);
    }
  }
}
