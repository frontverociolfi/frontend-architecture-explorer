import { Injectable, computed, effect, signal } from '@angular/core';

import { Architecture } from '../models/architecture.model';
import { architectureTranslations } from './architecture-translations';
import { Language, TranslationKey, translations } from './i18n-translations';

const languageStorageKey = 'frontend-architecture-explorer-language';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly selectedLanguage = signal<Language>(this.readInitialLanguage());

  readonly language = this.selectedLanguage.asReadonly();
  readonly documentLanguage = computed(() => (this.language() === 'pt' ? 'pt-BR' : 'en'));

  private readonly syncDocumentLanguage = effect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.documentLanguage();
    }
  });

  setLanguage(language: Language): void {
    this.selectedLanguage.set(language);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(languageStorageKey, language);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.documentLanguage();
    }
  }

  translate(key: TranslationKey, params: Record<string, string | number> = {}): string {
    const template = translations[this.language()][key] ?? translations.pt[key] ?? key;

    return Object.entries(params).reduce(
      (text, [param, value]) => text.replaceAll(`{{${param}}}`, String(value)),
      template,
    );
  }

  localizeArchitecture(architecture: Architecture): Architecture {
    const copy = architectureTranslations[this.language()]?.[architecture.id];

    if (!copy) {
      return architecture;
    }

    return {
      ...architecture,
      ...copy,
    };
  }

  private readInitialLanguage(): Language {
    if (typeof localStorage === 'undefined') {
      return 'pt';
    }

    const storedLanguage = localStorage.getItem(languageStorageKey);

    return storedLanguage === 'en' || storedLanguage === 'pt' ? storedLanguage : 'pt';
  }
}
