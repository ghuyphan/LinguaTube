import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { I18nService } from '../../services';
import { DiamondCreditsCardComponent } from '../../shared/components/diamond-credits-card/diamond-credits-card.component';
import { TranscriptService } from '../../features/video/transcript.service';

@Component({
    selector: 'app-ai-credits-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent, DiamondCreditsCardComponent],
    templateUrl: './ai-credits-dialog.component.html',
    styleUrls: ['./ai-credits-dialog.component.scss']
})
export class AiCreditsDialogComponent {
    i18n = inject(I18nService);
    transcript = inject(TranscriptService);

    close = output<void>();
}
