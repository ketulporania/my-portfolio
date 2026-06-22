import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TpSidebarComponent } from '../../shared/components/sidebar/tp-sidebar.component';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { selectTpTasks } from '../../store/tasks/tasks.selectors';
import { loadTasks } from '../../store/tasks/tasks.actions';
import { map } from 'rxjs';

@Component({
  selector: 'tp-reports',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, TpSidebarComponent, TopbarComponent],
  template: `
    <div class="tp-app">
      <tp-sidebar />
      <div class="content">
        <tp-topbar />
        <main class="main">
          <h2>Reports</h2>
          <div class="stats">
            @if (stats$ | async; as stats) {
              <div class="stat-card">
                <span class="label">Total Tasks</span>
                <span class="value">{{ stats.total }}</span>
              </div>
              <div class="stat-card">
                <span class="label">Completed</span>
                <span class="value">{{ stats.done }}</span>
              </div>
              <div class="stat-card">
                <span class="label">In Progress</span>
                <span class="value">{{ stats.inProgress }}</span>
              </div>
              <div class="stat-card">
                <span class="label">High Priority</span>
                <span class="value">{{ stats.highPriority }}</span>
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
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }
      .stat-card {
        background: #1e293b;
        border-radius: 12px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .label {
        color: #64748b;
        font-size: 13px;
      }
      .value {
        font-size: 32px;
        font-weight: 700;
        color: var(--tp-primary, #6366f1);
      }

      @media (max-width: 768px) {
        .main {
          padding: 16px;
        }

        .stats {
          grid-template-columns: repeat(2, 1fr);
        }

        .value {
          font-size: 24px;
        }
      }

      @media (max-width: 400px) {
        .stats {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ReportsComponent implements OnInit {
  private store = inject(Store);

  stats$ = this.store.select(selectTpTasks).pipe(
    map((tasks) => ({
      total: tasks.length,
      done: tasks.filter((t) => t.status === 'done').length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      highPriority: tasks.filter((t) => t.priority === 'high').length,
    }))
  );

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }
}
