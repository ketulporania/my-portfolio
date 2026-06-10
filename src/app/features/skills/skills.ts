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
      title: 'Frontend',
      skills: [
        'Angular',
        'TypeScript',
        'RxJS',
        'Reactive Forms',
        'Angular Material',
        'JavaScript',
        'HTML',
        'CSS'
      ]
    },
    {
      title: 'Backend',
      skills: [
        'Node.js',
        'JWT',
        'Middleware',
        'REST APIs'
      ]
    },
    {
      title: 'Tools',
      skills: [
        'Git',
        'GitHub',
        'Postman',
        'VS Code'
      ]
    },
    {
      title: 'AI Tools',
      skills: [
        'Claude',
        'Cursor',
        'Microsoft 365 Copilot'
      ]
    }
  ];

}