import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ad-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="ad-badge" [class]="type"><ng-content /></span>`,
  styles: [
    `
      .ad-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 600;
      }
      .up {
        background: rgba(16, 185, 129, 0.15);
        color: #10b981;
      }
      .down {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
      }
      .neutral {
        background: rgba(148, 163, 184, 0.15);
        color: #94a3b8;
      }
    `,
  ],
})
export class AdBadgeComponent {
  @Input() type: 'up' | 'down' | 'neutral' = 'neutral';
}
