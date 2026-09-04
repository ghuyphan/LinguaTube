import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { I18nService } from '../../../../../core/services/i18n.service';

@Component({
  selector: 'app-video-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './video-header.component.html',
  styleUrl: './video-header.component.scss'
})
export class VideoHeaderComponent {
  i18n = inject(I18nService);

  title = input<string | undefined>();
  channel = input<string | undefined>();

  closeVideo = output<void>();
}
