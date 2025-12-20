import { Component, inject, signal, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { SubtitleService } from '../../services';

@Component({
  selector: 'app-subtitle-upload',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="subtitle-upload">
      <input
        #fileInput
        type="file"
        accept=".srt,.vtt,.ass,.ssa"
        class="file-input"
        (change)="onFileSelected($event)"
      />

      <div 
        class="upload-zone"
        [class.upload-zone--dragover]="isDragover()"
        [class.upload-zone--loaded]="subtitles.subtitles().length > 0"
        (click)="fileInput.click()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
      >
        @if (subtitles.subtitles().length > 0) {
          <div class="upload-success">
            <app-icon name="check" [size]="20" class="success-icon" />
            <span class="success-text">{{ subtitles.subtitles().length }} subtitles loaded</span>
            <button class="btn btn-sm btn-ghost" (click)="clear($event)">
              <app-icon name="x" [size]="14" />
              Clear
            </button>
          </div>
        } @else {
          <app-icon name="upload" [size]="24" class="upload-icon" />
          <div class="upload-text">
            <span class="upload-title">Upload subtitles</span>
            <span class="upload-hint">.srt, .vtt, .ass files supported</span>
          </div>
        }
      </div>

      @if (error()) {
        <div class="error-msg">
          <app-icon name="alert-circle" [size]="14" />
          {{ error() }}
        </div>
      }
    </div>
  `,
  styles: [`
    .subtitle-upload {
      margin-top: var(--space-md);
    }

    .file-input {
      display: none;
    }

    .upload-zone {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      border: 1px dashed var(--border-color);
      border-radius: var(--border-radius);
      background: var(--bg-card);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .upload-zone:hover {
      border-color: var(--accent-primary);
      background: var(--bg-secondary);
    }

    .upload-zone--dragover {
      border-color: var(--accent-primary);
      border-style: solid;
      background: rgba(199, 62, 58, 0.05);
    }

    .upload-zone--loaded {
      border-style: solid;
      border-color: var(--success);
      background: var(--word-known);
    }

    .upload-zone--loaded:hover {
      border-color: var(--success);
      background: var(--word-known);
    }

    .upload-icon {
      color: var(--text-muted);
      flex-shrink: 0;
    }

    .upload-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .upload-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .upload-hint {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .upload-success {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      width: 100%;
    }

    .success-icon {
      color: var(--success);
      flex-shrink: 0;
    }

    .success-text {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--success);
      flex: 1;
    }

    .error-msg {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-top: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      font-size: 0.8125rem;
      color: var(--error);
      background: var(--word-new);
      border-radius: var(--border-radius);
    }
  `]
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
