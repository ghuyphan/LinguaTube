import { Pipe, PipeTransform } from '@angular/core';
import { getCountryFlagUrl } from '../../models/country.constants';

@Pipe({
  name: 'countryFlag',
  standalone: true,
  pure: true
})
export class CountryFlagPipe implements PipeTransform {
  transform(country?: string | null): string {
    return getCountryFlagUrl(country);
  }
}
