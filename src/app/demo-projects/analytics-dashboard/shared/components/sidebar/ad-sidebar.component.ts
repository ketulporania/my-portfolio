import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ad-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="ad-sidebar">
      <a routerLink="/projects/analytics-dashboard/dashboard" routerLinkActive="active">Overview</a>
      <a routerLink="/projects/analytics-dashboard/analytics" routerLinkActive="active">Deep Analytics</a>
      <a routerLink="/projects/analytics-dashboard/settings" routerLinkActive="active">Settings</a>
    </aside>
  `,
  styles: [
    `
      .ad-sidebar {
        width: 200px;
        padding: 20px 12px;
        background: #1e293b;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-family: 'Inter', sans-serif;
      }
      a {
        padding: 10px 14px;
        border-radius: 8px;
        color: #94a3b8;
        text-decoration: none;
        font-size: 13px;
      }
      a.active,
      a:hover {
        background: rgba(99, 102, 241, 0.15);
        color: #f1f5f9;
      }

      @media (max-width: 768px) {
        .ad-sidebar {
          display: none;
        }
      }
    `,
  ],
})
export class AdSidebarComponent {}
