import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { Portfolio } from './pages/portfolio/portfolio';
import { adAuthReducer } from './demo-projects/analytics-dashboard/store/auth/auth.reducer';
import { adDashboardReducer } from './demo-projects/analytics-dashboard/store/dashboard/dashboard.reducer';
import { AdAuthEffects } from './demo-projects/analytics-dashboard/store/auth/auth.effects';
import { AdDashboardEffects } from './demo-projects/analytics-dashboard/store/dashboard/dashboard.effects';
import { tpAuthReducer } from './demo-projects/task-platform/store/auth/tp-auth.reducer';
import { tpTasksReducer } from './demo-projects/task-platform/store/tasks/tasks.reducer';
import { tpProjectsReducer } from './demo-projects/task-platform/store/projects/projects.reducer';
import { tpUiReducer } from './demo-projects/task-platform/store/ui/ui.reducer';
import { TpAuthEffects } from './demo-projects/task-platform/store/auth/tp-auth.effects';
import { TpTaskEffects } from './demo-projects/task-platform/store/tasks/tasks.effects';
import { TpProjectEffects } from './demo-projects/task-platform/store/projects/projects.effects';

export const routes: Routes = [
  {
    path: '',
    component: Portfolio,
  },
  {
    path: 'projects/analytics-dashboard',
    loadComponent: () =>
      import('./demo-projects/demo-shell/demo-shell.component').then((m) => m.DemoShellComponent),
    data: { demoTitle: 'Analytics Dashboard', demoRoute: 'analytics-dashboard' },
    providers: [
      provideState('ad_auth', adAuthReducer),
      provideState('ad_dashboard', adDashboardReducer),
      provideEffects(AdAuthEffects, AdDashboardEffects),
    ],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./demo-projects/analytics-dashboard/analytics-dashboard.routes').then(
            (m) => m.ANALYTICS_DASHBOARD_ROUTES
          ),
      },
    ],
  },
  {
    path: 'projects/task-platform',
    loadComponent: () =>
      import('./demo-projects/demo-shell/demo-shell.component').then((m) => m.DemoShellComponent),
    data: { demoTitle: 'Task Management Platform', demoRoute: 'task-platform' },
    providers: [
      provideState('tp_auth', tpAuthReducer),
      provideState('tp_tasks', tpTasksReducer),
      provideState('tp_projects', tpProjectsReducer),
      provideState('tp_ui', tpUiReducer),
      provideEffects(TpAuthEffects, TpTaskEffects, TpProjectEffects),
    ],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./demo-projects/task-platform/task-platform.routes').then(
            (m) => m.TASK_PLATFORM_ROUTES
          ),
      },
    ],
  },
];
