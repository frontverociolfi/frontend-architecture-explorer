import { TestBed } from '@angular/core/testing';

import { I18nService } from '../i18n/i18n.service';
import { ArchitectureComparisonService } from './architecture-comparison.service';

describe('ArchitectureComparisonService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('returns Portuguese comparison scores by default', () => {
    const service = TestBed.inject(ArchitectureComparisonService);
    const comparison = service.getFor('feature-first');

    expect(comparison.complexity.label).toBe('Média');
    expect(comparison.scale.value).toBe(4);
    expect(comparison.learningCurve.note).toContain('Angular/SPA');
  });

  it('returns English comparison scores after language switch', () => {
    const i18n = TestBed.inject(I18nService);
    const service = TestBed.inject(ArchitectureComparisonService);

    i18n.setLanguage('en');

    const comparison = service.getFor('feature-first');

    expect(comparison.complexity.label).toBe('Medium');
    expect(comparison.scale.note).toContain('growing products');
  });
});
