import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  email = 'ketulporania@gmail.com';
  phone = '+91 8000782068';

  linkedin = 'https://www.linkedin.com/in/ketul-porania-3299094b/';
  github = 'https://github.com/ketulporania/my-portfolio';

  resumeLink = 'https://drive.google.com/file/d/1UavMRngLtc_Rf01Rt8Mf_CwJqRX2mmrV/view?usp=drive_link';



  openResume() {
    window.open(this.resumeLink, '_blank');
  }
}