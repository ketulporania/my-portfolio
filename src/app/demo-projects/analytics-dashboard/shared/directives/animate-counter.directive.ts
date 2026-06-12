import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';

@Directive({ selector: '[adAnimateCounter]', standalone: true })
export class AnimateCounterDirective implements OnChanges {
  private el = inject(ElementRef<HTMLElement>);

  @Input('adAnimateCounter') value = 0;
  @Input() prefix = '';
  @Input() suffix = '';

  ngOnChanges(): void {
    const start = 0;
    const end = this.value;
    const duration = 600;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      this.el.nativeElement.textContent = `${this.prefix}${current.toLocaleString()}${this.suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
