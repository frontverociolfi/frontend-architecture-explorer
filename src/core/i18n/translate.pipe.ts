import { Pipe, PipeTransform, inject } from '@angular/core';

import { I18nService } from './i18n.service';
import { TranslationKey } from './i18n-translations';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: TranslationKey, params: Record<string, string | number> = {}): string {
    return this.i18n.translate(key, params);
  }
}
