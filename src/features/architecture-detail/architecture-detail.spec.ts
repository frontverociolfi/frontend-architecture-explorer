import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Architecture } from '../../core/models/architecture.model';
import { ArchitectureDetail } from './architecture-detail';

const baseArchitecture: Architecture = {
  id: 'hexagonal',
  name: 'Hexagonal',
  shortDescription: 'Portas e adaptadores',
  explanation: 'Separa domínio e infraestrutura.',
  files: [{ path: 'src/domain.ts', name: 'domain.ts', depth: 0, type: 'file', content: 'export {};' }],
  pros: ['Testável'],
  cons: ['Mais arquivos'],
  whenToUse: ['Domínio rico'],
  realExample: 'Checkout',
  accent: 'teal',
};

describe('ArchitectureDetail', () => {
  let fixture: ComponentFixture<ArchitectureDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchitectureDetail);
  });

  it('normalizes named accent values for the header', () => {
    fixture.componentRef.setInput('architecture', baseArchitecture);
    fixture.detectChanges();

    const article = fixture.nativeElement.querySelector('.details') as HTMLElement;

    expect(article.style.getPropertyValue('--accent')).toBe('var(--color-secondary)');
  });

  it('keeps hexadecimal accent values from the catalog', () => {
    fixture.componentRef.setInput('architecture', {
      ...baseArchitecture,
      accent: '#94D2BD',
    });
    fixture.detectChanges();

    const article = fixture.nativeElement.querySelector('.details') as HTMLElement;

    expect(article.style.getPropertyValue('--accent')).toBe('#94D2BD');
  });
});
