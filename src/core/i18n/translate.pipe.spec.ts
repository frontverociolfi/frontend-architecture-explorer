import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nService } from './i18n.service';
import { TranslatePipe } from './translate.pipe';

@Component({
  standalone: true,
  imports: [TranslatePipe],
  template: '<p>{{ "app.language.pt" | translate }}</p>',
})
class TranslatePipeHostComponent {}

describe('TranslatePipe', () => {
  let fixture: ComponentFixture<TranslatePipeHostComponent>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [TranslatePipeHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslatePipeHostComponent);
    fixture.detectChanges();
  });

  it('renders the current language copy and reacts to language changes', () => {
    const i18n = TestBed.inject(I18nService);
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('Portugu\u00eas');

    i18n.setLanguage('en');
    fixture.detectChanges();

    expect(element.textContent).toContain('Portuguese');
  });
});
