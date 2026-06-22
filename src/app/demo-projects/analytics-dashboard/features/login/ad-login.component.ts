import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { login } from '../../store/auth/auth.actions';
import {
  selectAdAuthError,
  selectAdAuthLoading,
  selectAdIsAuthenticated,
} from '../../store/auth/auth.selectors';
import { AuthService } from '../../core/services/auth.service';
import { restoreSession } from '../../store/auth/auth.actions';

@Component({
  selector: 'ad-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <div class="ad-login">
      <div class="card">
        <h1>Analytics Dashboard</h1>
        <p class="subtitle">Sign in to view live metrics</p>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label>Email</label>
          <input formControlName="email" type="email" placeholder="admin@demo.com" />
          <label>Password</label>
          <input formControlName="password" type="password" placeholder="••••••••" />
          @if (error$ | async; as err) {
            <p class="error">{{ err }}</p>
          }
          <button type="submit" [disabled]="form.invalid || (loading$ | async)">
            {{ (loading$ | async) ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
        <div class="credentials">
          <p>Demo credentials (click to fill):</p>
          @for (cred of credentials; track cred.email) {
            <button type="button" class="pill" (click)="fillCredentials(cred.email, cred.password)">
              {{ cred.label }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .ad-login {
        min-height: calc(100vh - 44px);
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0a0e1a;
        font-family: 'Inter', sans-serif;
        padding: 16px;
        box-sizing: border-box;
      }
      .card {
        width: 100%;
        max-width: 400px;
        padding: 40px;
        background: #1e293b;
        border-radius: 16px;
        border: 1px solid rgba(99, 102, 241, 0.25);
        box-sizing: border-box;
      }
      h1 {
        color: #f1f5f9;
        margin: 0 0 8px;
        font-size: 24px;
      }
      .subtitle {
        color: #64748b;
        margin: 0 0 24px;
        font-size: 14px;
      }
      label {
        display: block;
        color: #94a3b8;
        font-size: 12px;
        margin-bottom: 6px;
      }
      input {
        width: 100%;
        padding: 10px 14px;
        margin-bottom: 16px;
        background: #0f172a;
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 8px;
        color: #f1f5f9;
        box-sizing: border-box;
      }
      button[type='submit'] {
        width: 100%;
        padding: 12px;
        background: #6366f1;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
      }
      button[type='submit']:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .error {
        color: #ef4444;
        font-size: 13px;
        margin: 0 0 12px;
      }
      .credentials {
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid rgba(148, 163, 184, 0.15);
      }
      .credentials p {
        color: #64748b;
        font-size: 12px;
        margin: 0 0 10px;
      }
      .pill {
        display: inline-block;
        margin: 4px 4px 0 0;
        padding: 6px 12px;
        background: rgba(99, 102, 241, 0.1);
        border: 1px solid rgba(99, 102, 241, 0.25);
        border-radius: 9999px;
        color: #818cf8;
        font-size: 11px;
        cursor: pointer;
      }

      @media (max-width: 480px) {
        .card {
          padding: 24px;
        }
      }
    `,
  ],
})
export class AdLoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private auth = inject(AuthService);

  loading$ = this.store.select(selectAdAuthLoading);
  error$ = this.store.select(selectAdAuthError);
  isAuth$ = this.store.select(selectAdIsAuthenticated);

  credentials = [
    { label: 'Admin — admin@demo.com', email: 'admin@demo.com', password: 'admin123' },
    { label: 'Viewer — viewer@demo.com', email: 'viewer@demo.com', password: 'viewer123' },
  ];

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.store.dispatch(restoreSession({ user }));
      this.router.navigate(['/projects/analytics-dashboard/dashboard']);
    }
  }

  fillCredentials(email: string, password: string): void {
    this.form.patchValue({ email, password });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    this.store.dispatch(login({ email, password }));
  }
}
