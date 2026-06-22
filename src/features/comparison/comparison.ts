import { Component, input } from '@angular/core';

import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Architecture } from '../../core/models/architecture.model';

@Component({
  selector: 'app-comparison',
  imports: [TranslatePipe],
  templateUrl: './comparison.html',
  styleUrl: './comparison.scss',
})
export class Comparison {
  readonly architecture = input.required<Architecture>();
}
