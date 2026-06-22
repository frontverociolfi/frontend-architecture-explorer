import { Component, input } from '@angular/core';

import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Architecture } from '../../core/models/architecture.model';
import { ArchitectureGuidance } from '../architecture-guidance/architecture-guidance';
import { Comparison } from '../comparison/comparison';
import { MiniIde } from '../../shared/components/mini-ide/mini-ide';

@Component({
  selector: 'app-architecture-detail',
  imports: [ArchitectureGuidance, Comparison, MiniIde, TranslatePipe],
  templateUrl: './architecture-detail.html',
  styleUrl: './architecture-detail.scss',
})
export class ArchitectureDetail {
  readonly architecture = input.required<Architecture>();

  protected accentColor(): string {
    const accent = this.architecture().accent;

    const namedAccents: Record<string, string> = {
      teal: 'var(--color-secondary)',
      blue: 'var(--color-secondary)',
      green: 'color-mix(in srgb, var(--color-primary) 55%, var(--color-secondary))',
      yellow: 'color-mix(in srgb, var(--color-accent) 56%, var(--color-surface))',
      coral: 'var(--color-accent)',
    };

    return namedAccents[accent] ?? accent;
  }
}
