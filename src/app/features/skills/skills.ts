import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {

  skillCategories = [
    {
      icon: '🅰️',
      title: 'Angular & Frontend',
      skills: [
        { name: 'Angular 21', level: 'Expert' },
        { name: 'Next JS', level: 'Expert' },
        { name: 'TypeScript', level: 'Expert' },
        { name: 'RxJS', level: 'Expert' },
        { name: 'Angular Material', level: 'Expert' },
        { name: 'Reactive Forms', level: 'Expert' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'Signals', level: 'Advanced' },
        { name: 'JavaScript', level: 'Advanced' },
        { name: 'HTML / CSS', level: 'Expert' },
      ]
    },
    {
      icon: '🔧',
      title: 'Angular Concepts',
      skills: [
        { name: 'Lazy Loading', level: 'Expert' },
        { name: 'Route Guards', level: 'Expert' },
        { name: 'HTTP Interceptors', level: 'Expert' },
        { name: 'Standalone Components', level: 'Expert' },
        { name: 'Change Detection', level: 'Advanced' },
        { name: 'Angular CDK', level: 'Advanced' },
        { name: 'Dynamic Components', level: 'Advanced' },
      ]
    },
    {
      icon: '🔗',
      title: 'Backend & APIs',
      skills: [
        { name: 'REST APIs', level: 'Expert' },
        { name: 'JWT Authentication', level: 'Expert' },
        { name: 'RBAC', level: 'Expert' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'Middleware', level: 'Intermediate' },
      ]
    },
    {
      icon: '🛠️',
      title: 'Tools & AI',
      skills: [
        { name: 'Git / GitHub', level: 'Expert' },
        { name: 'Postman', level: 'Expert' },
        { name: 'VS Code', level: 'Expert' },
        { name: 'Claude AI', level: 'Advanced' },
        { name: 'Cursor', level: 'Advanced' },
        { name: 'M365 Copilot', level: 'Advanced' },
        { name: 'Vitest', level: 'Intermediate' },
      ]
    }
  ];

  getLevelColor(level: string): string {
    switch (level) {
      case 'Expert':       return 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
      case 'Advanced':     return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'Intermediate': return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
      default:             return 'bg-slate-500/20 text-slate-400';
    }
  }

}
