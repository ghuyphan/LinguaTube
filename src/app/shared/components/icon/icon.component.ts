import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconName =
    | 'play' | 'pause' | 'skip-back' | 'skip-forward'
    | 'rewind' | 'fast-forward'
    | 'volume-2' | 'volume-x' | 'volume-1' | 'sun' | 'moon'
    | 'search' | 'plus' | 'check' | 'x' | 'trash-2'
    | 'upload' | 'download' | 'file-text' | 'book-open'
    | 'settings' | 'chevron-down' | 'external-link'
    | 'loader' | 'alert-circle' | 'info' | 'bookmark' | 'bookmark-plus' | 'bookmark-filled'
    | 'repeat' | 'languages' | 'subtitles' | 'captions'
    | 'video' | 'graduation-cap' | 'rotate-ccw' | 'shuffle' | 'refresh-cw'
    | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevrons-up' | 'chevrons-down' | 'arrow-left' | 'arrow-right' | 'layers'
    | 'sparkles' | 'wand' | 'play-circle' | 'eye' | 'eye-off'
    | 'type' | 'log-out' | 'maximize' | 'minimize' | 'globe'
    | 'user' | 'google' | 'log-in'
    | 'clock' | 'heart' | 'heart-filled' | 'cloud'
    // Gamification & cute icons
    | 'star' | 'star-filled' | 'fire' | 'trophy' | 'medal' | 'gift' | 'diamond'
    | 'party-popper' | 'smile' | 'target' | 'zap' | 'snowflake' | 'more-horizontal' | 'more-vertical'
    | 'list' | 'list-video' | 'list-plus' | 'share' | 'link' | 'lock' | 'grip-vertical'
    | 'headphones' | 'clipboard-check' | 'coffee'
    // Audio & utility icons
    | 'bell' | 'mic' | 'mic-off' | 'keyboard' | 'send' | 'check-circle' | 'lightbulb' | 'leaf' | 'box' | 'droplet';

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

    get href(): string {
        return `assets/icons/sprite.svg#${this.name()}`;
    }
}