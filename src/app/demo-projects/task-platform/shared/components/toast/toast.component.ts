import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'tp-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  template: `
    <div class="toast-container">
      @for (toast of toasts$ | async; track toast.id) {
        <div class="toast" [class]="toast.type">{{ toast.message }}</div>
      }
    </div>
  `,
  styles: [
    `
      .toast-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .toast {
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 13px;
        color: #fff;
        animation: slideIn 0.2s ease;
      }
      .success {
        background: #10b981;
      }
      .error {
        background: #ef4444;
      }
      .info {
        background: #6366f1;
      }
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ToastComponent {
  private notify = inject(NotificationService);
  toasts$ = this.notify.messages$;
}
