# Frontend Architecture Explorer

Projeto educativo em Angular para explorar, comparar e entender diferentes arquiteturas de frontend por meio de conteúdo navegável, mini-IDE interativa e simulador de recomendação.

## O Que Tem Aqui

- Guia navegável de arquiteturas frontend.
- Página real de detalhe por arquitetura.
- Mini-IDE com árvore de arquivos, busca, abas, caminho completo e copiar código.
- Comparador lado a lado por critérios como complexidade, escala, autonomia de times, testabilidade, performance e curva de aprendizado.
- Simulador que recomenda uma arquitetura com base nas respostas do usuário.
- Internacionalização PT/EN com toggle de idioma.
- Ícones com `@ng-icons/flag-icons` e `@ng-icons/fluent-ui`.
- Testes unitários cobrindo serviços e componentes principais.

## Arquiteturas Disponíveis

- Feature First
- Layered
- Domain Driven Frontend
- Monorepo
- Microfrontends
- Hexagonal
- Clean
- CQRS no Frontend
- Event-Driven Frontend
- BFF
- Module Federation
- Islands Architecture
- Feature Sliced Design

## Estrutura Do Projeto

```txt
src/
├── app/
├── core/
│   ├── i18n/
│   ├── models/
│   └── services/
├── shared/
│   └── components/
│       └── mini-ide/
├── features/
│   ├── advisor/
│   ├── architecture-detail/
│   ├── architecture-detail-page/
│   ├── architecture-guidance/
│   ├── architecture-home/
│   ├── architecture-list/
│   └── comparison/
└── assets/
    └── architectures/
```

## Principais Features

### Mini-IDE

A mini-IDE simula uma navegação por estrutura de arquivos. Ela permite abrir pastas, selecionar arquivos, pesquisar por nome/caminho, manter abas abertas, copiar código e visualizar o caminho completo do arquivo selecionado.

### Simulador

O simulador faz perguntas sobre estágio do produto, divisão de times, regras de negócio, integração, entrega, experiência do usuário e estado da interface. Ao final, recomenda a arquitetura mais adequada e mostra alternativas próximas.

### Comparador

O comparador permite selecionar até 3 arquiteturas e avaliar lado a lado:

- complexidade;
- escala;
- autonomia de times;
- testabilidade;
- performance;
- curva de aprendizado.

### Internacionalização

A aplicação possui suporte a português e inglês por meio de uma camada própria de i18n:

```txt
src/core/i18n/
├── architecture-translations.ts
├── i18n-translations.ts
├── i18n.service.ts
├── language-toggle.*
└── translate.pipe.ts
```

## Rodando Localmente

Instale as dependências:

```bash
npm install
```

Suba o servidor de desenvolvimento:

```bash
npm start
```

A aplicação abre em:

```txt
http://localhost:4200
```

## Scripts

```bash
npm start
```

Inicia o servidor local com hot reload.

```bash
npm run build
```

Gera o build de produção em `dist/`.

```bash
npm test -- --watch=false
```

Executa a suíte unitária uma vez.

## Testes

A suíte cobre:

- `I18nService`;
- `ArchitectureCatalogService`;
- `ArchitectureComparisonService`;
- `ArchitectureList`;
- `ArchitectureDetail`;
- `MiniIde`;
- `AdvisorPage`;
- `ComparisonPage`;
- `App`.

## Observação De Build

Atualmente o build passa, mas pode exibir um aviso de budget no SCSS da mini-IDE:

```txt
src/shared/components/mini-ide/mini-ide.scss exceeded maximum budget
```

Esse aviso não impede a aplicação de compilar. Ele indica apenas que o arquivo de estilos da mini-IDE está acima do limite configurado no Angular.

## Feito Por

Veronica Ciolfi
