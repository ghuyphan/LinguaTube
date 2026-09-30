import { Pipe, PipeTransform } from '@angular/core';
import { formatTime } from '../../core/utils/format.utils';

@Pipe({
  name: 'formatTime',
  standalone: true,
  pure: true
})
export class FormatTimePipe implements PipeTransform {
  transform(seconds?: number | null): string {
    return formatTime(seconds);
  }
}
