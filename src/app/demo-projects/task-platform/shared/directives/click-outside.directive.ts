import { Directive, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';

@Directive({ selector: '[tpClickOutside]', standalone: true })
export class ClickOutsideDirective {
  private el = inject(ElementRef);

  @Output() tpClickOutside = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.tpClickOutside.emit();
    }
  }
}
