import { Pipe, PipeTransform } from '@angular/core';
import { getLanguageFlagUrl } from '../../models/language.constants';

@Pipe({
  name: 'langFlag',
  standalone: true,
  pure: true
})
export class LanguageFlagPipe implements PipeTransform {
  transform(lang?: string | null): string {
    return getLanguageFlagUrl(lang);
  }
}
