import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { I18nService } from '../../core/i18n/i18n.service';
import { Architecture } from '../../core/models/architecture.model';
import { ComparisonPage } from './comparison-page';

describe('ComparisonPage', () => {
  let fixture: ComponentFixture<ComparisonPage>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ComparisonPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ComparisonPage);
    fixture.detectChanges();
  });

  it('starts with two architectures selected and can compare', () => {
    const component = fixture.componentInstance as unknown as {
      selectedArchitectures(): Architecture[];
      canCompare(): boolean;
    };

    expect(component.selectedArchitectures().map((architecture) => architecture.id)).toEqual([
      'feature-first',
      'layered',
    ]);
    expect(component.canCompare()).toBe(true);
  });

  it('limits selection to three architectures', () => {
    const component = fixture.componentInstance as unknown as {
      architectures(): Architecture[];
      selectedArchitectures(): Architecture[];
      toggleArchitecture(architecture: Architecture): void;
      isDisabled(architecture: Architecture): boolean;
    };
    const monorepo = component.architectures().find((architecture) => architecture.id === 'monorepo')!;
    const clean = component.architectures().find((architecture) => architecture.id === 'clean')!;

    component.toggleArchitecture(monorepo);

    expect(component.selectedArchitectures().length).toBe(3);
    expect(component.isDisabled(clean)).toBe(true);
  });

  it('calculates average score and localizes criteria', () => {
    const i18n = TestBed.inject(I18nService);
    const component = fixture.componentInstance as unknown as {
      selectedArchitectures(): Architecture[];
      averageScore(architecture: Architecture): number;
      criteria(): { label: string }[];
    };

    expect(component.averageScore(component.selectedArchitectures()[0])).toBeGreaterThan(0);
    expect(component.criteria()[0].label).toBe('Complexidade');

    i18n.setLanguage('en');
    fixture.detectChanges();

    expect(component.criteria()[0].label).toBe('Complexity');
  });
});
