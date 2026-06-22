import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { tpLogin, tpRestoreSession } from '../../store/auth/tp-auth.actions';
import { selectTpAuthError, selectTpAuthLoading } from '../../store/auth/tp-auth.selectors';
import { TpAuthService } from '../../core/services/tp-auth.service';

@Component({
  selector: 'tp-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <div class="tp-login">
      <div class="card">
        <h1>TaskFlow Platform</h1>
        <p class="subtitle">Multi-tenant task management</p>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label>Email</label>
          <input formControlName="email" type="email" />
          <label>Password</label>
          <input formControlName="password" type="password" />
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
            <button type="button" class="pill" (click)="fill(cred.email, cred.password)">
              {{ cred.label }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .tp-login {
        min-height: calc(100vh - 44px);
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0a0e1a;
        font-family: 'Plus Jakarta Sans', sans-serif;
        padding: 16px;
        box-sizing: border-box;
      }
      .card {
        width: 100%;
        max-width: 420px;
        padding: 40px;
        background: #1e293b;
        border-radius: 16px;
        border: 1px solid rgba(16, 185, 129, 0.25);
        box-sizing: border-box;
      }
      h1 {
        color: #f1f5f9;
        margin: 0 0 8px;
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
        background: #10b981;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
      }
      .error {
        color: #ef4444;
        font-size: 13px;
      }
      .credentials {
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid rgba(148, 163, 184, 0.15);
      }
      .credentials p {
        color: #64748b;
        font-size: 12px;
      }
      .pill {
        display: inline-block;
        margin: 4px 4px 0 0;
        padding: 6px 12px;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.25);
        border-radius: 9999px;
        color: #10b981;
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
export class TpLoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private auth = inject(TpAuthService);

  loading$ = this.store.select(selectTpAuthLoading);
  error$ = this.store.select(selectTpAuthError);

  credentials = [
    { label: 'Admin (Acme)', email: 'admin@acme.com', password: 'admin123' },
    { label: 'Member', email: 'member@acme.com', password: 'member123' },
    { label: 'Viewer', email: 'viewer@acme.com', password: 'viewer123' },
    { label: 'Admin (Globex)', email: 'admin@globex.com', password: 'admin123' },
  ];

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    const session = this.auth.getSession();
    if (session) {
      this.store.dispatch(tpRestoreSession({ user: session.user }));
      this.router.navigate(['/projects/task-platform/board']);
    }
  }

  fill(email: string, password: string): void {
    this.form.patchValue({ email, password });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    this.store.dispatch(tpLogin({ email, password }));
  }
}
