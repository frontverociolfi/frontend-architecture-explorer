import { Component, computed, inject } from '@angular/core';

import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ArchitectureCatalogService } from '../../core/services/architecture-catalog.service';
import { ArchitectureList } from '../architecture-list/architecture-list';

@Component({
  selector: 'app-architecture-home',
  imports: [ArchitectureList, TranslatePipe],
  templateUrl: './architecture-home.html',
  styleUrl: './architecture-home.scss',
})
export class ArchitectureHome {
  private readonly catalog = inject(ArchitectureCatalogService);

  protected readonly architectures = computed(() => this.catalog.list());
}
