import { Component, ChangeDetectionStrategy, input, output, inject, signal, viewChild, computed, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { PlaylistService } from '../../../features/playlist/playlist.service';
import { AuthService, I18nService } from '../../../core/services';
import { IconComponent } from '../icon/icon.component';
import { Playlist, SUPPORTED_LANGUAGES } from '../../../models';

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
    i18n = inject(I18nService);

    // Check if user is logged in (only logged in users can use unlisted/public)
    isLoggedIn = this.auth.isLoggedIn;

    // Inputs
    isOpen = input<boolean>(false);
    playlist = input<Playlist | null>(null);

    // Outputs
    closed = output<void>();
    created = output<void>();
    updated = output<void>();

    readonly sheet = viewChild(BottomSheetComponent);

    // Form State (linkedSignal synchronizes whenever the playlist input changes)
    readonly title = linkedSignal(() => this.playlist()?.title || '');
    readonly visibility = linkedSignal<'private' | 'unlisted' | 'published'>(() =>
        this.playlist()?.visibility || (this.auth.isLoggedIn() ? 'unlisted' : 'private')
    );
    readonly language = linkedSignal<'ja' | 'zh' | 'ko' | 'en'>(() => this.playlist()?.language || 'ja');
    readonly level = linkedSignal<string>(() => this.playlist()?.level || '');
    readonly isSubmitting = signal(false);

    // Computed
    isEditing = computed(() => !!this.playlist());

    // Language options
    readonly languages = SUPPORTED_LANGUAGES;

    // Difficulty level options
    readonly levelOptions = computed(() => {
        const lang = this.language();
        const autoLabel = this.i18n.t('level.auto') || 'Auto';
        const beginner = this.i18n.t('level.beginner') || 'Beginner';
        const elementary = this.i18n.t('level.elementary') || 'Elementary';
        const intermediate = this.i18n.t('level.intermediate') || 'Intermediate';
        const upperIntermediate = this.i18n.t('level.upper_intermediate') || this.i18n.t('level.upperIntermediate') || 'Upper Intermediate';
        const advanced = this.i18n.t('level.advanced') || 'Advanced';

        if (lang === 'ja') {
            return [
                { value: '', label: autoLabel },
                { value: 'JLPT N5', label: `N5 (${beginner})` },
                { value: 'JLPT N4', label: `N4 (${elementary})` },
                { value: 'JLPT N3', label: `N3 (${intermediate})` },
                { value: 'JLPT N2', label: `N2 (${upperIntermediate})` },
                { value: 'JLPT N1', label: `N1 (${advanced})` },
            ];
        }
        if (lang === 'zh') {
            return [
                { value: '', label: autoLabel },
                { value: 'HSK 1', label: `HSK 1 (${beginner})` },
                { value: 'HSK 2', label: `HSK 2 (${elementary})` },
                { value: 'HSK 3', label: `HSK 3 (${intermediate})` },
                { value: 'HSK 4', label: `HSK 4 (${upperIntermediate})` },
                { value: 'HSK 5', label: `HSK 5 (${advanced})` },
                { value: 'HSK 6', label: `HSK 6 (${advanced}+)` },
            ];
        }
        if (lang === 'ko') {
            return [
                { value: '', label: autoLabel },
                { value: 'TOPIK 1', label: `TOPIK 1 (${beginner})` },
                { value: 'TOPIK 2', label: `TOPIK 2 (${elementary})` },
                { value: 'TOPIK 3', label: `TOPIK 3 (${intermediate})` },
                { value: 'TOPIK 4', label: `TOPIK 4 (${upperIntermediate})` },
                { value: 'TOPIK 5', label: `TOPIK 5 (${advanced})` },
                { value: 'TOPIK 6', label: `TOPIK 6 (${advanced}+)` },
            ];
        }
        if (lang === 'en') {
            return [
                { value: '', label: autoLabel },
                { value: 'CEFR A1', label: `A1 (${beginner})` },
                { value: 'CEFR A2', label: `A2 (${elementary})` },
                { value: 'CEFR B1', label: `B1 (${intermediate})` },
                { value: 'CEFR B2', label: `B2 (${upperIntermediate})` },
                { value: 'CEFR C1', label: `C1 (${advanced})` },
                { value: 'CEFR C2', label: `C2 (${advanced}+)` },
            ];
        }

        return [
            { value: '', label: autoLabel },
            { value: 'Beginner', label: beginner },
            { value: 'Elementary', label: elementary },
            { value: 'Intermediate', label: intermediate },
            { value: 'Upper Intermediate', label: upperIntermediate },
            { value: 'Advanced', label: advanced }
        ];
    });

    async onSubmit() {
        if (!this.title() || this.isSubmitting()) return;

        this.isSubmitting.set(true);

        try {
            if (this.isEditing()) {
                await this.playlistService.updatePlaylist(this.playlist()!.id, {
                    title: this.title(),
                    visibility: this.visibility(),
                    language: this.language(),
                    level: this.level() || undefined
                });
                this.updated.emit();
            } else {
                await this.playlistService.createPlaylist({
                    title: this.title(),
                    visibility: this.visibility(),
                    language: this.language(),
                    level: this.level() || undefined
                });
                this.created.emit();
            }

            this.sheet()?.close();
        } catch (error) {
            console.error('Failed to save playlist:', error);
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
        // Default to private for unauthenticated users, unlisted for logged-in users
        this.visibility.set(this.auth.isLoggedIn() ? 'unlisted' : 'private');
        this.language.set('ja');
        this.isSubmitting.set(false);
    }
}
