import { RenderMode, ServerRoute } from '@angular/ssr';

const architectureIds = [
  'feature-first',
  'layered',
  'domain-driven-frontend',
  'monorepo',
  'microfrontends',
  'hexagonal',
  'clean',
  'cqrs-frontend',
  'event-driven-frontend',
  'bff',
  'module-federation',
  'islands-architecture',
  'feature-sliced-design',
];

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'simulador',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'comparador',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'arquiteturas/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => architectureIds.map((id) => ({ id })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
