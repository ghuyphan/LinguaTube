import { Component, input } from '@angular/core';

@Component({
  selector: 'app-video-header',
  standalone: true,
  templateUrl: './video-header.component.html',
  styleUrl: './video-header.component.scss'
})
export class VideoHeaderComponent {
  title = input<string | undefined>();
  channel = input<string | undefined>();
}
