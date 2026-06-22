import { TestBed } from '@angular/core/testing';

import { I18nService } from './i18n.service';

describe('I18nService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
    TestBed.configureTestingModule({});
  });

  it('uses Portuguese by default and interpolates parameters', () => {
    const service = TestBed.inject(I18nService);

    expect(service.language()).toBe('pt');
    expect(service.translate('list.count', { visible: 2, total: 13 })).toBe('2 de 13 visíveis');
  });

  it('persists the selected language and updates document language', () => {
    const service = TestBed.inject(I18nService);

    service.setLanguage('en');

    expect(service.language()).toBe('en');
    expect(localStorage.getItem('frontend-architecture-explorer-language')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('localizes architecture copy when English is selected', () => {
    const service = TestBed.inject(I18nService);

    service.setLanguage('en');

    const architecture = service.localizeArchitecture({
      id: 'feature-first',
      name: 'Feature First',
      shortDescription: 'pt',
      explanation: 'pt',
      files: [{ path: 'src/app.ts', name: 'app.ts', depth: 0, type: 'file' }],
      pros: ['pt'],
      cons: ['pt'],
      whenToUse: ['pt'],
      realExample: 'pt',
      accent: 'teal',
    });

    expect(architecture.shortDescription).toContain('business capabilities');
    expect(architecture.pros[0]).toContain('product-oriented teams');
  });
});
