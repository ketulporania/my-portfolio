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
      description:
        'Developed secure customer onboarding workflows with dynamic forms, validations, and API integrations.',
      contributions: [
        'Angular Reactive Forms',
        'REST API Integration',
        'JWT Authentication',
        'Route Guards',
        'Reusable Components'
      ]
    },

    {
      title: 'Admin & Role Management System',
      description:
        'Built enterprise administration modules for user management, permissions, reporting, and operational monitoring.',
      contributions: [
        'Role-Based Access Control',
        'Permission Management',
        'Dynamic Navigation',
        'Reusable Data Tables',
        'Search & Pagination'
      ]
    },

    {
      title: 'Reporting & Analytics Dashboard',
      description:
        'Created business dashboards for monitoring transactions, operational metrics, and reporting workflows.',
      contributions: [
        'Dashboard Development',
        'RxJS Optimization',
        'Lazy Loading',
        'API Optimization',
        'Performance Improvements'
      ]
    }
  ];
}