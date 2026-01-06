import { Component, ChangeDetectionStrategy, input, output, inject, signal, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { IconComponent } from '../icon/icon.component';
import { OptionPickerComponent, OptionItem } from '../option-picker/option-picker.component';
import { PlaylistService } from '../../../features/playlist/playlist.service';
import { PlaylistVisibility, PlaylistLanguage, PLAYLIST_TAGS } from '../../../models';
import { AuthService } from '../../../core/services/auth.service';
import { I18nService } from '../../../services';

@Component({
    selector: 'app-create-playlist-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule, BottomSheetComponent, IconComponent, OptionPickerComponent],
    templateUrl: './create-playlist-dialog.component.html',
    styleUrls: ['./create-playlist-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePlaylistDialogComponent {
    private playlistService = inject(PlaylistService);
    private auth = inject(AuthService);
    i18n = inject(I18nService);

    // Inputs
    isOpen = input<boolean>(false);

    // Outputs
    closed = output<void>();
    created = output<void>();

    @ViewChild(BottomSheetComponent) sheet!: BottomSheetComponent;

    // Form State
    title = signal('');
    description = signal('');
    visibility = signal<PlaylistVisibility>('unlisted');
    language = signal<PlaylistLanguage>('en');
    selectedTags = signal<string[]>([]);
    isSubmitting = signal(false);
    showLanguagePicker = signal(false);

    // Constants
    readonly TAGS = PLAYLIST_TAGS;

    visibilityOptions = computed(() => [
        { value: 'private', label: this.i18n.t('playlist.visibility.private'), icon: 'lock', desc: this.i18n.t('playlist.visibility.privateDesc') },
        { value: 'unlisted', label: this.i18n.t('playlist.visibility.unlisted'), icon: 'link', desc: this.i18n.t('playlist.visibility.unlistedDesc') },
        { value: 'published', label: this.i18n.t('playlist.visibility.public'), icon: 'globe', desc: this.i18n.t('playlist.visibility.publicDesc') }
    ]);

    // Use native language names to avoid font/display issues
    readonly LANGUAGE_OPTIONS: OptionItem[] = [
        { value: 'en', label: 'English' },
        { value: 'ja', label: '日本語' },
        { value: 'zh', label: '中文' },
        { value: 'ko', label: '한국어' }
    ];

    currentLanguageLabel = computed(() =>
        this.LANGUAGE_OPTIONS.find(opt => opt.value === this.language())?.label ?? 'English'
    );

    constructor() {
        // Set default language based on user settings would be nice, but for now default to EN or first available
    }

    toggleTag(tag: string) {
        const current = this.selectedTags();
        if (current.includes(tag)) {
            this.selectedTags.set(current.filter(t => t !== tag));
        } else {
            if (current.length < 5) { // Limit to 5 tags
                this.selectedTags.set([...current, tag]);
            }
        }
    }

    async onSubmit() {
        if (!this.title() || this.isSubmitting()) return;

        this.isSubmitting.set(true);

        try {
            await this.playlistService.createPlaylist({
                title: this.title(),
                description: this.description(),
                visibility: this.visibility(),
                language: this.language(),
                tags: this.selectedTags()
            });

            this.created.emit();
            this.sheet.close();
        } catch (error) {
            console.error('Failed to create playlist:', error);
            // TODO: Show toast error
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
        this.description.set('');
        this.visibility.set('unlisted');
        this.selectedTags.set([]);
        this.isSubmitting.set(false);
    }
}
