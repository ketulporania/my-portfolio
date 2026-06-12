import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tp-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty">
      <p class="icon">{{ icon }}</p>
      <h3>{{ title }}</h3>
      <p class="desc">{{ description }}</p>
    </div>
  `,
  styles: [
    `
      .empty {
        text-align: center;
        padding: 40px 20px;
        color: #64748b;
      }
      .icon {
        font-size: 32px;
        margin: 0 0 12px;
      }
      h3 {
        color: #94a3b8;
        margin: 0 0 8px;
        font-size: 16px;
      }
      .desc {
        margin: 0;
        font-size: 13px;
      }
    `,
  ],
})
export class EmptyStateComponent {
  @Input() icon = '📋';
  @Input() title = 'No items';
  @Input() description = 'Nothing to show yet.';
}
