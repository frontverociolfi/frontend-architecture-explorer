import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nService } from './i18n.service';
import { LanguageToggle } from './language-toggle';

describe('LanguageToggle', () => {
  let fixture: ComponentFixture<LanguageToggle>;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.lang = '';

    await TestBed.configureTestingModule({
      imports: [LanguageToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageToggle);
    fixture.detectChanges();
  });

  it('renders both language options and keeps Portuguese active by default', () => {
    const element = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(element.querySelectorAll('button'));

    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toContain('PT');
    expect(buttons[1].textContent).toContain('EN');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
  });

  it('switches the active language when English is selected', () => {
    const element = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(element.querySelectorAll('button'));
    const i18n = TestBed.inject(I18nService);

    buttons[1].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(i18n.language()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
    expect(element.querySelector('[aria-label="English"]')).toBeTruthy();
  });
});
