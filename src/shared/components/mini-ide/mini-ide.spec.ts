import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Architecture } from '../../../core/models/architecture.model';
import { MiniIde } from './mini-ide';

const architecture: Architecture = {
  id: 'feature-first',
  name: 'Feature First',
  shortDescription: 'Organiza por features',
  explanation: 'Explicação',
  files: [
    { path: 'src/app', name: 'app', depth: 0, type: 'folder' },
    {
      path: 'src/app/app.routes.ts',
      name: 'app.routes.ts',
      depth: 1,
      type: 'file',
      content: 'export const routes = [];',
    },
    { path: 'src/features', name: 'features', depth: 0, type: 'folder' },
    {
      path: 'src/features/login.ts',
      name: 'login.ts',
      depth: 1,
      type: 'file',
      content: 'export class Login {}',
    },
  ],
  pros: ['Pró'],
  cons: ['Contra'],
  whenToUse: ['Uso'],
  realExample: 'Exemplo',
  accent: 'teal',
};

describe('MiniIde', () => {
  let fixture: ComponentFixture<MiniIde>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniIde],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniIde);
    fixture.componentRef.setInput('architecture', architecture);
    fixture.detectChanges();
  });

  it('renders Fluent icons for project, folders, files and copy action', () => {
    const element = fixture.nativeElement as HTMLElement;
    const component = fixture.componentInstance as unknown as {
      treeIcon(file: (typeof architecture.files)[number]): string;
      directoryIcon(file: (typeof architecture.files)[number]): string;
      copyIcon(): string;
    };

    expect(element.querySelector('ng-icon[name="fluentHome"]')).toBeTruthy();
    expect(element.querySelectorAll('ng-icon').length).toBeGreaterThan(4);
    expect(component.treeIcon(architecture.files[0])).toBe('fluentFolder');
    expect(component.directoryIcon(architecture.files[1])).toBe('fluentDocument');
    expect(component.copyIcon()).toBe('fluentCopy');
  });

  it('opens a folder and shows its direct files in the directory panel', () => {
    const component = fixture.componentInstance as unknown as {
      openFolder(folder: { path: string; name: string; depth: number; type: 'folder' }): void;
      directoryItems(): { name: string }[];
    };

    component.openFolder({ path: 'src/app', name: 'app', depth: 0, type: 'folder' });
    fixture.detectChanges();

    expect(component.directoryItems().map((item) => item.name)).toEqual(['app.routes.ts']);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('app.routes.ts');
  });

  it('filters files by path or name', () => {
    const component = fixture.componentInstance as unknown as {
      searchTerm: { set(value: string): void };
      searchableFiles(): { path: string }[];
    };

    component.searchTerm.set('login');
    fixture.detectChanges();

    expect(component.searchableFiles().map((file) => file.path)).toEqual(['src/features/login.ts']);
  });
});
