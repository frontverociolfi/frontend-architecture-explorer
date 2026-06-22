import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { I18nService } from '../core/i18n/i18n.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.top-menu')?.textContent).toContain('Simulador');
  });

  it('should render language toggle and footer credit', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-language-toggle')).toBeTruthy();
    expect(compiled.querySelector('.app-footer')?.textContent).toContain('Feito por Veronica Ciolfi');
  });

  it('should translate the footer credit', async () => {
    const i18n = TestBed.inject(I18nService);
    const fixture = TestBed.createComponent(App);

    i18n.setLanguage('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-footer')?.textContent).toContain('Made by Veronica Ciolfi');
  });
});
