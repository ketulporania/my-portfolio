import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

export interface SkillItem {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
}

export interface SkillCategory {
  icon: string;
  title: string;
  description: string;
  accent: string;
  skills: SkillItem[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  skillCategories: SkillCategory[] = [
    {
      icon: 'FE',
      title: 'Frontend',
      description: 'Modern UI development with component-driven architecture and reactive patterns.',
      accent: '#22d3ee',
      skills: [
        { name: 'Angular', level: 'Expert' },
        { name: 'React', level: 'Advanced' },
        { name: 'Next.js', level: 'Advanced' },
        { name: 'JavaScript', level: 'Advanced' },
        { name: 'TypeScript', level: 'Expert' },
        { name: 'RxJS', level: 'Expert' },
        { name: 'Reactive Forms', level: 'Expert' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'Signals', level: 'Advanced' },
        { name: 'HTML / CSS', level: 'Expert' },
      ],
    },
    {
      icon: 'NG',
      title: 'Angular Concepts',
      description: 'Enterprise Angular patterns for scalable, maintainable applications.',
      accent: '#ef4444',
      skills: [
        { name: 'Lazy Loading', level: 'Expert' },
        { name: 'Route Guards', level: 'Expert' },
        { name: 'HTTP Interceptors', level: 'Expert' },
        { name: 'Standalone Components', level: 'Expert' },
        { name: 'Change Detection', level: 'Advanced' },
        { name: 'Angular CDK', level: 'Advanced' },
        { name: 'Dynamic Components', level: 'Advanced' },
      ],
    },
    {
      icon: 'RN',
      title: 'React & Next.js',
      description: 'Full-stack React ecosystem with server rendering and modern routing.',
      accent: '#818cf8',
      skills: [
        { name: 'Hooks', level: 'Advanced' },
        { name: 'Context API', level: 'Advanced' },
        { name: 'Custom Hooks', level: 'Advanced' },
        { name: 'App Router', level: 'Advanced' },
        { name: 'Server Components', level: 'Advanced' },
        { name: 'SSR / SSG', level: 'Advanced' },
        { name: 'API Routes', level: 'Advanced' },
        { name: 'Next.js Middleware', level: 'Intermediate' },
      ],
    },
    {
      icon: 'BE',
      title: 'Backend & APIs',
      description: 'RESTful services, real-time communication, and secure authentication layers.',
      accent: '#10b981',
      skills: [
        { name: 'REST APIs', level: 'Expert' },
        { name: 'Node.js', level: 'Expert' },
        { name: 'Express', level: 'Expert' },
        { name: 'Prisma ORM', level: 'Advanced' },
        { name: 'Socket.io', level: 'Advanced' },
        { name: 'WebSockets', level: 'Advanced' },
        { name: 'Middleware', level: 'Expert' },
        { name: 'JWT Authentication', level: 'Expert' },
        { name: 'RBAC', level: 'Expert' },
      ],
    },
    {
      icon: 'DB',
      title: 'Databases',
      description: 'Relational and document databases used across FinTech and full-stack projects.',
      accent: '#a78bfa',
      skills: [
        { name: 'MongoDB', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
      ],
    },
    {
      icon: 'TL',
      title: 'Tools & AI',
      description: 'Development workflow, collaboration, and AI-assisted productivity.',
      accent: '#f59e0b',
      skills: [
        { name: 'Git / GitHub', level: 'Expert' },
        { name: 'Postman', level: 'Expert' },
        { name: 'VS Code', level: 'Expert' },
        { name: 'Claude AI', level: 'Advanced' },
        { name: 'Cursor', level: 'Advanced' },
        { name: 'M365 Copilot', level: 'Advanced' },
        { name: 'Vitest', level: 'Intermediate' },
      ],
    },
  ];

  levelClass(level: string): string {
    switch (level) {
      case 'Expert':
        return 'skill-pill--expert';
      case 'Advanced':
        return 'skill-pill--advanced';
      case 'Intermediate':
        return 'skill-pill--intermediate';
      default:
        return 'skill-pill--intermediate';
    }
  }

  levelDots(level: string): number {
    switch (level) {
      case 'Expert':
        return 3;
      case 'Advanced':
        return 2;
      default:
        return 1;
    }
  }
}
