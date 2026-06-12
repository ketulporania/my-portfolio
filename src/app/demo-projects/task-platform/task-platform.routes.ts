import { Routes } from '@angular/router';
import { tpAuthGuard } from './core/guards/tp-auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';
import { tenantResolver } from './core/resolvers/tenant.resolver';

export const TASK_PLATFORM_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/tp-login.component').then((m) => m.TpLoginComponent),
  },
  {
    path: 'board',
    canActivate: [tpAuthGuard],
    resolve: { tenant: tenantResolver },
    loadComponent: () => import('./features/board/board.component').then((m) => m.BoardComponent),
  },
  {
    path: 'projects',
    canActivate: [tpAuthGuard],
    loadComponent: () =>
      import('./features/projects/tp-projects.component').then((m) => m.TpProjectsComponent),
  },
  {
    path: 'team',
    canActivate: [tpAuthGuard, roleGuard(['admin'])],
    data: { sectionName: 'Team' },
    loadComponent: () => import('./features/team/team.component').then((m) => m.TeamComponent),
  },
  {
    path: 'reports',
    canActivate: [tpAuthGuard, roleGuard(['admin', 'member'])],
    data: { sectionName: 'Reports' },
    loadComponent: () => import('./features/reports/reports.component').then((m) => m.ReportsComponent),
  },
  {
    path: 'settings',
    canActivate: [tpAuthGuard],
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('./features/settings/tp-settings.component').then((m) => m.TpSettingsComponent),
  },
];
