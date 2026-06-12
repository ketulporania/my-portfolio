import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TpAuthService } from '../../../core/services/tp-auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'tp-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="tp-sidebar">
      <div class="brand">TaskFlow</div>
      <nav>
        <a routerLink="/projects/task-platform/board" routerLinkActive="active">Board</a>
        <a routerLink="/projects/task-platform/projects" routerLinkActive="active">Projects</a>
        <a
          [class.active]="isActive('/projects/task-platform/team')"
          (click)="navTo('/projects/task-platform/team', ['admin'], 'Team')">
          Team
        </a>
        <a
          [class.active]="isActive('/projects/task-platform/reports')"
          (click)="navTo('/projects/task-platform/reports', ['admin', 'member'], 'Reports')">
          Reports
        </a>
        <a routerLink="/projects/task-platform/settings" routerLinkActive="active">Settings</a>
      </nav>
    </aside>
  `,
  styles: [
    `
      .tp-sidebar {
        width: 220px;
        background: #1e293b;
        padding: 20px 12px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        min-height: calc(100vh - 44px);
      }
      .brand {
        font-weight: 700;
        color: var(--tp-primary, #6366f1);
        padding: 0 14px 20px;
        font-size: 18px;
      }
      nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      a {
        padding: 10px 14px;
        border-radius: 8px;
        color: #94a3b8;
        text-decoration: none;
        font-size: 13px;
        cursor: pointer;
      }
      a.active,
      a:hover {
        background: rgba(99, 102, 241, 0.12);
        color: #f1f5f9;
      }
    `,
  ],
})
export class TpSidebarComponent {
  private auth = inject(TpAuthService);
  private notify = inject(NotificationService);
  private router = inject(Router);

  navTo(path: string, roles: string[], section: string): void {
    const user = this.auth.getCurrentUser();
    if (user && roles.includes(user.role)) {
      this.router.navigateByUrl(path);
      return;
    }
    this.notify.show(`You do not have permission to access ${section}.`, 'error');
  }

  isActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}
