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
      duration: 'Feb 2023 - May 2026',
      achievements: [
        'Developed secure onboarding and eKYC workflows using Angular Reactive Forms and REST APIs.',
        'Implemented JWT authentication and route guards for secure application access.',
        'Built reusable Angular components and validation modules.',
        'Developed Admin Panel modules for user management and operational monitoring.',
        'Implemented role-based access control (RBAC) and permission-driven navigation.',
        'Created reusable data tables with filtering, sorting, search, and pagination.',
        'Built reporting and analytics dashboards.',
        'Optimized performance using RxJS operators, lazy loading, and API optimization.'
      ]
    }
  ];
}
