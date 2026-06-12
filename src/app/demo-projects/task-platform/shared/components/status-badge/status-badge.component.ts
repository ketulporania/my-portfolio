import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tp-status-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge">{{ status }}</span>`,
  styles: [
    `
      .badge {
        font-size: 10px;
        padding: 2px 8px;
        border-radius: 9999px;
        background: rgba(99, 102, 241, 0.15);
        color: #818cf8;
        text-transform: capitalize;
      }
    `,
  ],
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: string;
}
