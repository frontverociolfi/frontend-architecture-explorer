import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import {
  Architecture,
  ArchitectureComparison,
  ComparisonScore,
} from '../../core/models/architecture.model';
import { ArchitectureCatalogService } from '../../core/services/architecture-catalog.service';
import { ArchitectureComparisonService } from '../../core/services/architecture-comparison.service';

type CriterionKey = keyof ArchitectureComparison;

type Criterion = {
  key: CriterionKey;
  label: string;
  description: string;
};

@Component({
  selector: 'app-comparison-page',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './comparison-page.html',
  styleUrl: './comparison-page.scss',
})
export class ComparisonPage {
  private readonly catalog = inject(ArchitectureCatalogService);
  private readonly comparison = inject(ArchitectureComparisonService);
  private readonly i18n = inject(I18nService);

  protected readonly architectures = computed(() => this.catalog.list());
  protected readonly selectedIds = signal<string[]>(['feature-first', 'layered']);
  protected readonly maxSelection = 3;

  protected readonly criteria = computed<Criterion[]>(() => [
    {
      key: 'complexity',
      label: this.i18n.translate('comparisonPage.criteria.complexity.label'),
      description: this.i18n.translate('comparisonPage.criteria.complexity.description'),
    },
    {
      key: 'scale',
      label: this.i18n.translate('comparisonPage.criteria.scale.label'),
      description: this.i18n.translate('comparisonPage.criteria.scale.description'),
    },
    {
      key: 'teamAutonomy',
      label: this.i18n.translate('comparisonPage.criteria.teamAutonomy.label'),
      description: this.i18n.translate('comparisonPage.criteria.teamAutonomy.description'),
    },
    {
      key: 'testability',
      label: this.i18n.translate('comparisonPage.criteria.testability.label'),
      description: this.i18n.translate('comparisonPage.criteria.testability.description'),
    },
    {
      key: 'performance',
      label: this.i18n.translate('comparisonPage.criteria.performance.label'),
      description: this.i18n.translate('comparisonPage.criteria.performance.description'),
    },
    {
      key: 'learningCurve',
      label: this.i18n.translate('comparisonPage.criteria.learningCurve.label'),
      description: this.i18n.translate('comparisonPage.criteria.learningCurve.description'),
    },
  ]);

  protected readonly selectedArchitectures = computed(() =>
    this.selectedIds()
      .map((id) => this.catalog.findById(id))
      .filter((architecture): architecture is Architecture => Boolean(architecture)),
  );

  protected readonly canCompare = computed(() => this.selectedArchitectures().length >= 2);

  protected toggleArchitecture(architecture: Architecture): void {
    const selectedIds = this.selectedIds();

    if (selectedIds.includes(architecture.id)) {
      this.selectedIds.set(selectedIds.filter((id) => id !== architecture.id));
      return;
    }

    if (selectedIds.length < this.maxSelection) {
      this.selectedIds.set([...selectedIds, architecture.id]);
    }
  }

  protected isSelected(architecture: Architecture): boolean {
    return this.selectedIds().includes(architecture.id);
  }

  protected isDisabled(architecture: Architecture): boolean {
    return !this.isSelected(architecture) && this.selectedIds().length >= this.maxSelection;
  }

  protected scoreFor(architecture: Architecture, criterion: Criterion): ComparisonScore {
    return this.comparison.getFor(architecture.id)[criterion.key];
  }

  protected averageScore(architecture: Architecture): number {
    const scores = this.criteria().map((criterion) => this.scoreFor(architecture, criterion).value);
    const total = scores.reduce((sum, value) => sum + value, 0);

    return Math.round((total / scores.length) * 10) / 10;
  }

  protected scoreWidth(score: ComparisonScore): string {
    return `${(score.value / 5) * 100}%`;
  }
}
