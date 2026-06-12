import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { selectAdUser } from '../../../store/auth/auth.selectors';
import { logout } from '../../../store/auth/auth.actions';

@Component({
  selector: 'ad-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  template: `
    <nav class="ad-navbar">
      <span class="brand">Analytics Pro</span>
      <div class="links">
        <a routerLink="/projects/analytics-dashboard/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/projects/analytics-dashboard/analytics" routerLinkActive="active">Analytics</a>
        <a routerLink="/projects/analytics-dashboard/settings" routerLinkActive="active">Settings</a>
      </div>
      <div class="user-area">
        @if (user$ | async; as user) {
          <span class="user-name">{{ user.name }}</span>
          <button type="button" (click)="onLogout()">Logout</button>
        }
      </div>
    </nav>
  `,
  styles: [
    `
      .ad-navbar {
        display: flex;
        align-items: center;
        gap: 24px;
        padding: 12px 24px;
        background: #0f172a;
        border-bottom: 1px solid rgba(99, 102, 241, 0.2);
        color: #f1f5f9;
        font-family: 'Inter', sans-serif;
      }
      .brand {
        font-weight: 700;
        color: #6366f1;
      }
      .links {
        display: flex;
        gap: 16px;
        flex: 1;
      }
      .links a {
        color: #94a3b8;
        text-decoration: none;
        font-size: 14px;
      }
      .links a.active,
      .links a:hover {
        color: #f1f5f9;
      }
      .user-area {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 13px;
      }
      .user-name {
        color: #94a3b8;
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
export class AdNavbarComponent {
  private store = inject(Store);
  user$ = this.store.select(selectAdUser);

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
