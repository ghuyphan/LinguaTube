import { Component, ChangeDetectionStrategy, input, output, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { IconComponent } from '../icon/icon.component';
import { PlaylistService } from '../../../features/playlist/playlist.service';
import { PlaylistVisibility, PlaylistLanguage, PLAYLIST_TAGS } from '../../../models';
import { AuthService } from '../../../core/services/auth.service';

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
    private auth = inject(AuthService);

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

    // Constants
    readonly TAGS = PLAYLIST_TAGS;
    readonly VISIBILITY_OPTIONS = [
        { value: 'private', label: 'Private', icon: 'lock', desc: 'Only you can view' },
        { value: 'unlisted', label: 'Unlisted', icon: 'link', desc: 'Anyone with the link' },
        { value: 'published', label: 'Published', icon: 'globe', desc: 'Visible to everyone' }
    ];

    readonly LANGUAGES = [
        { value: 'en', label: 'English' },
        { value: 'ja', label: 'Japanese' },
        { value: 'zh', label: 'Chinese' },
        { value: 'ko', label: 'Korean' }
    ];

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
