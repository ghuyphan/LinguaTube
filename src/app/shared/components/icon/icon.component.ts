import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CURRENT_RELEASE_INFO } from '../../../data/changelog.data';

export type IconName =
    | 'play' | 'pause' | 'skip-back' | 'skip-forward'
    | 'rewind' | 'fast-forward'
    | 'volume-2' | 'volume-x' | 'volume-1' | 'sun' | 'moon'
    | 'search' | 'plus' | 'plus-circle' | 'check' | 'x' | 'trash-2'
    | 'upload' | 'download' | 'file-text' | 'book-open'
    | 'settings' | 'chevron-down' | 'external-link'
    | 'loader' | 'alert-circle' | 'info' | 'bookmark' | 'bookmark-plus' | 'bookmark-filled'
    | 'repeat' | 'languages' | 'subtitles' | 'captions'
    | 'video' | 'graduation-cap' | 'rotate-ccw' | 'shuffle' | 'refresh-cw'
    | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevrons-up' | 'chevrons-down' | 'arrow-left' | 'arrow-right' | 'layers'
    | 'sparkles' | 'wand' | 'play-circle' | 'play-circle-filled' | 'eye' | 'eye-off'
    | 'type' | 'log-out' | 'maximize' | 'minimize' | 'miniplayer' | 'expand' | 'fullscreen' | 'fullscreen-exit' | 'globe'
    | 'user' | 'google' | 'log-in'
    | 'clock' | 'heart' | 'heart-filled' | 'cloud'
    // Gamification & cute icons
    | 'star' | 'star-filled' | 'fire' | 'trophy' | 'medal' | 'gift' | 'diamond' | 'crown'
    | 'party-popper' | 'smile' | 'target' | 'zap' | 'snowflake' | 'more-horizontal' | 'more-horizontal-filled' | 'more-vertical'
    | 'list' | 'list-video' | 'list-video-filled' | 'list-plus' | 'share' | 'link' | 'lock' | 'grip-vertical'
    | 'headphones' | 'clipboard-check' | 'coffee'
    | 'graduation-cap-filled' | 'book-open-filled'
    // Audio & utility icons
    | 'bell' | 'mic' | 'mic-off' | 'keyboard' | 'send' | 'check-circle' | 'slash' | 'lightbulb' | 'leaf' | 'box' | 'droplet' | 'copy';

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

    readonly href = computed(() => `assets/icons/sprite.svg?v=${CURRENT_RELEASE_INFO.version}#${this.name()}`);
}