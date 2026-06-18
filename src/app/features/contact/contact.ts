import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  readonly email = 'ketulporania@gmail.com';
  readonly phone = '+91 8000782068';
  readonly linkedin = 'https://www.linkedin.com/in/ketul-porania-3299094b/';
  readonly github = 'https://github.com/ketulporania';
  readonly resumeLink = 'https://drive.google.com/file/d/1B7FDZIikch2LQolaoJuLg-1RiVtCOQCF/view?usp=sharing';

  openResume(): void {
    window.open(this.resumeLink, '_blank', 'noopener,noreferrer');
  }

}
