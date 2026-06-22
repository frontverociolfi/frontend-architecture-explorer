import { TestBed } from '@angular/core/testing';

import { I18nService } from '../i18n/i18n.service';
import { ArchitectureCatalogService } from './architecture-catalog.service';

describe('ArchitectureCatalogService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('returns the complete catalog with unique ids and file examples', () => {
    const service = TestBed.inject(ArchitectureCatalogService);
    const architectures = service.list();
    const ids = new Set(architectures.map((architecture) => architecture.id));

    expect(architectures.length).toBe(13);
    expect(ids.size).toBe(13);
    expect(architectures.every((architecture) => architecture.files.some((file) => file.type === 'file'))).toBe(true);
  });

  it('finds architectures by id', () => {
    const service = TestBed.inject(ArchitectureCatalogService);

    expect(service.findById('hexagonal')?.name).toBe('Hexagonal');
    expect(service.findById('missing')).toBeUndefined();
    expect(service.findById(null)).toBeUndefined();
  });

  it('returns localized architecture data from the current language', () => {
    const i18n = TestBed.inject(I18nService);
    const service = TestBed.inject(ArchitectureCatalogService);

    i18n.setLanguage('en');

    expect(service.findById('cqrs-frontend')?.name).toBe('CQRS on the Frontend');
    expect(service.findById('cqrs-frontend')?.whenToUse[0]).toContain('business actions');
  });
});
