import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tp-priority-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge" [class]="priority">{{ priority }}</span>`,
  styles: [
    `
      .badge {
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .high {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
      }
      .medium {
        background: rgba(245, 158, 11, 0.15);
        color: #f59e0b;
      }
      .low {
        background: rgba(148, 163, 184, 0.15);
        color: #94a3b8;
      }
    `,
  ],
})
export class PriorityBadgeComponent {
  @Input({ required: true }) priority!: 'low' | 'medium' | 'high';
}
