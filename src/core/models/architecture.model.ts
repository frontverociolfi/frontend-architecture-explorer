export type ArchitectureFile = {
  path: string;
  name: string;
  depth: number;
  type: 'folder' | 'file';
  content?: string;
};

export type Architecture = {
  id: string;
  name: string;
  shortDescription: string;
  explanation: string;
  files: ArchitectureFile[];
  pros: string[];
  cons: string[];
  whenToUse: string[];
  realExample: string;
  exampleScenario?: string;
  implementationHighlights?: string[];
  commonPitfall?: string;
  accent: string;
};

export type ComparisonScore = {
  label: 'Baixa' | 'Média' | 'Alta' | 'Muito alta' | 'Low' | 'Medium' | 'High' | 'Very high';
  value: number;
  note: string;
};

export type ArchitectureComparison = {
  complexity: ComparisonScore;
  scale: ComparisonScore;
  teamAutonomy: ComparisonScore;
  testability: ComparisonScore;
  performance: ComparisonScore;
  learningCurve: ComparisonScore;
};
