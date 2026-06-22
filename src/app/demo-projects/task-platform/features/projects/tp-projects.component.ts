import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TpSidebarComponent } from '../../shared/components/sidebar/tp-sidebar.component';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { selectTpProjects } from '../../store/projects/projects.selectors';
import { loadProjects, selectProject } from '../../store/projects/projects.actions';

@Component({
  selector: 'tp-projects-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, TpSidebarComponent, TopbarComponent],
  template: `
    <div class="tp-app">
      <tp-sidebar />
      <div class="content">
        <tp-topbar />
        <main class="main">
          <h2>Projects</h2>
          <div class="grid">
            @for (project of projects$ | async; track project.id) {
              <div class="project-card" [style.borderColor]="project.color">
                <div class="dot" [style.background]="project.color"></div>
                <h3>{{ project.name }}</h3>
                <p>{{ project.memberIds.length }} members</p>
                <button type="button" (click)="select(project.id)">View Board</button>
              </div>
            }
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .tp-app {
        display: flex;
        min-height: calc(100vh - 44px);
        background: #0a0e1a;
        color: #f1f5f9;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .content {
        flex: 1;
        min-width: 0;
      }
      .main {
        padding: 24px;
      }
      h2 {
        margin: 0 0 20px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 16px;
      }
      .project-card {
        background: #1e293b;
        border: 1px solid;
        border-radius: 12px;
        padding: 24px;
      }
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-bottom: 12px;
      }
      h3 {
        margin: 0 0 8px;
      }
      p {
        color: #64748b;
        font-size: 13px;
        margin: 0 0 16px;
      }
      button {
        background: var(--tp-primary, #6366f1);
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
      }

      @media (max-width: 768px) {
        .main {
          padding: 16px;
        }

        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class TpProjectsComponent implements OnInit {
  private store = inject(Store);
  projects$ = this.store.select(selectTpProjects);

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
  }

  select(projectId: string): void {
    this.store.dispatch(selectProject({ projectId }));
  }
}
