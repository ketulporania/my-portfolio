import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  readonly resumeLink = 'https://drive.google.com/file/d/1IyMhK3SSIRtsA6LTjuEkEw9kYp5410MV/view?usp=drive_link';

  openResume(): void {
    window.open(this.resumeLink, '_blank', 'noopener,noreferrer');
  }

}
