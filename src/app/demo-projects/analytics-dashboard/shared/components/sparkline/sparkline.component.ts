import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ad-sparkline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg [attr.viewBox]="'0 0 ' + width + ' ' + height" class="sparkline"><polyline [attr.points]="points" /></svg>`,
  styles: [
    `
      .sparkline {
        width: 100%;
        height: 32px;
      }
      polyline {
        fill: none;
        stroke: #6366f1;
        stroke-width: 2;
      }
    `,
  ],
})
export class SparklineComponent {
  @Input() data: number[] = [];
  width = 100;
  height = 32;

  get points(): string {
    if (!this.data.length) return '';
    const max = Math.max(...this.data);
    const min = Math.min(...this.data);
    const range = max - min || 1;
    return this.data
      .map((v, i) => {
        const x = (i / (this.data.length - 1)) * this.width;
        const y = this.height - ((v - min) / range) * (this.height - 4) - 2;
        return `${x},${y}`;
      })
      .join(' ');
  }
}
