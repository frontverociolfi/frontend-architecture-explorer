import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { I18nService } from '../../core/i18n/i18n.service';
import { AdvisorPage } from './advisor-page';

describe('AdvisorPage', () => {
  let fixture: ComponentFixture<AdvisorPage>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [AdvisorPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvisorPage);
    fixture.detectChanges();
  });

  it('tracks answers and unlocks the final recommendation when complete', () => {
    const component = fixture.componentInstance as unknown as {
      questions(): { options: unknown[] }[];
      answer(question: unknown, option: unknown): void;
      answeredCount(): number;
      isComplete(): boolean;
      progressPercent(): number;
      recommendation(): { id: string };
    };

    for (const question of component.questions()) {
      component.answer(question, question.options[0]);
    }

    expect(component.answeredCount()).toBe(component.questions().length);
    expect(component.isComplete()).toBe(true);
    expect(component.progressPercent()).toBe(100);
    expect(component.recommendation().id).toBeTruthy();
  });

  it('switches question copy with the selected language', () => {
    const i18n = TestBed.inject(I18nService);
    const component = fixture.componentInstance as unknown as {
      questions(): { title: string }[];
    };

    expect(component.questions()[0].title).toBe('Qual é o momento do produto?');

    i18n.setLanguage('en');
    fixture.detectChanges();

    expect(component.questions()[0].title).toBe('What stage is the product in?');
  });
});
