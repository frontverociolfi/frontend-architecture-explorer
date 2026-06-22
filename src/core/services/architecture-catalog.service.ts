import { Injectable, inject } from '@angular/core';

import featureFirst from '../../assets/architectures/feature-first.json';
import layered from '../../assets/architectures/layered.json';
import ddf from '../../assets/architectures/ddf.json';
import monorepo from '../../assets/architectures/monorepo.json';
import microfrontend from '../../assets/architectures/microfrontend.json';
import hexagonal from '../../assets/architectures/hexagonal.json';
import clean from '../../assets/architectures/clean.json';
import cqrsFrontend from '../../assets/architectures/cqrs-frontend.json';
import eventDrivenFrontend from '../../assets/architectures/event-driven-frontend.json';
import bff from '../../assets/architectures/bff.json';
import moduleFederation from '../../assets/architectures/module-federation.json';
import islands from '../../assets/architectures/islands.json';
import featureSlicedDesign from '../../assets/architectures/feature-sliced-design.json';
import { Architecture, ArchitectureFile } from '../models/architecture.model';
import { I18nService } from '../i18n/i18n.service';

type RawArchitectureSource = {
  source: string;
  data: unknown;
};

type JsonRecord = Record<string, unknown>;

const architectureSources: RawArchitectureSource[] = [
  { source: 'feature-first.json', data: featureFirst },
  { source: 'layered.json', data: layered },
  { source: 'ddf.json', data: ddf },
  { source: 'monorepo.json', data: monorepo },
  { source: 'microfrontend.json', data: microfrontend },
  { source: 'hexagonal.json', data: hexagonal },
  { source: 'clean.json', data: clean },
  { source: 'cqrs-frontend.json', data: cqrsFrontend },
  { source: 'event-driven-frontend.json', data: eventDrivenFrontend },
  { source: 'bff.json', data: bff },
  { source: 'module-federation.json', data: moduleFederation },
  { source: 'islands.json', data: islands },
  { source: 'feature-sliced-design.json', data: featureSlicedDesign },
];

@Injectable({ providedIn: 'root' })
export class ArchitectureCatalogService {
  private readonly i18n = inject(I18nService);
  private readonly architectures = validateArchitectureCatalog(architectureSources);

  list(): Architecture[] {
    return this.architectures.map((architecture) => this.i18n.localizeArchitecture(architecture));
  }

  findById(id: string | null): Architecture | undefined {
    const architecture = this.architectures.find((architecture) => architecture.id === id);

    return architecture ? this.i18n.localizeArchitecture(architecture) : undefined;
  }
}

function validateArchitectureCatalog(sources: RawArchitectureSource[]): Architecture[] {
  const architectures = sources.map(({ source, data }) => normalizeArchitecture(data, source));
  const ids = new Set<string>();

  for (const architecture of architectures) {
    if (ids.has(architecture.id)) {
      throw new Error(`Architecture catalog has duplicated id "${architecture.id}".`);
    }

    ids.add(architecture.id);
  }

  return architectures;
}

function normalizeArchitecture(value: unknown, source: string): Architecture {
  const architecture = expectRecord(value, source);
  const files = readFileList(architecture['files'], source, 'files');

  if (!files.some((file) => file.type === 'file')) {
    throw new Error(`${source}: "files" must include at least one file item.`);
  }

  return {
    id: readRequiredString(architecture, 'id', source),
    name: readRequiredString(architecture, 'name', source),
    shortDescription: readRequiredString(architecture, 'shortDescription', source),
    explanation: readRequiredString(architecture, 'explanation', source),
    files,
    pros: readRequiredStringArray(architecture, 'pros', source),
    cons: readRequiredStringArray(architecture, 'cons', source),
    whenToUse: readRequiredStringArray(architecture, 'whenToUse', source),
    realExample: readRequiredString(architecture, 'realExample', source),
    exampleScenario: readOptionalString(architecture, 'exampleScenario', source),
    implementationHighlights: readOptionalStringArray(
      architecture,
      'implementationHighlights',
      source,
    ),
    commonPitfall: readOptionalString(architecture, 'commonPitfall', source),
    accent: readRequiredString(architecture, 'accent', source),
  };
}

function readFileList(value: unknown, source: string, field: string): ArchitectureFile[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${source}: "${field}" must be a non-empty array.`);
  }

  const paths = new Set<string>();

  return value.map((item, index) => {
    const file = expectRecord(item, `${source}.${field}[${index}]`);
    const path = readRequiredString(file, 'path', `${source}.${field}[${index}]`);

    if (paths.has(path)) {
      throw new Error(`${source}: "${field}" has duplicated path "${path}".`);
    }

    paths.add(path);

    return {
      path,
      name: readRequiredString(file, 'name', `${source}.${field}[${index}]`),
      depth: readDepth(file['depth'], `${source}.${field}[${index}].depth`),
      type: readFileType(file['type'], `${source}.${field}[${index}].type`),
      content: readOptionalString(file, 'content', `${source}.${field}[${index}]`),
    };
  });
}

function expectRecord(value: unknown, context: string): JsonRecord {
  if (!isRecord(value)) {
    throw new Error(`${context}: expected an object.`);
  }

  return value;
}

function readRequiredString(record: JsonRecord, field: string, source: string): string {
  const value = record[field];

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${source}: "${field}" must be a non-empty string.`);
  }

  return value;
}

function readOptionalString(
  record: JsonRecord,
  field: string,
  source: string,
): string | undefined {
  const value = record[field];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${source}: "${field}" must be a non-empty string when provided.`);
  }

  return value;
}

function readRequiredStringArray(record: JsonRecord, field: string, source: string): string[] {
  const value = record[field];

  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${source}: "${field}" must be a non-empty string array.`);
  }

  return value.map((item, index) => {
    if (typeof item !== 'string' || item.trim().length === 0) {
      throw new Error(`${source}: "${field}[${index}]" must be a non-empty string.`);
    }

    return item;
  });
}

function readOptionalStringArray(
  record: JsonRecord,
  field: string,
  source: string,
): string[] | undefined {
  const value = record[field];

  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`${source}: "${field}" must be a string array when provided.`);
  }

  return value.map((item, index) => {
    if (typeof item !== 'string' || item.trim().length === 0) {
      throw new Error(`${source}: "${field}[${index}]" must be a non-empty string.`);
    }

    return item;
  });
}

function readDepth(value: unknown, context: string): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    throw new Error(`${context} must be a non-negative integer.`);
  }

  return value;
}

function readFileType(value: unknown, context: string): ArchitectureFile['type'] {
  if (value !== 'folder' && value !== 'file') {
    throw new Error(`${context} must be "folder" or "file".`);
  }

  return value;
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
