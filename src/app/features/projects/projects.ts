import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PortfolioProject {
  id?: string;
  title: string;
  domain?: string;
  isConfidential?: boolean;
  description: string;
  impact?: string;
  contributions?: string[];
  tags?: string[];
  demoRoute?: string;
  githubUrl?: string;
  featured?: boolean;
  isLiveDemo?: boolean;
  previewImage?: string;
  accentColor?: string;
  highlights?: string[];
}

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projects: PortfolioProject[] = [
    {
      title: 'Financial Onboarding & eKYC Platform',
      domain: 'FinTech',
      isConfidential: true,
      description:
        'Enterprise-grade customer onboarding system for a financial institution. Built secure, multi-step onboarding flows with document verification, dynamic form validations, and real-time API integrations.',
      impact: 'Streamlined the customer onboarding journey end-to-end',
      contributions: [
        'Angular Reactive Forms',
        'JWT Authentication',
        'HTTP Interceptors',
        'Route Guards',
        'REST API Integration',
        'Reusable Components',
      ],
    },
    {
      title: 'Admin & Role Management System',
      domain: 'FinTech',
      isConfidential: true,
      description:
        'Full-featured administration portal for managing users, roles, permissions, and operational monitoring. Supported complex role hierarchies and permission-driven UI rendering across the platform.',
      impact: 'Reduced admin operation time with dynamic, permission-aware UI',
      contributions: [
        'Role-Based Access Control',
        'Permission Management',
        'Dynamic Navigation',
        'Reusable Data Tables',
        'Search & Pagination',
        'Angular CDK',
      ],
    },
    {
      title: 'Reporting & Analytics Dashboard',
      domain: 'FinTech',
      isConfidential: true,
      description:
        'Real-time business intelligence dashboards for monitoring financial transactions, KPIs, and operational metrics. Implemented performance-critical data rendering with RxJS and lazy loading.',
      impact: 'Delivered actionable insights to business stakeholders in real time',
      contributions: [
        'Dashboard Development',
        'RxJS Optimization',
        'Lazy Loading',
        'OnPush Change Detection',
        'API Optimization',
        'Angular Material',
      ],
    },
    {
      id: 'analytics-dashboard',
      title: 'Real-Time Analytics Dashboard',
      description:
        'Live metrics dashboard with WebSocket-simulated data streams, NgRx state management, OnPush change detection, and CDK Virtual Scroll.',
      tags: ['Angular 20', 'NgRx', 'RxJS', 'TypeScript', 'Tailwind CSS'],
      demoRoute: '/projects/analytics-dashboard',
      githubUrl: 'https://github.com/ketulporania/analytics-dashboard',
      featured: true,
      isLiveDemo: true,
      previewImage: 'assets/previews/analytics-dashboard.png',
      accentColor: '#6366f1',
      highlights: [
        'RxJS interval stream simulating live WebSocket data',
        'Full NgRx cycle — Actions → Effects → Reducers → Selectors',
        'OnPush on every component, async pipe throughout',
        'CDK Virtual Scroll on 200-item activity feed',
        'Route guard + JWT simulation via localStorage',
      ],
    },
    {
      id: 'task-platform',
      title: 'Multi-Tenant Task Platform',
      description:
        'Role-based Kanban board with drag-and-drop, multi-tenancy, optimistic updates, CanDeactivate guard, and per-tenant theming.',
      tags: ['Angular 20', 'NgRx Entity', 'CDK DragDrop', 'TypeScript', 'Tailwind CSS'],
      demoRoute: '/projects/task-platform',
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
      ],
    },
  ];
}
