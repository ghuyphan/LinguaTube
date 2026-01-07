import { Component, ChangeDetectionStrategy, input, output, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { PlaylistService } from '../../../features/playlist/playlist.service';
import { I18nService } from '../../../services';
import { IconComponent } from '../icon/icon.component';

const LANGUAGES = [
    { code: 'ja' as const, name: '日本語', flag: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
    { code: 'zh' as const, name: '中文', flag: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
    { code: 'ko' as const, name: '한국어', flag: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
    { code: 'en' as const, name: 'English', flag: 'https://hatscripts.github.io/circle-flags/flags/gb.svg' }
];

@Component({
    selector: 'app-create-playlist-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule, BottomSheetComponent, IconComponent],
    templateUrl: './create-playlist-dialog.component.html',
    styleUrls: ['./create-playlist-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePlaylistDialogComponent {
    private playlistService = inject(PlaylistService);
    i18n = inject(I18nService);

    // Inputs
    isOpen = input<boolean>(false);

    // Outputs
    closed = output<void>();
    created = output<void>();

    @ViewChild(BottomSheetComponent) sheet!: BottomSheetComponent;

    // Form State
    title = signal('');
    visibility = signal<'private' | 'unlisted' | 'published'>('unlisted');
    language = signal<'ja' | 'zh' | 'ko' | 'en'>('ja');
    isSubmitting = signal(false);

    // Language options
    readonly languages = LANGUAGES;

    async onSubmit() {
        if (!this.title() || this.isSubmitting()) return;

        this.isSubmitting.set(true);

        try {
            await this.playlistService.createPlaylist({
                title: this.title(),
                visibility: this.visibility(),
                language: this.language()
            });

            this.created.emit();
            this.sheet.close();
        } catch (error) {
            console.error('Failed to create playlist:', error);
        } finally {
            this.isSubmitting.set(false);
        }
    }

    onSheetClosed() {
        this.resetForm();
        this.closed.emit();
    }

    private resetForm() {
        this.title.set('');
        this.visibility.set('unlisted');
        this.language.set('ja');
        this.isSubmitting.set(false);
    }
}
