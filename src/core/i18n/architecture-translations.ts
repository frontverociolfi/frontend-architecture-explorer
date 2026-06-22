import { Architecture } from '../models/architecture.model';
import { Language } from './i18n-translations';

type ArchitectureCopy = Pick<
  Architecture,
  | 'name'
  | 'shortDescription'
  | 'explanation'
  | 'pros'
  | 'cons'
  | 'whenToUse'
  | 'realExample'
  | 'exampleScenario'
  | 'implementationHighlights'
  | 'commonPitfall'
>;

export const architectureTranslations: Partial<Record<Language, Record<string, ArchitectureCopy>>> = {
  en: {
    bff: {
      name: 'BFF',
      shortDescription: 'Uses a backend specifically shaped for the frontend experience.',
      explanation:
        'Backend for Frontend organizes frontend integration around endpoints designed for a specific interface. In the client code, there is usually a clear data-access layer that talks to the BFF.',
      pros: [
        'Reduces complex data assembly in the browser.',
        'Delivers contracts closer to the screen needs.',
        'Helps when multiple channels need different API shapes.',
      ],
      cons: [
        'Adds a backend layer to maintain.',
        'Can hide domain problems if it becomes only an improvised aggregator.',
        'Requires strong alignment between frontend and BFF teams.',
      ],
      whenToUse: [
        'Experiences that aggregate data from multiple services.',
        'Products with web, mobile, and partner channels consuming different formats.',
        'Screens that need stable contracts oriented to the UI.',
      ],
      realExample:
        'An executive dashboard that combines revenue metrics, tickets, users, and alerts into a single payload.',
      exampleScenario:
        'The home screen calls `/bff/dashboard`, which already returns cards, charts, and alerts ready to render, without the browser aggregating five APIs.',
      implementationHighlights: [
        'Design endpoints around the screen experience.',
        'Keep a BFF-specific data-access layer in the frontend.',
        'Version contracts between frontend and BFF as the screen evolves.',
      ],
      commonPitfall:
        'Turning the BFF into a generic backend shared by every channel weakens the purpose of the approach.',
    },
    clean: {
      name: 'Clean',
      shortDescription: 'Organizes dependencies so they point toward central rules.',
      explanation:
        'Clean Architecture on the frontend separates entities, use cases, gateways, and interface. Outer layers know inner layers, but the domain does not depend on frameworks, APIs, or visual components.',
      pros: [
        'Makes dependencies more explicit.',
        'Reduces coupling between UI and rules.',
        'Supports testing and long-term evolution.',
      ],
      cons: [
        'Can add too much ceremony to simple screens.',
        'Needs clear criteria for separating layers.',
        'Communication between layers can become verbose.',
      ],
      whenToUse: [
        'Long-lived frontend systems.',
        'Products with complex or auditable use cases.',
        'Teams that value rule isolation and testability.',
      ],
      realExample:
        'A financial panel where calculations, permissions, and flows need to be tested outside the interface.',
      exampleScenario:
        'The payment screen calls the `PayInvoice` use case, which validates rules and talks to a gateway without knowing Angular or endpoint details.',
      implementationHighlights: [
        'Place business rules in entities and use cases.',
        'Define interfaces for gateways consumed by use cases.',
        'Let components only orchestrate user input and screen state.',
      ],
      commonPitfall:
        'Duplicating layers without real rules makes the application look sophisticated but slower to change.',
    },
    'cqrs-frontend': {
      name: 'CQRS on the Frontend',
      shortDescription: 'Separates read and write flows in the UI.',
      explanation:
        'CQRS on the frontend distinguishes commands that change state from queries that assemble screens. The UI gets optimized read models and explicit commands for user actions.',
      pros: [
        'Clarifies actions that change state versus query screens.',
        'Allows simpler read models for the UI.',
        'Helps handle async flows and eventual consistency.',
      ],
      cons: [
        'Can duplicate models and increase maintenance.',
        'Requires care to avoid turning everything into command/query without need.',
        'Fits better when the backend or domain already follows a similar separation.',
      ],
      whenToUse: [
        'Interfaces with many business actions.',
        'Dashboards with aggregated reads and critical commands.',
        'Products that need to track user intent.',
      ],
      realExample:
        'An orders screen with optimized queries for visualization and commands to cancel, pay, or resend.',
      exampleScenario:
        'The page loads `OrderSummaryQuery` to display aggregated data and uses `CancelOrderCommand` when the user confirms cancellation.',
      implementationHighlights: [
        'Create queries for read models optimized for screens.',
        'Create commands for actions that change state or trigger flows.',
        'Model command feedback: loading, success, failure, and read refresh.',
      ],
      commonPitfall:
        'Separating reads and writes in simple screens can duplicate code without solving a real problem.',
    },
    'domain-driven-frontend': {
      name: 'Domain Driven Frontend',
      shortDescription: 'Models the frontend from business domains.',
      explanation:
        'Inspired by DDD, this approach organizes code by domains and contexts. Each domain preserves its language, rules, use cases, and integrations with the interface.',
      pros: [
        'Keeps the code close to business language.',
        'Helps handle complex rules and product evolution.',
        'Creates clear boundaries between different contexts.',
      ],
      cons: [
        'Can be excessive for simple systems.',
        'Requires good domain understanding and alignment with backend/product.',
        'Has a higher learning curve.',
      ],
      whenToUse: [
        'Products with rich or sensitive business rules.',
        'Systems that need to evolve by independent domains.',
        'Teams already discussing bounded contexts, entities, and use cases.',
      ],
      realExample:
        'A financial platform with account, billing, subscription, risk, and compliance domains.',
      exampleScenario:
        'The `billing` domain concentrates terms such as invoice, due date, delinquency, and payment, while `subscription` owns plan, cycle, and renewal.',
      implementationHighlights: [
        'Map business contexts before creating folders.',
        'Use domain names in files, not only technical names.',
        'Avoid direct dependencies between domains; create explicit contracts when needed.',
      ],
      commonPitfall:
        'Applying DDD only as folder names, without modeling business rules and language, creates complexity without benefit.',
    },
    'event-driven-frontend': {
      name: 'Event-Driven Frontend',
      shortDescription: 'Coordinates modules through domain or UI events.',
      explanation:
        'In this approach, parts of the frontend react to events published by other parts. It reduces direct coupling between modules, but requires clear contracts and event observability.',
      pros: [
        'Reduces direct dependency between modules.',
        'Makes cross-cutting reactions such as analytics, notifications, and synchronization easier.',
        'Fits well with realtime applications.',
      ],
      cons: [
        'Flows can become hard to follow if events are too generic.',
        'Requires consistent naming, contracts, and logs.',
        'Debugging can be more complex than direct calls.',
      ],
      whenToUse: [
        'Products with many indirect reactions to user actions.',
        'Collaborative or realtime applications.',
        'Microfrontends or independent modules that need to communicate.',
      ],
      realExample:
        'A collaboration platform where comments, online presence, and notifications react to shared events.',
      exampleScenario:
        'When the user adds an item to the cart, recommendation, analytics, and header counter modules react to the `cart.item-added` event.',
      implementationHighlights: [
        'Define events with specific names and typed payloads.',
        'Use an event bus or observable streams to publish and listen to events.',
        'Record logs or tracing to understand who published and who reacted.',
      ],
      commonPitfall:
        'Generic events such as `updated` or `changed` make the flow invisible and hard to debug.',
    },
    'feature-first': {
      name: 'Feature First',
      shortDescription: 'Organizes code by business capabilities.',
      explanation:
        'Each feature keeps its components, pages, services, state, and models together. The goal is to reduce jumping between technical folders and make it clear where a capability lives.',
      pros: [
        'Good navigation for product-oriented teams.',
        'Makes it easier to remove, migrate, or refactor an entire feature.',
        'Reduces coupling between application areas.',
      ],
      cons: [
        'Can create duplication if shared patterns are not well defined.',
        'Requires discipline to avoid cross-feature dependencies.',
      ],
      whenToUse: [
        'Applications with many independent journeys.',
        'Teams working by squads or product domains.',
        'Projects that need to grow without becoming one large technical folder.',
      ],
      realExample:
        'An e-commerce app with features such as authentication, catalog, cart, checkout, and orders.',
      exampleScenario:
        'When creating the orders feature, the team adds pages, components, services, and state inside `features/orders`, making it clear that everything there belongs to the orders journey.',
      implementationHighlights: [
        'Create one folder per business capability, such as `auth`, `catalog`, `checkout`, and `orders`.',
        'Keep feature-specific components, pages, routes, services, and models inside the feature.',
        'Use `shared` only for elements truly reused by several features and `core` for global infrastructure.',
      ],
      commonPitfall:
        'Moving everything to `shared` too early recreates global coupling and weakens feature isolation.',
    },
    'feature-sliced-design': {
      name: 'Feature Sliced Design',
      shortDescription: 'Splits the frontend into layers and product slices.',
      explanation:
        'Feature Sliced Design organizes code into layers such as app, pages, widgets, features, entities, and shared. Each slice represents a product area with well-defined dependency rules.',
      pros: [
        'Defines clear dependency rules between layers.',
        'Scales well in products with many features.',
        'Helps standardize organization without trapping everything in technical layers.',
      ],
      cons: [
        'Has its own vocabulary and learning curve.',
        'Can feel rigid for small projects.',
        'Requires discipline to respect dependency direction.',
      ],
      whenToUse: [
        'Large products with many UI areas.',
        'Teams that want a strong convention for slices and layers.',
        'Frontends where pure feature-first started becoming inconsistent.',
      ],
      realExample:
        'A marketplace with pages, storefront widgets, cart features, and product, seller, and order entities.',
      exampleScenario:
        'The product page lives in `pages/product`, the recommendations block in `widgets/recommendations`, the add-to-cart action in `features/add-to-cart`, and the product model in `entities/product`.',
      implementationHighlights: [
        'Use layers such as `app`, `pages`, `widgets`, `features`, `entities`, and `shared`.',
        'Organize each layer into slices with a clear public API.',
        'Respect dependency direction: upper layers can depend on lower layers, not the opposite.',
      ],
      commonPitfall:
        'Importing internal slice files breaks encapsulation and turns the convention into just folder names.',
    },
    hexagonal: {
      name: 'Hexagonal',
      shortDescription: 'Separates domain, ports, and adapters in the frontend too.',
      explanation:
        'Hexagonal architecture on the frontend puts rules and use cases at the center, while components, HTTP, storage, and external libraries live as adapters. The interface consumes ports, not concrete implementations.',
      pros: [
        'Protects business rules from UI and infrastructure details.',
        'Makes it easier to test use cases without Angular, DOM, or HTTP.',
        'Helps when the frontend has rich logic and varied integrations.',
      ],
      cons: [
        'Creates more files and concepts than a simple CRUD needs.',
        'Requires discipline so components do not jump directly to adapters.',
        'Can feel too abstract for beginner teams.',
      ],
      whenToUse: [
        'Frontends with important business rules.',
        'Applications that need to switch data sources or integrations.',
        'Products where domain tests bring real value.',
      ],
      realExample:
        'A checkout with local cart, coupon, stock, and multiple payment adapter rules.',
      exampleScenario:
        'The coupon application rule lives in the domain, while the HTTP adapter only translates calls to the promotions API.',
      implementationHighlights: [
        'Model ports for operations the domain needs to execute.',
        'Implement adapters for HTTP, storage, analytics, or external SDKs.',
        'Make components depend on use cases, not directly on infrastructure clients.',
      ],
      commonPitfall:
        'Creating ports for every tiny detail makes the architecture bureaucratic and hard to navigate.',
    },
    'islands-architecture': {
      name: 'Islands Architecture',
      shortDescription: 'Hydrates only the interactive parts of a page.',
      explanation:
        'Islands Architecture renders most of the page as static or server-rendered HTML and activates JavaScript only in interactive islands. It is widely used in content sites and performance-critical experiences.',
      pros: [
        'Reduces JavaScript sent to the user.',
        'Improves perceived performance on content-heavy pages.',
        'Keeps interactivity only where it makes sense.',
      ],
      cons: [
        'Not ideal for highly interactive end-to-end applications.',
        'Requires a compatible framework or strategy.',
        'Sharing state between islands can become delicate.',
      ],
      whenToUse: [
        'Content sites, editorial e-commerce, and rich landing pages.',
        'Pages where SEO and performance are priorities.',
        'Experiences with only a few truly interactive points.',
      ],
      realExample:
        'A product page with static content, an interactive gallery, and a purchase button hydrated separately.',
      exampleScenario:
        'Description, price, and SEO arrive as HTML, while gallery, variation selector, and buy button are hydrated on demand.',
      implementationHighlights: [
        'Identify which parts of the page truly need JavaScript.',
        'Render static content on the server or at build time.',
        'Hydrate islands by visibility, interaction, or journey priority.',
      ],
      commonPitfall:
        'Using islands in a fully transactional application can complicate shared state without proportional performance gains.',
    },
    layered: {
      name: 'Layered',
      shortDescription: 'Separates responsibilities into technical layers.',
      explanation:
        'The application is divided by responsibility type: presentation, services, models, state, and infrastructure. It is a familiar and direct architecture for smaller projects or teams still forming.',
      pros: [
        'Very simple to understand at the start of the project.',
        'Works well for small and medium applications.',
        'Helps teams learning to separate responsibilities.',
      ],
      cons: [
        'Folders can become large and generic as the app grows.',
        'A feature change often requires edits across several layers.',
        'Can hide the real business boundaries.',
      ],
      whenToUse: [
        'Small projects, prototypes, and MVPs.',
        'CRUD applications with few business rules.',
        'Teams that need a predictable and simple structure.',
      ],
      realExample:
        'An internal admin panel with pages, reusable components, and HTTP services.',
      exampleScenario:
        'A customers screen uses `pages/customers.page.ts`, generic table components in `components`, and centralized HTTP calls in `services/customer.service.ts`.',
      implementationHighlights: [
        'Separate folders by technical type: `pages`, `components`, `services`, `models`, and `store`.',
        'Keep visual components free of complex business rules.',
        'Centralize external integrations in services to avoid HTTP calls spread across the UI.',
      ],
      commonPitfall:
        'As the app grows, folders such as `components` and `services` can become huge buckets without business context.',
    },
    microfrontends: {
      name: 'Microfrontends',
      shortDescription: 'Splits the interface into independent applications.',
      explanation:
        'Microfrontends allow parts of the experience to be developed, published, and operated by different teams. Usually, a shell composes remote apps.',
      pros: [
        'Teams can deliver parts of the product independently.',
        'Helps large organizations with well-separated domains.',
        'Allows gradual technology evolution in some scenarios.',
      ],
      cons: [
        'Increases deployment, observability, and integration complexity.',
        'Can hurt performance if composition is not careful.',
        'Requires strong contracts for navigation, state, authentication, and design.',
      ],
      whenToUse: [
        'Large products maintained by multiple autonomous teams.',
        'Domains with different release cycles.',
        'Scenarios where operational independence is worth more than simplicity.',
      ],
      realExample:
        'A marketplace where separate teams own search, account, orders, payments, and support.',
      exampleScenario:
        'The shell controls navigation, authentication, and base layout, while the `catalog`, `checkout`, and `account` remotes are published by different teams.',
      implementationHighlights: [
        'Define a lightweight shell responsible for composition, global routes, and shared contracts.',
        'Publish each microfrontend with its own pipeline and versioning.',
        'Standardize authentication, design system, telemetry, and communication between remotes.',
      ],
      commonPitfall:
        'Splitting too early creates high operational cost without real autonomy between teams.',
    },
    'module-federation': {
      name: 'Module Federation',
      shortDescription: 'Loads remote modules at runtime.',
      explanation:
        'Module Federation allows applications to be composed from remote bundles. It is a common technique for microfrontends, especially when each team publishes independent parts of the interface.',
      pros: [
        'Enables independent deployment of application parts.',
        'Shares dependencies at runtime when configured well.',
        'Helps large teams split responsibilities.',
      ],
      cons: [
        'Runtime configuration and debugging are more complex.',
        'Broken contracts may fail only during integration.',
        'Shared dependency versioning requires care.',
      ],
      whenToUse: [
        'Microfrontends with independent teams and releases.',
        'Products that need to compose remote modules.',
        'Scenarios where operational independence justifies complexity.',
      ],
      realExample:
        'A corporate portal whose shell loads remote modules from HR, finance, procurement, and support.',
      exampleScenario:
        'The shell resolves the `/checkout` route and downloads the `checkout` remote at runtime, allowing the checkout team to publish without rebuilding the shell.',
      implementationHighlights: [
        'Configure remotes and exposes with explicit contracts.',
        'Share critical dependencies such as Angular as singletons when it makes sense.',
        'Create fallbacks for remote loading failures and monitor runtime errors.',
      ],
      commonPitfall:
        'Ignoring version compatibility between shell and remotes can cause failures that are hard to reproduce.',
    },
    monorepo: {
      name: 'Monorepo',
      shortDescription: 'Groups several applications and libraries in the same repository.',
      explanation:
        'A monorepo centralizes apps, shared packages, and tooling. It supports consistency, reuse, and coordinated changes across related products.',
      pros: [
        'Makes it easier to share design system, types, and utilities.',
        'Enables coordinated refactors across apps.',
        'Standardizes lint, build, tests, and versioning.',
      ],
      cons: [
        'Builds and permissions can become complex without good tooling.',
        'Global changes affect many teams.',
        'Requires governance to avoid excessive coupling.',
      ],
      whenToUse: [
        'Organizations with multiple related frontends.',
        'Products that share UI, authentication, models, or SDKs.',
        'Teams using tools such as Nx, Turborepo, or workspaces.',
      ],
      realExample:
        'A SaaS company with a customer portal, internal admin, documentation, and component package.',
      exampleScenario:
        'The `admin` app and the `storefront` app consume `libs/ui` for buttons and tables, and `libs/data-access` for shared HTTP clients.',
      implementationHighlights: [
        'Separate applications in `apps` and reusable libraries in `libs` or `packages`.',
        'Define dependency rules between libs to avoid circular imports.',
        'Use build cache and affected execution with tools such as Nx, Turborepo, or workspaces.',
      ],
      commonPitfall:
        'Sharing too much code can turn the monorepo into one coupled application with several different names.',
    },
  },
};
