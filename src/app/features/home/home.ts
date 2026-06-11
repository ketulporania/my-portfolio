import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  readonly resumeLink = 'https://drive.google.com/file/d/1UavMRngLtc_Rf01Rt8Mf_CwJqRX2mmrV/view?usp=drive_link';

  openResume(): void {
    window.open(this.resumeLink, '_blank', 'noopener,noreferrer');
  }

}
