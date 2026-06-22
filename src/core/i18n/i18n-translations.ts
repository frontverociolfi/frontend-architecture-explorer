export type Language = 'pt' | 'en';

export type TranslationKey =
  | 'app.nav.architectures'
  | 'app.nav.advisor'
  | 'app.nav.comparison'
  | 'app.nav.aria'
  | 'app.footer.credit'
  | 'app.language.label'
  | 'app.language.pt'
  | 'app.language.en'
  | 'home.eyebrow'
  | 'home.title'
  | 'home.description'
  | 'home.architectureMenuAria'
  | 'list.title'
  | 'list.count'
  | 'list.searchLabel'
  | 'list.searchPlaceholder'
  | 'list.clearSearch'
  | 'list.accordionTitle'
  | 'list.accordionDescription'
  | 'list.availableAria'
  | 'list.emptyTitle'
  | 'list.emptyDescription'
  | 'detail.back'
  | 'detail.navAria'
  | 'detail.notFoundEyebrow'
  | 'detail.notFoundTitle'
  | 'detail.notFoundDescription'
  | 'detail.notFoundAction'
  | 'detail.eyebrow'
  | 'detail.comparisonAria'
  | 'detail.guidanceAria'
  | 'comparison.pros'
  | 'comparison.cons'
  | 'guidance.whenToUse'
  | 'guidance.realExample'
  | 'guidance.exampleScenario'
  | 'guidance.implementation'
  | 'guidance.commonPitfall'
  | 'miniIde.aria'
  | 'miniIde.folderStructure'
  | 'miniIde.support'
  | 'miniIde.fileTreeAria'
  | 'miniIde.searchLabel'
  | 'miniIde.searchPlaceholder'
  | 'miniIde.clearSearch'
  | 'miniIde.searchResults'
  | 'miniIde.noFilesFound'
  | 'miniIde.project'
  | 'miniIde.directoryAria'
  | 'miniIde.backFolder'
  | 'miniIde.breadcrumbAria'
  | 'miniIde.emptyFolder'
  | 'miniIde.editorAria'
  | 'miniIde.tabsAria'
  | 'miniIde.closeTab'
  | 'miniIde.path'
  | 'miniIde.copy'
  | 'miniIde.copied'
  | 'miniIde.failed'
  | 'miniIde.folder'
  | 'miniIde.file'
  | 'advisor.eyebrow'
  | 'advisor.title'
  | 'advisor.description'
  | 'advisor.questionsAria'
  | 'advisor.bestFor'
  | 'advisor.avoidIf'
  | 'advisor.panelAria'
  | 'advisor.answers'
  | 'advisor.progressAria'
  | 'advisor.finalResult'
  | 'advisor.why'
  | 'advisor.alternatives'
  | 'advisor.previewLocked'
  | 'advisor.completeSimulator'
  | 'advisor.missingAnswers'
  | 'advisor.partialPreview'
  | 'advisor.partialTrend'
  | 'advisor.emptyPreview'
  | 'advisor.noRecommendation'
  | 'advisor.start'
  | 'advisor.reset'
  | 'advisor.viewArchitectures'
  | 'comparisonPage.eyebrow'
  | 'comparisonPage.title'
  | 'comparisonPage.description'
  | 'comparisonPage.viewAll'
  | 'comparisonPage.selectorAria'
  | 'comparisonPage.architectures'
  | 'comparisonPage.selected'
  | 'comparisonPage.minimum'
  | 'comparisonPage.emptyTitle'
  | 'comparisonPage.emptyDescription'
  | 'comparisonPage.summaryAria'
  | 'comparisonPage.average'
  | 'comparisonPage.openDetail'
  | 'comparisonPage.matrixAria'
  | 'comparisonPage.criterion'
  | 'comparisonPage.criteria.complexity.label'
  | 'comparisonPage.criteria.complexity.description'
  | 'comparisonPage.criteria.scale.label'
  | 'comparisonPage.criteria.scale.description'
  | 'comparisonPage.criteria.teamAutonomy.label'
  | 'comparisonPage.criteria.teamAutonomy.description'
  | 'comparisonPage.criteria.testability.label'
  | 'comparisonPage.criteria.testability.description'
  | 'comparisonPage.criteria.performance.label'
  | 'comparisonPage.criteria.performance.description'
  | 'comparisonPage.criteria.learningCurve.label'
  | 'comparisonPage.criteria.learningCurve.description';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  pt: {
    'app.nav.architectures': 'Lista de arquiteturas',
    'app.nav.advisor': 'Simulador',
    'app.nav.comparison': 'Comparador',
    'app.nav.aria': 'Navegação principal',
    'app.footer.credit': 'Feito por Veronica Ciolfi',
    'app.language.label': 'Idioma',
    'app.language.pt': 'Português',
    'app.language.en': 'Inglês',
    'home.eyebrow': 'Guia navegável',
    'home.title': 'Arquiteturas de Frontend',
    'home.description':
      'Compare formas de organizar aplicações frontend, entenda os trade-offs e veja como cada arquitetura aparece na estrutura de pastas.',
    'home.architectureMenuAria': 'Menu de arquiteturas',
    'list.title': 'Arquiteturas',
    'list.count': '{{visible}} de {{total}} visíveis',
    'list.searchLabel': 'Filtrar arquiteturas',
    'list.searchPlaceholder': 'Buscar arquitetura...',
    'list.clearSearch': 'Limpar busca',
    'list.accordionTitle': 'Todas as arquiteturas',
    'list.accordionDescription': 'Lista completa para navegar rapidamente entre os detalhes.',
    'list.availableAria': 'Arquiteturas disponíveis',
    'list.emptyTitle': 'Nenhuma arquitetura encontrada',
    'list.emptyDescription':
      'Tente buscar por organização, domínio, deploy, performance ou pelo nome da arquitetura.',
    'detail.back': 'Voltar para lista',
    'detail.navAria': 'Navegação de arquiteturas',
    'detail.notFoundEyebrow': 'Arquitetura não encontrada',
    'detail.notFoundTitle': 'Não encontramos essa arquitetura',
    'detail.notFoundDescription':
      'Confira a lista e escolha uma arquitetura disponível no guia.',
    'detail.notFoundAction': 'Ver arquiteturas',
    'detail.eyebrow': 'Arquitetura selecionada',
    'detail.comparisonAria': 'Comparador de arquiteturas',
    'detail.guidanceAria': 'Guia de uso da arquitetura',
    'comparison.pros': 'Prós',
    'comparison.cons': 'Contras',
    'guidance.whenToUse': 'Quando usar',
    'guidance.realExample': 'Exemplo real',
    'guidance.exampleScenario': 'Cenário prático',
    'guidance.implementation': 'Como implementar',
    'guidance.commonPitfall': 'Cuidado comum',
    'miniIde.aria': 'Mini IDE com estrutura de arquivos',
    'miniIde.folderStructure': 'Estrutura de pastas',
    'miniIde.support': 'Navegue pelos arquivos para ver como a arquitetura aparece no código.',
    'miniIde.fileTreeAria': 'Arquivos da arquitetura',
    'miniIde.searchLabel': 'Buscar arquivo',
    'miniIde.searchPlaceholder': 'Nome ou caminho',
    'miniIde.clearSearch': 'Limpar busca',
    'miniIde.searchResults': 'Resultados da busca',
    'miniIde.noFilesFound': 'Nenhum arquivo encontrado.',
    'miniIde.project': 'projeto',
    'miniIde.directoryAria': 'Conteúdo da pasta atual',
    'miniIde.backFolder': 'Voltar pasta',
    'miniIde.breadcrumbAria': 'Caminho atual',
    'miniIde.emptyFolder': 'Esta pasta não tem arquivos de exemplo neste guia.',
    'miniIde.editorAria': 'Arquivo selecionado',
    'miniIde.tabsAria': 'Arquivos abertos',
    'miniIde.closeTab': 'Fechar aba',
    'miniIde.path': 'Caminho',
    'miniIde.copy': 'Copiar código',
    'miniIde.copied': 'Copiado',
    'miniIde.failed': 'Falhou',
    'miniIde.folder': 'Pasta',
    'miniIde.file': 'Arquivo',
    'advisor.eyebrow': 'Simulador',
    'advisor.title': 'Descubra qual arquitetura combina com seu frontend',
    'advisor.description':
      'Responda algumas perguntas sobre produto, time, domínio e entrega. No final, o guia sugere a arquitetura mais adequada e alternativas próximas.',
    'advisor.questionsAria': 'Perguntas do simulador',
    'advisor.bestFor': 'Melhor para:',
    'advisor.avoidIf': 'Evite se:',
    'advisor.panelAria': 'Recomendação',
    'advisor.answers': '{{answered}} de {{total}} respostas',
    'advisor.progressAria': 'Progresso do simulador',
    'advisor.finalResult': 'Recomendação final',
    'advisor.why': 'Por que essa recomendação?',
    'advisor.alternatives': 'Alternativas próximas',
    'advisor.previewLocked': 'Prévia bloqueada',
    'advisor.completeSimulator': 'Complete o simulador',
    'advisor.missingAnswers': 'Faltam {{count}} resposta{{plural}} para liberar a recomendação final.',
    'advisor.partialPreview': 'Prévia parcial',
    'advisor.partialTrend': 'Tendência parcial',
    'advisor.emptyPreview': 'Prévia parcial vazia',
    'advisor.noRecommendation': 'Sem recomendação ainda',
    'advisor.start': 'Escolha uma opção para começar a calcular a tendência.',
    'advisor.reset': 'Recomeçar',
    'advisor.viewArchitectures': 'Ver lista de arquiteturas',
    'comparisonPage.eyebrow': 'Comparador',
    'comparisonPage.title': 'Compare arquiteturas lado a lado',
    'comparisonPage.description':
      'Escolha 2 ou 3 arquiteturas para analisar complexidade, escala, autonomia de times, testabilidade, performance e curva de aprendizado.',
    'comparisonPage.viewAll': 'Ver lista completa',
    'comparisonPage.selectorAria': 'Selecionar arquiteturas',
    'comparisonPage.architectures': 'Arquiteturas',
    'comparisonPage.selected': '{{count}} de {{max}} selecionadas',
    'comparisonPage.minimum': 'mínimo 2',
    'comparisonPage.emptyTitle': 'Selecione pelo menos duas arquiteturas',
    'comparisonPage.emptyDescription':
      'A comparação fica mais útil quando você coloca abordagens diferentes na mesma mesa.',
    'comparisonPage.summaryAria': 'Resumo das arquiteturas selecionadas',
    'comparisonPage.average': 'Média dos critérios',
    'comparisonPage.openDetail': 'Abrir detalhe',
    'comparisonPage.matrixAria': 'Matriz de comparação',
    'comparisonPage.criterion': 'Critério',
    'comparisonPage.criteria.complexity.label': 'Complexidade',
    'comparisonPage.criteria.complexity.description':
      'Quanto esforço estrutural e operacional a arquitetura adiciona.',
    'comparisonPage.criteria.scale.label': 'Escala',
    'comparisonPage.criteria.scale.description':
      'Capacidade de sustentar crescimento de produto, código e times.',
    'comparisonPage.criteria.teamAutonomy.label': 'Autonomia de times',
    'comparisonPage.criteria.teamAutonomy.description':
      'Quanto facilita ownership claro e menor acoplamento entre equipes.',
    'comparisonPage.criteria.testability.label': 'Testabilidade',
    'comparisonPage.criteria.testability.description':
      'Facilidade de testar regras, fluxos e integração de forma isolada.',
    'comparisonPage.criteria.performance.label': 'Performance',
    'comparisonPage.criteria.performance.description':
      'Potencial de melhorar carregamento, runtime ou volume de JavaScript.',
    'comparisonPage.criteria.learningCurve.label': 'Curva de aprendizado',
    'comparisonPage.criteria.learningCurve.description':
      'Esforço para o time entender, aplicar e manter a abordagem.',
  },
  en: {
    'app.nav.architectures': 'Architecture list',
    'app.nav.advisor': 'Advisor',
    'app.nav.comparison': 'Comparison',
    'app.nav.aria': 'Primary navigation',
    'app.footer.credit': 'Made by Veronica Ciolfi',
    'app.language.label': 'Language',
    'app.language.pt': 'Portuguese',
    'app.language.en': 'English',
    'home.eyebrow': 'Navigable guide',
    'home.title': 'Frontend Architectures',
    'home.description':
      'Compare ways to organize frontend applications, understand the trade-offs, and see how each architecture appears in the folder structure.',
    'home.architectureMenuAria': 'Architecture menu',
    'list.title': 'Architectures',
    'list.count': '{{visible}} of {{total}} visible',
    'list.searchLabel': 'Filter architectures',
    'list.searchPlaceholder': 'Search architecture...',
    'list.clearSearch': 'Clear search',
    'list.accordionTitle': 'All architectures',
    'list.accordionDescription': 'Complete list for quickly navigating between details.',
    'list.availableAria': 'Available architectures',
    'list.emptyTitle': 'No architecture found',
    'list.emptyDescription':
      'Try searching by organization, domain, deployment, performance, or architecture name.',
    'detail.back': 'Back to list',
    'detail.navAria': 'Architecture navigation',
    'detail.notFoundEyebrow': 'Architecture not found',
    'detail.notFoundTitle': 'We could not find this architecture',
    'detail.notFoundDescription': 'Check the list and choose an available architecture from the guide.',
    'detail.notFoundAction': 'View architectures',
    'detail.eyebrow': 'Selected architecture',
    'detail.comparisonAria': 'Architecture comparison',
    'detail.guidanceAria': 'Architecture usage guide',
    'comparison.pros': 'Pros',
    'comparison.cons': 'Cons',
    'guidance.whenToUse': 'When to use',
    'guidance.realExample': 'Real example',
    'guidance.exampleScenario': 'Practical scenario',
    'guidance.implementation': 'How to implement',
    'guidance.commonPitfall': 'Common pitfall',
    'miniIde.aria': 'Mini IDE with file structure',
    'miniIde.folderStructure': 'Folder structure',
    'miniIde.support': 'Browse the files to see how the architecture appears in code.',
    'miniIde.fileTreeAria': 'Architecture files',
    'miniIde.searchLabel': 'Search file',
    'miniIde.searchPlaceholder': 'Name or path',
    'miniIde.clearSearch': 'Clear search',
    'miniIde.searchResults': 'Search results',
    'miniIde.noFilesFound': 'No file found.',
    'miniIde.project': 'project',
    'miniIde.directoryAria': 'Current folder content',
    'miniIde.backFolder': 'Back folder',
    'miniIde.breadcrumbAria': 'Current path',
    'miniIde.emptyFolder': 'This folder has no example files in this guide.',
    'miniIde.editorAria': 'Selected file',
    'miniIde.tabsAria': 'Open files',
    'miniIde.closeTab': 'Close tab',
    'miniIde.path': 'Path',
    'miniIde.copy': 'Copy code',
    'miniIde.copied': 'Copied',
    'miniIde.failed': 'Failed',
    'miniIde.folder': 'Folder',
    'miniIde.file': 'File',
    'advisor.eyebrow': 'Advisor',
    'advisor.title': 'Discover which architecture fits your frontend',
    'advisor.description':
      'Answer a few questions about product, team, domain, and delivery. At the end, the guide suggests the best-fit architecture and close alternatives.',
    'advisor.questionsAria': 'Advisor questions',
    'advisor.bestFor': 'Best for:',
    'advisor.avoidIf': 'Avoid if:',
    'advisor.panelAria': 'Recommendation',
    'advisor.answers': '{{answered}} of {{total}} answers',
    'advisor.progressAria': 'Advisor progress',
    'advisor.finalResult': 'Final recommendation',
    'advisor.why': 'Why this recommendation?',
    'advisor.alternatives': 'Close alternatives',
    'advisor.previewLocked': 'Preview locked',
    'advisor.completeSimulator': 'Complete the advisor',
    'advisor.missingAnswers': '{{count}} answer{{plural}} left to unlock the final recommendation.',
    'advisor.partialPreview': 'Partial preview',
    'advisor.partialTrend': 'Partial trend',
    'advisor.emptyPreview': 'Empty partial preview',
    'advisor.noRecommendation': 'No recommendation yet',
    'advisor.start': 'Choose an option to start calculating the trend.',
    'advisor.reset': 'Restart',
    'advisor.viewArchitectures': 'View architecture list',
    'comparisonPage.eyebrow': 'Comparison',
    'comparisonPage.title': 'Compare architectures side by side',
    'comparisonPage.description':
      'Choose 2 or 3 architectures to analyze complexity, scale, team autonomy, testability, performance, and learning curve.',
    'comparisonPage.viewAll': 'View full list',
    'comparisonPage.selectorAria': 'Select architectures',
    'comparisonPage.architectures': 'Architectures',
    'comparisonPage.selected': '{{count}} of {{max}} selected',
    'comparisonPage.minimum': 'minimum 2',
    'comparisonPage.emptyTitle': 'Select at least two architectures',
    'comparisonPage.emptyDescription':
      'The comparison becomes more useful when you place different approaches side by side.',
    'comparisonPage.summaryAria': 'Selected architectures summary',
    'comparisonPage.average': 'Criteria average',
    'comparisonPage.openDetail': 'Open detail',
    'comparisonPage.matrixAria': 'Comparison matrix',
    'comparisonPage.criterion': 'Criterion',
    'comparisonPage.criteria.complexity.label': 'Complexity',
    'comparisonPage.criteria.complexity.description':
      'How much structural and operational effort the architecture adds.',
    'comparisonPage.criteria.scale.label': 'Scale',
    'comparisonPage.criteria.scale.description':
      'Ability to sustain product, codebase, and team growth.',
    'comparisonPage.criteria.teamAutonomy.label': 'Team autonomy',
    'comparisonPage.criteria.teamAutonomy.description':
      'How much it supports clear ownership and lower coupling between teams.',
    'comparisonPage.criteria.testability.label': 'Testability',
    'comparisonPage.criteria.testability.description':
      'Ease of testing rules, flows, and integration in isolation.',
    'comparisonPage.criteria.performance.label': 'Performance',
    'comparisonPage.criteria.performance.description':
      'Potential to improve loading, runtime, or JavaScript volume.',
    'comparisonPage.criteria.learningCurve.label': 'Learning curve',
    'comparisonPage.criteria.learningCurve.description':
      'Effort required for the team to understand, apply, and maintain the approach.',
  },
};
