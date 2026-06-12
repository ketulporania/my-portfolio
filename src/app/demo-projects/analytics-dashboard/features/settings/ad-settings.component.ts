import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AdNavbarComponent } from '../../shared/components/navbar/ad-navbar.component';
import { AdSidebarComponent } from '../../shared/components/sidebar/ad-sidebar.component';
import { selectAdUser } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';

@Component({
  selector: 'ad-settings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, AdNavbarComponent, AdSidebarComponent],
  template: `
    <div class="ad-app">
      <ad-navbar />
      <div class="layout">
        <ad-sidebar />
        <main class="main">
          <h1>Settings</h1>
          @if (user$ | async; as user) {
            <div class="settings-card">
              <h3>Profile</h3>
              <p><strong>Name:</strong> {{ user.name }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Role:</strong> {{ user.role }}</p>
              <button type="button" (click)="onLogout()">Sign Out</button>
            </div>
          }
          <div class="settings-card">
            <h3>Preferences</h3>
            <label><input type="checkbox" checked disabled /> Enable live data streaming</label>
            <label><input type="checkbox" checked disabled /> Email notifications</label>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .ad-app {
        min-height: calc(100vh - 44px);
        background: #0a0e1a;
        color: #f1f5f9;
        font-family: 'Inter', sans-serif;
      }
      .layout {
        display: flex;
      }
      .main {
        flex: 1;
        padding: 24px;
      }
      h1 {
        margin: 0 0 24px;
        font-size: 22px;
      }
      .settings-card {
        background: #1e293b;
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
        max-width: 480px;
      }
      .settings-card h3 {
        margin: 0 0 16px;
        color: #94a3b8;
        font-size: 14px;
      }
      .settings-card p {
        margin: 0 0 8px;
        font-size: 14px;
      }
      label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        color: #cbd5e1;
      }
      button {
        margin-top: 16px;
        padding: 8px 16px;
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
        border-radius: 8px;
        cursor: pointer;
      }
    `,
  ],
})
export class AdSettingsComponent {
  private store = inject(Store);
  user$ = this.store.select(selectAdUser);

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
