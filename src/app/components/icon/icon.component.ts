import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconName =
    | 'play' | 'pause' | 'skip-back' | 'skip-forward'
    | 'rewind' | 'fast-forward'
    | 'volume-2' | 'volume-x' | 'volume-1' | 'sun' | 'moon'
    | 'search' | 'plus' | 'check' | 'x' | 'trash-2'
    | 'upload' | 'download' | 'file-text' | 'book-open'
    | 'settings' | 'chevron-down' | 'external-link'
    | 'loader' | 'alert-circle' | 'info' | 'bookmark' | 'bookmark-plus'
    | 'repeat' | 'languages' | 'subtitles' | 'captions'
    | 'video' | 'graduation-cap' | 'rotate-ccw' | 'shuffle'
    | 'chevron-left' | 'chevron-right' | 'layers'
    | 'sparkles' | 'wand' | 'play-circle' | 'eye' | 'eye-off'
    | 'type' | 'log-out' | 'maximize' | 'minimize' | 'globe'
    | 'user' | 'google' | 'log-in'
    | 'clock' | 'heart' | 'cloud';

@Component({
    selector: 'app-icon',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss'
})
export class IconComponent {
    name = input.required<IconName>();
    size = input<number>(20);
}
