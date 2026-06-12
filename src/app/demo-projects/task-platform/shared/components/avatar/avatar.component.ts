import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InitialsPipe } from '../../pipes/initials.pipe';

@Component({
  selector: 'tp-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InitialsPipe],
  template: `<div class="avatar" [style.background]="color">{{ name | initials }}</div>`,
  styles: [
    `
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 600;
        color: #fff;
      }
    `,
  ],
})
export class AvatarComponent {
  @Input({ required: true }) name!: string;
  @Input() color = 'var(--tp-primary, #6366f1)';
}
