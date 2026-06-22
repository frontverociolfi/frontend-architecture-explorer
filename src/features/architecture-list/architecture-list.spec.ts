import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Architecture } from '../../core/models/architecture.model';
import { ArchitectureList } from './architecture-list';

const architectures: Architecture[] = [
  {
    id: 'feature-first',
    name: 'Feature First',
    shortDescription: 'Organiza por features',
    explanation: 'Explicação',
    files: [{ path: 'src/app.ts', name: 'app.ts', depth: 0, type: 'file' }],
    pros: ['Pró'],
    cons: ['Contra'],
    whenToUse: ['Uso'],
    realExample: 'Exemplo',
    accent: 'teal',
  },
  {
    id: 'hexagonal',
    name: 'Hexagonal',
    shortDescription: 'Portas e adaptadores',
    explanation: 'Explicação',
    files: [{ path: 'src/domain.ts', name: 'domain.ts', depth: 0, type: 'file' }],
    pros: ['Pró'],
    cons: ['Contra'],
    whenToUse: ['Uso'],
    realExample: 'Exemplo',
    accent: 'teal',
  },
];

describe('ArchitectureList', () => {
  let fixture: ComponentFixture<ArchitectureList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchitectureList);
    fixture.componentRef.setInput('architectures', architectures);
    fixture.componentRef.setInput('selectedId', 'hexagonal');
    fixture.detectChanges();
  });

  it('renders architectures and marks the selected one', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('Feature First');
    expect(element.querySelector('a.active')?.textContent).toContain('Hexagonal');
  });

  it('filters architectures by search term', () => {
    const element = fixture.nativeElement as HTMLElement;
    const input = element.querySelector<HTMLInputElement>('input[type="search"]');

    input!.value = 'feature';
    input!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(element.textContent).toContain('Feature First');
    expect(element.textContent).not.toContain('Portas e adaptadores');
    expect(element.textContent).toContain('1 de 2 visíveis');
  });

  it('keeps accordion expanded while searching', () => {
    const component = fixture.componentInstance as unknown as {
      searchTerm: { set(value: string): void };
      isAccordionExpanded(): boolean;
      toggleAccordion(): void;
    };

    component.searchTerm.set('hex');
    component.toggleAccordion();

    expect(component.isAccordionExpanded()).toBe(true);
  });
});
