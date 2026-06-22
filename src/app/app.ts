import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LanguageToggle } from '../core/i18n/language-toggle';
import { TranslatePipe } from '../core/i18n/translate.pipe';

@Component({
  selector: 'app-root',
  imports: [LanguageToggle, RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
