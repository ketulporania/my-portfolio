import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {

  experiences = [
    {
      company: 'DigiPay Guru Pvt. Ltd.',
      role: 'Angular Developer',
      duration: 'Feb 2023 – May 2026',
      type: 'Full-time · On-site',
      techStack: ['Angular 21', 'TypeScript', 'RxJS', 'Angular Material', 'Tailwind CSS', 'REST APIs', 'JWT'],
      achievements: [
        'Developed secure eKYC onboarding workflows with Angular Reactive Forms, dynamic validations, and REST API integrations — reducing manual onboarding effort significantly.',
        'Implemented JWT authentication, HTTP interceptors, and route guards to ensure secure, role-aware application access.',
        'Built a reusable component library of 20+ UI components, accelerating feature delivery across modules.',
        'Architected an Admin Panel with role-based access control (RBAC), permission-driven navigation, and operational monitoring dashboards.',
        'Created reusable data tables supporting filtering, sorting, search, and pagination — used across 10+ admin screens.',
        'Built Reporting & Analytics dashboards for monitoring transactions and operational metrics in real time.',
        'Optimized app performance using RxJS operators (debounceTime, switchMap), lazy-loaded routes, and OnPush change detection.',
        'Collaborated within an Agile team using Git for version control and Jira for sprint planning.',
      ]
    }
  ];

}
