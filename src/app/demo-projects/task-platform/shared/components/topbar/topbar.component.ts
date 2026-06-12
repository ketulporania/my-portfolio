import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectTpUser } from '../../../store/auth/tp-auth.selectors';
import { tpLogout } from '../../../store/auth/tp-auth.actions';
import { AvatarComponent } from '../avatar/avatar.component';
import { TenantService } from '../../../core/services/tenant.service';

@Component({
  selector: 'tp-topbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, AvatarComponent],
  template: `
    <header class="tp-topbar">
      <h1>Task Management</h1>
      <div class="actions">
        @if (tenantService.getTenant(); as tenant) {
          <span class="tenant" [style.color]="tenant.primaryColor">{{ tenant.name }}</span>
        }
        @if (user$ | async; as user) {
          <tp-avatar [name]="user.name" />
          <span class="user-name">{{ user.name }}</span>
          <button type="button" (click)="logout()">Logout</button>
        }
      </div>
    </header>
  `,
  styles: [
    `
      .tp-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 24px;
        background: #0f172a;
        border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      h1 {
        margin: 0;
        font-size: 16px;
        color: #f1f5f9;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .tenant {
        font-size: 12px;
        font-weight: 600;
      }
      .user-name {
        color: #94a3b8;
        font-size: 13px;
      }
      button {
        background: rgba(99, 102, 241, 0.15);
        border: 1px solid rgba(99, 102, 241, 0.3);
        color: #818cf8;
        padding: 4px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
      }
    `,
  ],
})
export class TopbarComponent {
  private store = inject(Store);
  tenantService = inject(TenantService);
  user$ = this.store.select(selectTpUser);

  logout(): void {
    this.store.dispatch(tpLogout());
  }
}
