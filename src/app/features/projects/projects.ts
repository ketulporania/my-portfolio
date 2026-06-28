import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

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
  externalDemo?: boolean;
  githubUrl?: string;
  featured?: boolean;
  isLiveDemo?: boolean;
  previewImage?: string;
  accentColor?: string;
  highlights?: string[];
}

@Component({
  selector: 'app-projects',
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projects: PortfolioProject[] = [
    {
      title: 'User Onboarding and eKYC Verification System',
      domain: 'FinTech',
      isConfidential: true,
      description:
        'Enterprise-grade customer onboarding system for a financial institution. Built secure, multi-step onboarding flows with document verification, dynamic form validations, and real-time API integrations.',
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
      title: 'Admin Panel for Financial Services',
      domain: 'FinTech',
      isConfidential: true,
      description:
        'Responsive admin dashboards built with React.js for transaction monitoring, reporting, and user management. Integrated REST APIs for real-time financial data visualization with reusable UI components across the platform.',
      contributions: [
        'React.js',
        'Admin Dashboards',
        'Transaction Monitoring',
        'REST API Integration',
        'Reusable Components',
        'State Management',
      ],
    },
    {
      title: 'International Remittance System',
      domain: 'FinTech',
      isConfidential: true,
      description:
        'Cross-border remittance platform with beneficiary and transaction management modules built in Angular. Delivered scalable Node.js and Express.js APIs for remittance processing backed by MySQL, with a focus on reliable, high-volume transaction flows.',
      contributions: [
        'Beneficiary Management',
        'Transaction Management',
        'Angular',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'API Optimization',
      ],
    },
    {
      id: 'pulse',
      title: 'Pulse — Real Time Chat Application',
      domain: 'Full Stack',
      description:
        'Real-time messaging platform with instant delivery, online presence, typing indicators, and persistent chat history. Built with a Next.js frontend and a Node.js backend powered by WebSockets.',
      tags: ['React', 'Next.js', 'Node.js', 'Express', 'Socket.io', 'Prisma', 'PostgreSQL', 'TypeScript'],
      demoRoute: 'https://realtime-chat-three-gamma.vercel.app',
      externalDemo: true,
      featured: true,
      isLiveDemo: true,
      accentColor: '#ec4899',
      // highlights: [
      //   'Real-time messaging & typing indicators via Socket.io',
      //   'Next.js App Router with React client components',
      //   'Prisma ORM for users, rooms & message persistence',
      //   'Express REST API with JWT authentication',
      //   'Online presence, read receipts & scalable event handling',
      // ],
    },
    {
      id: 'user-registration',
      title: 'User Registration & Profile Management',
      domain: 'Full Stack',
      description:
        'Secure user registration and profile management system built with Angular, Node.js, and Express.js. Integrated MongoDB with Mongoose for user CRUD operations, with JWT authentication and Multer for secure profile image uploads and file validation.',
      contributions: [
        'Angular',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Mongoose',
        'JWT Authentication',
        'Multer',
      ],
      demoRoute: 'https://full-stack-assesment-pink.vercel.app/',
      externalDemo: true,
      githubUrl: 'https://github.com/ketulporania/full-stack-mean',
      featured: true,
      isLiveDemo: true,
      accentColor: '#f59e0b',
      // highlights: [
      //   'Secure registration & profile editing with Angular reactive forms',
      //   'JWT authentication for protected routes and sessions',
      // ],
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
      // highlights: [
      //   'RxJS interval stream simulating live WebSocket data',
      //   'Full NgRx cycle — Actions → Effects → Reducers → Selectors',
      //   'OnPush on every component, async pipe throughout',
      //   'CDK Virtual Scroll on 200-item activity feed',
      //   'Route guard + JWT simulation via localStorage',
      // ],
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
      // highlights: [
      //   'CDK DragDrop Kanban with optimistic update + rollback',
      //   '@ngrx/entity adapter for normalized task state',
      //   'RoleGuard (Admin/Member/Viewer), CanDeactivate, TenantResolver',
      //   'HTTP Interceptor injecting X-Tenant-ID header',
      //   'Per-tenant CSS variable theming applied at runtime',
      // ],
    },

  ];
}
