import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { flagBrSquare, flagUsSquare } from '@ng-icons/flag-icons/square';

import { I18nService } from './i18n.service';
import { Language } from './i18n-translations';
import { TranslatePipe } from './translate.pipe';

@Component({
  selector: 'app-language-toggle',
  imports: [NgIcon, TranslatePipe],
  providers: [provideIcons({ flagBrSquare, flagUsSquare })],
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  private readonly i18n = inject(I18nService);

  protected readonly language = this.i18n.language;
  protected readonly languages: { code: Language; icon: string; labelKey: 'app.language.pt' | 'app.language.en' }[] = [
    { code: 'pt', icon: 'flagBrSquare', labelKey: 'app.language.pt' },
    { code: 'en', icon: 'flagUsSquare', labelKey: 'app.language.en' },
  ];

  protected setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
  }
}
