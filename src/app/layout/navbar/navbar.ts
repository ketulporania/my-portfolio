import { Component, signal, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  // Close menu if user resizes to desktop
  @HostListener('window:resize', [])
  onResize(): void {
    if (window.innerWidth >= 768) {
      this.closeMenu();
    }
  }

}
