export type AdvisorOption = {
  label: string;
  description: string;
  bestFor: string;
  avoidIf: string;
  scores: Record<string, number>;
};

export type AdvisorQuestion = {
  id: string;
  title: string;
  options: AdvisorOption[];
};

export const ADVISOR_QUESTIONS: AdvisorQuestion[] = [
  {
    id: 'scale',
    title: 'Qual é o momento do produto?',
    options: [
      {
        label: 'MVP validando mercado',
        description: 'A prioridade é entregar rápido, aprender e mudar sem cerimônia.',
        bestFor: 'Times pequenos, backlog instável e poucas regras de domínio.',
        avoidIf: 'Já existem muitos domínios ou integrações críticas.',
        scores: { layered: 5, 'feature-first': 3 },
      },
      {
        label: 'Produto ganhando escala',
        description: 'Novas jornadas surgem, o time cresce e o código precisa de limites.',
        bestFor: 'Produtos que saíram do MVP e precisam organizar crescimento.',
        avoidIf: 'Cada time já precisa publicar sua parte de forma independente.',
        scores: { 'feature-first': 5, 'feature-sliced-design': 4, monorepo: 2 },
      },
      {
        label: 'Produto crítico e longevo',
        description: 'O frontend contém regras importantes e terá muitos anos de evolução.',
        bestFor: 'Sistemas com risco, auditoria, regras complexas ou alto custo de erro.',
        avoidIf: 'A interface apenas consome CRUD simples.',
        scores: { 'domain-driven-frontend': 5, clean: 5, hexagonal: 4 },
      },
    ],
  },
  {
    id: 'teams',
    title: 'Como o trabalho é dividido entre times?',
    options: [
      {
        label: 'Um time dono do app',
        description: 'Poucas pessoas mantêm o frontend e combinam releases juntas.',
        bestFor: 'Simplicidade, decisões rápidas e baixo custo operacional.',
        avoidIf: 'Existem vários produtos ou domínios compartilhando código.',
        scores: { layered: 3, 'feature-first': 4 },
      },
      {
        label: 'Vários apps relacionados',
        description: 'Portal, admin, docs, design system e libs evoluem juntos.',
        bestFor: 'Organizações que precisam reaproveitar UI, tipos e ferramentas.',
        avoidIf: 'Os times precisam deployar partes totalmente isoladas.',
        scores: { monorepo: 5, 'feature-sliced-design': 3 },
      },
      {
        label: 'Times autônomos por domínio',
        description: 'Cada time quer publicar, operar e versionar sua parte.',
        bestFor: 'Organizações grandes com ownership bem definido.',
        avoidIf: 'Ainda não há maturidade de contratos, observabilidade e CI/CD.',
        scores: { microfrontends: 5, 'module-federation': 5, 'event-driven-frontend': 3 },
      },
    ],
  },
  {
    id: 'domain',
    title: 'Onde ficam as regras de negócio?',
    options: [
      {
        label: 'Quase tudo no backend',
        description: 'O frontend exibe dados, valida campos simples e envia ações.',
        bestFor: 'CRUDs, painéis internos e interfaces com pouca regra local.',
        avoidIf: 'Há estados ricos, políticas ou cálculos importantes no browser.',
        scores: { layered: 4, bff: 3 },
      },
      {
        label: 'Regras divididas',
        description: 'Parte está no backend, mas a UI orquestra fluxos e decisões.',
        bestFor: 'Jornadas com estado, permissões de tela e ações de produto.',
        avoidIf: 'As regras precisam ser modeladas com linguagem de domínio forte.',
        scores: { 'feature-first': 4, 'feature-sliced-design': 4, 'cqrs-frontend': 3 },
      },
      {
        label: 'Frontend tem domínio rico',
        description: 'A interface representa políticas, casos de uso e linguagem do negócio.',
        bestFor: 'Produtos financeiros, healthtech, logística, cobrança e compliance.',
        avoidIf: 'O time ainda não domina o problema de negócio.',
        scores: { 'domain-driven-frontend': 5, clean: 5, hexagonal: 5 },
      },
    ],
  },
  {
    id: 'integration',
    title: 'Como os dados chegam à tela?',
    options: [
      {
        label: 'Uma API principal',
        description: 'Contratos simples, pouca agregação e baixa transformação.',
        bestFor: 'Apps com backend dedicado e payloads próximos da UI.',
        avoidIf: 'A tela precisa compor muitas fontes de dados.',
        scores: { layered: 3, 'feature-first': 3 },
      },
      {
        label: 'Várias fontes agregadas',
        description: 'A mesma tela precisa dados de serviços diferentes.',
        bestFor: 'Dashboards, home pages e jornadas que combinam domínios.',
        avoidIf: 'Você não pode manter uma camada backend dedicada ao frontend.',
        scores: { bff: 5, 'cqrs-frontend': 3 },
      },
      {
        label: 'Eventos, realtime ou colaboração',
        description: 'A UI reage a ações, notificações, sockets ou eventos assíncronos.',
        bestFor: 'Produtos colaborativos, notificações, analytics e atualização em tempo real.',
        avoidIf: 'O fluxo é linear e fácil de seguir com chamadas diretas.',
        scores: { 'event-driven-frontend': 5, 'cqrs-frontend': 4 },
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Como você precisa entregar mudanças?',
    options: [
      {
        label: 'Deploy único e previsível',
        description: 'Todos combinam release e preferem uma operação simples.',
        bestFor: 'Times centralizados e produtos sem necessidade de independência operacional.',
        avoidIf: 'Domínios precisam evoluir em calendários diferentes.',
        scores: { layered: 3, 'feature-first': 4, clean: 2 },
      },
      {
        label: 'Mudanças coordenadas entre apps',
        description: 'Refatorações devem atravessar apps e libs com segurança.',
        bestFor: 'Monorepos, design systems e pacotes compartilhados.',
        avoidIf: 'Cada app pertence a uma organização ou pipeline independente.',
        scores: { monorepo: 5, 'feature-sliced-design': 3 },
      },
      {
        label: 'Deploy independente por domínio',
        description: 'Cada time precisa publicar sua parte sem esperar o shell inteiro.',
        bestFor: 'Ambientes com governança forte de contratos e observabilidade.',
        avoidIf: 'O custo de runtime e integração ainda não cabe no time.',
        scores: { microfrontends: 5, 'module-federation': 5 },
      },
    ],
  },
  {
    id: 'experience',
    title: 'Qual tipo de experiência o usuário consome?',
    options: [
      {
        label: 'Aplicação operacional',
        description: 'Usuários trabalham em fluxos repetidos, tabelas e formulários.',
        bestFor: 'SaaS, CRM, backoffice e painéis administrativos.',
        avoidIf: 'SEO e conteúdo estático são prioridade maior que interatividade.',
        scores: { layered: 2, 'feature-first': 4, 'feature-sliced-design': 3 },
      },
      {
        label: 'Conteúdo com poucas ilhas interativas',
        description: 'A maioria da página é estática, mas alguns blocos precisam JS.',
        bestFor: 'E-commerce editorial, sites de conteúdo e páginas SEO-driven.',
        avoidIf: 'O produto é uma aplicação interativa de ponta a ponta.',
        scores: { 'islands-architecture': 6, bff: 2 },
      },
      {
        label: 'Experiência composta',
        description: 'A tela mistura módulos de domínios diferentes no mesmo shell.',
        bestFor: 'Portais, marketplaces e plataformas com áreas independentes.',
        avoidIf: 'Não há contratos maduros entre times.',
        scores: { microfrontends: 4, 'module-federation': 4, 'event-driven-frontend': 3 },
      },
    ],
  },
  {
    id: 'state',
    title: 'Como é o estado da interface?',
    options: [
      {
        label: 'Estado local simples',
        description: 'Filtros, formulários e seleção de itens resolvem a maior parte.',
        bestFor: 'Interfaces CRUD e fluxos curtos.',
        avoidIf: 'Você precisa rastrear intenções e consistência eventual.',
        scores: { layered: 3, 'feature-first': 3 },
      },
      {
        label: 'Estado por jornada',
        description: 'Cada feature mantém estado próprio e coordena ações de tela.',
        bestFor: 'Checkout, onboarding, configuração e fluxos multi-etapa.',
        avoidIf: 'O estado cruza muitos domínios independentes.',
        scores: { 'feature-first': 4, 'feature-sliced-design': 4, hexagonal: 2 },
      },
      {
        label: 'Comandos, eventos e consistência eventual',
        description: 'A UI precisa refletir ações assíncronas e modelos de leitura.',
        bestFor: 'Pedidos, pagamentos, colaboração e integrações assíncronas.',
        avoidIf: 'Tudo acontece de forma síncrona e linear.',
        scores: { 'cqrs-frontend': 5, 'event-driven-frontend': 5 },
      },
    ],
  },
];

export const ADVISOR_QUESTIONS_EN: AdvisorQuestion[] = [
  {
    id: 'scale',
    title: 'What stage is the product in?',
    options: [
      {
        label: 'MVP validating the market',
        description: 'The priority is to ship fast, learn, and change with little ceremony.',
        bestFor: 'Small teams, unstable backlog, and few domain rules.',
        avoidIf: 'There are already many domains or critical integrations.',
        scores: { layered: 5, 'feature-first': 3 },
      },
      {
        label: 'Product gaining scale',
        description: 'New journeys appear, the team grows, and the code needs boundaries.',
        bestFor: 'Products that moved beyond MVP and need organized growth.',
        avoidIf: 'Each team already needs to publish its part independently.',
        scores: { 'feature-first': 5, 'feature-sliced-design': 4, monorepo: 2 },
      },
      {
        label: 'Critical long-lived product',
        description: 'The frontend contains important rules and will evolve for years.',
        bestFor: 'Systems with risk, audit, complex rules, or high cost of error.',
        avoidIf: 'The interface only consumes simple CRUD flows.',
        scores: { 'domain-driven-frontend': 5, clean: 5, hexagonal: 4 },
      },
    ],
  },
  {
    id: 'teams',
    title: 'How is work split across teams?',
    options: [
      {
        label: 'One team owns the app',
        description: 'A few people maintain the frontend and coordinate releases together.',
        bestFor: 'Simplicity, fast decisions, and low operational cost.',
        avoidIf: 'There are multiple products or domains sharing code.',
        scores: { layered: 3, 'feature-first': 4 },
      },
      {
        label: 'Several related apps',
        description: 'Portal, admin, docs, design system, and libraries evolve together.',
        bestFor: 'Organizations that need to reuse UI, types, and tooling.',
        avoidIf: 'Teams need to deploy fully isolated parts.',
        scores: { monorepo: 5, 'feature-sliced-design': 3 },
      },
      {
        label: 'Autonomous domain teams',
        description: 'Each team wants to publish, operate, and version its own area.',
        bestFor: 'Large organizations with well-defined ownership.',
        avoidIf: 'Contracts, observability, and CI/CD are not mature yet.',
        scores: { microfrontends: 5, 'module-federation': 5, 'event-driven-frontend': 3 },
      },
    ],
  },
  {
    id: 'domain',
    title: 'Where do business rules live?',
    options: [
      {
        label: 'Mostly in the backend',
        description: 'The frontend displays data, validates simple fields, and sends actions.',
        bestFor: 'CRUD apps, internal panels, and interfaces with little local logic.',
        avoidIf: 'There are rich states, policies, or important calculations in the browser.',
        scores: { layered: 4, bff: 3 },
      },
      {
        label: 'Rules are shared',
        description: 'Some rules live in the backend, but the UI orchestrates flows and decisions.',
        bestFor: 'Journeys with state, screen permissions, and product actions.',
        avoidIf: 'Rules need to be modeled with strong domain language.',
        scores: { 'feature-first': 4, 'feature-sliced-design': 4, 'cqrs-frontend': 3 },
      },
      {
        label: 'Frontend has rich domain logic',
        description: 'The interface represents policies, use cases, and business language.',
        bestFor: 'Financial products, healthtech, logistics, billing, and compliance.',
        avoidIf: 'The team does not understand the business problem yet.',
        scores: { 'domain-driven-frontend': 5, clean: 5, hexagonal: 5 },
      },
    ],
  },
  {
    id: 'integration',
    title: 'How does data reach the screen?',
    options: [
      {
        label: 'One main API',
        description: 'Simple contracts, little aggregation, and low transformation.',
        bestFor: 'Apps with a dedicated backend and payloads close to the UI.',
        avoidIf: 'The screen needs to compose many data sources.',
        scores: { layered: 3, 'feature-first': 3 },
      },
      {
        label: 'Several aggregated sources',
        description: 'The same screen needs data from different services.',
        bestFor: 'Dashboards, home pages, and journeys that combine domains.',
        avoidIf: 'You cannot maintain a backend layer dedicated to the frontend.',
        scores: { bff: 5, 'cqrs-frontend': 3 },
      },
      {
        label: 'Events, realtime, or collaboration',
        description: 'The UI reacts to actions, notifications, sockets, or async events.',
        bestFor: 'Collaborative products, notifications, analytics, and realtime updates.',
        avoidIf: 'The flow is linear and easy to follow with direct calls.',
        scores: { 'event-driven-frontend': 5, 'cqrs-frontend': 4 },
      },
    ],
  },
  {
    id: 'delivery',
    title: 'How do you need to ship changes?',
    options: [
      {
        label: 'Single predictable deploy',
        description: 'Everyone coordinates releases and prefers simple operations.',
        bestFor: 'Centralized teams and products without operational independence needs.',
        avoidIf: 'Domains need to evolve on different calendars.',
        scores: { layered: 3, 'feature-first': 4, clean: 2 },
      },
      {
        label: 'Coordinated changes across apps',
        description: 'Refactors need to move through apps and libraries safely.',
        bestFor: 'Monorepos, design systems, and shared packages.',
        avoidIf: 'Each app belongs to a separate organization or pipeline.',
        scores: { monorepo: 5, 'feature-sliced-design': 3 },
      },
      {
        label: 'Independent deploy by domain',
        description: 'Each team must publish its part without waiting for the whole shell.',
        bestFor: 'Environments with strong contract governance and observability.',
        avoidIf: 'Runtime and integration costs do not fit the team yet.',
        scores: { microfrontends: 5, 'module-federation': 5 },
      },
    ],
  },
  {
    id: 'experience',
    title: 'What kind of experience does the user consume?',
    options: [
      {
        label: 'Operational application',
        description: 'Users work through repeated flows, tables, and forms.',
        bestFor: 'SaaS, CRM, backoffice, and administrative dashboards.',
        avoidIf: 'SEO and static content matter more than interactivity.',
        scores: { layered: 2, 'feature-first': 4, 'feature-sliced-design': 3 },
      },
      {
        label: 'Content with a few interactive islands',
        description: 'Most of the page is static, but some blocks need JavaScript.',
        bestFor: 'Editorial e-commerce, content sites, and SEO-driven pages.',
        avoidIf: 'The product is interactive from end to end.',
        scores: { 'islands-architecture': 6, bff: 2 },
      },
      {
        label: 'Composed experience',
        description: 'The screen mixes modules from different domains in the same shell.',
        bestFor: 'Portals, marketplaces, and platforms with independent areas.',
        avoidIf: 'Contracts between teams are not mature.',
        scores: { microfrontends: 4, 'module-federation': 4, 'event-driven-frontend': 3 },
      },
    ],
  },
  {
    id: 'state',
    title: 'What is the UI state like?',
    options: [
      {
        label: 'Simple local state',
        description: 'Filters, forms, and item selection solve most needs.',
        bestFor: 'CRUD interfaces and short flows.',
        avoidIf: 'You need to track intent and eventual consistency.',
        scores: { layered: 3, 'feature-first': 3 },
      },
      {
        label: 'Journey-scoped state',
        description: 'Each feature keeps its own state and coordinates screen actions.',
        bestFor: 'Checkout, onboarding, configuration, and multi-step flows.',
        avoidIf: 'State crosses many independent domains.',
        scores: { 'feature-first': 4, 'feature-sliced-design': 4, hexagonal: 2 },
      },
      {
        label: 'Commands, events, and eventual consistency',
        description: 'The UI must reflect async actions and read models.',
        bestFor: 'Orders, payments, collaboration, and async integrations.',
        avoidIf: 'Everything happens synchronously and linearly.',
        scores: { 'cqrs-frontend': 5, 'event-driven-frontend': 5 },
      },
    ],
  },
];
