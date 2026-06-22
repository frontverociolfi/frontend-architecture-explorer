import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentArrowLeft,
  fluentCheckmarkCircle,
  fluentCode,
  fluentCopy,
  fluentDismiss,
  fluentDocument,
  fluentErrorCircle,
  fluentFolder,
  fluentFolderOpen,
  fluentHome,
  fluentSearch,
} from '@ng-icons/fluent-ui';

import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { Architecture, ArchitectureFile } from '../../../core/models/architecture.model';

@Component({
  selector: 'app-mini-ide',
  imports: [NgIcon, TranslatePipe],
  providers: [
    provideIcons({
      fluentArrowLeft,
      fluentCheckmarkCircle,
      fluentCode,
      fluentCopy,
      fluentDismiss,
      fluentDocument,
      fluentErrorCircle,
      fluentFolder,
      fluentFolderOpen,
      fluentHome,
      fluentSearch,
    }),
  ],
  templateUrl: './mini-ide.html',
  styleUrl: './mini-ide.scss',
})
export class MiniIde {
  readonly architecture = input.required<Architecture>();

  private readonly i18n = inject(I18nService);

  protected readonly currentFolderPath = signal('');
  protected readonly selectedFilePath = signal('');
  protected readonly searchTerm = signal('');
  protected readonly openFilePaths = signal<string[]>([]);
  protected readonly copyState = signal<'idle' | 'copied' | 'failed'>('idle');

  protected readonly currentFolder = computed(() =>
    this.architecture().files.find(
      (file) => file.path === this.currentFolderPath() && file.type === 'folder',
    ),
  );

  protected readonly directoryItems = computed(() => {
    const folder = this.currentFolder();
    const folderPath = folder?.path ?? '';
    const targetDepth = folder ? folder.depth + 1 : 0;

    return this.architecture().files.filter((file) => {
      if (file.depth !== targetDepth) {
        return false;
      }

      return folderPath ? file.path.startsWith(`${folderPath}/`) : true;
    });
  });

  protected readonly searchableFiles = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();

    if (!query) {
      return [];
    }

    return this.architecture()
      .files.filter(
        (file) =>
          file.type === 'file' &&
          (file.name.toLowerCase().includes(query) || file.path.toLowerCase().includes(query)),
      )
      .slice(0, 8);
  });

  protected readonly breadcrumbs = computed(() => {
    const currentPath = this.currentFolderPath();

    return this.architecture()
      .files.filter(
        (file) =>
          file.type === 'folder' &&
          currentPath !== '' &&
          (file.path === currentPath || currentPath.startsWith(`${file.path}/`)),
      )
      .sort((a, b) => a.depth - b.depth);
  });

  protected readonly selectedFile = computed(() => {
    const fallback = this.architecture().files.find((file) => file.type === 'file');

    return (
      this.architecture().files.find(
        (file) => file.path === this.selectedFilePath() && file.type === 'file',
      ) ?? fallback
    );
  });

  protected readonly openFiles = computed(() =>
    this.openFilePaths()
      .map((path) =>
        this.architecture().files.find((file) => file.path === path && file.type === 'file'),
      )
      .filter((file): file is ArchitectureFile => Boolean(file)),
  );

  private readonly resetNavigation = effect(() => {
    const architecture = this.architecture();
    const firstFilePath =
      architecture.files.find((file) => file.type === 'file')?.path ?? architecture.files[0].path;

    this.currentFolderPath.set('');
    this.selectedFilePath.set(firstFilePath);
    this.openFilePaths.set([firstFilePath]);
    this.searchTerm.set('');
    this.copyState.set('idle');
  });

  protected openItem(file: ArchitectureFile): void {
    if (file.type === 'folder') {
      this.currentFolderPath.set(file.path);
      return;
    }

    this.selectFile(file);
  }

  protected openRoot(): void {
    this.currentFolderPath.set('');
  }

  protected goBackFolder(): void {
    const currentPath = this.currentFolderPath();

    if (!currentPath) {
      return;
    }

    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    this.currentFolderPath.set(parentPath);
  }

  protected openFolder(folder: ArchitectureFile): void {
    if (folder.type === 'folder') {
      this.currentFolderPath.set(folder.path);
    }
  }

  protected updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  protected clearSearch(): void {
    this.searchTerm.set('');
  }

  protected closeTab(file: ArchitectureFile, event: Event): void {
    event.stopPropagation();

    if (this.openFilePaths().length <= 1) {
      return;
    }

    const nextOpenFiles = this.openFilePaths().filter((path) => path !== file.path);
    this.openFilePaths.set(nextOpenFiles);

    if (this.selectedFilePath() !== file.path) {
      return;
    }

    this.selectedFilePath.set(nextOpenFiles[0] ?? '');
  }

  protected async copySelectedFile(): Promise<void> {
    const content = this.selectedFile()?.content ?? '';

    if (!content) {
      return;
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(content);
      } else if (typeof document !== 'undefined') {
        this.copyWithTextArea(content);
      }

      this.setCopyState('copied');
    } catch {
      this.setCopyState('failed');
    }
  }

  protected fileExtension(file: ArchitectureFile | undefined): string {
    if (!file || file.type === 'folder' || !file.name.includes('.')) {
      return 'dir';
    }

    return file.name.split('.').pop() ?? 'file';
  }

  protected fileKind(file: ArchitectureFile): string {
    if (file.type === 'folder') {
      return this.i18n.translate('miniIde.folder');
    }

    return `${this.i18n.translate('miniIde.file')} .${this.fileExtension(file)}`;
  }

  protected treeIcon(file: ArchitectureFile): string {
    if (file.type === 'file') {
      return 'fluentDocument';
    }

    return this.currentFolderPath() === file.path ? 'fluentFolderOpen' : 'fluentFolder';
  }

  protected directoryIcon(file: ArchitectureFile): string {
    return file.type === 'folder' ? 'fluentFolder' : 'fluentDocument';
  }

  protected copyIcon(): string {
    if (this.copyState() === 'copied') {
      return 'fluentCheckmarkCircle';
    }

    if (this.copyState() === 'failed') {
      return 'fluentErrorCircle';
    }

    return 'fluentCopy';
  }

  private selectFile(file: ArchitectureFile): void {
    if (file.type === 'file') {
      this.selectedFilePath.set(file.path);
      this.openFilePaths.update((paths) =>
        paths.includes(file.path) ? paths : [...paths, file.path],
      );
      this.copyState.set('idle');
    }
  }

  private copyWithTextArea(content: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = content;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  private setCopyState(state: 'copied' | 'failed'): void {
    this.copyState.set(state);

    window.setTimeout(() => {
      this.copyState.set('idle');
    }, 1800);
  }
}
