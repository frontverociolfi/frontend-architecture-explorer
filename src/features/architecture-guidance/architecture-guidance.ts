import { Component, input } from '@angular/core';

import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Architecture } from '../../core/models/architecture.model';

@Component({
  selector: 'app-architecture-guidance',
  imports: [TranslatePipe],
  templateUrl: './architecture-guidance.html',
  styleUrl: './architecture-guidance.scss',
})
export class ArchitectureGuidance {
  readonly architecture = input.required<Architecture>();
}
