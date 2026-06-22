import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  readonly email = 'ketulporania@gmail.com';
  readonly phone = '+91 8780107539';
  readonly linkedin = 'https://www.linkedin.com/in/ketul-porania-3299094b/';
  readonly github = 'https://github.com/ketulporania';
  readonly resumeLink = 'https://drive.google.com/file/d/1IyMhK3SSIRtsA6LTjuEkEw9kYp5410MV/view?usp=drive_link';

  openResume(): void {
    window.open(this.resumeLink, '_blank', 'noopener,noreferrer');
  }

}
