import { Pipe, PipeTransform } from '@angular/core';

/** Native Intl formatting keeps locale data out of the initial application bundle. */
@Pipe({ name: 'localeDate', standalone: true, pure: true })
export class LocaleDatePipe implements PipeTransform {
  transform(value: string | null, locale: string, withTime = false): string {
    if (!value) return '';
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return '';
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium', ...(withTime ? { timeStyle: 'short' } : {}),
    }).format(date);
  }
}

@Pipe({ name: 'localeNumber', standalone: true, pure: true })
export class LocaleNumberPipe implements PipeTransform {
  transform(value: number, locale: string, currency?: string): string {
    return new Intl.NumberFormat(locale, currency ? {
      style: 'currency', currency, maximumFractionDigits: 0,
    } : {}).format(value);
  }
}
