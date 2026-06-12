# 🔗 Portfolio Integration Guide — Cursor Prompt

> **Open your portfolio project in VS Code, then paste this entire file into Cursor.**  
> Cursor must read and follow every instruction here without skipping anything.

---

## 📌 Context — What This File Is

This is the existing live portfolio: **https://ketuldev.vercel.app**  
It is a single Angular SPA (standalone components, Angular 20+) deployed on Vercel.  
It currently shows: Hero, About, Skills, Experience, Projects, Contact sections.

We are **NOT rebuilding the portfolio**. We are adding two new showcase projects into the existing app so a recruiter can click a project card on the portfolio and see the full live demo running inside the same domain — no redirects, no iframes, no external links.

---

## 🎯 Goal

Integrate two fully functional Angular demo apps **as lazy-loaded feature routes** inside the portfolio:

| Route | Project |
|---|---|
| `/projects/analytics-dashboard` | Real-Time Analytics Dashboard |
| `/projects/task-platform` | Multi-Tenant Task Management Platform |

The portfolio's existing `Projects` section will show a card for each. Clicking a card navigates to the live demo. A persistent "← Back to Portfolio" topbar lets the recruiter return. The demo apps live entirely within the portfolio's Angular router — same domain, same bundle, zero iframes.

---

## 🗂 How to Integrate — Step by Step

### Step 1 — Understand the existing portfolio structure

Before touching any file, Cursor must read the existing project and identify:
- The root `app.routes.ts` (or wherever routes are declared)
- The existing `Projects` section component (likely in `features/projects` or `sections/projects`)
- The existing project data array / interface (the cards shown in the portfolio)
- The `app.config.ts` to know what providers are already registered
- The global `styles.scss` or theme file

Do not assume file paths — read them first.

---

### Step 2 — Add new folder structure inside the portfolio

Create these folders alongside the existing feature folders:

```
src/app/
├── demo-projects/                          ← NEW top-level folder
│   ├── demo-shell/
│   │   ├── demo-shell.component.ts         ← Wrapper with "Back to Portfolio" bar
│   │   └── demo-shell.component.scss
│   │
│   ├── analytics-dashboard/                ← Full Analytics Dashboard app
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts
│   │   │   └── services/
│   │   │       ├── auth.service.ts
│   │   │       ├── data-stream.service.ts
│   │   │       └── storage.service.ts
│   │   ├── store/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.actions.ts
│   │   │   │   ├── dashboard.reducer.ts
│   │   │   │   ├── dashboard.effects.ts
│   │   │   │   └── dashboard.selectors.ts
│   │   │   └── auth/
│   │   │       ├── auth.actions.ts
│   │   │       ├── auth.reducer.ts
│   │   │       └── auth.selectors.ts
│   │   ├── features/
│   │   │   ├── login/
│   │   │   │   └── ad-login.component.ts
│   │   │   ├── dashboard/
│   │   │   │   ├── ad-dashboard.component.ts
│   │   │   │   └── components/
│   │   │   │       ├── kpi-card/
│   │   │   │       │   └── kpi-card.component.ts
│   │   │   │       ├── line-chart/
│   │   │   │       │   └── line-chart.component.ts
│   │   │   │       ├── bar-chart/
│   │   │   │       │   └── bar-chart.component.ts
│   │   │   │       ├── donut-chart/
│   │   │   │       │   └── donut-chart.component.ts
│   │   │   │       └── activity-feed/
│   │   │   │           └── activity-feed.component.ts
│   │   │   ├── analytics/
│   │   │   │   └── ad-analytics.component.ts
│   │   │   └── settings/
│   │   │       └── ad-settings.component.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── navbar/ad-navbar.component.ts
│   │   │   │   ├── sidebar/ad-sidebar.component.ts
│   │   │   │   ├── sparkline/sparkline.component.ts
│   │   │   │   └── badge/badge.component.ts
│   │   │   ├── pipes/
│   │   │   │   ├── abbreviate-number.pipe.ts
│   │   │   │   └── time-ago.pipe.ts
│   │   │   └── directives/
│   │   │       └── animate-counter.directive.ts
│   │   └── analytics-dashboard.routes.ts   ← Internal routes for this demo
│   │
│   └── task-platform/                      ← Full Task Platform app
│       ├── core/
│       │   ├── guards/
│       │   │   ├── tp-auth.guard.ts
│       │   │   ├── role.guard.ts
│       │   │   └── unsaved-changes.guard.ts
│       │   ├── resolvers/
│       │   │   └── tenant.resolver.ts
│       │   ├── interceptors/
│       │   │   └── tenant.interceptor.ts
│       │   └── services/
│       │       ├── tp-auth.service.ts
│       │       ├── tenant.service.ts
│       │       ├── task.service.ts
│       │       ├── tp-storage.service.ts
│       │       └── notification.service.ts
│       ├── store/
│       │   ├── tasks/
│       │   │   ├── tasks.actions.ts
│       │   │   ├── tasks.reducer.ts
│       │   │   ├── tasks.effects.ts
│       │   │   └── tasks.selectors.ts
│       │   ├── projects/
│       │   │   ├── projects.actions.ts
│       │   │   ├── projects.reducer.ts
│       │   │   ├── projects.effects.ts
│       │   │   └── projects.selectors.ts
│       │   └── ui/
│       │       ├── ui.actions.ts
│       │       ├── ui.reducer.ts
│       │       └── ui.selectors.ts
│       ├── features/
│       │   ├── login/tp-login.component.ts
│       │   ├── board/
│       │   │   ├── board.component.ts
│       │   │   └── components/
│       │   │       ├── kanban-column/kanban-column.component.ts
│       │   │       ├── task-card/task-card.component.ts
│       │   │       ├── task-detail/task-detail.component.ts
│       │   │       └── add-task-modal/add-task-modal.component.ts
│       │   ├── projects/tp-projects.component.ts
│       │   ├── team/team.component.ts
│       │   ├── reports/reports.component.ts
│       │   └── settings/tp-settings.component.ts
│       ├── shared/
│       │   ├── components/
│       │   │   ├── sidebar/tp-sidebar.component.ts
│       │   │   ├── topbar/topbar.component.ts
│       │   │   ├── avatar/avatar.component.ts
│       │   │   ├── priority-badge/priority-badge.component.ts
│       │   │   ├── status-badge/status-badge.component.ts
│       │   │   ├── toast/toast.component.ts
│       │   │   └── empty-state/empty-state.component.ts
│       │   ├── pipes/
│       │   │   ├── truncate.pipe.ts
│       │   │   ├── tp-time-ago.pipe.ts
│       │   │   └── initials.pipe.ts
│       │   └── directives/
│       │       ├── has-role.directive.ts
│       │       └── click-outside.directive.ts
│       └── task-platform.routes.ts         ← Internal routes for this demo
│
└── assets/
    └── data/
        ├── ad-metrics.json                 ← Analytics Dashboard mock data
        ├── ad-activity-feed.json
        ├── ad-chart-series.json
        ├── tp-tenants.json                 ← Task Platform mock data
        ├── tp-users.json
        ├── tp-projects.json
        └── tp-tasks.json
```

> **Naming convention:** All components inside `analytics-dashboard/` are prefixed `ad-` and inside `task-platform/` are prefixed `tp-` to avoid any selector collisions with the existing portfolio components.

---

### Step 3 — Add routes to the existing portfolio router

Open the existing `app.routes.ts` (or wherever the portfolio routes live). Add these two lazy route entries **without touching or removing any existing routes**:

```typescript
// ADD these to the existing routes array — do not replace existing routes
{
  path: 'projects/analytics-dashboard',
  loadComponent: () =>
    import('./demo-projects/demo-shell/demo-shell.component')
      .then(m => m.DemoShellComponent),
  data: { demoTitle: 'Analytics Dashboard', demoRoute: 'analytics-dashboard' },
  children: [
    {
      path: '',
      loadChildren: () =>
        import('./demo-projects/analytics-dashboard/analytics-dashboard.routes')
          .then(m => m.ANALYTICS_DASHBOARD_ROUTES)
    }
  ]
},
{
  path: 'projects/task-platform',
  loadComponent: () =>
    import('./demo-projects/demo-shell/demo-shell.component')
      .then(m => m.DemoShellComponent),
  data: { demoTitle: 'Task Management Platform', demoRoute: 'task-platform' },
  children: [
    {
      path: '',
      loadChildren: () =>
        import('./demo-projects/task-platform/task-platform.routes')
          .then(m => m.TASK_PLATFORM_ROUTES)
    }
  ]
},
```

Both routes are lazy — they add **zero bytes** to the initial portfolio bundle. The demo code only loads when a recruiter actually clicks into it.

---

### Step 4 — Create `DemoShellComponent`

This is the wrapper that sits around both demo apps. It adds a slim "Back to Portfolio" bar at the top so the recruiter is never lost.

**`demo-shell.component.ts`**
```typescript
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demo-shell',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="demo-shell">
      <div class="demo-topbar">
        <button class="back-btn" (click)="backToPortfolio()">
          <span class="back-arrow">←</span>
          Back to Portfolio
        </button>
        <span class="demo-label">
          <span class="live-dot"></span>
          Live Demo — {{ demoTitle }}
        </span>
        <a
          class="source-link"
          href="https://github.com/ketulporania"
          target="_blank"
          rel="noopener">
          View Source on GitHub ↗
        </a>
      </div>
      <div class="demo-content">
        <router-outlet />
      </div>
    </div>
  `,
  styleUrl: './demo-shell.component.scss'
})
export class DemoShellComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  demoTitle = this.route.snapshot.data['demoTitle'] ?? 'Live Demo';

  backToPortfolio() {
    this.router.navigate(['/'], { fragment: 'projects' });
  }
}
```

**`demo-shell.component.scss`**
```scss
.demo-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.demo-topbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 44px;
  background: rgba(10, 14, 26, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(99, 102, 241, 0.25);
  font-size: 13px;
  gap: 16px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    color: #f1f5f9;
    background: rgba(255, 255, 255, 0.06);
  }

  .back-arrow {
    font-size: 15px;
    line-height: 1;
  }
}

.demo-label {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #f1f5f9;
  font-weight: 500;
  font-size: 13px;
}

.live-dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50%       { opacity: 0.85; box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
}

.source-link {
  color: #6366f1;
  text-decoration: none;
  font-size: 12px;
  white-space: nowrap;
  transition: color 0.15s ease;

  &:hover { color: #818cf8; text-decoration: underline; }
}

.demo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
```

---

### Step 5 — Internal route files for each demo

**`analytics-dashboard.routes.ts`**
```typescript
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const ANALYTICS_DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/ad-login.component').then(m => m.AdLoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/ad-dashboard.component').then(m => m.AdDashboardComponent)
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    loadComponent: () => import('./features/analytics/ad-analytics.component').then(m => m.AdAnalyticsComponent)
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () => import('./features/settings/ad-settings.component').then(m => m.AdSettingsComponent)
  },
];
```

**`task-platform.routes.ts`**
```typescript
import { Routes } from '@angular/router';
import { tpAuthGuard } from './core/guards/tp-auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';
import { tenantResolver } from './core/resolvers/tenant.resolver';

export const TASK_PLATFORM_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/tp-login.component').then(m => m.TpLoginComponent)
  },
  {
    path: 'board',
    canActivate: [tpAuthGuard],
    resolve: { tenant: tenantResolver },
    loadComponent: () => import('./features/board/board.component').then(m => m.BoardComponent)
  },
  {
    path: 'projects',
    canActivate: [tpAuthGuard],
    loadComponent: () => import('./features/projects/tp-projects.component').then(m => m.TpProjectsComponent)
  },
  {
    path: 'team',
    canActivate: [tpAuthGuard, roleGuard(['admin'])],
    loadComponent: () => import('./features/team/team.component').then(m => m.TeamComponent)
  },
  {
    path: 'reports',
    canActivate: [tpAuthGuard, roleGuard(['admin', 'member'])],
    loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent)
  },
  {
    path: 'settings',
    canActivate: [tpAuthGuard],
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('./features/settings/tp-settings.component').then(m => m.TpSettingsComponent)
  },
];
```

> **Important:** The `authGuard` inside `analytics-dashboard/core/guards/` and `tpAuthGuard` inside `task-platform/core/guards/` are **completely separate services** from each other and from any guard the portfolio may already have. They use different `localStorage` keys (`ad_auth_token` and `tp_auth_session`) so they never interfere with each other or with the portfolio.

---

### Step 6 — Isolate NgRx state per demo

Each demo registers its own NgRx feature state. To prevent store key collisions, use unique feature names:

**Analytics Dashboard** (`app.config.ts` or via `provideState` in the route):
```typescript
// Registered inside analytics-dashboard only — not in the root app.config.ts
provideState('ad_auth', adAuthReducer),
provideState('ad_dashboard', adDashboardReducer),
provideEffects(AdDashboardEffects, AdAuthEffects),
```

**Task Platform:**
```typescript
provideState('tp_auth', tpAuthReducer),
provideState('tp_tasks', tpTasksReducer),
provideState('tp_projects', tpProjectsReducer),
provideState('tp_ui', tpUiReducer),
provideEffects(TpTaskEffects, TpProjectEffects, TpAuthEffects),
```

To scope providers to only the demo route (not pollute the root injector), use Angular's `providers` array on the route definition:

```typescript
// In app.routes.ts, update the analytics-dashboard route:
{
  path: 'projects/analytics-dashboard',
  loadComponent: () => import('./demo-projects/demo-shell/demo-shell.component').then(m => m.DemoShellComponent),
  data: { demoTitle: 'Analytics Dashboard' },
  providers: [
    provideState('ad_auth', adAuthReducer),
    provideState('ad_dashboard', adDashboardReducer),
    provideEffects(AdDashboardEffects, AdAuthEffects),
  ],
  children: [{ path: '', loadChildren: () => import('./demo-projects/analytics-dashboard/analytics-dashboard.routes').then(m => m.ANALYTICS_DASHBOARD_ROUTES) }]
},
{
  path: 'projects/task-platform',
  loadComponent: () => import('./demo-projects/demo-shell/demo-shell.component').then(m => m.DemoShellComponent),
  data: { demoTitle: 'Task Management Platform' },
  providers: [
    provideState('tp_auth', tpAuthReducer),
    provideState('tp_tasks', tpTasksReducer),
    provideState('tp_projects', tpProjectsReducer),
    provideState('tp_ui', tpUiReducer),
    provideEffects(TpTaskEffects, TpProjectEffects, TpAuthEffects),
  ],
  children: [{ path: '', loadChildren: () => import('./demo-projects/task-platform/task-platform.routes').then(m => m.TASK_PLATFORM_ROUTES) }]
},
```

---

### Step 7 — Update the portfolio's Projects section

Open the existing component that renders the project cards (likely something like `projects-section.component.ts`). Find the existing project data array. Add these two entries to it — do not remove the existing ones:

```typescript
// ADD to the existing projects array in the portfolio
{
  id: 'analytics-dashboard',
  title: 'Real-Time Analytics Dashboard',
  description: 'Live metrics dashboard with WebSocket-simulated data streams, NgRx state management, OnPush change detection, and CDK Virtual Scroll.',
  tags: ['Angular 20', 'NgRx', 'RxJS', 'TypeScript', 'Tailwind CSS'],
  demoRoute: '/projects/analytics-dashboard',    // internal Angular route
  githubUrl: 'https://github.com/ketulporania/analytics-dashboard',
  featured: true,
  isLiveDemo: true,                              // flag to show "Live Demo" badge
  previewImage: 'assets/previews/analytics-dashboard.png',
  accentColor: '#6366f1',
  highlights: [
    'RxJS interval stream simulating live WebSocket data',
    'Full NgRx cycle — Actions → Effects → Reducers → Selectors',
    'OnPush on every component, async pipe throughout',
    'CDK Virtual Scroll on 200-item activity feed',
    'Route guard + JWT simulation via localStorage',
  ]
},
{
  id: 'task-platform',
  title: 'Multi-Tenant Task Platform',
  description: 'Role-based Kanban board with drag-and-drop, multi-tenancy, optimistic updates, CanDeactivate guard, and per-tenant theming.',
  tags: ['Angular 20', 'NgRx Entity', 'CDK DragDrop', 'TypeScript', 'Tailwind CSS'],
  demoRoute: '/projects/task-platform',          // internal Angular route
  githubUrl: 'https://github.com/ketulporania/task-platform',
  featured: true,
  isLiveDemo: true,
  previewImage: 'assets/previews/task-platform.png',
  accentColor: '#10b981',
  highlights: [
    'CDK DragDrop Kanban with optimistic update + rollback',
    '@ngrx/entity adapter for normalized task state',
    'RoleGuard (Admin/Member/Viewer), CanDeactivate, TenantResolver',
    'HTTP Interceptor injecting X-Tenant-ID header',
    'Per-tenant CSS variable theming applied at runtime',
  ]
},
```

---

### Step 8 — Update the project card UI in the portfolio

Find the project card template in the portfolio's projects section. Update it so that:

1. If a project has `isLiveDemo: true` AND `demoRoute`, the primary button uses `[routerLink]="[project.demoRoute]"` (internal Angular navigation — no page reload, no new tab).
2. If a project has only `githubUrl` (the existing client confidential projects), the button opens the GitHub link in a new tab as before.
3. Add a "Live Demo" badge on cards that have `isLiveDemo: true`.

**Card button logic (template snippet):**
```html
@if (project.isLiveDemo && project.demoRoute) {
  <a
    [routerLink]="project.demoRoute"
    class="btn btn-primary">
    <span>View Live Demo</span>
    <span class="btn-arrow">→</span>
  </a>
} @else {
  <a
    [href]="project.githubUrl"
    target="_blank"
    rel="noopener"
    class="btn btn-outline">
    View Project ↗
  </a>
}

@if (project.isLiveDemo) {
  <span class="live-badge">
    <span class="live-dot-sm"></span>
    Live Demo
  </span>
}
```

**Badge styles to add to the portfolio's project card SCSS:**
```scss
.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 9999px;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.live-dot-sm {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
```

---

### Step 9 — localStorage key isolation

All three contexts (portfolio, analytics demo, task demo) must use **separate localStorage keys** so they never overwrite each other:

| Context | Key prefix |
|---|---|
| Portfolio (if it stores anything) | `portfolio_` |
| Analytics Dashboard | `ad_` — e.g. `ad_auth_token`, `ad_auth_user` |
| Task Platform | `tp_` — e.g. `tp_auth_session`, `tp_tasks_cache` |

Ensure both `AuthService` files use their own prefixed keys. Cursor must search for any `localStorage.getItem` / `localStorage.setItem` calls across both demo apps and confirm they all use the correct prefix.

---

### Step 10 — Install missing packages (only if not already in package.json)

Check `package.json` first. Only run these if the package is not already listed:

```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
npm install ng2-charts chart.js
npm install @angular/cdk
```

Do not upgrade or change any existing packages. Do not change `angular.json` build config except to add the new asset paths if needed.

---

### Step 11 — Add mock data assets

Create these files under `src/assets/data/`. Cursor must generate realistic seed data matching the shapes below.

**`src/assets/data/ad-metrics.json`** — 4 KPI metrics for the Analytics Dashboard:
```json
[
  { "id": "revenue", "label": "Total Revenue", "value": 1284500, "change": 12.5, "prefix": "$", "suffix": "", "trend": [1100000,1150000,1200000,1230000,1260000,1284500], "status": "up" },
  { "id": "users",   "label": "Active Users",  "value": 48293,   "change": 8.3,  "prefix": "",  "suffix": "", "trend": [40000,42000,44500,46000,47500,48293],             "status": "up" },
  { "id": "conversion", "label": "Conversion Rate", "value": 3.24, "change": -1.2, "prefix": "", "suffix": "%", "trend": [3.5,3.4,3.35,3.3,3.28,3.24], "status": "down" },
  { "id": "session", "label": "Avg Session",   "value": 272,     "change": 5.7,  "prefix": "",  "suffix": "s", "trend": [240,248,255,262,268,272],                       "status": "up" }
]
```

**`src/assets/data/ad-activity-feed.json`** — Generate 200 items with shape:
```json
{ "id": 1, "user": "Alice Johnson", "action": "completed purchase", "amount": "$249", "time": "2 min ago", "avatar": "AJ", "type": "purchase" }
```

**`src/assets/data/tp-tenants.json`**:
```json
[
  { "id": "acme",    "name": "Acme Corp",  "primaryColor": "#6366f1", "plan": "pro"     },
  { "id": "globex",  "name": "Globex Inc", "primaryColor": "#10b981", "plan": "starter" },
  { "id": "initech", "name": "Initech",    "primaryColor": "#f59e0b", "plan": "pro"     }
]
```

**`src/assets/data/tp-users.json`**:
```json
[
  { "id": "u1", "name": "Ketul Porania", "email": "admin@acme.com",   "password": "admin123",  "role": "admin",  "tenantId": "acme" },
  { "id": "u2", "name": "Priya Shah",    "email": "member@acme.com",  "password": "member123", "role": "member", "tenantId": "acme" },
  { "id": "u3", "name": "Dev Viewer",    "email": "viewer@acme.com",  "password": "viewer123", "role": "viewer", "tenantId": "acme" },
  { "id": "u4", "name": "John Admin",    "email": "admin@globex.com", "password": "admin123",  "role": "admin",  "tenantId": "globex" }
]
```

**`src/assets/data/tp-tasks.json`** — Generate 50 tasks spread across `todo`(15), `in-progress`(12), `in-review`(8), `done`(15):
```json
{
  "id": "t1", "title": "Design new onboarding flow", "description": "...",
  "status": "in-progress", "priority": "high", "projectId": "p1",
  "assigneeIds": ["u1","u2"], "dueDate": "2025-07-15", "createdAt": "2025-06-01",
  "order": 1, "tenantId": "acme", "commentCount": 3, "tags": ["design","ux"]
}
```

**`src/assets/data/tp-projects.json`**:
```json
[
  { "id": "p1", "name": "Website Redesign", "color": "#6366f1", "tenantId": "acme", "memberIds": ["u1","u2","u3"] },
  { "id": "p2", "name": "Mobile App",       "color": "#10b981", "tenantId": "acme", "memberIds": ["u1","u2"]      },
  { "id": "p3", "name": "API Integration",  "color": "#f59e0b", "tenantId": "acme", "memberIds": ["u1"]           }
]
```

---

## 🎨 Styling Isolation Rules

Both demo apps are visually isolated from the portfolio. Cursor must follow these rules:

1. **No global style leakage.** All demo component styles use `encapsulation: ViewEncapsulation.Emulated` (Angular default). Do not use `ViewEncapsulation.None` anywhere in the demo folders.

2. **Demo apps have their own CSS variables** scoped to `.demo-content` or the demo root component selector. This prevents the demo's dark theme from overriding the portfolio's theme.

3. **The portfolio's existing styles must not change.** Only add new CSS — never modify existing portfolio SCSS files except to append new project card badge styles.

4. **Font imports:** If the demo apps use different fonts (Inter, Plus Jakarta Sans), import them in the demo root component's `styles` array or `@Component` styles — not in the global `styles.scss`.

---

## 🚀 Deployment — Vercel

The portfolio already deploys to Vercel from its Git repo. No changes to `vercel.json` or build config are needed because:
- Angular Router handles all navigation client-side
- Vercel already serves the `index.html` fallback for all routes (standard Angular SPA setup)
- The new `/projects/analytics-dashboard` and `/projects/task-platform` routes work automatically

If Vercel shows 404 on direct URL access, add or confirm this `vercel.json` in the repo root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## ✅ Cursor Final Checklist

Cursor must confirm all of the following before finishing:

- [ ] Existing portfolio routes, components, and styles are **unchanged**
- [ ] Two new demo projects live under `src/app/demo-projects/`
- [ ] `DemoShellComponent` wraps both demos with the "← Back to Portfolio" sticky topbar
- [ ] Portfolio `app.routes.ts` has both new lazy routes with scoped `providers`
- [ ] NgRx feature states use unique keys: `ad_auth`, `ad_dashboard`, `tp_auth`, `tp_tasks`, `tp_projects`, `tp_ui`
- [ ] `localStorage` keys are prefixed: `ad_` for analytics demo, `tp_` for task demo
- [ ] No component selector collisions between portfolio and demo apps (all demo selectors prefixed `ad-` or `tp-`)
- [ ] Portfolio's Projects section shows the two new cards with "View Live Demo" button using `[routerLink]`
- [ ] "Live Demo" badge appears on the two new project cards
- [ ] All mock JSON files created under `src/assets/data/` with `ad-` and `tp-` prefixes
- [ ] `@angular/cdk`, `@ngrx/*`, `ng2-charts` added only if not already in `package.json`
- [ ] `vercel.json` rewrite rule confirmed or added
- [ ] Both demo apps fully functional as described in their individual READMEs
- [ ] `OnPush` change detection on every demo component
- [ ] Zero manual `.subscribe()` calls in any demo component

---

## 📋 Demo Credentials (show on login pages)

**Analytics Dashboard**
- Admin: `admin@demo.com` / `admin123`
- Viewer: `viewer@demo.com` / `viewer123`

**Task Platform**
- Admin (Acme): `admin@acme.com` / `admin123`
- Member: `member@acme.com` / `member123`
- Viewer: `viewer@acme.com` / `viewer123`
- Admin (Globex): `admin@globex.com` / `admin123`

Both login pages must display these credentials as clickable pills that auto-fill the form.

---

*Portfolio: https://ketuldev.vercel.app*  
*Built by Ketul Porania — Angular Developer*  
*Stack: Angular 20 · NgRx 18 · RxJS · CDK · TypeScript · Tailwind CSS*
