import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  readonly year = new Date().getFullYear();
  readonly email = 'ketulporania@gmail.com';
  readonly phone = '+91 8780107539';
  readonly github = 'https://github.com/ketulporania';
  readonly resumeLink = 'https://drive.google.com/file/d/1IyMhK3SSIRtsA6LTjuEkEw9kYp5410MV/view?usp=drive_link';

  openResume(): void {
    window.open(this.resumeLink, '_blank', 'noopener,noreferrer');
  }

}
