import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Architecture } from '../../core/models/architecture.model';

@Component({
  selector: 'app-architecture-list',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './architecture-list.html',
  styleUrl: './architecture-list.scss',
})
export class ArchitectureList {
  readonly architectures = input.required<Architecture[]>();
  readonly selectedId = input.required<string>();

  protected readonly searchTerm = signal('');
  protected readonly accordionExpanded = signal(true);

  protected readonly filteredArchitectures = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();

    return this.architectures().filter((architecture) => this.matchesSearch(architecture, query));
  });

  protected readonly visibleCount = computed(() => this.filteredArchitectures().length);

  protected updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  protected clearSearch(): void {
    this.searchTerm.set('');
  }

  protected toggleAccordion(): void {
    if (this.searchTerm().trim().length > 0) {
      return;
    }

    this.accordionExpanded.update((value) => !value);
  }

  protected isAccordionExpanded(): boolean {
    if (this.searchTerm().trim().length > 0) {
      return true;
    }

    return this.accordionExpanded();
  }

  private matchesSearch(architecture: Architecture, query: string): boolean {
    if (!query) {
      return true;
    }

    return (
      architecture.name.toLowerCase().includes(query) ||
      architecture.shortDescription.toLowerCase().includes(query) ||
      architecture.id.toLowerCase().includes(query)
    );
  }
}
