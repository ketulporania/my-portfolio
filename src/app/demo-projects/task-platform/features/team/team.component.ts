import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TpSidebarComponent } from '../../shared/components/sidebar/tp-sidebar.component';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { TpUser } from '../../core/services/tp-auth.service';

@Component({
  selector: 'tp-team',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, TpSidebarComponent, TopbarComponent, AvatarComponent],
  template: `
    <div class="tp-app">
      <tp-sidebar />
      <div class="content">
        <tp-topbar />
        <main class="main">
          <h2>Team Members</h2>
          <div class="team-grid">
            @for (member of members$ | async; track member.id) {
              <div class="member-card">
                <tp-avatar [name]="member.name" />
                <div>
                  <h4>{{ member.name }}</h4>
                  <p>{{ member.email }}</p>
                  <span class="role">{{ member.role }}</span>
                </div>
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
      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;
      }
      .member-card {
        display: flex;
        gap: 16px;
        align-items: center;
        background: #1e293b;
        border-radius: 12px;
        padding: 20px;
      }
      h4 {
        margin: 0 0 4px;
      }
      p {
        margin: 0 0 6px;
        color: #64748b;
        font-size: 13px;
      }
      .role {
        font-size: 11px;
        text-transform: uppercase;
        color: #10b981;
        font-weight: 600;
      }

      @media (max-width: 768px) {
        .main {
          padding: 16px;
        }

        .team-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class TeamComponent implements OnInit {
  private http = inject(HttpClient);
  members$ = this.http.get<TpUser[]>('/data/tp-users.json');

  ngOnInit(): void {}
}
