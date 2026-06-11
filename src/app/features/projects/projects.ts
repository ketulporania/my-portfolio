import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {

  projects = [
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
      ]
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
      ]
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
      ]
    }
  ];

}
