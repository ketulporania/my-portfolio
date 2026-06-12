import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const ANALYTICS_DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/ad-login.component').then((m) => m.AdLoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/ad-dashboard.component').then((m) => m.AdDashboardComponent),
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/analytics/ad-analytics.component').then((m) => m.AdAnalyticsComponent),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/settings/ad-settings.component').then((m) => m.AdSettingsComponent),
  },
];
