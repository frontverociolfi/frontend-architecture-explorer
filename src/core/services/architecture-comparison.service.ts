import { Injectable, inject } from '@angular/core';

import { I18nService } from '../i18n/i18n.service';
import { Language } from '../i18n/i18n-translations';
import { ArchitectureComparison, ComparisonScore } from '../models/architecture.model';

type ScoreInput = [ComparisonScore['label'], number, string];

const score = ([label, value, note]: ScoreInput): ComparisonScore => ({ label, value, note });

@Injectable({ providedIn: 'root' })
export class ArchitectureComparisonService {
  private readonly i18n = inject(I18nService);

  private readonly comparisons: Record<Language, Record<string, ArchitectureComparison>> = {
    pt: {
      'feature-first': this.build({
        complexity: ['Média', 3, 'Cresce bem por funcionalidade sem exigir muitas camadas.'],
        scale: ['Alta', 4, 'Boa para produtos em crescimento e squads por jornada.'],
        teamAutonomy: ['Média', 3, 'Autonomia por feature, mas ainda no mesmo deploy.'],
        testability: ['Média', 3, 'Testável quando services e estado ficam isolados por feature.'],
        performance: ['Média', 3, 'Depende mais das escolhas de lazy loading e estado.'],
        learningCurve: ['Baixa', 2, 'Fácil de explicar para times de Angular/SPA.'],
      }),
      layered: this.build({
        complexity: ['Baixa', 2, 'Estrutura técnica simples e direta.'],
        scale: ['Média', 3, 'Funciona até o crescimento tornar pastas genéricas demais.'],
        teamAutonomy: ['Baixa', 2, 'Times mexem nas mesmas camadas com frequência.'],
        testability: ['Média', 3, 'Serviços isolados ajudam, mas regras podem vazar para componentes.'],
        performance: ['Média', 3, 'Sem impacto direto; depende da implementação.'],
        learningCurve: ['Baixa', 1, 'É a organização mais fácil para começar.'],
      }),
      'domain-driven-frontend': this.build({
        complexity: ['Alta', 4, 'Exige modelagem de domínio e limites claros.'],
        scale: ['Muito alta', 5, 'Escala bem quando domínios são ricos e independentes.'],
        teamAutonomy: ['Alta', 4, 'Times podem se orientar por bounded contexts.'],
        testability: ['Muito alta', 5, 'Regras de domínio ficam mais fáceis de testar fora da UI.'],
        performance: ['Média', 3, 'Arquitetura não otimiza performance por si só.'],
        learningCurve: ['Alta', 4, 'Pede vocabulário de negócio e experiência com DDD.'],
      }),
      monorepo: this.build({
        complexity: ['Alta', 4, 'Ferramentas, boundaries e CI exigem governança.'],
        scale: ['Muito alta', 5, 'Excelente para muitos apps e libs relacionadas.'],
        teamAutonomy: ['Média', 3, 'Autonomia com coordenação centralizada.'],
        testability: ['Alta', 4, 'Facilita testes compartilhados e execução afetada.'],
        performance: ['Média', 3, 'Ajuda no build; runtime depende dos apps.'],
        learningCurve: ['Média', 3, 'Exige entender workspaces, cache e boundaries.'],
      }),
      microfrontends: this.build({
        complexity: ['Muito alta', 5, 'Aumenta integração, deploy, contratos e observabilidade.'],
        scale: ['Muito alta', 5, 'Boa para organizações grandes com domínios independentes.'],
        teamAutonomy: ['Muito alta', 5, 'Cada time pode operar seu pedaço.'],
        testability: ['Alta', 4, 'Permite testes por domínio, mas integração fica crítica.'],
        performance: ['Média', 3, 'Pode piorar se bundles e shared deps forem mal planejados.'],
        learningCurve: ['Alta', 4, 'Exige maturidade técnica e operacional.'],
      }),
      hexagonal: this.build({
        complexity: ['Alta', 4, 'Portas e adaptadores adicionam estrutura.'],
        scale: ['Alta', 4, 'Boa para regras que precisam sobreviver a mudanças externas.'],
        teamAutonomy: ['Média', 3, 'Autonomia por domínio, mas não resolve deploy independente.'],
        testability: ['Muito alta', 5, 'Casos de uso e domínio ficam altamente testáveis.'],
        performance: ['Média', 3, 'Sem ganho direto de runtime.'],
        learningCurve: ['Alta', 4, 'Exige entender inversão de dependência no frontend.'],
      }),
      clean: this.build({
        complexity: ['Alta', 4, 'Camadas e gateways aumentam cerimônia.'],
        scale: ['Alta', 4, 'Boa para sistemas longos e críticos.'],
        teamAutonomy: ['Média', 3, 'Ajuda limites internos, mas não separa operação.'],
        testability: ['Muito alta', 5, 'Casos de uso e entidades podem ser testados isoladamente.'],
        performance: ['Média', 3, 'Não resolve performance diretamente.'],
        learningCurve: ['Alta', 4, 'Demanda disciplina para não criar camadas vazias.'],
      }),
      'cqrs-frontend': this.build({
        complexity: ['Alta', 4, 'Commands, queries e read models adicionam conceitos.'],
        scale: ['Alta', 4, 'Útil quando fluxos de leitura e escrita crescem.'],
        teamAutonomy: ['Média', 3, 'Ajuda separar responsabilidades, não times.'],
        testability: ['Alta', 4, 'Comandos e queries são unidades boas de teste.'],
        performance: ['Alta', 4, 'Read models podem reduzir transformação na UI.'],
        learningCurve: ['Alta', 4, 'Requer cuidado para não duplicar modelo sem necessidade.'],
      }),
      'event-driven-frontend': this.build({
        complexity: ['Alta', 4, 'Eventos tornam fluxo menos linear.'],
        scale: ['Alta', 4, 'Bom para módulos que reagem independentemente.'],
        teamAutonomy: ['Alta', 4, 'Contratos de eventos reduzem acoplamento direto.'],
        testability: ['Média', 3, 'Testável, mas precisa observabilidade de eventos.'],
        performance: ['Média', 3, 'Pode ser eficiente, mas exige controle de assinaturas.'],
        learningCurve: ['Alta', 4, 'Debug e contratos pedem maturidade.'],
      }),
      bff: this.build({
        complexity: ['Média', 3, 'Adiciona backend dedicado, mas simplifica a UI.'],
        scale: ['Alta', 4, 'Boa para canais e telas com agregação.'],
        teamAutonomy: ['Média', 3, 'Autonomia melhora se frontend e BFF têm ownership claro.'],
        testability: ['Alta', 4, 'Contratos de tela ficam mais fáceis de validar.'],
        performance: ['Alta', 4, 'Reduz roundtrips e montagem pesada no browser.'],
        learningCurve: ['Média', 3, 'Exige coordenação frontend/backend.'],
      }),
      'module-federation': this.build({
        complexity: ['Muito alta', 5, 'Configuração e falhas de runtime são delicadas.'],
        scale: ['Muito alta', 5, 'Excelente para módulos remotos independentes.'],
        teamAutonomy: ['Muito alta', 5, 'Permite publicar remotes separadamente.'],
        testability: ['Alta', 4, 'Testes por remote são claros; integração é o ponto crítico.'],
        performance: ['Média', 3, 'Pode compartilhar deps, mas runtime precisa cuidado.'],
        learningCurve: ['Alta', 4, 'Pede domínio de bundling e contratos remotos.'],
      }),
      'islands-architecture': this.build({
        complexity: ['Média', 3, 'O modelo mental muda, mas reduz JS quando bem aplicado.'],
        scale: ['Alta', 4, 'Boa para sites grandes de conteúdo e e-commerce editorial.'],
        teamAutonomy: ['Média', 3, 'Times podem cuidar de ilhas, mas compartilham página.'],
        testability: ['Média', 3, 'Ilhas são testáveis, integração com SSR precisa atenção.'],
        performance: ['Muito alta', 5, 'Excelente para reduzir hidratação e JavaScript.'],
        learningCurve: ['Média', 3, 'Exige entender SSR, hidratação parcial e limites de estado.'],
      }),
      'feature-sliced-design': this.build({
        complexity: ['Alta', 4, 'Camadas e slices exigem disciplina.'],
        scale: ['Muito alta', 5, 'Escala bem em produtos grandes com muitas áreas.'],
        teamAutonomy: ['Alta', 4, 'Slices favorecem ownership sem exigir deploy separado.'],
        testability: ['Alta', 4, 'APIs públicas de slice ajudam testes e isolamento.'],
        performance: ['Média', 3, 'Depende de code splitting e composição.'],
        learningCurve: ['Alta', 4, 'Vocabulário e regras de dependência têm curva.'],
      }),
    },
    en: {
      'feature-first': this.build({
        complexity: ['Medium', 3, 'Grows well by capability without requiring many layers.'],
        scale: ['High', 4, 'Good for growing products and squads organized by journey.'],
        teamAutonomy: ['Medium', 3, 'Autonomy by feature, but still within the same deployment.'],
        testability: ['Medium', 3, 'Testable when services and state remain isolated by feature.'],
        performance: ['Medium', 3, 'Depends mostly on lazy loading and state choices.'],
        learningCurve: ['Low', 2, 'Easy to explain to Angular/SPA teams.'],
      }),
      layered: this.build({
        complexity: ['Low', 2, 'Simple and direct technical structure.'],
        scale: ['Medium', 3, 'Works until growth makes technical folders too generic.'],
        teamAutonomy: ['Low', 2, 'Teams frequently touch the same layers.'],
        testability: ['Medium', 3, 'Isolated services help, but rules may leak into components.'],
        performance: ['Medium', 3, 'No direct impact; depends on implementation.'],
        learningCurve: ['Low', 1, 'The easiest organization to start with.'],
      }),
      'domain-driven-frontend': this.build({
        complexity: ['High', 4, 'Requires domain modeling and clear boundaries.'],
        scale: ['Very high', 5, 'Scales well when domains are rich and independent.'],
        teamAutonomy: ['High', 4, 'Teams can orient themselves around bounded contexts.'],
        testability: ['Very high', 5, 'Domain rules become easier to test outside the UI.'],
        performance: ['Medium', 3, 'The architecture does not optimize performance by itself.'],
        learningCurve: ['High', 4, 'Requires business vocabulary and DDD experience.'],
      }),
      monorepo: this.build({
        complexity: ['High', 4, 'Tooling, boundaries, and CI require governance.'],
        scale: ['Very high', 5, 'Excellent for many related apps and libraries.'],
        teamAutonomy: ['Medium', 3, 'Autonomy with centralized coordination.'],
        testability: ['High', 4, 'Supports shared tests and affected execution.'],
        performance: ['Medium', 3, 'Helps the build; runtime depends on the apps.'],
        learningCurve: ['Medium', 3, 'Requires understanding workspaces, cache, and boundaries.'],
      }),
      microfrontends: this.build({
        complexity: ['Very high', 5, 'Increases integration, deployment, contracts, and observability work.'],
        scale: ['Very high', 5, 'Good for large organizations with independent domains.'],
        teamAutonomy: ['Very high', 5, 'Each team can operate its own slice.'],
        testability: ['High', 4, 'Allows domain-level tests, but integration becomes critical.'],
        performance: ['Medium', 3, 'Can get worse if bundles and shared dependencies are poorly planned.'],
        learningCurve: ['High', 4, 'Requires technical and operational maturity.'],
      }),
      hexagonal: this.build({
        complexity: ['High', 4, 'Ports and adapters add structure.'],
        scale: ['High', 4, 'Good for rules that must survive external changes.'],
        teamAutonomy: ['Medium', 3, 'Autonomy by domain, but does not solve independent deployment.'],
        testability: ['Very high', 5, 'Use cases and domain logic become highly testable.'],
        performance: ['Medium', 3, 'No direct runtime gain.'],
        learningCurve: ['High', 4, 'Requires understanding dependency inversion in the frontend.'],
      }),
      clean: this.build({
        complexity: ['High', 4, 'Layers and gateways increase ceremony.'],
        scale: ['High', 4, 'Good for long-lived and critical systems.'],
        teamAutonomy: ['Medium', 3, 'Improves internal boundaries, but does not separate operations.'],
        testability: ['Very high', 5, 'Use cases and entities can be tested in isolation.'],
        performance: ['Medium', 3, 'Does not solve performance directly.'],
        learningCurve: ['High', 4, 'Requires discipline to avoid empty layers.'],
      }),
      'cqrs-frontend': this.build({
        complexity: ['High', 4, 'Commands, queries, and read models add concepts.'],
        scale: ['High', 4, 'Useful when read and write flows grow.'],
        teamAutonomy: ['Medium', 3, 'Helps separate responsibilities, not teams.'],
        testability: ['High', 4, 'Commands and queries are good test units.'],
        performance: ['High', 4, 'Read models can reduce transformation in the UI.'],
        learningCurve: ['High', 4, 'Requires care to avoid duplicating models without need.'],
      }),
      'event-driven-frontend': this.build({
        complexity: ['High', 4, 'Events make the flow less linear.'],
        scale: ['High', 4, 'Good for modules that react independently.'],
        teamAutonomy: ['High', 4, 'Event contracts reduce direct coupling.'],
        testability: ['Medium', 3, 'Testable, but needs event observability.'],
        performance: ['Medium', 3, 'Can be efficient, but subscriptions need control.'],
        learningCurve: ['High', 4, 'Debugging and contracts require maturity.'],
      }),
      bff: this.build({
        complexity: ['Medium', 3, 'Adds a dedicated backend, but simplifies the UI.'],
        scale: ['High', 4, 'Good for channels and screens with aggregation.'],
        teamAutonomy: ['Medium', 3, 'Autonomy improves when frontend and BFF ownership are clear.'],
        testability: ['High', 4, 'Screen contracts become easier to validate.'],
        performance: ['High', 4, 'Reduces round trips and heavy assembly in the browser.'],
        learningCurve: ['Medium', 3, 'Requires frontend/backend coordination.'],
      }),
      'module-federation': this.build({
        complexity: ['Very high', 5, 'Configuration and runtime failures are delicate.'],
        scale: ['Very high', 5, 'Excellent for independent remote modules.'],
        teamAutonomy: ['Very high', 5, 'Allows remotes to be published separately.'],
        testability: ['High', 4, 'Remote-level tests are clear; integration is the critical point.'],
        performance: ['Medium', 3, 'Can share dependencies, but runtime needs care.'],
        learningCurve: ['High', 4, 'Requires bundling and remote contract knowledge.'],
      }),
      'islands-architecture': this.build({
        complexity: ['Medium', 3, 'The mental model changes, but reduces JS when applied well.'],
        scale: ['High', 4, 'Good for large content sites and editorial e-commerce.'],
        teamAutonomy: ['Medium', 3, 'Teams can own islands, but share the page.'],
        testability: ['Medium', 3, 'Islands are testable, but SSR integration needs attention.'],
        performance: ['Very high', 5, 'Excellent for reducing hydration and JavaScript.'],
        learningCurve: ['Medium', 3, 'Requires understanding SSR, partial hydration, and state boundaries.'],
      }),
      'feature-sliced-design': this.build({
        complexity: ['High', 4, 'Layers and slices require discipline.'],
        scale: ['Very high', 5, 'Scales well in large products with many areas.'],
        teamAutonomy: ['High', 4, 'Slices favor ownership without requiring separate deployment.'],
        testability: ['High', 4, 'Public slice APIs help testing and isolation.'],
        performance: ['Medium', 3, 'Depends on code splitting and composition.'],
        learningCurve: ['High', 4, 'Vocabulary and dependency rules have a learning curve.'],
      }),
    },
  };

  getFor(architectureId: string): ArchitectureComparison {
    return this.comparisons[this.i18n.language()][architectureId];
  }

  private build(scores: Record<keyof ArchitectureComparison, ScoreInput>): ArchitectureComparison {
    return {
      complexity: score(scores.complexity),
      scale: score(scores.scale),
      teamAutonomy: score(scores.teamAutonomy),
      testability: score(scores.testability),
      performance: score(scores.performance),
      learningCurve: score(scores.learningCurve),
    };
  }
}
