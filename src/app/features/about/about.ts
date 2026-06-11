import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  strengths = [
    {
      icon: '⚡',
      label: 'Performance Optimization',
      desc: 'RxJS operators, lazy loading, OnPush change detection'
    },
    {
      icon: '🔐',
      label: 'Security & Auth',
      desc: 'JWT, route guards, RBAC, interceptors'
    },
    {
      icon: '🧩',
      label: 'Reusable Architecture',
      desc: 'Standalone components, shared libraries, design systems'
    },
    {
      icon: '📊',
      label: 'Data-Driven UIs',
      desc: 'Dashboards, dynamic tables, reporting workflows'
    }
  ];

}
