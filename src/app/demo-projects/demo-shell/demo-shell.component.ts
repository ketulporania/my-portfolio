import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../task-platform/shared/components/toast/toast.component';

@Component({
  selector: 'app-demo-shell',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  template: `
    <div class="demo-shell">
      <div class="demo-topbar">
        <button class="back-btn" (click)="backToPortfolio()">
          <span class="back-arrow">←</span>
          Back to Portfolio
        </button>
        <span class="demo-label">
          <span class="live-dot"></span>
          Live Demo — {{ demoTitle }}
        </span>
        <a
          class="source-link"
          href="https://github.com/ketulporania"
          target="_blank"
          rel="noopener">
          View Source on GitHub ↗
        </a>
      </div>
      <div class="demo-content">
        <router-outlet />
      </div>
      @if (demoRoute === 'task-platform') {
        <tp-toast />
      }
    </div>
  `,
  styleUrl: './demo-shell.component.scss',
})
export class DemoShellComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  demoTitle = this.route.snapshot.data['demoTitle'] ?? 'Live Demo';
  demoRoute = this.route.snapshot.data['demoRoute'] ?? '';

  backToPortfolio() {
    this.router.navigate(['/'], { fragment: 'projects' });
  }
}
