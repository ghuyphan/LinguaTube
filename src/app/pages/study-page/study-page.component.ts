import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyModeComponent } from '../../components/study-mode/study-mode.component';

@Component({
    selector: 'app-study-page',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, StudyModeComponent],
    template: `<app-study-mode />`,
    styles: [`:host { display: block; }`]
})
export class StudyPageComponent { }
