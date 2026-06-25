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
      desc: 'RxJS operators, OnPush change detection, React memoization, Next.js SSR/SSG & code splitting'
    },
    {
      icon: '🔐',
      label: 'Security & Auth',
      desc: 'JWT, route guards, RBAC, interceptors, Next.js middleware & protected routes'
    },
    {
      icon: '⚛️',
      label: 'React Development',
      desc: 'Hooks, Context, custom hooks, reusable UI components & state-driven rendering'
    },
    {
      icon: '▲',
      label: 'Next.js Full-Stack',
      desc: 'App Router, Server Components, layouts, API routes & SEO-friendly rendering'
    },
    {
      icon: '🧩',
      label: 'Reusable Architecture',
      desc: 'Standalone components, React composition, shared libraries & design systems'
    },
    {
      icon: '📊',
      label: 'Data-Driven UIs',
      desc: 'Dashboards, dynamic tables, reporting workflows & server/client data fetching'
    }
  ];

}
