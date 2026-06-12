import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TpSidebarComponent } from '../../shared/components/sidebar/tp-sidebar.component';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { selectTpUser } from '../../store/auth/tp-auth.selectors';
import { CanComponentDeactivate } from '../../core/guards/unsaved-changes.guard';

@Component({
  selector: 'tp-settings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AsyncPipe, TpSidebarComponent, TopbarComponent],
  template: `
    <div class="tp-app">
      <tp-sidebar />
      <div class="content">
        <tp-topbar />
        <main class="main">
          <h2>Settings</h2>
          <form [formGroup]="form" (ngSubmit)="save()">
            @if (user$ | async; as user) {
              <div class="field">
                <label>Display Name</label>
                <input formControlName="displayName" />
              </div>
            }
            <div class="field">
              <label>Notifications</label>
              <label class="check"><input type="checkbox" formControlName="emailNotifs" /> Email notifications</label>
              <label class="check"><input type="checkbox" formControlName="pushNotifs" /> Push notifications</label>
            </div>
            <button type="submit">Save Changes</button>
            @if (saved()) {
              <span class="saved">Saved!</span>
            }
          </form>
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
      }
      .main {
        padding: 24px;
        max-width: 520px;
      }
      .field {
        margin-bottom: 20px;
      }
      label {
        display: block;
        color: #94a3b8;
        font-size: 12px;
        margin-bottom: 6px;
      }
      input[type='text'],
      input:not([type]) {
        width: 100%;
        padding: 10px;
        background: #1e293b;
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 8px;
        color: #f1f5f9;
        box-sizing: border-box;
      }
      .check {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #cbd5e1;
        font-size: 14px;
        margin-bottom: 8px;
      }
      button[type='submit'] {
        background: var(--tp-primary, #6366f1);
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
      }
      .saved {
        margin-left: 12px;
        color: #10b981;
        font-size: 13px;
      }
    `,
  ],
})
export class TpSettingsComponent implements CanComponentDeactivate {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  user$ = this.store.select(selectTpUser);
  saved = signal(false);

  form = this.fb.nonNullable.group({
    displayName: [''],
    emailNotifs: [true],
    pushNotifs: [false],
  });

  save(): void {
    this.form.markAsPristine();
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }
}
