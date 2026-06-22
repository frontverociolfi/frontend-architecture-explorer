import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ArchitectureCatalogService } from '../../core/services/architecture-catalog.service';
import { ArchitectureDetail } from '../architecture-detail/architecture-detail';
import { ArchitectureList } from '../architecture-list/architecture-list';

@Component({
  selector: 'app-architecture-detail-page',
  imports: [ArchitectureDetail, ArchitectureList, RouterLink, TranslatePipe],
  templateUrl: './architecture-detail-page.html',
  styleUrl: './architecture-detail-page.scss',
})
export class ArchitectureDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(ArchitectureCatalogService);
  private readonly routeId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

  protected readonly architectures = computed(() => this.catalog.list());
  protected readonly architecture = computed(() => this.catalog.findById(this.routeId() ?? null));
}
