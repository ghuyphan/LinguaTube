import { Component, inject, signal, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { SubtitleService } from '../../services';

@Component({
  selector: 'app-subtitle-upload',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  templateUrl: './subtitle-upload.component.html',
  styleUrl: './subtitle-upload.component.scss'
})
export class SubtitleUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  subtitles = inject(SubtitleService);

  isDragover = signal(false);
  error = signal<string | null>(null);

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      await this.loadFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover.set(false);
  }

  async onDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover.set(false);

    const file = event.dataTransfer?.files[0];
    if (file) {
      await this.loadFile(file);
    }
  }

  private async loadFile(file: File): Promise<void> {
    this.error.set(null);

    const validExtensions = ['.srt', '.vtt', '.ass', '.ssa'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(ext)) {
      this.error.set('Invalid file format. Please use .srt, .vtt, or .ass files.');
      return;
    }

    try {
      await this.subtitles.loadFromFile(file);
    } catch (err) {
      this.error.set('Failed to parse subtitle file.');
      console.error(err);
    }
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.subtitles.clear();
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
