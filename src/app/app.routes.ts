import { Routes } from '@angular/router';

import { AdvisorPage } from '../features/advisor/advisor-page';
import { ArchitectureDetailPage } from '../features/architecture-detail-page/architecture-detail-page';
import { ArchitectureHome } from '../features/architecture-home/architecture-home';
import { ComparisonPage } from '../features/comparison/comparison-page';

export const routes: Routes = [
  { path: '', component: ArchitectureHome },
  { path: 'arquiteturas/:id', component: ArchitectureDetailPage },
  { path: 'simulador', component: AdvisorPage },
  { path: 'comparador', component: ComparisonPage },
];
