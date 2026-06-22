import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Architecture } from '../../core/models/architecture.model';
import { ArchitectureCatalogService } from '../../core/services/architecture-catalog.service';
import {
  ADVISOR_QUESTIONS,
  ADVISOR_QUESTIONS_EN,
  AdvisorOption,
  AdvisorQuestion,
} from './advisor-questions';

@Component({
  selector: 'app-advisor-page',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './advisor-page.html',
  styleUrl: './advisor-page.scss',
})
export class AdvisorPage {
  private readonly catalog = inject(ArchitectureCatalogService);
  private readonly i18n = inject(I18nService);

  protected readonly architectures = computed(() => this.catalog.list());
  protected readonly answers = signal<Record<string, AdvisorOption>>({});
  protected readonly questions = computed(() =>
    this.i18n.language() === 'en' ? ADVISOR_QUESTIONS_EN : ADVISOR_QUESTIONS,
  );
  protected readonly answeredCount = computed(() => Object.keys(this.answers()).length);
  protected readonly remainingCount = computed(() => this.questions().length - this.answeredCount());
  protected readonly progressPercent = computed(() =>
    Math.round((this.answeredCount() / this.questions().length) * 100),
  );
  protected readonly hasAnswers = computed(() => this.answeredCount() > 0);
  protected readonly isComplete = computed(() => this.answeredCount() === this.questions().length);
  protected readonly recommendation = computed(() => this.rankArchitectures()[0]);
  protected readonly alternatives = computed(() => this.rankArchitectures().slice(1, 4));
  protected readonly recommendationReasons = computed(() => {
    const recommendation = this.recommendation();

    return Object.values(this.answers())
      .filter((answer) => (answer.scores[recommendation.id] ?? 0) > 0)
      .map((answer) => answer.bestFor)
      .slice(0, 3);
  });

  protected answer(question: AdvisorQuestion, option: AdvisorOption): void {
    this.answers.update((answers) => ({ ...answers, [question.id]: option }));
  }

  protected isSelected(question: AdvisorQuestion, option: AdvisorOption): boolean {
    return this.answers()[question.id]?.label === option.label;
  }

  protected reset(): void {
    this.answers.set({});
  }

  private rankArchitectures(): Architecture[] {
    const totals = new Map<string, number>();

    for (const option of Object.values(this.answers())) {
      for (const [id, score] of Object.entries(option.scores)) {
        totals.set(id, (totals.get(id) ?? 0) + score);
      }
    }

    return [...this.architectures()].sort(
      (a, b) => (totals.get(b.id) ?? 0) - (totals.get(a.id) ?? 0),
    );
  }
}
