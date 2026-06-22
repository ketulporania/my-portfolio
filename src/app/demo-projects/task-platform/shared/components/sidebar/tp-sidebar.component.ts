import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { TpAuthService } from '../../../core/services/tp-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { closeSidebar } from '../../../store/ui/ui.actions';
import { selectTpSidebarCollapsed } from '../../../store/ui/ui.selectors';

@Component({
  selector: 'tp-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  template: `
    @if ((collapsed$ | async) === false) {
      <div class="sidebar-backdrop" (click)="close()"></div>
    }
    <aside class="tp-sidebar" [class.collapsed]="collapsed$ | async">
      <div class="brand">TaskFlow</div>
      <nav>
        <a
          routerLink="/projects/task-platform/board"
          routerLinkActive="active"
          (click)="close()">
          Board
        </a>
        <a
          routerLink="/projects/task-platform/projects"
          routerLinkActive="active"
          (click)="close()">
          Projects
        </a>
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
        <a
          routerLink="/projects/task-platform/settings"
          routerLinkActive="active"
          (click)="close()">
          Settings
        </a>
      </nav>
    </aside>
  `,
  styles: [
    `
      .sidebar-backdrop {
        display: none;
      }

      .tp-sidebar {
        width: 220px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        background: #1e293b;
        padding: 20px 12px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        height: calc(100vh - 44px);
        max-height: calc(100vh - 44px);
        overflow: hidden;
        box-sizing: border-box;
      }

      .brand {
        flex-shrink: 0;
        font-weight: 700;
        color: var(--tp-primary, #6366f1);
        padding: 0 14px 20px;
        font-size: 18px;
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding-right: 4px;
        scrollbar-width: thin;
        scrollbar-color: rgba(148, 163, 184, 0.4) transparent;
      }

      nav::-webkit-scrollbar {
        width: 6px;
      }

      nav::-webkit-scrollbar-thumb {
        background: rgba(148, 163, 184, 0.4);
        border-radius: 9999px;
      }

      a {
        padding: 10px 14px;
        border-radius: 8px;
        color: #94a3b8;
        text-decoration: none;
        font-size: 13px;
        cursor: pointer;
        flex-shrink: 0;
      }

      a:focus-visible {
        outline: 2px solid var(--tp-primary, #6366f1);
        outline-offset: 2px;
        color: #f1f5f9;
      }

      a.active,
      a:hover {
        background: rgba(99, 102, 241, 0.12);
        color: #f1f5f9;
      }

      @media (min-width: 769px) {
        .tp-sidebar {
          position: static;
          transform: none !important;
          pointer-events: auto !important;
        }

        .sidebar-backdrop {
          display: none !important;
        }
      }

      @media (max-width: 768px) {
        .sidebar-backdrop {
          display: block;
          position: fixed;
          inset: 0;
          top: 44px;
          background: rgba(0, 0, 0, 0.5);
          z-index: 400;
        }

        .tp-sidebar {
          position: fixed;
          top: 44px;
          left: 0;
          bottom: 0;
          z-index: 500;
          width: min(260px, 85vw);
          height: auto;
          max-height: none;
          transform: translateX(-100%);
          transition: transform 0.2s ease;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
        }

        .tp-sidebar:not(.collapsed) {
          transform: translateX(0);
        }
      }
    `,
  ],
})
export class TpSidebarComponent {
  private auth = inject(TpAuthService);
  private notify = inject(NotificationService);
  private router = inject(Router);
  private store = inject(Store);

  collapsed$ = this.store.select(selectTpSidebarCollapsed);

  close(): void {
    this.store.dispatch(closeSidebar());
  }

  navTo(path: string, roles: string[], section: string): void {
    const user = this.auth.getCurrentUser();
    if (user && roles.includes(user.role)) {
      this.router.navigateByUrl(path);
      this.close();
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
