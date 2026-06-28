import { Directive, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[scrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** When true, children with --delay CSS var animate in sequence */
  @Input() scrollRevealStagger = false;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.classList.add(this.scrollRevealStagger ? 'pf-stagger' : 'pf-reveal');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add('is-revealed');
          this.observer?.unobserve(node);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
