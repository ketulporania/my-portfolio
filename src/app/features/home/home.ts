import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  readonly resumeLink = 'https://drive.google.com/file/d/1B7FDZIikch2LQolaoJuLg-1RiVtCOQCF/view?usp=sharing';

  openResume(): void {
    window.open(this.resumeLink, '_blank', 'noopener,noreferrer');
  }

}
